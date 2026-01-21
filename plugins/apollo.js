// Nuxt Apollo Plugin
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: config.public.cmsGraphql,
    }),
    cache: new InMemoryCache(),
  });

  nuxtApp.provide('apollo', apolloClient);
});
