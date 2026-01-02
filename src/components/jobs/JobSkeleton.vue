<!-- components/jobs/JobSkeleton.vue -->
<template>
  <article class="rounded-xl bg-muted p-5 ring-1 ring-ring animate-pulse" aria-busy="true" aria-label="Job lädt">
    <!-- Title -->
    <div class="h-4 w-3/4 rounded bg-muted"></div>

    <!-- Company / Location -->
    <div class="mt-2 h-3 w-1/2 rounded bg-muted"></div>

    <!-- Tags -->
    <div class="mt-4 flex flex-wrap gap-2">
      <div class="h-6 w-16 rounded-full bg-muted"></div>
      <div class="h-6 w-20 rounded-full bg-muted"></div>
      <div class="h-6 w-14 rounded-full bg-muted"></div>
      <div class="h-6 w-24 rounded-full bg-muted"></div>
    </div>

    <!-- Footer: salary + link hint -->
    <div class="mt-4 flex items-center justify-between">
      <div class="h-3 w-28 rounded bg-muted"></div>
      <div class="h-3 w-16 rounded bg-muted"></div>
    </div>
  </article>
</template>

<script>
export default {
  name: "JobSkeleton",
};
</script>
