"use client"; // 声明这是客户端组件，因为这里需要使用 useState、useEffect、window、document 等浏览器能力

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内页面跳转
import { usePathname } from "next/navigation"; // 引入 usePathname，用于获取当前页面路径
import { useEffect, useRef, useState, type MouseEvent } from "react"; // 引入 React 状态、生命周期和鼠标事件类型

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

// 顶部导航下拉预留项
// 说明：这些数据只用于搭建 PC mega 下拉和手机二级展开的样式骨架，真实内容后期可替换为 CMS / 接口数据
const navDropdownPreview = {
  products: ["泵类产品", "阀类产品", "传感器", "管路与连接件", "采样针", "驱动控制模块"],
  applications: ["IVD 体外诊断", "生命科学", "合成生物", "高端分析仪器", "实验室自动化"],
  resources: ["产品资料下载", "产品目录", "认证与资质资料", "选型指南", "安装说明", "技术文章 / FAQ"],
  about: ["公司介绍", "研发制造能力", "质量体系", "企业资质", "全球服务"],
  contact: ["询盘表单", "联系方式", "地址信息", "销售支持入口"],
};

type DropdownKey = keyof typeof navDropdownPreview;

// PC 端 mega 下拉展示数据
// 说明：当前先按产品中心参考图写静态内容结构，后续可替换为真实产品分类接口
const megaDropdownContent = {
  products: {
    defaultCategory: "传感器",
    categories: [
      {
        title: "泵类产品",
        description: "定量、移液、供液与废液处理",
        heading: "泵类产品",
        lead: "面向微量定量、连续供液、自动化移液与废液处理等场景，提供多种泵类产品选择。",
        footer: "支持根据流量、压力、精度、介质和安装空间进行选型。",
        cards: [
          { title: "隔膜泵", description: "连续供液、清洗、废液抽取与系统供液。" },
          { title: "注射泵", description: "μL-mL 级高精度定量分配。" },
          { title: "移液泵", description: "自动化移液、加样与样本处理。" },
          { title: "柱塞泵", description: "高重复性微量分配与稳定输送。" },
          { title: "多通道移液泵", description: "多通道并行加样与实验室自动化。" },
        ],
      },
      {
        title: "阀类产品",
        description: "流路切换、通道控制与高压控制",
        heading: "阀类产品",
        lead: "用于复杂液路系统中的通道切换、流路管理和高压控制，提升系统集成效率。",
        footer: "适合多通道流路、试剂分配、清洗切换与高压分析场景。",
        cards: [
          { title: "多通阀", description: "多通道流路选择与切换。" },
          { title: "电磁阀", description: "快速开闭与自动化控制。" },
          { title: "旋转阀", description: "稳定切换多路试剂路径。" },
          { title: "高压阀", description: "面向高压液路应用。" },
        ],
      },
      {
        title: "传感器",
        description: "压力、气泡、电导率等液路监测",
        heading: "传感与检测",
        lead: "用于液路系统中的压力、气泡、电导率等状态检测，帮助仪器识别液路运行状态。",
        footer: "适合液路安全监测、状态反馈、异常报警与系统闭环控制。",
        cards: [
          { title: "压力传感器", description: "液路压力监测与系统状态反馈。" },
          { title: "气泡检测器", description: "非接触检测管路气泡状态。" },
          { title: "电导率检测模块", description: "液体电导率、水质或状态检测。" },
          { title: "液路状态监测", description: "与泵阀模块配合实现系统级监控。" },
        ],
      },
      {
        title: "管路与连接件",
        description: "管路、接头与高压连接系统",
        heading: "管路与连接件",
        lead: "覆盖液路连接、密封、转接和模块化装配需求，降低整机液路集成复杂度。",
        footer: "适配不同管径、材料、压力等级与仪器内部空间约束。",
        cards: [
          { title: "管路", description: "稳定传输试剂、样本与清洗液。" },
          { title: "接头", description: "可靠密封与快速装配。" },
          { title: "转接件", description: "适配不同模块和接口规格。" },
          { title: "高压连接件", description: "满足高压液路连接需求。" },
        ],
      },
      {
        title: "采样针",
        description: "样本吸取、加样与自动化处理",
        heading: "采样针",
        lead: "面向自动化样本吸取、试剂加样和液体处理场景，支持不同规格和工艺要求。",
        footer: "可根据样本类型、针型、表面处理和装配方式进行选型。",
        cards: [
          { title: "样本针", description: "样本吸取与分配。" },
          { title: "试剂针", description: "试剂加样与清洗流程。" },
          { title: "穿刺针", description: "特殊容器或密封膜穿刺。" },
          { title: "定制针组件", description: "按仪器空间和工艺定制。" },
        ],
      },
      {
        title: "驱动控制模块",
        description: "泵阀控制与系统集成支持",
        heading: "驱动控制模块",
        lead: "为泵、阀、传感器等液路核心部件提供驱动控制、状态反馈和系统集成支持。",
        footer: "支持控制逻辑、通信接口、状态采集与自动化流程集成。",
        cards: [
          { title: "泵阀控制模块", description: "统一管理核心执行部件。" },
          { title: "驱动板卡", description: "适配不同电机和执行器。" },
          { title: "反馈模块", description: "采集压力、气泡等状态。" },
          { title: "系统集成支持", description: "辅助整机液路调试和验证。" },
        ],
      },
    ],
  },
} as const;

// 根据导航链接判断当前需要展示哪一类下拉预留样式
function getDropdownKey(href: string) {
  if (href.includes("#products")) return "products" satisfies DropdownKey;
  if (href.includes("#applications")) return "applications" satisfies DropdownKey;
  if (href.includes("#resources")) return "resources" satisfies DropdownKey;
  if (href.includes("#about")) return "about" satisfies DropdownKey;
  if (href.includes("#contact")) return "contact" satisfies DropdownKey;

  return null;
}

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

  const [activeMobileSubItem, setActiveMobileSubItem] = useState(""); // 记录手机端最后点击的二级菜单项，用于点击反馈

  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<DropdownKey | "">(""); // 控制 PC 端当前 hover 展开的下拉面板

  const [activeDesktopCategory, setActiveDesktopCategory] = useState(""); // 控制 PC 端 mega 下拉左侧当前分类

  const [openMobileDropdown, setOpenMobileDropdown] = useState(""); // 控制手机端当前展开的一级栏目，保证一次只展开一个

  const desktopDropdownCloseTimer = useRef<number | null>(null); // PC 下拉关闭延迟定时器，避免鼠标移入内容前闪退

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
    setOpenMobileDropdown(""); // 关闭手机导航时同步收起所有二级栏目
  }

  /**
   * PC 端进入导航项或下拉面板时执行
   */
  function openDesktopDropdown(dropdownKey: DropdownKey) {
    if (desktopDropdownCloseTimer.current) {
      window.clearTimeout(desktopDropdownCloseTimer.current); // 鼠标重新进入时取消关闭延迟
    }

    setActiveDesktopDropdown(dropdownKey); // 只用 hover 状态控制 PC 下拉，不通过点击固定

    if (dropdownKey === "products" && !activeDesktopCategory) {
      setActiveDesktopCategory(megaDropdownContent.products.defaultCategory); // 产品中心默认展示参考图中的传感器分类
    }
  }

  /**
   * PC 端离开导航项或下拉面板时执行
   */
  function closeDesktopDropdownWithDelay() {
    if (desktopDropdownCloseTimer.current) {
      window.clearTimeout(desktopDropdownCloseTimer.current); // 避免重复定时器
    }

    desktopDropdownCloseTimer.current = window.setTimeout(() => {
      setActiveDesktopDropdown(""); // 延迟关闭，给鼠标移动到内容区留时间
    }, 180);
  }

  /**
   * PC 端鼠标进入独立下拉面板时执行
   */
  function keepDesktopDropdownOpen() {
    if (desktopDropdownCloseTimer.current) {
      window.clearTimeout(desktopDropdownCloseTimer.current); // 鼠标进入下拉内容区时取消关闭
    }
  }

  /**
   * 点击手机端一级栏目时执行
   */
  function handleMobileSummaryClick(event: MouseEvent<HTMLElement>, itemKey: string) {
    event.preventDefault(); // 阻止 details 原生立即切换，改用受控状态

    setOpenMobileDropdown((currentKey) =>
      currentKey === itemKey ? "" : itemKey
    ); // 展开当前栏目，同时自动收起其他栏目
  }

  /**
   * 点击手机端二级菜单末项时执行
   *
   * 说明：
   * 1. 一级菜单只负责展开，不做选中态
   * 2. 二级末项点击后才显示蓝底 + 荧光青的状态
   * 3. 用一个短延迟保留按下反馈，后续接真实跳转时也能更自然
   */
  function handleMobileSubItemClick(itemKey: string) {
    window.setTimeout(() => {
      setActiveMobileSubItem(itemKey);
    }, 80);
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

  const activeDesktopItem = activeDesktopDropdown
    ? headerText.navItems.find(
        (item) => getDropdownKey(item.href) === activeDesktopDropdown
      )
    : undefined; // 当前 PC 下拉对应的一级导航项

  const isProductDesktopDropdown = activeDesktopDropdown === "products"; // 产品中心使用更大的预留网格

  const activeDesktopCategories = isProductDesktopDropdown
    ? megaDropdownContent.products.categories
    : activeDesktopDropdown
      ? navDropdownPreview[activeDesktopDropdown].map((title) => ({
          title,
          description: "内容预留",
          heading: activeDesktopItem?.label ?? title,
          lead: "下拉内容样式预留，后续接入真实分类、产品和资料。",
          footer: "支持后续扩展多级分类与详情入口。",
          cards: [
            { title: "预留入口", description: "后续接入真实内容。" },
            { title: "预留入口", description: "后续接入真实内容。" },
            { title: "预留入口", description: "后续接入真实内容。" },
            { title: "预留入口", description: "后续接入真实内容。" },
          ],
        }))
      : []; // 当前 PC 下拉分类数据，产品中心使用精细内容，其余栏目先保留样式骨架

  const activeProductMegaCategory =
    activeDesktopCategories.find(
      (category) => category.title === activeDesktopCategory
    ) ?? activeDesktopCategories[0]; // 当前 PC mega 分类，默认使用当前栏目第一项

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
        openPanel !== "none" || activeDesktopDropdown ? "header-panel-open" : ""
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
          {headerText.navItems.map((item) => {
            const dropdownKey = getDropdownKey(item.href);

            return (
              <div
                key={item.href}
                className={`site-nav-item ${
                  dropdownKey ? "site-nav-item-has-dropdown" : ""
                }`} // 有二级结构的导航项会承载 PC 下拉面板
                onMouseEnter={() => {
                  if (dropdownKey) openDesktopDropdown(dropdownKey);
                }} // PC 端鼠标进入时打开对应下拉
                onMouseLeave={closeDesktopDropdownWithDelay} // PC 端鼠标离开后延迟关闭下拉
              >
                <Link
                  href={item.href} // 导航链接地址
                  className={`site-nav-link ${
                    isNavActive(item.href) ? "site-nav-link-active" : ""
                  }`} // 当前页面高亮
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
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
              {headerText.navItems.map((item) => {
                const dropdownKey = getDropdownKey(item.href);
                const dropdownItems = dropdownKey ? navDropdownPreview[dropdownKey] : [];

                if (!dropdownKey) {
                  return (
                    <Link
                      key={item.href} // React 列表唯一标识
                      href={item.href} // 手机端导航链接
                      className="mobile-nav-link" // 手机端首页不常驻选中，避免误导当前展开状态
                      onClick={closeAllPanels} // 点击导航后关闭所有展开面板
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <details
                    className="mobile-nav-section"
                    key={item.href}
                    open={openMobileDropdown === item.href}
                  >
                    <summary
                      className="mobile-nav-summary"
                      onClick={(event) => handleMobileSummaryClick(event, item.href)}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">▾</span>
                    </summary>

                    <div className="mobile-nav-submenu">
                      <Link
                        href={item.href}
                        className="mobile-nav-submenu-link mobile-nav-submenu-entry"
                        onClick={closeAllPanels}
                      >
                        进入{item.label}
                      </Link>

                      {dropdownItems.map((dropdownItem) => (
                        <Link
                          href={item.href}
                          className={`mobile-nav-submenu-link ${
                            activeMobileSubItem === `${item.href}-${dropdownItem}`
                              ? "mobile-nav-submenu-link-active"
                              : ""
                          }`} // 手机端只有点击到末级项才显示选中态
                          key={dropdownItem}
                          onClick={() =>
                            handleMobileSubItemClick(`${item.href}-${dropdownItem}`)
                          }
                        >
                          {dropdownItem}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* PC 端独立 mega 下拉：放在 header 直接子级，确保顶部与 Top 栏底部无缝贴合 */}
      {activeDesktopDropdown && activeDesktopItem && (
        <div
          className={`site-nav-mega site-nav-mega-open ${
            isProductDesktopDropdown ? "site-nav-mega-products" : ""
          }`} // PC 端下拉面板，产品中心使用更大的 mega 样式
          onMouseEnter={keepDesktopDropdownOpen} // 鼠标进入面板内容时保持打开
          onMouseLeave={closeDesktopDropdownWithDelay} // 鼠标离开面板后延迟关闭
        >
          <div className="site-nav-mega-inner">
            <div className="site-nav-mega-sidebar">
              {activeDesktopCategories.map((category) => (
                <Link
                  key={category.title}
                  href={activeDesktopItem.href}
                  className={`site-nav-mega-category ${
                    activeProductMegaCategory.title === category.title
                      ? "site-nav-mega-category-active"
                      : ""
                  }`} // 左侧分类列表，第一项作为预览高亮
                  onMouseEnter={() => setActiveDesktopCategory(category.title)}
                  onFocus={() => setActiveDesktopCategory(category.title)}
                >
                  <strong>{category.title}</strong>
                  <span className="site-nav-mega-category-desc">{category.description}</span>
                  <span className="site-nav-mega-category-arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <div className="site-nav-mega-main">
              <div className="site-nav-mega-heading">
                <h3>{activeProductMegaCategory.heading}</h3>
                <p>{activeProductMegaCategory.lead}</p>
              </div>

              <div className="site-nav-mega-placeholder-grid">
                {activeProductMegaCategory.cards.map((card) => (
                  <Link
                    className="site-nav-mega-placeholder"
                    href={activeDesktopItem.href}
                    key={card.title}
                  >
                    <span className="site-nav-mega-card-icon" aria-hidden="true" />
                    <strong className="site-nav-mega-card-title">{card.title}</strong>
                    <span className="site-nav-mega-card-label">{card.description}</span>
                  </Link>
                ))}
              </div>

              <div className="site-nav-mega-footer">
                <span>{activeProductMegaCategory.footer}</span>
                <Link href={activeDesktopItem.href}>查看全部产品 →</Link>
              </div>
            </div>
          </div>
        </div>
      )}

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
