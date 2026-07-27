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

export type ResourceSearchBarClassNames = {
  root?: string;
  form?: string;
  input?: string;
  button?: string;
  recent?: string;
  recentLabel?: string;
  recentButton?: string;
};

export type ResourceSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchButtonText?: string;
  recentLabel?: string;
  recentKeywords?: string[];
  showRecentKeywords?: boolean;
  classNames?: ResourceSearchBarClassNames;
  context?: "default" | "product-selection";
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
  recentKeywords = ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],
  showRecentKeywords = true,
  classNames = {},
  context = "default",
}: ResourceSearchBarProps) {
  const [
    isSubmitPressed,
    setIsSubmitPressed,
  ] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValue =
      value.trim();

    onChange(normalizedValue);
    onSearch(normalizedValue);
  }

  function handleRecentKeywordClick(keyword: string) {
    onChange(keyword);
    onSearch(keyword);
  }

  const rootClassName = classNames.root ?? styles.searchPanel;
  const formClassName = classNames.form ?? styles.searchRow;
  const inputClassName = classNames.input ?? styles.searchInput;
  const buttonClassName = classNames.button ?? styles.searchButton;
  const recentClassName = classNames.recent ?? styles.historyRow;
  const recentLabelClassName = classNames.recentLabel ?? styles.historyLabel;
  const recentButtonClassName =
    classNames.recentButton ?? styles.historyButton;

  return (
    <section
      className={rootClassName}
      data-search-context={context}
      data-touch-feedback="neutral"
    >
      <form className={formClassName} onSubmit={handleSubmit}>
        <input
          className={inputClassName}
          type="search"
          name="resource-search"
          enterKeyHint="search"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <button
          className={buttonClassName}
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

      {showRecentKeywords && recentKeywords.length > 0 ? (
        <div className={recentClassName}>
          <span className={recentLabelClassName}>{recentLabel}</span>

          {recentKeywords.map((keyword) => {
            const isActive =
              normalizeKeyword(value) === normalizeKeyword(keyword);

            return (
              <button
                key={keyword}
                className={`${recentButtonClassName} ${
                  isActive ? styles.active : ""
                }`}
                type="button"
                onClick={() => handleRecentKeywordClick(keyword)}
              >
                {keyword}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
