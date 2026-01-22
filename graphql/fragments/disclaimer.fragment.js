export const DISCLAIMER_FRAGMENT = `
fragment DisclaimerFields on Disclaimer {
  __typename
  id
  textarea {
    html
  }
}
`;
