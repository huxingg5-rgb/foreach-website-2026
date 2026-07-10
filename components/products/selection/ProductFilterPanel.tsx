"use client";

import { useEffect, useState } from "react";

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
  onToggleMobileGroup?: (
    key: ProductSelectionFilterGroup["key"]
  ) => void;
  isOptionActive: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;
  onFilterChange: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => void;
  onResetFilters?: () => void;
};

export default function ProductFilterPanel({
  activeCategory,
  filterGroups,
  emptyText,
  isOptionActive,
  onFilterChange,
}: ProductFilterPanelProps) {
  /*
   * 只有接头系列中的第一个“产品种类”允许折叠。
   * 其余所有筛选组始终展开。
   */
  const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
    useState(false);

  /*
   * 切换顶部产品大类后，
   * 接头系列的产品种类恢复为收起状态。
   */
  useEffect(() => {
    setIsFittingProductTypeOpen(false);
  }, [activeCategory.id]);

  return (
    <aside className="filter-panel">
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          const isProductTypeGroup =
            group.key === "productType";

          /*
           * 只有这一组折叠：
           * 接头系列 + 第一个产品种类。
           */
          const isCollapsibleProductType =
            activeCategory.id === "fittings" &&
            isProductTypeGroup;

          const isSingleSelectGroup =
            group.key === "productType" ||
            group.key === "filter01";

          const activeOption = group.options.find(
            (option) =>
              isOptionActive(group, option.value)
          );

          const optionTypeClass = isSingleSelectGroup
            ? "is-single"
            : "is-multi";

          /*
           * 保留原有列数逻辑。
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
           * 只有接头的产品种类使用状态控制。
           * 其他所有组始终展开。
           */
          const isGroupOpen = isCollapsibleProductType
            ? isFittingProductTypeOpen
            : true;

          const groupClassName = `filter-group${
            isProductTypeGroup
              ? " product-type-filter-group"
              : ""
          }${
            isCollapsibleProductType
              ? " fittings-product-type-filter-group"
              : ""
          }${isGroupOpen ? " is-mobile-open" : ""}`;

          const handleToggleGroup = () => {
            if (!isCollapsibleProductType) {
              return;
            }

            setIsFittingProductTypeOpen(
              (current) => !current
            );
          };

          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(
                  group,
                  option.value
                );

                return (
                  <button
                    className={`filter-option ${optionTypeClass}${
                      active ? " active" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() => {
                      onFilterChange(
                        group,
                        option.value
                      );

                      /*
                       * 选择接头产品种类后自动收起。
                       */
                      if (isCollapsibleProductType) {
                        setIsFittingProductTypeOpen(
                          false
                        );
                      }
                    }}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (
            <section
              className={groupClassName}
              key={group.key}
            >
              <button
                className={`filter-group-trigger${
                  isCollapsibleProductType
                    ? " product-type-filter-toggle"
                    : ""
                }`}
                type="button"
                onClick={handleToggleGroup}
                aria-expanded={isGroupOpen}
              >
                <span>{group.title}</span>

                {isCollapsibleProductType ? (
                  <span
                    className="filter-group-symbol"
                    aria-hidden="true"
                  >
                    {isGroupOpen ? "−" : "+"}
                  </span>
                ) : null}
              </button>

              {isCollapsibleProductType &&
              !isFittingProductTypeOpen &&
              activeOption ? (
                <div className="product-type-current-option">
                  <button
                    className="filter-option is-single active"
                    type="button"
                    onClick={() =>
                      setIsFittingProductTypeOpen(
                        true
                      )
                    }
                  >
                    <span className="filter-check" />
                    <span>
                      当前：{activeOption.label}
                    </span>
                  </button>
                </div>
              ) : null}

              {isGroupOpen ? renderOptions() : null}
            </section>
          );
        })
      ) : (
        <div className="filter-empty">
          {emptyText}
        </div>
      )}
    </aside>
  );
}