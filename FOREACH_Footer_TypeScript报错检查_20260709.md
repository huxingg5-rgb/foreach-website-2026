# FOREACH Footer TypeScript 报错检查

- 项目路径：F:\WebsiteProjects\foreach-website-2026
- 生成时间：2026-07-09 10:32:58

## 1. next build 完整日志

```text

> foreach-website-2026@0.1.0 build
> next build

▲ Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 5.3s
  Running TypeScript ...
Failed to type check.

./components/products/selection/ProductSelectionClient.tsx:265:5
Type error: Type '{ zh: string; en: string; es: string; fr: string; ko: string; ru: string; }' is not assignable to type 'string'.

  [90m263 |[0m     id: [32m"pumps"[0m,
  [90m264 |[0m     label: [32m"泵系列"[0m,
[31m[1m>[0m [90m265 |[0m     description: {
  [90m    |[0m     [31m[1m^[0m
  [90m266 |[0m     zh: [32m"根据泵类型、系列、量程和核心筛选项选择基础配置。"[0m,
  [90m267 |[0m     en: [32m"Select a base configuration by pump type, series, volume, and key filter options."[0m,
  [90m268 |[0m     es: [32m"Seleccione una configuración base por tipo de bomba, serie, volumen y filtros cl..[0m.
Next.js build worker exited with code: 1 and signal: null

```

## 2. tsc 完整日志

```text
components/products/selection/ProductSelectionClient.tsx(265,5): error TS2322: Type '{ zh: string; en: string; es: string; fr: string; ko: string; ru: string; }' is not assignable to type 'string'.

```

## 3. 当前 Footer 组件源码

```tsx
// 这是关于 components/layout/SiteFooter.tsx 的文件：用于管理网站底部 Footer 组件
// 这个文件的作用：负责 Footer 的页面布局、栏目链接、公司信息、联系方式、二维码区域和手机端栏目展开收起
// 国内 / 海外预留说明：Footer 文案从 data/site-footer.ts 读取，zh-CN 使用国内版，其他语言使用海外版
// 后端接口预留说明：后期可以通过 data/site-footer.ts 里的 getSiteFooterApiPath(locale) 对接 /api/site-footer?market=china 或 /api/site-footer?market=global

"use client"; // Footer 在手机端需要点击展开 / 收起栏目，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内链接跳转
import { useState } from "react"; // 引入 useState，用于控制手机端 Footer 栏目展开状态

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN / en / es / fr / ko / ru

import { // 从 Footer 数据文件中引入数据和读取函数
  getSiteFooterHref, // 根据当前语言读取 Footer 链接路径
  getSiteFooterText, // 根据当前语言读取 Footer 显示文字
  siteFooterData, // Footer 栏目、公司信息、联系方式等数据
} from "@/data/site-footer"; // Footer 数据文件路径

type SiteFooterProps = { // 定义 SiteFooter 组件接收的参数类型
  locale: LocaleCode; // 当前页面语言，例如 zh-CN / en / es / fr / ko / ru
}; // SiteFooterProps 类型定义结束

export default function SiteFooter({ locale }: SiteFooterProps) { // 定义并导出网站底部 Footer 组件
  const [openColumn, setOpenColumn] = useState(""); // 手机端当前展开的栏目 key，空字符串表示没有栏目展开

  return ( // 返回 Footer 页面结构
    <footer className="site-footer"> {/* 网站底部 Footer 最外层 */}
      <div className="site-footer__main"> {/* Footer 主体区域 */}
        <div className="site-footer__inner"> {/* Footer 内容居中容器 */}
          <div className="site-footer__nav-wrap"> {/* Footer 左侧 / 中间导航栏目容器 */}
            {siteFooterData.columns.map((column) => { // 遍历 Footer 栏目数据
              const isOpen = openColumn === column.key; // 判断当前栏目是否处于展开状态
              const columnTitle = getSiteFooterText(column.title, locale); // 根据当前语言读取栏目标题

              return ( // 返回单个 Footer 栏目
                <nav // Footer 单个导航栏目开始
                  key={column.key} // React 列表 key
                  className={`site-footer__column ${isOpen ? "is-open" : ""}`} // 根据展开状态追加 is-open class
                  aria-label={columnTitle} // 给导航栏目提供无障碍说明
                > {/* Footer 单个导航栏目开始标签结束 */}
                  <button // 手机端栏目标题按钮开始
                    className="site-footer__title" // 栏目标题按钮 class
                    type="button" // 设置为普通按钮，避免触发表单行为
                    aria-expanded={isOpen} // 告诉屏幕阅读器当前栏目是否展开
                    onClick={() => setOpenColumn(isOpen ? "" : column.key)} // 点击同一个栏目收起，点击不同栏目展开
                  > {/* 手机端栏目标题按钮开始标签结束 */}
                    {columnTitle} {/* Footer 栏目标题 */}
                  </button> {/* 手机端栏目标题按钮结束 */}

                  <ul className="site-footer__list"> {/* Footer 栏目链接列表 */}
                    {column.links.map((link) => ( // 遍历当前栏目下的链接 */}
                      <li key={link.key}> {/* Footer 单个链接列表项 */}
                        <Link href={getSiteFooterHref(link.href, locale)}> {/* 根据当前语言读取链接路径 */}
                          {getSiteFooterText(link.label, locale)} {/* 根据当前语言读取链接文字 */}
                        </Link> {/* Footer 链接结束 */}
                      </li> // Footer 单个链接列表项结束
                    ))} {/* Footer 栏目链接遍历结束 */}
                  </ul> {/* Footer 栏目链接列表结束 */}
                </nav> // Footer 单个导航栏目结束
              ); // 单个 Footer 栏目返回结束
            })} {/* Footer 栏目遍历结束 */}
          </div> {/* Footer 左侧 / 中间导航栏目容器结束 */}

          <div className="site-footer__right"> {/* Footer 右侧公司信息区域 */}
            <div className="site-footer__contact"> {/* Footer 公司联系方式容器 */}
              <p className="site-footer__company"> {/* Footer 公司名称 */}
                {getSiteFooterText(siteFooterData.companyName, locale)} {/* 根据国内 / 海外版本显示公司名称 */}
              </p> {/* Footer 公司名称结束 */}

              <p className="site-footer__contact-text"> {/* Footer 地址信息 */}
                {getSiteFooterText(siteFooterData.addressLabel, locale)}：{/* 地址标签，例如“地址 / Address” */}
                {getSiteFooterText(siteFooterData.address, locale)} {/* 根据国内 / 海外版本显示地址 */}

                <a // 地图链接开始
                  className="site-footer__map-link" // 地图链接 class
                  href="#" // 地图链接暂时占位，后期可以换成真实地图 URL
                  target="_blank" // 新窗口打开地图
                  rel="noreferrer" // 避免传递来源信息
                > {/* 地图链接开始标签结束 */}
                  {getSiteFooterText(siteFooterData.mapLabel, locale)} {/* 地图按钮文字 */}
                </a> {/* 地图链接结束 */}
              </p> {/* Footer 地址信息结束 */}

              <p className="site-footer__contact-text"> {/* Footer 邮箱信息 */}
                {getSiteFooterText(siteFooterData.emailLabel, locale)}：{/* 邮箱标签 */}
                {getSiteFooterText(siteFooterData.email, locale)} {/* 根据国内 / 海外版本显示邮箱 */}
              </p> {/* Footer 邮箱信息结束 */}

              <p className="site-footer__contact-text"> {/* Footer 电话信息 */}
                {getSiteFooterText(siteFooterData.phoneLabel, locale)}：{/* 电话标签 */}
                {getSiteFooterText(siteFooterData.phone, locale)} {/* 根据国内 / 海外版本显示电话 */}
              </p> {/* Footer 电话信息结束 */}
            </div> {/* Footer 公司联系方式容器结束 */}

            <div className="site-footer__qrcode-area"> {/* Footer 二维码 / 社媒区域 */}
              <div className="site-footer__qr-row"> {/* Footer 二维码横向排列容器 */}
                <div className="site-footer__qrcode-item"> {/* 第一个二维码 / 社媒项 */}
                  <div className="site-footer__qrcode-box"> {/* 第一个二维码占位框 */}
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)} {/* 国内显示公众号，海外可显示 LinkedIn */}
                    <br /> {/* 换行 */}
                    {getSiteFooterText(siteFooterData.qrCodePlaceholder, locale)} {/* 二维码 / 社媒占位文字 */}
                  </div> {/* 第一个二维码占位框结束 */}

                  <span className="site-footer__qrcode-label"> {/* 第一个二维码下方标签 */}
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)} {/* 国内公众号 / 海外 LinkedIn */}
                  </span> {/* 第一个二维码下方标签结束 */}
                </div> {/* 第一个二维码 / 社媒项结束 */}

                <div className="site-footer__qrcode-item"> {/* 第二个二维码 / 社媒项 */}
                  <div className="site-footer__qrcode-box"> {/* 第二个二维码占位框 */}
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)} {/* 国内显示抖音，海外可显示 YouTube */}
                    <br /> {/* 换行 */}
                    {getSiteFooterText(siteFooterData.qrCodePlaceholder, locale)} {/* 二维码 / 社媒占位文字 */}
                  </div> {/* 第二个二维码占位框结束 */}

                  <span className="site-footer__qrcode-label"> {/* 第二个二维码下方标签 */}
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)} {/* 国内抖音 / 海外 YouTube */}
                  </span> {/* 第二个二维码下方标签结束 */}
                </div> {/* 第二个二维码 / 社媒项结束 */}
              </div> {/* Footer 二维码横向排列容器结束 */}
            </div> {/* Footer 二维码 / 社媒区域结束 */}
          </div> {/* Footer 右侧公司信息区域结束 */}
        </div> {/* Footer 内容居中容器结束 */}
      </div> {/* Footer 主体区域结束 */}

      <div className="site-footer__bottom"> {/* Footer 最底部备案和版权区域 */}
        <div className="site-footer__bottom-inner"> {/* Footer 底部内容居中容器 */}
          <div className="site-footer__bottom-left"> {/* Footer 底部左侧内容 */}
            <p>{getSiteFooterText(siteFooterData.icp, locale)}</p> {/* 国内显示备案号，海外可为空或显示其他说明 */}

            <p>{getSiteFooterText(siteFooterData.copyright, locale)}</p> {/* Footer 版权信息 */}
          </div> {/* Footer 底部左侧内容结束 */}
        </div> {/* Footer 底部内容居中容器结束 */}
      </div> {/* Footer 最底部备案和版权区域结束 */}
    </footer> // 网站底部 Footer 最外层结束
  ); // Footer 页面结构返回结束
} // SiteFooter 组件结束
```

## 4. 当前 Footer 数据源码

```ts
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

```

## 5. Footer 相关 Git Diff

```diff
diff --git a/data/site-footer.ts b/data/site-footer.ts
index e9c49c7..28a358d 100644
--- a/data/site-footer.ts
+++ b/data/site-footer.ts
@@ -1,4 +1,4 @@
-// 杩欐槸鍏充簬 data/site-footer.ts 鐨勬枃浠讹細鐢ㄤ簬绠＄悊缃戠珯搴曢儴 Footer 鐨勬暟鎹厤缃?+锘?/ 杩欐槸鍏充簬 data/site-footer.ts 鐨勬枃浠讹細鐢ㄤ簬绠＄悊缃戠珯搴曢儴 Footer 鐨勬暟鎹厤缃? // 杩欎釜鏂囦欢鐨勪綔鐢細缁熶竴绠＄悊 Footer 鏍忕洰銆侀摼鎺ャ€佸叕鍙镐俊鎭€佽仈绯绘柟寮忋€佺増鏉冧俊鎭拰鍚庣鎺ュ彛棰勭暀
 
 import type { LocaleCode } from "@/lib/i18n"; // 寮曞叆瀹樼綉鏀寔鐨勮瑷€浠ｇ爜绫诲瀷锛屼緥濡?zh-CN銆乪n銆乪s銆乫r銆乲o銆乺u
@@ -261,4 +261,4 @@ export function getSiteFooterHref(href: SiteFooterHref | string, locale: LocaleC
   const market = getSiteFooterMarket(locale); // 鏍规嵁褰撳墠璇█鑾峰彇鍥藉唴鐗堟垨娴峰鐗? 
   return href[locale] || href[market] || href["zh-CN"] || href.en || href.china || href.global || "#"; // 閾炬帴浼樺厛鎸夊叿浣撹瑷€璇诲彇锛屽啀鍥為€€甯傚満鐗堟湰
-} // getSiteFooterHref 鍑芥暟缁撴潫
\ No newline at end of file
+} // getSiteFooterHref 鍑芥暟缁撴潫
```
