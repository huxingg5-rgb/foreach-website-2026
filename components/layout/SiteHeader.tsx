"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window 等浏览器能力

import Image from "next/image"; // 引入 Next.js 图片组件，用于导航栏产品图片展示
import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import { useEffect, useMemo, useState, type MouseEvent } from "react"; // 引入 React 状态、生命周期、缓存和事件类型

import {
  getLocalizedHref, // 从多语言路径对象中读取当前语言路径
  getLocalizedText, // 从多语言文字对象中读取当前语言文字
  getVisibleNavigationItems, // 获取当前可显示的导航数据
  type NavigationItem, // 导航项类型
  type NavigationKey, // 导航 key 类型
} from "@/data/navigation"; // 从导航数据文件读取导航结构

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
// 说明：这里必须和 middleware.ts 里的 LOCALE_COOKIE_NAME 保持一致
const LOCALE_COOKIE_NAME = "foreach_locale";

/**
 * 根据产品图片路径返回默认产品名称和说明
 *
 * 说明：
 * 1. 这是兜底逻辑
 * 2. 如果 navigation.ts 里的图片配置了 title / description，会优先使用 navigation.ts 的多语言内容
 * 3. 如果某张图片没有配置 title / description，才会使用这里的默认内容
 */
function getProductImageDisplayMeta(src: string, locale: string) {
  const useEnglish = locale !== "zh-CN";

  if (src.includes("syringe-pump")) {
    return {
      title: useEnglish ? "Syringe Pump" : "注射泵",
      description: useEnglish
        ? "High-precision μL–mL dispensing"
        : "μL–mL 级高精度定量分配",
    };
  }

  if (src.includes("diaphragm-pump")) {
    return {
      title: useEnglish ? "Diaphragm Pump" : "隔膜泵",
      description: useEnglish
        ? "Continuous supply, washing, and waste handling"
        : "连续供液、清洗与废液处理",
    };
  }

  if (src.includes("pipetting-pump")) {
    return {
      title: useEnglish ? "Pipetting Pump" : "移液泵",
      description: useEnglish
        ? "Automated pipetting and dispensing"
        : "自动化移液、加样与分液",
    };
  }

  if (src.includes("piston-pump")) {
    return {
      title: useEnglish ? "Piston Pump" : "柱塞泵",
      description: useEnglish
        ? "Stable metering and repeatable transfer"
        : "稳定计量与重复性液体输送",
    };
  }

  if (src.includes("rotary-pump")) {
    return {
      title: useEnglish ? "Rotary Pump" : "旋转泵",
      description: useEnglish
        ? "Multi-channel switching and metering"
        : "多通道液路切换与定量输送",
    };
  }

  return {
    title: useEnglish ? "Product" : "产品",
    description: useEnglish
      ? "Fluidic component for microfluidic systems"
      : "用于微流体液路系统的核心部件",
  };
}

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. PC 端显示 Logo、主导航、搜索框、语言栏
 * 2. PC 端产品中心支持 mega 大下拉菜单
 * 3. 左侧分类和右侧产品卡片通过 categoryKey 对应
 * 4. 右侧产品图按 4 列排列，超过 4 个自动换到下一行
 * 5. 产品名称和说明优先读取 navigation.ts 里的多语言 title / description
 * 6. 当前每个产品点击统一跳到产品中心锚点，避免产品详情页未完成导致 404
 */
export default function SiteHeader() {
  const pathname = usePathname(); // 获取当前页面路径，例如 /、/en、/es、/fr、/ko、/ru

  const currentLocale = getLocaleFromPathname(pathname); // 根据当前路径判断当前语言

  const headerText = headerI18n[currentLocale]; // 获取当前语言下的 Header 文案

  const navigationItems = useMemo(() => getVisibleNavigationItems(), []); // 获取可显示导航，并缓存结果

  const [isScrolled, setIsScrolled] = useState(false); // 控制 Top 栏是否进入滚动后的白底状态

  const [openPanel, setOpenPanel] = useState<OpenPanel>("none"); // 控制语言菜单 / 手机导航菜单哪个正在展开

  const [desktopMegaKey, setDesktopMegaKey] = useState<NavigationKey | null>(
    null
  ); // 控制 PC 端当前打开哪个 mega 下拉菜单

  const [activeMegaCategoryKey, setActiveMegaCategoryKey] = useState<
    string | null
  >(null); // 控制 PC 端 mega 下拉左侧当前鼠标选中的分类

  const isLanguageOpen = openPanel === "language"; // 判断语言菜单是否展开

  const isMobileMenuOpen = openPanel === "mobileNav"; // 判断手机端导航是否展开

  const activeMegaItem = navigationItems.find(
    (item) =>
      item.key === desktopMegaKey &&
      item.dropdownType === "mega" &&
      item.megaDropdown
  ); // 找到当前 PC 端正在展开的 mega 菜单数据

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
    (category) => category.key === activeMegaCategoryKey
  )
    ? activeMegaCategoryKey
    : activeMegaCategories[0]?.key ?? null;

  const activeMegaCategory =
    activeMegaCategories.find(
      (category) => category.key === currentMegaCategoryKey
    ) ??
    activeMegaCategories[0] ??
    null;

  const hasCategoryBoundCards =
    activeMegaItem?.megaDropdown?.cards.some((card) =>
      Boolean(card.categoryKey)
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
   * 判断当前是不是 PC 鼠标设备
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
    if (item.key !== "home") {
      return false;
    }

    return pathname === getLocaleHomePath(currentLocale);
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
      const firstCategory = item.megaDropdown.categories
        .filter((category) => category.enabled)
        .sort((a, b) => a.order - b.order)[0];

      setDesktopMegaKey(item.key);

      setActiveMegaCategoryKey(firstCategory?.key ?? null);
    } else {
      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);
    }
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
      currentPanel === "language" ? "none" : "language"
    );
  }

  /**
   * 点击手机端三横菜单按钮时执行
   */
  function handleMobileMenuClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setOpenPanel((currentPanel) =>
      currentPanel === "mobileNav" ? "none" : "mobileNav"
    );
  }

  /**
   * 关闭所有展开面板
   */
  function closeAllPanels() {
    setOpenPanel("none");

    setDesktopMegaKey(null);

    setActiveMegaCategoryKey(null);
  }

  /**
   * 点击语言选项时执行
   */
  function handleLanguageItemClick(
    event: MouseEvent<HTMLAnchorElement>,
    localeCode: LocaleCode,
    href: string
  ) {
    event.preventDefault();

    localStorage.setItem(LOCALE_COOKIE_NAME, localeCode);

    // eslint-disable-next-line react-hooks/immutability -- 语言切换必须在跳转前写入 Cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

    closeAllPanels();

    window.location.assign(href);
  }

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
      } ${isLanguageOpen ? "language-panel-open" : ""} ${
        isMobileMenuOpen ? "mobile-nav-open" : ""
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

            return (
              <div
                key={item.key}
                className={`site-nav-item ${
                  hasMegaDropdown ? "site-nav-item-has-dropdown" : ""
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
            className={`language-switcher ${
              isLanguageOpen ? "language-switcher-open" : ""
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
{/* 
  语言栏显示文字 

  说明：
  1. 这里固定显示英文单词 Language
  2. 不再跟随当前页面语言变化
  3. 下拉菜单里的具体语言选项仍然保持原来的多语言名称
*/}
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
                  className={`language-details-item ${
                    language.code === currentLocale
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
            className={`mobile-nav-switcher ${
              isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
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
                    <details className="mobile-nav-section" key={item.key}>
                      <summary className="mobile-nav-summary">
                        <span>{navLabel}</span>

                        <span aria-hidden="true">▾</span>
                      </summary>

                      <div className="mobile-nav-submenu">
                        <Link
                          href={navHref}
                          className="mobile-nav-submenu-link mobile-nav-submenu-entry"
                          onClick={closeAllPanels}
                        >
                          {navLabel}
                        </Link>

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
                    className={`mobile-nav-link ${
                      isNavActive(item) ? "mobile-nav-link-active" : ""
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
          className="site-nav-mega site-nav-mega-open"
          onMouseEnter={() => {
            if (activeMegaItem) {
              setDesktopMegaKey(activeMegaItem.key);
            }
          }}
        >
          <div className="site-nav-mega-inner">
            {/* 左侧分类区 */}
            <div className="site-nav-mega-sidebar">
              {activeMegaCategories.map((category) => (
                <div
                  key={category.key}
                  className={`site-nav-mega-category ${
                    currentMegaCategoryKey === category.key
                      ? "site-nav-mega-category-active"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                >
                  <strong>
                    {getLocalizedText(category.title, currentLocale)}
                  </strong>

                  <span className="site-nav-mega-category-desc">
                    {getLocalizedText(category.description, currentLocale)}
                  </span>

                  <span
                    className="site-nav-mega-category-arrow"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* 右侧内容区 */}
            <div className="site-nav-mega-main">
              {/* 右侧顶部说明区：不显示“泵类 / 阀类”等大标题，只保留说明 */}
              <div className="site-nav-mega-heading">
                <p>
                  {activeMegaCategory
                    ? getLocalizedText(
                        activeMegaCategory.description,
                        currentLocale
                      )
                    : getLocalizedText(
                        activeMegaItem.megaDropdown.description,
                        currentLocale
                      )}
                </p>
              </div>

              {/* 产品入口区域：4 个一行，超过 4 个自动换行 */}
              <div
                style={{
                  width: "100%",
                  minWidth: 0,
                  background: "#ffffff",
                }}
              >
                {activeMegaCards.map((card) => {
                  const cardImages = card.images || [];

                  const mainImage = card.image;

                  // 产品列表：
                  // 1. 如果有 images，就全部显示 images
                  // 2. 不使用 slice(0, 4)，所以超过 4 个会自动换行
                  // 3. 例如 5 个产品：第一行 4 个，第二行 1 个
                  const displayProductImages = cardImages;

                  return (
                    <div
                      key={card.key}
                      style={{
                        width: "100%",
                        minWidth: 0,
                        background: "#ffffff",
                      }}
                    >
                      {displayProductImages.length > 0 ? (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(4, minmax(0, 1fr))",
                            columnGap: "46px",
                            rowGap: "34px",
                            width: "100%",
                            minWidth: 0,
                            background: "#ffffff",
                            alignItems: "start",
                            paddingTop: "20px",
                          }}
                        >
                          {displayProductImages.map((cardImage) => {
                            // 兜底产品名称和说明
                            const fallbackProductMeta =
                              getProductImageDisplayMeta(
                                cardImage.src,
                                currentLocale
                              );

                            // 最终显示的产品名称和说明
                            // 优先使用 navigation.ts 里每张图片配置的 title / description
                            // 如果没有配置，再使用上面的 fallbackProductMeta
                            const productMeta = {
                              title: cardImage.title
                                ? getLocalizedText(
                                    cardImage.title,
                                    currentLocale
                                  )
                                : fallbackProductMeta.title,

                              description: cardImage.description
                                ? getLocalizedText(
                                    cardImage.description,
                                    currentLocale
                                  )
                                : fallbackProductMeta.description,
                            };

                            return (
                              <Link
                                key={cardImage.src}
                                href={getLocalizedHref(
                                  card.href,
                                  currentLocale
                                )}
                                onClick={closeAllPanels}
                                className="site-nav-product-clean-link"
                                style={{
                                  display: "block",
                                  minWidth: 0,
                                  textAlign: "center",
                                  textDecoration: "none",
                                  color: "inherit",
                                  background: "#ffffff",
                                  padding: 0,
                                  border: "none",
                                  borderRadius: 0,
                                }}
                              >
                                {/* 产品图片 */}
                                <div
                                  style={{
                                    width: "100%",
                                    height: "112px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "12px",
                                    background: "#ffffff",
                                  }}
                                >
                                  <Image
                                    src={cardImage.src}
                                    alt={getLocalizedText(
                                      cardImage.alt,
                                      currentLocale
                                    )}
                                    width={cardImage.width ?? 600}
                                    height={cardImage.height ?? 380}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                      display: "block",
                                    }}
                                  />
                                </div>

                                {/* 产品名称 */}
                                <strong
                                  style={{
                                    display: "block",
                                    fontSize: "15px",
                                    lineHeight: 1.35,
                                    color: "#173368",
                                    marginBottom: "6px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {productMeta.title}
                                </strong>

                                {/* 产品说明 */}
                                <span
                                  style={{
                                    display: "block",
                                    fontSize: "12px",
                                    lineHeight: 1.45,
                                    color: "rgba(23, 51, 104, 0.62)",
                                  }}
                                >
                                  {productMeta.description}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      ) : mainImage ? (
                        <div
                          style={{
                            width: "100%",
                            height: "180px",
                            marginBottom: "18px",
                            overflow: "hidden",
                            background: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={mainImage.src}
                            alt={getLocalizedText(
                              mainImage.alt,
                              currentLocale
                            )}
                            width={mainImage.width ?? 600}
                            height={mainImage.height ?? 380}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </div>
                      ) : (
                        <Link
                          href={getLocalizedHref(card.href, currentLocale)}
                          onClick={closeAllPanels}
                          style={{
                            display: "inline-block",
                            textDecoration: "none",
                            color: "inherit",
                          }}
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
                    currentLocale
                  )}
                </span>

                <Link
                  href={getLocalizedHref(
                    activeMegaItem.megaDropdown.footerHref,
                    currentLocale
                  )}
                  onClick={closeAllPanels}
                >
                  {getLocalizedText(
                    activeMegaItem.megaDropdown.footerLinkLabel,
                    currentLocale
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