# 产品中心系列介绍区代码检查报告

生成时间：2026-07-06 13:52:38


## 1. 当前分支

```text
dev-plunger-pump-xlsx-database-v2-optimization-20260704
```

## 2. Git 当前状态

```text
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
```

## 3. 搜索文案位置：柱塞泵系列介绍区

```text
无法将“rg”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```

## 4. 搜索布局 / 水印 / Intro 相关代码

```text
无法将“rg”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```

## 5. 搜索产品中心页面入口

```text
无法将“rg”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```

## 6. 可能相关文件列表

```text
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\[slug]\[seriesSlug]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\[slug]\loading.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\[slug]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\[category]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\loading.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\products\products.css
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\fitting-replacement.css
F:\WebsiteProjects\foreach-website-2026\app\resources\selection-support\fitting-replacement\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\[locale]\products\loading.tsx
F:\WebsiteProjects\foreach-website-2026\app\[locale]\products\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\[locale]\products\products.css
F:\WebsiteProjects\foreach-website-2026\app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx
F:\WebsiteProjects\foreach-website-2026\app\[locale]\resources\selection-support\fitting-replacement\page.tsx
F:\WebsiteProjects\foreach-website-2026\components\common\product-card\index.ts
F:\WebsiteProjects\foreach-website-2026\components\common\product-card\ProductBasicCard.module.css
F:\WebsiteProjects\foreach-website-2026\components\common\product-card\ProductBasicCard.tsx
F:\WebsiteProjects\foreach-website-2026\components\common\ProductPageSkeleton.module.css
F:\WebsiteProjects\foreach-website-2026\components\common\ProductPageSkeleton.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\detail\product-detail.module.css
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetail.module.css
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.module.css
F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductModelViewer.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\product-selection-ui.types.ts
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCategoryTabs.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductEmptyState.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterGroup.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductFilterPanel.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionCard.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionPagination.tsx
F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionToolbar.tsx
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingReplacementDetail.tsx
F:\WebsiteProjects\foreach-website-2026\components\resources\fitting-replacement\FittingSelectionCart.tsx
F:\WebsiteProjects\foreach-website-2026\components\resources\technical-articles\TechnicalArticleDetail.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.module.css
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts
F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-details.zh.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\ea-product-specs.zh.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\plunger-pump-detail.types.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail-faq.zh.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.types.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-detail.zh.ts
F:\WebsiteProjects\foreach-website-2026\data\products\detail\product-specs.zh.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.detail.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.footnotes.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.routes.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\generated\pumps\pump-series.selection.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\card-copy\plunger-pump-card-copy.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\pumps\plunger-pump-filter-rules.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.index.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.shared.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\filter-rules\product-filter-rules.types.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.generated.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-selection.types.ts
F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-type-intro.ts
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\plunger-pump-image-alt.ts
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\pumps\pump-image-alt.index.ts
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.index.ts
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.shared.ts
F:\WebsiteProjects\foreach-website-2026\data\products\seo-alt\product-image-alt.types.ts
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.intl.ts
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fittings\quick-connect\q20\q20.detail.zh.ts
F:\WebsiteProjects\foreach-website-2026\data\resources\fitting-replacement\fitting-replacement-series.config.ts
```

## 7. 本次需要判断的问题

1. HaloFlx 是否作为普通 DOM 元素参与布局。
2. 右侧文案容器是否设置了 max-width，导致没有铺到最右边。
3. 父级布局是否用了固定列宽，导致右侧空间没有吃满。
4. 背景水印是否应该改成 position:absolute。
5. 文案区域是否需要 width:100%、max-width:none、min-width:0。
6. 父级容器是否需要 position:relative 和 overflow:hidden。

## 8. 修改目标

- HaloFlx 只作为底部背景装饰，不占页面空间。
- 右侧文案区域从标题位置开始，正常铺到页面最右边。
- 左侧产品图保持原位置。
- 不影响筛选区、搜索区和产品卡片布局。
