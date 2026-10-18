import type { EnglishApplicationKind } from '../application-english';

export const applicationIndexLocales = ['en', 'es', 'fr', 'ko', 'ru'] as const;
export type ApplicationIndexLocale = typeof applicationIndexLocales[number];
export type ApplicationIndexCopy = {
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImageAlt: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  breadcrumbAriaLabel: string;
  heading: string;
  intro: string;
  topicNavLabel: string;
  detailsLabel: string;
  detailsAriaLabel: string;
  guidanceHeading: string;
  guidanceIntro: string;
  choiceTitles: [string, string, string];
  choiceLabels: [[string, string], [string, string], [string, string]];
  contactHeading: string;
  contactDescription: string;
  contactLabel: string;
  areas: Record<EnglishApplicationKind, {
    title: string;
    description: string;
    imageAlt: string;
    topics: string[];
  }>;
};
