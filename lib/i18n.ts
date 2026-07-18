// lib/i18n.ts
// 官网多语言文案与语言工具函数
//
// 说明：
// 1. i18n 是 internationalization 的缩写，意思是“国际化”
// 2. 这个文件主要负责“页面文案”和“语言判断工具”
// 3. 语言列表、语言路径、htmlLang、hreflang 已经统一放到 data/languages.ts
// 4. 后期如果接后端 / CMS，可以优先把 homeI18n、headerI18n 替换成接口数据

import {
  getEnabledLanguages, // 获取启用语言列表
  getHtmlLang, // 根据语言获取 html lang
  getLanguageHomeHref, // 根据语言获取首页路径
  getLocaleFromPathname as getLocaleFromPathnameFromLanguages, // 根据路径判断当前语言
  type LocaleCode, // 官网支持的语言代码类型
} from "@/data/languages"; // 从统一语言配置文件读取语言信息

// 重新导出 LocaleCode
// 说明：其他文件如果从 lib/i18n.ts 引入 LocaleCode，可以继续使用
export type { LocaleCode };

/* ================================
   01. 语言菜单项类型
================================ */

export type LanguageItem = {
  code: LocaleCode; // 语言代码
  label: string; // 语言显示名称
  href: string; // 点击后跳转路径
};

/* ================================
   02. Header 顶部导航文案类型
================================ */

export type HeaderText = {
  logoAriaLabel: string; // Logo 链接无障碍说明
  navAriaLabel: string; // 桌面端导航无障碍说明
  mobileNavAriaLabel: string; // 手机端导航无障碍说明
  searchPlaceholder: string; // 搜索框占位文字
  searchAriaLabel: string; // 搜索输入框无障碍说明
  searchButtonAriaLabel: string; // 搜索按钮无障碍说明
  languageAriaLabel: string; // 语言按钮无障碍说明
  mobileMenuAriaLabel: string; // 手机菜单按钮无障碍说明
  currentLanguageLabel: string; // 当前语言按钮显示文字
  languageSwitchTitle: string; // 语言菜单鼠标悬停提示
};

/* ================================
   03. 首页文案类型
================================ */

export type HomeText = {
  heroTitleLine1: string; // 首页首屏主标题第一行
  heroTitleLine2: string; // 首页首屏主标题第二行
  heroSubtitle: string; // 首页首屏副标题
  productButton: string; // 产品中心按钮文字
  contactButton: string; // 联系我们按钮文字
  testTitle: string; // 测试区域标题
  testDescription: string; // 测试区域说明
};

/* ================================
   04. 语言菜单数据
================================ */

// Header 语言下拉菜单数据
// 说明：
// 1. 不在这里手写 /zh、/en 等路径
// 2. 统一从 data/languages.ts 读取
// 3. 避免 /zh 和 / 冲突
export const languageItems: LanguageItem[] = getEnabledLanguages().map(
  (language) => ({
    code: language.code, // 语言代码
    label: language.label, // 语言显示名称
    href: language.href, // 语言首页路径
  })
);

/* ================================
   05. Header 顶部导航 6 国语言文案
================================ */

// Header 顶部导航多语言文案
// 说明：
// 1. 这里只放 Header 自己需要的文字
// 2. 导航菜单名称已经迁移到 data/navigation.ts
export const headerI18n: Record<LocaleCode, HeaderText> = {
  "zh-CN": {
    logoAriaLabel: "FOREACH 首页",
    navAriaLabel: "主导航",
    mobileNavAriaLabel: "移动端导航",
    searchPlaceholder: "搜索产品 / 型号",
    searchAriaLabel: "搜索产品或型号",
    searchButtonAriaLabel: "搜索",
    languageAriaLabel: "切换语言",
    mobileMenuAriaLabel: "打开导航菜单",
    currentLanguageLabel: "简体中文",
    languageSwitchTitle: "切换语言",
  },

  en: {
    logoAriaLabel: "FOREACH Home",
    navAriaLabel: "Main navigation",
    mobileNavAriaLabel: "Mobile navigation",
    searchPlaceholder: "Search products / models",
    searchAriaLabel: "Search products or models",
    searchButtonAriaLabel: "Search",
    languageAriaLabel: "Change language",
    mobileMenuAriaLabel: "Open navigation menu",
    currentLanguageLabel: "English",
    languageSwitchTitle: "Change language",
  },

  es: {
    logoAriaLabel: "Inicio de FOREACH",
    navAriaLabel: "Navegación principal",
    mobileNavAriaLabel: "Navegación móvil",
    searchPlaceholder: "Buscar productos / modelos",
    searchAriaLabel: "Buscar productos o modelos",
    searchButtonAriaLabel: "Buscar",
    languageAriaLabel: "Cambiar idioma",
    mobileMenuAriaLabel: "Abrir menú de navegación",
    currentLanguageLabel: "Español",
    languageSwitchTitle: "Cambiar idioma",
  },

  fr: {
    logoAriaLabel: "Accueil FOREACH",
    navAriaLabel: "Navigation principale",
    mobileNavAriaLabel: "Navigation mobile",
    searchPlaceholder: "Rechercher produits / modèles",
    searchAriaLabel: "Rechercher des produits ou des modèles",
    searchButtonAriaLabel: "Rechercher",
    languageAriaLabel: "Changer de langue",
    mobileMenuAriaLabel: "Ouvrir le menu de navigation",
    currentLanguageLabel: "Français",
    languageSwitchTitle: "Changer de langue",
  },

  ko: {
    logoAriaLabel: "FOREACH 홈",
    navAriaLabel: "주요 내비게이션",
    mobileNavAriaLabel: "모바일 내비게이션",
    searchPlaceholder: "제품 / 모델 검색",
    searchAriaLabel: "제품 또는 모델 검색",
    searchButtonAriaLabel: "검색",
    languageAriaLabel: "언어 변경",
    mobileMenuAriaLabel: "내비게이션 메뉴 열기",
    currentLanguageLabel: "한국어",
    languageSwitchTitle: "언어 변경",
  },

  ru: {
    logoAriaLabel: "Главная FOREACH",
    navAriaLabel: "Основная навигация",
    mobileNavAriaLabel: "Мобильная навигация",
    searchPlaceholder: "Поиск продукции / моделей",
    searchAriaLabel: "Поиск продукции или моделей",
    searchButtonAriaLabel: "Поиск",
    languageAriaLabel: "Сменить язык",
    mobileMenuAriaLabel: "Открыть меню навигации",
    currentLanguageLabel: "Русский",
    languageSwitchTitle: "Сменить язык",
  },
};

/* ================================
   06. 首页 6 国语言文案
================================ */

// 首页多语言文案
// 说明：
// 1. 首页文字统一放这里
// 2. 页面组件只负责排版
// 3. 后期如果接后台 / CMS，可以从接口读取这些字段
export const homeI18n: Record<LocaleCode, HomeText> = {
  "zh-CN": {
    heroTitleLine1: "微流体系统核心部件",
    heroTitleLine2: "精密液路解决方案",
    heroSubtitle:
      "提供泵、阀、传感器、管路、接头、采样针及控制模块，服务于体外诊断、生命科学、分析仪器、合成生物和实验室自动化。",
    productButton: "查看产品中心",
    contactButton: "联系技术支持",
    testTitle: "从核心部件到液路系统",
    testDescription:
      "围绕精密输送、流路切换、压力检测、气泡检测、管路连接与系统集成，构建面向自动化分析仪器的微流体产品体系。",
  },

  en: {
    heroTitleLine1: "Core Components for",
    heroTitleLine2: "Microfluidic Systems",
    heroSubtitle:
      "Pumps, valves, sensors, tubing, fittings, sampling needles, and control modules for IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation.",
    productButton: "View Products",
    contactButton: "Contact Support",
    testTitle: "From Core Components to Fluidic Systems",
    testDescription:
      "We build a microfluidic product platform covering precision dispensing, flow path switching, pressure sensing, bubble detection, tubing connection, and system integration for automated analytical instruments.",
  },

  es: {
    heroTitleLine1: "Componentes microfluídicos esenciales",
    heroTitleLine2: "",
    heroSubtitle:
      "Bombas, válvulas, sensores, tubos, conectores, agujas de muestreo y módulos de control para diagnóstico in vitro, ciencias de la vida, instrumentación analítica, biología sintética y automatización de laboratorios.",
    productButton: "Ver productos",
    contactButton: "Contactar soporte",
    testTitle: "De componentes clave a sistemas fluídicos",
    testDescription:
      "Construimos una plataforma de productos microfluídicos que cubre dosificación precisa, conmutación de vías de flujo, detección de presión, detección de burbujas, conexión de tubos e integración de sistemas para instrumentos analíticos automatizados.",
  },

  fr: {
    heroTitleLine1: "Composants microfluidiques essentiels",
    heroTitleLine2: "",
    heroSubtitle:
      "Pompes, vannes, capteurs, tubes, raccords, aiguilles de prélèvement et modules de commande pour le diagnostic in vitro, les sciences de la vie, l’instrumentation analytique, la biologie de synthèse et l’automatisation des laboratoires.",
    productButton: "Voir les produits",
    contactButton: "Contacter le support",
    testTitle: "Des composants clés aux systèmes fluidiques",
    testDescription:
      "Nous développons une plateforme de produits microfluidiques couvrant le dosage précis, la commutation des voies fluidiques, la détection de pression, la détection de bulles, la connexion des tubes et l’intégration système pour les instruments d’analyse automatisés.",
  },

  ko: {
    heroTitleLine1: "미세유체 시스템을 위한",
    heroTitleLine2: "핵심 부품",
    heroSubtitle:
      "체외진단, 생명과학, 분석기기, 합성생물학 및 실험실 자동화를 위한 펌프, 밸브, 센서, 튜브, 피팅, 샘플링 니들 및 제어 모듈을 제공합니다.",
    productButton: "제품 보기",
    contactButton: "기술 지원 문의",
    testTitle: "핵심 부품에서 유체 시스템까지",
    testDescription:
      "정밀 분주, 유로 전환, 압력 감지, 기포 감지, 튜빙 연결 및 시스템 통합을 아우르는 마이크로플루이딕 제품 플랫폼을 구축하여 자동화 분석 장비를 지원합니다.",
  },

  ru: {
    heroTitleLine1: "Ключевые компоненты микрофлюидных систем",
    heroTitleLine2: "",
    heroSubtitle:
      "Насосы, клапаны, датчики, трубки, соединители, пробоотборные иглы и модули управления для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации.",
    productButton: "Смотреть продукцию",
    contactButton: "Связаться с поддержкой",
    testTitle: "От ключевых компонентов к жидкостным системам",
    testDescription:
      "Мы создаем платформу микрофлюидных продуктов для точного дозирования, переключения потоков, контроля давления, обнаружения пузырьков, соединения трубок и системной интеграции в автоматизированных аналитических приборах.",
  },
};

/* ================================
   07. 支持的语言列表
================================ */

// 支持的语言代码列表
// 说明：
// 1. 从 data/languages.ts 自动生成
// 2. 避免 i18n.ts 和 languages.ts 各自维护一份语言列表
export const supportedLocales: LocaleCode[] = getEnabledLanguages().map(
  (language) => language.code
);

/* ================================
   08. 判断是否为支持的语言
================================ */

// 判断是否为支持的语言
// 说明：URL 里拿到的是 string，这个函数用于判断它是不是有效语言
export function isSupportedLocale(locale: string): locale is LocaleCode {
  return supportedLocales.includes(locale as LocaleCode);
}

/* ================================
   09. 获取语言首页路径
================================ */

// 获取语言首页路径
// 说明：
// 1. 中文返回 /
// 2. 英文返回 /en
// 3. 其他语言同理
export function getLocaleHomePath(locale: LocaleCode) {
  return getLanguageHomeHref(locale);
}

/* ================================
   10. 获取当前语言下的锚点路径
================================ */

// 获取当前语言下的锚点路径
// 说明：
// 1. 中文产品模块路径：/#products
// 2. 英文产品模块路径：/en#products
// 3. anchor 可以传 "products"，也可以传 "#products"
export function getLocaleAnchorPath(locale: LocaleCode, anchor: string) {
  const homeHref = getLanguageHomeHref(locale); // 获取当前语言首页路径，例如 / 或 /en

  const cleanAnchor = anchor.replace(/^#/, ""); // 去掉开头的 #，避免出现 ##products

  if (homeHref === "/") {
    return `/#${cleanAnchor}`; // 中文默认首页锚点路径
  }

  return `${homeHref}#${cleanAnchor}`; // 其他语言首页锚点路径
}

/* ================================
   11. 根据当前路径判断语言
================================ */

// 根据当前路径判断语言
// 说明：实际判断逻辑来自 data/languages.ts
export function getLocaleFromPathname(pathname: string): LocaleCode {
  return getLocaleFromPathnameFromLanguages(pathname);
}

/* ================================
   12. 获取 html lang
================================ */

// 获取 html lang
// 说明：Header / layout 可以用它设置 html lang
export function getLocaleHtmlLang(locale: LocaleCode) {
  return getHtmlLang(locale);
}

/* ================================
   13. 后端 / CMS 对接预留说明
================================ */

// 后端对接说明：
// 当前 headerI18n 和 homeI18n 是前端本地静态文案。
// 后期如果接 CMS / 后端，可以设计接口：
//
// GET /api/content/header?locale=en
// GET /api/content/home?locale=en
//
// 返回结构建议：
// {
//   "heroTitleLine1": "Core Components for Microfluidic Systems",
//   "heroTitleLine2": "Fluidic System Solution Provider",
//   "heroSubtitle": "...",
//   "productButton": "View Products",
//   "contactButton": "Contact Support"
// }
//
// 前端替换方式：
// 1. 第一阶段继续使用本地 homeI18n / headerI18n
// 2. 第二阶段新增 fetchHeaderContent(locale)、fetchHomeContent(locale)
// 3. 页面组件保持读取相同字段名，不需要大改排版
