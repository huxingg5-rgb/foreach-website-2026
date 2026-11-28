import Link from "next/link";
import { getBarbedFittingRelatedProducts } from "@/data/resources/technical-articles/what-is-a-barbed-fitting.zh";
import { getFittingAssemblyLinks, withFittingArticleLinks } from "@/data/resources/technical-articles/fitting-article-relations";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getInstrumentFluidicsArticle } from "@/data/resources/technical-articles/instrument-fluidics-articles.article";
import { getPumpDiagnosticsArticleCopy } from "@/data/resources/technical-articles/pump-diagnostics-articles.article";
import { getPumpApplicationChildArticles, isPumpApplicationArticleSlug } from "@/data/resources/technical-articles/pump-application-articles.article";
import { PISTON_APPLICATION_GUIDES } from "@/data/applications/analytical-documents/piston-link-network";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import { localizeHindiRelatedVideos } from "@/components/common/related-resources/RelatedResources";
import RelatedProducts from "@/components/common/related-resources/RelatedProducts";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import { getHindiDraftLink, hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { getArticleFooterResources } from "@/services/resources/technical-articles/getArticleFooterResources";
import { getArticleRelatedProducts } from "@/services/resources/technical-articles/getArticleRelatedProducts";
import type { HindiTechnicalArticleEdition, HindiTechnicalArticlesPageData } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import type { ClassifiedTechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";
import type { TechnicalArticlePagerItem } from "@/services/resources/technical-articles/getTechnicalArticleData";
import { Dpgl800ArticleContent, Dpl30hArticleContent, StandardDiaphragmArticleContent } from "./articles/Dpl30LiquidDiaphragmPumpArticle";
import CvKvMicrofluidicsArticle from "./articles/CvKvMicrofluidicsArticle";
import BrushlessDiaphragmPumpWiringArticle from "./articles/BrushlessDiaphragmPumpWiringArticle";
import PistonPumpLocalizedArticle from "./articles/PistonPumpLocalizedArticle";
import SpecializedSelectionArticle, { isSpecializedFittingArticle } from "./articles/ItalianSpecializedSelectionArticle";
import { NewsArticlePager } from "@/components/resources/news/NewsArticleClient";
import ArticleRelatedProducts from "./ArticleRelatedProducts";
import { EngineeringArticleContent } from "./articles/DiaphragmPumpEngineeringArticle";
import LegacyTechnicalArticleLayout from "./articles/LegacyTechnicalArticleLayout";
import rplArticleStyles from "./articles/RplSelectionArticle.module.css";

const pistonApplicationGuideLabels = [
  "पिस्टन पंप के उपयोग का परिचय",
  "नमूने का एस्पिरेशन और स्थानांतरण",
  "अभिकर्मक और मानक घोल की डिस्पेंसिंग",
  "तनुकरण, ज्ञात मात्रा मिलाना और अनुपात तय करना",
  "चरणों में टाइट्रेंट की डोज़िंग",
] as const;

const listHref = "/hi/resources/technical-articles/";
const ctaLink = (href: string, label: string) => {
  const link = getHindiDraftLink(href);
  return { href: link.href, label: label + (link.hrefLang === "en" ? hindiEnglishFallbackSuffix : "") };
};

const articleProductTerms = [
  [/\bBrushless\b/gi, "ब्रशलेस"],
  [/\bBrushed\b/gi, "ब्रश वाला"],
  [/\bHigh[- ]Pressure\b/gi, "उच्च-दाब"],
  [/\b(?:Miniature|Micro)\b/gi, "लघु"],
  [/\bLiquid Diaphragm Pump\b/gi, "द्रव डायाफ्राम पंप"],
  [/\bGas[-– ]Liquid Diaphragm Pump\b/gi, "गैस और गैस-द्रव मिश्रण का डायाफ्राम पंप"],
  [/\bDiaphragm Pumps?\b/gi, "डायाफ्राम पंप"],
  [/\bCustom Sampling Probes\b/gi, "कस्टम सैंपलिंग प्रोब"],
  [/\bCustom Piercing Probes\b/gi, "कस्टम पियर्सिंग प्रोब"],
  [/\bProgrammable Pipetting Module\b/gi, "प्रोग्राम योग्य पाइपेटिंग मॉड्यूल"],
  [/\bProgrammable Syringe Pump\b/gi, "प्रोग्राम योग्य सिरिंज पंप"],
  [/\bPipetting Pumps?\b/gi, "पाइपेटिंग पंप"],
  [/\bSyringe Pumps?\b/gi, "सिरिंज पंप"],
  [/\bSV10 Series Solenoid Valve\b/gi, "SV10 श्रृंखला का सोलनॉइड वाल्व"],
  [/\bABD Air Bubble Detector\b/gi, "ABD हवा के बुलबुले का डिटेक्टर"],
] as const;

function localizeProduct<T extends { id: string; href: string; title: string; imageSrc: string; imageAlt: string }>(
  item: T, assemblies?: ReturnType<typeof getTubingAssemblySelectionContent>,
) {
  const destination = getHindiDraftLink(item.href);
  const assembly = assemblies?.cards.find(card => card.detailHref === item.href || card.detailHref === destination.href);
  const title = assembly?.cardTitle ?? articleProductTerms.reduce((result, [pattern, value]) => result.replace(pattern, value), item.title)
    .replace(/^(.+) for OEM Instruments$/i, "OEM उपकरणों के लिए $1");
  const translatedAlt = articleProductTerms.reduce((result, [pattern, value]) => result.replace(pattern, value), item.imageAlt)
    .replace(/\bproduct photo\b/i, "का फ़ोटो");
  const assemblyAlt = assembly?.imageCard === item.imageSrc ? assembly.imageAlt : undefined;
  return { ...item, title, imageAlt: assemblyAlt ?? (title !== item.title ? title : translatedAlt), href: destination.href, destinationLanguage: destination.hrefLang };
}

export default function HindiEngineeringArticleDetail({
  article, edition, pageData, previousArticle, nextArticle, structuredData,
}: {
  article: ClassifiedTechnicalArticleItem;
  edition: HindiTechnicalArticleEdition;
  pageData: HindiTechnicalArticlesPageData;
  previousArticle: TechnicalArticlePagerItem | null;
  nextArticle: TechnicalArticlePagerItem | null;
  structuredData: object;
}) {
  const selection = edition.kind === "selection" ? edition : undefined;
  const breadcrumbs = pageData.breadcrumbs.map(item => item.href ? item : { ...item, href: listHref });
  const baseline = getArticleFooterResources(article, "en");
  const articles = new Map(pageData.articles.map(item => [item.slug, item]));
  let assemblyContent: ReturnType<typeof getTubingAssemblySelectionContent> | undefined;
  const getAssemblies = () => (assemblyContent ??= getTubingAssemblySelectionContent("hi"));
  const localizeCard = (item: Parameters<typeof localizeProduct>[0]) =>
    localizeProduct(item, item.href.includes("/products/tubing-assemblies/") ? getAssemblies() : undefined);
  const barbed = article.slug === "what-is-a-barbed-fitting";
  const luer = article.slug === "what-is-a-luer-fitting";
  const sidebarSource = selection?.sidebarProducts ?? (selection?.family === "instrument" ? getInstrumentFluidicsArticle(article.slug, "en")?.sidebarProducts : undefined)
    ?? (barbed ? getBarbedFittingRelatedProducts("en").products : getArticleRelatedProducts(article, "en"));
  const sidebar = sidebarSource.map(item => {
    const titles = selection?.copy.relatedProductTitles;
    const title = item.id === "barbed-equal-tee-pa" ? titles?.tee : item.id === "barbed-equal-elbow-pa" ? titles?.elbow : undefined;
    if (title) return localizeCard({ ...item, title, imageAlt: "FOREACH " + title });
    if (!luer) return localizeCard(item);
    const imageAlt = item.title === "LPS-32-PP-U" ? "बीच में नीली लॉकिंग रिंग के साथ रंगीन ल्यूअर फिटिंग"
      : "पीली घूमती लॉकिंग रिंग और अनुभाग दृश्य के साथ LPR-32-PP-Y मेल ल्यूअर";
    return localizeCard({ ...item, imageAlt });
  });
  const related = {
    ...baseline,
    uiLocale: "hi" as const,
    videoLocale: "hi" as const,
    videoLibraryHref: getHindiDraftLink("/en/resources/installation-guide/").href,
    videos: localizeHindiRelatedVideos(baseline.videos),
    products: (selection?.footerProducts ?? baseline.products).map(item => {
      const label = selection?.copy.relatedProductLabel;
      return localizeCard(label ? { ...item, imageAlt: `FOREACH ${item.title} ${label}` } : item);
    }),
    articles: baseline.articles.map(item => {
      const target = articles.get(item.slug);
      const href = getHindiDraftLink("/en/resources/technical-articles/" + item.slug + "/");
      const native = target && href.hrefLang === "hi";
      return {
        ...item, ...(native ? { title: target.title, summary: target.summary } : {}),
        href: href.href, destinationLanguage: href.hrefLang,
        contentLanguage: native ? "hi" as const : "en" as const,
      };
    }),
  };
  const breadcrumb = <SiteBreadcrumb items={breadcrumbs} ariaLabel="पेज का नेविगेशन पथ" />;
  const representative = ["what-is-a-bulkhead-barbed-fitting", "female-thread-adapters-selection-guide"].includes(article.slug);
  const relatedProducts = sidebar.length ? <ArticleRelatedProducts products={sidebar} locale="hi" title={representative ? "प्रतिनिधि मॉडल" : undefined} /> : null;
  const productFooter = selection?.family === "tubing" || selection?.family === "instrument" || article.slug === "what-is-a-solenoid-valve";
  const footer = productFooter ? (
    <>
      <RelatedProducts locale={related.locale} uiLocale={related.uiLocale} products={related.products} />
      {related.videos.length > 0 && <RelatedResourcesLoader {...related} products={[]} articles={[]} />}
    </>
  ) : <RelatedResourcesLoader {...related} />;
  if (selection) {
    const copy = isSpecializedFittingArticle(article.slug)
      ? withFittingArticleLinks(selection.copy, article.slug, "en", selection.navigation ?? [], pageData.articles,
          getFittingAssemblyLinks(article.slug, getAssemblies())) : selection.copy;
    return (
    <SpecializedSelectionArticle article={article} locale="hi" copy={copy} navigation={selection.navigation} family={selection.family}
      workflows={selection.workflows} footerIntro={selection.footerIntro} modelLinks={selection.modelLinks} breadcrumb={breadcrumb} structuredData={structuredData}
      relatedProducts={relatedProducts} footer={footer}
      pager={<NewsArticlePager locale="hi" contentType="article" previousArticle={previousArticle} nextArticle={nextArticle} />} />
    );
  }
  const dedicatedPump = edition.kind === "dpgl800" || edition.kind === "dpl30h" || edition.kind === "standard-diaphragm";
  const isPumpApplicationGuide = isPumpApplicationArticleSlug(article.slug);
  const applicationGuides = getPumpApplicationChildArticles(article.slug, "en");
  const showSummary = edition.kind === "cv-kv" || edition.kind === "brushless-wiring"
    || (edition.kind === "engineering" && !isPumpApplicationGuide && !getPumpDiagnosticsArticleCopy(article.slug, "en"));
  const productPath = edition.kind === "piston" ? "/products/pumps/piston-pump/"
    : edition.kind === "engineering" ? edition.copy.cta.productsHref ?? "/products/" : "/products/";
  const cta = dedicatedPump || edition.kind === "cv-kv" ? undefined : edition.copy.cta;
  return (
    <div className={"newsArticleDetailPage " + rplArticleStyles.pageSurface} data-locale="hi" data-article-slug={article.slug} lang="hi-IN">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="newsArticleBreadcrumbShell">{breadcrumb}</div>
      <LegacyTechnicalArticleLayout
        articleId={article.slug}
        locale="hi"
        article={{ title: article.title, date: article.date,
          summary: showSummary ? article.summary : undefined,
          coverImage: dedicatedPump || isPumpApplicationGuide || edition.kind === "cv-kv" ? article.coverImage : undefined,
          coverAlt: article.coverAlt,
        }}
        pageData={{
          listHref,
          backText: "वापस",
          bottomBanner: cta ? {
            title: cta.title,
            description: cta.description,
            actions: [
              ctaLink("/en/contact/", cta.contactLabel),
              ctaLink("/en" + productPath, cta.productsLabel),
            ],
          } : pageData.bottomBanner,
        }}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
        relatedProducts={relatedProducts}
        afterContent={footer}
      >
        {edition.kind === "piston" ? <PistonPumpLocalizedArticle copy={edition.copy} locale="hi" />
          : edition.kind === "dpgl800" ? <Dpgl800ArticleContent copy={edition.copy} localePrefix="/hi" />
          : edition.kind === "dpl30h" ? <Dpl30hArticleContent copy={edition.copy} localePrefix="/hi" />
          : edition.kind === "standard-diaphragm" ? <StandardDiaphragmArticleContent copy={edition.copy} faqCopy={edition.faq} dpl60Copy={edition.dpl60Copy} localePrefix="/hi" />
          : edition.kind === "brushless-wiring" ? <BrushlessDiaphragmPumpWiringArticle copy={edition.copy} locale="hi" />
          : edition.kind === "cv-kv" ? <CvKvMicrofluidicsArticle locale="hi" />
          : <EngineeringArticleContent copy={edition.copy} locale="hi" />}
        {applicationGuides.length > 0 ? (
          <section className="technicalArticleClusterLinks">
            <h2>संबंधित अनुप्रयोग मार्गदर्शिकाएँ</h2>
            <ul>
              {applicationGuides.map(child => {
                const destination = getHindiDraftLink("/en/resources/technical-articles/" + child.slug + "/");
                const title = articles.get(child.slug)?.title ?? child.title;
                return <li key={child.slug}><Link href={destination.href} hrefLang={destination.hrefLang}>
                  {title}{destination.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""}
                </Link></li>;
              })}
            </ul>
          </section>
        ) : null}
        {article.secondaryCategory === "plunger-pumps" ? (
          <section className="technicalArticleClusterLinks" data-piston-application-guide-links="true">
            <h2>विश्लेषणात्मक उपकरणों के लिए संबंधित उपयोग गाइड</h2>
            <ul>
              {PISTON_APPLICATION_GUIDES.map((guide, index) => {
                const destination = getHindiDraftLink(guide.href);
                return <li key={guide.href}><Link href={destination.href} hrefLang={destination.hrefLang}>
                  {pistonApplicationGuideLabels[index]}{destination.hrefLang === "en" ? hindiEnglishFallbackSuffix : null}
                </Link></li>;
              })}
            </ul>
          </section>
        ) : null}
      </LegacyTechnicalArticleLayout>
    </div>
  );
}
