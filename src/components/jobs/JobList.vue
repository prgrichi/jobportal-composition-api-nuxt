<template>

  <section class="space-y-4">

    <div class="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">

      <template v-if="jobStore.isLoading">
        <JobSkeleton v-for="n in 6" :key="`sk-${n}`" />
      </template>

      <template v-if="jobStore.error">
        <div class="col-span-full text-center text-red-500">
          {{ jobStore.error }}
        </div>
      </template>

      <template v-else>
        <JobSingle v-for="job in jobStore.filteredJobs" :key="job.id" :job="job" />
      </template>

      <!-- Keine Jobs gefunden -->
      <div v-if="jobStore.filteredJobs.length === 0" class="col-span-full no-results">
        😕 Keine Jobs gefunden
      </div>

      <div>
        <p v-if="jobStore.activeFiltersCount > 0" class="filter-info">
          {{ jobStore.filteredJobs.length }} von {{ jobStore.jobs.length }} Jobs
          <button @click="jobStore.resetFilters()" class="reset-btn">
            Filter zurücksetzen
          </button>
        </p>
      </div>

    </div>

  </section>

</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';

import JobSingle from './JobSingle.vue';
import JobSkeleton from './JobSkeleton.vue';

export default {
  name: 'JobList',
  components: {
    JobSingle,
    JobSkeleton
  },
  computed: {
    jobStore() {
      return useJobStore();
    }
  }
}
</script>

<style scoped></style>