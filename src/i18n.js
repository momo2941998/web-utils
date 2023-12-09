import i18n from 'i18next';
import Backend, { BackendOptions } from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { constants } from './constants';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: constants.DEFAULT_LANG,
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `${constants.BASENAME}/locales/{{lng}}/{{ns}}.json`,
    }
  });
if (!['vi', 'en'].includes(i18n.language)) i18n.changeLanguage(constants.DEFAULT_LANG)
export default i18n;