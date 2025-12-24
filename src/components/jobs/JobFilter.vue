<template>
  <div class="max-w-app mx-auto py-4 space-y-6">

    <!-- Filter -->
    <section class="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Filter
      </h3>

      <div class="flex flex-col sm:flex-row gap-3 filter-group items-center">
        <label class="sr-only" for="search">Suche</label>
        <input id="search" v-model="jobStore.searchText" type="text" placeholder="Job, Firma oder Stichwort..." class="filter-input w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-primary-500/40" />
      </div>

    </section>

  </div>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';

export default {
  name: 'JobFilter',
  computed: {
    jobStore() {
      return useJobStore();
    },
  },

}
</script>

<style scoped></style>