# Product

<!-- impeccable:product-schema 1 -->

<!-- Written from the build brief handed to this session (no live interview was possible:
     the brief came from another Claude session acting for Akshay). Facts marked
     [brief] come straight from that brief; facts marked [inferred] are this session's assumptions. -->

## Platform

web

## Stack

delegated: Vite + Three.js single-page app, plain JavaScript, no UI framework [brief].
Must run fully offline (fonts, textures, scripts all bundled, no CDN) [brief].
Two builds: a static folder for GitHub Pages and for upload to the Geneo learning platform,
and one self-contained index.html that opens from disk [brief].

## Users

School students (roughly ages 10–16) exploring the solar system in a science lesson, on
whatever device the school or home provides: phones from 320 px wide, tablets, laptops, 4K
displays, touch and mouse [brief]. Teachers project it on a classroom screen [inferred].
Students use it for a few minutes at a time, often unsupervised, so every control must explain
itself and nothing may be destructive [inferred].

## Product Purpose

A 3D model of the solar system tied to the real calendar: every planet sits where it really is
on the chosen date, time can be played or scrubbed, Earth and the Moon can be opened to watch
phases and eclipses, and an info card gives the key facts for each body [brief].
Success: a student can find today's sky, fly to a planet, read its facts, and understand why
eclipses are rare, without instructions [inferred].

## Positioning

An original recreation of an existing Astra lab. It must keep the same information
architecture (header, 3D canvas, bottom timeline panel, body row, info card) and the same
physics, but every visible word is rephrased and the visual design is clearly its own [brief].
English only, no branding, no attribution text on any asset [brief].

## Constraints

- All planet maps are NASA / USGS public-domain images; everything else is generated in code [brief].
- Sounds: a short click on buttons and a whoosh on camera flights, generated with the Web Audio API [brief].
- Timeline range 1 Jan 1900 to 31 Dec 2100; speeds Day / Month / Year as in the spec [brief].
- Honour prefers-reduced-motion [brief, via spec].
- Works from 320×568 up to 2560×1440 in both orientations [brief].

## Terminology

System view, close-up, Earth–Moon view, scrub tape, Today, Find next eclipse, orbit paths, info card.
