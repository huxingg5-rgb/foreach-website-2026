import "server-only";

import { localizeItalianRelatedResources } from "@/components/common/related-resources/RelatedResources";
import { getHindiDraftLink } from "@/lib/i18n/draft-languages";
import { getHindiTechnicalArticleEdition, getHindiTechnicalArticleFields } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import { getInstrumentFluidicsArticles } from "@/data/resources/technical-articles/instrument-fluidics-articles.article";
import { germanSamplingProbeSelectionCopy } from "@/data/resources/technical-articles/sampling-probe-selection-locales";
import { getSamplingProbeGuideHref } from "@/data/resources/technical-articles/sampling-probe-guide-links";
import { samplingProbeSelectionSlug } from "@/data/resources/technical-articles/technical-article-availability";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { getSamplingProbeGuideLocale } from "@/services/resources/technical-articles/getSamplingProbeGuideLocale";

export default async function SamplingProbeProductReading({
  product,
  locale,
  germanDraft = false,
  italianDraft = false,
  hindiDraft = false,
}: {
  product: "sampling-probes" | "piercing-probes";
  locale: TechnicalArticleLocale;
  germanDraft?: boolean;
  italianDraft?: boolean;
  hindiDraft?: boolean;
}) {
  const article = getInstrumentFluidicsArticles(locale).find(({ slug }) => slug === samplingProbeSelectionSlug);
  if (!article) return null;

  const language = germanDraft ? "de" : italianDraft || hindiDraft ? "en" : await getSamplingProbeGuideLocale(locale);
  const german = language === "de" ? germanSamplingProbeSelectionCopy : undefined;
  const href = getSamplingProbeGuideHref(language, product === "piercing-probes" ? "tip-geometry" : undefined);
  const card = {
    id: article.id,
    slug: article.slug,
    title: german?.metadata.title ?? article.title,
    summary: german?.deck ?? article.summary,
    date: article.date,
    coverImage: article.coverImage,
    href,
    ...(german ? { contentLanguage: "de" as const, destinationLanguage: "de" as const } : {}),
  };

  if (hindiDraft) {
    const destination = getHindiDraftLink(href);
    const edition = destination.hrefLang === "hi" ? getHindiTechnicalArticleEdition(article.slug) : undefined;
    const copy = edition ? getHindiTechnicalArticleFields(edition) : {
      title: "सैंपलिंग प्रोब कैसे चुनें: व्यास, कार्यशील लंबाई, नोक और साइड पोर्ट",
      summary: "भीतरी व्यास प्रवाह प्रतिरोध और अंदर का आयतन तय करता है। बाहरी व्यास प्रोब के लिए जगह और कठोरता को प्रभावित करता है। कार्यशील लंबाई न्यूनतम द्रव स्तर तक पहुँच और तली से दूरी तय करती है। नोक और साइड पोर्ट का असर इनलेट बंद होने, रुकावट और तली के पास द्रव खींचने के बाद बचे द्रव पर पड़ता है। चारों फैसले जुड़े हुए हैं। लक्ष्य मात्रा, कंटेनर और गति के क्रम से शुरू करके चारों माप तय करें। एक माप पर अलग से ध्यान देने से समस्या दूसरी जगह जा सकती है।",
    };
    return <RelatedResourcesLoader locale={locale} uiLocale="hi" articles={[{
      ...card, title: copy.title, summary: copy.summary, href: destination.href,
      contentLanguage: "hi", destinationLanguage: destination.hrefLang,
    }]} products={[]} videos={[]} />;
  }
  if (italianDraft) {
    const related = localizeItalianRelatedResources({ locale, articles: [card], products: [], videos: [] });
    const preview = related.articles[0];
    if (preview?.contentLanguage === "en") {
      related.articles = [{
        ...preview,
        title: "Come scegliere una sonda di campionamento: diametri, lunghezza utile, punta e aperture laterali",
        summary: "Il diametro interno determina perdita di carico e volume interno. Il diametro esterno incide su ingombro e rigidità della sonda. La lunghezza utile determina l’accesso al livello minimo del liquido e la distanza dal fondo. Punta e aperture laterali incidono sul rischio di sigillare o ostruire l’ingresso o di lasciare liquido residuo durante l’aspirazione vicino al fondo. Le quattro scelte sono collegate. Partite da volume previsto, recipiente e sequenza dei movimenti, quindi definite i quattro gruppi di quote. Valutare una misura isolatamente può spostare il problema altrove.",
        contentLanguage: "it",
      }];
    }
    return <RelatedResourcesLoader {...related} />;
  }
  return <RelatedResourcesLoader locale={locale} uiLocale={language} articles={[card]} products={[]} videos={[]} />;
}
