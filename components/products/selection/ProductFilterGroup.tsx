"use client";

import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";

type ProductFilterGroupProps = {
  group: ProductSelectionFilterGroup;
  activeProductTypeId?: string;
  mobileOpen: boolean;
  onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
  isOptionActive: (group: ProductSelectionFilterGroup, value: string) => boolean;
  onFilterChange: (group: ProductSelectionFilterGroup, value: string) => void;
};

function getLayoutClass(
  group: ProductSelectionFilterGroup,
  activeProductTypeId?: string
) {
  /*
   * 螺纹转倒刺接头专属布局：
   *
   * filter02 = 密封方式，每个选项占一整行；
   * filter01 = 连接结构，两个选项一排。
   */
  if (
    activeProductTypeId ===
    "thread-to-barbed-fittings"
  ) {
    if (group.key === "filter02") {
      return "one";
    }

    if (group.key === "filter01") {
      return "two";
    }
  }

  /*
   * 其他产品继续保持原来的公共布局。
   */
  if (
    group.key === "productType" ||
    group.key === "filter01"
  ) {
    return "one";
  }

  return "two";
}

export default function ProductFilterGroup({
  group,
  activeProductTypeId,
  mobileOpen,
  onToggleMobileGroup,
  isOptionActive,
  onFilterChange,
}: ProductFilterGroupProps) {
  const modeClass = group.inputType === "single" ? "is-single" : "is-multi";
  const layoutClass = getLayoutClass(
    group,
    activeProductTypeId
  );

  return (
    <div
      className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
        mobileOpen ? "is-mobile-open" : ""
      }`}
      data-filter-key={group.key}
      data-filter-layout={layoutClass}
      key={group.key}
    >
      <button
        className="filter-group-title filter-group-trigger"
        type="button"
        onClick={() => onToggleMobileGroup(group.key)}
      >
        <span>{group.title}</span>
        <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
      </button>

      <div className={`filter-options ${layoutClass}`}>
        {group.options.map((option) => {
          const active = isOptionActive(group, option.value);

          return (
            <button
              className={`filter-option filter-btn ${modeClass} ${
                active ? "active" : ""
              }`}
              type="button"
              key={option.value}
              onClick={() => onFilterChange(group, option.value)}
            >
              <span className="filter-check filter-control" />
              <span className="filter-option-text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

