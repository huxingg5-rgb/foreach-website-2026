import { ivdDocumentHref } from '../ivd-locales/routes';
import { applicationAreas, applicationChoices } from '../application-index';
import { industrialInkjetPrinting } from '../industrial-inkjet-printing';
import inkjetRoutes from '../industrial-inkjet-routes.json';
import { getInkjetNav, inkjetSceneKeys } from '../inkjet-guide-navigation';
import { getLocalizedSiteHref } from '@/lib/seo/site-url';
import type { EnglishApplicationKind } from '../application-english';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { ko } from './ko';
import { ru } from './ru';
import { applicationIndexLocales, type ApplicationIndexCopy, type ApplicationIndexLocale } from './types';

export { applicationIndexLocales };
export type { ApplicationIndexLocale };

const copies: Record<ApplicationIndexLocale, ApplicationIndexCopy> = { en, es, fr, ko, ru };
// Every foreign-language application now has the same reviewed document routes.
const topicGroups: Record<EnglishApplicationKind, readonly string[]> = {
  ivd: ['clinical', 'immunoassay', 'hematology', 'coagulation', 'molecular'],
  'life-science': ['genomics', 'cellCulture', 'protein'],
  'lab-automation': ['pipetting', 'microplate', 'reagentDispensing', 'samplePrep'],
  'analytical-instruments': ['chromatography', 'spectroscopy', 'waterQuality', 'samplePrep'],
  'environmental-monitoring': ['waterQuality', 'wastewater', 'gasPretreatment', 'samplingPrep'],
  'synthetic-biology': ['microBioreactor', 'biofoundry', 'feedingControl', 'onlineSampling'],
};

export function isApplicationIndexLocale(locale: string): locale is ApplicationIndexLocale {
  return applicationIndexLocales.includes(locale as ApplicationIndexLocale);
}

export function getApplicationIndexData(locale: ApplicationIndexLocale) {
  const copy = copies[locale];
  const basePath = `/${locale}/applications/`;
  const areas = applicationAreas.map(area => {
    const translation = copy.areas[area.kind];
    const groups = topicGroups[area.kind];
    if (translation.topics.length !== area.topics.length || groups.length !== area.topics.length) {
      throw new Error(`Application topic count mismatch: ${locale}/${area.kind}`);
    }
    return {
      ...area,
      ...translation,
      href: `${basePath}${area.kind}/`,
      topics: area.topics.map((topic, index) => ({
        label: translation.topics[index],
        href: area.kind === 'ivd' ? ivdDocumentHref(locale, `guide-${groups[index]}`) : topic.href.replace(/^\/en\//, `/${locale}/`),
      })),
    };
  });
  const choices = applicationChoices.map((choice, index) => ({
    title: copy.choiceTitles[index],
    routes: choice.routes.map((route, routeIndex) => ({
      label: copy.choiceLabels[index][routeIndex],
      kind: route.kind,
      domain: copy.areas[route.kind].title,
      href: `${basePath}${route.kind}/`,
    })),
  }));
  const inkjet = industrialInkjetPrinting;
  const nav = getInkjetNav(locale);
  const inkjetArea = {
    kind: inkjet.slug,
    title: nav.labels.hub,
    description: nav.summary,
    image: inkjet.scenes[0].image,
    imageAlt: nav.imageAlt,
    href: getLocalizedSiteHref(inkjet.href, locale),
    topics: inkjetSceneKeys.map(key => ({
      label: nav.labels[key], href: getLocalizedSiteHref(inkjetRoutes[key], locale),
    })),
  };
  const inkjetChoice = {
    title: nav.choiceTitle,
    routes: (['guide', 'inkFiltration'] as const).map((key, index) => ({
      kind: key, label: nav.choicePrompts[index], domain: nav.labels[key],
      href: getLocalizedSiteHref(inkjetRoutes[key], locale),
    })),
  };
  return {
    copy, areas: [...areas, inkjetArea], choices: [...choices, inkjetChoice],
    homeHref: `/${locale}/`, contactHref: `/${locale}/contact/`,
  };
}
