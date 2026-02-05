// Simple translation utility for copilot components
// In a production app, you might want a more sophisticated i18n solution

import translations from '@/i18n/translations.json'

type Locale = 'en' | 'fr'
type Namespace = 'contextStack' | 'charts' | 'toc'

export function useTranslations(namespace: Namespace, lang: Locale) {
  const ns = translations[lang][namespace] || translations['en'][namespace]

  return (key: string, fallback?: string) => {
    // Handle nested keys with dot notation (e.g., 'exploreExecute.exploreMode')
    const keys = key.split('.')
    let value: any = ns

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return value || fallback || key
  }
}

// Type-safe translation keys
export type ContextStackTranslations = keyof typeof translations.en.contextStack
