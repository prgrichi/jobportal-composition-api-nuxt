export const TECHNOLOGY_FRAGMENT = `
fragment TechnologyFields on Technology {
  __typename
  id
  description
  subtitle
  title
  technologyItems {
    id
    title
    copy
  }
}
`;
