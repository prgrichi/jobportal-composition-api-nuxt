// composables/useCms.js
import { heroQuery } from '~/graphql/hero.js';

export function useCms() {
  const { $apollo } = useNuxtApp();

  async function fetchHero(locale) {
    const hygraphLocale = locale || 'de';

    const { data } = await $apollo.query({
      query: heroQuery,
      variables: {
        locale: hygraphLocale, // "de" oder "en"
        fetchPolicy: 'cache-first',
      },
    });

    return data?.heroes?.[0] ?? null;
  }

  return {
    fetchHero,
  };
}
