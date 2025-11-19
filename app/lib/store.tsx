import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "./questions";

interface StudyState {
  language: Language;
  setLanguage: (lang: Language) => void;
  answers: Record<string, string>;
  setAnswer: (questionNum: string, answer: string) => void;
}

const StudyContext = createContext<StudyState | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");
  const [answers, setAnswersState] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("burger-lang") as Language;
    if (storedLang) setLanguageState(storedLang);

    const storedAnswers = localStorage.getItem("burger-answers");
    if (storedAnswers) {
      try {
        setAnswersState(JSON.parse(storedAnswers));
      } catch (e) {
        console.error("Failed to parse answers", e);
      }
    }
    setLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("burger-lang", lang);
  };

  const setAnswer = (questionNum: string, answer: string) => {
    setAnswersState((prev) => {
      const next = { ...prev, [questionNum]: answer };
      localStorage.setItem("burger-answers", JSON.stringify(next));
      return next;
    });
  };

  if (!loaded) return null;

  return (
    <StudyContext.Provider
      value={{ language, setLanguage, answers, setAnswer }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy must be used within a StudyProvider");
  return context;
}
