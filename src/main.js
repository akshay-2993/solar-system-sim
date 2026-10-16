import './style.css';
import * as THREE from 'three';
import { SolarScene, Thumbnailer } from './scene.js';
import { CameraRig } from './camera.js';
import { UI, GRANULARITY } from './ui.js';
import { BODIES, BODY_NAMES } from './data.js';
import * as astro from './astro.js';
import * as sound from './sound.js';

const state = {
  t: astro.nowT(),
  live: true,          // follow the real clock while paused
  playing: false,
  granularity: 'month',
  orbitPaths: true,
  view: 'system',      // 'system' | 'planet'
  focus: null,         // planet key the camera follows ('earth' for the Earth-Moon view)
  selected: 'earth',
  hover: null,
};

const canvas = document.getElementById('sky');
const stage = document.getElementById('stage');
const scene = new SolarScene(canvas);
const rig = new CameraRig(scene.camera, scene.controls);
let thumbs = null;

const ui = new UI(state, {
  togglePlay() { setPlaying(!state.playing); },
  setTime(t, opts = {}) {
    state.t = astro.clampT(t);
    setLive(false);
    if (opts.scrubbing && state.playing) setPlaying(false);
  },
  goLive() { setPlaying(false); state.t = astro.nowT(); setLive(true); },
  setGranularity(g) { state.granularity = g; ui.paintGranularity(g); },
  setOrbitPaths(on) { state.orbitPaths = on; scene.setOrbitPaths(on); },
  selectBody(key) { selectBody(key); },
  backToSystem() { backToSystem(); },
  findNextEclipse() {
    const ev = astro.nextEclipseAfter(state.t);
    if (!ev) { ui.toast('No more eclipses before 2100'); return; }
    setPlaying(false);
    state.t = ev.t;
    setLive(false);
    // Frame Earth from the side so the Sun–Moon–Earth line reads across the screen.
    selectBody(state.selected === 'moon' ? 'moon' : 'earth', { side: 0, reframe: true });
  },
  reset() {
    setPlaying(false);
    state.t = astro.nowT();
    setLive(true);
    ui.closeFacts();
    state.granularity = 'month'; ui.paintGranularity('month');
    state.orbitPaths = true; scene.setOrbitPaths(true); ui.paintOrbits(true);
    state.selected = 'earth'; scene.setSelected('earth'); ui.paintSelection('earth');
    if (state.view !== 'system') backToSystem(); else { rig.userMoved = false; rig.flyToSystem(scene.camera.aspect); }
  },
  async share() {
    const url = location.href.split('#')[0];
    try {
      if (navigator.share) { await navigator.share({ title: document.title, url }); return; }
      await navigator.clipboard.writeText(url);
      ui.toast('Link copied');
    } catch (e) { ui.toast(url); }
  },
  closeApp() {
    // Standalone page: try to close the tab, otherwise go back.
    window.close();
    setTimeout(() => { if (history.length > 1) history.back(); else ui.toast('Nothing to close here'); }, 80);
  },
  renderPreview(key, opts) { return thumbs ? thumbs.render(key, 360, opts) : ''; },
  scrubEnd() {},
});

function setPlaying(p) {
  state.playing = p;
  ui.paintPlay(p);
  if (p) setLive(false);
}
function setLive(l) {
  if (state.live === l) return;
  state.live = l;
  ui.paintLive(l);
}

function focusPosition() {
  if (!state.focus) return null;
  return scene.bodyWorldPosition(state.focus);
}

function selectBody(key, { side = 1, reframe = false } = {}) {
  const wasFocus = state.focus;
  state.selected = key;
  scene.setSelected(key);
  ui.paintSelection(key);
  const focusKey = key === 'moon' ? 'earth' : key;
  if (focusKey !== wasFocus || reframe) {
    scene.update(state.t, 0, 0); // positions for the current date before planning the flight
    state.focus = focusKey;
    state.view = 'planet';
    scene.setViewMode('planet');
    ui.paintView('planet');
    rig.flyToBody(focusKey, scene.bodyRadius(focusKey), () => scene.bodyWorldPosition(focusKey).clone(), { side });
    sound.whoosh();
  }
}

function backToSystem() {
  if (state.view === 'system') return;
  state.focus = null;
  state.view = 'system';
  scene.setViewMode('system');
  ui.paintView('system');
  rig.flyToSystem(scene.camera.aspect);
  sound.whoosh();
}

// ---- Resize ----
function resize() {
  const r = stage.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  const area = w * h;
  const dprCap = area > 2.6e6 ? 1.25 : area > 1.6e6 ? 1.5 : 2;
  const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
  scene.resize(w, h, dpr);
  rig.reframeSystem(w / h);
  ui.resizeTape();
}
const ro = new ResizeObserver(() => resize());
ro.observe(stage);
ro.observe(document.getElementById('tape'));
window.addEventListener('orientationchange', () => setTimeout(resize, 120));

// ---- Pointer interaction on the sky ----
let pointerDown = null;
let moonDrag = null;
let lastMouse = null;
canvas.addEventListener('pointerdown', (e) => {
  sound.unlock();
  pointerDown = { id: e.pointerId, x: e.clientX, y: e.clientY, type: e.pointerType };
  const r = canvas.getBoundingClientRect();
  const hit = scene.pick(e.clientX - r.left, e.clientY - r.top, state.focus === 'earth');
  if (hit === 'moon' && state.focus === 'earth' && !rig.isTransitioning()) {
    moonDrag = { id: e.pointerId, wasPlaying: state.playing };
    setPlaying(false);
    scene.controls.enabled = false;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add('grabbing');
    e.stopImmediatePropagation();
    return;
  }
  if (e.pointerType !== 'touch') canvas.classList.add('grabbing');
}, { capture: true });

canvas.addEventListener('pointermove', (e) => {
  const r = canvas.getBoundingClientRect();
  const px = e.clientX - r.left, py = e.clientY - r.top;
  if (moonDrag && e.pointerId === moonDrag.id) {
    const phase = scene.moonDragPhase(px, py);
    if (phase !== null) { state.t = astro.clampT(astro.solveMoonTime(phase, state.t)); setLive(false); }
    return;
  }
  if (pointerDown && e.pointerId === pointerDown.id) {
    if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) > (pointerDown.type === 'touch' ? 10 : 5)) pointerDown.moved = true;
  }
  if (e.pointerType !== 'touch') lastMouse = { x: px, y: py };
});

const endPointer = (e) => {
  if (moonDrag && e.pointerId === moonDrag.id) {
    moonDrag = null;
    scene.controls.enabled = true;
    canvas.classList.remove('grabbing');
    return;
  }
  if (pointerDown && e.pointerId === pointerDown.id) {
    if (!pointerDown.moved && e.type === 'pointerup') {
      const r = canvas.getBoundingClientRect();
      const hit = scene.pick(e.clientX - r.left, e.clientY - r.top, state.focus === 'earth');
      if (hit) { sound.click(); selectBody(hit); }
    }
    pointerDown = null;
  }
  canvas.classList.remove('grabbing');
};
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);
canvas.addEventListener('pointerleave', () => { lastMouse = null; });

// ---- Main loop ----
let last = performance.now();
let thumbsDone = false;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  let simDays = 0;
  if (state.live && !state.playing) {
    const now = astro.nowT();
    simDays = now - state.t;
    state.t = now;
  } else if (state.playing) {
    simDays = GRANULARITY[state.granularity].rate * dt;
    const next = state.t + simDays;
    if (next >= astro.T_MAX) { state.t = astro.T_MAX; setPlaying(false); }
    else state.t = next;
  }
  scene.update(state.t, dt, simDays);
  rig.update(focusPosition());
  if (rig.isTransitioning()) scene.update(state.t, 0, 0); // refresh marker sizes for the moved camera
  scene.render();

  // Overlays
  ui.paintDate(state.t);
  ui.paintBadge(scene.eclipse && scene.eclipseStrength > 0 ? scene.eclipse : null);
  ui.refreshFacts();
  // hover
  let hover = null;
  if (lastMouse && !pointerDown && !moonDrag) hover = scene.pick(lastMouse.x, lastMouse.y, state.focus === 'earth');
  canvas.classList.toggle('pointer', !!hover);
  if (hover) ui.placeLabel(ui.el.hoverLabel, scene.project(scene.bodyWorldPosition(hover).clone().add(new THREE.Vector3(0, scene.bodyRadius(hover) * 1.6, 0))), BODY_NAMES[hover]);
  else ui.el.hoverLabel.hidden = true;
  // pinned labels in the Earth-Moon view
  const earthMoon = state.focus === 'earth' && !rig.isTransitioning();
  if (earthMoon) {
    const er = scene.bodyRadius('earth'), mr = scene.bodyRadius('moon');
    ui.placeLabel(ui.el.pinEarth, hover === 'earth' ? null : scene.project(scene.earthPos.clone().add(new THREE.Vector3(0, er * 1.5, 0))));
    ui.placeLabel(ui.el.pinMoon, hover === 'moon' ? null : scene.project(scene.moonPos.clone().add(new THREE.Vector3(0, mr * 2.2, 0))));
  } else { ui.el.pinEarth.hidden = true; ui.el.pinMoon.hidden = true; }
}

// ---- Boot ----
ui.paintPlay(false);
ui.paintLive(true);
ui.paintGranularity(state.granularity);
ui.paintSelection(state.selected, false);
ui.paintView('system');
scene.setSelected(state.selected);
resize();
rig.userMoved = false;
rig.reframeSystem(scene.camera.aspect);
requestAnimationFrame(frame);

scene.load().then(() => {
  ui.setLoading(true);
  thumbs = new Thumbnailer(scene);
  const map = {};
  for (const key of BODIES) map[key] = thumbs.render(key, 112, key === 'moon' ? { lightAngle: 0.2 } : {});
  ui.setThumbnails(map);
  thumbsDone = true;
}).catch((err) => {
  console.error(err);
  ui.setLoading(true);
});

// Debug handle (harmless in production).
window.__solar = { state, scene, rig, ui, get thumbs() { return thumbs; } };
