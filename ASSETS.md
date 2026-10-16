# Assets and their sources

Every file that ships with the app is either generated in code at run time or comes from a
public-domain source. Nothing here carries an attribution requirement, and no text credit is
shown inside the app.

## Planet and Moon maps (`src/assets/textures/`)

| File | Body | Source | Status |
|---|---|---|---|
| `earth-day.jpg` | Earth surface | NASA Visible Earth, Blue Marble: Next Generation with topography and bathymetry (December 2004) — https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg | NASA imagery, public domain (not copyrighted). Resized to 4096×2048. |
| `earth-night.jpg` | Earth night lights | NASA Earth Observatory, Black Marble 2012 (`dnb_land_ocean_ice.2012.3600x1800.jpg`) — https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg | NASA imagery, public domain. Resized to 2048×1024. |
| `earth-clouds.jpg` | Earth cloud layer | NASA Visible Earth, Blue Marble cloud cover (`cloud_combined_2048.jpg`) — https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg | NASA imagery, public domain. |
| `moon.jpg` | Moon surface | NASA Scientific Visualization Studio, CGI Moon Kit, LRO LROC colour map (`lroc_color_poles_1k.jpg`) — https://svs.gsfc.nasa.gov/4720 | NASA imagery, public domain. |
| `mars.jpg` | Mars surface | USGS Astrogeology, Mars Viking Global Color Mosaic 925 m, 1024 px sample — https://astrogeology.usgs.gov/search/map/mars_viking_global_color_mosaic_925m | Listed by USGS as "Access constraints: public domain, use constraints: none". |
| `mercury.jpg` | Mercury surface | NASA / JPL Photojournal PIA12397, MESSENGER full global mosaic — https://science.nasa.gov/photojournal/full-global-mercury-mosaic/ | NASA imagery, public domain. The mosaic's small no-data gaps are filled at load time with matching grey noise (see `fillBlackGaps` in `src/procedural.js`). |
| `jupiter.jpg` | Jupiter clouds | NASA / JPL Photojournal PIA07782, Cassini cylindrical map of Jupiter — https://www.jpl.nasa.gov/images/pia07782-cassinis-best-maps-of-jupiter-cylindrical-map/ | NASA imagery, public domain. Full 3601×1801 map. |

NASA's media usage guidelines state that NASA still images are generally not copyrighted and
may be used without permission for educational purposes; credit is customary but not required.

## Generated in code (no files)

| Element | Where | How |
|---|---|---|
| Sun surface | `src/scene.js` (`SUN_FRAG`) | GLSL fragment shader: value-noise granulation, drifting sunspots, limb darkening. |
| Sun glow | `src/procedural.js` `glowTexture` | Radial-gradient canvas sprite. |
| Venus clouds | `src/procedural.js` `venusTexture` | Tileable value noise, banded cream/tan clouds. |
| Saturn, Uranus, Neptune | `src/procedural.js` `gasGiant` | Banded noise with per-planet colour stops; Neptune has a dark storm. |
| Saturn rings | `src/procedural.js` `saturnRingTexture` | Radial alpha strip with C/B/A rings, Cassini division and Encke gap. |
| Star field | `src/procedural.js` `starField` | 9,000 points with a denser band; per-star size and colour. |
| Asteroid and Kuiper belts | `src/scene.js` `_buildBelts` | Seeded random point clouds. |
| Ocean roughness map | `src/procedural.js` `oceanRoughnessMap` | Derived at load from the Blue Marble map: blue pixels become smooth so sunlight glints off the sea. |
| Crater relief | `src/scene.js` `load` | Mercury, Mars and the Moon reuse their colour maps as bump maps. |
| Planet markers | `src/procedural.js` `markerTexture` | Radial-gradient canvas sprite tinted per planet. |
| Thumbnails and Moon phase preview | `src/scene.js` `Thumbnailer` | Rendered at run time from the same materials. |
| Click and whoosh sounds | `src/sound.js` | Web Audio API oscillators and filtered noise. |
| Icons | `index.html` | Hand-drawn inline SVG paths. |

## Fonts (`src/assets/fonts/`)

| Family | Use | Licence |
|---|---|---|
| Atkinson Hyperlegible (400, 400 italic, 700) | All interface text | SIL Open Font License 1.1 (Braille Institute). |
| Bricolage Grotesque (variable, 200–800) | Title, date stamp, card headings and figures | SIL Open Font License 1.1 (Mathieu Triay). |

The OFL permits bundling and redistribution with software. The licence texts are in
`src/assets/fonts/LICENSES.md`; they are not displayed in the app.
