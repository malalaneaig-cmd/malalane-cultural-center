import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const pageTitles = {
  en: 'Malalane Cultural Center',
  pt: 'Centro Cultural Malalane',
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggle = () => setLang((prev) => (prev === 'en' ? 'pt' : 'en'));

  useEffect(() => {
    document.title = pageTitles[lang];
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
