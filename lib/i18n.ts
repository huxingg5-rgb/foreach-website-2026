/* ================================
   i18n.ts
   官网多语言文案配置文件

   说明：
   1. i18n 是 internationalization 的缩写，意思是“国际化”
   2. 这个文件专门集中管理官网多语言文字
   3. 页面组件只负责排版，不直接写死大量文字
   4. 后期如果接后台 / CMS，可以优先从这里替换为接口数据
================================ */

/* ================================
   官网支持的语言代码
   说明：
   1. zh-CN：简体中文，默认首页路径为 /
   2. en：英文，路径为 /en
   3. es：西班牙语，路径为 /es
   4. fr：法语，路径为 /fr
   5. ko：韩语，路径为 /ko
   6. ru：俄语，路径为 /ru
================================ */
export type LocaleCode = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

/* ================================
   语言菜单项类型
   说明：
   1. code 是语言代码
   2. label 是语言下拉栏里显示的名称
   3. href 是点击语言后跳转的首页路径
================================ */
export type LanguageItem = {
    code: LocaleCode; // 语言代码
    label: string; // 语言显示名称
    href: string; // 语言首页路径
};

/* ================================
   导航菜单项类型
   说明：
   1. href 是导航跳转地址
   2. label 是导航显示文字
================================ */
export type NavItem = {
    href: string; // 导航链接地址
    label: string; // 导航显示文字
};

/* ================================
   Header 顶部导航文案类型
   说明：
   1. 这里规定 Top 栏需要哪些文字
   2. 每种语言都必须按这个结构填写
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
    navItems: NavItem[]; // 当前语言下的导航菜单
};

/* ================================
   首页文案类型
   说明：
   1. 这里先放首页首屏和测试区文案
   2. 后面增加产品模块、应用模块、关于我们模块时，也继续往这里扩展
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
   语言菜单数据
   说明：
   1. 语言下拉栏统一读取这里
   2. 中文首页是 /
   3. 其他语言首页分别是 /en、/es、/fr、/ko、/ru
================================ */
export const languageItems: LanguageItem[] = [
    {
        code: "zh-CN", // 简体中文代码
        label: "简体中文", // 语言下拉栏显示名称
        href: "/", // 中文首页路径
    },
    {
        code: "en", // 英文代码
        label: "English", // 语言下拉栏显示名称
        href: "/en", // 英文首页路径
    },
    {
        code: "es", // 西班牙语代码
        label: "Español", // 语言下拉栏显示名称
        href: "/es", // 西班牙语首页路径
    },
    {
        code: "fr", // 法语代码
        label: "Français", // 语言下拉栏显示名称
        href: "/fr", // 法语首页路径
    },
    {
        code: "ko", // 韩语代码
        label: "한국어", // 语言下拉栏显示名称
        href: "/ko", // 韩语首页路径
    },
    {
        code: "ru", // 俄语代码
        label: "Русский", // 语言下拉栏显示名称
        href: "/ru", // 俄语首页路径
    },
];

/* ================================
   Header 顶部导航 6 国语言文案
   说明：
   1. Top 栏所有用户可见文字都放这里
   2. 后期修改导航名称、搜索框文字、语言按钮文字，只改这里
================================ */
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
        navItems: [
            { href: "/", label: "首页" },
            { href: "/#products", label: "产品中心" },
            { href: "/#applications", label: "应用领域" },
            { href: "/#resources", label: "资源中心" },
            { href: "/#about", label: "关于我们" },
            { href: "/#contact", label: "联系我们" },
        ],
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
        navItems: [
            { href: "/en", label: "Home" },
            { href: "/en#products", label: "Products" },
            { href: "/en#applications", label: "Applications" },
            { href: "/en#resources", label: "Resources" },
            { href: "/en#about", label: "About Us" },
            { href: "/en#contact", label: "Contact Us" },
        ],
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
        navItems: [
            { href: "/es", label: "Inicio" },
            { href: "/es#products", label: "Productos" },
            { href: "/es#applications", label: "Aplicaciones" },
            { href: "/es#resources", label: "Recursos" },
            { href: "/es#about", label: "Sobre nosotros" },
            { href: "/es#contact", label: "Contacto" },
        ],
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
        navItems: [
            { href: "/fr", label: "Accueil" },
            { href: "/fr#products", label: "Produits" },
            { href: "/fr#applications", label: "Applications" },
            { href: "/fr#resources", label: "Ressources" },
            { href: "/fr#about", label: "À propos" },
            { href: "/fr#contact", label: "Contact" },
        ],
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
        navItems: [
            { href: "/ko", label: "홈" },
            { href: "/ko#products", label: "제품" },
            { href: "/ko#applications", label: "응용 분야" },
            { href: "/ko#resources", label: "자료실" },
            { href: "/ko#about", label: "회사 소개" },
            { href: "/ko#contact", label: "문의하기" },
        ],
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
        navItems: [
            { href: "/ru", label: "Главная" }, // 首页：保留，比较标准
            { href: "/ru#products", label: "Продукты" }, // 产品中心：比“Продукция”更短一点，也更适合导航
            { href: "/ru#applications", label: "Сферы" }, // 应用领域：比“Области применения”短很多
            { href: "/ru#resources", label: "Ресурсы" }, // 资源中心：保留，清楚
            { href: "/ru#about", label: "О нас" }, // 关于我们：比“О компании”更短
            { href: "/ru#contact", label: "Контакты" }, // 联系我们：保留
        ],
    },
};

/* ================================
   首页 6 国语言文案
   说明：
   1. 首页文字统一放这里
   2. 页面组件只负责排版
   3. 后期如果接后台 / CMS，可以从接口读取这些字段
================================ */
export const homeI18n: Record<LocaleCode, HomeText> = {
    "zh-CN": {
        heroTitleLine1: "微流体系统核心零部件",
        heroTitleLine2: "液路系统解决方案供应商",
        heroSubtitle:
            "专注于泵、阀、传感器、管路、连接件、采样针及驱动控制模块，为 IVD、生命科学、高端分析仪器、合成生物和实验室自动化提供系统级流体控制支持。",
        productButton: "查看产品中心",
        contactButton: "联系技术支持",
        testTitle: "从核心部件到液路系统",
        testDescription:
            "围绕精密输送、流路切换、压力检测、气泡检测、管路连接与系统集成，构建面向自动化分析仪器的微流体产品体系。",
    },

    en: {
        heroTitleLine1: "Core Components for Microfluidic Systems",
        heroTitleLine2: "Fluidic System Solution Provider",
        heroSubtitle:
            "Focused on pumps, valves, sensors, tubing, fittings, sampling probes, and drive control modules, FOREACH provides system-level fluid control support for IVD, life sciences, high-end analytical instruments, synthetic biology, and laboratory automation.",
        productButton: "View Products",
        contactButton: "Contact Support",
        testTitle: "From Core Components to Fluidic Systems",
        testDescription:
            "We build a microfluidic product platform covering precision dispensing, flow path switching, pressure sensing, bubble detection, tubing connection, and system integration for automated analytical instruments.",
    },

    es: {
        heroTitleLine1: "Componentes clave para sistemas microfluídicos",
        heroTitleLine2: "Proveedor de soluciones fluídicas",
        heroSubtitle:
            "FOREACH se centra en bombas, válvulas, sensores, tubos, conectores, agujas de muestreo y módulos de control, proporcionando soporte fluídico a nivel de sistema para IVD, ciencias de la vida, instrumentos analíticos avanzados, biología sintética y automatización de laboratorios.",
        productButton: "Ver productos",
        contactButton: "Contactar soporte",
        testTitle: "De componentes clave a sistemas fluídicos",
        testDescription:
            "Construimos una plataforma de productos microfluídicos que cubre dosificación precisa, conmutación de vías de flujo, detección de presión, detección de burbujas, conexión de tubos e integración de sistemas para instrumentos analíticos automatizados.",
    },

    fr: {
        heroTitleLine1: "Composants clés pour systèmes microfluidiques",
        heroTitleLine2: "Fournisseur de solutions fluidiques",
        heroSubtitle:
            "FOREACH se concentre sur les pompes, vannes, capteurs, tubes, raccords, aiguilles de prélèvement et modules de contrôle, afin de fournir un support fluidique au niveau système pour l’IVD, les sciences de la vie, les instruments d’analyse avancés, la biologie synthétique et l’automatisation de laboratoire.",
        productButton: "Voir les produits",
        contactButton: "Contacter le support",
        testTitle: "Des composants clés aux systèmes fluidiques",
        testDescription:
            "Nous développons une plateforme de produits microfluidiques couvrant le dosage précis, la commutation des voies fluidiques, la détection de pression, la détection de bulles, la connexion des tubes et l’intégration système pour les instruments d’analyse automatisés.",
    },

    ko: {
        heroTitleLine1: "마이크로플루이딕 시스템 핵심 부품",
        heroTitleLine2: "유체 시스템 솔루션 공급업체",
        heroSubtitle:
            "FOREACH는 펌프, 밸브, 센서, 튜빙, 피팅, 샘플링 프로브 및 구동 제어 모듈을 중심으로 IVD, 생명과학, 고급 분석 장비, 합성생물학 및 실험실 자동화를 위한 시스템 수준의 유체 제어 지원을 제공합니다.",
        productButton: "제품 보기",
        contactButton: "기술 지원 문의",
        testTitle: "핵심 부품에서 유체 시스템까지",
        testDescription:
            "정밀 분주, 유로 전환, 압력 감지, 기포 감지, 튜빙 연결 및 시스템 통합을 아우르는 마이크로플루이딕 제품 플랫폼을 구축하여 자동화 분석 장비를 지원합니다.",
    },

    ru: {
        heroTitleLine1: "Ключевые компоненты для микрофлюидных систем",
        heroTitleLine2: "Поставщик решений для жидкостных систем",
        heroSubtitle:
            "FOREACH специализируется на насосах, клапанах, датчиках, трубках, соединителях, пробоотборных иглах и модулях управления, предоставляя системную поддержку управления жидкостями для IVD, наук о жизни, высокоточных аналитических приборов, синтетической биологии и лабораторной автоматизации.",
        productButton: "Смотреть продукцию",
        contactButton: "Связаться с поддержкой",
        testTitle: "От ключевых компонентов к жидкостным системам",
        testDescription:
            "Мы создаем платформу микрофлюидных продуктов для точного дозирования, переключения потоков, контроля давления, обнаружения пузырьков, соединения трубок и системной интеграции в автоматизированных аналитических приборах.",
    },
};

/* ================================
   支持的多语言路径
   说明：
   1. 中文首页不使用 /zh-CN，而是直接使用 /
   2. 其他语言使用 /en、/es、/fr、/ko、/ru
================================ */
export const supportedLocales: LocaleCode[] = [
    "zh-CN",
    "en",
    "es",
    "fr",
    "ko",
    "ru",
];

/* ================================
   判断是否为支持的语言
   说明：
   1. URL 里拿到的是 string
   2. 这个函数用来判断它是不是有效语言
================================ */
export function isSupportedLocale(locale: string): locale is LocaleCode {
    return supportedLocales.includes(locale as LocaleCode);
}

/* ================================
   获取语言首页路径
   说明：
   1. 中文返回 /
   2. 其他语言返回 /en、/es、/fr、/ko、/ru
================================ */
export function getLocaleHomePath(locale: LocaleCode) {
    if (locale === "zh-CN") {
        return "/";
    }

    return `/${locale}`;
}

/* ================================
   获取当前语言下的锚点路径
   说明：
   1. 中文产品模块路径：/#products
   2. 英文产品模块路径：/en#products
   3. 其他语言同理
================================ */
export function getLocaleAnchorPath(locale: LocaleCode, anchor: string) {
    if (locale === "zh-CN") {
        return `/#${anchor}`;
    }

    return `/${locale}#${anchor}`;
}

/* ================================
   根据当前路径判断语言
   说明：
   1. /en 开头就是英文
   2. /es 开头就是西班牙语
   3. /fr 开头就是法语
   4. /ko 开头就是韩语
   5. /ru 开头就是俄语
   6. 其他默认中文
================================ */
export function getLocaleFromPathname(pathname: string): LocaleCode {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
        return "en";
    }

    if (pathname === "/es" || pathname.startsWith("/es/")) {
        return "es";
    }

    if (pathname === "/fr" || pathname.startsWith("/fr/")) {
        return "fr";
    }

    if (pathname === "/ko" || pathname.startsWith("/ko/")) {
        return "ko";
    }

    if (pathname === "/ru" || pathname.startsWith("/ru/")) {
        return "ru";
    }

    return "zh-CN";
}

/* ================================
   后端 / CMS 对接预留说明
   说明：
   1. 当前阶段文案写在前端 i18n.ts 里
   2. 后期如果接后台，可以让后台返回类似结构的数据
   3. 页面组件不需要大改，只要把 homeI18n 替换成接口数据即可
   4. 例如未来可以从 /api/content/home?locale=en 获取首页英文内容
================================ */