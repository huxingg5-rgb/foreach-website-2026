/* =========================================================
   app/layout.tsx
   恒永达官网｜全站根布局

   说明：
   1. 这个文件是所有页面共用的根布局
   2. 当前为了适配 Cloudflare Pages 免费版静态导出，不使用 cookies()
   3. 语言不再从 Cookie 判断，页面语言由具体页面路径控制
   4. SiteHeader 仍然全站共用
   5. SiteFooter 当前先默认使用中文 zh-CN
   6. 浏览器端交互脚本使用 next/script，避免 React 直接渲染 <script> 报错
   7. 全局选型清单 Provider 和 Drawer 挂载在这里，后续所有产品页共用同一个清单
========================================================= */

import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import "./globals.css";
import "./language-typography.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import GlobalTouchInteractions from "@/components/layout/GlobalTouchInteractions";

import CookieConsent from "@/components/privacy/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsInteractionTracker from "@/components/analytics/AnalyticsInteractionTracker";

import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
import { SITE_URL } from "@/lib/seo/site-url";
import "./products/products.css";

const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

/* =========================================================
   网站基础 SEO 信息

   说明：
   后续每个页面可以在自己的 page.tsx 里单独设置 metadata
========================================================= */
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: "恒永达 FOREACH 官网",
  description:
    "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
};

/* =========================================================
   RootLayout
   全站根布局

   注意：
   1. 静态导出 output: export 模式下，不要使用 cookies()
   2. 不要写 export const runtime = "edge"
   3. 不要在这里根据 Cookie 判断语言
   4. 不要直接写原生 <script>，浏览器脚本统一用 next/script
========================================================= */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta
          name="bytedance-verification-code"
          content="xuvAY4ELXA9YlGkNyt5R"
        />
        <Script id="foreach-document-language" strategy="beforeInteractive">
                    {`
                      (function () {
                        var firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
                        var supported = ['en', 'es', 'fr', 'ko', 'ru'];
                        document.documentElement.lang = supported.indexOf(firstSegment) >= 0
                          ? firstSegment
                          : 'zh-CN';
                      })();
                    `}
                  </Script>
        {gaMeasurementId ? (
          <Script id="foreach-google-analytics-consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function () {
                window.dataLayer.push(arguments);
              };
              window.__foreachGaReady = false;
              window.gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              window.gtag('js', new Date());
            `}
          </Script>
        ) : null}
      </head>
      <body>
        <SelectionCartProvider>
          <GlobalTouchInteractions />
          <AnalyticsInteractionTracker />

          {/* Header 自己管理滚动、移动菜单和语言菜单，避免重复监听。 */}
          <SiteHeader />

          {children}

          {/*
            当前静态导出版先固定中文 Footer。
            后续如果需要 Footer 也根据 /en、/fr 自动切换，
            再把语言判断放到具体页面或前端组件里处理。
          */}
          <SiteFooter />

          {/* Cookie 同意管理与用户同意后加载的 GA4 */}
          <CookieConsent />
          <GoogleAnalytics />

          {/*
            全局选型清单抽屉
            说明：
            1. 全站只挂载一次
            2. 首页、详情页、后续产品页都共用这一套清单
            3. 后续页面内部不再单独渲染 FittingSelectionCart
          */}
          <GlobalSelectionCartDrawer />
        </SelectionCartProvider>
      </body>

</html>
  );
}
