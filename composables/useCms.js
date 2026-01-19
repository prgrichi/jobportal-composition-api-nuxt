import { heroQuery } from '~/graphql/hero.js';

export function useCms() {
  const { $apollo } = useNuxtApp();

  async function fetchHero() {
    const { data } = await $apollo.query({
      query: heroQuery,
    });
    return data.hero;
  }

  return {
    fetchHero,
  };
}
