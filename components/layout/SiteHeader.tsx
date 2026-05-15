"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window 等浏览器能力

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
// 说明：这里必须和 middleware.ts 里的 LOCALE_COOKIE_NAME 保持一致，否则从其他语言切回中文 "/" 时会被旧 Cookie 再次重定向
const LOCALE_COOKIE_NAME = "foreach_locale";

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. PC 端显示 Logo、主导航、搜索框、语言栏
 * 2. PC 端产品中心支持 mega 大下拉菜单
 * 3. 手机端显示 Logo、语言栏、三横菜单
 * 4. 手机端导航支持二级菜单
 * 5. 导航内容从 data/navigation.ts 读取，方便后续后端 / CMS 替换
 */
export default function SiteHeader() {
  const pathname = usePathname(); // 获取当前页面路径，例如 /、/en、/es、/fr、/ko、/ru

  const currentLocale = getLocaleFromPathname(pathname); // 根据当前路径判断当前语言

  const headerText = headerI18n[currentLocale]; // 获取当前语言下的 Header 文案

  const navigationItems = useMemo(() => getVisibleNavigationItems(), []); // 获取可显示导航，并缓存结果，避免每次渲染重复排序

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

  /**
   * 判断当前是不是 PC 鼠标设备
   *
   * 说明：
   * 1. PC 端一般支持 hover
   * 2. 手机端一般不支持 hover
   * 3. 同时判断屏幕宽度，避免平板误判
   */
  function isPcHoverDevice() {
    if (typeof window === "undefined") {
      return false; // 服务端渲染时没有 window，直接返回 false
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches; // 判断设备是否支持鼠标 hover

    const isWideScreen = window.innerWidth > 1000; // 判断屏幕是否大于移动端断点

    return canHover && isWideScreen; // 同时满足 hover 和宽屏，才认为是 PC 端
  }

  /**
   * 判断某个导航是否为当前选中状态
   *
   * 说明：
   * 1. 当前阶段先只让首页高亮
   * 2. 产品中心、应用领域这些是首页锚点，暂时不做滚动高亮
   */
  function isNavActive(item: NavigationItem) {
    if (item.key !== "home") {
      return false; // 非首页暂时不做高亮
    }

    return pathname === getLocaleHomePath(currentLocale); // 当前路径等于当前语言首页时，高亮首页
  }

  /**
   * 同步 html 的 lang 属性
   *
   * 作用：
   * 1. 让浏览器知道当前页面语言
   * 2. 方便 CSS 通过 html[lang="en"] 做不同语言排版适配
   * 3. 对 SEO / 可访问性也更清晰
   */
  useEffect(() => {
    document.documentElement.lang =
      currentLocale === "zh-CN" ? "zh-CN" : currentLocale; // 设置 html lang
  }, [currentLocale]); // 当前语言变化时重新执行

  /**
   * 页面滚动监听
   *
   * 作用：
   * 1. 页面顶部时 Top 栏透明
   * 2. 页面向下滚动后 Top 栏变白
   * 3. 给 html 添加 page-scrolled 类名，增强兼容性
   */
  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.scrollY || // 大多数浏览器滚动距离
        window.pageYOffset || // 老浏览器兼容写法
        document.documentElement.scrollTop || // 部分浏览器滚动距离
        document.body.scrollTop || // 兜底写法
        0; // 如果都取不到，就认为没有滚动

      const nextScrolled = scrollTop > 1; // 滚动超过 1px 就认为已经滚动

      setIsScrolled(nextScrolled); // 更新 Top 栏滚动状态

      document.documentElement.classList.toggle("page-scrolled", nextScrolled); // 给 html 添加 / 移除 page-scrolled
    }

    handleScroll(); // 页面加载后先执行一次，避免刷新时状态不对

    window.addEventListener("scroll", handleScroll, { passive: true }); // 监听滚动

    window.addEventListener("touchmove", handleScroll, { passive: true }); // 监听手机触摸滑动

    document.addEventListener("scroll", handleScroll, { passive: true }); // 兼容部分滚动容器

    return () => {
      window.removeEventListener("scroll", handleScroll); // 清理滚动监听

      window.removeEventListener("touchmove", handleScroll); // 清理触摸监听

      document.removeEventListener("scroll", handleScroll); // 清理 document 监听

      document.documentElement.classList.remove("page-scrolled"); // 组件卸载时清理类名
    };
  }, []); // 只在组件挂载时执行一次

  /**
   * PC 端鼠标进入导航项时执行
   *
   * 说明：
   * 1. 只有 PC 鼠标设备才启用 hover 下拉
   * 2. 只有 dropdownType 为 mega 的导航才打开大下拉
   * 3. 每次重新进入 mega 下拉时，默认选中第一个可用分类
   */
  function handleDesktopNavMouseEnter(item: NavigationItem) {
    if (!isPcHoverDevice()) {
      return; // 手机端不处理 PC hover 逻辑
    }

    if (item.dropdownType === "mega" && item.megaDropdown) {
      const firstCategory = item.megaDropdown.categories
        .filter((category) => category.enabled)
        .sort((a, b) => a.order - b.order)[0]; // 找到当前 mega 下拉里的第一个可用分类

      setDesktopMegaKey(item.key); // 打开当前导航对应的 mega 下拉

      setActiveMegaCategoryKey(firstCategory?.key ?? null); // 默认选中第一个分类，避免固定残留在旧分类上
    } else {
      setDesktopMegaKey(null); // 没有下拉的导航，关闭 mega 下拉

      setActiveMegaCategoryKey(null); // 同时清空 PC mega 当前分类
    }
  }

  /**
   * 鼠标离开整个 Header 时执行
   *
   * 说明：
   * 1. 关闭 PC 端 mega 下拉
   * 2. 关闭 PC 端语言下拉
   */
  function handleHeaderMouseLeave() {
    if (!isPcHoverDevice()) {
      return; // 手机端不处理鼠标离开逻辑
    }

    setDesktopMegaKey(null); // 关闭 PC mega 下拉

    setActiveMegaCategoryKey(null); // 鼠标离开 Header 后，清空 PC mega 当前分类

    setOpenPanel("none"); // 关闭语言菜单
  }

  /**
   * PC 端鼠标进入语言栏时展开
   */
  function handleLanguageMouseEnter() {
    if (isPcHoverDevice()) {
      setDesktopMegaKey(null); // 打开语言栏时，关闭 PC mega 下拉

      setActiveMegaCategoryKey(null); // 打开语言栏时，清空 PC mega 当前分类

      setOpenPanel("language"); // 打开语言菜单
    }
  }

  /**
   * PC 端鼠标离开语言栏时关闭
   */
  function handleLanguageMouseLeave() {
    if (isPcHoverDevice()) {
      setOpenPanel("none"); // 关闭语言菜单
    }
  }

  /**
   * 点击语言按钮时执行
   *
   * 说明：
   * 1. PC 端仍然支持 hover 展开语言菜单
   * 2. PC 端也允许点击展开，避免 hover 判断失效导致不能切换语言
   * 3. 手机端点击语言栏时，打开 / 关闭语言菜单
   * 4. 打开语言菜单时，同步关闭 PC mega 下拉菜单，避免两个菜单重叠
   */
  function handleLanguageButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // 阻止按钮默认行为

    setDesktopMegaKey(null); // 打开语言菜单时，先关闭 PC mega 下拉

    setActiveMegaCategoryKey(null); // 打开语言菜单时，清空 PC mega 当前分类

    setOpenPanel((currentPanel) =>
      currentPanel === "language" ? "none" : "language"
    ); // 如果语言菜单已经打开就关闭，否则打开
  }

  /**
   * 点击手机端三横菜单按钮时执行
   *
   * 说明：
   * 1. 手机导航和语言菜单互斥
   * 2. 如果手机导航已打开，再点一次就关闭
   */
  function handleMobileMenuClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // 阻止按钮默认行为

    setOpenPanel((currentPanel) =>
      currentPanel === "mobileNav" ? "none" : "mobileNav"
    ); // 手机端点击菜单按钮：已打开就关闭，未打开就打开
  }

  /**
   * 关闭所有展开面板
   *
   * 说明：
   * 1. 点击遮罩时执行
   * 2. 点击语言项时执行
   * 3. 点击手机导航项时执行
   */
  function closeAllPanels() {
    setOpenPanel("none"); // 关闭语言菜单和手机导航菜单

    setDesktopMegaKey(null); // 关闭 PC mega 下拉

    setActiveMegaCategoryKey(null); // 关闭所有面板时，同步清空 PC mega 当前分类
  }

  /**
   * 点击语言选项时执行
   *
   * 说明：
   * 1. 使用普通 a 标签 + window.location.href 强制跳转，避免 Next.js Link 在当前调试阶段出现不跳转
   * 2. 记录用户手动选择的语言，避免后续浏览器语言自动判断反复把中文跳回英文
   * 3. 中文首页路径是 /，英文首页路径是 /en，其他语言同理
   */
  function handleLanguageItemClick(
    event: MouseEvent<HTMLAnchorElement>,
    localeCode: LocaleCode,
    href: string
  ) {
    event.preventDefault(); // 阻止默认跳转，改为下面的强制跳转，行为更稳定

    localStorage.setItem(LOCALE_COOKIE_NAME, localeCode); // 记录用户手动选择的语言，刷新后仍然保留

    // eslint-disable-next-line react-hooks/immutability -- 语言切换必须在跳转前写入 Cookie，middleware 才能识别中文 "/"
    document.cookie = `${LOCALE_COOKIE_NAME}=${localeCode}; path=/; max-age=31536000; SameSite=Lax`; // 写入和 middleware 一致的 Cookie，保证中文 "/" 不会被旧语言重定向

    closeAllPanels(); // 点击语言后关闭所有展开菜单

    window.location.assign(href); // 强制跳转到目标语言首页，中文会跳到 /
  }

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
      } ${isLanguageOpen ? "language-panel-open" : ""} ${
        isMobileMenuOpen ? "mobile-nav-open" : ""
      }`} // 根据滚动、语言菜单、手机菜单、PC mega 下拉状态添加类名
      onMouseLeave={handleHeaderMouseLeave} // PC 鼠标离开整个 Header 时关闭下拉
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
            const navLabel = getLocalizedText(item.label, currentLocale); // 当前语言导航名称

            const navHref = getLocalizedHref(item.href, currentLocale); // 当前语言导航链接

            const hasMegaDropdown =
              item.dropdownType === "mega" && Boolean(item.megaDropdown); // 是否有 PC mega 下拉

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

          {/* 语言栏：PC hover 展开，手机点击展开 */}
          <div
            className={`language-switcher ${
              isLanguageOpen ? "language-switcher-open" : ""
            }`}
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            {/* 当前语言按钮 */}
            <button
              className="language-summary"
              type="button"
              aria-label={headerText.languageAriaLabel}
              aria-expanded={isLanguageOpen}
              onClick={handleLanguageButtonClick}
              title={headerText.languageSwitchTitle}
            >
              <span className="language-summary-label">
                {headerText.currentLanguageLabel}
              </span>

              <span className="language-summary-arrow" aria-hidden="true">
                ▾
              </span>
            </button>

            {/* 语言下拉菜单 */}
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
            {/* 手机端三横菜单按钮 */}
            <button
              className="mobile-menu-btn"
              type="button"
              aria-label={headerText.mobileMenuAriaLabel}
              aria-expanded={isMobileMenuOpen}
              onClick={handleMobileMenuClick}
            >
              {/* SVG 三横菜单图标
                  说明：
                  1. CSS 会控制三条线变成 X
                  2. 比直接使用文字 ☰ / × 更稳定
              */}
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

            {/* 手机端导航下拉菜单 */}
            <nav
              className="mobile-nav"
              aria-label={headerText.mobileNavAriaLabel}
            >
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale); // 当前语言一级导航名称

                const navHref = getLocalizedHref(item.href, currentLocale); // 当前语言一级导航路径

                const mobileChildren = (item.mobileChildren || [])
                  .filter((child) => child.enabled)
                  .sort((a, b) => a.order - b.order); // 获取手机端二级菜单

                const hasMobileChildren = mobileChildren.length > 0; // 是否有手机端二级菜单

                if (hasMobileChildren) {
                  return (
                    <details className="mobile-nav-section" key={item.key}>
                      <summary className="mobile-nav-summary">
                        <span>{navLabel}</span>

                        <span aria-hidden="true">▾</span>
                      </summary>

                      <div className="mobile-nav-submenu">
                        {/* 进入当前主栏目入口 */}
                        <Link
                          href={navHref}
                          className="mobile-nav-submenu-link mobile-nav-submenu-entry"
                          onClick={closeAllPanels}
                        >
                          {navLabel}
                        </Link>

                        {/* 当前主栏目下的二级入口 */}
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

      {/* PC 端 mega 下拉面板
          说明：
          1. 数据来自 data/navigation.ts
          2. 当前先用于“产品中心”
          3. 后期后端 / CMS 只要返回同样结构，组件不用大改
      */}
      {activeMegaItem?.megaDropdown && (
        <div
          className="site-nav-mega site-nav-mega-open"
          onMouseEnter={() => setDesktopMegaKey(activeMegaItem.key)}
        >
          <div className="site-nav-mega-inner">
            {/* 左侧分类区 */}
            <div className="site-nav-mega-sidebar">
              {activeMegaItem.megaDropdown.categories
                .filter((category) => category.enabled)
                .sort((a, b) => a.order - b.order)
                .map((category, index) => (
                  <div
                    key={category.key}
                    className={`site-nav-mega-category ${
                      activeMegaCategoryKey === category.key ||
                      (!activeMegaCategoryKey && index === 0)
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
              <div className="site-nav-mega-heading">
                <h3>
                  {getLocalizedText(
                    activeMegaItem.megaDropdown.heading,
                    currentLocale
                  )}
                </h3>

                <p>
                  {getLocalizedText(
                    activeMegaItem.megaDropdown.description,
                    currentLocale
                  )}
                </p>
              </div>

              {/* 产品入口卡片区 */}
              <div className="site-nav-mega-placeholder-grid">
                {activeMegaItem.megaDropdown.cards
                  .filter((card) => card.enabled)
                  .sort((a, b) => a.order - b.order)
                  .map((card) => (
                    <Link
                      key={card.key}
                      href={getLocalizedHref(card.href, currentLocale)}
                      className="site-nav-mega-placeholder"
                      onClick={closeAllPanels}
                    >
                      <span
                        className="site-nav-mega-card-icon"
                        aria-hidden="true"
                      />

                      <span className="site-nav-mega-card-title">
                        {getLocalizedText(card.title, currentLocale)}
                      </span>

                      <span className="site-nav-mega-card-label">
                        {getLocalizedText(card.description, currentLocale)}
                      </span>
                    </Link>
                  ))}
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

      {/* 手机端遮罩
          说明：
          1. 手机端打开语言菜单或导航菜单时显示
          2. 点击页面空白区域关闭所有展开面板
          3. PC 端 CSS 默认隐藏，不影响 PC 使用
      */}
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
