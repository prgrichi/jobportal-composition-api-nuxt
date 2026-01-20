<template>
  <!-- Favorite Jobs Link -->
  <NuxtLink
    to="/favorite-jobs"
    v-show="authReady && isAuthenticated"
    class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
    {{ $t('nav.link.favoriteJobs') }}
    <!-- Favorites Count Badge -->
    <span
      v-if="favoriteCount > 0"
      class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-500 text-[11px] font-semibold text-white"
    >
      {{ favoriteCount }}
    </span>
  </NuxtLink>

  <!-- Locked Favorite Jobs (für nicht eingeloggte User) -->
  <button
    v-show="authReady && !isAuthenticated"
    @click="openModal"
    class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
    <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
    {{ $t('nav.link.favoriteJobs') }}
  </button>

  <!-- Jobs Link -->
  <NuxtLink
    v-show="authReady && isAuthenticated"
    to="/jobs"
    class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
    {{ $t('nav.link.job') }}
  </NuxtLink>

  <!-- Locked Jobs (für nicht eingeloggte User) -->
  <button
    v-show="authReady && !isAuthenticated"
    @click="openModal"
    class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
    <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
    {{ $t('nav.link.job') }}
  </button>

  <!-- Profile Link (nur wenn eingeloggt) -->
  <NuxtLink
    v-show="authReady && isAuthenticated"
    to="/profile"
    class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
  >
    {{ $t('nav.link.profile') }}
  </NuxtLink>

  <!-- Login Button (nur wenn nicht eingeloggt) -->
  <NuxtLink v-show="authReady && !isAuthenticated" to="/login" class="btn btn-secondary">
    {{ $t('general.btn.login') }}
  </NuxtLink>

  <!-- Register Button (nur wenn nicht eingeloggt) -->
  <NuxtLink v-show="authReady && !isAuthenticated" to="/register" class="btn btn-primary">
    {{ $t('general.btn.register') }}
  </NuxtLink>

  <!-- Logout Button (nur wenn eingeloggt) -->
  <button v-show="authReady && isAuthenticated" class="btn btn-secondary" @click="handleLogout">
    {{ $t('general.btn.logout') }}
  </button>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth/auth';
import { computed } from 'vue';

const { isAuthenticated, favoriteCount } = defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  favoriteCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const authStore = useAuthStore();
const authReady = computed(() => authStore.authReady);

const emit = defineEmits(['logout', 'authRequired']);

const handleLogout = () => {
  emit('logout');
};
const openModal = () => {
  emit('authRequired');
};
</script>

<style scoped></style>
