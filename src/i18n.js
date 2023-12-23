import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpApi) // Load translations over the network
  .use(LanguageDetector) // Detect language
  .use(initReactI18next) // Initialize React binding
  .init({
    fallbackLng: 'ar',
    debug: true,
    detection: {
      order: ['localStorage', 'queryString', 'cookie', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
