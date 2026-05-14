import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";

/**
 * metadata
 * 网站基础 SEO 信息
 * 后续可以根据不同页面单独生成 title 和 description
 */
export const metadata: Metadata = {
  title: "恒永达 FOREACH 官网",
  description:
    "恒永达专注于微流体系统核心零部件与液路系统解决方案，服务 IVD、生命科学、高端分析仪器、合成生物和实验室自动化领域。",
};

/**
 * RootLayout
 * 全站根布局
 *
 * 作用：
 * 1. 所有页面共用这个布局
 * 2. SiteHeader 放在这里后，所有页面都会自动带顶部导航
 * 3. children 是每个页面自己的内容
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
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
      </body>
    </html>
  );
}
