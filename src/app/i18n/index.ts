import { createI18n } from 'vue-i18n';
import locales, { type LocaleKey } from './locales';

export const defaultLocale: LocaleKey = 'eng';

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: locales,
});

export default i18n;
