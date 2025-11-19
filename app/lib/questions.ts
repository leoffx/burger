import questionsData from "../data/questions.json";

export type Language = "de" | "en" | "tr" | "ru" | "fr" | "ar" | "uk" | "hi";

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

export type StateCode =
  | "BW"
  | "BY"
  | "BE"
  | "BB"
  | "HB"
  | "HH"
  | "HE"
  | "MV"
  | "NI"
  | "NW"
  | "RP"
  | "SL"
  | "SN"
  | "ST"
  | "SH"
  | "TH";

export const STATES: { code: StateCode; name: string; emblem: string }[] = [
  { code: "BW", name: "Baden-Württemberg", emblem: "🏰" },
  { code: "BY", name: "Bayern", emblem: "🦁" },
  { code: "BE", name: "Berlin", emblem: "🐻" },
  { code: "BB", name: "Brandenburg", emblem: "🦅" },
  { code: "HB", name: "Bremen", emblem: "🔑" },
  { code: "HH", name: "Hamburg", emblem: "⚓" },
  { code: "HE", name: "Hessen", emblem: "🦁" },
  { code: "MV", name: "Mecklenburg-Vorpommern", emblem: "🐂" },
  { code: "NI", name: "Niedersachsen", emblem: "🐎" },
  { code: "NW", name: "Nordrhein-Westfalen", emblem: "🌊" },
  { code: "RP", name: "Rheinland-Pfalz", emblem: "🍇" },
  { code: "SL", name: "Saarland", emblem: "⚒️" },
  { code: "SN", name: "Sachsen", emblem: "🏰" },
  { code: "ST", name: "Sachsen-Anhalt", emblem: "🐻" },
  { code: "SH", name: "Schleswig-Holstein", emblem: "⛵" },
  { code: "TH", name: "Thüringen", emblem: "🌲" },
];

export interface Question {
  num: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  solution: "a" | "b" | "c" | "d";
  image: string;
  category?: string;
  translation?: Record<
    string,
    {
      question: string;
      a: string;
      b: string;
      c: string;
      d: string;
      context?: string;
    }
  >;
}

export const questions = questionsData as Question[];

export const CATEGORY_EMOJIS: Record<string, string> = {
  "History & Geography": "🌍",
  "Democracy & Politics": "🗳️",
  "Rights & Freedoms": "⚖️",
  "Dates & Numbers": "📅",
  "Law & Governance": "📜",
};

export function getGeneralQuestions() {
  return questions.filter((q) => !isNaN(Number(q.num)));
}

export function getQuestionsForState(state: StateCode) {
  return questions.filter((q) => q.num.startsWith(state + "-"));
}

export function getGeneralCategories() {
  const generalQuestions = getGeneralQuestions();
  const categories = new Set<string>();
  generalQuestions.forEach((q) => {
    if (q.category) categories.add(q.category);
  });

  const list = Array.from(categories).sort();

  // Check for dates
  const hasDates = generalQuestions.some((q) => /\d{4}/.test(q.question));
  if (hasDates) {
    list.push("Dates & Numbers");
  }

  return list;
}

export function getQuestionsByCategory(category: string) {
  // Check if it's a state code
  const state = STATES.find((s) => s.code === category);
  if (state) {
    return getQuestionsForState(state.code);
  }

  const generalQuestions = getGeneralQuestions();

  if (category === "Dates & Numbers") {
    return generalQuestions.filter((q) => /\d{4}/.test(q.question));
  }

  return generalQuestions.filter((q) => q.category === category);
}
