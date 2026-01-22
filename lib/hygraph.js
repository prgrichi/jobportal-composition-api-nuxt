// lib/hygraph.js
import { GraphQLClient } from 'graphql-request';

export const useHygraph = () => {
  const config = useRuntimeConfig();

  return new GraphQLClient(config.public.cmsGraphql, {
    headers: {},
  });
};
