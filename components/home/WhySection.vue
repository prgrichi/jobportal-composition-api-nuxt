<template>
  <!-- Why Section (Features) -->
  <section class="mb-10 lg:mb-16 pt-10">
    <div class="max-w-app mx-auto px-4">
      <div class="grid gap-12 md:grid-cols-2 lg:items-start">
        <!-- Left:  Section Header -->
        <div>
          <p class="text-sm uppercase tracking-wider text-primary-600">
            {{ subtitle }}
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-foreground">
            {{ title }}
          </h2>
          <p class="mt-4 max-w-prose text-muted-foreground leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Right: Features List -->
        <div class="rounded-xl border border-border bg-background divide-y divide-border">
          <!-- Feature 1: Relevant Jobs -->
          <div class="p-6 md: p-7" v-for="feature in whyFeature" :key="feature.id">
            <h3 class="font-medium text-foreground">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineOptions({
  name: 'WhySection',
});

defineProps({
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
  whyFeature: {
    type: Array,
    required: false,
  },
});
</script>
