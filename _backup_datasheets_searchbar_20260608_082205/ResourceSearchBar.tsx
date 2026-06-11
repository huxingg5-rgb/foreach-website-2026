"use client";

/* =========================================================
   ResourceSearchBar.tsx
   恒永达官网｜资源中心通用搜索栏组件

   文件路径：
   components/resources/ResourceSearchBar.tsx

   作用：
   1. 统一资源中心搜索栏结构
   2. 搜索栏样式由 ResourceSearchBar.module.css 管理
   3. 新闻页、安装教程、材料兼容、接头替代查询等页面都可以复用
   4. 页面只传入 value / onChange / onSearch，不再重复写搜索栏样式

   注意：
   1. 不要在 news.css 里写搜索栏 input / button 样式
   2. 如果某个页面需要特殊样式，再通过 classNames 覆盖
========================================================= */

import type { FormEvent } from "react";

import styles from "./ResourceSearchBar.module.css";

/* =========================================================
   classNames 覆盖类型

   说明：
   1. 默认不需要传 classNames
   2. 组件会自动使用 ResourceSearchBar.module.css
   3. 如果后期某个页面确实需要特殊样式，可以单独覆盖
========================================================= */

export type ResourceSearchBarClassNames = {
  root?: string;
  form?: string;
  input?: string;
  button?: string;
  recent?: string;
  recentLabel?: string;
  recentButton?: string;
};

/* =========================================================
   组件参数类型
========================================================= */

export type ResourceSearchBarProps = {
  /* 当前输入框内容 */
  value: string;

  /* 输入框变化 */
  onChange: (value: string) => void;

  /* 点击搜索按钮或回车 */
  onSearch: (value: string) => void;

  /* 输入框占位文案 */
  placeholder?: string;

  /* 搜索按钮文案 */
  searchButtonText?: string;

  /* 最近搜索标题 */
  recentLabel?: string;

  /* 最近搜索关键词 */
  recentKeywords?: string[];

  /* 是否显示最近搜索 */
  showRecentKeywords?: boolean;

  /* 可选样式覆盖 */
  classNames?: ResourceSearchBarClassNames;
};

/* =========================================================
   统一关键词格式

   说明：
   用于判断最近搜索按钮是否处于选中状态。
========================================================= */

function normalizeKeyword(value: string) {
  return value.trim().toUpperCase();
}

/* =========================================================
   资源中心通用搜索栏组件
========================================================= */

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
    <section className={classNames.root ?? styles.searchPanel}>
      <form className={classNames.form ?? styles.searchRow} onSubmit={handleSubmit}>
        <input
          className={classNames.input ?? styles.searchInput}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />

        <button className={classNames.button ?? styles.searchButton} type="submit">
          {searchButtonText}
        </button>
      </form>

      {showRecentKeywords && recentKeywords.length > 0 && (
        <div className={classNames.recent ?? styles.historyRow}>
          <span className={classNames.recentLabel ?? styles.historyLabel}>
            {recentLabel}
          </span>

          {recentKeywords.map((keyword) => {
            const isActive = normalizeKeyword(value) === normalizeKeyword(keyword);

            return (
              <button
                key={keyword}
                className={`${classNames.recentButton ?? styles.historyButton} ${
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
      )}
    </section>
  );
} 