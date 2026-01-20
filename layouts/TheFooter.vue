<template>
  <!-- Site Footer -->
  <footer class="border-t-4 border-primary-500/70 bg-background py-10">
    <div class="max-w-app mx-auto px-4">
      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <!-- Project Info -->
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ $t('footer.projectTitle') }} · {{ $t('footer.projectSubTitle') }}
          </p>
          <p class="mt-1 text-sm text-muted-foreground">Vue · Pinia · Firebase · Tailwind</p>
        </div>

        <!-- Navigation Links -->
        <nav class="flex gap-6 text-sm">
          <!-- Home Link -->
          <NuxtLink to="/" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.homepage') }}
          </NuxtLink>

          <!-- Login Link (nur für nicht eingeloggte User) -->
          <NuxtLink
            v-show="authReady && !isAuthenticated"
            to="/login"
            class="text-muted-foreground hover:text-primary-600 transition"
          >
            {{ $t('general.btn.login') }}
          </NuxtLink>

          <!-- Jobs Link -->
          <NuxtLink to="/jobs" class="text-muted-foreground hover:text-primary-600 transition">
            {{ $t('footer.link.jobs') }}
          </NuxtLink>

          <!-- GitHub Link (external) -->
          <a
            href="https://github.com/prgrichi/jobportal"
            rel="noopener noreferrer"
            target="_blank"
            class="text-muted-foreground hover:text-primary-600 transition"
          >
            GitHub
          </a>
        </nav>
      </div>

      <!-- Copyright / Meta Info -->
      <div class="mt-8 text-xs text-neutral-500">© 2026 · Built by Richard Holzner</div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';

const authStore = useAuthStore();

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

const authReady = computed(() => {
  return authStore.authReady;
});
</script>
