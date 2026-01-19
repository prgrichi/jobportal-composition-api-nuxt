// Nuxt Apollo Plugin
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: config.public.cmsGraphql, // z.B. http://localhost:1337/graphql
    }),
    cache: new InMemoryCache(),
  });

  nuxtApp.provide('apollo', apolloClient);
});
