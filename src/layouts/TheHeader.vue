<template>
  <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">

    <div class="border-b border-border bg-primary-500">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-between gap-4 text-xs">

          <!-- dark mode toggle -->
          <div>
            <button @click="toggleDarkMode"
              class="cursor-pointer relative inline-flex items-center justify-center p-2 rounded-lg"
              :aria-label="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <Icon name="Sun" v-if="themeStore.isDark" icon-class="h-4 w-4 text-white" />
              <Icon name="Moon" v-else icon-class="h-4 w-4 text-white" />
            </button>
          </div>

          <div class="flex flex-1 justify-end items-center gap-4">

            <!-- welcome user -->
            <div v-if="authReady && authStore.isAuthenticated" class="flex items-center gap-2">
              <Icon name="User" icon-class="h-4 w-4 text-white" />
              <p class="text-white transition after:content-['/'] after:ml-4">{{
                $t('nav.userGreeting') }}, {{
                  authStore.userName }}</p>
            </div>

            <!-- Language Switcher -->
            <div class="flex items-center gap-2" aria-label="Sprachwahl">
              <button :class="deClasses" @click="changeLang('de')" class="cursor-pointer text-white">DE</button>
              <span class="text-neutral-300" aria-hidden="true">|</span>
              <button :class="enClasses" @click="changeLang('en')" class="cursor-pointer text-white">EN</button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-app flex justify-between md:block">

      <div class="flex h-16 items-center px-4 w-full justify-between relative">

        <!-- Logo -->
        <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-foreground">{{ $t('nav.link.homepage') }}
        </RouterLink>

        <!-- mobile menu btn -->
        <button v-if="authReady" @click="toggleMenu" class="md:hidden p-2 text-muted-foreground">
          <Icon :name="mobileMenuOpen ? 'XMark' : 'Bars3'" icon-class="h-6 w-6" />
        </button>

        <!-- Navigation -->
        <nav v-if="authReady" aria-label="Hauptnavigation"
          :class="['text-sm', mobileMenuOpen ? 'h-[calc(100vh-106px)] flex flex-col absolute top-16 w-full left-0 right-0 bg-background border-b border-border p-4 gap-4' : 'hidden md:flex items-center gap-6']">

          <!-- my jobs link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'favoriteJobs' }"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" v-if="!isAuthenticated" icon-class="me-[2px] h-4 w-4 text-muted-foreground " />
              {{ $t('nav.link.favoriteJobs') }}
              <span v-if="favoritesStore.favoriteCount > 0"
                class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-500 text-[11px] font-semibold text-white">
                {{ favoritesStore.favoriteCount }}
              </span>
            </RouterLink>
          </template>
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.favoriteJobs') }}
            </button>
          </template>

          <!-- jobs link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'jobs' }" v-if="authStore.isAuthenticated"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" v-if="!isAuthenticated" icon-class="me-[2px] h-4 w-4 text-muted-foreground " />
              {{ $t('nav.link.job') }}
            </RouterLink>
          </template>
          <template v-else>
            <button @click="modalStore.showAuthRequired"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition">
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.job') }}
            </button>
          </template>

          <!-- profile link -->
          <RouterLink :to="{ name: 'profile' }" v-if="isAuthenticated"
            class="inline-flex items-center text-muted-foreground hover:text-foreground transition">
            {{ $t('nav.link.profile') }}
          </RouterLink>

          <!-- login btn -->
          <RouterLink :to="{ name: 'login' }" v-if="!isAuthenticated" class="btn btn-secondary">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <!-- register btn -->
          <RouterLink :to="{ name: 'register' }" v-if="!isAuthenticated" class="btn btn-primary">{{
            $t('general.btn.register') }}
          </RouterLink>

          <!-- logout btn -->
          <button v-if="isAuthenticated" class="btn btn-secondary" @click="handleLogout">
            {{ $t('general.btn.logout') }}
          </button>
        </nav>

      </div>
    </div>
  </header>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { useThemeStore } from '@/stores/ui/theme';
import DebugBox from '@/components/debug/DebugBox.vue';

export default {
  name: 'TheHeader',
  components: {
    DebugBox
  },
  data() {
    return {
      activeClasses: false,
      mobileMenuOpen: false
    }
  },
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
    favoritesStore() {
      return useFavoritesStore();
    },
    modalStore() {
      return useModalStore();
    },
    themeStore() {
      return useThemeStore();
    },
    getFavoriteJobsNumber() {
      return this.favoritesStore.favoriteJobs.length;
    },
    currentLocale() {
      return this.$i18n.locale;
    },
    deClasses() {
      return this.currentLocale === 'de'
        ? 'font-bold text-primary-600'
        : 'text-muted-foreground';
    },
    enClasses() {
      return this.currentLocale === 'en'
        ? 'font-bold text-primary-600'
        : 'text-muted-foreground';
    }
  },
  methods: {
    toggleDarkMode() {
      this.themeStore.toggle();
    },
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;

    },
    changeLang(lang) {
      this.$i18n.locale = lang;
    },

    async handleLogout() {
      const toast = useToastStore();

      try {
        await signOut(auth);

        toast.success('Erfolgreich ausgeloggt');
        this.$router.push({ name: 'home' });
      } catch (err) {
        toast.error('Logout fehlgeschlagen');
      }
    },

    openAuthRequiredModal() {
      this.modalStore.showAuthRequired();
    }

  }
}
</script>

<style scoped></style>