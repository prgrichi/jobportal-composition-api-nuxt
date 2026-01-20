// plugins/app-init.client.js
import { useAuthStore } from '~/stores/auth/auth';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:mounted', async () => {
    const authStore = useAuthStore();
    await authStore.init();
  });
});
