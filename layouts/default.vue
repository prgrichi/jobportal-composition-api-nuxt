<template>
  <div class="app-shell">
    <!-- Skip Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only bg-primary-500 text-white focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-ring focus:font-semibold"
    >
      {{ t('ally.skipToContent') }}
    </a>
    <TheHeader />

    <main id="main-content" tabindex="-1">
      <ToastContainer />
      <slot></slot>
      <AuthRequiredModal
        :is-open="modalStore.authRequiredModalOpen"
        @close="modalStore.hideAuthRequired"
      />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
console.log('[default layout] setup – client:', import.meta.client, 'server:', import.meta.server);

import { onMounted, watch } from 'vue';
import TheHeader from '@/layouts/TheHeader.vue';
import TheFooter from '@/layouts/TheFooter.vue';
import ToastContainer from '@/components/ui/ToastContainer.vue';
import AuthRequiredModal from '@/components/modal/AuthRequiredModal.vue';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { useThemeStore } from '@/stores/ui/theme';
import { useLocaleStore } from '@/stores/ui/locale';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const modalStore = useModalStore();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const { t } = useI18n();

watch(
  () => authStore.isAuthenticated,
  isAuthenticated => {
    if (isAuthenticated) {
      console.log('User eingeloggt, lade Favorites...');
      favoritesStore.loadFavorites();
    } else {
      console.log('User ausgeloggt, lösche Favorites...');
      favoritesStore.clearFavorites();
    }
  }
);

onMounted(async () => {
  localeStore.init();
  themeStore.init();

  if (authStore.isAuthenticated) {
    console.log('Initial load:  User ist eingeloggt');
    favoritesStore.loadFavorites();
  }
});
</script>
