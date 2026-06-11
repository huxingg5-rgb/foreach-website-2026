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
   4. 页面数据由 page.tsx 通过 service 层传入
   5. 本文件不直接写死规格书数据
   6. 后期接后端时，当前组件原则上不用改

   当前数据流：
   page.tsx
     ↓
   services/resources/getDatasheetsPageData.ts
     ↓
   data/resources/datasheets.i18n.ts
     ↓
   DatasheetsClient.tsx
========================================================= */

import { useMemo, useState } from "react";
import Link from "next/link";

import type {
  DatasheetCategory,
  DatasheetFilterOption,
  DatasheetItem,
  DatasheetsPageText,
} from "@/data/resources/datasheets.types";

/* =========================================================
   组件 Props 类型

   说明：
   1. pageText：页面文案，包括 Banner、面包屑、搜索框、列表说明、按钮文字等
   2. filterOptions：筛选按钮数据
   3. datasheetItems：规格书列表数据
   4. 类型统一从 data/resources/datasheets.types.ts 引入
========================================================= */

type DatasheetsClientProps = {
  pageText: DatasheetsPageText;
  filterOptions: DatasheetFilterOption[];
  datasheetItems: DatasheetItem[];
};

/* =========================================================
   DownloadIcon
   下载图标组件

   说明：
   1. 使用 SVG，不额外引入图片
   2. fill 使用 currentColor，颜色跟随按钮文字
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

   说明：
   1. 使用 SVG，不使用图片
   2. className="search-icon" 的大小、位置由 datasheets.css 控制
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
  /* 搜索关键词 */
  const [searchKeyword, setSearchKeyword] = useState("");

  /* 当前选中的分类 */
  const [activeCategory, setActiveCategory] =
    useState<DatasheetCategory>("all");

  /* =========================================================
     normalizeText
     统一处理搜索文本

     说明：
     1. 转成字符串
     2. 去除首尾空格
     3. 转小写，避免英文大小写影响搜索
  ========================================================= */

  function normalizeText(value: string) {
    return String(value || "").trim().toLowerCase();
  }

  /* =========================================================
     filteredItems
     根据分类和搜索词过滤规格书列表

     说明：
     1. activeCategory 为 all 时显示全部
     2. searchKeyword 为空时不限制关键词
     3. searchableText 中包含标题、标签、说明、关键词、语言、版本、更新时间
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

  /* 字段分隔符：中文默认用 ： */
  const fieldSeparator = pageText.labels.fieldSeparator ?? "：";

  return (
    <main className="datasheets-page">
      {/* ================================
          1. Banner
      ================================= */}
      <section className="datasheets-hero">
        <img
          className="datasheets-hero-image"
          src={pageText.hero.image}
          alt={pageText.hero.imageAlt}
        />

        <div className="datasheets-hero-overlay" />

        <div className="datasheets-hero-inner">
          <h1 className="datasheets-hero-title">{pageText.hero.title}</h1>

          <p className="datasheets-hero-desc">{pageText.hero.description}</p>
        </div>
      </section>

      {/* ================================
          2. 面包屑导航
      ================================= */}
      <section className="breadcrumb-bar" aria-label="Breadcrumb">
        <div className="breadcrumb-bar-inner">
          <Link href={pageText.breadcrumb.homeHref ?? "/"}>
            {pageText.breadcrumb.home}
          </Link>

          <span>/</span>

          <Link href={pageText.breadcrumb.resourcesHref ?? "/resources"}>
            {pageText.breadcrumb.resources}
          </Link>

          <span>/</span>

          <strong>{pageText.breadcrumb.current}</strong>
        </div>
      </section>

      {/* ================================
          3. 搜索与筛选区域
      ================================= */}
      <section className="tool-panel" aria-label="Datasheet search and filter">
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

        <div className="filter-row" aria-label="Product category filter">
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
            {pageText.section.resultPrefix
              ? `${pageText.section.resultPrefix} `
              : ""}
            {filteredItems.length} {pageText.section.resultSuffix}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="datasheet-list">
            {filteredItems.map((item) => (
              <article className="datasheet-row" key={item.id}>
                {/* 左侧产品缩略图 */}
                <div className="product-thumb">
                  <img src={item.image} alt={`${item.title} thumbnail`} />
                </div>

                {/* 中间文字信息 */}
                <div className="row-main">
                  <div className="row-title-line">
                    <h3 className="row-title">{item.title}</h3>

                    <span className="row-label">{item.label}</span>
                  </div>

                  <div className="row-meta">
                    <span>
                      {pageText.labels.language}
                      {fieldSeparator}
                      {item.language}
                    </span>

                    <span>
                      {pageText.labels.version}
                      {fieldSeparator}
                      {item.version}
                    </span>

                    <span>
                      {pageText.labels.update}
                      {fieldSeparator}
                      {item.update}
                    </span>
                  </div>

                  <p className="row-desc">{item.description}</p>
                </div>

                {/* 右侧按钮 */}
                <div className="row-actions">
                  {item.productHref ? (
                    <Link className="row-link" href={item.productHref}>
                      {pageText.labels.viewProduct}
                    </Link>
                  ) : null}

                  {item.actionType === "custom" ? (
                    <Link className="row-custom" href={item.downloadHref}>
                      {pageText.labels.custom}
                    </Link>
                  ) : (
                    <a
                      className="row-download"
                      href={encodeURI(item.downloadHref)}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pageText.labels.download}
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