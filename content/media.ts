import type { Media } from '@/lib/cms/types'

// Mediathek: Bilder aus /public/images. Im CMS wird daraus die Sammlung media mit Upload.
export const media = {
  fussballFinale: {
    url: '/images/fussball-finale.jpg',
    alt: 'Spieler der SG Ahrbach im roten Trikot im Zweikampf beim Hallenturnier',
    width: 2560,
    height: 1707,
    focus: 'center 40%',
  },
  fussballHerren1: {
    url: '/images/fussball-herren-1.jpg',
    alt: 'Mannschaftsfoto der 1. Mannschaft der SG Ahrbach, Saison 2026/27',
    width: 2560,
    height: 1707,
  },
  fussballHerren2: {
    url: '/images/fussball-herren-2.jpg',
    alt: 'Mannschaftsfoto der 2. Mannschaft der SG Ahrbach, Saison 2026/27',
    width: 2560,
    height: 1707,
  },
  fussballFrauen: {
    url: '/images/fussball-frauen.jpg',
    alt: 'Die Fußballfrauen des TuS Ahrbach',
    width: 1521,
    height: 1007,
  },
  fussballFrauenJubilaeum: {
    url: '/images/fussball-frauen-jubilaeum.jpg',
    alt: 'Gruppenfoto beim Jubiläum 50 Jahre Frauenfußball im TuS Ahrbach',
    width: 2560,
    height: 1707,
  },
  handballFrauen: {
    url: '/images/handball-frauen.jpg',
    alt: 'Die Handballfrauen der SG Ahrbach/Bannberscheid',
    width: 1024,
    height: 625,
  },
  kinderturnen: {
    url: '/images/kinderturnen.jpg',
    alt: 'Kinder beim Kinderturnen in der Turnhalle',
    width: 1600,
    height: 1200,
  },
  elternKindTurnen: {
    url: '/images/eltern-kind-turnen.jpg',
    alt: 'Eltern und Kinder beim gemeinsamen Turnen',
    width: 2560,
    height: 1920,
  },
  beatDancers: {
    url: '/images/beat-dancers.jpg',
    alt: 'Die Bodener Beat Dancers in ihren Showtanz-Kostümen',
    width: 2560,
    height: 1707,
  },
  wakeUpper: {
    url: '/images/wakeupper.jpg',
    alt: 'Die Showtanzgruppe WakeUpper auf der Bühne',
    width: 1131,
    height: 516,
  },
  anpfiff2026: {
    url: '/images/anpfiff-2026.jpg',
    alt: 'Titelseite der Vereinszeitschrift anpfiff, Saison 2026/27',
    width: 595,
    height: 818,
  },
  cupAktion: {
    url: '/images/cup/cup-aktion.jpg',
    alt: 'Spieler im roten Trikot nimmt beim Ahrbach-Cup den Ball an, im Hintergrund die Zuschauer',
    width: 1000,
    height: 1250,
    focus: 'center 30%',
  },
  cupTeam: {
    url: '/images/cup/cup-team.jpg',
    alt: 'Eine Mannschaft in hellblauen Trikots posiert beim Ahrbach-Cup in der Halle',
    width: 1000,
    height: 1500,
  },
  sparkasse: {
    url: '/images/logo-sparkasse.svg',
    alt: 'Sparkasse Westerwald-Sieg',
    width: 1372,
    height: 500,
  },
} satisfies Record<string, Media>

// Mannschaftsfotos, übernommen von der bisherigen Webseite
export const teamMedia = {
  herren3: { url: '/images/teams/herren-3.jpg', alt: 'Die 3. Mannschaft der SG Ahrbach', width: 2000, height: 1333 },
  alteHerren: { url: '/images/teams/alte-herren.jpg', alt: 'Die Alten Herren des TuS Ahrbach beim Abendtraining', width: 2000, height: 1500 },
  aJunioren: { url: '/images/teams/a-junioren.jpg', alt: 'Mannschaftsfoto der A-Junioren', width: 1920, height: 1280 },
  bJunioren: { url: '/images/teams/b-junioren.jpg', alt: 'Mannschaftsfoto der B-Junioren der JSG Wäller United', width: 1599, height: 899 },
  cJunioren: { url: '/images/teams/c-junioren.jpg', alt: 'Die C-Junioren zu Besuch bei den Eindse Boys', width: 1000, height: 750 },
  dJunioren: { url: '/images/teams/d-junioren.jpg', alt: 'Mannschaftsfoto der D-Junioren der JSG Ahrbach', width: 640, height: 481 },
  eJunioren: { url: '/images/teams/e-junioren.jpg', alt: 'Mannschaftsfoto der E-Junioren', width: 1121, height: 914 },
  fJunioren: { url: '/images/teams/f-junioren.jpg', alt: 'Mannschaftsfoto der F-Junioren', width: 2000, height: 1500 },
  bambini: { url: '/images/teams/bambini.jpg', alt: 'Die Bambini der JSG Ahrbach', width: 1600, height: 900 },
  bJuniorinnen: { url: '/images/teams/b-juniorinnen.jpg', alt: 'Mannschaftsfoto der B-Juniorinnen der MSG Ahrbach-Montabaur', width: 1181, height: 800 },
  cJuniorinnen: { url: '/images/teams/c-juniorinnen.jpg', alt: 'Mannschaftsfoto der C-Juniorinnen der MSG Ahrbach-Montabaur', width: 1181, height: 800 },
  dJuniorinnen: { url: '/images/teams/d-juniorinnen.jpg', alt: 'Mannschaftsfoto der D-Juniorinnen der MSG Ahrbach-Montabaur', width: 1181, height: 800 },
  eJuniorinnen: { url: '/images/teams/e-juniorinnen.jpg', alt: 'Mannschaftsfoto der E-Juniorinnen der MSG Ahrbach-Montabaur', width: 1181, height: 800 },
  handballHerren1: { url: '/images/teams/handball-herren-1.jpg', alt: 'Die Handballer der HSG Westerwald I', width: 1424, height: 994 },
  dieEhemaligen: { url: '/images/teams/die-ehemaligen.jpg', alt: 'Die Ehemaligen beim gemeinsamen Handballspiel', width: 2000, height: 1500 },
  handballWbJugend: { url: '/images/teams/handball-wb-jugend.jpg', alt: 'Die weibliche B-Jugend der JSG Ahrbach/Bannberscheid', width: 2000, height: 1230 },
  handballMbJugend: { url: '/images/teams/handball-mb-jugend.jpg', alt: 'Die männliche B-Jugend der JSG Ahrbach/Bannberscheid', width: 1920, height: 887 },
  handballMcJugend: { url: '/images/teams/handball-mc-jugend.jpg', alt: 'Die männliche C-Jugend der JSG Ahrbach/Bannberscheid', width: 1600, height: 1200 },
  handballMdJugend: { url: '/images/teams/handball-md-jugend.jpg', alt: 'Die männliche D-Jugend der JSG Ahrbach/Bannberscheid mit Trainerteam', width: 2000, height: 1283 },
  handballMeJugend: { url: '/images/teams/handball-me-jugend.jpg', alt: 'Die männliche E-Jugend der JSG Ahrbach/Bannberscheid', width: 2000, height: 1500 },
  gymnastik: { url: '/images/teams/gymnastik.jpg', alt: 'Die Gymnastikgruppe beim Training', width: 2000, height: 1453 },
  kinderturnen6: { url: '/images/teams/kinderturnen-6.jpg', alt: 'Turnerinnen beim Wettkampf in Westerburg', width: 524, height: 640 },
} satisfies Record<string, Media>
