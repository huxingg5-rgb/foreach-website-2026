"use client";

/* =========================================================
   DatasheetsClient.tsx
   恒永达官网｜资源中心｜规格书下载｜客户端组件

   文件路径：
   components/resources/DatasheetsClient.tsx

   作用：
   1. 渲染规格书下载页面主体内容
   2. 负责搜索、筛选、列表渲染
   3. 负责下载按钮和来图定制按钮
   4. 页面数据从 data/resources/datasheets.zh.ts 传入
   5. 本文件不直接写死规格书数据，后续新增资料只改 data 文件

   为什么是客户端组件：
   1. 搜索输入框需要 useState
   2. 分类筛选需要 useState
   3. 列表过滤需要 useMemo
========================================================= */

import { useMemo, useState } from "react"; // 引入 React 状态与计算能力
import Link from "next/link"; // 引入 Next.js 内部跳转组件

import type {
  DatasheetCategoryValue,
  DatasheetFilterOption,
  DatasheetItem,
} from "@/data/resources/datasheets.zh"; // 引入规格书数据类型

/* =========================================================
   组件 Props 类型
   说明：
   1. pageText：页面文案
   2. filterOptions：筛选按钮
   3. datasheetItems：规格书列表
========================================================= */

type DatasheetsClientProps = {
  pageText: {
    hero: {
      title: string;
      description: string;
    };
    breadcrumb: {
      home: string;
      resources: string;
      current: string;
    };
    search: {
      placeholder: string;
      buttonText: string;
    };
    section: {
      title: string;
      description: string;
      resultSuffix: string;
      emptyTitle: string;
      emptyDescription: string;
    };
    support: {
      kicker: string;
      title: string;
      description: string;
      buttonText: string;
      buttonHref: string;
    };
  };
  filterOptions: DatasheetFilterOption[];
  datasheetItems: DatasheetItem[];
};

/* =========================================================
   DownloadIcon
   下载图标组件

   说明：
   1. 跟随按钮文字颜色变化
   2. 使用 currentColor
========================================================= */

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

/* =========================================================
   SearchIcon
   搜索图标组件
========================================================= */

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

/* =========================================================
   DatasheetsClient
   规格书下载页面主体组件
========================================================= */

export default function DatasheetsClient({
  pageText,
  filterOptions,
  datasheetItems,
}: DatasheetsClientProps) {
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState("");

  // 当前选中的分类
  const [activeCategory, setActiveCategory] =
    useState<DatasheetCategoryValue>("all");

  /* =========================================================
     normalizeText
     统一处理搜索文本

     说明：
     1. 去除首尾空格
     2. 转小写
     3. 避免英文大小写影响搜索
  ========================================================= */

  function normalizeText(value: string) {
    return String(value || "").trim().toLowerCase();
  }

  /* =========================================================
     filteredItems
     根据分类和搜索词过滤资料列表
  ========================================================= */

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
  }, [activeCategory, searchKeyword, datasheetItems]);

  return (
    <main className="datasheets-page">
      {/* ================================
          1. Banner
      ================================= */}
      <section className="datasheets-hero">
        <div className="datasheets-hero-inner">
          <h1 className="datasheets-hero-title">{pageText.hero.title}</h1>

          <p className="datasheets-hero-desc">{pageText.hero.description}</p>
        </div>
      </section>

      {/* ================================
          2. 面包屑导航
      ================================= */}
      <section className="breadcrumb-bar" aria-label="面包屑导航">
        <div className="breadcrumb-bar-inner">
          <Link href="/">{pageText.breadcrumb.home}</Link>
          <span>/</span>
          <Link href="/resources">{pageText.breadcrumb.resources}</Link>
          <span>/</span>
          <strong>{pageText.breadcrumb.current}</strong>
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
              placeholder={pageText.search.placeholder}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </div>

          <button className="search-btn" type="button">
            {pageText.search.buttonText}
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
            <h2 className="section-title">{pageText.section.title}</h2>

            <p className="section-desc">{pageText.section.description}</p>
          </div>

          <div className="result-count">
            共 {filteredItems.length} {pageText.section.resultSuffix}
          </div>
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
            <div className="empty-title">{pageText.section.emptyTitle}</div>

            <p className="empty-desc">{pageText.section.emptyDescription}</p>
          </div>
        )}
      </section>

      {/* ================================
          5. 底部支持入口
      ================================= */}
      <section className="support-section">
        <div className="support-inner">
          <div>
            <div className="support-kicker">{pageText.support.kicker}</div>

            <h2 className="support-title">{pageText.support.title}</h2>

            <p className="support-desc">{pageText.support.description}</p>
          </div>

          <div className="support-actions">
            <Link className="support-btn" href={pageText.support.buttonHref}>
              {pageText.support.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 