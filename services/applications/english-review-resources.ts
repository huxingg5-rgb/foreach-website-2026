import { getReviewFooterPlan, reviewProductCards } from '@/data/applications/english-review-resources';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';
import { translateApplicationEnglish } from './english-localized';

export function getEnglishReviewResources(kind: EnglishApplicationKind, document: ApplicationDocument): RelatedResourcesData {
  const plan = getReviewFooterPlan(kind, document);
  const english = getTechnicalArticlesPageData('en').articles;
  return {
    locale: 'en', uiLocale: 'en', videos: [],
    products: plan.products.map(key => {
      const card = reviewProductCards[key];
      const title = translateApplicationEnglish(card.title);
      return { id: 'review-family:' + key, title, href: card.href, imageSrc: card.image, imageAlt: `${title}; representative configuration. Select capacity, materials and interfaces for the application.` };
    }),
    articles: plan.articles.map(slug => {
      const source = english.find(article => article.slug === slug);
      if (!source) throw new Error('Missing published English application reading ' + slug);
      return { id: source.id, slug, title: source.title, summary: source.summary, date: source.date, coverImage: source.coverImage };
    }),
  };
}
