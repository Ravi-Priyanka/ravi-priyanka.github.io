/*
  "What's your love story?" mini-game.
  Each answer adds a point to one of four personality types; the type with most points wins.
  Edit questions, options and compliments freely.
*/

export type TypeKey = "romantic" | "baraat" | "adventurer" | "home";
export type Status = "single" | "relationship" | "engaged" | "married";

export const STATUSES: { key: Status; label: string; emoji: string }[] = [
  { key: "single", label: "Single", emoji: "🌸" },
  { key: "relationship", label: "In a relationship", emoji: "💞" },
  { key: "engaged", label: "Engaged", emoji: "💍" },
  { key: "married", label: "Married", emoji: "🪔" },
];

export const QUESTIONS: { q: string; options: { label: string; emoji: string; type: TypeKey }[] }[] = [
  {
    q: "Your perfect date night looks like…",
    options: [
      { label: "Chai and long talks under the stars", emoji: "🫖", type: "romantic" },
      { label: "Dancing till midnight at a sangeet", emoji: "💃", type: "baraat" },
      { label: "A spontaneous road trip to Udaipur", emoji: "🚗", type: "adventurer" },
      { label: "Cooking dinner together at home", emoji: "🍲", type: "home" },
    ],
  },
  {
    q: "Your favourite wedding moment?",
    options: [
      { label: "The varmala — when eyes meet", emoji: "💐", type: "romantic" },
      { label: "The baraat — dhol, dance, dhamaal!", emoji: "🥁", type: "baraat" },
      { label: "The pheras — seven promises for life", emoji: "🔥", type: "home" },
      { label: "The grand palace entry", emoji: "🐘", type: "adventurer" },
    ],
  },
  {
    q: "How do you show love?",
    options: [
      { label: "Sweet words and little notes", emoji: "💌", type: "romantic" },
      { label: "Surprises and celebrations", emoji: "🎉", type: "baraat" },
      { label: "New experiences together", emoji: "🧭", type: "adventurer" },
      { label: "Care, comfort and good food", emoji: "🏡", type: "home" },
    ],
  },
  {
    q: "Which song plays in your heart?",
    options: [
      { label: "Kesariya Balam — timeless and pure", emoji: "🎶", type: "romantic" },
      { label: "A peppy Bollywood dance number", emoji: "🪩", type: "baraat" },
      { label: "Soulful Sufi under the desert sky", emoji: "🏜️", type: "adventurer" },
      { label: "A soft lullaby of togetherness", emoji: "🌙", type: "home" },
    ],
  },
];

export const TYPES: Record<TypeKey, { title: string; emoji: string; line: string }> = {
  romantic: { title: "The Hopeless Romantic", emoji: "💖", line: "You see poetry in small moments and make everyone around you feel cherished." },
  baraat: { title: "The Life of the Baraat", emoji: "🎉", line: "Your energy lights up every room — wherever you are, the celebration begins." },
  adventurer: { title: "The Royal Adventurer", emoji: "🐘", line: "Bold, curious and free-spirited — you turn ordinary days into stories worth telling." },
  home: { title: "The Heart of the Home", emoji: "🪔", line: "Warm, caring and steady — you make people feel safe, loved and truly at home." },
};

export const COMPLIMENTS: Record<Status, string> = {
  single: "Someone out there is going to be very lucky to find a heart like yours. Keep shining — your love story is on its way!",
  relationship: "Your partner is lucky to have you. Keep nurturing that spark — it's clearly something special.",
  engaged: "Your own wedding story is just beginning, and it's going to be beautiful. Congratulations from Ravi & Priyanka!",
  married: "Your love is the kind that inspires others. May every year together feel like your wedding day.",
};

/** A friendly, stable "love score" (88–99%) so the same name always gets the same number. */
export function loveScore(name: string) {
  let h = 0;
  for (const ch of name.trim().toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 88 + (h % 12);
}

/* ---- One entry per guest ---- */
const PLAYED_KEY = "rp-love-quiz";

export const normEmail = (e: string) => e.trim().toLowerCase();
export const normPhone = (p: string) => p.replace(/\D/g, "").slice(-10);

/** Remembers on this device which email/number already submitted. */
export function markQuizPlayed(email: string, phone: string) {
  try { localStorage.setItem(PLAYED_KEY, JSON.stringify({ email: normEmail(email), phone: normPhone(phone) })); } catch {}
  if (typeof window !== "undefined") window.dispatchEvent(new Event("quiz-played"));
}

export function hasPlayedQuiz(email?: string, phone?: string) {
  try {
    const v = JSON.parse(localStorage.getItem(PLAYED_KEY) || "null");
    if (!v) return false;
    if (email === undefined) return true;
    return v.email === normEmail(email) || v.phone === normPhone(phone ?? "");
  } catch { return false; }
}
