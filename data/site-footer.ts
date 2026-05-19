// 这是关于 data/site-footer.ts 的文件：用于管理网站底部 Footer 的数据配置
// 这个文件的作用：统一管理 Footer 栏目、链接、公司信息、联系方式、版权信息和后端接口预留

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru

export type SiteFooterMarket = "china" | "global"; // 定义 Footer 市场类型：china 表示国内版，global 表示海外版

export type SiteFooterText = Partial<Record<SiteFooterMarket | LocaleCode, string>>; // 定义 Footer 文本类型，既兼容 china/global，也兼容旧的多语言 key

export type SiteFooterHref = Partial<Record<SiteFooterMarket | LocaleCode, string>>; // 定义 Footer 链接类型，链接仍然保留多语言路径

export type SiteFooterLink = { // 定义 Footer 单个链接的数据类型
  key: string; // 链接唯一标识
  label: SiteFooterText; // 链接显示文字，当前主要使用 china/global
  href: SiteFooterHref; // 链接路径，当前仍按具体语言区分
}; // Footer 单个链接类型结束

export type SiteFooterColumn = { // 定义 Footer 栏目的数据类型
  key: string; // 栏目唯一标识
  title: SiteFooterText; // 栏目标题，当前主要使用 china/global
  links: SiteFooterLink[]; // 栏目下的链接列表
}; // Footer 栏目类型结束

export function getSiteFooterMarket(locale: LocaleCode): SiteFooterMarket { // 根据当前语言判断使用国内版还是海外版 Footer
  return locale === "zh-CN" ? "china" : "global"; // 中文使用国内版，其他语言统一使用海外版
} // getSiteFooterMarket 函数结束

export function getSiteFooterApiPath(locale: LocaleCode) { // 预留 Footer 后端接口路径生成函数
  const market = getSiteFooterMarket(locale); // 根据当前语言得到 china 或 global
  return `/api/site-footer?market=${market}`; // 返回后期可对接的 Footer 接口路径
} // getSiteFooterApiPath 函数结束

export const siteFooterData = { // 定义网站底部 Footer 数据
  columns: [ // Footer 左侧栏目数据开始
    { // 首页栏目开始
      key: "home", // 栏目 key
      title: { china: "首页", global: "Home" }, // 首页栏目标题
      links: [ // 首页栏目链接开始
        { // 首页链接开始
          key: "home", // 首页链接 key
          label: { china: "首页", global: "Home" }, // 首页链接文字
          href: { "zh-CN": "/", en: "/en", es: "/es", fr: "/fr", ko: "/ko", ru: "/ru" }, // 首页链接路径
        }, // 首页链接结束
      ], // 首页栏目链接结束
    }, // 首页栏目结束

    { // 产品中心栏目开始
      key: "products", // 栏目 key
      title: { china: "产品中心", global: "Products" }, // 产品中心栏目标题
      links: [ // 产品中心栏目链接开始
        { // 泵类链接开始
          key: "pumps", // 泵类链接 key
          label: { china: "泵类", global: "Pumps" }, // 泵类链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 泵类链接路径
        }, // 泵类链接结束
        { // 阀类链接开始
          key: "valves", // 阀类链接 key
          label: { china: "阀类", global: "Valves" }, // 阀类链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 阀类链接路径
        }, // 阀类链接结束
        { // 管路链接开始
          key: "tubing", // 管路链接 key
          label: { china: "管路", global: "Tubing" }, // 管路链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 管路链接路径
        }, // 管路链接结束
        { // 连接件链接开始
          key: "fittings", // 连接件链接 key
          label: { china: "连接件", global: "Fittings" }, // 连接件链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 连接件链接路径
        }, // 连接件链接结束
        { // 采样针链接开始
          key: "sampling-probes", // 采样针链接 key
          label: { china: "采样针", global: "Sampling Probes" }, // 采样针链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 采样针链接路径
        }, // 采样针链接结束
        { // 传感器链接开始
          key: "sensors", // 传感器链接 key
          label: { china: "传感器", global: "Sensors" }, // 传感器链接文字
          href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 传感器链接路径
        }, // 传感器链接结束
      ], // 产品中心栏目链接结束
    }, // 产品中心栏目结束

    { // 应用领域栏目开始
      key: "applications", // 栏目 key
      title: { china: "应用领域", global: "Applications" }, // 应用领域栏目标题
      links: [ // 应用领域栏目链接开始
        { // IVD 链接开始
          key: "ivd", // IVD 链接 key
          label: { china: "IVD 体外诊断", global: "IVD" }, // IVD 链接文字
          href: { "zh-CN": "/#applications", en: "/en#applications", es: "/es#applications", fr: "/fr#applications", ko: "/ko#applications", ru: "/ru#applications" }, // IVD 链接路径
        }, // IVD 链接结束
        { // 生命科学链接开始
          key: "life-sciences", // 生命科学链接 key
          label: { china: "生命科学", global: "Life Sciences" }, // 生命科学链接文字
          href: { "zh-CN": "/#applications", en: "/en#applications", es: "/es#applications", fr: "/fr#applications", ko: "/ko#applications", ru: "/ru#applications" }, // 生命科学链接路径
        }, // 生命科学链接结束
        { // 合成生物链接开始
          key: "synthetic-biology", // 合成生物链接 key
          label: { china: "合成生物", global: "Synthetic Biology" }, // 合成生物链接文字
          href: { "zh-CN": "/#applications", en: "/en#applications", es: "/es#applications", fr: "/fr#applications", ko: "/ko#applications", ru: "/ru#applications" }, // 合成生物链接路径
        }, // 合成生物链接结束
        { // 高端分析仪器链接开始
          key: "analytical-instruments", // 高端分析仪器链接 key
          label: { china: "高端分析仪器", global: "High-end Analytical Instruments" }, // 高端分析仪器链接文字
          href: { "zh-CN": "/#applications", en: "/en#applications", es: "/es#applications", fr: "/fr#applications", ko: "/ko#applications", ru: "/ru#applications" }, // 高端分析仪器链接路径
        }, // 高端分析仪器链接结束
        { // 实验室自动化链接开始
          key: "laboratory-automation", // 实验室自动化链接 key
          label: { china: "实验室自动化", global: "Laboratory Automation" }, // 实验室自动化链接文字
          href: { "zh-CN": "/#applications", en: "/en#applications", es: "/es#applications", fr: "/fr#applications", ko: "/ko#applications", ru: "/ru#applications" }, // 实验室自动化链接路径
        }, // 实验室自动化链接结束
      ], // 应用领域栏目链接结束
    }, // 应用领域栏目结束

    { // 资源中心栏目开始
      key: "resources", // 栏目 key
      title: { china: "资源中心", global: "Resources" }, // 资源中心栏目标题
      links: [ // 资源中心栏目链接开始
        { // 产品资料下载链接开始
          key: "downloads", // 产品资料下载链接 key
          label: { china: "产品资料下载", global: "Product Downloads" }, // 产品资料下载链接文字
          href: { "zh-CN": "/news", en: "/en/news", es: "/es/news", fr: "/fr/news", ko: "/ko/news", ru: "/ru/news" }, // 产品资料下载链接路径
        }, // 产品资料下载链接结束
        { // 产品目录链接开始
          key: "catalogs", // 产品目录链接 key
          label: { china: "产品目录", global: "Product Catalogs" }, // 产品目录链接文字
          href: { "zh-CN": "/news", en: "/en/news", es: "/es/news", fr: "/fr/news", ko: "/ko/news", ru: "/ru/news" }, // 产品目录链接路径
        }, // 产品目录链接结束
        { // 认证与资质资料链接开始
          key: "certificates", // 认证与资质资料链接 key
          label: { china: "认证与资质资料", global: "Certifications" }, // 认证与资质资料链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 认证与资质资料链接路径
        }, // 认证与资质资料链接结束
        { // 选型指南链接开始
          key: "selection-guide", // 选型指南链接 key
          label: { china: "选型指南", global: "Selection Guides" }, // 选型指南链接文字
          href: { "zh-CN": "/news", en: "/en/news", es: "/es/news", fr: "/fr/news", ko: "/ko/news", ru: "/ru/news" }, // 选型指南链接路径
        }, // 选型指南链接结束
        { // 安装说明链接开始
          key: "installation", // 安装说明链接 key
          label: { china: "安装说明", global: "Installation Guides" }, // 安装说明链接文字
          href: { "zh-CN": "/news", en: "/en/news", es: "/es/news", fr: "/fr/news", ko: "/ko/news", ru: "/ru/news" }, // 安装说明链接路径
        }, // 安装说明链接结束
        { // 技术文章 FAQ 链接开始
          key: "faq", // 技术文章 FAQ 链接 key
          label: { china: "技术文章 / FAQ", global: "Technical Articles / FAQ" }, // 技术文章 FAQ 链接文字
          href: { "zh-CN": "/news", en: "/en/news", es: "/es/news", fr: "/fr/news", ko: "/ko/news", ru: "/ru/news" }, // 技术文章 FAQ 链接路径
        }, // 技术文章 FAQ 链接结束
      ], // 资源中心栏目链接结束
    }, // 资源中心栏目结束

    { // 关于我们栏目开始
      key: "about", // 栏目 key
      title: { china: "关于我们", global: "About Us" }, // 关于我们栏目标题
      links: [ // 关于我们栏目链接开始
        { // 公司介绍链接开始
          key: "company-profile", // 公司介绍链接 key
          label: { china: "公司介绍", global: "Company Profile" }, // 公司介绍链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 公司介绍链接路径
        }, // 公司介绍链接结束
        { // 研发制造能力链接开始
          key: "rd-manufacturing", // 研发制造能力链接 key
          label: { china: "研发制造能力", global: "R&D & Manufacturing" }, // 研发制造能力链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 研发制造能力链接路径
        }, // 研发制造能力链接结束
        { // 质量体系链接开始
          key: "quality", // 质量体系链接 key
          label: { china: "质量体系", global: "Quality System" }, // 质量体系链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 质量体系链接路径
        }, // 质量体系链接结束
        { // 企业资质链接开始
          key: "qualifications", // 企业资质链接 key
          label: { china: "企业资质", global: "Qualifications" }, // 企业资质链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 企业资质链接路径
        }, // 企业资质链接结束
        { // 全球服务链接开始
          key: "global-service", // 全球服务链接 key
          label: { china: "全球服务", global: "Global Service" }, // 全球服务链接文字
          href: { "zh-CN": "/#about", en: "/en#about", es: "/es#about", fr: "/fr#about", ko: "/ko#about", ru: "/ru#about" }, // 全球服务链接路径
        }, // 全球服务链接结束
      ], // 关于我们栏目链接结束
    }, // 关于我们栏目结束

    { // 联系我们栏目开始
      key: "contact", // 栏目 key
      title: { china: "联系我们", global: "Contact Us" }, // 联系我们栏目标题
      links: [ // 联系我们栏目链接开始
        { // 询盘表单链接开始
          key: "inquiry-form", // 询盘表单链接 key
          label: { china: "询盘表单", global: "Inquiry Form" }, // 询盘表单链接文字
          href: { "zh-CN": "/#contact", en: "/en#contact", es: "/es#contact", fr: "/fr#contact", ko: "/ko#contact", ru: "/ru#contact" }, // 询盘表单链接路径
        }, // 询盘表单链接结束
        { // 联系方式链接开始
          key: "contact-info", // 联系方式链接 key
          label: { china: "联系方式", global: "Contact Information" }, // 联系方式链接文字
          href: { "zh-CN": "/#contact", en: "/en#contact", es: "/es#contact", fr: "/fr#contact", ko: "/ko#contact", ru: "/ru#contact" }, // 联系方式链接路径
        }, // 联系方式链接结束
        { // 地址信息链接开始
          key: "address", // 地址信息链接 key
          label: { china: "地址信息", global: "Address" }, // 地址信息链接文字
          href: { "zh-CN": "/#contact", en: "/en#contact", es: "/es#contact", fr: "/fr#contact", ko: "/ko#contact", ru: "/ru#contact" }, // 地址信息链接路径
        }, // 地址信息链接结束
        { // 销售支持入口链接开始
          key: "sales-support", // 销售支持入口链接 key
          label: { china: "销售支持入口", global: "Sales Support" }, // 销售支持入口链接文字
          href: { "zh-CN": "/#contact", en: "/en#contact", es: "/es#contact", fr: "/fr#contact", ko: "/ko#contact", ru: "/ru#contact" }, // 销售支持入口链接路径
        }, // 销售支持入口链接结束
      ], // 联系我们栏目链接结束
    }, // 联系我们栏目结束
  ] satisfies SiteFooterColumn[], // Footer 左侧栏目数据结束

  companyName: { china: "深圳市恒永达科技股份有限公司", global: "Shenzhen FOREACH Technology Co., Ltd." }, // Footer 公司名称

  addressLabel: { china: "地址", global: "Address" }, // Footer 地址标签

  address: { // Footer 地址内容
    china: "广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301", // 国内版中文地址
    global: "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Yulv Community, Yutang Subdistrict, Guangming District, Shenzhen, Guangdong, China", // 海外版英文地址
  }, // Footer 地址内容结束

  mapLabel: { china: "查看地图", global: "View Map" }, // Footer 地图按钮文字

  emailLabel: { china: "邮箱", global: "Email" }, // Footer 邮箱标签

  email: { china: "sales@foreachtek.com", global: "sales@foreachtek.com" }, // Footer 邮箱，后期可按国内 / 海外分别改

  phoneLabel: { china: "咨询电话", global: "Tel" }, // Footer 电话标签

  phone: { china: "0755 8655 3831", global: "+86 755 8655 3831" }, // Footer 电话，海外版使用国际格式

  wechatLabel: { china: "公众号", global: "LinkedIn" }, // Footer 第一社媒标签，国内显示公众号，海外预留 LinkedIn

  douyinLabel: { china: "抖音", global: "YouTube" }, // Footer 第二社媒标签，国内显示抖音，海外预留 YouTube

  qrCodePlaceholder: { china: "二维码", global: "Social" }, // Footer 二维码 / 社媒占位文字

  icp: { china: "粤ICP备XXXXXXXX号", global: "" }, // Footer 备案号，国内显示，海外版留空

  copyright: { // Footer 版权信息
    china: "© 2026 深圳市恒永达科技股份有限公司 版权所有", // 国内版版权
    global: "© 2026 Shenzhen FOREACH Technology Co., Ltd. All rights reserved.", // 海外版版权
  }, // Footer 版权信息结束
}; // siteFooterData 数据结束

export function getSiteFooterText(text: SiteFooterText | string, locale: LocaleCode) { // 定义 Footer 文本读取函数
  if (typeof text === "string") { // 如果传入的是普通字符串
    return text; // 直接返回字符串
  } // 普通字符串判断结束

  const market = getSiteFooterMarket(locale); // 根据当前语言获取国内版或海外版

  return text[market] || text[locale] || text.china || text.global || text["zh-CN"] || text.en || ""; // 按优先级返回 Footer 文本
} // getSiteFooterText 函数结束

export function getSiteFooterHref(href: SiteFooterHref | string, locale: LocaleCode) { // 定义 Footer 链接读取函数
  if (typeof href === "string") { // 如果传入的是普通字符串
    return href; // 直接返回字符串
  } // 普通字符串判断结束

  const market = getSiteFooterMarket(locale); // 根据当前语言获取国内版或海外版

  return href[locale] || href[market] || href["zh-CN"] || href.en || href.china || href.global || "#"; // 链接优先按具体语言读取，再回退市场版本
} // getSiteFooterHref 函数结束