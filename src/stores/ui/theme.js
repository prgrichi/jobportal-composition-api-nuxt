import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),

  actions: {
    init() {
      const saved = localStorage.getItem('darkMode');

      if (saved !== null) {
        this.isDark = saved === 'true';
      } else {
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      this.apply();
    },

    toggle() {
      this.isDark = !this.isDark;
      this.apply();
      localStorage.setItem('darkMode', String(this.isDark));
    },

    apply() {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
})