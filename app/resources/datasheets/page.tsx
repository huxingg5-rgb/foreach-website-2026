"use client";

// app/resources/datasheets/page.tsx
// 恒永达官网｜资源中心｜规格书下载页面
//
// 页面说明：
// 1. 当前页面访问路径：/resources/datasheets
// 2. 本页面按已确认的 H5 预览结构改成 Next.js 页面
// 3. 当前页面只展示“规格书下载”，不放图纸
// 4. 产品图纸、二维图、三维模型后续建议放到对应产品详情页
// 5. 页面结构：Banner + 面包屑 + 搜索筛选 + 规格书列表 + 底部支持入口
// 6. 本页面包含搜索和筛选状态，所以使用客户端组件
// 7. 中文 PDF 当前采用中文文件夹 + 中文 PDF 文件名
// 8. 客户下载后，文件名就是 PDF 本身的中文文件名
// 9. 针系列暂无规格书，点击“来图定制”进入联系我们页面

import { useMemo, useState } from "react"; // 引入 React 状态与计算能力
import Link from "next/link"; // 引入 Next.js 内部跳转组件

import "./datasheets.css"; // 引入当前页面专用 CSS

// 分类筛选按钮数据
const filterOptions = [
  { label: "全部", value: "all" },
  { label: "泵系列", value: "pump" },
  { label: "阀系列", value: "valve" },
  { label: "针系列", value: "needle" },
  { label: "管路及连接件系列", value: "tubing" },
  { label: "智控模块系列", value: "smart" },
];

// 规格书列表数据
// 说明：
// 1. 当前先使用中文规格书路径
// 2. downloadHref 直接指向 public/downloads/resources/datasheets/zh-CN/ 下的 PDF
// 3. 网页路径不写 public，从 /downloads/... 开始
// 4. PDF 文件本身是中文名，客户下载后也是中文文件名
// 5. actionType 为 download 时显示“下载规格书”
// 6. actionType 为 custom 时显示“来图定制”，并链接到联系我们页面
const datasheetItems = [
  {
    id: "plunger-pump",
    category: "pump",
    keywords: "柱塞泵 plunger pump 高精度 定量 输送",
    title: "柱塞泵系列规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高精度定量输送、分配与自动化分析仪器液路系统。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/柱塞泵系列规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "valveless-pump",
    category: "pump",
    keywords: "无阀泵 valveless pump 微量 定量",
    title: "无阀泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于减少阀件数量、提升系统可靠性的微量定量液体应用。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-valveless-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/无阀泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "diaphragm-pump",
    category: "pump",
    keywords: "隔膜泵 diaphragm pump 自吸 供液",
    title: "隔膜泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于小流量供液、自吸输送、清洗液输送与自动化液路集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-diaphragm-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/隔膜泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-pump",
    category: "pump",
    keywords: "高压泵 high pressure pump 耐压 精密输送",
    title: "高压泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高压流体控制、精密输送和特殊耐压液路场景。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/高压泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "syringe-pump",
    category: "pump",
    keywords: "注射泵 syringe pump 多通道 定量 分配",
    title: "注射泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于 μL–mL 级高精度定量、分配与多通道液体操作。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/注射泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "rotary-valve",
    category: "valve",
    keywords: "旋转阀 rotary valve 多通道 流路切换",
    title: "旋转阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于多通道流路切换、试剂分配与复杂液路系统集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-rotary-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/旋转阀规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-valve",
    category: "valve",
    keywords: "高压阀 high pressure valve 耐压 流路切换",
    title: "高压阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高压液路切换、耐压控制与精密流体管理场景。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/高压阀规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "solenoid-valve",
    category: "valve",
    keywords: "电磁阀 solenoid valve 通断控制 切换",
    title: "电磁阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于样本、试剂和清洗液等微流体通断控制与切换。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-solenoid-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/电磁阀规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "sample-probe",
    category: "needle",
    keywords: "针系列 sample probe 来图定制 定制 采样针 加样针",
    title: "针系列",
    label: "针系列",
    language: "—",
    version: "—",
    update: "—",
    description: "暂无规格书，支持来图定制，可根据图纸或样品进行定制沟通。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "#",
    downloadHref: "/contact?type=custom-probe",
    actionType: "custom",
  },
  {
    id: "tubing-fitting",
    category: "tubing",
    keywords: "管路 连接件 tubing fitting 接头 组件 卡环接头 硬管 软管",
    title: "管路及连接件规格书",
    label: "管路及连接件系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于微流体系统中的管路连接、硬管/软管组件与常用接头方案。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-tubing-fitting-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/管路及连接件系列/管路及连接件规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "pressure-sensor",
    category: "smart",
    keywords: "压力传感器 pressure sensor 智控模块 监测 压力检测",
    title: "压力传感器规格书",
    label: "智控模块系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "用于液路压力监测、系统状态反馈与自动化控制集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-pressure-sensor-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/智控模块系列/压力传感器规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "bubble-detector",
    category: "smart",
    keywords: "气泡检测 模块 bubble detector 智控模块 气泡检测器",
    title: "气泡检测模块规格书",
    label: "智控模块系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "用于液路中的气泡识别、异常监测与系统安全控制。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-bubble-detector-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/智控模块系列/气泡检测模块规格书_A01_恒永达.pdf",
    actionType: "download",
  },
];

// 下载图标组件
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11 4h2v9.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V4Zm-5 15h12v2H6v-2Z"
      />
    </svg>
  );
}

// 搜索图标组件
function SearchIcon() {
  return (
    <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.8 4a5.8 5.8 0 0 1 4.62 9.31l4.13 4.13-1.41 1.41-4.13-4.13A5.8 5.8 0 1 1 9.8 4m0 2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"
      />
    </svg>
  );
}

export default function DatasheetsPage() {
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState("");

  // 当前选中的分类
  const [activeCategory, setActiveCategory] = useState("all");

  // 统一处理搜索关键词，避免大小写影响搜索
  function normalizeText(value: string) {
    return String(value || "").trim().toLowerCase();
  }

  // 根据分类和搜索词过滤资料列表
  const filteredItems = useMemo(() => {
    const keyword = normalizeText(searchKeyword);

    return datasheetItems.filter((item) => {
      const categoryMatched =
        activeCategory === "all" || activeCategory === item.category;

      const searchableText = normalizeText(
        `${item.keywords} ${item.title} ${item.label} ${item.description} ${item.language} ${item.version} ${item.update}`,
      );

      const keywordMatched = !keyword || searchableText.includes(keyword);

      return categoryMatched && keywordMatched;
    });
  }, [activeCategory, searchKeyword]);

  return (
    <main className="datasheets-page">
      {/* ================================
          1. Banner
      ================================= */}
      <section className="datasheets-hero">
        <div className="datasheets-hero-inner">
          <h1 className="datasheets-hero-title">规格书下载</h1>

          <p className="datasheets-hero-desc">
            查找并下载恒永达泵、阀、管路与连接件及智控模块等产品规格书，
            快速了解产品参数、材料、接口与应用信息。
          </p>
        </div>
      </section>

      {/* ================================
          2. 面包屑导航
      ================================= */}
      <section className="breadcrumb-bar" aria-label="面包屑导航">
        <div className="breadcrumb-bar-inner">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/resources">资源中心</Link>
          <span>/</span>
          <strong>规格书下载</strong>
        </div>
      </section>

      {/* ================================
          3. 搜索与筛选区域
      ================================= */}
      <section className="tool-panel" aria-label="规格书搜索与筛选">
        <div className="search-row">
          <div className="search-wrap">
            <SearchIcon />

            <input
              className="search-input"
              type="search"
              value={searchKeyword}
              placeholder="搜索产品名称或关键词，例如 柱塞泵、旋转阀、压力传感器、管路及连接件"
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </div>

          <button className="search-btn" type="button">
            搜索
          </button>
        </div>

        <div className="filter-row" aria-label="产品分类筛选">
          {filterOptions.map((item) => (
            <button
              className={`filter-btn ${
                activeCategory === item.value ? "is-active" : ""
              }`}
              type="button"
              key={item.value}
              onClick={() => setActiveCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* ================================
          4. 规格书列表
      ================================= */}
      <section id="datasheets" className="content-wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">产品规格书</h2>

            <p className="section-desc">
              当前页面仅收录产品规格书；针系列暂无规格书，支持来图定制；
              产品图纸建议在对应产品详情页获取。
            </p>
          </div>

          <div className="result-count">共 {filteredItems.length} 条资料</div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="datasheet-list">
            {filteredItems.map((item) => (
              <article className="datasheet-row" key={item.id}>
                <div className="product-thumb">
                  <img src={item.image} alt={`${item.title}缩略图`} />
                </div>

                <div className="row-main">
                  <div className="row-title-line">
                    <h3 className="row-title">{item.title}</h3>
                    <span className="row-label">{item.label}</span>
                  </div>

                  <div className="row-meta">
                    <span>语言：{item.language}</span>
                    <span>版本：{item.version}</span>
                    <span>更新：{item.update}</span>
                  </div>

                  <p className="row-desc">{item.description}</p>
                </div>

                <div className="row-actions">
                  <a className="row-link" href={item.productHref}>
                    查看产品
                  </a>

                  {item.actionType === "custom" ? (
                    <Link className="row-custom" href={item.downloadHref}>
                      来图定制
                    </Link>
                  ) : (
                    <a
                      className="row-download"
                      href={encodeURI(item.downloadHref)}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      下载规格书
                      <DownloadIcon />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-title">没有找到匹配的资料</div>

            <p className="empty-desc">
              可以尝试搜索产品名称、关键词或切换产品分类。若仍未找到，
              请提交资料需求，我们会协助您获取对应资料。
            </p>
          </div>
        )}
      </section>

      {/* ================================
          5. 底部支持入口
          说明：
          1. 这里只有一个按钮
          2. 点击后进入中文联系我们页面
          3. type=datasheet 用于后续联系我们表单识别来源
      ================================= */}
      <section className="support-section">
        <div className="support-inner">
          <div>
            <div className="support-kicker">Need Support</div>

            <h2 className="support-title">没有找到需要的规格书？</h2>

            <p className="support-desc">
              提交产品名称、应用场景或资料需求，我们将协助您获取对应产品规格书，
              并提供必要的选型建议与技术支持。
            </p>
          </div>

          <div className="support-actions">
            <Link className="support-btn" href="/contact?type=datasheet">
              提交资料需求
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 