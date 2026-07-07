"use client";

import { useState } from "react";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  filterGroups: ProductSelectionFilterGroup[];
  mobileOpenFilterGroups?: Record<string, boolean>;
  emptyText: string;
  resetButtonText?: string;
  submitButtonText?: string;
  onToggleMobileGroup?: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  mobileOpenFilterGroups = {},
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 说明：
   * 1. 桌面端只让“产品类型”默认折叠
   * 2. 手机端所有筛选组都使用 is-mobile-open 控制展开
   * 3. 产品类型使用本组件内部状态控制，因为它在桌面端也需要折叠
   */
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

  return (
    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          const isProductTypeGroup = group.key === "productType";

          /*
           * 单选 / 多选说明：
           * productType：产品类型，单选，圆形
           * filter01：产品系列，单选，圆形
           * 其他筛选项：量程、材质等，多选，方形
           */
          const isSingleSelectGroup =
            group.key === "productType" || group.key === "filter01";

          const activeOption = group.options.find((option) =>
            isOptionActive(group, option.value)
          );

          const optionTypeClass = isSingleSelectGroup
            ? "is-single"
            : "is-multi";

          /*
           * 筛选项列数说明：
           * 产品系列名称较长，保持一列
           * 产品类型、电机类型、流量、耐压使用两列
           */
          const shouldUseTwoColumns =
            group.key === "productType" ||
            group.key === "filter02" ||
            group.key === "filter03" ||
            group.key === "filter04" ||
            group.options.length > 4;

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /*
           * 手机端展开状态：
           * 1. 产品类型使用 isProductTypeOpen
           * 2. 其他筛选组使用父组件传入的 mobileOpenFilterGroups
           */
          const isMobileOpen = isProductTypeGroup
            ? isProductTypeOpen
            : Boolean(mobileOpenFilterGroups[group.key]);

          const groupClassName = `filter-group${
            isProductTypeGroup ? " product-type-filter-group" : ""
          }${isMobileOpen ? " is-mobile-open" : ""}`;

          const handleToggleGroup = () => {
            if (isProductTypeGroup) {
              setIsProductTypeOpen((current) => !current);
              return;
            }

            onToggleMobileGroup?.(group.key);
          };

          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(group, option.value);

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => onFilterChange(group, option.value)}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (
            <section className={groupClassName} key={group.key}>
              <button
                className={`filter-group-trigger${
                  isProductTypeGroup ? " product-type-filter-toggle" : ""
                }`}
                type="button"
                onClick={handleToggleGroup}
                aria-expanded={isMobileOpen}
              >
                <span>{group.title}</span>
                <span className="filter-group-symbol" aria-hidden="true">
                  {isMobileOpen ? "-" : "+"}
                </span>
              </button>

              {isProductTypeGroup && !isProductTypeOpen && activeOption ? (
                <div className="product-type-current-option">
                  <button
                    className="filter-option is-single active"
                    type="button"
                    onClick={() => setIsProductTypeOpen(true)}
                  >
                    <span className="filter-check" />
                    <span>当前：{activeOption.label}</span>
                  </button>
                </div>
              ) : null}

              {isProductTypeGroup ? (
                isProductTypeOpen ? (
                  renderOptions()
                ) : null
              ) : (
                renderOptions()
              )}
            </section>
          );
        })
      ) : (
        <div className="filter-empty">{emptyText}</div>
      )}
    </aside>
  );
}
