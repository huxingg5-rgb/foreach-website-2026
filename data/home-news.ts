import type { LocaleCode } from "@/lib/i18n";

/* ================================
   首页资讯中心数据
   说明：
   1. 首页资讯模块只负责展示精选新闻
   2. 真实新闻正文仍然维护在 data/resources/news/news.zh.ts 与 news.intl.ts
   3. 首页链接必须指向 /resources/news/[slug]
================================ */

export type HomeNewsText = Partial<Record<LocaleCode, string>>;
export type HomeNewsHref = Partial<Record<LocaleCode, string>>;

export type HomeNewsTab = {
  key: string;
  label: HomeNewsText;
};

export type HomeNewsItem = {
  key: string;
  categoryKey: string;
  categoryLabel: HomeNewsText;
  date: string;
  title: HomeNewsText;
  description?: HomeNewsText;
  image?: string;
  href: HomeNewsHref;
};

const defaultNewsImage =
  "/images/resources/news/banner/resources-news-banner-1920x520-v001.webp";

export const homeNewsData = {
  sectionId: "news",

  title: {
    "zh-CN": "资讯中心",
    en: "News Center",
    es: "Centro de noticias",
    fr: "Centre d’actualités",
    ko: "뉴스 센터",
    ru: "Центр новостей",
  },

  tabsAriaLabel: {
    "zh-CN": "资讯分类切换",
    en: "News category switching",
    es: "Cambio de categoría de noticias",
    fr: "Changement de catégorie d’actualités",
    ko: "뉴스 카테고리 전환",
    ru: "Переключение категорий новостей",
  },

  newsListAriaLabel: {
    "zh-CN": "新闻列表",
    en: "News list",
    es: "Lista de noticias",
    fr: "Liste des actualités",
    ko: "뉴스 목록",
    ru: "Список новостей",
  },

  moreNewsLabel: {
    "zh-CN": "更多新闻",
    en: "More News",
    es: "Más noticias",
    fr: "Plus d’actualités",
    ko: "더 많은 뉴스",
    ru: "Больше новостей",
  },

  viewDetailLabel: {
    "zh-CN": "查看详情",
    en: "View Details",
    es: "Ver detalles",
    fr: "Voir les détails",
    ko: "자세히 보기",
    ru: "Подробнее",
  },

  viewAnnouncementAriaLabel: {
    "zh-CN": "查看公告详情",
    en: "View announcement details",
    es: "Ver detalles del anuncio",
    fr: "Voir les détails de l’annonce",
    ko: "공지 상세 보기",
    ru: "Подробнее об объявлении",
  },

  viewNewsAriaLabel: {
    "zh-CN": "查看详情",
    en: "View details",
    es: "Ver detalles",
    fr: "Voir les détails",
    ko: "자세히 보기",
    ru: "Подробнее",
  },

  moreNewsHref: {
    "zh-CN": "/resources/news",
    en: "/en/resources/news",
    es: "/es/resources/news",
    fr: "/fr/resources/news",
    ko: "/ko/resources/news",
    ru: "/ru/resources/news",
  },

  tabs: [
    {
      key: "exhibition",
      label: {
        "zh-CN": "展会活动",
        en: "Exhibitions",
        es: "Exposiciones",
        fr: "Salons",
        ko: "전시회",
        ru: "Выставки",
      },
    },
    {
      key: "company",
      label: {
        "zh-CN": "公司动态",
        en: "Company Updates",
        es: "Noticias de la empresa",
        fr: "Actualités de l’entreprise",
        ko: "회사 소식",
        ru: "Новости компании",
      },
    },
    {
      key: "notice",
      label: {
        "zh-CN": "公告通知",
        en: "Announcements",
        es: "Anuncios",
        fr: "Annonces",
        ko: "공지사항",
        ru: "Объявления",
      },
    },
  ] satisfies HomeNewsTab[],

  featureNews: {
    key: "whx-labs-dubai-2026",
    categoryKey: "exhibition",
    categoryLabel: {
      "zh-CN": "展会活动",
      en: "Exhibitions",
      es: "Exposiciones",
      fr: "Salons",
      ko: "전시회",
      ru: "Выставки",
    },
    date: "2026/02/07",
    image: "/images/resources/news/articles/whx-labs-dubai-2026/cover.png",
    title: {
      "zh-CN": "迪拜实验室展｜期待在现场与您相见",
      en: "FOREACH to Exhibit at WHX Labs Dubai 2026",
      es: "FOREACH participará en WHX Labs Dubai 2026",
      fr: "FOREACH participera au WHX Labs Dubai 2026",
      ko: "FOREACH, WHX Labs Dubai 2026 참가",
      ru: "FOREACH примет участие в WHX Labs Dubai 2026",
    },
    description: {
      "zh-CN":
        "恒永达将于 2026 年 2 月 10 日至 13 日参加迪拜实验室展，展位号 H2.F34，展示微流体核心产品、技术优势及多场景应用方案。",
      en:
        "FOREACH will exhibit at WHX Labs Dubai 2026 at Booth H2.F34, presenting core microfluidic products, technical capabilities, and application solutions.",
      es:
        "FOREACH presentará productos microfluídicos clave y soluciones de aplicación en WHX Labs Dubai 2026, Stand H2.F34.",
      fr:
        "FOREACH présentera ses composants microfluidiques clés et ses solutions d’application au WHX Labs Dubai 2026, stand H2.F34.",
      ko:
        "FOREACH는 WHX Labs Dubai 2026 H2.F34 부스에서 핵심 마이크로플루이딕 제품과 응용 솔루션을 선보입니다.",
      ru:
        "FOREACH представит ключевые микрофлюидные продукты и прикладные решения на WHX Labs Dubai 2026, стенд H2.F34.",
    },
    href: {
      "zh-CN": "/resources/news/whx-labs-dubai-2026",
      en: "/en/resources/news/whx-labs-dubai-2026",
      es: "/es/resources/news/whx-labs-dubai-2026",
      fr: "/fr/resources/news/whx-labs-dubai-2026",
      ko: "/ko/resources/news/whx-labs-dubai-2026",
      ru: "/ru/resources/news/whx-labs-dubai-2026",
    },
  } satisfies HomeNewsItem,

  highlightNews: {
    key: "gazelle-enterprise-2025",
    categoryKey: "company",
    categoryLabel: {
      "zh-CN": "公司动态",
      en: "Company Updates",
      es: "Noticias de la empresa",
      fr: "Actualités de l’entreprise",
      ko: "회사 소식",
      ru: "Новости компании",
    },
    date: "2025/07/22",
    image: "/images/resources/news/articles/gazelle-enterprise-2025/cover.png",
    title: {
      "zh-CN": "创新再突破，恒永达科技荣膺“瞪羚企业”",
      en: "FOREACH Recognized as a Gazelle Enterprise",
      es: "FOREACH reconocida como empresa gacela",
      fr: "FOREACH reconnue comme entreprise Gazelle",
      ko: "FOREACH, 가젤 기업으로 선정",
      ru: "FOREACH признана предприятием Gazelle",
    },
    description: {
      "zh-CN":
        "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业，企业资质与成长能力再次获得认可。",
      en:
        "FOREACH was recognized as a Gazelle Enterprise, reflecting its innovation capability, growth momentum, and market performance.",
      es:
        "FOREACH fue reconocida como empresa gacela por su capacidad de innovación, crecimiento y desempeño de mercado.",
      fr:
        "FOREACH a été reconnue comme entreprise Gazelle pour ses capacités d’innovation, sa croissance et ses performances de marché.",
      ko:
        "FOREACH는 혁신 역량, 성장성 및 시장 성과를 바탕으로 가젤 기업으로 선정되었습니다.",
      ru:
        "FOREACH получила статус предприятия Gazelle благодаря инновациям, росту и рыночным результатам.",
    },
    href: {
      "zh-CN": "/resources/news/gazelle-enterprise-2025",
      en: "/en/resources/news/gazelle-enterprise-2025",
      es: "/es/resources/news/gazelle-enterprise-2025",
      fr: "/fr/resources/news/gazelle-enterprise-2025",
      ko: "/ko/resources/news/gazelle-enterprise-2025",
      ru: "/ru/resources/news/gazelle-enterprise-2025",
    },
  } satisfies HomeNewsItem,

  newsList: [
    {
      key: "caclp-2026",
      categoryKey: "exhibition",
      categoryLabel: {
        "zh-CN": "展会活动",
        en: "Exhibitions",
        es: "Exposiciones",
        fr: "Salons",
        ko: "전시회",
        ru: "Выставки",
      },
      date: "2026/03/17",
      image: "/images/resources/news/articles/caclp-2026/cover.png",
      title: {
        "zh-CN": "邀请函｜恒永达诚邀您参加 2026 CACLP",
        en: "Invitation: Meet FOREACH at CACLP 2026",
        es: "Invitación: visite FOREACH en CACLP 2026",
        fr: "Invitation : retrouvez FOREACH au CACLP 2026",
        ko: "초청장: CACLP 2026에서 FOREACH를 만나보세요",
        ru: "Приглашение: посетите FOREACH на CACLP 2026",
      },
      description: {
        "zh-CN":
          "恒永达将于 2026 年 3 月 21 日至 23 日参加 CACLP，展位号 2-0424，欢迎新老客户莅临交流。",
        en:
          "FOREACH will exhibit at CACLP 2026 from March 21 to 23 at Booth 2-0424.",
        es:
          "FOREACH participará en CACLP 2026 del 21 al 23 de marzo en el stand 2-0424.",
        fr:
          "FOREACH participera au CACLP 2026 du 21 au 23 mars, stand 2-0424.",
        ko:
          "FOREACH는 2026년 3월 21일부터 23일까지 CACLP 2026 2-0424 부스에 참가합니다.",
        ru:
          "FOREACH примет участие в CACLP 2026 с 21 по 23 марта, стенд 2-0424.",
      },
      href: {
        "zh-CN": "/resources/news/caclp-2026",
        en: "/en/resources/news/caclp-2026",
        es: "/es/resources/news/caclp-2026",
        fr: "/fr/resources/news/caclp-2026",
        ko: "/ko/resources/news/caclp-2026",
        ru: "/ru/resources/news/caclp-2026",
      },
    },
    {
      key: "me-supply-chain-expo-2026",
      categoryKey: "exhibition",
      categoryLabel: {
        "zh-CN": "展会活动",
        en: "Exhibitions",
        es: "Exposiciones",
        fr: "Salons",
        ko: "전시회",
        ru: "Выставки",
      },
      date: "2026/03/27",
      image: "/images/resources/news/articles/me-supply-chain-expo-2026/cover.png",
      title: {
        "zh-CN": "2026 ME 供应链生态展｜恒永达诚邀您的莅临指导",
        en: "FOREACH to Exhibit at 2026 ME Supply Chain Expo",
        es: "FOREACH participará en 2026 ME Supply Chain Expo",
        fr: "FOREACH participera au 2026 ME Supply Chain Expo",
        ko: "FOREACH, 2026 ME 공급망 생태 전시회 참가",
        ru: "FOREACH примет участие в 2026 ME Supply Chain Expo",
      },
      description: {
        "zh-CN":
          "恒永达将参加 2026 ME 供应链生态展，展位号 2-M46，展示核心产品、技术能力及多场景应用方案。",
        en:
          "FOREACH will exhibit at the 2026 ME Supply Chain Expo at Booth 2-M46.",
        es:
          "FOREACH participará en 2026 ME Supply Chain Expo en el stand 2-M46.",
        fr:
          "FOREACH participera au 2026 ME Supply Chain Expo, stand 2-M46.",
        ko:
          "FOREACH는 2026 ME 공급망 생태 전시회 2-M46 부스에 참가합니다.",
        ru:
          "FOREACH примет участие в 2026 ME Supply Chain Expo, стенд 2-M46.",
      },
      href: {
        "zh-CN": "/resources/news/me-supply-chain-expo-2026",
        en: "/en/resources/news/me-supply-chain-expo-2026",
        es: "/es/resources/news/me-supply-chain-expo-2026",
        fr: "/fr/resources/news/me-supply-chain-expo-2026",
        ko: "/ko/resources/news/me-supply-chain-expo-2026",
        ru: "/ru/resources/news/me-supply-chain-expo-2026",
      },
    },
    {
      key: "guangzhou-high-med-expo-2026",
      categoryKey: "exhibition",
      categoryLabel: {
        "zh-CN": "展会活动",
        en: "Exhibitions",
        es: "Exposiciones",
        fr: "Salons",
        ko: "전시회",
        ru: "Выставки",
      },
      date: "2026/03/26",
      image: "/images/resources/news/articles/guangzhou-high-med-expo-2026/cover.png",
      title: {
        "zh-CN": "2026 广州高医展｜恒永达科技诚邀您莅临展位参观交流",
        en: "FOREACH Invitation to Guangzhou High Medical Expo 2026",
        es: "Invitación de FOREACH a Guangzhou High Medical Expo 2026",
        fr: "Invitation de FOREACH au Guangzhou High Medical Expo 2026",
        ko: "FOREACH, 2026 광저우 고의료 전시회 초청",
        ru: "Приглашение FOREACH на Guangzhou High Medical Expo 2026",
      },
      description: {
        "zh-CN":
          "恒永达将于 2026 年 3 月 30 日至 4 月 1 日参加广州高医展，展位号 B529。",
        en:
          "FOREACH will exhibit at Guangzhou High Medical Expo 2026 from March 30 to April 1 at Booth B529.",
        es:
          "FOREACH participará en Guangzhou High Medical Expo 2026 del 30 de marzo al 1 de abril en el stand B529.",
        fr:
          "FOREACH participera au Guangzhou High Medical Expo 2026 du 30 mars au 1er avril, stand B529.",
        ko:
          "FOREACH는 2026년 3월 30일부터 4월 1일까지 광저우 고의료 전시회 B529 부스에 참가합니다.",
        ru:
          "FOREACH примет участие в Guangzhou High Medical Expo 2026 с 30 марта по 1 апреля, стенд B529.",
      },
      href: {
        "zh-CN": "/resources/news/guangzhou-high-med-expo-2026",
        en: "/en/resources/news/guangzhou-high-med-expo-2026",
        es: "/es/resources/news/guangzhou-high-med-expo-2026",
        fr: "/fr/resources/news/guangzhou-high-med-expo-2026",
        ko: "/ko/resources/news/guangzhou-high-med-expo-2026",
        ru: "/ru/resources/news/guangzhou-high-med-expo-2026",
      },
    },
    {
      key: "national-little-giant-2024",
      categoryKey: "company",
      categoryLabel: {
        "zh-CN": "公司动态",
        en: "Company Updates",
        es: "Noticias de la empresa",
        fr: "Actualités de l’entreprise",
        ko: "회사 소식",
        ru: "Новости компании",
      },
      date: "2024/09/06",
      image: "/images/resources/news/articles/national-little-giant-2024/cover.png",
      title: {
        "zh-CN": "恒永达荣获国家级专精特新“小巨人”称号",
        en: "FOREACH Recognized as a National Specialized and Innovative Little Giant Enterprise",
        es: "FOREACH reconocida como empresa nacional especializada e innovadora",
        fr: "FOREACH reconnue comme entreprise nationale spécialisée et innovante",
        ko: "FOREACH, 국가급 전문·특화·혁신 Little Giant 기업 선정",
        ru: "FOREACH получила статус национального специализированного и инновационного предприятия Little Giant",
      },
      description: {
        "zh-CN":
          "恒永达凭借在微流体控制领域的长期专注与创新能力，荣获国家级专精特新“小巨人”企业称号。",
        en:
          "FOREACH was recognized for its long-term focus and innovation in microfluidic control technology.",
        es:
          "FOREACH fue reconocida por su enfoque e innovación en tecnología de control microfluídico.",
        fr:
          "FOREACH a été reconnue pour son engagement et son innovation dans le contrôle microfluidique.",
        ko:
          "FOREACH는 마이크로플루이딕 제어 기술에 대한 지속적인 집중과 혁신 역량을 인정받았습니다.",
        ru:
          "FOREACH получила признание за долгосрочную специализацию и инновации в области микрофлюидного управления.",
      },
      href: {
        "zh-CN": "/resources/news/national-little-giant-2024",
        en: "/en/resources/news/national-little-giant-2024",
        es: "/es/resources/news/national-little-giant-2024",
        fr: "/fr/resources/news/national-little-giant-2024",
        ko: "/ko/resources/news/national-little-giant-2024",
        ru: "/ru/resources/news/national-little-giant-2024",
      },
    },
  ] satisfies HomeNewsItem[],
};

export function getHomeNewsText(text: HomeNewsText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
}

export function getHomeNewsHref(href: HomeNewsHref, locale: LocaleCode) {
  return href[locale] || href["zh-CN"] || href.en || "/resources/news";
}
