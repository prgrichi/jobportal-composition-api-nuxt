// plugins/i18n.js
import { createI18n } from 'vue-i18n';
import de from '~/i18n/locales/de.json';
import en from '~/i18n/locales/en.json';
import { useLocaleStore } from '~/stores/ui/locale';

export default defineNuxtPlugin(nuxtApp => {
  const localeStore = useLocaleStore();

  localeStore.init();

  const messages = { de, en };

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localeStore.locale,
    fallbackLocale: 'en',
    messages,
  });

  nuxtApp.vueApp.use(i18n);

  watch(
    () => localeStore.locale,
    newLocale => {
      i18n.global.locale.value = newLocale;
    }
  );

  return {
    provide: {
      i18n,
    },
  };
});
