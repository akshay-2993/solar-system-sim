// Planet table: J2000 orbital elements, physical data and display settings.
// Numbers follow the SOLAR-SYSTEM-SPEC tables; all prose is original.
const deg = (d) => (d * Math.PI) / 180;

export const SUN_RADIUS_KM = 695700;
export const SUN_RADIUS_UNITS = 0.5;
export const kmToUnits = (km) => (km / SUN_RADIUS_KM) * SUN_RADIUS_UNITS;
export const orbitRadius = (au) => 2.13 * Math.pow(au, 0.437);

export const PLANETS = [
  {
    key: 'mercury', name: 'Mercury', periodDays: 88, a: 0.387, e: 0.2056,
    incl: deg(7.005), node: deg(48.331), peri: deg(29.125), L0: deg(252.251),
    radiusKm: 2440, moons: 0, marker: '#B8BCC6', rotationDays: 58.6462,
    pole: { ra: deg(281.0103), dec: deg(61.4155) }, polarScale: 1, meridian: deg(329.5988),
    roughness: 0.98, atmosphere: null, texture: 'mercury',
  },
  {
    key: 'venus', name: 'Venus', periodDays: 225, a: 0.723, e: 0.0068,
    incl: deg(3.395), node: deg(76.68), peri: deg(54.853), L0: deg(181.98),
    radiusKm: 6052, moons: 0, marker: '#E8C48A', rotationDays: -243.018,
    pole: { ra: deg(272.76), dec: deg(67.16) }, polarScale: 1, meridian: deg(160.2),
    roughness: 0.92, atmosphere: { color: 0xffc073, scale: 1.04, strength: 0.16 }, texture: 'venus',
  },
  {
    key: 'earth', name: 'Earth', periodDays: 365.25, a: 1, e: 0.0167,
    incl: 0, node: 0, peri: deg(102.937), L0: deg(100.464),
    radiusKm: 6371, moons: 1, marker: '#6FB1FF', rotationDays: 0.99726968,
    pole: { ra: 0, dec: Math.PI / 2 }, polarScale: 0.997, meridian: deg(190.147),
    roughness: 0.78, atmosphere: { color: 0x4d9dff, scale: 1.06, strength: 0.36 }, texture: 'earth',
  },
  {
    key: 'mars', name: 'Mars', periodDays: 687, a: 1.524, e: 0.0934,
    incl: deg(1.85), node: deg(49.558), peri: deg(286.502), L0: deg(355.453),
    radiusKm: 3389, moons: 2, marker: '#FF8A75', rotationDays: 1.02595676,
    pole: { ra: deg(317.269202), dec: deg(54.432516) }, polarScale: 0.994, meridian: deg(176.049863),
    roughness: 0.96, atmosphere: { color: 0xe76f42, scale: 1.025, strength: 0.08 }, texture: 'mars',
  },
  {
    key: 'jupiter', name: 'Jupiter', periodDays: 4333, a: 5.203, e: 0.0489,
    incl: deg(1.303), node: deg(100.464), peri: deg(273.867), L0: deg(34.396),
    radiusKm: 69911, moons: 95, marker: '#F5B041', rotationDays: 0.41354,
    pole: { ra: deg(268.056595), dec: deg(64.495303) }, polarScale: 0.935, meridian: deg(284.95),
    roughness: 0.84, atmosphere: { color: 0xf2c796, scale: 1.018, strength: 0.07 }, texture: 'jupiter',
  },
  {
    key: 'saturn', name: 'Saturn', periodDays: 10759, a: 9.537, e: 0.0565,
    incl: deg(2.485), node: deg(113.665), peri: deg(339.392), L0: deg(49.954),
    radiusKm: 58232, moons: 274, marker: '#F8D66B', rotationDays: 0.44401,
    pole: { ra: deg(40.589), dec: deg(83.537) }, polarScale: 0.902, meridian: deg(38.9),
    roughness: 0.86, atmosphere: { color: 0xf4d49e, scale: 1.018, strength: 0.06 }, texture: 'saturn',
    rings: { innerKm: 74658, outerKm: 136775 },
  },
  {
    key: 'uranus', name: 'Uranus', periodDays: 30687, a: 19.19, e: 0.0472,
    incl: deg(0.773), node: deg(74.006), peri: deg(96.999), L0: deg(313.238),
    radiusKm: 25362, moons: 28, marker: '#8FE3FF', rotationDays: -0.71833,
    pole: { ra: deg(257.311), dec: deg(-15.175) }, polarScale: 0.977, meridian: deg(203.81),
    roughness: 0.72, atmosphere: { color: 0x8debff, scale: 1.04, strength: 0.18 }, texture: 'uranus',
  },
  {
    key: 'neptune', name: 'Neptune', periodDays: 60190, a: 30.07, e: 0.0086,
    incl: deg(1.77), node: deg(131.784), peri: deg(273.187), L0: deg(304.88),
    radiusKm: 24622, moons: 16, marker: '#5B94FF', rotationDays: 0.67125,
    pole: { ra: deg(299.36), dec: deg(43.46) }, polarScale: 0.983, meridian: deg(249.978),
    roughness: 0.74, atmosphere: { color: 0x467bff, scale: 1.045, strength: 0.22 }, texture: 'neptune',
  },
];

export const PLANET_BY_KEY = Object.fromEntries(PLANETS.map((p) => [p.key, p]));
export const MOON_RADIUS_KM = 1737;

// Row order: eight planets then the Moon.
export const BODIES = ['sun', ...PLANETS.map((p) => p.key), 'moon'];
export const BODY_NAMES = { sun: 'Sun', ...Object.fromEntries(PLANETS.map((p) => [p.key, p.name])), moon: 'Moon' };
export const BODY_COLORS = { sun: '#FFB13D', moon: '#C9CDD8', ...Object.fromEntries(PLANETS.map((p) => [p.key, p.marker])) };

// Info-card content. Stat values are the spec's numbers; the text is written for students.
export const INFO = {
  sun: {
    stats: [['One spin', '25 days'], ['Size', '109× Earth'], ['Surface', '5,500 °C'], ['Planets', '8']],
    text: 'Our star: a huge ball of glowing gas that holds 99.8% of all the mass in the solar system. Its gravity keeps every planet on its path, and its light and heat drive the weather and life on Earth. The dark patches are sunspots, cooler areas of strong magnetism.',
  },
  mercury: {
    stats: [['One year', '88 days'], ['Distance', '0.39 AU'], ['Size', '0.38× Earth'], ['Moons', '0']],
    text: 'The smallest planet and the closest to the Sun. Its grey, cratered surface looks a lot like our Moon. With almost no air to hold heat in, days are scorching and nights are freezing.',
  },
  venus: {
    stats: [['One year', '225 days'], ['Distance', '0.72 AU'], ['Size', '0.95× Earth'], ['Moons', '0']],
    text: "Earth's near twin in size, but wrapped in thick clouds of sulphuric acid. Its heavy carbon-dioxide air traps so much heat that the ground is hot enough to melt lead.",
  },
  earth: {
    stats: [['One year', '365 days'], ['Distance', '1 AU'], ['Size', '6,371 km'], ['Moons', '1']],
    text: 'Our home. Liquid-water oceans, swirling clouds and an atmosphere of nitrogen and oxygen make it the only world we know of that carries life.',
  },
  mars: {
    stats: [['One year', '687 days'], ['Distance', '1.52 AU'], ['Size', '0.53× Earth'], ['Moons', '2']],
    text: 'The red planet gets its colour from rusty iron dust. It has the tallest volcano and the deepest canyon in the solar system, and ice caps of water and frozen carbon dioxide at both poles.',
  },
  jupiter: {
    stats: [['One year', '11.9 Earth years'], ['Distance', '5.2 AU'], ['Size', '11× Earth'], ['Moons', '95']],
    text: 'The giant of the family, with more mass than all the other planets put together. Its stripes are fast-moving cloud bands, and the Great Red Spot is a storm wider than Earth.',
  },
  saturn: {
    stats: [['One year', '29.5 Earth years'], ['Distance', '9.54 AU'], ['Size', '9.1× Earth'], ['Moons', '274']],
    text: 'A gas giant famous for its bright rings, which are made mostly of chunks of water ice, from dust grains to house-sized boulders. Saturn is so light it would float in a big enough bathtub.',
  },
  uranus: {
    stats: [['One year', '84 Earth years'], ['Distance', '19.19 AU'], ['Size', '4× Earth'], ['Moons', '28']],
    text: 'A cold blue-green ice giant that spins on its side, so each pole gets about 42 years of daylight followed by 42 years of darkness. Methane in its air gives it the colour.',
  },
  neptune: {
    stats: [['One year', '164.8 Earth years'], ['Distance', '30.07 AU'], ['Size', '3.9× Earth'], ['Moons', '16']],
    text: 'The farthest planet: a deep-blue ice giant with the strongest winds ever measured, faster than the speed of sound on Earth. Dark storms appear and fade away over a few years.',
  },
  moon: {
    stats: [['One lap', '27.3 days'], ['From Earth', '3,84,400 km'], ['Size', '0.27× Earth'], ['Lit up', '']],
    text: 'The Moon keeps the same face turned towards Earth. Its path is tilted by about 5°, so in most months its shadow passes above or below us. That is why eclipses are rare events.',
  },
};

export const FOOTNOTE =
  'The Sun and the planets are drawn to the same size scale, so the planets look tiny: the bright dots show where each one is. The gaps between the orbits have been squeezed so the whole system fits on one screen.';

export const PHASE_NAMES = [
  'New Moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous',
  'Full Moon', 'Waning gibbous', 'Last quarter', 'Waning crescent',
];

export const APP_TITLE = 'Our Solar System';
export const APP_SUBTITLE = 'Planets, Moon phases and eclipses on the real calendar';
export const APP_DESCRIPTION =
  'A 3D model of the solar system that follows the real calendar. Choose any date between 1900 and 2100, fly to a planet, and step inside the Earth–Moon system to see phases and eclipses.';

export const INTRO = [
  'Press play or drag the time strip to travel through the years and watch the planets move.',
  'Tap the Sun, a planet or the Moon to fly closer and read its facts.',
  'Open Earth or the Moon to see day and night, the Moon\u2019s phases, and real eclipses.',
];

export const HELP = {
  intro:
    'This is a 3D model of the solar system tied to the real calendar. Pick any date and each planet appears where it truly is. Open Earth or the Moon to see the Moon’s phases and eclipses up close.',
  learn: [
    'Where each planet really is on any date, and why the inner planets lap the Sun much faster than the outer ones.',
    'How big the planets are compared with the Sun, and how empty the space between them is.',
    'Why we have day and night: Earth turns once a day, and only the half facing the Sun is lit. The Earth view opens above your own part of the world.',
    'Why the Moon shows phases: the sunlit half of the Moon is always there, we just see different amounts of it as it circles Earth.',
    'Why eclipses are rare: the Moon\u2019s path is tilted, so it only lines up exactly with the Sun and Earth a few times a year.',
  ],
  points: [
    'Press play to let time run, or drag the strip at the bottom to move through time by hand. Day, Month and Year set how fast time moves, and Today jumps back to the real date.',
    'Drag the sky to turn the view and scroll or pinch to zoom. Tap the Sun or a planet for a close-up. Tapping Earth or the Moon opens the Earth–Moon view, where you can hold the Moon and pull it around Earth to change its phase day by day.',
    'Because the Moon’s orbit is tilted, it usually passes just above or below the straight line to the Sun. Find next eclipse jumps to the next real one: in a solar eclipse the Moon’s shadow falls on Earth, and in a lunar eclipse the Moon passes through Earth’s shadow.',
  ],
};
