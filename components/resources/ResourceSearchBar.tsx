"use client";

/* =========================================================
   ResourceSearchBar.tsx
   恒永达官网｜资源中心通用搜索栏组件

   文件路径：
   components/resources/ResourceSearchBar.tsx

   作用：
   1. 抽出资源中心通用搜索栏
   2. 结构完全对齐接头替代查询页面
   3. 不新写搜索栏 CSS
   4. 默认复用接头替代查询的 frp-* 样式
   5. 搜索逻辑由父组件传入

   当前复用的接头替代查询 class：
   - frp-search-panel
   - frp-search-row
   - frp-search-input
   - frp-search-button
   - frp-history-row
   - frp-history-label
   - frp-history-button
========================================================= */

import type { FormEvent } from "react";

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
  /* 当前输入框的值 */
  value: string;

  /* 输入框变化 */
  onChange: (value: string) => void;

  /* 点击搜索按钮或回车 */
  onSearch: (value: string) => void;

  /* 搜索框占位文案 */
  placeholder?: string;

  /* 搜索按钮文案 */
  searchButtonText?: string;

  /* 最近搜索标题 */
  recentLabel?: string;

  /* 最近搜索关键词 */
  recentKeywords?: string[];

  /* 是否显示最近搜索 */
  showRecentKeywords?: boolean;

  /* 如果后续其他页面要覆盖 className，可以传入 */
  classNames?: ResourceSearchBarClassNames;
};

/* =========================================================
   统一搜索关键词
   说明：
   1. 和接头替代查询保持一致
   2. 最近搜索按钮选中状态需要忽略大小写
========================================================= */
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
  showRecentKeywords = true,
  classNames = {},
}: ResourceSearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  function handleRecentKeywordClick(keyword: string) {
    onChange(keyword);
    onSearch(keyword);
  }

  return (
    <section className={classNames.root ?? "frp-search-panel"}>
      <form
        className={classNames.form ?? "frp-search-row"}
        onSubmit={handleSubmit}
      >
        <input
          className={classNames.input ?? "frp-search-input"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <button
          className={classNames.button ?? "frp-search-button"}
          type="submit"
        >
          {searchButtonText}
        </button>
      </form>

      {showRecentKeywords && recentKeywords.length > 0 && (
        <div className={classNames.recent ?? "frp-history-row"}>
          <span className={classNames.recentLabel ?? "frp-history-label"}>
            {recentLabel}
          </span>

          {recentKeywords.map((keyword) => {
            const isActive =
              normalizeKeyword(value) === normalizeKeyword(keyword);

            return (
              <button
                key={keyword}
                className={`${classNames.recentButton ?? "frp-history-button"} ${
                  isActive ? "active" : ""
                }`}
                type="button"
                onClick={() => handleRecentKeywordClick(keyword)}
              >
                {keyword}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
} 