<template>
  <!-- Site Header (Sticky) -->
  <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
    <!-- Top Bar (Dark Mode + Language + User Greeting) -->
    <div class="border-b border-border bg-primary-500">
      <div class="mx-auto max-w-app px-4">
        <div class="flex h-10 items-center justify-between gap-4 text-xs">
          <!-- Dark Mode Toggle -->
          <ToggleSwitch v-model="darkMode" label="Dark Mode" />

          <div class="flex flex-1 justify-end items-center gap-4">
            <!-- Welcome User -->
            <div v-if="authReady && authStore.isAuthenticated" class="flex items-center gap-2">
              <Icon name="User" icon-class="h-4 w-4 text-white" />
              <p class="text-white transition after:content-['/'] after:ml-4">
                {{ $t('nav.userGreeting') }}, {{ authStore.userName }}
              </p>
            </div>

            <!-- Language Switcher -->
            <nav
              class="flex items-center gap-2"
              role="group"
              :aria-label="$t('nav.languageSelector')"
            >
              <button
                type="button"
                :class="deClasses"
                lang="de"
                :aria-label="$t('nav.switchToGerman')"
                :aria-current="currentLangDe"
                @click="changeLang('de')"
                class="cursor-pointer text-white"
              >
                DE
              </button>
              <span class="text-neutral-300" aria-hidden="true">|</span>
              <button
                type="button"
                :class="enClasses"
                lang="en"
                :aria-label="$t('nav.switchToEnglish')"
                :aria-current="currentLangEn"
                @click="changeLang('en')"
                class="cursor-pointer text-white"
              >
                EN
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="mx-auto max-w-app flex justify-between md:block">
      <div class="flex h-16 items-center w-full justify-between relative px-4">
        <!-- Logo / Home Link -->
        <RouterLink :to="{ name: 'home' }" class="text-sm font-semibold text-foreground">
          {{ $t('nav.link.homepage') }}
        </RouterLink>

        <!-- Mobile Menu Toggle Button -->
        <button
          v-if="authReady"
          @click="toggleMenu"
          ref="burgerBtn"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          class="md:hidden min-w-11 min-h-11 p-2 text-muted-foreground"
        >
          <span class="sr-only">
            {{ mobileMenuOpen ? $t('nav.closeMobileMenu') : $t('nav.openMobileMenu') }}
          </span>
          <Icon
            aria-hidden="true"
            :name="mobileMenuOpen ? 'XMark' : 'Bars3'"
            icon-class="h-6 w-6"
          />
        </button>

        <!-- Navigation Links -->
        <nav
          v-if="authReady"
          ref="mobileMenu"
          id="mobile-menu"
          aria-label="Hauptnavigation"
          :class="[
            'text-sm',
            mobileMenuOpen
              ? 'h-[calc(100vh-106px)] flex flex-col absolute top-16 w-full left-0 right-0 bg-background border-b border-border p-4 gap-4'
              : 'hidden md:flex items-center gap-6',
          ]"
        >
          <!-- Favorite Jobs Link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              :to="{ name: 'favoriteJobs' }"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
            >
              {{ $t('nav.link.favoriteJobs') }}
              <!-- Favorites Count Badge -->
              <span
                v-if="favoritesStore.favoriteCount > 0"
                class="ms-[5px] inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary-500 text-[11px] font-semibold text-white"
              >
                {{ favoritesStore.favoriteCount }}
              </span>
            </RouterLink>
          </template>
          <!-- Locked Favorite Jobs (für nicht eingeloggte User) -->
          <template v-else>
            <button
              @click="openAuthRequiredModal"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
            >
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.favoriteJobs') }}
            </button>
          </template>

          <!-- Jobs Link -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              :to="{ name: 'jobs' }"
              class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
            >
              {{ $t('nav.link.job') }}
            </RouterLink>
          </template>
          <!-- Locked Jobs (für nicht eingeloggte User) -->
          <template v-else>
            <button
              @click="openAuthRequiredModal"
              class="cursor-pointer inline-flex items-center text-muted-foreground hover:text-foreground transition"
            >
              <Icon name="LockClosed" icon-class="me-[2px] h-4 w-4 text-muted-foreground" />
              {{ $t('nav.link.job') }}
            </button>
          </template>

          <!-- Profile Link (nur wenn eingeloggt) -->
          <RouterLink
            v-if="isAuthenticated"
            :to="{ name: 'profile' }"
            class="inline-flex items-center text-muted-foreground hover:text-foreground transition"
          >
            {{ $t('nav.link.profile') }}
          </RouterLink>

          <!-- Login Button (nur wenn nicht eingeloggt) -->
          <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }" class="btn btn-secondary">
            {{ $t('general.btn.login') }}
          </RouterLink>

          <!-- Register Button (nur wenn nicht eingeloggt) -->
          <RouterLink v-if="!isAuthenticated" :to="{ name: 'register' }" class="btn btn-primary">
            {{ $t('general.btn.register') }}
          </RouterLink>

          <!-- Logout Button (nur wenn eingeloggt) -->
          <button v-if="isAuthenticated" class="btn btn-secondary" @click="handleLogout">
            {{ $t('general.btn.logout') }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

import { useToastStore } from '@/stores/toast/toast';
import { useAuthStore } from '@/stores/auth/auth';
import { useFavoritesStore } from '@/stores/jobs/favorites';
import { useModalStore } from '@/stores/ui/modal';
import { useThemeStore } from '@/stores/ui/theme';
import { useLocaleStore } from '@/stores/ui/locale';
import { createFocusTrap } from '@/utils/focusTrap';

import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import Icon from '@/components/ui/Icon.vue';

const mobileMenuOpen = ref(false); // Mobile menu toggle state
const focusTrap = ref(null); // Focus trap instance
const burgerBtn = ref(null); // Reference to the burger button
const mobileMenu = ref(null); // Reference to the mobile menu

const { locale } = useI18n();

const toastStore = useToastStore();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const modalStore = useModalStore();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const authReady = computed(() => authStore.authReady);

const darkMode = computed({
  get() {
    return themeStore.isDark;
  },
  set(_value) {
    themeStore.toggle();
  },
});

// Current i18n locale
const currentLocale = computed(() => {
  return localeStore.locale;
});

const currentLangDe = computed(() => {
  return currentLocale.value === 'de' ? 'page' : undefined;
});

const currentLangEn = computed(() => {
  return currentLocale.value === 'en' ? 'page' : undefined;
});

// German button classes (active/inactive)
const deClasses = computed(() => {
  return currentLocale.value === 'de' ? 'font-bold text-primary-600' : 'text-muted-foreground';
});
// English button classes (active/inactive)
const enClasses = computed(() => {
  return currentLocale.value === 'en' ? 'font-bold text-primary-600' : 'text-muted-foreground';
});

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);

onMounted(() => {
  focusTrap.value = createFocusTrap({
    getFocusableElements: () => {
      const menuLinks = Array.from(mobileMenu.value?.querySelectorAll('a, button') || []);
      return [burgerBtn.value, ...menuLinks];
    },
    onClose: () => {
      toggleMenu();
    },
  });
});

onBeforeUnmount(() => {
  focusTrap.value?.destroy();
});

// Toggle mobile menu
const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  if (mobileMenuOpen.value) {
    focusTrap.value?.activate();
    const firstLink = mobileMenu.value?.querySelector('a');
    firstLink?.focus();
  } else {
    focusTrap.value?.deactivate();
    nextTick(() => {
      // Focus zurück auf Burger
      burgerBtn.value?.focus();
    });
  }
};

// Change language
const changeLang = lang => {
  locale.value = lang;
  localeStore.setLocale(lang);
};

// Show auth required modal
const openAuthRequiredModal = () => {
  modalStore.showAuthRequired();
};

const router = useRouter();
// Handle user logout
const handleLogout = async () => {
  try {
    await signOut(auth);
    toastStore.success('Erfolgreich ausgeloggt');
    router.push({ name: 'home' });
  } catch (_err) {
    toastStore.error('Logout fehlgeschlagen');
  }
};
</script>
