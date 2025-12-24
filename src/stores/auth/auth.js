import { defineStore } from 'pinia';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authReady: false,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
  },

  actions: {
    init() {
      if (this.authReady) return;

      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.authReady = true;
      });
    }
  },
});