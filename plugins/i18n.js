// plugins/i18n.client.js
import { createI18n } from 'vue-i18n';
import de from '~/i18n/locales/de.json';
import en from '~/i18n/locales/en.json';

export default defineNuxtPlugin(nuxtApp => {
  let locale = 'de';
  if (import.meta.client) {
    const saved = localStorage.getItem('locale');
    if (saved) {
      locale = saved;
    }
  }

  const messages = { de, en };

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale: 'en',
    messages,
  });

  nuxtApp.vueApp.use(i18n);

  return {
    provide: {
      i18n,
    },
  };
});
