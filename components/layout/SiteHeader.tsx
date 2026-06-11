"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window 等浏览器能力

import Image from "next/image"; // 引入 Next.js 图片组件，用于导航栏产品图片展示
import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react"; // 引入 React 状态、生命周期、缓存、Ref 和事件类型

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
   2. 英文使用 /en
   3. 西班牙语使用 /es
   4. 法语使用 /fr
   5. 韩语使用 /ko
   6. 俄语使用 /ru
   7. 这里不要直接拿 localeCode 拼 URL，避免以后语言代码变化导致路径错误
================================ */
const LOCALE_PATH_PREFIXES = ["en", "es", "fr", "ko", "ru"] as const;

type LocalePathPrefix = (typeof LOCALE_PATH_PREFIXES)[number];

/* ================================
   判断某个字符串是否是官网语言前缀
   例子：
   en → true
   zh-CN → false，因为中文不放在 URL 前缀里
   products → false
================================ */
function isLocalePathPrefix(value: string): value is LocalePathPrefix {
  return LOCALE_PATH_PREFIXES.includes(value as LocalePathPrefix);
}

/* ================================
   清理路径格式
   作用：
   1. 只保留 pathname，不处理 query 和 hash
   2. 确保路径始终以 / 开头
   3. 避免出现空路径
================================ */
function normalizePathname(pathname: string) {
  const pathOnly = pathname.split("?")[0]?.split("#")[0] || "/";

  if (!pathOnly.startsWith("/")) {
    return `/${pathOnly}`;
  }

  return pathOnly || "/";
}

/* ================================
   去掉路径中的语言前缀
   例子：
   /en/resources/datasheets → /resources/datasheets
   /es/about/history → /about/history
   /fr → /
   /about/history → /about/history
================================ */
function stripLocalePrefixFromPath(pathname: string) {
  const pathOnly = normalizePathname(pathname);

  const pathParts = pathOnly.split("/").filter(Boolean);

  const firstPart = pathParts[0];

  if (firstPart && isLocalePathPrefix(firstPart)) {
    const restPath = pathParts.slice(1).join("/");

    return restPath ? `/${restPath}` : "/";
  }

  return pathOnly;
}

/* ================================
   根据语言代码获取 URL 前缀
   说明：
   1. 中文返回空字符串，因为中文路径不加 /zh-CN
   2. 外语返回对应前缀
================================ */
function getLocalePathPrefix(localeCode: LocaleCode) {
  switch (localeCode) {
    case "zh-CN":
      return "";

    case "en":
      return "/en";

    case "es":
      return "/es";

    case "fr":
      return "/fr";

    case "ko":
      return "/ko";

    case "ru":
      return "/ru";

    default:
      return "";
  }
}

/* ================================
   根据目标语言生成新路径
   例子：
   当前 /resources/datasheets，切英文 → /en/resources/datasheets
   当前 /en/resources/datasheets，切法文 → /fr/resources/datasheets
   当前 /fr/resources/datasheets，切中文 → /resources/datasheets
   当前 /en，切中文 → /
================================ */
function buildLocalizedPathname(pathname: string, localeCode: LocaleCode) {
  const pathWithoutLocale = stripLocalePrefixFromPath(pathname);

  const localePrefix = getLocalePathPrefix(localeCode);

  if (!localePrefix) {
    return pathWithoutLocale;
  }

  return pathWithoutLocale === "/"
    ? localePrefix
    : `${localePrefix}${pathWithoutLocale}`;
}

/**
 * SiteHeader
 * 全站顶部导航栏组件
 *
 * 说明：
 * 1. PC 端显示 Logo、主导航、搜索图标、语言栏
 * 2. PC 端产品中心 / 关于我们等支持 Mega 大下拉菜单
 * 3. 资源中心 / 联系与合作等支持 simple 简单下拉菜单
 * 4. 左侧分类和右侧内容卡片通过 categoryKey 对应
 * 5. 多语言切换时，会尽量保留当前页面路径
 * 6. 接头型号替代详情页已经去掉 Banner，所以需要一进入页面就使用白底 Header
 */
export default function SiteHeader() {
  const pathname = usePathname(); // 获取当前页面路径，例如 /、/about/culture、/en/resources/datasheets 等

  /**
   * 当前顶部栏显示语言
   *
   * 说明：
   * 1. 直接根据当前 URL 路径同步计算语言
   * 2. 不再用 useState + useEffect 二次切换语言
   * 3. 避免非中文页面加载时 Top 栏先按默认语言渲染，再切换成目标语言导致跳动
   */
  const currentLocale = useMemo<LocaleCode>(() => {
    return getLocaleFromPathname(pathname);
  }, [pathname]);

  /* ================================
     Header 当前语言 class
     说明：
     1. 不依赖 html[lang]
     2. 直接根据当前 URL 语言给 Header 加 class
     3. 方便 CSS 精准控制 Top 栏多语言字距
  ================================ */
  const headerLocaleClass =
    currentLocale === "zh-CN"
      ? "site-header-locale-zh"
      : `site-header-locale-${currentLocale}`;

  const headerText = headerI18n[currentLocale]; // 获取当前语言下的 Header 文案

  /* ================================
     当前路径去掉语言前缀

     说明：
     1. 中文：/resources/xxx
     2. 英文：/en/resources/xxx → /resources/xxx
     3. 用于判断当前页面是否属于某个业务页面
  ================================ */
  const currentPathWithoutLocale = useMemo(() => {
    return stripLocalePrefixFromPath(pathname);
  }, [pathname]);

  /* ================================
     当前路径规范化 
  
     说明：
     1. 解决 /resources/news 和 /resources/news/ 被当成不同路径的问题
     2. 除首页 / 之外，统一去掉末尾斜杠
     3. 后续页面类型判断优先使用 normalizedPathWithoutLocale
  ================================ */
  const normalizedPathWithoutLocale = useMemo(() => {
    if (currentPathWithoutLocale === "/") {
      return "/";
    }

    return currentPathWithoutLocale.replace(/\/+$/, "");
  }, [currentPathWithoutLocale]);

  /* ================================
     接头型号替代详情页判断

     说明：
     1. 这个页面已经去掉 Banner
     2. 页面一进入就是白底内容
     3. Header 不能再用透明状态
     4. 所以这个页面需要强制使用白底 Header
  ================================ */
const isFittingReplacementDetailPage =
  normalizedPathWithoutLocale.startsWith(
    "/resources/selection-support/fitting-replacement/q20/",
  ); 

  const navigationItems = useMemo(
    () => getVisibleNavigationItems(currentLocale),
    [currentLocale],
  ); // 根据当前语言获取可显示导航，并缓存结果

  const [isScrolled, setIsScrolled] = useState(false); // 控制 Top 栏是否进入滚动后的白底状态

  const [openPanel, setOpenPanel] = useState<OpenPanel>("none"); // 控制语言菜单 / 手机导航菜单哪个正在展开

  const [desktopMegaKey, setDesktopMegaKey] = useState<NavigationKey | null>(
    null,
  ); // 控制 PC 端当前打开哪个 mega / simple 下拉菜单

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

  /* ================================
     PC 端搜索模式
     说明：
     1. 默认只显示一个搜索图标按钮，避免搜索框长期占用导航宽度
     2. 点击搜索图标后，中间导航区域切换成搜索输入框
     3. 点击搜索框以外区域、点击关闭按钮或按 ESC，会退出搜索模式
  ================================ */
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 搜索模式表单区域，用于判断点击是否发生在搜索框内部
  const searchModeRef = useRef<HTMLFormElement | null>(null);

  // 搜索图标按钮，用于避免点击按钮时被判断成外部点击
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);

  // 搜索输入框，用于打开搜索模式后自动聚焦
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isLanguageOpen = openPanel === "language"; // 判断语言菜单是否展开

  const isMobileMenuOpen = openPanel === "mobileNav"; // 判断手机端导航是否展开

  /* ================================
     Header 最终白底状态

     说明：
     1. 普通页面：滚动后才变白
     2. 接头详情页：页面一进入就白底
     3. 下拉菜单 / 搜索展开时也保持白底
  ================================ */
  /* ================================
     新闻详情页判断
  
  /* ================================
   新闻详情页判断

   说明：
   1. /resources/news 和 /resources/news/ 都是新闻首页
   2. /resources/news/[slug] 才是新闻详情页
   3. 多语言路径已经通过 stripLocalePrefixFromPath 去掉语言前缀
   4. 用 path segment 判断，避免新闻首页被误判
================================ */
const newsPathSegments = normalizedPathWithoutLocale
  .split("/")
  .filter(Boolean);

const isNewsArticlePage =
  newsPathSegments.length >= 3 &&
  newsPathSegments[0] === "resources" &&
  newsPathSegments[1] === "news" &&
  Boolean(newsPathSegments[2]);

  const shouldUseSolidHeader =
    isScrolled ||
    isFittingReplacementDetailPage ||
    isNewsArticlePage ||
    openPanel !== "none" ||
    Boolean(desktopMegaKey) ||
    isSearchOpen;

  const activeMegaItem = navigationItems.find(
    (item) =>
      item.key === desktopMegaKey &&
      item.dropdownType === "mega" &&
      item.megaDropdown,
  ); // 找到当前 PC 端正在展开的 Mega 菜单数据

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
   * 说明：
   * 1. 所有页面都会先去掉语言前缀再比较
   * 2. /en/about/history 会识别为 /about/history
   * 3. About / Products / Applications 等栏目都能正常高亮
   */
  function isNavActive(item: NavigationItem) {
    const itemHref = getLocalizedHref(item.href, currentLocale);

    const itemPathWithoutLocale = stripLocalePrefixFromPath(itemHref);

    const normalizedItemPathWithoutLocale =
      itemPathWithoutLocale !== "/"
        ? itemPathWithoutLocale.replace(/\/+$/, "")
        : itemPathWithoutLocale;

    if (item.key === "home") {
      return normalizedPathWithoutLocale === "/";
    }

    if (
      !normalizedItemPathWithoutLocale ||
      normalizedItemPathWithoutLocale === "/"
    ) {
      return false;
    }

    return (
      normalizedPathWithoutLocale === normalizedItemPathWithoutLocale ||
      normalizedPathWithoutLocale.startsWith(
        `${normalizedItemPathWithoutLocale}/`,
      )
    );
}
    /**
     * 页面滚动监听
     *
     * 作用：
     * 1. 普通页面顶部时 Top 栏透明
     * 2. 普通页面向下滚动后 Top 栏变白
     * 3. 详情页即使在顶部，也会通过 shouldUseSolidHeader 保持白底
     * 4. 给 html 添加 page-scrolled 类名
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

    /* ================================
       搜索模式关闭逻辑
  
       说明：
       1. 点击搜索框内部，不关闭搜索模式
       2. 点击搜索图标按钮，不关闭搜索模式
       3. 点击页面其他区域，关闭搜索模式
       4. 按 ESC，关闭搜索模式
    ================================ */
    useEffect(() => {
      if (!isSearchOpen) {
        return;
      }

      function handleDocumentMouseDown(event: globalThis.MouseEvent) {
        const target = event.target as Node | null;

        if (!target) {
          return;
        }

        const clickedInsideSearchMode = searchModeRef.current?.contains(target);

        const clickedSearchTrigger = searchTriggerRef.current?.contains(target);

        if (clickedInsideSearchMode || clickedSearchTrigger) {
          return;
        }

        setIsSearchOpen(false);
      }

      function handleDocumentKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setIsSearchOpen(false);

          searchInputRef.current?.blur();
        }
      }

      document.addEventListener("mousedown", handleDocumentMouseDown);
      document.addEventListener("keydown", handleDocumentKeyDown);

      return () => {
        document.removeEventListener("mousedown", handleDocumentMouseDown);
        document.removeEventListener("keydown", handleDocumentKeyDown);
      };
    }, [isSearchOpen]);

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
           用于资源中心、外语版 Contact & Partnership 等简单入口
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
        setIsSearchOpen(false);

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

      setIsSearchOpen(false);

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

      setIsSearchOpen(false);

      setOpenPanel((currentPanel) =>
        currentPanel === "mobileNav" ? "none" : "mobileNav",
      );
    }

    /**
     * 关闭所有顶部展开内容
     */
    function closeAllPanels() {
      setOpenPanel("none");

      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);

      setIsSearchOpen(false);

      // 关闭手机端已展开的折叠菜单
      setOpenMobileSectionKey(null);
    }

    /**
     * 点击 PC 端搜索图标按钮时执行
     *
     * 说明：
     * 1. 打开搜索模式时，关闭 Mega Menu 和语言菜单
     * 2. 再次点击搜索图标，可以退出搜索模式
     * 3. 打开后自动聚焦输入框
     */
    function handleSearchButtonClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();

      event.stopPropagation();

      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);

      setOpenPanel("none");

      setIsSearchOpen((currentValue) => {
        const nextValue = !currentValue;

        if (nextValue) {
          window.setTimeout(() => {
            searchInputRef.current?.focus();
          }, 80);
        } else {
          searchInputRef.current?.blur();
        }

        return nextValue;
      });
    }

    /**
     * 点击语言选项时执行
     *
     * 说明：
     * 1. 写入 localStorage，方便前端组件读取语言偏好
     * 2. 写入 Cookie，方便 proxy.ts / 服务端读取语言偏好
     * 3. 根据当前路径切换语言前缀
     * 4. 不再使用 ?lang=en 这种方式
     * 5. 当前页面路径会尽量保留，例如：
     *    /resources/datasheets → /en/resources/datasheets
     *    /en/resources/datasheets → /fr/resources/datasheets
     *    /fr/resources/datasheets → /resources/datasheets
     */
    function handleLanguageItemClick(
      event: MouseEvent<HTMLAnchorElement>,
      localeCode: LocaleCode,
      _homeHref: string,
    ) {
      event.preventDefault();

      // 保存语言偏好到浏览器本地
      localStorage.setItem(LOCALE_COOKIE_NAME, localeCode);
      localStorage.setItem("NEXT_LOCALE", localeCode);
      localStorage.setItem("lang", localeCode);

      // 保存语言偏好到 Cookie
      // 说明：这里必须和 proxy.ts 里面读取的 Cookie 名称保持一致
      // eslint-disable-next-line react-hooks/immutability -- 语言切换必须在跳转前写入 Cookie
      document.cookie = `${LOCALE_COOKIE_NAME}=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

      // eslint-disable-next-line react-hooks/immutability -- 兼容 Next.js 常见语言 Cookie 名称
      document.cookie = `NEXT_LOCALE=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

      // eslint-disable-next-line react-hooks/immutability -- 兼容旧页面可能读取的 lang Cookie
      document.cookie = `lang=${localeCode}; path=/; max-age=31536000; SameSite=Lax`;

      // 同步修改 html lang，避免部分浏览器辅助能力读取旧语言
      document.documentElement.setAttribute("lang", localeCode);

      // 关闭顶部所有展开面板
      closeAllPanels();

      // 根据当前路径生成目标语言路径
      const nextPathname = buildLocalizedPathname(
        window.location.pathname,
        localeCode,
      );

      // 保留原来的查询参数，但删除旧的 lang / locale 参数
      const nextSearchParams = new URLSearchParams(window.location.search);

      nextSearchParams.delete("lang");
      nextSearchParams.delete("locale");

      const nextSearch = nextSearchParams.toString();

      const nextUrl = `${nextPathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash
        }`;

      // 使用 assign 跳转，让浏览器真正进入新语言路径
      window.location.assign(nextUrl);
    }

    return (
      <header
        className={`site-header ${headerLocaleClass} ${shouldUseSolidHeader ? "site-header-scrolled" : ""
          } ${isFittingReplacementDetailPage || isNewsArticlePage
            ? "site-header-solid-page"
            : ""
          } ${openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
          } ${isLanguageOpen ? "language-panel-open" : ""} ${isMobileMenuOpen ? "mobile-nav-open" : ""
          } ${isSearchOpen ? "site-header-search-open" : ""}`}
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

          {/* PC 端中间区域：默认显示导航，搜索模式下切换为搜索框 */}
          <div className="site-header-center">
            {/* PC 端主导航 */}
            <nav className="site-nav" aria-label={headerText.navAriaLabel}>
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

                // 判断是否是产品中心 / 关于我们这种复杂 Mega 下拉
                const hasMegaDropdown =
                  item.dropdownType === "mega" && Boolean(item.megaDropdown);

                // 判断是否是资源中心 / 联系与合作这种简单下拉
                const hasSimpleDropdown =
                  item.dropdownType === "simple" &&
                  Boolean(item.mobileChildren?.length);

                // simple 下拉栏的数据
                const simpleChildren =
                  item.mobileChildren
                    ?.filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order) ?? [];

                // 当前 simple 下拉是否打开
                const isSimpleDropdownOpen =
                  desktopMegaKey === item.key && hasSimpleDropdown;

                return (
                  <div
                    key={item.key}
                    className={`site-nav-item ${hasMegaDropdown || hasSimpleDropdown
                      ? "site-nav-item-has-dropdown"
                      : ""
                      } ${hasSimpleDropdown
                        ? "site-nav-item-has-simple-dropdown"
                        : ""
                      } ${isSimpleDropdownOpen ? "site-nav-item-simple-open" : ""
                      }`}
                    onMouseEnter={() => {
                      handleDesktopNavMouseEnter(item);
                    }}
                    onMouseLeave={() => {
                      /*
                         重点：
                         1. 只要鼠标离开当前 simple 菜单区域，就关闭 simple 下拉栏
                         2. 这样 Resources 和 Contact & Partnership 不会同时保持打开
                         3. 产品中心 / 关于我们 Mega Menu 不在这里处理
                      */
                      if (hasSimpleDropdown) {
                        setDesktopMegaKey(null);
                        setActiveMegaCategoryKey(null);
                      }
                    }}
                  >
                    <Link
                      href={navHref}
                      className={`site-nav-link ${isNavActive(item) ? "site-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>

                    {/* ================================
                      PC 端 simple 简单下拉栏

                      说明：
                      1. 只在当前 simple 菜单打开时渲染
                      2. 不打开时页面里没有这个下拉 DOM
                      3. 这样可以彻底避免两个下拉栏同时显示
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
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

            {/* PC 端搜索模式：点击右侧搜索图标后显示 */}
            <form
              ref={searchModeRef}
              className="site-search-mode-form"
              action={
                currentLocale === "zh-CN"
                  ? "/search"
                  : `/${currentLocale}/search`
              }
              method="get"
            >
              <label className="site-search-mode-box">
                <span className="site-search-icon" aria-hidden="true" />

                <input
                  ref={searchInputRef}
                  className="site-search-mode-input"
                  type="search"
                  name="q"
                  placeholder={headerText.searchPlaceholder}
                  aria-label={headerText.searchAriaLabel}
                />
              </label>
            </form>
          </div>

          {/* 右侧工具区：搜索栏、语言栏、手机菜单按钮 */}
          <div className="site-header-actions">
            {/* PC 端搜索按钮：点击后中间导航区域切换为搜索模式 */}
            <button
              ref={searchTriggerRef}
              className="site-search-trigger"
              type="button"
              aria-label={headerText.searchButtonAriaLabel}
              aria-expanded={isSearchOpen}
              onClick={handleSearchButtonClick}
            >
              <span className="site-search-icon" aria-hidden="true" />
            </button>

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
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
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
                        onMouseEnter={() =>
                          setActiveMegaCategoryKey(category.key)
                        }
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
                                    cardImage.href ?? card.href,
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