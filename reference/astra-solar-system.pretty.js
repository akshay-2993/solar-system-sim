!(function () {
  try {
    var e =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
                ? self
                : {},
      n = new e.Error().stack;
    n &&
      ((e._debugIds || (e._debugIds = {}))[n] =
        "776d826a-4fa1-5e00-d308-dc34371a2254");
  } catch (e) {}
})();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  407358,
  (e) => {
    "use strict";
    var t = e.i(34493),
      a = e.i(6840),
      n = e.i(672694),
      r = e.i(937020),
      i = e.i(655416),
      o = e.i(453927),
      s = e.i(619455),
      l = e.i(909098),
      c = e.i(817889),
      d = e.i(984995),
      u = e.i(193162),
      m = e.i(257636),
      h = e.i(198568),
      p = e.i(787960),
      f = e.i(856871),
      g = e.i(538206),
      y = e.i(402887),
      x = e.i(217075),
      b = e.i(786846),
      v = e.i(298703),
      w = e.i(258267);
    let M = 74658 / 58232,
      _ = 136775 / 58232;
    function k({ radiusKm: e }) {
      return (e / 695700) * 0.5;
    }
    let R = `${(0, w.M)("solar-system")}/textures`;
    function P(e) {
      let t = e;
      return () => (t = (1664525 * t + 0x3c6ef35f) % 0x100000000) / 0x100000000;
    }
    let j = `${R}/saturn-rings.webp`;
    function D({ url: e, attempt: t }) {
      if (t <= 1) return e;
      let a = e.includes("?") ? "&" : "?";
      return `${e}${a}astra_texture_attempt=${t}`;
    }
    function N({
      url: e,
      loader: t,
      maxAnisotropy: a,
      onLoad: n,
      onError: r,
      maxAttempts: i = 3,
    }) {
      let o = new b.Sk();
      (o.colorSpace = b.nj),
        (o.anisotropy = a),
        (o.wrapS = b.FP),
        (o.wrapT = b.Jr),
        (o.minFilter = b.Q4),
        (o.magFilter = b.VV),
        (o.generateMipmaps = !0);
      let s = Math.max(1, i),
        l = 0,
        c = () => {
          (l += 1),
            t.load(
              D({ url: e, attempt: l }),
              (e) => {
                (o.image = e.image), (o.needsUpdate = !0), n?.(o);
              },
              void 0,
              (e) => {
                l < s ? window.setTimeout(c, 300 * l) : r?.(e);
              },
            );
        };
      return c(), o;
    }
    let S = "https://cdn.astra-ai.co/web/labs/solar-system/textures/moon.webp";
    function E() {
      let e = document.createElement("canvas");
      (e.width = 2048), (e.height = 1024);
      let t = e.getContext("2d");
      if (t) {
        let a = P(1337),
          n = e.width,
          r = e.height;
        (t.fillStyle = "#8f8b84"), t.fillRect(0, 0, n, r);
        for (let e = 0; e < 140; e += 1) {
          let e = a() * n,
            i = a() * r,
            o = 90 + 280 * a(),
            s = a() > 0.5,
            l = 0.04 + 0.07 * a(),
            c = t.createRadialGradient(e, i, 1, e, i, o),
            d = s ? "214,208,198" : "112,108,102";
          c.addColorStop(0, `rgba(${d},${l})`),
            c.addColorStop(1, `rgba(${d},0)`),
            (t.fillStyle = c),
            t.beginPath(),
            t.arc(e, i, o, 0, 2 * Math.PI),
            t.fill();
        }
        for (let { fx: e, fy: i, rad: o } of [
          { fx: 0.36, fy: 0.32, rad: 150 },
          { fx: 0.46, fy: 0.27, rad: 110 },
          { fx: 0.52, fy: 0.42, rad: 120 },
          { fx: 0.3, fy: 0.5, rad: 130 },
          { fx: 0.58, fy: 0.34, rad: 80 },
          { fx: 0.42, fy: 0.46, rad: 70 },
        ]) {
          let s = e * n,
            l = i * r;
          for (let e = 0; e < 60; e += 1) {
            let e = a() * Math.PI * 2,
              n = a() * o,
              r = s + Math.cos(e) * n,
              i = l + Math.sin(e) * n * 0.78,
              c = 36 + 96 * a(),
              d = t.createRadialGradient(r, i, 2, r, i, c);
            d.addColorStop(0, "rgba(66,65,68,0.42)"),
              d.addColorStop(0.6, "rgba(74,73,75,0.24)"),
              d.addColorStop(1, "rgba(74,73,75,0)"),
              (t.fillStyle = d),
              t.beginPath(),
              t.arc(r, i, c, 0, 2 * Math.PI),
              t.fill();
          }
        }
        let i = (e) => {
          let { x: a, y: n, r } = e,
            i = t.createRadialGradient(
              a + 0.22 * r,
              n + 0.22 * r,
              0.3 * r,
              a + 0.22 * r,
              n + 0.22 * r,
              1.35 * r,
            );
          i.addColorStop(0, "rgba(34,32,30,0)"),
            i.addColorStop(0.7, "rgba(34,32,30,0.18)"),
            i.addColorStop(1, "rgba(34,32,30,0)"),
            (t.fillStyle = i),
            t.beginPath(),
            t.arc(a + 0.18 * r, n + 0.18 * r, 1.35 * r, 0, 2 * Math.PI),
            t.fill(),
            (t.strokeStyle = "rgba(226,220,210,0.5)"),
            (t.lineWidth = Math.max(1, 0.18 * r)),
            t.beginPath(),
            t.arc(a, n, 0.92 * r, 0.9 * Math.PI, 1.9 * Math.PI),
            t.stroke(),
            (t.strokeStyle = "rgba(226,220,210,0.22)"),
            t.beginPath(),
            t.arc(a, n, 0.92 * r, 0, 2 * Math.PI),
            t.stroke();
          let o = t.createRadialGradient(a, n, 1, a, n, r);
          o.addColorStop(0, "rgba(58,55,52,0.72)"),
            o.addColorStop(0.7, "rgba(92,88,83,0.42)"),
            o.addColorStop(1, "rgba(120,116,110,0)"),
            (t.fillStyle = o),
            t.beginPath(),
            t.arc(a, n, r, 0, 2 * Math.PI),
            t.fill();
        };
        for (let e = 0; e < 10; e += 1)
          i({ x: a() * n, y: a() * r, r: 40 + 60 * a() });
        for (let e = 0; e < 44; e += 1)
          i({ x: a() * n, y: a() * r, r: 16 + 30 * a() });
        for (let e = 0; e < 320; e += 1)
          i({ x: a() * n, y: a() * r, r: 3 + 10 * a() });
        for (let e = 0; e < 3; e += 1) {
          let e = 0.2 * n + 0.6 * a() * n,
            i = 0.5 * r + (a() - 0.5) * 0.7 * r,
            o = 14 + Math.floor(8 * a());
          for (let n = 0; n < o; n += 1) {
            let r = (n / o) * Math.PI * 2 + 0.25 * a(),
              s = 90 + 220 * a(),
              l = t.createLinearGradient(
                e,
                i,
                e + Math.cos(r) * s,
                i + Math.sin(r) * s,
              );
            l.addColorStop(0, "rgba(228,222,213,0.16)"),
              l.addColorStop(1, "rgba(228,222,213,0)"),
              (t.strokeStyle = l),
              (t.lineWidth = 1 + 2 * a()),
              t.beginPath(),
              t.moveTo(e, i),
              t.lineTo(e + Math.cos(r) * s, i + Math.sin(r) * s),
              t.stroke();
          }
          let s = t.createRadialGradient(e, i, 1, e, i, 16);
          s.addColorStop(0, "rgba(238,233,225,0.8)"),
            s.addColorStop(0.6, "rgba(214,208,198,0.4)"),
            s.addColorStop(1, "rgba(214,208,198,0)"),
            (t.fillStyle = s),
            t.beginPath(),
            t.arc(e, i, 16, 0, 2 * Math.PI),
            t.fill();
        }
        for (let e = 0; e < 1400; e += 1) {
          let e = a() * n,
            i = a() * r,
            o = 0.5 + 1.4 * a();
          (t.fillStyle =
            a() > 0.5 ? "rgba(220,214,205,0.05)" : "rgba(70,67,63,0.06)"),
            t.beginPath(),
            t.arc(e, i, o, 0, 2 * Math.PI),
            t.fill();
        }
      }
      let a = new b.Nk(e);
      return (a.colorSpace = b.nj), (a.wrapS = b.FP), (a.wrapT = b.Jr), a;
    }
    let z = (28 * Math.PI) / 180;
    function C(e) {
      return Math.max(6, 1.5 / (0.72 * Math.tan(z / 2) * Math.min(1, e)));
    }
    function F({ thetaRef: e, reduceMotionRef: a, ariaLabel: n }) {
      let r = (0, s.useRef)(null);
      return (
        (0, s.useEffect)(() => {
          let t = r.current;
          if (!t) return;
          let n = new b.P6();
          n.background = new b.Es(198418);
          let i = Math.max(1, t.clientWidth) / Math.max(1, t.clientHeight),
            o = new b.zm(28, i, 0.1, 100);
          o.position.set(0, 0, C(i)), o.lookAt(0, 0, 0);
          let s = (0, v.n)({ container: t, antialias: !0, alpha: !1 });
          if (null === s) return;
          (s.outputColorSpace = b.nj),
            (s.toneMapping = b.c2),
            (s.toneMappingExposure = 1.05);
          let l = new b.ld(),
            c = new Float32Array(1800);
          for (let e = 0; e < 600; e += 1) {
            let t = 2 * Math.random() - 1,
              a = 2 * Math.random() * Math.PI,
              n = Math.sqrt(1 - t * t);
            (c[3 * e] = n * Math.cos(a) * 40),
              (c[3 * e + 1] = 40 * t),
              (c[3 * e + 2] = n * Math.sin(a) * 40);
          }
          l.setAttribute("position", new b.f5(c, 3));
          let d = new b.Nj({
              color: 0xffffff,
              size: 0.12,
              sizeAttenuation: !0,
              transparent: !0,
              opacity: 0.7,
            }),
            u = new b.sy(l, d);
          n.add(u);
          let m = new b.C3(3820134, 0.16);
          n.add(m);
          let h = new b.ya(0xfff6e0, 3);
          h.position.set(0, 0, -1), n.add(h);
          let p = new b.ya(9350609, 0.7);
          p.position.set(0, 0, 5), n.add(p);
          let f = new b.H5(),
            g = Math.min(8, s.capabilities.getMaxAnisotropy()),
            y = new b.Gu(1.5, 96, 64),
            x = -Math.PI / 2,
            w = new b.aV({ roughness: 0.96, metalness: 0 }),
            M = new b.kE(y, w);
          (M.rotation.y = x), n.add(M);
          let _ = null,
            k = (function ({ loader: e, maxAnisotropy: t, onError: a }) {
              let n = e.load(S, void 0, void 0, () => a());
              return (
                (n.colorSpace = b.nj),
                (n.anisotropy = t),
                (n.wrapS = b.FP),
                (n.wrapT = b.Jr),
                (n.minFilter = b.VV),
                (n.magFilter = b.VV),
                (n.generateMipmaps = !1),
                n
              );
            })({
              loader: f,
              maxAnisotropy: g,
              onError: () => {
                w &&
                  (((_ = E()).anisotropy = g),
                  (w.map = _),
                  (w.needsUpdate = !0));
              },
            });
          (w.map = k), (w.needsUpdate = !0);
          let R = new b.mR(),
            P = 0,
            j = new b.cE(),
            D = () => {
              let t = R.getDelta(),
                r = e.current ?? 0,
                i = a.current ?? !1;
              j.set(Math.sin(r), 0, -Math.cos(r)),
                h.position.copy(j).multiplyScalar(5),
                (p.intensity = 0.08 + ((1 + Math.cos(r)) / 2) * 0.62),
                i || (u.rotation.y += 0.004 * t),
                s.render(n, o),
                (P = requestAnimationFrame(D));
            };
          P = requestAnimationFrame(D);
          let N = new ResizeObserver(() => {
            let e = Math.max(1, t.clientWidth),
              a = Math.max(1, t.clientHeight);
            (o.aspect = e / a),
              (o.position.z = C(o.aspect)),
              o.updateProjectionMatrix(),
              s.setSize(e, a);
          });
          return (
            N.observe(t),
            () => {
              cancelAnimationFrame(P),
                N.disconnect(),
                y.dispose(),
                w?.dispose(),
                (w = null),
                k.dispose(),
                _?.dispose(),
                l.dispose(),
                d.dispose(),
                (0, v.A)({ renderer: s, container: t });
            }
          );
        }, [e, a]),
        (0, t.jsx)("div", {
          ref: r,
          role: "img",
          "aria-label": n,
          className: "absolute inset-0 h-full w-full",
        })
      );
    }
    var T = e.i(698851);
    function A(e) {
      return (e * Math.PI) / 180;
    }
    function I(e) {
      var t;
      return (t = `${e}.webp`), `${R}/${t}`;
    }
    let L = "#C9CDD6",
      V = [
        {
          key: "mercury",
          periodDays: 88,
          semiMajorAu: 0.387,
          eccentricity: 0.2056,
          inclinationRad: A(7.005),
          ascendingNodeRad: A(48.331),
          argumentOfPeriapsisRad: A(29.125),
          meanLongitudeJ2000Rad: A(252.251),
          radiusKm: 2440,
          moonCount: 0,
          displayColor: "#9CA3AF",
          poleJ2000: {
            rightAscensionRad: A(281.0103),
            declinationRad: A(61.4155),
          },
          polarScale: 1,
          siderealRotationDays: 58.6462,
          primeMeridianJ2000Rad: A(329.5988),
          surfaceRoughness: 0.98,
          surfaceRelief: 0.028,
          atmosphere: null,
          textureUrl: I("mercury"),
        },
        {
          key: "venus",
          periodDays: 225,
          semiMajorAu: 0.723,
          eccentricity: 0.0068,
          inclinationRad: A(3.395),
          ascendingNodeRad: A(76.68),
          argumentOfPeriapsisRad: A(54.853),
          meanLongitudeJ2000Rad: A(181.98),
          radiusKm: 6052,
          moonCount: 0,
          displayColor: "#E0B782",
          poleJ2000: { rightAscensionRad: A(272.76), declinationRad: A(67.16) },
          polarScale: 1,
          siderealRotationDays: -243.018,
          primeMeridianJ2000Rad: A(160.2),
          surfaceRoughness: 0.92,
          surfaceRelief: 0.004,
          atmosphere: { color: 0xffc073, scale: 1.04, strength: 0.16 },
          textureUrl: I("venus"),
        },
        {
          key: "earth",
          periodDays: 365.25,
          semiMajorAu: 1,
          eccentricity: 0.0167,
          inclinationRad: 0,
          ascendingNodeRad: 0,
          argumentOfPeriapsisRad: A(102.937),
          meanLongitudeJ2000Rad: A(100.464),
          radiusKm: 6371,
          moonCount: 1,
          displayColor: "#60A5FA",
          poleJ2000: { rightAscensionRad: 0, declinationRad: Math.PI / 2 },
          polarScale: 0.997,
          siderealRotationDays: 0.99726968,
          primeMeridianJ2000Rad: A(190.147),
          surfaceRoughness: 0.78,
          surfaceRelief: 0.003,
          atmosphere: { color: 5086719, scale: 1.06, strength: 0.36 },
          textureUrl: I("earth"),
        },
        {
          key: "mars",
          periodDays: 687,
          semiMajorAu: 1.524,
          eccentricity: 0.0934,
          inclinationRad: A(1.85),
          ascendingNodeRad: A(49.558),
          argumentOfPeriapsisRad: A(286.502),
          meanLongitudeJ2000Rad: A(355.453),
          radiusKm: 3389,
          moonCount: 2,
          displayColor: "#F87171",
          poleJ2000: {
            rightAscensionRad: A(317.269202),
            declinationRad: A(54.432516),
          },
          polarScale: 0.994,
          siderealRotationDays: 1.02595676,
          primeMeridianJ2000Rad: A(176.049863),
          surfaceRoughness: 0.96,
          surfaceRelief: 0.022,
          atmosphere: { color: 0xe76f42, scale: 1.025, strength: 0.08 },
          textureUrl: I("mars"),
        },
        {
          key: "jupiter",
          periodDays: 4333,
          semiMajorAu: 5.203,
          eccentricity: 0.0489,
          inclinationRad: A(1.303),
          ascendingNodeRad: A(100.464),
          argumentOfPeriapsisRad: A(273.867),
          meanLongitudeJ2000Rad: A(34.396),
          radiusKm: 69911,
          moonCount: 95,
          displayColor: "#F59E0B",
          poleJ2000: {
            rightAscensionRad: A(268.056595),
            declinationRad: A(64.495303),
          },
          polarScale: 0.935,
          siderealRotationDays: 0.41354,
          primeMeridianJ2000Rad: A(284.95),
          surfaceRoughness: 0.84,
          surfaceRelief: 0,
          atmosphere: { color: 0xf2c796, scale: 1.018, strength: 0.07 },
          textureUrl: I("jupiter"),
        },
        {
          key: "saturn",
          periodDays: 10759,
          semiMajorAu: 9.537,
          eccentricity: 0.0565,
          inclinationRad: A(2.485),
          ascendingNodeRad: A(113.665),
          argumentOfPeriapsisRad: A(339.392),
          meanLongitudeJ2000Rad: A(49.954),
          radiusKm: 58232,
          moonCount: 274,
          displayColor: "#FACC15",
          poleJ2000: {
            rightAscensionRad: A(40.589),
            declinationRad: A(83.537),
          },
          polarScale: 0.902,
          siderealRotationDays: 0.44401,
          primeMeridianJ2000Rad: A(38.9),
          surfaceRoughness: 0.86,
          surfaceRelief: 0,
          atmosphere: { color: 0xf4d49e, scale: 1.018, strength: 0.06 },
          textureUrl: I("saturn"),
        },
        {
          key: "uranus",
          periodDays: 30687,
          semiMajorAu: 19.19,
          eccentricity: 0.0472,
          inclinationRad: A(0.773),
          ascendingNodeRad: A(74.006),
          argumentOfPeriapsisRad: A(96.999),
          meanLongitudeJ2000Rad: A(313.238),
          radiusKm: 25362,
          moonCount: 28,
          displayColor: "#7DD3FC",
          poleJ2000: {
            rightAscensionRad: A(257.311),
            declinationRad: A(-15.175),
          },
          polarScale: 0.977,
          siderealRotationDays: -0.71833,
          primeMeridianJ2000Rad: A(203.81),
          surfaceRoughness: 0.72,
          surfaceRelief: 0,
          atmosphere: { color: 9300479, scale: 1.04, strength: 0.18 },
          textureUrl: I("uranus"),
        },
        {
          key: "neptune",
          periodDays: 60190,
          semiMajorAu: 30.07,
          eccentricity: 0.0086,
          inclinationRad: A(1.77),
          ascendingNodeRad: A(131.784),
          argumentOfPeriapsisRad: A(273.187),
          meanLongitudeJ2000Rad: A(304.88),
          radiusKm: 24622,
          moonCount: 16,
          displayColor: "#3B82F6",
          poleJ2000: { rightAscensionRad: A(299.36), declinationRad: A(43.46) },
          polarScale: 0.983,
          siderealRotationDays: 0.67125,
          primeMeridianJ2000Rad: A(249.978),
          surfaceRoughness: 0.74,
          surfaceRelief: 0,
          atmosphere: { color: 4619519, scale: 1.045, strength: 0.22 },
          textureUrl: I("neptune"),
        },
      ],
      $ = new b.cE(0, 0.7, 5.4),
      K = new b.cE(6.8, 6.2, 17.2),
      O = b.rB.degToRad(7);
    function W({
      kind: e,
      fromPosition: t,
      fromTarget: a,
      toPosition: n,
      toTarget: r,
    }) {
      let i = t.clone().sub(a),
        o = n.clone().sub(r),
        s = Math.max(i.length(), 0.001),
        l = Math.max(o.length(), 0.001);
      if (
        (0 === i.lengthSq() && i.set(0, 0.2, 1),
        0 === o.lengthSq() && o.set(0, 0.2, 1),
        i.normalize(),
        o.normalize(),
        "planet-reframe" === e || "system-reframe" === e)
      )
        return {
          kind: e,
          positionWaypoints: [t.clone(), n.clone()],
          fromTarget: a.clone(),
          toTarget: r.clone(),
          targetMoveStart: 0,
          targetMoveEnd: 1,
          systemPlanetRoute: null,
        };
      if ("system-to-planet" === e || "planet-to-system" === e) {
        let c = "system-to-planet" === e ? i : o,
          d = "system-to-planet" === e ? o : i;
        return {
          kind: e,
          positionWaypoints: [t.clone(), n.clone()],
          fromTarget: a.clone(),
          toTarget: r.clone(),
          targetMoveStart: 0,
          targetMoveEnd: 0.62,
          systemPlanetRoute: {
            systemDirection: c.clone(),
            planetDirectionRotation: new b.as().setFromUnitVectors(c, d),
            sampleRotation: new b.as(),
            systemDistanceLog: Math.log("system-to-planet" === e ? s : l),
            planetDistanceLog: Math.log("system-to-planet" === e ? l : s),
          },
        };
      }
      let c = Math.min(
          2.4,
          Math.max(0.18, 0.12 * a.distanceTo(r), 0.3 * Math.max(s, l)),
        ),
        d = a.clone().addScaledVector(i, Math.max(2.6 * s, 1.35 * l));
      d.y += c;
      let u = r.clone().addScaledVector(o, 2.55 * l);
      return (
        (u.y += c),
        {
          kind: e,
          positionWaypoints: [t.clone(), d, u, n.clone()],
          fromTarget: a.clone(),
          toTarget: r.clone(),
          targetMoveStart: 0.22,
          targetMoveEnd: 0.78,
          systemPlanetRoute: null,
        }
      );
    }
    function U({ aspect: e }) {
      let t = Math.max(1.12, 1.6 / Math.max(0.35, e)),
        a = {
          position: K.clone().multiplyScalar(t),
          target: new b.cE(0, 0, 0),
        };
      if (e <= 0.9) return a;
      let n = Math.max(0, 1.8 - e),
        r = new b.cE(3.61 + (e < 1.8 ? 3.267 * n : 0), 0, 0),
        i = {
          position: $.clone()
            .multiplyScalar(e >= 1.8 ? 2.07 / e : 1.15 + 1.567 * n)
            .add(r),
          target: r,
        };
      if (e >= 1.2) return i;
      let o = (e - 0.9) / (1.2 - 0.9),
        s = o ** 2 * (3 - 2 * o);
      return {
        position: a.position.lerp(i.position, s),
        target: a.target.lerp(i.target, s),
      };
    }
    function J({ planet: e, radius: t, worldPosition: a }) {
      let n = "saturn" === e.key,
        r = new b.cE(-a.x, -a.y, -a.z);
      0 === r.lengthSq() ? r.set(0, 0, 1) : r.normalize();
      let i = new b.cE(0, 1, 0).addScaledVector(r, -r.y);
      return (
        0 === i.lengthSq() ? i.set(0, 0, 1) : i.normalize(),
        {
          position: r
            .multiplyScalar(Math.cos(O))
            .addScaledVector(i, Math.sin(O))
            .normalize()
            .multiplyScalar(t * (n ? 9 : 7.6)),
          minDistance: t * (n ? 2.55 : 1.55),
          maxDistance: t * (n ? 16 : 12),
        }
      );
    }
    class q {
      camera;
      controls;
      active;
      reducedMotion;
      transitionPlan;
      startedAt;
      transitionDurationMs;
      restoreDamping;
      arrivalMinDistance;
      arrivalMaxDistance;
      sourceFocusKey;
      destinationFocusKey;
      sourceAnchor;
      destinationAnchor;
      destinationPlanet;
      destinationRadius;
      destinationOffsetAnchor;
      previousFocus;
      hasPreviousFocus;
      previousFocusKey;
      focusDelta;
      transitionPosition;
      transitionTarget;
      sourceTransitionDrift;
      transitionDrift;
      destinationOffsetCorrection;
      constructor(e, t) {
        (this.camera = e),
          (this.controls = t),
          (this.active = !1),
          (this.reducedMotion = !1),
          (this.transitionPlan = null),
          (this.startedAt = 0),
          (this.transitionDurationMs = 0),
          (this.restoreDamping = !0),
          (this.arrivalMinDistance = 5e-4),
          (this.arrivalMaxDistance = 1 / 0),
          (this.sourceFocusKey = null),
          (this.destinationFocusKey = null),
          (this.sourceAnchor = new b.cE()),
          (this.destinationAnchor = new b.cE()),
          (this.destinationPlanet = null),
          (this.destinationRadius = 0),
          (this.destinationOffsetAnchor = new b.cE()),
          (this.previousFocus = new b.cE()),
          (this.hasPreviousFocus = !1),
          (this.previousFocusKey = null),
          (this.focusDelta = new b.cE()),
          (this.transitionPosition = new b.cE()),
          (this.transitionTarget = new b.cE()),
          (this.sourceTransitionDrift = new b.cE()),
          (this.transitionDrift = new b.cE()),
          (this.destinationOffsetCorrection = new b.cE());
      }
      setReducedMotion(e) {
        this.reducedMotion = e;
      }
      isTransitioning() {
        return this.active;
      }
      flyToSystem({ source: e }) {
        let t = U({ aspect: this.camera.aspect });
        this.begin({
          kind: "planet-to-system",
          toPosition: t.position,
          toTarget: t.target,
          source: e,
          destinationFocusKey: null,
          arrivalMinDistance: 0.55,
          arrivalMaxDistance: 140,
        });
      }
      reframeSystem() {
        let e = U({ aspect: this.camera.aspect });
        this.begin({
          kind: "system-reframe",
          toPosition: e.position,
          toTarget: e.target,
          source: null,
          destinationFocusKey: null,
          arrivalMinDistance: 0.55,
          arrivalMaxDistance: 140,
        });
      }
      retargetSystemFrame() {
        if (
          !this.active ||
          !this.transitionPlan ||
          ("planet-to-system" !== this.transitionPlan.kind &&
            "system-reframe" !== this.transitionPlan.kind)
        )
          return !1;
        let e = performance.now(),
          t = Math.max(0, e - this.startedAt),
          a = Math.max(1, this.transitionDurationMs - t),
          n = U({ aspect: this.camera.aspect });
        return (
          (this.transitionPlan = W({
            kind: "system-reframe",
            fromPosition: this.camera.position,
            fromTarget: this.controls.target,
            toPosition: n.position,
            toTarget: n.target,
          })),
          (this.sourceFocusKey = null),
          (this.destinationFocusKey = null),
          (this.destinationPlanet = null),
          this.destinationAnchor.copy(n.target),
          (this.arrivalMinDistance = 0.55),
          (this.arrivalMaxDistance = 140),
          (this.startedAt = e),
          (this.transitionDurationMs = a),
          !0
        );
      }
      flyToPlanet({
        planet: e,
        pos: t,
        radius: a,
        origin: n = "system",
        source: r = null,
      }) {
        let i = J({ planet: e, radius: a, worldPosition: t }),
          o = new b.cE(
            t.x + i.position.x,
            t.y + i.position.y,
            t.z + i.position.z,
          ),
          s = new b.cE(t.x, t.y, t.z);
        this.begin({
          kind:
            "planet" === n
              ? "planet-to-planet"
              : "reframe" === n
                ? "planet-reframe"
                : "system-to-planet",
          toPosition: o,
          toTarget: s,
          source: r,
          destinationFocusKey: e.key,
          destinationPlanet: e,
          destinationRadius: a,
          arrivalMinDistance: i.minDistance,
          arrivalMaxDistance: i.maxDistance,
        });
      }
      update({ focus: e, sourceFocus: t }) {
        let a = this.controls;
        if (
          (e && !this.active && a.target.set(e.x, e.y, e.z),
          e
            ? this.active
              ? (this.previousFocus.set(e.x, e.y, e.z),
                (this.hasPreviousFocus = !0),
                (this.previousFocusKey = e.key))
              : ((this.hasPreviousFocus && this.previousFocusKey === e.key) ||
                  (this.previousFocus.set(e.x, e.y, e.z),
                  (this.hasPreviousFocus = !0),
                  (this.previousFocusKey = e.key)),
                this.focusDelta.set(e.x, e.y, e.z).sub(this.previousFocus),
                this.camera.position.add(this.focusDelta),
                this.previousFocus.set(e.x, e.y, e.z))
            : ((this.hasPreviousFocus = !1), (this.previousFocusKey = null)),
          this.active && this.transitionPlan)
        ) {
          let n = Math.min(
              1,
              (performance.now() - this.startedAt) / this.transitionDurationMs,
            ),
            r = (function ({ plan: e, progress: t, position: a, target: n }) {
              if (
                "system-to-planet" === e.kind ||
                "planet-to-system" === e.kind
              )
                return (function ({
                  plan: e,
                  progress: t,
                  position: a,
                  target: n,
                }) {
                  let r = e.systemPlanetRoute;
                  if (!r) throw Error("Missing system-planet camera route");
                  let i = b.rB.clamp(t, 0, 1);
                  if (0 === i)
                    return (
                      a.copy(e.positionWaypoints[0]), n.copy(e.fromTarget), 0
                    );
                  if (1 === i)
                    return (
                      a.copy(e.positionWaypoints[1]), n.copy(e.toTarget), 1
                    );
                  let o = "system-to-planet" === e.kind,
                    s = o ? i : 1 - i,
                    l = b.rB.smootherstep(s / 0.62, 0, 1),
                    c = b.rB.smootherstep((s - 0.1) / 0.9, 0, 1),
                    d = o ? e.fromTarget : e.toTarget,
                    u = o ? e.toTarget : e.fromTarget;
                  n.lerpVectors(d, u, l),
                    r.sampleRotation
                      .identity()
                      .slerp(r.planetDirectionRotation, c);
                  let m = Math.exp(
                    b.rB.lerp(r.systemDistanceLog, r.planetDistanceLog, c),
                  );
                  return (
                    a
                      .copy(r.systemDirection)
                      .applyQuaternion(r.sampleRotation)
                      .multiplyScalar(m)
                      .add(n),
                    o ? l : 1 - l
                  );
                })({ plan: e, progress: t, position: a, target: n });
              let r = b.rB.smootherstep(t, 0, 1);
              !(function ({ waypoints: e, progress: t, output: a }) {
                let n = e.length - 1,
                  r = b.rB.clamp(t, 0, 1) * n,
                  i = Math.min(Math.floor(r), n - 1),
                  o = r - i,
                  s = e[Math.max(0, i - 1)],
                  l = e[i],
                  c = e[i + 1],
                  d = e[Math.min(e.length - 1, i + 2)];
                if (!s || !l || !c || !d)
                  throw Error(
                    "Camera transition requires at least two waypoints",
                  );
                let u = o * o,
                  m = u * o,
                  h = 2 * m - 3 * u + 1,
                  p = m - 2 * u + o,
                  f = -2 * m + 3 * u,
                  g = m - u;
                a.set(
                  h * l.x +
                    p * (c.x - s.x) * 0.5 +
                    f * c.x +
                    g * (d.x - l.x) * 0.5,
                  h * l.y +
                    p * (c.y - s.y) * 0.5 +
                    f * c.y +
                    g * (d.y - l.y) * 0.5,
                  h * l.z +
                    p * (c.z - s.z) * 0.5 +
                    f * c.z +
                    g * (d.z - l.z) * 0.5,
                );
              })({ waypoints: e.positionWaypoints, progress: r, output: a });
              let i = b.rB.smoothstep(
                (r - e.targetMoveStart) / (e.targetMoveEnd - e.targetMoveStart),
                0,
                1,
              );
              return n.lerpVectors(e.fromTarget, e.toTarget, i), i;
            })({
              plan: this.transitionPlan,
              progress: n,
              position: this.transitionPosition,
              target: this.transitionTarget,
            });
          if (
            (t?.key === this.sourceFocusKey &&
              (this.sourceTransitionDrift
                .set(t.x, t.y, t.z)
                .sub(this.sourceAnchor),
              this.transitionPosition.addScaledVector(
                this.sourceTransitionDrift,
                1 - r,
              ),
              this.transitionTarget.addScaledVector(
                this.sourceTransitionDrift,
                1 - r,
              )),
            e?.key === this.destinationFocusKey &&
              (this.transitionDrift
                .set(e.x, e.y, e.z)
                .sub(this.destinationAnchor),
              this.transitionPosition.addScaledVector(this.transitionDrift, r),
              this.transitionTarget.addScaledVector(this.transitionDrift, r),
              this.destinationPlanet))
          ) {
            let t = J({
              planet: this.destinationPlanet,
              radius: this.destinationRadius,
              worldPosition: e,
            });
            this.destinationOffsetCorrection
              .copy(t.position)
              .sub(this.destinationOffsetAnchor),
              this.transitionPosition.addScaledVector(
                this.destinationOffsetCorrection,
                r,
              );
          }
          if (
            (this.camera.position.copy(this.transitionPosition),
            a.target.copy(this.transitionTarget),
            n >= 1)
          ) {
            (this.active = !1),
              e &&
                (this.previousFocus.set(e.x, e.y, e.z),
                (this.hasPreviousFocus = !0),
                (this.previousFocusKey = e.key)),
              (this.transitionPlan = null),
              (this.sourceFocusKey = null),
              (this.destinationPlanet = null),
              (a.minDistance = this.arrivalMinDistance),
              (a.maxDistance = this.arrivalMaxDistance),
              a.update(),
              (a.enableDamping = this.restoreDamping),
              (a.enabled = !0);
            return;
          }
        }
        a.update();
      }
      begin({
        kind: e,
        toPosition: t,
        toTarget: a,
        source: n,
        destinationFocusKey: r,
        destinationPlanet: i = null,
        destinationRadius: o = 0,
        arrivalMinDistance: s,
        arrivalMaxDistance: l,
      }) {
        let c = this.controls;
        (this.transitionPlan = W({
          kind: e,
          fromPosition: this.camera.position,
          fromTarget: c.target,
          toPosition: t,
          toTarget: a,
        })),
          (this.sourceFocusKey = n?.key ?? null),
          n && this.sourceAnchor.set(n.x, n.y, n.z),
          (this.destinationFocusKey = r),
          (this.destinationPlanet = i),
          (this.destinationRadius = o),
          this.destinationAnchor.copy(a),
          this.destinationOffsetAnchor.copy(t).sub(a),
          (this.arrivalMinDistance = s),
          (this.arrivalMaxDistance = l),
          (this.startedAt = performance.now()),
          (this.transitionDurationMs = (function ({
            reducedMotion: e,
            kind: t = "system-to-planet",
          }) {
            return e
              ? 1
              : "planet-to-planet" === t
                ? 1600
                : "planet-to-system" === t
                  ? 1500
                  : "planet-reframe" === t || "system-reframe" === t
                    ? 700
                    : 1500;
          })({ reducedMotion: this.reducedMotion, kind: e })),
          (this.restoreDamping = this.active
            ? this.restoreDamping
            : c.enableDamping),
          (this.active = !0),
          (c.enableDamping = !1),
          (c.minDistance = 5e-4),
          (c.maxDistance = 1 / 0),
          (c.enabled = !1);
      }
    }
    let B = Date.UTC(2e3, 0, 1, 12);
    function G(e) {
      return (e.getTime() - B) / 864e5;
    }
    function X(e) {
      return new Date(B + 864e5 * e);
    }
    let Y = G(new Date(Date.UTC(1900, 0, 1))),
      Q = G(new Date(Date.UTC(2100, 11, 31)));
    function H(e) {
      return Math.min(Q, Math.max(Y, e));
    }
    let Z = Math.PI / 180,
      ee = 2 * Math.PI,
      et = { baseDeg: 297.8501921, rateDegPerDay: 12.19074912 },
      ea = { baseDeg: 125.04452, rateDegPerDay: -0.05295377 },
      en = { baseDeg: 93.272095, rateDegPerDay: 13.22935024 },
      er = { baseDeg: 134.9633964, rateDegPerDay: 13.06499295 },
      ei = { baseDeg: 357.5291092, rateDegPerDay: 0.98560028 },
      eo = 360 / et.rateDegPerDay,
      es = 5.128 * Z,
      el = 1.5 * Z,
      ec = +Z;
    function ed(e) {
      let t = ((e % ee) + ee) % ee;
      return t > Math.PI ? t - ee : t;
    }
    function eu({ element: { baseDeg: e, rateDegPerDay: t }, tDays: a }) {
      return ((((e + t * a) * Z) % ee) + ee) % ee;
    }
    function em(e) {
      return eu({ element: et, tDays: e });
    }
    function eh(e) {
      let t = eu({ element: er, tDays: e }),
        a = eu({ element: ei, tDays: e });
      return (
        (((em(e) + (6.289 * Math.sin(t) - 1.915 * Math.sin(a)) * Z) % ee) +
          ee) %
        ee
      );
    }
    function ep(e) {
      let t = eu({ element: er, tDays: e }),
        a = eu({ element: ei, tDays: e });
      return (
        (et.rateDegPerDay +
          6.289 * Math.cos(t) * (er.rateDegPerDay * Z) -
          1.915 * Math.cos(a) * (ei.rateDegPerDay * Z)) *
        Z
      );
    }
    function ef(e) {
      var t;
      let a,
        n,
        r = (function (e) {
          let t = (((e * Math.PI) % ee) + ee) % ee,
            a = (180 * e - et.baseDeg) / et.rateDegPerDay;
          for (let e = 0; e < 3; e += 1) {
            let e = ed(eh(a) - t);
            a -= e / ep(a);
          }
          return a;
        })(e),
        i = Math.abs(
          ((a = eu({ element: en, tDays: (t = r) })),
          (5.128 * Math.sin(a) +
            0.2806 * Math.sin((n = eu({ element: er, tDays: t })) + a) +
            0.2777 * Math.sin(n - a) +
            0.1732 * Math.sin(2 * em(t) - a)) *
            Z),
        ),
        o = ((e % 2) + 2) % 2 == 0;
      return o && i < el
        ? { tDays: r, kind: "solar" }
        : !o && i < ec
          ? { tDays: r, kind: "lunar" }
          : null;
    }
    function eg(e) {
      return Math.round((et.baseDeg + et.rateDegPerDay * e) / 180);
    }
    function ey(e) {
      let t = eg(e);
      for (let a of [t - 1, t, t + 1]) {
        let t = ef(a);
        if (t && 0.5 >= Math.abs(t.tDays - e)) return t;
      }
      return null;
    }
    function ex({ x: e, y: t, z: a }) {
      return { x: e, y: a, z: -t };
    }
    let eb = 2 * Math.PI;
    function ev(e) {
      return 2.13 * e ** 0.437;
    }
    function ew({ planet: e, eccentricAnomalyRad: t }) {
      let a = ev(e.semiMajorAu),
        n = a * Math.sqrt(1 - e.eccentricity ** 2),
        r = a * (Math.cos(t) - e.eccentricity),
        i = n * Math.sin(t),
        o = Math.cos(e.argumentOfPeriapsisRad),
        s = Math.sin(e.argumentOfPeriapsisRad),
        l = r * o - i * s,
        c = r * s + i * o,
        d = Math.cos(e.inclinationRad),
        u = Math.sin(e.inclinationRad),
        m = c * d,
        h = Math.cos(e.ascendingNodeRad),
        p = Math.sin(e.ascendingNodeRad);
      return ex({ x: l * h - m * p, y: l * p + m * h, z: c * u });
    }
    function eM({ planet: e, tDays: t }) {
      let a =
        e.meanLongitudeJ2000Rad -
        e.ascendingNodeRad -
        e.argumentOfPeriapsisRad +
        (eb * t) / e.periodDays;
      return ew({
        planet: e,
        eccentricAnomalyRad: (function ({
          meanAnomalyRad: e,
          eccentricity: t,
        }) {
          let a = ((e % eb) + eb) % eb,
            n = t > 0.8 ? Math.PI : a;
          for (let e = 0; e < 5; e += 1)
            n -= (n - t * Math.sin(n) - a) / (1 - t * Math.cos(n));
          return n;
        })({ meanAnomalyRad: a, eccentricity: e.eccentricity }),
      });
    }
    let e_ = b.rB.degToRad(23.4392911),
      ek = 2 * Math.PI,
      eR = 0.35 * ek;
    function eP({ x: e, y: t, z: a }) {
      let n = ex({
        x: e,
        y: Math.cos(e_) * t + Math.sin(e_) * a,
        z: -Math.sin(e_) * t + Math.cos(e_) * a,
      });
      return new b.cE(n.x, n.y, n.z).normalize();
    }
    let ej = [1.5, 1.375, 1.25, 1],
      eD = 1e3 / 60;
    function eN({ width: e, height: t, devicePixelRatio: a }) {
      let n = Math.max(1, e),
        r = Math.max(1, t),
        i = Math.max(1, a);
      return ej.find((e) => e <= i && n * r * e ** 2 <= 35e5) ?? 1;
    }
    function eS({ renderer: e, scene: t, camera: a }) {
      let n = a.layers.mask,
        r = e.autoClear,
        i = t.background;
      try {
        a.layers.set(0),
          (e.autoClear = !0),
          e.render(t, a),
          a.layers.set(1),
          (e.autoClear = !1),
          (t.background = null),
          e.render(t, a),
          a.layers.set(2),
          e.render(t, a);
      } finally {
        (t.background = i), (a.layers.mask = n), (e.autoClear = r);
      }
    }
    let eE = -e_;
    function ez({ key: e, tDays: t }) {
      let a = V.find((t) => t.key === e);
      return a ? { ...eM({ planet: a, tDays: t }), key: e } : null;
    }
    function eC({ mediaQuery: e, onChange: t }) {
      return "function" == typeof e.addEventListener
        ? (e.addEventListener("change", t),
          () => e.removeEventListener("change", t))
        : (e.addListener(t), () => e.removeListener(t));
    }
    function eF() {
      let e = document.createElement("canvas");
      (e.width = 64), (e.height = 64);
      let t = e.getContext("2d");
      if (t) {
        let e = t.createRadialGradient(32, 32, 2, 32, 32, 30);
        e.addColorStop(0, "rgba(255,255,255,1)"),
          e.addColorStop(0.35, "rgba(255,255,255,0.85)"),
          e.addColorStop(1, "rgba(255,255,255,0)"),
          (t.fillStyle = e),
          t.fillRect(0, 0, 64, 64);
      }
      let a = new b.Nk(e);
      return (a.colorSpace = b.nj), a;
    }
    function eT({
      tDaysRef: e,
      planetView: a,
      showOrbits: n,
      selected: r,
      onSelect: i,
      onMoonTap: o,
      onMoonScrub: l,
      onReady: c,
      onLoadProgress: d,
      planetLabels: u,
      moonLabel: m,
      resetVersion: h,
      vizLabel: p,
    }) {
      let f = (0, s.useRef)(null),
        [g, y] = (0, s.useState)(0),
        x = (0, s.useRef)(a),
        w = (0, s.useRef)(r),
        R = (0, s.useRef)(i),
        j = (0, s.useRef)(o),
        D = (0, s.useRef)(l),
        z = (0, s.useRef)(c),
        C = (0, s.useRef)(d),
        F = (0, s.useRef)(null),
        A = (0, s.useRef)(void 0),
        I = (0, s.useRef)(null),
        L = (0, s.useRef)(null),
        $ = (0, s.useRef)(null),
        K = (0, s.useRef)(h),
        O = (0, s.useRef)(!1);
      (0, s.useEffect)(() => {
        x.current = a;
      }, [a]),
        (0, s.useEffect)(() => {
          w.current = r;
        }, [r]),
        (0, s.useEffect)(() => {
          R.current = i;
        }, [i]),
        (0, s.useEffect)(() => {
          j.current = o;
        }, [o]),
        (0, s.useEffect)(() => {
          D.current = l;
        }, [l]),
        (0, s.useEffect)(() => {
          z.current = c;
        }, [c]),
        (0, s.useEffect)(() => {
          C.current = d;
        }, [d]);
      let W = (0, s.useRef)(new Map()),
        J = (0, s.useRef)(null),
        B = (0, s.useRef)(null);
      return (
        (0, s.useEffect)(() => {
          let t,
            a = f.current;
          if (!a) return;
          (O.current = !1), y(0);
          let n = new b.P6();
          n.background = new b.Es(66314);
          let r = Math.max(1, a.clientWidth),
            i = Math.max(1, a.clientHeight),
            o = r,
            s = i,
            l = eN({
              width: r,
              height: i,
              devicePixelRatio: window.devicePixelRatio,
            }),
            c = new b.zm(38, r / i, 5e-4, 220),
            d = (0, v.n)({
              container: a,
              antialias: !0,
              powerPreference: "high-performance",
              stencil: !1,
            });
          if (null === d) return;
          (d.outputColorSpace = b.nj),
            (d.toneMapping = b.c2),
            (d.toneMappingExposure = 1),
            d.setPixelRatio(l),
            d.setSize(r, i, !1),
            (d.domElement.style.display = "block"),
            (d.domElement.style.width = "100%"),
            (d.domElement.style.height = "100%"),
            (d.domElement.style.opacity = "0");
          let h = () => {
              let e = Math.max(1, a.clientWidth),
                t = Math.max(1, a.clientHeight),
                n = eN({
                  width: e,
                  height: t,
                  devicePixelRatio: window.devicePixelRatio,
                });
              return (
                (e !== o || t !== s || n !== l) &&
                ((o = e),
                (s = t),
                n !== l && ((l = n), d.setPixelRatio(n)),
                (c.aspect = e / t),
                c.updateProjectionMatrix(),
                d.setSize(e, t, !1),
                !0)
              );
            },
            p = new b.C3(0xdfe9ff, 0.11);
          p.layers.enable(2);
          let g = new b.C3(0xdfe9ff, 0.085);
          g.layers.set(1), n.add(g);
          let K = new Map();
          n.add(p), (d.shadowMap.enabled = !0), (d.shadowMap.type = b.up);
          let G = new b.t(),
            X = new b.ya(0xfff2dc, 5);
          X.layers.set(1),
            (X.castShadow = !0),
            X.shadow.camera.layers.set(1),
            X.shadow.mapSize.set(2048, 2048),
            (X.shadow.camera.left = -0.03),
            (X.shadow.camera.right = 0.03),
            (X.shadow.camera.top = 0.03),
            (X.shadow.camera.bottom = -0.03),
            (X.shadow.camera.near = 0.05),
            (X.shadow.camera.far = 0.8),
            (X.shadow.bias = -5e-5),
            X.shadow.camera.updateProjectionMatrix(),
            (X.target = G),
            n.add(G),
            n.add(X);
          let Y = new Set(),
            Q = new b.H5(),
            Z = Math.min(8, d.capabilities.getMaxAnisotropy()),
            et = new Set(["earthNight", "moon", "sky", ...V.map((e) => e.key)]),
            en = new Map(),
            er = new Map(),
            ei = et.size,
            el = !1,
            ec = 0,
            em = !1,
            ef = !1,
            eg = 0,
            ex = () => {},
            e_ = null;
          C.current?.(0);
          let ej = (e) => {
              !el &&
                et.delete(e) &&
                (((e) => {
                  if (el) return;
                  let t = b.rB.clamp(e, 0, 1);
                  t <= ec || ((ec = t), C.current?.(t));
                })((ei - et.size) / ei),
                0 === et.size &&
                  (el ||
                    em ||
                    ef ||
                    ((em = !0),
                    (async () => {
                      try {
                        h();
                        try {
                          (e_ = d.compileAsync(n, c)), await e_;
                        } catch {
                          d.compile(n, c);
                        } finally {
                          e_ = null;
                        }
                        if (el) return;
                        eS({ renderer: d, scene: n, camera: c }),
                          d.getContext().finish();
                      } catch {
                        if (el) return;
                      }
                      el ||
                        ((ef = !0),
                        (O.current = !0),
                        y((e) => e + 1),
                        ex(),
                        (eg = requestAnimationFrame(() => {
                          el ||
                            (eg = requestAnimationFrame(() => {
                              el ||
                                ((d.domElement.style.opacity = "1"),
                                z.current?.());
                            }));
                        })));
                    })())));
            },
            ez = new b.C9(),
            eT = (function () {
              let e = document.createElement("canvas");
              (e.width = 512), (e.height = 512);
              let t = e.getContext("2d");
              if (t) {
                let e = P(7);
                t.clearRect(0, 0, 512, 512),
                  t.save(),
                  t.translate(256, 256),
                  (t.globalCompositeOperation = "lighter");
                for (let a = 0; a < 92; a += 1) {
                  let n = (a / 92) * Math.PI * 2 + (e() - 0.5) * 0.045,
                    r = 58 + 30 * e(),
                    i = 132 + e() ** 2 * 102,
                    o = Math.cos(n),
                    s = Math.sin(n),
                    l = t.createLinearGradient(o * r, s * r, o * i, s * i);
                  l.addColorStop(0, "rgba(255,223,145,0.22)"),
                    l.addColorStop(0.5, "rgba(255,163,67,0.08)"),
                    l.addColorStop(1, "rgba(255,120,30,0)"),
                    (t.strokeStyle = l),
                    (t.lineWidth = 0.45 + 1.35 * e()),
                    t.beginPath(),
                    t.moveTo(o * r, s * r),
                    t.lineTo(o * i, s * i),
                    t.stroke();
                }
                t.restore();
                let a = t.createRadialGradient(256, 256, 4, 256, 256, 250);
                a.addColorStop(0, "rgba(255,250,224,1)"),
                  a.addColorStop(0.13, "rgba(255,224,145,0.92)"),
                  a.addColorStop(0.27, "rgba(255,166,70,0.38)"),
                  a.addColorStop(0.53, "rgba(255,110,30,0.1)"),
                  a.addColorStop(1, "rgba(255,80,10,0)"),
                  (t.fillStyle = a),
                  t.fillRect(0, 0, 512, 512);
              }
              let a = new b.Nk(e);
              return (
                (a.colorSpace = b.nj),
                (a.minFilter = b.VV),
                (a.magFilter = b.VV),
                (a.generateMipmaps = !1),
                a
              );
            })();
          Y.add(eT);
          let eA = new b.Gu(0.5, 64, 40),
            eI = new b.Zg({
              uniforms: { uTime: { value: 0 } },
              vertexShader: `
      varying vec3 vObjectPosition;
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;

      void main() {
        vObjectPosition = normalize(position);
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vViewNormal = normalize(normalMatrix * normal);
        vViewDirection = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
              fragmentShader: `
      uniform float uTime;
      varying vec3 vObjectPosition;
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int octave = 0; octave < 4; octave += 1) {
          value += amplitude * snoise(p);
          p *= 2.02;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec3 p = vObjectPosition;
        float t = uTime;

        // Large convection currents warp the finer granulation so the
        // surface churns instead of scrolling.
        float flow = fbm(p * 2.2 + vec3(0.0, t * 0.05, t * 0.02));
        float granulation = fbm(p * 10.0 + flow * 0.9 + vec3(t * 0.03, 0.0, -t * 0.02));
        // High-frequency octaves keep extreme close-ups crisp: ridged fine
        // cells plus a micro-grain sparkle that only reads when magnified.
        float fineGrain = snoise(p * 34.0 + flow * 1.4 + vec3(0.0, -t * 0.02, t * 0.015));
        float fineCells = 1.0 - abs(snoise(p * 58.0 + flow * 1.1 + vec3(t * 0.012, t * 0.008, 0.0)));
        float microGrain = snoise(p * 120.0 + flow * 1.8 + vec3(-t * 0.01, 0.0, t * 0.014));
        float convection = fbm(p * 1.5 + vec3(-t * 0.015, t * 0.01, 0.0));

        float brightness = 0.5 + 0.27 * granulation + 0.13 * fineGrain +
          0.12 * fineCells + 0.07 * microGrain + 0.2 * convection;
        brightness = clamp(brightness, 0.0, 1.15);

        // Rare, slowly drifting sunspot groups with a penumbra rim. Two
        // independent fields must both dip, so groups stay scarce and small.
        float spotField = fbm(p * 4.6 + vec3(3.7, -1.9, t * 0.006));
        float spotRegion = fbm(p * 1.3 + vec3(-8.2, 5.1, t * 0.004));
        float regionGate = smoothstep(0.12, 0.38, spotRegion);
        float spotMask = 1.0 - regionGate * (1.0 - smoothstep(-0.72, -0.5, spotField));
        float penumbra = 1.0 - regionGate * (1.0 - smoothstep(-0.78, -0.44, spotField));

        vec3 hotColor = vec3(1.0, 0.95, 0.74);
        vec3 midColor = vec3(1.0, 0.58, 0.12);
        vec3 surface = mix(midColor, hotColor, brightness * brightness);
        surface *= 0.78 + 0.22 * penumbra;
        surface = mix(vec3(0.33, 0.09, 0.02), surface, 0.15 + 0.85 * spotMask);

        // Limb darkening with a warm shift toward the edge.
        float mu = clamp(dot(normalize(vViewNormal), normalize(vViewDirection)), 0.0, 1.0);
        float limb = 0.4 + 0.6 * pow(mu, 0.55);
        surface = mix(surface * vec3(1.0, 0.72, 0.45), surface, pow(mu, 0.35));

        gl_FragColor = vec4(surface * limb * 1.18, 1.0);
      }
    `,
              toneMapped: !1,
            }),
            eL = new b.kE(eA, eI);
          ez.add(eL);
          let eV = new b.xK({
              map: eT,
              color: 0xffc15c,
              transparent: !0,
              opacity: 0.72,
              alphaTest: 0.003,
              depthWrite: !1,
              blending: b.tq,
              toneMapped: !1,
            }),
            e$ = new b.r$(eV);
          e$.scale.set(1.8, 1.8, 1),
            (e$.renderOrder = -1),
            e$.layers.set(2),
            ez.add(e$);
          let eK = new b.xK({
              map: eT,
              color: 0xff792c,
              transparent: !0,
              opacity: 0.3,
              alphaTest: 0.003,
              depthWrite: !1,
              blending: b.tq,
              toneMapped: !1,
            }),
            eO = new b.r$(eK);
          eO.scale.set(3.2, 3.2, 1),
            (eO.renderOrder = -1),
            eO.layers.set(2),
            ez.add(eO);
          let eW = new b.SN(0xffedc4, 5, 0, 1);
          eW.layers.enable(2), ez.add(eW), n.add(ez);
          let eU = null,
            eJ = !1,
            eq = () => {
              if (!eU) return;
              let e = eU.uniforms.nightIntensity;
              e && (e.value = 1.5 * !!eJ);
            };
          en.set("earthNight", () => {
            (eJ = !1), eq();
          }),
            er.set("earthNight", () => {
              (eJ = !0), eq();
            });
          let eB = N({
            url: "https://cdn.astra-ai.co/web/labs/solar-system/textures/earth-night.webp",
            loader: Q,
            maxAnisotropy: Z,
            onLoad: () => {
              el || (er.get("earthNight")?.(), ej("earthNight"));
            },
            onError: () => {
              el || (en.get("earthNight")?.(), ej("earthNight"));
            },
          });
          Y.add(eB), (d.toneMappingExposure = 1.06);
          let eG = new b.C9(),
            eX = N({
              url: "https://cdn.astra-ai.co/web/labs/solar-system/textures/starmap.webp",
              loader: Q,
              maxAnisotropy: Z,
              onLoad: () => {
                el || ej("sky");
              },
              onError: () => {
                el || ej("sky");
              },
            });
          (eX.wrapS = b.FP), (eX.repeat.x = -1), (eX.offset.x = 1), Y.add(eX);
          let eY = new b.p$({
              map: eX,
              color: 4014411,
              side: b.tw,
              depthWrite: !1,
              toneMapped: !1,
            }),
            eQ = new b.kE(new b.Gu(140, 64, 40), eY);
          (eQ.rotation.x = eE), (eQ.renderOrder = -3), eG.add(eQ), n.add(eG);
          let eH = eF();
          Y.add(eH);
          let eZ = ({
              innerAu: e,
              outerAu: t,
              count: a,
              maxInclinationRad: n,
              size: r,
              opacity: i,
              seed: o,
            }) => {
              let s = P(o),
                l = new Float32Array(3 * a),
                c = new Float32Array(3 * a);
              for (let r = 0; r < a; r += 1) {
                let a = ev(e + s() * (t - e)),
                  i = s() * Math.PI * 2,
                  o = (s() + s() - 1) * n,
                  d = s() * Math.PI * 2;
                (l[3 * r] = a * Math.cos(i)),
                  (l[3 * r + 1] = a * Math.sin(o) * Math.sin(i + d)),
                  (l[3 * r + 2] = a * Math.sin(i));
                let u = 0.35 + 0.5 * s();
                (c[3 * r] = u),
                  (c[3 * r + 1] = u * (0.9 + 0.08 * s())),
                  (c[3 * r + 2] = u * (0.78 + 0.12 * s()));
              }
              let d = new b.ld();
              d.setAttribute("position", new b.f5(l, 3)),
                d.setAttribute("color", new b.f5(c, 3));
              let u = new b.Nj({
                  vertexColors: !0,
                  size: r,
                  sizeAttenuation: !0,
                  transparent: !0,
                  opacity: i,
                  map: eH,
                  alphaTest: 0.02,
                  depthWrite: !1,
                  toneMapped: !1,
                }),
                m = new b.sy(d, u);
              return (m.renderOrder = -1), m.layers.set(2), m;
            },
            e0 = eZ({
              innerAu: 2.1,
              outerAu: 3.3,
              count: 3200,
              maxInclinationRad: 0.14,
              size: 0.01,
              opacity: 0.5,
              seed: 20261,
            }),
            e1 = (2 * Math.PI) / 1620.4508794429719;
          n.add(e0);
          let e2 = eZ({
              innerAu: 30,
              outerAu: 50,
              count: 2400,
              maxInclinationRad: 0.3,
              size: 0.02,
              opacity: 0.22,
              seed: 977,
            }),
            e5 = (2 * Math.PI) / 88958.43523768558;
          n.add(e2);
          let e3 = new Map(),
            e4 = new Map(),
            e8 = new Map(),
            e6 = new b.Gu(1, 64, 48),
            e9 = new b.Gu(1, 12, 8),
            e7 = new b.p$({ visible: !1 }),
            te = (function ({ maxAnisotropy: e }) {
              let t = document.createElement("canvas");
              (t.width = 16), (t.height = 512);
              let a = t.getContext("2d");
              if (a)
                for (let e = 0; e < 512; e += 1) {
                  let t = e / 511,
                    n =
                      b.rB.smoothstep(t, 0, 0.035) *
                      (1 - b.rB.smoothstep(t, 0.965, 1)),
                    r = 0.5 * Math.sin(135 * t) + 0.2 * Math.sin(331 * t + 0.8),
                    i = Math.exp(-(((t - 0.58) / 0.022) ** 2)),
                    o = Math.exp(-(((t - 0.84) / 0.008) ** 2)),
                    s = Math.exp(-(((t - 0.19) / 0.11) ** 2)),
                    l = 1 - 0.94 * i - 0.72 * o,
                    c = b.rB.clamp(0.78 + 0.13 * r - 0.2 * s, 0.44, 0.98),
                    d = b.rB.clamp(n * l * (0.62 + 0.3 * c), 0, 0.94),
                    u = Math.round(238 * c),
                    m = Math.round(225 * c),
                    h = Math.round(200 * c);
                  (a.fillStyle = `rgba(${u},${m},${h},${d})`),
                    a.fillRect(0, e, 16, 1);
                }
              let n = new b.Nk(t);
              return (
                (n.colorSpace = b.nj),
                (n.anisotropy = e),
                (n.wrapS = b.Jr),
                (n.wrapT = b.Jr),
                (n.minFilter = b.Q4),
                (n.magFilter = b.VV),
                (n.generateMipmaps = !0),
                n
              );
            })({ maxAnisotropy: Z });
          for (let t of (Y.add(te), V)) {
            let r = !1,
              i = !1,
              o = N({
                url: t.textureUrl,
                loader: Q,
                maxAnisotropy: Z,
                onLoad: () => {
                  el || ((r = !0), er.get(t.key)?.(), ej(t.key));
                },
                onError: () => {
                  el || ((i = !0), en.get(t.key)?.(), ej(t.key));
                },
              });
            Y.add(o);
            let s = new b.aV({
                map: o,
                color: 0xffffff,
                roughness: t.surfaceRoughness,
                roughnessMap: "earth" === t.key ? o : null,
                bumpMap: t.surfaceRelief > 0 ? o : null,
                bumpScale: t.surfaceRelief,
                metalness: 0,
                dithering: !0,
              }),
              l = () => {
                (s.map = null),
                  (s.roughnessMap = null),
                  (s.bumpMap = null),
                  s.color.set(t.displayColor),
                  (s.needsUpdate = !0);
              },
              c = () => {
                (s.map = o),
                  (s.roughnessMap = "earth" === t.key ? o : null),
                  (s.bumpMap = t.surfaceRelief > 0 ? o : null),
                  s.color.set(0xffffff),
                  (s.needsUpdate = !0);
              };
            en.set(t.key, l),
              er.set(t.key, c),
              r && c(),
              i && l(),
              K.set(t.key, s);
            let d = new b.C9();
            d.quaternion.copy(
              (function ({ rightAscensionRad: e, declinationRad: t }) {
                let a = (function ({
                    rightAscensionRad: e,
                    declinationRad: t,
                  }) {
                    let a = Math.cos(t);
                    return eP({
                      x: a * Math.cos(e),
                      y: a * Math.sin(e),
                      z: Math.sin(t),
                    });
                  })({ rightAscensionRad: e, declinationRad: t }),
                  n = eP({ x: -Math.sin(e), y: Math.cos(e), z: 0 }),
                  r = new b.cE().crossVectors(a, n).normalize(),
                  i = new b.nd().makeBasis(n, a, r.clone().negate());
                return new b.as().setFromRotationMatrix(i).normalize();
              })(t.poleJ2000),
            );
            let m = new b.kE(e6, s);
            if (
              ((m.rotation.y = (function ({
                primeMeridianJ2000Rad: e,
                siderealRotationDays: t,
                tDays: a,
              }) {
                return (((e + (ek * a) / t) % ek) + ek) % ek;
              })({
                primeMeridianJ2000Rad: t.primeMeridianJ2000Rad,
                siderealRotationDays: t.siderealRotationDays,
                tDays: e.current,
              })),
              "earth" === t.key)
            ) {
              (m.castShadow = !0),
                (m.receiveShadow = !0),
                m.layers.set(1),
                (eU = (function ({ nightTexture: e, intensity: t }) {
                  return new b.Zg({
                    uniforms: {
                      nightMap: { value: e },
                      nightIntensity: { value: t },
                    },
                    vertexShader: `
      varying vec2 vNightUv;
      varying vec3 vNightViewNormal;
      varying vec3 vNightViewPosition;

      void main() {
        vNightUv = uv;
        vNightViewNormal = normalize(normalMatrix * normal);
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vNightViewPosition = viewPosition.xyz;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
                    fragmentShader: `
      uniform sampler2D nightMap;
      uniform float nightIntensity;
      varying vec2 vNightUv;
      varying vec3 vNightViewNormal;
      varying vec3 vNightViewPosition;

      void main() {
        vec3 sunViewPosition = (viewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        vec3 directionToSun = normalize(sunViewPosition - vNightViewPosition);
        float sunFacing = dot(normalize(vNightViewNormal), directionToSun);
        float nightSide = 1.0 - smoothstep(-0.16, 0.02, sunFacing);

        if (nightSide < 0.002) discard;

        float lightLevel = texture2D(nightMap, vNightUv).r;
        float cityEmission = smoothstep(0.008, 0.06, lightLevel)
          * pow(lightLevel, 0.55);

        if (cityEmission * nightSide < 0.002) discard;

        vec3 warmLight = vec3(1.0, 0.72, 0.38)
          * cityEmission
          * nightIntensity;
        gl_FragColor = vec4(warmLight, nightSide);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
                    transparent: !0,
                    blending: b.tq,
                    depthWrite: !1,
                    side: b.de,
                    toneMapped: !0,
                  });
                })({ nightTexture: eB, intensity: 1.5 * !!eJ }));
              let e = new b.kE(e6, eU);
              e.scale.setScalar(1.002),
                (e.renderOrder = 1),
                e.layers.set(1),
                m.add(e);
            }
            d.add(m), n.add(d), e3.set(t.key, { root: d, surface: m });
            let h = new b.kE(e9, e7);
            n.add(h), e4.set(t.key, h);
            let p = document.createElement("div");
            if (
              ((p.textContent = u[t.key]),
              (p.className =
                "pointer-events-none absolute z-3 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-white/15 bg-black/85 px-2 py-1 text-[0.68rem] font-semibold text-white shadow-lg"),
              a.appendChild(p),
              e8.set(t.key, p),
              t.atmosphere)
            ) {
              let e = new b.kE(
                e6,
                (function ({ color: e, strength: t }) {
                  return new b.Zg({
                    uniforms: {
                      atmosphereColor: { value: new b.Es(e) },
                      atmosphereStrength: { value: t },
                    },
                    vertexShader: `
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * worldPosition;
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vViewNormal = normalize(normalMatrix * normal);
        vViewDirection = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
                    fragmentShader: `
      uniform vec3 atmosphereColor;
      uniform float atmosphereStrength;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      varying vec3 vViewNormal;
      varying vec3 vViewDirection;

      void main() {
        vec3 worldNormal = normalize(vWorldNormal);
        float rim = pow(1.0 - max(dot(normalize(vViewNormal), vViewDirection), 0.0), 2.6);
        vec3 sunDirection = normalize(-vWorldPosition);
        float daylight = 0.14 + 0.86 * max(dot(worldNormal, sunDirection), 0.0);
        float alpha = rim * daylight * atmosphereStrength;
        if (alpha < 0.002) discard;
        gl_FragColor = vec4(atmosphereColor, alpha);
      }
    `,
                    transparent: !0,
                    depthWrite: !1,
                    blending: b.tq,
                    side: b.de,
                    toneMapped: !1,
                  });
                })({
                  color: t.atmosphere.color,
                  strength: t.atmosphere.strength,
                }),
              );
              e.layers.set(2),
                e.scale.setScalar(t.atmosphere.scale),
                (e.renderOrder = 2),
                d.add(e);
            }
            if ("saturn" === t.key) {
              let e = (function (e) {
                let t = new b.qZ(M, _, 96),
                  a = t.attributes.position,
                  n = t.attributes.uv;
                if (a && n) {
                  for (let e = 0; e < a.count; e += 1) {
                    let t = (Math.hypot(a.getX(e), a.getY(e)) - M) / (_ - M);
                    n.setXY(e, 0.5, t);
                  }
                  n.needsUpdate = !0;
                }
                let r = new b.aV({
                    map: e,
                    color: 0xfff8e8,
                    emissive: 0xffd9a3,
                    emissiveMap: e,
                    emissiveIntensity: 1,
                    side: b.Vs,
                    transparent: !0,
                    opacity: 0.94,
                    alphaTest: 0.02,
                    depthWrite: !1,
                    roughness: 0.86,
                    metalness: 0,
                  }),
                  i = new b.kE(t, r);
                return (i.rotation.x = Math.PI / 2), i;
              })(te);
              (e.renderOrder = 1), e.layers.set(2), d.add(e);
            }
          }
          let tt = eF();
          Y.add(tt);
          let ta = new Map();
          for (let e of V) {
            let t = new b.xK({
                map: tt,
                color: e.displayColor,
                transparent: !0,
                opacity: 0,
                depthWrite: !1,
                toneMapped: !1,
              }),
              a = new b.r$(t);
            (a.renderOrder = 3),
              a.layers.set(2),
              (a.visible = !1),
              n.add(a),
              ta.set(e.key, a);
          }
          let tn = new b.e0(1, 1, 48, 1, !0),
            tr = new b.p$({
              color: 0xffc857,
              transparent: !0,
              opacity: 0,
              blending: b.tq,
              depthWrite: !1,
              side: b.tw,
              toneMapped: !1,
            }),
            ti = tr.clone(),
            to = new b.kE(tn, tr);
          (to.visible = !1), to.layers.set(2), n.add(to);
          let ts = new b.kE(tn, ti);
          (ts.visible = !1), ts.layers.set(2), n.add(ts);
          let tl = new b.cE(),
            tc = new b.cE(0, 1, 0),
            td = !1,
            tu = !1,
            tm = N({
              url: S,
              loader: Q,
              maxAnisotropy: Z,
              onLoad: () => {
                el || ((td = !0), er.get("moon")?.(), ej("moon"));
              },
              onError: () => {
                el || ((tu = !0), en.get("moon")?.(), ej("moon"));
              },
            });
          Y.add(tm);
          let th = new b.aV({
              map: tm,
              color: 0xffffff,
              roughness: 0.97,
              metalness: 0,
              dithering: !0,
            }),
            tp = null;
          en.set("moon", () => {
            (tp ??= E()),
              Y.add(tp),
              (th.map = tp),
              th.color.set(0xffffff),
              (th.needsUpdate = !0);
          }),
            er.set("moon", () => {
              (th.map = tm), th.color.set(0xffffff), (th.needsUpdate = !0);
            }),
            td && er.get("moon")?.(),
            tu && en.get("moon")?.(),
            K.set("moon", th);
          let tf = new b.C9(),
            tg = new b.kE(e6, th);
          (tg.castShadow = !0),
            (tg.receiveShadow = !0),
            tg.layers.set(1),
            tf.add(tg),
            n.add(tf);
          let ty = new b.kE(e9, e7);
          n.add(ty);
          let tx = document.createElement("div");
          (tx.textContent = m),
            (tx.className =
              "pointer-events-none absolute z-3 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-white/15 bg-black/85 px-2 py-1 text-[0.68rem] font-semibold text-white shadow-lg"),
            a.appendChild(tx);
          let tb = new b.ld();
          {
            let e = new Float32Array(288);
            for (let t = 0; t < 96; t += 1) {
              let a = (t / 96) * Math.PI * 2;
              (e[3 * t] = Math.cos(a)),
                (e[3 * t + 1] = 0),
                (e[3 * t + 2] = Math.sin(a));
            }
            tb.setAttribute("position", new b.f5(e, 3));
          }
          let tv = new b.NQ({
              color: 7637162,
              transparent: !0,
              opacity: 0.3,
              depthWrite: !1,
              toneMapped: !1,
            }),
            tw = new b.XK(tb, tv);
          tw.layers.set(2), n.add(tw);
          let tM = new Map();
          for (let e of V) {
            let t = (function ({ planet: e, segments: t }) {
                return Array.from({ length: t }, (a, n) =>
                  ew({ planet: e, eccentricAnomalyRad: (n / t) * eb }),
                );
              })({ planet: e, segments: 256 }),
              a = new Float32Array(3 * t.length);
            for (let e = 0; e < t.length; e += 1) {
              let n = t[e];
              n &&
                ((a[3 * e] = n.x), (a[3 * e + 1] = n.y), (a[3 * e + 2] = n.z));
            }
            let r = new b.ld();
            r.setAttribute("position", new b.f5(a, 3));
            let i = new b.NQ({
                color: 7637162,
                transparent: !0,
                opacity: 0.22,
                depthWrite: !1,
                toneMapped: !1,
              }),
              o = new b.XK(r, i);
            o.layers.set(2), n.add(o), tM.set(e.key, o);
          }
          (W.current = tM), (J.current = tw);
          let t_ = U({ aspect: c.aspect });
          c.position.copy(t_.position), c.lookAt(t_.target);
          let tk = new T.OrbitControls(c, d.domElement);
          (d.domElement.style.touchAction = "none"),
            tk.target.copy(t_.target),
            (tk.enablePan = !1),
            (tk.enableDamping = !0),
            (tk.dampingFactor = 0.08),
            (tk.rotateSpeed = 0.55),
            (tk.zoomSpeed = 0.75),
            (tk.touches.TWO = b._l.DOLLY_ROTATE),
            (tk.minDistance = 0.55),
            (tk.maxDistance = 140),
            (tk.minPolarAngle = 0.06),
            (tk.maxPolarAngle = 0.86 * Math.PI),
            tk.update(),
            (B.current = tk);
          let tR = new q(c, tk),
            tP = !1,
            tj = window.matchMedia("(max-width: 1023px)"),
            tD = !1,
            tN = () => {
              let e = a.closest("section");
              (tD = !!(
                "earth" !== (t = x.current) &&
                tj.matches &&
                e &&
                e.scrollHeight > e.clientHeight + 1
              )),
                (d.domElement.style.touchAction = tD ? "pan-y" : "none"),
                (tk.touches.ONE = tD ? null : b._l.ROTATE);
            },
            tS = eC({ mediaQuery: tj, onChange: () => tN() }),
            tE = (e) => {
              !tD || e.ctrlKey || e.metaKey || e.stopImmediatePropagation();
            };
          d.domElement.addEventListener("wheel", tE, {
            capture: !0,
            passive: !0,
          }),
            tN();
          let tz = window.matchMedia("(prefers-reduced-motion: reduce)"),
            tC = tz.matches;
          tR.setReducedMotion(tC);
          let tF = eC({
            mediaQuery: tz,
            onChange: (e) => {
              (tC = e.matches), tR.setReducedMotion(tC);
            },
          });
          (L.current = tR),
            ($.current = () => {
              (tP = !1),
                (I.current = null),
                (A.current = null),
                tR.reframeSystem();
            });
          let tT = new b.L0(new b.cE(0, 0, 0), 0.5),
            tA = new b.Wk(),
            tI = new b.cE(),
            tL = (e) => {
              tA.origin.copy(c.position),
                tA.direction.set(e.x, e.y, e.z).sub(c.position);
              let t = tA.direction.length();
              return (
                !(t < 1e-6) &&
                (tA.direction.multiplyScalar(1 / t),
                null !== tA.intersectSphere(tT, tI) &&
                  tI.distanceTo(c.position) < t)
              );
            },
            tV = new b.zx(),
            t$ = new b.wq(),
            tK = [...e4.values(), ty],
            tO = new Map();
          for (let [e, t] of e4) tO.set(t, e);
          tO.set(ty, "moon");
          let tW = (e) => {
              let t = d.domElement.getBoundingClientRect();
              (t$.x = ((e.clientX - t.left) / t.width) * 2 - 1),
                (t$.y = -(2 * ((e.clientY - t.top) / t.height)) + 1),
                tV.setFromCamera(t$, c);
              let a = tV.intersectObjects(tK, !1)[0];
              return !a || tL(a.object.position)
                ? null
                : (tO.get(a.object) ?? null);
            },
            tU = null,
            tJ = new Set(),
            tq = !1,
            tB = null,
            tG = new b._m(new b.cE(0, 1, 0), 0),
            tX = new b.cE(),
            tY = null,
            tQ = null,
            tH = (e) => {
              tY === e && ((tY = null), (tk.enabled = !0));
            },
            tZ = (e) => {
              if ("mouse" !== e.pointerType || 0 === e.button) {
                if (
                  "touch" === e.pointerType &&
                  (tJ.add(e.pointerId), tJ.size > 1)
                ) {
                  tU = null;
                  return;
                }
                if (e.isPrimary) {
                  if (
                    ((tU = {
                      pointerId: e.pointerId,
                      pointerType: e.pointerType,
                      x: e.clientX,
                      y: e.clientY,
                    }),
                    "earth" === x.current && null === tY && "moon" === tW(e))
                  ) {
                    (tY = e.pointerId), (tk.enabled = !1), D.current();
                    try {
                      d.domElement.setPointerCapture(e.pointerId);
                    } catch {}
                  }
                  "touch" !== e.pointerType &&
                    ((tq = !0), (d.domElement.style.cursor = "grabbing"));
                }
              }
            },
            t0 = (e) => {
              tH(e.pointerId),
                "touch" === e.pointerType && tJ.delete(e.pointerId);
              let t = tU?.pointerId === e.pointerId ? tU : null;
              tU = null;
              let a = null !== t || "touch" !== e.pointerType ? tW(e) : null;
              if (
                ("touch" !== e.pointerType &&
                  ((tq = !1),
                  (d.domElement.style.cursor = a ? "pointer" : "grab")),
                !t || !a)
              )
                return;
              let n = "touch" === t.pointerType ? 10 : 5;
              Math.hypot(e.clientX - t.x, e.clientY - t.y) > n ||
                ("moon" === a ? j.current() : R.current(a));
            },
            t1 = (t) => {
              if (tY === t.pointerId && tQ) {
                let a = d.domElement.getBoundingClientRect();
                (t$.x = ((t.clientX - a.left) / a.width) * 2 - 1),
                  (t$.y = -(2 * ((t.clientY - a.top) / a.height)) + 1),
                  tV.setFromCamera(t$, c),
                  (tG.constant = -tQ.y),
                  tV.ray.intersectPlane(tG, tX) &&
                    (e.current = H(
                      (function ({ phaseRad: e, nearTDays: t }) {
                        let a = ed(e - eh(t)),
                          n = t + (a / ee) * eo;
                        for (let t = 0; t < 3; t += 1) {
                          let t = ed(eh(n) - e);
                          n -= t / ep(n);
                        }
                        return n;
                      })({
                        phaseRad:
                          -Math.atan2(tX.z - tQ.z, tX.x - tQ.x) -
                          -Math.atan2(-tQ.z, -tQ.x),
                        nearTDays: e.current,
                      }),
                    ));
              }
              if (tU?.pointerId === t.pointerId) {
                let e = "touch" === tU.pointerType ? 10 : 5;
                Math.hypot(t.clientX - tU.x, t.clientY - tU.y) > e &&
                  (tU = null);
              }
              "touch" !== t.pointerType &&
                (tB = { clientX: t.clientX, clientY: t.clientY });
            },
            t2 = (e) => {
              tH(e.pointerId),
                "touch" !== e.pointerType &&
                  (tU?.pointerId === e.pointerId && (tU = null),
                  (tq = !1),
                  (tB = null),
                  (F.current = null),
                  (d.domElement.style.cursor = "grab"));
            },
            t5 = (e) => {
              tH(e.pointerId),
                tJ.delete(e.pointerId),
                tU?.pointerId === e.pointerId && (tU = null),
                "touch" !== e.pointerType &&
                  ((tq = !1),
                  (tB = null),
                  (F.current = null),
                  (d.domElement.style.cursor = "grab"));
            },
            t3 = performance.now() + 8e3;
          tk.autoRotateSpeed = 0.12;
          let t4 = !1,
            t8 = () => {
              (t4 = !0), (t3 = performance.now() + 8e3);
            },
            t6 = () => {
              t4 && !tR.isTransitioning() && (tP = !0);
            },
            t9 = () => {
              (t4 = !1), (t3 = performance.now() + 8e3);
            };
          tk.addEventListener("start", t8),
            tk.addEventListener("change", t6),
            tk.addEventListener("end", t9),
            (d.domElement.style.cursor = "grab"),
            d.domElement.addEventListener("pointerdown", tZ),
            d.domElement.addEventListener("pointerup", t0),
            d.domElement.addEventListener("pointermove", t1),
            d.domElement.addEventListener("pointerleave", t2),
            d.domElement.addEventListener("pointercancel", t5);
          let t7 = new b.mR(),
            ae = 0 / 0,
            at = 40 * Math.tan(b.rB.degToRad(c.fov / 2)),
            aa = new b.cE(),
            an = { x: 0, y: 0, z: 0, key: "mercury" },
            ar = { x: 0, y: 0, z: 0, key: "mercury" },
            ai = new b.cE(),
            ao = 0,
            as = null,
            al = ({ label: e, x: t, y: a, z: n }) => {
              let r = ai.set(t, a, n).project(c);
              r.z > -1 && r.z < 1
                ? ((e.style.display = "block"),
                  (e.style.left = `${((r.x + 1) / 2) * o}px`),
                  (e.style.top = `${((-r.y + 1) / 2) * s}px`))
                : (e.style.display = "none");
            },
            ac = ({
              cone: e,
              material: t,
              opacity: a,
              radius: n,
              length: r,
              origin: i,
              toward: o,
            }) => {
              tl.set(o.x - i.x, o.y - i.y, o.z - i.z).normalize(),
                (e.visible = !0),
                (t.opacity = a),
                e.scale.set(n, r, n),
                e.quaternion.setFromUnitVectors(tc, tl),
                e.position.set(
                  i.x + tl.x * (r / 2),
                  i.y + tl.y * (r / 2),
                  i.z + tl.z * (r / 2),
                );
            },
            ad = ({ p: e, inputs: t, captures: a }) => {
              let n = e3.get(e.key);
              if (!n) return;
              let {
                  currT: r,
                  dt: i,
                  elapsedSimDays: o,
                  pv: l,
                  hover: d,
                  selectedKey: u,
                  sourceKey: m,
                } = t,
                { root: h, surface: p } = n;
              h.visible = !0;
              let f = eM({ planet: e, tDays: r });
              h.position.set(f.x, f.y, f.z);
              let g = k({ radiusKm: e.radiusKm });
              h.scale.set(g, g * e.polarScale, g),
                "earth" === e.key &&
                  ((a.earthPosition = f), (a.earthRadius = g));
              let y = e4.get(e.key);
              if (y) {
                let t = (c.position.distanceTo(h.position) * at) / s,
                  a = "saturn" === e.key ? g * _ : g;
                y.position.copy(h.position), y.scale.setScalar(Math.max(a, t));
              }
              p.rotation.y = (function ({
                currentAngle: e,
                elapsedRealSeconds: t,
                elapsedSimDays: a,
                reduceMotion: n,
                siderealRotationDays: r,
              }) {
                if (n || 0 === a) return e;
                let i = (ek * a) / r;
                return (
                  (((e + Math.sign(i) * Math.min(Math.abs(i), eR * t)) % ek) +
                    ek) %
                  ek
                );
              })({
                currentAngle: p.rotation.y,
                elapsedRealSeconds: i,
                elapsedSimDays: o,
                reduceMotion: tC,
                siderealRotationDays: e.siderealRotationDays,
              });
              let x = ta.get(e.key);
              x &&
                (({ marker: e, root: t, r: a }) => {
                  let n =
                      c.position.distanceTo(t.position) *
                      Math.tan(b.rB.degToRad(c.fov / 2)),
                    r = (a / n) * (s / 2),
                    i = b.rB.clamp((5 - r) / 3, 0, 1);
                  i > 0
                    ? (e.position.copy(t.position),
                      e.scale.setScalar((10 / s) * 2 * n),
                      (e.material.opacity = 0.9 * i),
                      (e.visible = !0))
                    : (e.visible = !1);
                })({ marker: x, root: h, r: g }),
                l === e.key &&
                  ((an.x = f.x),
                  (an.y = f.y),
                  (an.z = f.z),
                  (an.key = e.key),
                  (a.focus = an)),
                m === e.key &&
                  ((ar.x = f.x),
                  (ar.y = f.y),
                  (ar.z = f.z),
                  (ar.key = e.key),
                  (a.sourceFocus = ar));
              let v = e8.get(e.key);
              v &&
                ((e.key !== d && (null !== l || e.key !== u)) || tL(f)
                  ? (v.style.display = "none")
                  : al({
                      label: v,
                      x: h.position.x,
                      y: h.position.y + 1.55 * g,
                      z: h.position.z,
                    }));
            },
            au = (a) => {
              ao = requestAnimationFrame(au);
              let r = (function ({ timestampMs: e, nextDeadlineMs: t }) {
                if (null === t)
                  return { shouldRender: !0, nextDeadlineMs: e + eD };
                if (e + 0.75 < t)
                  return { shouldRender: !1, nextDeadlineMs: t };
                let a = Math.max(1, Math.floor((e - t) / eD) + 1);
                return { shouldRender: !0, nextDeadlineMs: t + a * eD };
              })({ timestampMs: a, nextDeadlineMs: as });
              if (((as = r.nextDeadlineMs), !r.shouldRender)) return;
              let i = t7.getDelta(),
                o = 0.12 * i,
                l = e.current,
                u = l !== ae,
                m = Number.isNaN(ae) ? 0 : l - ae;
              (ae = l),
                0 !== m &&
                  ((e0.rotation.y += e1 * m), (e2.rotation.y += e5 * m));
              let h = x.current;
              if ((t !== h && tN(), tB)) {
                let e = tW(tB);
                (F.current = e),
                  tq || (d.domElement.style.cursor = e ? "pointer" : "grab"),
                  (tB = null);
              }
              let p = {
                  currT: l,
                  dt: i,
                  elapsedSimDays: m,
                  pv: h,
                  hover: F.current,
                  selectedKey: w.current,
                  sourceKey: I.current,
                },
                f = {
                  focus: null,
                  sourceFocus: null,
                  earthPosition: null,
                  earthRadius: 0,
                };
              if (!tC && u) {
                (eL.rotation.y += 0.35 * o),
                  (eV.rotation += 0.035 * o),
                  (eK.rotation -= 0.018 * o);
                let e = eI.uniforms.uTime;
                e && (e.value += i);
              }
              for (let e of V) ad({ p: e, inputs: p, captures: f });
              let { focus: g, sourceFocus: y, earthPosition: v } = f;
              v &&
                (({ inputs: e, earthPosition: t, earthRadius: a }) => {
                  let { currT: n, pv: r, hover: i } = e;
                  tQ = t;
                  let o = Math.max(0, 1 - 0.35 / Math.hypot(t.x, t.y, t.z));
                  X.position.set(t.x * o, t.y * o, t.z * o),
                    G.position.set(t.x, t.y, t.z);
                  let l = 3.2 * a,
                    d = k({ radiusKm: 1737 }),
                    { position: u, nodeAngleRad: m } = (function ({
                      earthPosition: e,
                      tDays: t,
                      orbitRadius: a,
                    }) {
                      let n = -Math.atan2(-e.z, -e.x) + eh(t),
                        r = eu({ element: ea, tDays: t }),
                        i = -n,
                        o = -r,
                        s = Math.cos(es),
                        l = Math.sin(es),
                        c = n - r,
                        d = Math.cos(c);
                      return {
                        position: {
                          x:
                            e.x +
                            a * (Math.cos(i) * s + Math.cos(o) * d * (1 - s)),
                          y: e.y + a * Math.sin(c) * l,
                          z:
                            e.z +
                            a * (Math.sin(i) * s + Math.sin(o) * d * (1 - s)),
                        },
                        nodeAngleRad: o,
                      };
                    })({ earthPosition: t, tDays: n, orbitRadius: l });
                  tf.position.set(u.x, u.y, u.z),
                    tf.scale.setScalar(d),
                    tf.quaternion.copy(
                      (function ({ moonPosition: e, earthPosition: t }) {
                        let a = new b.cE(0, 1, 0),
                          n = new b.cE(t.x - e.x, 0, t.z - e.z);
                        0 === n.lengthSq() && n.set(1, 0, 0), n.normalize();
                        let r = new b.nd().makeBasis(
                          n,
                          a,
                          new b.cE().crossVectors(n, a),
                        );
                        return new b.as().setFromRotationMatrix(r).normalize();
                      })({ moonPosition: u, earthPosition: t }),
                    ),
                    tw.position.set(t.x, t.y, t.z),
                    tw.scale.setScalar(l),
                    aa.set(Math.cos(m), 0, Math.sin(m)),
                    tw.setRotationFromAxisAngle(aa, es);
                  let h = ey(n),
                    p = h ? Math.max(0, 1 - Math.abs(h.tDays - n) / 0.5) : 0,
                    f = h?.kind === "lunar" ? p : 0,
                    g = Math.hypot(u.x - t.x, u.y - t.y, u.z - t.z) + a,
                    y = 1.45 * l;
                  h?.kind === "solar" && p > 0.02
                    ? ac({
                        cone: to,
                        material: tr,
                        opacity: 0.2 * p,
                        radius: d,
                        length: g,
                        origin: u,
                        toward: t,
                      })
                    : (to.visible = !1),
                    h?.kind === "lunar" && p > 0.02
                      ? ac({
                          cone: ts,
                          material: ti,
                          opacity: 0.11 * p,
                          radius: a,
                          length: y,
                          origin: t,
                          toward: u,
                        })
                      : (ts.visible = !1),
                    th.color.setRGB(1 - 0.2 * f, 1 - 0.58 * f, 1 - 0.68 * f);
                  let x = (c.position.distanceTo(tf.position) * at) / s;
                  ty.position.copy(tf.position),
                    ty.scale.setScalar("earth" === r ? Math.max(d, x) : d),
                    ("moon" !== i && "earth" !== r) || tL(u)
                      ? (tx.style.display = "none")
                      : al({ label: tx, x: u.x, y: u.y + 1.9 * d, z: u.z });
                })({ inputs: p, earthPosition: v, earthRadius: f.earthRadius }),
                (tk.autoRotate =
                  !tC &&
                  !t4 &&
                  null === tY &&
                  !tR.isTransitioning() &&
                  a >= t3),
                tR.update({ focus: g, sourceFocus: y }),
                tR.isTransitioning() || (I.current = null),
                eG.position.copy(c.position);
              let M = c.position.distanceTo(tk.target),
                _ = b.rB.clamp((M - 0.4) / 2.6, 0, 1);
              (e0.material.opacity = 0.5 * _),
                (e0.visible = _ > 0.01),
                (e2.material.opacity = 0.22 * _),
                (e2.visible = _ > 0.01);
              let R = b.rB.clamp(0.02 * M, 4e-4, 5e-4);
              Math.abs(c.near - R) > 0.25 * c.near &&
                ((c.near = R), c.updateProjectionMatrix()),
                eS({ renderer: d, scene: n, camera: c });
            },
            am = () => {
              ao && (cancelAnimationFrame(ao), (ao = 0));
            },
            ah = !0,
            ap = () => {
              document.hidden || !ah
                ? am()
                : !ao &&
                  ef &&
                  (t7.getDelta(),
                  (as = null),
                  (ao = requestAnimationFrame(au)));
            };
          (ex = ap), ap(), document.addEventListener("visibilitychange", ap);
          let af = new IntersectionObserver(
            ([e]) => {
              (ah = e?.isIntersecting ?? !0), ap();
            },
            { rootMargin: "100px" },
          );
          af.observe(a);
          let ag = () => {
              if (
                (tN(), h() && null === x.current) &&
                !tR.retargetSystemFrame() &&
                !tP
              ) {
                let e = U({ aspect: c.aspect });
                c.position.copy(e.position),
                  tk.target.copy(e.target),
                  c.lookAt(e.target);
              }
            },
            ay = new ResizeObserver(ag);
          return (
            ay.observe(a),
            window.addEventListener("resize", ag, { passive: !0 }),
            () => {
              for (let e of ((el = !0),
              eg && cancelAnimationFrame(eg),
              am(),
              (O.current = !1),
              document.removeEventListener("visibilitychange", ap),
              af.disconnect(),
              tF(),
              tS(),
              ay.disconnect(),
              window.removeEventListener("resize", ag),
              d.domElement.removeEventListener("wheel", tE, !0),
              d.domElement.removeEventListener("pointerdown", tZ),
              d.domElement.removeEventListener("pointerup", t0),
              d.domElement.removeEventListener("pointermove", t1),
              d.domElement.removeEventListener("pointerleave", t2),
              d.domElement.removeEventListener("pointercancel", t5),
              tk.removeEventListener("start", t8),
              tk.removeEventListener("change", t6),
              tk.removeEventListener("end", t9),
              tk.dispose(),
              e8.values()))
                e.remove();
              tx.remove();
              let e = new Set(),
                t = new Set();
              n.traverse((a) => {
                if (a instanceof b.kE || a instanceof b.sy || a instanceof b.DL)
                  for (let n of (e.add(a.geometry),
                  Array.isArray(a.material) ? a.material : [a.material]))
                    t.add(n);
                else a instanceof b.r$ && t.add(a.material);
              }),
                d.domElement.remove();
              let r = () => {
                for (let t of e) t.dispose();
                for (let e of t) e.dispose();
                for (let e of Y) e.dispose();
                (0, v.A)({ renderer: d, container: a });
              };
              e_ ? e_.then(r, r) : r(),
                (W.current = new Map()),
                (J.current = null),
                (B.current = null),
                (L.current = null),
                ($.current = null);
            }
          );
        }, [u, m, e]),
        (0, s.useEffect)(() => {
          let t = B.current,
            n = L.current;
          if (!t || !n || !O.current || 0 === g) return;
          let r = A.current;
          A.current = a;
          let i = r !== a;
          if (null === a)
            i &&
              void 0 !== r &&
              ((I.current = r),
              n.flyToSystem({
                source: r ? ez({ key: r, tDays: e.current }) : null,
              }));
          else {
            let t = V.find((e) => e.key === a);
            if (t) {
              let i,
                o = eM({ planet: t, tDays: e.current }),
                s = k({ radiusKm: t.radiusKm }),
                l =
                  "system" ==
                  (i = r === a ? "reframe" : null == r ? "system" : "planet")
                    ? null
                    : (r ?? a);
              (I.current = l),
                n.flyToPlanet({
                  planet: t,
                  pos: o,
                  radius: s,
                  origin: i,
                  source: l ? ez({ key: l, tDays: e.current }) : null,
                });
            }
          }
        }, [a, g, e]),
        (0, s.useEffect)(() => {
          K.current !== h &&
            O.current &&
            0 !== g &&
            ((K.current = h), $.current?.());
        }, [h, g]),
        (0, s.useEffect)(() => {
          if (!O.current || 0 === g) return;
          let e = J.current;
          e &&
            ((e.visible = n),
            e.material instanceof b.NQ &&
              (e.material.opacity =
                null === a ? 0.3 : "earth" === a ? 0.5 : 0.08));
          for (let [e, t] of W.current)
            (t.visible = n),
              (function ({ ring: e, isSelected: t, planetView: a }) {
                for (let n of Array.isArray(e.material)
                  ? e.material
                  : [e.material])
                  n instanceof b.NQ &&
                    (n.color.set(t ? 5607935 : 7637162),
                    (n.opacity = (function ({ planetView: e, isSelected: t }) {
                      return null === e ? (t ? 0.58 : 0.22) : t ? 0.16 : 0.045;
                    })({ planetView: a, isSelected: t })));
              })({ ring: t, isSelected: e === r, planetView: a });
        }, [n, a, r, g]),
        (0, t.jsx)("div", {
          ref: f,
          role: "img",
          "aria-label": p,
          className: "relative h-full w-full",
        })
      );
    }
    let eA = ["day", "month", "year"],
      eI = { day: 2, month: 45, year: 365 },
      eL = { day: 96, month: 8, year: 0.8 },
      eV = { day: 1, month: 30.44, year: 365.25 };
    function e$({
      tRef: e,
      granularity: a,
      label: n,
      locale: r,
      onScrubStart: i,
      onScrub: o,
    }) {
      let l = (0, s.useMemo)(
          () =>
            new Intl.DateTimeFormat(r, {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          [r],
        ),
        c = (0, s.useRef)(null),
        d = (0, s.useRef)(null),
        u = (0, s.useRef)(null),
        [m, h] = (0, s.useState)(() => Math.round(e.current)),
        p = (0, s.useRef)(0),
        f = (t = 0) => {
          let n = eL[a],
            r = -(e.current * n),
            i = c.current,
            o = d.current;
          if (i) {
            let e = `${r % 12}px`;
            i.style.backgroundPositionX !== e &&
              (i.style.backgroundPositionX = e);
          }
          if (o) {
            let e = `${r % 72}px`;
            o.style.backgroundPositionX !== e &&
              (o.style.backgroundPositionX = e);
          }
          if (((p.current += t), p.current >= 0.25)) {
            p.current = 0;
            let t = Math.round(e.current);
            h((e) => (e === t ? e : t));
          }
        };
      (0, g.f)({ tick: f, ignoreReducedMotion: !0 });
      let y = () => h(Math.round(e.current));
      return (0, t.jsxs)("div", {
        role: "slider",
        "aria-label": n,
        "aria-valuemin": Y,
        "aria-valuemax": Q,
        "aria-valuenow": m,
        "aria-valuetext": l.format(X(m)),
        tabIndex: 0,
        className:
          "group relative h-10 min-w-0 flex-1 cursor-ew-resize touch-none select-none overflow-hidden rounded-xl bg-white/[0.035] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
        onPointerDown: (t) => {
          ("mouse" !== t.pointerType || 0 === t.button) &&
            ((u.current = {
              pointerId: t.pointerId,
              startX: t.clientX,
              startT: e.current,
            }),
            t.currentTarget.setPointerCapture(t.pointerId),
            i());
        },
        onPointerMove: (t) => {
          let n = u.current;
          if (!n || n.pointerId !== t.pointerId) return;
          let r = (n.startX - t.clientX) / eL[a];
          (e.current = H(n.startT + r)), f(), y(), o();
        },
        onPointerUp: (e) => {
          u.current?.pointerId === e.pointerId && (u.current = null);
        },
        onPointerCancel: () => {
          u.current = null;
        },
        onKeyDown: (t) => {
          let n = eV[a],
            r =
              "ArrowRight" === t.key
                ? n
                : "ArrowLeft" === t.key
                  ? -n
                  : "PageUp" === t.key
                    ? 10 * n
                    : "PageDown" === t.key
                      ? -(10 * n)
                      : null;
          null !== r &&
            (t.preventDefault(),
            i(),
            (e.current = H(e.current + r)),
            f(),
            y(),
            o());
        },
        children: [
          (0, t.jsx)("div", {
            ref: c,
            "aria-hidden": !0,
            className: "absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2",
            style: {
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 12px)",
            },
          }),
          (0, t.jsx)("div", {
            ref: d,
            "aria-hidden": !0,
            className: "absolute inset-x-0 top-1/2 h-5 -translate-y-1/2",
            style: {
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 72px)",
            },
          }),
          (0, t.jsx)("div", {
            "aria-hidden": !0,
            className:
              "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050f19_0%,transparent_18%,transparent_82%,#02080f_100%)]",
          }),
          (0, t.jsx)("div", {
            "aria-hidden": !0,
            className:
              "pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary shadow-[0_0_0.5rem_rgba(38,81,255,0.9)]",
          }),
          (0, t.jsx)("div", {
            "aria-hidden": !0,
            className:
              "pointer-events-none absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0.5rem_rgba(38,81,255,0.9)]",
          }),
        ],
      });
    }
    function eK({ tRef: e, locale: a }) {
      let n = (0, s.useMemo)(
          () =>
            new Intl.DateTimeFormat(a, {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          [a],
        ),
        [r, i] = (0, s.useState)(() => n.format(X(e.current))),
        o = (0, s.useRef)(0);
      return (
        (0, g.f)({
          tick: (t) => {
            if (((o.current += t), o.current < 0.1)) return;
            o.current = 0;
            let a = n.format(X(e.current));
            i((e) => (e === a ? e : a));
          },
          ignoreReducedMotion: !0,
        }),
        (0, t.jsx)("span", { suppressHydrationWarning: !0, children: r })
      );
    }
    function eO({ value: e, labels: a, groupLabel: n, onChange: r }) {
      return (0, t.jsx)("div", {
        className:
          "grid h-10 grid-cols-3 rounded-xl bg-black/25 p-0.5 text-[0.65rem] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]",
        role: "group",
        "aria-label": n,
        children: eA.map((n) =>
          (0, t.jsx)(
            "button",
            {
              type: "button",
              className: (0, u.f)(
                "min-h-9 min-w-0 truncate rounded-[0.625rem] px-2 transition-[scale,background-color,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96]",
                e === n
                  ? "bg-primary text-white shadow-[0_0.25rem_1rem_rgba(38,81,255,0.35)]"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              ),
              "aria-pressed": e === n,
              onClick: () => r(n),
              children: a[n],
            },
            n,
          ),
        ),
      });
    }
    function eW(e) {
      let t = 2 * Math.PI,
        a = e % t;
      return a < 0 ? a + t : a;
    }
    let eU = V.length + 3,
      eJ = { key: "moon", displayColor: L, textureUrl: S },
      eq = [...V.map((e) => e.textureUrl), j, S];
    function eB({
      auFmt: e,
      intFmt: a,
      ratioFmt: n,
      messages: r,
      planet: i,
      title: o,
      variant: s,
    }) {
      let l = "earth" === i.key,
        c =
          i.periodDays < 1e3
            ? `${a.format(i.periodDays)} ${r.labels.days}`
            : `${n.format(i.periodDays / 365.25)} ${r.labels.earthYears}`,
        d = l
          ? `${a.format(i.radiusKm)} ${r.labels.km}`
          : `${(i.radiusKm / 6371 < 1 ? e : n).format(i.radiusKm / 6371)}${r.labels.timesEarth}`,
        m = [
          { label: r.info.year, value: c },
          {
            label: r.info.distance,
            value: `${e.format(i.semiMajorAu)} ${r.labels.au}`,
          },
          { label: r.info.size, value: d },
          { label: r.info.moons, value: a.format(i.moonCount) },
        ];
      return (0, t.jsxs)("div", {
        children: [
          (0, t.jsxs)("div", {
            className: (0, u.f)(
              "flex items-start justify-between gap-3 px-1",
              "drawer" === s && "pr-12",
            ),
            children: [
              (0, t.jsxs)("div", {
                className: "min-w-0",
                children: [
                  o,
                  (0, t.jsxs)("div", {
                    className: "mt-2 flex items-center gap-1.5",
                    "aria-hidden": !0,
                    children: [
                      (0, t.jsx)("span", {
                        className: "h-0.5 w-8 rounded-full",
                        style: { backgroundColor: i.displayColor },
                      }),
                      (0, t.jsx)("span", {
                        className: "h-px w-12 bg-white/15",
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)("span", {
                className:
                  "mt-1 h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_0.75rem_currentColor]",
                style: { color: i.displayColor },
                "aria-hidden": !0,
              }),
            ],
          }),
          (0, t.jsx)(
            eX,
            {
              className: (0, u.f)(
                "mx-auto flex",
                "drawer" === s ? "my-2 h-36 w-42" : "my-2 h-42 w-48",
              ),
              planet: i,
            },
            i.key,
          ),
          (0, t.jsx)("dl", {
            className: (0, u.f)(
              "grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 text-center tabular-nums shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
              "drawer" === s ? "mt-2" : "mt-1",
            ),
            children: m.map((e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: "min-w-0 bg-[#06101a]/95 px-1.5 py-2.5",
                  children: [
                    (0, t.jsx)("dt", {
                      className:
                        "block truncate text-[0.65rem] font-semibold uppercase tracking-widest text-white/55",
                      children: e.label,
                    }),
                    (0, t.jsx)("dd", {
                      className:
                        "mt-1 block whitespace-nowrap text-sm font-semibold text-white",
                      children: e.value,
                    }),
                  ],
                },
                e.label,
              ),
            ),
          }),
          (0, t.jsx)("p", {
            className:
              "mt-3 rounded-xl bg-white/2.5 p-3 text-pretty text-sm leading-6 text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
            children: r.facts[i.key],
          }),
        ],
      });
    }
    function eG({
      auFmt: e,
      intFmt: a,
      ratioFmt: n,
      messages: r,
      tRef: i,
      title: o,
      variant: l,
    }) {
      let c,
        d = (0, s.useRef)(eh(i.current)),
        [m, h] = (0, s.useState)(d.current),
        p = (0, s.useRef)(0);
      (0, g.f)({
        tick: (e) => {
          (d.current = eh(i.current)),
            (p.current += e),
            p.current < 0.1 ||
              ((p.current = 0), h((e) => (e === d.current ? e : d.current)));
        },
        ignoreReducedMotion: !0,
      });
      let f = (0, s.useRef)(!1);
      (0, s.useEffect)(() => {
        let e = window.matchMedia("(prefers-reduced-motion: reduce)"),
          t = () => {
            f.current = e.matches || document.hidden;
          };
        return (
          t(),
          e.addEventListener?.("change", t),
          document.addEventListener("visibilitychange", t),
          () => {
            e.removeEventListener?.("change", t),
              document.removeEventListener("visibilitychange", t);
          }
        );
      }, []);
      let y =
          (c = eW(m)) < 0.15 || c > 2 * Math.PI - 0.15
            ? "new"
            : 0.15 > Math.abs(c - Math.PI / 2)
              ? "firstQuarter"
              : 0.15 > Math.abs(c - Math.PI)
                ? "full"
                : 0.15 > Math.abs(c - (3 * Math.PI) / 2)
                  ? "lastQuarter"
                  : c < Math.PI / 2
                    ? "waxingCrescent"
                    : c < Math.PI
                      ? "waxingGibbous"
                      : c < (3 * Math.PI) / 2
                        ? "waningGibbous"
                        : "waningCrescent",
        x = Math.round(100 * ((1 - Math.cos(eW(m))) / 2)),
        b = [
          { label: r.info.oneLap, value: `${n.format(27.3)} ${r.labels.days}` },
          {
            label: r.moon.labels.fromEarth,
            value: `${a.format(384400)} ${r.labels.km}`,
          },
          {
            label: r.info.size,
            value: `${e.format(0.27)}${r.labels.timesEarth}`,
          },
          { label: r.moon.readouts.illumination, value: `${a.format(x)} %` },
        ];
      return (0, t.jsxs)("div", {
        children: [
          (0, t.jsxs)("div", {
            className: (0, u.f)(
              "flex items-start justify-between gap-3 px-1",
              "drawer" === l && "pr-12",
            ),
            children: [
              (0, t.jsxs)("div", {
                className: "min-w-0",
                children: [
                  o,
                  (0, t.jsxs)("div", {
                    className: "mt-2 flex items-center gap-1.5",
                    "aria-hidden": !0,
                    children: [
                      (0, t.jsx)("span", {
                        className: "h-0.5 w-8 rounded-full",
                        style: { backgroundColor: L },
                      }),
                      (0, t.jsx)("span", {
                        className: "h-px w-12 bg-white/15",
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsx)("span", {
                className:
                  "mt-1 h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_0.75rem_currentColor]",
                style: { color: L },
                "aria-hidden": !0,
              }),
            ],
          }),
          (0, t.jsxs)("div", {
            className: (0, u.f)(
              "relative mx-auto my-2 overflow-hidden rounded-2xl bg-[#030712] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
              "drawer" === l ? "h-40" : "h-42",
            ),
            children: [
              (0, t.jsx)(F, {
                thetaRef: d,
                reduceMotionRef: f,
                ariaLabel: `${r.moon.labels.fromEarth} — ${r.moon.phaseNames[y]}`,
              }),
              (0, t.jsx)("div", {
                className:
                  "pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/60",
                children: r.moon.labels.fromEarth,
              }),
              (0, t.jsx)("div", {
                className:
                  "pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-2.5 py-1 text-[0.68rem] font-semibold text-white/90",
                children: r.moon.phaseNames[y],
              }),
            ],
          }),
          (0, t.jsx)("dl", {
            className:
              "mt-1 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 text-center tabular-nums shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
            children: b.map((e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: "min-w-0 bg-[#06101a]/95 px-1.5 py-2.5",
                  children: [
                    (0, t.jsx)("dt", {
                      className:
                        "block truncate text-[0.65rem] font-semibold uppercase tracking-widest text-white/55",
                      children: e.label,
                    }),
                    (0, t.jsx)("dd", {
                      className:
                        "mt-1 block truncate whitespace-nowrap text-sm font-semibold text-white",
                      children: e.value,
                    }),
                  ],
                },
                e.label,
              ),
            ),
          }),
          (0, t.jsx)("p", {
            className:
              "mt-3 rounded-xl bg-white/2.5 p-3 text-pretty text-sm leading-6 text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
            children: r.moon.fact,
          }),
        ],
      });
    }
    function eX({ planet: e, className: a, onAssetSettled: n }) {
      let r = "saturn" === e.key,
        [i, o] = (0, s.useState)(!1),
        [l, c] = (0, s.useState)(!1),
        [d, m] = (0, s.useState)(1),
        [h, p] = (0, s.useState)(1),
        f = ({ image: e, attempt: t, onRetry: a, onExhausted: n }) => {
          if (t >= 3) {
            (e.hidden = !0), n();
            return;
          }
          a();
        },
        g = ({ image: e, onDecoded: t, onDecodeError: a }) => {
          "function" != typeof e.decode ? t() : e.decode().then(t, a);
        };
      return (0, t.jsxs)("span", {
        className: (0, u.f)(
          "relative isolate flex shrink-0 items-center justify-center",
          a,
        ),
        "aria-hidden": !0,
        children: [
          r
            ? (0, t.jsx)("span", {
                className:
                  "absolute h-[36%] w-full -rotate-12 overflow-hidden opacity-[0.85] drop-shadow-[0_0_0.5rem_rgba(205,180,125,0.2)]",
                style: {
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, transparent 0 43%, black 44% 72%, transparent 73%)",
                  maskImage:
                    "radial-gradient(ellipse at center, transparent 0 43%, black 44% 72%, transparent 73%)",
                },
                children: (0, t.jsx)("img", {
                  src: D({ url: j, attempt: h }),
                  alt: "",
                  draggable: !1,
                  className: (0, u.f)(
                    "h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none",
                    l ? "opacity-100" : "opacity-0",
                  ),
                  onLoad: ({ currentTarget: e }) => {
                    g({
                      image: e,
                      onDecoded: () => {
                        c(!0), n?.(j);
                      },
                      onDecodeError: () => {
                        f({
                          image: e,
                          attempt: h,
                          onRetry: () => p((e) => e + 1),
                          onExhausted: () => n?.(j),
                        });
                      },
                    });
                  },
                  onError: ({ currentTarget: e }) => {
                    f({
                      image: e,
                      attempt: h,
                      onRetry: () => p((e) => e + 1),
                      onExhausted: () => n?.(j),
                    });
                  },
                }),
              })
            : null,
          (0, t.jsxs)("span", {
            className: (0, u.f)(
              "relative aspect-square overflow-hidden rounded-full bg-black outline outline-1 -outline-offset-1 outline-white/10 shadow-[inset_-0.75rem_-0.25rem_1.2rem_rgba(0,0,0,0.55),0_0.25rem_0.8rem_rgba(0,0,0,0.35)]",
              r ? "h-[70%]" : "h-[84%]",
            ),
            style: { backgroundColor: e.displayColor },
            children: [
              (0, t.jsx)("img", {
                src: D({ url: e.textureUrl, attempt: d }),
                alt: "",
                draggable: !1,
                className: (0, u.f)(
                  "absolute inset-y-0 left-1/2 h-full w-[200%] max-w-none -translate-x-1/2 object-cover transition-opacity duration-300 motion-reduce:transition-none",
                  i ? "opacity-100" : "opacity-0",
                ),
                onLoad: ({ currentTarget: t }) => {
                  g({
                    image: t,
                    onDecoded: () => {
                      o(!0), n?.(e.textureUrl);
                    },
                    onDecodeError: () => {
                      f({
                        image: t,
                        attempt: d,
                        onRetry: () => m((e) => e + 1),
                        onExhausted: () => n?.(e.textureUrl),
                      });
                    },
                  });
                },
                onError: ({ currentTarget: t }) => {
                  f({
                    image: t,
                    attempt: d,
                    onRetry: () => m((e) => e + 1),
                    onExhausted: () => n?.(e.textureUrl),
                  });
                },
              }),
              (0, t.jsx)("span", {
                className:
                  "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.04)_26%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.82)_100%)]",
              }),
            ],
          }),
        ],
      });
    }
    function eY({ label: e, progress: a, ready: n }) {
      let r = Math.max(0.06, Math.min(1, a));
      return (0, t.jsx)("div", {
        className: (0, u.f)(
          "absolute inset-0 z-40 bg-[radial-gradient(circle_at_50%_32%,rgba(40,91,180,0.16),transparent_22rem),linear-gradient(180deg,#030914_0%,#01040b_100%)] transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
          n ? "pointer-events-none opacity-0" : "opacity-100",
        ),
        "aria-hidden": n,
        children: (0, t.jsxs)("div", {
          className:
            "relative flex h-[calc(100%-19.5rem)] min-h-56 items-center justify-center lg:h-full",
          children: [
            (0, t.jsx)("span", {
              className:
                "absolute left-[16%] top-[22%] h-0.5 w-0.5 rounded-full bg-white/70 shadow-[0_0_0.45rem_rgba(160,199,255,0.42)]",
            }),
            (0, t.jsx)("span", {
              className:
                "absolute right-[19%] top-[31%] h-px w-px rounded-full bg-white/55 shadow-[0_0_0.4rem_rgba(255,255,255,0.3)]",
            }),
            (0, t.jsx)("span", {
              className:
                "absolute bottom-[24%] left-[27%] h-px w-px rounded-full bg-[#8fb8ff]/70 shadow-[0_0_0.45rem_rgba(80,138,255,0.35)]",
            }),
            (0, t.jsxs)("div", {
              className: "relative flex flex-col items-center gap-5",
              role: "status",
              "aria-live": "polite",
              children: [
                (0, t.jsxs)("div", {
                  className: "relative h-36 w-36",
                  "aria-hidden": !0,
                  children: [
                    (0, t.jsx)("span", {
                      className: (0, u.f)(
                        "absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(126,159,213,0.2)]",
                        !n &&
                          "motion-safe:animate-spin animation-duration-[8s]",
                      ),
                      children: (0, t.jsx)("span", {
                        className:
                          "absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4a74df] shadow-[0_0_0.75rem_rgba(74,116,223,0.75)]",
                      }),
                    }),
                    (0, t.jsx)("span", {
                      className: (0, u.f)(
                        "absolute inset-4.5 rounded-full shadow-[inset_0_0_0_1px_rgba(126,159,213,0.24)]",
                        !n &&
                          "motion-safe:animate-spin direction-reverse animation-duration-[5.5s]",
                      ),
                      children: (0, t.jsx)("span", {
                        className:
                          "absolute right-[8%] top-[12%] h-2 w-2 rounded-full bg-[#d6bd86] shadow-[0_0_0.6rem_rgba(214,189,134,0.62)]",
                      }),
                    }),
                    (0, t.jsx)("span", {
                      className: (0, u.f)(
                        "absolute inset-9 rounded-full shadow-[inset_0_0_0_1px_rgba(126,159,213,0.28)]",
                        !n &&
                          "motion-safe:animate-spin animation-duration-[3.25s]",
                      ),
                      children: (0, t.jsx)("span", {
                        className:
                          "absolute bottom-[5%] left-[12%] h-1.5 w-1.5 rounded-full bg-[#aeb7c3] shadow-[0_0_0.5rem_rgba(174,183,195,0.65)]",
                      }),
                    }),
                    (0, t.jsx)("span", {
                      className:
                        "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc465] shadow-[0_0_0.65rem_rgba(255,196,101,0.95),0_0_2.25rem_rgba(255,133,43,0.62)]",
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "flex flex-col items-center gap-3",
                  children: [
                    (0, t.jsx)("span", {
                      className:
                        "text-xs font-semibold uppercase tracking-[0.18em] text-white/65",
                      children: e,
                    }),
                    (0, t.jsx)("span", {
                      className:
                        "h-0.5 w-36 overflow-hidden rounded-full bg-white/10",
                      children: (0, t.jsx)("span", {
                        className:
                          "block h-full origin-left rounded-full bg-[linear-gradient(90deg,#2f5dff,#7ea5ff)] shadow-[0_0_0.6rem_rgba(75,116,255,0.6)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                        style: { transform: `scaleX(${r})` },
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    }
    e.s(
      [
        "SolarSystemPage",
        0,
        function ({ locale: e, messages: b }) {
          let v = b.apps["solar-system"],
            w = (0, x.o)(),
            M = (0, s.useId)(),
            _ = (0, l.f)({ query: "(min-width: 1024px)" }),
            k = (0, l.f)({ query: "(prefers-reduced-motion: reduce)" }),
            R = (0, s.useMemo)(
              () => new Intl.NumberFormat(e, { maximumFractionDigits: 0 }),
              [e],
            ),
            P = (0, s.useMemo)(
              () => new Intl.NumberFormat(e, { maximumFractionDigits: 2 }),
              [e],
            ),
            j = (0, s.useMemo)(
              () => new Intl.NumberFormat(e, { maximumFractionDigits: 1 }),
              [e],
            ),
            [D, N] = (0, s.useState)(!1),
            [S, E] = (0, s.useState)("month"),
            [z, C] = (0, s.useState)(!0),
            [F, T] = (0, s.useState)("mercury"),
            [A, I] = (0, s.useState)(null),
            [$, K] = (0, s.useState)(null),
            [O, W] = (0, y.e)("astra-lab-solar-system-help-seen-v2"),
            [U, J] = (0, s.useState)(0),
            [q, B] = (0, s.useState)(!1),
            [X, Y] = (0, s.useState)(0),
            [Z, ee] = (0, s.useState)(0),
            [et, ea] = (0, s.useState)(!1),
            en = (0, s.useRef)(G(new Date())),
            er = (0, s.useRef)(null),
            ei = (0, s.useRef)(new Map()),
            eo = (0, s.useRef)(new Set()),
            es = Z === eq.length,
            el = q && es,
            ec = (X * eU + Z) / (eU + eq.length),
            ed = (0, s.useCallback)((e) => {
              Y(e), 0 === e && B(!1);
            }, []),
            eu = (0, s.useCallback)(() => {
              Y(1), B(!0);
            }, []),
            em = (0, s.useCallback)((e) => {
              eo.current.has(e) || (eo.current.add(e), ee(eo.current.size));
            }, []);
          (0, s.useEffect)(() => {
            _ && ea(!1);
          }, [_]),
            (0, s.useEffect)(() => {
              if (!F || "moon" === F) return;
              let e = er.current,
                t = ei.current.get(F);
              if (!e || !t) return;
              let a = t.offsetLeft - (e.clientWidth - t.offsetWidth) / 2;
              e.scrollTo({
                left: Math.max(0, a),
                behavior: k ? "auto" : "smooth",
              });
            }, [k, F]),
            (0, g.f)({
              tick: (e) => {
                en.current = H(en.current + e * eI[S]);
              },
              paused: !D,
              ignoreReducedMotion: !0,
            });
          let eh = (0, s.useRef)(0),
            ep = (0, s.useRef)(en.current);
          function ex(e) {
            w.play("click"), null === $ && w.play("whoosh"), T(e), K(e);
          }
          (0, g.f)({
            tick: (e) => {
              if (((eh.current += e), eh.current < 0.2)) return;
              eh.current = 0;
              let t = ep.current,
                a = en.current;
              ep.current = a;
              let n =
                  ey(a) ??
                  (function ({ fromTDays: e, toTDays: t }) {
                    let a = Math.min(e, t) - 0.5,
                      n = Math.max(e, t) + 0.5,
                      r = eg(a) - 1,
                      i = eg(n) + 1;
                    for (let e = r; e <= i; e += 1) {
                      let t = ef(e);
                      if (t && t.tDays >= a && t.tDays <= n) return t;
                    }
                    return null;
                  })({ fromTDays: t, toTDays: a }),
                r = n?.kind ?? null;
              I((e) => (e === r ? e : r));
            },
            ignoreReducedMotion: !0,
          });
          let eb = (0, s.useCallback)(() => {
              w.play("click"),
                "earth" !== $ && w.play("whoosh"),
                T("moon"),
                K("earth");
            }, [$, w]),
            ev = (0, s.useCallback)(() => {
              N(!1);
            }, []),
            ew = (0, s.useCallback)(() => {
              w.play("click"), (en.current = G(new Date()));
            }, [w]),
            eM = (0, s.useCallback)(() => {
              let e = (function (e) {
                let t = eg(e);
                for (let a = 0; a < 300; a += 1) {
                  let n = ef(t + a);
                  if (n && n.tDays > e) return n.tDays > Q ? null : n;
                }
                return null;
              })(en.current);
              e &&
                ((en.current = H(e.tDays)),
                N(!1),
                T("moon"),
                K("earth"),
                w.play("whoosh"));
            }, [w]),
            e_ = "moon" === F ? null : V.find((e) => e.key === F),
            ek = "moon" === F ? v.labels.moon : e_ ? v.planets[e_.key] : null,
            eR = {
              intro: v.instructionsIntro,
              rules: [
                v.instructionsRules.rule1,
                v.instructionsRules.rule2,
                v.instructionsRules.rule3,
              ],
            };
          return (0, t.jsxs)(h.f, {
            actions: (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(x.n, {}),
                (0, t.jsx)(p.x, { onClick: () => W(!0) }),
                (0, t.jsx)(f.f, {
                  onClick: function () {
                    N(!1),
                      E("month"),
                      C(!0),
                      T("mercury"),
                      K(null),
                      ea(!1),
                      (en.current = G(new Date())),
                      J((e) => e + 1);
                  },
                }),
              ],
            }),
            layout: "immersive",
            locale: e,
            messages: b,
            slug: "solar-system",
            children: [
              (0, t.jsxs)("div", {
                className:
                  "relative flex min-h-139 w-full flex-1 flex-col overflow-x-clip bg-[#020617] lg:min-h-144",
                children: [
                  A && el
                    ? (0, t.jsx)("div", {
                        className:
                          "pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center lg:top-4",
                        children: (0, t.jsx)("div", {
                          "aria-live": "polite",
                          className:
                            "rounded-full bg-[#21180b]/88 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#ffc857] shadow-[inset_0_0_0_1px_rgba(255,200,87,0.45),0_8px_22px_rgba(0,0,0,0.25)] backdrop-blur-md",
                          children:
                            "solar" === A
                              ? v.eclipse.events.solar
                              : v.eclipse.events.lunar,
                        }),
                      })
                    : null,
                  (0, t.jsxs)("div", {
                    className:
                      "relative flex min-h-0 w-full flex-1 flex-col lg:overflow-hidden",
                    "aria-busy": !el,
                    children: [
                      (0, t.jsxs)("div", {
                        className:
                          "relative min-h-56 flex-1 overflow-hidden sm:min-h-64 lg:absolute lg:inset-0 lg:h-auto",
                        "aria-hidden": !el,
                        inert: !el,
                        children: [
                          (0, t.jsx)(eT, {
                            tDaysRef: en,
                            planetView: $,
                            showOrbits: z,
                            selected: F,
                            onSelect: ex,
                            onMoonTap: eb,
                            onMoonScrub: ev,
                            onLoadProgress: ed,
                            onReady: eu,
                            planetLabels: v.planets,
                            moonLabel: v.labels.moon,
                            resetVersion: U,
                            vizLabel: v.vizLabel,
                          }),
                          (0, t.jsx)("div", {
                            "aria-hidden": !0,
                            className:
                              "pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(1,3,10,0.5)_100%)]",
                          }),
                          $
                            ? (0, t.jsxs)("button", {
                                type: "button",
                                className:
                                  "absolute left-3 top-3 z-30 flex min-h-10 items-center gap-1.5 rounded-full bg-[#03070d] pl-2.5 pr-3 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0.5rem_1.5rem_rgba(0,0,0,0.38)] transition-[scale,background-color] duration-150 hover:bg-[#090f17] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96] lg:left-4 lg:top-4",
                                onClick: () => {
                                  w.play("whoosh"), K(null);
                                },
                                children: [
                                  (0, t.jsx)(a.f, {
                                    weight: "bold",
                                    className: "h-4 w-4",
                                  }),
                                  v.controls.backToSystem,
                                ],
                              })
                            : null,
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className:
                          "relative z-20 mx-3 mb-3 mt-3 flex shrink-0 flex-col rounded-3xl bg-[linear-gradient(180deg,#050f19_0%,#02080f_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.13),0_0.75rem_2rem_rgba(0,0,0,0.46)] lg:absolute lg:bottom-4 lg:left-4 lg:right-86 lg:mx-auto lg:mb-0 lg:mt-0 lg:max-w-216 2xl:right-4",
                        "aria-hidden": !el,
                        inert: !el,
                        children: [
                          (0, t.jsxs)("div", {
                            className:
                              "flex flex-col gap-2.5 px-3 py-3 lg:px-4",
                            children: [
                              (0, t.jsxs)("div", {
                                className: "flex items-center gap-2.5 lg:gap-3",
                                children: [
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    className:
                                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_0.35rem_1.25rem_rgba(38,81,255,0.38),inset_0_0_0_1px_rgba(255,255,255,0.22)] transition-[scale,background-color] duration-150 hover:bg-[#2946e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.96] lg:h-12 lg:w-12",
                                    onClick: () => {
                                      w.play("click"), N((e) => !e);
                                    },
                                    "aria-label": D
                                      ? v.controls.pause
                                      : v.controls.play,
                                    children: (0, t.jsxs)("span", {
                                      className: "relative h-5 w-5",
                                      "aria-hidden": !0,
                                      children: [
                                        (0, t.jsx)(r.f, {
                                          weight: "fill",
                                          className: (0, u.f)(
                                            "absolute inset-0 h-5 w-5 transition-[scale,opacity,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                                            D
                                              ? "scale-100 opacity-100 blur-0"
                                              : "scale-[0.25] opacity-0 blur-xs",
                                          ),
                                        }),
                                        (0, t.jsx)(i.f, {
                                          weight: "fill",
                                          className: (0, u.f)(
                                            "absolute inset-0 ml-0.5 h-5 w-5 transition-[scale,opacity,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]",
                                            D
                                              ? "scale-[0.25] opacity-0 blur-xs"
                                              : "scale-100 opacity-100 blur-0",
                                          ),
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, t.jsx)(e$, {
                                    tRef: en,
                                    granularity: S,
                                    label: v.controls.timeline,
                                    locale: e,
                                    onScrubStart: () => N(!1),
                                    onScrub: () => {},
                                  }),
                                  (0, t.jsxs)("div", {
                                    className:
                                      "flex h-10 shrink-0 items-center gap-1 rounded-xl bg-white/[0.035] pl-3 pr-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
                                    children: [
                                      (0, t.jsx)("span", {
                                        className:
                                          "whitespace-nowrap text-xs font-semibold tabular-nums text-white/80",
                                        children: (0, t.jsx)(eK, {
                                          tRef: en,
                                          locale: e,
                                        }),
                                      }),
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        className:
                                          "min-h-8 rounded-lg px-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary transition-[scale,background-color] duration-150 hover:bg-primary/15 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96]",
                                        onClick: ew,
                                        children: v.controls.today,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, t.jsxs)("div", {
                                className:
                                  "flex flex-wrap items-center gap-x-3 gap-y-2",
                                children: [
                                  (0, t.jsx)(eO, {
                                    value: S,
                                    groupLabel: v.controls.timeline,
                                    labels: {
                                      day: v.controls.granularityDay,
                                      month: v.controls.granularityMonth,
                                      year: v.controls.granularityYear,
                                    },
                                    onChange: (e) => {
                                      w.play("click"), E(e);
                                    },
                                  }),
                                  (0, t.jsx)("button", {
                                    type: "button",
                                    onClick: eM,
                                    className:
                                      "flex h-10 items-center rounded-xl bg-[#0a1121] px-3 text-[0.65rem] font-semibold text-[#ffc857] shadow-[inset_0_0_0_1px_rgba(255,200,87,0.5)] transition-[background-color,scale] duration-150 hover:bg-[#211b13] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ffc857]/70 active:scale-[0.96]",
                                    children: v.eclipse.controls.findNext,
                                  }),
                                  (0, t.jsxs)("label", {
                                    htmlFor: M,
                                    className:
                                      "ml-auto flex min-h-10 cursor-pointer items-center gap-2 text-xs font-medium leading-tight text-white/75 lg:whitespace-nowrap",
                                    children: [
                                      (0, t.jsx)(d.f, {
                                        id: M,
                                        checked: z,
                                        onCheckedChange: C,
                                        className:
                                          "focus-visible:ring-primary focus-visible:ring-offset-[#06101a]",
                                      }),
                                      (0, t.jsx)("span", {
                                        children: v.controls.showOrbits,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, t.jsxs)("div", {
                            className:
                              "flex items-center gap-2 border-t border-white/10 p-2.5 lg:px-3",
                            children: [
                              (0, t.jsxs)("div", {
                                ref: er,
                                className:
                                  "flex min-w-0 flex-1 snap-x snap-proximity scroll-px-2 gap-1.5 overflow-x-auto overscroll-x-contain [touch-action:pan-x_pan-y] scrollbar-none [&::-webkit-scrollbar]:hidden",
                                role: "group",
                                "aria-label": v.vizLabel,
                                children: [
                                  V.map((e) => {
                                    let a = F === e.key;
                                    return (0, t.jsxs)(
                                      "button",
                                      {
                                        ref: (t) => {
                                          t
                                            ? ei.current.set(e.key, t)
                                            : ei.current.delete(e.key);
                                        },
                                        type: "button",
                                        "aria-pressed": a,
                                        className: (0, u.f)(
                                          "flex min-h-19 w-18 shrink-0 snap-start flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[0.7rem] font-semibold text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[scale,background-color,color] duration-150 hover:bg-white/6 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96] lg:min-h-24 lg:w-22 lg:gap-1 lg:text-xs",
                                          a && "text-white",
                                        ),
                                        style: a
                                          ? {
                                              backgroundColor: (0, m.P)({
                                                color: e.displayColor,
                                                alpha: 0.09,
                                              }),
                                              boxShadow: `inset 0 0 0 1px ${(0, m.P)({ color: e.displayColor, alpha: 0.95 })}, 0 0.45rem 1.5rem ${(0, m.P)({ color: e.displayColor, alpha: 0.13 })}`,
                                            }
                                          : void 0,
                                        onClick: () => ex(e.key),
                                        children: [
                                          (0, t.jsx)(eX, {
                                            className:
                                              "h-10 w-12 lg:h-14 lg:w-17",
                                            onAssetSettled: em,
                                            planet: e,
                                          }),
                                          (0, t.jsx)("span", {
                                            className: "max-w-full truncate",
                                            children: v.planets[e.key],
                                          }),
                                        ],
                                      },
                                      e.key,
                                    );
                                  }),
                                  (0, t.jsxs)("button", {
                                    type: "button",
                                    "aria-pressed": "moon" === F,
                                    className: (0, u.f)(
                                      "flex min-h-19 w-18 shrink-0 snap-start flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[0.7rem] font-semibold text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[scale,background-color,color] duration-150 hover:bg-white/6 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96] lg:min-h-24 lg:w-22 lg:gap-1 lg:text-xs",
                                      "moon" === F && "text-white",
                                    ),
                                    style:
                                      "moon" === F
                                        ? {
                                            backgroundColor: (0, m.P)({
                                              color: L,
                                              alpha: 0.09,
                                            }),
                                            boxShadow: `inset 0 0 0 1px ${(0, m.P)({ color: L, alpha: 0.95 })}, 0 0.45rem 1.5rem ${(0, m.P)({ color: L, alpha: 0.13 })}`,
                                          }
                                        : void 0,
                                    onClick: eb,
                                    children: [
                                      (0, t.jsx)(eX, {
                                        className: "h-10 w-12 lg:h-14 lg:w-17",
                                        onAssetSettled: em,
                                        planet: eJ,
                                      }),
                                      (0, t.jsx)("span", {
                                        className: "max-w-full truncate",
                                        children: v.labels.moon,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              ek
                                ? (0, t.jsxs)(c.S, {
                                    open: et,
                                    onOpenChange: ea,
                                    children: [
                                      (0, t.jsx)(c.O, {
                                        asChild: !0,
                                        children: (0, t.jsx)("button", {
                                          type: "button",
                                          className:
                                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[scale,background-color,color] duration-150 hover:bg-white/6 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96] lg:hidden",
                                          "aria-label": `${ek} — ${v.info.year}, ${v.info.distance}, ${v.info.size}`,
                                          children: (0, t.jsx)(n.f, {
                                            weight: "bold",
                                            className: "h-5 w-5",
                                            "aria-hidden": !0,
                                          }),
                                        }),
                                      }),
                                      (0, t.jsxs)(c.s, {
                                        className:
                                          "mx-auto max-w-xl border-white/10 bg-[linear-gradient(160deg,#07121d_0%,#020911_100%)] text-white shadow-[0_-1rem_3rem_rgba(0,0,0,0.55)] lg:hidden",
                                        children: [
                                          (0, t.jsx)("span", {
                                            className:
                                              "mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-white/20",
                                            "aria-hidden": !0,
                                          }),
                                          (0, t.jsx)(c.x, {
                                            asChild: !0,
                                            children: (0, t.jsx)("button", {
                                              type: "button",
                                              className:
                                                "absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-[scale,background-color,color] duration-150 hover:bg-white/6 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96]",
                                              "aria-label": b.shared.gotIt,
                                              children: (0, t.jsx)(o.f, {
                                                weight: "bold",
                                                className: "h-5 w-5",
                                                "aria-hidden": !0,
                                              }),
                                            }),
                                          }),
                                          (0, t.jsxs)(c.t, {
                                            className:
                                              "overflow-y-auto overscroll-contain px-4 pb-5 pt-3",
                                            children: [
                                              "moon" === F
                                                ? (0, t.jsx)(eG, {
                                                    auFmt: P,
                                                    intFmt: R,
                                                    ratioFmt: j,
                                                    messages: v,
                                                    tRef: en,
                                                    title: (0, t.jsx)(c.Y, {
                                                      className:
                                                        "text-balance text-2xl font-bold leading-tight tracking-tight text-white",
                                                      children: v.labels.moon,
                                                    }),
                                                    variant: "drawer",
                                                  })
                                                : e_
                                                  ? (0, t.jsx)(eB, {
                                                      auFmt: P,
                                                      intFmt: R,
                                                      ratioFmt: j,
                                                      messages: v,
                                                      planet: e_,
                                                      title: (0, t.jsx)(c.Y, {
                                                        className:
                                                          "text-balance text-2xl font-bold leading-tight tracking-tight text-white",
                                                        children:
                                                          v.planets[e_.key],
                                                      }),
                                                      variant: "drawer",
                                                    })
                                                  : null,
                                              (0, t.jsxs)("p", {
                                                className:
                                                  "mt-3 flex gap-2.5 rounded-xl bg-white/2.5 p-3 text-pretty text-xs leading-5 text-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
                                                children: [
                                                  (0, t.jsx)(n.f, {
                                                    weight: "bold",
                                                    className:
                                                      "mt-0.5 h-4 w-4 shrink-0 text-white/45",
                                                    "aria-hidden": !0,
                                                  }),
                                                  (0, t.jsx)("span", {
                                                    children: v.scaleNote,
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  })
                                : null,
                              (0, t.jsxs)("details", {
                                className:
                                  "group relative hidden shrink-0 lg:block",
                                children: [
                                  (0, t.jsxs)("summary", {
                                    className:
                                      "flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl text-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-[scale,background-color,color] duration-150 hover:bg-white/6 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96] [&::-webkit-details-marker]:hidden",
                                    children: [
                                      (0, t.jsx)(n.f, {
                                        weight: "bold",
                                        className: "h-4 w-4",
                                        "aria-hidden": !0,
                                      }),
                                      (0, t.jsx)("span", {
                                        className: "sr-only",
                                        children: v.scaleNote,
                                      }),
                                    ],
                                  }),
                                  (0, t.jsx)("p", {
                                    className:
                                      "absolute bottom-full right-0 mb-3 w-[min(18rem,calc(100vw-3rem))] rounded-xl bg-[#06101a] p-3 text-pretty text-xs leading-relaxed text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0.75rem_1.5rem_rgba(0,0,0,0.42)]",
                                    children: v.scaleNote,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      ek
                        ? (0, t.jsx)("aside", {
                            className:
                              "absolute left-auto right-4 top-4 z-20 hidden max-h-[calc(100%-8.5rem)] w-[20rem] overflow-y-auto rounded-3xl bg-[linear-gradient(160deg,#07121d_0%,#020911_100%)] p-4 text-sm text-white/65 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0.75rem_2rem_rgba(0,0,0,0.42)] lg:block",
                            "aria-label": ek,
                            "aria-hidden": !el,
                            inert: !el,
                            children:
                              "moon" === F
                                ? _
                                  ? (0, t.jsx)(eG, {
                                      auFmt: P,
                                      intFmt: R,
                                      ratioFmt: j,
                                      messages: v,
                                      tRef: en,
                                      title: (0, t.jsx)("h2", {
                                        className:
                                          "text-balance text-[1.65rem] font-bold tracking-tight text-white",
                                        children: v.labels.moon,
                                      }),
                                      variant: "panel",
                                    })
                                  : null
                                : e_
                                  ? (0, t.jsx)(eB, {
                                      auFmt: P,
                                      intFmt: R,
                                      ratioFmt: j,
                                      messages: v,
                                      planet: e_,
                                      title: (0, t.jsx)("h2", {
                                        className:
                                          "text-balance text-[1.65rem] font-bold tracking-tight text-white",
                                        children: v.planets[e_.key],
                                      }),
                                      variant: "panel",
                                    })
                                  : null,
                          })
                        : null,
                      (0, t.jsx)(eY, {
                        label: b.shared.loading,
                        progress: ec,
                        ready: el,
                      }),
                    ],
                  }),
                ],
              }),
              O
                ? (0, t.jsx)(p.c, {
                    title: b.shared.howToPlay,
                    intro: eR.intro,
                    rules: eR.rules,
                    onClose: () => W(!1),
                  })
                : null,
            ],
          });
        },
      ],
      407358,
    );
  },
]);

//# debugId=776d826a-4fa1-5e00-d308-dc34371a2254
