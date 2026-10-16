# Design system: the night-sky console

<!-- impeccable:design-schema 1 -->

A deep-space console in blues and violets (the palette Akshay pinned): the sky is the page,
and three quiet instrument panels sit around it. Written from the built page.

## Layout

Desktop (> 900 px): a three-column grid. Left, a vertical dock listing the Sun, the eight
planets and the Moon with rendered thumbnails. Centre, the 3D sky with a time bar beneath it.
Right, an always-visible facts panel for the selected body, so students read while they look.
Narrow screens: top bar, sky, time bar, then the dock as a horizontal row; the facts panel
slides up as a sheet from the ⓘ button at the end of the row.

## Colour

| Token | Value | Job |
|---|---|---|
| `--space` / `--space-2` | `#070A1A` / `#0B1030` | Sky and panel grounds |
| `--panel-solid` / `--panel` | `#121838` / 82 % | Sheets, labels, floating buttons |
| `--line` / `--line-strong` | violet-white at 20 % / 42 % | Hairlines, outlines, dividers |
| `--text` / `--muted` | `#EEF0FF` / `#A7AFDC` | Text and secondary text |
| `--violet` / `--violet-deep` | `#8B7CFF` / `#5B4BDB` | Primary actions (play, speed tab), switch on, hover fills |
| `--cyan` | `#5FE1FF` | Selection: the chosen body, Live, focus rings, kickers |
| `--pink` | `#FF6BC9` | Time: the "now" pin and the eclipse finder; the eclipse badge is a pink-to-violet gradient |
| gold `#FFB13D` | Sun only | The Sun icon, rating stars |

## Type

- **Bricolage Grotesque** 800 for the title and body names in the facts panel, 700 for the date and stat figures.
- **Atkinson Hyperlegible** 400 / 700 for controls, paragraphs, labels; chosen for readability by young students.
- Root size `clamp(14px, 0.42vw + 11px, 20px)`; tabular numerals throughout; uppercase tracked kickers at 0.66–0.7 rem.

## Shape and surfaces

- Capsules (999 px) for every button and tab; 7 px radius for the tape, date box and stat tiles; 10–16 px for sheets.
- Hairline outlines on dark fills; the selected dock item gets a cyan ring plus a soft glow.
- Shadows always offset and blurred; the play button carries a violet glow.

## Signature move

The time strip is a ruled tape sliding under a pink pin, with Day / Month / Year changing its
density; "Live" shows the model is following the real clock to the minute.

## Motion

Exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), 160 ms for state and 320 ms for sheets;
camera flights 1.5–1.6 s; everything 1 ms under `prefers-reduced-motion`.

## Responsive rules

- ≤ 900 px: single column; dock becomes a scroll-snap row; facts panel becomes a sheet; help becomes an icon.
- ≤ 480 px: tighter tools and tiles.
- ≤ 460 px tall: compact rail, horizontal chips in the dock, clock hidden.
- ≥ 1600 px: wider facts column and larger thumbnails.
- Every grid child has `min-width: 0` so content can never widen the page.
