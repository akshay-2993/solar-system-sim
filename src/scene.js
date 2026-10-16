import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLANETS, kmToUnits, MOON_RADIUS_KM, orbitRadius } from './data.js';
import * as astro from './astro.js';
import * as proc from './procedural.js';

import earthDayUrl from './assets/textures/earth-day.jpg';
import earthNightUrl from './assets/textures/earth-night.jpg';
import moonUrl from './assets/textures/moon.jpg';
import marsUrl from './assets/textures/mars.jpg';
import mercuryUrl from './assets/textures/mercury.jpg';
import jupiterUrl from './assets/textures/jupiter.jpg';
import earthCloudsUrl from './assets/textures/earth-clouds.jpg';

const TEXTURE_URLS = { earth: earthDayUrl, earthNight: earthNightUrl, earthClouds: earthCloudsUrl, moon: moonUrl, mars: marsUrl, mercury: mercuryUrl, jupiter: jupiterUrl };

const SUN_VERT = `
varying vec3 vObj; varying vec3 vN; varying vec3 vV;
void main(){
  vObj = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const SUN_FRAG = `
uniform float uTime; varying vec3 vObj; varying vec3 vN; varying vec3 vV;
float hash(vec3 p){ p = fract(p*0.3183099 + vec3(0.1,0.2,0.3)); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vnoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){ float a=0.5, s=0.0; for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.03 + vec3(1.7,9.2,4.1); a*=0.5; } return s; }
void main(){
  vec3 p = vObj; float t = uTime*0.05;
  float warp = fbm(p*3.0 + vec3(t,-t*0.7,t*0.3));
  float cells = fbm(p*9.0 + warp*1.6 + vec3(0.0,t*0.6,0.0));
  float fine  = fbm(p*30.0 + warp*2.2 - vec3(t*0.4));
  float br = 0.18 + 0.75*cells + 0.3*fine;
  float spots = fbm(p*8.5 + vec3(5.1,2.3,t*0.15));
  float spotMask = smoothstep(0.29, 0.23, spots) * smoothstep(0.3, 0.5, fbm(p*1.3+vec3(2.0,7.0,1.0)));
  vec3 hot = vec3(1.0,0.97,0.82); vec3 mid = vec3(1.0,0.60,0.14); vec3 dark = vec3(0.42,0.11,0.02);
  float b = clamp(br,0.0,1.0);
  vec3 col = mix(mid, hot, b*b);
  col = mix(col, dark, spotMask*0.5);
  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
  float limb = 0.42 + 0.58*pow(mu, 0.55);
  col = mix(col*vec3(1.0,0.58,0.28), col, pow(mu,0.4));
  gl_FragColor = vec4(col*limb*1.3, 1.0);
}`;

const ATMO_VERT = `
varying vec3 vWN; varying vec3 vVN; varying vec3 vVD;
void main(){
  vWN = normalize(mat3(modelMatrix) * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vVN = normalize(normalMatrix * normal);
  vVD = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const ATMO_FRAG = `
uniform vec3 uColor; uniform float uStrength; uniform vec3 uSunDir;
varying vec3 vWN; varying vec3 vVN; varying vec3 vVD;
void main(){
  float rim = 1.0 - clamp(dot(normalize(vVN), normalize(vVD)), 0.0, 1.0);
  float lit = clamp(dot(normalize(vWN), uSunDir)*0.9 + 0.35, 0.0, 1.0);
  float a = uStrength * pow(rim, 2.4) * lit * 2.2;
  gl_FragColor = vec4(uColor, clamp(a, 0.0, 0.85));
}`;

const STAR_VERT = `
attribute float aSize; varying vec3 vC; uniform float uPR;
void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = aSize * uPR; gl_Position = projectionMatrix * mv; }`;
const STAR_FRAG = `
varying vec3 vC;
void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c)*2.0; float a = smoothstep(1.0, 0.25, d); gl_FragColor = vec4(vC, a); }`;

const RING_VERT = `
varying vec2 vUv; varying vec3 vWP; varying vec3 vWN;
void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position,1.0); vWP = wp.xyz; vWN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * wp; }`;
const RING_FRAG = `
uniform sampler2D map; uniform vec3 uSunDir; uniform vec3 uPlanetPos; uniform float uPlanetRadius;
varying vec2 vUv; varying vec3 vWP; varying vec3 vWN;
void main(){
  vec4 c = texture2D(map, vUv); if (c.a < 0.02) discard;
  vec3 L = normalize(uSunDir);
  float ndl = dot(normalize(vWN), L);
  float lit = 0.3 + 0.7 * abs(ndl);           // both faces receive light: the unlit face glows with transmitted light
  if (ndl < 0.0) lit *= 0.8;
  // The planet's shadow across the rings.
  vec3 d = uPlanetPos - vWP; float t = dot(d, L);
  float shadow = 1.0;
  if (t > 0.0) { float perp = length(d - t * L); shadow = smoothstep(uPlanetRadius * 0.94, uPlanetRadius * 1.03, perp); shadow = 0.08 + 0.92 * shadow; }
  gl_FragColor = vec4(c.rgb * lit * shadow, c.a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const BELT_VERT = `
uniform float uPR; uniform float uSize; uniform float uHalfH;
void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); float d = max(0.001, -mv.z);
  gl_PointSize = clamp(uSize * uHalfH / d, 1.2, 4.5) * uPR; gl_Position = projectionMatrix * mv; }`;
const BELT_FRAG = `
uniform vec3 uColor; uniform float uOpacity;
void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard; float a = smoothstep(1.0, 0.35, r) * uOpacity; gl_FragColor = vec4(uColor, a); }`;

const smootherstep = (x) => { const t = THREE.MathUtils.clamp(x, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

export class SolarScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070a1a);
    this.camera = new THREE.PerspectiveCamera(31, 1, 0.01, 400);
    this.camera.position.set(6.8, 6.2, 17.2);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.7;
    this.controls.zoomSpeed = 0.9;
    this.controls.enablePan = false;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
    this.controls.minDistance = 0.55;
    this.controls.maxDistance = 140;

    this.sunDir = new THREE.Vector3(0, 0, 1);
    this.planets = new Map();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.orbitPathsVisible = true;
    this.selectedKey = null;
    this.viewMode = 'system';
    this.earthPos = new THREE.Vector3();
    this.earthRadius = kmToUnits(6371);
    this.moonPos = new THREE.Vector3();
    this.moonRadius = kmToUnits(MOON_RADIUS_KM);
    this.moonRing = 3.2 * this.earthRadius;
    this.eclipse = null;
    this.eclipseStrength = 0;
    this.sunPos = new THREE.Vector3(0, 0, 0);
    this.sunScreenRadius = 0;

    this._buildLights();
    this._buildSun();
    this._buildStars();
    this._buildBelts();
    this._buildPlanets();
    this._buildMoon();
    this._buildCones();
  }

  _buildLights() {
    this.sunLight = new THREE.PointLight(0xfff1d6, 3.4, 0, 0);
    this.scene.add(this.sunLight);
    this.scene.add(new THREE.HemisphereLight(0x5a6aa8, 0x1a1630, 0.75));
    this.scene.add(new THREE.AmbientLight(0x4a5590, 0.25));
  }

  _buildSun() {
    this.sunMat = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 } }, vertexShader: SUN_VERT, fragmentShader: SUN_FRAG, toneMapped: false });
    this.sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 72, 48), this.sunMat);
    this.scene.add(this.sun);
    const glowTex = proc.glowTexture(256, 0.0, 2.6);
    const g1 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffc46a, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
    g1.scale.setScalar(2.2);
    const g2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xff8a3e, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }));
    g2.scale.setScalar(4.2);
    this.scene.add(g1, g2);
    this.sunGlows = [g1, g2];
  }

  _buildStars() {
    const geo = proc.starField(9000, 140);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uPR: { value: Math.min(2, window.devicePixelRatio || 1) } },
      vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, vertexColors: true, transparent: true, depthWrite: false,
    });
    this.stars = new THREE.Points(geo, mat);
    this.scene.add(this.stars);
  }

  _buildBelts() {
    const belt = (count, auMin, auMax, size, opacity, color, seed) => {
      const pos = new Float32Array(count * 3);
      let s = seed;
      const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; };
      for (let i = 0; i < count; i += 1) {
        const au = auMin + rnd() * (auMax - auMin);
        const r = orbitRadius(au) * (0.98 + rnd() * 0.04);
        const a = rnd() * Math.PI * 2;
        const y = (rnd() + rnd() + rnd() - 1.5) * 0.045 * r;
        pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = y; pos[i * 3 + 2] = Math.sin(a) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.ShaderMaterial({
        uniforms: { uPR: { value: 1 }, uSize: { value: size }, uHalfH: { value: 400 }, uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } },
        vertexShader: BELT_VERT, fragmentShader: BELT_FRAG, transparent: true, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      this.beltMaterials.push(mat);
      return pts;
    };
    this.beltMaterials = [];
    this.scene.add(belt(3200, 2.1, 3.3, 0.012, 0.6, 0xd8d2e8, 1234));
    this.scene.add(belt(2400, 30, 50, 0.024, 0.3, 0xb4c0e8, 999));
  }

  _planetMaterial(p) {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: p.roughness, metalness: 0 });
    if (p.key === 'earth') {
      mat.emissive = new THREE.Color(0xffffff);
      mat.emissiveIntensity = 0.0;
      mat.userData.sunDir = { value: new THREE.Vector3(0, 0, 1) };
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uSunDir = mat.userData.sunDir;
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', '#include <common>\nvarying vec3 vWNormal;')
          .replace('#include <defaultnormal_vertex>', '#include <defaultnormal_vertex>\nvWNormal = normalize(mat3(modelMatrix) * normal);');
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying vec3 vWNormal; uniform vec3 uSunDir;')
          .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n{ float night = smoothstep(0.12, -0.18, dot(normalize(vWNormal), uSunDir)); totalEmissiveRadiance *= night * 1.6; }');
      };
    }
    return mat;
  }

  _buildPlanets() {
    const ringGeo = new THREE.SphereGeometry(1, 64, 48);
    const markerTex = proc.markerTexture(64);
    for (const p of PLANETS) {
      const root = new THREE.Group();
      const orient = new THREE.Group();
      // Orientation from the pole direction and the equator node.
      const up = new THREE.Vector3().copy(astro.poleToScene(p.pole)).normalize();
      const nodeDir = new THREE.Vector3().copy(astro.equatorToScene(p.pole.ra)).normalize();
      const side = new THREE.Vector3().crossVectors(up, nodeDir).normalize();
      const basis = new THREE.Matrix4().makeBasis(nodeDir, up, side.clone().negate());
      orient.quaternion.setFromRotationMatrix(basis).normalize();
      const mat = this._planetMaterial(p);
      const surface = new THREE.Mesh(ringGeo, mat);
      orient.add(surface);
      let atmo = null;
      if (p.atmosphere) {
        const am = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(p.atmosphere.color) }, uStrength: { value: p.atmosphere.strength }, uSunDir: { value: this.sunDir } },
          vertexShader: ATMO_VERT, fragmentShader: ATMO_FRAG, transparent: true, depthWrite: false, side: THREE.FrontSide, blending: THREE.AdditiveBlending,
        });
        atmo = new THREE.Mesh(ringGeo, am);
        atmo.scale.setScalar(p.atmosphere.scale);
        orient.add(atmo);
      }
      let rings = null;
      if (p.rings) {
        const r = kmToUnits(p.radiusKm);
        const inner = kmToUnits(p.rings.innerKm) / r, outer = kmToUnits(p.rings.outerKm) / r;
        const geo = new THREE.RingGeometry(inner, outer, 180, 1);
        // Remap UVs so u runs radially.
        const posAttr = geo.attributes.position, uv = geo.attributes.uv;
        for (let i = 0; i < posAttr.count; i += 1) {
          const x = posAttr.getX(i), y = posAttr.getY(i);
          const rr = Math.hypot(x, y);
          uv.setXY(i, (rr - inner) / (outer - inner), 0.5);
        }
        const rm = new THREE.ShaderMaterial({
          uniforms: { map: { value: proc.saturnRingTexture() }, uSunDir: { value: new THREE.Vector3(0, 0, 1) }, uPlanetPos: { value: new THREE.Vector3() }, uPlanetRadius: { value: r } },
          vertexShader: RING_VERT, fragmentShader: RING_FRAG, transparent: true, side: THREE.DoubleSide, depthWrite: false,
        });
        rings = new THREE.Mesh(geo, rm);
        rings.rotation.x = -Math.PI / 2;
        orient.add(rings);
      }
      root.add(orient);
      this.scene.add(root);

      // Orbit ring
      const pts = astro.orbitPoints(p, 360).map((v) => new THREE.Vector3(v.x, v.y, v.z));
      const og = new THREE.BufferGeometry().setFromPoints(pts);
      const om = new THREE.LineBasicMaterial({ color: 0xbfc8ff, transparent: true, opacity: 0.3, depthWrite: false });
      const orbit = new THREE.LineLoop(og, om);
      this.scene.add(orbit);

      // Marker sprite
      const ringed = p.key === 'saturn';
      const mm = new THREE.SpriteMaterial({ map: ringed ? proc.saturnMarkerTexture(96) : markerTex, color: ringed ? 0xffffff : new THREE.Color(p.marker), transparent: true, opacity: 0.9, depthWrite: false, depthTest: true });
      const marker = new THREE.Sprite(mm);
      this.scene.add(marker);

      this.planets.set(p.key, { p, root, orient, surface, mat, atmo, rings, orbit, marker, radius: kmToUnits(p.radiusKm), pos: new THREE.Vector3(), screenRadius: 0 });
    }
  }

  _buildMoon() {
    this.moonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0 });
    this.moonMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), this.moonMat);
    this.moonPivot = new THREE.Group();
    this.moonMesh.rotation.y = Math.PI / 2; // near side faces the pivot's +x axis
    this.moonPivot.add(this.moonMesh);
    this.scene.add(this.moonPivot);

    const pts = [];
    for (let i = 0; i < 256; i += 1) { const a = (i / 256) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a))); }
    this.moonOrbit = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xbfc8ff, transparent: true, opacity: 0.45, depthWrite: false }));
    this.scene.add(this.moonOrbit);
    this.moonMarker = new THREE.Sprite(new THREE.SpriteMaterial({ map: proc.markerTexture(64), color: 0xd8dce6, transparent: true, opacity: 0.9, depthWrite: false }));
    this.scene.add(this.moonMarker);
  }

  _buildCones() {
    const geo = new THREE.CylinderGeometry(1, 0.34, 1, 48, 1, true);
    geo.translate(0, -0.5, 0); // wide end at the shadowing body, narrowing along -y
    const coneMat = () => new THREE.MeshBasicMaterial({ color: 0x9aa0e6, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
    this.solarCone = new THREE.Mesh(geo, coneMat());
    this.lunarCone = new THREE.Mesh(geo, coneMat());
    this.solarCone.visible = false; this.lunarCone.visible = false;
    this.scene.add(this.solarCone, this.lunarCone);
  }

  async load(onProgress) {
    const loader = new THREE.TextureLoader();
    const loadTex = (url) => new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject));
    const entries = Object.entries(TEXTURE_URLS);
    let done = 0;
    const textures = {};
    await Promise.all(entries.map(async ([key, url]) => {
      try {
        const tex = await loadTex(url);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
        if (key === 'mercury') {
          const canvas = proc.fillBlackGaps(tex.image);
          const t2 = new THREE.CanvasTexture(canvas);
          t2.colorSpace = THREE.SRGBColorSpace;
          t2.anisotropy = tex.anisotropy;
          textures[key] = t2;
        } else textures[key] = tex;
      } catch (e) {
        console.warn('texture failed', key, e);
      }
      done += 1;
      onProgress?.(done / entries.length);
    }));
    textures.venus = proc.venusTexture();
    textures.saturn = proc.saturnTexture();
    textures.uranus = proc.uranusTexture();
    textures.neptune = proc.neptuneTexture();
    for (const [key, entry] of this.planets) {
      const tex = textures[key];
      if (tex) { entry.mat.map = tex; entry.mat.needsUpdate = true; }
      if (key === 'earth' && textures.earthNight) { entry.mat.emissiveMap = textures.earthNight; entry.mat.emissiveIntensity = 1; entry.mat.needsUpdate = true; }
      if (key === 'earth' && tex) {
        // Oceans are smoother than land, so sunlight glints off them.
        entry.mat.roughnessMap = proc.oceanRoughnessMap(tex.image);
        entry.mat.roughness = 1;
        entry.mat.needsUpdate = true;
        if (textures.earthClouds) {
          const cm = new THREE.MeshStandardMaterial({ color: 0xffffff, alphaMap: textures.earthClouds, transparent: true, depthWrite: false, roughness: 1, metalness: 0, opacity: 0.9 });
          const clouds = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), cm);
          clouds.scale.setScalar(1.012);
          entry.surface.add(clouds);
          entry.clouds = clouds;
        }
      }
      if ((key === 'mercury' || key === 'mars') && tex) { entry.mat.bumpMap = tex; entry.mat.bumpScale = entry.radius * 0.02; entry.mat.needsUpdate = true; }
    }
    if (textures.moon) { this.moonMat.bumpMap = textures.moon; this.moonMat.bumpScale = this.moonRadius * 0.03; }
    if (textures.moon) { this.moonMat.map = textures.moon; this.moonMat.needsUpdate = true; }
    this.textures = textures;
  }

  // Keep the scene centred in the part of the canvas not covered by floating panels.
  setInsets({ top = 0, bottom = 0, right = 0, left = 0 } = {}) {
    this.insets = { top, bottom, right, left };
    this._applyViewOffset();
  }
  _applyViewOffset() {
    const { width: w, height: h } = this;
    if (!w || !h) return;
    const i = this.insets || { top: 0, bottom: 0, right: 0, left: 0 };
    const dx = i.right - i.left, dy = i.bottom - i.top;
    this.camera.setViewOffset(w + Math.abs(dx), h + Math.abs(dy), Math.max(0, dx), Math.max(0, dy), w, h);
    this.camera.updateProjectionMatrix();
  }
  visibleAspect() {
    const i = this.insets || { top: 0, bottom: 0, right: 0, left: 0 };
    return Math.max(1, this.width - i.left - i.right) / Math.max(1, this.height - i.top - i.bottom);
  }

  resize(width, height, dpr) {
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.width = width; this.height = height;
    this._applyViewOffset();
    this.stars.material.uniforms.uPR.value = dpr;
    for (const m of this.beltMaterials) { m.uniforms.uPR.value = dpr; m.uniforms.uHalfH.value = height / 2; }
  }

  setOrbitPaths(visible) { this.orbitPathsVisible = visible; }
  setSelected(key) { this.selectedKey = key; }
  setViewMode(mode) { this.viewMode = mode; }

  // Advance the scene to time t (days from J2000); dtReal in seconds for sun animation.
  update(t, dtReal, playingSimDays) {
    this.sunMat.uniforms.uTime.value += dtReal;
    const cam = this.camera;
    const fovTan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const inPlanetView = this.viewMode === 'planet';
    for (const [key, e] of this.planets) {
      const pos = astro.planetPosition(e.p, t);
      e.pos.set(pos.x, pos.y, pos.z);
      e.root.position.copy(e.pos);
      e.root.scale.set(e.radius, e.radius * e.p.polarScale, e.radius);
      // Spin: keep continuous when playing, snap to the exact angle otherwise.
      const target = astro.spinAngle(e.p, t);
      if (this.reducedMotion || playingSimDays === 0) e.surface.rotation.y = target;
      else {
        const maxStep = 0.35 * Math.PI * 2 * dtReal;
        const want = (Math.PI * 2 * playingSimDays) / e.p.rotationDays;
        const step = Math.sign(want) * Math.min(Math.abs(want), maxStep);
        e.surface.rotation.y = (e.surface.rotation.y + step) % (Math.PI * 2);
      }
      if (e.clouds) e.clouds.rotation.y = (e.clouds.rotation.y + playingSimDays * 0.6 + dtReal * 0.004) % (Math.PI * 2);
      if (e.atmo) e.atmo.material.uniforms.uSunDir.value.copy(e.pos).negate().normalize();
      if (e.rings) { const u = e.rings.material.uniforms; u.uSunDir.value.copy(e.pos).negate().normalize(); u.uPlanetPos.value.copy(e.pos); u.uPlanetRadius.value = e.radius * 0.97; }
      if (key === 'earth') {
        this.earthPos.copy(e.pos);
        e.mat.userData.sunDir.value.copy(e.pos).negate().normalize();
      }
      // Marker fade with on-screen size.
      const dist = cam.position.distanceTo(e.pos);
      const halfH = dist * fovTan;
      const screenR = (e.radius / halfH) * (this.height / 2);
      e.screenRadius = screenR;
      const ringed = key === 'saturn';
      const fade = ringed ? THREE.MathUtils.clamp((14 - screenR) / 6, 0, 1) : THREE.MathUtils.clamp((5 - screenR) / 3, 0, 1);
      if (fade > 0) {
        e.marker.visible = true;
        e.marker.position.copy(e.pos);
        e.marker.scale.setScalar(((ringed ? 30 : 11) / this.height) * 2 * halfH);
        e.marker.material.opacity = 0.9 * fade;
      } else e.marker.visible = false;
      // Orbit ring opacity
      const sel = this.selectedKey === key || (this.selectedKey === 'moon' && key === 'earth');
      e.orbit.visible = this.orbitPathsVisible;
      e.orbit.material.opacity = inPlanetView ? (sel ? 0.2 : 0.06) : (sel ? 0.7 : 0.3);
      e.orbit.material.color.set(sel ? 0x8ff0ff : 0xbfc8ff);
    }
    this._updateMoon(t, fovTan);
    const sd = cam.position.distanceTo(this.sunPos);
    this.sunScreenRadius = (0.5 / (sd * fovTan)) * (this.height / 2);
  }

  _updateMoon(t, fovTan) {
    const E = this.earthPos;
    const m = astro.moonPosition(E, t, this.moonRing);
    this.moonPos.set(m.x, m.y, m.z);
    this.moonPivot.position.copy(this.moonPos);
    this.moonPivot.scale.setScalar(this.moonRadius);
    // Tidal lock: pivot +x points at Earth.
    const toEarth = new THREE.Vector3(E.x - m.x, 0, E.z - m.z);
    if (toEarth.lengthSq() === 0) toEarth.set(1, 0, 0);
    toEarth.normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const basis = new THREE.Matrix4().makeBasis(toEarth, up, new THREE.Vector3().crossVectors(toEarth, up));
    this.moonPivot.quaternion.setFromRotationMatrix(basis);
    // Orbit ring tilted about the node line.
    this.moonOrbit.position.copy(E);
    this.moonOrbit.scale.setScalar(this.moonRing);
    const axis = new THREE.Vector3(Math.cos(m.nodeAngle), 0, Math.sin(m.nodeAngle));
    this.moonOrbit.setRotationFromAxisAngle(axis, astro.MOON_INCLINATION);
    this.moonOrbit.visible = this.orbitPathsVisible && this.viewMode === 'planet';
    this.moonOrbit.material.opacity = this.selectedKey === 'moon' ? 0.75 : 0.45;
    // Moon marker (visible only when the Moon is tiny on screen, i.e. near views of Earth)
    const dist = this.camera.position.distanceTo(this.moonPos);
    const halfH = dist * fovTan;
    const screenR = (this.moonRadius / halfH) * (this.height / 2);
    this.moonScreenRadius = screenR;
    const fade = THREE.MathUtils.clamp((5 - screenR) / 3, 0, 1);
    const earthClose = this.planets.get('earth').screenRadius > 8;
    if (fade > 0 && earthClose) {
      this.moonMarker.visible = true;
      this.moonMarker.position.copy(this.moonPos);
      this.moonMarker.scale.setScalar((9 / this.height) * 2 * halfH);
      this.moonMarker.material.opacity = 0.9 * fade;
    } else this.moonMarker.visible = false;

    // Eclipses: shadow cones and Moon tint.
    const ev = astro.eclipseAt(t);
    this.eclipse = ev;
    const p = ev ? Math.max(0, 1 - Math.abs(ev.t - t) / 0.5) : 0;
    this.eclipseStrength = p;
    const lunar = ev?.kind === 'lunar' ? p : 0;
    this.moonMat.color.setRGB(1 - 0.2 * lunar, 1 - 0.58 * lunar, 1 - 0.68 * lunar);
    if (ev?.kind === 'solar' && p > 0.02) {
      this._placeCone(this.solarCone, 0.22 * p, this.moonRadius, this.moonPos.distanceTo(E) + this.earthRadius, this.moonPos, E);
    } else this.solarCone.visible = false;
    if (ev?.kind === 'lunar' && p > 0.02) {
      this._placeCone(this.lunarCone, 0.2 * p, this.earthRadius, 1.3 * this.moonRing, E, this.moonPos);
    } else this.lunarCone.visible = false;
  }

  _placeCone(cone, opacity, radius, length, origin, toward) {
    const dir = new THREE.Vector3().subVectors(toward, origin).normalize();
    cone.visible = true;
    cone.material.opacity = opacity;
    cone.scale.set(radius, length, radius);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
    cone.position.copy(origin);
  }

  // Camera near plane follows the distance to the orbit target so close-ups stay crisp.
  updateCameraClipping() {
    const d = this.camera.position.distanceTo(this.controls.target);
    const near = THREE.MathUtils.clamp(d * 0.02, 1e-4, 0.5);
    if (Math.abs(near - this.camera.near) / near > 0.2) {
      this.camera.near = near;
      this.camera.updateProjectionMatrix();
    }
  }

  render() {
    this.updateCameraClipping();
    this.renderer.render(this.scene, this.camera);
  }

  // World-space unit vector from Earth's centre through a surface point (degrees).
  earthSurfaceDirection(latDeg, lonDeg) {
    const e = this.planets.get('earth');
    const lat = THREE.MathUtils.degToRad(latDeg), lon = THREE.MathUtils.degToRad(lonDeg);
    const v = new THREE.Vector3(Math.cos(lat) * Math.cos(lon), Math.sin(lat), -Math.cos(lat) * Math.sin(lon));
    v.applyAxisAngle(new THREE.Vector3(0, 1, 0), e.surface.rotation.y);
    return v.applyQuaternion(e.orient.quaternion).normalize();
  }

  bodyWorldPosition(key) {
    if (key === 'sun') return this.sunPos;
    if (key === 'moon') return this.moonPos;
    return this.planets.get(key)?.pos ?? null;
  }
  bodyRadius(key) {
    if (key === 'sun') return 0.5;
    if (key === 'moon') return this.moonRadius;
    return this.planets.get(key)?.radius ?? 0;
  }

  // Project a world position to CSS pixels; returns null when behind the camera.
  project(pos, out = {}) {
    const v = pos.clone().project(this.camera);
    if (v.z > 1) return null;
    out.x = (v.x + 1) / 2 * this.width;
    out.y = (1 - v.y) / 2 * this.height;
    return out;
  }

  // Screen-space hit test. Returns the body key under (px, py) or null.
  pick(px, py, includeMoon) {
    let best = null, bestD = Infinity;
    const test = (key, pos, screenR) => {
      const s = this.project(pos);
      if (!s) return;
      const d = Math.hypot(s.x - px, s.y - py);
      const hitR = Math.max(14, screenR + 6);
      if (d < hitR && d < bestD) { best = key; bestD = d; }
    };
    for (const [key, e] of this.planets) test(key, e.pos, e.screenRadius);
    test('sun', this.sunPos, this.sunScreenRadius);
    if (includeMoon) test('moon', this.moonPos, this.moonScreenRadius);
    return best;
  }

  // Intersect the pointer ray with the Moon's orbital plane around Earth.
  moonDragPhase(px, py) {
    const ndc = new THREE.Vector2((px / this.width) * 2 - 1, -(py / this.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -this.earthPos.y);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(plane, hit)) return null;
    const E = this.earthPos;
    return -Math.atan2(hit.z - E.z, hit.x - E.x) - -Math.atan2(-E.z, -E.x);
  }
}

// Renders body thumbnails and the Moon phase preview on a second, small renderer.
export class Thumbnailer {
  constructor(mainScene) {
    this.main = mainScene;
    this.canvas = document.createElement('canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(22, 1, 0.1, 20);
    this.camera.position.set(0, 0, 6);
    this.light = new THREE.DirectionalLight(0xfff1d6, 3.6);
    this.light.position.set(-3, 2, 4);
    this.scene.add(this.light, new THREE.AmbientLight(0x404a60, 0.6));
    this.geo = new THREE.SphereGeometry(1, 64, 48);
    this.holder = new THREE.Group();
    this.scene.add(this.holder);
  }

  _clear() { while (this.holder.children.length) this.holder.remove(this.holder.children[0]); }

  render(key, size, { lightAngle = null } = {}) {
    this._clear();
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setSize(size, size, false);
    const m = this.main;
    let mesh;
    if (key === 'sun') {
      mesh = new THREE.Mesh(this.geo, m.sunMat);
      mesh.rotation.y = 0.8;
    } else if (key === 'moon') {
      mesh = new THREE.Mesh(this.geo, m.moonMat.clone());
      mesh.material.color.set(0xffffff);
      mesh.rotation.y = -Math.PI / 2 + Math.PI; // near side toward the viewer
    } else {
      const e = m.planets.get(key);
      mesh = new THREE.Mesh(this.geo, e.mat.clone());
      if (key === 'earth') { mesh.material.emissiveIntensity = 0; }
      mesh.scale.set(1, e.p.polarScale, 1);
      mesh.rotation.y = key === 'earth' ? 1.9 : 1.2;
      mesh.rotation.z = -0.15;
      if (e.atmo) {
        const am = e.atmo.material.clone();
        am.uniforms.uSunDir = { value: new THREE.Vector3(-3, 2, 4).normalize() };
        am.uniforms.uColor = { value: e.atmo.material.uniforms.uColor.value.clone() };
        am.uniforms.uStrength = { value: e.p.atmosphere.strength };
        const atmo = new THREE.Mesh(this.geo, am);
        atmo.scale.setScalar(e.p.atmosphere.scale);
        mesh.add(atmo);
      }
      if (e.rings) {
        const rings = e.rings.clone();
        rings.material = e.rings.material.clone();
        rings.material.uniforms = THREE.UniformsUtils.clone(e.rings.material.uniforms);
        rings.material.uniforms.map.value = e.rings.material.uniforms.map.value;
        rings.material.uniforms.uSunDir.value.set(-3, 2, 4).normalize();
        rings.material.uniforms.uPlanetPos.value.set(0, 0, 0);
        rings.material.uniforms.uPlanetRadius.value = 0.97;
        rings.rotation.set(-Math.PI / 2 + 0.62, 0, 0.18);
        mesh.add(rings);
      }
    }
    this.camera.position.set(0, 0, key === 'saturn' ? 7.4 : 5.4);
    this.holder.add(mesh);
    if (lightAngle !== null) {
      // Phase angle: 0 = new Moon (Sun behind the Moon), PI = full Moon (Sun behind the viewer).
      this.light.position.set(Math.sin(lightAngle) * 5, 0.4, -Math.cos(lightAngle) * 5);
      this.light.intensity = 3.2;
    } else {
      this.light.position.set(-3, 2, 4);
    }
    this.renderer.render(this.scene, this.camera);
    return this.canvas.toDataURL('image/png');
  }
}
