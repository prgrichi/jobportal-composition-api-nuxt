<template>
  <section>
    <div class="max-w-app mx-auto px-4">
      <!-- Header -->
      <div class="mb-8" v-if="favoritesFoundCount !== 0">
        <h1 class="text-2xl font-bold text-neutral-900 mb-2">
          {{ $t('jobs.favorites.title') }}
        </h1>
        <p>{{ $t('jobs.favorites.count', favoritesFoundCount) }}</p>
      </div>

      <!-- Loading -->
      <div v-if="favoritesStore.loading" class="text-center py-12">
        {{ $t('jobs.favorites.favoritesLoading') }}
      </div>

      <!-- Empty State -->
      <div v-else-if="favoritesFoundCount === 0" class="text-center py-12">
        <Icon name="Star" type="outline" icon-class="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ $t('jobs.favorites.noFavoritesTitle') }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ $t('jobs.favorites.noFavoritesText') }}
        </p>
        <RouterLink :to="{ name: 'jobs' }" class="btn btn-primary">
          {{ $t('general.btn.jobSearch') }}
        </RouterLink>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <JobSingle v-for="job in favoriteJobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>

<script>
import { useFavoritesStore } from '@/stores/jobs/favorites';
import JobSingle from '@/components/jobs/JobSingle.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'FavoriteJobsPage',

  components: {
    JobSingle,
    Icon
  },

  computed: {
    favoritesStore() {
      return useFavoritesStore();
    },
    favoriteJobs() {
      return this.favoritesStore.favoriteJobs;
    },
    favoritesFoundCount() {
      return this.favoriteJobs.length;
    }
  }
}
</script>