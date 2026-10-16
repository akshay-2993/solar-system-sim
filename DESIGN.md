# Design system: the field notebook

<!-- impeccable:design-schema 1 -->

The page is an astronomer's field notebook laid open around a window onto the real sky. The
chrome is paper and ink; the sky is the only dark surface. Written from the built page.

## Colour

| Token | Value | Job |
|---|---|---|
| `--cover` / `--cover-deep` | `#C8922A` / `#A3741C` | Header rail (the notebook cover), the sheet's top rule, help bullets, scrollbar thumb |
| `--cover-ink` | `#2A2117` | Text on the cover rail |
| `--paper` / `--paper-2` | `#F4EEE1` / `#EBE3D2` | Panel, sheets, tiles; hover fill |
| `--rule` / `--rule-strong` | `#D9CFBB` / `#B9AD94` | Ruled lines on the panel, tile and stat dividers |
| `--ink` / `--ink-70` | `#1B2233` / 72 % | All text, outlines, the play button, the selected tab |
| `--graphite` | `#5B6170` | Stat labels, footnotes |
| `--red` | `#C9372C` | Spent on three things only: the "now" pin on the time strip, the selected body, the eclipse stamp (plus TODAY and the playing state) |
| `--sky` | `#05070D` | The 3D canvas and the scrim |

Strategy: restrained, with the cover colour owning a whole region (the rail) so the palette is
committed at page scale. Orbit rings in the sky are paper-coloured (`#E9DDC3`); the selected
ring is warm red (`#F0A28A`).

## Type

- **Bricolage Grotesque** (variable, 800 for the title and card headings, 700 for the date stamp and stat figures). Letter-spacing −0.015 to −0.02 em on display sizes.
- **Atkinson Hyperlegible** 400 / 700 for every control, paragraph and label. Chosen for readability by young students; its slashed zero is intentional.
- Root size `clamp(14px, 0.42vw + 11px, 20px)` so every control scales from phones to 4K.
- Tabular numerals everywhere (`font-variant-numeric: tabular-nums`).
- Small labels (stat names, tags, TODAY, the stamp) are uppercase with 0.08–0.16 em tracking.

## Surfaces and shape

- Buttons: 6 px radius, 1 px ink outline on paper, ink fill when selected; capsules (999 px) for the eclipse finder, the hover label and the switch.
- Round 2.4 rem icon buttons with a 1.5 px outline (cover-ink on the rail, ink on paper).
- Sheets rise from the bottom (14 px top radius) with a 3 px inset cover rule; centred dialogs for Help.
- Shadows always carry an offset and blur: `0 2px 6px ink/18 %, 0 12px 28px ink/16 %`.
- The panel's ground is ruled every 1.5 rem with a red margin thread at the left.

## Signature move

The timeline is a ruled logbook strip: a canvas draws 1-device-pixel ticks (minor every 12 px,
major every 72 px) sliding under a fixed red pin; Day / Month / Year are index tabs that change
tick density and speed. The eclipse badge is a red rubber stamp, slightly rotated.

## Motion

- Exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), 160 ms for state, 320 ms for sheets.
- One overshoot, kept on purpose: the orbit-paths chip crosses the track with a small bounce.
- Camera flights: 1.5–1.6 s smootherstep splines; 1 ms under `prefers-reduced-motion`, which also disables sheet animation.

## Responsive rules

- Grid rows: rail / sky / notebook. The sky always takes the remaining height.
- ≤ 640 px: subtitle hidden, tighter controls, 4.4 rem tiles, the body row scrolls with snap.
- ≤ 380 px: the orbit switch drops to its own line.
- ≤ 460 px tall (landscape phones): rail and panel compress, tiles become horizontal chips, the sky keeps ≥ 180 px.
- ≥ 1400 px: tiles centre in the row.
- Every grid/flex child has `min-width: 0` so the body row can never widen the page.

## Browser surfaces

Selection is cover-on-cover-ink, focus rings are 2 px red, the body-row scrollbar is a thin
cover-coloured thumb, dialogs trap focus on their first control.
