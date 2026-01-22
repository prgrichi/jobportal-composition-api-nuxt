import { useHygraph } from './hygraph';

export const usePageQuery = (key, query, localeRef) => {
  const client = useHygraph();

  return useAsyncData(
    () => `${key}-${localeRef.value}`,
    () => client.request(query, { locale: localeRef.value }),
    { watch: [localeRef] }
  );
};
