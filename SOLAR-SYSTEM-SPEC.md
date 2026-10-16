# Solar System simulation — recreation spec

Source observed: https://app.astra-ai.co/en-IN/lab/solar-system ("Solar System · Physics · Simulation").
Tested on 16 Oct 2026 in the Claude desktop browser. All UI controls were exercised; constants below
were read from the app's JavaScript bundle (saved, prettified, at `reference/astra-solar-system.pretty.js`).
Screenshots of every state are in `reference/screenshots/`.

Stack used by the original: Next.js + React, Three.js (WebGL, OrbitControls), Tailwind CSS, Figtree font.
Textures are `.webp` files from a CDN (mercury, venus, earth, earth-night, mars, jupiter, saturn,
saturn-rings, uranus, neptune, moon, starmap). The Sun is a procedural GLSL shader, not a texture.

---

## 1. Screen layout

```
┌────────────────────────────────────────────────────────────┐
│ [icon] Solar System            [☆ Rate] [⋮ More] [✕ Close]  │  header bar
│        Physics · Simulation                                 │
├────────────────────────────────────────────────────────────┤
│ [← Back to system]  (only in planet / Earth-Moon view)      │
│                  [SOLAR ECLIPSE] badge (only on eclipse day)│
│                                                             │
│                 3D canvas (fills remaining height)          │
│                                                             │
├────────────────────────────────────────────────────────────┤
│ (▶) |‖‖‖|‖‖‖|‖‖‖|  <- scrub strip ->      [16 Oct 2026  TODAY]│  bottom panel
│ [Day][Month][Year]  [Find next eclipse]   (●) Show orbit paths│
│ ─────────────────────────────────────────────────────────── │
│ [Mercury][Venus][Earth][Mars][Jupiter][Saturn][Uranus][Neptune][Moon]  (ⓘ)│  horizontally scrolling row
└────────────────────────────────────────────────────────────┘
```

- Page background `#0D0D0D`; scene background `#030712`; bottom panel is a dark navy card with
  rounded corners (`rgba` white 3.5% fills, 1px inset white 8% border); accent blue `#2F5DFF` / `#2946E8`
  (selected pill, play button, scrub marker); gold outline `#FFC857` for "Find next eclipse" and the eclipse badge.
- Mobile (375px wide): identical components stack vertically; the planet row scrolls horizontally;
  the ⓘ button stays pinned at the right edge.

## 2. Controls and exact behaviour

| Control | Behaviour |
|---|---|
| **Play / Pause** | Toggles time flow. Icon swaps ▶ / ‖. Time advances at the rate of the selected granularity. |
| **Scrub strip** | A tick "tape" that scrolls under a fixed centre marker. Drag left/right to move time (drag right = earlier). Keyboard: ← / → step one unit, PageUp/PageDown step ten units. `role="slider"`, aria-valuetext is the long date. Clicking (without dragging) does nothing. |
| **Date readout + TODAY** | Shows `d MMM yyyy` (Intl, locale en-IN). "TODAY" is a button that snaps to the real current date. It is always visible, not a status. |
| **Day / Month / Year** | Segmented pill. Sets playback speed, scrub tape density, and keyboard step size (table below). |
| **Find next eclipse** | Jumps forward to the next real eclipse (solar or lunar) after the current date, opens the Earth-Moon view if not already there, and shows a gold badge "SOLAR ECLIPSE" / "LUNAR ECLIPSE" at the top. Badge appears automatically whenever the current date is within ±0.5 day of an eclipse. Example sequence from 16 Oct 2026: 6 Feb 2027 (solar) → 12 Jan 2028 (lunar). |
| **Show orbit paths** | Toggle; hides/shows the thin orbit rings (planets + Moon ring). Default on. |
| **Planet row** | 9 cards (8 planets + Moon), each with a small textured sphere thumbnail and name. Tapping a planet flies the camera to a close-up of it. Tapping Earth or Moon opens the **Earth-Moon view**. Selected card gets a light border; the row auto-scrolls the selected card into the centre. A "click" sound plays, plus a "whoosh" on view changes. |
| **ⓘ Info** | Opens a bottom-sheet card for the selected body (contents in §4). Close via ✕, "Got it", or Escape. |
| **Back to system** | Appears in close-up views. Flies the camera back to the overview. |
| **3D canvas** | Drag to orbit camera, scroll / pinch to zoom (OrbitControls with damping). Hovering a body shows a small dark pill label with its name; cursor becomes grab / grabbing / pointer. Clicking a planet in the scene selects it (same as the row). |
| **Moon drag** | In the Earth-Moon view, grabbing the Moon and dragging it around Earth scrubs the date (one lap = 29.5 days) so the phase changes live. |
| **⋮ More** | Opens a sheet with cover image + "Physics / Simulation" tags, title, description, and items: Mute sound, Help, Reset, Share. |
| **Help** | Dialog with the text in §6. |
| **☆ Rate** | Bottom sheet "Rate this app" with 5 stars and a Send button. |
| **✕ Close** | Leaves the app (not tested, to avoid navigating away). |

### Time constants (from the bundle)

| Granularity | Playback (sim days per real second) | Tape density (px per day) | Keyboard step |
|---|---|---|---|
| Day   | 2   | 96  | 1 day |
| Month | 45  | 8   | 30.44 days |
| Year  | 365 | 0.8 | 365.25 days |

Measured during test: Day ≈ 7 days in 5 s, Month ≈ 7.5 months in 5 s, Year ≈ 5 years in 5 s.
Timeline bounds: 1 Jan 1900 → 31 Dec 2100 (slider min −36524.5, max 36888.5 days from J2000 = 1 Jan 2000).
The tape is drawn with two repeating background layers: minor ticks every 12 px, major ticks every 72 px, offset by `-(tDays × density) % period`.

## 3. 3D scene

**Units.** 1 scene unit ≈ 2 × Sun radius: `radiusUnits = radiusKm / 695700 × 0.5` (Sun radius = 0.5).
Planet sizes are true to scale with the Sun. Orbit distances are **compressed**:
`orbitRadius(au) = 2.13 × au^0.437` (so Mercury ≈ 1.4, Earth ≈ 2.13, Neptune ≈ 9.4 units).
Because the planets are tiny at that scale, each planet also has a glowing "marker" dot (sprite, opacity 0.9)
that fades out as the camera gets close (fades when the planet's on-screen radius exceeds ~2–5 px).

**Positions.** Real Keplerian orbits: mean anomaly from `meanLongitudeJ2000 + 360°·t/periodDays`,
solve Kepler's equation, rotate by argument of periapsis, inclination, ascending node. Axis mapping: scene y = up (ecliptic north).

**Planet table** (angles in degrees; J2000 elements):

| key | period d | a (AU) | e | incl | Ω | ω | L0 | radius km | moons | marker colour | rotation d | atmosphere (colour, scale, strength) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mercury | 88 | 0.387 | 0.2056 | 7.005 | 48.331 | 29.125 | 252.251 | 2440 | 0 | #9CA3AF | 58.6462 | none |
| venus | 225 | 0.723 | 0.0068 | 3.395 | 76.68 | 54.853 | 181.98 | 6052 | 0 | #E0B782 | −243.018 | #FFC073, 1.04, 0.16 |
| earth | 365.25 | 1 | 0.0167 | 0 | 0 | 102.937 | 100.464 | 6371 | 1 | #60A5FA | 0.99726968 | #4D9DFF, 1.06, 0.36 |
| mars | 687 | 1.524 | 0.0934 | 1.85 | 49.558 | 286.502 | 355.453 | 3389 | 2 | #F87171 | 1.02595676 | #E76F42, 1.025, 0.08 |
| jupiter | 4333 | 5.203 | 0.0489 | 1.303 | 100.464 | 273.867 | 34.396 | 69911 | 95 | #F59E0B | 0.41354 | #F2C796, 1.018, 0.07 |
| saturn | 10759 | 9.537 | 0.0565 | 2.485 | 113.665 | 339.392 | 49.954 | 58232 | 274 | #FACC15 | 0.44401 | #F4D49E, 1.018, 0.06 |
| uranus | 30687 | 19.19 | 0.0472 | 0.773 | 74.006 | 96.999 | 313.238 | 25362 | 28 | #7DD3FC | −0.71833 | #8DEBFF, 1.04, 0.18 |
| neptune | 60190 | 30.07 | 0.0086 | 1.77 | 131.784 | 273.187 | 304.88 | 24622 | 16 | #3B82F6 | 0.67125 | #467BFF, 1.045, 0.22 |

Each planet also has a pole direction (RA/Dec, J2000), prime-meridian angle, `polarScale` (oblateness: Jupiter 0.935, Saturn 0.902),
and surface roughness/relief for the material. Saturn rings: inner 74658 km, outer 136775 km (texture `saturn-rings.webp`).

**Sun.** Sphere radius 0.5 with a custom shader (fbm granulation, drifting sunspots with penumbra, limb darkening;
hot colour (1, .95, .74), mid colour (1, .58, .12)). Two additive glow sprites: `#FFC15C` opacity .72 scale 1.8, and `#FF792C` opacity .3 scale 3.2.
A PointLight `#FFEDC4` intensity 5 at the Sun lights everything. Earth has a night-lights texture blended on the dark side.

**Background.** Star-map texture on an inside-out sphere of radius 140 (tinted `#3D3F4B`), plus
an asteroid belt (3200 points, 2.1–3.3 AU, size .01, opacity .5) and a Kuiper belt (2400 points, 30–50 AU, size .02, opacity .22), both as point clouds with slight inclination scatter.

**Orbit rings.** Thin line loops; selected planet's ring brighter (opacity .58 vs .22 in system view; .16 vs .045 in planet view).

**Renderer.** ACES-style tone mapping, exposure 1.06, antialias on, sRGB output. Camera FOV ≈ 28–40°.

**Camera presets.**
- System overview: position ≈ (6.8, 6.2, 17.2) looking at origin, scaled by aspect ratio (portrait zooms out). Zoom limits 0.55–140.
- Planet close-up: camera at distance `7.6 × radius` (Saturn 9×), elevated 7° above the Sun-facing side; zoom limits 1.55×–12× radius (Saturn 2.55×–16×).
- Transitions: smooth Hermite/Catmull-Rom spline through waypoints with smootherstep easing; durations: planet→planet 1600 ms, planet→system 1500 ms, system→planet 1500 ms, reframe 700 ms; honours `prefers-reduced-motion` (1 ms).

**Earth-Moon view.** Opened by selecting Earth or Moon. Earth is drawn full size at the centre, the Moon (radius from 1737 km)
orbits on a ring of radius `3.2 × EarthRadius`, tilted 5.128° to the ecliptic, with the node line rotating per the real lunar ascending-node rate.
The Moon's position uses a simplified lunar theory: mean longitude 297.85° + 12.1907°/day plus 6.289·sin(M') − 1.915·sin(M) corrections;
latitude 5.128·sin(F) + 0.2806·sin(M'+F) + 0.2777·sin(M'−F) + 0.1732·sin(2D−F). Other planets stay visible as small textured spheres in the distance.
On a solar eclipse a translucent cone (opacity .2) is drawn from the Moon toward Earth; on a lunar eclipse a cone from Earth toward the Moon (opacity .11).

**Eclipse finder.** Step through new moons (solar) and full moons (lunar): solve for the lunation k with Newton iteration on the
Moon's elongation, then accept if |ecliptic latitude| < 1.5° (solar) or < 1.0° (lunar). "Find next eclipse" searches forward from the current date.

## 4. Info card contents (ⓘ)

Layout: title, large preview sphere (for the Moon: the current phase image with caption "FROM EARTH" and phase name),
a 2×2 stat grid, a one-paragraph description, and a footnote.

| Body | ONE YEAR | DISTANCE | SIZE | MOONS | Description |
|---|---|---|---|---|---|
| Mercury | 88 days | 0.39 AU | 0.38× Earth | 0 | A battered grey surface covered in craters and scarps. Mercury has almost no atmosphere, so sunlight and shadow create extreme temperature swings. |
| Venus | 225 days | 0.72 AU | 0.95× Earth | 0 | Hidden under sulphuric-acid clouds. Its dense CO₂ atmosphere drives a runaway greenhouse effect and keeps the surface hot enough to melt lead. |
| Earth | 365 days | 1 AU | 6,371 km | 1 | Blue oceans, bright cloud systems, and a nitrogen-oxygen atmosphere make Earth the only known world with stable surface life. |
| Mars | 687 days | 1.52 AU | 0.53× Earth | 2 | Rust-red iron-oxide dust sits over basalt plains, volcanoes, canyons, and polar caps made of water ice and carbon dioxide frost. |
| Jupiter | 11.9 Earth years | 5.2 AU | 11× Earth | 95 | Alternating light zones and dark belts reveal powerful jet streams. The Great Red Spot is a long-lived storm larger than Earth. |
| Saturn | 29.5 Earth years | 9.54 AU | 9.1× Earth | 274 | A pale gas giant with high-speed winds and an icy ring system. The rings are mostly water ice, dust, and countless small fragments. |
| Uranus | 84 Earth years | 19.19 AU | 4× Earth | 28 | Methane in the upper atmosphere absorbs red light, giving Uranus its cyan colour. Its 98° axial tilt makes the seasons extreme. |
| Neptune | 164.8 Earth years | 30.07 AU | 3.9× Earth | 16 | A deep-blue ice giant coloured by methane, with some of the fastest winds in the solar system and dark storm systems that come and go. |

Moon card: ONE LAP 27.3 days · FROM EARTH 3,84,400 km · SIZE 0.27× Earth · ILLUMINATION n % (live, = (1 − cos(phase angle))/2).
Phase name thresholds (phase angle c in radians): new if c < .15 or > 2π−.15; first quarter / full / last quarter within ±.15 of π/2, π, 3π/2;
otherwise waxing crescent, waxing gibbous, waning gibbous, waning crescent.
Moon description: "The Moon always shows Earth the same face, and its orbit is tilted about 5° — so its shadow usually misses Earth, and that is why eclipses are rare and special."

Footnote on every card: "Planet sizes are true to scale with the Sun — the glowing dots just mark where each planet is. Distances between orbits are compressed so the whole system stays visible."

## 5. Sounds

Short UI "click" on every button; "whoosh" on camera fly-to (planet select, Back to system, Find next eclipse). "Mute sound" in the ⋮ menu silences both.

## 6. Help dialog text

> A 3D model of the solar system, anchored to the real calendar — every planet sits where it actually is on the date you choose. Tap Earth or its Moon to step inside the Earth-Moon system, where phases and eclipses play out.
>
> • Press play to travel through time, or drag the timeline to scrub. Day / Month / Year sets how fast time flows, and Today snaps back to the real sky right now.
> • Drag to rotate the 3D view and scroll or pinch to zoom. Tap any planet for a close-up — tapping Earth or its Moon opens the Earth–Moon system, where you can grab the Moon and drag it around Earth to watch its phase change day by day.
> • The Moon's orbit is tilted, so it usually slips just above or below a perfect line-up. Press Find next eclipse to jump to the next real one: in a solar eclipse the Moon's shadow lands on Earth, and in a lunar eclipse the Moon slides through Earth's shadow.

Header subtitle text: "Explore the planets, the Moon's phases and eclipses in one 3D model."

## 7. Issues noticed in the original (worth avoiding)

- Planet textures are loaded from a CDN without CORS headers on first load, so the planets briefly rendered as untextured dots until a retry succeeded.
- The DOM keeps a hidden "LOADING LEARNING APPS..." overlay text after load.
- After "Find next eclipse" the eclipse badge sometimes lagged a second behind the date readout.
- "Reset" in the ⋮ menu produced no visible change while in the Earth-Moon view.

## 8. Suggested build order

1. Static layout (header, bottom panel, planet row) in HTML/Tailwind with the colours above.
2. Three.js scene: starfield, Sun shader (or a bright textured sphere first), 8 textured planets at Keplerian positions, compressed orbit rings, marker sprites.
3. Time model: `tDays` state, play loop with the per-second rates, scrub tape, Day/Month/Year, Today.
4. Camera manager: overview preset, fly-to-planet, back-to-system with eased spline.
5. Earth-Moon view: Moon orbit with tilt, phase lighting, Moon drag → date.
6. Eclipse search + badge + shadow cones.
7. Info cards, Help, menu, sounds, mobile layout.
