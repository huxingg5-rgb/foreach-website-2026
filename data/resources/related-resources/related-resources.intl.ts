import { normalizeRelationKey } from "@/lib/related-resources";

export type RelatedResourcesLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

export type RelatedResourcesUiLocale = RelatedResourcesLocale | "de" | "it" | "hi";

export type RelatedResourcesText = {
  previous: string;
  next: string;
  relatedVideos: string;
  relatedProducts: string;
  relatedArticles: string;
  viewAll: string;
  viewDetails: string;
  activeSeriesFilter: string;
  clearSeriesFilter: string;
  category: string;
  defaultVideoDescription: string;
  defaultProductDescription: string;
  defaultArticleDescription: string;
};

export const relatedResourcesText: Record<
  RelatedResourcesLocale,
  RelatedResourcesText
> = {
  "zh-CN": {
    previous: "上一项",
    next: "下一项",
    relatedVideos: "相关视频",
    relatedProducts: "相关产品",
    relatedArticles: "相关技术文章",
    viewAll: "查看更多",
    viewDetails: "查看详情",
    activeSeriesFilter: "已按当前产品系列筛选教程",
    clearSeriesFilter: "清除系列筛选",
    category: "分类：",
    defaultVideoDescription: "查看与当前内容相关的安装、选型与应用教程。",
    defaultProductDescription: "查看与当前内容属于同一系列的产品。",
    defaultArticleDescription: "继续阅读与当前产品系列相关的技术文章。",
  },
  en: {
    previous: "previous",
    next: "next",
    relatedVideos: "Related Videos",
    relatedProducts: "Related Products",
    relatedArticles: "Related Technical Articles",
    viewAll: "View more",
    viewDetails: "View Details",
    activeSeriesFilter: "Guides are filtered by the current product series",
    clearSeriesFilter: "Clear Series Filter",
    category: "Category:",
    defaultVideoDescription: "Explore related installation, selection, and application guides.",
    defaultProductDescription: "Explore products from the same series.",
    defaultArticleDescription: "Read technical articles related to this product series.",
  },
  es: {
    previous: "anterior",
    next: "siguiente",
    relatedVideos: "Vídeos relacionados",
    relatedProducts: "Productos relacionados",
    relatedArticles: "Artículos técnicos relacionados",
    viewAll: "Ver más",
    viewDetails: "Ver detalles",
    activeSeriesFilter: "Las guías están filtradas por la serie actual",
    clearSeriesFilter: "Quitar filtro de serie",
    category: "Categoría:",
    defaultVideoDescription: "Consulte guías relacionadas de instalación, selección y aplicación.",
    defaultProductDescription: "Consulte productos de la misma serie.",
    defaultArticleDescription: "Lea artículos técnicos relacionados con esta serie.",
  },
  fr: {
    previous: "précédent",
    next: "suivant",
    relatedVideos: "Vidéos associées",
    relatedProducts: "Produits associés",
    relatedArticles: "Articles techniques associés",
    viewAll: "Voir plus",
    viewDetails: "Voir les détails",
    activeSeriesFilter: "Les guides sont filtrés selon la série actuelle",
    clearSeriesFilter: "Effacer le filtre de série",
    category: "Catégorie :",
    defaultVideoDescription: "Consultez les guides associés d’installation, de sélection et d’application.",
    defaultProductDescription: "Consultez les produits de la même série.",
    defaultArticleDescription: "Lisez les articles techniques associés à cette série.",
  },
  ko: {
    previous: "이전",
    next: "다음",
    relatedVideos: "관련 동영상",
    relatedProducts: "관련 제품",
    relatedArticles: "관련 기술 자료",
    viewAll: "더 보기",
    viewDetails: "상세 보기",
    activeSeriesFilter: "현재 제품 시리즈로 가이드가 필터링되었습니다",
    clearSeriesFilter: "시리즈 필터 해제",
    category: "분류:",
    defaultVideoDescription: "관련 설치, 선정 및 적용 가이드를 확인하세요.",
    defaultProductDescription: "동일한 시리즈의 제품을 확인하세요.",
    defaultArticleDescription: "이 제품 시리즈와 관련된 기술 자료를 읽어보세요.",
  },
  ru: {
    previous: "предыдущий",
    next: "следующий",
    relatedVideos: "Связанные видео",
    relatedProducts: "Связанные продукты",
    relatedArticles: "Связанные технические статьи",
    viewAll: "Подробнее",
    viewDetails: "Подробнее",
    activeSeriesFilter: "Инструкции отфильтрованы по текущей серии",
    clearSeriesFilter: "Сбросить фильтр серии",
    category: "Категория:",
    defaultVideoDescription: "Посмотрите связанные инструкции по монтажу, подбору и применению.",
    defaultProductDescription: "Посмотрите продукты той же серии.",
    defaultArticleDescription: "Прочитайте технические статьи, связанные с этой серией.",
  },
};

type DescriptionOverride = {
  articleVideos?: string;
  articleProducts?: string;
  productVideos?: string;
  productArticles?: string;
};

const relationDescriptionOverrides: Record<
  string,
  Partial<Record<RelatedResourcesLocale, DescriptionOverride>>
> = {
  "series:dpl30": {
    "zh-CN": {
      articleVideos:
        "通过安装、选型及有刷与无刷版本对比，进一步了解DPL30系列液体隔膜泵。",
      articleProducts:
        "根据设备运行时间、寿命及控制需求，选择适合的DPL30液体隔膜泵。",
      productVideos:
        "通过安装、选型及有刷与无刷版本对比，进一步了解DPL30系列液体隔膜泵。",
      productArticles:
        "阅读DPL30工作原理、技术参数与型号选型指南。",
    },
  },
};

const germanRelatedResourcesText: RelatedResourcesText = {
  previous: "Zurück",
  next: "Weiter",
  relatedVideos: "Ähnliche Videos",
  relatedProducts: "Ähnliche Produkte",
  relatedArticles: "Fachartikel auf Englisch",
  viewAll: "Mehr anzeigen",
  viewDetails: "Artikel auf Englisch lesen",
  activeSeriesFilter: "Anleitungen für diese Baureihe",
  clearSeriesFilter: "Baureihenfilter zurücksetzen",
  category: "Kategorie:",
  defaultVideoDescription: "Weitere Anleitungen zu Montage, Auswahl und Anwendung.",
  defaultProductDescription: "Produkte aus derselben Baureihe.",
  defaultArticleDescription: "Fachartikel zu dieser Baureihe.",
};

const italianRelatedResourcesText: RelatedResourcesText = {
  previous: "Precedente",
  next: "Successivo",
  relatedVideos: "Video correlati",
  relatedProducts: "Prodotti correlati",
  relatedArticles: "Articoli tecnici correlati",
  viewAll: "Vedi tutti",
  viewDetails: "Vedi dettagli",
  activeSeriesFilter: "Guide filtrate per la serie corrente",
  clearSeriesFilter: "Rimuovi il filtro per serie",
  category: "Categoria:",
  defaultVideoDescription: "Consulta le guide di installazione, selezione e applicazione correlate.",
  defaultProductDescription: "Esplora i prodotti della stessa serie.",
  defaultArticleDescription: "Leggi gli articoli tecnici relativi a questa serie.",
};

const hindiRelatedResourcesText: RelatedResourcesText = {
  previous: "पिछला",
  next: "अगला",
  relatedVideos: "संबंधित वीडियो",
  relatedProducts: "संबंधित उत्पाद",
  relatedArticles: "संबंधित तकनीकी लेख",
  viewAll: "सभी देखें",
  viewDetails: "विवरण देखें",
  activeSeriesFilter: "इस सीरीज़ की मार्गदर्शिकाएँ",
  clearSeriesFilter: "सीरीज़ फ़िल्टर हटाएँ",
  category: "श्रेणी:",
  defaultVideoDescription: "इंस्टॉलेशन, चयन और अनुप्रयोग की संबंधित मार्गदर्शिकाएँ देखें।",
  defaultProductDescription: "इसी सीरीज़ के उत्पाद देखें।",
  defaultArticleDescription: "इस सीरीज़ से जुड़े तकनीकी लेख पढ़ें।",
};

export const germanRelatedArticleText = {
  heading: "Weiterführende Fachartikel",
  action: "Artikel lesen",
} as const;

export function getRelatedResourcesText(locale: RelatedResourcesUiLocale) {
  if (locale === "de") return germanRelatedResourcesText;
  if (locale === "it") return italianRelatedResourcesText;
  if (locale === "hi") return hindiRelatedResourcesText;
  return relatedResourcesText[locale] ?? relatedResourcesText.en;
}

export function getRelationDescriptionOverride(
  locale: RelatedResourcesLocale,
  relationKeys: readonly string[] = [],
) {
  for (const relationKey of relationKeys) {
    const normalizedKey = normalizeRelationKey(relationKey);
    const override = relationDescriptionOverrides[normalizedKey]?.[locale];

    if (override) {
      return override;
    }
  }

  return null;
}
