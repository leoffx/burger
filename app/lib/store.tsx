import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "./questions";

interface StudyState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const StudyContext = createContext<StudyState | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("burger-lang") as Language;
    if (storedLang) setLanguageState(storedLang);
    setLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("burger-lang", lang);
  };

  if (!loaded) return null;

  return (
    <StudyContext.Provider value={{ language, setLanguage }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy must be used within a StudyProvider");
  return context;
}
