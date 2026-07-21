# 接头产品种类折叠筛选——现有代码检查报告

- 生成时间：2026-07-10 16:34:55
- 项目目录：F:\WebsiteProjects\foreach-website-2026
- 扫描文件数：434
- 本报告只检查，不修改项目文件。

## 1. Git状态

```text
当前分支：
dev-selection-cart-product-type-fix-20260710

未提交变更：
 M components/products/detail/ProductDetailClient.tsx
?? connector-product-types-audit.md

最近提交：
f081c9a feat: refine site interface navigation footer and news
3cbf472 feat: update product center data and media assets
b221bef feat: add diaphragm pump 2D drawings and 3D models
b505645 fix: translate probe selection card copy
aadaa89 fix: translate valve selection card copy
68383f6 fix: translate control module selection copy
0863ee8 fix: translate pipetting pump selection copy
cedf0b6 fix: translate valveless pump selection copy
```

## 2. 产品中心相关目录

### app\products

```text
[DIR]  app\products\[category]
[DIR]  app\products\[category]\[slug]
[DIR]  app\products\[category]\[slug]\[seriesSlug]
[FILE] app\products\[category]\[slug]\[seriesSlug]\page.tsx
[FILE] app\products\[category]\[slug]\loading.tsx
[FILE] app\products\[category]\[slug]\page.tsx
[FILE] app\products\[category]\page.tsx
[FILE] app\products\loading.tsx
[FILE] app\products\page.tsx
[DIR]  app\products\probes
[DIR]  app\products\probes\[slug]
[FILE] app\products\probes\[slug]\page.tsx
[FILE] app\products\products.css
[DIR]  app\products\pumps
[DIR]  app\products\pumps\diaphragm-pumps
[DIR]  app\products\pumps\diaphragm-pumps\[slug]
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx
[FILE] app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css
[DIR]  app\products\pumps\pipetting-pumps
[DIR]  app\products\pumps\pipetting-pumps\[slug]
[FILE] app\products\pumps\pipetting-pumps\[slug]\page.tsx
[DIR]  app\products\pumps\plunger-pumps
[DIR]  app\products\pumps\plunger-pumps\[slug]
[FILE] app\products\pumps\plunger-pumps\[slug]\page.tsx
[DIR]  app\products\pumps\syringe-pumps
[DIR]  app\products\pumps\syringe-pumps\[slug]
[FILE] app\products\pumps\syringe-pumps\[slug]\page.tsx
[DIR]  app\products\pumps\valveless-pumps
[DIR]  app\products\pumps\valveless-pumps\[slug]
[FILE] app\products\pumps\valveless-pumps\[slug]\page.tsx
[DIR]  app\products\tubing
[DIR]  app\products\tubing\_components
[FILE] app\products\tubing\_components\TubingDetailStaticPage.tsx
[DIR]  app\products\tubing\fep-tubing
[FILE] app\products\tubing\fep-tubing\page.tsx
[DIR]  app\products\tubing\peek-tubing
[FILE] app\products\tubing\peek-tubing\page.tsx
[DIR]  app\products\tubing\pfa-tubing
[FILE] app\products\tubing\pfa-tubing\page.tsx
[DIR]  app\products\tubing\ptfe-tubing
[FILE] app\products\tubing\ptfe-tubing\page.tsx
[DIR]  app\products\tubing\pvc-tubing
[FILE] app\products\tubing\pvc-tubing\page.tsx
[DIR]  app\products\tubing\tpu-tubing
[FILE] app\products\tubing\tpu-tubing\page.tsx
[DIR]  app\products\valves
[DIR]  app\products\valves\[slug]
[FILE] app\products\valves\[slug]\page.tsx
```

### components\products

```text
[DIR]  components\products\detail
[FILE] components\products\detail\ProductDetail.module.css
[FILE] components\products\detail\product-detail.module.css
[FILE] components\products\detail\ProductDetailClient.tsx
[FILE] components\products\detail\ProductDetailClient.tsx.broken-encoding
[FILE] components\products\detail\ProductModelViewer.module.css
[FILE] components\products\detail\ProductModelViewer.tsx
[FILE] components\products\detail\product-responsive-v4-report.txt
[FILE] components\products\detail\product-responsive-v5-report.txt
[DIR]  components\products\selection
[FILE] components\products\selection\filter-option-i18n.ts
[FILE] components\products\selection\ProductCardGrid.tsx
[FILE] components\products\selection\ProductCategoryTabs.tsx
[FILE] components\products\selection\ProductEmptyState.tsx
[FILE] components\products\selection\ProductFilterGroup.tsx
[FILE] components\products\selection\ProductFilterPanel.tsx
[FILE] components\products\selection\ProductSelectionCard.tsx
[FILE] components\products\selection\ProductSelectionClient.tsx
[FILE] components\products\selection\ProductSelectionPagination.tsx
[FILE] components\products\selection\ProductSelectionToolbar.tsx
[FILE] components\products\selection\product-selection-ui.types.ts
```

### data\products

```text
[DIR]  data\products\control-modules
[FILE] data\products\control-modules\control-module-detail.generated.ts
[DIR]  data\products\detail
[FILE] data\products\detail\ea-product-details.zh.generated.ts
[FILE] data\products\detail\ea-product-routes.generated.txt
[FILE] data\products\detail\ea-product-specs.zh.generated.ts
[FILE] data\products\detail\ea-slug-link-update-report.txt
[FILE] data\products\detail\plunger-pump-detail.generated.ts
[FILE] data\products\detail\plunger-pump-detail.summary.json
[FILE] data\products\detail\plunger-pump-detail.types.ts
[FILE] data\products\detail\product-detail.types.ts
[FILE] data\products\detail\product-detail.zh.ts
[FILE] data\products\detail\product-detail-faq.zh.ts
[FILE] data\products\detail\product-specs.zh.generated.ts
[DIR]  data\products\generated
[DIR]  data\products\generated\probes
[DIR]  data\products\generated\probes\detail
[FILE] data\products\generated\probes\detail\index.json
[DIR]  data\products\generated\pumps
[DIR]  data\products\generated\pumps\diaphragm-pumps
[DIR]  data\products\generated\pumps\diaphragm-pumps\detail
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpgl800-gas-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl30h-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl30-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl60-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json
[DIR]  data\products\generated\pumps\diaphragm-pumps\media
[FILE] data\products\generated\pumps\diaphragm-pumps\media\media.json
[DIR]  data\products\generated\pumps\diaphragm-pumps\routes
[FILE] data\products\generated\pumps\diaphragm-pumps\routes\routes.json
[DIR]  data\products\generated\pumps\diaphragm-pumps\selection
[FILE] data\products\generated\pumps\diaphragm-pumps\selection\cards.json
[DIR]  data\products\generated\pumps\diaphragm-pumps\summary
[FILE] data\products\generated\pumps\diaphragm-pumps\summary\summary.json
[DIR]  data\products\generated\pumps\pipetting-pumps
[DIR]  data\products\generated\pumps\pipetting-pumps\detail
[FILE] data\products\generated\pumps\pipetting-pumps\detail\index.json
[FILE] data\products\generated\pumps\pipetting-pumps\selection.generated.ts
[FILE] data\products\generated\pumps\pump-series.detail.generated.ts
[FILE] data\products\generated\pumps\pump-series.footnotes.generated.ts
[FILE] data\products\generated\pumps\pump-series.routes.generated.ts
[FILE] data\products\generated\pumps\pump-series.selection.generated.ts
[FILE] data\products\generated\pumps\pump-series.summary.json
[FILE] data\products\generated\pumps\pump-series-content-audit.md
[FILE] data\products\generated\pumps\pump-series-content-detail-audit.md
[DIR]  data\products\generated\pumps\syringe-pumps
[DIR]  data\products\generated\pumps\syringe-pumps\detail
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json
[DIR]  data\products\generated\pumps\valveless-pumps
[DIR]  data\products\generated\pumps\valveless-pumps\detail
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json
[DIR]  data\products\generated\pumps\valveless-pumps\selection
[FILE] data\products\generated\pumps\valveless-pumps\selection\index.json
[DIR]  data\products\generated\tubing
[DIR]  data\products\generated\tubing\detail
[FILE] data\products\generated\tubing\detail\index.json
[DIR]  data\products\generated\valves
[DIR]  data\products\generated\valves\detail
[FILE] data\products\generated\valves\detail\index.json
[DIR]  data\products\selection
[DIR]  data\products\selection\card-copy
[FILE] data\products\selection\card-copy\plunger-pump-card-copy.ts
[FILE] data\products\selection\control-module-selection.generated.ts
[FILE] data\products\selection\diaphragm-pump-selection.generated.ts
[DIR]  data\products\selection\filter-rules
[FILE] data\products\selection\filter-rules\product-filter-rules.index.ts
[FILE] data\products\selection\filter-rules\product-filter-rules.shared.ts
[FILE] data\products\selection\filter-rules\product-filter-rules.types.ts
[DIR]  data\products\selection\filter-rules\pumps
[FILE] data\products\selection\filter-rules\pumps\plunger-pump-filter-rules.ts
[FILE] data\products\selection\pipetting-pump-selection.generated.ts
[FILE] data\products\selection\probe-selection.generated.ts
[FILE] data\products\selection\product-route-map.ts
[FILE] data\products\selection\product-selection.generated.ts
[FILE] data\products\selection\product-selection.summary.json
[FILE] data\products\selection\product-selection.types.ts
[FILE] data\products\selection\product-type-intro.ts
[FILE] data\products\selection\syringe-pump-selection.generated.ts
[FILE] data\products\selection\tubing-selection.generated.ts
[FILE] data\products\selection\types.ts
[FILE] data\products\selection\valveless-pump-selection.generated.ts
[FILE] data\products\selection\valve-selection.generated.ts
[DIR]  data\products\seo-alt
[FILE] data\products\seo-alt\product-image-alt.index.ts
[FILE] data\products\seo-alt\product-image-alt.shared.ts
[FILE] data\products\seo-alt\product-image-alt.types.ts
[DIR]  data\products\seo-alt\pumps
[FILE] data\products\seo-alt\pumps\plunger-pump-image-alt.ts
[FILE] data\products\seo-alt\pumps\pump-image-alt.index.ts
```

### scripts\products

```text
[FILE] scripts\products\add-ea-placeholder-faq.js
[FILE] scripts\products\add-faq-bottom-space.js
[FILE] scripts\products\add-probe-faq-2-items.cjs
[FILE] scripts\products\add-probe-series-pages.cjs
[FILE] scripts\products\add-series-faq-structure.js
[FILE] scripts\products\add-tubing-detail-pages-clean.cjs
[FILE] scripts\products\add-valve-series-selection.cjs
[FILE] scripts\products\adjust-valve-cta-offset-65px.cjs
[FILE] scripts\products\adjust-valve-cta-offset-90px.cjs
[FILE] scripts\products\apply-plunger-pump-formal-copy.js
[FILE] scripts\products\apply-pump-series-faq-scope.js
[FILE] scripts\products\audit-pipetting-pump-selection.js
[FILE] scripts\products\audit-plunger-wrong-route-md.cjs
[FILE] scripts\products\audit-product-center-build-types.cjs
[FILE] scripts\products\audit-pump-series-content-detail.js
[FILE] scripts\products\audit-pump-series-data.js
[FILE] scripts\products\audit-syringe-pump-detail-pages.cjs
[FILE] scripts\products\audit-syringe-pump-selection-page.cjs
[FILE] scripts\products\audit-valveless-pump-detail-specs.js
[FILE] scripts\products\build-plunger-pump-detail-data.js
[FILE] scripts\products\build-product-selection-data.js
[FILE] scripts\products\build-pump-series-data.js
[FILE] scripts\products\check-ea-full-model-codes.js
[FILE] scripts\products\check-probe-faq-display.cjs
[FILE] scripts\products\check-product-selection-data.js
[FILE] scripts\products\check-selection-detail-copy-separation.js
[FILE] scripts\products\clean-spec-table-column-position.js
[FILE] scripts\products\cleanup-valve-duplicate-return-props.cjs
[FILE] scripts\products\connect-syringe-pump-selection-page.cjs
[FILE] scripts\products\connect-tubing-selection-products.cjs
[FILE] scripts\products\create-legacy-probe-plunger-redirect-pages.cjs
[FILE] scripts\products\create-pipetting-pump-xlsx.cjs
[FILE] scripts\products\create-pump-series-xlsx-template.js
[FILE] scripts\products\create-static-tubing-pages.cjs
[FILE] scripts\products\create-syringe-pump-detail-pages.cjs
[FILE] scripts\products\create-tubing-detail-json.cjs
[FILE] scripts\products\enlarge-product-center-cards-only.js
[FILE] scripts\products\final-guard-product-card-href.cjs
[FILE] scripts\products\final-product-center-width.js
[FILE] scripts\products\fine-tune-product-detail-tab-spacing.js
[FILE] scripts\products\fix-drpl-detail-h1.js
[FILE] scripts\products\fix-faq-footer-gap.js
[FILE] scripts\products\fix-hp-description-copy.cjs
[FILE] scripts\products\fix-hp-solenoid-detail-copy-and-specs.cjs
[FILE] scripts\products\fix-mrv3-detail-copy-and-specs.cjs
[FILE] scripts\products\fix-pipetting-duplicate-top-props.cjs
[FILE] scripts\products\fix-plunger-assets-use-current-public-folder.js
[FILE] scripts\products\fix-plunger-card-copy-product-extra-fields-type.cjs
[FILE] scripts\products\fix-plunger-card-subtitle-mojibake.cjs
[FILE] scripts\products\fix-plunger-detail-adapter-clean.js
[FILE] scripts\products\fix-plunger-detail-assets-request-links.js
[FILE] scripts\products\fix-plunger-detail-image-and-assets.js
[FILE] scripts\products\fix-plunger-detail-image-and-assets-safe.js
[FILE] scripts\products\fix-plunger-detail-link-final.js
[FILE] scripts\products\fix-plunger-page-localized-text-read.cjs
[FILE] scripts\products\fix-plunger-public-assets-auto-match.js
[FILE] scripts\products\fix-plunger-public-assets-final-clean.js
[FILE] scripts\products\fix-plunger-pump-detail-routing.js
[FILE] scripts\products\fix-plunger-wrong-probe-route.cjs
[FILE] scripts\products\fix-probe-duplicate-custom-inquiry-href.cjs
[FILE] scripts\products\fix-probe-selection-filter.cjs
[FILE] scripts\products\fix-product-detail-client-asset-fields.js
[FILE] scripts\products\fix-product-detail-spec-table-width.js
[FILE] scripts\products\fix-product-filter-rules-filters-optional.cjs
[FILE] scripts\products\fix-product-filter-rules-selected-values-string.cjs
[FILE] scripts\products\fix-product-model-viewer-stage.js
[FILE] scripts\products\fix-product-type-intro-imagePath-type.cjs
[FILE] scripts\products\fix-pump-series-image-assets.js
[FILE] scripts\products\fix-pump-series-selection-card-assets.js
[FILE] scripts\products\fix-pump-series-seo-and-faq-header.js
[FILE] scripts\products\fix-rotary-solenoid-description-copy.cjs
[FILE] scripts\products\fix-selection-client-card-title-optional.cjs
[FILE] scripts\products\fix-selection-client-detailhref-href-type.cjs
[FILE] scripts\products\fix-selection-client-filter-label-union-type.cjs
[FILE] scripts\products\fix-selection-client-filters-values-optional.cjs
[FILE] scripts\products\fix-selection-client-get-filter-options-products-type.cjs
[FILE] scripts\products\fix-selection-client-get-taxonomy-label-optional.cjs
[FILE] scripts\products\fix-selection-client-localized-text-direct-read.cjs
[FILE] scripts\products\fix-selection-client-paged-products-grid-type.cjs
[FILE] scripts\products\fix-selection-client-product-filters-optional.cjs
[FILE] scripts\products\fix-selection-client-product-type-id-includes-optional.cjs
[FILE] scripts\products\fix-selection-client-selected-values-string.cjs
[FILE] scripts\products\fix-selection-client-visible-filter-labels.cjs
[FILE] scripts\products\fix-selection-types-missing.cjs
[FILE] scripts\products\fix-syringe-detail-data-type-cast.cjs
[FILE] scripts\products\fix-syringe-detail-required-fields.cjs
[FILE] scripts\products\fix-syringe-pump-detail-faq-cta.cjs
[FILE] scripts\products\fix-syringe-pump-detail-specs-alias.cjs
[FILE] scripts\products\fix-syringe-pump-image-paths.cjs
[FILE] scripts\products\fix-syringe-pump-real-specs.cjs
[FILE] scripts\products\fix-tm-common-applications.js
[FILE] scripts\products\fix-tubing-card-subtitle-three-lines.cjs
[FILE] scripts\products\fix-tubing-generic-static-params.cjs
[FILE] scripts\products\fix-tubing-image-and-use-existing-cta.cjs
[FILE] scripts\products\fix-tubing-images-and-engineer-cta.cjs
[FILE] scripts\products\fix-tubing-selection-links.cjs
[FILE] scripts\products\fix-tubing-specs-catalog-only.cjs
[FILE] scripts\products\fix-tubing-specs-from-catalog-table.cjs
[FILE] scripts\products\fix-valve-bottom-cta-render.cjs
[FILE] scripts\products\fix-valve-cta-overlap-safe-40px.cjs
[FILE] scripts\products\fix-valve-cta-visible-safe-spacing.cjs
[FILE] scripts\products\fix-valve-detail-css-module.cjs
[FILE] scripts\products\fix-valve-detail-static-params.cjs
[FILE] scripts\products\fix-valve-duplicate-custom-inquiry-href-object.cjs
[FILE] scripts\products\fix-valve-duplicate-type-keys.cjs
[FILE] scripts\products\fix-valveless-detail-required-fields-and-type.cjs
[FILE] scripts\products\fix-valveless-pump-detail-specs.js
[FILE] scripts\products\fix-valve-type-display.cjs
[FILE] scripts\products\fix-valve-undefined-link.cjs
[FILE] scripts\products\force-card-title-active-green.js
[FILE] scripts\products\force-fix-drpl-h1-model.js
[FILE] scripts\products\force-fix-drpl-specs-visible.js
[FILE] scripts\products\force-fix-plunger-wrong-probe-href.cjs
[FILE] scripts\products\force-fix-probe-selection-visible.cjs
[FILE] scripts\products\force-probe-5-faq.cjs
[FILE] scripts\products\force-product-detail-tab-size.js
[FILE] scripts\products\force-relax-selection-display-fields.cjs
[FILE] scripts\products\force-spec-table-grid-column.js
[FILE] scripts\products\force-spec-value-column-right.js
[FILE] scripts\products\generate-diaphragm-pump-data.js
[FILE] scripts\products\generate-pipetting-pump-detail-data.js
[FILE] scripts\products\generate-pipetting-pump-selection-from-xlsx.cjs
[FILE] scripts\products\generate-valveless-pump-detail-data.js
[FILE] scripts\products\hide-detail-product-name.js
[FILE] scripts\products\keep-application-title-original.js
[FILE] scripts\products\make-probe-show-all-cards.cjs
[FILE] scripts\products\move-probe-inquiry-banner-up-20px.cjs
[FILE] scripts\products\move-product-detail-spec-value-right.js
[FILE] scripts\products\move-spec-label-right-100.js
[FILE] scripts\products\move-spec-value-left-100.js
[FILE] scripts\products\move-spec-value-left-200.js
[FILE] scripts\products\move-spec-value-right-250.js
[FILE] scripts\products\move-valve-cta-up-200px.cjs
[FILE] scripts\products\normalize-pump-series-data-source.js
[FILE] scripts\products\optimize-valve-detail-h1-app-cta.cjs
[FILE] scripts\products\patch-card-button-compact.js
[FILE] scripts\products\patch-card-inner-keep-highlight.js
[FILE] scripts\products\patch-card-text-button-layout.js
[FILE] scripts\products\patch-card-text-left-align.js
[FILE] scripts\products\patch-ea-selection-card-text.js
[FILE] scripts\products\patch-ea-selection-card-text-lines.js
[FILE] scripts\products\patch-ea-selection-detail-slug.js
[FILE] scripts\products\patch-ea-selection-title-to-model.js
[FILE] scripts\products\patch-faq-accordion.js
[FILE] scripts\products\patch-faq-clean-accordion-style.js
[FILE] scripts\products\patch-faq-clean-style.js
[FILE] scripts\products\patch-faq-spacing-animation.js
[FILE] scripts\products\patch-product-card-inner-final-layout.js
[FILE] scripts\products\patch-product-card-inner-layout-only.js
[FILE] scripts\products\patch-product-detail-spec-table-style.js
[FILE] scripts\products\patch-product-detail-spec-text-indent.js
[FILE] scripts\products\patch-product-detail-tab-active-style.js
[FILE] scripts\products\patch-product-detail-tab-bigger-underline.js
[FILE] scripts\products\patch-product-detail-tab-center-style.js
[FILE] scripts\products\patch-product-detail-tab-clean-style.js
[FILE] scripts\products\patch-product-detail-tab-font-24.js
[FILE] scripts\products\patch-product-detail-tab-font-size.js
[FILE] scripts\products\patch-product-detail-tab-spacing.js
[FILE] scripts\products\patch-product-filter-sidebar-420.js
[FILE] scripts\products\patch-product-intro-text-spacing.js
[FILE] scripts\products\patch-tubing-model-placeholder-only.cjs
[FILE] scripts\products\patch-tubing-selection-make-detail-href.cjs
[FILE] scripts\products\reduce-detail-page-bottom-padding.js
[FILE] scripts\products\relax-selection-description-type.cjs
[FILE] scripts\products\relax-selection-localized-display-fields.cjs
[FILE] scripts\products\relax-selection-localized-field-types.cjs
[FILE] scripts\products\remove-detail-bottom-gap.js
[FILE] scripts\products\remove-generated-plunger-faq.js
[FILE] scripts\products\remove-solenoid-spec-rows.cjs
[FILE] scripts\products\remove-syringe-pump-config-mode-spec.cjs
[FILE] scripts\products\remove-syringe-pump-model-code-specs.cjs
[FILE] scripts\products\remove-zh-faq-label.js
[FILE] scripts\products\repair-broken-json-small.cjs
[FILE] scripts\products\repair-probe-json-and-force-5-faq.cjs
[FILE] scripts\products\repair-valve-current-errors.cjs
[FILE] scripts\products\reset-final-spec-table-layout.js
[FILE] scripts\products\reset-product-card-final-stable.js
[FILE] scripts\products\reset-product-detail-tab-clean.js
[FILE] scripts\products\restore-css-and-clean-3d-viewer.js
[FILE] scripts\products\restore-valve-detail-to-rpl-style.cjs
[FILE] scripts\products\rewrite-all-probe-custom-items.cjs
[FILE] scripts\products\rewrite-valve-custom-detail.cjs
[FILE] scripts\products\rewrite-valve-detail-seo-copy.cjs
[FILE] scripts\products\rewrite-valve-selection-by-type.cjs
[FILE] scripts\products\search-ea-full-models-in-xlsx.js
[FILE] scripts\products\shorten-valve-apps-and-set-image-slots.cjs
[FILE] scripts\products\split-drpl-detail-pages.js
[FILE] scripts\products\unify-product-selection-product-types.cjs
[FILE] scripts\products\update-probe-custom-confirm-items.cjs
[FILE] scripts\products\update-syringe-pump-series-labels.cjs
[FILE] scripts\products\update-valve-cta-button-text.cjs
[FILE] scripts\products\widen-product-center-main-container.js
[FILE] scripts\products\write-valve-faq-and-cta.cjs
```

## 3. 现有一级产品类别与接头入口

### data\products\generated\pumps\syringe-pumps\detail\index.json

- 第 31 行："value": "HMD3 电磁阀系列注射泵"
- 第 117 行："answer": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。",
- 第 119 行："content": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"
- 第 161 行："value": "HMD3 电磁阀系列注射泵"
- 第 225 行："answer": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。",
- 第 227 行："content": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"
- 第 257 行："answer": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。",
- 第 259 行："content": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"
- 第 289 行："answer": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。",
- 第 291 行："content": "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"

```text
     21:     "commonApplications": [
     22:       "小体积试剂加注",
     23:       "样本定量分配",
     24:       "校准液输送",
     25:       "紧凑型分析仪器液路模块",
     26:       "单通道液体处理单元"
     27:     ],
     28:     "specifications": [
     29:       {
     30:         "label": "产品系列",
>    31:         "value": "HMD3 电磁阀系列注射泵"
     32:       },
     33:       {
     34:         "label": "行程",
     35:         "value": "30 mm"
     36:       },
     37:       {
     38:         "label": "通道数",
     39:         "value": "1 通道"
     40:       },
     41:       {
     42:         "label": "全行程运行时间",
     43:         "value": "1.2–1200 s"
     44:       },
     45:       {
     46:         "label": "线性速度",
     47:         "value": "0.025–25 mm/s"
     48:       },
     49:       {
     50:         "label": "分辨率",
     51:         "value": "标准模式：3000 增量；微步模式：24000 增量"
     52:       },
     53:       {
     54:         "label": "阀头材质",
     55:         "value": "PEEK / PEI"
     56:       },
```

### data\products\selection\probe-selection.generated.ts

- 第 3 行：FOREACH 官网｜针系列产品中心卡片数据
- 第 6 行：1. 针系列全部按来图定制展示
- 第 15 行："针系列",
- 第 33 行：categoryLabel: "针系列",
- 第 35 行：productTypeId: "针系列",
- 第 36 行：productTypeLabel: "针系列",
- 第 38 行：model: "采样针系列",
- 第 39 行：title: "采样针系列",
- 第 40 行：name: "采样针系列",
- 第 41 行：productName: "采样针系列",

```text
      1: /* =========================================================
      2:    probe-selection.generated.ts
>     3:    FOREACH 官网｜针系列产品中心卡片数据
      4: 
      5:    说明：
      6:    1. 针系列全部按来图定制展示
      7:    2. 产品类型分为：采样针 / 穿刺针 / 清洗针 / 搅拌桨
      8:    3. productTypeId 使用中文，便于前台筛选显示
      9:    4. slug / detailSlug / routeSlug 使用英文，避免生成 undefined 路径
     10: ========================================================= */
     11: 
     12: import type { ProductSelectionProduct } from "./product-selection.types";
     13: 
     14: export const probeFilterLabels = [
     15:   "针系列",
     16: ] as const;
     17: 
     18: const probeProducts = [
     19:   {
     20:     id: "sampling-probes",
     21:     slug: "sampling-probes",
     22:     detailSlug: "sampling-probes",
     23:     routeSlug: "sampling-probes",
     24:     seriesSlug: "sampling-probes",
     25:     productTypeSlug: "sampling-probes",
     26: 
     27:     productId: "sampling-probes",
     28:     productCode: "Custom Sampling Probe",
```

### data\products\selection\product-route-map.ts

- 第 10 行：泵系列 → 产品类型 → 产品系列
- 第 60 行：label: "泵系列",
- 第 61 行：title: "泵系列 | FOREACH",
- 第 63 行："恒永达泵系列产品覆盖自动化分析仪器、IVD、生命科学与实验室自动化设备中的精密液体处理需求。",
- 第 68 行：label: "阀系列",
- 第 69 行：title: "阀系列 | FOREACH",
- 第 71 行："恒永达阀系列产品覆盖旋转阀、高压阀、电磁阀等自动化仪器液路控制需求。",
- 第 76 行：label: "管路系列",
- 第 77 行：title: "管路系列 | FOREACH",
- 第 79 行："恒永达管路系列产品覆盖 FEP、PFA、PTFE、PEEK、PVC、TPU 等仪器液路连接需求。",

```text
      1: /* =========================================================
      2:    product-route-map.ts
      3:    恒永达官网｜产品中心动态路由映射表
      4: 
      5:    说明：
      6:    1. 这里统一管理产品中心正式分类 URL
      7:    2. query 链接继续作为临时筛选状态使用
      8:    3. 动态路由用于 SEO / GEO / AI 抓取 / sitemap / canonical
      9:    4. 当前建立：
>    10:       泵系列 → 产品类型 → 产品系列
     11:    5. 产品类型先补齐：
     12:       柱塞泵 / 隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵
     13:    6. 柱塞泵下先预留：
     14:       EA 常规柱塞泵 / SM 微型柱塞泵 / TM 超微型柱塞泵
     15: ========================================================= */
     16: 
     17: import type { SelectionFilterKey } from "./product-selection.types";
     18: 
     19: export type ProductRouteInitialFilters = Partial<
     20:   Record<SelectionFilterKey, string[]>
     21: >;
     22: 
     23: export type ProductCategoryRouteEntry = {
     24:   categoryId: string;
     25:   label: string;
     26:   title: string;
     27:   description: string;
     28: };
     29: 
     30: export type ProductTypeRouteEntry = {
     31:   category: string;
     32:   categoryId: string;
     33:   productTypeId: string;
     34:   label: string;
     35:   title: string;
```

### data\products\generated\pumps\valveless-pumps\detail\index.json

- 第 485 行："label":  "堵头材质",
- 第 486 行："name":  "堵头材质",
- 第 487 行："title":  "堵头材质",
- 第 644 行："label":  "堵头材质",
- 第 645 行："name":  "堵头材质",
- 第 646 行："title":  "堵头材质",
- 第 754 行："label":  "堵头材质",
- 第 755 行："name":  "堵头材质",
- 第 756 行："title":  "堵头材质",
- 第 909 行："label":  "堵头材质",

```text
    475:                           "content":  "20,000,000 cycles"
    476:                       },
    477:                       {
    478:                           "label":  "泵头材质",
    479:                           "name":  "泵头材质",
    480:                           "title":  "泵头材质",
    481:                           "value":  "PVDF",
    482:                           "content":  "PVDF"
    483:                       },
    484:                       {
>   485:                           "label":  "堵头材质",
    486:                           "name":  "堵头材质",
    487:                           "title":  "堵头材质",
    488:                           "value":  "PVDF",
    489:                           "content":  "PVDF"
    490:                       },
    491:                       {
    492:                           "label":  "陶瓷套件",
    493:                           "name":  "陶瓷套件",
    494:                           "title":  "陶瓷套件",
    495:                           "value":  "ZrO2",
    496:                           "content":  "ZrO2"
    497:                       },
    498:                       {
    499:                           "label":  "工作液路接口",
    500:                           "name":  "工作液路接口",
    501:                           "title":  "工作液路接口",
    502:                           "value":  "1/4-28 UNF-2B",
    503:                           "content":  "1/4-28 UNF-2B"
    504:                       },
    505:                       {
    506:                           "label":  "清洗液路接口",
    507:                           "name":  "清洗液路接口",
    508:                           "title":  "清洗液路接口",
    509:                           "value":  "1/4-28 UNF-2B",
    510:                           "content":  "1/4-28 UNF-2B"
```

### data\resources\datasheets.zh.ts

- 第 102 行："当前页面仅收录产品规格书；针系列暂无规格书，支持来图定制；产品图纸建议在对应产品详情页获取。",
- 第 135 行：{ label: "泵系列", value: "pump" },
- 第 136 行：{ label: "阀系列", value: "valve" },
- 第 137 行：{ label: "针系列", value: "needle" },
- 第 151 行：title: "柱塞泵系列规格书",
- 第 152 行：label: "泵系列",
- 第 161 行："/downloads/resources/datasheets/zh-CN/泵系列/柱塞泵系列规格书_A01_恒永达.pdf",
- 第 169 行：label: "泵系列",
- 第 178 行："/downloads/resources/datasheets/zh-CN/泵系列/无阀泵规格书_A01_恒永达.pdf",
- 第 186 行：label: "泵系列",

```text
     92: 
     93:   search: {
     94:     placeholder:
     95:       "搜索产品名称或关键词，例如 柱塞泵、旋转阀、压力传感器、管路及连接件",
     96:     buttonText: "搜索",
     97:   },
     98: 
     99:   section: {
    100:     title: "产品规格书",
    101:     description:
>   102:       "当前页面仅收录产品规格书；针系列暂无规格书，支持来图定制；产品图纸建议在对应产品详情页获取。",
    103:     resultPrefix: "共",
    104:     resultSuffix: "条资料",
    105:     emptyTitle: "没有找到匹配的资料",
    106:     emptyDescription:
    107:       "可以尝试搜索产品名称、关键词或切换产品分类。若仍未找到，请提交资料需求，我们会协助您获取对应资料。",
    108:   },
    109: 
    110:   labels: {
    111:     language: "语言",
    112:     version: "版本",
    113:     update: "更新",
    114:     viewProduct: "查看产品",
    115:     download: "下载规格书",
    116:     custom: "来图定制",
    117:   },
    118: 
    119:   support: {
    120:     kicker: "Need Support",
    121:     title: "没有找到需要的规格书？",
    122:     description:
    123:       "提交产品名称、应用场景或资料需求，我们将协助您获取对应产品规格书，并提供必要的选型建议与技术支持。",
    124:     buttonText: "提交资料需求",
    125:     buttonHref: "/contact?type=datasheet",
    126:   },
    127: };
```

### data\products\generated\probes\detail\index.json

- 第 6 行："title":  "采样针系列",
- 第 7 行："h1Title":  "采样针系列",
- 第 8 行："pageTitle":  "采样针系列",
- 第 9 行："modelName":  "采样针系列",
- 第 10 行："seoTitle":  "采样针系列｜自动化分析仪器试剂针与样本针定制｜恒永达 FOREACH",
- 第 11 行："seoDescription":  "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，支持针尖、侧孔、弯折、长度、内壁抛光、涂层和液位检测适配等来图定制。",
- 第 13 行："imageAlt":  "采样针系列",
- 第 14 行："description":  "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。针管可根据项目需求确认外径、内径、长度、针尖形状、侧孔结构、折弯方向和安装方式，并可结合内壁抛光、外壁涂层和电容式液位检测适配，降低挂液、残留和交叉污染风险。",
- 第 234 行："title":  "穿刺针系列",
- 第 235 行："h1Title":  "穿刺针系列",

```text
      1: [
      2:     {
      3:         "slug":  "sampling-probes",
      4:         "productTypeId":  "sampling-probes",
      5:         "productTypeName":  "采样针",
>     6:         "title":  "采样针系列",
      7:         "h1Title":  "采样针系列",
      8:         "pageTitle":  "采样针系列",
      9:         "modelName":  "采样针系列",
     10:         "seoTitle":  "采样针系列｜自动化分析仪器试剂针与样本针定制｜恒永达 FOREACH",
     11:         "seoDescription":  "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，支持针尖、侧孔、弯折、长度、内壁抛光、涂层和液位检测适配等来图定制。",
     12:         "image":  "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
     13:         "imageAlt":  "采样针系列",
     14:         "description":  "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。针管可根据项目需求确认外径、内径、长度、针尖形状、侧孔结构、折弯方向和安装方式，并可结合内壁抛光、外壁涂层和电容式液位检测适配，降低挂液、残留和交叉污染风险。",
     15:         "commonApplications":  [
     16:                                    "试剂吸取",
     17:                                    "样本吸取",
     18:                                    "液体分配",
     19:                                    "定量转移",
     20:                                    "cLLD适配",
     21:                                    "低残留液路"
     22:                                ],
     23:         "advantages":  [
     24:                            "可按仪器结构定制外径、内径、总长和有效长度",
     25:                            "支持尖口、平口、V型口、侧孔和弯折结构",
     26:                            "可结合内壁抛光降低挂液、残留和交叉污染风险",
     27:                            "可按项目需求确认外壁涂层和电容式液位检测适配",
     28:                            "适用于试剂针、样本针和自动化液体处理针组件"
     29:                        ],
     30:         "specsTitle":  "定制确认项",
     31:         "specs":  [
```

### components\products\selection\ProductSelectionClient.tsx

- 第 265 行：label: "泵系列",
- 第 271 行：label: "阀系列",
- 第 277 行：label: "针系列",
- 第 283 行：label: "接头系列",
- 第 289 行：label: "管路系列",
- 第 295 行：label: "智控系列",
- 第 354 行：管路系列直接返回 6 张材料卡片。
- 第 629 行：只纠正 EA / SM / TM 柱塞泵型号，不影响真正的针系列页面。
- 第 693 行：智控系列选型卡片强制跳转到正式详情页。
- 第 826 行：管路系列详情链接分支。

```text
    255:     nextPage: "Далее",
    256:     filterEmpty: "Для этой категории нет доступных фильтров.",
    257:     emptyTitle: "Нет подходящих конфигураций",
    258:     emptyDescription: "Уменьшите количество фильтров или отправьте требования для инженерной поддержки.",
    259:   },
    260: };
    261: 
    262: const DEFAULT_CATEGORIES: ProductSelectionCategoryItem[] = [
    263:   {
    264:     id: "pumps",
>   265:     label: "泵系列",
    266:     description: "根据泵类型、系列、量程和核心筛选项选择基础配置。",
    267:     sortOrder: 10,
    268:   },
    269:   {
    270:     id: "valves",
    271:     label: "阀系列",
    272:     description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
    273:     sortOrder: 20,
    274:   },
    275:   {
    276:     id: "needles",
    277:     label: "针系列",
    278:     description: "根据针类型、规格和应用场景选择基础配置。",
    279:     sortOrder: 30,
    280:   },
    281:   {
    282:     id: "fittings",
    283:     label: "接头系列",
    284:     description: "根据接头类型、管径、螺纹和材质选择基础配置。",
    285:     sortOrder: 40,
    286:   },
    287:   {
    288:     id: "tubing",
    289:     label: "管路系列",
    290:     description: "根据管材、外径、内径和应用需求选择基础配置。",
```

### data\products\selection\product-type-intro.ts

- 第 45 行：title: "柱塞泵系列",
- 第 47 行："恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
- 第 53 行：alt: "FOREACH 柱塞泵系列产品图，用于 IVD、生命科学和实验室自动化设备中的精密液体处理",
- 第 58 行：title: "隔膜泵系列",
- 第 60 行："恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
- 第 66 行：alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路",
- 第 71 行：title: "移液泵系列",
- 第 73 行："恒永达移液泵系列适用于自动化仪器中的样本转移、试剂分配和微量液体处理场景，采用气体置换方式配合一次性吸头使用，可降低样本残留与交叉污染风险。",
- 第 79 行：alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理",
- 第 85 行：title: "注射泵系列",

```text
     35:   "zh",
     36:   "en",
     37:   "es",
     38:   "fr",
     39:   "ko",
     40:   "ru",
     41: ];
     42: 
     43: export const productTypeIntroMap: Record<string, ProductTypeIntroContent> = {
     44:   "pumps:plunger-pump": {
>    45:     title: "柱塞泵系列",
     46:     paragraphs: [
     47:       "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
     48:       "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型。",
     49:       "产品卡片展示常用基础型号，完整规格参数、性能曲线和可选配置可进入详情页查看；如有特殊工况或非标需求，可通过选型清单提交给工程师进一步确认。",
     50:     ],
     51:     image: {
     52:       src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
     53:       alt: "FOREACH 柱塞泵系列产品图，用于 IVD、生命科学和实验室自动化设备中的精密液体处理",
     54:     },
     55:   },
     56: 
     57:   "pumps:diaphragm-pump": {
     58:     title: "隔膜泵系列",
     59:     paragraphs: [
     60:       "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
     61:       "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
     62:       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
     63:     ],
     64:     image: {
     65:       src: "/images/products/pumps/diaphragm-pumps/series/images/dpl-diaphragm-pump-series-main.webp",
     66:       alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路",
     67:     },
     68:   },
     69: 
     70:   "pumps:pipette-pump": {
```

### data\navigation.ts

- 第 305 行：title: t("泵系列", "Pump Series", "Series de bombas", "Séries de pompes", "펌프 시리즈", "Серии насосов"),
- 第 319 行：title: t("阀系列", "Valve Series", "Series de válvulas", "Séries de vannes", "밸브 시리즈", "Серии клапанов"),
- 第 333 行：title: t("针系列", "Probe Series", "Series de sondas", "Séries de sondes", "프로브 시리즈", "Серии зондов"),
- 第 347 行：title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
- 第 349 行："软管接头、硬管接头、鲁尔接头、快插连接与定制管路组件",
- 第 361 行：title: t("管路系列", "Tubing Series", "Series de tubos", "Séries de tubes", "튜빙 시리즈", "Серии трубок"),
- 第 375 行：title: t("智控系列", "Smart Control Series", "Serie de control inteligente", "Série de contrôle intelligent", "스마트 제어 시리즈", "Серия интеллектуального управления"),
- 第 393 行：title: t("泵系列", "Pump Series", "Series de bombas", "Séries de pompes", "펌프 시리즈", "Серии насосов"),
- 第 442 行：title: t("阀系列", "Valve Series", "Series de válvulas", "Séries de vannes", "밸브 시리즈", "Серии клапанов"),
- 第 479 行：title: t("针系列", "Probe Series", "Series de sondas", "Séries de sondes", "프로브 시리즈", "Серии зондов"),

```text
    295:     "Core microfluidic components including pumps, valves, tubing, fittings, probes, and sensors.",
    296:     "Componentes microfluídicos clave, incluidas bombas, válvulas, tubos, conectores, sondas y sensores.",
    297:     "Composants microfluidiques clés, notamment pompes, vannes, tubes, raccords, sondes et capteurs.",
    298:     "펌프, 밸브, 튜빙, 피팅, 프로브 및 센서를 포함한 핵심 미세유체 부품.",
    299:     "Ключевые микрофлюидные компоненты, включая насосы, клапаны, трубки, фитинги, зонды и датчики."
    300:   ),
    301: 
    302:   categories: [
## 4. 现有折叠与展开逻辑

### app\language-typography.css

- 第 40 行：expanded：
- 第 58 行：.site-page--expanded {
- 第 141 行：body .site-page--expanded .home-hero-title {
- 第 147 行：body .site-page--expanded .home-hero-subtitle {
- 第 153 行：body .site-page--expanded .home-hero-btn {
- 第 159 行：body .site-page--expanded .home-hero-btn:hover {
- 第 178 行：body .site-page--expanded .home-flow-title {
## 5. 筛选组件、筛选状态与产品卡片

### components\products\selection\ProductSelectionClient.tsx

- 第 11 行：getProductTypeFilterOptionsByCategory,
- 第 12 行：getProductTypeHrefByIds,
- 第 13 行：getSeriesFilterOptionsByProductType,
- 第 15 行：hasProductTypeRouteByIds,
- 第 17 行：import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
- 第 18 行：import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
- 第 111 行：(item as any).productTypeId === (label as any).productTypeId &&
- 第 122 行：initialProductTypeId?: string;
## 6. 现有筛选栏和折叠样式

### app\globals.css

- 第 134 行：backdrop-filter: blur(18px); /* 濠电姷鏁告慨鐑姐€傞鐐潟闁哄洢鍨圭壕濠氭煙鏉堝墽鐣辩痪鎯х秺閺岋繝宕堕妷銉т痪闂佺顑呴ˇ顖炲煘閹达箑纾兼繝濠傛捣閸斿摜绱掗悙顒€鍔ゆ繛纭风節瀵鎮㈤搹鍦紲闂侀潧绻掓慨鐢告倶閸儲鈷戦柛娑橈工婵偓闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粎绮婚幘璇茬疇婵犻潧娲㈤崑鍛存煕閹扳晛濡挎い锔诲弮閹嘲顭ㄩ崨顓ф毉闁汇埄鍨遍〃濠囧箖閳ユ枼妲堥柕蹇ョ磿閸樺崬鈹戦悩鎵嶅牓宕戦幘鍓佺＜闁逞屽墯缁楃喖鍩€椤掑嫬绠栨慨妞诲亾闁轰焦鎹囬幃鈺呭礃閸欏鏆梻鍌欑閸熷潡骞栭锕€鐤柟娈垮枛椤?*/
- 第 170 行：filter: brightness(0) invert(1); /* 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃繘骞戦姀銈呯疀妞ゆ棁妫勬惔濠囨⒑瑜版帒浜伴柛搴ㄦ涧閳藉螣濠婂嫭顥堢€规洏鍔戦、姗€鎮崨顖炴７闂傚倸鍊烽悞锕傛儑瑜版帒鍨傜憸鐗堝笒缁犵喖鏌ㄩ悢鍝勑㈤柛?Logo 濠电姷鏁告慨鐑藉极閸涘﹥鍙忓ù鍏兼綑閸ㄥ倿鏌ｉ幘宕囧哺闁哄鐗楃换娑㈠箣閻愯尙鍔伴梺绋款儐閹告悂锝炲┑瀣亗閹兼番鍨昏ぐ搴繆閵堝洤啸闁稿鐩畷顖烆敍濠婂嫬搴婂┑鐘绘涧椤戝懘鎮欐繝鍕枑闊洦渚楅弫鍥ㄧ箾瀹割喕绨奸柍閿嬪灩閹叉悂鎮ч崼婵堢懆婵炲瓨绮堥崡鎶藉蓟濞戙垺鍋愰柟棰佺劍閻や礁顪冮妶鍐ㄧ仾婵☆偄鍟穱濠囨嚋闂堟稓绐為柣搴秵閸撴瑩鐛鈧缁樻媴閽樺鎯為梺鍝ュУ閸旀洟鈥﹂崹顔ョ喖鎳栭埡鍌︾础闁荤喐绮岀€涒晝绮氭潏銊х瘈闁搞儴鍩栭弲顒€鈹戦鐭亪宕ョ€ｎ偒娈紓?*/
- 第 290 行：.site-nav-mega-sidebar {
- 第 299 行：.site-nav-mega-category {
- 第 310 行：.site-nav-mega-category strong {
- 第 318 行：.site-nav-mega-category-desc {
- 第 326 行：.site-nav-mega-category-arrow {
- 第 340 行：.site-nav-mega-category:hover {
- 第 345 行：.site-nav-mega-category-active {
- 第 350 行：.site-nav-mega-category:hover strong,

```text
    124:   transition: background 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀閸屻劎鎲搁弬璺ㄦ殾妞ゆ牜鍋涢柨銈嗕繆閵堝倸浜鹃柣搴㈣壘椤︿即濡甸崟顖氱闁糕剝銇炴竟鏇㈡⒒娴ｅ摜鏋冩い鏇嗗懐鐭撻柟缁㈠枛閻撴繈骞栧ǎ顒€濡肩紒鐘电帛缁绘繈濮€閻樺樊浠撮梺绋块叄娴滆埖淇婇幘顔肩闁规惌鍘介崓鐢告⒑閹稿海绠撻柟鍐茬У缁旂喖寮撮悢铏圭槇缂佸墽澧楄彜闁稿鎹囧畷姗€鎳犻鍕礈闂佽姘﹂～澶娒哄鈧弫鍐閳ヨ尙绠氶梺姹囧灮椤牏绮诲☉娆嶄簻闁规崘娉涘暩闂佺娅曠换鍫ュ蓟閻斿吋鍋傞幖杈剧稻閹插ジ姊洪崷顓х劸闁硅绱曠划瀣吋婢跺﹦鐣惧銈庡厴閳ь剙纾粔娲煛娴ｇ懓濮嶇€规洖鐖兼俊鎼佹晜閹勯敪闂傚倸鍊烽懗鍓佸垝椤栨粍宕查柛鈩冪☉閺勩儵鏌″鍐ㄥ闁崇懓绉撮埞鎴︽偐闊叀鎶楅梺鍝勫暙閻楀棝鎮為崹顐犱簻闁瑰搫妫楁禍楣冩煣閼姐倕浠︾紒缁樼箖缁绘繈宕掑☉妯活仭闁诲氦顫夊ú姗€鎮￠敓鐘茶摕婵炴垯鍨圭粻娑㈡煃鏉炴壆顦﹂幆鐔兼⒒?*/
    125: }
    126: 
    127: .site-header:hover,
    128: .site-header-scrolled,
    129: .page-scrolled .site-header,
    130: .site-header.header-panel-open {
    131:   background: rgba(255, 255, 255, 0.94); /* 濠电姷鏁告慨鐢割敊閺嶎厼绐楁俊銈傚亾闁伙絿鍏樺畷绋课旈埀顒€顔忓┑鍥ヤ簻闁圭偓鍓氬褏绱撳鍕獢鐎殿喖顭烽弫鎰緞婵犲倸鏁ら梻浣圭湽閸ㄥ寮灞稿徍婵犲痉鏉库偓妤佹叏閻戣棄纾绘繛鎴欏灩閻ゎ噣鏌熺紒銏犳灁闁逞屽厸缁€浣界亙闂佸憡渚楅崢楣冨礉閿曗偓椤啴濡堕崱妤冪憪闂佺厧鍟块悥濂稿Υ閸涘瓨鍊婚柤鎭掑劤閸樿棄鈹戦埥鍡楃仭妞ゆ垶鐟╁畷闈涒枎閹邦厺姘﹀┑鐘绘涧濞层劎绮绘ィ鍐ㄧ骇闁割偅绻傞埛鏃堟煕閹烘柨顣肩紒缁樼箞閸┾偓妞ゆ帒瀚涵鈧梺缁樺姀閺呮粓鎮橀崘鈺冪瘈闁汇垽娼у瓭濠电偠顕滅粻鎾诲箖閿熺姴鍗抽柕蹇ョ磿閸樻悂姊虹粙鎸庢拱缂佽绉瑰畷闈涒枎韫囧﹥鏂€闂佺偨鍎寸亸娆撴儗濞嗘挻鐓涢悘鐐插⒔濞叉潙鈹戦埄鍐╁€愰柡浣瑰姍瀹曘劑顢樿閳ь剙鍢查埞鎴︽倷瀹割喖娈舵繝娈垮灠椤曨厾鍒掓繝姘闁归绀佸▓銊╂⒑閸︻叀妾搁柛鐘愁殜瀹曟劙鎮滈懞銉у幗闂侀潧绻堥崺鍕汲濠婂懐纾奸梺顒€绉抽幉鐐叏婵犲嫮甯涢柟宄版噽缁瑩骞愭惔鈾€鍋撻鐐寸厽閹艰揪绲块幊妤呮煕濞戝崬骞栭柣蹇擄躬閺岋綀绠涢弴鐐版埛闂佸搫鎷嬮崑濠傤嚕閹惰姤鏅濋柛灞剧〒閸樹粙姊洪崫鍕殭闁稿﹤鎽滈弫顕€宕滄担铏癸紲濡炪倖鍔戦崹缁樻櫏闂備浇顕栭崰鏍礊婵犲倻鏆︽い鎰剁畱缁€瀣亜閹哄秶顦﹂柛鎾舵暩缁辨捇宕掑顑藉亾閸濄儳鐭撶€规洖娲﹂鑺ユ叏濡寧纭鹃柦鍐枛閺岋綁寮崶銉㈠亾閳ь剟鏌涚€ｎ偅灏柍钘夘槸閳诲秹顢樿缁ㄥジ鏌熸笟鍨鐎规洖鐖奸崺鐐哄箚瑜屾竟鏇㈡煟閻斿摜鎳冮悗姘煎幘缁牓宕橀鐣屽幈闂佸搫鍟犻崑鎾绘煟閻斿弶娅呮い鏇稻缁绘繂顫濋鈧粣娑㈡⒑鐟欏嫷鍟忛柛鐘冲哺瀵爼骞栨担鍏夋嫼闂佸憡绻傜€氼剟寮虫繝鍥ㄧ厱閻庯綆鍋呯亸浼存煏閸パ冾伃妞ゃ垺娲熼弫鎰板炊瑜夐幏浼存⒒娴ｅ憡鎯堥柣顓烆槺缁辩偤鍩€椤掍降浜滈柨鏃傛櫕閸欌偓闂佸搫鑻粔鐑铰ㄦ笟鈧弻娑㈠箻鐎靛憡鍒涢悗瑙勬礈婢ф骞嗛弮鍫澪?*/
    132:   border-bottom: 1px solid rgba(23, 51, 104, 0.1); /* 濠电姷鏁告慨鐑姐€傞鐐潟闁哄洢鍨圭壕濠氭煙鏉堝墽鐣辩痪鎯х秺閺岋繝宕堕妷銉т痪闂佺顑呴ˇ顖炲煘閹达箑纾兼繝濠傛捣閸斿摜绱掗悙顒€鍔ゆ繛纭风節瀵鎮㈤搹鍦紲闂侀潧绻掓慨鐢告倶閸儲鈷戦柛娑橈工婵偓闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粎绮婚幘鑽ゅ祦闁规壆澧楅崐閿嬨亜閹烘垵鈧敻寮ㄩ崘娴嬫斀闁绘劕寮堕埢鏇灻瑰鍕疄闁糕晜鐩獮瀣倷椤忓啰鐩庨梻浣告惈閸婂湱鈧瑳鍥х畾闁割偅绺鹃弨浠嬫煃閵壯冧缓闁稿鍨介弻锛勪沪閸撗勫垱婵犵鍓濋幃鍌涗繆閻戣棄鐓涘ù锝囶焾瀵兘姊虹拠鍙夊攭妞ゎ偄顦叅婵☆垳鍘ч崹婵嬫煙閹规劦鍤欑紒鐘靛█閺岋絽螣缂佹ǜ浠ч梺杞扮濡繈寮诲鍫闂佸憡鎸婚悷鈺呭春?*/
    133:   box-shadow: 0 18px 50px rgba(6, 26, 58, 0.08); /* 濠电姷鏁告慨鐑姐€傞鐐潟闁哄洢鍨圭壕濠氭煙鏉堝墽鐣辩痪鎯х秺閺岋繝宕堕妷銉т痪闂佺顑呴ˇ顖炲煘閹达箑纾兼繝濠傛捣閸斿摜绱掗悙顒€鍔ゆ繛纭风節瀵鎮㈤搹鍦紲闂侀潧绻掓慨鐢告倶閸儲鈷戦柛娑橈工婵偓闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粎绮婚幘璇茬畾鐎光偓閸曞灚鏅╃紒鐐妞存悂宕撻悽鍛娾拺闁圭瀛╅ˉ鍫ユ煛娓氬洤娅嶇€规洘鍨块獮妯肩磼濡桨缂撶紓鍌欑椤戝懘濡靛鈧畷鐗堢節閸ャ劉鎷洪梻鍌氱墐閺呮繄绮旈崜浣虹＜闁艰壈鍩栭ˉ澶屸偓瑙勬尭鐎氭澘顫忛搹瑙勫厹闁告粈鐒︾紞鍫ユ⒑閸涘﹥鈷愰柛銊ュ缁?*/
>   134:   backdrop-filter: blur(18px); /* 濠电姷鏁告慨鐑姐€傞鐐潟闁哄洢鍨圭壕濠氭煙鏉堝墽鐣辩痪鎯х秺閺岋繝宕堕妷銉т痪闂佺顑呴ˇ顖炲煘閹达箑纾兼繝濠傛捣閸斿摜绱掗悙顒€鍔ゆ繛纭风節瀵鎮㈤搹鍦紲闂侀潧绻掓慨鐢告倶閸儲鈷戦柛娑橈工婵偓闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粎绮婚幘璇茬疇婵犻潧娲㈤崑鍛存煕閹扳晛濡挎い锔诲弮閹嘲顭ㄩ崨顓ф毉闁汇埄鍨遍〃濠囧箖閳ユ枼妲堥柕蹇ョ磿閸樺崬鈹戦悩鎵嶅牓宕戦幘鍓佺＜闁逞屽墯缁楃喖鍩€椤掑嫬绠栨慨妞诲亾闁轰焦鎹囬幃鈺呭礃閸欏鏆梻鍌欑閸熷潡骞栭锕€鐤柟娈垮枛椤?*/
    135: }
    136: 
    137: .site-header-inner {
    138:   position: relative; /* 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌ｉ幋锝呅撻柛濠傛健閺屻劑寮撮悙娴嬪亾瑜版帒纾婚柨鐔哄У閻撳繐顭跨捄鐑橆棡婵炲懎妫濋弻娑欐償閵忕姷浼岄梺鍝勭潤閸℃瑧鏉搁梺鎸庣箓閹冲秶鑺辨禒瀣拺鐎规洖娲ㄧ敮娑欐叏婵犲倻绉哄┑锛勬暬瀹曠喖顢涘槌栧晪闂佽崵濮撮幖顐﹀箹椤愶絿鐝跺鑸靛姈閳锋垿鏌熼懖鈺佷粶闁逞屽墯閸ㄥ灝鐣烽幇顑芥斀閻庯綆浜ｉ幗鏇㈡⒑闂堟稓澧曟い锔诲灣缁牓宕奸妷锔绘濡炪倖鍔﹂崑鍕嵁濮椻偓閺岋綁鍩℃笟鈧崣鍕叏婵犲洨绱伴柕鍥ㄥ姍楠炴帒鈹戦崶鑸殿棝婵犵數濮幏鍐礋閸偆鏆紓鍌欑贰閸犳鎮烽敃鈧銉╁礋椤撴繃鍕冪紓浣割儏閵囨ɑ绔熼弴銏♀拺闁圭娴风粻鎾澄旈悩鍙夊暈缂佸倸绉撮…銊╁礋閳衡偓缁ㄥ鏌熼崗鑲╂殬闁搞劌顭烽獮濠囧炊椤掍胶鍘搁柣蹇曞仩椤曆囧焵椤掍胶绠為柣娑卞櫍楠炲洭顢橀悢宄板Τ闂備焦瀵х换鍌毭洪妸鈺佸偍闁规壆澧楅悡鐔煎箹濞ｎ剙鈧倕顭囬幇顓犵闁告瑥顦遍惌鎺斺偓瑙勬磻閸楁娊鐛Ο灏栧亾闂堟稑顥忔繛鏉戝濮婃椽骞愭惔銏㈩槬闂佺锕ら幗婊勭珶閺囥垹绀傞柤娴嬫櫇閻﹀牊绻濋悽闈浶㈤柛濠勭帛閺呭爼濮€閳垛晛浜鹃悷娆忓缁€鍐磼椤旇姤灏い顐㈢箰鐓ゆい蹇撳瀹撳秴顪冮妶鍡樺暗濠殿喖顕划顓㈡晸閻樻枼鎷洪梺鍛婄☉閿曘儵鍩涢幇鐗堝仺妞ゆ牗绮屾禒婊堟煃鐠囨煡鍙勫┑顔瑰亾闂侀潧鐗嗗Λ妤佺閾忓湱纾奸柛鎾楀喚鏆梺鎸庤壘闇夋繝濠傜墢閻ｆ椽鏌熼鐓庢Щ闁宠姘︾粻娑㈠箼閸愌呯；闂傚倷鑳剁划顖炲箹閳哄懎鍨傜€规洖娲﹂～鏇㈡煙閻愵剙澧柛姘儔閺屾稑鈽夐崡鐐寸亪濠电偛鐗婇〃濠囧箖濡ゅ啯鍠嗛柛鏇ㄥ墰椤︺劌鈹戦敍鍕粧缂侇喗鐟╅悰顕€寮介鐐村祶濡炪倖鎸鹃崰搴ㄦ偟娴煎瓨鈷戦柡鍌樺劜濞呭懘鏌涢悤浣哥仸鐎?*/
    139:   z-index: 3000; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜濋弲婊堟煟閹伴潧澧幖鏉戯躬濮婅櫣鍖栭弴鐐测拤缂備礁顑嗙敮鈥崇暦閺囩喓绡€闁稿被鍊楅崬鐢告煟閻樼儤銆冮悹鈧敃鍌氱？鐎广儱鎮块悷閭︾叆闁告洦鍘鹃悡澶愭⒑閸濆嫭婀伴柣鈺婂灦閵嗕線寮撮姀鈩冩珳闂佺硶鍓濋悷顖毼ｉ鍕拻濞达絽鎲￠崯鐐烘煛瀹€瀣М鐎规洘娲熼幃鐣岀矙閼愁垱鎲伴梻浣哄仺閸庢煡宕滃璺鸿Е閻庯綆鍠楅悡鏇熺箾閹存繂鑸归柣蹇ョ稻閵囧嫰寮幐搴℃灎濠殿喖锕ュ钘夌暦椤愶箑唯闁靛鍊栭崟鍐⒒娴ｇ儤鍤€闁规祴鍓濈换娑欑節閸屻倕娈ㄦ繝鐢靛У閼归箖鏌嬮崶顒佺厪濠㈣泛鐗嗛崜濠氭煃閸濆嫭鍣洪柣鎾崇箰椤法鎹勯搹鐟邦暫闂佸憡姊瑰銊ф閹烘嚦鏃€鎷呴崷顓燁吇缂傚倷娴囨ご鎼佸箰婵犳艾绠柛娑欐綑缁狅綁鏌熼悜妯虹仸闁稿孩鎸搁埞鎴︽偐閹颁礁鏅遍梺鍝ュУ椤ㄥ懘鈥﹂崶褉鏋庨柟鎯х摠濞呭洭姊洪棃娑氱疄闁稿鍊濆顐﹀磼閻愬鍘卞銈嗗姂閸婃洟寮搁弮鍫熺厱闁哄啫娲︾涵鐐亜椤忓嫬鏆ｅ┑鈥崇埣瀹曞崬螣闁垮顏搁梻鍌欒兌椤牏鈧稈鏅滅换娑欑節閸屾粍娈惧┑掳鍊撻懗鍓佸姬閳ь剟姊虹粙鎸庢拱妞ゃ劌妫濋敐鐐差吋婢跺鎷洪梺鑽ゅ枑濠㈡﹢鍩涢弮鈧妵鍕箳閹捐泛寮ㄩ悗娈垮枔閸斿秶鎹㈠┑鍡╂僵妞ゆ挾濮撮獮?*/
    140:   display: flex; /* Logo 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤愩垻浜伴柣搴″帨閸嬫捇鏌涢弴銊ュ婵炲牞绲介—鍐Χ閸℃瑥顫х紓浣哄劋鐎笛呯矉瀹ュ牄浜归柟鐑樻尵閸樺崬鈹戦悙鏉戠仸闁挎洦鍋婂畷婵嬫偄閸忚偐鍘介梺缁樻閺€杈╂嫻閿熺姵鐓欓柤纰卞墻閻掔偓銇勯幘鐐藉仮鐎规洖宕灃濠电姴鍊归鎾绘⒒閸屾瑧顦︽繝鈧潏銊︽珷婵°倐鍋撴い顓炵仢铻ｉ柤娴嬫櫇閻掑ジ姊虹粙鎸庢拱濠㈣娲熷畷鎴﹀箻缂佹ê浠梺鍝勵槹椤戞瑦绂掗幆褉鏀介柣姗嗗枛閻忣亪鏌ㄩ弴妯虹仼妞ゎ偄绻橀獮鍡涒€栭鍌氭灁闁瑰嘲顑呴悾鐑藉炊閳哄啯姣庢繝纰夌磿閸嬫垿宕愰弽顓熷亱妞ゆ挾濮寸欢銈夋煠濞村娅堝┑顔煎暱閳规垿鎮╁畷鍥舵殹闂佺粯鎸婚悷锕傚Φ閸曨垰绫嶉柛灞剧⊕閻濐亪姊哄ú璇插箺閻㈩垱顨婇妴鍐Ψ閳哄倸鈧兘鏌℃径瀣仸閻犲洨鍋涜灃闁绘﹢娼ф禒锕傛偨椤栥倗绡€闁绘侗鍠氶埀顒婄秵娴滄牠寮ㄦ禒瀣厱妞ゆ劧绲块惌灞剧箾?*/
    141:   align-items: center; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閼碱剦妲烽梻浣告惈濞层垽宕归崷顓犱笉闁绘顕х粻褰掓煙绾板崬骞橀柛妯荤洴閺屸剝鎷呴棃鈺勫惈闂佸搫鐬奸崰鏍箖瑜斿畷濂告偄閸濆嫬娈ラ梻鍌欑劍閹爼宕濆畝鍕９闁秆勵殔閽冪喐绻涢幋鐐电叝婵炲矈浜弻娑㈠箻濡も偓閹虫劙宕㈤幋鐘电＝闁稿本鐟ㄩ崗宀勬煣韫囨捇鍙勭€规洖缍婂畷濂稿即閻愮數鏆繝娈垮枟閵囨盯宕戦幘缁樼厵妞ゆ梻鏅幊鍥┾偓瑙勬穿缁叉儳顕ラ崟顒傜瘈闁告劕褰為幋鐑芥⒒?*/
    142:   justify-content: space-between; /* Logo 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵稿妽闁稿顑夐悡顐﹀炊閵婏腹鎷归梺鍛婄懃缁绘﹢骞冨Δ鈧埥澶娾枎濡厧濮洪梻浣哥－缁垰煤閻斿吋鍋傛い鎰剁畱閻愬﹪鏌曟繛褉鍋撳┑顔兼喘濮婃椽宕崟顒€顎涢梺鍛婃尵閸犳牠鐛崘顭戞建闁逞屽墴楠炲啫鈻庨幘宕囬獓闂佺懓顕慨鎶藉窗婵犲嫮纾介柛灞剧懅閸斿秹鏌涢悙璺哄惞缂佽京鍋炵粭鐔煎焵椤掆偓椤曪絿鎷犲ù瀣潔濠电姴锕ら幊鎰板级閹间焦鈷戦悷娆忓缁€鍐╃箾閸涱喗纾荤紒銊︽そ濮婄粯鎷呯粵瀣缂備胶绮崝鏇㈡箒濠殿喗顭堝▔娑㈠垂閸岀偞鍋ｉ弶鐐村缁夋寧绻涢幋娆忕仼缂佲偓閸愨斂浜滈柡鍐ㄦ处椤ュ霉濠婂啰绉烘慨濠冩そ瀹曠兘顢橀悩鑼偧闂佹眹鍩勯崹鎶藉磻閵堝牊顥?*/
    143:   width: min(100% - 48px, 1600px); /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晜閽樺缃曢梻浣告啞閸旓箓宕伴弽顐㈩棜濠电姵纰嶉悡娆撴煟閹伴潧澧褜鍨堕弻锝夊棘閹稿寒妫﹂梺鍝勬湰閻╊垶銆侀弴銏狀潊闁宠棄妫欓ˉ锝夋⒒娴ｅ憡鎲搁柛锝冨劦瀹曟垶绻濋崒銈呮濡炪倖鍔х粻鎴︽煁閸ヮ剚鐓涢柛銉㈡櫅閺嬪酣鏌嶈閸撴盯寮繝姘摕婵炴垯鍨洪弲婊堟偣閸ャ劌绲荤紒鐘虫そ濮婃椽骞栭悙娴嬪亾閹版澘纾婚柟鍓х節缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閻楁洟锝炶箛娑欏仭闂侇叏闄勭紞搴ㄦ偡濠婂懎顣奸悽顖涘笧缁?*/
    144:   height: 82px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柛娆忣槹閸欏繑淇婇悙棰濆殭濞存粓绠栧铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
    145:   margin: 0 auto; /* 濠电姷鏁告慨鐑姐€傞鐐潟闁哄洢鍨圭壕濠氭煙鏉堝墽鐣辩痪鎯х秺閺岋繝宕堕妷銉т痪闂佺顑呴ˇ顖炲煘閹达箑纾兼繝濠傛捣閸斿摜绱掗悙顒€鍔ゆ繛纭风節瀵鎮㈤搹鍦紲闂侀潧绻掓慨鐢告倶閸儲鈷戦柛娑橈工婵偓闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粎绮婚幘鑽ゅ祦闁圭増婢樼粻鐟懊归敐鍛暈闁诲寒鍓熷娲礈閹绘帊绨煎┑鐐插级閿曘垹鐣烽幇鐗堝仺闁汇垹鐏氶敍蹇擃渻閵堝棙灏甸柛瀣仦閸掑﹪宕楅懖鈺冾啎闂佺绻掗崢褎鎱ㄥ澶嬬厸鐎光偓鐎ｎ剛鐦堥悗瑙勬礋娴滃爼銆佸鈧幃鈺呮儔椤忓懎鐏存慨濠冩そ閹兘寮堕幐骞晠姊虹涵鍛彧闁挎洏鍨介幃浼搭敊閸㈠鍠栭幖鍦喆閸曨剦鍟庨梻鍌欑劍閹爼宕曢鐐茬閹艰揪绲洪崑鎾愁潩椤掑倐銏ゆ煃?*/
    146: }
    147: 
    148: /* ================================
    149:    03. Logo
    150: ================================ */
    151: 
    152: .site-logo {
    153:   position: relative; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣妯款嚙缁犲灚銇勮箛鎾搭棞缂佽翰鍊濋弻娑㈠箻濡も偓閸燁偊鎮樻繝鍥ㄢ拺闁告挻褰冩禍鏍煕閵娿劍顏犻柍褜鍓氶懝楣冣€﹂悜钘夎摕闁挎繂顦Λ姗€鏌涢…鎴濇灍闁稿鍨跺铏圭矙閸ф鈧鏌ｉ鐐测偓鍨嚕鐠囨祴妲堟繛鍡樺灩閻﹀牓姊洪崨濠冨闁稿鎳橀幃妤冩嫚瀹割喗瀵?Logo 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤愩垻浜伴柣搴″帨閸嬫捇鏌涢弴銊ュ婵炲牞绲介—鍐Χ閸℃瑥鈷堥梺绋款儐缁嬫挻绔熼弴鐔侯浄閻庯綆鍋嗛崢浠嬫⒑闂堟稓绠冲┑顔炬暬瀹曨垶鎮欓悜妯煎幈?Logo 闂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏇炲€归崕鎴犳喐閻楀牆绗掔紒鈧径灞稿亾閸忓浜鹃梺閫炲苯澧撮柛鈹惧亾濡炪倖甯婄粈渚€宕甸鍕厱闁规儳顕粻鐐测攽閿涘嫭鏆鐐叉喘瀵墎鎹勯妸褎缍侀梻鍌欑婢瑰﹪宕戦崨顖涘床闁告洦鍨版导鐘充繆閵堝懏鍣洪柍閿嬪灴閹綊宕堕敐鍌氫壕鐎规洖娲犻崑鎾寸節濮橆厼鈧爼鏌ｉ幇顖涚【鐞氭艾鈹戦悙鍙夊櫣缂佸鎳撻～?*/
    154:   z-index: 2; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜濋弲婊堟煟閹伴潧澧幖鏉戯躬濮婅櫣鍖栭弴鐐测拤缂備礁顑嗙敮鈥崇暦?Logo 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃繘骞戦姀銈呯婵°倐鍋撶痪鍓х帛缁绘盯骞嬪▎蹇曚患缂佺偓鍎冲﹢杈╂閹惧瓨濯撮柣褔鏅茬欢闈涒攽閻愯尙澧旂紒顔界懇瀵鈽夐姀鐘栥劍銇勯弮鈧崕宕囨暜閵夈儮鏀介柣鎰皺婢ф稒銇勯妸銉︻棡缂佸矁椴哥换婵嬪炊閼稿灚娅栨繝娈垮枟閿曗晠宕ｉ埀顒傜棯椤撴稑浜鹃梻鍌氬€烽懗鍫曞储瑜忕槐鐐寸節閸曨厺绗夐梺鍝勭▉閸樿偐绮婚弽銊﹀弿婵＄偠顕ф禍楣冩⒑鐠団€虫灍闁荤啿鏅涢悾鐑芥晲閸℃绐炴繝鐢靛Т閸犳碍绂掕濮婂宕掑▎鎺戝帯闂佸憡顭嗛崶銊モ偓鑸垫叏濡寧纭鹃柛銊ュ€婚幉鎼佹偋閸繄鐟ㄩ梺缁樺笒閻忔岸濡甸崟顖氱闁挎繂妫涢妴濠勭磽娴ｉ顦﹂柛銏＄叀閳ワ箓宕稿Δ浣镐画闂佽顔栭崰鏍焻閻㈠憡鍊?*/
    155:   display: inline-block; /* 闂?Logo 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢绘俊鐐€栭悧婊堝磻濞戙垹鍨傞柛灞剧◤娴滄粓鏌″鍐ㄥ闁靛棙甯楅妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喖鎮滈埡鍌氼伕婵犵數濮甸鏍垂娴兼潙围闁归棿绀侀拑鐔哥箾閹存瑥鐏╃紒鐘电帛娣囧﹪濡堕崒姘闂備胶鎳撻崯璺ㄦ崲濮椻偓楠炲啫螖閸滀焦鏅ｉ梺闈涢獜缁辨洟宕㈡禒瀣厵闁稿繗鍋愰弳姗€鏌涢弬娆炬█鐎规洘鍨块獮姗€寮妷锔绘綌婵犳鍠楅…鍫熺椤掑嫬鍌ㄦい鏍仦閳?*/
    156:   flex: 0 0 auto; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮闁汇値鍠楅妵鍕箛閳轰胶鍔撮梺鎼炲€栧ú鐔煎蓟濞戙埄鏁冮柨婵嗘椤︹晠姊?Logo 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾绾惧鏌ｉ幇顒佹儓缂佲偓閸曨厽鍠愰柣妤€鐗嗙粭鎺旂棯閹岀吋闁哄本鐩鎾Ω閵夈儳顔戦梻浣告惈濡瑧鍒掗幘璇茶摕婵炴垯鍨瑰敮闂侀潧绻嗛崜婵嬫偟閺嶎偆纾?*/
    157:   width: 188px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC Logo 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃秹婀侀梺缁樺灥椤洟鍩€椤戣法鍔嶇紒缁樼箞瀹曟垿鎳為妷褎鍒涢悗瑙勬礈閸犳牠銆佸Ο琛℃婵☆垳鎳撻ˉ?*/
    158:   height: 43px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC Logo 濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滈箖鏌￠崶銉ョ仼缁炬儳婀遍幉鎼佹偋閸繄鐟查梺鍝勬媼娴滎亜顫?*/
    159:   aspect-ratio: 386.88 / 87.43; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣妯款嚙缁犲灚銇勮箛鎾搭棤缂佲偓婵犲洦鐓冪憸婊堝礈濮樿鲸宕叉繛鎴炵懃缁剁偤鎮楅敐搴′簽妞わ缚鍗抽幃妤€鈻撻崹顔界彯闂佺顑呴敃銉︾┍婵犲洤閱囬柡鍥╁仧閸婄偤姊洪幐搴ｇ畵闁瑰啿绉电粩鐔煎即閵忥紕鍘介梺缁樻煥閹芥粓骞婇崘銊㈡斀妞ゆ牗姘ㄩ崺锝嗩殽閻愬樊鍎旈柡浣稿暣閸┾偓妞ゆ帒瀚€?SVG 婵犵數濮烽弫鍛婃叏閻㈠壊鏁婇柡宥庡幖闂傤垱銇勯弽銊х煀缂佽翰鍊曡灃闁挎繂鎳庨弳娆撴煢閸愵亜鏋旈柟鍙夌摃缁犳盯骞橀娑氣偓濠氭⒑闂堟稓绠為柛濠冩礀閺侇噣姊绘担绋挎毐闁圭⒈鍋婂畷鎰版偡閹佃櫕鐎洪梺鍝勭▉閸樹粙宕愰悽鍛婄厱闊洦鎼╁Σ绋棵瑰鍫㈢暫婵﹥妞藉畷銊︾節閸愵煈妲卞┑鐐茬摠缁酣宕戦悢鑲猴綁骞囬澶嬪兊闂佺厧鎽滈。浠嬪箯閾忓湱纾藉ù锝呭閸庢挻绻涙径瀣缂侇喖顭烽獮宥夘敊閸撗嶇床濠电姰鍨煎▔娑㈡儗閸惊娑欐償閵婏妇鍘梺鎼炲劘閸斿本鎱ㄩ崼鈶╁亾閸偅绶查悗姘煎弮楠炲棝寮惔鎾搭潔濠德板€撻懗璺侯焽?*/
```

### app\products\products.css

- 第 86 行：.products-selection-page .category-tabs-wrap {
- 第 92 行：.products-selection-page .category-tabs {
- 第 100 行：.products-selection-page .category-tab {
- 第 117 行：.products-selection-page .category-tab:hover,
- 第 118 行：.products-selection-page .category-tab.active {
- 第 124 行：.products-selection-page .selection-section {
- 第 135 行：.products-selection-page .filter-panel {
- 第 142 行：.products-selection-page .filter-head {
- 第 148 行：.products-selection-page .filter-head h3 {
- 第 155 行：.products-selection-page .filter-head p {

```text
     76:   justify-content: center;
     77:   border: 1px solid rgba(23, 51, 104, 0.14);
     78:   border-radius: 999px;
     79:   background: #ffffff;
     80:   color: var(--brand-blue);
     81:   font-size: 13px;
     82:   font-weight: 850;
     83:   white-space: nowrap;
     84: }
     85: 
>    86: .products-selection-page .category-tabs-wrap {
     87:   padding: 16px 0 22px;
     88:   border-bottom: 1px solid var(--line);
     89:   background: #ffffff;
     90: }
     91: 
     92: .products-selection-page .category-tabs {
     93:   display: flex;
     94:   align-items: center;
     95:   gap: 12px;
     96:   overflow-x: auto;
     97:   scrollbar-width: thin;
     98: }
     99: 
    100: .products-selection-page .category-tab {
    101:   min-height: 44px;
    102:   padding: 0 22px;
    103:   border-radius: 8px;
    104:   border: 1px solid rgba(23, 51, 104, 0.16);
    105:   background: #ffffff;
    106:   color: var(--brand-blue);
    107:   cursor: pointer;
    108:   font-size: 15px;
    109:   font-weight: 850;
    110:   white-space: nowrap;
    111:   transition:
```

### app\contact\contact.css

- 第 272 行：.contact-section {
- 第 281 行：.contact-section-inner {
- 第 288 行：.contact-section-head {
- 第 299 行：.contact-section-title {
- 第 314 行：.contact-section-desc {
- 第 332 行：.contact-support-section {
- 第 435 行：.contact-form-section {
- 第 932 行：.contact-info-section {
- 第 1273 行：.contact-section {
- 第 1278 行：.contact-section-head {

```text
    262:     /* 绂佺敤鐘舵€侀紶鏍囨樉绀轰笉鍙偣鍑?*/
    263:     transform: none;
    264:     /* 绂佺敤鐘舵€佷笉鍏佽涓婃诞 */
    265: }
    266: 
    267: 
    268: /* =========================================================
    269:    4. 閫氱敤鍐呭鍖?
    270: ========================================================= */
    271: 
>   272: .contact-section {
    273:     width: 100%;
    274:     /* 鍖哄潡瀹藉害鍗犳弧椤甸潰 */
    275:     padding: 88px 28px;
    276:     /* 鍖哄潡涓婁笅鍜屽乏鍙冲唴杈硅窛 */
    277:     background: #ffffff;
    278:     /* 榛樿鐧借壊鑳屾櫙 */
    279: }
    280: 
    281: .contact-section-inner {
    282:     max-width: var(--contact-content-width);
    283:     /* 鍐呭鏈€澶у搴?*/
    284:     margin: 0 auto;
    285:     /* 鍐呭鍖哄煙姘村钩灞呬腑 */
    286: }
    287: 
    288: .contact-section-head {
    289:     max-width: 840px;
    290:     /* 鏍囬鍖烘渶澶у搴?*/
    291:     margin-bottom: 34px;
    292:     /* 鏍囬鍖哄拰鍐呭涔嬮棿鐨勮窛绂?*/
    293:     padding-bottom: 24px;
    294:     /* 鏍囬鍖哄簳閮ㄧ暀鐧?*/
    295:     border-bottom: 1px solid var(--contact-line);
    296:     /* 鏍囬鍖哄簳閮ㄥ垎鍓茬嚎 */
    297: }
```

### app\applications\ivd\ivd-application.css

- 第 157 行：.ivd-section {
- 第 161 行：.ivd-section-light {
- 第 165 行：.ivd-section-inner {
- 第 170 行：.ivd-section-head {
- 第 175 行：.ivd-section-title {
- 第 184 行：.ivd-section-desc {
- 第 257 行：.ivd-instrument-btn.active {
- 第 262 行：.ivd-instrument-btn.active::before {
- 第 267 行：.ivd-instrument-btn.active b {
- 第 272 行：.ivd-instrument-btn.active strong {

```text
    147:   width: 7px;
    148:   height: 7px;
    149:   margin-top: 10px;
    150:   background: var(--cyan);
    151: }
    152: 
    153: /* =========================================================
    154:    通用区块
    155: ========================================================= */
    156: 
>   157: .ivd-section {
    158:   padding: 78px 36px;
    159: }
    160: 
    161: .ivd-section-light {
    162:   background: var(--bg);
    163: }
    164: 
    165: .ivd-section-inner {
    166:   max-width: var(--max);
    167:   margin: 0 auto;
    168: }
    169: 
    170: .ivd-section-head {
    171:   display: block;
    172:   margin-bottom: 32px;
    173: }
    174: 
    175: .ivd-section-title {
    176:   color: var(--blue);
    177:   font-size: clamp(28px, 3vw, 42px);
    178:   line-height: 1.2;
    179:   letter-spacing: -0.03em;
    180:   font-weight: 760;
    181:   margin: 0 0 10px;
    182: }
```

### app\resources\datasheets\datasheets.css

- 第 284 行：.datasheets-page .datasheets-category-bar {
- 第 291 行：.datasheets-page .filter-row {
- 第 297 行：.datasheets-page .section-filter-row {
- 第 305 行：.datasheets-page .filter-btn {
- 第 322 行：.datasheets-page .filter-btn:hover,
- 第 323 行：.datasheets-page .filter-btn.is-active {
- 第 332 行：.datasheets-page .datasheets-filter-panel {
- 第 340 行：.datasheets-page .section-head {
- 第 348 行：.datasheets-page .section-head-main {
- 第 353 行：.datasheets-page .section-title {

```text
    274: /* ================================
    275:    6. 分类筛选按钮居中区域
    276: 
    277:    说明：
    278:    1. 分类按钮放在规格书标题上方
    279:    2. 整行居中显示
    280:    3. 多语言按钮过长时自动换行
    281:    4. 避免英文、西语、法语、俄语挤压标题
    282: ================================ */
    283: 
>   284: .datasheets-page .datasheets-category-bar {
    285:   width: 100%;
    286:   margin: 0 0 34px;
    287:   display: flex;
    288:   justify-content: center;
    289: }
    290: 
    291: .datasheets-page .filter-row {
    292:   display: flex;
    293:   flex-wrap: wrap;
    294:   gap: 10px;
    295: }
    296: 
    297: .datasheets-page .section-filter-row {
    298:   display: flex;
    299:   flex-wrap: wrap;
    300:   justify-content: center;
    301:   gap: 12px;
    302:   max-width: 100%;
    303: }
    304: 
    305: .datasheets-page .filter-btn {
    306:   height: 38px;
    307:   padding: 0 18px;
    308:   border: 1px solid var(--line);
    309:   border-radius: 8px;
```

### app\resources\selection-support\fitting-replacement\fitting-replacement.css

- 第 162 行：.frp-tab-button.active,
- 第 262 行：.frp-history-button.active {
- 第 272 行：.frp-card-section {
- 第 276 行：.frp-section-head {
- 第 286 行：.frp-section-head h2 {
- 第 295 行：.frp-section-head p {
- 第 302 行：.frp-section-head span {
- 第 452 行：.frp-section-head {
- 第 468 行：.frd-drawing-section {
- 第 589 行：.frd-drawing-section {

```text
    152:   cursor: pointer;
    153:   transition:
    154:     background 0.18s ease,
    155:     color 0.18s ease;
    156: }
    157: 
    158: .frp-tab-button + .frp-tab-button {
    159:   border-left: 1px solid rgba(23, 51, 104, 0.14);
    160: }
    161: 
>   162: .frp-tab-button.active,
    163: .frp-tab-button:hover {
    164:   background: #173368;
    165:   color: #09e9b4;
    166: }
    167: 
    168: /* =========================================================
    169:    鎼滅储鍖?
    170: ========================================================= */
    171: 
    172: .frp-search-panel {
    173:   margin-bottom: 42px;
    174:   padding: 20px 0 18px;
    175:   background: #f6f8fb;
    176:   border-top: 1px solid rgba(23, 51, 104, 0.14);
    177:   border-bottom: 1px solid rgba(23, 51, 104, 0.14);
    178: }
    179: 
    180: .frp-search-row {
    181:   width: min(760px, calc(100% - 48px));
    182:   margin: 0 auto;
    183:   display: grid;
    184:   grid-template-columns: 1fr 96px;
    185: }
    186: 
    187: .frp-search-input {
```

### components\products\detail\product-detail.module.css

- 第 142 行：.thumbArrow:active {
- 第 170 行：.thumb.isActive {
- 第 174 行：.thumb.isActive::after {
- 第 322 行：.button:active {
- 第 345 行：.detailSection {
- 第 384 行：.tabButton.isActive {
- 第 388 行：.tabButton.isActive::after {
- 第 404 行：.panel.isActive {
- 第 425 行：border-collapse: collapse;
- 第 796 行：.thumbArrow:active {

```text
    132:   font-size: 26px;
    133:   line-height: 1;
    134:   font-weight: 900;
    135:   transition:
    136:     background 0.18s ease,
    137:     color 0.18s ease,
    138:     border-color 0.18s ease;
    139: }
    140: 
    141: .thumbArrow:hover,
>   142: .thumbArrow:active {
    143:   border-color: var(--blue);
    144:   background: var(--blue);
    145:   color: var(--cyan);
    146: }
    147: 
    148: .thumb {
    149:   position: relative;
    150:   display: flex;
    151:   overflow: visible;
    152:   align-items: center;
    153:   justify-content: center;
    154:   transition:
    155:     border-color 0.18s ease,
    156:     background 0.18s ease;
    157: }
    158: 
    159: .thumb::after {
    160:   content: "";
    161:   position: absolute;
    162:   right: 0;
    163:   bottom: 0;
    164:   left: 0;
    165:   height: 0;
    166:   background: var(--cyan);
    167:   transition: height 0.18s ease;
```

### app\[locale]\products\products.css

- 第 154 行：.product-category-tabs {
- 第 161 行：.product-category-tab {
- 第 177 行：.product-category-tab:hover,
- 第 178 行：.product-category-tab.is-active {
- 第 192 行：.product-selection-sidebar {
- 第 201 行：.product-selection-filter-head {
- 第 209 行：.product-selection-filter-head strong {
- 第 215 行：.product-selection-filter-head button,
- 第 224 行：.product-selection-filter-head button:hover,
- 第 229 行：.product-selection-filter-groups {

```text
    144:     color 0.18s ease;
    145: }
    146: 
    147: .product-selection-recent-button:hover {
    148:   border-color: #09e9b4;
    149:   background: #173368;
    150:   color: #09e9b4;
    151: }
    152: 
    153: /* 椤堕儴浜у搧澶х被鎸夐挳 */
>   154: .product-category-tabs {
    155:   display: flex;
    156:   flex-wrap: wrap;
    157:   gap: 10px;
    158:   margin: 0 0 28px;
    159: }
    160: 
    161: .product-category-tab {
    162:   min-height: 42px;
    163:   padding: 0 20px;
    164:   border: 1px solid rgba(23, 51, 104, 0.2);
    165:   border-radius: 8px;
    166:   background: #ffffff;
    167:   color: #173368;
    168:   font-size: 15px;
    169:   font-weight: 900;
    170:   cursor: pointer;
    171:   transition:
    172:     background 0.18s ease,
    173:     color 0.18s ease,
    174:     border-color 0.18s ease;
    175: }
    176: 
    177: .product-category-tab:hover,
    178: .product-category-tab.is-active {
    179:   border-color: #173368;
```

### app\resources\news\news.css

- 第 64 行：.newsSearchSection {
- 第 72 行：.newsSearchSection .frp-search-input::placeholder {
- 第 76 行：.newsSearchSection .frp-search-input:focus {
- 第 82 行：.newsSearchSection .frp-search-button:hover {
- 第 92 行：.newsListSection {
- 第 98 行：.newsListSection__head {
- 第 106 行：.newsListSection__title {
- 第 115 行：.newsCategoryTabs {
## 7. 现有接头数据、路由与Q20模块

### data\resources\fitting-replacement\fittings\quick-connect\q20\q20.zh.ts

- 第 2 行：q20.zh.ts
- 第 3 行：恒永达官网｜接头替代查询｜快插接头 Q20 中文数据
- 第 6 行：data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
- 第 9 行：1. 存放快插接头 Q20 的产品数据
- 第 10 行：2. 存放 Q20 型号解析规则
- 第 11 行：3. 供接头替代查询首页、详情页、选型指引读取
- 第 14 行：1. 此文件由 scripts/resources/convert-q20-fitting-replacement.ts 自动生成
- 第 17 行：data-source/resources/fitting-replacement/Q20系列_测试数据.xlsx
- 第 19 行：npx tsx scripts/resources/convert-q20-fitting-replacement.ts
- 第 22 行：import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

```text
      1: /* =========================================================
>     2:    q20.zh.ts
      3:    恒永达官网｜接头替代查询｜快插接头 Q20 中文数据
      4: 
      5:    文件路径：
      6:    data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
      7: 
      8:    作用：
      9:    1. 存放快插接头 Q20 的产品数据
     10:    2. 存放 Q20 型号解析规则
     11:    3. 供接头替代查询首页、详情页、选型指引读取
     12: 
     13:    注意：
     14:    1. 此文件由 scripts/resources/convert-q20-fitting-replacement.ts 自动生成
     15:    2. 不建议手动修改本文件
     16:    3. 如需修改产品数据，请修改 Excel：
     17:       data-source/resources/fitting-replacement/Q20系列_测试数据.xlsx
     18:    4. 修改 Excel 后重新运行：
     19:       npx tsx scripts/resources/convert-q20-fitting-replacement.ts
     20: ========================================================= */
     21: 
     22: import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";
     23: 
     24: export const fittingReplacementQuickConnectQ20ZhData: FittingReplacementPageData = {
     25:   banner: {
     26:     eyebrow: "选型支持",
     27:     title: "接头替代查询",
```

### data\products\generated\tubing\detail\index.json

- 第 33 行："可结合接头、泵阀和压力范围确认",
- 第 91 行："question": "PVC 管可以搭配哪些接头？",
- 第 92 行："answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"
- 第 96 行："answer": "如果管路较长、内径较小、接头数量较多或目标流量较高，建议评估管路流阻、压降和泵阀匹配情况。"
- 第 100 行："answer": "建议提供介质、目标流量、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。"
- 第 113 行："question": "PVC 管可以搭配哪些接头？",
- 第 114 行："answer": "PVC 管可搭配倒刺接头、快插接头等软管连接件，具体需要根据管径、端口结构、密封方式和工作压力确认。"
- 第 118 行："answer": "如果管路较长、内径较小、接头数量较多或目标流量较高，建议评估管路流阻、压降和泵阀匹配情况。"
- 第 122 行："answer": "建议提供介质、目标流量、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。"
- 第 135 行："question": "PVC 管可以搭配哪些接头？",

```text
     23:     "commonApplications": [
     24:       "试剂输送",
     25:       "样本路径",
     26:       "设备内部管路",
     27:       "泵阀连接",
     28:       "流体系统集成"
     29:     ],
     30:     "features": [
     31:       "按材质与尺寸选型",
     32:       "适用于设备内部液路连接",
>    33:       "可结合接头、泵阀和压力范围确认",
     34:       "支持工程师协助评估流阻与压降"
     35:     ],
     36:     "specsTitle": "规格",
     37:     "specTitle": "规格",
     38:     "specificationTitle": "规格",
     39:     "specs": [
     40:       {
     41:         "label": "密度（g/cm³）",
     42:         "value": "1.18"
     43:       },
     44:       {
     45:         "label": "拉伸强度（Mpa）",
     46:         "value": "14.3"
     47:       },
     48:       {
     49:         "label": "弯曲强度（Mpa）",
     50:         "value": "68"
     51:       },
     52:       {
     53:         "label": "介电常数（KV/mm）",
     54:         "value": "4"
     55:       },
     56:       {
     57:         "label": "吸水性（%）",
     58:         "value": "0.12"
```

### services\resources\getFittingReplacementDetailData.ts

- 第 2 行：getFittingReplacementDetailData.ts
- 第 3 行：恒永达官网｜接头替代查询详情页数据服务层
- 第 6 行：services/resources/getFittingReplacementDetailData.ts
- 第 9 行：1. 根据商品编码读取单个接头替代详情
- 第 11 行：fittings / quick-connect / q20
- 第 12 行：3. 产品数据来自 q20.zh.ts
- 第 13 行：4. 详情页多语言文案来自 q20.detail.intl.ts
- 第 18 行：import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";
- 第 20 行：import { getFittingReplacementQuickConnectQ20DetailIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl";
- 第 23 行：FittingModelRule,

```text
      1: /* =========================================================
>     2:    getFittingReplacementDetailData.ts
      3:    恒永达官网｜接头替代查询详情页数据服务层
      4: 
      5:    文件路径：
      6:    services/resources/getFittingReplacementDetailData.ts
      7: 
      8:    作用：
      9:    1. 根据商品编码读取单个接头替代详情
     10:    2. 当前阶段默认读取：
     11:       fittings / quick-connect / q20
     12:    3. 产品数据来自 q20.zh.ts
     13:    4. 详情页多语言文案来自 q20.detail.intl.ts
     14:    5. 支持 zh / en / es / fr / ko / ru 多语言详情页文案
     15:    6. 后期接后台 / 数据库时，优先改这个文件
     16: ========================================================= */
     17: 
     18: import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";
     19: 
     20: import { getFittingReplacementQuickConnectQ20DetailIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl";
     21: 
     22: import type {
     23:   FittingModelRule,
     24:   FittingReplacementProduct,
     25: } from "@/data/resources/fitting-replacement/fitting-replacement.types";
     26: 
     27: import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";
```

### services\resources\getFittingReplacementHomeData.ts

- 第 2 行：getFittingReplacementHomeData.ts
- 第 3 行：恒永达官网｜接头替代查询首页数据服务层
- 第 6 行：services/resources/getFittingReplacementHomeData.ts
- 第 9 行：1. 获取接头替代查询首页数据
- 第 11 行：fittings / quick-connect / q20
- 第 12 行：3. 产品数据来自 q20.zh.ts
- 第 13 行：4. 首页多语言文案来自 q20.page.intl.ts
- 第 15 行：6. 后续新增 Q40、硬管接头、倒刺接头时，在数据源映射里继续扩展
- 第 19 行：fitting-replacement
- 第 20 行：└─ fittings

```text
      1: /* =========================================================
>     2:    getFittingReplacementHomeData.ts
      3:    恒永达官网｜接头替代查询首页数据服务层
      4: 
      5:    文件路径：
      6:    services/resources/getFittingReplacementHomeData.ts
      7: 
      8:    作用：
      9:    1. 获取接头替代查询首页数据
     10:    2. 当前阶段默认读取：
     11:       fittings / quick-connect / q20
     12:    3. 产品数据来自 q20.zh.ts
     13:    4. 首页多语言文案来自 q20.page.intl.ts
     14:    5. 支持 zh / en / es / fr / ko / ru 多语言首页文案
     15:    6. 后续新增 Q40、硬管接头、倒刺接头时，在数据源映射里继续扩展
     16:    7. 后期接 CMS / API / 数据库时，优先修改这里
     17: 
     18:    当前数据层级：
     19:    fitting-replacement
     20:    └─ fittings
     21:       └─ quick-connect
     22:          └─ q20
     23: ========================================================= */
     24: 
     25: import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";
     26: 
     27: import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";
```

### data\resources\fitting-replacement\fitting-replacement-series.config.ts

- 第 2 行：fitting-replacement-series.config.ts
- 第 3 行：恒永达官网｜接头替代查询系列配置
- 第 6 行：data/resources/fitting-replacement/fitting-replacement-series.config.ts
- 第 9 行：1. 统一管理接头替代查询不同系列的基础配置
- 第 10 行：2. 避免在 Home / Detail / Guide 组件里到处写死 q20 路径
- 第 11 行：3. 为后续 Q40 / Q60 / 其他接头系列做模板
- 第 16 行：1. Q20 快插接头
- 第 19 行：q40: {
- 第 20 行：seriesKey: "q40",
- 第 21 行：seriesCode: "Q40",

```text
      1: /* =========================================================
>     2:    fitting-replacement-series.config.ts
      3:    恒永达官网｜接头替代查询系列配置
      4: 
      5:    文件路径：
      6:    data/resources/fitting-replacement/fitting-replacement-series.config.ts
      7: 
      8:    作用：
      9:    1. 统一管理接头替代查询不同系列的基础配置
     10:    2. 避免在 Home / Detail / Guide 组件里到处写死 q20 路径
     11:    3. 为后续 Q40 / Q60 / 其他接头系列做模板
     12:    4. 支持中文路径和多语言路径
     13:    5. 解决外语页面点击详情后跳回中文详情页的问题
     14: 
     15:    当前支持：
     16:    1. Q20 快插接头
     17: 
     18:    后续扩展示例：
     19:    q40: {
     20:      seriesKey: "q40",
     21:      seriesCode: "Q40",
     22:      productName: "Q40 快插接头",
     23:      ...
     24:    }
     25: ========================================================= */
     26: 
     27: export type FittingReplacementSeriesKey = "q20";
```

### components\resources\fitting-replacement\FittingReplacementGuide.tsx

- 第 4 行：FittingReplacementGuide.tsx
- 第 5 行：恒永达官网｜接头选型指引组件
- 第 8 行：components/resources/fitting-replacement/FittingReplacementGuide.tsx
- 第 11 行：1. 展示接头选型指引
- 第 19 行：9. Q20 路径、清单来源、产品名称统一从系列配置读取
- 第 28 行：FittingModelRule,
- 第 29 行：FittingReplacementI18nText,
- 第 30 行：FittingReplacementPageData,
- 第 31 行：FittingReplacementProduct,
- 第 32 行：} from "@/data/resources/fitting-replacement/fitting-replacement.types";

```text
      1: "use client";
      2: 
      3: /* =========================================================
>     4:    FittingReplacementGuide.tsx
      5:    恒永达官网｜接头选型指引组件
      6: 
      7:    文件路径：
      8:    components/resources/fitting-replacement/FittingReplacementGuide.tsx
      9: 
     10:    作用：
     11:    1. 展示接头选型指引
     12:    2. 根据客户选择条件筛选匹配产品
     13:    3. 匹配结果使用 ProductBasicCard 公共卡片
     14:    4. 支持查看详情
     15:    5. 支持加入全局选型清单
     16:    6. 支持首页多语言文案
     17:    7. 详情页链接根据当前语言生成，避免外语页面跳回中文详情页
     18:    8. 卡片兼容编码只显示前 2 个，其余用 +数量 表示
     19:    9. Q20 路径、清单来源、产品名称统一从系列配置读取
     20: ========================================================= */
     21: 
     22: import { useMemo, useState } from "react";
     23: 
     24: import { ProductBasicCard } from "@/components/common/product-card";
     25: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
     26: 
     27: import type {
     28:   FittingModelRule,
     29:   FittingReplacementI18nText,
```

### components\resources\fitting-replacement\FittingReplacementDetail.tsx

- 第 4 行：FittingReplacementDetail.tsx
- 第 5 行：恒永达官网｜Q20 接头替代查询详情页组件
- 第 8 行：components/resources/fitting-replacement/FittingReplacementDetail.tsx
- 第 11 行：1. 展示单个 Q20 接头替代查询详情
- 第 17 行：7. 2D 图纸预览区已抽离为 FittingReplacementDrawingPreview
- 第 18 行：8. FAQ 单独抽离为 FittingReplacementFaq
- 第 19 行：9. 型号解析逻辑已抽离到 fittingReplacementModelParser.ts
- 第 21 行：11. Q20 路径、清单来源、产品名称、图纸路径统一从系列配置读取
- 第 30 行：FittingModelRule,
- 第 31 行：FittingReplacementI18nText,

```text
      1: "use client";
      2: 
      3: /* =========================================================
>     4:    FittingReplacementDetail.tsx
      5:    恒永达官网｜Q20 接头替代查询详情页组件
      6: 
      7:    文件路径：
      8:    components/resources/fitting-replacement/FittingReplacementDetail.tsx
      9: 
     10:    作用：
     11:    1. 展示单个 Q20 接头替代查询详情
     12:    2. 左侧显示产品图
     13:    3. 右侧显示参数表
     14:    4. 使用全局选型清单
     15:    5. 支持加入清单
     16:    6. 支持添加 / 取消图纸需求
     17:    7. 2D 图纸预览区已抽离为 FittingReplacementDrawingPreview
     18:    8. FAQ 单独抽离为 FittingReplacementFaq
     19:    9. 型号解析逻辑已抽离到 fittingReplacementModelParser.ts
     20:    10. 详情页固定文案从 data.detailText 读取，支持多语言
     21:    11. Q20 路径、清单来源、产品名称、图纸路径统一从系列配置读取
     22: ========================================================= */
     23: 
     24: import { useMemo } from "react";
     25: 
     26: import { Breadcrumb } from "@/components/common/breadcrumb";
     27: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
     28: 
     29: import type {
```

### scripts\resources\convert-q20-fitting-replacement.ts

- 第 2 行：convert-q20-fitting-replacement.ts
- 第 3 行：恒永达官网｜快插接头 Q20 型号替代资料 Excel 转换脚本
- 第 6 行：scripts/resources/convert-q20-fitting-replacement.ts
- 第 12 行：4. 只筛选 Q20 数据
- 第 14 行：data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
- 第 17 行：fitting-replacement
- 第 18 行：└─ fittings
- 第 19 行：└─ quick-connect
- 第 20 行：└─ q20
- 第 24 行：2. q20.zh.ts 是 Next.js 页面读取的 Q20 产品数据文件

```text
      1: /* =========================================================
>     2:    convert-q20-fitting-replacement.ts
      3:    恒永达官网｜快插接头 Q20 型号替代资料 Excel 转换脚本
      4: 
      5:    文件路径：
      6:    scripts/resources/convert-q20-fitting-replacement.ts
      7: 
      8:    作用：
      9:    1. 读取市场部维护的 Excel 原始资料
     10:    2. 读取 Sheet：型号解析规则
     11:    3. 读取 Sheet：产品数据模板
     12:    4. 只筛选 Q20 数据
     13:    5. 自动生成：
     14:       data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
     15: 
     16:    当前数据层级：
     17:    fitting-replacement
     18:    └─ fittings
     19:       └─ quick-connect
     20:          └─ q20
     21: 
     22:    说明：
     23:    1. Excel 是人维护的数据源
     24:    2. q20.zh.ts 是 Next.js 页面读取的 Q20 产品数据文件
     25:    3. 后期做后台时，这个脚本逻辑可以迁移到后台导入功能中
     26: ========================================================= */
     27: 
```

### data\resources\fitting-replacement\fittings\quick-connect\q20\q20.page.intl.ts

- 第 2 行：q20.page.intl.ts
- 第 3 行：恒永达官网｜接头替代查询｜快插接头 Q20 首页多语言文案
- 第 6 行：data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts
- 第 9 行：1. 存放 Q20 接头替代查询首页多语言文案
- 第 12 行：4. 产品数据来自 q20.zh.ts
- 第 13 行：5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增
- 第 24 行：export type FittingReplacementLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";
- 第 27 行：Q20 首页多语言文案
- 第 29 行：export const fittingReplacementQuickConnectQ20PageIntl = {
- 第 32 行：title: "接头替代查询",

```text
      1: /* =========================================================
>     2:    q20.page.intl.ts
      3:    恒永达官网｜接头替代查询｜快插接头 Q20 首页多语言文案
      4: 
      5:    文件路径：
      6:    data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts
      7: 
      8:    作用：
      9:    1. 存放 Q20 接头替代查询首页多语言文案
     10:    2. 服务中文和外语路径
     11:    3. 不存放产品数据
     12:    4. 产品数据来自 q20.zh.ts
     13:    5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增
## 8. 最可能需要修改的文件


## 9. 本次准备建立的产品种类

接头系列下计划增加一个独立的产品种类折叠组：

1. 硬管接头
2. 软管接头
3. 鲁尔接头
4. 快插接头
5. 内螺纹互转接头
6. 堵头
7. 过滤器
8. 单向阀
暂不添加管路和配件。

产品种类作为独立折叠组，减少接头系列筛选栏的默认长度。

选择某个产品种类后自动收起，并在折叠标题中保留当前选择结果。

优先复用现有筛选标题、展开箭头、选中圆点、边框、字体和间距样式。
