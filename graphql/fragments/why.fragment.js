export const WHY_FRAGMENT = `
fragment WhyFields on Why {
  __typename
  id
  description
  subtitle
  title
  whyFeature {
    id
    title
    description
  }
}
`;
