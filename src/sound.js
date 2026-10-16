// UI sounds generated with the Web Audio API: a short click and a whoosh.
let ctx = null;
let muted = false;

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function noiseBuffer(ac, seconds) {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;
  return buf;
}

export function setMuted(m) { muted = m; }
export function isMuted() { return muted; }

export function click() {
  if (muted) return;
  const ac = ensure();
  if (!ac) return;
  const t0 = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1500, t0);
  osc.frequency.exponentialRampToValueAtTime(700, t0 + 0.05);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 0.07);

  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, 0.04);
  const hp = ac.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 3000;
  const ng = ac.createGain();
  ng.gain.setValueAtTime(0.08, t0);
  ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);
  src.connect(hp).connect(ng).connect(ac.destination);
  src.start(t0);
}

export function whoosh() {
  if (muted) return;
  const ac = ensure();
  if (!ac) return;
  const t0 = ac.currentTime;
  const dur = 0.75;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, dur);
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 1.1;
  bp.frequency.setValueAtTime(260, t0);
  bp.frequency.exponentialRampToValueAtTime(1600, t0 + dur * 0.45);
  bp.frequency.exponentialRampToValueAtTime(380, t0 + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.22, t0 + dur * 0.3);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(bp).connect(g).connect(ac.destination);
  src.start(t0);
  src.stop(t0 + dur);
}

export function unlock() { ensure(); }
