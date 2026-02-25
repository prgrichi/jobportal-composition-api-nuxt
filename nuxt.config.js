import tailwindcss from '@tailwindcss/vite';

// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'de',
      },
      title: 'Jobportal',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Finde deinen Traumjob auf unserem Jobportal!' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/public/favicon.ico' }],
    },
  },

  ssr: true,
  routeRules: {
    '/jobs/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      cmsGraphql: process.env.NUXT_PUBLIC_CMS_GRAPHQL,
    },
  },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
});
