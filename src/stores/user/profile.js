import { defineStore } from 'pinia';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false
  }),

  actions: {
    async loadProfile(userId) {
      this.loading = true;

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.profile = docSnap.data();
        } else {
          console.error('❌ Profile not found for user:', userId);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userId, profileData) {
      try {
        // 1. Firestore update
        await setDoc(doc(db, 'users', userId), {
          ...profileData,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // 2. Lokalen State aktualisieren (kein Reload nötig!)
        this.profile = {
          ...this.profile,
          ...profileData
        };

        return { success: true };

      } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error };
      }
    },

    clearProfile() {
      this.profile = null;
    }
  }
});