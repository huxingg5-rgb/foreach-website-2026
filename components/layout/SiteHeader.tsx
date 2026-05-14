"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "首页",
  },
  {
    href: "/#products",
    label: "产品中心",
  },
  {
    href: "/#applications",
    label: "应用领域",
  },
  {
    href: "/#resources",
    label: "资源中心",
  },
  {
    href: "/#about",
    label: "关于我们",
  },
  {
    href: "/#contact",
    label: "联系我们",
  },
];

const languageItems = [
  "简体中文",
  "English",
  "Español",
  "Français",
  "한국어",
  "Русский",
];

export default function SiteHeader() {
  const pathname = usePathname();

  function isNavActive(href: string) {
    return href === "/" && pathname === "/";
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-logo" href="/" aria-label="FOREACH 首页">
          <img
            className="site-logo-white"
            src="/images/logo/foreach-logo-color.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            className="site-logo-color"
            src="/images/logo/foreach-logo-color.svg"
            alt="FOREACH"
          />
        </Link>

        <nav className="site-nav" aria-label="主导航">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link ${
                isNavActive(item.href) ? "site-nav-link-active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <form className="site-search-form" action="/search" method="get">
            <input
              className="site-search-input"
              type="search"
              name="q"
              placeholder="搜索产品 / 型号"
              aria-label="搜索产品或型号"
            />
            <button className="site-search-submit" type="submit" aria-label="搜索">
              <span className="site-search-icon" aria-hidden="true" />
            </button>
          </form>

          <div className="language-switcher">
            <button
              className="language-current"
              type="button"
              aria-label="切换语言"
              aria-expanded="false"
            >
              <span className="language-current-label">简体中文</span>
              <span className="language-arrow">▾</span>
            </button>

            <div className="language-menu">
              {languageItems.map((item) => (
                <button className="language-menu-item" type="button" key={item}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mobile-menu-btn"
            type="button"
            aria-label="打开导航菜单"
            aria-expanded="false"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="移动端导航">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ${
              isNavActive(item.href) ? "mobile-nav-link-active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
