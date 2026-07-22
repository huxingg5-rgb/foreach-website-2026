import type { LocaleCode } from "@/lib/i18n";

export type SiteFooterMarket = "china" | "global";
export type SiteFooterText = Partial<Record<SiteFooterMarket | LocaleCode, string>>;
export type SiteFooterHref = Partial<Record<SiteFooterMarket | LocaleCode, string>>;

export type SiteFooterLink = {
  key: string;
  label: SiteFooterText;
  href: SiteFooterHref;
};

export type SiteFooterColumn = {
  key: string;
  title: SiteFooterText;
  links: SiteFooterLink[];
};

export type SiteFooterQrCode = {
  key: string;
  label: SiteFooterText;
  image?: SiteFooterHref;
  href?: SiteFooterHref;
};

const footerInternationalTranslations: Partial<
  Record<Exclude<LocaleCode, "zh-CN" | "en">, Record<string, string>>
> = {
  es: {
    Home: "Inicio", Products: "Productos", "Pump Series": "Bombas", "Valve Series": "Válvulas", "Probe Series": "Sondas y agujas", "Fitting Series": "Conectores", "Tubing Series": "Tubos", "Control Series": "Control inteligente",
    Applications: "Aplicaciones", "Life Science": "Ciencias de la vida", "Lab Automation": "Automatización de laboratorio", "Analytical Instruments": "Instrumentos analíticos", "Environmental Monitoring": "Monitoreo ambiental", "Synthetic Biology": "Biología sintética",
    Resources: "Recursos", Datasheets: "Fichas técnicas", "Fluid Resistance Calculator": "Calculadora de resistencia al flujo", "Fitting Replacement": "Sustitución de conectores", "Installation Guides": "Guías de instalación", "Material Compatibility": "Compatibilidad de materiales", "Technical Articles": "Artículos técnicos", "Company News": "Noticias de la empresa",
    "About Us": "Quiénes somos", "About FOREACH": "Acerca de FOREACH", "R&D & Manufacturing": "I+D y fabricación", "Quality & Compliance": "Calidad y conformidad", History: "Historia", "FOREACH Culture": "Cultura FOREACH", "Contact Us": "Contacto", "Inquiry Form": "Formulario de consulta", "Contact Information": "Información de contacto",
    Address: "Dirección", "View Map": "Ver mapa", Email: "Correo electrónico", Tel: "Tel.", Social: "Redes sociales",
  },
  fr: {
    Home: "Accueil", Products: "Produits", "Pump Series": "Pompes", "Valve Series": "Vannes", "Probe Series": "Sondes et aiguilles", "Fitting Series": "Raccords", "Tubing Series": "Tubes", "Control Series": "Contrôle intelligent",
    Applications: "Applications", "Life Science": "Sciences de la vie", "Lab Automation": "Automatisation de laboratoire", "Analytical Instruments": "Instruments analytiques", "Environmental Monitoring": "Surveillance environnementale", "Synthetic Biology": "Biologie synthétique",
    Resources: "Ressources", Datasheets: "Fiches techniques", "Fluid Resistance Calculator": "Calculateur de résistance hydraulique", "Fitting Replacement": "Remplacement de raccords", "Installation Guides": "Guides d’installation", "Material Compatibility": "Compatibilité des matériaux", "Technical Articles": "Articles techniques", "Company News": "Actualités de l’entreprise",
    "About Us": "À propos", "About FOREACH": "À propos de FOREACH", "R&D & Manufacturing": "R&D et fabrication", "Quality & Compliance": "Qualité et conformité", History: "Historique", "FOREACH Culture": "Culture FOREACH", "Contact Us": "Nous contacter", "Inquiry Form": "Formulaire de demande", "Contact Information": "Coordonnées",
    Address: "Adresse", "View Map": "Voir la carte", Email: "E-mail", Tel: "Tél.", Social: "Réseaux sociaux",
  },
  ko: {
    Home: "홈", Products: "제품", "Pump Series": "펌프", "Valve Series": "밸브", "Probe Series": "프로브 및 니들", "Fitting Series": "피팅", "Tubing Series": "튜빙", "Control Series": "스마트 제어",
    Applications: "응용 분야", "Life Science": "생명과학", "Lab Automation": "실험실 자동화", "Analytical Instruments": "분석 기기", "Environmental Monitoring": "환경 모니터링", "Synthetic Biology": "합성생물학",
    Resources: "자료 센터", Datasheets: "데이터시트", "Fluid Resistance Calculator": "유체 저항 계산기", "Fitting Replacement": "피팅 대체품 검색", "Installation Guides": "설치 가이드", "Material Compatibility": "재료 호환성", "Technical Articles": "기술 자료", "Company News": "회사 소식",
    "About Us": "회사 소개", "About FOREACH": "FOREACH 소개", "R&D & Manufacturing": "연구개발 및 제조", "Quality & Compliance": "품질 및 규정 준수", History: "연혁", "FOREACH Culture": "FOREACH 문화", "Contact Us": "문의하기", "Inquiry Form": "문의 양식", "Contact Information": "연락처",
    Address: "주소", "View Map": "지도 보기", Email: "이메일", Tel: "전화", Social: "소셜 미디어",
  },
  ru: {
    Home: "Главная", Products: "Продукция", "Pump Series": "Насосы", "Valve Series": "Клапаны", "Probe Series": "Зонды и иглы", "Fitting Series": "Фитинги", "Tubing Series": "Трубки", "Control Series": "Интеллектуальное управление",
    Applications: "Области применения", "Life Science": "Науки о жизни", "Lab Automation": "Лабораторная автоматизация", "Analytical Instruments": "Аналитические приборы", "Environmental Monitoring": "Экологический мониторинг", "Synthetic Biology": "Синтетическая биология",
    Resources: "Ресурсы", Datasheets: "Технические описания", "Fluid Resistance Calculator": "Калькулятор гидравлического сопротивления", "Fitting Replacement": "Подбор замены фитингов", "Installation Guides": "Инструкции по установке", "Material Compatibility": "Совместимость материалов", "Technical Articles": "Технические статьи", "Company News": "Новости компании",
    "About Us": "О компании", "About FOREACH": "О FOREACH", "R&D & Manufacturing": "НИОКР и производство", "Quality & Compliance": "Качество и соответствие", History: "История", "FOREACH Culture": "Культура FOREACH", "Contact Us": "Контакты", "Inquiry Form": "Форма запроса", "Contact Information": "Контактная информация",
    Address: "Адрес", "View Map": "Открыть карту", Email: "Эл. почта", Tel: "Тел.", Social: "Социальные сети",
  },
};

function href(path: string): SiteFooterHref {
  return { china: path, global: path };
}

export function getSiteFooterMarket(locale: LocaleCode): SiteFooterMarket {
  return locale === "zh-CN" ? "china" : "global";
}

export function getSiteFooterApiPath(locale: LocaleCode) {
  const market = getSiteFooterMarket(locale);
  return `/api/site-footer?market=${market}`;
}

export const siteFooterData = {
  columns: [
    {
      key: "products",
      title: { china: "产品中心", global: "Products" },
      links: [
        { key: "pumps", label: { china: "泵系列", global: "Pump Series" }, href: href("/products/pumps") },
        { key: "valves", label: { china: "阀系列", global: "Valve Series" }, href: href("/products/valves") },
        { key: "probes", label: { china: "针系列", global: "Probe Series" }, href: href("/products/probes") },
        { key: "fittings", label: { china: "接头系列", global: "Fitting Series" }, href: href("/products?category=fittings") },
        { key: "tubing", label: { china: "管路系列", global: "Tubing Series" }, href: href("/products/tubing") },
        { key: "control", label: { china: "智控系列", global: "Control Series" }, href: href("/products?category=control") },
      ],
    },
    {
      key: "applications",
      title: { china: "应用领域", global: "Applications" },
      links: [
        { key: "ivd", label: { china: "IVD 体外诊断", global: "IVD" }, href: href("/applications/ivd") },
        { key: "life-science", label: { china: "生命科学", global: "Life Science" }, href: href("/applications/life-science") },
        { key: "lab-automation", label: { china: "实验室自动化", global: "Lab Automation" }, href: href("/applications/lab-automation") },
        { key: "analytical-instruments", label: { china: "分析仪器", global: "Analytical Instruments" }, href: href("/applications/analytical-instruments") },
        { key: "environmental-monitoring", label: { china: "环保监测", global: "Environmental Monitoring" }, href: href("/applications/environmental-monitoring") },
        { key: "synthetic-biology", label: { china: "合成生物", global: "Synthetic Biology" }, href: href("/applications/synthetic-biology") },
      ],
    },
    {
      key: "resources",
      title: { china: "资源中心", global: "Resources" },
      links: [
        { key: "datasheets", label: { china: "规格书下载", global: "Datasheets" }, href: href("/resources/datasheets") },
        { key: "fluid-resistance-calculator", label: { china: "流阻计算器", global: "Fluid Resistance Calculator" }, href: href("/resources/calculators/fluid-resistance") },
        { key: "fitting-replacement", label: { china: "接头替代查询", global: "Fitting Replacement" }, href: href("/resources/selection-support/fitting-replacement") },
        { key: "installation-guide", label: { china: "安装教程", global: "Installation Guides" }, href: href("/resources/installation-guide") },
        { key: "material-compatibility", label: { china: "材料兼容", global: "Material Compatibility" }, href: href("/resources/material-compatibility") },
        { key: "technical-articles", label: { china: "技术文章", global: "Technical Articles" }, href: href("/resources/technical-articles") },
        { key: "news", label: { china: "公司新闻", global: "Company News" }, href: href("/resources/news") },
      ],
    },
    {
      key: "about",
      title: { china: "关于我们", global: "About Us" },
      links: [
        { key: "foreach", label: { china: "关于恒永达", global: "About FOREACH" }, href: href("/about/foreach") },
        { key: "research-manufacturing", label: { china: "研发与制造能力", global: "R&D & Manufacturing" }, href: href("/about/research-manufacturing") },
        { key: "quality", label: { china: "质量体系与合规认证", global: "Quality & Compliance" }, href: href("/about/quality") },
        { key: "history", label: { china: "发展历程", global: "History" }, href: href("/about/history") },
        { key: "culture", label: { china: "恒永达文化", global: "FOREACH Culture" }, href: href("/about/culture") },
      ],
    },
    {
      key: "contact",
      title: { china: "联系我们", global: "Contact Us" },
      links: [
        { key: "inquiry", label: { china: "询盘表单", global: "Inquiry Form" }, href: href("/contact#inquiry") },
        { key: "contact-info", label: { china: "联系方式", global: "Contact Information" }, href: href("/contact#contact-info") },
      ],
    },
  ] satisfies SiteFooterColumn[],

  companyName: {
    china: "深圳市恒永达科技股份有限公司",
    global: "Shenzhen Foreach Technology Co., Ltd.",
  },

  addressLabel: { china: "地址", global: "Address" },

  address: {
    china: "广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301",
    global: "13th Floor, 2nd Building, Yufengda Industrial Park, 1008th Guang Qiao Boulevard, Guangming District, Shenzhen 518132 CHINA",
  },

  mapLabel: { china: "查看地图", global: "View Map" },

  mapHref: {
    china: "https://uri.amap.com/search?keyword=%E6%B7%B1%E5%9C%B3%E5%B8%82%E6%81%92%E6%B0%B8%E8%BE%BE%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&city=%E6%B7%B1%E5%9C%B3",
    global: "https://www.google.com/maps/search/?api=1&query=13th%20Floor%202nd%20Building%20Yufengda%20Industrial%20Park%201008th%20Guang%20Qiao%20Boulevard%20Guangming%20District%20Shenzhen%20518132%20China",
  },

  emailLabel: { china: "邮箱", global: "Email" },
  email: { china: "sales@foreachtek.com", global: "sales@foreachtek.com" },
  emailHref: { china: "mailto:sales@foreachtek.com", global: "mailto:sales@foreachtek.com" },

  phoneLabel: { china: "咨询电话", global: "Tel" },
  phone: { china: "0755 8655 3831", global: "+86 755 8655 3831" },
  phoneHref: { china: "tel:075586553831", global: "tel:+8675586553831" },

  qrCodes: [
    { key: "wechat-official",
  image: "/images/social-media/wechat-official.webp", label: { china: "公众号", global: "LinkedIn" } },
    { key: "douyin",
  image: "/images/social-media/douyin.webp", label: { china: "抖音", global: "YouTube" } },
    { key: "wechat-channels",
  image: "/images/social-media/wechat-channels.webp", label: { china: "视频号", global: "Video Channel" } },
  ] as SiteFooterQrCode[],

  qrCodePlaceholder: { china: "二维码", global: "Social" },

  icp: { china: "粤ICP备2020107216号-2", global: "" },

  icpHref: { china: "https://beian.miit.gov.cn/", global: "https://beian.miit.gov.cn/" },

  copyright: {
    china: "© 2026 深圳市恒永达科技股份有限公司 版权所有",
    global: "© 2026 Shenzhen Foreach Technology Co., Ltd. All rights reserved.",
  },
};

export function getSiteFooterText(text: SiteFooterText | string | undefined | null, locale: LocaleCode) {
  if (!text) return "";
  if (typeof text === "string") return text;

  const market = getSiteFooterMarket(locale);
  const candidates = [
    text[locale],
    text[market],
    text.en,
    text.global,
    text["zh-CN"],
    text.china,
  ];
  const resolved = candidates.find((value) => value !== undefined) ?? "";

  if (locale === "zh-CN" || locale === "en") return resolved;
  return footerInternationalTranslations[locale]?.[resolved] ?? resolved;
}

function shouldKeepHrefAsIs(value: string) {
  return (
    value === "" ||
    value === "#" ||
    value.startsWith("#") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  );
}

function localizeHref(value: string, locale: LocaleCode) {
  if (shouldKeepHrefAsIs(value)) return value;
  if (locale === "zh-CN") return value;

  const prefix = `/${locale}`;

  if (value === "/") return prefix;
  if (value.startsWith(`${prefix}/`) || value.startsWith(`${prefix}#`)) return value;
  if (/^\/(en|es|fr|ko|ru)(\/|#|$)/.test(value)) return value;
  if (value.startsWith("/#")) return `${prefix}${value.slice(1)}`;

  return `${prefix}${value}`;
}

export function getSiteFooterHref(value: SiteFooterHref | string | undefined | null, locale: LocaleCode) {
  if (!value) return "#";
  if (typeof value === "string") return localizeHref(value, locale);

  const market = getSiteFooterMarket(locale);
  const resolved = value[locale] || value[market] || value["zh-CN"] || value.en || value.china || value.global || "#";

  return localizeHref(resolved, locale);
}
