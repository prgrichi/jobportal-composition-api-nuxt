// graphql/hero.js
import { gql } from '@apollo/client/core';

export const heroQuery = gql`
  query HeroQuery {
    hero {
      title
      subtitle
      description
    }
  }
`;
