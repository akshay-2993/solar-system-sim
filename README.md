# Our Solar System

An offline 3D model of the solar system for school students. Every planet sits where it
really is on the chosen date (1900–2100), time can be played or scrubbed, and the Earth–Moon
view shows phases and eclipses. Built with Vite and Three.js, no framework, no network calls.

## Run it locally

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Builds

| Command | Output | Use it for |
|---|---|---|
| `npm run build` | `dist/` folder (index.html + `assets/`) | GitHub Pages and the Geneo upload |
| `npm run build:single` | `dist-single/index.html`, one self-contained file | Sharing a single file that opens from disk with a double-click |

Both builds use relative paths, so they work from any folder or sub-path.

## Upload to Geneo

1. Run `npm run build`.
2. Zip the **contents** of `dist/` (so `index.html` is at the top level of the zip) or upload the folder as the platform asks.
3. If the platform only accepts one file, run `npm run build:single` and upload `dist-single/index.html` instead.

## Publish on GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`.

```bash
gh repo create solar-system-sim --public --source=. --remote=origin --push
```

Then in the repository settings, under **Pages**, set **Source** to **GitHub Actions**
(or run `gh api -X POST repos/<you>/solar-system-sim/pages -f build_type=actions`).
The site appears at `https://<you>.github.io/solar-system-sim/` after the first workflow run.

## Controls

- **Play / pause** runs time at the Day, Month or Year speed. **Now** jumps to the present moment and keeps the model on the real clock (the button reads **Live** while it follows).
- **Time strip**: drag to scrub (arrow keys step one unit, Page Up / Page Down step ten).
- **Find next eclipse** jumps to the next real solar or lunar eclipse and frames Earth and the Moon side-on.
- **Orbit paths** hides or shows the orbit rings.
- **Body dock**: tap the Sun or a planet for a close-up. Earth opens above your own region (from the device time zone) with a "You are about here" pin, so day and night at home are visible; Moon opens the Earth–Moon view side-on, where the Moon can be dragged around Earth to change the date.
- Leave the view alone for a few seconds and it drifts slowly around the selected body.
- The **facts card** (top-right) shows the selected body's numbers and a short description; close it with ✕ and bring it back with the Facts pill (on phones, open it with ⓘ). **⋮** holds Mute, Help, Reset and Share.
- A short welcome pop-up explains the model when the page loads.
- In the 3D view: drag to turn, scroll or pinch to zoom, tap a planet to select it.

## Project layout

```
index.html          page markup
src/main.js         state, main loop, pointer handling
src/scene.js        Three.js scene: Sun shader, planets, Moon, belts, stars, eclipse cones
src/camera.js       camera presets and flight transitions
src/astro.js        time model, Kepler orbits, lunar theory, eclipse search
src/ui.js           panel, tape, sheets, labels
src/procedural.js   generated textures (Venus, Saturn, Uranus, Neptune, rings, stars)
src/sound.js        Web Audio click and whoosh
src/data.js         planet table, card text, help text
src/assets/         NASA/USGS maps and bundled fonts (see ASSETS.md)
```

See `ASSETS.md` for the source and licence of every bundled file.
