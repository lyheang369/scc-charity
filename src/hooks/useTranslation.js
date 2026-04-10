import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import content from '../data/content';

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  return content[language];
}
