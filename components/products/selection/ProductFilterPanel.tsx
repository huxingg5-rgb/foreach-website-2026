"use client";

import { useEffect, useState } from "react";

import type {
  ProductSelectionCategoryItem,
  ProductSelectionFilterGroup,
} from "./product-selection-ui.types";

type ProductFilterPanelProps = {
  activeCategory: ProductSelectionCategoryItem;
  activeProductTypeId?: string;
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
  isOptionDisabled?: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;

  onFilterChange: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => void;
  onResetFilters?: () => void;
};


/* BARBED_PORT_FILTER_GROUP_START */

const BARBED_PORT_FILTER_KEYS = [
  "filter02",
  "filter03",
  "filter04",
] as const;

const BARBED_PORT_SIZE_OPTIONS = [
  "1.6 mm",
  "2.4 mm",
  "3.2 mm",
  "4.0 mm",
  "4.8 mm",
  "6.4 mm",
  "7.9 mm",
  "9.5 mm",
  "12.7 mm",
  "16.0 mm",
];

function getBarbedPortCount(
  structure: string
) {
  const portCountMap: Record<
    string,
    number
  > = {
    "直通型": 2,
    "L型": 2,
    "T型": 3,
    "Y型": 3,
    "π型": 1,
    "十字型": 1,
    "倒刺堵头": 1,
  };

  return portCountMap[structure] || 3;
}

function BarbedPortFilterGroup({
  filterGroups,
  isOptionActive,
  isOptionDisabled,
  onFilterChange,
}: {
  filterGroups:
    ProductSelectionFilterGroup[];

  isOptionActive: (
    group:
      ProductSelectionFilterGroup,
    value: string
  ) => boolean;

  isOptionDisabled?: (
    group:
      ProductSelectionFilterGroup,
    value: string
  ) => boolean;

  onFilterChange: (
    group:
      ProductSelectionFilterGroup,
    value: string
  ) => void;
}) {
  const structureGroup =
    filterGroups.find(
      (group) =>
        group.key === "filter01"
    );

  const activeStructure =
    structureGroup?.options.find(
      (option) =>
        isOptionActive(
          structureGroup,
          option.value
        )
    )?.value || "";

  const enabledPortCount =
    getBarbedPortCount(
      activeStructure
    );

  return (
    <section
      className="filter-group barbed-port-filter-group is-mobile-open"
      data-barbed-port-filter="true"
    >
      <div className="barbed-port-heading-grid">
        <div>接管内径1</div>
        <div>接管内径2</div>
        <div>接管内径3</div>
      </div>

      <div className="barbed-port-columns">
        {BARBED_PORT_FILTER_KEYS.map(
          (filterKey, index) => {
            const portNumber =
              index + 1;

            const group =
              filterGroups.find(
                (item) =>
                  item.key === filterKey
              ) ??
              ({
                key: filterKey,
                title:
                  `接管内径${portNumber}`,
                inputType: "single",
                options: [],
              } as ProductSelectionFilterGroup);

            const portDisabled =
              portNumber >
              enabledPortCount;

            return (
              <div
                className={
                  portDisabled
                    ? "barbed-port-column is-disabled"
                    : "barbed-port-column"
                }
                key={filterKey}
              >
                <div className="barbed-port-options">
                  {BARBED_PORT_SIZE_OPTIONS.map(
                    (value) => {
                      const active =
                        isOptionActive(
                          group,
                          value
                        );

                      const disabled =
                        !active &&
                        (
                          portDisabled ||
                          Boolean(
                            isOptionDisabled?.(
                              group,
                              value
                            )
                          )
                        );

                      return (
                        <button
                          className={
                            [
                              "filter-option",
                              "is-single",
                              "barbed-port-option",
                              active
                                ? "active"
                                : "",
                              disabled
                                ? "is-disabled"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")
                          }
                          type="button"
                          key={value}
                          disabled={disabled}
                          aria-disabled={disabled}
                          onClick={() => {
                            if (disabled) {
                              return;
                            }

                            onFilterChange(
                              group,
                              value
                            );
                          }}
                        >
                          <span className="filter-check" />

                          <span className="barbed-port-option-label">
                            {value}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

/* BARBED_PORT_FILTER_GROUP_END */


export default function ProductFilterPanel({
  activeCategory,
  activeProductTypeId,
  filterGroups,
  mobileOpenFilterGroups,
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  isOptionDisabled,
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
    <aside
      className="filter-panel"
      data-category-id={activeCategory.id}
      data-product-type-id={activeProductTypeId || ""}>
      <div className="filter-panel-head">
        <h2>{activeCategory.label}</h2>
        <p>{activeCategory.description}</p>
      </div>

      {filterGroups.length > 0 ? (
        filterGroups.map((group) => {
          if (
            activeProductTypeId === "barbed-fittings" &&
            group.key === "filter02"
          ) {
            const isBarbedPortGroupOpen =
              Boolean(
                mobileOpenFilterGroups?.[
                  group.key
                ]
              );

            return (
              <div
                className={[
                  "barbed-port-filter-wrapper",
                  isBarbedPortGroupOpen
                    ? "is-mobile-open"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-barbed-filter-group="ports"
                key="barbed-port-filter-group"
              >
                <button
                  className="filter-group-trigger barbed-port-mobile-trigger"
                  type="button"
                  onClick={() =>
                    onToggleMobileGroup?.(
                      group.key
                    )
                  }
                  aria-expanded={
                    isBarbedPortGroupOpen
                  }
                >
                  <span>接管内径</span>

                  <span
                    className="filter-group-symbol"
                    aria-hidden="true"
                  >
                    {isBarbedPortGroupOpen
                      ? "−"
                      : "+"}
                  </span>
                </button>

                <div className="barbed-port-filter-body">
                  <BarbedPortFilterGroup
                    filterGroups={filterGroups}
                    isOptionActive={isOptionActive}
                    isOptionDisabled={isOptionDisabled}
                    onFilterChange={(
                      targetGroup,
                      value
                    ) => {
                      onFilterChange(
                        targetGroup,
                        value
                      );

                      if (
                        isBarbedPortGroupOpen
                      ) {
                        onToggleMobileGroup?.(
                          group.key
                        );
                      }
                    }}
                  />
                </div>
              </div>
            );
          }

          if (
            activeProductTypeId === "barbed-fittings" &&
            (
              group.key === "filter03" ||
              group.key === "filter04"
            )
          ) {
            return null;
          }

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
            (
              activeProductTypeId ===
                "thread-to-barbed-fittings"
                ? group.inputType === "single"
                : group.key === "filter01"
            );

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
                    /*
           * QUICK_CONNECT_TWO_COLUMN_FILTERS
           *
           * 继续使用现有 filter-options two 样式，
           * 不新建快插接头专属CSS。
           */
          const quickConnectTwoColumnTitles = [
            "阀门配置",
            "Valve Configuration",
            "形状",
            "Shape",
            "外壳材质",
            "Housing Material",
            "密封圈材质",
            "Seal Material",
          ];

          const isThreadToBarbed =
            activeProductTypeId ===
            "thread-to-barbed-fittings";

          /*
           * LUER_FITTING_FILTER_LAYOUT_START
           *
           * 鲁尔接头：
           * filter01 产品类型文字较长，每项独占一行；
           * filter02 产品系列使用两列。
           */
          const isLuerFitting =
            activeProductTypeId ===
            "luer-fittings";

/*
 * FEMALE_THREAD_FILTER_LAYOUT_START
 *
 * 连接结构文字较长，使用一列；
 * 其余工程筛选项使用两列。
 */
          const isFemaleThreadAdapter =
            activeProductTypeId ===
            "female-thread-adapters";

          const inferredShouldUseTwoColumns =
            isFemaleThreadAdapter &&
            group.key === "filter01"
              ? false
              : isFemaleThreadAdapter &&
                  (
                    group.key === "filter02" ||
                    group.key === "filter03" ||
                    group.key === "filter04" ||
                    group.key === "filter05"
                  )
                ? true
                :
            isLuerFitting &&
            group.key === "filter01"
              ? false
              : isLuerFitting &&
                  (
                    group.key === "filter02" ||
                    group.key === "filter05"
                  )
                ? true
                :
            isThreadToBarbed &&
            group.key === "filter02"
              ? false
              : isThreadToBarbed &&
                  group.key === "filter01"
                ? true
                : group.key === "productType" ||
                  group.key === "filter02" ||
                  group.key === "filter03" ||
                  quickConnectTwoColumnTitles.includes(
                    group.title
                  ) ||
                  group.options.length > 4;

          /* FILTER_PANEL_RESPECT_GROUP_LAYOUT_START */

          const shouldUseTwoColumns =
            group.layout === "two"
              ? true
              : group.layout === "one"
                ? false
                : inferredShouldUseTwoColumns;

          /* FILTER_PANEL_RESPECT_GROUP_LAYOUT_END */

          const filterOptionsClass = `filter-options${
            shouldUseTwoColumns ? " two" : " one"
          }`;

          /* MOBILE_FILTER_COLLAPSE_V2_START */

          /*
           * 接头产品种类继续使用原有独立状态。
           * 其他筛选组使用手机端展开状态。
           * PC端由CSS保持正常显示。
           */
          const isGroupOpen =
            isCollapsibleProductType
              ? isFittingProductTypeOpen
              : Boolean(
                  mobileOpenFilterGroups?.[
                    group.key
                  ]
                );

          /* MOBILE_FILTER_COLLAPSE_V2_END */

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
            if (isCollapsibleProductType) {
              setIsFittingProductTypeOpen(
                (current) => !current
              );

              return;
            }

            onToggleMobileGroup?.(
              group.key
            );
          };

          /*
           * THREAD_TO_BARBED_GENERIC_DISABLED_RENDER
           *
           * 普通筛选按钮支持：
           * - 灰色禁用状态
           * - disabled 属性
           * - aria-disabled
           * - 禁止触发筛选事件
           */
          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(
                  group,
                  option.value
                );

                const disabled =
                  !active &&
                  Boolean(
                    isOptionDisabled?.(
                      group,
                      option.value
                    )
                  );

                return (
                  <button
                    className={[
                      "filter-option",
                      optionTypeClass,
                      active ? "active" : "",
                      disabled
                        ? "is-disabled"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    key={option.value}
                    disabled={disabled}
                    aria-disabled={disabled}
                    onClick={() => {
                      if (disabled) {
                        return;
                      }

                      onFilterChange(
                        group,
                        option.value
                      );

                      /*
                       * 手机端选择任意筛选项后，
                       * 自动收起当前筛选组。
                       */
                      if (
                        isCollapsibleProductType
                      ) {
                        setIsFittingProductTypeOpen(
                          false
                        );
                      }
                      else if (
                        mobileOpenFilterGroups?.[
                          group.key
                        ]
                      ) {
                        onToggleMobileGroup?.(
                          group.key
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

                {isCollapsibleProductType ||
                onToggleMobileGroup ? (
                  <span
                    className={
                      isCollapsibleProductType
                        ? "filter-group-symbol"
                        : "filter-group-symbol mobile-only-filter-symbol"
                    }
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

              {renderOptions()}
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

