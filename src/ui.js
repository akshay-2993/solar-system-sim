// DOM wiring: dock of bodies, time bar, facts panel, sheets and overlays.
import { BODIES, BODY_NAMES, BODY_COLORS, INFO, FOOTNOTE, PHASE_NAMES, HELP, INTRO, APP_DESCRIPTION } from './data.js';
import * as astro from './astro.js';
import * as sound from './sound.js';

export const GRANULARITY = {
  day: { rate: 2, density: 96, step: 1 },
  month: { rate: 45, density: 8, step: 30.44 },
  year: { rate: 365, density: 0.8, step: 365.25 },
};

const shortDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const longDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const clock = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' });
export const formatShort = (t) => shortDate.format(astro.tToDate(t));
export const formatLong = (t) => longDate.format(astro.tToDate(t));
export const formatClock = (t) => clock.format(astro.tToDate(t));

const $ = (id) => document.getElementById(id);
const KIND = { sun: 'Star', moon: "Earth's moon" };
// A shaded disc in the body's colour, shown until the real thumbnail is rendered.
const discPlaceholder = (color) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><radialGradient id="g" cx="35%" cy="32%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="${color}" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs><circle cx="24" cy="24" r="24" fill="${color}"/><circle cx="24" cy="24" r="24" fill="url(#g)"/></svg>`)}`;

export class UI {
  constructor(state, actions) {
    this.state = state;
    this.actions = actions;
    this.el = {
      app: $('app'), stage: $('stage'), sky: $('sky'), loading: $('loading'),
      btnBack: $('btnBack'), badge: $('eclipseBadge'), hoverLabel: $('hoverLabel'), pinEarth: $('pinLabelEarth'), pinMoon: $('pinLabelMoon'),
      btnPlay: $('btnPlay'), tape: $('tape'), tapeCanvas: $('tapeCanvas'), dateOut: $('dateOut'), timeOut: $('timeOut'), btnToday: $('btnToday'),
      tabs: Array.from(document.querySelectorAll('.tab')), btnEclipse: $('btnEclipse'), chkOrbits: $('chkOrbits'),
      bodies: $('bodies'), btnInfo: $('btnInfo'),
      facts: $('facts'), factsScrim: $('factsScrim'), btnFacts: $('btnFacts'), btnFactsText: $('btnFactsText'), top: $('top'), deck: $('deck'), infoKind: $('infoKind'), infoTitle: $('infoTitle'), infoImage: $('infoImage'), infoCaption: $('infoCaption'), infoPhase: $('infoPhase'), infoStats: $('infoStats'), infoText: $('infoText'), infoNote: $('infoNote'),
      menuSheet: $('menuSheet'), menuDescription: $('menuDescription'), miMute: $('miMute'), miMuteText: $('miMuteText'), miHelp: $('miHelp'), miReset: $('miReset'), miShare: $('miShare'),
      introSheet: $('introSheet'), introList: $('introList'), btnIntroStart: $('btnIntroStart'),
      helpSheet: $('helpSheet'), helpIntro: $('helpIntro'), helpList: $('helpList'), helpLearn: $('helpLearn'),
      rateSheet: $('rateSheet'), stars: $('stars'), btnSendRating: $('btnSendRating'), rateThanks: $('rateThanks'),
      btnHelp: $('btnHelp'), btnRate: $('btnRate'), btnMenu: $('btnMenu'), btnClose: $('btnClose'), toast: $('toast'),
    };
    this.tapeCtx = this.el.tapeCanvas.getContext('2d');
    this.rating = 0;
    this.narrow = window.matchMedia('(max-width: 900px)');
    this._buildBodies();
    this._buildStaticText();
    this._wire();
  }

  _buildBodies() {
    const frag = document.createDocumentFragment();
    this.bodyButtons = new Map();
    for (const key of BODIES) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'body';
      b.setAttribute('role', 'option');
      b.setAttribute('aria-selected', 'false');
      b.dataset.key = key;
      const img = document.createElement('img');
      img.className = 'body__img';
      img.alt = '';
      img.width = 48; img.height = 48;
      img.src = discPlaceholder(BODY_COLORS[key]);
      const name = document.createElement('span');
      name.className = 'body__name';
      name.textContent = BODY_NAMES[key];
      b.append(img, name);
      b.addEventListener('click', () => { sound.click(); this.actions.selectBody(key, { fromRow: true }); });
      frag.append(b);
      this.bodyButtons.set(key, b);
    }
    this.el.bodies.append(frag);
  }

  _buildStaticText() {
    this.el.menuDescription.textContent = APP_DESCRIPTION;
    this.el.helpIntro.textContent = HELP.intro;
    for (const p of HELP.points) { const li = document.createElement('li'); li.textContent = p; this.el.helpList.append(li); }
    for (const p of INTRO) { const li = document.createElement('li'); li.textContent = p; this.el.introList.append(li); }
    for (const p of HELP.learn) { const li = document.createElement('li'); li.textContent = p; this.el.helpLearn.append(li); }
    this.el.infoNote.textContent = FOOTNOTE;
    for (let i = 1; i <= 5; i += 1) {
      const s = document.createElement('button');
      s.type = 'button'; s.className = 'star'; s.setAttribute('role', 'radio'); s.setAttribute('aria-checked', 'false');
      s.setAttribute('aria-label', `${i} star${i > 1 ? 's' : ''}`);
      s.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8z"/></svg>';
      s.addEventListener('click', () => { sound.click(); this.rating = i; this._paintStars(); this.el.btnSendRating.disabled = false; });
      this.el.stars.append(s);
    }
  }

  _paintStars() {
    Array.from(this.el.stars.children).forEach((s, i) => { s.setAttribute('aria-checked', String(i + 1 === this.rating)); s.classList.toggle('lit', i < this.rating); });
  }

  _wire() {
    const { el, actions } = this;
    el.btnPlay.addEventListener('click', () => { sound.click(); actions.togglePlay(); });
    el.btnToday.addEventListener('click', () => { sound.click(); actions.goLive(); });
    el.tabs.forEach((tab) => tab.addEventListener('click', () => { sound.click(); actions.setGranularity(tab.dataset.gran); }));
    el.btnEclipse.addEventListener('click', () => { sound.click(); actions.findNextEclipse(); });
    el.chkOrbits.addEventListener('change', () => { sound.click(); actions.setOrbitPaths(el.chkOrbits.checked); });
    el.btnBack.addEventListener('click', () => { sound.click(); actions.backToSystem(); });
    el.btnInfo.addEventListener('click', () => { sound.click(); this.openFacts(); });
    el.btnIntroStart.addEventListener('click', () => { sound.click(); this.closeSheets(); });
    el.btnHelp.addEventListener('click', () => { sound.click(); this.openSheet(el.helpSheet); });
    el.btnMenu.addEventListener('click', () => { sound.click(); this.openSheet(el.menuSheet); });
    el.btnRate.addEventListener('click', () => { sound.click(); this.openSheet(el.rateSheet); });
    el.btnClose.addEventListener('click', () => { sound.click(); actions.closeApp(); });
    el.miMute.addEventListener('click', () => { const m = !sound.isMuted(); sound.setMuted(m); sound.click(); this._paintMute(); });
    el.miHelp.addEventListener('click', () => { sound.click(); this.closeSheets(); this.openSheet(el.helpSheet); });
    el.miReset.addEventListener('click', () => { sound.click(); this.closeSheets(); actions.reset(); });
    el.miShare.addEventListener('click', () => { sound.click(); actions.share(); });
    el.btnSendRating.addEventListener('click', () => { sound.click(); el.rateThanks.hidden = false; el.btnSendRating.disabled = true; setTimeout(() => this.closeSheets(), 900); });
    document.querySelectorAll('[data-close]').forEach((n) => n.addEventListener('click', () => { sound.click(); this.closeSheets(); }));
    document.querySelectorAll('[data-close-facts]').forEach((n) => n.addEventListener('click', () => { sound.click(); this.closeFacts(); }));
    el.factsScrim.addEventListener('click', () => this.closeFacts());
    el.btnFacts.addEventListener('click', () => { sound.click(); this.showFactsCard(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { this.closeSheets(); this.closeFacts(); } });
    this.narrow.addEventListener('change', () => { this.el.facts.classList.remove('open'); this.el.factsScrim.hidden = true; this.actions.onLayoutChange?.(); });

    // Scrub tape: drag moves time (drag right = earlier). A click without a drag does nothing.
    const tape = el.tape;
    let drag = null;
    tape.addEventListener('pointerdown', (e) => {
      drag = { id: e.pointerId, x: e.clientX, t: this.state.t, moved: false };
      tape.setPointerCapture(e.pointerId);
    });
    tape.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 2) return;
      drag.moved = true;
      actions.setTime(drag.t - dx / GRANULARITY[this.state.granularity].density, { scrubbing: true });
    });
    const endDrag = (e) => { if (drag && e.pointerId === drag.id) drag = null; };
    tape.addEventListener('pointerup', endDrag);
    tape.addEventListener('pointercancel', endDrag);
    tape.addEventListener('keydown', (e) => {
      const g = GRANULARITY[this.state.granularity];
      const map = { ArrowRight: g.step, ArrowLeft: -g.step, ArrowUp: g.step, ArrowDown: -g.step, PageUp: g.step * 10, PageDown: -g.step * 10 };
      if (e.key in map) { e.preventDefault(); actions.setTime(this.state.t + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); actions.setTime(astro.T_MIN); }
      else if (e.key === 'End') { e.preventDefault(); actions.setTime(astro.T_MAX); }
      else if (e.key === ' ') { e.preventDefault(); actions.togglePlay(); }
    });
    this.resizeTape();
  }

  _paintMute() {
    const m = sound.isMuted();
    this.el.miMuteText.textContent = m ? 'Unmute sound' : 'Mute sound';
    this.el.miMute.classList.toggle('muted', m);
  }

  // ---- Sheets ----
  openSheet(sheet) {
    this.closeSheets();
    sheet.hidden = false;
    this._lastFocus = document.activeElement;
    sheet.querySelector('button:not([disabled]), [tabindex]')?.focus({ preventScroll: true });
  }
  closeSheets() {
    let any = false;
    for (const s of [this.el.introSheet, this.el.menuSheet, this.el.helpSheet, this.el.rateSheet]) { if (!s.hidden) any = true; s.hidden = true; }
    if (any) this._lastFocus?.focus?.({ preventScroll: true });
  }
  // Wide screens: the facts card floats top-right and can be hidden; narrow screens: it slides up as a sheet.
  openFacts() {
    if (!this.narrow.matches) { this.showFactsCard(); return; }
    this.el.facts.classList.add('open');
    this.el.factsScrim.hidden = false;
    this.el.facts.querySelector('.facts__close')?.focus({ preventScroll: true });
  }
  closeFacts() {
    if (!this.narrow.matches) { this.hideFactsCard(); return; }
    if (!this.el.facts.classList.contains('open')) return;
    this.el.facts.classList.remove('open');
    this.el.factsScrim.hidden = true;
    this.el.btnInfo.focus({ preventScroll: true });
  }
  hideFactsCard() { this.el.facts.classList.add('hidden-card'); this.el.btnFacts.hidden = false; this.actions.onLayoutChange?.(); }
  showFactsCard() { this.el.facts.classList.remove('hidden-card'); this.el.btnFacts.hidden = true; this.actions.onLayoutChange?.(); }
  factsCardVisible() { return !this.narrow.matches && !this.el.facts.classList.contains('hidden-card'); }

  // Fill the facts panel for the selected body.
  showFacts(key) {
    const info = INFO[key];
    this.factsKey = key;
    this.el.infoKind.textContent = KIND[key] ?? 'Planet';
    this.el.infoTitle.textContent = BODY_NAMES[key];
    this.el.btnFactsText.textContent = `${BODY_NAMES[key]} facts`;
    this.el.infoText.textContent = info.text;
    this.el.infoStats.replaceChildren(...info.stats.map(([k, v]) => {
      const d = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v; dd.dataset.stat = k;
      d.append(dt, dd);
      return d;
    }));
    this.el.infoCaption.hidden = key !== 'moon';
    this._phaseBucket = null;
    this.refreshFacts(true);
  }

  // Live parts of the facts panel (Moon phase image and illumination), plus late-arriving previews.
  refreshFacts(force = false) {
    const key = this.factsKey;
    if (!key) return;
    if (key === 'moon') {
      const t = this.state.t;
      const idx = astro.moonPhaseIndex(t);
      const illum = Math.round(astro.moonIllumination(t) * 100);
      this.el.infoPhase.textContent = PHASE_NAMES[idx];
      const dd = this.el.infoStats.querySelector('dd[data-stat="Lit up"]');
      if (dd) dd.textContent = `${illum}%`;
      const bucket = Math.round(astro.moonElongation(t) * 40);
      if (force || bucket !== this._phaseBucket) {
        const url = this.actions.renderPreview('moon', { lightAngle: astro.moonElongation(t) });
        if (url) { this._phaseBucket = bucket; this.el.infoImage.src = url; }
      }
      this.el.infoImage.alt = `The Moon as seen from Earth: ${PHASE_NAMES[idx]}, ${illum}% lit.`;
    } else if (force || !this._previewDone) {
      const url = this.actions.renderPreview(key);
      if (url) { this.el.infoImage.src = url; this._previewDone = true; }
      this.el.infoImage.alt = `${BODY_NAMES[key]} close-up`;
    }
  }

  setThumbnails(map) {
    for (const [key, url] of Object.entries(map)) {
      const b = this.bodyButtons.get(key);
      if (b) b.querySelector('img').src = url;
    }
    this._previewDone = false;
    this.refreshFacts(true);
  }

  // ---- State painting ----
  paintPlay(playing) {
    this.el.btnPlay.setAttribute('aria-pressed', String(playing));
    this.el.btnPlay.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }
  paintLive(live) {
    this.el.btnToday.setAttribute('aria-pressed', String(live));
    this.el.btnToday.textContent = live ? 'Live' : 'Now';
    this.el.btnToday.title = live ? 'Following the real clock' : 'Jump to the present moment';
  }
  paintGranularity(g) {
    this.el.tabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.gran === g)));
    this.drawTape();
  }
  paintSelection(key, scroll = true) {
    for (const [k, b] of this.bodyButtons) b.setAttribute('aria-selected', String(k === key));
    const b = this.bodyButtons.get(key);
    if (b && scroll) b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    this._previewDone = false;
    this.showFacts(key);
  }
  paintView(view) {
    this.el.app.dataset.view = view;
    this.el.btnBack.hidden = view === 'system';
  }
  paintDate(t) {
    const s = formatShort(t);
    if (s !== this._lastDate) { this._lastDate = s; this.el.dateOut.textContent = s; }
    const c = formatClock(t);
    if (c !== this._lastClock) { this._lastClock = c; this.el.timeOut.textContent = c; }
    this.el.tape.setAttribute('aria-valuenow', t.toFixed(2));
    this.el.tape.setAttribute('aria-valuetext', `${formatLong(t)}, ${c}`);
    this.drawTape();
  }
  paintBadge(ev) {
    const text = ev ? (ev.kind === 'solar' ? 'Solar eclipse' : 'Lunar eclipse') : '';
    if (text !== this._badge) {
      this._badge = text;
      this.el.badge.hidden = !text;
      this.el.badge.textContent = text;
    }
  }
  paintOrbits(on) { this.el.chkOrbits.checked = on; }
  setLoading(done) { this.el.loading.classList.toggle('out', done); }
  showIntro() { this.openSheet(this.el.introSheet); }
  toast(msg) {
    const t = this.el.toast;
    t.textContent = msg; t.hidden = false;
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => { t.hidden = true; }, 1800);
  }

  // Labels over the sky
  placeLabel(label, screen, text) {
    if (!screen) { label.hidden = true; return; }
    if (text && label.textContent !== text) label.textContent = text;
    label.hidden = false;
    label.style.transform = `translate(${screen.x.toFixed(1)}px, ${screen.y.toFixed(1)}px) translate(-50%, -100%)`;
    label.style.left = '0'; label.style.top = '0';
  }

  // ---- Tape ----
  resizeTape() {
    const c = this.el.tapeCanvas;
    const r = this.el.tape.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = Math.max(1, Math.round(r.width * dpr));
    c.height = Math.max(1, Math.round(r.height * dpr));
    this.tapeDpr = dpr;
    this.tapeW = r.width; this.tapeH = r.height;
    this.drawTape();
  }
  drawTape() {
    const ctx = this.tapeCtx;
    if (!ctx || !this.tapeW) return;
    const { t, granularity } = this.state;
    const density = GRANULARITY[granularity].density;
    const dpr = this.tapeDpr, w = this.tapeW, h = this.tapeH;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(167,175,220,0.25)';
    ctx.lineWidth = 1 / dpr;
    ctx.beginPath(); ctx.moveTo(0, Math.round(h * 0.5) + 0.5 / dpr); ctx.lineTo(w, Math.round(h * 0.5) + 0.5 / dpr); ctx.stroke();
    const minor = 12, major = 72;
    const offset = -((t * density) % major);
    const centre = w / 2;
    const px = (x) => Math.round(x * dpr) / dpr + 0.5 / dpr;
    for (let x = ((centre + offset) % minor) - minor; x < w + minor; x += minor) {
      const rel = Math.round((x - centre - offset) / minor);
      const isMajor = ((rel % 6) + 6) % 6 === 0;
      const len = isMajor ? h * 0.62 : h * 0.26;
      ctx.strokeStyle = isMajor ? 'rgba(238,240,255,0.95)' : 'rgba(167,175,220,0.5)';
      ctx.beginPath();
      ctx.moveTo(px(x), h / 2 - len / 2);
      ctx.lineTo(px(x), h / 2 + len / 2);
      ctx.stroke();
    }
  }
}
