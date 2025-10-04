import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { useAuth } from './AuthContext';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (user?.language) {
      setLanguage(user.language);
    }
  }, [user]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (user) {
      updateProfile({ language: lang });
    }
  };

  const t = translations[language] || translations.en;

  const value = {
    language,
    changeLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};