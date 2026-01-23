import translations from '../i18n/translations.json'

export type Locale = 'en' | 'fr'
export type Translations = typeof translations

const DEFAULT_LOCALE: Locale = 'en'
const SUPPORTED_LOCALES: Locale[] = ['en', 'fr']

export function getLocale(localeParam: string | undefined): Locale {
  if (localeParam && SUPPORTED_LOCALES.includes(localeParam as Locale)) {
    return localeParam as Locale
  }
  return DEFAULT_LOCALE
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}
