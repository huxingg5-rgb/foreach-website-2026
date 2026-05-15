"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window、document 等浏览器能力

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内页面跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import { useEffect, useState, type MouseEvent } from "react"; // 引入 React 状态、生命周期和鼠标事件类型

import {
  getLocaleFromPathname, // 根据当前 URL 路径判断当前语言，例如 /en 返回 en
  getLocaleHomePath, // 根据当前语言获取对应首页路径，例如 en 返回 /en
  headerI18n, // 顶部导航多语言文案
  languageItems, // 语言切换列表数据
} from "@/lib/i18n"; // 从统一多语言配置文件读取内容

// 顶部栏可展开面板类型
// none：没有任何展开内容
// language：语言下拉菜单展开
// mobileNav：手机端导航下拉菜单展开
type OpenPanel = "none" | "language" | "mobileNav";

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. PC 端显示：Logo + 导航 + 搜索栏 + 语言栏
 * 2. 手机端显示：Logo + 语言栏 + 三横菜单
 * 3. 语言栏和手机导航栏都采用“按钮 + 下拉菜单”的同一套逻辑
 * 4. PC 端语言栏：鼠标放上去展开，鼠标移出收起
 * 5. 手机端语言栏：点击展开，再点收起
 * 6. 手机端导航栏：点击三横菜单展开，再点收起
 * 7. 点击页面空白遮罩：关闭语言栏和手机导航栏
 */
export default function SiteHeader() {
  const pathname = usePathname(); // 获取当前页面路径，例如 /、/en、/es、/fr、/ko、/ru

  const currentLocale = getLocaleFromPathname(pathname); // 根据当前路径判断当前语言

  const headerText = headerI18n[currentLocale]; // 根据当前语言读取 Header 文案

  const [isScrolled, setIsScrolled] = useState(false); // 控制 Top 栏是否进入滚动后的白底状态

  const [openPanel, setOpenPanel] = useState<OpenPanel>("none"); // 统一控制当前展开的是语言栏、手机导航栏，还是都不展开

  const isLanguageOpen = openPanel === "language"; // 判断当前语言栏是否展开

  const isMobileMenuOpen = openPanel === "mobileNav"; // 判断当前手机导航栏是否展开

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
      return false; // 如果不是浏览器环境，直接返回 false
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches; // 判断设备是否支持鼠标 hover

    const isWideScreen = window.innerWidth > 1000; // 判断当前屏幕是否大于移动端断点

    return canHover && isWideScreen; // 同时满足 hover 和宽屏，才认为是 PC 端
  }

  /**
   * 判断导航是否为当前选中状态
   *
   * 说明：
   * 1. 当前只让首页高亮
   * 2. 产品中心、应用领域等还是锚点链接，暂时不高亮
   */
  function isNavActive(href: string) {
    if (href.includes("#")) {
      return false; // 如果是锚点链接，例如 /#products，就不做高亮
    }

    if (currentLocale === "zh-CN") {
      return href === "/" && pathname === "/"; // 中文首页路径为 /
    }

    return href === `/${currentLocale}` && pathname === `/${currentLocale}`; // 其他语言首页路径为 /en、/es、/fr、/ko、/ru
  }

  /**
   * 同步 html 的 lang 属性
   *
   * 作用：
   * 1. 让浏览器知道当前页面语言
   * 2. 让 CSS 可以通过 html[lang="en"] 单独控制英文排版
   * 3. 后续 SEO / 多语言语义也更清晰
   */
  useEffect(() => {
    document.documentElement.lang = currentLocale; // 设置 html lang，例如 zh-CN、en、ru
  }, [currentLocale]); // currentLocale 改变时重新执行

  /**
   * 页面滚动监听
   *
   * 作用：
   * 1. 页面顶部时，Top 栏透明
   * 2. 页面向下滚动后，Top 栏变白
   * 3. 同时给 html 添加 page-scrolled 作为兼容类名
   */
  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.scrollY || // 大多数浏览器滚动距离
        window.pageYOffset || // 老浏览器兼容写法
        document.documentElement.scrollTop || // 部分浏览器滚动距离
        document.body.scrollTop || // 兜底写法
        0; // 如果都取不到，则认为没有滚动

      const nextScrolled = scrollTop > 1; // 滚动超过 1px 就认为已经滚动

      setIsScrolled(nextScrolled); // 更新 Top 栏滚动状态

      document.documentElement.classList.toggle("page-scrolled", nextScrolled); // 给 html 添加或移除 page-scrolled
    }

    handleScroll(); // 页面加载时先执行一次，避免刷新后状态不对

    window.addEventListener("scroll", handleScroll, { passive: true }); // 监听窗口滚动

    window.addEventListener("touchmove", handleScroll, { passive: true }); // 监听手机触摸滑动

    document.addEventListener("scroll", handleScroll, { passive: true }); // 监听 document 滚动，增强兼容性

    return () => {
      window.removeEventListener("scroll", handleScroll); // 清理窗口滚动监听

      window.removeEventListener("touchmove", handleScroll); // 清理手机触摸监听

      document.removeEventListener("scroll", handleScroll); // 清理 document 滚动监听

      document.documentElement.classList.remove("page-scrolled"); // 组件卸载时移除备用类名
    };
  }, []); // 只在组件挂载时执行一次

  /**
   * PC 端鼠标进入语言栏时展开
   */
  function handleLanguageMouseEnter() {
    if (isPcHoverDevice()) {
      setOpenPanel("language"); // PC 鼠标移入语言栏时，只打开语言菜单
    }
  }

  /**
   * PC 端鼠标离开语言栏时关闭
   */
  function handleLanguageMouseLeave() {
    if (isPcHoverDevice()) {
      setOpenPanel("none"); // PC 鼠标移出语言栏时，关闭所有展开面板
    }
  }

  /**
   * 点击语言按钮时执行
   *
   * 说明：
   * 1. PC 端不靠点击展开，只靠鼠标 hover
   * 2. 手机端点击语言栏时，会关闭导航菜单，只打开语言菜单
   */
  function handleLanguageButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // 阻止按钮默认行为

    if (isPcHoverDevice()) {
      return; // PC 端点击不处理，只使用 hover
    }

    setOpenPanel((currentPanel) =>
      currentPanel === "language" ? "none" : "language"
    ); // 手机端点击语言栏：如果已打开就关闭，否则打开语言栏
  }

  /**
   * 点击手机菜单按钮时执行
   *
   * 说明：
   * 1. 如果当前手机导航已打开，再点一次就关闭
   * 2. 如果当前语言栏打开，点菜单按钮会自动关闭语言栏并打开导航
   */
  function handleMobileMenuClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // 阻止按钮默认行为

    setOpenPanel((currentPanel) =>
      currentPanel === "mobileNav" ? "none" : "mobileNav"
    ); // 手机导航和语言栏互斥，只允许打开一个
  }

  /**
   * 关闭所有展开面板
   *
   * 说明：
   * 1. 点击空白遮罩时执行
   * 2. 点击手机端导航链接时执行
   * 3. 点击语言选项时执行
   */
  function closeAllPanels() {
    setOpenPanel("none"); // 关闭语言栏和手机导航菜单
  }

  /**
   * 点击顶部展开面板外部时自动关闭
   */
  useEffect(() => {
    if (openPanel === "none") {
      return;
    }

    function handleOutsidePress(event: Event) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(".mobile-nav-switcher, .language-switcher")) {
        return;
      }

      closeAllPanels();
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAllPanels();
      }
    }

    document.addEventListener("pointerdown", handleOutsidePress);
    document.addEventListener("touchstart", handleOutsidePress, {
      passive: true,
    });
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
      document.removeEventListener("touchstart", handleOutsidePress);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openPanel]);

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        openPanel !== "none" ? "header-panel-open" : ""
      } ${isLanguageOpen ? "language-panel-open" : ""} ${
        isMobileMenuOpen ? "mobile-nav-open" : ""
      }`} // 根据滚动状态、语言栏状态、手机导航状态添加类名
    >
      {/* Top 栏内部容器 */}
      <div className="site-header-inner">
        {/* Logo 区域 */}
        <Link
          className="site-logo" // Logo 链接样式
          href={getLocaleHomePath(currentLocale)} // 当前语言首页路径
          aria-label={headerText.logoAriaLabel} // Logo 无障碍说明
        >
          {/* 白色 Logo：透明 Top 栏状态下显示 */}
          <img
            className="site-logo-white" // 白色 Logo 图层
            src="/images/logo/foreach-logo-color.svg" // 使用官方彩色 Logo，通过 CSS filter 转白
            alt="" // 装饰图，不读给屏幕阅读器
            aria-hidden="true" // 隐藏给辅助设备
          />

          {/* 彩色 Logo：滚动后、鼠标放到 Top 栏、菜单展开时显示 */}
          <img
            className="site-logo-color" // 彩色 Logo 图层
            src="/images/logo/foreach-logo-color.svg" // 官方彩色 Logo
            alt="FOREACH" // Logo 图片说明
          />
        </Link>

        {/* 桌面端主导航 */}
        <nav className="site-nav" aria-label={headerText.navAriaLabel}>
          {headerText.navItems.map((item) => (
            <Link
              key={item.href} // React 列表唯一标识
              href={item.href} // 导航链接地址
              className={`site-nav-link ${
                isNavActive(item.href) ? "site-nav-link-active" : ""
              }`} // 当前页面高亮
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 右侧工具区：搜索栏、语言栏、手机导航栏 */}
        <div className="site-header-actions">
          {/* 搜索栏：手机端会通过 CSS 隐藏 */}
          <form
            className="site-search-form" // 搜索栏样式
            action={
              currentLocale === "zh-CN"
                ? "/search" // 中文搜索页
                : `/${currentLocale}/search` // 其他语言搜索页预留
            }
            method="get" // 使用 GET 方式提交搜索关键词
          >
            <input
              className="site-search-input" // 搜索输入框样式
              type="search" // 搜索输入类型
              name="q" // 查询参数名，例如 /search?q=泵
              placeholder={headerText.searchPlaceholder} // 多语言占位文字
              aria-label={headerText.searchAriaLabel} // 搜索框无障碍说明
            />

            <button
              className="site-search-submit" // 搜索按钮样式
              type="submit" // 点击后提交表单
              aria-label={headerText.searchButtonAriaLabel} // 搜索按钮无障碍说明
            >
              <span className="site-search-icon" aria-hidden="true" />
            </button>
          </form>

          {/* 外置语言栏：PC 鼠标悬停展开，手机点击展开 */}
          <div
            className={`language-switcher ${
              isLanguageOpen ? "language-switcher-open" : ""
            }`} // 展开时添加 language-switcher-open
            onMouseEnter={handleLanguageMouseEnter} // PC 鼠标移入展开
            onMouseLeave={handleLanguageMouseLeave} // PC 鼠标移出收起
          >
            {/* 当前语言按钮 */}
            <button
              className="language-summary" // 当前语言按钮样式
              type="button" // 普通按钮，不提交表单
              aria-label={headerText.languageAriaLabel} // 语言按钮无障碍说明
              aria-expanded={isLanguageOpen} // 告诉浏览器当前语言栏是否展开
              onClick={handleLanguageButtonClick} // 手机点击展开 / 收起
            >
              <span className="language-summary-label">
                {headerText.currentLanguageLabel}
              </span>

              <span className="language-summary-arrow">▾</span>
            </button>

            {/* 语言下拉菜单 */}
            <div className="language-details-menu">
              {languageItems.map((item) => (
                <Link
                  key={item.code} // React 列表唯一标识
                  href={item.href} // 语言首页路径
                  className={`language-details-item ${
                    item.code === currentLocale
                      ? "language-details-item-active"
                      : ""
                  }`} // 当前语言高亮
                  onClick={closeAllPanels} // 点击语言后关闭所有展开面板
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 手机端导航栏：和语言栏一样，也是按钮 + 下拉菜单 */}
          <div
            className={`mobile-nav-switcher ${
              isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
            }`} // 展开时添加 mobile-nav-switcher-open
          >
            {/* 手机端三横菜单按钮 */}
            <button
              className="mobile-menu-btn" // 手机端三横菜单按钮样式
              type="button" // 普通按钮，不提交表单
              aria-label={headerText.mobileMenuAriaLabel} // 菜单按钮无障碍说明
              aria-expanded={isMobileMenuOpen} // 当前菜单是否展开
              onClick={handleMobileMenuClick} // 点击后展开 / 关闭手机导航菜单
            >
              <svg
                className="mobile-menu-icon"
                viewBox="0 0 1228 1024"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="mobile-menu-line mobile-menu-line-top"
                  d="M92.7744 127.3856h1041.6128c28.0576 0 55.9104-20.8896 55.9104-55.9104S1162.24 22.528 1127.424 22.528H92.7744C57.7536 22.528 36.864 50.3808 36.864 78.4384c0 27.8528 20.8896 48.9472 55.9104 48.9472z"
                  fill="currentColor"
                />
                <path
                  className="mobile-menu-line mobile-menu-line-middle"
                  d="M1127.424 455.8848H92.7744c-28.0576 0-55.9104 20.8896-55.9104 55.9104s20.8896 55.9104 55.9104 55.9104h1041.6128c28.0576 0 55.9104-20.8896 55.9104-55.9104s-28.0576-55.9104-62.8736-55.9104z"
                  fill="currentColor"
                />
                <path
                  className="mobile-menu-line mobile-menu-line-bottom"
                  d="M1127.424 896.2048H92.7744c-28.0576 0-55.9104 20.8896-55.9104 55.9104s20.8896 48.9472 55.9104 48.9472h1041.6128c28.0576 0 55.9104-20.8896 55.9104-55.9104s-28.0576-48.9472-62.8736-48.9472z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* 手机端导航下拉菜单 */}
            <nav
              className="mobile-nav" // 手机端导航菜单样式
              aria-label={headerText.mobileNavAriaLabel} // 手机端导航无障碍说明
            >
              {headerText.navItems.map((item) => (
                <Link
                  key={item.href} // React 列表唯一标识
                  href={item.href} // 手机端导航链接
                  className={`mobile-nav-link ${
                    isNavActive(item.href) ? "mobile-nav-link-active" : ""
                  }`} // 当前页面高亮
                  onClick={closeAllPanels} // 点击导航后关闭所有展开面板
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 手机端外部点击遮罩 */}
      {openPanel !== "none" && (
        <button
          className="mobile-nav-backdrop" // 透明遮罩样式
          type="button" // 普通按钮
          aria-label="关闭顶部展开菜单" // 无障碍说明
          onPointerDown={closeAllPanels} // 手指按下遮罩时立即关闭
          onTouchStart={closeAllPanels} // 兼容部分移动端触摸环境
          onClick={closeAllPanels} // 点击空白区域后关闭语言栏和手机导航
        />
      )}
    </header>
  );
}
