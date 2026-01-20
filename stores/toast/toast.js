import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),

  actions: {
    show(message, type = 'success', timeout = 3000) {
      const id = Date.now();

      this.toasts.push({ id, message, type });

      setTimeout(() => {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
      }, timeout);
    },

    success(message) {
      this.show(message, 'success');
    },

    error(message) {
      this.show(message, 'error');
    },
  },
});
