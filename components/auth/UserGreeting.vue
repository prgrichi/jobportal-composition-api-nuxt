<template>
  <div class="flex items-center gap-2">
    <span v-show="authReady && authStore.isAuthenticated" class="flex items-center gap-2">
      <Icon name="User" icon-class="h-4 w-4 text-white" />
      <p v-show="authReady" class="text-white transition after:content-['/'] after:ml-4">
        {{ $t('nav.userGreeting') }}, {{ userName }}
      </p>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth/auth';
import { useProfileStore } from '@/stores/user/profile';

const profileStore = useProfileStore();
const authStore = useAuthStore();

// i18n
const { t } = useI18n();

const userName = computed(() => {
  if (profileStore.profile && profileStore.profile.firstName) {
    return profileStore.profile.firstName;
  } else {
    return t('general.userGreetingName');
  }
});

const authReady = computed(() => authStore.authReady);
</script>

<style scoped></style>
