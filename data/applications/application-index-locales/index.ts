import { ivdDocumentHref } from '../ivd-locales/routes';
import { applicationAreas, applicationChoices } from '../application-index';
import { industrialInkjetPrinting } from '../industrial-inkjet-printing';
import inkjetRoutes from '../industrial-inkjet-routes.json';
import { getInkjetNav, inkjetSceneKeys } from '../inkjet-guide-navigation';
import { getLocalizedSiteHref } from '@/lib/seo/site-url';
import { getDraftHrefForEnglish, getHindiDraftLink, getItalianDraftLink, isLocalizedGermanDraftPath } from '@/lib/i18n/draft-languages';
import type { EnglishApplicationKind } from '../application-english';
import { de, germanInkjetIndexCopy } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { hi, hindiInkjetIndexCopy } from './hi';
import { it, italianInkjetIndexCopy } from './it';
import { ko } from './ko';
import { ru } from './ru';
import { applicationIndexLocales, type ApplicationIndexCopy, type ApplicationIndexLocale, type ApplicationIndexPageLocale } from './types';

export { applicationIndexLocales };
export type { ApplicationIndexLocale, ApplicationIndexPageLocale };

const copies: Record<ApplicationIndexPageLocale, ApplicationIndexCopy> = { en, es, fr, ko, ru, de, it, hi };
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

export function getApplicationIndexData(locale: ApplicationIndexPageLocale) {
  const copy = copies[locale];
  const linkLocale = locale === 'de' || locale === 'it' || locale === 'hi' ? 'en' : locale;
  const destination = (href: string): { href: string; hrefLang?: 'de' | 'it' | 'hi' | 'en' } => {
    if (locale === 'it') return getItalianDraftLink(href);
    if (locale === 'hi') return getHindiDraftLink(href);
    if (locale !== 'de') return { href };
    const germanHref = getDraftHrefForEnglish(href, 'de');
    return isLocalizedGermanDraftPath(germanHref.split(/[?#]/, 1)[0])
      ? { href: germanHref, hrefLang: 'de' }
      : { href, hrefLang: 'en' };
  };
  const basePath = `/${linkLocale}/applications/`;
  const areas = applicationAreas.map(area => {
    const translation = copy.areas[area.kind];
    const groups = topicGroups[area.kind];
    if (translation.topics.length !== area.topics.length || groups.length !== area.topics.length) {
      throw new Error(`Application topic count mismatch: ${locale}/${area.kind}`);
    }
    return {
      ...area,
      ...translation,
      ...destination(`${basePath}${area.kind}/`),
      topics: area.topics.map((topic, index) => ({
        label: translation.topics[index],
        ...destination(area.kind === 'ivd' ? ivdDocumentHref(linkLocale, `guide-${groups[index]}`) : topic.href.replace(/^\/en\//, `/${linkLocale}/`)),
      })),
    };
  });
  const choices = applicationChoices.map((choice, index) => ({
    title: copy.choiceTitles[index],
    routes: choice.routes.map((route, routeIndex) => ({
      label: copy.choiceLabels[index][routeIndex],
      kind: route.kind,
      domain: copy.areas[route.kind].title,
      ...destination(`${basePath}${route.kind}/`),
    })),
  }));
  const inkjet = industrialInkjetPrinting;
  const nav = getInkjetNav(linkLocale);
  const localizedInkjet = locale === 'de' ? germanInkjetIndexCopy : locale === 'it' ? italianInkjetIndexCopy : locale === 'hi' ? hindiInkjetIndexCopy : undefined;
  const inkjetArea = {
    kind: inkjet.slug,
    title: localizedInkjet?.title ?? nav.labels.hub,
    description: localizedInkjet?.description ?? nav.summary,
    image: inkjet.scenes[0].image,
    imageAlt: localizedInkjet?.imageAlt ?? nav.imageAlt,
    ...destination(getLocalizedSiteHref(inkjet.href, linkLocale)),
    topics: inkjetSceneKeys.map(key => ({
      label: localizedInkjet?.topics[key] ?? nav.labels[key],
      ...destination(getLocalizedSiteHref(inkjetRoutes[key], linkLocale)),
    })),
  };
  const inkjetChoice = {
    title: localizedInkjet?.choiceTitle ?? nav.choiceTitle,
    routes: (['guide', 'inkFiltration'] as const).map((key, index) => ({
      kind: key, label: localizedInkjet?.choicePrompts[index] ?? nav.choicePrompts[index],
      domain: localizedInkjet?.choiceDomains[key] ?? nav.labels[key],
      ...destination(getLocalizedSiteHref(inkjetRoutes[key], linkLocale)),
    })),
  };
  return {
    copy, areas: [...areas, inkjetArea], choices: [...choices, inkjetChoice],
    homeHref: (locale === 'it' || locale === 'hi') ? destination('/en/').href : `/${locale}/`,
    contactHref: (locale === 'it' || locale === 'hi') ? destination('/en/contact/').href : `/${locale}/contact/`,
  };
}
