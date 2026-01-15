// middleware/auth.global.js
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { authReady, isAuthenticated } = storeToRefs(authStore);

  // previous route nur setzen, wenn from existiert (und am besten nur client)
  if (process.client && typeof authStore.setPreviousRoute === 'function') {
    authStore.setPreviousRoute(from?.fullPath ?? null);
  }

  // Auf SSR nicht blockieren (Firebase/Auth ist client-init)
  if (process.server) {
    // Optional: wenn du serverseitig Cookies/JWT hast, würdest du hier prüfen.
    return;
  }

  // Client: kurz warten, aber nicht ewig
  if (!authReady.value) {
    await waitForAuthReady(authReady, 2000); // 2s Timeout
  }

  // Redirect-Loop verhindern: login selbst nie redirecten
  const isLoginRoute = to.name === 'login' || to.path === '/login';

  if (!isLoginRoute && to.meta.requiresAuth && !isAuthenticated.value) {
    return navigateTo({ name: 'login', query: { redirect: to.fullPath } });
  }
});

function waitForAuthReady(authReadyRef, timeoutMs) {
  return new Promise(resolve => {
    const stop = watch(
      authReadyRef,
      ready => {
        if (ready) {
          stop();
          clearTimeout(t);
          resolve();
        }
      },
      { immediate: true }
    );

    const t = setTimeout(() => {
      stop();
      resolve(); // nicht blockieren, auch wenn authReady nie kommt
    }, timeoutMs);
  });
}
