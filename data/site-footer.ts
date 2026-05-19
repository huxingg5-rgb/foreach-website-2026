// data/site-footer.ts
// 网站底部 Footer 数据配置文件
//
// 说明：
// 1. 这个文件专门管理网站底部栏目、链接、公司信息和版权信息
// 2. SiteFooter.tsx 后面只负责手机端折叠交互和页面渲染
// 3. 当前支持语言：zh-CN / en / es / fr / ko / ru
// 4. 链接 href 也按语言区分，例如中文 /#products，英文 /en#products
// 5. 第一阶段页面还没有全部开发完成，所以很多子栏目先跳转到首页对应模块锚点

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   多语言文本类型
================================ */

export type SiteFooterText = Partial<Record<LocaleCode, string>>;

/* ================================
   多语言链接类型
================================ */

export type SiteFooterHref = Partial<Record<LocaleCode, string>>;

/* ================================
   Footer 链接类型
================================ */

export type SiteFooterLink = {
  key: string; // 链接唯一标识
  label: SiteFooterText; // 链接显示文字
  href: SiteFooterHref; // 链接路径，支持多语言
};

/* ================================
   Footer 栏目类型
================================ */

export type SiteFooterColumn = {
  key: string; // 栏目唯一标识
  title: SiteFooterText; // 栏目标题
  links: SiteFooterLink[]; // 栏目下的链接
};

/* ================================
   Footer 数据
================================ */

export const siteFooterData = {
  /* ================================
     Footer 栏目
  ================================ */

  columns: [
    {
      key: "home",
      title: {
        "zh-CN": "首页",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
        ko: "홈",
        ru: "Главная",
      },
      links: [
        {
          key: "home",
          label: {
            "zh-CN": "首页",
            en: "Home",
            es: "Inicio",
            fr: "Accueil",
            ko: "홈",
            ru: "Главная",
          },
          href: {
            "zh-CN": "/",
            en: "/en",
            es: "/es",
            fr: "/fr",
            ko: "/ko",
            ru: "/ru",
          },
        },
      ],
    },

    {
      key: "products",
      title: {
        "zh-CN": "产品中心",
        en: "Products",
        es: "Productos",
        fr: "Produits",
        ko: "제품",
        ru: "Продукция",
      },
      links: [
        {
          key: "pumps",
          label: {
            "zh-CN": "泵类",
            en: "Pumps",
            es: "Bombas",
            fr: "Pompes",
            ko: "펌프",
            ru: "Насосы",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
        {
          key: "valves",
          label: {
            "zh-CN": "阀类",
            en: "Valves",
            es: "Válvulas",
            fr: "Vannes",
            ko: "밸브",
            ru: "Клапаны",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
        {
          key: "tubing",
          label: {
            "zh-CN": "管路",
            en: "Tubing",
            es: "Tubos",
            fr: "Tubes",
            ko: "튜빙",
            ru: "Трубки",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
        {
          key: "fittings",
          label: {
            "zh-CN": "连接件",
            en: "Fittings",
            es: "Conectores",
            fr: "Raccords",
            ko: "피팅",
            ru: "Соединители",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
        {
          key: "sampling-probes",
          label: {
            "zh-CN": "采样针",
            en: "Sampling Probes",
            es: "Agujas de muestreo",
            fr: "Aiguilles de prélèvement",
            ko: "샘플링 프로브",
            ru: "Пробоотборные иглы",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
        {
          key: "sensors",
          label: {
            "zh-CN": "传感器",
            en: "Sensors",
            es: "Sensores",
            fr: "Capteurs",
            ko: "센서",
            ru: "Датчики",
          },
          href: {
            "zh-CN": "/#products",
            en: "/en#products",
            es: "/es#products",
            fr: "/fr#products",
            ko: "/ko#products",
            ru: "/ru#products",
          },
        },
      ],
    },

    {
      key: "applications",
      title: {
        "zh-CN": "应用领域",
        en: "Applications",
        es: "Aplicaciones",
        fr: "Applications",
        ko: "응용 분야",
        ru: "Области применения",
      },
      links: [
        {
          key: "ivd",
          label: {
            "zh-CN": "IVD 体外诊断",
            en: "IVD",
            es: "IVD",
            fr: "IVD",
            ko: "IVD",
            ru: "IVD",
          },
          href: {
            "zh-CN": "/#applications",
            en: "/en#applications",
            es: "/es#applications",
            fr: "/fr#applications",
            ko: "/ko#applications",
            ru: "/ru#applications",
          },
        },
        {
          key: "life-sciences",
          label: {
            "zh-CN": "生命科学",
            en: "Life Sciences",
            es: "Ciencias de la vida",
            fr: "Sciences de la vie",
            ko: "생명과학",
            ru: "Науки о жизни",
          },
          href: {
            "zh-CN": "/#applications",
            en: "/en#applications",
            es: "/es#applications",
            fr: "/fr#applications",
            ko: "/ko#applications",
            ru: "/ru#applications",
          },
        },
        {
          key: "synthetic-biology",
          label: {
            "zh-CN": "合成生物",
            en: "Synthetic Biology",
            es: "Biología sintética",
            fr: "Biologie synthétique",
            ko: "합성생물학",
            ru: "Синтетическая биология",
          },
          href: {
            "zh-CN": "/#applications",
            en: "/en#applications",
            es: "/es#applications",
            fr: "/fr#applications",
            ko: "/ko#applications",
            ru: "/ru#applications",
          },
        },
        {
          key: "analytical-instruments",
          label: {
            "zh-CN": "高端分析仪器",
            en: "High-end Analytical Instruments",
            es: "Instrumentos analíticos avanzados",
            fr: "Instruments d’analyse avancés",
            ko: "고급 분석 장비",
            ru: "Высокоточные аналитические приборы",
          },
          href: {
            "zh-CN": "/#applications",
            en: "/en#applications",
            es: "/es#applications",
            fr: "/fr#applications",
            ko: "/ko#applications",
            ru: "/ru#applications",
          },
        },
        {
          key: "laboratory-automation",
          label: {
            "zh-CN": "实验室自动化",
            en: "Laboratory Automation",
            es: "Automatización de laboratorio",
            fr: "Automatisation de laboratoire",
            ko: "실험실 자동화",
            ru: "Лабораторная автоматизация",
          },
          href: {
            "zh-CN": "/#applications",
            en: "/en#applications",
            es: "/es#applications",
            fr: "/fr#applications",
            ko: "/ko#applications",
            ru: "/ru#applications",
          },
        },
      ],
    },

    {
      key: "resources",
      title: {
        "zh-CN": "资源中心",
        en: "Resources",
        es: "Recursos",
        fr: "Ressources",
        ko: "리소스",
        ru: "Ресурсы",
      },
      links: [
        {
          key: "downloads",
          label: {
            "zh-CN": "产品资料下载",
            en: "Product Downloads",
            es: "Descargas de productos",
            fr: "Téléchargements produits",
            ko: "제품 자료 다운로드",
            ru: "Загрузка материалов",
          },
          href: {
            "zh-CN": "/news",
            en: "/en/news",
            es: "/es/news",
            fr: "/fr/news",
            ko: "/ko/news",
            ru: "/ru/news",
          },
        },
        {
          key: "catalogs",
          label: {
            "zh-CN": "产品目录",
            en: "Product Catalogs",
            es: "Catálogos de productos",
            fr: "Catalogues produits",
            ko: "제품 카탈로그",
            ru: "Каталоги продукции",
          },
          href: {
            "zh-CN": "/news",
            en: "/en/news",
            es: "/es/news",
            fr: "/fr/news",
            ko: "/ko/news",
            ru: "/ru/news",
          },
        },
        {
          key: "certificates",
          label: {
            "zh-CN": "认证与资质资料",
            en: "Certifications",
            es: "Certificaciones",
            fr: "Certifications",
            ko: "인증 자료",
            ru: "Сертификаты",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
        {
          key: "selection-guide",
          label: {
            "zh-CN": "选型指南",
            en: "Selection Guides",
            es: "Guías de selección",
            fr: "Guides de sélection",
            ko: "선정 가이드",
            ru: "Руководства по выбору",
          },
          href: {
            "zh-CN": "/news",
            en: "/en/news",
            es: "/es/news",
            fr: "/fr/news",
            ko: "/ko/news",
            ru: "/ru/news",
          },
        },
        {
          key: "installation",
          label: {
            "zh-CN": "安装说明",
            en: "Installation Guides",
            es: "Guías de instalación",
            fr: "Guides d’installation",
            ko: "설치 가이드",
            ru: "Инструкции по установке",
          },
          href: {
            "zh-CN": "/news",
            en: "/en/news",
            es: "/es/news",
            fr: "/fr/news",
            ko: "/ko/news",
            ru: "/ru/news",
          },
        },
        {
          key: "faq",
          label: {
            "zh-CN": "技术文章 / FAQ",
            en: "Technical Articles / FAQ",
            es: "Artículos técnicos / FAQ",
            fr: "Articles techniques / FAQ",
            ko: "기술 문서 / FAQ",
            ru: "Технические статьи / FAQ",
          },
          href: {
            "zh-CN": "/news",
            en: "/en/news",
            es: "/es/news",
            fr: "/fr/news",
            ko: "/ko/news",
            ru: "/ru/news",
          },
        },
      ],
    },

    {
      key: "about",
      title: {
        "zh-CN": "关于我们",
        en: "About Us",
        es: "Sobre nosotros",
        fr: "À propos",
        ko: "회사 소개",
        ru: "О нас",
      },
      links: [
        {
          key: "company-profile",
          label: {
            "zh-CN": "公司介绍",
            en: "Company Profile",
            es: "Perfil de la empresa",
            fr: "Profil de l’entreprise",
            ko: "회사 소개",
            ru: "Профиль компании",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
        {
          key: "rd-manufacturing",
          label: {
            "zh-CN": "研发制造能力",
            en: "R&D & Manufacturing",
            es: "I+D y fabricación",
            fr: "R&D et fabrication",
            ko: "R&D 및 제조",
            ru: "R&D и производство",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
        {
          key: "quality",
          label: {
            "zh-CN": "质量体系",
            en: "Quality System",
            es: "Sistema de calidad",
            fr: "Système qualité",
            ko: "품질 시스템",
            ru: "Система качества",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
        {
          key: "qualifications",
          label: {
            "zh-CN": "企业资质",
            en: "Qualifications",
            es: "Certificaciones",
            fr: "Qualifications",
            ko: "기업 인증",
            ru: "Квалификации",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
        {
          key: "global-service",
          label: {
            "zh-CN": "全球服务",
            en: "Global Service",
            es: "Servicio global",
            fr: "Service mondial",
            ko: "글로벌 서비스",
            ru: "Глобальный сервис",
          },
          href: {
            "zh-CN": "/#about",
            en: "/en#about",
            es: "/es#about",
            fr: "/fr#about",
            ko: "/ko#about",
            ru: "/ru#about",
          },
        },
      ],
    },

    {
      key: "contact",
      title: {
        "zh-CN": "联系我们",
        en: "Contact Us",
        es: "Contacto",
        fr: "Contact",
        ko: "문의하기",
        ru: "Связаться с нами",
      },
      links: [
        {
          key: "inquiry-form",
          label: {
            "zh-CN": "询盘表单",
            en: "Inquiry Form",
            es: "Formulario de consulta",
            fr: "Formulaire de demande",
            ko: "문의 양식",
            ru: "Форма запроса",
          },
          href: {
            "zh-CN": "/#contact",
            en: "/en#contact",
            es: "/es#contact",
            fr: "/fr#contact",
            ko: "/ko#contact",
            ru: "/ru#contact",
          },
        },
        {
          key: "contact-info",
          label: {
            "zh-CN": "联系方式",
            en: "Contact Information",
            es: "Información de contacto",
            fr: "Coordonnées",
            ko: "연락처",
            ru: "Контактная информация",
          },
          href: {
            "zh-CN": "/#contact",
            en: "/en#contact",
            es: "/es#contact",
            fr: "/fr#contact",
            ko: "/ko#contact",
            ru: "/ru#contact",
          },
        },
        {
          key: "address",
          label: {
            "zh-CN": "地址信息",
            en: "Address",
            es: "Dirección",
            fr: "Adresse",
            ko: "주소",
            ru: "Адрес",
          },
          href: {
            "zh-CN": "/#contact",
            en: "/en#contact",
            es: "/es#contact",
            fr: "/fr#contact",
            ko: "/ko#contact",
            ru: "/ru#contact",
          },
        },
        {
          key: "sales-support",
          label: {
            "zh-CN": "销售支持入口",
            en: "Sales Support",
            es: "Soporte comercial",
            fr: "Support commercial",
            ko: "영업 지원",
            ru: "Поддержка продаж",
          },
          href: {
            "zh-CN": "/#contact",
            en: "/en#contact",
            es: "/es#contact",
            fr: "/fr#contact",
            ko: "/ko#contact",
            ru: "/ru#contact",
          },
        },
      ],
    },
  ] satisfies SiteFooterColumn[],

  /* ================================
     右侧公司信息
  ================================ */

  companyName: {
    "zh-CN": "深圳市恒永达科技股份有限公司",
    en: "Shenzhen FOREACH Technology Co., Ltd.",
    es: "Shenzhen FOREACH Technology Co., Ltd.",
    fr: "Shenzhen FOREACH Technology Co., Ltd.",
    ko: "Shenzhen FOREACH Technology Co., Ltd.",
    ru: "Shenzhen FOREACH Technology Co., Ltd.",
  },

  addressLabel: {
    "zh-CN": "地址",
    en: "Address",
    es: "Dirección",
    fr: "Adresse",
    ko: "주소",
    ru: "Адрес",
  },

  address: {
    "zh-CN":
      "广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301",
    en:
      "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Yulv Community, Yutang Subdistrict, Guangming District, Shenzhen, Guangdong, China",
    es:
      "1301, Edificio 2, Parque Industrial Yufengda, No. 1008 Guangqiao Avenue, Comunidad Yulv, Distrito Guangming, Shenzhen, Guangdong, China",
    fr:
      "1301, Bâtiment 2, Parc industriel Yufengda, No. 1008 Guangqiao Avenue, Communauté Yulv, District de Guangming, Shenzhen, Guangdong, Chine",
    ko:
      "중국 광둥성 선전시 광밍구 위탕가도 위뤼커뮤니티 광차오대로 1008호 위펑다 산업단지 2동 1301",
    ru:
      "1301, здание 2, промышленный парк Yufengda, No. 1008 Guangqiao Avenue, Yulv Community, район Guangming, Shenzhen, Guangdong, China",
  },

  mapLabel: {
    "zh-CN": "查看地图",
    en: "View Map",
    es: "Ver mapa",
    fr: "Voir la carte",
    ko: "지도 보기",
    ru: "Посмотреть карту",
  },

  emailLabel: {
    "zh-CN": "邮箱",
    en: "Email",
    es: "Correo",
    fr: "E-mail",
    ko: "이메일",
    ru: "Эл. почта",
  },

  email: "sales@foreachtek.com",

  phoneLabel: {
    "zh-CN": "咨询电话",
    en: "Tel",
    es: "Tel.",
    fr: "Tél.",
    ko: "전화",
    ru: "Тел.",
  },

  phone: "0755 8655 3831",

  wechatLabel: {
    "zh-CN": "公众号",
    en: "WeChat",
    es: "WeChat",
    fr: "WeChat",
    ko: "WeChat",
    ru: "WeChat",
  },

  douyinLabel: {
    "zh-CN": "抖音",
    en: "Douyin",
    es: "Douyin",
    fr: "Douyin",
    ko: "Douyin",
    ru: "Douyin",
  },

  qrCodePlaceholder: {
    "zh-CN": "二维码",
    en: "QR Code",
    es: "Código QR",
    fr: "QR Code",
    ko: "QR 코드",
    ru: "QR-код",
  },

  icp: {
    "zh-CN": "粤ICP备XXXXXXXX号",
    en: "ICP Filing No. XXXXXXXXX",
    es: "Registro ICP No. XXXXXXXXX",
    fr: "Enregistrement ICP No. XXXXXXXXX",
    ko: "ICP 등록번호 XXXXXXXXX",
    ru: "ICP-регистрация No. XXXXXXXXX",
  },

  copyright: {
    "zh-CN": "© 2026 深圳市恒永达科技股份有限公司 版权所有",
    en: "© 2026 Shenzhen FOREACH Technology Co., Ltd. All rights reserved.",
    es: "© 2026 Shenzhen FOREACH Technology Co., Ltd. Todos los derechos reservados.",
    fr: "© 2026 Shenzhen FOREACH Technology Co., Ltd. Tous droits réservés.",
    ko: "© 2026 Shenzhen FOREACH Technology Co., Ltd. All rights reserved.",
    ru: "© 2026 Shenzhen FOREACH Technology Co., Ltd. Все права защищены.",
  },
};

/* ================================
   多语言文本读取函数
================================ */

export function getSiteFooterText(text: SiteFooterText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
}

/* ================================
   多语言链接读取函数
================================ */

export function getSiteFooterHref(href: SiteFooterHref, locale: LocaleCode) {
  return href[locale] || href["zh-CN"] || href.en || "#";
}