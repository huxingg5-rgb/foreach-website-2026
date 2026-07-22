# 螺纹转倒刺接头筛选布局检查报告

生成时间：2026/7/12 21:00:33

> 本报告只读取当前本地项目，没有修改任何代码。

## 1. 项目状态

- 当前分支：`dev-selection-cart-product-type-fix-20260710`
- 最新提交：`054bd43 wip: add hard tube fitting data and filter logic`

```text
M app/products/[category]/[slug]/[seriesSlug]/page.tsx
 M app/products/products.css
 M components/products/detail/ProductDetailClient.tsx
 M components/products/selection/ProductFilterGroup.tsx
 M components/products/selection/ProductFilterPanel.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/products/selection/product-selection-ui.types.ts
 M "data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_\350\277\236\346\216\245\344\273\266\346\240\207\345\223\201\345\234\250\345\224\256\346\270\205\345\215\225.xlsx"
 M "data-source/product-center/pumps/FOREACH_\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
 M "data-source/product-center/pumps/FOREACH_\351\232\224\350\206\234\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
 M "data-source/product-center/pumps/plunger-pump/FOREACH_\346\237\261\345\241\236\346\263\265\345\256\230\347\275\221\350\241\250\346\240\274\347\273\264\346\212\244\347\211\210_v4_\347\247\201\346\234\211\350\265\204\346\226\231\346\230\240\345\260\204\346\240\241\346\255\243\347\211\210.xlsx"
 M "data-source/product-center/pumps/plunger-pump/ea/01_EA\345\270\270\350\247\204\346\237\261\345\241\236\346\263\265_\350\257\246\346\203\205\351\241\265\350\265\204\346\226\231_zh.repaired-20260613-122221.xlsx"
 M "data-source/product-center/pumps/plunger-pump/ea/01_EA\345\270\270\350\247\204\346\237\261\345\241\236\346\263\265_\350\257\246\346\203\205\351\241\265\350\265\204\346\226\231_zh.xlsx"
 M "data-source/product-center/pumps/plunger-pump/ea/02_EA\345\270\270\350\247\204\346\237\261\345\241\236\346\263\265_\350\247\204\346\240\274\345\217\202\346\225\260_zh.repaired-20260613-122221.xlsx"
 M "data-source/product-center/pumps/plunger-pump/ea/02_EA\345\270\270\350\247\204\346\237\261\345\241\236\346\263\265_\350\247\204\346\240\274\345\217\202\346\225\260_zh.xlsx"
 M data-source/product-center/pumps/plunger-pump/ea/ea-selection.repaired-20260613-122221.xlsx
 M "data-source/resources/fitting-replacement/Q20\347\263\273\345\210\227_\346\265\213\350\257\225\346\225\260\346\215\256.xlsx"
 M data/products/selection/hard-tube-fitting-selection.generated.ts
 M data/products/selection/product-route-map.ts
 M public/assets/products/ea/2d-drawings/EA-0020ML.pdf
 M public/assets/products/ea/2d-drawings/EA-0050UL.pdf
 M public/assets/products/ea/2d-drawings/EA-0100UL.pdf
 M public/assets/products/ea/2d-drawings/EA-0250UL.pdf
 M public/assets/products/ea/2d-drawings/EA-0500UL.pdf
 M public/assets/products/ea/2d-drawings/EA-10000UL.pdf
 M public/assets/products/ea/2d-drawings/EA-1000UL.pdf
 M public/assets/products/ea/2d-drawings/EA-2500UL.pdf
 M public/assets/products/ea/2d-drawings/EA-5000UL.pdf
 M public/assets/products/sm/2d-drawings/SM-0050UL.pdf
 M public/assets/products/sm/2d-drawings/SM-0100UL.pdf
 M public/assets/products/sm/2d-drawings/SM-0250UL.pdf
 M public/assets/products/sm/2d-drawings/SM-0500UL.pdf
 M public/assets/products/sm/2d-drawings/SM-1000UL.pdf
 M public/assets/products/tm/2d-drawings/TM-0050UL.pdf
 M public/assets/products/tm/2d-drawings/TM-0100UL.pdf
 M public/assets/products/tm/2d-drawings/TM-0250UL.pdf
 M public/assets/products/tm/2d-drawings/TM-0500UL.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-gas-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 M public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 M "public/downloads/resources/datasheets/zh-CN/\346\263\265\347\263\273\345\210\227/\346\237\261\345\241\236\346\263\265\347\263\273\345\210\227\350\247\204\346\240\274\344\271\246_A01_\346\201\222\346\260\270\350\276\276.pdf"
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMX-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SACE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMX-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNX-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SACE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-LACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-LPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-SPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-LACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-LPPE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SACE.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SACN.pdf
 M public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SPPE.pdf
 M public/images/contact-cooperation/pdf/request-form-footer-graphic.svg
 M public/images/contact-cooperation/pdf/request-form-header-graphic.svg
 M public/images/products/probes/piercing-probes/foreach-piercing-probe-selection.png
 M public/images/products/probes/stirring-paddles/foreach-stirring-paddle-selection.png
 M public/images/products/probes/wash-probes/foreach-wash-probe-selection.png
 M scripts/products/generate-hard-tube-fitting-selection.cjs
?? app/products/fittings/
?? app/products/products.css.bak_barbed_disabled_v2_20260711104707
?? app/products/products.css.bak_barbed_final_20260711120118
?? app/products/products.css.bak_barbed_port_buttons_20260711103426
?? app/products/products.css.bak_barbed_selection_20260711102623
?? app/products/products.css.bak_barbed_vertical_20260711_183841
?? app/products/products.css.bak_barbed_vertical_20260711_183958
?? app/products/products.css.bak_fitting_toggle_symbol_20260710_170056
?? app/products/products.css.bak_quick_connect_20260712_062707
?? app/products/products.css.bak_remove_quick_connect_style_20260712_063137
?? components/products/detail/ProductDetailClient.tsx.bak_before_quick_connect_model_table_20260712001358
?? components/products/detail/ProductDetailClient.tsx.bak_fitting_model_action_20260711_164810
?? components/products/selection/ProductFilterGroup.tsx.bak_thread_barbed_final_layout_20260712125729
?? components/products/selection/ProductFilterGroup.tsx.bak_thread_layout_20260712_205531
?? components/products/selection/ProductFilterPanel.tsx.bak_barbed_disabled_v2_20260711104707
?? components/products/selection/ProductFilterPanel.tsx.bak_barbed_final_20260711120118
?? components/products/selection/ProductFilterPanel.tsx.bak_barbed_port_buttons_20260711103426
?? components/products/selection/ProductFilterPanel.tsx.bak_barbed_selection_20260711102623
?? components/products/selection/ProductFilterPanel.tsx.bak_only_first_fitting_group_20260710_164458
?? components/products/selection/ProductFilterPanel.tsx.bak_only_first_fitting_group_20260710_165216
?? components/products/selection/ProductFilterPanel.tsx.bak_quick_connect_columns_20260712_065115
?? components/products/selection/ProductFilterPanel.tsx.bak_quick_connect_two_columns_20260711224051
?? components/products/selection/ProductFilterPanel.tsx.bak_quick_connect_two_columns_20260711224310
?? components/products/selection/ProductFilterPanel.tsx.bak_quick_connect_two_columns_20260711224444
?? components/products/selection/ProductFilterPanel.tsx.bak_quick_connect_two_columns_20260711224911
?? components/products/selection/ProductFilterPanel.tsx.bak_thread_barbed_final_layout_20260712125729
?? components/products/selection/ProductSelectionClient.tsx.bak_add_fitting_types_20260710_165415
?? components/products/selection/ProductSelectionClient.tsx.bak_barbed_detail_href_20260711220838
?? components/products/selection/ProductSelectionClient.tsx.bak_barbed_disabled_20260711104518
?? components/products/selection/ProductSelectionClient.tsx.bak_barbed_disabled_v2_20260711104707
?? components/products/selection/ProductSelectionClient.tsx.bak_barbed_final_20260711120118
?? components/products/selection/ProductSelectionClient.tsx.bak_barbed_selection_20260711102623
?? components/products/selection/ProductSelectionClient.tsx.bak_before_main_deploy_20260710_180458
?? components/products/selection/ProductSelectionClient.tsx.bak_define_hard_tube_sort_20260710_175708
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_thread_barbed_layout_20260712_205334
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_tube_range_20260710_172634
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_tube_sort_function_20260710_172739
?? components/products/selection/ProductSelectionClient.tsx.bak_hard_tube_filters_20260710_170631
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_client_20260711223449
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_client_20260711225116
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_client_20260711230304
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_href_20260712001940
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_model_href_20260712002712
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_sort_20260711224051
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_sort_20260711224310
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_sort_20260711224444
?? components/products/selection/ProductSelectionClient.tsx.bak_quick_connect_sort_20260711224911
?? components/products/selection/ProductSelectionClient.tsx.bak_thread_barbed_layout_20260712_205143
?? components/products/selection/ProductSelectionClient.tsx.bak_thread_layout_20260712_205531
?? components/products/selection/ProductSelectionClient.tsx.bak_thread_to_barbed_selection_20260712122034
?? components/products/selection/ProductSelectionClient.tsx.bak_tube_range_match_20260710_172423
?? components/products/selection/product-selection-ui.types.ts.bak_thread_layout_20260712_205531
?? connector-product-types-audit.md
?? data/products/detail/getQuickConnectSeriesDetailData.ts
?? data/products/detail/getQuickConnectSeriesDetailData.ts.bak_before_quick_connect_model_table_20260712001358
?? data/products/generated/fittings/
?? data/products/selection/barbed-fitting-selection.generated.ts
?? data/products/selection/barbed-fitting-selection.generated.ts.bak_card_copy_20260711132001
?? data/products/selection/hard-tube-fitting-image-map.generated.json
?? data/products/selection/hard-tube-fitting-selection.generated.ts.bak_card_engineering_fields_20260710_171739
?? data/products/selection/hard-tube-fitting-selection.generated.ts.bak_remove_structure_filter_20260710_170838
?? data/products/selection/hard-tube-fitting-selection.summary.json
?? data/products/selection/product-route-map.ts.bak_add_fitting_types_20260710_165415
?? data/products/selection/product-route-map.ts.bak_barbed_selection_20260711102623
?? data/products/selection/product-route-map.ts.bak_close_product_types_20260710_165843
?? data/products/selection/product-route-map.ts.bak_fix_fitting_type_level_20260710_165559
?? data/products/selection/product-route-map.ts.bak_fix_nested_fitting_types_20260710_165737
?? data/products/selection/quick-connect-fitting-selection.generated.ts
?? data/products/selection/quick-connect-fitting-selection.generated.ts.bak_card_copy_20260711230431
?? data/products/selection/quick-connect-fitting-selection.generated.ts.bak_quick_connect_data_20260711225116
?? data/products/selection/quick-connect-fitting-selection.generated.ts.bak_quick_connect_data_20260711230304
?? data/products/selection/quick-connect-fitting-selection.summary.json
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts.bak_card_copy_20260712124110
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts.bak_filter_order_20260712124513
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts.bak_jpg_import_20260712123229
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts.bak_remove_three_images_20260712123557
?? data/products/selection/thread-to-barbed-fitting-selection.generated.ts.bak_remove_three_images_20260712123935
?? data/products/selection/thread-to-barbed-fitting-selection.summary.json
?? hard-tube-fitting-image-import-report.md
?? public/images/products/fittings/
?? reports/
?? scripts/products/add-quick-connect-series-model-table.cjs
?? scripts/products/apply-barbed-card-copy.cjs
?? scripts/products/audit-quick-connect-assets.cjs
?? scripts/products/audit-quick-connect-detail-reuse.cjs
?? scripts/products/audit-quick-connect-implementation.cjs
?? scripts/products/audit-thread-to-barbed-filter-layout.cjs
?? scripts/products/audit-thread-to-barbed-filter-layout.cjs.bak_fix_20260712_210032
?? scripts/products/connect-thread-to-barbed-selection-client.cjs
?? scripts/products/fix-barbed-disabled-options-v2.cjs
?? scripts/products/fix-barbed-port-linkage-final.cjs
?? scripts/products/fix-quick-connect-detail-href.cjs
?? scripts/products/fix-quick-connect-filter-layout-and-size.cjs
?? scripts/products/fix-thread-to-barbed-filter-layout-final.cjs
?? scripts/products/fix-thread-to-barbed-filter-order.cjs
?? scripts/products/generate-and-connect-quick-connect-selection.cjs
?? scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_card_copy_20260711230304
?? scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224051
?? scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224310
?? scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224444
?? scripts/products/generate-and-connect-quick-connect-selection.cjs.bak_quick_connect_size_20260711224911
?? scripts/products/generate-hard-tube-fitting-detail-data.cjs
?? scripts/products/generate-hard-tube-fitting-detail-data.cjs.bak_spec_order_20260711_170253
?? scripts/products/generate-hard-tube-fitting-selection.cjs.bak_card_engineering_fields_20260710_171739
?? scripts/products/generate-hard-tube-fitting-selection.cjs.bak_fix_tube_range_20260710_172634
?? scripts/products/generate-hard-tube-fitting-selection.cjs.bak_remove_structure_filter_20260710_170838
?? scripts/products/generate-hard-tube-fitting-selection.cjs.bak_tube_range_match_20260710_172423
?? scripts/products/generate-quick-connect-series.cjs
?? scripts/products/generate-thread-to-barbed-fitting-selection.cjs
?? scripts/products/generate-thread-to-barbed-fitting-selection.cjs.bak_filter_order_20260712124513
?? scripts/products/import-hard-tube-fitting-images.cjs
?? scripts/products/import-thread-to-barbed-jpg-images.cjs
?? scripts/products/import-thread-to-barbed-jpg-images.cjs.bak_exclude_three_images_20260712123557
?? scripts/products/import-thread-to-barbed-jpg-images.cjs.bak_exclude_three_images_20260712123935
?? scripts/products/patch-barbed-port-disabled-options.cjs
?? scripts/products/patch-barbed-port-filter-buttons.cjs
?? scripts/products/patch-barbed-port-headings-and-linkage.cjs
?? scripts/products/postprocess-quick-connect-card-copy.cjs
?? scripts/products/refine-barbed-fitting-detail-content.cjs
?? scripts/products/refine-quick-connect-model-detail-content.cjs
?? scripts/products/remove-thread-to-barbed-three-images.cjs
?? scripts/products/set-thread-to-barbed-filter-layout.cjs
?? scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs
?? scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs.bak_nested_template_20260712_060837
?? scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs.bak_refine_20260712_061441
?? scripts/products/setup-barbed-fitting-selection-step1.cjs
?? scripts/products/setup-quick-connect-model-detail-like-barbed.cjs
?? scripts/products/update-quick-connect-card-copy.cjs
?? scripts/products/update-thread-to-barbed-card-copy.cjs
```

## 2. 目标布局

```text
密封方式：每个选项独占一整行
连接结构：两个选项一排
```

## 3. 当前传参链路

- ProductSelectionClient → ProductFilterPanel 传 activeProductTypeId：✅ 是
- ProductFilterPanel props 声明 activeProductTypeId：✅ 是
- ProductFilterPanel 解构 activeProductTypeId：✅ 是
- ProductFilterPanel → ProductFilterGroup 传 activeProductTypeId：❌ 否
- ProductFilterGroup props 声明 activeProductTypeId：✅ 是
- ProductFilterGroup 解构 activeProductTypeId：✅ 是
- getLayoutClass 判断 thread-to-barbed-fittings：✅ 是
- getLayoutClass 调用时传 activeProductTypeId：✅ 是

## 4. layout 数据方案

- ProductSelectionFilterGroup 类型支持 layout：✅ 是
- ProductFilterGroup 使用 group.layout：❌ 否
- ProductSelectionClient 中存在螺纹转倒刺专属布局判断：✅ 是

## 5. CSS 布局规则

- `.filter-options.one`：0 处
- `.filter-options.two`：0 处
- `.filter-options.three`：0 处
- `.layout-one`：0 处
- `.layout-two`：0 处
- `[data-filter-layout="one"]`：0 处
- `[data-filter-layout="two"]`：0 处

## 6. 初步判断

1. ProductFilterPanel 没有把 activeProductTypeId 继续传给 ProductFilterGroup。
2. globals.css 中未找到明确的一列布局规则。
3. globals.css 中未找到明确的两列布局规则。

## 7. ProductSelectionClient 调用 ProductFilterPanel

```tsx
 2784:           </section>
 2785:         ) : null}
 2786:         <section className="selection-section">
 2787:           <div className="selection-layout">
 2788:             <ProductFilterPanel
 2789:               activeCategory={{
 2790:                 ...activeCategory,
 2791:                 description:
 2792:                   typeof activeCategory.description === "string"
 2793:                     ? activeCategory.description
 2794:                     : getText(locale, activeCategory.description as any, ""),
 2795:               }}
 2796:               activeProductTypeId={activeProductTypeId}
 2797:               filterGroups={filterGroups}
 2798:               mobileOpenFilterGroups={mobileOpenFilterGroups}
 2799:               onToggleMobileGroup={toggleMobileFilterGroup}
 2800:               isOptionActive={isFilterOptionActive}
 2801:               isOptionDisabled={isBarbedPortOptionDisabled}
 2802:               onFilterChange={handleFilterChange}
 2803:               emptyText={pageText.filterEmpty}
 2804:             />
 2805: 
 2806:             <section className="product-area">
 2807:               <ProductSelectionToolbar
 2808:                 total={matchedProducts.length}
 2809:                 resultPrefix={pageText.resultPrefix}
 2810:                 resultSuffix={pageText.resultSuffix}
 2811:                 resetButtonText={pageText.resetFilters}
 2812:                 selectedTags={selectedTagItems}
```

## 8. ProductFilterPanel props 与传参

### 8.1 函数参数

```tsx
  235:       </div>
  236:     </section>
  237:   );
  238: }
  239: 
  240: /* BARBED_PORT_FILTER_GROUP_END */
  241: 
  242: 
  243: export default function ProductFilterPanel({
  244:   activeCategory,
  245:   activeProductTypeId,
  246:   filterGroups,
  247:   emptyText,
  248:   isOptionActive,
  249:   isOptionDisabled,
  250:   onFilterChange,
  251: }: ProductFilterPanelProps) {
  252:   /*
  253:    * 只有接头系列中的第一个“产品种类”允许折叠。
  254:    * 其余所有筛选组始终展开。
  255:    */
  256:   const [isFittingProductTypeOpen, setIsFittingProductTypeOpen] =
  257:     useState(false);
  258: 
  259:   /*
  260:    * 切换顶部产品大类后，
  261:    * 接头系列的产品种类恢复为收起状态。
  262:    */
  263:   useEffect(() => {
  264:     setIsFittingProductTypeOpen(false);
  265:   }, [activeCategory.id]);
  266: 
  267:   return (
```

### 8.2 调用 ProductFilterGroup

```tsx
未找到
```

## 9. ProductFilterGroup 当前布局逻辑

### 9.1 getLayoutClass

```tsx
   12: };
   13: 
   14: function getLayoutClass(
   15:   group: ProductSelectionFilterGroup,
   16:   activeProductTypeId?: string
   17: ) {
   18:   /*
   19:    * 螺纹转倒刺接头专属布局：
   20:    *
   21:    * filter02 = 密封方式，每个选项占一整行；
   22:    * filter01 = 连接结构，两个选项一排。
   23:    */
   24:   if (
   25:     activeProductTypeId ===
   26:     "thread-to-barbed-fittings"
   27:   ) {
   28:     if (group.key === "filter02") {
   29:       return "one";
   30:     }
   31: 
   32:     if (group.key === "filter01") {
   33:       return "two";
   34:     }
   35:   }
   36: 
   37:   /*
   38:    * 其他产品继续保持原来的公共布局。
   39:    */
```

### 9.2 函数参数

```tsx
   46: 
   47:   return "two";
   48: }
   49: 
   50: export default function ProductFilterGroup({
   51:   group,
   52:   activeProductTypeId,
   53:   mobileOpen,
   54:   onToggleMobileGroup,
   55:   isOptionActive,
   56:   onFilterChange,
   57: }: ProductFilterGroupProps) {
   58:   const modeClass = group.inputType === "single" ? "is-single" : "is-multi";
   59:   const layoutClass = getLayoutClass(
   60:     group,
   61:     activeProductTypeId
   62:   );
   63: 
   64:   return (
   65:     <div
   66:       className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
   67:         mobileOpen ? "is-mobile-open" : ""
   68:       }`}
   69:       data-filter-key={group.key}
   70:       data-filter-layout={layoutClass}
```

### 9.3 输出的 class 与 data 属性

```tsx
   62:   );
   63: 
   64:   return (
   65:     <div
   66:       className={`filter-group filter-group-${group.key} ${modeClass} layout-${layoutClass} ${
   67:         mobileOpen ? "is-mobile-open" : ""
   68:       }`}
   69:       data-filter-key={group.key}
   70:       data-filter-layout={layoutClass}
   71:       key={group.key}
   72:     >
   73:       <button
   74:         className="filter-group-title filter-group-trigger"
   75:         type="button"
   76:         onClick={() => onToggleMobileGroup(group.key)}
   77:       >
   78:         <span>{group.title}</span>

   78:         <span>{group.title}</span>
   79:         <span className="filter-group-symbol">{mobileOpen ? "-" : "+"}</span>
   80:       </button>
   81: 
   82:       <div className={`filter-options ${layoutClass}`}>
   83:         {group.options.map((option) => {
   84:           const active = isOptionActive(group, option.value);
   85: 
   86:           return (
   87:             <button
   88:               className={`filter-option filter-btn ${modeClass} ${
   89:                 active ? "active" : ""
   90:               }`}
   91:               type="button"
   92:               key={option.value}
   93:               onClick={() => onFilterChange(group, option.value)}
   94:             >
```

## 10. ProductSelectionFilterGroup 类型

```ts
   16: };
   17: 
   18: export type ProductSelectionFilterGroup = {
   19:   key: "productType" | SelectionFilterKey;
   20:   title: string;
   21:   inputType: "single" | "multiple";
   22:   options: ProductSelectionFilterOption[];`r`n  layout?: "one" | "two" | "three";
   23: };
   24: 
   25: export type ProductSelectionSelectedTag = {
   26:   key: "productType" | SelectionFilterKey;
   27:   value: string;
   28:   label: string;
   29: };
   30: 
   31: export type ProductSelectionProductItem = ProductSelectionProduct;
   32: 
   33: export type ProductSelectionPageText = {
   34:   breadcrumbHome: string;
   35:   breadcrumbCurrent: string;
   36:   searchPlaceholder: string;
```

## 11. ProductSelectionClient 筛选组生成代码

### 代码块 1

```tsx
 1830:   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 1831:     const groups: ProductSelectionFilterGroup[] = [];
 1832: 
 1833:     if (productTypeOptions.length > 0) {
 1834:       groups.push({
 1835:         key: "productType",
 1836:         title:
 1837:           activeCategoryId === "fittings" && locale === "zh"
 1838:             ? "产品种类"
 1839:             : pageText.productTypeLabel,
 1840:         inputType: "single",
 1841:         options: productTypeOptions,
 1842:       });
 1843:     }
 1844: 
 1845:     activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
 1846:       const options = getFilterOptions(
 1847:         currentTypeProducts as any,
 1848: 
 1849:         (label as any).filterKey,
 1850:         selectedFilters,
 1851:         activeProductTypeId
 1852:       );
 1853: 
 1854:       if (options.length === 0) return;
 1855: 
 1856:       groups.push({
 1857:         key: (label as any).filterKey,
 1858:         title: getText(locale, label.label, (label as any).filterKey),
 1859:         inputType: label.inputType,
 1860:         layout: getProductFilterGroupLayout(
 1861:           activeProductTypeId,
 1862:           (label as any).filterKey as SelectionFilterKey
 1863:         ),
 1864:         options: sortHardTubeFilterOptionsForDisplay(
 1865:           activeProductTypeId,
 1866:           (label as any).filterKey,
 1867:           options.map((option) => ({
 1868:             ...option,
 1869:             label: getLocalizedFilterOptionLabel(
```

### 代码块 2

```tsx
 1852:       );
 1853: 
 1854:       if (options.length === 0) return;
 1855: 
 1856:       groups.push({
 1857:         key: (label as any).filterKey,
 1858:         title: getText(locale, label.label, (label as any).filterKey),
 1859:         inputType: label.inputType,
 1860:         layout: getProductFilterGroupLayout(
 1861:           activeProductTypeId,
 1862:           (label as any).filterKey as SelectionFilterKey
 1863:         ),
 1864:         options: sortHardTubeFilterOptionsForDisplay(
 1865:           activeProductTypeId,
 1866:           (label as any).filterKey,
 1867:           options.map((option) => ({
 1868:             ...option,
 1869:             label: getLocalizedFilterOptionLabel(
 1870:               option.label || option.value,
 1871:               locale
 1872:             ),
 1873:           }))
 1874:         ),
 1875:       });
 1876:     });
 1877: 
 1878:     return groups;
 1879:   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 1880: 
 1881:   const matchedProducts = useMemo(() => {
 1882:     const keyword = searchKeyword.trim().toLowerCase();
 1883: 
 1884:     return categoryProducts.filter((product) => {
 1885:       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 1886:         return false;
 1887:       }
 1888: 
 1889:       const filterMatched = FILTER_KEYS.every((filterKey) => {
 1890:         const selectedValues = selectedFilters[filterKey];
 1891: 
```

## 12. globals.css 相关规则

未找到相关 CSS 规则。
## 13. 下一步修改原则

完成检查后再决定使用哪一种方案：

1. **组件传参方案**：把 productTypeId 传到 ProductFilterGroup，由 getLayoutClass 精准判断。
2. **数据 layout 方案**：由 ProductSelectionClient 给每个筛选组写入 layout。
3. 两种方案只保留一种，避免互相覆盖。
4. 修改前先确认 globals.css 中真正生效的是 `.filter-options.one/two`、`.layout-one/two`，还是 data 属性选择器。
5. 不修改接头筛选数据、产品图片、路由和详情页。

