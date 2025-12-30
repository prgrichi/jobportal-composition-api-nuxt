<template>
  <section class="py-6 md:py-12">
    <div class="max-w-app mx-auto px-4">

      <JobsFavorite />

    </div>
  </section>
</template>

<script>
import { useFavoritesStore } from '@/stores/jobs/favorites';
import JobsFavorite from '@/components/jobs/JobsFavorite.vue';

export default {
  name: 'FavoriteJobsPage',
  components: {
    JobsFavorite
  },

  computed: {
    // favoritesStore() {
    //   return useFavoritesStore();
    // },
    // favoritesFoundCount() {
    //   return this.favoritesStore.favoriteJobs.length;
    // },
  }
}
</script>

<style scoped></style>
