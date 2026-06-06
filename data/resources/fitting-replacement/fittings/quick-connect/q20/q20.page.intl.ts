/* =========================================================
   q20.page.intl.ts
   恒永达官网｜接头替代查询｜快插接头 Q20 首页多语言文案

   文件路径：
   data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts

   作用：
   1. 存放 Q20 接头替代查询首页多语言文案
   2. 服务中文和外语路径
   3. 不存放产品数据
   4. 产品数据来自 q20.zh.ts
   5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增

   当前支持语言：
   zh 中文
   en 英文
   es 西班牙语
   fr 法语
   ko 韩语
   ru 俄语
========================================================= */

export type FittingReplacementLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

/* =========================================================
   Q20 首页多语言文案
========================================================= */
export const fittingReplacementQuickConnectQ20PageIntl = {
  zh: {
    banner: {
      title: "接头替代查询",
      description:
        "输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品，并查看型号解析信息。",
    },

    breadcrumbs: [
      {
        label: "首页",
        href: "/",
      },
      {
        label: "资源中心",
        href: "/resources",
      },
      {
        label: "接头替代查询",
        href: "/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "请输入竞品编码、商品编码或恒永达型号",
      buttonText: "搜索",
    },
  },

  en: {
    banner: {
      title: "Fitting Replacement Search",
      description:
        "Enter a competitor model, product code, or FOREACH model to quickly find matching Q20 quick-connect fittings and model details.",
    },

    breadcrumbs: [
      {
        label: "Home",
        href: "/en",
      },
      {
        label: "Resources",
        href: "/en/resources",
      },
      {
        label: "Fitting Replacement",
        href: "/en/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Enter competitor model, product code, or FOREACH model",
      buttonText: "Search",
    },
  },

  es: {
    banner: {
      title: "Búsqueda de sustitución de conectores",
      description:
        "Introduzca un modelo de la competencia, código de producto o modelo FOREACH para encontrar rápidamente conectores rápidos Q20 equivalentes y sus detalles.",
    },

    breadcrumbs: [
      {
        label: "Inicio",
        href: "/es",
      },
      {
        label: "Recursos",
        href: "/es/resources",
      },
      {
        label: "Sustitución de conectores",
        href: "/es/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder:
        "Introduzca modelo de la competencia, código de producto o modelo FOREACH",
      buttonText: "Buscar",
    },
  },

  fr: {
    banner: {
      title: "Recherche de remplacement de raccords",
      description:
        "Saisissez une référence concurrente, un code produit ou un modèle FOREACH pour trouver rapidement les raccords rapides Q20 correspondants et leurs détails.",
    },

    breadcrumbs: [
      {
        label: "Accueil",
        href: "/fr",
      },
      {
        label: "Ressources",
        href: "/fr/resources",
      },
      {
        label: "Remplacement de raccords",
        href: "/fr/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder:
        "Saisissez une référence concurrente, un code produit ou un modèle FOREACH",
      buttonText: "Rechercher",
    },
  },

  ko: {
    banner: {
      title: "피팅 대체 조회",
      description:
        "경쟁사 모델, 제품 코드 또는 FOREACH 모델을 입력하여 Q20 퀵 커넥트 피팅의 대응 제품과 모델 정보를 빠르게 확인할 수 있습니다.",
    },

    breadcrumbs: [
      {
        label: "홈",
        href: "/ko",
      },
      {
        label: "자료실",
        href: "/ko/resources",
      },
      {
        label: "피팅 대체 조회",
        href: "/ko/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "경쟁사 모델, 제품 코드 또는 FOREACH 모델을 입력하세요",
      buttonText: "검색",
    },
  },

  ru: {
    banner: {
      title: "Поиск аналогов фитингов",
      description:
        "Введите модель конкурента, код изделия или модель FOREACH, чтобы быстро найти соответствующие быстросъемные фитинги Q20 и информацию о модели.",
    },

    breadcrumbs: [
      {
        label: "Главная",
        href: "/ru",
      },
      {
        label: "Ресурсы",
        href: "/ru/resources",
      },
      {
        label: "Поиск аналогов фитингов",
        href: "/ru/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Введите модель конкурента, код изделия или модель FOREACH",
      buttonText: "Поиск",
    },
  },
} as const;

/* =========================================================
   获取 Q20 首页指定语言文案

   说明：
   1. 如果传入语言不存在，默认返回英文
   2. 中文页面建议传 zh
   3. 外语页面传 en / es / fr / ko / ru
========================================================= */
export function getFittingReplacementQuickConnectQ20PageIntl(
  locale: string = "zh"
) {
  if (locale in fittingReplacementQuickConnectQ20PageIntl) {
    return fittingReplacementQuickConnectQ20PageIntl[
      locale as FittingReplacementLocale
    ];
  }

  return fittingReplacementQuickConnectQ20PageIntl.en;
} 