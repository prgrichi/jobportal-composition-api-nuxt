<template>
  <!-- Tech Stack Section -->
  <section class="bg-muted mb-10 lg:mb-16 py-10">
    <div class="max-w-app mx-auto px-4">
      <!-- Section Header -->
      <div class="mb-14 text-center">
        <p class="text-sm uppercase tracking-wider text-primary-600">
          {{ subtitle }}
        </p>
        <h2 class="mt-2 text-3xl font-semibold text-foreground">
          {{ title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <!-- Tech Stack Grid -->
      <div class="rounded-l border border-border bg-background overflow-hidden">
        <div class="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <!-- Left Column -->
          <div class="divide-y divide-border">
            <div class="flex items-start gap-6 p-6" v-for="(item, i) in firstCol" :key="item.id">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-mono font-medium text-primary-500"
              >
                {{ formatIndexWithOffset(i, 0) }}
              </span>
              <div>
                <h3 class="text-lg font-medium">
                  {{ item.title }}
                </h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ item.copy }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="divide-y divide-border">
            <div class="flex items-start gap-6 p-6" v-for="(item, i) in secondCol" :key="item.id">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-mono font-medium text-primary-500"
              >
                {{ formatIndexWithOffset(i, firstCol.length) }}
              </span>
              <div>
                <h3 class="text-lg font-medium">
                  {{ item.title }}
                </h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ item.copy }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'TechStackSection',
});

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  technologyItems: {
    type: Array,
    required: false,
  },
});

const firstCol = computed(() => {
  return props.technologyItems.slice(0, 3);
});

const secondCol = computed(() => {
  return props.technologyItems.slice(3, 6);
});

const formatIndexWithOffset = (i, offset) => {
  return String(i + offset + 1).padStart(2, '0');
};
</script>
