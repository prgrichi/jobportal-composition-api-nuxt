<template>
  <footer class="border-t-4 border-primary-500/70
      bg-background">
    <div class="max-w-app mx-auto px-4 py-12">

      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <!-- Projektinfo -->
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ $t('footer.projectTitle') }} · {{ $t('footer.projectSubTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted-foreground">
            Vue · Pinia · Firebase · Tailwind
          </p>
        </div>

        <!-- Navigation -->
        <nav v-if="authReady" class="flex gap-6 text-sm">
          <RouterLink :to="{ name: 'home' }" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.homepage') }}
          </RouterLink>

          <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }"
            class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <RouterLink :to="{ name: 'jobs' }" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.jobs') }}
          </RouterLink>

          <a href="https://github.com/prgrichi/jobportal" rel="noopener noreferrer" target="_blank"
            class="text-muted-foreground hover:text-primary-600 transition">
            GitHub
          </a>
        </nav>

      </div>

      <!-- Meta -->
      <div class="mt-8 text-xs text-neutral-500">
        © 2025 · Built by Richard Holzner
      </div>

    </div>
  </footer>
</template>

<script>
import { useAuthStore } from '@/stores/auth/auth';

export default {
  name: 'TheFooter',
  computed: {
    authStore() {
      return useAuthStore();
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    authReady() {
      return this.authStore.authReady;
    },
  },
}
</script>

<style scoped></style>