---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["src/main.js","src/ui.js"]
---

# Surface brief: the simulation page (index.html)

Scope: the single screen of the app. Visitor mode: Operate (the student explores, scrubs time, opens close-ups and reads facts).
Audience and job: school students 10–16 on any device; find today's sky, fly to a planet, read its card, see why eclipses are rare.
Content: 3D canvas, header, bottom timeline panel, body row, info card, help, menu. Numbers come from SOLAR-SYSTEM-SPEC.md; all prose rephrased.
Constraints: offline, bundled fonts, 320 px to 4K, touch and mouse, visibly different from the Astra original, no branding, no attribution text.

Unattended round: the brief came from another session acting for Akshay and nobody could answer a decision page, so the assigned direction was built as dealt and this substitution is disclosed in the session's first reply.

## Direction contract

THESIS: The page is an astronomer's field notebook laid open around a window onto the real sky. It refuses the category default (black glass panels, blue pills, glowing edges): the chrome is paper and ink, the sky is the only dark thing.

OWN-WORLD: Kraft/ochre cover rail for the header (#C8922A on #2A2117), cream ruled paper for the panels (#F4EEE1 with 1px #D9CFBB rules), ink navy text (#1B2233), graphite secondary (#5B6170), one red mark (#C9372C) for "now", the selected body and the eclipse stamp. Type: Bricolage Grotesque for the title and the date stamp, Atkinson Hyperlegible for every control and paragraph, tabular numerals everywhere a number moves. Controls are flat paper tabs and ink-outlined capsules, radius 6px on buttons and 999px on chips, no glow, shadows offset 0 2px with 6px blur in ink at 18%.

STORY: The student sees the planets where they are today, understands the paper strip at the bottom is a calendar they can drag, and that each body on the row opens a notebook page about it.

FIRST VIEWPORT: Ochre cover rail on top with the title in Bricolage and a one-line subtitle; three ink icon buttons on the right. The sky window fills the middle. Bottom: a cream notebook panel with a red-pinned ruled time strip running full width, a date stamp box and TODAY tab on the right, Day/Month/Year as index tabs on the panel's left edge, "Find next eclipse" as an ink-outlined capsule, the orbit-paths switch at the right; below, a row of body tiles each with its sphere and a name plate, and the info button pinned at the end. On phones the same panel stacks, the row scrolls sideways.

FORM: Astronomer's field notebook, candidate 5 of 7 on the grounded list (1 planetarium dome, 2 planisphere wheel, 3 brass orrery, 4 textbook plate, 5 field notebook, 6 mission patch, 7 star atlas). Seed key 2e47e1cf.
Raises taken from declined challengers: 1px ruling discipline on tape ticks from the centre-rail reference setting; tabular, column-aligned numerals from the data-sublime field; accent spent exactly on "now", selection and the eclipse stamp from the monochrome marketing canon; tick length encoding duration from labanotation. Competitive challengers kept as lines: body tiles as a roster with name plates and a ribbon colour when selected (character catalog); capsule chip that crosses to the leading edge when the orbit switch is live (zoo guide map).
Signature move: the timeline is a ruled logbook strip with a red pin; Day/Month/Year are physical index tabs on the notebook edge.
Honest risk: cream panels over a black canvas can read as a light theme bolted on; the cover rail, rules and ink type must make the paper read as an object.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


## Revision (attended round, surface scope, seed 4ae86b80)
Akshay pinned blues/violets, rounded shapes and fewer boxed sections. Five compositions were offered (three dealt: open sky with a bottom row, bodies strip under the title, slim icon rail; two additional: single bottom console, single reading column). Akshay chose **open sky, bottom row**: full-bleed sky, floating pill console, body icons in a row, one hideable facts card top-right. Built code-led.
