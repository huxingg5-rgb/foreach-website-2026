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
    key: "medica-2026",
    categoryKey: "exhibition",
    categoryLabel: {
      "zh-CN":
        "展会活动",
      en:
        "Exhibitions",
      es:
        "Exposiciones",
      fr:
        "Salons",
      ko:
        "전시회",
      ru:
        "Выставки",
    },
    date: "2026/11/05",
    image: "/images/home/news/medica-2026-1200.webp",
    title: {
      "zh-CN":
        "MEDICA 2026｜恒永达诚邀您莅临 1H39-\u20601 展位",
      en:
        "Meet Foreach at MEDICA 2026 | Booth\u00a01H39-\u20601",
      es:
        "Visite a Foreach en MEDICA 2026 | Stand\u00a01H39-\u20601",
      fr:
        "Rencontrez Foreach à MEDICA 2026 | Stand\u00a01H39-\u20601",
      ko:
        "MEDICA 2026에서 Foreach를 만나보세요 | 부스\u00a01H39-\u20601",
      ru:
        "Foreach на выставке MEDICA 2026 | Стенд\u00a01H39-\u20601",
    },
    description: {
      "zh-CN":
        "恒永达将于 2026 年 11 月 16 日至 19 日参加德国杜塞尔多夫 MEDICA 2026，展位号 1H39-\u20601，欢迎新老客户及合作伙伴莅临交流。",
      en:
        "Foreach will exhibit at MEDICA 2026 in Düsseldorf, Germany, from November 16 to 19, 2026. Visit Booth\u00a01H39-\u20601 to discuss second-source options for pumps, valves, and fluidic components.",
      es:
        "Foreach participará en MEDICA 2026 en Düsseldorf (Alemania) del 16 al 19 de noviembre de 2026. Visite el stand 1H39-\u20601 para hablar de opciones de segundo proveedor para bombas, válvulas y componentes fluídicos.",
      fr:
        "Foreach participera à MEDICA 2026 à Düsseldorf (Allemagne) du 16 au 19 novembre 2026. Retrouvez-nous au stand 1H39-\u20601 pour parler de solutions de second fournisseur pour pompes, vannes et composants fluidiques.",
      ko:
        "Foreach는 2026년 11월 16일부터 19일까지 독일 뒤셀도르프에서 열리는 MEDICA 2026에 참가합니다. 부스\u00a01H39-\u20601에서 펌프, 밸브 및 유체 부품의 세컨드 소스 공급 방안을 상담해 보세요.",
      ru:
        "Foreach примет участие в выставке MEDICA 2026 в Дюссельдорфе (Германия) с 16 по 19 ноября 2026 года. Посетите стенд\u00a01H39-\u20601, чтобы обсудить альтернативные поставки насосов, клапанов и жидкостных компонентов.",
    },
    href: {
      "zh-CN": "/resources/news/medica-2026",
      en: "/en/resources/news/medica-2026",
      es: "/es/resources/news/medica-2026",
      fr: "/fr/resources/news/medica-2026",
      ko: "/ko/resources/news/medica-2026",
      ru: "/ru/resources/news/medica-2026",
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
      en: "Foreach Recognized as a Gazelle Enterprise",
      es: "Foreach reconocida como empresa gacela",
      fr: "Foreach reconnue comme entreprise Gazelle",
      ko: "Foreach, 가젤 기업으로 선정",
      ru: "Foreach признана предприятием Gazelle",
    },
    description: {
      "zh-CN":
        "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业，企业资质与成长能力再次获得认可。",
      en:
        "Foreach was recognized as a Gazelle Enterprise, reflecting its innovation capability, growth momentum, and market performance.",
      es:
        "Foreach fue reconocida como empresa gacela por su capacidad de innovación, crecimiento y desempeño de mercado.",
      fr:
        "Foreach a été reconnue comme entreprise Gazelle pour ses capacités d’innovation, sa croissance et ses performances de marché.",
      ko:
        "Foreach는 혁신 역량, 성장성 및 시장 성과를 바탕으로 가젤 기업으로 선정되었습니다.",
      ru:
        "Foreach получила статус предприятия Gazelle благодаря инновациям, росту и рыночным результатам.",
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
      key: "adlm-2026-onsite",
      categoryKey: "exhibition",
      categoryLabel: {
        "zh-CN":
          "展会活动",
        en:
          "Exhibitions",
        es:
          "Exposiciones",
        fr:
          "Salons",
        ko:
          "전시회",
        ru:
          "Выставки",
      },
      date: "2026/07/30",
      image: "/images/home/news/adlm-2026-onsite-480.webp",
      title: {
        "zh-CN":
          "ADLM 2026现场直击｜恒永达亮相4105号展位",
        en:
          "Live from ADLM 2026 | Meet Foreach at Booth 4105",
        es:
          "En directo desde ADLM 2026 | Visite a Foreach en el stand 4105",
        fr:
          "En direct de l’ADLM 2026 | Retrouvez Foreach au stand 4105",
        ko:
          "ADLM 2026 현장 소식 | Foreach Technology 부스 4105를 만나보세요",
        ru:
          "ADLM 2026: репортаж с выставки | Foreach Technology на стенде 4105",
      },
      description: {
        "zh-CN":
          "ADLM 2026 在美国阿纳海姆举行，恒永达团队在 4105 号展位与全球行业伙伴现场交流。",
        en:
          "ADLM 2026 is underway in Anaheim, California, and the Foreach team is ready at Booth 4105.",
        es:
          "ADLM 2026 se celebra en Anaheim, California, y el equipo de Foreach le espera en el stand 4105.",
        fr:
          "L’ADLM 2026 se tient à Anaheim, en Californie, et l’équipe Foreach vous accueille au stand 4105.",
        ko:
          "ADLM 2026이 미국 캘리포니아 애너하임에서 진행 중이며, Foreach 팀이 부스 4105에서 기다리고 있습니다.",
        ru:
          "ADLM 2026 проходит в Анахайме, штат Калифорния; команда Foreach ждет вас на стенде 4105.",
      },
      href: {
        "zh-CN": "/resources/news/adlm-2026-onsite",
        en: "/en/resources/news/adlm-2026-onsite",
        es: "/es/resources/news/adlm-2026-onsite",
        fr: "/fr/resources/news/adlm-2026-onsite",
        ko: "/ko/resources/news/adlm-2026-onsite",
        ru: "/ru/resources/news/adlm-2026-onsite",
      },
    },
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
      image: "/images/home/news/caclp-2026-480.webp",
      title: {
        "zh-CN": "邀请函｜恒永达诚邀您参加 2026 CACLP",
        en: "Invitation: Meet Foreach at CACLP 2026",
        es: "Invitación: visite Foreach en CACLP 2026",
        fr: "Invitation : retrouvez Foreach au CACLP 2026",
        ko: "초청장: CACLP 2026에서 Foreach를 만나보세요",
        ru: "Приглашение: посетите Foreach на CACLP 2026",
      },
      description: {
        "zh-CN":
          "恒永达将于 2026 年 3 月 21 日至 23 日参加 CACLP，展位号 2-0424，欢迎新老客户莅临交流。",
        en:
          "Foreach will exhibit at CACLP 2026 from March 21 to 23 at Booth 2-0424.",
        es:
          "Foreach participará en CACLP 2026 del 21 al 23 de marzo en el stand 2-0424.",
        fr:
          "Foreach participera au CACLP 2026 du 21 au 23 mars, stand 2-0424.",
        ko:
          "Foreach는 2026년 3월 21일부터 23일까지 CACLP 2026 2-0424 부스에 참가합니다.",
        ru:
          "Foreach примет участие в CACLP 2026 с 21 по 23 марта, стенд 2-0424.",
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
      image: "/images/home/news/me-supply-chain-expo-2026-480.webp",
      title: {
        "zh-CN": "2026 ME 供应链生态展｜恒永达诚邀您的莅临指导",
        en: "Foreach to Exhibit at 2026 ME Supply Chain Expo",
        es: "Foreach participará en 2026 ME Supply Chain Expo",
        fr: "Foreach participera au 2026 ME Supply Chain Expo",
        ko: "Foreach, 2026 ME 공급망 생태 전시회 참가",
        ru: "Foreach примет участие в 2026 ME Supply Chain Expo",
      },
      description: {
        "zh-CN":
          "恒永达将参加 2026 ME 供应链生态展，展位号 2-M46，展示核心产品、技术能力及多场景应用方案。",
        en:
          "Foreach will exhibit at the 2026 ME Supply Chain Expo at Booth 2-M46.",
        es:
          "Foreach participará en 2026 ME Supply Chain Expo en el stand 2-M46.",
        fr:
          "Foreach participera au 2026 ME Supply Chain Expo, stand 2-M46.",
        ko:
          "Foreach는 2026 ME 공급망 생태 전시회 2-M46 부스에 참가합니다.",
        ru:
          "Foreach примет участие в 2026 ME Supply Chain Expo, стенд 2-M46.",
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
      image: "/images/home/news/guangzhou-high-med-expo-2026-480.webp",
      title: {
        "zh-CN": "2026 广州高医展｜恒永达科技诚邀您莅临展位参观交流",
        en: "Foreach Invitation to Guangzhou High Medical Expo 2026",
        es: "Invitación de Foreach a Guangzhou High Medical Expo 2026",
        fr: "Invitation de Foreach au Guangzhou High Medical Expo 2026",
        ko: "Foreach, 2026 광저우 고의료 전시회 초청",
        ru: "Приглашение Foreach на Guangzhou High Medical Expo 2026",
      },
      description: {
        "zh-CN":
          "恒永达将于 2026 年 3 月 30 日至 4 月 1 日参加广州高医展，展位号 B529。",
        en:
          "Foreach will exhibit at Guangzhou High Medical Expo 2026 from March 30 to April 1 at Booth B529.",
        es:
          "Foreach participará en Guangzhou High Medical Expo 2026 del 30 de marzo al 1 de abril en el stand B529.",
        fr:
          "Foreach participera au Guangzhou High Medical Expo 2026 du 30 mars au 1er avril, stand B529.",
        ko:
          "Foreach는 2026년 3월 30일부터 4월 1일까지 광저우 고의료 전시회 B529 부스에 참가합니다.",
        ru:
          "Foreach примет участие в Guangzhou High Medical Expo 2026 с 30 марта по 1 апреля, стенд B529.",
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
  ] satisfies HomeNewsItem[],
};

export function getHomeNewsText(text: HomeNewsText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
}

export function getHomeNewsHref(href: HomeNewsHref, locale: LocaleCode) {
  return href[locale] || href["zh-CN"] || href.en || "/resources/news";
}
