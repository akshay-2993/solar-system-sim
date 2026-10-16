import * as THREE from 'three';

const SYSTEM_BASE = new THREE.Vector3(6.8, 6.2, 17.2);
const WIDE_BASE = new THREE.Vector3(0, 0.7, 5.4);
const ELEVATION = THREE.MathUtils.degToRad(7);
const smootherstep = (x) => { const t = THREE.MathUtils.clamp(x, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

// System overview preset, scaled with the aspect ratio (portrait zooms out).
export function systemPreset(aspect) {
  const tall = Math.max(1.12, 1.45 / Math.max(0.35, aspect));
  const a = { position: SYSTEM_BASE.clone().multiplyScalar(tall), target: new THREE.Vector3(0, 0, 0) };
  if (aspect <= 0.9) return a;
  const n = Math.max(0, 1.8 - aspect);
  const shift = new THREE.Vector3(0.6 * (3.61 + (aspect < 1.8 ? 3.267 * n : 0)), 0, 0);
  const b = { position: WIDE_BASE.clone().multiplyScalar(aspect >= 1.8 ? 2.07 / aspect : 1.15 + 1.567 * n).add(shift), target: shift };
  if (aspect >= 1.2) return b;
  const s = smootherstep((aspect - 0.9) / 0.3);
  return { position: a.position.lerp(b.position, s), target: a.target.lerp(b.target, s) };
}

// Close-up preset: on the Sun-facing side, 7° above the orbital plane.
export function planetPreset(key, radius, worldPos, side = 1, fromDir = null, overDir = null) {
  const saturn = key === 'saturn';
  const elevation = saturn ? THREE.MathUtils.degToRad(22) : ELEVATION;
  if (overDir) {
    // Straight above a surface point (the student's own region), so day and night read at home.
    return { offset: overDir.clone().normalize().multiplyScalar(radius * 7.6), minDistance: radius * 1.55, maxDistance: radius * 12 };
  }
  const r = new THREE.Vector3(-worldPos.x, -worldPos.y, -worldPos.z);
  // The Sun sits at the origin: approach it from wherever the camera already is.
  if (r.lengthSq() === 0) { if (fromDir) r.copy(fromDir).setY(0); if (r.lengthSq() === 0) r.set(0, 0, 1); }
  r.normalize();
  let dir;
  if (side === 0) {
    // Profile view: perpendicular to the Sun line, raised 18°, so Sun, Moon and planet line up across the screen.
    const across = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), r).normalize();
    const lift = THREE.MathUtils.degToRad(18);
    dir = across.multiplyScalar(Math.cos(lift)).add(new THREE.Vector3(0, Math.sin(lift), 0)).normalize();
  } else {
    r.multiplyScalar(side);
    const up = new THREE.Vector3(0, 1, 0).addScaledVector(r, -r.y);
    if (up.lengthSq() === 0) up.set(0, 0, 1); else up.normalize();
    dir = r.multiplyScalar(Math.cos(elevation)).addScaledVector(up, Math.sin(elevation)).normalize();
  }
  return {
    offset: dir.multiplyScalar(radius * (saturn ? 9 : 7.6)),
    minDistance: radius * (saturn ? 2.55 : 1.55),
    maxDistance: radius * (saturn ? 16 : 12),
  };
}

export class CameraRig {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.focusKey = null; // body being followed (null = system)
    this.focusOffset = new THREE.Vector3();
    this.prevFocus = new THREE.Vector3();
    this.hasPrevFocus = false;
    this.plan = null;
    this.limits = { min: 0.55, max: 140 };
    this.aspect = 1;
    this.userMoved = false;
    controls.addEventListener('start', () => { this.userMoved = true; });
  }

  isTransitioning() { return !!this.plan; }

  duration(kind) {
    if (this.reducedMotion) return 1;
    if (kind === 'planet-to-planet') return 1600;
    if (kind === 'planet-to-system') return 1500;
    if (kind === 'reframe') return 700;
    return 1500;
  }

  _begin(plan, kind) {
    plan.kind = kind;
    plan.startedAt = performance.now();
    plan.durationMs = this.duration(kind);
    plan.fromPosition = this.camera.position.clone();
    plan.fromTarget = this.controls.target.clone();
    this.plan = plan;
    this.controls.enabled = false;
    this.controls.enableDamping = false;
  }

  flyToSystem(aspect) {
    this.aspect = aspect;
    const preset = systemPreset(aspect);
    const kind = this.focusKey ? 'planet-to-system' : 'reframe';
    const fromFocus = this.focusKey;
    this.focusKey = null;
    this.hasPrevFocus = false;
    this.limits = { min: 0.55, max: 140 };
    this._begin({ toPosition: preset.position, toTarget: preset.target, getFocus: null, viaLog: fromFocus !== null }, kind);
    this.userMoved = false;
  }

  // getFocus(): current world position of the destination body (it keeps moving while time plays).
  flyToBody(key, radius, getFocus, { side = 1, overDir = null } = {}) {
    const kind = this.focusKey === key ? 'reframe' : this.focusKey ? 'planet-to-planet' : 'system-to-planet';
    const pos = getFocus();
    const preset = planetPreset(key, radius, pos, side, this.camera.position.clone().sub(this.controls.target), overDir);
    this.focusKey = key;
    this.focusOffset.copy(preset.offset);
    this.limits = { min: preset.minDistance, max: preset.maxDistance };
    this.hasPrevFocus = false;
    this._begin({ getFocus, offset: preset.offset.clone(), viaLog: kind === 'system-to-planet' }, kind);
  }

  // Keep the same framing relative to a focus that moved (reframe on resize in system view).
  reframeSystem(aspect) {
    this.aspect = aspect;
    const preset = systemPreset(aspect);
    // A flight back to the overview retargets to the preset for the new aspect.
    if (this.plan && !this.plan.getFocus && this.plan.toPosition) {
      this.plan.toPosition.copy(preset.position);
      this.plan.toTarget.copy(preset.target);
      if (this.plan.waypoints) this.plan.waypoints[this.plan.waypoints.length - 1].copy(preset.position);
      return;
    }
    if (this.focusKey || this.plan || this.userMoved) return;
    this.camera.position.copy(preset.position);
    this.controls.target.copy(preset.target);
  }

  update(focusPos) {
    const cam = this.camera, ctl = this.controls;
    if (this.plan) {
      const plan = this.plan;
      const u = Math.min(1, (performance.now() - plan.startedAt) / plan.durationMs);
      const toTarget = plan.getFocus ? plan.getFocus().clone() : plan.toTarget.clone();
      const toPosition = plan.getFocus ? toTarget.clone().add(plan.offset) : plan.toPosition.clone();
      if (plan.viaLog) {
        // Zoom-style move: target slides first, then direction swings and distance eases in log space.
        const forward = plan.kind === 'system-to-planet';
        const s = forward ? u : 1 - u;
        const l = smootherstep(s / 0.62);
        const c = smootherstep((s - 0.1) / 0.9);
        const sysTarget = forward ? plan.fromTarget : toTarget;
        const plTarget = forward ? toTarget : plan.fromTarget;
        const sysPos = forward ? plan.fromPosition : toPosition;
        const plPos = forward ? toPosition : plan.fromTarget.clone().add(plan.fromPosition.clone().sub(plan.fromTarget));
        const target = sysTarget.clone().lerp(plTarget, l);
        const sysOff = sysPos.clone().sub(sysTarget), plOff = plPos.clone().sub(plTarget);
        const sysDir = sysOff.clone().normalize(), plDir = plOff.clone().normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(sysDir, plDir);
        const rot = new THREE.Quaternion().slerp(q, c);
        const dist = Math.exp(THREE.MathUtils.lerp(Math.log(sysOff.length()), Math.log(plOff.length()), c));
        const pos = sysDir.clone().applyQuaternion(rot).multiplyScalar(dist).add(target);
        cam.position.copy(pos);
        ctl.target.copy(target);
      } else {
        // Spline over lifted waypoints between two close-ups (or a reframe).
        const e = smootherstep(u);
        if (!plan.waypoints) {
          const fromT = plan.fromTarget, toT = toTarget;
          const i = plan.fromPosition.clone().sub(fromT), o = toPosition.clone().sub(toT);
          const sLen = i.length(), lLen = o.length();
          const dir = toT.clone().sub(fromT);
          const span = dir.length();
          if (span > 0) dir.normalize(); else dir.set(0, 0, 1);
          const lift = Math.max(0.18, 0.12 * span, 0.3 * Math.max(sLen, lLen));
          const d = fromT.clone().addScaledVector(dir, Math.max(2.6 * sLen, 1.35 * lLen)); d.y += lift;
          const w = toT.clone().addScaledVector(dir, -2.55 * lLen); w.y += lift;
          plan.waypoints = [plan.fromPosition.clone(), d, w, toPosition.clone()];
          if (plan.kind === 'reframe') plan.waypoints = [plan.fromPosition.clone(), toPosition.clone()];
        }
        // keep the final waypoint pinned to the moving body
        plan.waypoints[plan.waypoints.length - 1].copy(toPosition);
        const wp = plan.waypoints;
        const n = wp.length - 1;
        const r = e * n;
        const idx = Math.min(Math.floor(r), n - 1);
        const f = r - idx;
        const p0 = wp[Math.max(0, idx - 1)], p1 = wp[idx], p2 = wp[idx + 1], p3 = wp[Math.min(n, idx + 2)];
        const f2 = f * f, f3 = f2 * f;
        const h00 = 2 * f3 - 3 * f2 + 1, h10 = f3 - 2 * f2 + f, h01 = -2 * f3 + 3 * f2, h11 = f3 - f2;
        const pos = new THREE.Vector3(
          h00 * p1.x + h10 * (p2.x - p0.x) * 0.5 + h01 * p2.x + h11 * (p3.x - p1.x) * 0.5,
          h00 * p1.y + h10 * (p2.y - p0.y) * 0.5 + h01 * p2.y + h11 * (p3.y - p1.y) * 0.5,
          h00 * p1.z + h10 * (p2.z - p0.z) * 0.5 + h01 * p2.z + h11 * (p3.z - p1.z) * 0.5,
        );
        cam.position.copy(pos);
        const tl = plan.kind === 'reframe' ? e : smootherstep((e - 0.22) / 0.56);
        ctl.target.copy(plan.fromTarget).lerp(toTarget, tl);
      }
      if (u >= 1) {
        this.plan = null;
        ctl.enabled = true;
        ctl.enableDamping = true;
        ctl.minDistance = this.limits.min;
        ctl.maxDistance = this.limits.max;
        if (focusPos) { this.prevFocus.copy(focusPos); this.hasPrevFocus = true; }
      }
      cam.lookAt(ctl.target);
      return;
    }
    // Follow the focused body as it moves.
    if (this.focusKey && focusPos) {
      if (this.hasPrevFocus) {
        const delta = focusPos.clone().sub(this.prevFocus);
        cam.position.add(delta);
        ctl.target.add(delta);
      }
      this.prevFocus.copy(focusPos);
      this.hasPrevFocus = true;
    }
    ctl.update();
  }
}
