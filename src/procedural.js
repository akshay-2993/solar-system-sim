// Procedurally generated textures (canvas 2D) so no extra image files are needed.
import * as THREE from 'three';

// Tileable 2D value noise (wraps horizontally).
function makeNoise(seed = 1) {
  const perm = new Uint8Array(512);
  let s = seed >>> 0 || 1;
  const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 10000) / 10000; };
  const base = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i -= 1) { const j = Math.floor(rnd() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
  for (let i = 0; i < 512; i += 1) perm[i] = base[i & 255];
  const grad = new Float32Array(256);
  for (let i = 0; i < 256; i += 1) grad[i] = rnd();
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  // period: number of lattice cells across the wrap in x
  return function noise(x, y, periodX) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const X0 = ((xi % periodX) + periodX) % periodX, X1 = (X0 + 1) % periodX;
    const Y0 = yi & 255, Y1 = (yi + 1) & 255;
    const v00 = grad[perm[perm[X0] + Y0]], v10 = grad[perm[perm[X1] + Y0]];
    const v01 = grad[perm[perm[X0] + Y1]], v11 = grad[perm[perm[X1] + Y1]];
    const u = fade(xf), v = fade(yf);
    return (v00 * (1 - u) + v10 * u) * (1 - v) + (v01 * (1 - u) + v11 * u) * v;
  };
}

function fbm(noise, x, y, period, octaves = 5, lac = 2, gain = 0.5) {
  let amp = 0.5, sum = 0, norm = 0, p = period, fx = x, fy = y;
  for (let i = 0; i < octaves; i += 1) {
    sum += amp * noise(fx, fy, p);
    norm += amp;
    amp *= gain; fx *= lac; fy *= lac; p *= lac;
  }
  return sum / norm;
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const mixRGB = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

function paint(width, height, fn) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(width, height);
  const d = img.data;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a = 255] = fn(x / width, y / height, x, y);
      const o = (y * width + x) * 4;
      d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = a;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

function toTexture(canvas, { srgb = true, repeatX = false } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = repeatX ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// Banded gas giant helper: latitude bands warped by turbulence.
function gasGiant({ width, height, seed, bands, warp, turbulence, grain, stops, spot }) {
  const noise = makeNoise(seed);
  const period = 6;
  const canvas = paint(width, height, (u, v) => {
    const w = (fbm(noise, u * period, v * 3 + 7, period, 4) - 0.5) * warp;
    const turb = (fbm(noise, u * period * 3 + 11, v * 9, period * 3, 5) - 0.5) * turbulence;
    let lat = v + w * 0.08 + turb * 0.02;
    let band = 0;
    for (const b of bands) band += b.amp * Math.sin(lat * Math.PI * 2 * b.freq + b.phase);
    let tone = clamp01(0.5 + band + (fbm(noise, u * period * 8 + 3, v * 24, period * 8, 3) - 0.5) * grain);
    let rgb = stops[0].c;
    for (let i = 1; i < stops.length; i += 1) {
      const s0 = stops[i - 1], s1 = stops[i];
      if (tone >= s0.t && tone <= s1.t) { rgb = mixRGB(s0.c, s1.c, (tone - s0.t) / (s1.t - s0.t || 1)); break; }
      if (tone > s1.t) rgb = s1.c;
    }
    if (spot) {
      const dx = (u - spot.u) * 2, dy = (v - spot.v) * 1.25;
      const r = Math.hypot(dx / spot.rx, dy / spot.ry);
      if (r < 1) rgb = mixRGB(rgb, spot.c, (1 - r * r) * spot.strength);
    }
    return rgb;
  });
  return canvas;
}

export function venusTexture() {
  const noise = makeNoise(42);
  const period = 8;
  const cream = [238, 214, 160], tan = [214, 176, 112], pale = [250, 236, 200];
  const canvas = paint(1024, 512, (u, v) => {
    const sw = (fbm(noise, u * period + v * 2.5, v * 5, period, 4) - 0.5);
    const streak = fbm(noise, u * period * 2 + sw * 2.4, v * 14 + sw, period * 2, 5);
    const band = 0.5 + 0.22 * Math.sin((v + sw * 0.1) * Math.PI * 7) + (streak - 0.5) * 0.7;
    const t = clamp01(band);
    let rgb = t < 0.5 ? mixRGB(tan, cream, t * 2) : mixRGB(cream, pale, (t - 0.5) * 2);
    const polar = Math.pow(Math.abs(v - 0.5) * 2, 6);
    rgb = mixRGB(rgb, [228, 206, 150], polar * 0.6);
    return rgb;
  });
  return toTexture(canvas);
}

export function saturnTexture() {
  const canvas = gasGiant({
    width: 1024, height: 512, seed: 7, warp: 0.5, turbulence: 0.3, grain: 0.12,
    bands: [
      { amp: 0.16, freq: 5, phase: 0.4 }, { amp: 0.09, freq: 11, phase: 1.9 },
      { amp: 0.06, freq: 19, phase: 0.2 }, { amp: 0.05, freq: 2, phase: 2.6 },
    ],
    stops: [
      { t: 0, c: [168, 140, 92] }, { t: 0.35, c: [206, 180, 124] },
      { t: 0.6, c: [232, 210, 158] }, { t: 1, c: [245, 230, 190] },
    ],
  });
  return toTexture(canvas);
}

export function uranusTexture() {
  const canvas = gasGiant({
    width: 512, height: 256, seed: 19, warp: 0.3, turbulence: 0.15, grain: 0.04,
    bands: [{ amp: 0.05, freq: 3, phase: 1.2 }, { amp: 0.03, freq: 9, phase: 0.3 }],
    stops: [
      { t: 0, c: [120, 190, 205] }, { t: 0.5, c: [152, 214, 226] }, { t: 1, c: [182, 232, 238] },
    ],
  });
  return toTexture(canvas);
}

export function neptuneTexture() {
  const canvas = gasGiant({
    width: 1024, height: 512, seed: 31, warp: 0.6, turbulence: 0.4, grain: 0.08,
    bands: [
      { amp: 0.12, freq: 4, phase: 2.1 }, { amp: 0.07, freq: 9, phase: 0.7 }, { amp: 0.04, freq: 17, phase: 1.1 },
    ],
    stops: [
      { t: 0, c: [26, 52, 150] }, { t: 0.45, c: [48, 88, 196] }, { t: 0.75, c: [86, 136, 224] }, { t: 1, c: [170, 200, 240] },
    ],
    spot: { u: 0.62, v: 0.6, rx: 0.1, ry: 0.07, c: [18, 30, 96], strength: 0.8 },
  });
  return toTexture(canvas);
}

// Saturn's rings as a 1-D radial strip: alpha and colour vary with radius.
export function saturnRingTexture() {
  const noise = makeNoise(5);
  const w = 1024;
  const canvas = paint(w, 4, (u) => {
    const r = u; // 0 = inner edge, 1 = outer edge
    let alpha = 0.85;
    // Broad structure: C ring (faint), B ring (bright), Cassini division, A ring, Encke gap.
    if (r < 0.2) alpha = 0.25 + 0.15 * r;
    else if (r < 0.69) alpha = 0.9;
    else if (r < 0.765) alpha = 0.08;
    else if (r < 0.95) alpha = 0.7;
    else alpha = 0.35 * (1 - (r - 0.95) / 0.05);
    if (r > 0.915 && r < 0.925) alpha *= 0.15;
    const fine = fbm(noise, r * 160, 0.5, 100000, 4) - 0.5;
    alpha = clamp01(alpha * (1 + fine * 0.9));
    const shade = 0.75 + fine * 0.5;
    const c = mixRGB([196, 176, 140], [238, 226, 198], clamp01(shade));
    return [c[0], c[1], c[2], Math.round(alpha * 255)];
  });
  const tex = toTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  return tex;
}

// Soft radial glow sprite.
export function glowTexture(size = 256, inner = 0.0, falloff = 1.6) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = (x + 0.5) / size - 0.5, dy = (y + 0.5) / size - 0.5;
      const r = Math.hypot(dx, dy) * 2;
      const a = r <= inner ? 1 : clamp01(Math.pow(1 - clamp01((r - inner) / (1 - inner)), falloff));
      const o = (y * size + x) * 4;
      d[o] = 255; d[o + 1] = 255; d[o + 2] = 255; d[o + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Marker dot: crisp core with a short halo.
export function markerTexture(size = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.42, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Fill the black no-data gaps of the Mercury mosaic with matching grey noise.
export function fillBlackGaps(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width; canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data;
  const w = canvas.width, h = canvas.height;
  // Mean of valid pixels per row, so poles and equator keep their own brightness.
  const rowMean = new Float32Array(h);
  for (let y = 0; y < h; y += 1) {
    let sum = 0, n = 0;
    for (let x = 0; x < w; x += 1) {
      const o = (y * w + x) * 4;
      const l = (d[o] + d[o + 1] + d[o + 2]) / 3;
      if (l > 14) { sum += l; n += 1; }
    }
    rowMean[y] = n ? sum / n : 110;
  }
  const noise = makeNoise(77);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const o = (y * w + x) * 4;
      const l = (d[o] + d[o + 1] + d[o + 2]) / 3;
      if (l <= 14) {
        const n = fbm(noise, (x / w) * 40, (y / h) * 20, 40, 5);
        const v = clamp01((rowMean[y] * (0.75 + n * 0.5)) / 255) * 255;
        d[o] = v; d[o + 1] = v; d[o + 2] = v; d[o + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

// Star field as points, with a denser band standing in for the Milky Way.
export function starField(count = 9000, radius = 140) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  let s = 12345;
  const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; };
  const bandAxis = new THREE.Vector3(0.3, 1, 0.55).normalize();
  const tmp = new THREE.Vector3();
  for (let i = 0; i < count; i += 1) {
    let u, v, keep = false;
    for (let tries = 0; tries < 8 && !keep; tries += 1) {
      u = rnd() * 2 - 1; v = rnd() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      tmp.set(r * Math.cos(v), u, r * Math.sin(v));
      const band = Math.abs(tmp.dot(bandAxis));
      keep = band > 0.22 ? rnd() < 0.6 : rnd() < 0.6 + (0.22 - band) * 3;
    }
    pos[i * 3] = tmp.x * radius; pos[i * 3 + 1] = tmp.y * radius; pos[i * 3 + 2] = tmp.z * radius;
    const mag = Math.pow(rnd(), 2.2);
    const warm = rnd();
    const c = warm < 0.2 ? [1, 0.82, 0.68] : warm < 0.75 ? [0.95, 0.96, 1] : [0.72, 0.82, 1];
    const b = 0.35 + mag * 0.65;
    col[i * 3] = c[0] * b; col[i * 3 + 1] = c[1] * b; col[i * 3 + 2] = c[2] * b;
    sizes[i] = 0.5 + mag * 1.8;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  return geo;
}
