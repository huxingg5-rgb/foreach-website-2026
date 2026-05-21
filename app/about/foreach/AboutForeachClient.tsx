"use client";
import { useEffect, useRef, useState } from "react";
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
               ├─ honor-main-certificate.jpg
               ├─ honor-thumb-01.jpg
               ├─ honor-thumb-02.jpg
               ├─ honor-thumb-03.jpg
               ├─ honor-thumb-04.jpg
               ├─ honor-thumb-05.jpg
               ├─ honor-a4-01-national-high-tech-enterprise.jpg
               ├─ honor-a4-02-specialized-little-giant.jpg
               ├─ honor-a4-03-shenzhen-gazelle-enterprise.jpg
               ├─ honor-a4-04-guangdong-engineering-center.jpg
               ├─ honor-a4-05-intellectual-property-certificate.jpg
               ├─ honor-a4-06-innovative-sme.jpg
               ├─ honor-a4-07-quality-management-system.jpg
               └─ honor-a4-08-other-honor.jpg

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
  videoPoster: "/images/home/tv-foreach.png",
};

/* 页面视频路径统一管理 */
const aboutVideos = {
  companyIntro: "/images/home/foreach-company-intro.mp4",
};

/* 荣誉主证书 */
const honorMainCertificate = {
  title: {
    "zh-CN": "荣誉资质主证书",
    en: "Main Honor Certificate",
    es: "Certificado principal",
    fr: "Certificat principal",
    ko: "대표 인증서",
    ru: "Основной сертификат",
  },
  src: "/images/about/foreach/honors/honor-main-certificate.jpg",
};

/* 荣誉横向缩略图 */
const honorThumbs = [
  {
    title: {
      "zh-CN": "荣誉证书缩略图 01",
      en: "Honor Thumbnail 01",
      es: "Miniatura de certificado 01",
      fr: "Vignette de certificat 01",
      ko: "인증서 썸네일 01",
      ru: "Миниатюра сертификата 01",
    },
    src: "/images/about/foreach/honors/honor-thumb-01.jpg",
  },
  {
    title: {
      "zh-CN": "荣誉证书缩略图 02",
      en: "Honor Thumbnail 02",
      es: "Miniatura de certificado 02",
      fr: "Vignette de certificat 02",
      ko: "인증서 썸네일 02",
      ru: "Миниатюра сертификата 02",
    },
    src: "/images/about/foreach/honors/honor-thumb-02.jpg",
  },
  {
    title: {
      "zh-CN": "荣誉证书缩略图 03",
      en: "Honor Thumbnail 03",
      es: "Miniatura de certificado 03",
      fr: "Vignette de certificat 03",
      ko: "인증서 썸네일 03",
      ru: "Миниатюра сертификата 03",
    },
    src: "/images/about/foreach/honors/honor-thumb-03.jpg",
  },
  {
    title: {
      "zh-CN": "荣誉证书缩略图 04",
      en: "Honor Thumbnail 04",
      es: "Miniatura de certificado 04",
      fr: "Vignette de certificat 04",
      ko: "인증서 썸네일 04",
      ru: "Миниатюра сертификата 04",
    },
    src: "/images/about/foreach/honors/honor-thumb-04.jpg",
  },
  {
    title: {
      "zh-CN": "荣誉证书缩略图 05",
      en: "Honor Thumbnail 05",
      es: "Miniatura de certificado 05",
      fr: "Vignette de certificat 05",
      ko: "인증서 썸네일 05",
      ru: "Миниатюра сертификата 05",
    },
    src: "/images/about/foreach/honors/honor-thumb-05.jpg",
  },
];

/* A4 比例荣誉证书图 */
const honorA4Images = [
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-01-national-high-tech-enterprise.jpg",
  },
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-02-specialized-little-giant.jpg",
  },
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-03-shenzhen-gazelle-enterprise.jpg",
  },
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-04-guangdong-engineering-center.jpg",
  },
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-05-intellectual-property-certificate.jpg",
  },
  {
    title: {

    },
    src: "/images/about/foreach/honors/honor-a4-06-innovative-sme.jpg",
  },
  {
    title: {
   
    },
    src: "/images/about/foreach/honors/honor-a4-07-quality-management-system.jpg",
  },
  {
    title: {

    }, 
    src: "/images/about/foreach/honors/honor-a4-08-other-honor.jpg",
  },
];

/* =========================================================
   图片组件
   作用：
   1. 优先读取真实图片
   2. 图片文件还没放进去时，自动显示灰色占位背景
   3. 后续只需要把图片按 src 路径放好，不需要再改代码
========================================================= */
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
              className="about-foreach-video"
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
                    ko: "FOREACH 인증 및 수상 데이터",
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

            <div className="about-foreach-honor-display">
              {/* 
                荣誉主证书
                图片文件位置：
                public/images/about/foreach/honors/honor-main-certificate.jpg
              */}
              <div className="about-foreach-honor-main-cert">
                <LocalImageWithFallback
                  src={honorMainCertificate.src}
                  alt={getLocalizedText(honorMainCertificate.title, locale)}
                  className="about-foreach-honor-main-cert-image"
                />
              </div>

              {/* 
                横向荣誉证书缩略图
                图片文件位置：
                public/images/about/foreach/honors/honor-thumb-01.jpg
                public/images/about/foreach/honors/honor-thumb-02.jpg
                public/images/about/foreach/honors/honor-thumb-03.jpg
                public/images/about/foreach/honors/honor-thumb-04.jpg
                public/images/about/foreach/honors/honor-thumb-05.jpg
              */}
              <div
                className="about-foreach-honor-thumb-row"
                aria-label={getLocalizedText(
                  {
                    "zh-CN": "荣誉证书缩略图",
                    en: "Honor certificate thumbnails",
                    es: "Miniaturas de certificados",
                    fr: "Vignettes de certificats",
                    ko: "인증서 썸네일",
                    ru: "Миниатюры сертификатов",
                  },
                  locale
                )}
              >
                {honorThumbs.map((item) => (
                  <LocalImageWithFallback
                    key={getLocalizedText(item.title, "en")}
                    src={item.src}
                    alt={getLocalizedText(item.title, locale)}
                    className="about-foreach-honor-thumb"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 
            A4 比例荣誉证书图一排
            图片文件位置：
            public/images/about/foreach/honors/honor-a4-01-national-high-tech-enterprise.jpg
            public/images/about/foreach/honors/honor-a4-02-specialized-little-giant.jpg
            public/images/about/foreach/honors/honor-a4-03-shenzhen-gazelle-enterprise.jpg
            public/images/about/foreach/honors/honor-a4-04-guangdong-engineering-center.jpg
            public/images/about/foreach/honors/honor-a4-05-intellectual-property-certificate.jpg
            public/images/about/foreach/honors/honor-a4-06-innovative-sme.jpg
            public/images/about/foreach/honors/honor-a4-07-quality-management-system.jpg
            public/images/about/foreach/honors/honor-a4-08-other-honor.jpg
          */}
          <div
            className="about-foreach-honor-a4-row"
            aria-label={getLocalizedText(
              {
                "zh-CN": "A4比例荣誉证书展示",
                en: "A4 ratio honor certificate display",
                es: "Visualización de certificados en formato A4",
                fr: "Affichage des certificats au format A4",
                ko: "A4 비율 인증서 표시",
                ru: "Отображение сертификатов формата A4",
              },
              locale
            )}
          >
{honorA4Images.map((item, index) => (
  <article
    className="about-foreach-honor-a4-card"
    key={item.src}
  >
    <div className="about-foreach-honor-a4-image-wrap">
      <LocalImageWithFallback
        src={item.src}
        alt={`荣誉资质证书 ${index + 1}`}
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