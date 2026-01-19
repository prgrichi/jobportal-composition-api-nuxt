// middleware/auth.js
import { useAuthStore } from '~/stores/auth/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // previous route nur setzen, wenn from existiert (und am besten nur client)
  if (import.meta.client && typeof authStore.setPreviousRoute === 'function') {
    authStore.setPreviousRoute(from?.fullPath ?? null);
  }

  // Auf SSR nicht blockieren (Firebase/Auth ist client-init)
  if (import.meta.server) {
    return;
  }

  if (!to.meta.requiresAuth) return;

  await authStore.init();

  if (!authStore.user) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
