"use strict";

const ROUND_LENGTH = 20;
const REWARD = 25;
const WORD_REWARD = 1;
const STREAK_SIZE = 5;
const STREAK_BONUS = 3;
const JOKER_PRICE = 15;
const STORAGE_KEY = "rainbow-quest-v1";
const WORLD_HEIGHT = 260;
const START_X = 80;

// hat: where a hat sits on the unflipped glyph, in % of the emoji box.
const ANIMALS = [
  { id: "unicorn", name: "Einhorn", dative: "deinem Einhorn", emoji: "🦄", price: 0, flip: true, hat: [40, 6], trick: "fly", trickName: "Fliegen", description: "Fliegt vor Freude hoch in die Luft" },
  { id: "fox", name: "Fuchs", dative: "deinem Fuchs", emoji: "🦊", price: 60, flip: false, hat: [50, 4], trick: "jump", trickName: "Salto", description: "Schlägt flinke Saltos" },
  { id: "cat", name: "Katze", dative: "deiner Katze", emoji: "🐱", price: 100, flip: false, hat: [50, 6], trick: "purr", trickName: "Schnurren", description: "Wackelt verschmust und verteilt Herzen" },
  { id: "penguin", name: "Pinguin", dative: "deinem Pinguin", emoji: "🐧", price: 150, flip: false, hat: [50, 4], trick: "slide", trickName: "Eisrutschen", description: "Rutscht übers Eis und lässt es schneien" },
  { id: "owl", name: "Eule", dative: "deiner Eule", emoji: "🦉", price: 200, flip: false, hat: [50, 4], trick: "spin", trickName: "Kopfdrehen", description: "Dreht sich im Kreis und singt dabei" },
  { id: "panda", name: "Panda", dative: "deinem Panda", emoji: "🐼", price: 280, flip: false, hat: [50, 10], trick: "roll", trickName: "Purzelbaum", description: "Kugelt fröhlich hin und her" },
  { id: "dragon", name: "Drache", dative: "deinem Drachen", emoji: "🐉", price: 380, flip: true, hat: [38, 6], trick: "fire", trickName: "Feuerspucken", description: "Spuckt bei jedem Treffer Feuer" },
  { id: "dolphin", name: "Delfin", dative: "deinem Delfin", emoji: "🐬", price: 500, flip: true, hat: [42, 14], trick: "splash", trickName: "Wassersprung", description: "Springt im Bogen und spritzt dabei" },
  { id: "phoenix", name: "Phönix", dative: "deinem Phönix", emoji: "🐦‍🔥", price: 900, flip: true, hat: [42, 6], trick: "rebirth", trickName: "Flammenwiedergeburt", description: "Legendär! Steigt in einem Feuerring auf" }
];

const HATS = [
  { id: "none", name: "Ohne Hut", emoji: "", price: 0, description: "Ganz natürlich" },
  { id: "bow", name: "Schleife", emoji: "🎀", price: 40, description: "Hübsch und festlich" },
  { id: "cap", name: "Kappe", emoji: "🧢", price: 50, description: "Sportlich unterwegs" },
  { id: "sunhat", name: "Sonnenhut", emoji: "👒", price: 70, description: "Perfekt für Sommertage" },
  { id: "tophat", name: "Zylinder", emoji: "🎩", price: 80, description: "Sehr vornehm, mein Herr!" },
  { id: "butterfly", name: "Schmetterling", emoji: "🦋", price: 90, description: "Ein flatternder Freund" },
  { id: "mushroom", name: "Pilzhut", emoji: "🍄", price: 110, description: "Direkt aus dem Zauberwald" },
  { id: "flowers", name: "Blütenkranz", emoji: "🌸", price: 120, description: "Riecht nach Frühling" },
  { id: "feather", name: "Feder", emoji: "🪶", price: 140, description: "Leicht wie ein Wort" },
  { id: "sunflower", name: "Sonnenblume", emoji: "🌻", price: 160, description: "Strahlt mit dir um die Wette" },
  { id: "gradcap", name: "Doktorhut", emoji: "🎓", price: 180, description: "Für echte Vokabel-Profis" },
  { id: "star", name: "Stern", emoji: "⭐", price: 200, description: "Du bist ein Star!" },
  { id: "pumpkin", name: "Kürbis", emoji: "🎃", price: 240, description: "Gruselig gut" },
  { id: "rainbowhat", name: "Regenbogen", emoji: "🌈", price: 280, description: "Ein Regenbogen auf dem Kopf" },
  { id: "crown", name: "Krone", emoji: "👑", price: 300, description: "Für Königinnen und Könige des Wortschatzes" },
  { id: "planet", name: "Planet", emoji: "🪐", price: 400, description: "Kreist um deinen Kopf" },
  { id: "xmashat", name: "Weihnachtsmann", emoji: "🎅", price: 120, description: "Weihnachten: Ho, ho, ho!" },
  { id: "easterhat", name: "Osterhase", emoji: "🐰", price: 110, description: "Ostern: Hoppelt mit dir um die Wette" },
  { id: "ghosthat", name: "Gespenst", emoji: "👻", price: 150, description: "Halloween: Buh! Wer war das?" },
  { id: "partyhat", name: "Partyhut", emoji: "🥳", price: 140, description: "Silvester: Auf ein tolles neues Jahr" },
  { id: "cakehat", name: "Geburtstagstorte", emoji: "🎂", price: 130, description: "Geburtstag: Mit Kerze obendrauf" },
  { id: "hearthat", name: "Herzgeschenk", emoji: "💝", price: 120, description: "Valentinstag: Von Herzen" },
  { id: "carnivalhat", name: "Faschingsmaske", emoji: "🎭", price: 130, description: "Karneval: Helau und Alaaf!" }
];

const TRAILS = [
  { id: "none", name: "Keine Spur", chars: [], price: 0, description: "Leise unterwegs" },
  { id: "sparkle", name: "Glitzerspur", chars: ["✨", "⭐"], price: 60, description: "Funkelt bei jedem Schritt" },
  { id: "hearts", name: "Herzchenspur", chars: ["💖", "💗", "💕"], price: 100, description: "Liebe auf Schritt und Tritt" },
  { id: "notes", name: "Musikspur", chars: ["🎵", "🎶"], price: 150, description: "Jeder Schritt ein Lied" },
  { id: "stars", name: "Sternschnuppen", chars: ["🌟", "💫", "⭐"], price: 220, description: "Wünsch dir was!" },
  { id: "rainbow", name: "Regenbogenspur", chars: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣"], price: 350, description: "Alle Farben hinter dir her" },
  { id: "xmas", name: "Schneeflockenspur", chars: ["❄️", "🎄", "⭐"], price: 140, description: "Weihnachten: Es schneit bei jedem Schritt" },
  { id: "easter", name: "Eierspur", chars: ["🥚", "🌷", "🐣"], price: 130, description: "Ostern: Versteckte Eier im Gras" },
  { id: "halloween", name: "Spukspur", chars: ["🦇", "🕷️", "🎃"], price: 150, description: "Halloween: Gruselig und lustig" },
  { id: "newyear", name: "Sektspur", chars: ["🥂", "✨", "🎆"], price: 150, description: "Silvester: Prost Neujahr!" },
  { id: "birthday", name: "Partyspur", chars: ["🎈", "🎁", "🎉"], price: 140, description: "Geburtstag: Hinter dir geht die Party los" },
  { id: "valentine", name: "Rosenspur", chars: ["🌹", "💌", "💘"], price: 140, description: "Valentinstag: Romantisch unterwegs" },
  { id: "carnival", name: "Narrenspur", chars: ["🎭", "🎊", "🪅"], price: 140, description: "Karneval: Bunt und närrisch" }
];

const CELEBRATIONS = [
  { id: "glow", name: "Goldglanz", icon: "🪙", effect: "none", price: 0, description: "Die klassische Schatzfreude" },
  { id: "confetti", name: "Konfetti", icon: "🎊", effect: "confetti", price: 80, description: "Bunte Schnipsel regnen herab" },
  { id: "balloons", name: "Luftballons", icon: "🎈", effect: "balloons", price: 150, description: "Ballons steigen in den Himmel" },
  { id: "fireworks", name: "Feuerwerk", icon: "🎆", effect: "fireworks", price: 250, description: "Es knallt und funkelt" },
  { id: "goldrain", name: "Goldregen", icon: "💰", effect: "goldrain", price: 400, description: "Es regnet Münzen!" },
  { id: "xmasfx", name: "Schneefall", icon: "❄️", effect: "emoji", mode: "fall", chars: ["❄️", "⛄", "🎄"], price: 250, description: "Weihnachten: Leise rieselt der Schnee" },
  { id: "easterfx", name: "Eierregen", icon: "🥚", effect: "emoji", mode: "fall", chars: ["🥚", "🐣", "🌷"], price: 230, description: "Ostern: Bunte Eier fallen vom Himmel" },
  { id: "halloweenfx", name: "Fledermausschwarm", icon: "🦇", effect: "emoji", mode: "rise", chars: ["🦇", "👻", "🎃"], price: 260, description: "Halloween: Es spukt im Himmel" },
  { id: "newyearfx", name: "Silvesterknaller", icon: "🧨", effect: "emoji", mode: "burst", chars: ["🎇", "🧨", "✨"], price: 280, description: "Silvester: Mitternacht, es knallt!" },
  { id: "birthdayfx", name: "Kuchenregen", icon: "🍰", effect: "emoji", mode: "fall", chars: ["🍰", "🧁", "🎂"], price: 240, description: "Geburtstag: Lecker, es regnet Kuchen" },
  { id: "valentinefx", name: "Herzregen", icon: "💖", effect: "emoji", mode: "rise", chars: ["💖", "💗", "💘"], price: 230, description: "Valentinstag: Herzen steigen auf" },
  { id: "carnivalfx", name: "Luftschlangen", icon: "🎊", effect: "emoji", mode: "fall", chars: ["🎊", "🪅", "🎭"], price: 210, description: "Karneval: Konfettiparade" }
];

const CHESTS = [
  { id: "wood", name: "Holztruhe", price: 0, description: "Robust und zuverlässig", colors: { lid: "#b9763e", body: "#a96737", line: "#805332", band: "#f7cf6a", lock: "#ffda73" } },
  { id: "gift", name: "Geschenkbox", price: 80, description: "Mit Schleife – was ist wohl drin?", colors: { lid: "#e6536e", body: "#d94661", line: "#a8304a", band: "#ffe08a", lock: "#fff2c4" } },
  { id: "pirate", name: "Piratenkiste", price: 160, description: "Arrr! Mit Eisenbeschlägen", colors: { lid: "#5c3b26", body: "#4d311f", line: "#2b1b10", band: "#9aa3ad", lock: "#c9ced4" } },
  { id: "crystal", name: "Kristalltruhe", price: 260, description: "Glitzert wie ein Eiskristall", colors: { lid: "#9fd8f5", body: "#86c8ec", line: "#4c95c4", band: "#ffffff", lock: "#e2f6ff" } },
  { id: "gold", name: "Goldtruhe", price: 450, description: "Purer Luxus", colors: { lid: "#f4c542", body: "#e8b52f", line: "#a97c12", band: "#fff1b8", lock: "#ffffff" } },
  { id: "xmaschest", name: "Adventskiste", price: 180, description: "Weihnachten: Rot, grün und festlich", colors: { lid: "#c8312f", body: "#b02a28", line: "#7d1b1a", band: "#2f8f4e", lock: "#ffe9a8" } },
  { id: "eastechest", name: "Osternest", price: 170, description: "Ostern: Pastellfarben und süß", colors: { lid: "#f7c8e0", body: "#cde9b0", line: "#8cb66a", band: "#fff3a6", lock: "#ffffff" } },
  { id: "halloweenchest", name: "Hexenkiste", price: 190, description: "Halloween: Orange mit Spinnennetz", colors: { lid: "#f08a24", body: "#3a2a4d", line: "#1d1229", band: "#7ccf4a", lock: "#d9ffbf" } },
  { id: "newyearchest", name: "Mitternachtstruhe", price: 200, description: "Silvester: Dunkel mit Goldglanz", colors: { lid: "#2a2f6b", body: "#1f2354", line: "#0f1236", band: "#f4c542", lock: "#fff1b8" } },
  { id: "birthdaychest", name: "Tortenkiste", price: 170, description: "Geburtstag: Rosa mit Sahne", colors: { lid: "#ffd1e3", body: "#f59ac0", line: "#c4638f", band: "#ffffff", lock: "#ff6f9c" } },
  { id: "valentinechest", name: "Herzkiste", price: 170, description: "Valentinstag: Voller Liebe", colors: { lid: "#ef4f78", body: "#d93a65", line: "#a42447", band: "#ffc2d4", lock: "#ffffff" } },
  { id: "carnivalchest", name: "Narrenkiste", price: 180, description: "Karneval: Bunt wie ein Harlekin", colors: { lid: "#7c4dd6", body: "#e8b52f", line: "#4a2a8f", band: "#e2502a", lock: "#ffffff" } }
];

const PATHS = [
  { id: "rainbow", name: "Regenbogen", price: 0, description: "Der klassische Zauberweg", strokes: [
    { color: "#f5aaa6", width: 11, offset: -25, opacity: .85 }, { color: "#f9cb94", width: 11, offset: -15, opacity: .85 },
    { color: "#f9e6a0", width: 11, offset: -5, opacity: .85 }, { color: "#b8dec1", width: 11, offset: 5, opacity: .85 },
    { color: "#b0d5e9", width: 11, offset: 15, opacity: .85 }, { color: "#cbbde8", width: 11, offset: 25, opacity: .85 }] },
  { id: "candy", name: "Zuckerstange", price: 100, description: "Süß, gestreift und lecker", strokes: [
    { color: "#ffffff", width: 20 }, { color: "#ef5b7f", width: 20, dash: "14 14" }, { color: "#c94467", width: 2, offset: 11, opacity: .4 }] },
  { id: "stars", name: "Sternenpfad", price: 180, description: "Ein Weg aus funkelnden Sternen", strokes: [
    { color: "#3d3570", width: 20, opacity: .45 }, { color: "#ffd76a", width: 8, dash: "0 20", cap: "round" }] },
  { id: "clouds", name: "Wolkenweg", price: 260, description: "Weich wie Zuckerwatte", strokes: [
    { color: "#dce6f5", width: 32, offset: 5 }, { color: "#ffffff", width: 30 }, { color: "#ffffff", width: 46, dash: "0 42", cap: "round" }] },
  { id: "lava", name: "Lavabrücke", price: 400, description: "Heiß, heißer, Lavabrücke!", strokes: [
    { color: "#4a2a22", width: 26 }, { color: "#e2502a", width: 14 }, { color: "#ffc24b", width: 4, dash: "14 16", cap: "round" }] }
];

const BACKGROUNDS = [
  { id: "sky", name: "Himmelblau", price: 0, className: "bg-sky", dark: false, description: "Sonnig mit Schäfchenwolken", sky: ["☁️", "☁️", "✨"], ground: [] },
  { id: "meadow", name: "Blumenwiese", price: 90, className: "bg-meadow", dark: false, description: "Blumen und Schmetterlinge", sky: ["☁️", "🦋"], ground: ["🌼", "🌷", "🌸", "🌱"] },
  { id: "night", name: "Sternennacht", price: 180, className: "bg-night", dark: true, description: "Mondschein und Sternenglanz", sky: ["⭐", "✨", "🌙", "✨"], ground: [] },
  { id: "forest", name: "Zauberwald", price: 260, className: "bg-forest", dark: false, description: "Hohe Bäume und Pilze", sky: ["🍃", "🐦"], ground: ["🌲", "🌳", "🍄", "🌲"] },
  { id: "space", name: "Weltall", price: 450, className: "bg-space", dark: true, description: "Planeten und Kometen", sky: ["🪐", "⭐", "☄️", "✨", "🌍"], ground: [] },
  { id: "xmasworld", name: "Winterwunderland", price: 200, className: "bg-xmas", dark: false, description: "Weihnachten: Verschneite Tannen", sky: ["❄️", "⭐", "❄️"], ground: ["🎄", "⛄", "🎁", "🎄"] },
  { id: "easterworld", name: "Osterwiese", price: 190, className: "bg-easter", dark: false, description: "Ostern: Eier im Frühlingsgras", sky: ["☁️", "🦋", "🐥"], ground: ["🥚", "🌷", "🐰", "🌼"] },
  { id: "halloweenworld", name: "Spukschloss", price: 210, className: "bg-halloween", dark: true, description: "Halloween: Vollmond und Fledermäuse", sky: ["🦇", "🌕", "🦇", "👻"], ground: ["🎃", "🪦", "🕸️", "🎃"] },
  { id: "newyearworld", name: "Silvesternacht", price: 220, className: "bg-newyear", dark: true, description: "Silvester: Feuerwerk über der Stadt", sky: ["🎆", "🎇", "✨", "🎆"], ground: ["🏙️", "🥂"] },
  { id: "birthdayworld", name: "Partyraum", price: 180, className: "bg-birthday", dark: false, description: "Geburtstag: Ballons und Geschenke", sky: ["🎈", "🎉", "🎈"], ground: ["🎁", "🎂", "🎁", "🎈"] },
  { id: "valentineworld", name: "Rosengarten", price: 190, className: "bg-valentine", dark: false, description: "Valentinstag: Rosen und Herzen", sky: ["💕", "☁️", "💗"], ground: ["🌹", "🌷", "🌹", "💐"] },
  { id: "carnivalworld", name: "Faschingsumzug", price: 200, className: "bg-carnival", dark: false, description: "Karneval: Bunter Umzug", sky: ["🎊", "🎈", "🪅"], ground: ["🎪", "🎭", "🎺", "🎪"] }
];

const SHOP = { animals: ANIMALS, hats: HATS, trails: TRAILS, celebrations: CELEBRATIONS, chests: CHESTS, paths: PATHS, backgrounds: BACKGROUNDS };

const VOCAB_GROUPS = typeof require === "function" ? require("./vocab.js") : globalThis.RQ_VOCAB;
const BOOK_WORDS = VOCAB_GROUPS.flatMap(group => group.words);
const DEFAULT_GROUPS = ["unit-1-intro", "unit-1-zahlen-101-1-000", "unit-1-topic-1"];
const VERBS = typeof require === "function" ? require("./verbs.js") : globalThis.RQ_VERBS;
const VERB_FIELDS = 3;
const VERB_BONUS = 2;

// The window flag lets the browser tests switch the verb fields off.
function verbFieldCount() {
  return typeof window !== "undefined" && window.__noVerbFields ? 0 : VERB_FIELDS;
}

// Random, non-adjacent path steps (1 … length-1) that hold a verb challenge.
function pickVerbSteps(count = VERB_FIELDS) {
  const steps = [];
  for (const step of shuffle(Array.from({ length: ROUND_LENGTH - 1 }, (_, i) => i + 1))) {
    if (steps.length >= count) break;
    if (steps.every(other => Math.abs(other - step) > 1)) steps.push(step);
  }
  return steps.sort((a, b) => a - b);
}

function checkVerbForms(verb, inputs) {
  return verb.forms.map((accepted, index) => isCorrectAnswer(inputs[index] ?? "", accepted));
}

function normalizeAnswer(value) {
  return value.normalize("NFKC").toLowerCase().trim()
    .replace(/[’‘]/g, "'").replace(/[‐‑–—-]/g, " ")
    .replace(/[.!?…]+$/g, "").trim().replace(/\s+/g, " ");
}

function isCorrectAnswer(answer, accepted) {
  const normalized = normalizeAnswer(answer);
  return normalized.length > 0 && accepted.some(value => {
    const target = normalizeAnswer(value);
    return normalized === target || (target.startsWith("to ") && normalized === target.slice(3));
  });
}

const MAX_SPEAK_TRIES = 3;

// Speech recognition may add filler words ("the bell"), so whole-word containment counts too.
function isSpokenMatch(transcripts, accepted) {
  const targets = accepted.flatMap(value => {
    const target = normalizeAnswer(value);
    return target.startsWith("to ") ? [target, target.slice(3)] : [target];
  }).filter(Boolean);
  return transcripts.some(transcript => {
    const spoken = ` ${normalizeAnswer(transcript).replace(/[^\p{L}\p{N}' ]/gu, " ").replace(/\s+/g, " ").trim()} `;
    return targets.some(target => spoken.includes(` ${target.replace(/[^\p{L}\p{N}' ]/gu, " ").replace(/\s+/g, " ").trim()} `));
  });
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function defaultOwned() {
  return Object.fromEntries(Object.entries(SHOP).map(([category, items]) => [category, [items[0].id]]));
}

function defaultSelected() {
  return Object.fromEntries(Object.entries(SHOP).map(([category, items]) => [category, items[0].id]));
}

function initialSave() {
  return {
    version: 2, coins: 0, progress: 0, streak: 0, jokers: 0,
    owned: defaultOwned(),
    selected: defaultSelected(),
    customWords: [],
    activeGroups: [...DEFAULT_GROUPS],
    verbSteps: pickVerbSteps(verbFieldCount()),
    settings: { voice: true },
    stats: emptyStats()
  };
}

const MASTERED_RUN = 3;

function emptyStats() {
  return { words: {}, rounds: 0, bestStreak: 0, totalCorrect: 0 };
}

function recordAnswer(stats, id, kind) {
  const entry = stats.words[id] ??= { correct: 0, wrong: 0, revealed: 0, run: 0 };
  entry[kind]++;
  entry.run = kind === "correct" ? entry.run + 1 : 0;
  if (kind === "correct") stats.totalCorrect++;
  return entry;
}

function wordStatus(entry) {
  if (!entry || entry.correct + entry.wrong + entry.revealed === 0) return "new";
  return entry.run >= MASTERED_RUN ? "mastered" : "learning";
}

function mistakes(entry) {
  return entry ? entry.wrong + entry.revealed : 0;
}

function isHard(entry) {
  return mistakes(entry) > 0 && wordStatus(entry) !== "mastered";
}

// Shuffles all words and adds hard words a second time, never directly after their first copy.
function buildQueue(words, stats) {
  const queue = shuffle(words);
  for (const word of shuffle(words.filter(item => isHard(stats.words[item.id])))) {
    const first = queue.findIndex(item => item.id === word.id);
    const slots = [];
    for (let i = 0; i <= queue.length; i++) {
      if (Math.abs(i - first) > 1 && queue[i - 1]?.id !== word.id && queue[i]?.id !== word.id) slots.push(i);
    }
    if (slots.length) queue.splice(slots[Math.floor(Math.random() * slots.length)], 0, word);
  }
  return queue;
}

function isCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function isValidStats(stats) {
  return stats !== null && typeof stats === "object"
    && isCount(stats.rounds) && isCount(stats.bestStreak) && isCount(stats.totalCorrect)
    && stats.words !== null && typeof stats.words === "object" && !Array.isArray(stats.words)
    && Object.values(stats.words).every(entry => entry !== null && typeof entry === "object"
      && ["correct", "wrong", "revealed", "run"].every(key => isCount(entry[key])));
}

// Drops unknown group ids (e.g. from earlier versions); falls back to the default groups.
function migrateGroups(groups) {
  if (!Array.isArray(groups)) return [...DEFAULT_GROUPS];
  const known = [...new Set(groups)].filter(id => VOCAB_GROUPS.some(group => group.id === id));
  return known.length ? known : [...DEFAULT_GROUPS];
}

// Older saves lack newer fields or shop categories; fill them with defaults, keep everything else.
function migrateSave(raw) {
  if (!raw || typeof raw !== "object") return raw;
  let save = raw;
  if (raw.version !== 2) {
    save = {
      version: 2, coins: raw.coins, progress: 0, customWords: raw.customWords,
      owned: { animals: raw.owned }, selected: { animals: raw.selected }
    };
  }
  if (!save.owned || typeof save.owned !== "object" || !save.selected || typeof save.selected !== "object") return save;
  const owned = { ...defaultOwned(), ...save.owned };
  const selected = { ...defaultSelected(), ...save.selected };
  return {
    ...save, owned, selected,
    streak: save.streak ?? 0,
    jokers: save.jokers ?? 0,
    activeGroups: migrateGroups(save.activeGroups),
    verbSteps: Array.isArray(save.verbSteps) ? save.verbSteps : pickVerbSteps(verbFieldCount()),
    settings: save.settings ?? { voice: true },
    stats: save.stats ?? emptyStats()
  };
}

function isValidWord(word) {
  return Boolean(word) && typeof word.id === "string" && word.id.startsWith("custom-")
    && typeof word.german === "string" && word.german.trim().length > 0 && word.german.length <= 160
    && Array.isArray(word.english) && word.english.length > 0
    && word.english.every(value => typeof value === "string" && normalizeAnswer(value).length > 0 && value.length <= 160);
}

function isValidSave(save) {
  return save !== null && typeof save === "object" && save.version === 2
    && Number.isSafeInteger(save.coins) && save.coins >= 0
    && Number.isSafeInteger(save.progress) && save.progress >= 0 && save.progress < ROUND_LENGTH
    && Number.isSafeInteger(save.streak) && save.streak >= 0
    && Number.isSafeInteger(save.jokers) && save.jokers >= 0
    && save.owned !== null && typeof save.owned === "object"
    && save.selected !== null && typeof save.selected === "object"
    && Object.entries(SHOP).every(([category, items]) => {
      const owned = save.owned[category];
      return Array.isArray(owned) && owned.includes(items[0].id)
        && owned.every(id => items.some(item => item.id === id))
        && new Set(owned).size === owned.length
        && owned.includes(save.selected[category]);
    })
    && save.settings !== null && typeof save.settings === "object" && typeof save.settings.voice === "boolean"
    && isValidStats(save.stats)
    && Array.isArray(save.verbSteps) && save.verbSteps.length < ROUND_LENGTH
    && new Set(save.verbSteps).size === save.verbSteps.length
    && save.verbSteps.every(step => Number.isSafeInteger(step) && step >= 1 && step < ROUND_LENGTH)
    && Array.isArray(save.activeGroups) && save.activeGroups.length > 0
    && new Set(save.activeGroups).size === save.activeGroups.length
    && save.activeGroups.every(id => VOCAB_GROUPS.some(group => group.id === id))
    && Array.isArray(save.customWords) && save.customWords.every(isValidWord)
    && new Set(save.customWords.map(word => word.id)).size === save.customWords.length;
}

const SAVE_CODE_PREFIX = "RQ1:";
const MAX_IMPORT_LENGTH = 1_000_000;

// Base64 of the UTF-8 JSON, so umlauts in custom words survive copy & paste.
function encodeSave(save) {
  const bytes = new TextEncoder().encode(JSON.stringify(save));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return SAVE_CODE_PREFIX + btoa(binary);
}

// Accepts a save code or the JSON from a save file; returns a valid save or null.
function parseSaveText(text) {
  if (typeof text !== "string" || text.length > MAX_IMPORT_LENGTH) return null;
  try {
    const trimmed = text.trim();
    let json;
    if (trimmed.startsWith(SAVE_CODE_PREFIX)) {
      const binary = atob(trimmed.slice(SAVE_CODE_PREFIX.length).replace(/\s+/g, ""));
      json = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
    } else if (trimmed.startsWith("{")) {
      json = trimmed;
    } else {
      return null;
    }
    const save = migrateSave(JSON.parse(json));
    return isValidSave(save) ? save : null;
  } catch {
    return null;
  }
}

function buyItem(save, category, id) {
  const item = SHOP[category]?.find(entry => entry.id === id);
  if (!item) return false;
  const owned = save.owned[category];
  if (!owned.includes(id)) {
    if (save.coins < item.price) return false;
    save.coins -= item.price;
    owned.push(id);
  }
  save.selected[category] = id;
  return true;
}

function buyJoker(save) {
  if (save.coins < JOKER_PRICE) return false;
  save.coins -= JOKER_PRICE;
  save.jokers++;
  return true;
}

// Shows the first letter and blanks for the rest; a leading "to " stays visible.
function hintPattern(answer) {
  const prefix = /^to /i.test(answer) ? answer.slice(0, 3) : "";
  let first = true;
  return prefix + [...answer.slice(prefix.length)].map(char => {
    if (!/[\p{L}\p{N}]/u.test(char)) return char === " " ? "\u00a0\u00a0" : char;
    if (first) {
      first = false;
      return char;
    }
    return "_";
  }).join("");
}

function totalShopPrice() {
  return Object.values(SHOP).flat().reduce((sum, item) => sum + item.price, 0);
}

// Colors come only from the CHESTS constant, never from user input.
function chestSvg(c) {
  return `<svg viewBox="0 0 76 65" aria-hidden="true">
    <path class="chest-lid" d="M8 31V21C8 2 68 2 68 21V31Z" fill="${c.lid}" stroke="${c.line}" stroke-width="3"/>
    <path class="chest-lid" d="M20 11V30M56 11V30" fill="none" stroke="${c.band}" stroke-width="7"/>
    <rect x="8" y="29" width="60" height="31" rx="5" fill="${c.body}" stroke="${c.line}" stroke-width="3"/>
    <path d="M19 31V58M57 31V58M10 32H66" stroke="${c.band}" stroke-width="6"/>
    <rect x="31" y="29" width="14" height="17" rx="3" fill="${c.lock}" stroke="${c.line}" stroke-width="2"/>
    <circle cx="38" cy="36" r="2" fill="${c.line}"/>
    <path d="M38 37V41" stroke="${c.line}" stroke-width="2"/>
  </svg>`;
}

function trackY(t) {
  return 150 - 48 * Math.sin(t * 0.55) - 16 * Math.sin(t * 1.35 + 1);
}

function seeded(n) {
  const value = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function startApp() {
  const $ = id => document.getElementById(id);
  const SVG_NS = "http://www.w3.org/2000/svg";
  let save = initialSave();
  let currentWord;
  const isVerb = () => Boolean(currentWord?.forms);
  const VERB_INPUTS = ["verb-inf", "verb-past", "verb-pp"];
  let verbQueue = [];
  let queue = [];
  let answered = false;
  let wrongCounted = false;
  let jokerUsed = false;
  let stepWidth = 135;
  let worldWidth = 0;
  let shopCategory = "animals";

  function storageWarning(message) {
    $("storage-warning").textContent = message;
    $("storage-warning").hidden = false;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = migrateSave(JSON.parse(stored));
      if (!isValidSave(parsed)) throw new Error("Ungültiger Spielstand");
      save = parsed;
    }
  } catch (error) {
    console.warn("Rainbow Quest: Spielstand konnte nicht geladen werden.", error);
    storageWarning("Dein Spielstand konnte nicht geladen werden. Du startest neu. Bei der nächsten Änderung wird ein neuer Spielstand gespeichert.");
  }
  let correct = save.progress;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
    } catch (error) {
      console.warn("Rainbow Quest: Speichern fehlgeschlagen.", error);
      storageWarning("Speichern ist in diesem Browser gerade nicht möglich. Dein Fortschritt bleibt nur bis zum Schließen dieser Seite erhalten.");
    }
  }

  const activeBookWords = () => VOCAB_GROUPS.filter(group => save.activeGroups.includes(group.id)).flatMap(group => group.words);
  const allWords = () => [...activeBookWords(), ...save.customWords];
  const selectedItem = category => SHOP[category].find(item => item.id === save.selected[category]);
  const stepX = step => START_X + step * stepWidth;
  const chestStep = () => ROUND_LENGTH + 62 / stepWidth;

  function feedback(element, message, kind = "") {
    element.textContent = message;
    element.className = `feedback ${kind}`;
  }

  function drawStrokes(svg, path, d, scale = 1) {
    for (const stroke of path.strokes) {
      const line = document.createElementNS(SVG_NS, "path");
      line.setAttribute("d", d);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", stroke.color);
      line.setAttribute("stroke-width", stroke.width * scale);
      line.setAttribute("stroke-linecap", stroke.cap || "butt");
      line.setAttribute("stroke-linejoin", "round");
      if (stroke.dash) line.setAttribute("stroke-dasharray", stroke.dash.split(" ").map(n => n * scale).join(" "));
      if (stroke.opacity) line.setAttribute("opacity", stroke.opacity);
      if (stroke.offset) line.setAttribute("transform", `translate(0 ${stroke.offset * scale})`);
      svg.append(line);
    }
  }

  function trackPath(from, to) {
    const points = [];
    for (let t = from; t <= to + 1e-9; t += 0.1) points.push(`${(START_X + t * stepWidth).toFixed(1)} ${trackY(t).toFixed(1)}`);
    return `M ${points.join(" L ")}`;
  }

  function addDecor(char, x, y, size, kind) {
    const item = document.createElement("span");
    item.className = `decor-item decor-${kind}`;
    item.textContent = char;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.fontSize = `${size}px`;
    item.style.animationDelay = `${-seeded(x) * 6}s`;
    $("decor").append(item);
  }

  // Rebuilds everything that depends on the viewport size or the chosen path/background.
  function renderWorld() {
    const viewportWidth = $("viewport").clientWidth || 800;
    stepWidth = viewportWidth < 600 ? 92 : 135;
    const chestX = START_X + chestStep() * stepWidth;
    worldWidth = chestX + 200;
    const background = selectedItem("backgrounds");
    $("viewport").className = `viewport ${background.className}${background.dark ? " dark" : ""}`;
    $("world").style.width = `${worldWidth}px`;

    const track = $("track");
    track.setAttribute("viewBox", `0 0 ${worldWidth} ${WORLD_HEIGHT}`);
    track.setAttribute("width", worldWidth);
    track.setAttribute("height", WORLD_HEIGHT);
    track.replaceChildren();
    drawStrokes(track, selectedItem("paths"), trackPath(-0.9, ROUND_LENGTH + 0.6));

    $("path-markers").replaceChildren();
    for (let step = 0; step <= ROUND_LENGTH; step++) {
      const marker = document.createElement("span");
      marker.className = "path-marker";
      if (save.verbSteps.includes(step)) {
        marker.classList.add("verb");
        marker.title = "Verben-Feld: Hier musst du alle drei Formen eines unregelmäßigen Verbs nennen";
      }
      marker.style.left = `${stepX(step)}px`;
      marker.style.top = `${trackY(step)}px`;
      $("path-markers").append(marker);
    }

    $("decor").replaceChildren();
    const spacing = 180;
    for (let i = 0; i * spacing < worldWidth; i++) {
      if (background.sky.length) {
        addDecor(background.sky[i % background.sky.length], i * spacing + seeded(i) * 110, 12 + seeded(i + 40) * 55, 18 + seeded(i + 80) * 22, "sky");
      }
      if (background.ground.length) {
        addDecor(background.ground[(i * 3 + 1) % background.ground.length], i * spacing + 60 + seeded(i + 120) * 90, WORLD_HEIGHT - 4, 24 + seeded(i + 160) * 14, "ground");
      }
    }

    const chestY = trackY(chestStep());
    for (const id of ["treasure", "finish-label", "gold-burst"]) $(id).style.left = `${chestX}px`;
    $("treasure").style.top = `${chestY}px`;
    $("gold-burst").style.top = `${chestY - 95}px`;
    $("finish-label").style.top = `${Math.min(chestY + 32, WORLD_HEIGHT - 16)}px`;
    $("start-label").style.left = `${stepX(0)}px`;
    $("start-label").style.top = `${Math.min(trackY(0) + 34, WORLD_HEIGHT - 16)}px`;
  }

  function renderPosition() {
    const animal = selectedItem("animals");
    const hat = selectedItem("hats");
    $("animal-glyph").textContent = animal.emoji;
    $("traveler-hat").textContent = hat.emoji;
    $("traveler-hat").hidden = !hat.emoji;
    $("traveler-hat").style.left = `${animal.hat[0]}%`;
    $("traveler-hat").style.top = `${animal.hat[1]}%`;
    $("traveler-face").classList.toggle("flip", animal.flip);
    $("traveler").setAttribute("aria-label", `${animal.name}: Trick „${animal.trickName}“ zeigen`);
    $("treasure").innerHTML = chestSvg(selectedItem("chests").colors);
    const x = stepX(correct);
    $("traveler").style.left = `${x}px`;
    $("traveler").style.top = `${trackY(correct)}px`;
    const viewportWidth = $("viewport").clientWidth || 800;
    const camera = Math.max(0, Math.min(x - viewportWidth * 0.33, worldWidth - viewportWidth));
    $("world").style.transform = `translateX(${-camera}px)`;
    [...$("path-markers").children].forEach((marker, step) => marker.classList.toggle("done", step <= correct));

    const finished = correct === ROUND_LENGTH;
    $("companion-name").textContent = `Mit ${animal.dative} unterwegs · Tipp: Tippe dein Tier an!`;
    $("streak").textContent = `🔥 Serie: ${save.streak}`;
    $("streak").classList.toggle("hot", save.streak >= STREAK_SIZE);
    $("progress-text").textContent = `${correct} von ${ROUND_LENGTH}`;
    $("progress").max = ROUND_LENGTH;
    $("progress").value = correct;
    $("coins").textContent = save.coins;
    $("shop-coins").textContent = save.coins;
    $("treasure").setAttribute("aria-label", finished ? "Geöffnete Schatztruhe mit Gold" : "Schatztruhe");
    $("treasure").classList.toggle("open", finished);
    $("gold-burst").classList.toggle("visible", finished);
    renderJoker();
  }

  function particle(char, kind, x, y, delay = 0, vars = {}) {
    const item = document.createElement("span");
    item.className = `particle p-${kind}`;
    item.textContent = char;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.animationDelay = `${delay}ms`;
    for (const [name, value] of Object.entries(vars)) item.style.setProperty(`--${name}`, value);
    $("effects").append(item);
    setTimeout(() => item.remove(), 3200 + delay);
    return item;
  }

  const random = (min, max) => min + Math.random() * (max - min);
  const TRICK_CLASSES = ANIMALS.map(animal => `trick-${animal.trick}`);

  function playTrick() {
    const animal = selectedItem("animals");
    const body = $("traveler-body");
    body.classList.remove(...TRICK_CLASSES);
    void body.offsetWidth;
    body.classList.add(`trick-${animal.trick}`);
    const x = stepX(correct);
    const y = trackY(correct);
    // Effects use screen direction; flipped animals still face right.
    switch (animal.trick) {
      case "fly":
        for (let i = 0; i < 9; i++) particle(i % 3 ? "✨" : "🌟", "sparkle", x + random(-40, 40), y - random(30, 100), i * 110);
        break;
      case "jump":
        particle("💨", "dust", x - 24, y - 10);
        particle("💨", "dust", x - 8, y - 6, 120);
        particle("⭐", "sparkle", x, y - 100, 350);
        break;
      case "purr":
        for (let i = 0; i < 6; i++) particle(["💕", "💖", "💗"][i % 3], "sparkle", x + random(-35, 35), y - random(40, 90), i * 130);
        break;
      case "slide":
        for (let i = 0; i < 10; i++) particle("❄️", "fall", x + random(-70, 70), y - random(110, 150), i * 90, { dy: "120px", dx: `${random(-20, 20)}px`, rot: "180deg" });
        break;
      case "spin":
        for (let i = 0; i < 5; i++) particle(i % 2 ? "🎵" : "🎶", "sparkle", x + random(-45, 45), y - random(50, 100), i * 160);
        break;
      case "roll":
        for (let i = 0; i < 4; i++) particle("💨", "dust", x - 10 + i * 12, y - 6, i * 200);
        break;
      case "splash":
        for (let i = 0; i < 12; i++) particle("💧", "burst", x + 25, y - 20, 300 + i * 25, { dx: `${random(-70, 70)}px`, dy: `${random(-80, -10)}px` });
        break;
      case "rebirth":
        for (let i = 0; i < 14; i++) {
          const angle = (i / 14) * Math.PI * 2;
          particle("🔥", "burst", x, y - 45, 200, { dx: `${Math.cos(angle) * 75}px`, dy: `${Math.sin(angle) * 55}px` });
        }
        for (let i = 0; i < 6; i++) particle("✨", "sparkle", x + random(-50, 50), y - random(60, 120), 500 + i * 120);
        break;
      default:
        for (let i = 0; i < 6; i++) particle("🔥", "fire", x + 26, y - 38 + random(-6, 6), 150 + i * 90);
    }
  }

  function spawnTrail(fromStep, toStep) {
    const trail = selectedItem("trails");
    if (!trail.chars.length) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
      const t = fromStep + ((toStep - fromStep) * i) / count;
      particle(trail.chars[i % trail.chars.length], "trail", stepX(t) + random(-6, 6), trackY(t) - random(12, 30), i * 85);
    }
  }

  function celebrate() {
    const effect = selectedItem("celebrations").effect;
    const viewportWidth = $("viewport").clientWidth || 800;
    const left = Math.max(0, worldWidth - viewportWidth);
    const x = () => left + random(20, viewportWidth - 40);
    const colors = ["#f5aaa6", "#f9cb94", "#f9e6a0", "#b8dec1", "#b0d5e9", "#cbbde8", "#ef5b7f", "#ffd76a"];
    if (effect === "confetti") {
      for (let i = 0; i < 55; i++) {
        const piece = particle("", "fall", x(), -10, random(0, 900), { dy: `${WORLD_HEIGHT + 30}px`, dx: `${random(-40, 40)}px`, rot: `${random(360, 900)}deg` });
        piece.classList.add("confetti");
        piece.style.background = colors[i % colors.length];
      }
    } else if (effect === "balloons") {
      for (let i = 0; i < 12; i++) particle("🎈", "rise", x(), WORLD_HEIGHT + 30, i * 140, { dy: `${-WORLD_HEIGHT - 80}px`, dx: `${random(-30, 30)}px` });
    } else if (effect === "fireworks") {
      for (let burst = 0; burst < 5; burst++) {
        const bx = x();
        const by = random(40, 120);
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          particle(i % 2 ? "✨" : "🎇", "burst", bx, by, burst * 380, { dx: `${Math.cos(angle) * 60}px`, dy: `${Math.sin(angle) * 60}px` });
        }
      }
    } else if (effect === "emoji") {
      const { mode, chars } = selectedItem("celebrations");
      for (let i = 0; i < 30; i++) {
        const char = chars[i % chars.length];
        if (mode === "rise") particle(char, "rise", x(), WORLD_HEIGHT + 30, i * 90, { dy: `${-WORLD_HEIGHT - 80}px`, dx: `${random(-30, 30)}px` });
        else if (mode === "burst") {
          const angle = (i / 30) * Math.PI * 2;
          particle(char, "burst", left + viewportWidth / 2, 110, (i % 3) * 300, { dx: `${Math.cos(angle) * random(50, 110)}px`, dy: `${Math.sin(angle) * random(40, 90)}px` });
        } else particle(char, "fall", x(), -20, random(0, 1200), { dy: `${WORLD_HEIGHT + 40}px`, dx: `${random(-40, 40)}px`, rot: `${random(120, 420)}deg` });
      }
    } else if (effect === "goldrain") {
      for (let i = 0; i < 35; i++) particle(i % 5 ? "🪙" : "💰", "fall", x(), -20, random(0, 1200), { dy: `${WORLD_HEIGHT + 40}px`, dx: "0px", rot: `${random(180, 540)}deg` });
    }
  }

  $("traveler-body").addEventListener("animationend", event => {
    if (event.animationName !== "idle-bob") event.target.classList.remove(...TRICK_CLASSES);
  });
  $("traveler").addEventListener("click", playTrick);

  function renderJoker() {
    $("joker-button").textContent = `💡 Tipp-Joker (${save.jokers})`;
    $("joker-button").hidden = answered || isVerb();
    $("joker-button").disabled = jokerUsed || save.jokers === 0;
    $("joker-button").title = save.jokers === 0 ? "Joker gibt’s im Zauberladen" : "Zeigt den ersten Buchstaben";
  }

  $("joker-button").addEventListener("click", () => {
    if (answered || jokerUsed || save.jokers === 0) return;
    save.jokers--;
    jokerUsed = true;
    persist();
    $("hint").textContent = hintPattern(currentWord.english[0]);
    $("hint").hidden = false;
    renderJoker();
    $("answer").focus();
  });

  const synth = typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined" ? window.speechSynthesis : null;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const FATAL_MIC_ERRORS = {
    "not-allowed": "Das Mikrofon ist nicht erlaubt – Nachsprechen wird übersprungen. Erlaube den Mikrofonzugriff in der Adressleiste, um es zu nutzen.",
    "service-not-allowed": "Das Mikrofon ist nicht erlaubt – Nachsprechen wird übersprungen.",
    "audio-capture": "Kein Mikrofon gefunden – Nachsprechen wird übersprungen.",
    "network": "Die Spracherkennung braucht Internet – Nachsprechen wird übersprungen.",
    "start-failed": "Die Spracherkennung konnte nicht starten – Nachsprechen wird übersprungen."
  };
  let recognition = null;
  let speechToken = 0;
  let speakTries = 0;
  let repeatWord = null;

  const germanForSpeech = text => text.replace(/\/-?in\b/g, "").replace(/…/g, " ");

  function pickVoice(lang) {
    const voices = synth.getVoices();
    const prefix = lang.slice(0, 2).toLowerCase();
    return voices.find(voice => voice.lang.replace("_", "-").toLowerCase() === lang.toLowerCase())
      || voices.find(voice => voice.lang.toLowerCase().startsWith(prefix));
  }

  // Resolves when speaking ends, fails, or takes unreasonably long, so the game never gets stuck.
  function speak(text, lang) {
    return new Promise(resolve => {
      if (!synth || !save.settings.voice) {
        resolve();
        return;
      }
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      const voice = pickVoice(lang);
      if (voice) utterance.voice = voice;
      let done = false;
      const timer = setTimeout(() => finish(), 2500 + text.length * 150);
      function finish() {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve();
      }
      utterance.onend = finish;
      utterance.onerror = finish;
      synth.speak(utterance);
    });
  }

  function listen() {
    return new Promise((resolve, reject) => {
      const rec = new Recognition();
      recognition = rec;
      rec.lang = "en-GB";
      rec.maxAlternatives = 5;
      rec.interimResults = false;
      rec.continuous = false;
      let transcripts = null;
      let error = null;
      rec.onresult = event => {
        const result = event.results[0];
        transcripts = Array.from({ length: result.length }, (_, i) => result[i].transcript);
      };
      rec.onerror = event => { error = event.error; };
      rec.onend = () => {
        if (recognition === rec) recognition = null;
        if (transcripts && transcripts.length) resolve(transcripts);
        else reject(error || "no-speech");
      };
      try {
        rec.start();
      } catch (startError) {
        console.warn("Rainbow Quest: Spracherkennung konnte nicht starten.", startError);
        recognition = null;
        reject("start-failed");
      }
    });
  }

  function stopSpeech() {
    speechToken++;
    synth?.cancel();
    if (recognition) {
      const rec = recognition;
      recognition = null;
      rec.abort();
    }
    $("mic-button").classList.remove("listening");
    $("mic-button").disabled = false;
  }

  function setSpeakStatus(message, kind = "") {
    $("speak-status").textContent = message;
    $("speak-status").className = `speak-status ${kind}`;
  }

  function showNext() {
    $("next-word").hidden = false;
    $("next-word").textContent = correct === ROUND_LENGTH ? "Neue Schatzsuche →" : "Nächstes Wort →";
    $("next-word").focus();
  }

  function finishRepeat(message, kind = "") {
    stopSpeech();
    repeatWord = null;
    setSpeakStatus(message, kind);
    $("speak-actions").hidden = true;
    showNext();
  }

  function startRepeat(word) {
    if (!save.settings.voice) {
      showNext();
      return;
    }
    repeatWord = word;
    speakTries = 0;
    $("speak-word").textContent = word.english[0];
    $("speak-panel").hidden = false;
    $("speak-actions").hidden = false;
    $("skip-speak").hidden = true;
    $("mic-button").hidden = !Recognition;
    ($("mic-button").hidden ? $("listen-again") : $("mic-button")).focus();
    playAndListen();
  }

  async function playAndListen() {
    stopSpeech();
    const token = speechToken;
    setSpeakStatus("🔊 Hör gut zu …");
    await speak(repeatWord.english[0], "en-GB");
    if (token !== speechToken) return;
    if (!Recognition) {
      finishRepeat("Dein Browser kann leider nicht zuhören – Nachsprechen wird übersprungen. Tipp: In Chrome oder Edge klappt es.");
      return;
    }
    listenOnce(token);
  }

  async function listenOnce(token) {
    $("mic-button").classList.add("listening");
    $("mic-button").disabled = true;
    setSpeakStatus("🎤 Ich höre zu – sprich jetzt!");
    let transcripts;
    try {
      transcripts = await listen();
    } catch (error) {
      if (token !== speechToken) return;
      $("mic-button").classList.remove("listening");
      $("mic-button").disabled = false;
      if (FATAL_MIC_ERRORS[error]) finishRepeat(FATAL_MIC_ERRORS[error]);
      else registerMiss("Ich habe nichts gehört.");
      return;
    }
    if (token !== speechToken) return;
    $("mic-button").classList.remove("listening");
    $("mic-button").disabled = false;
    if (isSpokenMatch(transcripts, repeatWord.english)) finishRepeat(`Super ausgesprochen! „${repeatWord.english[0]}“ 🎉`, "success");
    else registerMiss(`Ich habe „${transcripts[0]}“ verstanden.`);
  }

  function registerMiss(prefix) {
    speakTries++;
    const canSkip = speakTries >= MAX_SPEAK_TRIES;
    $("skip-speak").hidden = !canSkip;
    setSpeakStatus(`${prefix} Versuch es noch einmal!${canSkip ? " Oder überspringe das Nachsprechen." : ""}`, "error");
    $("mic-button").focus();
  }

  $("mic-button").addEventListener("click", () => {
    if (!repeatWord) return;
    stopSpeech();
    listenOnce(speechToken);
  });
  $("listen-again").addEventListener("click", () => {
    if (repeatWord) playAndListen();
  });
  $("skip-speak").addEventListener("click", () => {
    if (repeatWord) finishRepeat("Nachsprechen übersprungen. Beim nächsten Mal klappt’s!");
  });
  $("speak-german").addEventListener("click", () => {
    if (!repeatWord) speak(germanForSpeech(currentWord.german), "de-DE");
  });

  function renderVoiceToggle() {
    const on = save.settings.voice;
    $("voice-toggle").textContent = on ? "🔊" : "🔇";
    $("voice-toggle").setAttribute("aria-pressed", String(on));
    $("voice-toggle").title = on ? "Vorlesen & Nachsprechen ausschalten" : "Vorlesen & Nachsprechen einschalten";
    $("speak-german").hidden = !on || !synth;
  }

  $("voice-toggle").addEventListener("click", () => {
    save.settings.voice = !save.settings.voice;
    persist();
    renderVoiceToggle();
    if (save.settings.voice) {
      if (!answered) speak(germanForSpeech(currentWord.german), "de-DE");
      return;
    }
    stopSpeech();
    if (repeatWord) {
      repeatWord = null;
      $("speak-panel").hidden = true;
      showNext();
    }
  });

  function pickVerb() {
    if (!verbQueue.length) {
      verbQueue = shuffle(VERBS);
      if (verbQueue.length > 1 && verbQueue[verbQueue.length - 1].id === currentWord?.id) {
        [verbQueue[0], verbQueue[verbQueue.length - 1]] = [verbQueue[verbQueue.length - 1], verbQueue[0]];
      }
    }
    return verbQueue.pop();
  }

  function nextWord() {
    stopSpeech();
    repeatWord = null;
    $("speak-panel").hidden = true;
    if (save.verbSteps.includes(correct) && VERBS.length) {
      currentWord = pickVerb();
    } else {
      if (!queue.length) {
        queue = buildQueue(allWords(), save.stats);
        if (queue.length > 1 && queue[queue.length - 1].id === currentWord?.id) {
          [queue[0], queue[queue.length - 1]] = [queue[queue.length - 1], queue[0]];
        }
      }
      currentWord = queue.pop();
    }
    answered = false;
    wrongCounted = false;
    const verb = isVerb();
    $("answer-form").hidden = verb;
    $("verb-form").hidden = !verb;
    $("quiz-eyebrow").textContent = verb ? "⭐ VERBEN-FELD" : "DEINE NÄCHSTE VOKABEL";
    $("quiz-title").textContent = verb ? "Nenne alle drei Formen!" : "Wie heißt das auf Englisch?";
    $("german-word").textContent = currentWord.german;
    $("word-category").textContent = verb ? "UNREGELMÄSSIGES VERB" : currentWord.id.startsWith("custom-") ? "DEIN EIGENES WORT" : "AUS DEINEM SCHULBUCH";
    $("answer").value = "";
    $("answer").disabled = false;
    $("check-answer").disabled = false;
    for (const id of VERB_INPUTS) {
      $(id).value = "";
      $(id).disabled = false;
      $(id).classList.remove("ok", "bad");
    }
    $("check-verb").disabled = false;
    $("show-answer").hidden = false;
    $("next-word").hidden = true;
    $("keyboard-hint").hidden = false;
    $("speak-german").disabled = false;
    jokerUsed = false;
    $("hint").hidden = true;
    renderJoker();
    feedback($("feedback"), "");
    speak(germanForSpeech(currentWord.german), "de-DE");
  }

  function finishQuestion() {
    answered = true;
    $("answer").disabled = true;
    $("check-answer").disabled = true;
    $("show-answer").hidden = true;
    $("keyboard-hint").hidden = true;
    $("speak-german").disabled = true;
    for (const id of VERB_INPUTS) $(id).disabled = true;
    $("check-verb").disabled = true;
    renderJoker();
    if (isVerb()) {
      showNext();
      if (save.settings.voice) speak(currentWord.shown.map(form => form.split(" / ")[0]).join(", "), "en-GB");
      return;
    }
    startRepeat(currentWord);
  }

  function registerWrong(message) {
    const lostStreak = save.streak > 0;
    save.streak = 0;
    if (!wrongCounted) recordAnswer(save.stats, currentWord.id, "wrong");
    wrongCounted = true;
    persist();
    renderPosition();
    feedback($("feedback"), `${message} Versuche es noch einmal — du verlierst keinen Schritt.${lostStreak ? " Deine Serie startet neu." : ""}`, "error");
  }

  function completeStep(answerText, bonus = 0) {
    const fromStep = correct;
    correct++;
    save.streak++;
    recordAnswer(save.stats, currentWord.id, "correct");
    save.stats.bestStreak = Math.max(save.stats.bestStreak, save.streak);
    const streakBonus = save.streak % STREAK_SIZE === 0 ? STREAK_BONUS : 0;
    const gain = WORD_REWARD + bonus + streakBonus;
    save.coins += gain;
    const streakText = streakBonus ? ` 🔥 ${save.streak}er-Serie! +${streakBonus} Bonus-Gold.` : "";
    const bonusText = bonus ? ` ⭐ Verben-Bonus: +${bonus}.` : "";
    if (correct === ROUND_LENGTH) {
      save.coins += REWARD;
      save.progress = 0;
      save.stats.rounds++;
      feedback($("feedback"), `Schatz gefunden! +${REWARD + gain} Gold für dich.${bonusText}${streakText} Schau im Zauberladen vorbei oder starte eine neue Schatzsuche!`, "success");
      setTimeout(celebrate, 800);
    } else {
      save.progress = correct;
      const left = ROUND_LENGTH - correct;
      feedback($("feedback"), `Richtig! ${answerText} — +${WORD_REWARD + bonus} 🪙.${bonusText}${streakText} Noch ${left} ${left === 1 ? "Wort" : "Wörter"} bis zum Schatz.`, "success");
    }
    persist();
    spawnTrail(fromStep, correct);
    renderPosition();
    setTimeout(playTrick, 550);
    finishQuestion();
  }

  $("answer-form").addEventListener("submit", event => {
    event.preventDefault();
    if (answered || isVerb() || !normalizeAnswer($("answer").value)) return;
    if (!isCorrectAnswer($("answer").value, currentWord.english)) {
      registerWrong("Noch nicht ganz!");
      $("answer").select();
      return;
    }
    completeStep(currentWord.english[0]);
  });

  $("verb-form").addEventListener("submit", event => {
    event.preventDefault();
    if (answered || !isVerb()) return;
    const inputs = VERB_INPUTS.map(id => $(id).value);
    const empty = inputs.findIndex(value => !normalizeAnswer(value));
    if (empty >= 0) {
      feedback($("feedback"), "Bitte fülle alle drei Felder aus.", "error");
      $(VERB_INPUTS[empty]).focus();
      return;
    }
    const results = checkVerbForms(currentWord, inputs);
    VERB_INPUTS.forEach((id, index) => {
      $(id).classList.toggle("ok", results[index]);
      $(id).classList.toggle("bad", !results[index]);
    });
    if (!results.every(Boolean)) {
      registerWrong("Noch nicht ganz – prüfe die rot markierten Felder!");
      $(VERB_INPUTS[results.indexOf(false)]).select();
      return;
    }
    completeStep(currentWord.shown.join(" – "), VERB_BONUS);
  });

  $("show-answer").addEventListener("click", () => {
    if (answered) return;
    save.streak = 0;
    recordAnswer(save.stats, currentWord.id, "revealed");
    persist();
    renderPosition();
    const solution = isVerb() ? currentWord.shown.join(" – ") : currentWord.english.join(" / ");
    feedback($("feedback"), `Die Lösung ist: ${solution}. Dieses Wort kommt später wieder. Hierfür gibt es keinen Schritt, und deine Serie startet neu.`);
    // Return the revealed word to the queue, with other words before it.
    (isVerb() ? verbQueue : queue).unshift(currentWord);
    finishQuestion();
  });

  $("next-word").addEventListener("click", () => {
    if (correct === ROUND_LENGTH) {
      correct = 0;
      save.verbSteps = pickVerbSteps(verbFieldCount());
      persist();
      renderWorld();
      renderPosition();
    }
    nextWord();
    $(isVerb() ? "verb-inf" : "answer").focus();
  });

  function shopPreview(category, item) {
    const box = document.createElement("span");
    box.className = "shop-preview";
    box.setAttribute("aria-hidden", "true");
    if (category === "paths") {
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 120 70");
      drawStrokes(svg, item, "M 6 62 Q 60 -12 114 62", .45);
      box.append(svg);
    } else if (category === "backgrounds") {
      box.classList.add(item.className);
      box.textContent = `${item.sky[0]}${item.ground[0] ?? ""}`;
    } else if (category === "chests") {
      box.classList.add("preview-chest");
      box.innerHTML = chestSvg(item.colors);
    } else if (category === "trails") {
      box.classList.add("preview-trail");
      box.textContent = item.chars.length ? item.chars.slice(0, 3).join("") : "✖";
    } else if (category === "hats") {
      box.classList.add("preview-animal");
      box.textContent = item.emoji || "✖";
    } else {
      box.classList.add("preview-animal");
      box.textContent = item.emoji ?? item.icon;
    }
    return box;
  }

  function renderJokerShop() {
    const card = document.createElement("div");
    card.className = "shop-card";
    const preview = document.createElement("span");
    preview.className = "shop-preview preview-animal";
    preview.setAttribute("aria-hidden", "true");
    preview.textContent = "💡";
    const description = document.createElement("div");
    description.className = "shop-description";
    const name = document.createElement("h3");
    name.textContent = "Tipp-Joker";
    const detail = document.createElement("p");
    detail.textContent = `Zeigt den ersten Buchstaben und die Länge des Wortes. Deine Serie bleibt erhalten. Du hast ${save.jokers}.`;
    description.append(name, detail);
    const button = document.createElement("button");
    button.className = "button button-light";
    button.textContent = `${JOKER_PRICE} 🪙 Kaufen`;
    button.disabled = save.coins < JOKER_PRICE;
    button.setAttribute("aria-label", `Tipp-Joker: ${button.textContent}`);
    button.addEventListener("click", () => {
      if (!buyJoker(save)) {
        feedback($("shop-feedback"), "Dafür brauchst du noch mehr Gold.", "error");
        return;
      }
      persist();
      renderPosition();
      renderShop();
      feedback($("shop-feedback"), `Joker gekauft! Du hast jetzt ${save.jokers}.`, "success");
    });
    card.append(preview, description, button);
    $("shop-list").append(card);
  }

  function renderShop() {
    $("shop-coins").textContent = save.coins;
    document.querySelectorAll("[data-category]").forEach(tab => tab.setAttribute("aria-selected", String(tab.dataset.category === shopCategory)));
    $("shop-list").replaceChildren();
    if (shopCategory === "jokers") {
      renderJokerShop();
      return;
    }
    for (const item of SHOP[shopCategory]) {
      const owned = save.owned[shopCategory].includes(item.id);
      const selected = save.selected[shopCategory] === item.id;
      const card = document.createElement("div");
      card.className = `shop-card${selected ? " selected" : ""}`;
      const description = document.createElement("div");
      description.className = "shop-description";
      const name = document.createElement("h3");
      name.textContent = item.name;
      const detail = document.createElement("p");
      const trick = item.trickName ? ` · Trick: ${item.trickName}` : "";
      detail.textContent = !owned && save.coins < item.price
        ? `${item.description}${trick} · Noch ${item.price - save.coins} Gold`
        : `${item.description}${trick}`;
      description.append(name, detail);
      const button = document.createElement("button");
      button.className = "button button-light";
      button.textContent = selected ? "Ausgewählt ✓" : owned ? "Auswählen" : `${item.price} 🪙 Kaufen`;
      button.disabled = selected || (!owned && save.coins < item.price);
      button.setAttribute("aria-label", `${item.name}: ${button.textContent}`);
      button.addEventListener("click", () => {
        if (!buyItem(save, shopCategory, item.id)) {
          feedback($("shop-feedback"), "Dafür brauchst du noch mehr Gold.", "error");
          return;
        }
        persist();
        renderWorld();
        renderPosition();
        renderShop();
        feedback($("shop-feedback"), `${item.name} ist jetzt ausgewählt — auch für zukünftige Runden!`, "success");
      });
      card.append(shopPreview(shopCategory, item), description, button);
      $("shop-list").append(card);
    }
  }

  document.querySelectorAll("[data-category]").forEach(tab => {
    tab.addEventListener("click", () => {
      shopCategory = tab.dataset.category;
      feedback($("shop-feedback"), "");
      renderShop();
    });
  });

  function renderWords() {
    $("word-count").textContent = `${allWords().length} Wörter`;
    $("word-list").replaceChildren();
    for (const word of [...save.customWords, ...activeBookWords()]) {
      const row = document.createElement("div");
      row.className = "word-entry";
      const german = document.createElement("span");
      german.textContent = word.german;
      const english = document.createElement("span");
      english.textContent = word.english.join(" / ");
      row.append(german, english);
      $("word-list").append(row);
    }
  }

  $("add-word-form").addEventListener("submit", event => {
    event.preventDefault();
    const german = $("new-german").value.trim();
    const english = [...new Set($("new-english").value.split(";").map(value => value.trim()).filter(value => normalizeAnswer(value)))];
    if (!german || !english.length) {
      feedback($("word-feedback"), "Bitte gib ein deutsches Wort und mindestens eine englische Übersetzung ein.", "error");
      return;
    }
    if (allWords().some(word => normalizeAnswer(word.german) === normalizeAnswer(german))) {
      feedback($("word-feedback"), "Dieses deutsche Wort ist schon in deiner Sammlung.", "error");
      return;
    }
    const word = { id: `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`, german, english };
    save.customWords.push(word);
    // Put new vocabulary next in line without replacing the current question.
    queue.push(word);
    persist();
    renderWords();
    $("add-word-form").reset();
    feedback($("word-feedback"), `„${german}“ ist dabei und kommt als nächstes neues Wort dran!`, "success");
    $("new-german").focus();
  });

  const STATUS_LABELS = { new: "🆕 Neu", learning: "🔁 Übe noch", mastered: "✅ Sicher" };
  let statsFilter = "all";

  function statsRow(word) {
    const entry = save.stats.words[word.id];
    const status = wordStatus(entry);
    const row = document.createElement("div");
    row.className = "stats-row";
    row.dataset.status = status;
    const names = document.createElement("div");
    names.className = "stats-names";
    const german = document.createElement("strong");
    german.textContent = word.german;
    const english = document.createElement("span");
    english.textContent = word.english.join(" / ");
    names.append(german, english);
    const badge = document.createElement("span");
    badge.className = `status-badge status-${status}`;
    badge.textContent = STATUS_LABELS[status];
    const numbers = document.createElement("span");
    numbers.className = "stats-numbers";
    if (entry && status !== "new") {
      const total = entry.correct + mistakes(entry);
      numbers.textContent = `✔ ${entry.correct} · ✖ ${mistakes(entry)} · ${Math.round((entry.correct / total) * 100)} %`;
    } else {
      numbers.textContent = "noch nicht geübt";
    }
    row.append(names, badge, numbers);
    return row;
  }

  function renderStats() {
    const words = allWords();
    const counts = { new: 0, learning: 0, mastered: 0 };
    for (const word of words) counts[wordStatus(save.stats.words[word.id])]++;
    const practiced = counts.learning + counts.mastered;
    const tiles = [
      ["📚", `${practiced} / ${words.length}`, "Wörter geübt"],
      ["✅", counts.mastered, "Sicher"],
      ["🔁", counts.learning, "Übe noch"],
      ["🆕", counts.new, "Neu"],
      ["🧰", save.stats.rounds, "Schatzsuchen"],
      ["🔥", save.stats.bestStreak, "Beste Serie"],
      ["🎯", save.stats.totalCorrect, "Richtige Antworten"]
    ];
    $("stats-tiles").replaceChildren(...tiles.map(([icon, value, label]) => {
      const tile = document.createElement("div");
      tile.className = "stats-tile";
      const iconEl = document.createElement("span");
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.textContent = icon;
      const valueEl = document.createElement("strong");
      valueEl.textContent = value;
      const labelEl = document.createElement("small");
      labelEl.textContent = label;
      tile.append(iconEl, valueEl, labelEl);
      return tile;
    }));
    const share = words.length ? counts.mastered / words.length : 0;
    $("mastery-progress").value = share;
    $("mastery-text").textContent = `${Math.round(share * 100)} %`;

    const hard = words.filter(word => isHard(save.stats.words[word.id]))
      .sort((a, b) => mistakes(save.stats.words[b.id]) - mistakes(save.stats.words[a.id]))
      .slice(0, 10);
    if (hard.length) {
      $("hard-list").replaceChildren(...hard.map(word => statsRow(word)));
    } else {
      const empty = document.createElement("p");
      empty.className = "stats-empty";
      empty.textContent = "Keine schwierigen Wörter – weiter so! 🌟";
      $("hard-list").replaceChildren(empty);
    }

    document.querySelectorAll("[data-filter]").forEach(tab => tab.setAttribute("aria-selected", String(tab.dataset.filter === statsFilter)));
    const filtered = words.filter(word => statsFilter === "all" || wordStatus(save.stats.words[word.id]) === statsFilter);
    if (filtered.length) {
      $("stats-list").replaceChildren(...filtered.map(word => statsRow(word)));
    } else {
      const empty = document.createElement("p");
      empty.className = "stats-empty";
      empty.textContent = "Hier ist gerade kein Wort.";
      $("stats-list").replaceChildren(empty);
    }
  }

  document.querySelectorAll("[data-filter]").forEach(tab => {
    tab.addEventListener("click", () => {
      statsFilter = tab.dataset.filter;
      renderStats();
    });
  });

  $("open-stats").addEventListener("click", () => {
    renderStats();
    $("stats-dialog").showModal();
  });

  function importSave(text) {
    const imported = parseSaveText(text);
    if (!imported) {
      feedback($("transfer-feedback"), "Das ist kein gültiger Spielstand. Prüfe, ob der Code vollständig kopiert wurde.", "error");
      return;
    }
    const summary = `${imported.coins} Gold, ${imported.stats.rounds} Schatzsuchen, ${imported.customWords.length} eigene Wörter`;
    if (!window.confirm(`Spielstand laden (${summary})?\n\nDein aktueller Spielstand auf diesem Gerät wird dabei ersetzt.`)) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
    } catch (error) {
      console.warn("Rainbow Quest: Import konnte nicht gespeichert werden.", error);
      feedback($("transfer-feedback"), "Speichern ist in diesem Browser gerade nicht möglich.", "error");
      return;
    }
    location.reload();
  }

  $("open-transfer").addEventListener("click", () => {
    $("export-code").value = encodeSave(save);
    $("import-code").value = "";
    feedback($("transfer-feedback"), "");
    $("transfer-dialog").showModal();
  });

  $("export-file").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(save, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `rainbow-quest-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    feedback($("transfer-feedback"), "Datei gespeichert! Öffne sie auf dem anderen Gerät mit „Datei laden“.", "success");
  });

  $("copy-code").addEventListener("click", async () => {
    const field = $("export-code");
    try {
      await navigator.clipboard.writeText(field.value);
    } catch {
      field.select();
      if (!document.execCommand("copy")) {
        feedback($("transfer-feedback"), "Kopieren klappt hier nicht automatisch. Markiere den Code und kopiere ihn selbst.", "error");
        return;
      }
    }
    feedback($("transfer-feedback"), "Code kopiert! Füge ihn auf dem anderen Gerät unter „Code einfügen“ ein.", "success");
  });

  $("import-file").addEventListener("change", async () => {
    const file = $("import-file").files[0];
    $("import-file").value = "";
    if (!file) return;
    if (file.size > MAX_IMPORT_LENGTH) {
      feedback($("transfer-feedback"), "Diese Datei ist zu groß für einen Spielstand.", "error");
      return;
    }
    importSave(await file.text());
  });

  $("import-code-button").addEventListener("click", () => importSave($("import-code").value));

  $("open-shop").addEventListener("click", () => {
    renderShop();
    feedback($("shop-feedback"), "");
    $("shop-dialog").showModal();
  });
  function applyGroupSelection(ids) {
    if (!ids.length) {
      feedback($("groups-feedback"), "Mindestens ein Kapitel muss ausgewählt bleiben.", "error");
      return;
    }
    save.activeGroups = VOCAB_GROUPS.filter(group => ids.includes(group.id)).map(group => group.id);
    persist();
    feedback($("groups-feedback"), "");
    queue = [];
    if (!answered && currentWord && !currentWord.id.startsWith("custom-") && !allWords().some(word => word.id === currentWord.id)) nextWord();
    renderGroups();
    renderWords();
  }

  const expandedGroups = new Set();

  function renderGroups() {
    const wordTotal = activeBookWords().length;
    $("groups-count").textContent = `${save.activeGroups.length} von ${VOCAB_GROUPS.length} Kapiteln · ${wordTotal} Buchwörter`;
    const units = new Map();
    for (const group of VOCAB_GROUPS) {
      if (!units.has(group.unit)) units.set(group.unit, []);
      units.get(group.unit).push(group);
    }
    const sections = [];
    for (const [unit, groups] of units) {
      const section = document.createElement("section");
      section.className = "group-unit";
      const activeInUnit = groups.filter(group => save.activeGroups.includes(group.id));
      const all = document.createElement("label");
      all.className = "group-unit-title";
      const allBox = document.createElement("input");
      allBox.type = "checkbox";
      allBox.checked = activeInUnit.length === groups.length;
      allBox.indeterminate = activeInUnit.length > 0 && activeInUnit.length < groups.length;
      allBox.dataset.unit = unit;
      allBox.addEventListener("change", () => {
        const unitIds = groups.map(group => group.id);
        const rest = save.activeGroups.filter(id => !unitIds.includes(id));
        applyGroupSelection(allBox.checked ? [...rest, ...unitIds] : rest);
      });
      const name = document.createElement("span");
      name.textContent = unit;
      const total = document.createElement("small");
      total.textContent = `${groups.reduce((sum, group) => sum + group.words.length, 0)} Wörter`;
      all.append(allBox, name, total);
      section.append(all);
      for (const group of groups) {
        const row = document.createElement("label");
        row.className = "group-row";
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = save.activeGroups.includes(group.id);
        box.dataset.group = group.id;
        box.addEventListener("change", () => {
          applyGroupSelection(box.checked ? [...save.activeGroups, group.id] : save.activeGroups.filter(id => id !== group.id));
        });
        const title = document.createElement("span");
        title.textContent = group.title;
        const count = document.createElement("small");
        count.textContent = `${group.words.length} Wörter`;
        const open = expandedGroups.has(group.id);
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "group-toggle";
        toggle.dataset.toggle = group.id;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", `Wörter von ${group.title} ${open ? "ausblenden" : "anzeigen"}`);
        toggle.textContent = open ? "▾" : "▸";
        toggle.addEventListener("click", () => {
          if (!expandedGroups.delete(group.id)) expandedGroups.add(group.id);
          renderGroups();
        });
        row.append(box, title, count, toggle);
        section.append(row);
        if (open) {
          const list = document.createElement("div");
          list.className = "group-words";
          for (const word of group.words) {
            const entry = document.createElement("div");
            entry.className = "word-entry";
            const german = document.createElement("span");
            german.textContent = word.german;
            const english = document.createElement("span");
            english.textContent = word.english.join(" / ");
            entry.append(german, english);
            list.append(entry);
          }
          section.append(list);
        }
      }
      sections.push(section);
    }
    $("groups-list").replaceChildren(...sections);
  }

  $("open-groups").addEventListener("click", () => {
    feedback($("groups-feedback"), "");
    renderGroups();
    $("groups-dialog").showModal();
  });
  $("open-words").addEventListener("click", () => {
    renderWords();
    $("words-dialog").showModal();
  });
  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => $(button.dataset.close).close());
  });
  window.addEventListener("resize", () => {
    renderWorld();
    renderPosition();
  });

  $("round-length").textContent = ROUND_LENGTH;
  synth?.addEventListener?.("voiceschanged", () => synth.getVoices());
  renderVoiceToggle();
  renderWords();
  renderWorld();
  renderPosition();
  nextWord();
}

if (typeof document !== "undefined") startApp();
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BOOK_WORDS, VOCAB_GROUPS, DEFAULT_GROUPS, VERBS, VERB_FIELDS, VERB_BONUS, pickVerbSteps, checkVerbForms, ANIMALS, HATS, TRAILS, CELEBRATIONS, CHESTS, PATHS, BACKGROUNDS, SHOP, ROUND_LENGTH, REWARD, WORD_REWARD,
    STREAK_SIZE, STREAK_BONUS, JOKER_PRICE,
    normalizeAnswer, isCorrectAnswer, isSpokenMatch, MAX_SPEAK_TRIES, shuffle, initialSave, migrateSave, isValidSave, buyItem,
    buyJoker, hintPattern, totalShopPrice, trackY,
    recordAnswer, wordStatus, isHard, buildQueue, emptyStats, MASTERED_RUN, encodeSave, parseSaveText
  };
}
