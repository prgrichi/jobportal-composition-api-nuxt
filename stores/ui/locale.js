// stores/ui/locale.js
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'de',
  }),
  actions: {
    init() {
      if (!import.meta.client) return;

      const stored = localStorage.getItem('locale');
      if (stored) {
        this.locale = stored;
      }
    },
    setLocale(newLocale) {
      this.locale = newLocale;

      if (import.meta.client) {
        localStorage.setItem('locale', newLocale);
      }
    },
  },
});
