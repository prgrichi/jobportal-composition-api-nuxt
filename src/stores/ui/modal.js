import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    authRequiredModalOpen: false
  }),

  actions: {
    showAuthRequired() {
      this.authRequiredModalOpen = true;
    },

    hideAuthRequired() {
      this.authRequiredModalOpen = false;
    }
  }
});