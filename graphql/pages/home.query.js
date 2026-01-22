import { HERO_FRAGMENT } from '../fragments/hero.fragment';
import { DISCLAIMER_FRAGMENT } from '../fragments/disclaimer.fragment';
import { WHY_FRAGMENT } from '../fragments/why.fragment';
import { TECHNOLOGY_FRAGMENT } from '../fragments/technology.fragment';
import { APPPLACEHOLDER_FRAGMENT } from '../fragments/appPlaceholder.fragment';

export const HOME_PAGE_QUERY = `
${HERO_FRAGMENT}
${DISCLAIMER_FRAGMENT}
${WHY_FRAGMENT}
${TECHNOLOGY_FRAGMENT}
${APPPLACEHOLDER_FRAGMENT}

query HomePage($locale: Locale!) {
  page(where: { slug: "home" }) {
    sections(locales: [$locale]) {
      ...HeroFields
      ...DisclaimerFields
      ...WhyFields
      ...TechnologyFields
      ...AppPlaceholderFields
    }
  }
}
`;
