// stores/ui/locale.js
import { useCookie } from 'nuxt/app';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'de',
  }),
  actions: {
    init() {
      const cookieLang = useCookie('locale').value;
      if (cookieLang) {
        this.locale = cookieLang;
      }
    },
    setLocale(newLocale) {
      this.locale = newLocale;

      const cookieLang = useCookie('locale', { maxAge: 60 * 60 * 24 * 365 });
      cookieLang.value = newLocale;
    },
  },
});
