"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window 等浏览器能力

import Image from "next/image"; // 引入 Next.js 图片组件，用于导航栏产品图片展示
import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import { useEffect, useMemo, useState, type MouseEvent } from "react"; // 引入 React 状态、生命周期、缓存和事件类型

import {
  getLocalizedHref, // 从多语言路径对象中读取当前语言路径
  getLocalizedText, // 从多语言文字对象中读取当前语言文字
  getProductImageDisplayMeta, // 根据产品图片路径读取兜底产品名称和说明
  getVisibleNavigationItems, // 获取当前可显示的导航数据
  type NavigationItem, // 导航项类型
  type NavigationKey, // 导航 key 类型
} from "@/data/navigation"; // 从导航数据文件读取导航结构和产品兜底文案

import {
  getLocaleFromPathname, // 根据当前 URL 判断语言
  getLocaleHomePath, // 根据语言获取首页路径
  headerI18n, // Header 里的搜索框、无障碍文案等多语言文字
  languageItems, // 语言切换菜单
  type LocaleCode, // 当前官网支持的语言类型
} from "@/lib/i18n"; // 从 i18n 文件读取语言工具和语言文案

// 顶部栏展开面板类型
// none：没有展开
// language：语言菜单展开
// mobileNav：手机端导航菜单展开
type OpenPanel = "none" | "language" | "mobileNav";

// 语言偏好 Cookie 名称
// 说明：这里必须和 proxy.ts 里的 LOCALE_COOKIE_NAME 保持一致
const LOCALE_COOKIE_NAME = "foreach_locale";

/* ================================
   语言路径前缀配置
   说明：
   1. 中文默认不使用 /zh-CN 前缀
   2. 其他语言统一使用 /en、/es、/fr、/ko、/ru 前缀
   3. 语言切换时会先移除旧语言前缀，再拼接新语言前缀
================================ */
const LOCALE_PATH_PREFIXES = ["en", "es", "fr", "ko", "ru"];

/* ================================
   去掉路径中的语言前缀
   例子：
   /en/about/history → /about/history
   /es/products/pumps → /products/pumps
   /about/history → /about/history
   /en → /
================================ */
function stripLocalePrefixFromPath(pathname: string) {
  const pathOnly = pathname.split("?")[0]?.split("#")[0] || "/";

  const pathParts = pathOnly.split("/").filter(Boolean);

  const firstPart = pathParts[0];

  if (firstPart && LOCALE_PATH_PREFIXES.includes(firstPart)) {
    const restPath = pathParts.slice(1).join("/");

    return restPath ? `/${restPath}` : "/";
  }

  return pathOnly || "/";
}

/* ================================
   根据目标语言生成新路径
   例子：
   当前 /about/history，切英文 → /en/about/history
   当前 /en/about/history，切法文 → /fr/about/history
   当前 /fr/about/history，切中文 → /about/history
   当前 /en，切中文 → /
================================ */
function buildLocalizedPathname(pathname: string, localeCode: LocaleCode) {
  const pathWithoutLocale = stripLocalePrefixFromPath(pathname);

  if (localeCode === "zh-CN") {
    return pathWithoutLocale;
  }

  return `/${localeCode}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
}

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. PC 端显示 Logo、主导航、搜索框、语言栏
 * 2. PC 端产品中心 / 关于我们等支持 Mega 大下拉菜单
 * 3. 左侧分类和右侧内容卡片通过 categoryKey 对应
 * 4. 关于我们下拉栏通过 site-nav-mega-about 单独控制右侧样式
 * 5. 当前阶段多语言详情页还没完整建立，所以切换语言时先保留当前页面路径
 */
export default function SiteHeader() {
  const pathname = usePathname(); // 获取当前页面路径，例如 /、/about/culture、/en 等

  /**
   * 当前顶部栏显示语言
   *
   * 说明：
   * 1. 以前 currentLocale 只根据 URL 判断，所以 /about/culture 永远是中文
   * 2. 现在改成 useState，才能在不改变路径的情况下切换顶部栏语言
   * 3. 页面加载后会优先读取 localStorage 保存的语言
   */
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>(
    getLocaleFromPathname(pathname),
  );

  const headerText = headerI18n[currentLocale]; // 获取当前语言下的 Header 文案

  const navigationItems = useMemo(
    () => getVisibleNavigationItems(currentLocale),
    [currentLocale],
  ); // 根据当前语言获取可显示导航，并缓存结果

  const [isScrolled, setIsScrolled] = useState(false); // 控制 Top 栏是否进入滚动后的白底状态

  const [openPanel, setOpenPanel] = useState<OpenPanel>("none"); // 控制语言菜单 / 手机导航菜单哪个正在展开

  const [desktopMegaKey, setDesktopMegaKey] = useState<NavigationKey | null>(
    null,
  ); // 控制 PC 端当前打开哪个 mega 下拉菜单

  const [activeMegaCategoryKey, setActiveMegaCategoryKey] = useState<
    string | null
  >(null); // 控制 PC 端 mega 下拉左侧当前鼠标选中的分类

  /* ================================
     手机端导航当前展开栏目
     说明：
     1. 用于实现手机端手风琴菜单
     2. 同一时间只允许展开一个栏目
     3. 点击产品中心时，其他栏目会自动收缩
  ================================ */
  const [openMobileSectionKey, setOpenMobileSectionKey] =
    useState<NavigationKey | null>(null);

  const isLanguageOpen = openPanel === "language"; // 判断语言菜单是否展开

  const isMobileMenuOpen = openPanel === "mobileNav"; // 判断手机端导航是否展开

  const activeMegaItem = navigationItems.find(
    (item) =>
      item.key === desktopMegaKey &&
      item.dropdownType === "mega" &&
      item.megaDropdown,
  ); // 找到当前 PC 端正在展开的 mega 菜单数据

  const activeSimpleItem = navigationItems.find(
    (item) =>
      item.key === desktopMegaKey &&
      item.dropdownType === "simple" &&
      item.mobileChildren,
  ); // 找到当前 PC 端正在展开的简单下拉菜单数据

  const activeSimpleChildren =
    activeSimpleItem?.mobileChildren
      ?.filter((child) => child.enabled)
      .sort((a, b) => a.order - b.order) ?? [];

  /* ================================
     当前 Mega 菜单分类与右侧卡片筛选
     说明：
     1. activeMegaCategories：当前下拉菜单左侧分类
     2. currentMegaCategoryKey：当前真正选中的分类 key
     3. activeMegaCategory：当前选中的分类对象
     4. activeMegaCards：右侧根据 categoryKey 筛选后的卡片
  ================================ */
  const activeMegaCategories =
    activeMegaItem?.megaDropdown?.categories
      .filter((category) => category.enabled)
      .sort((a, b) => a.order - b.order) ?? [];

  const currentMegaCategoryKey = activeMegaCategories.some(
    (category) => category.key === activeMegaCategoryKey,
  )
    ? activeMegaCategoryKey
    : activeMegaCategories[0]?.key ?? null;

  const activeMegaCategory =
    activeMegaCategories.find(
      (category) => category.key === currentMegaCategoryKey,
    ) ??
    activeMegaCategories[0] ??
    null;

  const hasCategoryBoundCards =
    activeMegaItem?.megaDropdown?.cards.some((card) =>
      Boolean(card.categoryKey),
    ) ?? false;

  const activeMegaCards =
    activeMegaItem?.megaDropdown?.cards
      .filter((card) => card.enabled)
      .filter((card) => {
        // 如果没有任何卡片配置 categoryKey，就兼容旧数据，全部显示
        if (!hasCategoryBoundCards) {
          return true;
        }

        // 如果配置了 categoryKey，就只显示当前左侧分类对应的卡片
        return card.categoryKey === currentMegaCategoryKey;
      })
      .sort((a, b) => a.order - b.order) ?? [];

  /**
   * 同步当前语言
   *
   * 说明：
   * 1. 优先读取 URL 参数，例如 /about/foreach?lang=en
   * 2. 其次读取 URL 路径，例如 /en
   * 3. 再读取 localStorage 保存的语言
   * 4. 最后默认中文
   */
  useEffect(() => {
    const supportedLocales: LocaleCode[] = [
      "zh-CN",
      "en",
      "es",
      "fr",
      "ko",
      "ru",
    ];

    function normalizeHeaderLocale(value: string | null): LocaleCode | null {
      if (!value) {
        return null;
      }

      const normalizedValue = value.trim();

      if (normalizedValue === "zh") {
        return "zh-CN";
      }

      if (supportedLocales.includes(normalizedValue as LocaleCode)) {
        return normalizedValue as LocaleCode;
      }

      return null;
    }

    /*
      1. 先读取 URL 参数
      例如：
      /about/foreach?lang=en
      /about/foreach?lang=es
    */
    const searchParams = new URLSearchParams(window.location.search);

    const localeFromQuery =
      normalizeHeaderLocale(searchParams.get("lang")) ||
      normalizeHeaderLocale(searchParams.get("locale"));

    if (localeFromQuery) {
      setCurrentLocale(localeFromQuery);

      localStorage.setItem(LOCALE_COOKIE_NAME, localeFromQuery);
      localStorage.setItem("NEXT_LOCALE", localeFromQuery);
      localStorage.setItem("lang", localeFromQuery);

      return;
    }

    /*
      2. 再读取 URL 路径
      例如：
      /en
      /es
      /fr
    */
    const localeFromPath = getLocaleFromPathname(pathname);

    if (localeFromPath !== "zh-CN") {
      setCurrentLocale(localeFromPath);
      return;
    }

    /*
      3. 如果 URL 没有语言信息，再读取 localStorage
    */
    const savedLocale =
      normalizeHeaderLocale(localStorage.getItem(LOCALE_COOKIE_NAME)) ||
      normalizeHeaderLocale(localStorage.getItem("NEXT_LOCALE")) ||
      normalizeHeaderLocale(localStorage.getItem("lang"));

    if (savedLocale) {
      setCurrentLocale(savedLocale);
      return;
    }

    setCurrentLocale(localeFromPath);
  }, [pathname]);
  /**
   * 判断当前是不是 PC 鼠标设备
   *
   * 说明：
   * 1. PC 端才使用 hover 展开 mega 下拉
   * 2. 手机端 / 触摸设备不走这个逻辑，避免误触
   */
  function isPcHoverDevice() {
    if (typeof window === "undefined") {
      return false;
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;

    const isWideScreen = window.innerWidth > 1000;

    return canHover && isWideScreen;
  }

  /**
   * 判断某个导航是否为当前选中状态
   *
   * 当前阶段先只让首页高亮；
   * 产品中心、应用领域等是首页锚点，暂时不做滚动高亮。
   */
  function isNavActive(item: NavigationItem) {
    /*
      通用导航高亮逻辑
      说明：
      1. 不只针对首页或发展历程
      2. 所有页面都会先去掉语言前缀再比较
      3. /en/about/history 会识别为 /about/history
      4. 这样 About / Products / Applications 等栏目都能正常高亮
    */
    const currentPathWithoutLocale = stripLocalePrefixFromPath(pathname);

    const itemHref = getLocalizedHref(item.href, currentLocale);

    const itemPathWithoutLocale = stripLocalePrefixFromPath(itemHref);

    if (item.key === "home") {
      return currentPathWithoutLocale === "/";
    }

    if (!itemPathWithoutLocale || itemPathWithoutLocale === "/") {
      return false;
    }

    return (
      currentPathWithoutLocale === itemPathWithoutLocale ||
      currentPathWithoutLocale.startsWith(`${itemPathWithoutLocale}/`)
    );
  }

  /**
   * 同步 html 的 lang 属性
   *
   * 作用：
   * 1. 让浏览器知道当前页面语言
   * 2. 对 SEO / 可访问性更友好
   */
  useEffect(() => {
    document.documentElement.lang =
      currentLocale === "zh-CN" ? "zh-CN" : currentLocale;
  }, [currentLocale]);

  /**
   * 页面滚动监听
   *
   * 作用：
   * 1. 页面顶部时 Top 栏透明
   * 2. 页面向下滚动后 Top 栏变白
   * 3. 给 html 添加 page-scrolled 类名
   */
  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const nextScrolled = scrollTop > 1;

      setIsScrolled(nextScrolled);

      document.documentElement.classList.toggle("page-scrolled", nextScrolled);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("page-scrolled");
    };
  }, []);

  /**
   * PC 端鼠标进入导航项时执行
   */
  function handleDesktopNavMouseEnter(item: NavigationItem) {
    if (!isPcHoverDevice()) {
      return;
    }

    if (item.dropdownType === "mega" && item.megaDropdown) {
      /*
         Mega 大下拉：
         用于产品中心、关于我们等复杂下拉
      */
      const firstCategory = item.megaDropdown.categories
        .filter((category) => category.enabled)
        .sort((a, b) => a.order - b.order)[0];

      setDesktopMegaKey(item.key);
      setActiveMegaCategoryKey(firstCategory?.key ?? null);

      return;
    }

    if (item.dropdownType === "simple" && item.mobileChildren) {
      /*
         Simple 小下拉：
         用于外语版 Contact & Partnership
         只显示 Contact Us / Become a Distributor 两个入口
      */
      setDesktopMegaKey(item.key);
      setActiveMegaCategoryKey(null);

      return;
    }

    /*
       没有下拉：
       中文版“联系我们”等普通导航
    */
    setDesktopMegaKey(null);
    setActiveMegaCategoryKey(null);
  } 


  /**
   * 鼠标离开整个 Header 时执行
   */
  function handleHeaderMouseLeave() {
    if (!isPcHoverDevice()) {
      return;
    }

    setDesktopMegaKey(null);

    setActiveMegaCategoryKey(null);

    setOpenPanel("none");
  }

  /**
   * PC 端鼠标进入语言栏时展开
   */
  function handleLanguageMouseEnter() {
    if (isPcHoverDevice()) {
      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);

      setOpenPanel("language");
    }
  }

  /**
   * PC 端鼠标离开语言栏时关闭
   */
  function handleLanguageMouseLeave() {
    if (isPcHoverDevice()) {
      setOpenPanel("none");
    }
  }

  /**
   * 点击语言按钮时执行
   */
  function handleLanguageButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setDesktopMegaKey(null);

    setActiveMegaCategoryKey(null);

    setOpenPanel((currentPanel) =>
      currentPanel === "language" ? "none" : "language",
    );
  }

  /**
   * 点击手机端三横菜单按钮时执行
   */
  function handleMobileMenuClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setOpenPanel((currentPanel) =>
      currentPanel === "mobileNav" ? "none" : "mobileNav",
    );
  }

  /**
   * 关闭所有展开面板
   */
  function closeAllPanels() {
    setOpenPanel("none");

    setDesktopMegaKey(null);

    setActiveMegaCategoryKey(null);

    // 关闭手机端已展开的折叠菜单
    setOpenMobileSectionKey(null);
  }

  /**
   * 点击语言选项时执行
   *
   * 说明：
   * 1. 写入 localStorage
   * 2. 写入 Cookie
   * 3. 修改 html lang
   * 4. 给当前 URL 加上 ?lang=语言
   * 5. 刷新当前页面，让关于恒永达页面读取到语言
   */
  function handleLanguageItemClick(
    event: MouseEvent<HTMLAnchorElement>,
    localeCode: LocaleCode,
    _homeHref: string,
  ) {
    event.preventDefault();

    /*
      通用语言切换逻辑
      说明：
      1. 不只服务发展历程页面
      2. 所有页面都按当前路径切换语言前缀
      3. 中文默认不加 /zh-CN
      4. 其他语言统一加 /en、/es、/fr、/ko、/ru
      5. 不再使用 ?lang=en，避免把多语言页面强行带回中文路径
    */
    setCurrentLocale(localeCode);

    localStorage.setItem(LOCALE_COOKIE_NAME, localeCode);
    localStorage.setItem("NEXT_LOCALE", localeCode);
    localStorage.setItem("lang", localeCode);

    // eslint-disable-next-line react-hooks/immutability -- 语言切换必须在跳转前写入 Cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

    // eslint-disable-next-line react-hooks/immutability -- 兼容其他页面读取 NEXT_LOCALE
    document.cookie = `NEXT_LOCALE=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

    // eslint-disable-next-line react-hooks/immutability -- 兼容通过 lang Cookie 读取语言
    document.cookie = `lang=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

    document.documentElement.lang =
      localeCode === "zh-CN" ? "zh-CN" : localeCode;

    closeAllPanels();

    const nextPathname = buildLocalizedPathname(
      window.location.pathname,
      localeCode,
    );

    /*
      保留原来的查询参数，但删除旧的 lang / locale 参数
      例子：
      /products?p=1&lang=en → /en/products?p=1
    */
    const nextSearchParams = new URLSearchParams(window.location.search);

    nextSearchParams.delete("lang");
    nextSearchParams.delete("locale");

    const nextSearch = nextSearchParams.toString();

    const nextUrl = `${nextPathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;

    window.location.assign(nextUrl);
  }

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
        } ${isLanguageOpen ? "language-panel-open" : ""} ${isMobileMenuOpen ? "mobile-nav-open" : ""
        }`}
      onMouseLeave={handleHeaderMouseLeave}
    >
      {/* Top 栏内部容器 */}
      <div className="site-header-inner">
        {/* Logo 区域 */}
        <Link
          className="site-logo"
          href={getLocaleHomePath(currentLocale)}
          aria-label={headerText.logoAriaLabel}
          onClick={closeAllPanels}
        >
          {/* 白色 Logo：透明 Top 栏状态下显示 */}
          <img
            className="site-logo-white"
            src="/images/logo/foreach-logo-color.svg"
            alt=""
            aria-hidden="true"
          />

          {/* 彩色 Logo：滚动后、hover 后、菜单展开后显示 */}
          <img
            className="site-logo-color"
            src="/images/logo/foreach-logo-color.svg"
            alt="FOREACH"
          />
        </Link>

        {/* PC 端主导航 */}
        <nav className="site-nav" aria-label={headerText.navAriaLabel}>
          {navigationItems.map((item) => {
            const navLabel = getLocalizedText(item.label, currentLocale);

            const navHref = getLocalizedHref(item.href, currentLocale);

            const hasMegaDropdown =
              item.dropdownType === "mega" && Boolean(item.megaDropdown);

            const hasSimpleDropdown =
              item.dropdownType === "simple" &&
              Boolean(item.mobileChildren?.length);

            const simpleChildren =
              item.mobileChildren
                ?.filter((child) => child.enabled)
                .sort((a, b) => a.order - b.order) ?? [];

            const isSimpleDropdownOpen =
              desktopMegaKey === item.key && hasSimpleDropdown;

            return (
              <div
                key={item.key}
                className={`site-nav-item ${
                  hasMegaDropdown || hasSimpleDropdown
                    ? "site-nav-item-has-dropdown"
                    : ""
                } ${
                  isSimpleDropdownOpen ? "site-nav-item-simple-open" : ""
                }`}
                onMouseEnter={() => handleDesktopNavMouseEnter(item)}
              >
                <Link
                  href={navHref}
                  className={`site-nav-link ${
                    isNavActive(item) ? "site-nav-link-active" : ""
                  }`}
                  onClick={closeAllPanels}
                >
                  {navLabel}
                </Link>

                {isSimpleDropdownOpen ? (
                  <div
                    className="site-nav-simple-dropdown"
                    onMouseEnter={() => {
                      setDesktopMegaKey(item.key);
                      setActiveMegaCategoryKey(null);
                    }}
                  >
                    {simpleChildren.map((child) => (
                      <Link
                        key={child.key}
                        href={getLocalizedHref(child.href, currentLocale)}
                        className="site-nav-simple-dropdown-link"
                        onClick={closeAllPanels}
                      >
                        {getLocalizedText(child.label, currentLocale)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>  

        {/* 右侧工具区：搜索栏、语言栏、手机菜单按钮 */}
        <div className="site-header-actions">
          {/* 搜索栏：手机端通过 CSS 隐藏 */}
          <form
            className="site-search-form"
            action={
              currentLocale === "zh-CN"
                ? "/search"
                : `/${currentLocale}/search`
            }
            method="get"
          >
            <input
              className="site-search-input"
              type="search"
              name="q"
              placeholder={headerText.searchPlaceholder}
              aria-label={headerText.searchAriaLabel}
            />

            <button
              className="site-search-submit"
              type="submit"
              aria-label={headerText.searchButtonAriaLabel}
            >
              <span className="site-search-icon" aria-hidden="true" />
            </button>
          </form>

          {/* 语言栏 */}
          <div
            className={`language-switcher ${isLanguageOpen ? "language-switcher-open" : ""
              }`}
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            <button
              className="language-summary"
              type="button"
              aria-label={headerText.languageAriaLabel}
              aria-expanded={isLanguageOpen}
              onClick={handleLanguageButtonClick}
              title={headerText.languageSwitchTitle}
            >
              {/* 语言栏固定显示英文单词 Language */}
              <span className="language-summary-label">Language</span>

              <span className="language-summary-arrow" aria-hidden="true">
                ▾
              </span>
            </button>

            <div className="language-details-menu">
              {languageItems.map((language) => (
                <a
                  key={language.code}
                  href={language.href}
                  className={`language-details-item ${language.code === currentLocale
                    ? "language-details-item-active"
                    : ""
                    }`}
                  onClick={(event) =>
                    handleLanguageItemClick(event, language.code, language.href)
                  }
                >
                  {language.label}
                </a>
              ))}
            </div>
          </div>

          {/* 手机端导航栏：按钮 + 下拉菜单 */}
          <div
            className={`mobile-nav-switcher ${isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
              }`}
          >
            <button
              className="mobile-menu-btn"
              type="button"
              aria-label={headerText.mobileMenuAriaLabel}
              aria-expanded={isMobileMenuOpen}
              onClick={handleMobileMenuClick}
            >
              <svg
                className="mobile-menu-icon"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
              >
                <rect
                  className="mobile-menu-line mobile-menu-line-top"
                  x="180"
                  y="255"
                  width="664"
                  height="72"
                  rx="36"
                  fill="currentColor"
                />

                <rect
                  className="mobile-menu-line mobile-menu-line-middle"
                  x="180"
                  y="476"
                  width="664"
                  height="72"
                  rx="36"
                  fill="currentColor"
                />

                <rect
                  className="mobile-menu-line mobile-menu-line-bottom"
                  x="180"
                  y="697"
                  width="664"
                  height="72"
                  rx="36"
                  fill="currentColor"
                />
              </svg>
            </button>

            <nav
              className="mobile-nav"
              aria-label={headerText.mobileNavAriaLabel}
            >
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

                const mobileChildren = (item.mobileChildren || [])
                  .filter((child) => child.enabled)
                  .sort((a, b) => a.order - b.order);

                const hasMobileChildren = mobileChildren.length > 0;

                if (hasMobileChildren) {
                  return (
                    <details
                      className="mobile-nav-section"
                      key={item.key}
                      open={openMobileSectionKey === item.key}
                    >
                      <summary
                        className="mobile-nav-summary"
                        onClick={(event) => {
                          event.preventDefault();

                          setOpenMobileSectionKey((currentKey) =>
                            currentKey === item.key ? null : item.key,
                          );
                        }}
                      >
                        <span className="mobile-nav-summary-text">{navLabel}</span>
                      </summary>

                      <div className="mobile-nav-submenu">
                        {mobileChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="mobile-nav-submenu-link"
                            onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={navHref}
                    className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                      }`}
                    onClick={closeAllPanels}
                  >
                    {navLabel}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* PC 端 Mega 下拉面板 */}
      {activeMegaItem?.megaDropdown && (
        <div
          className={`site-nav-mega site-nav-mega-open site-nav-mega-${activeMegaItem.key}`}
          onMouseEnter={() => {
            if (activeMegaItem) {
              setDesktopMegaKey(activeMegaItem.key);
            }
          }}
        >
          <div className="site-nav-mega-inner">
            {/* 左侧分类区 */}
            {/* 左侧分类区 */}
            <div className="site-nav-mega-sidebar">
              {activeMegaCategories.map((category) => {
                /**
                 * 查找当前左侧栏目对应的右侧 card
                 *
                 * 说明：
                 * 1. 左侧栏目本身 categories 没有 href
                 * 2. 真正的跳转链接在 cards 里面
                 * 3. 所以这里通过 category.key 找到对应 card.categoryKey
                 */
                const categoryPrimaryCard = activeMegaItem.megaDropdown?.cards
                  .filter((card) => card.enabled)
                  .sort((a, b) => a.order - b.order)
                  .find((card) => card.categoryKey === category.key);

                const categoryHref = categoryPrimaryCard?.href;

                const categoryContent = (
                  <>
                    <strong>{getLocalizedText(category.title, currentLocale)}</strong>

                    <span className="site-nav-mega-category-desc">
                      {getLocalizedText(category.description, currentLocale)}
                    </span>

                    <span className="site-nav-mega-category-arrow" aria-hidden="true" />
                  </>
                );

                /**
                 * 有 href 的栏目渲染成 Link
                 * 例如：恒永达文化 → /about/culture
                 */
                if (categoryHref) {
                  return (
                    <Link
                      key={category.key}
                      href={getLocalizedHref(categoryHref, currentLocale)}
                      className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                        ? "site-nav-mega-category-active"
                        : ""
                        }`}
                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                      onClick={closeAllPanels}
                    >
                      {categoryContent}
                    </Link>
                  );
                }

                /**
                 * 没有 href 的栏目只做 hover 切换
                 */
                return (
                  <div
                    key={category.key}
                    className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                      ? "site-nav-mega-category-active"
                      : ""
                      }`}
                    onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                  >
                    {categoryContent}
                  </div>
                );
              })}
            </div>

            {/* 右侧内容区 */}
            <div className="site-nav-mega-main">
              {/* 右侧顶部说明区 */}
              <div className="site-nav-mega-heading">
                <p>
                  {getLocalizedText(
                    activeMegaItem.key === "about" &&
                      activeMegaCards[0]?.description
                      ? activeMegaCards[0].description
                      : activeMegaCategory?.description ??
                      activeMegaItem.megaDropdown.description,
                    currentLocale,
                  )}
                </p>
              </div>

              {/* 产品 / 图片入口区域 */}
              <div className="site-nav-mega-product-area">
                {activeMegaCards.map((card) => {
                  const cardImages = card.images || []; // 读取当前分类下的产品图片列表

                  const mainImage = card.image; // 读取单张主图，兼容旧数据结构

                  const displayProductImages = cardImages;

                  return (
                    <div key={card.key} className="site-nav-mega-product-group">
                      {displayProductImages.length > 0 ? (
                        <div className="site-nav-mega-product-grid">
                          {displayProductImages.map((cardImage) => {
                            const fallbackProductMeta =
                              getProductImageDisplayMeta(
                                cardImage.src,
                                currentLocale,
                              );

                            const productMeta = {
                              title: cardImage.title
                                ? getLocalizedText(
                                  cardImage.title,
                                  currentLocale,
                                )
                                : fallbackProductMeta.title,

                              description: cardImage.description
                                ? getLocalizedText(
                                  cardImage.description,
                                  currentLocale,
                                )
                                : fallbackProductMeta.description,
                            };

                            return (
                              <Link
                                key={cardImage.src}
                                href={getLocalizedHref(
                                  card.href,
                                  currentLocale,
                                )}
                                onClick={closeAllPanels}
                                className="site-nav-product-clean-link"
                              >
                                <div className="site-nav-product-image-box">
                                  <Image
                                    className="site-nav-product-image"
                                    src={cardImage.src}
                                    alt={getLocalizedText(
                                      cardImage.alt,
                                      currentLocale,
                                    )}
                                    width={cardImage.width ?? 600}
                                    height={cardImage.height ?? 380}
                                  />
                                </div>

                                <strong className="site-nav-product-title">
                                  {productMeta.title}
                                </strong>

                                <span className="site-nav-product-desc">
                                  {productMeta.description}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : mainImage ? (
                        <div className="site-nav-mega-single-image-box">
                          <Image
                            className="site-nav-mega-single-image"
                            src={mainImage.src}
                            alt={getLocalizedText(
                              mainImage.alt,
                              currentLocale,
                            )}
                            width={mainImage.width ?? 600}
                            height={mainImage.height ?? 380}
                          />
                        </div>
                      ) : (
                        <Link
                          href={getLocalizedHref(card.href, currentLocale)}
                          onClick={closeAllPanels}
                          className="site-nav-mega-icon-link"
                        >
                          <span
                            className="site-nav-mega-card-icon"
                            aria-hidden="true"
                          />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 底部入口区 */}
              <div className="site-nav-mega-footer">
                <span>
                  {getLocalizedText(
                    activeMegaItem.megaDropdown.footerText,
                    currentLocale,
                  )}
                </span>

                <Link
                  href={getLocalizedHref(
                    activeMegaCards[0]?.href ??
                    activeMegaItem.megaDropdown.footerHref,
                    currentLocale,
                  )}
                  onClick={closeAllPanels}
                >
                  {activeMegaCards[0]?.title
                    ? `${getLocalizedText(
                      activeMegaCards[0].title,
                      currentLocale,
                    )} →`
                    : getLocalizedText(
                      activeMegaItem.megaDropdown.footerLinkLabel,
                      currentLocale,
                    )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 手机端遮罩 */}
      {openPanel !== "none" && (
        <button
          className="mobile-nav-backdrop"
          type="button"
          aria-label="关闭顶部展开菜单"
          onClick={closeAllPanels}
        />
      )}
    </header>
  );
}  