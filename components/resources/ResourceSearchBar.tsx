"use client";

/* =========================================================
   ResourceSearchBar.tsx
   恒永达官网｜资源中心通用搜索栏组件

   文件路径：
   components/resources/ResourceSearchBar.tsx

   作用：
   1. 统一资源中心搜索栏结构
   2. 新闻、技术文章、规格书下载、材料兼容等页面都可以复用
   3. 搜索栏样式由 ResourceSearchBar.module.css 管理
   4. 页面只负责传入 value / onChange / onSearch
========================================================= */

import {
  useState,
  type FormEvent,
} from "react";

import styles from "./ResourceSearchBar.module.css";
import useRecentSearches from "./useRecentSearches";

export type ResourceSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchButtonText?: string;
  recentLabel?: string;
  recentKeywords?: string[];
  historyKey?: string;
  historyLocale?: string;
  showRecentKeywords?: boolean;
  keywordNormalizer?: (value: string) => string;
};

function normalizeKeyword(value: string) {
  return value.trim().toUpperCase();
}

export default function ResourceSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "请输入产品",
  searchButtonText = "搜索",
  recentLabel = "最近搜索",
  recentKeywords = [],
  historyKey,
  historyLocale = "en",
  showRecentKeywords = true,
  keywordNormalizer = normalizeKeyword,
}: ResourceSearchBarProps) {
  const history = useRecentSearches(showRecentKeywords ? historyKey : undefined);
  const displayedKeywords = historyKey ? history.keywords : recentKeywords;
  const removeLabel = ({
    "zh-CN": "删除搜索记录", en: "Remove recent search", es: "Eliminar búsqueda reciente",
    fr: "Supprimer la recherche récente", ko: "최근 검색 삭제", ru: "Удалить недавний запрос",
  } as Record<string, string>)[historyLocale] ?? "Remove recent search";
  const [
    isSubmitPressed,
    setIsSubmitPressed,
  ] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValue =
      value.trim();

    history.remember(normalizedValue);
    onChange(normalizedValue);
    onSearch(normalizedValue);
  }

  function handleRecentKeywordClick(keyword: string) {
    history.remember(keyword);
    onChange(keyword);
    onSearch(keyword);
  }

  return (
    <section
      className={styles.searchPanel}
      data-touch-feedback="neutral"
    >
      <form className={styles.searchRow} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="search"
          name="resource-search"
          enterKeyHint="search"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <button
          className={styles.searchButton}
          type="submit"
          data-pressed={
            isSubmitPressed
              ? "true"
              : "false"
          }
          onPointerDown={() => {
            setIsSubmitPressed(true);
          }}
          onPointerUp={() => {
            setIsSubmitPressed(false);
          }}
          onPointerCancel={() => {
            setIsSubmitPressed(false);
          }}
          onPointerLeave={() => {
            setIsSubmitPressed(false);
          }}
          onBlur={() => {
            setIsSubmitPressed(false);
          }}
        >
          {searchButtonText}
        </button>
      </form>

      {showRecentKeywords && displayedKeywords.length > 0 ? (
        <div className={styles.historyRow}>
          <span className={styles.historyLabel}>{recentLabel}</span>

          {displayedKeywords.map((keyword) => {
            const isActive =
              keywordNormalizer(value) === keywordNormalizer(keyword);

            return (
              <span key={keyword} className={historyKey ? styles.historyChip : undefined}>
                <button
                  className={`${styles.historyButton} ${
                    isActive ? styles.active : ""
                  }`}
                  type="button"
                  onClick={() => handleRecentKeywordClick(keyword)}
                >
                  {keyword}
                </button>
                {historyKey ? (
                  <button
                    className={styles.removeButton}
                    type="button"
                    aria-label={`${removeLabel}: ${keyword}`}
                    title={`${removeLabel}: ${keyword}`}
                    onClick={() => history.remove(keyword)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                ) : null}
              </span>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
