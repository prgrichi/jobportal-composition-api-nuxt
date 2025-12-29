<!-- @click="saveToStore" in routerlink -->

<template>

  <article class="block w-full relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-300
         hover:shadow-sm hover:border-primary-500/30
         ">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="inline-flex items-center rounded-md bg-primary-50 pr-2 py-1 text-xs font-medium text-primary-700">
            {{ job.level }}
          </span>
          <span class="text-xs text-neutral-400">{{ timeToDate }}</span>
        </div>

        <RouterLink :to="`/jobs/${job.id}`" class="flex w-full">
          <h3 class="text-lg font-semibold text-neutral-900 transition-colors">
            {{ job.title }}
          </h3>
        </RouterLink>

        <div class="mt-2 flex items-center gap-2 text-sm">
          <span class="font-medium text-neutral-800">{{ job.company }}</span>
          <span class="h-1 w-1 rounded-full bg-neutral-300"></span>
          <span class="text-neutral-600">{{ job.location }}</span>
        </div>
      </div>
    </div>

    <p class="text-sm my-5">{{ job.description }}</p>

    <!-- Tags -->
    <div v-if="job.tags?.length" class="mt-4 flex flex-wrap gap-2">
      <span v-for="tag in job.tags.slice(0, 6)" :key="tag"
        class="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors">
        {{ tag }}
      </span>
    </div>

    <div class="inline-flex group/star items-center gap-2 mt-4">
      <button @click="addToFavorites" class="inline-flex items-center gap-2 cursor-pointer">
        <Icon name="Star" :type="starType"
          icon-class="transition-all duration-150 group-hover/star:text-primary-500 h-4 w-4 text-neutral-700" />
        <span
          class="text-sm text-neutral-700 transition-all duration-150 group-hover/star:text-primary-500">Merken</span>
      </button>
    </div>

    <!-- <div v-if="job.salaryRange" class="text-left mt-4 border-t pt-4 border-neutral-200">
        <p class="text-sm font-semibold text-neutral-900">{{ job.salaryRange }}</p>
      </div> -->

  </article>

</template>

<script>
export default {
  name: 'JobSingle',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  },
  computed: {
    timeToDate() {
      const date = this.job?.createdAt?.toDate() || null;
      if (!date) return '';

      return date.toLocaleString('de-DE',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
        });
    },
    starType() {
      return this.isFavorite ? 'solid' : 'outline';
    }
  },
  methods: {
    addToFavorites() {
      this.isFavorite = !this.isFavorite;
      console.log(`Job ${this.job.id} added to favorites.`);
    }
  }
}
</script>

<style scoped></style>