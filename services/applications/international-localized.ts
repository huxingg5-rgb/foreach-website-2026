import { cache } from 'react';
import type { Metadata } from 'next';
import type { ApplicationBlock, ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import { applicationRoutes } from '@/data/applications/application-routes';
import { getReviewHub, getReviewQueryLinks, reviewDomains } from '@/data/applications/english-review';
import { getReviewFooterPlan, reviewProductCards, type ReviewProductCardId } from '@/data/applications/english-review-resources';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { applicationDocumentLocales, localizedApplicationHref, localizeApplicationHref, type ApplicationTranslationLocale } from '@/data/applications/international-locales/routes';
import sourceIndex from '@/data/applications/international-locales/source-index.json';
import { getReviewDocument, isFinalizedEnglishReference } from './english-review';
import { getEnglishApplicationDocument, translateApplicationEnglish } from './english-localized';
import { getLocalizedIvdDocument } from './ivd-localized';
import { refineEnglishGuideCta } from '@/data/applications/english-locales/refine-guides';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';
import { ivdUi, ivdProductLabel } from '@/data/applications/ivd-locales/ui';
import { getIvdReadingPlan } from '@/data/applications/ivd-locales/reading';
import { getIvdRelatedProductCardImage } from '@/data/applications/ivd-locales/product-card-images';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { isLiquidChromatographySlug } from '@/data/applications/analytical-documents/liquid-chromatography';
import { LC_PRODUCTS, LC_TASK_RESOURCES } from '@/data/applications/analytical-documents/liquid-chromatography-resources';
import { getLiquidChromatographyResources } from './liquid-chromatography-resources';

const ids: Readonly<Record<string, string>> = sourceIndex;
const loaders = {
  es: () => import('@/data/applications/international-locales/es.json'),
  fr: () => import('@/data/applications/international-locales/fr.json'),
  ko: () => import('@/data/applications/international-locales/ko.json'),
  ru: () => import('@/data/applications/international-locales/ru.json'),
};
const dictionaries = new Map<ApplicationTranslationLocale, Promise<Record<string, string>>>();
export function getApplicationTranslationDictionary(locale: ApplicationTranslationLocale) {
  if (!dictionaries.has(locale)) dictionaries.set(locale, loaders[locale]().then(module => module.default));
  return dictionaries.get(locale)!;
}
const structuralKeys = new Set(['id', 'slug', 'kind', 'type', 'group', 'products', 'parentSlug', 'family', 'topic', 'backgroundImage', 'level', 'seriesId']);
export function translateApplicationCopy<T>(value: T, copy: Readonly<Record<string, string>>, locale: ApplicationTranslationLocale, key = ''): T {
  if (key === 'href') return localizeApplicationHref(value as string, locale) as T;
  if (structuralKeys.has(key)) return value;
  // Source titles remain bibliographic titles; local links still use the selected language.
  if (key === 'references') return (Array.isArray(value) ? value.map(ref => typeof ref === 'string' ? ref : { ...ref, href: localizeApplicationHref(ref.href, locale) }) : value) as T;
  if (typeof value === 'string') {
    const id = ids[value];
    if (id) {
      const translated = copy[id];
      if (!translated?.trim() || /[\u3400-\u9fff]/u.test(translated)) throw new Error(`Missing application translation ${locale}:${id}`);
      return translated as T;
    }
    if (/[A-Za-z]/.test(value) && !/^[/#]|^https?:/.test(value) && !/^[A-Z\d][A-Z\d .%μµ/–−+()_-]*$/.test(value)) throw new Error(`Unregistered application copy ${locale}: ${value}`);
    return value;
  }
  if (Array.isArray(value)) return value.map(item => translateApplicationCopy(item, copy, locale, key)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, translateApplicationCopy(item, copy, locale, name)])) as T;
  return value;
}

export const getCurrentEnglishApplicationDocument = cache(async (kind: EnglishApplicationKind, slug = ''): Promise<ApplicationDocument> => {
  if (kind === 'ivd') return getLocalizedIvdDocument('en', slug);
  const source = slug || isFinalizedEnglishReference(kind, slug) ? await getReviewDocument(kind, slug) : getReviewHub(kind);
  if (!source) throw new Error(`Unknown application document ${kind}/${slug}`);
  return isFinalizedEnglishReference(kind, slug) ? source : getEnglishApplicationDocument(source, kind);
});

function completeLocalizedLinks(block: ApplicationBlock, locale: ApplicationTranslationLocale): ApplicationBlock[] {
  const texts = block.type === 'table' ? block.rows.flat() : block.type === 'list' ? block.items : 'text' in block ? [block.text] : [];
  const word = locale === 'ko' ? /[A-Za-z0-9]/ : /[\p{L}\p{N}]/u;
  const visible = (value: string) => texts.some(text => {
    let start = text.indexOf(value);
    while (start >= 0) {
      const before = text[start - 1] ?? '', after = text[start + value.length] ?? '';
      if ((!word.test(value[0]) || !word.test(before)) && (!word.test(value.at(-1)!) || !word.test(after))) return true;
      start = text.indexOf(value, start + 1);
    }
    return false;
  });
  const inlineLinks = block.inlineLinks ?? [];
  const detached = inlineLinks.filter(link => !visible(link.text));
  if (!detached.length) return [block];
  // Grammar can change the form of a product-category name. Keep its destination
  // in a visible adjacent list instead of forcing an unnatural phrase into prose.
  return [{ ...block, inlineLinks: inlineLinks.filter(link => visible(link.text)) }, {
    type: 'links', items: detached.map(link => ({ label: link.title ?? link.text, href: link.href })),
  }];
}
export const getLocalizedApplicationDocument = cache(async (locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, slug = '') => {
  const original = await getCurrentEnglishApplicationDocument(kind, slug);
  const copy = await getApplicationTranslationDictionary(locale);
  const document = translateApplicationCopy(original, copy, locale);
  const articles = getTechnicalArticlesPageData(locale).articles;
  const localReading = (block: ApplicationBlock): ApplicationBlock => block.type !== 'links' ? block : { ...block, items: block.items.map(item => {
    if (!item.href.includes('/resources/technical-articles/')) return item;
    const article = articles.find(article => item.href.endsWith(`/${article.slug}/`));
    return article ? { ...item, label: article.title } : item;
  }) };
  const blocks = (items: readonly ApplicationBlock[]) => items.flatMap(block => completeLocalizedLinks(localReading(block), locale));
  return { ...document, intro: blocks(document.intro), sections: document.sections.map(section => ({ ...section, blocks: blocks(section.blocks) })) };
});

export async function getLocalizedApplicationNavigation(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, document: ApplicationDocument) {
  const current = applicationRoutes.find(route => route.kind === kind && route.slug === document.slug)!;
  const depth = current.path.split('/').filter(Boolean).length;
  const rootPath = depth <= 3 ? current.path : current.path.split('/').slice(0, 5).join('/') + '/';
  const root = applicationRoutes.find(route => route.path === rootPath)!;
  const descendants = applicationRoutes.filter(route => route.kind === kind && route.path.startsWith(root.path) && route.path !== root.path);
  const children = descendants.filter(route => route.path.slice(root.path.length).split('/').filter(Boolean).length === 1);
  const link = async (slug: string) => ({ label: (await getLocalizedApplicationDocument(locale, kind, slug)).navLabel, href: localizedApplicationHref(locale, kind, slug) });
  return {
    overview: await link(root.slug),
    groups: await Promise.all(children.map(async route => ({ id: route.slug, label: (await link(route.slug)).label, overview: await link(route.slug), children: document.kind === 'hub' ? [] : await Promise.all(descendants.filter(child => child.path.startsWith(route.path) && child.path !== route.path).map(child => link(child.slug))) }))),
  };
}
export async function getLocalizedApplicationBreadcrumbs(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, document: ApplicationDocument) {
  const index = getApplicationIndexData(locale).copy;
  const current = localizedApplicationHref('en', kind, document.slug);
  const trail = applicationRoutes.filter(route => route.kind === kind && current.startsWith(route.path)).sort((a, b) => a.path.length - b.path.length);
  return [{ label: index.breadcrumbHome, href: `/${locale}/` }, { label: index.breadcrumbCurrent, href: `/${locale}/applications/` }, ...await Promise.all(trail.map(async route => ({
    label: route.slug ? (await getLocalizedApplicationDocument(locale, kind, route.slug)).navLabel : index.areas[kind].title,
    href: route.slug === document.slug ? undefined : localizedApplicationHref(locale, kind, route.slug),
  })))];
}
export function getLocalizedApplicationQueryTargets(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind) {
  return Object.fromEntries(Object.entries(getReviewQueryLinks(kind)).map(([key, value]) => [key, { ...value, href: localizeApplicationHref(value.href, locale) }]));
}
export function getLocalizedApplicationMetadata(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, document: ApplicationDocument): Metadata {
  const languages = Object.fromEntries(applicationDocumentLocales.map(language => [language, getCanonicalUrl(localizedApplicationHref(language, kind, document.slug))]));
  const image = { url: reviewDomains[kind].image, width: 1920, height: 800, alt: getApplicationIndexData(locale).copy.areas[kind].imageAlt };
  return {
    title: document.seoTitle, description: document.description, keywords: [...document.keywords],
    robots: { index: true, follow: true },
    alternates: { canonical: languages[locale], languages: { ...languages, ...(!document.slug ? { 'zh-CN': getCanonicalUrl(`/applications/${kind}/`) } : {}), 'x-default': languages.en } },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', siteName: 'FOREACH', url: languages[locale], locale: { es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' }[locale], images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}
export async function getLocalizedApplicationFooter(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, document: ApplicationDocument) {
  const index = getApplicationIndexData(locale).copy;
  if (kind === 'ivd') return { title: ivdUi[locale].contactTitle, description: ivdUi[locale].contactDescription, buttonLabel: ivdUi[locale].contactButton, href: `/${locale}/contact/`, backgroundImage: reviewDomains[kind].image };
  if (isFinalizedEnglishReference(kind, document.slug)) return { title: index.contactHeading, description: index.contactDescription, buttonLabel: index.contactLabel, href: `/${locale}/contact/`, backgroundImage: reviewDomains[kind].image };
  const source = document.slug ? (await getReviewDocument(kind, document.slug))! : getReviewHub(kind);
  const { cta } = translateApplicationEnglish(getReviewFooterPlan(kind, source));
  return translateApplicationCopy(refineEnglishGuideCta(cta, await getCurrentEnglishApplicationDocument(kind, document.slug), kind), await getApplicationTranslationDictionary(locale), locale);
}
const extraProductLabels = {
  es: { rpl: 'RPL Bombas dosificadoras sin válvulas', hp: 'HP Válvulas de inyección de alta presión', mixing: 'Paletas agitadoras a medida', filters: 'Filtros de la serie PE', check: 'Válvulas antirretorno de la serie G' },
  fr: { rpl: 'RPL Pompes doseuses sans clapets', hp: 'HP Vannes d’injection haute pression', mixing: 'Palettes d’agitation sur mesure', filters: 'Filtres de la série PE', check: 'Clapets antiretour de la série G' },
  ko: { rpl: 'RPL 무밸브 정량 펌프', hp: 'HP 고압 주입 밸브', mixing: '맞춤형 교반 패들', filters: 'PE 시리즈 필터', check: 'G 시리즈 체크 밸브' },
  ru: { rpl: 'RPL Бесклапанные дозирующие насосы', hp: 'HP Клапаны ввода пробы высокого давления', mixing: 'Мешалки по индивидуальным требованиям', filters: 'Фильтры серии PE', check: 'Обратные клапаны серии G' },
};
export async function getLocalizedApplicationResources(locale: ApplicationTranslationLocale, kind: EnglishApplicationKind, document: ApplicationDocument): Promise<RelatedResourcesData> {
  const articles = getTechnicalArticlesPageData(locale).articles;
  if (kind === 'analytical-instruments' && isLiquidChromatographySlug(document.slug)) {
    const relations = LC_TASK_RESOURCES[document.slug];
    const original = getLiquidChromatographyResources(document.slug);
    const copy = await getApplicationTranslationDictionary(locale);
    const configurationNote = {
      es: 'Configuración representativa; seleccione la capacidad y los materiales en la página del producto',
      fr: 'Configuration représentative ; choisissez la capacité et les matériaux sur la page du produit',
      ko: '대표 구성 이미지입니다. 용량과 재질은 제품 페이지에서 선택하세요',
      ru: 'Пример конфигурации; выбирайте объём и материалы на странице изделия',
    }[locale];
    return { locale, uiLocale: locale, videos: [],
      products: original.products!.map((card, index) => {
        const product = LC_PRODUCTS[relations.products[index]];
        const title = translateApplicationCopy(product.label, copy, locale);
        return { ...card, title, href: localizeApplicationHref(card.href, locale), imageAlt: `${title} — ${configurationNote}` };
      }),
      articles: original.articles!.map(source => {
        const article = articles.find(article => article.slug === source.slug);
        if (!article) throw new Error(`Missing local LC reading ${locale}/${source.slug}`);
        const { id, slug, title, summary, date, coverImage } = article;
        return { id, slug, title, summary, date, coverImage };
      }),
    };
  }
  if (isFinalizedEnglishReference(kind, document.slug)) return { locale, uiLocale: locale, products: [], articles: [], videos: [] };
  const plan = getReviewFooterPlan(kind, document);
  const slugs = kind === 'ivd' ? [...new Set(getIvdReadingPlan(document).flatMap(reading => reading.slugs))].slice(0, 4) : plan.articles;
  return {
    locale, uiLocale: locale, videos: [],
    products: plan.products.map((key: ReviewProductCardId) => {
      const card = reviewProductCards[key];
      const title = key in extraProductLabels[locale] ? extraProductLabels[locale][key as keyof typeof extraProductLabels.es] : ivdProductLabel(locale, key);
      return { id: `application:${key}`, title, href: localizeApplicationHref(card.href, locale), imageSrc: getIvdRelatedProductCardImage(key), imageAlt: title };
    }),
    articles: slugs.map(slug => {
      const article = articles.find(article => article.slug === slug);
      if (!article) throw new Error(`Missing local application reading ${locale}/${slug}`);
      return { id: article.id, slug, title: article.title, summary: article.summary, date: article.date, coverImage: article.coverImage };
    }),
  };
}
