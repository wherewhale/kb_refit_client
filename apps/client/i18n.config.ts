export default defineI18nConfig(() => ({
  legacy: false,
  locales: [
    { code: 'ko', name: 'Korean', file: 'ko.json' },
    { code: 'en', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'ko',
  langDir: '/locales',
  strategy: 'no_prefix',
  lazy: true
}))