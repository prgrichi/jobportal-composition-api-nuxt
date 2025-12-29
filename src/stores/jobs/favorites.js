import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {

  state: () => ({
    favoriteJobs: [],
  }),

  getters: {
    isJobFavorited: (state) => (jobId) => {
      return state.favoriteJobs.some(job => job.id === jobId);
    },


    // für: du hast x gespeicherte jobs
    favoriteCount: (state) => state.favoriteJobs.length  // Bonus! 
  },

  actions: {
    toggleFavorite(job) {
      if (this.isJobFavorited(job.id)) {
        this.favoriteJobs = this.favoriteJobs.filter(j => j.id !== job.id);
      } else {
        this.favoriteJobs = [...this.favoriteJobs, job];
      }
      console.log(this.favoriteJobs);
    }


  }
})
