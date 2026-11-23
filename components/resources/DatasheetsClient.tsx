"use client";

import { getLocaleFromPathname } from "@/lib/i18n";
import { trackFilterApply, trackSearchWithResults } from "@/lib/analytics/track-event";

/* =========================================================
   DatasheetsClient.tsx
   恒永达官网｜资源中心 - 规格书下载客户端组件

   文件路径：
   components/resources/DatasheetsClient.tsx

   作用：
   1. 渲染规格书下载页面主体内容
   2. 负责搜索、筛选、列表渲染
   3. 负责下载按钮和来图定制按钮
   4. 页面数据由 page.tsx 通过 service 层传入
   5. 本文件不直接写死规格书数据
   6. 后期接后端时，当前组件原则上不用大改

   当前数据流：
   page.tsx
     ↓
   services/resources/getDatasheetsPageData.ts
     ↓
   data/resources/datasheets.i18n.ts
     ↓
   DatasheetsClient.tsx
========================================================= */

import BottomCtaButton from "@/components/common/BottomCtaButton";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import catalogStyles from "@/components/home/EnglishHomeSections.module.css";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";

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
  accessibilityLabels?: {
    breadcrumb: string;
    categoryFilter: string;
    thumbnail: string;
  };
};

/* =========================================================
   DatasheetsClient
   规格书下载页面主体组件
========================================================= */

/* =========================================================
   getDatasheetFileName

   下载后的文件名直接取自 PDF 路径最后一段。
   不使用页面标题或翻译内容重新命名。
========================================================= */
function getDatasheetFileName(downloadHref: string) {
  const pathWithoutQuery = downloadHref.split(/[?#]/, 1)[0];
  const encodedFileName = pathWithoutQuery.split("/").pop();

  if (!encodedFileName) {
    return "datasheet.pdf";
  }

  try {
    return decodeURIComponent(encodedFileName);
  } catch {
    return encodedFileName;
  }
}
export default function DatasheetsClient({
  pageText,
  filterOptions,
  datasheetItems,
  accessibilityLabels,
}: DatasheetsClientProps) {
  /* 搜索关键词 */
  const [searchKeyword, setSearchKeyword] = useState("");

  /* 当前选中的产品分类 */
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
    return String(value || "")
      .trim()
      .toLowerCase();
  }

  /* =========================================================
     filteredItems
     根据分类和搜索词过滤规格书列表

     说明：
     1. activeCategory 为 all 时显示全部
     2. searchKeyword 为空时不限制关键词
     3. searchableText 中包含标题、标签、说明、关键词、语言、版本、更新时间
  ========================================================= */

  function filterItems(value: string) {
    const keyword = normalizeText(value);

    return datasheetItems.filter((item) => {
      const categoryMatched =
        activeCategory === "all" || activeCategory === item.category;

      const searchableText = normalizeText(
        `${item.keywords} ${item.title} ${item.label} ${item.description} ${item.language} ${item.version} ${item.update}`,
      );

      const keywordMatched = !keyword || searchableText.includes(keyword);

      return categoryMatched && keywordMatched;
    });
  }
  const filteredItems = filterItems(searchKeyword);

  return (
    <main className="datasheets-page">
      {/* ================================
          1. Banner
      ================================= */}
      <section className="datasheets-hero resource-center-banner">
        <img
          className="datasheets-hero-image"
          src={pageText.hero.image}
          alt={pageText.hero.imageAlt}
        />

        <div className="datasheets-hero-overlay" />

        <div className="datasheets-hero-inner resource-center-banner__inner">
          <h1 className="datasheets-hero-title resource-center-banner__title">{pageText.hero.title}</h1>

          <p className="datasheets-hero-desc resource-center-banner__description">{pageText.hero.description}</p>
        </div>
      </section>

      {/* ================================
          2. 面包屑导航
      ================================= */}
      <section
        className="breadcrumb-bar"
        aria-label={accessibilityLabels?.breadcrumb ?? "Breadcrumb"}
      >
        <div className="breadcrumb-bar-inner">
          <Link href={pageText.breadcrumb.homeHref ?? "/"}>
            {pageText.breadcrumb.home}
          </Link>

          <span>/</span>

          <span>{pageText.breadcrumb.resources}</span>

          <span>/</span>

          <strong>{pageText.breadcrumb.current}</strong>
        </div>
      </section>

      {/* ================================
          3. 共用搜索栏

          说明：
          1. 规格书搜索框使用资源中心共用搜索组件
          2. 分类筛选不放在搜索框下方
          3. 分类筛选放到规格书标题上方居中显示
      ================================= */}
      <ResourceSearchBar
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={(value) => {
          setSearchKeyword(value);
          trackSearchWithResults({
            searchTerm: value, searchLocation: "datasheet_library",
            locale: getLocaleFromPathname(window.location.pathname), resultCount: filterItems(value).length,
          });
        }}
        placeholder={pageText.search.placeholder}
        searchButtonText={pageText.search.buttonText}
        showRecentKeywords={false}
      />

      {/* ================================
          4. 规格书列表区域
      ================================= */}
      <section id="datasheets" className="content-wrap">
        {/* 分类筛选按钮：放在规格书标题上方，并且居中显示 */}
        <div className="datasheets-category-bar">
          <div
            className="filter-row section-filter-row"
            aria-label={
              accessibilityLabels?.categoryFilter ?? "Product category filter"
            }
          >
            {filterOptions.map((item) => (
              <button
                className={`filter-btn ${
                  activeCategory === item.value ? "is-active" : ""
                }`}
                type="button"
                key={item.value}
                onClick={() => {
                  if (item.value === activeCategory) return;
                  setActiveCategory(item.value);
                  trackFilterApply({
                    locale: getLocaleFromPathname(window.location.pathname), filterCategory: "datasheet_library",
                    filterName: "product_category", filterValue: item.value, sourceSection: "datasheet_library",
                  });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 标题区域：左侧标题说明，右侧资料数量 */}
        <div className="section-head">
          <div className="section-head-main">
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
          <div className={catalogStyles.productGrid}>
            {filteredItems.map((item) => (
              <article className={`${catalogStyles.product} datasheet-card`} key={item.id}>
                <div className={catalogStyles.visual}>
                  <Image
                    src={item.image}
                    alt={`${item.title}${
                      accessibilityLabels?.thumbnail ?? " thumbnail"
                    }`}
                    fill
                    sizes="(max-width: 760px) 46vw, (max-width: 1600px) 23vw, 400px"
                    style={
                      item.id === "fittings-and-tubing-catalog" || item.id === "sample-probe"
                        ? { objectFit: "cover" }
                        : undefined
                    }
                  />
                </div>

                <div className={catalogStyles.productText}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="datasheet-card-actions">
                    {item.productHref ? (
                      <Link className="datasheet-card-action" href={item.productHref}>
                        {pageText.labels.viewProduct}
                      </Link>
                    ) : null}

                    {item.actionType === "custom" ? (
                      <Link className="datasheet-card-action" href={item.downloadHref}>
                        {pageText.labels.custom}
                      </Link>
                    ) : (
                      <a
                        className="datasheet-card-action"
                        href={encodeURI(item.downloadHref)}
                        download={getDatasheetFileName(item.downloadHref)}
                        data-analytics-resource-action="download"
                        data-analytics-resource-id={item.id}
                        data-analytics-resource-type="datasheet"
                        data-analytics-resource-file-type="pdf"
                        data-analytics-section="datasheet_library"
                      >
                        {pageText.labels.download}
                      </a>
                    )}
                  </div>
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
            <h2 className="support-title">{pageText.support.title}</h2>

            <p className="support-desc">{pageText.support.description}</p>
          </div>

          <div className="support-actions">
            <BottomCtaButton className="support-btn" href={pageText.support.buttonHref}>
              {pageText.support.buttonText}
            </BottomCtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
