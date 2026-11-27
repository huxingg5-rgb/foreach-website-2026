import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import type { TubingAssemblyType } from "@/data/products/tubing-assemblies.en";
import type { TubingAssemblyDetailLocale } from "@/data/products/tubing-assemblies/locales";
import { selectFittingArticleCards, tubingAssemblyArticleSlugs } from "@/data/resources/technical-articles/fitting-article-relations";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

import { getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getItalianArticleFields, getItalianTechnicalArticleEdition } from "@/services/resources/technical-articles/getItalianTechnicalArticlesPageData";
import { getHindiTechnicalArticleEdition, getHindiTechnicalArticleFields } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import { getGermanRelatedArticles } from "@/services/resources/technical-articles/getGermanRelatedArticles";

const hindiCardCopy: Readonly<Record<string, { title: string; summary: string }>> = {
  "hard-tube-fittings-selection-guide": {
    title: "माइक्रोफ्लुइडिक कड़ी ट्यूब फिटिंग का चयन: फ्लैंज, फेरूल और स्नैप रिंग वाले कनेक्शन",
    summary: "पहले पोर्ट की बनावट, ट्यूब का बाहरी व्यास और द्रव जाँचें। फिर दबाव, रखरखाव की आवृत्ति और ट्यूब के सिरे की तैयारी देखें। फ्लैंज वाली फिटिंग ट्यूब के फ्लैंज को सपाट सीलिंग सतह पर दबाती है। फिटिंग कसने पर फेरूल ट्यूब को पकड़ता है। स्नैप रिंग की बनावट में स्लीव और सीलिंग रिंग होती है। केवल थ्रेड और ट्यूब के व्यास मिलने से संगतता पक्की नहीं होती।",
  },
  "flanged-tubing-assemblies-selection-guide": {
    title: "फ्लैंज वाली ट्यूब असेंबली का चयन: सीलिंग, पोर्ट का मिलान और इंस्टॉलेशन के बाद सत्यापन",
    summary: "ट्यूब की सामग्री, भीतरी और बाहरी व्यास, दोनों सिरों की फिटिंग, बैकिंग वॉशर, पोर्ट की बनावट और इंस्टॉलेशन के माप साथ में चुनें। जाँचें कि फ्लैंज सपाट-तली पोर्ट की सतह पर सही तरह दबता है। फिर स्टॉपर, लेबल और इंस्टॉलेशन के बाद के सत्यापन की शर्तें तय करें।",
  },
  "tubing-assembly-configurator-guide": {
    title: "उपकरण की ट्यूब असेंबली कैसे कॉन्फ़िगर करें और 2D ड्रॉइंग कैसे बनाएँ",
    summary: "ऑनलाइन ट्यूब, तैयार लंबाई और सिरों की फिटिंग कॉन्फ़िगर करें। फिर माप और सामग्री सूची के साथ 2D ड्रॉइंग बनाएँ। FEP के उदाहरण में दोनों सिरों पर अलग-अलग थ्रेड हैं।",
  },
  "what-is-a-compression-ring-fitting": {
    title: "कम्प्रेशन रिंग वाली फिटिंग क्या है?",
    summary: "कम्प्रेशन रिंग वाली फिटिंग में थ्रेड वाला नट, कम्प्रेशन रिंग और सीलिंग फेरूल होता है। ट्यूब पर पहले से फ्लैंज बनाने की ज़रूरत नहीं है। FOREACH HSF6 और CL-1S के उदाहरण के साथ M6×1 और 1/4-28 UNF पोर्ट, 1.6 से 3.2 mm बाहरी व्यास, PPS या PEEK नट, स्टेनलेस स्टील रिंग और PEEK फेरूल देखें। शुरुआती असेंबली, इंस्टॉलेशन और दोबारा जोड़ने का तरीका भी बताया गया है।",
  },
  "what-is-a-ferrule-fitting": {
    title: "फेरूल वाली फिटिंग क्या है?",
    summary: "बिना फ्लैंज की फिटिंग में थ्रेड वाला नट कड़ी ट्यूब के चारों ओर फेरूल को दबाता है। ट्यूब पर पहले से फ्लैंज बनाने की ज़रूरत नहीं है। FOREACH HN, HN6, HNF और HNF6, 1.6, 2.0, 2.5, 3.0 और 3.2 mm बाहरी व्यास, M6×1 और 1/4-28 UNF थ्रेड और नट की कई सामग्रियों में उपलब्ध हैं। इस्तेमाल में विश्लेषण उपकरणों और लैब ऑटोमेशन में रिएजेंट भेजना, नमूना संभालना और धुलाई की लाइनें शामिल हैं।",
  },
};

export default function TubingAssemblyRelatedArticles({ type, locale }: {
  type?: TubingAssemblyType["id"];
  locale: TubingAssemblyDetailLocale;
}) {
  const slugs = type ? tubingAssemblyArticleSlugs[type] : Object.values(tubingAssemblyArticleSlugs).flat();
  const sourceLocale = locale === "de" || locale === "it" || locale === "hi" ? "en" : locale;
  const source = selectFittingArticleCards(getTechnicalArticlesPageData(sourceLocale).articles, slugs);
  const articles = locale === "de" ? getGermanRelatedArticles(source) : locale === "it" ? source.map(article => {
    const link = getItalianDraftLink(article.href ?? `/en/resources/technical-articles/${article.slug}/`);
    const edition = link.hrefLang === "it" ? getItalianTechnicalArticleEdition(article.slug) : undefined;
    const copy = edition ? getItalianArticleFields(edition) : undefined;
    return { ...article, ...(copy ? { title: copy.title, summary: copy.summary } : {}), href: link.href,
      contentLanguage: copy ? "it" as const : "en" as const, destinationLanguage: link.hrefLang };
  }) : locale === "hi" ? source.map(article => {
    const link = getHindiDraftLink(article.href ?? `/en/resources/technical-articles/${article.slug}/`);
    const edition = link.hrefLang === "hi" ? getHindiTechnicalArticleEdition(article.slug) : undefined;
    const copy = edition ? getHindiTechnicalArticleFields(edition) : hindiCardCopy[article.slug];
    return { ...article, ...(copy ? { title: copy.title, summary: copy.summary } : {}), href: link.href,
      contentLanguage: copy ? "hi" as const : "en" as const, destinationLanguage: link.hrefLang };
  }) : source;
  return articles.length ? <RelatedResourcesLoader locale={sourceLocale} uiLocale={locale === "de" || locale === "it" || locale === "hi" ? locale : undefined} articles={articles} products={[]} videos={[]} /> : null;
}
