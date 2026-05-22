/* =========================================================
   app/layout.tsx
   恒永达官网｜全站根布局

   说明：
   1. 这个文件是所有页面共用的根布局
   2. 当前为了适配 Cloudflare Pages 免费版静态导出，不使用 cookies()
   3. 语言不再从 Cookie 判断，页面语言由具体页面路径控制
   4. SiteHeader 仍然全站共用
   5. SiteFooter 当前先默认使用中文 zh-CN
========================================================= */

import type { Metadata } from "next";
import "./globals.css";
import "./language-typography.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

/* =========================================================
   网站基础 SEO 信息
   说明：
   后续每个页面可以在自己的 page.tsx 里单独设置 metadata
========================================================= */
export const metadata: Metadata = {
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
========================================================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        {/* =================================================
            页面滚动、移动端菜单、语言菜单交互脚本

            说明：
            1. 这段是纯前端浏览器脚本
            2. 不依赖 Cookie，不影响静态导出
            3. 主要控制：
               - 滚动后导航栏状态
               - 手机端菜单打开/关闭
               - 手机端语言下拉打开/关闭
        ================================================= */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function updatePageScrolled() {
                  var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                  document.documentElement.classList.toggle("page-scrolled", y > 1);
                }

                updatePageScrolled();
                window.addEventListener("scroll", updatePageScrolled, { passive: true });
                window.addEventListener("touchmove", updatePageScrolled, { passive: true });
                window.addEventListener("touchend", updatePageScrolled, { passive: true });

                document.addEventListener("click", function (event) {
                  var target = event.target;
                  if (!target || !target.closest) return;

                  var menuButton = target.closest(".mobile-menu-btn");
                  if (menuButton) {
                    event.preventDefault();

                    var openLanguageWrap = document.querySelector(".language-switcher-open");
                    if (openLanguageWrap) {
                      openLanguageWrap.classList.remove("language-switcher-open");
                      var openLanguageButton = openLanguageWrap.querySelector(".language-current");
                      if (openLanguageButton) openLanguageButton.setAttribute("aria-expanded", "false");
                    }

                    var nextMenuOpen = !document.documentElement.classList.contains("mobile-nav-open");
                    document.documentElement.classList.toggle("mobile-nav-open", nextMenuOpen);
                    menuButton.setAttribute("aria-expanded", String(nextMenuOpen));
                    return;
                  }

                  var languageButton = target.closest(".language-current");
                  if (languageButton) {
                    var isPc = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                    if (isPc) return;

                    event.preventDefault();

                    var languageWrap = languageButton.closest(".language-switcher");
                    document.documentElement.classList.remove("mobile-nav-open");

                    var openMenuButton = document.querySelector(".mobile-menu-btn");
                    if (openMenuButton) openMenuButton.setAttribute("aria-expanded", "false");

                    var nextLanguageOpen = !languageWrap.classList.contains("language-switcher-open");
                    languageWrap.classList.toggle("language-switcher-open", nextLanguageOpen);
                    languageButton.setAttribute("aria-expanded", String(nextLanguageOpen));
                    return;
                  }

                  var mobileNavLink = target.closest(".mobile-nav-link");
                  if (mobileNavLink) {
                    document.documentElement.classList.remove("mobile-nav-open");

                    var currentMenuButton = document.querySelector(".mobile-menu-btn");
                    if (currentMenuButton) currentMenuButton.setAttribute("aria-expanded", "false");
                    return;
                  }

                  var languageItem = target.closest(".language-menu-item");
                  if (languageItem) {
                    event.preventDefault();

                    var currentLanguageWrap = languageItem.closest(".language-switcher");
                    var currentLanguageButton = currentLanguageWrap && currentLanguageWrap.querySelector(".language-current");
                    var currentLanguageLabel = currentLanguageButton && currentLanguageButton.querySelector(".language-current-label");

                    if (currentLanguageLabel) currentLanguageLabel.textContent = languageItem.textContent.trim();
                    if (currentLanguageWrap) currentLanguageWrap.classList.remove("language-switcher-open");
                    if (currentLanguageButton) currentLanguageButton.setAttribute("aria-expanded", "false");

                    return;
                  }

                  var activeLanguageWrap = document.querySelector(".language-switcher-open");
                  if (activeLanguageWrap && !target.closest(".language-switcher")) {
                    activeLanguageWrap.classList.remove("language-switcher-open");

                    var activeLanguageButton = activeLanguageWrap.querySelector(".language-current");
                    if (activeLanguageButton) activeLanguageButton.setAttribute("aria-expanded", "false");
                  }
                });
              })();
            `,
          }}
        />

        <SiteHeader />

        {children}

        {/* 
          当前静态导出版先固定中文 Footer。
          后续如果需要 Footer 也根据 /en、/fr 自动切换，
          再把语言判断放到具体页面或前端组件里处理。
        */}
        <SiteFooter locale="zh-CN" />
      </body>
    </html>
  );
}