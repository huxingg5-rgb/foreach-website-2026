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
      key: "home",
      title: { china: "首页", global: "Home" },
      links: [
        { key: "home", label: { china: "首页", global: "Home" }, href: href("/") },
      ],
    },
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

  companyName: { china: "深圳市恒永达科技股份有限公司", global: "Shenzhen FOREACH Technology Co., Ltd." },

  addressLabel: { china: "地址", global: "Address" },

  address: {
    china: "广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301",
    global: "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Yulv Community, Yutang Subdistrict, Guangming District, Shenzhen, Guangdong, China",
  },

  mapLabel: { china: "查看地图", global: "View Map" },

  mapHref: {
    china: "https://uri.amap.com/search?keyword=%E6%B7%B1%E5%9C%B3%E5%B8%82%E6%81%92%E6%B0%B8%E8%BE%BE%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&city=%E6%B7%B1%E5%9C%B3",
    global: "https://www.google.com/maps/search/?api=1&query=Shenzhen%20FOREACH%20Technology%20Co.%2C%20Ltd.%201301%20Building%202%20Yufengda%20Industrial%20Park%201008%20Guangqiao%20Avenue%20Guangming%20District%20Shenzhen",
  },

  emailLabel: { china: "邮箱", global: "Email" },
  email: { china: "sales@foreachtek.com", global: "sales@foreachtek.com" },
  emailHref: { china: "mailto:sales@foreachtek.com", global: "mailto:sales@foreachtek.com" },

  phoneLabel: { china: "咨询电话", global: "Tel" },
  phone: { china: "0755 8655 3831", global: "+86 755 8655 3831" },
  phoneHref: { china: "tel:075586553831", global: "tel:+8675586553831" },

  qrCodes: [
    { key: "wechat-official", label: { china: "公众号", global: "LinkedIn" } },
    { key: "douyin", label: { china: "抖音", global: "YouTube" } },
    { key: "wechat-channels", label: { china: "视频号", global: "Video Channel" } },
  ] as SiteFooterQrCode[],

  qrCodePlaceholder: { china: "二维码", global: "Social" },

  icp: { china: "粤ICP备2020107216号-2", global: "" },

  icpHref: { china: "https://beian.miit.gov.cn/", global: "https://beian.miit.gov.cn/" },

  copyright: {
    china: "© 2026 深圳市恒永达科技股份有限公司 版权所有",
    global: "© 2026 Shenzhen FOREACH Technology Co., Ltd. All rights reserved.",
  },
};

export function getSiteFooterText(text: SiteFooterText | string | undefined | null, locale: LocaleCode) {
  if (!text) return "";
  if (typeof text === "string") return text;

  const market = getSiteFooterMarket(locale);

  return text[market] || text[locale] || text.china || text.global || text["zh-CN"] || text.en || "";
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
