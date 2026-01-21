// graphql/hero.js
import { gql } from '@apollo/client/core';

export const heroQuery = gql`
  query GetHeroes($locale: Locale!) {
    heroes(locales: [$locale]) {
      id
      title
      subtitle
      description
    }
  }
`;
