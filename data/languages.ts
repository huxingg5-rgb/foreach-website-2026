// data/languages.ts
// 官网语言配置文件
//
// 说明：
// 1. 这个文件只负责“语言列表配置”
// 2. 语言切换、URL 路径、多语言 SEO、hreflang 都可以从这里读取
// 3. 后期如果接后端 / CMS，可以让后端返回类似结构
// 4. 当前阶段先使用本地静态配置，保证前端开发稳定
// 5. textLayout 用于控制不同语言的排版密度，例如中文/韩文较短，西语/法语/俄语较长

/* ================================
   01. 官网支持的语言代码类型
================================ */

// LocaleCode：官网内部统一使用的语言代码
// 说明：
// 1. zh-CN 表示简体中文
// 2. en 表示英文
// 3. es 表示西班牙语
// 4. fr 表示法语
// 5. ko 表示韩语
// 6. ru 表示俄语
export type LocaleCode = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

/* ================================
   02. 语言方向类型
================================ */

// 文字方向
// 说明：
// 1. ltr = left to right，从左到右
// 2. rtl = right to left，从右到左
// 3. 当前 6 种语言全部是 ltr
export type LanguageDirection = "ltr" | "rtl";

/* ================================
   03. 语言排版密度类型
================================ */

// LanguageTextLayout：根据语言文字长度控制页面排版
// 说明：
// 1. compact：短文本排版，适合中文、韩文
// 2. standard：标准排版，适合英文
// 3. expanded：长文本排版，适合西班牙语、法语、俄语
export type LanguageTextLayout = "compact" | "standard" | "expanded";

/* ================================
   04. 语言项类型
================================ */

// LanguageItem：单个语言配置类型
// 说明：
// 这些字段现在是前端本地配置
// 后期接后端 / CMS 时，也可以让后端返回同样结构
export type LanguageItem = {
  id: string; // 稳定 ID，后端 / CMS 可用，例如 zh-CN、en、es
  code: LocaleCode; // 官网内部使用的语言代码
  label: string; // 前端语言按钮里显示的名称
  nativeLabel: string; // 该语言自己的写法，例如 English、Français
  href: string; // 点击语言后跳转的首页路径
  htmlLang: string; // 写入 html lang 的标准值
  hreflang: string; // SEO hreflang 使用的值
  direction: LanguageDirection; // 文字方向，当前都是 ltr
  textLayout: LanguageTextLayout; // 语言排版密度，用于控制不同语言的字号、行高和间距
  isDefault: boolean; // 是否默认语言
  enabled: boolean; // 是否启用
  order: number; // 排序字段
  backendKey: string; // 后端字段预留，后期接口可用
};

/* ================================
   05. 默认语言
================================ */

// 默认语言
// 说明：
// 1. 官网中文首页使用 /
// 2. 所以默认语言是 zh-CN
// 3. 不建议再做 /zh，避免中文页面重复
export const defaultLocale: LocaleCode = "zh-CN";

/* ================================
   06. 官网语言列表
================================ */

// 官网支持的语言列表
// 说明：
// 1. 中文默认路径是 "/"
// 2. 其他语言路径分别是 /en、/es、/fr、/ko、/ru
// 3. enabled 可以控制某个语言是否暂时开放
// 4. order 控制语言下拉菜单排序
// 5. textLayout 控制页面排版密度
export const languages: LanguageItem[] = [
  {
    id: "zh-CN", // 稳定 ID
    code: "zh-CN", // 官网内部语言代码
    label: "简体中文", // 前端显示名称
    nativeLabel: "简体中文", // 原生语言名称
    href: "/", // 中文默认首页路径
    htmlLang: "zh-CN", // HTML lang
    hreflang: "zh-CN", // SEO hreflang
    direction: "ltr", // 中文从左到右
    textLayout: "compact", // 中文文字密度高、较短，使用紧凑排版
    isDefault: true, // 中文是默认语言
    enabled: true, // 当前启用
    order: 1, // 排序
    backendKey: "zh-CN", // 后端预留字段
  },
  {
    id: "en", // 稳定 ID
    code: "en", // 英文代码
    label: "English", // 前端显示名称
    nativeLabel: "English", // 原生语言名称
    href: "/en", // 英文首页路径
    htmlLang: "en", // HTML lang
    hreflang: "en", // SEO hreflang
    direction: "ltr", // 英文从左到右
    textLayout: "standard", // 英文长度适中，使用标准排版
    isDefault: false, // 非默认语言
    enabled: true, // 当前启用
    order: 2, // 排序
    backendKey: "en", // 后端预留字段
  },
  {
    id: "es", // 稳定 ID
    code: "es", // 西班牙语代码
    label: "Español", // 前端显示名称
    nativeLabel: "Español", // 原生语言名称
    href: "/es", // 西班牙语首页路径
    htmlLang: "es", // HTML lang
    hreflang: "es", // SEO hreflang
    direction: "ltr", // 西班牙语从左到右
    textLayout: "expanded", // 西班牙语整体更长，使用宽松排版
    isDefault: false, // 非默认语言
    enabled: true, // 当前启用
    order: 3, // 排序
    backendKey: "es", // 后端预留字段
  },
  {
    id: "fr", // 稳定 ID
    code: "fr", // 法语代码
    label: "Français", // 前端显示名称
    nativeLabel: "Français", // 原生语言名称
    href: "/fr", // 法语首页路径
    htmlLang: "fr", // HTML lang
    hreflang: "fr", // SEO hreflang
    direction: "ltr", // 法语从左到右
    textLayout: "expanded", // 法语整体更长，使用宽松排版
    isDefault: false, // 非默认语言
    enabled: true, // 当前启用
    order: 4, // 排序
    backendKey: "fr", // 后端预留字段
  },
  {
    id: "ko", // 稳定 ID
    code: "ko", // 韩语代码
    label: "한국어", // 前端显示名称
    nativeLabel: "한국어", // 原生语言名称
    href: "/ko", // 韩语首页路径
    htmlLang: "ko", // HTML lang
    hreflang: "ko", // SEO hreflang
    direction: "ltr", // 韩语从左到右
    textLayout: "compact", // 韩语和中文类似，文字密度较高，使用紧凑排版
    isDefault: false, // 非默认语言
    enabled: true, // 当前启用
    order: 5, // 排序
    backendKey: "ko", // 后端预留字段
  },
  {
    id: "ru", // 稳定 ID
    code: "ru", // 俄语代码
    label: "Русский", // 前端显示名称
    nativeLabel: "Русский", // 原生语言名称
    href: "/ru", // 俄语首页路径
    htmlLang: "ru", // HTML lang
    hreflang: "ru", // SEO hreflang
    direction: "ltr", // 俄语从左到右
    textLayout: "expanded", // 俄语标题和说明通常较长，使用宽松排版
    isDefault: false, // 非默认语言
    enabled: true, // 当前启用
    order: 6, // 排序
    backendKey: "ru", // 后端预留字段
  },
];

/* ================================
   07. 获取启用语言
================================ */

// 已启用语言列表
// 说明：
// 1. 只返回 enabled 为 true 的语言
// 2. 自动按 order 排序
// 3. Header 语言下拉栏后续可以直接读取这个
export function getEnabledLanguages() {
  return languages
    .filter((language) => language.enabled)
    .sort((a, b) => a.order - b.order);
}

/* ================================
   08. 获取启用语言代码
================================ */

// 已启用语言代码列表
// 说明：
// 1. app/[locale]/page.tsx 生成静态页面时可以使用
// 2. sitemap / hreflang 生成时也可以使用
export function getEnabledLocaleCodes() {
  return getEnabledLanguages().map((language) => language.code);
}

/* ================================
   09. 判断是否支持某种语言
================================ */

// 判断语言是否被官网支持
// 说明：
// 1. URL 里拿到的 locale 通常是 string
// 2. 这个函数用于判断它是不是官网支持的语言
export function isSupportedLocale(locale: string): locale is LocaleCode {
  return languages.some((language) => language.code === locale);
}

/* ================================
   10. 判断是否启用某种语言
================================ */

// 判断语言是否启用
// 说明：
// 1. 支持不代表已经开放
// 2. enabled 为 false 时，可以先不显示在语言下拉栏
export function isEnabledLocale(locale: string): locale is LocaleCode {
  return languages.some(
    (language) => language.code === locale && language.enabled
  );
}

/* ================================
   11. 根据语言代码获取语言配置
================================ */

// 根据语言代码获取语言项
// 说明：
// 1. 找到就返回对应语言
// 2. 找不到就返回默认中文
// 3. 这样可以避免页面报错
export function getLanguageByCode(locale: LocaleCode) {
  return (
    languages.find((language) => language.code === locale) ||
    languages.find((language) => language.code === defaultLocale)!
  );
}

/* ================================
   12. 获取语言首页路径
================================ */

// 根据语言代码获取首页路径
// 说明：
// 1. zh-CN 返回 /
// 2. en 返回 /en
// 3. es 返回 /es
// 4. 后续语言路径统一从这里取
export function getLanguageHomeHref(locale: LocaleCode) {
  return getLanguageByCode(locale).href;
}

/* ================================
   13. 获取 html lang
================================ */

// 获取 HTML lang 属性值
// 说明：
// 1. 中文返回 zh-CN
// 2. 英文返回 en
// 3. 页面 layout 或 Header 可用它设置 document.documentElement.lang
export function getHtmlLang(locale: LocaleCode) {
  return getLanguageByCode(locale).htmlLang;
}

/* ================================
   14. 获取 hreflang
================================ */

// 获取 SEO hreflang
// 说明：
// 1. 后期做 sitemap / hreflang 标签时会用
// 2. 当前阶段先预留
export function getHrefLang(locale: LocaleCode) {
  return getLanguageByCode(locale).hreflang;
}

/* ================================
   15. 获取语言排版类型
================================ */

// 获取当前语言的排版密度
// 说明：
// 1. zh-CN / ko 返回 compact
// 2. en 返回 standard
// 3. es / fr / ru 返回 expanded
// 4. 后面首页外层 class 会用它控制不同语言的字号和间距
export function getLanguageTextLayout(locale: LocaleCode) {
  return getLanguageByCode(locale).textLayout;
}

/* ================================
   16. 获取语言排版 class
================================ */

// 获取当前语言对应的页面排版 class
// 说明：
// 1. compact 返回 site-page--compact
// 2. standard 返回 site-page--standard
// 3. expanded 返回 site-page--expanded



export function getLanguageTextLayoutClass(locale: LocaleCode) {
   return `site-page--${getLanguageTextLayout(locale)}`;
 }

/* ================================
   17. 根据当前路径判断语言
================================ */

// 根据 pathname 判断当前语言
// 说明：
// 1. /en 开头就是英文
// 2. /es 开头就是西班牙语
// 3. /fr 开头就是法语
// 4. /ko 开头就是韩语
// 5. /ru 开头就是俄语
// 6. 其他默认中文
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

  return defaultLocale;
}

/* ================================
   18. 后端 / CMS 对接预留说明
================================ */

// 后端对接说明：
// 当前 languages 是前端本地静态配置。
// 后期如果接 CMS / 后端，可以让接口返回类似结构：
//
// GET /api/languages
//
// 返回示例：
// [
//   {
//     id: "en",
//     code: "en",
//     label: "English",
//     nativeLabel: "English",
//     href: "/en",
//     htmlLang: "en",
//     hreflang: "en",
//     direction: "ltr",
//     textLayout: "standard",
//     isDefault: false,
//     enabled: true,
//     order: 2,
//     backendKey: "en"
//   }
// ]
//
// 前端替换方式：
// 1. 第一阶段继续使用本地 languages
// 2. 第二阶段接后端时，新增 fetchLanguages()
// 3. Header / sitemap / SEO / 页面排版不需要大改，只要数据结构一致即可