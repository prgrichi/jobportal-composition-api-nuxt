<template>
  <section class="bg-background relative overflow-hidden">
    <div class="mx-auto max-w-app px-4 py-16 md:py-24">

      <div class="max-w-2xl">
        <p class="mb-3 text-sm uppercase tracking-wider text-primary-600">
          {{ $t('hero.subtitle') }}
        </p>

        <h1 class="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {{ $t('hero.title') }}
        </h1>

        <p class="text-balance mt-5 text-base text-muted-foreground leading-relaxed">
          {{ $t('hero.description') }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">

          <RouterLink :to="{ name: 'jobs' }" class="btn btn-primary">{{ $t('general.btn.jobs') }}</RouterLink>

          <a href="https://github.com/prgrichi/jobportal" rel="noopener noreferrer" target="_blank" class="btn btn-secondary">
            {{ $t('general.btn.github') }}
          </a>
        </div>
      </div>

    </div>

    <!-- Subtiler Hintergrund-Akzent -->
    <div class="pointer-events-none absolute right-0 top-0 h-full w-1/3
                    bg-linear-to-l from-primary-500/5 to-transparent">
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped></style>