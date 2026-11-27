import type { ReactNode } from "react";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import { getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { getLocalizedInternalHref } from "@/lib/seo/site-url";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import newsStyles from "@/components/resources/news/NewsArticleClient.module.css";
import RplSelectionArticle, { type RplArticleSectionNavigationItem } from "./RplSelectionArticle";
import rplStyles from "./RplSelectionArticle.module.css";
import PipettingBasicsLead from "./PipettingBasicsLead";
import FemaleThreadOverviewVideo from "./FemaleThreadOverviewVideo";
import TubingAssemblyArticleConfigurator from "./TubingAssemblyArticleConfigurator";
import { tubingAssemblyConfiguratorSlug } from "@/data/resources/technical-articles/technical-article-availability";
import pipettingStyles from "./PipettingBasicsLead.module.css";
import fittingStyles from "./HardTubeFittingsArticle.module.css";
import valveStyles from "./ValveEngineeringArticle.module.css";
import type { PipettingBasicsWorkflow } from "@/data/resources/technical-articles/what-is-pipetting.article";

type LocalizedSpecializedSelectionArticleProps = {
  locale?: "it" | "hi";
  article: { slug: string; date: string };
  copy: DiaphragmPumpEngineeringArticleCopy;
  navigation?: readonly RplArticleSectionNavigationItem[];
  family?: "instrument" | "tubing" | "valve";
  workflows?: readonly PipettingBasicsWorkflow[];
  modelLinks?: readonly { name: string; href: string }[];
  breadcrumb: ReactNode;
  structuredData: object;
  relatedProducts?: ReactNode;
  footer?: ReactNode;
  pager?: ReactNode;
  footerIntro?: string;
};

const fittingArticles = new Set([
  "what-is-a-barbed-fitting", "what-is-a-luer-fitting", "what-is-a-ferrule-fitting",
  "what-is-a-compression-ring-fitting", "flanged-tubing-assemblies-selection-guide",
  "hard-tube-fittings-selection-guide", "barbed-fitting-expansion-ratio",
  "what-is-a-quick-disconnect-fitting", "threaded-hose-barb-fittings-selection-guide",
  "fitting-material-selection-guide", "female-thread-adapters-selection-guide",
  "what-is-a-bulkhead-barbed-fitting",
]);

export function isSpecializedFittingArticle(slug: string) {
  return fittingArticles.has(slug);
}

function localizedArticleLink(href: string, label: string, locale: "it" | "hi") {
  const prefix = "/" + locale;
  const getDraftLink = locale === "hi" ? getHindiDraftLink : getItalianDraftLink;
  const fallbackSuffix = locale === "hi" ? hindiEnglishFallbackSuffix : italianEnglishFallbackSuffix;
  const destination = href === prefix || href.startsWith(prefix + "/")
    ? { href, hrefLang: locale }
    : getDraftLink(getLocalizedInternalHref(href, "en"));
  return {
    href: destination.href,
    hrefLang: destination.hrefLang,
    label: label + (destination.hrefLang === "en" && !label.endsWith(fallbackSuffix)
      ? fallbackSuffix : ""),
  };
}

export default function LocalizedSpecializedSelectionArticle({
  locale = "it", article, copy: source, navigation, family, workflows, modelLinks = [], breadcrumb,
  structuredData, relatedProducts, footer, pager, footerIntro,
}: LocalizedSpecializedSelectionArticleProps) {
  const isHindi = locale === "hi";
  const localizeLink = (href: string, label: string) => localizedArticleLink(href, label, locale);
  const fitting = isSpecializedFittingArticle(article.slug);
  const tubing = family === "tubing" || family === "instrument";
  const articleStyle = workflows ? pipettingStyles.article
    : family === "valve" ? valveStyles.article
    : fitting || tubing ? fittingStyles.article : undefined;
  const modelDestinations = new Map(modelLinks.map(({ name, href }) => [name, localizeLink(href, name)]));
  const resolveBlock = (block: EngineeringArticleBlock): EngineeringArticleBlock => {
    switch (block.type) {
      case "links":
        return { ...block, items: block.items.map(link => ({ ...link, ...localizeLink(link.href, link.label) })) };
      case "figure": {
        const caption = block.captionHref ? localizeLink(block.captionHref, block.caption) : undefined;
        return {
          ...block,
          ...(caption ? { captionHref: caption.href, captionHrefLang: caption.hrefLang, caption: caption.label } : {}),
          ...(block.link ? { link: { ...block.link, ...localizeLink(block.link.href, block.link.label) } } : {}),
        };
      }
      case "table":
        return modelDestinations.size ? {
          ...block,
          headers: block.headers.map(header => modelDestinations.get(header)?.label ?? header),
        } : block;
      default:
        return block;
    }
  };
  const copy = {
    ...source,
    leadBlocks: source.leadBlocks.map(resolveBlock),
    sections: source.sections.map(section => ({ ...section, blocks: section.blocks.map(resolveBlock) })),
  };
  const products = localizeLink(copy.cta.productsHref || "/products/", copy.cta.productsLabel);
  const contact = isHindi ? localizeLink("/en/contact/", copy.cta.contactLabel) : { label: copy.cta.contactLabel, href: "/it/contact/" };

  return (
    <div className={"newsArticleDetailPage " + rplStyles.pageSurface} data-locale={locale} data-article-slug={article.slug} lang={isHindi ? "hi-IN" : "it"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="newsArticleBreadcrumbShell">{breadcrumb}</div>
      <RplSelectionArticle
        copy={copy}
        date={article.date}
        locale={locale}
        listHref={`/${locale}/resources/technical-articles/`}
        backText={isHindi ? "वापस" : "Indietro"}
        articleId={article.slug}
        sectionNavigation={navigation}
        modelLinks={new Map([...modelDestinations.values()].map(link => [link.label, link.href]))}
        relatedProducts={relatedProducts}
        className={articleStyle}
        leadContent={workflows ? <PipettingBasicsLead blocks={copy.leadBlocks} workflows={workflows} /> : undefined}
        afterLeadContent={article.slug === tubingAssemblyConfiguratorSlug
          ? <TubingAssemblyArticleConfigurator key={locale} locale={locale} />
          : article.slug === "female-thread-adapters-selection-guide" ? <FemaleThreadOverviewVideo locale={locale} /> : undefined}
        faq={copy.faqItems.length && !workflows ? { id: "faq", label: copy.faqTitle, items: copy.faqItems } : undefined}
      />
      <div className={newsStyles.page} data-rpl-article-footer>
        {tubing ? <div>{footer}</div> : fitting ? (
          <div className={footerIntro ? undefined : fittingStyles.relatedProducts}
            data-flanged-related-products={Boolean(footerIntro) || undefined}>
            {footerIntro ? <p className={fittingStyles.relatedIntro}>{footerIntro}</p> : null}
            {footer}
          </div>
        ) : footer}
        {pager}
        {(fitting || tubing) && (
          <section className={newsStyles.supportSection}>
            <ResourceSupportCta title={copy.cta.title} description={copy.cta.description}
              buttonText={contact.label} href={contact.href}
              actions={[contact, products]} />
          </section>
        )}
      </div>
    </div>
  );
}
