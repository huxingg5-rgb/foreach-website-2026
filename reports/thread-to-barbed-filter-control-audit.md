# 螺纹转倒刺接头筛选控件检查

生成时间：2026/7/13 11:58:29

## 一、目标交互

- 密封方式：圆形单选
- 密封方式选项：两个一排
- 连接结构：方形多选
- 螺纹规格：方形多选
- 接管内径：方形多选
- 材质：方形多选
- 颜色：方形多选

## 二、命中产品类型的文件

- data/products/selection/product-route-map.ts
- data/products/selection/thread-to-barbed-detail-route-map.generated.ts
- data/products/selection/thread-to-barbed-fitting-selection.generated.ts
- data/products/selection/thread-to-barbed-fitting-selection.summary.json
- components/products/selection/ProductFilterGroup.tsx
- components/products/selection/ProductFilterPanel.tsx
- components/products/selection/ProductSelectionClient.tsx

## 三、当前筛选标签配置

### data/products/selection/thread-to-barbed-fitting-selection.generated.ts｜threadToBarbedFittingFilterLabels

```json
[
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter01",
    "label": {
      "zh": "连接结构",
      "en": "Connection Structure",
      "es": "Connection Structure",
      "fr": "Connection Structure",
      "ko": "Connection Structure",
      "ru": "Connection Structure"
    },
    "inputType": "single",
    "sortOrder": 20,
    "visible": true
  },
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter02",
    "label": {
      "zh": "密封方式",
      "en": "Sealing Method",
      "es": "Sealing Method",
      "fr": "Sealing Method",
      "ko": "Sealing Method",
      "ru": "Sealing Method"
    },
    "inputType": "single",
    "sortOrder": 10,
    "visible": true
  },
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter03",
    "label": {
      "zh": "螺纹规格",
      "en": "Thread",
      "es": "Thread",
      "fr": "Thread",
      "ko": "Thread",
      "ru": "Thread"
    },
    "inputType": "single",
    "sortOrder": 30,
    "visible": true
  },
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter04",
    "label": {
      "zh": "接管内径",
      "en": "Tubing ID",
      "es": "Tubing ID",
      "fr": "Tubing ID",
      "ko": "Tubing ID",
      "ru": "Tubing ID"
    },
    "inputType": "single",
    "sortOrder": 40,
    "visible": true
  },
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter05",
    "label": {
      "zh": "材质",
      "en": "Material",
      "es": "Material",
      "fr": "Material",
      "ko": "Material",
      "ru": "Material"
    },
    "inputType": "multiple",
    "sortOrder": 50,
    "visible": true
  },
  {
    "categoryId": "fittings",
    "productTypeId": "thread-to-barbed-fittings",
    "filterKey": "filter06",
    "label": {
      "zh": "颜色",
      "en": "Color",
      "es": "Color",
      "fr": "Color",
      "ko": "Color",
      "ru": "Color"
    },
    "inputType": "multiple",
    "sortOrder": 60,
    "visible": true
  }
]
```

## 四、ProductSelectionClient筛选组生成逻辑

### components/products/selection/ProductSelectionClient.tsx

#### 第237行附近

```tsx
  "filter05",
  "filter06",
  "filter07",
  "filter08",
  "filter09",
];

const FITTING_PRODUCT_TYPE_ORDER_START = true;

const FITTING_PRODUCT_TYPE_ORDER = [
  "hard-tube-fittings",
  "barbed-fittings",
  "thread-to-barbed-fittings",
  "luer-fittings",
  "quick-connect-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
] as const;

const FITTING_PRODUCT_TYPE_ORDER_MAP =
  new Map<string, number>(
    FITTING_PRODUCT_TYPE_ORDER.map(
      (productTypeId, index) => [
        productTypeId,
        index,
      ]
    )
  );

/* FITTING_PRODUCT_TYPE_ORDER_END */

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",
    searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
    searchButton: "搜索",
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",
    submitRequirement: "提交需求",
    detailButton: "查看详情",
```

#### 第1283行附近

```tsx

    const rawExistingHref =
      String(
        (product as any)
          ?.detailHref ||
        (product as any)
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
```

#### 第1285行附近

```tsx
      String(
        (product as any)
          ?.detailHref ||
        (product as any)
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
          (product as any)
            ?.foreachModel ||
```

#### 第1342行附近

```tsx
          productCode
        ] ||
        threadToBarbedDetailHrefByModel[
          model
        ];

      if (matchedHref) {
        return matchedHref;
      }

      return (
        rawExistingHref ||
        "/products/fittings/thread-to-barbed-fittings"
      );
    }
  }

  /* THREAD_TO_BARBED_DETAIL_HREF_END */

  /* BULKHEAD_BARBED_DETAIL_HREF_START */

  /*
   * 穿板倒刺接头与六角螺母具体型号详情链接。
   *
   * 选型卡片不能回退到通用动态页面
   * /products/[category]/[slug]，
   * 必须进入本系列的具体型号详情路由。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawSourceType =
      String(
        (product as any)?.sourceType ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.productHref ||
```

#### 第2213行附近

```tsx
    return currentOrder - nextOrder;
  });
}


/*
 * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 *
 * 螺纹转倒刺接头：
 * filter02 = 密封方式，每项独占一行
 * filter01 = 连接结构，两个一排
 */
function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {

  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

```

#### 第2251行附近

```tsx
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

  if (
    filterKey ===
    "filter02"
  ) {
    return "one";
  }

  if (
    filterKey ===
    "filter01"
  ) {
    return "two";
  }

  return undefined;
}

/* =========================================================
   FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START

   左侧只显示 filters 一个入口，
   但该入口同时匹配：
   - filters
   - check-valves
   ========================================================= */

const FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID =
  "filters";
```

#### 第2555行附近

```tsx
  }, [activeProductTypeId]);

  const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
    const groups: ProductSelectionFilterGroup[] = [];

    if (productTypeOptions.length > 0) {
      groups.push({
        key: "productType",
        title:
          activeCategoryId === "fittings" && locale === "zh"
            ? "产品种类"
            : pageText.productTypeLabel,
        inputType: "single",
        options: productTypeOptions,
      });
    }

    activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_START */

      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
```

#### 第2658行附近

```tsx
        currentTypeProducts as any,

        (label as any).filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: (label as any).filterKey,
        title: getText(locale, label.label, (label as any).filterKey),
        inputType: label.inputType,
        layout: getProductFilterGroupLayout(
          activeProductTypeId,
          (label as any).filterKey as SelectionFilterKey
        ),
        options: sortHardTubeFilterOptionsForDisplay(
          activeProductTypeId,
          (label as any).filterKey,
          options.map((option) => ({
            ...option,
            label: getLocalizedFilterOptionLabel(
              option.label || option.value,
              locale
            ),
          }))
        ),
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (
        !matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
```

#### 第2659行附近

```tsx

        (label as any).filterKey,
        selectedFilters,
        activeProductTypeId
      );

      if (options.length === 0) return;

      groups.push({
        key: (label as any).filterKey,
        title: getText(locale, label.label, (label as any).filterKey),
        inputType: label.inputType,
        layout: getProductFilterGroupLayout(
          activeProductTypeId,
          (label as any).filterKey as SelectionFilterKey
        ),
        options: sortHardTubeFilterOptionsForDisplay(
          activeProductTypeId,
          (label as any).filterKey,
          options.map((option) => ({
            ...option,
            label: getLocalizedFilterOptionLabel(
              option.label || option.value,
              locale
            ),
          }))
        ),
      });
    });

    return groups;
  }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);

  const matchedProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return categoryProducts.filter((product) => {
      if (
        !matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
          )
```

#### 第3082行附近

```tsx
    /*
     * 说明：
     * 普通筛选项仍然走前端筛选，不改 URL。
     */
    setSelectedFilters((current) => {
      const next: SelectedFilterMap = {
        ...current,
      };

      const values = new Set(next[filterKey] || []);
      const shouldSelect = !values.has(value);

      if (group.inputType === "single") {
        values.clear();
      }

      if (shouldSelect) {
        values.add(value);
      } else {
        values.delete(value);
      }

      if (values.size === 0) {
        delete next[filterKey];
      } else {
        next[filterKey] = values;
      }

      return next;
    });
  }

/* BARBED_PORT_OPTION_DISABLED_START */


function isBarbedPortOptionDisabled(

  group: ProductSelectionFilterGroup,

  value: string

) {

  if (

```

#### 第3361行附近

```tsx

/* BARBED_PORT_OPTION_DISABLED_END */

/* THREAD_TO_BARBED_OPTION_DISABLED_START */

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
   * 5. 已选中的选项保持可点击，允许取消。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }

    const candidateKey =
      group.key as SelectionFilterKey;

```

#### 第3718行附近

```tsx
          );
        }
      );

    return !hasMatchingProduct;
  }

  /* LUER_FILTER_OPTION_DISABLED_END */


  if (
    activeProductTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return false;
  }

  if (
    !FILTER_KEYS.includes(
      group.key as SelectionFilterKey
    )
  ) {
    return false;
  }

  const candidateKey =
    group.key as SelectionFilterKey;

  /*
   * 当前已选项不能禁用，
   * 用户需要能够再次点击取消。
   */
  if (
    selectedFilters[
      candidateKey
    ]?.has(value)
  ) {
    return false;
  }

  /*
   * 查找是否至少存在一个真实型号：
   *
   * - 当前候选字段等于 value；
   * - 同时满足其他已选筛选条件。
```

## 五、ProductFilterPanel控件渲染逻辑

### components/products/selection/ProductFilterPanel.tsx

#### 第151行附近

```tsx
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
```

#### 第194行附近

```tsx
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
```

#### 第328行附近

```tsx
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
```

#### 第415行附近

```tsx
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
```

#### 第416行附近

```tsx
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
```

#### 第418行附近

```tsx
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
```

#### 第425行附近

```tsx
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

          /*
           * THREAD_TO_BARBED_GENERIC_DISABLED_RENDER
           *
           * 普通筛选按钮支持：
           * - 灰色禁用状态
           * - disabled 属性
```

#### 第560行附近

```tsx
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


```

## 六、产品类型相关上下文

### data/products/selection/product-route-map.ts

#### 第157行附近

```ts

        "hard-tube-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "hard-tube-fittings",
      label: "硬管接头",
      title: "硬管接头 | FOREACH",
      description:
        "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
    },

    "barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
```

#### 第167行附近

```ts

    "barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
```

#### 第170行附近

```ts
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
      description:
        "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
    },
```

#### 第173行附近

```ts
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
      description:
        "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
    },

    "quick-connect-fittings": {
      category: "fittings",
```

#### 第177行附近

```ts

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
      description:
        "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
    },

    "quick-connect-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "quick-connect-fittings",
      label: "快插接头",
      title: "快插接头 | FOREACH",
```

#### 第217行附近

```ts

    "bulkhead-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "bulkhead-barbed-fittings",
      label: "穿板倒刺接头",
      title: "穿板倒刺接头 | FOREACH",
      description:
        "穿板倒刺接头系列包含PMB穿板倒刺接头和PMBSN六角螺母，可根据产品结构、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "filters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "filters",
      label: "过滤器与单向阀",
      title: "过滤器与单向阀 | FOREACH",
      description:
        "过滤器用于液路中的颗粒拦截与流体净化，单向阀用于控制流体单向流动并降低回流风险。",
    },


  },

  series: {
    "ea-standard-piston-pumps": {
      category: "pumps",
```

#### 第502行附近

```ts

export const productTypeIntroMap: Record<string, ProductTypeIntroEntry> = {
  "pumps:plunger-pump": {
    categoryId: "pumps",
    productTypeId: "plunger-pump",
    title: "柱塞泵系列",
    paragraphs: [
      "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
      "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型，并支持与电磁阀、控制器、光耦反馈及泵阀一体化方案组合使用。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
      src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
      alt: "FOREACH 柱塞泵系列产品图，用于IVD、生命科学和实验室自动化设备中的精密液体处理"
    }
  },

  "pumps:diaphragm-pump": {
    categoryId: "pumps",
    productTypeId: "diaphragm-pump",
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
      "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
    ],
    image: {
```

#### 第517行附近

```ts
  },

  "pumps:diaphragm-pump": {
    categoryId: "pumps",
    productTypeId: "diaphragm-pump",
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
      "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路"
    }
  },

  "pumps:pipette-pump": {
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
      "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
    ],
    image: {
```

### data/products/selection/thread-to-barbed-detail-route-map.generated.ts

#### 第5行附近

```ts
/*
 * 自动生成：螺纹转倒刺接头详情路由映射
 *
 * 数据源：
 * data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
 *
 * 不要手工修改。
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
```

#### 第13行附近

```ts
 * data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
 *
 * 不要手工修改。
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
```

#### 第14行附近

```ts
 *
 * 不要手工修改。
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
```

#### 第15行附近

```ts
 * 不要手工修改。
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
```

#### 第16行附近

```ts
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
```

#### 第17行附近

```ts

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
```

#### 第18行附近

```ts
export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
```

#### 第19行附近

```ts
  Record<string, string> =
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
```

#### 第20行附近

```ts
{
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
```

#### 第21行附近

```ts
  "809001": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pv-n",
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
```

#### 第22行附近

```ts
  "809002": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
```

#### 第23行附近

```ts
  "809003": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-n",
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
```

#### 第24行附近

```ts
  "809004": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-pp-w",
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
```

#### 第25行附近

```ts
  "809005": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pv-n",
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
```

#### 第26行附近

```ts
  "809006": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-ac-b",
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
```

#### 第27行附近

```ts
  "809007": "/products/fittings/thread-to-barbed-fittings/sb-u28-24-pp-n",
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
```

#### 第28行附近

```ts
  "809008": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pv-n",
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
```

#### 第29行附近

```ts
  "809009": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-ac-b",
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
```

#### 第30行附近

```ts
  "809010": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-n",
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
```

#### 第31行附近

```ts
  "809011": "/products/fittings/thread-to-barbed-fittings/sb-u28-32-pp-w",
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
```

#### 第32行附近

```ts
  "809012": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pv-n",
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
```

#### 第33行附近

```ts
  "809013": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
```

#### 第34行附近

```ts
  "809014": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-pp-n",
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
```

#### 第35行附近

```ts
  "809015": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pv-n",
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
```

#### 第36行附近

```ts
  "809017": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-n",
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
```

#### 第37行附近

```ts
  "809018": "/products/fittings/thread-to-barbed-fittings/sb-m6-16-pp-w",
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
```

#### 第38行附近

```ts
  "809019": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pv-n",
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
```

#### 第39行附近

```ts
  "809020": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
```

#### 第40行附近

```ts
  "809021": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-pp-n",
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
```

#### 第41行附近

```ts
  "809022": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pv-n",
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
```

#### 第42行附近

```ts
  "809024": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-n",
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
```

#### 第43行附近

```ts
  "809025": "/products/fittings/thread-to-barbed-fittings/sb-m6-32-pp-w",
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
```

#### 第44行附近

```ts
  "809026": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pv-n",
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
```

#### 第45行附近

```ts
  "809027": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
```

#### 第46行附近

```ts
  "809028": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-pp-n",
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
```

#### 第47行附近

```ts
  "809034": "/products/fittings/thread-to-barbed-fittings/sa-g1-8-64c-pp-n-o-ring-809034",
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  "809472": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
```

#### 第48行附近

```ts
  "809268": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pp-n",
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  "809472": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
  "809473": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-48c-pp-n",
```

#### 第49行附近

```ts
  "809269": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  "809472": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
  "809473": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-48c-pp-n",
  "809474": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-64c-pp-n",
```

#### 第50行附近

```ts
  "809292": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  "809472": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
  "809473": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-48c-pp-n",
  "809474": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-64c-pp-n",
  "809475": "/products/fittings/thread-to-barbed-fittings/sal-1-8npt-64d-pp-n",
```

#### 第51行附近

```ts
  "809293": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
  "809301": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "809302": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "809303": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "809323": "/products/fittings/thread-to-barbed-fittings/sa-u32-24f-pa-w",
  "809339": "/products/fittings/thread-to-barbed-fittings/sa-u32-16f-pa-w",
  "809340": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "809382": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "809383": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "809384": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "809385": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "809386": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "809387": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "809388": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "809389": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "809465": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "809466": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "809467": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "809468": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "809469": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "809470": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-24c-pp-n",
  "809471": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-32c-pp-n",
  "809472": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-40c-pp-n",
  "809473": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-48c-pp-n",
  "809474": "/products/fittings/thread-to-barbed-fittings/sa-1-8npt-64c-pp-n",
  "809475": "/products/fittings/thread-to-barbed-fittings/sal-1-8npt-64d-pp-n",
  "809476": "/products/fittings/thread-to-barbed-fittings/sa-1-4npt-32d-pp-n",
```

### data/products/selection/thread-to-barbed-fitting-selection.generated.ts

#### 第5行附近

```ts
/* =========================================================
   thread-to-barbed-fitting-selection.generated.ts
   来源：05_螺纹转倒刺接头
   数量：101
   筛选顺序：密封方式 → 连接结构 → 螺纹规格 → 接管内径 → 材质 → 颜色
   ========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const threadToBarbedFittingSelectionProducts =
[
  {
    "productId": "809268",
    "productCode": "809268",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
```

#### 第22行附近

```ts
export const threadToBarbedFittingSelectionProducts =
[
  {
    "productId": "809268",
    "productCode": "809268",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-24F-PP-N",
    "cardTitle": {
      "zh": "SA-U32-24F-PP-N",
      "en": "SA-U32-24F-PP-N",
      "es": "SA-U32-24F-PP-N",
      "fr": "SA-U32-24F-PP-N",
      "ko": "SA-U32-24F-PP-N",
      "ru": "SA-U32-24F-PP-N"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转2.4 mm内径软管\nPP材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
```

#### 第37行附近

```ts
      "zh": "SA-U32-24F-PP-N",
      "en": "SA-U32-24F-PP-N",
      "es": "SA-U32-24F-PP-N",
      "fr": "SA-U32-24F-PP-N",
      "ko": "SA-U32-24F-PP-N",
      "ru": "SA-U32-24F-PP-N"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转2.4 mm内径软管\nPP材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material",
      "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPP material"
    },
    "filters": {
      "filter01": "直通型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "2.4 mm",
      "filter05": "PP",
      "filter06": "本色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第60行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 1,
    "sortOrder": 20000,
    "searchKeywords": {
      "zh": "SA-U32-24F-PP-N 809268 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 2.4 mm PP 本色",
      "en": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "es": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "fr": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "ko": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "ru": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural"
    },
    "foreachModel": "SA-U32-24F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
```

#### 第61行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 1,
    "sortOrder": 20000,
    "searchKeywords": {
      "zh": "SA-U32-24F-PP-N 809268 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 2.4 mm PP 本色",
      "en": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "es": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "fr": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "ko": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural",
      "ru": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural"
    },
    "foreachModel": "SA-U32-24F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第79行附近

```ts
      "ru": "SA-U32-24F-PP-N 809268 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PP Natural"
    },
    "foreachModel": "SA-U32-24F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809269",
    "productCode": "809269",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-32F-PP-N",
    "cardTitle": {
      "zh": "SA-U32-32F-PP-N",
      "en": "SA-U32-32F-PP-N",
      "es": "SA-U32-32F-PP-N",
      "fr": "SA-U32-32F-PP-N",
```

#### 第87行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809269",
    "productCode": "809269",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-32F-PP-N",
    "cardTitle": {
      "zh": "SA-U32-32F-PP-N",
      "en": "SA-U32-32F-PP-N",
      "es": "SA-U32-32F-PP-N",
      "fr": "SA-U32-32F-PP-N",
      "ko": "SA-U32-32F-PP-N",
      "ru": "SA-U32-32F-PP-N"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPP材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
```

#### 第102行附近

```ts
      "zh": "SA-U32-32F-PP-N",
      "en": "SA-U32-32F-PP-N",
      "es": "SA-U32-32F-PP-N",
      "fr": "SA-U32-32F-PP-N",
      "ko": "SA-U32-32F-PP-N",
      "ru": "SA-U32-32F-PP-N"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPP材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material",
      "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPP material"
    },
    "filters": {
      "filter01": "直通型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "3.2 mm",
      "filter05": "PP",
      "filter06": "本色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第124行附近

```ts
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 2,
    "sortOrder": 20001,
    "searchKeywords": {
      "zh": "SA-U32-32F-PP-N 809269 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PP 本色",
      "en": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "es": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "fr": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ko": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ru": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural"
    },
    "foreachModel": "SA-U32-32F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
```

#### 第125行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 2,
    "sortOrder": 20001,
    "searchKeywords": {
      "zh": "SA-U32-32F-PP-N 809269 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PP 本色",
      "en": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "es": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "fr": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ko": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ru": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural"
    },
    "foreachModel": "SA-U32-32F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
```

#### 第126行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 2,
    "sortOrder": 20001,
    "searchKeywords": {
      "zh": "SA-U32-32F-PP-N 809269 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PP 本色",
      "en": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "es": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "fr": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ko": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural",
      "ru": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural"
    },
    "foreachModel": "SA-U32-32F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第144行附近

```ts
      "ru": "SA-U32-32F-PP-N 809269 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PP Natural"
    },
    "foreachModel": "SA-U32-32F-PP-N",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809323",
    "productCode": "809323",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-24F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-24F-PA-W",
      "en": "SA-U32-24F-PA-W",
      "es": "SA-U32-24F-PA-W",
      "fr": "SA-U32-24F-PA-W",
```

#### 第152行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809323",
    "productCode": "809323",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-24F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-24F-PA-W",
      "en": "SA-U32-24F-PA-W",
      "es": "SA-U32-24F-PA-W",
      "fr": "SA-U32-24F-PA-W",
      "ko": "SA-U32-24F-PA-W",
      "ru": "SA-U32-24F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转2.4 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
```

#### 第167行附近

```ts
      "zh": "SA-U32-24F-PA-W",
      "en": "SA-U32-24F-PA-W",
      "es": "SA-U32-24F-PA-W",
      "fr": "SA-U32-24F-PA-W",
      "ko": "SA-U32-24F-PA-W",
      "ru": "SA-U32-24F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转2.4 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material",
      "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 2.4 mm ID tubing\nPA material"
    },
    "filters": {
      "filter01": "直通型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "2.4 mm",
      "filter05": "PA",
      "filter06": "白色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第190行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 3,
    "sortOrder": 20002,
    "searchKeywords": {
      "zh": "SA-U32-24F-PA-W 809323 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 2.4 mm PA 白色",
      "en": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "es": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "fr": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "ko": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "ru": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White"
    },
    "foreachModel": "SA-U32-24F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
```

#### 第191行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 3,
    "sortOrder": 20002,
    "searchKeywords": {
      "zh": "SA-U32-24F-PA-W 809323 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 2.4 mm PA 白色",
      "en": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "es": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "fr": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "ko": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White",
      "ru": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White"
    },
    "foreachModel": "SA-U32-24F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第209行附近

```ts
      "ru": "SA-U32-24F-PA-W 809323 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 2.4 mm PA White"
    },
    "foreachModel": "SA-U32-24F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "2.4 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809339",
    "productCode": "809339",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-16F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-16F-PA-W",
      "en": "SA-U32-16F-PA-W",
      "es": "SA-U32-16F-PA-W",
      "fr": "SA-U32-16F-PA-W",
```

#### 第217行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809339",
    "productCode": "809339",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-16F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-16F-PA-W",
      "en": "SA-U32-16F-PA-W",
      "es": "SA-U32-16F-PA-W",
      "fr": "SA-U32-16F-PA-W",
      "ko": "SA-U32-16F-PA-W",
      "ru": "SA-U32-16F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
```

#### 第232行附近

```ts
      "zh": "SA-U32-16F-PA-W",
      "en": "SA-U32-16F-PA-W",
      "es": "SA-U32-16F-PA-W",
      "fr": "SA-U32-16F-PA-W",
      "ko": "SA-U32-16F-PA-W",
      "ru": "SA-U32-16F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material"
    },
    "filters": {
      "filter01": "直通型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "1.6 mm",
      "filter05": "PA",
      "filter06": "白色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第255行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 4,
    "sortOrder": 20003,
    "searchKeywords": {
      "zh": "SA-U32-16F-PA-W 809339 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 1.6 mm PA 白色",
      "en": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "es": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "fr": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "ko": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "ru": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SA-U32-16F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
```

#### 第256行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 4,
    "sortOrder": 20003,
    "searchKeywords": {
      "zh": "SA-U32-16F-PA-W 809339 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 1.6 mm PA 白色",
      "en": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "es": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "fr": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "ko": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White",
      "ru": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SA-U32-16F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第274行附近

```ts
      "ru": "SA-U32-16F-PA-W 809339 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SA-U32-16F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809340",
    "productCode": "809340",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-32F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-32F-PA-W",
      "en": "SA-U32-32F-PA-W",
      "es": "SA-U32-32F-PA-W",
      "fr": "SA-U32-32F-PA-W",
```

#### 第282行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809340",
    "productCode": "809340",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sa",
    "seriesCode": "SA",
    "seriesName": "直通螺纹密封螺纹转倒刺接头",
    "model": "SA-U32-32F-PA-W",
    "cardTitle": {
      "zh": "SA-U32-32F-PA-W",
      "en": "SA-U32-32F-PA-W",
      "es": "SA-U32-32F-PA-W",
      "fr": "SA-U32-32F-PA-W",
      "ko": "SA-U32-32F-PA-W",
      "ru": "SA-U32-32F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
```

#### 第297行附近

```ts
      "zh": "SA-U32-32F-PA-W",
      "en": "SA-U32-32F-PA-W",
      "es": "SA-U32-32F-PA-W",
      "fr": "SA-U32-32F-PA-W",
      "ko": "SA-U32-32F-PA-W",
      "ru": "SA-U32-32F-PA-W"
    },
    "cardSubtitle": {
      "zh": "直通螺纹密封螺纹转倒刺接头\n适配10-32 UNF转3.2 mm内径软管\nPA材质",
      "en": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "es": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "fr": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "ko": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material",
      "ru": "Straight Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 3.2 mm ID tubing\nPA material"
    },
    "filters": {
      "filter01": "直通型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "3.2 mm",
      "filter05": "PA",
      "filter06": "白色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第319行附近

```ts
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 5,
    "sortOrder": 20004,
    "searchKeywords": {
      "zh": "SA-U32-32F-PA-W 809340 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PA 白色",
      "en": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "es": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "fr": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ko": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ru": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White"
    },
    "foreachModel": "SA-U32-32F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
```

#### 第320行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 5,
    "sortOrder": 20004,
    "searchKeywords": {
      "zh": "SA-U32-32F-PA-W 809340 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PA 白色",
      "en": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "es": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "fr": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ko": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ru": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White"
    },
    "foreachModel": "SA-U32-32F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
```

#### 第321行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 5,
    "sortOrder": 20004,
    "searchKeywords": {
      "zh": "SA-U32-32F-PA-W 809340 螺纹转倒刺接头 直通螺纹密封螺纹转倒刺接头 SA 直通型 螺纹密封 10-32 UNF 3.2 mm PA 白色",
      "en": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "es": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "fr": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ko": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White",
      "ru": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White"
    },
    "foreachModel": "SA-U32-32F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第339行附近

```ts
      "ru": "SA-U32-32F-PA-W 809340 Thread to Barb Fittings Straight Thread-Seal Thread to Barb Fitting SA Straight Thread Seal 10-32 UNF 3.2 mm PA White"
    },
    "foreachModel": "SA-U32-32F-PA-W",
    "connectionStructure": "直通型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "3.2 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809382",
    "productCode": "809382",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sal",
    "seriesCode": "SAL",
    "seriesName": "L型螺纹密封螺纹转倒刺接头",
    "model": "SAL-U32-16D-PP-N",
    "cardTitle": {
      "zh": "SAL-U32-16D-PP-N",
      "en": "SAL-U32-16D-PP-N",
      "es": "SAL-U32-16D-PP-N",
      "fr": "SAL-U32-16D-PP-N",
```

#### 第347行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809382",
    "productCode": "809382",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sal",
    "seriesCode": "SAL",
    "seriesName": "L型螺纹密封螺纹转倒刺接头",
    "model": "SAL-U32-16D-PP-N",
    "cardTitle": {
      "zh": "SAL-U32-16D-PP-N",
      "en": "SAL-U32-16D-PP-N",
      "es": "SAL-U32-16D-PP-N",
      "fr": "SAL-U32-16D-PP-N",
      "ko": "SAL-U32-16D-PP-N",
      "ru": "SAL-U32-16D-PP-N"
    },
    "cardSubtitle": {
      "zh": "L型螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPP材质",
      "en": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "es": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "fr": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
```

#### 第362行附近

```ts
      "zh": "SAL-U32-16D-PP-N",
      "en": "SAL-U32-16D-PP-N",
      "es": "SAL-U32-16D-PP-N",
      "fr": "SAL-U32-16D-PP-N",
      "ko": "SAL-U32-16D-PP-N",
      "ru": "SAL-U32-16D-PP-N"
    },
    "cardSubtitle": {
      "zh": "L型螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPP材质",
      "en": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "es": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "fr": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "ko": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material",
      "ru": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPP material"
    },
    "filters": {
      "filter01": "L型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "1.6 mm",
      "filter05": "PP",
      "filter06": "本色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第384行附近

```ts
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 6,
    "sortOrder": 20005,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PP-N 809382 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PP 本色",
      "en": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "es": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "fr": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ko": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ru": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural"
    },
    "foreachModel": "SAL-U32-16D-PP-N",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
```

#### 第385行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 6,
    "sortOrder": 20005,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PP-N 809382 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PP 本色",
      "en": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "es": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "fr": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ko": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ru": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural"
    },
    "foreachModel": "SAL-U32-16D-PP-N",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
```

#### 第386行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PP",
    "colorCode": "N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pp-n.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 6,
    "sortOrder": 20005,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PP-N 809382 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PP 本色",
      "en": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "es": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "fr": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ko": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural",
      "ru": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural"
    },
    "foreachModel": "SAL-U32-16D-PP-N",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第404行附近

```ts
      "ru": "SAL-U32-16D-PP-N 809382 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PP Natural"
    },
    "foreachModel": "SAL-U32-16D-PP-N",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809383",
    "productCode": "809383",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sal",
    "seriesCode": "SAL",
    "seriesName": "L型螺纹密封螺纹转倒刺接头",
    "model": "SAL-U32-16D-PA-W",
    "cardTitle": {
      "zh": "SAL-U32-16D-PA-W",
      "en": "SAL-U32-16D-PA-W",
      "es": "SAL-U32-16D-PA-W",
      "fr": "SAL-U32-16D-PA-W",
```

#### 第412行附近

```ts
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809383",
    "productCode": "809383",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sal",
    "seriesCode": "SAL",
    "seriesName": "L型螺纹密封螺纹转倒刺接头",
    "model": "SAL-U32-16D-PA-W",
    "cardTitle": {
      "zh": "SAL-U32-16D-PA-W",
      "en": "SAL-U32-16D-PA-W",
      "es": "SAL-U32-16D-PA-W",
      "fr": "SAL-U32-16D-PA-W",
      "ko": "SAL-U32-16D-PA-W",
      "ru": "SAL-U32-16D-PA-W"
    },
    "cardSubtitle": {
      "zh": "L型螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPA材质",
      "en": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "es": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "fr": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
```

#### 第427行附近

```ts
      "zh": "SAL-U32-16D-PA-W",
      "en": "SAL-U32-16D-PA-W",
      "es": "SAL-U32-16D-PA-W",
      "fr": "SAL-U32-16D-PA-W",
      "ko": "SAL-U32-16D-PA-W",
      "ru": "SAL-U32-16D-PA-W"
    },
    "cardSubtitle": {
      "zh": "L型螺纹密封螺纹转倒刺接头\n适配10-32 UNF转1.6 mm内径软管\nPA材质",
      "en": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "es": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "fr": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "ko": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material",
      "ru": "Elbow Thread-Seal Thread to Barb Fitting\nFits 10-32 UNF to 1.6 mm ID tubing\nPA material"
    },
    "filters": {
      "filter01": "L型",
      "filter02": "螺纹密封",
      "filter03": "10-32 UNF",
      "filter04": "1.6 mm",
      "filter05": "PA",
      "filter06": "白色"
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
```

#### 第449行附近

```ts
    },
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 7,
    "sortOrder": 20006,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PA-W 809383 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PA 白色",
      "en": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "es": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "fr": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ko": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ru": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SAL-U32-16D-PA-W",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
```

#### 第450行附近

```ts
    "portCount": 2,
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 7,
    "sortOrder": 20006,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PA-W 809383 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PA 白色",
      "en": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "es": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "fr": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ko": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ru": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SAL-U32-16D-PA-W",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
```

#### 第451行附近

```ts
    "portValues": [
      "1.6 mm",
      "1.6 mm"
    ],
    "materialCode": "PA",
    "colorCode": "W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pa-w.jpg",
    "detailSlug": "thread-to-barbed-fittings",
    "detailHref": "/products/fittings/thread-to-barbed-fittings",
    "status": "active",
    "sourceIndex": 7,
    "sortOrder": 20006,
    "searchKeywords": {
      "zh": "SAL-U32-16D-PA-W 809383 螺纹转倒刺接头 L型螺纹密封螺纹转倒刺接头 SAL L型 螺纹密封 10-32 UNF 1.6 mm PA 白色",
      "en": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "es": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "fr": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ko": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White",
      "ru": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SAL-U32-16D-PA-W",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
```

#### 第469行附近

```ts
      "ru": "SAL-U32-16D-PA-W 809383 Thread to Barb Fittings Elbow Thread-Seal Thread to Barb Fitting SAL Elbow Thread Seal 10-32 UNF 1.6 mm PA White"
    },
    "foreachModel": "SAL-U32-16D-PA-W",
    "connectionStructure": "L型",
    "sealingMethod": "螺纹密封",
    "threadSpecification": "10-32 UNF",
    "tubingInnerDiameter": "1.6 mm",
    "modelNote": "",
    "selectionHref": "/products/fittings/thread-to-barbed-fittings"
  },
  {
    "productId": "809384",
    "productCode": "809384",
    "sourceType": "thread-to-barbed-fitting-selection",
    "categoryId": "fittings",
    "categoryLabel": "接头系列",
    "productTypeId": "thread-to-barbed-fittings",
    "productTypeName": "螺纹转倒刺接头",
    "seriesId": "sal",
    "seriesCode": "SAL",
    "seriesName": "L型螺纹密封螺纹转倒刺接头",
    "model": "SAL-U32-32D-PP-N",
    "cardTitle": {
      "zh": "SAL-U32-32D-PP-N",
      "en": "SAL-U32-32D-PP-N",
      "es": "SAL-U32-32D-PP-N",
      "fr": "SAL-U32-32D-PP-N",
```

### data/products/selection/thread-to-barbed-fitting-selection.summary.json

#### 第5行附近

```ts
{
  "generatedAt": "2026-07-12T12:18:23.156Z",
  "sourceWorkbook": "data-source\\product-center\\fittings\\FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx",
  "sourceSheet": "05_螺纹转倒刺接头",
  "productTypeId": "thread-to-barbed-fittings",
  "total": 101,
  "seriesCounts": {
    "SA": 45,
    "SAL": 10,
    "SB": 34,
    "SBS": 4,
    "SBR": 3,
    "SC": 5
  },
  "structureCounts": {
    "直通型": 83,
    "L型": 10,
    "可旋转直通型": 3,
    "内螺纹直通型": 5
  },
  "sealingCounts": {
    "螺纹密封": 55,
    "底面密封": 41,
```

### components/products/selection/ProductFilterGroup.tsx

#### 第21行附近

```ts

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
```

#### 第22行附近

```ts
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
```

#### 第26行附近

```ts
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
```

### components/products/selection/ProductFilterPanel.tsx

#### 第131行附近

```ts
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
```

#### 第132行附近

```ts

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
```

#### 第133行附近

```ts
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
```

#### 第150行附近

```ts
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
```

#### 第345行附近

```ts
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
```

#### 第347行附近

```ts
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

```

#### 第353行附近

```ts
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
```

#### 第369行附近

```ts
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
```

### components/products/selection/ProductSelectionClient.tsx

#### 第237行附近

```ts
  "filter09",
];

const FITTING_PRODUCT_TYPE_ORDER_START = true;

const FITTING_PRODUCT_TYPE_ORDER = [
  "hard-tube-fittings",
  "barbed-fittings",
  "thread-to-barbed-fittings",
  "luer-fittings",
  "quick-connect-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
] as const;

const FITTING_PRODUCT_TYPE_ORDER_MAP =
  new Map<string, number>(
    FITTING_PRODUCT_TYPE_ORDER.map(
      (productTypeId, index) => [
        productTypeId,
        index,
      ]
    )
  );

/* FITTING_PRODUCT_TYPE_ORDER_END */
```

#### 第261行附近

```ts
  );

/* FITTING_PRODUCT_TYPE_ORDER_END */

const PRODUCT_SELECTION_PAGE_TEXT: Record<SelectionLocale, import("./product-selection-ui.types").ProductSelectionPageText> = {
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "产品中心",
    searchPlaceholder: "搜索产品名称、系列、量程、材质等关键词",
    searchButton: "搜索",
    mobileCategoryPrefix: "产品大类：",
    productTypeLabel: "产品类型",
    resultPrefix: "已找到 ",
    resultSuffix: " 个基础配置",
    resetFilters: "清除筛选",
    submitRequirement: "提交需求",
    detailButton: "查看详情",
    addToList: "加入清单",
    addedToList: "已加入清单",
    previousPage: "上一页",
    nextPage: "下一页",
    filterEmpty: "当前产品大类暂无可用筛选项。",
    emptyTitle: "暂无匹配配置",
    emptyDescription: "可以减少筛选条件，或提交需求由工程师协助确认。",
  },
  en: {
    breadcrumbHome: "Home",
```

#### 第390行附近

```ts
    id: "pumps",
    label: "泵系列",
    description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    sortOrder: 10,
  },
  {
    id: "valves",
    label: "阀系列",
    description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    sortOrder: 20,
  },
  {
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,
  },
  {
    id: "fittings",
    label: "接头系列",
    description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
```

#### 第402行附近

```ts
    id: "needles",
    label: "针系列",
    description: "根据针类型、规格和应用场景选择基础配置。",
    sortOrder: 30,
  },
  {
    id: "fittings",
    label: "接头系列",
    description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    sortOrder: 40,
  },
  {
    id: "tubing",
    label: "管路系列",
    description: "根据管材、外径、内径和应用需求选择基础配置。",
    sortOrder: 50,
  },
  {
    id: "control",
    label: "智控系列",
    description: "根据控制方式、驱动类型和系统接口选择基础配置。",
    sortOrder: 60,
  },
];

function getText(
  locale: SelectionLocale,
```

#### 第1283行附近

```ts
          ?.detailHref ||
        (product as any)
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

```

#### 第1285行附近

```ts
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
```

#### 第1342行附近

```ts
        ];

      if (matchedHref) {
        return matchedHref;
      }

      return (
        rawExistingHref ||
        "/products/fittings/thread-to-barbed-fittings"
      );
    }
  }

  /* THREAD_TO_BARBED_DETAIL_HREF_END */

  /* BULKHEAD_BARBED_DETAIL_HREF_START */

  /*
   * 穿板倒刺接头与六角螺母具体型号详情链接。
   *
   * 选型卡片不能回退到通用动态页面
   * /products/[category]/[slug]，
   * 必须进入本系列的具体型号详情路由。
   */
  {
    const rawProductTypeId =
      String(
```

#### 第2072行附近

```ts
  options: Array<{
    value: string;
    label: string;
  }>
) {
  /* QUICK_CONNECT_FILTER02_SORT_START */

  /*
   * 快插接头的“接管内径或螺纹”排序：
   *
   * 1. 软管内径按照毫米数值从小到大；
   * 2. 螺纹规格放在所有软管尺寸之后；
   * 3. 不改变硬管接头和其他产品筛选。
   */
  if (
    productTypeId === "quick-connect-fittings" &&
    filterKey === "filter02"
  ) {
    const diameterOrder = [
      "1.6 mm",
      "3.2 mm",
      "4.8 mm",
      "6.4 mm",
      "7.9 mm",
      "9.5 mm",
      "12.7 mm",
      "16.0 mm",
```

#### 第2075行附近

```ts
  }>
) {
  /* QUICK_CONNECT_FILTER02_SORT_START */

  /*
   * 快插接头的“接管内径或螺纹”排序：
   *
   * 1. 软管内径按照毫米数值从小到大；
   * 2. 螺纹规格放在所有软管尺寸之后；
   * 3. 不改变硬管接头和其他产品筛选。
   */
  if (
    productTypeId === "quick-connect-fittings" &&
    filterKey === "filter02"
  ) {
    const diameterOrder = [
      "1.6 mm",
      "3.2 mm",
      "4.8 mm",
      "6.4 mm",
      "7.9 mm",
      "9.5 mm",
      "12.7 mm",
      "16.0 mm",
      "19.0 mm",
    ];

```

#### 第2210行附近

```ts
  });
}


/*
 * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 *
 * 螺纹转倒刺接头：
 * filter02 = 密封方式，每项独占一行
 * filter01 = 连接结构，两个一排
 */
function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {

  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
```

#### 第2211行附近

```ts
}


/*
 * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 *
 * 螺纹转倒刺接头：
 * filter02 = 密封方式，每项独占一行
 * filter01 = 连接结构，两个一排
 */
function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {

  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
```

#### 第2231行附近

```ts

  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
```

#### 第2234行附近

```ts
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
```

#### 第2235行附近

```ts
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
```

#### 第2236行附近

```ts
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }
```

#### 第2237行附近

```ts
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

```

#### 第2251行附近

```ts
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

  if (
    filterKey ===
    "filter02"
  ) {
    return "one";
  }

  if (
    filterKey ===
    "filter01"
  ) {
    return "two";
  }

```

#### 第2569行附近

```ts
      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_START */

      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
```

#### 第2570行附近

```ts

      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
```

#### 第2571行附近

```ts
      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
            ""
```

#### 第2574行附近

```ts
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
            ""
          );

        const selectedTypeValues =
```

#### 第2577行附近

```ts
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
            ""
          );

        const selectedTypeValues =
          selectedFilters.filter01;

        const selectedMergedType =
```

#### 第2884行附近

```ts
    activeCategoryId,
    activeProductTypeId,
    selectedFilters,
    searchKeyword,
    productsPageSize,
  ]);
  /*
   * 筛选项联动后的自动清理：
   * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
   * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
   * 3. 例如从 EA 切到 SM 后，自动清除 5000μL / 10000μL 等无效量程
   */
  useEffect(() => {
    const allowedValuesByFilterKey = new Map<SelectionFilterKey, Set<string>>();

    filterGroups.forEach((group) => {
      if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
        return;
      }

      const filterKey = group.key as SelectionFilterKey;
      allowedValuesByFilterKey.set(
        filterKey,
        new Set(group.options.map((option) => option.value))
      );
    });

```

#### 第2995行附近

```ts
    /*
     * 说明：
     * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
     * 2. 产品系列筛选项，例如 EA / SM / TM，不再使用 router.push
     * 3. 系列点击改为：
     *    - 原地更新 selectedFilters
     *    - 用 window.history.pushState 同步地址栏
     *    - 不触发 Next.js 页面重新跳转，避免页面明显跳动
     * 4. 普通筛选项，例如容量、材质，继续保留原地筛选逻辑
     */
    if (group.key === "productType") {
      handleProductTypeChange(value);
      return;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return;
    }

    const filterKey = group.key as SelectionFilterKey;

    /*
     * 说明：
     * 1. 先判断当前筛选项是否命中正式系列路由
     * 2. EA / SM / TM 会命中 product-route-map.ts 里的三级 URL
     * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
     */
```

#### 第3357行附近

```ts

/* BARBED_PORT_OPTION_DISABLED_END */

/* THREAD_TO_BARBED_OPTION_DISABLED_START */

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
```

#### 第3358行附近

```ts
/* BARBED_PORT_OPTION_DISABLED_END */

/* THREAD_TO_BARBED_OPTION_DISABLED_START */

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
```

#### 第3359行附近

```ts

/* THREAD_TO_BARBED_OPTION_DISABLED_START */

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
   * 5. 已选中的选项保持可点击，允许取消。
```

#### 第3361行附近

```ts

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
   * 5. 已选中的选项保持可点击，允许取消。
   */
  if (
```

#### 第3373行附近

```ts
  value: string
) {

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
   * 5. 已选中的选项保持可点击，允许取消。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }

    const candidateKey =
```

#### 第3499行附近

```ts
  ) {
    return true;
  }

  /*
   * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
   *
   * 内螺纹互转接头双向筛选联动：
   * - 连接结构
   * - 螺纹规格
   * - 流道内径
   * - 材质
   * - 颜色
   *
   * 当前组合不存在对应在售型号时，
   * 选项保留显示，但变灰且不可点击。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
```

#### 第3500行附近

```ts
    return true;
  }

  /*
   * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
   *
   * 内螺纹互转接头双向筛选联动：
   * - 连接结构
   * - 螺纹规格
   * - 流道内径
   * - 材质
   * - 颜色
   *
   * 当前组合不存在对应在售型号时，
   * 选项保留显示，但变灰且不可点击。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }
```

#### 第3502行附近

```ts

  /*
   * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
   *
   * 内螺纹互转接头双向筛选联动：
   * - 连接结构
   * - 螺纹规格
   * - 流道内径
   * - 材质
   * - 颜色
   *
   * 当前组合不存在对应在售型号时，
   * 选项保留显示，但变灰且不可点击。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }

    const candidateKey =
```

#### 第3503行附近

```ts
  /*
   * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
   *
   * 内螺纹互转接头双向筛选联动：
   * - 连接结构
   * - 螺纹规格
   * - 流道内径
   * - 材质
   * - 颜色
   *
   * 当前组合不存在对应在售型号时，
   * 选项保留显示，但变灰且不可点击。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }

    const candidateKey =
      group.key as SelectionFilterKey;
```

#### 第3604行附近

```ts
  }

  /* FEMALE_THREAD_FILTER_OPTION_DISABLED_END */

  /*
   * LUER_FILTER_OPTION_DISABLED_START
   *
   * 鲁尔接头双向组合联动：
   * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
   * 2. 当前组合没有对应在售型号时，选项变灰；
   * 3. 已选中的项目保留取消能力；
   * 4. filter01 产品类型已隐藏，不参与联动。
   */
  if (
    activeProductTypeId ===
    "luer-fittings"
  ) {
    if (
      !FILTER_KEYS.includes(
        group.key as SelectionFilterKey
      )
    ) {
      return false;
    }

    const candidateKey =
      group.key as SelectionFilterKey;
```

#### 第3718行附近

```ts
    return !hasMatchingProduct;
  }

  /* LUER_FILTER_OPTION_DISABLED_END */


  if (
    activeProductTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return false;
  }

  if (
    !FILTER_KEYS.includes(
      group.key as SelectionFilterKey
    )
  ) {
    return false;
  }

  const candidateKey =
    group.key as SelectionFilterKey;

  /*
   * 当前已选项不能禁用，
   * 用户需要能够再次点击取消。
```

#### 第3823行附近

```ts
function isFilterOptionActive(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    /*
     * 说明：
     * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
     * 2. productType 是产品类型，例如“柱塞泵”
     * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
     * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
     */
    if (group.key === "productType") {
      return activeProductTypeId === value;
    }

    if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
      return false;
    }

    const filterKey = group.key as SelectionFilterKey;

    return selectedFilters[filterKey]?.has(value) || false;
  }
  function removeSelectedTag(
    key: string,
    value: string
  ) {
```

## 七、下一步修改边界

- 优先修改该产品类型自己的FilterLabels配置
- 只有公共组件未读取inputType或layout时才小改公共组件
- 不修改其他接头类型的筛选交互
- 不修改CSS，继续复用现有圆形单选与方形多选样式

