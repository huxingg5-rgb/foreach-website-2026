"use client"; // 声明这是客户端组件，因为这里使用了 useState、useEffect、window、document 等浏览器能力

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import { useEffect, useState, type ChangeEvent } from "react"; // 引入 React 状态、生命周期和 select 事件类型

import {
  getLocaleFromPathname, // 根据当前 URL 路径判断当前语言
  getLocaleHomePath, // 根据当前语言获取首页路径
  headerI18n, // 顶部导航多语言文案
  languageItems, // 语言下拉栏数据
} from "@/lib/i18n"; // 从统一多语言配置文件读取数据，避免文字散落在组件里

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. 中文首页路径是 /
 * 2. 英文首页路径是 /en
 * 3. 西语首页路径是 /es
 * 4. 法语首页路径是 /fr
 * 5. 韩语首页路径是 /ko
 * 6. 俄语首页路径是 /ru
 * 7. Header 所有文字统一从 lib/i18n.ts 读取
 * 8. 语言切换先使用原生 select，保证 PC 和手机端都能稳定切换
 */
export default function SiteHeader() {
  // 获取当前页面路径，例如 /、/en、/es、/fr、/ko、/ru
  const pathname = usePathname();

  // 根据当前路径判断当前语言
  const currentLocale = getLocaleFromPathname(pathname);

  // 根据当前语言读取顶部导航文案
  const headerText = headerI18n[currentLocale];

  // 页面是否已经向下滚动
  // false：Top 栏透明，显示白色 Logo
  // true：Top 栏白底，显示彩色 Logo
  const [isScrolled, setIsScrolled] = useState(false);

  // 手机端导航菜单是否展开
  // true：显示 mobile-nav
  // false：隐藏 mobile-nav
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * 判断导航是否为当前选中状态
   *
   * 说明：
   * 1. 当前产品中心、应用领域等还是首页锚点，例如 /#products
   * 2. 锚点导航暂时不做 active 高亮，避免全部都和首页一起高亮
   * 3. 当前只让“首页”在对应语言首页时高亮
   */
  function isNavActive(href: string) {
    // 如果导航链接包含 #，说明是首页内部锚点，暂时不高亮
    if (href.includes("#")) {
      return false;
    }

    // 中文首页高亮判断
    if (currentLocale === "zh-CN") {
      return href === "/" && pathname === "/";
    }

    // 其他语言首页高亮判断，例如 /en、/es、/fr、/ko、/ru
    return href === `/${currentLocale}` && pathname === `/${currentLocale}`;
  }

  /**
   * 同步 html 的 lang 属性
   *
   * 作用：
   * 1. 让浏览器知道当前页面语言
   * 2. 方便 CSS 用 html[lang="en"]、html[lang="ko"] 单独控制字体、字距、行高
   * 3. 后续 SEO / 多语言语义也更清晰
   */
  useEffect(() => {
    document.documentElement.lang = currentLocale; // 根据当前语言设置 html lang
  }, [currentLocale]);

  /**
   * 页面滚动监听
   *
   * 作用：
   * 1. 页面在顶部时，Top 栏透明
   * 2. 页面向下滚动后，Top 栏变白
   * 3. 同时给 html 添加 page-scrolled，作为移动端兼容备用
   */
  useEffect(() => {
    // 定义滚动处理函数
    function handleScroll() {
      // 获取页面滚动距离，兼容 PC 和部分手机浏览器
      const scrollTop =
        window.scrollY || // 大多数浏览器滚动距离
        window.pageYOffset || // 老浏览器兼容写法
        document.documentElement.scrollTop || // 部分移动端浏览器兼容写法
        document.body.scrollTop || // 兜底写法
        0; // 如果都取不到，则认为没有滚动

      // 只要滚动超过 1px，就认为已经滚动
      const nextScrolled = scrollTop > 1;

      // 更新 React 状态，用于控制 site-header-scrolled 类名
      setIsScrolled(nextScrolled);

      // 给 html 添加 / 移除备用滚动类名
      document.documentElement.classList.toggle("page-scrolled", nextScrolled);
    }

    // 页面加载时先执行一次，避免刷新后状态不对
    handleScroll();

    // 监听页面滚动
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 监听手机触摸滑动，增强移动端兼容
    window.addEventListener("touchmove", handleScroll, { passive: true });

    // 监听 document 滚动，兼容部分浏览器
    document.addEventListener("scroll", handleScroll, { passive: true });

    // 组件卸载时清理监听，避免内存泄漏
    return () => {
      window.removeEventListener("scroll", handleScroll); // 移除 window scroll 监听
      window.removeEventListener("touchmove", handleScroll); // 移除 touchmove 监听
      document.removeEventListener("scroll", handleScroll); // 移除 document scroll 监听
      document.documentElement.classList.remove("page-scrolled"); // 清理 html 上的备用类名
    };
  }, []);

  /**
   * 语言选择事件
   *
   * 说明：
   * 1. 当前语言栏先使用原生 select，保证切换稳定
   * 2. 用户选择语言后，直接跳转到对应语言首页
   * 3. 例如 English 跳转 /en，Français 跳转 /fr
   */
  function handleLanguageSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    // 获取用户选择的语言路径
    const nextHref = event.target.value;

    // 如果没有路径，就不处理
    if (!nextHref) {
      return;
    }

    // 跳转到对应语言页面
    window.location.href = nextHref;
  }

  /**
   * 点击手机菜单按钮时执行
   *
   * 说明：
   * 1. 手机端点击按钮后展开 / 关闭导航菜单
   * 2. 展开时 header 会获得 mobile-nav-open 类名
   */
  function handleMobileMenuClick() {
    setIsMobileMenuOpen((prev) => !prev); // 切换手机端菜单状态
  }

  /**
   * 点击手机端导航链接后执行
   *
   * 说明：
   * 1. 避免点击导航后菜单还一直展开
   */
  function closeMobileMenu() {
    setIsMobileMenuOpen(false); // 关闭手机端导航菜单
  }

  // 返回顶部导航栏结构
  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        isMobileMenuOpen ? "mobile-nav-open" : ""
      }`}
    >
      {/* Top 栏内部容器 */}
      <div className="site-header-inner">
        {/* Logo 区域 */}
        <Link
          className="site-logo"
          href={getLocaleHomePath(currentLocale)}
          aria-label={headerText.logoAriaLabel}
        >
          {/* 白色 Logo：透明 Top 栏状态下显示 */}
          <img
            className="site-logo-white"
            src="/images/logo/foreach-logo-color.svg"
            alt=""
            aria-hidden="true"
          />

          {/* 彩色 Logo：滚动后或鼠标放到 Top 栏时显示 */}
          <img
            className="site-logo-color"
            src="/images/logo/foreach-logo-color.svg"
            alt="FOREACH"
          />
        </Link>

        {/* 桌面端主导航 */}
        <nav className="site-nav" aria-label={headerText.navAriaLabel}>
          {headerText.navItems.map((item) => (
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

        {/* 右侧工具区：搜索栏、语言栏、手机菜单按钮 */}
        <div className="site-header-actions">
          {/* 搜索栏 */}
          <form
            className="site-search-form"
            action={
              currentLocale === "zh-CN"
                ? "/search"
                : `/${currentLocale}/search`
            }
            method="get"
          >
            {/* 搜索输入框 */}
            <input
              className="site-search-input"
              type="search"
              name="q"
              placeholder={headerText.searchPlaceholder}
              aria-label={headerText.searchAriaLabel}
            />

            {/* 搜索按钮 */}
            <button
              className="site-search-submit"
              type="submit"
              aria-label={headerText.searchButtonAriaLabel}
            >
              <span className="site-search-icon" aria-hidden="true" />
            </button>
          </form>

          {/* 语言切换区域：使用原生 select，保证多语言切换稳定 */}
          <div className="language-switcher">
            <select
              className="language-select"
              aria-label={headerText.languageAriaLabel}
              value={getLocaleHomePath(currentLocale)}
              onChange={handleLanguageSelectChange}
            >
              {languageItems.map((item) => (
                <option key={item.code} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* 手机端菜单按钮 */}
          <button
            className="mobile-menu-btn"
            type="button"
            aria-label={headerText.mobileMenuAriaLabel}
            aria-expanded={isMobileMenuOpen}
            onClick={handleMobileMenuClick}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* 手机端导航菜单 */}
      <nav className="mobile-nav" aria-label={headerText.mobileNavAriaLabel}>
        {headerText.navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ${
              isNavActive(item.href) ? "mobile-nav-link-active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}