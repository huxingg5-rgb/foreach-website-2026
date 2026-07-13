"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================================================
   文件路径：
   app/about/foreach/AboutForeachClient.tsx

   作用：
   1. 渲染“关于恒永达”页面主体内容
   2. 支持多语言：中文、英文、西语、法语、韩语、俄语
   3. 给公司优势数字、荣誉数字增加滚动计数动效
   4. 视频默认静音，使用本地视频和本地封面
   5. 所有图片路径已统一命名，后续把图片放到指定文件夹即可自动读取

   图片/视频文件放置规则：
   public
   └─ images
      └─ about
         └─ foreach
            ├─ about-foreach-banner.webp
            ├─ company-strength.webp
            └─ honors
               ├─ honor-main-certificate.webp
               ├─ honor-thumb-01.webp
               ├─ honor-thumb-02.webp
               ├─ honor-thumb-03.webp
               ├─ honor.webp
               ├─ honor.webp
               ├─ honor.webp
               ├─ honor.webp
               ├─ honor.webp
               ├─ honor.webp
               ├─ honor.webp
               └─ honor.webp

   视频文件当前沿用你已经放好的路径：
   public/images/home/foreach-company-intro.mp4
   public/images/home/tv-foreach.png
========================================================= */

/* 官网支持的语言 */
const SUPPORTED_LOCALES = ["zh-CN", "en", "es", "fr", "ko", "ru"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

type LocalizedText = Record<Locale, string>;

/* =========================================================
   语言识别
   说明：
   1. 优先读取网址第一段，例如 /en/about/foreach
   2. 其次读取 Cookie，例如 NEXT_LOCALE / locale / lang
   3. 再读取 html lang
   4. 最后读取浏览器语言
   5. 都没有时，默认中文 zh-CN
========================================================= */
const LOCALE_ALIAS_MAP: Record<string, Locale> = {
  zh: "zh-CN",
  "zh-cn": "zh-CN",
  "zh-hans": "zh-CN",
  "zh-hans-cn": "zh-CN",
  cn: "zh-CN",

  en: "en",
  "en-us": "en",
  "en-gb": "en",

  es: "es",
  "es-es": "es",
  "es-mx": "es",

  fr: "fr",
  "fr-fr": "fr",

  ko: "ko",
  "ko-kr": "ko",

  ru: "ru",
  "ru-ru": "ru",
};

/* 把不同格式的语言值统一转为本站支持的语言 */
function normalizeLocale(value?: string | null): Locale | null {
  if (!value) return null;

  const normalizedValue = value.trim().toLowerCase();

  return LOCALE_ALIAS_MAP[normalizedValue] ?? null;
}

/* 读取 Cookie */
function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;

  const cookieItem = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookieItem) return null;

  return decodeURIComponent(cookieItem.split("=")[1] ?? "");
}

function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return "zh-CN";

  /* 1. 从网址第一段读取，例如 /en/about/foreach */
  const firstPathSegment = window.location.pathname
    .split("/")
    .filter(Boolean)[0];

  const localeFromPath = normalizeLocale(firstPathSegment);

  if (localeFromPath) return localeFromPath;

  /* 2. 从 URL 参数读取，例如 /about/foreach?lang=en */
  const searchParams = new URLSearchParams(window.location.search);

  const localeFromQuery =
    normalizeLocale(searchParams.get("lang")) ||
    normalizeLocale(searchParams.get("locale"));

  if (localeFromQuery) return localeFromQuery;

  /* 3. 从 Cookie 读取，兼容不同命名方式 */
  const cookieNames = [
    "NEXT_LOCALE",
    "locale",
    "lang",
    "site-locale",
    "siteLocale",
    "language",
    "foreach-locale",
    "foreach_locale",
  ];

  for (const cookieName of cookieNames) {
    const localeFromCookie = normalizeLocale(getCookieValue(cookieName));

    if (localeFromCookie) return localeFromCookie;
  }

  /* 4. 从 localStorage 读取，兼容前端语言切换 */
  const storageNames = [
    "NEXT_LOCALE",
    "locale",
    "lang",
    "site-locale",
    "siteLocale",
    "language",
    "foreach-locale",
    "foreach_locale",
  ];

  for (const storageName of storageNames) {
    const localeFromStorage = normalizeLocale(
      window.localStorage.getItem(storageName)
    );

    if (localeFromStorage) return localeFromStorage;
  }

  /* 5. 从 html lang 读取 */
  const localeFromHtml = normalizeLocale(document.documentElement.lang);

  if (localeFromHtml) return localeFromHtml;

  /* 6. 从浏览器语言读取 */
  const localeFromNavigator = normalizeLocale(navigator.language);

  if (localeFromNavigator) return localeFromNavigator;

  return "zh-CN";
}

/* 读取多语言文本 */
function getLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale] || text.en || text["zh-CN"];
}

/* =========================================================
   页面多语言文案
========================================================= */
const pageText = {
  heroTitle: {
    "zh-CN": "MAKE FLOW EASY",
    en: "MAKE FLOW EASY",
    es: "MAKE FLOW EASY",
    fr: "MAKE FLOW EASY",
    ko: "MAKE FLOW EASY",
    ru: "MAKE FLOW EASY",
  },
  heroDescription: {
    "zh-CN":
      "恒永达科技专注于微流体系统核心零部件与液路解决方案，面向 IVD、生命科学、高端分析仪器、合成生物和实验室自动化等领域，提供关键流体控制产品与系统级支持。",
    en: "FOREACH Technology focuses on core microfluidic components and fluidic system solutions, providing key fluid control products and system-level support for IVD, life sciences, high-end analytical instruments, synthetic biology, and laboratory automation.",
    es: "FOREACH Technology se centra en componentes microfluídicos clave y soluciones de sistemas de fluidos, proporcionando productos de control de fluidos y soporte a nivel de sistema para IVD, ciencias de la vida, instrumentos analíticos avanzados, biología sintética y automatización de laboratorios.",
    fr: "FOREACH Technology se concentre sur les composants microfluidiques essentiels et les solutions de systèmes fluidiques, en fournissant des produits clés de contrôle des fluides et un support au niveau système pour le DIV, les sciences de la vie, les instruments d’analyse haut de gamme, la biologie de synthèse et l’automatisation de laboratoire.",
    ko: "FOREACH Technology는 미세유체 시스템 핵심 부품과 유체 시스템 솔루션에 집중하며, IVD, 생명과학, 고급 분석 장비, 합성생물학 및 실험실 자동화 분야에 핵심 유체 제어 제품과 시스템 수준의 지원을 제공합니다.",
    ru: "FOREACH Technology специализируется на ключевых компонентах микрофлюидных систем и решениях для жидкостных трактов, предоставляя продукты управления потоками и системную поддержку для IVD, наук о жизни, высокоточного аналитического оборудования, синтетической биологии и лабораторной автоматизации.",
  },
  introTitle: {
    "zh-CN": "恒永达科技",
    en: "FOREACH Technology",
    es: "FOREACH Technology",
    fr: "FOREACH Technology",
    ko: "FOREACH Technology",
    ru: "FOREACH Technology",
  },
  introParagraph1: {
    "zh-CN":
      "恒永达科技（股票代码：874030）成立于 2012 年，作为国家级专精特新“小巨人”企业、深圳市瞪羚企业、国家高新技术企业及广东省工程技术研究中心认定单位，始终以微流体系统领域的创新引领者姿态，深耕于微流体核心部件的研发与制造。公司构建了覆盖自动化分析仪器液路系统全链条的产品矩阵，涵盖泵、阀、采样针、连接件、橡塑管、驱动器、传感器等关键零部件，广泛应用于生命科学、合成生物、高端检测等多个领域，形成了高精度、全场景的微流体解决方案体系。",
    en: "Founded in 2012, FOREACH Technology, stock code 874030, is recognized as a National Specialized and Sophisticated “Little Giant” enterprise, a Shenzhen Gazelle enterprise, a National High-Tech Enterprise, and a Guangdong Engineering Technology Research Center. As an innovation leader in the field of microfluidic systems, FOREACH has long been dedicated to the R&D and manufacturing of core microfluidic components. The company has built a product matrix covering the full chain of fluidic systems for automated analytical instruments, including pumps, valves, sampling needles, fittings, elastomeric tubing, drivers, sensors, and other key components. Its products are widely used in life sciences, synthetic biology, high-end testing, and other fields, forming a high-precision and full-scenario microfluidic solution system.",
    es: "Fundada en 2012, FOREACH Technology, código bursátil 874030, es reconocida como una empresa nacional especializada y sofisticada “Little Giant”, una empresa Gazelle de Shenzhen, una empresa nacional de alta tecnología y un Centro de Investigación de Tecnología de Ingeniería de Guangdong. Como líder innovador en el campo de los sistemas microfluídicos, FOREACH se ha dedicado durante años a la I+D y fabricación de componentes microfluídicos clave. La empresa ha construido una matriz de productos que cubre toda la cadena de sistemas de fluidos para instrumentos analíticos automatizados, incluidos bombas, válvulas, agujas de muestreo, conectores, tubos elastoméricos, controladores, sensores y otros componentes clave. Sus productos se utilizan ampliamente en ciencias de la vida, biología sintética, pruebas de alta gama y otros campos, formando un sistema de soluciones microfluídicas de alta precisión y para múltiples escenarios.",
    fr: "Fondée en 2012, FOREACH Technology, code boursier 874030, est reconnue comme une entreprise nationale spécialisée et innovante « Little Giant », une entreprise Gazelle de Shenzhen, une entreprise nationale de haute technologie et un centre de recherche en technologie d’ingénierie du Guangdong. En tant que leader de l’innovation dans le domaine des systèmes microfluidiques, FOREACH se consacre depuis longtemps à la R&D et à la fabrication de composants microfluidiques clés. L’entreprise a construit une matrice de produits couvrant toute la chaîne des systèmes fluidiques pour instruments d’analyse automatisés, notamment les pompes, valves, aiguilles de prélèvement, raccords, tubes élastomères, modules de commande, capteurs et autres composants essentiels. Ses produits sont largement utilisés dans les sciences de la vie, la biologie de synthèse, les tests haut de gamme et d’autres domaines, formant un système de solutions microfluidiques de haute précision et adapté à de multiples scénarios.",
    ko: "2012년에 설립된 FOREACH Technology는 주식 코드 874030으로, 국가급 전문·정밀·특색·혁신 ‘작은 거인’ 기업, 선전시 가젤 기업, 국가 첨단기술기업 및 광둥성 공정기술연구센터 인정 기업입니다. FOREACH는 미세유체 시스템 분야의 혁신 리더로서 핵심 미세유체 부품의 연구개발과 제조에 지속적으로 집중해 왔습니다. 회사는 자동화 분석 장비의 유체 시스템 전반을 포괄하는 제품 매트릭스를 구축했으며, 펌프, 밸브, 샘플링 니들, 피팅, 탄성 튜빙, 드라이버, 센서 등 핵심 부품을 포함합니다. 해당 제품은 생명과학, 합성생물학, 고급 검사 등 다양한 분야에 널리 적용되며, 고정밀·전방위 미세유체 솔루션 체계를 형성하고 있습니다.",
    ru: "Компания FOREACH Technology, основанная в 2012 году, с биржевым кодом 874030, признана национальным предприятием категории Specialized and Sophisticated “Little Giant”, предприятием Shenzhen Gazelle, национальным высокотехнологичным предприятием и инженерно-технологическим исследовательским центром провинции Гуандун. Как инновационный лидер в области микрофлюидных систем, FOREACH многие годы занимается разработкой и производством ключевых микрофлюидных компонентов. Компания сформировала продуктовую матрицу, охватывающую всю цепочку жидкостных систем для автоматизированных аналитических приборов, включая насосы, клапаны, пробоотборные иглы, фитинги, эластомерные трубки, драйверы, датчики и другие ключевые компоненты. Продукция широко применяется в науках о жизни, синтетической биологии, высокоточном тестировании и других областях, формируя высокоточную систему микрофлюидных решений для различных сценариев применения.",
  },

  honorTitle: {
    "zh-CN": "荣誉资质",
    en: "Honors & Qualifications",
    es: "Honores y certificaciones",
    fr: "Distinctions et qualifications",
    ko: "인증 및 수상",
    ru: "Награды и квалификации",
  },
  honorSummaryTitle: {
    "zh-CN": "拥有多项企业资质\n技术荣誉",
    en: "Multiple corporate qualifications\nand technical honors",
    es: "Múltiples certificaciones empresariales\ny reconocimientos técnicos",
    fr: "Multiples qualifications d’entreprise\net distinctions techniques",
    ko: "다양한 기업 인증과\n기술 수상",
    ru: "Множество корпоративных квалификаций\nи технических наград",
  },
} satisfies Record<string, LocalizedText>;

/* 公司优势数据 */
const advantageStats = [
  {
    value: 14,
    label: {
      "zh-CN": "行业深耕",
      en: "Years of Focus",
      es: "Años de experiencia",
      fr: "Années d’expérience",
      ko: "산업 경험",
      ru: "Лет опыта",
    },
  },
  {
    value: 96,
    label: {
      "zh-CN": "知识产权",
      en: "Intellectual Property",
      es: "Propiedad intelectual",
      fr: "Propriété intellectuelle",
      ko: "지식재산권",
      ru: "Интеллектуальная собственность",
    },
  },
  {
    value: 2500,
    label: {
      "zh-CN": "累计服务客户",
      en: "Customers Served",
      es: "Clientes atendidos",
      fr: "Clients servis",
      ko: "누적 고객사",
      ru: "Обслуженные клиенты",
    },
  },
  {
    value: 5000,
    label: {
      "zh-CN": "产品规格",
      en: "Product Specifications",
      es: "Especificaciones de producto",
      fr: "Spécifications produits",
      ko: "제품 사양",
      ru: "Спецификации продукции",
    },
  },
];

/* 荣誉资质数据 */
const honorStats = [
  {
    value: 10,
    label: {
      "zh-CN": "企业资质",
      en: "Qualifications",
      es: "Certificaciones",
      fr: "Qualifications",
      ko: "기업 인증",
      ru: "Квалификации",
    },
  },
  {
    value: 10,
    label: {
      "zh-CN": "企业荣誉",
      en: "Honors",
      es: "Reconocimientos",
      fr: "Distinctions",
      ko: "기업 수상",
      ru: "Награды",
    },
  },
  {
    value: 96,
    label: {
      "zh-CN": "知识产权",
      en: "Intellectual Property",
      es: "Propiedad intelectual",
      fr: "Propriété intellectuelle",
      ko: "지식재산권",
      ru: "Интеллектуальная собственность",
    },
  },
];

/* 页面图片路径统一管理 */
const aboutImages = {
  /* Banner 背景图 */
  banner: "/images/about/foreach/about-foreach-banner.webp",

  /* 公司优势下方图片，如后续需要可重新渲染 */
  companyStrength: "/images/about/foreach/company-strength.webp",

  /* 公司介绍视频封面 */
  videoPoster: "/images/about/foreach/company-video-poster-square.png",
};

/* 页面视频路径统一管理 */
const aboutVideos = {
  companyIntro: "/images/home/foreach-company-intro.mp4",
};

/* 荣誉主证书 */
const honorMainCertificate = {
  title: {
    "zh-CN": "高新技术企业证书",
    en: "High-Tech Enterprise Certificate",
    es: "Certificado de empresa de alta tecnología",
    fr: "Certificat d'entreprise de haute technologie",
    ko: "하이테크 기업 인증서",
    ru: "Сертификат высокотехнологичного предприятия",
  },
  src: "/images/about/foreach/honors/honor-main-certificate.webp",
};

const honorTopCertificates = [
  {
    title: { "zh-CN": "ISO 13485", en: "ISO 13485", es: "ISO 13485", fr: "ISO 13485", ko: "ISO 13485", ru: "ISO 13485" },
    src: "/images/about/foreach/honors/honor-row2-iso13485.webp",
  },
  {
    title: { "zh-CN": "ISO 9001", en: "ISO 9001", es: "ISO 9001", fr: "ISO 9001", ko: "ISO 9001", ru: "ISO 9001" },
    src: "/images/about/foreach/honors/honor-row2-iso9001.webp",
  },
];

const honorMiddleImages = [
  {
    title: { "zh-CN": "广东省工程技术研究中心", en: "Guangdong Engineering Technology Research Center", es: "Guangdong Engineering Technology Research Center", fr: "Guangdong Engineering Technology Research Center", ko: "Guangdong Engineering Technology Research Center", ru: "Guangdong Engineering Technology Research Center" },
    src: "/images/about/foreach/honors/honor-row2-engineering-center.webp",
  },
  {
    title: { "zh-CN": "瞪羚企业", en: "Gazelle Enterprise", es: "Gazelle Enterprise", fr: "Gazelle Enterprise", ko: "Gazelle Enterprise", ru: "Gazelle Enterprise" },
    src: "/images/about/foreach/honors/honor-row2-gazelle.webp",
  },
  {
    title: { "zh-CN": "专精特新小巨人企业", en: "Specialized and Innovative Little Giant Enterprise", es: "Specialized and Innovative Little Giant Enterprise", fr: "Specialized and Innovative Little Giant Enterprise", ko: "Specialized and Innovative Little Giant Enterprise", ru: "Specialized and Innovative Little Giant Enterprise" },
    src: "/images/about/foreach/honors/honor-row2-little-giant.webp",
  },
];

const honorBottomImages = [
  {
    title: { "zh-CN": "团体标准 01", en: "Group Standard 01", es: "Group Standard 01", fr: "Group Standard 01", ko: "Group Standard 01", ru: "Group Standard 01" },
    src: "/images/about/foreach/honors/honor-row3-national-standard-01.webp",
  },
  {
    title: { "zh-CN": "团体标准 02", en: "Group Standard 02", es: "Group Standard 02", fr: "Group Standard 02", ko: "Group Standard 02", ru: "Group Standard 02" },
    src: "/images/about/foreach/honors/honor-row3-national-standard-02.webp",
  },
  {
    title: { "zh-CN": "团体标准 03", en: "Group Standard 03", es: "Group Standard 03", fr: "Group Standard 03", ko: "Group Standard 03", ru: "Group Standard 03" },
    src: "/images/about/foreach/honors/honor-row3-national-standard-03.webp",
  },
  {
    title: { "zh-CN": "发明专利证书 01", en: "Invention Patent Certificate 01", es: "Invention Patent Certificate 01", fr: "Invention Patent Certificate 01", ko: "Invention Patent Certificate 01", ru: "Invention Patent Certificate 01" },
    src: "/images/about/foreach/honors/honor-row3-invention-patent-01.webp",
  },
  {
    title: { "zh-CN": "发明专利证书 02", en: "Invention Patent Certificate 02", es: "Invention Patent Certificate 02", fr: "Invention Patent Certificate 02", ko: "Invention Patent Certificate 02", ru: "Invention Patent Certificate 02" },
    src: "/images/about/foreach/honors/honor-row3-invention-patent-02.webp",
  },
  {
    title: { "zh-CN": "发明专利证书 03", en: "Invention Patent Certificate 03", es: "Invention Patent Certificate 03", fr: "Invention Patent Certificate 03", ko: "Invention Patent Certificate 03", ru: "Invention Patent Certificate 03" },
    src: "/images/about/foreach/honors/honor-row3-invention-patent-03.webp",
  },
  {
    title: { "zh-CN": "发明专利证书 04", en: "Invention Patent Certificate 04", es: "Invention Patent Certificate 04", fr: "Invention Patent Certificate 04", ko: "Invention Patent Certificate 04", ru: "Invention Patent Certificate 04" },
    src: "/images/about/foreach/honors/honor-row3-invention-patent-04.webp",
  },
  {
    title: { "zh-CN": "发明专利证书 05", en: "Invention Patent Certificate 05", es: "Invention Patent Certificate 05", fr: "Invention Patent Certificate 05", ko: "Invention Patent Certificate 05", ru: "Invention Patent Certificate 05" },
    src: "/images/about/foreach/honors/honor-row3-invention-patent-05.webp",
  },
];

function LocalImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className={`about-foreach-image-placeholder ${className}`} />;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

/* =========================================================
   数字计数组件
   参数说明：
   value：最终显示的数字
   duration：动画时长，单位毫秒
   suffix：数字后缀，这里默认是 +
========================================================= */
function CountUpNumber({
  value,
  duration = 1200,
  suffix = "+",
  className = "",
  plusClassName = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
  plusClassName?: string;
}) {
  const numberRef = useRef<HTMLSpanElement | null>(null);

  /* 是否已经播放过动画，避免用户上下滚动时反复跳动 */
  const hasAnimatedRef = useRef(false);

  /* 当前显示的数字 */
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = numberRef.current;

    if (!element) return;

    /* 创建滚动进入视口监听 */
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        /* 元素进入视口，并且还没有播放过，才开始动画 */
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const startTime = performance.now();

          /* easeOutCubic：让数字前面增长快，后面慢慢停下来，更自然 */
          const easeOutCubic = (progress: number) =>
            1 - Math.pow(1 - progress, 3);

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutCubic(progress);

            const currentValue = Math.round(value * easedProgress);
            setDisplayValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={numberRef} className={className}>
      {displayValue}
      <span className={plusClassName}>{suffix}</span>
    </span>
  );
}

export default function AboutForeachClient() {
  const pathname = usePathname();

  const [locale, setLocale] = useState<Locale>("zh-CN");

    /* 面包屑链接：中文不带语言前缀，其他语言带 /en /es /fr /ko /ru */
  const homeHref = locale === "zh-CN" ? "/" : `/${locale}`;
  const aboutHref =
    locale === "zh-CN" ? "/about/foreach" : `/${locale}/about/foreach`;

  useEffect(() => {
    const syncLocale = () => {
      setLocale(getCurrentLocale());
    };

    syncLocale();

    /*
      说明：
      1. pathname 改变时会重新同步语言
      2. focus / popstate 用来兼容浏览器返回、前进
      3. setInterval 用来兼容语言栏只改 Cookie / localStorage 但不刷新页面的情况
    */
    window.addEventListener("focus", syncLocale);
    window.addEventListener("popstate", syncLocale);
    window.addEventListener("foreach-locale-change", syncLocale);

    const timer = window.setInterval(syncLocale, 300);

    return () => {
      window.removeEventListener("focus", syncLocale);
      window.removeEventListener("popstate", syncLocale);
      window.removeEventListener("foreach-locale-change", syncLocale);
      window.clearInterval(timer);
    };
  }, [pathname]);

  const honorSummaryTitleLines = getLocalizedText(
    pageText.honorSummaryTitle,
    locale
  ).split("\n");

  return (
    <main className="about-foreach-page">
      {/* ================================
          第一部分：Banner
      ================================ */}
      <section className="about-foreach-hero">
        {/*
          Banner 背景图
          图片文件位置：
          public/images/about/foreach/about-foreach-banner.webp
        */}
        <LocalImageWithFallback
          src={aboutImages.banner}
          alt={getLocalizedText(
            {
              "zh-CN": "恒永达科技公司形象背景",
              en: "FOREACH Technology corporate background",
              es: "Imagen corporativa de FOREACH Technology",
              fr: "Image institutionnelle de FOREACH Technology",
              ko: "FOREACH Technology 기업 이미지 배경",
              ru: "Корпоративный фон FOREACH Technology",
            },
            locale
          )}
          className="about-foreach-hero-bg"
        />

        <div className="about-foreach-hero-content">
          <h1>
            <span>{getLocalizedText(pageText.heroTitle, locale)}</span>
          </h1>

          <p>{getLocalizedText(pageText.heroDescription, locale)}</p>
        </div>
      </section>
 <nav
        className="about-culture-breadcrumb"
        aria-label={getLocalizedText(
          {
            "zh-CN": "面包屑导航",
            en: "Breadcrumb",
            es: "Ruta de navegación",
            fr: "Fil d’Ariane",
            ko: "브레드크럼",
            ru: "Навигационная цепочка",
          },
          locale
        )}
      >
        <div className="about-culture-breadcrumb-inner">
          <Link href={homeHref}>
            {getLocalizedText(
              {
                "zh-CN": "首页",
                en: "Home",
                es: "Inicio",
                fr: "Accueil",
                ko: "홈",
                ru: "Главная",
              },
              locale
            )}
          </Link>

          <span>/</span>

          <Link href={aboutHref}>
            {getLocalizedText(
              {
                "zh-CN": "关于我们",
                en: "About Us",
                es: "Sobre nosotros",
                fr: "À propos",
                ko: "회사 소개",
                ru: "О нас",
              },
              locale
            )}
          </Link>

          <span>/</span>

          <strong>
            {getLocalizedText(
              {
                "zh-CN": "关于恒永达",
                en: "About FOREACH",
                es: "Sobre FOREACH",
                fr: "À propos de FOREACH",
                ko: "FOREACH 소개",
                ru: "О FOREACH",
              },
              locale
            )}
          </strong>
        </div>
      </nav>
      {/* ================================
          第二部分：恒永达介绍 + 视频
      ================================ */}
      <section className="about-foreach-intro-section" id="company-intro">



        <div className="about-foreach-container about-foreach-intro-layout">
          <div className="about-foreach-intro-copy">
            <h2>{getLocalizedText(pageText.introTitle, locale)}</h2>

            <p>
              {getLocalizedText(pageText.introParagraph1, locale)}
            </p>
          </div>

          {/*
            公司介绍视频
            封面图位置：
            public/images/home/tv-foreach.png

            视频位置：
            public/images/home/foreach-company-intro.mp4

            说明：
            1. muted：默认静音
            2. controls：显示浏览器自带播放控制条
            3. playsInline：手机端不强制全屏
          */}
          <div
            className="about-foreach-video-card"
            aria-label={getLocalizedText(
              {
                "zh-CN": "恒永达公司介绍视频",
                en: "FOREACH company introduction video",
                es: "Vídeo de presentación de FOREACH",
                fr: "Vidéo de présentation de FOREACH",
                ko: "FOREACH 회사 소개 영상",
                ru: "Видео о компании FOREACH",
              },
              locale
            )}
          >
            <video
              className="about-foreach-video about-foreach-video-edge-crop"
              src={aboutVideos.companyIntro}
              poster={aboutImages.videoPoster}
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* ================================
          第三部分：公司优势数据
      ================================ */}
      <section className="about-foreach-advantage-section" id="company-advantage">
        <div className="about-foreach-advantage-panel">
          <div
            className="about-foreach-advantage-stats"
            aria-label={getLocalizedText(
              {
                "zh-CN": "公司优势数据",
                en: "Company advantage statistics",
                es: "Datos clave de la empresa",
                fr: "Données clés de l’entreprise",
                ko: "회사 강점 데이터",
                ru: "Ключевые показатели компании",
              },
              locale
            )}
          >
            {advantageStats.map((item) => (
              <div
                className="about-foreach-advantage-stat"
                key={getLocalizedText(item.label, "en")}
              >
                <CountUpNumber
                  value={item.value}
                  duration={1300}
                  className="about-foreach-advantage-number"
                  plusClassName="about-foreach-advantage-plus"
                />

                <div className="about-foreach-advantage-text">
                  {getLocalizedText(item.label, locale)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          第四部分：荣誉资质
      ================================ */}
      <section className="about-foreach-honor-section" id="company-honor">
        <div className="about-foreach-container">
          <div className="about-foreach-honor-title">
            <h2>{getLocalizedText(pageText.honorTitle, locale)}</h2>
          </div>

          <div className="about-foreach-honor-layout">
            <div className="about-foreach-honor-summary">
              <h3>
                {honorSummaryTitleLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>

              <div
                className="about-foreach-honor-summary-stats"
                aria-label={getLocalizedText(
                  {
                    "zh-CN": "恒永达荣誉数据",
                    en: "FOREACH honor statistics",
                    es: "Datos de honores de FOREACH",
                    fr: "Données sur les distinctions de FOREACH",
                    ko: "FOREACH honor statistics",
                    ru: "Данные о наградах FOREACH",
                  },
                  locale
                )}
              >
                {honorStats.map((item) => (
                  <div
                    className="about-foreach-honor-summary-stat"
                    key={getLocalizedText(item.label, "en")}
                  >
                    <CountUpNumber
                      value={item.value}
                      duration={1200}
                      className="about-foreach-honor-summary-number"
                      plusClassName="about-foreach-honor-summary-plus"
                    />

                    <div className="about-foreach-honor-summary-label">
                      {getLocalizedText(item.label, locale)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-foreach-honor-board">
              <div className="about-foreach-honor-top-row">
                <div className="about-foreach-honor-main-cert">
                  <LocalImageWithFallback
                    src={honorMainCertificate.src}
                    alt={getLocalizedText(honorMainCertificate.title, locale)}
                    className="about-foreach-honor-main-cert-image"
                  />
                </div>

                {honorTopCertificates.map((item) => (
                  <LocalImageWithFallback
                    key={item.src}
                    src={item.src}
                    alt={getLocalizedText(item.title, locale)}
                    className="about-foreach-honor-iso-cert"
                  />
                ))}
              </div>

              <div
                className="about-foreach-honor-middle-row"
                aria-label="Horizontal enterprise honors"
              >
                {honorMiddleImages.map((item) => (
                  <LocalImageWithFallback
                    key={item.src}
                    src={item.src}
                    alt={getLocalizedText(item.title, locale)}
                    className="about-foreach-honor-middle-image"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="about-foreach-honor-a4-row"
            aria-label="Group standards and invention patents"
          >
            {honorBottomImages.map((item, index) => (
              <article
                className="about-foreach-honor-a4-card"
                key={item.src}
              >
                <div className="about-foreach-honor-a4-image-wrap">
                  <LocalImageWithFallback
                    src={item.src}
                    alt={getLocalizedText(item.title, locale) || `Honor certificate ${index + 1}`}
                    className="about-foreach-honor-a4-image"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
