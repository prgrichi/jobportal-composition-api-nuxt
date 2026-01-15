import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// import { auth, db } from '@/config/firebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authReady: false,
    previousRoute: null,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
    userName: state => {
      if (!state.user) return 'Gast';
      return state.user.email?.split('@')[0] || 'Gast';
    },
  },

  actions: {
    setPreviousRoute(route) {
      this.previousRoute = route;
    },
    init() {
      if (this.authReady) return Promise.resolve();

      const nuxtApp = useNuxtApp();
      const auth = nuxtApp.$firebaseAuth;

      if (!auth) {
        console.error('Firebase Auth ist nicht initialisiert (kein $firebaseAuth).');
        this.authReady = true;
        return Promise.resolve(null);
      }

      return new Promise(resolve => {
        onAuthStateChanged(auth, async user => {
          this.user = user;
          if (user) {
            console.log('🔐 User eingeloggt:', user.uid);
            await this.createUserDocument(user);
          }
          this.authReady = true;
          resolve(user);
        });
      });
    },

    async createUserDocument(user) {
      const nuxtApp = useNuxtApp();
      const db = nuxtApp.$firebaseDb;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!db) {
        console.error('Firestore ist nicht initialisiert (kein $firebaseDb).');
        return;
      }

      if (!userSnap.exists()) {
        console.log(user);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          firstName: '',
          lastName: '',
          jobTitle: '',
          location: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        console.log('✅ User-Dokument erstellt für:', user.uid);
      } else {
        console.log('ℹ️ User-Dokument existiert bereits');
      }
    },
  },
});
