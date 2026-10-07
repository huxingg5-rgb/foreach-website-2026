import { getReviewFooterPlan, reviewProductCards } from '@/data/applications/english-review-resources';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';

export function getEnglishReviewResources(kind: EnglishApplicationKind,document: ApplicationDocument): RelatedResourcesData {
  const plan = getReviewFooterPlan(kind,document);
  const english = getTechnicalArticlesPageData('en').articles;
  const chinese = getTechnicalArticlesPageData('zh-CN').articles;
  return {
    locale:'en', uiLocale:'zh-CN', videos:[],
    products: plan.products.map(key => {
      const card = reviewProductCards[key];
      return {id:'review-family:'+key,title:card.title,href:card.href,imageSrc:card.image,imageAlt:card.title+'；代表配置图，容量、材料与接口按实际任务确认'};
    }),
    articles: plan.articles.map(slug => {
      const source = english.find(article=>article.slug===slug);
      const copy = chinese.find(article=>article.slug===slug);
      if (!source || !copy) throw new Error('Missing published review reading '+slug);
      return {id:source.id,slug,title:copy.title,summary:copy.summary,date:source.date,coverImage:source.coverImage};
    }),
  };
}
