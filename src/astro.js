// Time model, Keplerian planet positions, simplified lunar theory and eclipse search.
import { PLANETS, orbitRadius } from './data.js';

const TAU = Math.PI * 2;
const RAD = Math.PI / 180;

export const J2000_MS = Date.UTC(2000, 0, 1, 12);
export const dateToT = (date) => (date.getTime() - J2000_MS) / 864e5;
export const tToDate = (t) => new Date(J2000_MS + 864e5 * t);
export const T_MIN = dateToT(new Date(Date.UTC(1900, 0, 1)));
export const T_MAX = dateToT(new Date(Date.UTC(2100, 11, 31)));
export const clampT = (t) => Math.min(T_MAX, Math.max(T_MIN, t));
export const todayT = () => {
  const now = new Date();
  return dateToT(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12)));
};

const wrap = (a) => ((a % TAU) + TAU) % TAU;
const wrapSigned = (a) => { const w = wrap(a); return w > Math.PI ? w - TAU : w; };

// Ecliptic (x, y, z with z = north) to scene (y up).
const toScene = ({ x, y, z }) => ({ x, y: z, z: -y });

function solveKepler(M, e) {
  const m = wrap(M);
  let E = e > 0.8 ? Math.PI : m;
  for (let i = 0; i < 5; i += 1) E -= (E - e * Math.sin(E) - m) / (1 - e * Math.cos(E));
  return E;
}

export function planetPosition(p, t) {
  const M = p.L0 - p.node - p.peri + (TAU * t) / p.periodDays;
  const E = solveKepler(M, p.e);
  const a = orbitRadius(p.a);
  const b = a * Math.sqrt(1 - p.e * p.e);
  const xo = a * (Math.cos(E) - p.e);
  const yo = b * Math.sin(E);
  const cw = Math.cos(p.peri), sw = Math.sin(p.peri);
  const x1 = xo * cw - yo * sw;
  const y1 = xo * sw + yo * cw;
  const ci = Math.cos(p.incl), si = Math.sin(p.incl);
  const y2 = y1 * ci;
  const z2 = y1 * si;
  const cn = Math.cos(p.node), sn = Math.sin(p.node);
  return toScene({ x: x1 * cn - y2 * sn, y: x1 * sn + y2 * cn, z: z2 });
}

// Points along the orbit ring for drawing (eccentric anomaly sweep).
export function orbitPoints(p, segments = 256) {
  const pts = [];
  const a = orbitRadius(p.a);
  const b = a * Math.sqrt(1 - p.e * p.e);
  for (let i = 0; i < segments; i += 1) {
    const E = (TAU * i) / segments;
    const xo = a * (Math.cos(E) - p.e);
    const yo = b * Math.sin(E);
    const cw = Math.cos(p.peri), sw = Math.sin(p.peri);
    const x1 = xo * cw - yo * sw;
    const y1 = xo * sw + yo * cw;
    const ci = Math.cos(p.incl), si = Math.sin(p.incl);
    const y2 = y1 * ci, z2 = y1 * si;
    const cn = Math.cos(p.node), sn = Math.sin(p.node);
    pts.push(toScene({ x: x1 * cn - y2 * sn, y: x1 * sn + y2 * cn, z: z2 }));
  }
  return pts;
}

// Pole direction in scene space from J2000 right ascension / declination.
const OBLIQUITY = 23.4392911 * RAD;
export function poleToScene({ ra, dec }) {
  const x = Math.cos(dec) * Math.cos(ra);
  const y = Math.cos(dec) * Math.sin(ra);
  const z = Math.sin(dec);
  const ey = Math.cos(OBLIQUITY) * y + Math.sin(OBLIQUITY) * z;
  const ez = -Math.sin(OBLIQUITY) * y + Math.cos(OBLIQUITY) * z;
  return toScene({ x, y: ey, z: ez });
}
export function equatorToScene(ra) {
  // A direction in the planet's equator (vernal-equinox node), for the prime meridian basis.
  const x = -Math.sin(ra), y = Math.cos(ra), z = 0;
  const ey = Math.cos(OBLIQUITY) * y + Math.sin(OBLIQUITY) * z;
  const ez = -Math.sin(OBLIQUITY) * y + Math.cos(OBLIQUITY) * z;
  return toScene({ x, y: ey, z: ez });
}

export function spinAngle(p, t) {
  return wrap(p.meridian + (TAU * t) / p.rotationDays);
}

// ---- Lunar theory (mean elements in degrees, rates per day) ----
const EL = {
  D: { base: 297.8501921, rate: 12.19074912 }, // mean elongation Moon - Sun
  N: { base: 125.04452, rate: -0.05295377 },    // ascending node
  F: { base: 93.272095, rate: 13.22935024 },    // argument of latitude
  Mm: { base: 134.9633964, rate: 13.06499295 }, // Moon mean anomaly
  Ms: { base: 357.5291092, rate: 0.98560028 },  // Sun mean anomaly
};
export const SYNODIC_DAYS = 360 / EL.D.rate;
export const MOON_INCLINATION = 5.128 * RAD;
const elem = (el, t) => wrap((el.base + el.rate * t) * RAD);

export const meanElongation = (t) => elem(EL.D, t);
export const lunarNode = (t) => elem(EL.N, t);

// True elongation of the Moon from the Sun (radians), i.e. the phase angle.
export function moonElongation(t) {
  const Mm = elem(EL.Mm, t), Ms = elem(EL.Ms, t);
  return wrap(meanElongation(t) + (6.289 * Math.sin(Mm) - 1.915 * Math.sin(Ms)) * RAD);
}
function moonElongationRate(t) {
  const Mm = elem(EL.Mm, t), Ms = elem(EL.Ms, t);
  return (EL.D.rate + 6.289 * Math.cos(Mm) * (EL.Mm.rate * RAD) - 1.915 * Math.cos(Ms) * (EL.Ms.rate * RAD)) * RAD;
}
export function moonLatitude(t) {
  const F = elem(EL.F, t), Mm = elem(EL.Mm, t), D = meanElongation(t);
  return (5.128 * Math.sin(F) + 0.2806 * Math.sin(Mm + F) + 0.2777 * Math.sin(Mm - F) + 0.1732 * Math.sin(2 * D - F)) * RAD;
}

// Find the date near `nearT` at which the Moon has the given elongation.
export function solveMoonTime(phaseRad, nearT) {
  let t = nearT + (wrapSigned(phaseRad - moonElongation(nearT)) / TAU) * SYNODIC_DAYS;
  for (let i = 0; i < 3; i += 1) t -= wrapSigned(moonElongation(t) - phaseRad) / moonElongationRate(t);
  return t;
}

export function moonIllumination(t) {
  return (1 - Math.cos(moonElongation(t))) / 2;
}
export function moonPhaseIndex(t) {
  const c = moonElongation(t);
  const near = (x) => Math.abs(c - x) < 0.15;
  if (c < 0.15 || c > TAU - 0.15) return 0;
  if (near(Math.PI / 2)) return 2;
  if (near(Math.PI)) return 4;
  if (near((3 * Math.PI) / 2)) return 6;
  if (c < Math.PI / 2) return 1;
  if (c < Math.PI) return 3;
  if (c < (3 * Math.PI) / 2) return 5;
  return 7;
}

// Moon position around Earth in scene space (orbit tilted about the node line).
export function moonPosition(earth, t, ringRadius) {
  const sunDir = -Math.atan2(-earth.z, -earth.x); // angle of Sun as seen from Earth, xz-plane
  const n = sunDir + moonElongation(t);
  const node = lunarNode(t);
  const i = -n, o = -node;
  const s = Math.cos(MOON_INCLINATION), l = Math.sin(MOON_INCLINATION);
  const c = n - node, d = Math.cos(c);
  return {
    x: earth.x + ringRadius * (Math.cos(i) * s + Math.cos(o) * d * (1 - s)),
    y: earth.y + ringRadius * Math.sin(c) * l,
    z: earth.z + ringRadius * (Math.sin(i) * s + Math.sin(o) * d * (1 - s)),
    nodeAngle: o,
  };
}

// ---- Eclipses ----
const SOLAR_LAT_LIMIT = 1.5 * RAD;
const LUNAR_LAT_LIMIT = 1.0 * RAD;
function lunationEvent(k) {
  const target = wrap(k * Math.PI); // 0 = new moon, PI = full moon
  let t = (180 * k - EL.D.base) / EL.D.rate;
  for (let i = 0; i < 3; i += 1) t -= wrapSigned(moonElongation(t) - target) / moonElongationRate(t);
  const lat = Math.abs(moonLatitude(t));
  const isNew = ((k % 2) + 2) % 2 === 0;
  if (isNew && lat < SOLAR_LAT_LIMIT) return { t, kind: 'solar' };
  if (!isNew && lat < LUNAR_LAT_LIMIT) return { t, kind: 'lunar' };
  return null;
}
const nearestK = (t) => Math.round((EL.D.base + EL.D.rate * t) / 180);

// Eclipse within ±0.5 day of t, or null.
export function eclipseAt(t) {
  const k0 = nearestK(t);
  for (const k of [k0 - 1, k0, k0 + 1]) {
    const ev = lunationEvent(k);
    if (ev && Math.abs(ev.t - t) <= 0.5) return ev;
  }
  return null;
}

export function nextEclipseAfter(t) {
  let k = nearestK(t) - 1;
  for (let i = 0; i < 400; i += 1) {
    k += 1;
    const ev = lunationEvent(k);
    if (ev && ev.t > t + 0.5 && ev.t <= T_MAX) return ev;
  }
  return null;
}

export const PLANET_LIST = PLANETS;
