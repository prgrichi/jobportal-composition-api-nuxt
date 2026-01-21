<template>
  <section class="py-6 md:py-12 px-4">
    <div class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center max-w-md">
        <p class="text-6xl font-bold text-primary-500">404</p>

        <h1 class="mt-4 text-2xl font-semibold text-foreground">
          {{ $t('notFound.title') }}
        </h1>

        <p class="mt-2 text-sm text-muted-foreground">
          {{ $t('notFound.text') }}
        </p>

        <div class="mt-6 flex justify-center gap-3">
          <NuxtLink to="/" class="btn btn-primary">
            {{ $t('notFound.btn.home') }}
          </NuxtLink>

          <button class="btn btn-secondary" @click="$router.back()">
            {{ $t('notFound.btn.back') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  title: '404',
});
</script>

<style scoped></style>
