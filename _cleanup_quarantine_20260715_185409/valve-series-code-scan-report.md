# FOREACH 官网｜阀系列产品代码结构扫描报告

生成时间：2026-07-07 16:19:14

项目路径：F:\WebsiteProjects\foreach-website-2026

本报告用于新增阀系列产品前的代码结构检查。阀系列暂定分为：旋转阀、高压阀、电磁阀。

## 1. Git 当前状态

```txt
dev-diaphragm-pump-xlsx-database-20260706
 M app/products/products.css
 M app/products/pumps/pipetting-pumps/[slug]/page.tsx
 M components/products/detail/ProductDetailClient.tsx
 M components/products/detail/product-detail.module.css
 M components/products/selection/ProductCardGrid.tsx
 M components/products/selection/ProductFilterPanel.tsx
 M components/products/selection/ProductSelectionCard.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/selection-cart/GlobalSelectionCartDrawer.tsx
 M components/selection-cart/SelectionCartProvider.tsx
 M components/selection-cart/selection-cart.types.ts
 M data/products/generated/pumps/pipetting-pumps/detail/index.json
 M data/products/selection/product-route-map.ts
 M data/products/selection/product-type-intro.ts
 M package.json
 M scripts/products/generate-pipetting-pump-detail-data.js
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_card_actions_20260706_145558
?? app/products/products.css.bak_card_actions_continue_20260706_145741
?? app/products/products.css.bak_diaphragm_card_style_20260706_211722
?? app/products/products.css.bak_diaphragm_halodp_css_20260706_233805
?? app/products/products.css.bak_diaphragm_subtitle_multiline_20260706_212104
?? app/products/products.css.bak_drawing_cart_only_20260706_151114
?? app/products/products.css.bak_final_detail_cart_20260706_163743
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? app/products/products.css.bak_overall_fix_20260706_162940
?? app/products/products.css.bak_remove_wrong_top_controls_20260706_220032
?? app/products/pumps/diaphragm-pumps/
?? app/products/pumps/syringe-pumps/
?? app/products/pumps/valveless-pumps/
?? bind-drawing-button-to-cart.js
?? check-diaphragm-spec-life-motor.js
?? check-diaphragm-xlsx.js
?? components/products/detail/ProductDetailClient.tsx.bak.syringe-cta
?? components/products/detail/ProductDetailClient.tsx.bak_20260707_133527
?? components/products/detail/ProductDetailClient.tsx.bak_20260707_134457
?? components/products/detail/ProductDetailClient.tsx.bak_add_diaphragm_bottom_cta_20260706_234250
?? components/products/detail/ProductDetailClient.tsx.bak_add_pipetting_cta_20260707_105053
?? components/products/detail/ProductDetailClient.tsx.bak_add_pipetting_cta_correct_20260707_105316
?? components/products/detail/ProductDetailClient.tsx.bak_bind_drawing_to_cart_20260706_235717
?? components/products/detail/ProductDetailClient.tsx.bak_detail_buttons_toggle_cancel_20260707_001417
?? components/products/detail/ProductDetailClient.tsx.bak_detail_cart_button_selected_state_20260707_000251
?? components/products/detail/ProductDetailClient.tsx.bak_fix_button_block_direct_20260707_001112
?? components/products/detail/ProductDetailClient.tsx.bak_fix_description_20260707_104831
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_cart_actions_20260706_232258
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_data_extra_type_20260706_233804
?? components/products/detail/ProductDetailClient.tsx.bak_fix_detail_extra_data_type_20260707_000048
?? components/products/detail/ProductDetailClient.tsx.bak_fix_remaining_list_toggle_runtime_20260707_000953
?? components/products/detail/ProductDetailClient.tsx.bak_fix_valveless_cta_priority_20260707_134111
?? components/products/detail/ProductDetailClient.tsx.bak_image_alt_en_20260707_103533
?? components/products/detail/ProductDetailClient.tsx.bak_model_action_open_new_page_20260706_230725
?? components/products/detail/ProductDetailClient.tsx.bak_no_auto_open_cart_20260706_232627
?? components/products/detail/ProductDetailClient.tsx.bak_pipetting_alt_20260707_102830
?? components/products/detail/ProductDetailClient.tsx.bak_remove_unused_addDetailProductToCart_20260707_002047
?? components/products/detail/ProductDetailClient.tsx.bak_restore_detail_button_state_text_20260707_000704
?? components/products/detail/ProductDetailClient.tsx.bak_safe_button_text_state_20260707_000817
?? components/products/detail/ProductDetailClient.tsx.bak_use_plunger_list_toggle_style_20260707_000443
?? components/products/detail/ProductDetailClient.tsx.bak_valveless_contact_buttons_20260707_134320
?? components/products/detail/product-detail.module.css.bak_application_content_18px_20260706_223105
?? components/products/detail/product-detail.module.css.bak_cta_height_compact_20260706_234610
?? components/products/detail/product-detail.module.css.bak_cta_move_down_50px_20260706_234833
?? components/products/detail/product-detail.module.css.bak_detail_button_pressed_state_20260707_001229
?? components/products/detail/product-detail.module.css.bak_detail_cart_button_selected_state_20260707_000252
?? components/products/detail/product-detail.module.css.bak_faq_cta_move_up_20260706_234438
?? components/products/detail/product-detail.module.css.bak_faq_fixed_area_final_20260706_235148
?? components/products/detail/product-detail.module.css.bak_faq_to_cta_gap_50px_20260706_234946
?? components/products/detail/product-detail.module.css.bak_fix_application_content_smaller_20260706_223014
?? components/products/detail/product-detail.module.css.bak_fix_common_application_same_as_desc_20260706_222853
?? components/products/detail/product-detail.module.css.bak_remove_custom_detail_action_style_20260707_000444
?? components/products/detail/product-detail.module.css.bak_remove_wrong_button_selected_styles_20260707_000704
?? components/products/detail/product-detail.module.css.bak_restore_cta_height_move_down_20260706_234725
?? components/products/selection/ProductCardGrid.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductCardGrid.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductCardGrid.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductCardGrid.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductCardGrid.tsx.bak_open_detail_new_page_20260706_225910
?? components/products/selection/ProductCardGrid.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductCardGrid.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductFilterPanel.tsx.bak_filter04_two_columns_20260706_215540
?? components/products/selection/ProductSelectionCard.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionCard.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionCard.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_object_child_20260706_163934
?? components/products/selection/ProductSelectionCard.tsx.bak_open_detail_new_page_20260706_230217
?? components/products/selection/ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_filter_labels_20260706_213305
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_medium_filter_20260706_212928
?? components/products/selection/ProductSelectionClient.tsx.bak_add_intro_product_type_attr_20260706_233805
?? components/products/selection/ProductSelectionClient.tsx.bak_add_valveless_20260707_112624
?? components/products/selection/ProductSelectionClient.tsx.bak_add_valveless_detail_href_20260707_141849
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_continue_20260706_145741
?? components/products/selection/ProductSelectionClient.tsx.bak_diaphragm_selection_20260706_210016
?? components/products/selection/ProductSelectionClient.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionClient.tsx.bak_final_detail_cart_20260706_163743
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_base_selection_import_20260706_214932
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_breadcrumb_props_20260706_152816
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_diaphragm_filter01_label_20260706_213533
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_grid_props_format_20260706_162432
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_parse_tail_20260706_145849
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
?? components/products/selection/ProductSelectionClient.tsx.bak_force_diaphragm_pool_20260706_211545
?? components/products/selection/ProductSelectionClient.tsx.bak_force_merge_filter04_20260706_214812
?? components/products/selection/ProductSelectionClient.tsx.bak_merge_diaphragm_filter_labels_20260706_213802
?? components/products/selection/ProductSelectionClient.tsx.bak_overall_fix_20260706_162940
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_cart_display_20260706_153601
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_custom_cart_20260706_154636
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_wrong_top_controls_20260706_220032
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_original_top_components_20260706_220427
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_required_imports_20260706_215310
?? components/products/selection/ProductSelectionClient.tsx.bak_restore_search_category_tabs_20260706_215828
?? components/products/selection/ProductSelectionClient.tsx.bak_runtime_baseSelectionProducts_fix_20260706_215116
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_fix_cart_table_header_20260706_155155
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_drawer_body_20260706_154833
?? components/selection-cart/SelectionCartProvider.tsx.bak_card_actions_20260706_145558
?? components/selection-cart/SelectionCartProvider.tsx.bak_final_detail_cart_20260706_163743
?? components/selection-cart/SelectionCartProvider.tsx.bak_overall_fix_20260706_162940
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/selection-cart.types.ts.bak_card_actions_20260706_145558
?? data/products/generated/pumps/diaphragm-pumps/
?? data/products/generated/pumps/pipetting-pumps/detail/index.json.bak_20260707_134743
?? data/products/generated/pumps/pipetting-pumps/detail/index.json.bak_copy_update_20260707_102830
?? data/products/generated/pumps/syringe-pumps/
?? data/products/generated/pumps/valveless-pumps/
?? data/products/selection/diaphragm-pump-selection.generated.ts
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_force_8_model_links_20260706144122
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_patch_8_model_detail_slug_20260706144617
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_filter_20260706_212515
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_routes_safe_20260706_212652
?? data/products/selection/product-route-map.ts.bak_fix_series_insert_position_20260706_212801
?? data/products/selection/product-type-intro.ts.bak.image-paths
?? data/products/selection/product-type-intro.ts.bak_diaphragm_halodp_20260706_233513
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-type-intro.ts.bak_fix_diaphragm_intro_text_20260706_220635
?? data/products/selection/product-type-intro.ts.bak_remove_detail_text_20260706_161958
?? data/products/selection/product-type-intro.ts.bak_valveless_intro_20260707_112624
?? data/products/selection/syringe-pump-selection.generated.ts
?? data/products/selection/syringe-pump-selection.generated.ts.bak.image-paths
?? data/products/selection/syringe-pump-selection.generated.ts.bak.series-labels
?? data/products/selection/valveless-pump-selection.generated.ts
?? data/products/selection/valveless-pump-selection.generated.ts.bak_add_rpl_drpl_filter_20260707_112752
?? data/products/selection/valveless-pump-selection.generated.ts.bak_fix_specs_20260707_142659
?? data/products/selection/valveless-pump-selection.generated.ts.bak_rewrite_clean_20260707_144009
?? data/products/selection/valveless-pump-selection.generated.ts.bak_short_drpl_title_20260707_144228
?? data/products/selection/valveless-pump-selection.generated.ts.bak_split_drpl_detail_20260707_144438
?? data/products/selection/valveless-pump-selection.generated.ts.bak_split_drpl_selection_only_20260707_143907
?? detail-button-duplicate-check.md
?? detail-click-real-problem-check.md
?? detail-drawing-cart-real-check.md
?? detail-route-files-check.md
?? diaphragm-current-problem-check.md
?? diaphragm-detail-buttons-check.md
?? diaphragm-detail-final-check.md
?? diaphragm-detail-vs-plunger-detail-check.md
?? diaphragm-faq-real-source-check.md
?? diaphragm-pump-filter-fix-context.md
?? diaphragm-pump-selection-inspect.txt
?? diaphragm-spec-life-motor-check.md
?? extract-detail-button-blocks.js
?? generate-diaphragm-selection-bridge.js
?? "iteProjectsforeach-website-2026componentsselection-cartGlobalSelectionCartDrawer.tsx\357\200\242"
?? plunger-selection-structure-check.txt
?? product-selection-top-components-check.md
?? product-type-intro-text-check.md
?? product_card_actions_audit.md
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
?? product_intro_layout_code_context.md
?? "productsselectionProductSelectionClient.tsx\357\200\242"
?? public/documents/
?? public/images/products/pumps/pipetting-pumps/
?? public/models/
?? rewrite-diaphragm-clean-faqs.js
?? safe-detail-button-text-state.js
?? scripts/products/audit-syringe-pump-detail-pages.cjs
?? scripts/products/audit-syringe-pump-selection-page.cjs
?? scripts/products/audit-valveless-pump-detail-specs.js
?? scripts/products/audit-valveless-pump-detail-specs.js.bak_split_drpl_detail_20260707_144438
?? scripts/products/connect-syringe-pump-selection-page.cjs
?? scripts/products/create-syringe-pump-detail-pages.cjs
?? scripts/products/fix-syringe-pump-detail-faq-cta.cjs
?? scripts/products/fix-syringe-pump-detail-specs-alias.cjs
?? scripts/products/fix-syringe-pump-image-paths.cjs
?? scripts/products/fix-syringe-pump-real-specs.cjs
?? scripts/products/generate-pipetting-pump-detail-data.js.bak_20260707_134743
?? scripts/products/generate-pipetting-pump-detail-data.js.bak_copy_update_20260707_102830
?? scripts/products/generate-valveless-pump-detail-data.js
?? scripts/products/generate-valveless-pump-detail-data.js.bak_20260707_134457
?? scripts/products/generate-valveless-pump-detail-data.js.bak_fix_additional_images_20260707_133743
?? scripts/products/generate-valveless-pump-detail-data.js.bak_fix_specs_20260707_142659
?? scripts/products/generate-valveless-pump-detail-data.js.bak_force_drpl_h1_model_20260707_144905
?? scripts/products/generate-valveless-pump-detail-data.js.bak_force_drpl_specs_20260707_142932
?? scripts/products/remove-syringe-pump-config-mode-spec.cjs
?? scripts/products/remove-syringe-pump-model-code-specs.cjs
?? scripts/products/split-drpl-detail-pages.js
?? scripts/products/update-syringe-pump-series-labels.cjs
?? selection_cart_overall_audit.md
?? stabilize-diaphragm-button-flags.js
?? use-plunger-list-toggle-style.js
?? valveless-selection-key-files.txt
?? "\357\200\272"
?? "\357\200\272s\357\200\252subtitles\357\200\252\357\200\277s\357\200\252[s\357\200\252subtitles\357\200\252]s\357\200\252\357\200\272s\357\200\252[s\357\200\252],',"
bde50db feat: add pipetting pump selection and detail pages
5e8d6f5 fix: update drawing preview components
cffd3bd fix: refine product detail mobile layout and 3d model viewer
33a6381 fix: map plunger pump applications and localized detail content
bd98515 feat: add TM plunger pump applications
```


## 2. app/products 路由结构

```txt
[DIR]  app\products\pumps
[DIR]  app\products\[category]
[FILE] app\products\loading.tsx
[FILE] app\products\page.tsx
[FILE] app\products\page.tsx.20260613-160749.bak
[FILE] app\products\page.tsx.20260613-163009.bak
[FILE] app\products\products.css
[FILE] app\products\products.css.bak-clean-product-intro-final
[FILE] app\products\products.css.bak-clean-product-type-collapse
[FILE] app\products\products.css.bak-clean-product-type-intro-css
[FILE] app\products\products.css.bak-filter-panel-no-sticky
[FILE] app\products\products.css.bak-fix-product-type-current-width
[FILE] app\products\products.css.bak-fixed-product-card-ratio
[FILE] app\products\products.css.bak-force-intro-style
[FILE] app\products\products.css.bak-force-only-emphasis-bold
[FILE] app\products\products.css.bak-force-visible-product-type-intro
[FILE] app\products\products.css.bak-haloflx-bottom-right
[FILE] app\products\products.css.bak-haloflx-opacity-lower
[FILE] app\products\products.css.bak-haloflx-real-bottom
[FILE] app\products\products.css.bak-haloflx-text-bigger
[FILE] app\products\products.css.bak-intro-partial-bold-css
[FILE] app\products\products.css.bak-mobile-two-columns
[FILE] app\products\products.css.bak-product-intro-copy-bigger-bold-last
[FILE] app\products\products.css.bak-product-intro-copy-black
[FILE] app\products\products.css.bak-product-intro-copy-text-bigger
[FILE] app\products\products.css.bak-product-intro-haloflx
[FILE] app\products\products.css.bak-product-intro-image-align
[FILE] app\products\products.css.bak-product-intro-image-bigger
[FILE] app\products\products.css.bak-product-intro-remove-bottom-blank
[FILE] app\products\products.css.bak-product-intro-unframed
[FILE] app\products\products.css.bak-product-type-collapse
[FILE] app\products\products.css.bak-product-type-collapse-real
[FILE] app\products\products.css.bak-product-type-intro-banner-layout
[FILE] app\products\products.css.bak_20260706_140218
[FILE] app\products\products.css.bak_card_actions_20260706_145558
[FILE] app\products\products.css.bak_card_actions_continue_20260706_145741
[FILE] app\products\products.css.bak_diaphragm_card_style_20260706_211722
[FILE] app\products\products.css.bak_diaphragm_halodp_css_20260706_233805
[FILE] app\products\products.css.bak_diaphragm_subtitle_multiline_20260706_212104
[FILE] app\products\products.css.bak_drawing_cart_only_20260706_151114
[FILE] app\products\products.css.bak_final_detail_cart_20260706_163743
[FILE] app\products\products.css.bak_mobile_card_final_append_20260706_142435
[FILE] app\products\products.css.bak_mobile_card_font_20260706_142035
[FILE] app\products\products.css.bak_mobile_card_real_fix_20260706_142254
[FILE] app\products\products.css.bak_overall_fix_20260706_162940
[FILE] app\products\products.css.bak_remove_wrong_top_controls_20260706_220032
[DIR]  app\products\pumps\diaphragm-pumps
[DIR]  app\products\pumps\pipetting-pumps
[DIR]  app\products\pumps\plunger-pumps
[DIR]  app\products\pumps\syringe-pumps
[DIR]  app\products\pumps\valveless-pumps
[DIR]  app\products\pumps\diaphragm-pumps\[slug]
[FILE] app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css
[FILE] app\products\pumps\diaphragm-pumps\page.tsx.bak_remove_wrong_standalone_20260706_211031
[FILE] app\products\pumps\diaphragm-pumps\page.tsx.bak_wrong_series_overview_20260706_210719
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_dedupe_specs_20260706_225601
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_diaphragm_button_flags_stable_20260707_000705
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_filter_motor_life_specs_20260707_002616
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_fix_diaphragm_request_buttons_20260706_232309
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_fix_missing_getCleanDiaphragmModelCode_20260706_233222
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_fix_missing_seoProductTitle_20260706_233058
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_fix_spec_group_duplicate_title_20260706_225337
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_only_drawing_and_cart_20260706_232627
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_seo_h1_clean_model_20260706_233008
[FILE] app\products\pumps\diaphragm-pumps\[slug]\page.tsx.bak_use_product_detail_client_20260706_222359
[DIR]  app\products\pumps\pipetting-pumps\[slug]
[FILE] app\products\pumps\pipetting-pumps\[slug]\page.tsx
[DIR]  app\products\pumps\plunger-pumps\[slug]
[FILE] app\products\pumps\plunger-pumps\[slug]\page.tsx
[DIR]  app\products\pumps\syringe-pumps\[slug]
[FILE] app\products\pumps\syringe-pumps\[slug]\page.tsx
[FILE] app\products\pumps\syringe-pumps\[slug]\page.tsx.bak.faq-cta
[FILE] app\products\pumps\syringe-pumps\[slug]\page.tsx.bak.fix-specs
[DIR]  app\products\pumps\valveless-pumps\[slug]
[FILE] app\products\pumps\valveless-pumps\page.tsx.bak_wrong_standalone_page_20260707_112227
[FILE] app\products\pumps\valveless-pumps\valveless-pumps.module.css.bak_wrong_standalone_style_20260707_112148
[FILE] app\products\pumps\valveless-pumps\[slug]\page.tsx
[DIR]  app\products\[category]\[slug]
[FILE] app\products\[category]\page.tsx
[DIR]  app\products\[category]\[slug]\[seriesSlug]
[FILE] app\products\[category]\[slug]\loading.tsx
[FILE] app\products\[category]\[slug]\page.tsx
[FILE] app\products\[category]\[slug]\page.tsx.bak-dynamic-routes
[FILE] app\products\[category]\[slug]\[seriesSlug]\page.tsx
```


## 3. app/[locale]/products 多语言路由结构

```txt
[FILE] app\[locale]\products\loading.tsx
[FILE] app\[locale]\products\page.tsx
[FILE] app\[locale]\products\page.tsx.20260613-160749.bak
[FILE] app\[locale]\products\page.tsx.20260613-163009.bak
[FILE] app\[locale]\products\products.css
```


## 4. components/products 组件结构

```txt
[DIR]  components\products\detail
[DIR]  components\products\selection
[FILE] components\products\detail\product-detail.module.css
[FILE] components\products\detail\product-detail.module.css.backup-before-3d-model-global-height-2026-07-04T13-34-26-284Z
[FILE] components\products\detail\product-detail.module.css.backup-before-adjust-model3d-height-only-2026-07-04T12-31-31-016Z
[FILE] components\products\detail\product-detail.module.css.backup-before-application-title-clean-fix-2026-07-04T11-22-58-061Z
[FILE] components\products\detail\product-detail.module.css.backup-before-application-title-match-model-label-2026-07-04T11-32-34-563Z
[FILE] components\products\detail\product-detail.module.css.backup-before-clean-application-title-2026-07-04T11-28-15-819Z
[FILE] components\products\detail\product-detail.module.css.backup-before-clean-final-plunger-cta-css-2026-07-04T13-01-52-942Z
[FILE] components\products\detail\product-detail.module.css.backup-before-clean-mobile-typography-fix-2026-07-04T12-00-06-862Z
[FILE] components\products\detail\product-detail.module.css.backup-before-clean-model3d-css-2026-07-04T12-24-42-750Z
[FILE] components\products\detail\product-detail.module.css.backup-before-common-applications-label-22px-2026-07-04T11-19-47-913Z
[FILE] components\products\detail\product-detail.module.css.backup-before-detail-small-style-fix-2026-07-04T10-56-15-055Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-black-regular-2026-07-04T11-36-34-873Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-fixed-height-scroll-2026-07-04T11-44-04-648Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-height-reduce-680-2026-07-04T11-47-15-355Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-question-title-weight-2026-07-04T11-50-03-833Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-reserved-height-no-scroll-2026-07-04T11-45-46-825Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-section-min-height-2026-07-04T11-39-57-806Z
[FILE] components\products\detail\product-detail.module.css.backup-before-faq-title-bold-restore-2026-07-04T11-37-33-800Z
[FILE] components\products\detail\product-detail.module.css.backup-before-fix-css-module-pure-selector-2026-07-04T12-05-45-720Z
[FILE] components\products\detail\product-detail.module.css.backup-before-fix-faq-layout-shift-2026-07-04T13-09-32-327Z
[FILE] components\products\detail\product-detail.module.css.backup-before-force-hide-frd-drawing-head-2026-07-04T12-12-12-433Z
[FILE] components\products\detail\product-detail.module.css.backup-before-force-plunger-cta-visible-2026-07-04T12-53-04-524Z
[FILE] components\products\detail\product-detail.module.css.backup-before-hide-drawing-panel-heading-2026-07-04T12-04-54-542Z
[FILE] components\products\detail\product-detail.module.css.backup-before-match-3d-to-drawing-680-2026-07-04T12-17-00-946Z
[FILE] components\products\detail\product-detail.module.css.backup-before-mobile-action-gap-2026-07-04T13-31-43-456Z
[FILE] components\products\detail\product-detail.module.css.backup-before-mobile-alignment-2026-07-04T13-27-47-868Z
[FILE] components\products\detail\product-detail.module.css.backup-before-mobile-model-line-center-2026-07-04T13-29-59-672Z
[FILE] components\products\detail\product-detail.module.css.backup-before-mobile-spec-table-final-2026-07-04T13-20-11-207Z
[FILE] components\products\detail\product-detail.module.css.backup-before-mobile-title-font-size-fix-2026-07-04T11-55-00-812Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-action-button-move-right-24px-2026-07-04T12-38-07-886Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-action-button-style-2026-07-04T10-57-52-695Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-font-size-2026-07-04T11-13-03-788Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-text-20px-2026-07-04T11-17-58-725Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-text-same-size-2026-07-04T12-37-08-751Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model-text-same-size-bold-2026-07-04T13-44-37-521Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model3d-final-height-hit-real-wrapper-2026-07-04T12-33-24-642Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model3d-outer-box-first-2026-07-04T12-19-00-627Z
[FILE] components\products\detail\product-detail.module.css.backup-before-model3d-panel-size-2026-07-04T12-14-43-270Z
[FILE] components\products\detail\product-detail.module.css.backup-before-plunger-cta-align-content-width-2026-07-04T13-12-42-138Z
[FILE] components\products\detail\product-detail.module.css.backup-before-plunger-cta-button-no-lift-2026-07-04T12-57-58-539Z
[FILE] components\products\detail\product-detail.module.css.backup-before-plunger-cta-full-bleed-2026-07-04T12-57-08-822Z
[FILE] components\products\detail\product-detail.module.css.backup-before-plunger-cta-move-left-2026-07-04T13-11-46-710Z
[FILE] components\products\detail\product-detail.module.css.backup-before-plunger-cta-taller-2026-07-04T13-00-16-082Z
[FILE] components\products\detail\product-detail.module.css.backup-before-product-desc-black-2026-07-04T11-29-18-914Z
[FILE] components\products\detail\product-detail.module.css.backup-before-reduce-faq-cta-gap-2026-07-04T13-07-49-021Z
[FILE] components\products\detail\product-detail.module.css.backup-before-remove-2d-drawing-text-2026-07-04T12-01-06-314Z
[FILE] components\products\detail\product-detail.module.css.backup-before-remove-gap-after-plunger-cta-2026-07-04T12-59-01-328Z
[FILE] components\products\detail\product-detail.module.css.backup-before-replace-faq-stable-height-2026-07-04T13-06-21-298Z
[FILE] components\products\detail\product-detail.module.css.backup-before-restore-css-syntax-2026-07-04T13-13-49-494Z
[FILE] components\products\detail\product-detail.module.css.backup-before-restore-faq-final-style-2026-07-04T13-03-52-894Z
[FILE] components\products\detail\product-detail.module.css.backup-before-restore-model-viewer-and-size-only-2026-07-04T12-30-00-656Z
[FILE] components\products\detail\product-detail.module.css.backup-before-restore-model-viewer-size-2026-07-04T12-28-28-315Z
[FILE] components\products\detail\product-detail.module.css.backup-before-spec-table-black-regular-2026-07-04T11-35-16-523Z
[FILE] components\products\detail\product-detail.module.css.backup-before-tab-active-no-bold-2026-07-04T11-52-16-632Z
[FILE] components\products\detail\product-detail.module.css.backup-before-use-shared-button-2026-07-04T11-06-39-798Z
[FILE] components\products\detail\product-detail.module.css.backup-before-use-shared-button-2026-07-04T11-08-12-331Z
[FILE] components\products\detail\product-detail.module.css.backup-force-model-action-button-2026-07-04T10-59-36-236Z
[FILE] components\products\detail\product-detail.module.css.bak_application_content_18px_20260706_223105
[FILE] components\products\detail\product-detail.module.css.bak_cta_height_compact_20260706_234610
[FILE] components\products\detail\product-detail.module.css.bak_cta_move_down_50px_20260706_234833
[FILE] components\products\detail\product-detail.module.css.bak_detail_button_pressed_state_20260707_001229
[FILE] components\products\detail\product-detail.module.css.bak_detail_cart_button_selected_state_20260707_000252
[FILE] components\products\detail\product-detail.module.css.bak_faq_cta_move_up_20260706_234438
[FILE] components\products\detail\product-detail.module.css.bak_faq_fixed_area_final_20260706_235148
[FILE] components\products\detail\product-detail.module.css.bak_faq_to_cta_gap_50px_20260706_234946
[FILE] components\products\detail\product-detail.module.css.bak_fix_application_content_smaller_20260706_223014
[FILE] components\products\detail\product-detail.module.css.bak_fix_common_application_same_as_desc_20260706_222853
[FILE] components\products\detail\product-detail.module.css.bak_remove_custom_detail_action_style_20260707_000444
[FILE] components\products\detail\product-detail.module.css.bak_remove_wrong_button_selected_styles_20260707_000704
[FILE] components\products\detail\product-detail.module.css.bak_restore_cta_height_move_down_20260706_234725
[FILE] components\products\detail\product-responsive-v4-report.txt
[FILE] components\products\detail\product-responsive-v5-report.txt
[FILE] components\products\detail\ProductDetail.module.css
[FILE] components\products\detail\ProductDetailClient.tsx
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-add-drawing-panel-attr-2026-07-04T12-04-54-879Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-clean-model3d-wrapper-2026-07-04T12-24-42-746Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-detail-small-style-fix-2026-07-04T10-56-15-051Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-ensure-model3d-panel-flag-2026-07-04T12-30-00-655Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-fix-cta-jsx-position-2026-07-04T12-54-12-505Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-force-model3d-real-wrapper-flag-2026-07-04T12-33-24-637Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-force-plunger-cta-visible-2026-07-04T12-53-04-523Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-model-button-real-button-2026-07-04T11-10-11-031Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-model-type-fix-2026-07-04T10-48-48-411Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-model3d-outer-box-first-2026-07-04T12-19-00-626Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-model3d-panel-size-2026-07-04T12-14-43-270Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-move-plunger-cta-after-faq-2026-07-04T12-55-55-693Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-remove-2d-drawing-text-2026-07-04T12-01-06-311Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-remove-drawing-panel-title-2026-07-04T12-03-11-604Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-simple-plunger-cta-text-2026-07-04T12-48-57-001Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-template-model-action-2026-07-04T11-04-20-399Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-use-shared-button-2026-07-04T11-06-39-797Z
[FILE] components\products\detail\ProductDetailClient.tsx.backup-before-use-shared-button-2026-07-04T11-08-12-330Z
[FILE] components\products\detail\ProductDetailClient.tsx.bak.syringe-cta
[FILE] components\products\detail\ProductDetailClient.tsx.bak_20260707_133527
[FILE] components\products\detail\ProductDetailClient.tsx.bak_20260707_134457
[FILE] components\products\detail\ProductDetailClient.tsx.bak_add_diaphragm_bottom_cta_20260706_234250
[FILE] components\products\detail\ProductDetailClient.tsx.bak_add_pipetting_cta_20260707_105053
[FILE] components\products\detail\ProductDetailClient.tsx.bak_add_pipetting_cta_correct_20260707_105316
[FILE] components\products\detail\ProductDetailClient.tsx.bak_bind_drawing_to_cart_20260706_235717
[FILE] components\products\detail\ProductDetailClient.tsx.bak_detail_buttons_toggle_cancel_20260707_001417
[FILE] components\products\detail\ProductDetailClient.tsx.bak_detail_cart_button_selected_state_20260707_000251
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_button_block_direct_20260707_001112
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_description_20260707_104831
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_detail_cart_actions_20260706_232258
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_detail_data_extra_type_20260706_233804
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_detail_extra_data_type_20260707_000048
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_remaining_list_toggle_runtime_20260707_000953
[FILE] components\products\detail\ProductDetailClient.tsx.bak_fix_valveless_cta_priority_20260707_134111
[FILE] components\products\detail\ProductDetailClient.tsx.bak_image_alt_en_20260707_103533
[FILE] components\products\detail\ProductDetailClient.tsx.bak_model_action_open_new_page_20260706_230725
[FILE] components\products\detail\ProductDetailClient.tsx.bak_no_auto_open_cart_20260706_232627
[FILE] components\products\detail\ProductDetailClient.tsx.bak_pipetting_alt_20260707_102830
[FILE] components\products\detail\ProductDetailClient.tsx.bak_remove_unused_addDetailProductToCart_20260707_002047
[FILE] components\products\detail\ProductDetailClient.tsx.bak_restore_detail_button_state_text_20260707_000704
[FILE] components\products\detail\ProductDetailClient.tsx.bak_safe_button_text_state_20260707_000817
[FILE] components\products\detail\ProductDetailClient.tsx.bak_use_plunger_list_toggle_style_20260707_000443
[FILE] components\products\detail\ProductDetailClient.tsx.bak_valveless_contact_buttons_20260707_134320
[FILE] components\products\detail\ProductDetailClient.tsx.broken-encoding
[FILE] components\products\detail\ProductModelViewer.module.css
[FILE] components\products\detail\ProductModelViewer.tsx
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-model3d-inner-fill-only-2026-07-04T12-33-24-641Z
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-remove-extra-model3d-inner-wrapper-2026-07-04T12-24-42-749Z
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-restore-model-viewer-import-2026-07-04T12-28-28-314Z
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-restore-working-model-viewer-current-2026-07-04T12-30-00-652Z
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-rewrite-clean-model-viewer-2026-07-04T12-25-55-995Z
[FILE] components\products\detail\ProductModelViewer.tsx.backup-before-style-import-fix-2026-07-04T13-43-09-488Z
[FILE] components\products\selection\product-selection-ui.types.ts
[FILE] components\products\selection\ProductCardGrid.tsx
[FILE] components\products\selection\ProductCardGrid.tsx.bak_card_actions_20260706_145558
[FILE] components\products\selection\ProductCardGrid.tsx.bak_drawing_cart_only_20260706_151114
[FILE] components\products\selection\ProductCardGrid.tsx.bak_final_detail_cart_20260706_163743
[FILE] components\products\selection\ProductCardGrid.tsx.bak_fix_detail_href_runtime_20260706_161703
[FILE] components\products\selection\ProductCardGrid.tsx.bak_open_detail_new_page_20260706_225910
[FILE] components\products\selection\ProductCardGrid.tsx.bak_overall_fix_20260706_162940
[FILE] components\products\selection\ProductCardGrid.tsx.bak_remove_get_detail_href_20260706_162127
[FILE] components\products\selection\ProductCategoryTabs.tsx
[FILE] components\products\selection\ProductEmptyState.tsx
[FILE] components\products\selection\ProductFilterGroup.tsx
[FILE] components\products\selection\ProductFilterPanel.tsx
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-fix-mobile-filter-collapse
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-fix-single-radio-style
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-force-product-type-collapse
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-material-two-columns
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-product-type-collapse-real
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-remove-bottom-actions
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-remove-bottom-buttons-final
[FILE] components\products\selection\ProductFilterPanel.tsx.bak-remove-filter-panel-bottom-buttons-v2
[FILE] components\products\selection\ProductFilterPanel.tsx.bak_filter04_two_columns_20260706_215540
[FILE] components\products\selection\ProductSelectionCard.tsx
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_card_actions_20260706_145558
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_drawing_cart_only_20260706_151114
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_final_detail_cart_20260706_163743
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_fix_detail_href_runtime_20260706_161703
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_fix_object_child_20260706_163934
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_open_detail_new_page_20260706_230217
[FILE] components\products\selection\ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
[FILE] components\products\selection\ProductSelectionClient.tsx
[FILE] components\products\selection\ProductSelectionClient.tsx.20260613-160749.bak
[FILE] components\products\selection\ProductSelectionClient.tsx.bak
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-add-is-filter-option-active
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-add-remove-selected-tag
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-add-six-pump-types
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-dynamic-routes
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-fix-is-option-active
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-fix-key-to-group-key
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-fix-next-key-index
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-fix-react-hooks-import
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-fix-remove-tag-type
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-force-intro-render
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-force-visible-product-type-intro
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-insert-intro-jsx-final
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-insert-intro-stable-anchor
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-intro-partial-bold
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-no-jump-series-filter
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-product-intro-emphasis-final
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-product-type-intro-banner
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-product-type-intro-real-insert
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-remove-filter-panel-props-final
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-render-product-type-intro
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-rewrite-filter-functions
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-route-click-final
[FILE] components\products\selection\ProductSelectionClient.tsx.bak-series-route-click
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_add_diaphragm_filter_labels_20260706_213305
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_add_diaphragm_medium_filter_20260706_212928
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_add_intro_product_type_attr_20260706_233805
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_add_valveless_20260707_112624
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_add_valveless_detail_href_20260707_141849
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_card_actions_20260706_145558
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_card_actions_continue_20260706_145741
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_diaphragm_selection_20260706_210016
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_drawing_cart_only_20260706_151114
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_final_detail_cart_20260706_163743
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_base_selection_import_20260706_214932
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_breadcrumb_props_20260706_152816
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_diaphragm_filter01_label_20260706_213533
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_grid_props_format_20260706_162432
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_parse_tail_20260706_145849
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_force_diaphragm_pool_20260706_211545
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_force_merge_filter04_20260706_214812
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_merge_diaphragm_filter_labels_20260706_213802
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_overall_fix_20260706_162940
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_pump_cart_display_20260706_153601
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_pump_custom_cart_20260706_154636
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_remove_get_detail_href_20260706_162127
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_remove_wrong_top_controls_20260706_220032
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_restore_original_top_components_20260706_220427
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_restore_required_imports_20260706_215310
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_restore_search_category_tabs_20260706_215828
[FILE] components\products\selection\ProductSelectionClient.tsx.bak_runtime_baseSelectionProducts_fix_20260706_215116
[FILE] components\products\selection\ProductSelectionPagination.tsx
[FILE] components\products\selection\ProductSelectionToolbar.tsx
[FILE] components\products\selection\ProductSelectionToolbar.tsx.bak-display-tags-only
```


## 5. data/products 数据结构

```txt
[DIR]  data\products\detail
[DIR]  data\products\generated
[DIR]  data\products\selection
[DIR]  data\products\seo-alt
[FILE] data\products\detail\ea-product-details.zh.generated.ts
[FILE] data\products\detail\ea-product-routes.generated.txt
[FILE] data\products\detail\ea-product-specs.zh.generated.ts
[FILE] data\products\detail\ea-slug-link-update-report.txt
[FILE] data\products\detail\plunger-pump-detail.generated.ts
[FILE] data\products\detail\plunger-pump-detail.summary.json
[FILE] data\products\detail\plunger-pump-detail.types.ts
[FILE] data\products\detail\product-detail-faq.zh.ts
[FILE] data\products\detail\product-detail.types.ts
[FILE] data\products\detail\product-detail.zh.ts
[FILE] data\products\detail\product-specs.zh.generated.ts
[DIR]  data\products\generated\pumps
[DIR]  data\products\generated\pumps\diaphragm-pumps
[DIR]  data\products\generated\pumps\pipetting-pumps
[DIR]  data\products\generated\pumps\syringe-pumps
[DIR]  data\products\generated\pumps\valveless-pumps
[FILE] data\products\generated\pumps\pump-series-content-audit.md
[FILE] data\products\generated\pumps\pump-series-content-detail-audit.md
[FILE] data\products\generated\pumps\pump-series.detail.generated.ts
[FILE] data\products\generated\pumps\pump-series.footnotes.generated.ts
[FILE] data\products\generated\pumps\pump-series.routes.generated.ts
[FILE] data\products\generated\pumps\pump-series.selection.generated.ts
[FILE] data\products\generated\pumps\pump-series.summary.json
[DIR]  data\products\generated\pumps\diaphragm-pumps\detail
[DIR]  data\products\generated\pumps\diaphragm-pumps\media
[DIR]  data\products\generated\pumps\diaphragm-pumps\routes
[DIR]  data\products\generated\pumps\diaphragm-pumps\selection
[DIR]  data\products\generated\pumps\diaphragm-pumps\summary
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpgl800-gas-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl30-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl30h-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\dpl60-liquid-diaphragm-pump.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_create_8_model_pages_20260706144617
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_fix_motor_life_duplicate_20260707_002916
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_restore_model_faqs_20260706150942
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_rewrite_clean_faqs_20260706151544
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_richer_model_descriptions_20260706143936
[FILE] data\products\generated\pumps\diaphragm-pumps\detail\index.json.bak_update_model_select_guide_20260706145031
[FILE] data\products\generated\pumps\diaphragm-pumps\media\media.json
[FILE] data\products\generated\pumps\diaphragm-pumps\routes\routes.json
[FILE] data\products\generated\pumps\diaphragm-pumps\selection\cards.json
[FILE] data\products\generated\pumps\diaphragm-pumps\summary\summary.json
[DIR]  data\products\generated\pumps\pipetting-pumps\detail
[FILE] data\products\generated\pumps\pipetting-pumps\selection.generated.ts
[FILE] data\products\generated\pumps\pipetting-pumps\detail\index.json
[FILE] data\products\generated\pumps\pipetting-pumps\detail\index.json.bak_20260707_134743
[FILE] data\products\generated\pumps\pipetting-pumps\detail\index.json.bak_copy_update_20260707_102830
[DIR]  data\products\generated\pumps\syringe-pumps\detail
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json.bak.faq-cta
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json.bak.fix-specs
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json.bak.real-specs
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json.bak.remove-config-mode
[FILE] data\products\generated\pumps\syringe-pumps\detail\index.json.bak.remove-model-code
[DIR]  data\products\generated\pumps\valveless-pumps\detail
[DIR]  data\products\generated\pumps\valveless-pumps\selection
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json.bak_fix_drpl_h1_20260707_144732
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json.bak_fix_specs_20260707_142659
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json.bak_force_drpl_h1_model_20260707_144905
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json.bak_force_drpl_specs_20260707_142932
[FILE] data\products\generated\pumps\valveless-pumps\detail\index.json.bak_split_drpl_detail_20260707_144438
[FILE] data\products\generated\pumps\valveless-pumps\selection\index.json
[DIR]  data\products\selection\card-copy
[DIR]  data\products\selection\filter-rules
[FILE] data\products\selection\diaphragm-pump-selection.generated.ts
[FILE] data\products\selection\diaphragm-pump-selection.generated.ts.bak_force_8_model_links_20260706144122
[FILE] data\products\selection\diaphragm-pump-selection.generated.ts.bak_patch_8_model_detail_slug_20260706144617
[FILE] data\products\selection\pipetting-pump-selection.generated.ts
[FILE] data\products\selection\product-route-map.ts
[FILE] data\products\selection\product-route-map.ts.bak-add-six-pump-types
[FILE] data\products\selection\product-route-map.ts.bak-ea-sm-tm-final
[FILE] data\products\selection\product-route-map.ts.bak-ea-sm-tm-routes
[FILE] data\products\selection\product-route-map.ts.bak-force-intro-map
[FILE] data\products\selection\product-route-map.ts.bak-product-type-intro-data
[FILE] data\products\selection\product-route-map.ts.bak-use-webp-intro-images
[FILE] data\products\selection\product-route-map.ts.bak_diaphragm_intro_text_20260706140919
[FILE] data\products\selection\product-route-map.ts.bak_diaphragm_intro_three_types_20260706141622
[FILE] data\products\selection\product-route-map.ts.bak_fix_diaphragm_medium_filter_20260706_212515
[FILE] data\products\selection\product-route-map.ts.bak_fix_diaphragm_medium_routes_safe_20260706_212652
[FILE] data\products\selection\product-route-map.ts.bak_fix_series_insert_position_20260706_212801
[FILE] data\products\selection\product-selection.generated.ts
[FILE] data\products\selection\product-selection.summary.json
[FILE] data\products\selection\product-selection.types.ts
[FILE] data\products\selection\product-type-intro.ts
[FILE] data\products\selection\product-type-intro.ts.bak.image-paths
[FILE] data\products\selection\product-type-intro.ts.bak_diaphragm_halodp_20260706_233513
[FILE] data\products\selection\product-type-intro.ts.bak_diaphragm_intro_text_20260706140919
[FILE] data\products\selection\product-type-intro.ts.bak_diaphragm_intro_three_types_20260706141622
[FILE] data\products\selection\product-type-intro.ts.bak_fix_diaphragm_intro_text_20260706_220635
[FILE] data\products\selection\product-type-intro.ts.bak_remove_detail_text_20260706_161958
[FILE] data\products\selection\product-type-intro.ts.bak_valveless_intro_20260707_112624
[FILE] data\products\selection\syringe-pump-selection.generated.ts
[FILE] data\products\selection\syringe-pump-selection.generated.ts.bak
[FILE] data\products\selection\syringe-pump-selection.generated.ts.bak.image-paths
[FILE] data\products\selection\syringe-pump-selection.generated.ts.bak.series-labels
[FILE] data\products\selection\valveless-pump-selection.generated.ts
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_add_rpl_drpl_filter_20260707_112752
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_fix_specs_20260707_142659
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_rewrite_clean_20260707_144009
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_short_drpl_title_20260707_144228
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_split_drpl_detail_20260707_144438
[FILE] data\products\selection\valveless-pump-selection.generated.ts.bak_split_drpl_selection_only_20260707_143907
[FILE] data\products\selection\card-copy\plunger-pump-card-copy.ts
[DIR]  data\products\selection\filter-rules\pumps
[FILE] data\products\selection\filter-rules\product-filter-rules.index.ts
[FILE] data\products\selection\filter-rules\product-filter-rules.shared.ts
[FILE] data\products\selection\filter-rules\product-filter-rules.types.ts
[FILE] data\products\selection\filter-rules\pumps\plunger-pump-filter-rules.ts
[DIR]  data\products\seo-alt\pumps
[FILE] data\products\seo-alt\product-image-alt.index.ts
[FILE] data\products\seo-alt\product-image-alt.shared.ts
[FILE] data\products\seo-alt\product-image-alt.types.ts
[FILE] data\products\seo-alt\pumps\plunger-pump-image-alt.ts
[FILE] data\products\seo-alt\pumps\pump-image-alt.index.ts
```


## 6. services/products 服务层结构

```txt
[DIR]  services\products\adapters
[DIR]  services\products\detail
[FILE] services\products\getPumpSeriesDetailData.ts
[FILE] services\products\adapters\getPumpSeriesProductDetailAdapter.ts
[FILE] services\products\detail\getProductDetailPageData.ts
```


## 7. scripts/products 生成脚本结构

```txt
[FILE] scripts\products\add-ea-placeholder-faq.js
[FILE] scripts\products\add-faq-bottom-space.js
[FILE] scripts\products\add-series-faq-structure.js
[FILE] scripts\products\apply-plunger-pump-formal-copy.js
[FILE] scripts\products\apply-pump-series-faq-scope.js
[FILE] scripts\products\audit-pipetting-pump-selection.js
[FILE] scripts\products\audit-pump-series-content-detail.js
[FILE] scripts\products\audit-pump-series-data.js
[FILE] scripts\products\audit-syringe-pump-detail-pages.cjs
[FILE] scripts\products\audit-syringe-pump-selection-page.cjs
[FILE] scripts\products\audit-valveless-pump-detail-specs.js
[FILE] scripts\products\audit-valveless-pump-detail-specs.js.bak_split_drpl_detail_20260707_144438
[FILE] scripts\products\build-plunger-pump-detail-data.js
[FILE] scripts\products\build-product-selection-data.js
[FILE] scripts\products\build-pump-series-data.js
[FILE] scripts\products\build-pump-series-data.js.backup-before-common-applications-2026-07-04T10-43-43-431Z
[FILE] scripts\products\build-pump-series-data.js.backup-before-locale-body-fix-2026-07-04T10-45-42-784Z
[FILE] scripts\products\check-ea-full-model-codes.js
[FILE] scripts\products\check-product-selection-data.js
[FILE] scripts\products\check-selection-detail-copy-separation.js
[FILE] scripts\products\clean-spec-table-column-position.js
[FILE] scripts\products\connect-syringe-pump-selection-page.cjs
[FILE] scripts\products\create-pipetting-pump-xlsx.cjs
[FILE] scripts\products\create-pump-series-xlsx-template.js
[FILE] scripts\products\create-syringe-pump-detail-pages.cjs
[FILE] scripts\products\enlarge-product-center-cards-only.js
[FILE] scripts\products\final-product-center-width.js
[FILE] scripts\products\fine-tune-product-detail-tab-spacing.js
[FILE] scripts\products\fix-drpl-detail-h1.js
[FILE] scripts\products\fix-faq-footer-gap.js
[FILE] scripts\products\fix-plunger-assets-use-current-public-folder.js
[FILE] scripts\products\fix-plunger-detail-adapter-clean.js
[FILE] scripts\products\fix-plunger-detail-assets-request-links.js
[FILE] scripts\products\fix-plunger-detail-image-and-assets-safe.js
[FILE] scripts\products\fix-plunger-detail-image-and-assets.js
[FILE] scripts\products\fix-plunger-detail-link-final.js
[FILE] scripts\products\fix-plunger-public-assets-auto-match.js
[FILE] scripts\products\fix-plunger-public-assets-final-clean.js
[FILE] scripts\products\fix-plunger-pump-detail-routing.js
[FILE] scripts\products\fix-product-detail-client-asset-fields.js
[FILE] scripts\products\fix-product-detail-spec-table-width.js
[FILE] scripts\products\fix-product-model-viewer-stage.js
[FILE] scripts\products\fix-pump-series-image-assets.js
[FILE] scripts\products\fix-pump-series-selection-card-assets.js
[FILE] scripts\products\fix-pump-series-seo-and-faq-header.js
[FILE] scripts\products\fix-syringe-pump-detail-faq-cta.cjs
[FILE] scripts\products\fix-syringe-pump-detail-specs-alias.cjs
[FILE] scripts\products\fix-syringe-pump-image-paths.cjs
[FILE] scripts\products\fix-syringe-pump-real-specs.cjs
[FILE] scripts\products\fix-tm-common-applications.js
[FILE] scripts\products\fix-valveless-pump-detail-specs.js
[FILE] scripts\products\force-card-title-active-green.js
[FILE] scripts\products\force-fix-drpl-h1-model.js
[FILE] scripts\products\force-fix-drpl-specs-visible.js
[FILE] scripts\products\force-product-detail-tab-size.js
[FILE] scripts\products\force-spec-table-grid-column.js
[FILE] scripts\products\force-spec-value-column-right.js
[FILE] scripts\products\generate-diaphragm-pump-data.js
[FILE] scripts\products\generate-pipetting-pump-detail-data.js
[FILE] scripts\products\generate-pipetting-pump-detail-data.js.bak_20260707_134743
[FILE] scripts\products\generate-pipetting-pump-detail-data.js.bak_copy_update_20260707_102830
[FILE] scripts\products\generate-pipetting-pump-selection-from-xlsx.cjs
[FILE] scripts\products\generate-valveless-pump-detail-data.js
[FILE] scripts\products\generate-valveless-pump-detail-data.js.bak_20260707_134457
[FILE] scripts\products\generate-valveless-pump-detail-data.js.bak_fix_additional_images_20260707_133743
[FILE] scripts\products\generate-valveless-pump-detail-data.js.bak_fix_specs_20260707_142659
[FILE] scripts\products\generate-valveless-pump-detail-data.js.bak_force_drpl_h1_model_20260707_144905
[FILE] scripts\products\generate-valveless-pump-detail-data.js.bak_force_drpl_specs_20260707_142932
[FILE] scripts\products\hide-detail-product-name.js
[FILE] scripts\products\keep-application-title-original.js
[FILE] scripts\products\move-product-detail-spec-value-right.js
[FILE] scripts\products\move-spec-label-right-100.js
[FILE] scripts\products\move-spec-value-left-100.js
[FILE] scripts\products\move-spec-value-left-200.js
[FILE] scripts\products\move-spec-value-right-250.js
[FILE] scripts\products\normalize-pump-series-data-source.js
[FILE] scripts\products\patch-card-button-compact.js
[FILE] scripts\products\patch-card-inner-keep-highlight.js
[FILE] scripts\products\patch-card-text-button-layout.js
[FILE] scripts\products\patch-card-text-left-align.js
[FILE] scripts\products\patch-ea-selection-card-text-lines.js
[FILE] scripts\products\patch-ea-selection-card-text.js
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
[FILE] scripts\products\reduce-detail-page-bottom-padding.js
[FILE] scripts\products\remove-detail-bottom-gap.js
[FILE] scripts\products\remove-generated-plunger-faq.js
[FILE] scripts\products\remove-syringe-pump-config-mode-spec.cjs
[FILE] scripts\products\remove-syringe-pump-model-code-specs.cjs
[FILE] scripts\products\remove-zh-faq-label.js
[FILE] scripts\products\reset-final-spec-table-layout.js
[FILE] scripts\products\reset-product-card-final-stable.js
[FILE] scripts\products\reset-product-detail-tab-clean.js
[FILE] scripts\products\restore-css-and-clean-3d-viewer.js
[FILE] scripts\products\search-ea-full-models-in-xlsx.js
[FILE] scripts\products\split-drpl-detail-pages.js
[FILE] scripts\products\update-syringe-pump-series-labels.cjs
[FILE] scripts\products\widen-product-center-main-container.js
```


## 8. data-source 数据源结构

```txt
[DIR]  data-source\global
[DIR]  data-source\product-center
[DIR]  data-source\resources
[FILE] data-source\global\FOREACH_全站脚注库.xlsx
[DIR]  data-source\product-center\pumps
[DIR]  data-source\product-center\pumps\plunger-pump
[FILE] data-source\product-center\pumps\FOREACH_泵系列_产品数据源.backup-before-enable-tm-3d-2026-07-04T04-38-39-818Z.xlsx
[FILE] data-source\product-center\pumps\FOREACH_泵系列_产品数据源.xlsx
[FILE] data-source\product-center\pumps\FOREACH_移液泵系列_产品数据源.xlsx
[FILE] data-source\product-center\pumps\FOREACH_隔膜泵系列_产品数据源.xlsx
[DIR]  data-source\product-center\pumps\plunger-pump\ea
[FILE] data-source\product-center\pumps\plunger-pump\FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\01_EA常规柱塞泵_详情页资料_zh.repaired-20260613-122221.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\01_EA常规柱塞泵_详情页资料_zh.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\02_EA常规柱塞泵_规格参数_zh.repaired-20260613-122221.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\02_EA常规柱塞泵_规格参数_zh.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\ea-product-data-validation.txt
[FILE] data-source\product-center\pumps\plunger-pump\ea\ea-selection.repaired-20260613-122221.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\ea-selection.xlsx
[FILE] data-source\product-center\pumps\plunger-pump\ea\ea-xlsx-health-report.txt
[FILE] data-source\product-center\pumps\plunger-pump\ea\文件校验.txt
[DIR]  data-source\resources\fitting-replacement
[FILE] data-source\resources\fitting-replacement\Q20系列_测试数据.xlsx
```


## 9. public/images/products 图片资源结构

```txt
[DIR]  public\images\products\common
[DIR]  public\images\products\FIT
[DIR]  public\images\products\PROBE
[DIR]  public\images\products\pumps
[DIR]  public\images\products\Sensor
[DIR]  public\images\products\TUBING
[DIR]  public\images\products\VALVE
[FILE] public\images\products\common\product-placeholder.svg
[FILE] public\images\products\FIT\Barbed connector_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Filter - Check valve_200x200_01_v001.jpg
[FILE] public\images\products\FIT\For rigid tubing_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Luer fitting_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Panel mountunion_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Quick connector_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Thread with barb_200x200_01_v001.jpg
[FILE] public\images\products\FIT\Union_200x200_01_v001.jpg
[FILE] public\images\products\PROBE\Puncturing probe_200x200_01_v001.jpg
[FILE] public\images\products\PROBE\Rinsing probe_200x200_01_v001.jpg
[FILE] public\images\products\PROBE\Sampling probe_200x200_01_v001.jpg
[FILE] public\images\products\PROBE\Stirrer_200x200_01_v001.jpg
[DIR]  public\images\products\pumps\diaphragm-pumps
[DIR]  public\images\products\pumps\pipetting-pumps
[DIR]  public\images\products\pumps\plunger-pump
[DIR]  public\images\products\pumps\product-types
[DIR]  public\images\products\pumps\syringe-pumps
[DIR]  public\images\products\pumps\valveless-pumps
[FILE] public\images\products\pumps\diaphragm-pump.jpg
[FILE] public\images\products\pumps\pipetting-pump.jpg
[FILE] public\images\products\pumps\piston-pump.jpg
[FILE] public\images\products\pumps\rotary-pump.jpg
[FILE] public\images\products\pumps\syringe-pump.jpg
[DIR]  public\images\products\pumps\diaphragm-pumps\dpgl800
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30h
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl60
[DIR]  public\images\products\pumps\diaphragm-pumps\dpgl800\curves
[DIR]  public\images\products\pumps\diaphragm-pumps\dpgl800\images
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30\curves
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30\images
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30h\curves
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl30h\images
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl60\curves
[DIR]  public\images\products\pumps\diaphragm-pumps\dpl60\images
[FILE] public\images\products\pumps\pipetting-pumps\.gitkeep
[DIR]  public\images\products\pumps\plunger-pump\ea
[DIR]  public\images\products\pumps\plunger-pump\sm
[DIR]  public\images\products\pumps\plunger-pump\tm
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-10000ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-10000ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-1000ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-1000ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-100ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-100ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-2500ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-2500ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-250ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-250ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-5000ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-5000ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-500ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-500ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-duanzi.webp
[FILE] public\images\products\pumps\plunger-pump\ea\pump-ea-guangou.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-1000ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-100ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-100ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-250ul-peek.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-250ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-500ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\sm\pump-sm-50ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\tm\pump-tm-100ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\tm\pump-tm-250ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\tm\pump-tm-500ul-pmma.webp
[FILE] public\images\products\pumps\plunger-pump\tm\pump-tm-50ul-pmma.webp
[DIR]  public\images\products\pumps\product-types\diaphragm-pumps
[DIR]  public\images\products\pumps\product-types\high-pressure-pumps
[DIR]  public\images\products\pumps\product-types\pipetting-pumps
[DIR]  public\images\products\pumps\product-types\plunger-pumps
[DIR]  public\images\products\pumps\product-types\syringe-pumps
[DIR]  public\images\products\pumps\product-types\valveless-pumps
[FILE] public\images\products\pumps\product-types\diaphragm-pumps\foreach-diaphragm-pumps-product-type-intro.webp
[FILE] public\images\products\pumps\product-types\high-pressure-pumps\foreach-high-pressure-pumps-product-type-intro.webp
[FILE] public\images\products\pumps\product-types\pipetting-pumps\foreach-pipetting-pumps-product-type-intro.webp
[FILE] public\images\products\pumps\product-types\plunger-pumps\foreach-plunger-pumps-product-type-intro.webp
[FILE] public\images\products\pumps\product-types\syringe-pumps\foreach-syringe-pumps-product-type-intro.webp
[FILE] public\images\products\pumps\product-types\valveless-pumps\foreach-valveless-pumps-product-type-intro.webp
[FILE] public\images\products\Sensor\Pressure sensor_200x200_01_v001.jpg
[FILE] public\images\products\TUBING\ETFE_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\FEP_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\PEEK_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\PTFE_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\PU_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\PVC_200x200_01_v001.JPG
[FILE] public\images\products\TUBING\TPU_200x200_01_v001.JPG
[FILE] public\images\products\VALVE\Pinch valve_200x200_01_v001.jpg
[FILE] public\images\products\VALVE\Rotary valve_200x200_01_v001.jpg
[FILE] public\images\products\VALVE\Solenoid valve_200x200_01_v001.jpg
```


## 10. public/downloads 下载资源结构

```txt
[DIR]  public\downloads\resources
[DIR]  public\downloads\resources\datasheets
[DIR]  public\downloads\resources\selection-support
[DIR]  public\downloads\resources\datasheets\en
[DIR]  public\downloads\resources\datasheets\zh-CN
[DIR]  public\downloads\resources\datasheets\zh-CN\泵系列
[DIR]  public\downloads\resources\datasheets\zh-CN\阀系列
[FILE] public\downloads\resources\datasheets\zh-CN\泵系列\柱塞泵系列规格书_A01_恒永达.pdf
[DIR]  public\downloads\resources\selection-support\fitting-replacement
[DIR]  public\downloads\resources\selection-support\fitting-replacement\q20
[DIR]  public\downloads\resources\selection-support\fitting-replacement\q20\drawings
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PMV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PMV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PMX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PMX-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PNV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PNV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PNX-SACE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PNX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-PNX-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SMV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SMV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SMX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SMX-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SNV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SNV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SNX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2001-SNX-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PMV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PMV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PMX-SACE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PMX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PMX-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNV-LACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNV-LPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNV-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNV-SPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNX-LACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNX-LPPE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNX-SACE.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNX-SACN.pdf
[FILE] public\downloads\resources\selection-support\fitting-replacement\q20\drawings\Q2002-PNX-SPPE.pdf
```


## 11. 搜索阀系列关键词

```txt
app\about\foreach\AboutForeachClient.tsx:214: "恒永达科技（股票代码：874030）成立于 2012 年，作为国家级专精特新“小巨人”企业、深圳市瞪羚企业、国家高新技术企业及广东省工程技术研究中心认定单位，始终以微流体系统领域的创新引领者姿态，深耕于微流体核心部件的研发与制造。公司构建了覆盖自动化分析仪器液路系统全链条的产品矩阵，涵盖泵、阀、采样针、连接件、橡塑管、驱动器、传感器等关键零部件，广泛应用于生命科学、合成生物、高端检测等多个领域，形成了高精度、全场景的微流体解决方案体系。",
app\about\foreach\AboutForeachClient.tsx:215: en: "Founded in 2012, FOREACH Technology, stock code 874030, is recognized as a National Specialized and Sophisticated “Little Giant” enterprise, a Shenzhen Gazelle enterprise, a National High-Tech Enterprise, and a Guangdong Engineering Technology Research Center. As an innovation leader in the field of microfluidic systems, FOREACH has long been dedicated to the R&D and manufacturing of core microfluidic components. The company has built a product matrix covering the full chain of fluidic systems for automated analytical instruments, including pumps, valves, sampling needles, fittings, elastomeric tubing, drivers, sensors, and other key components. Its products are widely used in life sciences, synthetic biology, high-end testing, and other fields, forming a high-precision and full-scenario microfluidic solution system.",
app\about\foreach\AboutForeachClient.tsx:217: fr: "Fondée en 2012, FOREACH Technology, code boursier 874030, est reconnue comme une entreprise nationale spécialisée et innovante « Little Giant », une entreprise Gazelle de Shenzhen, une entreprise nationale de haute technologie et un centre de recherche en technologie d’ingénierie du Guangdong. En tant que leader de l’innovation dans le domaine des systèmes microfluidiques, FOREACH se consacre depuis longtemps à la R&D et à la fabrication de composants microfluidiques clés. L’entreprise a construit une matrice de produits couvrant toute la chaîne des systèmes fluidiques pour instruments d’analyse automatisés, notamment les pompes, valves, aiguilles de prélèvement, raccords, tubes élastomères, modules de commande, capteurs et autres composants essentiels. Ses produits sont largement utilisés dans les sciences de la vie, la biologie de synthèse, les tests haut de gamme et d’autres domaines, formant un système de solutions microfluidiques de haute précision et adapté à de multiples scénarios.",
app\applications\analytical-instruments\page.tsx:16: "恒永达面向分析检测设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
app\applications\environmental-monitoring\page.tsx:16: "恒永达面向环保监测设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
app\applications\ivd\page.tsx:27: "恒永达为生化、免疫、血液、凝血、分子诊断等 IVD 仪器提供泵、阀、接头、管路、传感器等微流体核心部件支持。",
app\applications\lab-automation\page.tsx:24: "恒永达面向实验室自动化设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
app\applications\life-science\page.tsx:24: "恒永达面向生命科学设备提供泵、阀、接头、管材、传感器及液路系统集成支持。",
app\applications\synthetic-biology\page.tsx:16: "恒永达面向合成生物系统提供泵、阀、接头、管材、传感器及液路系统集成支持。",
app\contact\distributor\page.tsx:33: "获取泵、阀、管路、连接件、传感器等产品选型支持。",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:48: valvePlate?: string;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:279: valvePlate: getText(item.valvePlate),
app\products\pumps\valveless-pumps\[slug]\page.tsx:5: import details from "@/data/products/generated/pumps/valveless-pumps/detail/index.json";
app\products\pumps\valveless-pumps\[slug]\page.tsx:7: type ValvelessPumpDetail = (typeof details)[number];
app\products\pumps\valveless-pumps\[slug]\page.tsx:9: type ValvelessPumpDetailPageProps = {
app\products\pumps\valveless-pumps\[slug]\page.tsx:23: function getDetailBySlug(slug: string): ValvelessPumpDetail | null {
app\products\pumps\valveless-pumps\[slug]\page.tsx:29: }: ValvelessPumpDetailPageProps): Promise<Metadata> {
app\products\pumps\valveless-pumps\[slug]\page.tsx:43: function toClientData(detail: ValvelessPumpDetail) {
app\products\pumps\valveless-pumps\[slug]\page.tsx:58: productId: detail.productId || `valveless-${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:101: detail.detailHref || `/products/pumps/valveless-pumps/${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:102: href: detail.href || `/products/pumps/valveless-pumps/${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:103: selectionHref: detail.selectionHref || "/products/pumps/valveless-pumps",
app\products\pumps\valveless-pumps\[slug]\page.tsx:115: productTypeName: "无阀泵",
app\products\pumps\valveless-pumps\[slug]\page.tsx:134: `${detail.model} FOREACH valveless pump`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:139: `${detail.model} FOREACH 无阀泵`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:144: `${detail.model} FOREACH 无阀泵`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:148: export default async function ValvelessPumpDetailPage({
app\products\pumps\valveless-pumps\[slug]\page.tsx:150: }: ValvelessPumpDetailPageProps) {
app\[locale]\applications\analytical-instruments\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for analytical instruments.",
app\[locale]\applications\environmental-monitoring\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for environmental monitoring systems.",
app\[locale]\applications\ivd\page.tsx:41: "FOREACH provides pumps, valves, fittings, tubing and sensors for IVD fluidic systems.",
app\[locale]\applications\lab-automation\page.tsx:36: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for laboratory automation systems.",
app\[locale]\applications\life-science\page.tsx:36: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for life science instruments.",
app\[locale]\applications\synthetic-biology\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for synthetic biology systems.",
components\applications\ivd\IvdApplicationClient.tsx:115: 面向 IVD 体外诊断设备，提供泵、阀、接头、管材、传感器及液路系统集成支持。
components\common\PdfDrawingPreview.tsx:11: 4. 后续阀、针、传感器等页面也可直接复用
components\products\detail\ProductDetailClient.tsx:90: isValvelessPumpDetailData(data) ||
components\products\detail\ProductDetailClient.tsx:183: function isValvelessPumpDetailData(data: any): boolean {
components\products\detail\ProductDetailClient.tsx:187: text.includes("无阀泵") ||
components\products\detail\ProductDetailClient.tsx:188: text.includes("valveless pump") ||
components\products\detail\ProductDetailClient.tsx:189: text.includes("valveless-pump") ||
components\products\detail\ProductDetailClient.tsx:190: text.includes("valveless-pumps") ||
components\products\detail\ProductDetailClient.tsx:218: desc: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
components\products\detail\ProductDetailClient.tsx:224: if (isValvelessPumpDetailData(data)) {
components\products\detail\ProductDetailClient.tsx:226: title: "无阀泵可根据您的液路需求进行定制",
components\products\detail\ProductDetailClient.tsx:227: desc: "恒永达可根据您的应用场景、目标排量、配比要求、液体兼容性、接口方式、清洗口和安装空间，协助确认适合自动化仪器集成的无阀泵配置。",
components\products\detail\ProductDetailClient.tsx:244: desc: "如果您不确定具体型号，可根据介质类型、流量、耐压、自吸能力、膜片材质、阀片材质、泵头材质、接口方式和安装空间等信息联系我们。恒永达可协助您确认适合自动化仪器液路的隔膜泵配置。",
components\products\detail\ProductDetailClient.tsx:263: if (isCustomInquiryMode(data) || isValvelessPumpDetailData(data)) {
components\products\selection\ProductSelectionClient.tsx:34: valvelessPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:35: valvelessPumpFilterLabels,
components\products\selection\ProductSelectionClient.tsx:36: } from "@/data/products/selection/valveless-pump-selection.generated";
components\products\selection\ProductSelectionClient.tsx:68: ...valvelessPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:85: ...valvelessPumpFilterLabels,
components\products\selection\ProductSelectionClient.tsx:251: id: "valves",
components\products\selection\ProductSelectionClient.tsx:252: label: "阀系列",
components\products\selection\ProductSelectionClient.tsx:253: description: "根据阀类型、系列、通路、位数和材质选择基础配置。",
components\products\selection\ProductSelectionClient.tsx:556: const isValvelessPump =
components\products\selection\ProductSelectionClient.tsx:558: ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:564: if (isValvelessPump) {
components\products\selection\ProductSelectionClient.tsx:577: ? `/products/pumps/valveless-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:578: : "/products/pumps/valveless-pumps";
components\products\selection\ProductSelectionClient.tsx:759: * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
components\resources\ResourceSearchBar.tsx:54: recentKeywords = ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],
components\resources\fitting-replacement\FittingReplacementDetail.tsx:164: ["panelMount", "valved"],
components\resources\fitting-replacement\FittingReplacementGuide.tsx:100: fieldKey: "valved",
components\resources\fitting-replacement\FittingReplacementGuide.tsx:102: zh: "根据断开时是否需要自动截止液路，选择带阀或不带阀结构。",
components\resources\fitting-replacement\FittingReplacementGuide.tsx:103: en: "Choose a valved or non-valved structure depending on whether the fluid path should shut off when disconnected.",
components\resources\fitting-replacement\FittingReplacementGuide.tsx:434: "按照管路尺寸、接口形式、安装方式、阀结构和材质逐步选择，系统会自动筛选匹配型号。"}
components\resources\technical-articles\TechnicalArticlesClient.tsx:71: if (article.category === "pumps-valves") {
components\resources\technical-articles\TechnicalArticlesClient.tsx:72: return ["泵阀", "控制", "流体"];
components\resources\technical-articles\TechnicalArticlesClient.tsx:86: if (article.category === "pumps-valves") {
components\resources\technical-articles\TechnicalArticlesClient.tsx:87: return ["Pumps", "Valves", "Control"];
components\selection-cart\selection-cart.types.ts:10: 2. 后续接头、泵、阀、传感器等产品都可以加入同一个清单
components\selection-cart\selection-cart.types.ts:16: 后续如果增加泵、阀、传感器，可以继续扩展字符串。
components\selection-cart\selection-cart.types.ts:21: | "valve-selection"
data\about-quality.ts:256: "通过检测设备、测试工装、验证流程和数据记录的协同，恒永达持续提升泵、阀、传感器、管路连接件等产品在关键尺寸、功能表现和长期运行中的稳定性与一致性。",
data\about-quality.ts:398: "Through the collaboration of inspection equipment, test fixtures, validation processes and data records, FOREACH continuously improves dimensional accuracy, functional performance and long-term stability of pumps, valves, sensors, tubing assemblies and connectors.",
data\about-research-manufacturing.ts:234: "恒永达围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块，构建研发中心、机加中心、挤塑中心与工程验证能力，支撑微流体核心零部件从产品设计到稳定交付。",
data\about-research-manufacturing.ts:241: "FOREACH builds R&D, precision machining, extrusion manufacturing and engineering validation capabilities for pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
data\about-research-manufacturing.ts:291: desc: "恒永达研发与工程团队长期聚焦微流体系统核心零部件及液路应用技术，围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块开展产品开发与工程转化。团队由产品研发、结构设计、工艺验证、项目支持等职能协同组成，总人力 60+ 人，具备从需求分析、方案设计、样品试制、测试验证到量产导入的完整研发支持能力，为公司产品可靠性、技术迭代和客户项目交付提供持续支撑。",
data\about-research-manufacturing.ts:303: "围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块开展产品开发。",
data\about-research-manufacturing.ts:312: "围绕泵阀结构件、连接件、采样针及相关核心零件开展加工制造。",
data\about-research-manufacturing.ts:349: "根据工况选择泵、阀、传感器、管路与连接件组合",
data\about-research-manufacturing.ts:445: desc: "结合泵、阀、传感器、管路、连接件、采样针及驱动控制模块，支持不同流量、压力、介质与安装空间需求。",
data\about-research-manufacturing.ts:472: desc: "FOREACH’s R&D and engineering teams focus on microfluidic core components and fluidic application technologies, covering pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules. With 60+ R&D and engineering personnel across product development, structural design, process validation and project support, FOREACH supports the full process from requirement analysis and concept design to prototyping, testing, validation and production introduction.",
data\about-research-manufacturing.ts:484: "Focused development of pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
data\about-research-manufacturing.ts:493: "Manufacturing structural parts for pumps, valves, fittings, sampling probes and related core components.",
data\about-research-manufacturing.ts:530: "Select pumps, valves, sensors, tubing and fittings based on working conditions",
data\about-research-manufacturing.ts:600: desc: "Used in precision injection, flow path switching, high-pressure fluid control and pre-detection processing.",
data\about-research-manufacturing.ts:626: desc: "Supporting different flow, pressure, media and installation space requirements with pumps, valves, sensors, tubing, fittings, sampling probes and control modules.",
data\historyMilestones.ts:134: "深圳市恒永达科技股份有限公司发展历程，展示公司在微流体核心部件、泵阀产品、技术攻关、企业认证与市场拓展方面的关键节点。",
data\historyMilestones.ts:260: "6160、6907、HRV、HPP、EAS 等阀系列及泵系列产品发布",
data\historyMilestones.ts:261: "6160, 6907, HRV, HPP, EAS valve series and pump series launched",
data\historyMilestones.ts:358: "新型电磁阀、快插接头、微型隔膜气泵等产品发布",
data\historyMilestones.ts:359: "New-type solenoid valves, quick connectors, and miniature diaphragm air pumps launched",
data\historyMilestones.ts:464: "推出注射泵、旋转阀、高压泵、恒流泵等产品",
data\historyMilestones.ts:465: "Syringe pumps, rotary valves, high-pressure pumps, and constant-flow pumps launched",
data\historyMilestones.ts:497: "电磁阀研制成功",
data\historyMilestones.ts:498: "Solenoid valve developed successfully",
data\historyMilestones.ts:546: "国内首款微型无阀泵产品上市，打破美国垄断",
data\historyMilestones.ts:547: "China’s first miniature valveless pump launched, breaking the monopoly of imported products",
data\home-application-flow.ts:130: key: "rotary-valve",
data\home-application-flow.ts:132: "zh-CN": "旋转阀",
data\home-application-flow.ts:133: en: "Rotary Valve",
data\home-application-flow.ts:203: key: "rotary-valve",
data\home-application-flow.ts:205: "zh-CN": "旋转阀",
data\home-application-flow.ts:206: en: "Rotary Valve",
data\home-application-flow.ts:214: key: "solenoid-valve",
data\home-application-flow.ts:216: "zh-CN": "电磁阀",
data\home-application-flow.ts:217: en: "Solenoid Valve",
data\home-application-flow.ts:218: es: "Válvula solenoide",
data\home-application-flow.ts:287: key: "pinch-valve",
data\home-application-flow.ts:289: "zh-CN": "夹管阀",
data\home-application-flow.ts:290: en: "Pinch Valve",
data\home-application-flow.ts:339: "For high-pressure injection, flow path switching, pressure monitoring, and pre-detection processing.",
data\home-application-flow.ts:360: key: "high-pressure-valve",
data\home-application-flow.ts:362: "zh-CN": "高压阀",
data\home-application-flow.ts:363: en: "High-pressure Valve",
data\home-application-flow.ts:444: key: "solenoid-valve",
data\home-application-flow.ts:446: "zh-CN": "电磁阀",
data\home-application-flow.ts:447: en: "Solenoid Valve",
data\home-application-flow.ts:448: es: "Válvula solenoide",
data\home-application-flow.ts:455: key: "pinch-valve",
data\home-application-flow.ts:457: "zh-CN": "夹管阀",
data\home-application-flow.ts:458: en: "Pinch Valve",
data\home-application-flow.ts:629: "面向 IVD、生命科学、合成生物、高端分析仪器与实验室自动化设备，恒永达提供泵、阀、传感器、管路、连接件、采样针等核心液路组合支持。",
data\home-application-flow.ts:631: "For IVD, life sciences, synthetic biology, high-end analytical instruments, and laboratory automation, FOREACH provides integrated fluidic support covering pumps, valves, sensors, tubing, fittings, sampling probes, and related core components.",
data\home-application-flow.ts:658: key: "fluid-control-valve",
data\home-application-flow.ts:660: "zh-CN": "流体控制阀",
data\home-application-flow.ts:661: en: "Fluid Control Valves",
data\home-company-strength.ts:128: "恒永达科技（股票代码：874030）成立于 2012 年，是国家级专精特新“小巨人”企业、深圳市瞪羚企业、国家高新技术企业及广东省工程技术研究中心认定单位。公司始终专注于微流体系统核心零部件与液路解决方案，深耕泵、阀、采样针、连接件、橡塑管、驱动器、传感器等关键零部件的研发与制造，产品广泛应用于生命科学、合成生物、高端检测、IVD 和实验室自动化等领域，形成高精度、全场景的微流体解决方案体系，并持续推动高端仪器设备核心流体零部件的国产化替代。",
data\home-company-strength.ts:130: "Founded in 2012, FOREACH Technology focuses on core microfluidic components and fluidic solutions. As a specialized and innovation-driven enterprise, the company develops and manufactures pumps, valves, sampling probes, fittings, tubing, drivers, sensors, and other key fluid control components for life sciences, synthetic biology, high-end testing, IVD, and laboratory automation applications.",
data\home-company-strength.ts:396: "zh-CN": "围绕泵、阀、传感器和液路模块持续打磨产品结构。",
data\home-company-strength.ts:398: "Continuously improving product structures around pumps, valves, sensors, and fluidic modules.",
data\home-inquiry.ts:100: "zh-CN": "根据流量、压力、介质、接口和控制方式，协助判断合适的泵、阀、传感器与管路组件。",
data\home-inquiry.ts:102: "Support selection of pumps, valves, sensors, and tubing components based on flow rate, pressure, media, interfaces, and control methods.",
data\home-inquiry.ts:445: value: "solenoid-valve",
data\home-inquiry.ts:447: "zh-CN": "电磁阀",
data\home-inquiry.ts:448: en: "Solenoid Valve",
data\home-inquiry.ts:449: es: "Válvula solenoide",
data\home-inquiry.ts:456: value: "pinch-valve",
data\home-inquiry.ts:458: "zh-CN": "夹管阀",
data\home-inquiry.ts:459: en: "Pinch Valve",
data\home-inquiry.ts:467: value: "rotary-valve",
data\home-inquiry.ts:469: "zh-CN": "旋转阀",
data\home-inquiry.ts:470: en: "Rotary Valve",
data\home-news.ts:205: "围绕泵、阀、传感器、管路连接件和采样针等核心部件，持续完善面向自动化分析仪器的液路系统支持能力，帮助客户更高效地完成样本处理、试剂分配、清洗废液及多通道流路控制。",
data\home-news.ts:207: "Focused on pumps, valves, sensors, fittings, tubing, and sampling probes, FOREACH continues to improve fluidic system support for automated analytical instruments.",
data\home-news.ts:288: key: "pump-valve-sensor-fluidic-system", // 第一条新闻 key
data\home-news.ts:301: "zh-CN": "微流体液路系统中泵阀传感器如何协同工作？",
data\home-news.ts:302: en: "How do pumps, valves, and sensors work together in a microfluidic system?",
data\home-news.ts:376: key: "high-pressure-rotary-valve-selection", // 第三条新闻 key
data\home-news.ts:389: "zh-CN": "高压流体控制场景下旋转阀的关键选型因素",
data\home-news.ts:390: en: "Key selection factors for rotary valves in high-pressure fluid control",
data\navigation.ts:294: "覆盖泵、阀、管路、连接件、采样针和传感器等微流体系统核心零部件。",
data\navigation.ts:295: "Core microfluidic components including pumps, valves, tubing, fittings, probes, and sensors.",
data\navigation.ts:318: key: "valves",
data\navigation.ts:319: title: t("阀类", "Valves", "Válvulas", "Vannes", "밸브", "Клапаны"),
data\navigation.ts:426: "/images/products/pumps/rotary-pump.jpg",
data\navigation.ts:427: t("旋转泵", "Rotary Pump", "Bomba rotativa", "Pompe rotative", "로터리 펌프", "Роторный насос"),
data\navigation.ts:436: key: "valves-card",
data\navigation.ts:437: categoryKey: "valves",
data\navigation.ts:438: title: t("阀类产品", "Valves", "Válvulas", "Vannes", "밸브", "Клапаны"),
data\navigation.ts:441: "Flow path switching, on/off control, and high-pressure control",
data\navigation.ts:450: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
data\navigation.ts:451: t("电磁阀", "Solenoid Valve", "Válvula solenoide", "Électrovanne", "솔레노이드 밸브", "Соленоидный клапан"),
data\navigation.ts:455: "/images/products/VALVE/Pinch valve_200x200_01_v001.jpg",
data\navigation.ts:456: t("夹管阀", "Pinch Valve", "Válvula de pinza", "Vanne à pincement", "핀치 밸브", "Пережимной клапан"),
data\navigation.ts:460: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
data\navigation.ts:461: t("旋转阀", "Rotary Valve", "Válvula rotativa", "Vanne rotative", "로터리 밸브", "Роторный клапан"),
data\navigation.ts:496: productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤止回阀", "Filter & Check Valve", "Filtro y válvula de retención", "Filtre et clapet anti-retour", "필터 및 체크 밸브", "Фильтр и обратный клапан"), t("集成过滤与单向止回功能", "Integrated filtration and check-valve function", "Filtración integrada y función antirretorno", "Filtration intégrée et fonction anti-retour", "필터링 및 역류 방지 기능 통합", "Интегрированная фильтрация и обратный клапан")),
data\navigation.ts:1314: "多泵、多阀、多路径液路集成与长期运行维护",
data\navigation.ts:1315: "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
data\navigation.ts:1316: "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
data\navigation.ts:1317: "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
data\navigation.ts:1318: "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
data\navigation.ts:1319: "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
data\navigation.ts:2493: if (src.includes("rotary-pump")) {
data\navigation.ts:2495: title: useEnglish ? "Rotary Pump" : "旋转泵",
data\site-footer.ts:56: { // 阀类链接开始
data\site-footer.ts:57: key: "valves", // 阀类链接 key
data\site-footer.ts:58: label: { china: "阀类", global: "Valves" }, // 阀类链接文字
data\site-footer.ts:59: href: { "zh-CN": "/#products", en: "/en#products", es: "/es#products", fr: "/fr#products", ko: "/ko#products", ru: "/ru#products" }, // 阀类链接路径
data\site-footer.ts:60: }, // 阀类链接结束
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:40: "可提交分析仪器类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与分析液路集成方案。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:79: solenoidValve: {
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:80: name: "电磁阀",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:86: "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留和污染风险。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:89: rotaryValve: {
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:90: name: "旋转阀",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:94: "适合多样品、多试剂、多清洗液、多标定液和多废液路径集中管理，可减少复杂阀组数量。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:99: pinchValve: {
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:100: name: "夹管阀",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:104: "适合清洗液、废液、低压样品路径或污染控制要求较高的软管液路，液体只接触软管，不直接接触阀体。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:106: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，便于软管维护和更换。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:121: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:140: name: "止回阀 / 过滤器",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:146: "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常污染对分析系统稳定性的影响。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:184: "用于流动相、清洗液、冲洗液、废液和不同样品路径之间的切换，重点关注耐溶剂、路径防误通、阀位稳定和残留控制。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:186: products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:197: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:206: "用于泵、阀、针、传感器和分析流路之间的连接，重点关注低死体积、材料耐受、密封可靠和拆装维护便利。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:237: products: ["syringePump", "pistonPump", "solenoidValve", "sensors"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:248: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:259: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:299: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:339: products: ["syringePump", "pistonPump", "solenoidValve"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:350: products: ["syringePump", "rotaryValve", "fittingsTubing"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:359: "用于前处理液路中的颗粒过滤、防堵保护和压力反馈，重点降低颗粒进入泵阀和后端检测模块的风险。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:373: "实验室分析系统集成通常涉及多泵、多阀、多试剂瓶、多个检测模块和多废液路径组合。液路设计重点在于路径管理、空间布局、模块化维护、材料兼容和状态监测。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:376: "泵、阀、传感器、接头与管材模块化集成",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:390: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:407: navSubtitle: "泵阀管路 / 快速维护 / 密封",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:410: "用于泵、阀、针、传感器、试剂瓶、清洗液瓶、废液瓶和检测模块之间的管路连接，重点关注快速维护、密封可靠、材料兼容和低死体积。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:40: "可提交环保类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与环保监测液路方案。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:79: solenoidValve: {
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:80: name: "电磁阀",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:86: "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留、腐蚀和维护风险。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:89: rotaryValve: {
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:90: name: "旋转阀",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:94: "适合多试剂瓶、标定液、清洗液、反应液和废液路径集中管理，可减少复杂阀组数量。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:99: pinchValve: {
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:100: name: "夹管阀",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:104: "适合废液、冷凝液、清洗液和污染风险较高的软管路径，液体只接触软管，不直接接触阀体。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:106: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，便于现场软管更换和维护。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:121: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:140: name: "止回阀 / 过滤器",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:144: "可布置在水样入口、试剂路径、泵阀入口、清洗路径和废液路径关键位置，用于减少回流、颗粒进入和液路污染风险。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:146: "用于降低液体回流、颗粒堵塞、沉积物进入泵阀和异常污染对在线监测系统稳定性的影响。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:186: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:195: "用于多试剂、多清洗液、反应腔和废液路径之间的切换，重点控制路径误通、残留、阀位稳定和空间布局。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:196: tags: ["多试剂", "路径切换", "残留控制", "阀位稳定"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:197: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:208: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:217: "用于水样入口、试剂路径、泵阀入口和传感器前端保护，重点降低颗粒、沉积、回流和污染对系统稳定性的影响。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:233: "复杂水样取送、预过滤和泵阀前端保护",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:254: navSubtitle: "颗粒 / 防堵 / 泵阀保护",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:257: "用于颗粒过滤、防堵和泵阀前端保护，重点降低悬浮物、沉积物和杂质进入关键液路元件的风险。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:258: tags: ["颗粒过滤", "防堵", "泵阀保护", "维护便利"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:270: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:281: products: ["diaphragmPump", "pinchValve", "sensors"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:310: products: ["diaphragmPump", "pinchValve", "sensors"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:321: products: ["pistonPump", "diaphragmPump", "solenoidValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:330: "用于污染风险较高或维护频繁的软管路径，重点减少液体对阀体污染和腐蚀。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:332: products: ["pinchValve", "fittingsTubing"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:358: "过滤、防堵和泵阀前端保护",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:383: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:389: navSubtitle: "过滤 / 防堵 / 泵阀保护",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:392: "用于前处理过程中的颗粒过滤、防堵和泵阀保护，重点降低杂质进入关键液路元件的风险。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:393: tags: ["颗粒过滤", "防堵", "泵阀保护", "维护便利"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:405: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:417: "环保在线系统集成通常涉及多泵、多阀、多试剂瓶、标定液、清洗液和多废液路径组合。液路设计重点在于长期稳定、路径管理、抗污染、模块化维护和异常状态反馈。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:420: "泵、阀、传感器、接头与管材模块化集成",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:432: "用于多试剂、标定液、清洗液和废液路径的集中管理，重点降低误通风险、减少阀组复杂度并提升维护效率。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:434: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:451: navSubtitle: "泵阀管路 / 密封 / 快速维护",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:454: "用于泵、阀、试剂瓶、清洗液瓶、废液瓶、传感器和检测模块之间的管路连接，重点关注密封可靠、材料兼容和快速维护。",
data\applications\ivd\ivd-application.zh.ts:103: solenoidValve: {
data\applications\ivd\ivd-application.zh.ts:104: key: "solenoidValve",
data\applications\ivd\ivd-application.zh.ts:105: name: "电磁阀",
data\applications\ivd\ivd-application.zh.ts:111: "用于减少通断响应慢、路径误通、阀位不稳定、介质兼容不足导致的漏液和残留问题。",
data\applications\ivd\ivd-application.zh.ts:116: rotaryValve: {
data\applications\ivd\ivd-application.zh.ts:117: key: "rotaryValve",
data\applications\ivd\ivd-application.zh.ts:118: name: "旋转阀",
data\applications\ivd\ivd-application.zh.ts:122: "适合多试剂项目、多清洗流程和多废液路径集中管理，可把复杂阀组整合成一个多通道切换单元。",
data\applications\ivd\ivd-application.zh.ts:129: pinchValve: {
data\applications\ivd\ivd-application.zh.ts:130: key: "pinchValve",
data\applications\ivd\ivd-application.zh.ts:131: name: "夹管阀",
data\applications\ivd\ivd-application.zh.ts:135: "适合清洗、废液或特定软管路径，液体只接触软管，不直接接触阀体，可减少阀体污染和清洁压力。",
data\applications\ivd\ivd-application.zh.ts:137: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，适合对污染控制有要求的软管液路。",
data\applications\ivd\ivd-application.zh.ts:158: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\ivd\ivd-application.zh.ts:183: name: "止回阀 / 过滤器",
data\applications\ivd\ivd-application.zh.ts:189: "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常液路污染对系统稳定性的影响。",
data\applications\ivd\ivd-application.zh.ts:231: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\ivd\ivd-application.zh.ts:240: "用于多试剂、多清洗液、多废液路径之间的切换，重点解决阀位切换可靠性、通道残留、路径误通、空间占用和多管路连接复杂的问题。",
data\applications\ivd\ivd-application.zh.ts:242: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\ivd\ivd-application.zh.ts:253: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:262: "用于泵、阀、针、传感器和管路之间的连接，重点解决接头漏液、管路松脱、死体积、材料兼容、拆装维护和不同管径适配问题。",
data\applications\ivd\ivd-application.zh.ts:264: products: ["fittingsTubing", "checkFilter", "solenoidValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:315: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\ivd\ivd-application.zh.ts:326: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:332: navSubtitle: "多路径 / 阀组简化 / 介质兼容",
data\applications\ivd\ivd-application.zh.ts:335: "用于样本、磁珠试剂、标记物、底物、清洗液和废液通道之间的路径控制，重点降低多试剂系统中的阀组复杂度、路径误通和残留风险。",
data\applications\ivd\ivd-application.zh.ts:337: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\ivd\ivd-application.zh.ts:388: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\ivd\ivd-application.zh.ts:394: navSubtitle: "检测路径 / 多通道 / 阀组控制",
data\applications\ivd\ivd-application.zh.ts:397: "用于不同检测通道、清洗路径和废液路径之间的切换，重点保证路径选择准确、阀位稳定和液路切换后的残留可控。",
data\applications\ivd\ivd-application.zh.ts:399: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\ivd\ivd-application.zh.ts:410: products: ["diaphragmPump", "pinchValve", "solenoidValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:461: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\ivd\ivd-application.zh.ts:472: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\ivd\ivd-application.zh.ts:483: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:523: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\ivd\ivd-application.zh.ts:534: products: ["diaphragmPump", "pistonPump", "pinchValve", "sensors"],
data\applications\ivd\ivd-application.zh.ts:543: "用于裂解、结合、清洗、洗脱和废液等不同流程路径之间的切换，重点控制路径防误通、防回流、防污染和阀组简化。",
data\applications\ivd\ivd-application.zh.ts:545: products: ["rotaryValve", "solenoidValve", "pinchValve", "checkFilter"],
data\applications\ivd\ivd-application.zh.ts:554: "用于泵、阀、试剂瓶、反应腔和废液通道之间的连接，重点关注密封可靠、材料耐受、低死体积、易维护和防污染。",
data\applications\ivd\ivd-application.zh.ts:556: products: ["fittingsTubing", "checkFilter", "solenoidValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:48: "可提交自动化设备类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与液路集成方案。",
data\applications\lab-automation\lab-automation-application.zh.ts:87: solenoidValve: {
data\applications\lab-automation\lab-automation-application.zh.ts:88: name: "电磁阀",
data\applications\lab-automation\lab-automation-application.zh.ts:94: "用于减少通断响应慢、路径误通、阀位不稳定、介质兼容不足导致的漏液、残留、污染和维护风险。",
data\applications\lab-automation\lab-automation-application.zh.ts:97: rotaryValve: {
data\applications\lab-automation\lab-automation-application.zh.ts:98: name: "旋转阀",
data\applications\lab-automation\lab-automation-application.zh.ts:107: pinchValve: {
data\applications\lab-automation\lab-automation-application.zh.ts:108: name: "夹管阀",
data\applications\lab-automation\lab-automation-application.zh.ts:114: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度。",
data\applications\lab-automation\lab-automation-application.zh.ts:129: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\lab-automation\lab-automation-application.zh.ts:148: name: "止回阀 / 过滤器",
data\applications\lab-automation\lab-automation-application.zh.ts:154: "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常液路污染对系统稳定性的影响。",
data\applications\lab-automation\lab-automation-application.zh.ts:194: products: ["pistonPump", "diaphragmPump", "solenoidValve", "sensors"],
data\applications\lab-automation\lab-automation-application.zh.ts:205: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:214: "用于泵、阀、针、传感器、试剂瓶、反应腔和废液通道之间的连接，重点关注密封可靠、低死体积、材料兼容和维护便利。",
data\applications\lab-automation\lab-automation-application.zh.ts:256: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:267: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\lab-automation\lab-automation-application.zh.ts:296: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:307: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\lab-automation\lab-automation-application.zh.ts:316: "用于洗头、针路、泵阀模块和废液通道之间的连接，重点关注密封、过滤、防堵和维护效率。",
data\applications\lab-automation\lab-automation-application.zh.ts:347: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:358: products: ["fittingsTubing", "checkFilter", "solenoidValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:381: "自动化实验系统集成通常涉及多泵、多阀、多试剂瓶、多工作位和多废液路径组合。液路设计重点在于路径管理、空间布局、模块化连接、维护便利和状态监测。",
data\applications\lab-automation\lab-automation-application.zh.ts:384: "泵、阀、针、传感器与管路模块化集成",
data\applications\lab-automation\lab-automation-application.zh.ts:398: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\lab-automation\lab-automation-application.zh.ts:404: navSubtitle: "泵 / 阀 / 针 / 传感器",
data\applications\lab-automation\lab-automation-application.zh.ts:407: "用于泵、阀、针、传感器和不同功能模块之间的连接，重点关注标准化连接、密封可靠和维护便利。",
data\applications\life-science\life-science-application.zh.ts:48: "可提交应用类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与实验液路方案。",
data\applications\life-science\life-science-application.zh.ts:87: solenoidValve: {
data\applications\life-science\life-science-application.zh.ts:88: name: "电磁阀",
data\applications\life-science\life-science-application.zh.ts:94: "用于减少通断响应慢、路径误通、阀位不稳定、介质兼容不足导致的漏液、残留、污染和维护风险。",
data\applications\life-science\life-science-application.zh.ts:97: rotaryValve: {
data\applications\life-science\life-science-application.zh.ts:98: name: "旋转阀",
data\applications\life-science\life-science-application.zh.ts:107: pinchValve: {
data\applications\life-science\life-science-application.zh.ts:108: name: "夹管阀",
data\applications\life-science\life-science-application.zh.ts:114: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度。",
data\applications\life-science\life-science-application.zh.ts:129: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\life-science\life-science-application.zh.ts:148: name: "止回阀 / 过滤器",
data\applications\life-science\life-science-application.zh.ts:154: "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常液路污染对系统稳定性的影响。",
data\applications\life-science\life-science-application.zh.ts:194: products: ["pistonPump", "diaphragmPump", "solenoidValve", "sensors"],
data\applications\life-science\life-science-application.zh.ts:205: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\life-science\life-science-application.zh.ts:214: "用于泵、阀、试剂瓶、反应腔、传感器和废液通道之间的连接，重点关注密封可靠、低死体积、低吸附和易维护。",
data\applications\life-science\life-science-application.zh.ts:245: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\life-science\life-science-application.zh.ts:256: products: ["pinchValve", "diaphragmPump", "fittingsTubing", "sensors"],
data\applications\life-science\life-science-application.zh.ts:307: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\life-science\life-science-application.zh.ts:313: navSubtitle: "泵 / 阀 / 针 / 传感器",
data\applications\life-science\life-science-application.zh.ts:316: "用于泵、阀、针、传感器和多工位模块之间的连接，重点关注快速维护、管径适配、密封可靠和材料兼容。",
data\applications\life-science\life-science-application.zh.ts:318: products: ["fittingsTubing", "rotaryValve", "checkFilter"],
data\applications\life-science\life-science-application.zh.ts:358: products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
data\applications\life-science\life-science-application.zh.ts:398: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\life-science\life-science-application.zh.ts:420: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:40: "可提交合成生物类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与合成生物液路方案。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:79: solenoidValve: {
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:80: name: "电磁阀",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:86: "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留和污染风险。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:89: rotaryValve: {
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:90: name: "旋转阀",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:94: "适合多种培养基、诱导剂、缓冲液、清洗液、取样路径和废液路径集中管理，可减少复杂阀组数量。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:99: pinchValve: {
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:100: name: "夹管阀",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:104: "适合细胞悬液、培养基、清洗液、废液和污染控制要求较高的软管路径，液体只接触软管，不直接接触阀体。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:106: "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，适合封闭式转移和易维护软管液路。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:121: ability: "泵、阀、针、传感器之间的连接密封与材料适配",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:140: name: "止回阀 / 过滤器",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:146: "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常污染对合成生物设备稳定性的影响。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:175: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:197: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:208: products: ["diaphragmPump", "solenoidValve", "sensors"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:259: products: ["pistonPump", "syringePump", "solenoidValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:279: "用于多试剂、多清洗液、多废液路径集中管理，重点减少阀组复杂度、误通风险和维护难度。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:281: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:310: products: ["pistonPump", "solenoidValve", "sensors"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:320: tags: ["介质切换", "防误通", "残留控制", "阀位稳定"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:321: products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:378: navSubtitle: "过滤 / 防堵 / 泵阀保护",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:381: "用于在线取样路径中的过滤、防堵和泵阀前端保护，降低颗粒、细胞团和杂质进入关键元件的风险。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:382: tags: ["过滤", "防堵", "泵阀保护", "维护便利"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:394: products: ["pistonPump", "diaphragmPump", "solenoidValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:403: "用于污染风险较高或维护频繁的软管路径，重点减少液体对阀体污染和腐蚀，适合封闭式转移。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:405: products: ["pinchValve", "fittingsTubing"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:414: summary: "多泵、多阀、多路径液路集成与长期运行维护。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:415: focusTitle: "小型生物工艺中的多泵、多阀与多路径液路集成",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:420: "泵、阀、传感器、接头与管材模块化集成",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:432: "用于多补料、多取样、多清洗和多废液路径集中管理，重点降低误通风险、减少阀组复杂度并提升维护效率。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:434: products: ["rotaryValve", "solenoidValve", "pinchValve"],
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:451: navSubtitle: "泵阀管路 / 密封 / 维护",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:454: "用于泵、阀、培养容器、试剂瓶、废液瓶、传感器和检测模块之间的管路连接，重点关注密封可靠、材料兼容和快速维护。",
data\contact-cooperation\contact.intl.ts:237: "Discuss the combination of pumps, valves, tubing, sensors, and other fluidic components.",
data\contact-cooperation\contact.intl.ts:361: groupName: "Valve Products",
data\contact-cooperation\contact.intl.ts:363: "Solenoid Valve",
data\contact-cooperation\contact.intl.ts:364: "Pinch Valve",
data\contact-cooperation\contact.intl.ts:365: "Rotary Valve",
data\contact-cooperation\contact.intl.ts:366: "High-pressure Valve",
data\contact-cooperation\contact.intl.ts:409: "For example: diaphragm pump, syringe pump, pipetting pump, piston pump, solenoid valve, rotary valve, sensor, etc.",
data\contact-cooperation\contact.intl.ts:636: "Válvula solenoide",
data\contact-cooperation\contact.intl.ts:682: "Por ejemplo: bomba de diafragma, bomba de jeringa, bomba de pipeteo, bomba de pistón, válvula solenoide, válvula rotativa, sensor, etc.",
data\contact-cooperation\contact.zh.ts:101: "协助梳理泵、阀、管路、传感器等部件组合关系。", // 支持项说明
data\contact-cooperation\contact.zh.ts:254: groupName: "阀类产品", // 产品分组名称
data\contact-cooperation\contact.zh.ts:255: options: ["电磁阀", "夹管阀", "旋转阀", "高压阀"], // 阀类产品选项
data\contact-cooperation\contact.zh.ts:302: "例如隔膜泵、注射泵、移液泵、柱塞泵、电磁阀、旋转阀、传感器等。", // 填写说明描述
data\contact-cooperation\distributor.intl.ts:154: valve: "/images/contact-cooperation/distributor-products/02-valve-series.webp",
data\contact-cooperation\distributor.intl.ts:185: desc: "Covers pumps, valves, intelligent control modules, fittings, tubing, needles, and key fluidic system components.",
data\contact-cooperation\distributor.intl.ts:206: desc: "For IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation, FOREACH provides pumps, valves, intelligent control modules, fittings, tubing, and needle products.",
data\contact-cooperation\distributor.intl.ts:212: desc: "For precision metering, continuous transfer, reagent dispensing, sample handling, and high-pressure fluidic applications.",
data\contact-cooperation\distributor.intl.ts:213: tags: ["Piston Pump", "Valveless Pump", "Diaphragm Pump", "Pipetting Pump", "Syringe Pump", "High-pressure Pump"],
data\contact-cooperation\distributor.intl.ts:217: title: "Valve Series",
data\contact-cooperation\distributor.intl.ts:218: desc: "For fluid on/off control, flow-path switching, multi-channel distribution, and high-pressure fluid control.",
data\contact-cooperation\distributor.intl.ts:219: tags: ["Solenoid Valve", "Rotary Valve", "High-pressure Valve"],
data\contact-cooperation\distributor.intl.ts:220: image: distributorProductImages.valve,
data\contact-cooperation\distributor.intl.ts:262: desc: "With sales channels related to pumps, valves, tubing, fittings, sensors, and fluid control products.",
data\contact-cooperation\distributor.intl.ts:321: desc: "Pumps, valves, intelligent control modules, fittings, tubing, needles, or system-level fluidic solutions.",
data\contact-cooperation\distributor.intl.ts:362: productInterestPlaceholder: "e.g. Piston pump, solenoid valve, quick connector, custom tubing assembly",
data\products\detail\plunger-pump-detail.generated.ts:105: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:116: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:117: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:121: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:125: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:230: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:241: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:242: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:246: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:250: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:355: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:366: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:367: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:371: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:375: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:480: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:491: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:492: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:496: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:500: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:605: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:616: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:617: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:621: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:625: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:730: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:741: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:742: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:746: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:750: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:855: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:866: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:867: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:871: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:875: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:980: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:991: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:992: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:996: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1000: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1105: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1116: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1117: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1121: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1125: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1230: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1241: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1242: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1246: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1250: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1355: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1366: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1367: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1371: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1375: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1480: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1491: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1492: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1496: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1500: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1605: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1616: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1617: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1621: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1625: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1730: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1741: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\detail\plunger-pump-detail.generated.ts:1742: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\detail\plunger-pump-detail.generated.ts:1746: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1750: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\detail\plunger-pump-detail.generated.ts:1851: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1866: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:1867: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:1972: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:1987: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:1988: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2093: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2108: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:2109: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2214: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2229: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:2230: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2335: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2350: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:2351: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2456: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2471: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:2472: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2577: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2592: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\detail\plunger-pump-detail.generated.ts:2593: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\detail\plunger-pump-detail.generated.ts:2698: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2717: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\detail\plunger-pump-detail.generated.ts:2718: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
data\products\detail\plunger-pump-detail.generated.ts:2819: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2838: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\detail\plunger-pump-detail.generated.ts:2839: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
data\products\detail\plunger-pump-detail.generated.ts:2940: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:2959: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\detail\plunger-pump-detail.generated.ts:2960: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
data\products\detail\plunger-pump-detail.generated.ts:3061: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\detail\plunger-pump-detail.generated.ts:3080: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\detail\plunger-pump-detail.generated.ts:3081: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
data\products\detail\product-detail.types.ts:7: 2. 阀
data\products\detail\product-detail.types.ts:19: | "valves"
data\products\generated\pumps\pump-series-content-detail-audit.md:33: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:50: - description：EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:51: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:83: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-100-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:87: A：EA-100-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:124: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:139: - description：EA-250-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:140: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:172: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-250-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:176: A：EA-250-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:259: A：SM-100-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 100 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:261: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-100-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:266: - Q：SM-100-PMMA 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:267: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:302: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:317: - description：EA-100-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:318: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:350: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-100-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:354: A：EA-100-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:391: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:406: - description：EA-250-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:407: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:439: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-250-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:443: A：EA-250-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:480: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:495: - description：EA-500-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:496: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:526: A：EA-500-PEEK 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 500 µL 级别的中小体积液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:528: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-500-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:532: A：EA-500-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:569: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:584: - description：EA-500-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:585: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:615: A：EA-500-PMMA 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 500 µL 级别的中小体积液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:617: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-500-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:621: A：EA-500-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:658: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:673: - description：EA-1000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:674: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:704: A：EA-1000-PEEK 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 1000 µL 级别的中小体积液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:706: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-1000-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:710: A：EA-1000-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:747: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:762: - description：EA-1000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:763: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:793: A：EA-1000-PMMA 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 1000 µL 级别的中小体积液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:795: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-1000-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:799: A：EA-1000-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:836: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:851: - description：EA-2500-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:852: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:884: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-2500-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:888: A：EA-2500-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:925: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:940: - description：EA-2500-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:941: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:973: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-2500-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:977: A：EA-2500-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1014: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1029: - description：EA-5000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1030: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:1062: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-5000-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1066: A：EA-5000-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1103: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1118: - description：EA-5000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1119: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:1151: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-5000-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1155: A：EA-5000-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1192: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1207: - description：EA-10000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1208: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:1238: A：EA-10000-PEEK 属于 EA 常规柱塞泵，适合用于大体积缓冲液、清洗液、稀释液和系统液的定量转移。该型号适合 10000 µL 级别的液体处理任务，更关注稳定输送、寿命和系统集成。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合整机液路、安装空间、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1240: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-10000-PEEK 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1244: A：EA-10000-PEEK 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1281: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1296: - description：EA-10000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1297: - advantages：适用于液体精密分配；支持泵头材料、接口和阀路搭配定制；可配合控制器、光耦和电磁阀集成；适用于自动化分析仪器液路系统
data\products\generated\pumps\pump-series-content-detail-audit.md:1327: A：EA-10000-PMMA 属于 EA 常规柱塞泵，适合用于大体积缓冲液、清洗液、稀释液和系统液的定量转移。该型号适合 10000 µL 级别的液体处理任务，更关注稳定输送、寿命和系统集成。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合整机液路、安装空间、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1329: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口方式、阀体搭配、控制器、传感器配置、速度节拍和寿命要求。EA-10000-PMMA 页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1333: A：EA-10000-PMMA 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1416: A：SM-50-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 50 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1418: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-50-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1423: - Q：SM-50-PMMA 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1424: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1505: A：SM-100-PEEK 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 100 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1507: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-100-PEEK 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1512: - Q：SM-100-PEEK 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1513: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1594: A：SM-250-PEEK 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 250 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1596: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-250-PEEK 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1601: - Q：SM-250-PEEK 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1602: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1683: A：SM-250-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 250 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1685: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-250-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1690: - Q：SM-250-PMMA 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1691: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1772: A：SM-500-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 500 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1774: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-500-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1779: - Q：SM-500-PMMA 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1780: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1861: A：SM-1000-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 1000 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1863: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-1000-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1868: - Q：SM-1000-PMMA 是否可以集成电磁阀、控制器或光耦？
data\products\generated\pumps\pump-series-content-detail-audit.md:1869: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series.detail.generated.ts:31: "metaDescription": "EA-100-PMMA 是100 μL PMMA 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:41: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:57: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:383: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:394: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:395: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:399: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:403: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:422: "metaDescription": "EA-100-PMMA is a custom-engineered 100 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:432: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:441: "description": "EA-100-PMMA is a custom-engineered 100 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:771: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:788: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:789: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:795: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:801: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:824: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:825: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:860: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:861: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:906: "metaDescription": "EA-100-PEEK 是100 μL PEEK 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:916: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:932: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:1258: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1269: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:1270: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1274: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1278: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1297: "metaDescription": "EA-100-PEEK is a custom-engineered 100 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:1307: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:1316: "description": "EA-100-PEEK is a custom-engineered 100 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:1646: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1663: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:1664: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1670: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1676: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1699: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:1700: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1735: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:1736: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:1781: "metaDescription": "EA-250-PMMA 是250 μL PMMA 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1791: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1807: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:2133: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2144: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:2145: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2149: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2153: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2172: "metaDescription": "EA-250-PMMA is a custom-engineered 250 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:2182: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:2191: "description": "EA-250-PMMA is a custom-engineered 250 µL PMMA pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:2521: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2538: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:2539: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2545: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2551: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2574: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:2575: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2610: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:2611: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:2656: "metaDescription": "EA-250-PEEK 是250 μL PEEK 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2666: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2682: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:3008: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3019: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:3020: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3024: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3028: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3047: "metaDescription": "EA-250-PEEK is a custom-engineered 250 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:3057: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:3066: "description": "EA-250-PEEK is a custom-engineered 250 µL PEEK pump head standard plunger pump for micro-reagent dispensing, small-volume sample handling, reagent replenishment, and automated testing fluidics. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:3396: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3413: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:3414: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3420: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3426: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3449: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:3450: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3485: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:3486: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:3531: "metaDescription": "EA-500-PMMA 是500 μL PMMA 泵头常规柱塞泵，适用于常规试剂输送、样本稀释、反应液处理和实验室自动化液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3541: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3557: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:3883: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3894: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:3895: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3899: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3903: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3922: "metaDescription": "EA-500-PMMA is a custom-engineered 500 µL PMMA pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:3932: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:3941: "description": "EA-500-PMMA is a custom-engineered 500 µL PMMA pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:4271: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4288: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:4289: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4295: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4301: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4324: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:4325: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4360: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:4361: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:4406: "metaDescription": "EA-500-PEEK 是500 μL PEEK 泵头常规柱塞泵，适用于常规试剂输送、样本稀释、反应液处理和实验室自动化液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4416: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:4432: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:4758: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:4769: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:4770: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:4774: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:4778: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:4797: "metaDescription": "EA-500-PEEK is a custom-engineered 500 µL PEEK pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:4807: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:4816: "description": "EA-500-PEEK is a custom-engineered 500 µL PEEK pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:5146: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5163: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:5164: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5170: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5176: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5199: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:5200: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5235: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:5236: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:5281: "metaDescription": "EA-1000-PMMA 是1000 μL PMMA 泵头常规柱塞泵，适用于常规试剂输送、样本稀释、反应液处理和实验室自动化液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5291: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:5307: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:5633: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:5644: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:5645: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:5649: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:5653: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:5672: "metaDescription": "EA-1000-PMMA is a custom-engineered 1000 µL PMMA pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:5682: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:5691: "description": "EA-1000-PMMA is a custom-engineered 1000 µL PMMA pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:6021: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6038: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:6039: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6045: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6051: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6074: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:6075: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6110: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:6111: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:6156: "metaDescription": "EA-1000-PEEK 是1000 μL PEEK 泵头常规柱塞泵，适用于常规试剂输送、样本稀释、反应液处理和实验室自动化液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6166: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6182: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:6508: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:6519: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:6520: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:6524: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:6528: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:6547: "metaDescription": "EA-1000-PEEK is a custom-engineered 1000 µL PEEK pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:6557: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:6566: "description": "EA-1000-PEEK is a custom-engineered 1000 µL PEEK pump head standard plunger pump for routine reagent transfer, sample dilution, reaction liquid handling, and laboratory automation fluidic modules. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:6896: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6913: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:6914: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6920: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6926: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6949: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:6950: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:6985: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:6986: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:7031: "metaDescription": "EA-2500-PMMA 是2500 μL PMMA 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7041: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7057: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:7383: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:7394: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:7395: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:7399: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:7403: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:7422: "metaDescription": "EA-2500-PMMA is a custom-engineered 2500 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:7432: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:7441: "description": "EA-2500-PMMA is a custom-engineered 2500 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:7771: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7788: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:7789: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7795: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7801: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7824: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:7825: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7860: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:7861: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:7906: "metaDescription": "EA-2500-PEEK 是2500 μL PEEK 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7916: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:7932: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:8258: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:8269: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:8270: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:8274: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:8278: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:8297: "metaDescription": "EA-2500-PEEK is a custom-engineered 2500 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:8307: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:8316: "description": "EA-2500-PEEK is a custom-engineered 2500 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:8646: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8663: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:8664: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8670: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8676: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8699: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:8700: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8735: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:8736: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:8781: "metaDescription": "EA-5000-PMMA 是5000 μL PMMA 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8791: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:8807: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:9133: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:9144: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:9145: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:9149: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:9153: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:9172: "metaDescription": "EA-5000-PMMA is a custom-engineered 5000 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:9182: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:9191: "description": "EA-5000-PMMA is a custom-engineered 5000 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:9521: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9538: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:9539: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9545: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9551: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9574: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:9575: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9610: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:9611: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:9656: "metaDescription": "EA-5000-PEEK 是5000 μL PEEK 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9666: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:9682: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:10008: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10019: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:10020: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10024: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10028: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10047: "metaDescription": "EA-5000-PEEK is a custom-engineered 5000 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:10057: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:10066: "description": "EA-5000-PEEK is a custom-engineered 5000 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:10396: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10413: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:10414: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10420: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10426: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10449: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:10450: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10485: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:10486: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:10531: "metaDescription": "EA-10000-PMMA 是10000 μL PMMA 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10541: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:10557: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:10883: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10894: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:10895: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10899: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10903: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:10922: "metaDescription": "EA-10000-PMMA is a custom-engineered 10000 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:10932: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:10941: "description": "EA-10000-PMMA is a custom-engineered 10000 µL PMMA pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:11271: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11288: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:11289: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11295: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11301: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11324: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:11325: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11360: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:11361: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:11406: "metaDescription": "EA-10000-PEEK 是10000 μL PEEK 泵头常规柱塞泵，适用于清洗液定量加入、缓冲液转移、管路预充、中大体积补液和分析仪器液路供液。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11416: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:11432: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:11758: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:11769: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:11770: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:11774: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:11778: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:11797: "metaDescription": "EA-10000-PEEK is a custom-engineered 10000 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:11807: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:11816: "description": "EA-10000-PEEK is a custom-engineered 10000 µL PEEK pump head standard plunger pump for wash solution dosing, buffer transfer, line priming, medium-to-large volume replenishment, and analyzer fluidic supply. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:12146: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12163: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:12164: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12170: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12176: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12199: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:12200: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12235: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:12236: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:12281: "metaDescription": "SM-50-PMMA 是50 μL PMMA 泵头微型柱塞泵，适用于空间受限的小型液路模块、POCT 设备、紧凑型自动化检测单元和微量试剂处理。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12291: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:12307: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:12625: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:12640: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:12641: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:12664: "metaDescription": "SM-50-PMMA is a custom-engineered 50 µL PMMA pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:12674: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:12683: "description": "SM-50-PMMA is a custom-engineered 50 µL PMMA pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:13005: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13022: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:13023: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13029: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13035: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13058: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:13059: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13094: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:13095: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:13140: "metaDescription": "SM-100-PMMA 是100 μL PMMA 泵头微型柱塞泵，适用于空间受限的小型液路模块、POCT 设备、紧凑型自动化检测单元和微量试剂处理。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13150: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13166: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:13484: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:13499: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:13500: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:13523: "metaDescription": "SM-100-PMMA is a custom-engineered 100 µL PMMA pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:13533: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:13542: "description": "SM-100-PMMA is a custom-engineered 100 µL PMMA pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:13864: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13881: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:13882: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13888: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13894: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13917: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:13918: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:13953: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:13954: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:13999: "metaDescription": "SM-100-PEEK 是100 μL PEEK 泵头微型柱塞泵，适用于空间受限的小型液路模块、POCT 设备、紧凑型自动化检测单元和微量试剂处理。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14009: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14025: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:14343: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:14358: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:14359: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:14382: "metaDescription": "SM-100-PEEK is a custom-engineered 100 µL PEEK pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:14392: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:14401: "description": "SM-100-PEEK is a custom-engineered 100 µL PEEK pump head miniature plunger pump for space-limited fluidic modules, POCT devices, compact automated testing units, and micro-reagent handling. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:14723: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14740: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:14741: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14747: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14753: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14776: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:14777: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14812: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:14813: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:14858: "metaDescription": "SM-250-PMMA 是250 μL PMMA 泵头微型柱塞泵，适用于紧凑型自动化设备中的微量吸排、分配、转移和小型液路集成。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14868: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:14884: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:15202: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:15217: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:15218: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:15241: "metaDescription": "SM-250-PMMA is a custom-engineered 250 µL PMMA pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:15251: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:15260: "description": "SM-250-PMMA is a custom-engineered 250 µL PMMA pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:15582: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15599: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:15600: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15606: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15612: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15635: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:15636: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15671: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:15672: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:15717: "metaDescription": "SM-250-PEEK 是250 μL PEEK 泵头微型柱塞泵，适用于紧凑型自动化设备中的微量吸排、分配、转移和小型液路集成。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15727: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:15743: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:16061: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:16076: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:16077: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:16100: "metaDescription": "SM-250-PEEK is a custom-engineered 250 µL PEEK pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:16110: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:16119: "description": "SM-250-PEEK is a custom-engineered 250 µL PEEK pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:16441: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16458: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
data\products\generated\pumps\pump-series.detail.generated.ts:16459: "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16465: "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16471: "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16494: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:16495: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16530: "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:16531: "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。",
data\products\generated\pumps\pump-series.detail.generated.ts:16576: "metaDescription": "SM-500-PMMA 是500 μL PMMA 泵头微型柱塞泵，适用于紧凑型自动化设备中的微量吸排、分配、转移和小型液路集成。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16586: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:16602: "阀体",
data\products\generated\pumps\pump-series.detail.generated.ts:16920: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:16935: "question": "SM 系列可以做泵阀一体或控制集成吗？",
data\products\generated\pumps\pump-series.detail.generated.ts:16936: "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:16959: "metaDescription": "SM-500-PMMA is a custom-engineered 500 µL PMMA pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:16969: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:16978: "description": "SM-500-PMMA is a custom-engineered 500 µL PMMA pump head miniature plunger pump for micro-volume aspiration, dispensing, transfer, and compact fluidic integration in automated instruments. The page model is for preliminary selection and quotation; final material, interface, valve, and control configuration should be confirmed with FOREACH.",
data\products\generated\pumps\pump-series.detail.generated.ts:17300: "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:17317: "question": "EA 系列是否可以进行泵阀一体或控制集成？",
```


## 12. 搜索产品中心分类关键词

```txt
app\globals.css:299: .site-nav-mega-category {
app\globals.css:310: .site-nav-mega-category strong {
app\globals.css:318: .site-nav-mega-category-desc {
app\globals.css:326: .site-nav-mega-category-arrow {
app\globals.css:340: .site-nav-mega-category:hover {
app\globals.css:345: .site-nav-mega-category-active {
app\globals.css:350: .site-nav-mega-category:hover strong,
app\globals.css:351: .site-nav-mega-category-active strong {
app\globals.css:356: .site-nav-mega-category:hover .site-nav-mega-category-desc,
app\globals.css:357: .site-nav-mega-category-active .site-nav-mega-category-desc {
app\globals.css:361: .site-nav-mega-category:hover .site-nav-mega-category-arrow,
app\globals.css:362: .site-nav-mega-category-active .site-nav-mega-category-arrow {
app\globals.css:403: grid-template-columns: repeat(3, minmax(0, 1fr)); /* 产品中心预留三列 */
app\globals.css:1269: .site-nav-mega-category {
app\globals.css:1275: .site-nav-mega-category strong {
app\globals.css:1279: .site-nav-mega-category-desc {
app\globals.css:1283: .site-nav-mega-category-arrow {
app\globals.css:1385: .site-nav-mega-category {
app\globals.css:1391: .site-nav-mega-category strong {
app\globals.css:1395: .site-nav-mega-category-desc {
app\globals.css:4920: .home-news-category {
app\globals.css:6901: .site-nav-mega-category {
app\globals.css:6906: .site-nav-mega-category strong {
app\globals.css:6910: .site-nav-mega-category-desc {
app\globals.css:7879: .site-nav-mega-category {
app\globals.css:7885: .site-nav-mega-category strong {
app\globals.css:7889: .site-nav-mega-category-desc {
app\globals.css:7894: .site-nav-mega-category-arrow {
app\globals.css:8167: .site-nav-mega-category {
app\globals.css:8173: .site-nav-mega-category strong {
app\globals.css:8177: .site-nav-mega-category-desc {
app\globals.css:9024: 1. 左侧分类栏完全沿用产品中心 Mega Menu 的通用样式
app\globals.css:9072: /* 关于我们不使用产品中心那种多列产品网格 */
app\globals.css:9130: /* 底部按钮沿用产品中心按钮风格 */
app\globals.css:9171: 2. 避免和首页、SiteHeader、产品中心样式冲突
app\globals.css:10149: 2. 产品中心、应用领域、资源中心、关于我们使用 .mobile-nav-summary
app\globals.css:10175: /* 可折叠一级栏目：例如 产品中心、应用领域、资源中心、关于我们 */
app\globals.css:14620: 2. 背景色与产品中心下拉左侧浅蓝灰底一致
app\globals.css:15330: 2. 不影响产品中心 Mega Menu
app\globals.css:15381: 4. 不影响产品中心 Mega Menu
app\globals.css:15565: * 只作用于产品中心和产品详情页中，
app\layout.tsx:25: import { SelectionCartProvider } from "@/components/selection-cart/SelectionCartProvider";
app\layout.tsx:26: import GlobalSelectionCartDrawer from "@/components/selection-cart/GlobalSelectionCartDrawer";
app\layout.tsx:59: <SelectionCartProvider>
app\layout.tsx:241: 3. 后续页面内部不再单独渲染 FittingSelectionCart
app\layout.tsx:243: <GlobalSelectionCartDrawer />
app\layout.tsx:244: </SelectionCartProvider>
app\contact\contact.css:13: 2. 不影响首页、关于我们、产品中心等其他页面
app\products\loading.tsx:4: return <ProductPageSkeleton variant="selection" />;
app\products\page.tsx:3: 恒永达官网｜中文产品中心入口页
app\products\page.tsx:9: 1. 对应中文默认产品中心路径：/products
app\products\page.tsx:11: 3. 页面结构交给 ProductSelectionClient 渲染
app\products\page.tsx:12: 4. 当前阶段产品中心数据来自本地静态数据与 generated 数据
app\products\page.tsx:19: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
app\products\page.tsx:24: <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
app\products\page.tsx:25: <ProductSelectionClient locale="zh" />
app\products\products.css:7: 2. 浣跨敤 .products-selection-page 鍋氫綔鐢ㄥ煙锛岄伩鍏嶆薄鏌撳叾浠栭〉闈?
app\products\products.css:11: .products-selection-page {
app\products\products.css:30: .products-selection-page * {
app\products\products.css:34: .products-selection-page a {
app\products\products.css:39: .products-selection-page button {
app\products\products.css:43: .products-selection-page .container {
app\products\products.css:48: .products-selection-page .top-row {
app\products\products.css:57: .products-selection-page .breadcrumb {
app\products\products.css:66: .products-selection-page .breadcrumb strong {
app\products\products.css:71: .products-selection-page .list-status {
app\products\products.css:86: .products-selection-page .category-tabs-wrap {
app\products\products.css:92: .products-selection-page .category-tabs {
app\products\products.css:100: .products-selection-page .category-tab {
app\products\products.css:117: .products-selection-page .category-tab:hover,
app\products\products.css:118: .products-selection-page .category-tab.active {
app\products\products.css:124: .products-selection-page .selection-section {
app\products\products.css:128: .products-selection-page .selection-layout {
app\products\products.css:135: .products-selection-page .filter-panel {
app\products\products.css:142: .products-selection-page .filter-head {
app\products\products.css:148: .products-selection-page .filter-head h3 {
app\products\products.css:155: .products-selection-page .filter-head p {
app\products\products.css:162: .products-selection-page .filter-group {
app\products\products.css:166: .products-selection-page .filter-group-title {
app\products\products.css:173: .products-selection-page .filter-options {
app\products\products.css:179: .products-selection-page .filter-options.two {
app\products\products.css:183: .products-selection-page .filter-btn {
app\products\products.css:201: .products-selection-page .filter-btn:hover {
app\products\products.css:205: .products-selection-page .filter-control {
app\products\products.css:218: .products-selection-page .filter-btn.is-single .filter-control {
app\products\products.css:222: .products-selection-page .filter-btn.is-multi .filter-control {
app\products\products.css:226: .products-selection-page .filter-btn:hover .filter-control {
app\products\products.css:230: .products-selection-page .filter-btn.active {
app\products\products.css:235: .products-selection-page .filter-btn.active .filter-control {
app\products\products.css:241: .products-selection-page .filter-btn.is-single.active .filter-control::after {
app\products\products.css:253: .products-selection-page .filter-btn.is-multi.active .filter-control::after {
app\products\products.css:265: .products-selection-page .filter-actions {
app\products\products.css:273: .products-selection-page .filter-action-btn {
app\products\products.css:288: .products-selection-page .filter-action-btn:hover {
app\products\products.css:294: .products-selection-page .product-area {
app\products\products.css:298: .products-selection-page .product-toolbar {
app\products\products.css:309: .products-selection-page .toolbar-left {
app\products\products.css:317: .products-selection-page .product-area-title {
app\products\products.css:325: .products-selection-page .product-count {
app\products\products.css:332: .products-selection-page .selected-tags {
app\products\products.css:339: .products-selection-page .selected-tag {
app\products\products.css:354: .products-selection-page .selected-tag button {
app\products\products.css:369: .products-selection-page .selected-tag button:hover {
app\products\products.css:374: .products-selection-page .toolbar-reset {
app\products\products.css:391: .products-selection-page .toolbar-reset:hover {
app\products\products.css:397: .products-selection-page .product-grid {
app\products\products.css:403: .products-selection-page .product-card {
app\products\products.css:417: .products-selection-page .product-card:hover {
app\products\products.css:422: .products-selection-page .selected-bar {
app\products\products.css:436: .products-selection-page .product-card:hover .selected-bar {
app\products\products.css:438: animation: productsSelectionHoverBarGrow 0.36s ease forwards;
app\products\products.css:441: @keyframes productsSelectionHoverBarGrow {
app\products\products.css:451: .products-selection-page .product-image {
app\products\products.css:460: .products-selection-page .product-visual {
app\products\products.css:468: .products-selection-page .product-card:hover .product-visual {
app\products\products.css:472: .products-selection-page .pump-body {
app\products\products.css:484: .products-selection-page .pump-head {
app\products\products.css:497: .products-selection-page .pump-port {
app\products\products.css:509: .products-selection-page .product-visual.pmma .pump-head {
app\products\products.css:513: .products-selection-page .product-visual.peek .pump-head {
app\products\products.css:517: .products-selection-page .product-body {
app\products\products.css:526: .products-selection-page .product-title {
app\products\products.css:537: .products-selection-page .product-card:hover .product-title {
app\products\products.css:541: .products-selection-page .product-param-line {
app\products\products.css:553: .products-selection-page .product-actions {
app\products\products.css:561: .products-selection-page .product-link,
app\products\products.css:562: .products-selection-page .list-toggle {
app\products\products.css:580: .products-selection-page .product-link:hover,
app\products\products.css:581: .products-selection-page .list-toggle:hover,
app\products\products.css:582: .products-selection-page .list-toggle.active {
app\products\products.css:588: .products-selection-page .empty-state {
app\products\products.css:599: .products-selection-page .empty-state.active {
app\products\products.css:603: .products-selection-page .empty-state h3 {
app\products\products.css:609: .products-selection-page .empty-state p {
app\products\products.css:614: .products-selection-page .product-grid {
app\products\products.css:619: .products-selection-page .product-card {
app\products\products.css:625: .products-selection-page .product-image {
app\products\products.css:629: .products-selection-page .product-body {
app\products\products.css:637: .products-selection-page .container {
app\products\products.css:641: .products-selection-page .product-grid {
app\products\products.css:646: .products-selection-page .product-card {
app\products\products.css:650: .products-selection-page .product-image {
app\products\products.css:654: .products-selection-page .product-body {
app\products\products.css:661: .products-selection-page .selection-layout {
app\products\products.css:665: .products-selection-page .filter-panel {
app\products\products.css:670: .products-selection-page .product-grid {
app\products\products.css:676: .products-selection-page {
app\products\products.css:680: .products-selection-page .container {
app\products\products.css:684: .products-selection-page .top-row,
app\products\products.css:685: .products-selection-page .product-toolbar {
app\products\products.css:690: .products-selection-page .toolbar-left {
app\products\products.css:695: .products-selection-page .filter-options.two,
app\products\products.css:696: .products-selection-page .product-grid {
app\products\products.css:700: .products-selection-page .product-card {
app\products\products.css:704: .products-selection-page .product-image {
app\products\products.css:708: .products-selection-page .product-title {
app\products\products.css:712: .products-selection-page .product-actions {
app\products\products.css:728: .products-selection-page {
app\products\products.css:733: .products-selection-page .container {
app\products\products.css:739: .products-selection-page .products-breadcrumb-row {
app\products\products.css:750: .products-selection-page .products-breadcrumb {
app\products\products.css:760: .products-selection-page .products-breadcrumb strong {
app\products\products.css:765: .products-selection-page .products-list-status {
app\products\products.css:781: .products-selection-page .category-tabs-wrap {
app\products\products.css:787: .products-selection-page .selection-section {
app\products\products.css:791: .products-selection-page .selection-layout {
app\products\products.css:797: .products-selection-page .filter-head {
app\products\products.css:801: .products-selection-page .filter-head h3 {
app\products\products.css:805: .products-selection-page .filter-group-title {
app\products\products.css:809: .products-selection-page .filter-options {
app\products\products.css:814: .products-selection-page .filter-btn {
app\products\products.css:821: .products-selection-page .product-toolbar {
app\products\products.css:826: .products-selection-page .product-area-title {
app\products\products.css:831: .products-selection-page .product-grid {
app\products\products.css:838: .products-selection-page .product-card {
app\products\products.css:844: .products-selection-page .product-image {
app\products\products.css:848: .products-selection-page .product-body {
app\products\products.css:853: .products-selection-page .product-title {
app\products\products.css:858: .products-selection-page .product-param-line {
app\products\products.css:863: .products-selection-page .product-actions {
app\products\products.css:868: .products-selection-page .product-link,
app\products\products.css:869: .products-selection-page .list-toggle {
app\products\products.css:876: .products-selection-page .container {
app\products\products.css:880: .products-selection-page .product-grid {
app\products\products.css:885: .products-selection-page .product-card {
app\products\products.css:891: .products-selection-page .product-image {
app\products\products.css:895: .products-selection-page .product-body {
app\products\products.css:903: .products-selection-page .container {
app\products\products.css:907: .products-selection-page .selection-layout {
app\products\products.css:912: .products-selection-page .product-grid {
app\products\products.css:918: .products-selection-page .container {
app\products\products.css:922: .products-selection-page .selection-layout {
app\products\products.css:926: .products-selection-page .filter-panel {
app\products\products.css:931: .products-selection-page .product-grid {
app\products\products.css:937: .products-selection-page {
app\products\products.css:941: .products-selection-page .container {
app\products\products.css:945: .products-selection-page .products-breadcrumb-row {
app\products\products.css:951: .products-selection-page .product-grid {
app\products\products.css:955: .products-selection-page .product-image {
app\products\products.css:959: .products-selection-page .product-actions {
app\products\products.css:968: /* FOREACH_PRODUCTS_CATEGORY_SPACING_TUNE_START */
app\products\products.css:979: .products-selection-page .category-tabs-wrap {
app\products\products.css:985: .products-selection-page .selection-section {
app\products\products.css:990: .products-selection-page .category-tabs-wrap {
app\products\products.css:994: .products-selection-page .selection-section {
app\products\products.css:999: /* FOREACH_PRODUCTS_CATEGORY_SPACING_TUNE_END */
app\products\products.css:1013: .products-selection-page .products-breadcrumb-row {
app\products\products.css:1022: .products-selection-page .products-breadcrumb-row::before,
app\products\products.css:1023: .products-selection-page .products-breadcrumb-row::after {
app\products\products.css:1029: .products-selection-page .products-breadcrumb {
app\products\products.css:1034: .products-selection-page .products-breadcrumb-row + section {
app\products\products.css:1039: .products-selection-page .products-breadcrumb-row {
app\products\products.css:1046: /* FOREACH_PRODUCTS_MOBILE_CATEGORY_AND_FILTER_COLLAPSE_START */
app\products\products.css:1060: .products-selection-page .mobile-category-trigger {
app\products\products.css:1064: .products-selection-page .mobile-category-symbol,
app\products\products.css:1065: .products-selection-page .filter-group-symbol {
app\products\products.css:1069: .products-selection-page .filter-group-trigger {
app\products\products.css:1078: .products-selection-page .category-tabs-wrap {
app\products\products.css:1084: .products-selection-page .mobile-category-trigger {
app\products\products.css:1102: .products-selection-page .mobile-category-symbol {
app\products\products.css:1113: .products-selection-page .category-tabs {
app\products\products.css:1120: .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
app\products\products.css:1125: .products-selection-page .category-tab {
app\products\products.css:1131: .products-selection-page .filter-panel {
app\products\products.css:1135: .products-selection-page .filter-group {
app\products\products.css:1139: .products-selection-page .filter-group-trigger {
app\products\products.css:1149: .products-selection-page .filter-group-symbol {
app\products\products.css:1161: .products-selection-page .filter-group .filter-options {
app\products\products.css:1165: .products-selection-page .filter-group.is-mobile-open .filter-options {
app\products\products.css:1170: /* FOREACH_PRODUCTS_MOBILE_CATEGORY_AND_FILTER_COLLAPSE_END */
app\products\products.css:1184: .products-selection-page .product-pagination {
app\products\products.css:1194: .products-selection-page .product-page-button {
app\products\products.css:1213: .products-selection-page .product-page-button:hover:not(:disabled),
app\products\products.css:1214: .products-selection-page .product-page-button:focus-visible:not(:disabled) {
app\products\products.css:1221: .products-selection-page .product-page-button:disabled {
app\products\products.css:1226: .products-selection-page .product-page-status {
app\products\products.css:1239: .products-selection-page .product-pagination {
app\products\products.css:1245: .products-selection-page .product-page-button {
app\products\products.css:1253: .products-selection-page .product-page-status {
app\products\products.css:1261: /* FOREACH_PRODUCTS_SELECTION_STANDARD_STYLE_START */
app\products\products.css:1268: 2. 鍙綔鐢ㄤ簬 .products-selection-page
app\products\products.css:1274: .products-selection-page {
app\products\products.css:1285: .products-selection-page .container {
app\products\products.css:1291: .products-selection-page .category-tabs-wrap {
app\products\products.css:1297: .products-selection-page .category-tabs {
app\products\products.css:1304: .products-selection-page .category-tab {
app\products\products.css:1321: .products-selection-page .category-tab:hover,
app\products\products.css:1322: .products-selection-page .category-tab.active {
app\products\products.css:1328: .products-selection-page .mobile-category-trigger {
app\products\products.css:1333: .products-selection-page .selection-section {
app\products\products.css:1337: .products-selection-page .selection-layout {
app\products\products.css:1345: .products-selection-page .filter-panel {
app\products\products.css:1352: .products-selection-page .filter-panel-head {
app\products\products.css:1358: .products-selection-page .filter-panel-head h2 {
app\products\products.css:1366: .products-selection-page .filter-panel-head p {
app\products\products.css:1373: .products-selection-page .filter-group {
app\products\products.css:1378: .products-selection-page .filter-group-title,
app\products\products.css:1379: .products-selection-page .filter-group-trigger {
app\products\products.css:1398: .products-selection-page .filter-group-symbol {
app\products\products.css:1402: .products-selection-page .filter-options {
app\products\products.css:1408: .products-selection-page .filter-options.one {
app\products\products.css:1412: .products-selection-page .filter-options.two {
app\products\products.css:1416: .products-selection-page .filter-option,
app\products\products.css:1417: .products-selection-page .filter-btn {
app\products\products.css:1440: .products-selection-page .filter-option:hover,
app\products\products.css:1441: .products-selection-page .filter-btn:hover {
app\products\products.css:1446: .products-selection-page .filter-option.active,
app\products\products.css:1447: .products-selection-page .filter-btn.active {
app\products\products.css:1452: .products-selection-page .filter-check,
app\products\products.css:1453: .products-selection-page .filter-control {
app\products\products.css:1466: .products-selection-page .filter-btn.is-single .filter-control,
app\products\products.css:1467: .products-selection-page .filter-option.is-single .filter-check {
app\products\products.css:1471: .products-selection-page .filter-btn.is-multi .filter-control,
app\products\products.css:1472: .products-selection-page .filter-option.is-multi .filter-check {
app\products\products.css:1476: .products-selection-page .filter-btn:hover .filter-control,
app\products\products.css:1477: .products-selection-page .filter-option:hover .filter-check {
app\products\products.css:1481: .products-selection-page .filter-btn.active .filter-control,
app\products\products.css:1482: .products-selection-page .filter-option.active .filter-check {
app\products\products.css:1488: .products-selection-page .filter-btn.is-single.active .filter-control::after,
app\products\products.css:1489: .products-selection-page .filter-option.is-single.active .filter-check::after {
app\products\products.css:1501: .products-selection-page .filter-btn.is-multi.active .filter-control::after,
app\products\products.css:1502: .products-selection-page .filter-option.is-multi.active .filter-check::after {
app\products\products.css:1514: .products-selection-page .filter-panel-actions {
app\products\products.css:1522: .products-selection-page .filter-panel-actions button {
app\products\products.css:1538: .products-selection-page .filter-panel-actions button:hover {
app\products\products.css:1544: .products-selection-page .product-area {
app\products\products.css:1550: .products-selection-page .product-toolbar {
app\products\products.css:1561: .products-selection-page .toolbar-summary {
app\products\products.css:1567: .products-selection-page .selected-tags {
app\products\products.css:1574: .products-selection-page .selected-tag {
app\products\products.css:1589: .products-selection-page .selected-tag button {
app\products\products.css:1604: .products-selection-page .toolbar-reset {
app\products\products.css:1621: .products-selection-page .toolbar-reset:hover {
app\products\products.css:1628: .products-selection-page .product-grid {
app\products\products.css:1634: .products-selection-page .product-card {
app\products\products.css:1648: .products-selection-page .product-card:hover {
app\products\products.css:1653: .products-selection-page .selected-bar {
app\products\products.css:1667: .products-selection-page .product-card:hover .selected-bar {
app\products\products.css:1672: .products-selection-page .product-image {
app\products\products.css:1683: .products-selection-page .product-image img {
app\products\products.css:1693: .products-selection-page .product-card:hover .product-image img {
app\products\products.css:1697: .products-selection-page .product-body {
app\products\products.css:1706: .products-selection-page .product-title {
app\products\products.css:1718: .products-selection-page .product-card:hover .product-title {
app\products\products.css:1722: .products-selection-page .product-param-line {
app\products\products.css:1734: .products-selection-page .product-actions {
app\products\products.css:1742: .products-selection-page .product-link,
app\products\products.css:1743: .products-selection-page .list-toggle {
app\products\products.css:1762: .products-selection-page .product-link:hover,
app\products\products.css:1763: .products-selection-page .list-toggle:hover,
app\products\products.css:1764: .products-selection-page .list-toggle.active {
app\products\products.css:1770: .products-selection-page .product-pagination {
app\products\products.css:1778: .products-selection-page .product-page-button {
app\products\products.css:1791: .products-selection-page .product-page-button:hover:not(:disabled) {
app\products\products.css:1797: .products-selection-page .product-page-button:disabled {
app\products\products.css:1802: .products-selection-page .product-page-status {
app\products\products.css:1811: .products-selection-page .selection-layout {
app\products\products.css:1815: .products-selection-page .filter-panel {
app\products\products.css:1820: .products-selection-page .product-area {
app\products\products.css:1824: .products-selection-page .product-grid {
app\products\products.css:1830: .products-selection-page .container {
app\products\products.css:1834: .products-selection-page .mobile-category-trigger {
app\products\products.css:1849: .products-selection-page .category-tabs {
app\products\products.css:1856: .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
app\products\products.css:1860: .products-selection-page .category-tab {
app\products\products.css:1864: .products-selection-page .filter-group-title,
app\products\products.css:1865: .products-selection-page .filter-group-trigger {
app\products\products.css:1871: .products-selection-page .filter-group-symbol {
app\products\products.css:1875: .products-selection-page .filter-group .filter-options {
app\products\products.css:1880: .products-selection-page .filter-group.is-mobile-open .filter-options {
app\products\products.css:1884: .products-selection-page .filter-options.two {
app\products\products.css:1888: .products-selection-page .product-toolbar {
app\products\products.css:1893: .products-selection-page .product-grid {
app\products\products.css:1898: .products-selection-page .product-card {
app\products\products.css:1902: .products-selection-page .product-image {
app\products\products.css:1910: .products-selection-page .product-body {
app\products\products.css:1915: .products-selection-page .product-title {
app\products\products.css:1919: .products-selection-page .product-param-line {
app\products\products.css:1923: .products-selection-page .product-actions {
app\products\products.css:1928: .products-selection-page .product-link,
app\products\products.css:1929: .products-selection-page .list-toggle {
app\products\products.css:1935: /* FOREACH_PRODUCTS_SELECTION_STANDARD_STYLE_END */
app\products\products.css:1939: .products-selection-page {
app\products\products.css:1944: .products-selection-page {
app\products\products.css:1954: 产品中心筛选区宽度调整：
app\products\products.css:1961: .product-selection-page,
app\products\products.css:1963: .selection-container {
app\products\products.css:1969: .product-selection-layout,
app\products\products.css:1970: .selection-layout,
app\products\products.css:1979: .selection-sidebar {
app\products\products.css:1985: .selection-card-grid,
app\products\products.css:1992: .product-selection-layout,
app\products\products.css:1993: .selection-layout,
app\products\products.css:2000: .selection-sidebar {
app\products\products.css:2007: .product-selection-layout,
app\products\products.css:2008: .selection-layout,
app\products\products.css:2015: .selection-sidebar {
app\products\products.css:2030: 产品中心主内容区加宽：
app\products\products.css:2031: - 解决产品中心整体内容偏窄的问题
app\products\products.css:2039: .product-selection-page,
app\products\products.css:2040: .selection-container,
app\products\products.css:2041: .product-selection-shell,
app\products\products.css:2044: .selection-main {
app\products\products.css:2051: .product-selection-layout,
app\products\products.css:2052: .selection-layout,
app\products\products.css:2060: .product-selection-page,
app\products\products.css:2061: .selection-container,
app\products\products.css:2062: .product-selection-shell,
app\products\products.css:2065: .selection-main {
app\products\products.css:2074: .product-selection-page,
app\products\products.css:2075: .selection-container,
app\products\products.css:2076: .product-selection-shell,
app\products\products.css:2079: .selection-main {
app\products\products.css:2090: 产品中心最终宽度修正：
app\products\products.css:2098: .products-selection-page .container {
app\products\products.css:2105: .products-selection-page .selection-layout {
app\products\products.css:2112: .products-selection-page .product-area {
app\products\products.css:2118: .products-selection-page .product-grid {
app\products\products.css:2125: .products-selection-page .container {
app\products\products.css:2130: .products-selection-page .selection-layout {
app\products\products.css:2134: .products-selection-page .product-grid {
app\products\products.css:2140: .products-selection-page .container {
app\products\products.css:2144: .products-selection-page .product-grid {
app\products\products.css:2155: 产品中心卡片最终稳定版：
app\products\products.css:2162: .products-selection-page .product-card {
app\products\products.css:2167: .products-selection-page .selected-bar {
app\products\products.css:2172: .products-selection-page .product-card:hover {
app\products\products.css:2177: .products-selection-page .product-image {
app\products\products.css:2187: .products-selection-page .product-image img {
app\products\products.css:2197: .products-selection-page .product-body {
app\products\products.css:2208: .products-selection-page .product-title {
app\products\products.css:2219: .products-selection-page .product-param-line {
app\products\products.css:2229: .products-selection-page .product-actions {
app\products\products.css:2237: .products-selection-page .product-link,
app\products\products.css:2238: .products-selection-page .list-toggle {
app\products\products.css:2247: .products-selection-page .product-card {
app\products\products.css:2251: .products-selection-page .product-image {
app\products\products.css:2255: .products-selection-page .product-image img {
app\products\products.css:2259: .products-selection-page .product-body {
app\products\products.css:2264: .products-selection-page .product-title {
app\products\products.css:2268: .products-selection-page .product-param-line {
app\products\products.css:2272: .products-selection-page .product-actions {
app\products\products.css:2277: .products-selection-page .product-link,
app\products\products.css:2278: .products-selection-page .list-toggle {
app\products\products.css:2294: .products-selection-page .product-card:hover .product-title,
app\products\products.css:2295: .products-selection-page .product-card:focus-within .product-title,
app\products\products.css:2296: .products-selection-page .product-card:has(.list-toggle.active) .product-title,
app\products\products.css:2297: .products-selection-page .product-card:has(.list-toggle[aria-pressed="true"]) .product-title,
app\products\products.css:2298: .products-selection-page .product-card:has(.list-toggle[data-active="true"]) .product-title,
app\products\products.css:2299: .products-selection-page .product-card:has(.list-toggle.is-active) .product-title,
app\products\products.css:2300: .products-selection-page .product-card.active .product-title,
app\products\products.css:2301: .products-selection-page .product-card.selected .product-title,
app\products\products.css:2302: .products-selection-page .product-card.is-selected .product-title,
app\products\products.css:2303: .products-selection-page .product-card[data-selected="true"] .product-title {
app\products\products.css:2309: /* 产品中心：产品卡片响应式布局
app\products\products.css:2314: 4. 只作用于产品中心页面，不影响全站样式
app\products\products.css:2317: .products-selection-page {
app\products\products.css:2322: .products-selection-page .product-area,
app\products\products.css:2323: .products-selection-page .product-grid,
app\products\products.css:2324: .products-selection-page .product-grid > * {
app\products\products.css:2330: .products-selection-page .product-grid {
app\products\products.css:2334: .products-selection-page .product-card,
app\products\products.css:2335: .products-selection-page .product-card-link {
app\products\products.css:2342: .products-selection-page .product-grid {
app\products\products.css:2349: .products-selection-page .product-grid {
app\products\products.css:2353: .products-selection-page .product-card {
app\products\products.css:2357: .products-selection-page .product-card h3,
app\products\products.css:2358: .products-selection-page .product-card-title,
app\products\products.css:2359: .products-selection-page .product-name {
app\products\products.css:2366: .products-selection-page .product-card h3,
app\products\products.css:2367: .products-selection-page .product-card-title,
app\products\products.css:2368: .products-selection-page .product-name {
app\products\products.css:2375: /* 产品中心：固定产品卡片视觉比例
app\products\products.css:2383: .products-selection-page .product-card {
app\products\products.css:2391: .products-selection-page .product-card-image,
app\products\products.css:2392: .products-selection-page .product-image,
app\products\products.css:2393: .products-selection-page .product-card-media {
app\products\products.css:2404: .products-selection-page .product-card-image img,
app\products\products.css:2405: .products-selection-page .product-image img,
app\products\products.css:2406: .products-selection-page .product-card-media img {
app\products\products.css:2413: .products-selection-page .product-card-content,
app\products\products.css:2414: .products-selection-page .product-card-body {
app\products\products.css:2421: .products-selection-page .product-card h3,
app\products\products.css:2422: .products-selection-page .product-card-title,
app\products\products.css:2423: .products-selection-page .product-name {
app\products\products.css:2432: .products-selection-page .product-card-description,
app\products\products.css:2433: .products-selection-page .product-card-specs,
app\products\products.css:2434: .products-selection-page .product-summary {
app\products\products.css:2439: .products-selection-page .product-card-actions,
app\products\products.css:2440: .products-selection-page .product-actions {
app\products\products.css:2446: .products-selection-page .product-card {
app\products\products.css:2450: .products-selection-page .product-card-image,
app\products\products.css:2451: .products-selection-page .product-image,
app\products\products.css:2452: .products-selection-page .product-card-media {
app\products\products.css:2460: .products-selection-page .product-card {
app\products\products.css:2464: .products-selection-page .product-card-image,
app\products\products.css:2465: .products-selection-page .product-image,
app\products\products.css:2466: .products-selection-page .product-card-media {
app\products\products.css:2471: .products-selection-page .product-card h3,
app\products\products.css:2472: .products-selection-page .product-card-title,
app\products\products.css:2473: .products-selection-page .product-name {
app\products\products.css:2478: /* 产品中心：修复产品类型当前项宽度
app\products\products.css:2487: .products-selection-page .product-type-filter-group .filter-group-trigger {
app\products\products.css:2507: .products-selection-page .product-type-filter-group .filter-group-symbol {
app\products\products.css:2520: .products-selection-page .product-type-current-option {
app\products\products.css:2525: .products-selection-page .product-type-current-option .filter-option {
app\products\products.css:2533: .products-selection-page .product-type-filter-group:not(.is-mobile-open) > .filter-options {
app\products\products.css:2537: .products-selection-page .product-type-filter-group.is-mobile-open > .filter-options {
app\products\products.css:2542: /* 产品中心：产品种类介绍区最终整理版
app\products\products.css:2544: 1. 这是产品中心顶部产品种类介绍区的唯一最终样式
app\products\products.css:2550: .products-selection-page .product-type-intro-module {
app\products\products.css:2568: .products-selection-page .product-type-intro-image {
app\products\products.css:2581: .products-selection-page .product-type-intro-image img {
app\products\products.css:2590: .products-selection-page .product-type-intro-copy {
app\products\products.css:2599: .products-selection-page .product-type-intro-copy h2 {
app\products\products.css:2607: .products-selection-page .product-type-intro-copy p {
app\products\products.css:2615: .products-selection-page .product-type-intro-copy p + p {
app\products\products.css:2620: .products-selection-page .product-type-intro-copy .product-type-intro-emphasis {
app\products\products.css:2626: .products-selection-page .product-type-intro-module::after {
app\products\products.css:2647: .products-selection-page .product-type-intro-module {
app\products\products.css:2653: .products-selection-page .product-type-intro-image {
app\products\products.css:2658: .products-selection-page .product-type-intro-image img {
app\products\products.css:2662: .products-selection-page .product-type-intro-copy h2 {
app\products\products.css:2666: .products-selection-page .product-type-intro-copy p {
app\products\products.css:2671: .products-selection-page .product-type-intro-module::after {
app\products\products.css:2681: .products-selection-page .product-type-intro-module {
app\products\products.css:2688: .products-selection-page .product-type-intro-image {
app\products\products.css:2693: .products-selection-page .product-type-intro-image img {
app\products\products.css:2697: .products-selection-page .product-type-intro-copy {
app\products\products.css:2702: .products-selection-page .product-type-intro-copy h2 {
app\products\products.css:2707: .products-selection-page .product-type-intro-copy p {
app\products\products.css:2712: .products-selection-page .product-type-intro-module::after {
app\products\products.css:2716: /* 产品中心：取消左侧筛选栏吸顶
app\products\products.css:2720: 3. 只影响产品中心页面，不影响 Header、顶部搜索、产品卡片
app\products\products.css:2723: .products-selection-page .filter-panel,
app\products\products.css:2724: .products-selection-page .product-filter-panel,
app\products\products.css:2725: .products-selection-page .selection-filter-panel,
app\products\products.css:2726: .products-selection-page .selection-layout > aside {
app\products\products.css:2737: 产品中心：产品卡片核心参数三行文案
app\products\products.css:2773: 产品中心：卡片三行参数文字微调
app\products\products.css:2781: .products-selection-page .product-card-specs {
app\products\products.css:2787: .products-selection-page .product-card-specs li {
app\products\products.css:2791: .products-selection-page .product-card-specs li::before {
app\products\products.css:2797: 产品中心：卡片三行参数间距收紧
app\products\products.css:2803: .products-selection-page .product-card-specs {
app\products\products.css:2810: 产品中心：手机端产品卡片字号最终修正
app\products\products.css:2818: .products-selection-page .product-card .product-title,
app\products\products.css:2819: .products-selection-page .product-card h3,
app\products\products.css:2820: .products-selection-page .product-card-title,
app\products\products.css:2821: .products-selection-page .product-name {
app\products\products.css:2828: .products-selection-page .product-param-line,
app\products\products.css:2829: .products-selection-page .product-card-specs,
app\products\products.css:2830: .products-selection-page .product-card-specs li,
app\products\products.css:2831: .products-selection-page .product-card-description,
app\products\products.css:2832: .products-selection-page .product-summary {
app\products\products.css:2837: .products-selection-page .product-card-specs {
app\products\products.css:2843: .products-selection-page .product-actions,
app\products\products.css:2844: .products-selection-page .product-card-actions {
app\products\products.css:2849: .products-selection-page .product-link,
app\products\products.css:2850: .products-selection-page .list-toggle {
app\products\products.css:2861: 产品中心：产品卡片两按钮最终功能样式
app\products\products.css:2867: .products-selection-page .product-actions {
app\products\products.css:2873: .products-selection-page .product-link,
app\products\products.css:2874: .products-selection-page .list-toggle {
app\products\products.css:2894: .products-selection-page .product-link:hover,
app\products\products.css:2895: .products-selection-page .list-toggle:hover,
app\products\products.css:2896: .products-selection-page .product-link.active,
app\products\products.css:2897: .products-selection-page .list-toggle.active {
app\products\products.css:2904: .products-selection-page .product-actions {
app\products\products.css:2909: .products-selection-page .product-link,
app\products\products.css:2910: .products-selection-page .list-toggle {
app\products\products.css:2922: Diaphragm pump selection card temporary style fix
app\products\products.css:2925: 2. 保持和现有产品中心卡片体系一致，不单独重做页面
app\products\products.css:3028: .products-selection-page .product-type-intro-module[data-product-type-id="diaphragm-pump"]::after,
app\products\products.css:3029: .products-selection-page .product-type-intro-module[data-product-type-id="diaphragm-pumps"]::after {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:309: /* Diaphragm pump selection page */
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:310: .diaphragm-selection-page {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:316: .diaphragm-selection-inner {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:322: .diaphragm-selection-hero {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:330: .diaphragm-selection-desc {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:338: .diaphragm-selection-section {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:346: .diaphragm-selection-section-head {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:354: .diaphragm-selection-section-head h2 {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:361: .diaphragm-selection-section-head span {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:366: .diaphragm-selection-grid {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:372: .diaphragm-selection-card {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:383: .diaphragm-selection-card:hover {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:388: .diaphragm-selection-image {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:397: .diaphragm-selection-image img {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:404: .diaphragm-selection-placeholder {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:411: .diaphragm-selection-placeholder strong {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:418: .diaphragm-selection-body {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:425: .diaphragm-selection-body h3 {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:432: .diaphragm-selection-body p {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:439: .diaphragm-selection-meta {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:447: .diaphragm-selection-meta span {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:457: .diaphragm-selection-detail {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:471: .diaphragm-selection-detail:hover {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:477: .diaphragm-selection-grid {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:483: .diaphragm-selection-inner {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:488: .diaphragm-selection-grid {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:492: .diaphragm-selection-hero,
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:493: .diaphragm-selection-section {
app\products\pumps\diaphragm-pumps\diaphragm-pump-detail.css:499: .diaphragm-selection-grid {
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:42: category?: string;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:62: seriesId: string;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:64: category?: string;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:273: category: getText(item.category),
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:287: function getSeriesTypeLabel(detail: DiaphragmDetail) {
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:288: const category = getText(detail.category);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:290: if (category) return category;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:304: `${getText(detail.seriesId)} 标准型号`
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:353: detail.seriesId,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:394: detail.seriesId,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:396: detail.category,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:402: let series = "";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:405: series = "DPGL800";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:407: series = "DPL30H";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:409: series = "DPL60";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:411: series = "DPL30";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:440: const parts = [series, motorType, productType].filter(Boolean);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:447: const title = getText(detail.title || detail.displayName || detail.seriesId);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:450: const seriesId = getText(detail.seriesId);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:457: const seriesTypeLabel = getSeriesTypeLabel(detail);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:492: productCode: seriesId,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:494: series: seriesTypeLabel,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:495: seriesName: seriesTypeLabel,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:496: seriesCode: seriesId,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:498: category: "pumps",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:499: categoryId: "pumps",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:587: { label: "产品中心", href: "/products" },
app\products\pumps\pipetting-pumps\[slug]\page.tsx:37: category?: string;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:42: seriesId?: string;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:43: seriesSlug?: string;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:58: selectionHref?: string;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:59: specSeriesKey?: string;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:144: category: "pumps",
app\products\pumps\pipetting-pumps\[slug]\page.tsx:166: specSeriesKey: detail.specSeriesKey || detail.slug,
app\products\pumps\pipetting-pumps\[slug]\page.tsx:178: selectionHref: detail.selectionHref || "/products/pumps/pipetting-pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:1: import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
app\products\pumps\plunger-pumps\[slug]\page.tsx:8: import { selectionProducts } from "@/data/products/selection/product-selection.generated";
app\products\pumps\plunger-pumps\[slug]\page.tsx:172: function getSeriesCommonApplications(seriesCode: string) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:173: const code = seriesCode.toUpperCase();
app\products\pumps\plunger-pumps\[slug]\page.tsx:210: function findSelectionImageByDetail(detail: DetailRecord) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:220: const matchedProduct = selectionProducts.find((product) => {
app\products\pumps\plunger-pumps\[slug]\page.tsx:248: const selectionImage = findSelectionImageByDetail(detail);
app\products\pumps\plunger-pumps\[slug]\page.tsx:250: if (selectionImage) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:251: return selectionImage;
app\products\pumps\plunger-pumps\[slug]\page.tsx:276: const seriesCode = getText(detail.seriesCode).toUpperCase();
app\products\pumps\plunger-pumps\[slug]\page.tsx:279: if (!seriesCode || !capacityCode) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:287: drawing2dFileName: seriesCode + "-" + capacityCode + ".pdf",
app\products\pumps\plunger-pumps\[slug]\page.tsx:288: model3dFileName: seriesCode + "-" + capacityCode + ".glb",
app\products\pumps\plunger-pumps\[slug]\page.tsx:307: function getCapacityFileCodeCandidates(seriesUpper: string, capacity: string) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:321: seriesUpper + "-" + ulCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:322: seriesUpper + "-" + mlCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:329: seriesUpper + "-" + ulCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:334: seriesCode: string,
app\products\pumps\plunger-pumps\[slug]\page.tsx:347: seriesCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:355: seriesCode +
app\products\pumps\plunger-pumps\[slug]\page.tsx:368: const seriesCode = getText(detail.seriesCode).toLowerCase();
app\products\pumps\plunger-pumps\[slug]\page.tsx:369: const seriesUpper = getText(detail.seriesCode).toUpperCase();
app\products\pumps\plunger-pumps\[slug]\page.tsx:371: seriesUpper,
app\products\pumps\plunger-pumps\[slug]\page.tsx:375: if (!seriesCode || !seriesUpper || fileCodeCandidates.length === 0) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:384: seriesCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:390: seriesCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:405: const seriesName = getText(detail.seriesName || detail.series);
app\products\pumps\plunger-pumps\[slug]\page.tsx:406: const seriesCode = getText(detail.seriesCode);
app\products\pumps\plunger-pumps\[slug]\page.tsx:421: seriesCode.toUpperCase() === "SM"
app\products\pumps\plunger-pumps\[slug]\page.tsx:428: : seriesCode.toUpperCase() === "TM"
app\products\pumps\plunger-pumps\[slug]\page.tsx:456: series: seriesName,
app\products\pumps\plunger-pumps\[slug]\page.tsx:457: seriesName,
app\products\pumps\plunger-pumps\[slug]\page.tsx:458: seriesCode,
app\products\pumps\plunger-pumps\[slug]\page.tsx:459: category: "pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:460: categoryId: "pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:543: { label: "产品中心", href: "/products" },
app\products\pumps\plunger-pumps\[slug]\page.tsx:556: const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");
app\products\pumps\syringe-pumps\[slug]\page.tsx:11: category: "pumps",
app\products\pumps\syringe-pumps\[slug]\page.tsx:37: selectionHref: "/products/pumps/syringe-pumps",
app\products\pumps\valveless-pumps\[slug]\page.tsx:56: category: "pumps",
app\products\pumps\valveless-pumps\[slug]\page.tsx:103: selectionHref: detail.selectionHref || "/products/pumps/valveless-pumps",
app\products\[category]\page.tsx:6: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
app\products\[category]\page.tsx:8: getCategoryRouteParams,
app\products\[category]\page.tsx:9: resolveCategoryRoute,
app\products\[category]\page.tsx:10: } from "@/data/products/selection/product-route-map";
app\products\[category]\page.tsx:14: type ProductsCategoryRoutePageProps = {
app\products\[category]\page.tsx:16: category: string;
app\products\[category]\page.tsx:23: return getCategoryRouteParams();
app\products\[category]\page.tsx:28: }: ProductsCategoryRoutePageProps): Promise<Metadata> {
app\products\[category]\page.tsx:29: const { category } = await params;
app\products\[category]\page.tsx:30: const route = resolveCategoryRoute(category);
app\products\[category]\page.tsx:42: export default async function ProductsCategoryRoutePage({
app\products\[category]\page.tsx:44: }: ProductsCategoryRoutePageProps) {
app\products\[category]\page.tsx:45: const { category } = await params;
app\products\[category]\page.tsx:46: const route = resolveCategoryRoute(category);
app\products\[category]\page.tsx:53: <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
app\products\[category]\page.tsx:54: <ProductSelectionClient locale="zh" initialCategoryId={route.categoryId} />
app\products\[category]\[slug]\page.tsx:6: app/products/[category]/[slug]/page.tsx
app\products\[category]\[slug]\page.tsx:9: 1. /products/{category}/{slug}
app\products\[category]\[slug]\page.tsx:13: 4. 这样可以保留原有产品详情页，同时支持新的产品中心 SEO 路径
app\products\[category]\[slug]\page.tsx:24: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
app\products\[category]\[slug]\page.tsx:29: } from "@/data/products/selection/product-route-map";
app\products\[category]\[slug]\page.tsx:40: category: string;
app\products\[category]\[slug]\page.tsx:57: const { category, slug } = await params;
app\products\[category]\[slug]\page.tsx:58: const productTypeRoute = resolveProductTypeRoute(category, slug);
app\products\[category]\[slug]\page.tsx:68: category,
app\products\[category]\[slug]\page.tsx:84: const { category, slug } = await params;
app\products\[category]\[slug]\page.tsx:85: const productTypeRoute = resolveProductTypeRoute(category, slug);
app\products\[category]\[slug]\page.tsx:89: <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
app\products\[category]\[slug]\page.tsx:90: <ProductSelectionClient
app\products\[category]\[slug]\page.tsx:92: initialCategoryId={productTypeRoute.categoryId}
app\products\[category]\[slug]\page.tsx:100: category,
app\products\[category]\[slug]\[seriesSlug]\page.tsx:6: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
app\products\[category]\[slug]\[seriesSlug]\page.tsx:8: getSeriesRouteParams,
app\products\[category]\[slug]\[seriesSlug]\page.tsx:9: resolveSeriesRoute,
app\products\[category]\[slug]\[seriesSlug]\page.tsx:10: } from "@/data/products/selection/product-route-map";
app\products\[category]\[slug]\[seriesSlug]\page.tsx:14: type ProductsSeriesRoutePageProps = {
app\products\[category]\[slug]\[seriesSlug]\page.tsx:16: category: string;
app\products\[category]\[slug]\[seriesSlug]\page.tsx:18: seriesSlug: string;
app\products\[category]\[slug]\[seriesSlug]\page.tsx:25: return getSeriesRouteParams();
app\products\[category]\[slug]\[seriesSlug]\page.tsx:30: }: ProductsSeriesRoutePageProps): Promise<Metadata> {
app\products\[category]\[slug]\[seriesSlug]\page.tsx:31: const { category, slug, seriesSlug } = await params;
app\products\[category]\[slug]\[seriesSlug]\page.tsx:32: const route = resolveSeriesRoute(category, slug, seriesSlug);
app\products\[category]\[slug]\[seriesSlug]\page.tsx:44: export default async function ProductsSeriesRoutePage({
app\products\[category]\[slug]\[seriesSlug]\page.tsx:46: }: ProductsSeriesRoutePageProps) {
app\products\[category]\[slug]\[seriesSlug]\page.tsx:47: const { category, slug, seriesSlug } = await params;
app\products\[category]\[slug]\[seriesSlug]\page.tsx:48: const route = resolveSeriesRoute(category, slug, seriesSlug);
app\products\[category]\[slug]\[seriesSlug]\page.tsx:55: <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
app\products\[category]\[slug]\[seriesSlug]\page.tsx:56: <ProductSelectionClient
app\products\[category]\[slug]\[seriesSlug]\page.tsx:58: initialCategoryId={route.categoryId}
app\resources\datasheets\datasheets.css:284: .datasheets-page .datasheets-category-bar {
app\resources\datasheets\datasheets.css:799: .datasheets-page .datasheets-category-bar {
app\resources\installation-guide\installation-guide.css:115: app/resources/selection-support/fitting-replacement/fitting-replacement.css
app\resources\installation-guide\page.tsx:20: import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app\resources\material-compatibility\page.tsx:28: import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app\resources\news\news.css:115: .newsCategoryTabs {
app\resources\news\news.css:122: .newsCategoryTabs__button {
app\resources\news\news.css:137: .newsCategoryTabs__button:hover,
app\resources\news\news.css:138: .newsCategoryTabs__button.isActive {
app\resources\news\news.css:369: .newsCategoryTabs {
app\resources\selection-support\fitting-replacement\fitting-replacement.css:6: app/resources/selection-support/fitting-replacement/fitting-replacement.css
app\resources\selection-support\fitting-replacement\fitting-replacement.css:10: /resources/selection-support/fitting-replacement
app\resources\selection-support\fitting-replacement\fitting-replacement.css:12: /en/resources/selection-support/fitting-replacement 绛?
app\resources\selection-support\fitting-replacement\fitting-replacement.css:67: url("/images/resources/selection-support/banner/resources-selection-support-fitting-replacement-banner-1920x520-v001.webp")
app\resources\selection-support\fitting-replacement\fitting-replacement.css:836: app/resources/selection-support/fitting-replacement/fitting-replacement.css
app\resources\selection-support\fitting-replacement\fitting-replacement.css:873: app/resources/selection-support/fitting-replacement/fitting-replacement.css
app\resources\selection-support\fitting-replacement\page.tsx:6: app/resources/selection-support/fitting-replacement/page.tsx
app\resources\selection-support\fitting-replacement\page.tsx:9: /resources/selection-support/fitting-replacement
app\resources\selection-support\fitting-replacement\page.tsx:24: import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";
app\resources\selection-support\fitting-replacement\page.tsx:31: const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;
app\resources\selection-support\fitting-replacement\page.tsx:40: title: `${SERIES_CONFIG.sourceLabel}｜选型支持｜恒永达`,
app\resources\selection-support\fitting-replacement\page.tsx:41: description: `输入竞品编码、商品编码或恒永达型号，快速查找 ${SERIES_CONFIG.productName} 对应产品，并查看型号解析信息。`,
app\resources\selection-support\fitting-replacement\page.tsx:49: SERIES_CONFIG.seriesKey,
app\resources\selection-support\fitting-replacement\q20\[productCode]\fitting-replacement-detail.css:6: app/resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:6: app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:9: /resources/selection-support/fitting-replacement/q20/[productCode]
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:23: import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:33: const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:48: return getFittingReplacementDetailStaticParams(SERIES_CONFIG.seriesKey);
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:61: SERIES_CONFIG.seriesKey,
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:72: title: `${pageData.product.foreachModel}｜${SERIES_CONFIG.productName}｜恒永达`,
app\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:87: SERIES_CONFIG.seriesKey,
app\[locale]\products\loading.tsx:4: return <ProductPageSkeleton variant="selection" />;
app\[locale]\products\page.tsx:3: 恒永达官网｜多语言产品中心选型页入口
app\[locale]\products\page.tsx:9: 1. 外语产品中心路径：
app\[locale]\products\page.tsx:15: 2. 中文默认路径不加 /zh-CN，中文产品中心为 /products
app\[locale]\products\page.tsx:16: 3. 当前外语产品中心使用 ProductSelectionClient 渲染
app\[locale]\products\page.tsx:27: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
app\[locale]\products\page.tsx:29: type ProductSelectionLocale = "en" | "es" | "fr" | "ko" | "ru";
app\[locale]\products\page.tsx:56: const productSelectionLocale =
app\[locale]\products\page.tsx:62: ? (locale as ProductSelectionLocale)
app\[locale]\products\page.tsx:66: <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
app\[locale]\products\page.tsx:67: <ProductSelectionClient locale={productSelectionLocale} />
app\[locale]\products\products.css:14: .product-selection-page {
app\[locale]\products\products.css:20: .product-selection {
app\[locale]\products\products.css:26: .product-selection-header {
app\[locale]\products\products.css:34: .product-selection-header h1 {
app\[locale]\products\products.css:43: .product-selection-header p {
app\[locale]\products\products.css:51: .product-selection-list-status {
app\[locale]\products\products.css:64: .product-selection-search {
app\[locale]\products\products.css:70: .product-selection-search-form {
app\[locale]\products\products.css:76: .product-selection-search-input {
app\[locale]\products\products.css:89: .product-selection-search-input::placeholder {
app\[locale]\products\products.css:93: .product-selection-search-input:focus {
app\[locale]\products\products.css:97: .product-selection-search-button {
app\[locale]\products\products.css:112: .product-selection-search-button:hover {
app\[locale]\products\products.css:118: .product-selection-recent {
app\[locale]\products\products.css:127: .product-selection-recent-label {
app\[locale]\products\products.css:132: .product-selection-recent-button {
app\[locale]\products\products.css:147: .product-selection-recent-button:hover {
app\[locale]\products\products.css:154: .product-category-tabs {
app\[locale]\products\products.css:161: .product-category-tab {
app\[locale]\products\products.css:177: .product-category-tab:hover,
app\[locale]\products\products.css:178: .product-category-tab.is-active {
app\[locale]\products\products.css:184: .product-selection-layout {
app\[locale]\products\products.css:192: .product-selection-sidebar {
app\[locale]\products\products.css:201: .product-selection-filter-head {
app\[locale]\products\products.css:209: .product-selection-filter-head strong {
app\[locale]\products\products.css:215: .product-selection-filter-head button,
app\[locale]\products\products.css:216: .product-selection-toolbar button {
app\[locale]\products\products.css:224: .product-selection-filter-head button:hover,
app\[locale]\products\products.css:225: .product-selection-toolbar button:hover {
app\[locale]\products\products.css:229: .product-selection-filter-groups {
app\[locale]\products\products.css:234: .product-selection-filter-group h2 {
app\[locale]\products\products.css:242: .product-selection-filter-options {
app\[locale]\products\products.css:247: .product-selection-filter-option {
app\[locale]\products\products.css:261: .product-selection-filter-option span {
app\[locale]\products\products.css:270: .product-selection-filter-option.single span {
app\[locale]\products\products.css:274: .product-selection-filter-option.multi span {
app\[locale]\products\products.css:278: .product-selection-filter-option.is-selected span {
app\[locale]\products\products.css:283: .product-selection-filter-option.is-selected.single span::after {
app\[locale]\products\products.css:291: .product-selection-filter-option.is-selected.multi span::after {
app\[locale]\products\products.css:303: .product-selection-filter-option:hover {
app\[locale]\products\products.css:307: .product-selection-filter-empty {
app\[locale]\products\products.css:316: .product-selection-results {
app\[locale]\products\products.css:320: .product-selection-toolbar {
app\[locale]\products\products.css:331: .product-selection-toolbar strong {
app\[locale]\products\products.css:339: .product-selection-toolbar span {
app\[locale]\products\products.css:346: .product-selection-tags {
app\[locale]\products\products.css:353: .product-selection-tag {
app\[locale]\products\products.css:366: .product-selection-grid {
app\[locale]\products\products.css:373: .product-selection-page .product-selection-card:hover {
app\[locale]\products\products.css:377: .product-selection-page .product-selection-card::before {
app\[locale]\products\products.css:381: .product-selection-empty {
app\[locale]\products\products.css:392: .product-selection-empty h2 {
app\[locale]\products\products.css:399: .product-selection-empty p {
app\[locale]\products\products.css:408: .product-selection-grid {
app\[locale]\products\products.css:414: .product-selection-layout {
app\[locale]\products\products.css:418: .product-selection-sidebar {
app\[locale]\products\products.css:422: .product-selection-grid {
app\[locale]\products\products.css:428: .product-selection {
app\[locale]\products\products.css:433: .product-selection-header {
app\[locale]\products\products.css:439: .product-selection-search-form {
app\[locale]\products\products.css:444: .product-selection-search-input {
app\[locale]\products\products.css:449: .product-selection-search-button {
app\[locale]\products\products.css:453: .product-selection-grid {
app\[locale]\products\products.css:457: .product-selection-toolbar {
app\[locale]\resources\page.tsx:171: "Access FOREACH product datasheets, selection support, installation guides, material compatibility information, FAQs, and company news.",
app\[locale]\resources\installation-guide\page.tsx:40: import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app\[locale]\resources\material-compatibility\page.tsx:35: import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app\[locale]\resources\material-compatibility\page.tsx:114: kicker: "SELECTION SUPPORT",
app\[locale]\resources\material-compatibility\page.tsx:117: "Submit the medium name, concentration, temperature, pressure, and contact time. The FOREACH technical team can help confirm material selection for your application.",
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:6: app/[locale]/resources/selection-support/fitting-replacement/page.tsx
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:9: /en/resources/selection-support/fitting-replacement
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:10: /es/resources/selection-support/fitting-replacement
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:11: /fr/resources/selection-support/fitting-replacement
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:12: /ko/resources/selection-support/fitting-replacement
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:13: /ru/resources/selection-support/fitting-replacement
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:28: import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:32: import "../../../../resources/selection-support/fitting-replacement/fitting-replacement.css";
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:47: const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:97: SERIES_CONFIG.seriesKey,
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:102: title: `${pageData.banner.title}｜Selection Support｜FOREACH`,
app\[locale]\resources\selection-support\fitting-replacement\page.tsx:120: SERIES_CONFIG.seriesKey,
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:6: app/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:9: /en/resources/selection-support/fitting-replacement/q20/[productCode]
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:10: /es/resources/selection-support/fitting-replacement/q20/[productCode]
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:11: /fr/resources/selection-support/fitting-replacement/q20/[productCode]
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:12: /ko/resources/selection-support/fitting-replacement/q20/[productCode]
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:13: /ru/resources/selection-support/fitting-replacement/q20/[productCode]
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:26: import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:33: import "../../../../../../resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css";
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:48: const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:73: SERIES_CONFIG.seriesKey
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:102: SERIES_CONFIG.seriesKey,
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:113: title: `${pageData.product.foreachModel}｜${SERIES_CONFIG.productName}｜FOREACH`,
app\[locale]\resources\selection-support\fitting-replacement\q20\[productCode]\page.tsx:132: SERIES_CONFIG.seriesKey,
app\[locale]\resources\technical-articles\page.tsx:40: "FOREACH technical articles about product selection, material compatibility, tubing connections, sealing methods and microfluidic system applications.",
components\common\ProductPageSkeleton.module.css:3: 恒永达官网｜产品中心与产品详情页加载骨架
components\common\ProductPageSkeleton.module.css:70: .categoryTabs {
components\common\ProductPageSkeleton.module.css:77: .categoryTab {
components\common\ProductPageSkeleton.module.css:81: .selectionLayout {
components\common\ProductPageSkeleton.module.css:123: .selectionMain {
components\common\ProductPageSkeleton.module.css:336: .categoryTabs {
components\common\ProductPageSkeleton.module.css:340: .selectionLayout {
components\common\ProductPageSkeleton.module.css:382: .categoryTabs {
components\common\ProductPageSkeleton.module.css:388: .categoryTab {
components\common\ProductPageSkeleton.module.css:392: .selectionLayout {
components\common\ProductPageSkeleton.tsx:5: 恒永达官网｜产品中心与产品详情页加载骨架
components\common\ProductPageSkeleton.tsx:10: 3. selection 用于产品中心
components\common\ProductPageSkeleton.tsx:17: variant: "selection" | "detail";
components\common\ProductPageSkeleton.tsx:49: {variant === "selection" ? (
components\common\ProductPageSkeleton.tsx:56: <div className={styles.categoryTabs}>
components\common\ProductPageSkeleton.tsx:60: className={styles.categoryTab}
components\common\ProductPageSkeleton.tsx:65: <div className={styles.selectionLayout}>
components\common\ProductPageSkeleton.tsx:81: <div className={styles.selectionMain}>
components\common\product-card\index.ts:14: - ProductSelectionCard
components\common\product-card\ProductBasicCard.module.css:359: /* 兼容产品中心大屏卡片 */
components\common\product-card\ProductBasicCard.tsx:12: - 产品中心产品卡片
components\common\product-card\ProductBasicCard.tsx:31: 3. 后续产品中心统一图片规范后，再整体切换 next/image
components\home\HomeNewsSection.tsx:81: <span className="home-news-category"> {/* 左侧主推新闻分类 */}
components\home\HomeNewsSection.tsx:82: {getHomeNewsText(featureNews.categoryLabel, locale)} {/* 左侧主推新闻分类多语言文字 */}
components\home\HomeNewsSection.tsx:114: {getHomeNewsText(highlightNews.categoryLabel, locale)} {/* 中间公告分类多语言文字 */}
components\layout\SiteHeader.tsx:167: * 2. PC 端产品中心 / 关于我们等支持 Mega 大下拉菜单
components\layout\SiteHeader.tsx:169: * 4. 左侧分类和右侧内容卡片通过 categoryKey 对应
components\layout\SiteHeader.tsx:241: "/resources/selection-support/fitting-replacement/q20/",
components\layout\SiteHeader.tsx:257: const [activeMegaCategoryKey, setActiveMegaCategoryKey] = useState<
components\layout\SiteHeader.tsx:266: 3. 点击产品中心时，其他栏目会自动收缩
components\layout\SiteHeader.tsx:300: 4. 产品中心页：页面一进入就白底
components\layout\SiteHeader.tsx:324: 产品中心页面判断
components\layout\SiteHeader.tsx:327: 1. 中文产品中心：/products
components\layout\SiteHeader.tsx:328: 2. 外语产品中心：/en/products、/es/products 等
components\layout\SiteHeader.tsx:330: 4. 产品中心没有 Banner，需要直接使用白底 Header + 彩色 Logo
components\layout\SiteHeader.tsx:355: 1. activeMegaCategories：当前下拉菜单左侧分类
components\layout\SiteHeader.tsx:356: 2. currentMegaCategoryKey：当前真正选中的分类 key
components\layout\SiteHeader.tsx:357: 3. activeMegaCategory：当前选中的分类对象
components\layout\SiteHeader.tsx:358: 4. activeMegaCards：右侧根据 categoryKey 筛选后的卡片
components\layout\SiteHeader.tsx:360: const activeMegaCategories =
components\layout\SiteHeader.tsx:361: activeMegaItem?.megaDropdown?.categories
components\layout\SiteHeader.tsx:362: .filter((category) => category.enabled)
components\layout\SiteHeader.tsx:365: const currentMegaCategoryKey = activeMegaCategories.some(
components\layout\SiteHeader.tsx:366: (category) => category.key === activeMegaCategoryKey,
components\layout\SiteHeader.tsx:368: ? activeMegaCategoryKey
components\layout\SiteHeader.tsx:369: : activeMegaCategories[0]?.key ?? null;
components\layout\SiteHeader.tsx:371: const activeMegaCategory =
components\layout\SiteHeader.tsx:372: activeMegaCategories.find(
components\layout\SiteHeader.tsx:373: (category) => category.key === currentMegaCategoryKey,
components\layout\SiteHeader.tsx:375: activeMegaCategories[0] ??
components\layout\SiteHeader.tsx:378: const hasCategoryBoundCards =
components\layout\SiteHeader.tsx:380: Boolean(card.categoryKey),
components\layout\SiteHeader.tsx:387: // 如果没有任何卡片配置 categoryKey，就兼容旧数据，全部显示
components\layout\SiteHeader.tsx:388: if (!hasCategoryBoundCards) {
components\layout\SiteHeader.tsx:392: // 如果配置了 categoryKey，就只显示当前左侧分类对应的卡片
components\layout\SiteHeader.tsx:393: return card.categoryKey === currentMegaCategoryKey;
components\layout\SiteHeader.tsx:552: 用于产品中心、关于我们等复杂下拉
components\layout\SiteHeader.tsx:554: const firstCategory = item.megaDropdown.categories
components\layout\SiteHeader.tsx:555: .filter((category) => category.enabled)
components\layout\SiteHeader.tsx:559: setActiveMegaCategoryKey(firstCategory?.key ?? null);
components\layout\SiteHeader.tsx:570: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:580: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:593: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:607: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:632: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:660: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:683: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:810: // 判断是否是产品中心 / 关于我们这种复杂 Mega 下拉
components\layout\SiteHeader.tsx:848: 3. 产品中心 / 关于我们 Mega Menu 不在这里处理
components\layout\SiteHeader.tsx:852: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:878: setActiveMegaCategoryKey(null);
components\layout\SiteHeader.tsx:1112: {activeMegaCategories.map((category) => {
components\layout\SiteHeader.tsx:1117: * 1. 左侧栏目本身 categories 没有 href
components\layout\SiteHeader.tsx:1119: * 3. 所以这里通过 category.key 找到对应 card.categoryKey
components\layout\SiteHeader.tsx:1121: const categoryPrimaryCard = activeMegaItem.megaDropdown?.cards
components\layout\SiteHeader.tsx:1124: .find((card) => card.categoryKey === category.key);
components\layout\SiteHeader.tsx:1126: const categoryHref = categoryPrimaryCard?.href;
components\layout\SiteHeader.tsx:1128: const categoryContent = (
components\layout\SiteHeader.tsx:1131: {getLocalizedText(category.title, currentLocale)}
components\layout\SiteHeader.tsx:1134: <span className="site-nav-mega-category-desc">
components\layout\SiteHeader.tsx:1135: {getLocalizedText(category.description, currentLocale)}
components\layout\SiteHeader.tsx:1139: className="site-nav-mega-category-arrow"
components\layout\SiteHeader.tsx:1149: if (categoryHref) {
components\layout\SiteHeader.tsx:1152: key={category.key}
components\layout\SiteHeader.tsx:1153: href={getLocalizedHref(categoryHref, currentLocale)}
components\layout\SiteHeader.tsx:1154: className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
components\layout\SiteHeader.tsx:1155: ? "site-nav-mega-category-active"
components\layout\SiteHeader.tsx:1159: setActiveMegaCategoryKey(category.key)
components\layout\SiteHeader.tsx:1163: {categoryContent}
components\layout\SiteHeader.tsx:1173: key={category.key}
components\layout\SiteHeader.tsx:1174: className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
components\layout\SiteHeader.tsx:1175: ? "site-nav-mega-category-active"
components\layout\SiteHeader.tsx:1178: onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
components\layout\SiteHeader.tsx:1180: {categoryContent}
components\layout\SiteHeader.tsx:1195: : activeMegaCategory?.description ??
components\layout\SitePageShell.module.css:3: 恒永达官网｜产品中心与产品详情公共页面框架
components\layout\SitePageShell.tsx:6: 1. 产品中心
components\products\detail\ProductDetailClient.tsx:4: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
components\products\detail\ProductDetailClient.tsx:5: import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
components\products\detail\ProductDetailClient.tsx:58: const seriesCode = match[1];
components\products\detail\ProductDetailClient.tsx:59: const seriesUpper = seriesCode.toUpperCase();
components\products\detail\ProductDetailClient.tsx:64: seriesCode +
components\products\detail\ProductDetailClient.tsx:66: seriesUpper +
components\products\detail\ProductDetailClient.tsx:115: detailMode === "selection" ||
components\products\detail\ProductDetailClient.tsx:277: data.selectionHref ||
components\products\detail\ProductDetailClient.tsx:278: data.modelSelectionHref ||
components\products\detail\ProductDetailClient.tsx:279: "#model-selection"
components\products\detail\ProductDetailClient.tsx:309: const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();
components\products\detail\ProductDetailClient.tsx:416: function createDetailCartItem(needDrawing: boolean): SelectionCartItemInput {
components\products\detail\ProductDetailClient.tsx:428: sourceType: "pump-selection",
components\products\detail\ProductDetailClient.tsx:432: data.seriesName ||
components\products\detail\ProductDetailClient.tsx:433: data.series ||
components\products\detail\ProductDetailClient.tsx:456: const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
components\products\detail\ProductDetailClient.tsx:476: const existingItem = getItem("pump-selection", item.productCode);
components\products\detail\ProductDetailClient.tsx:498: const existingItem = getItem("pump-selection", item.productCode);
components\products\detail\ProductDetailClient.tsx:518: label: "产品中心",
components\products\selection\product-selection-ui.types.ts:2: ProductSelectionProduct,
components\products\selection\product-selection-ui.types.ts:3: SelectionFilterKey,
components\products\selection\product-selection-ui.types.ts:4: } from "@/data/products/selection/product-selection.types";
components\products\selection\product-selection-ui.types.ts:6: export type ProductSelectionCategoryItem = {
components\products\selection\product-selection-ui.types.ts:13: export type ProductSelectionFilterOption = {
components\products\selection\product-selection-ui.types.ts:18: export type ProductSelectionFilterGroup = {
components\products\selection\product-selection-ui.types.ts:19: key: "productType" | SelectionFilterKey;
components\products\selection\product-selection-ui.types.ts:22: options: ProductSelectionFilterOption[];
components\products\selection\product-selection-ui.types.ts:25: export type ProductSelectionSelectedTag = {
components\products\selection\product-selection-ui.types.ts:26: key: "productType" | SelectionFilterKey;
components\products\selection\product-selection-ui.types.ts:31: export type ProductSelectionProductItem = ProductSelectionProduct;
components\products\selection\product-selection-ui.types.ts:33: export type ProductSelectionPageText = {
components\products\selection\product-selection-ui.types.ts:38: mobileCategoryPrefix: string;
components\products\selection\ProductCardGrid.tsx:3: import ProductSelectionCard from "./ProductSelectionCard";
components\products\selection\ProductCardGrid.tsx:4: import type { ProductSelectionProductItem } from "./product-selection-ui.types";
components\products\selection\ProductCardGrid.tsx:7: products: ProductSelectionProductItem[];
components\products\selection\ProductCardGrid.tsx:12: getTitle: (product: ProductSelectionProductItem) => string;
components\products\selection\ProductCardGrid.tsx:13: getSubtitle: (product: ProductSelectionProductItem) => string;
components\products\selection\ProductCardGrid.tsx:14: getDetailHref: (product: ProductSelectionProductItem) => string;
components\products\selection\ProductCardGrid.tsx:15: onToggleList: (product: ProductSelectionProductItem) => void;
components\products\selection\ProductCardGrid.tsx:36: <ProductSelectionCard
components\products\selection\ProductCategoryTabs.tsx:3: import type { ProductSelectionCategoryItem } from "./product-selection-ui.types";
components\products\selection\ProductCategoryTabs.tsx:5: type ProductCategoryTabsProps = {
components\products\selection\ProductCategoryTabs.tsx:6: categories: ProductSelectionCategoryItem[];
components\products\selection\ProductCategoryTabs.tsx:7: activeCategoryId: string;
components\products\selection\ProductCategoryTabs.tsx:8: activeCategoryLabel: string;
components\products\selection\ProductCategoryTabs.tsx:9: mobileCategoryOpen: boolean;
components\products\selection\ProductCategoryTabs.tsx:10: mobileCategoryPrefix: string;
components\products\selection\ProductCategoryTabs.tsx:11: onToggleMobileCategory: () => void;
components\products\selection\ProductCategoryTabs.tsx:12: onCategoryChange: (categoryId: string) => void;
components\products\selection\ProductCategoryTabs.tsx:15: export default function ProductCategoryTabs({
components\products\selection\ProductCategoryTabs.tsx:16: categories,
components\products\selection\ProductCategoryTabs.tsx:17: activeCategoryId,
components\products\selection\ProductCategoryTabs.tsx:18: activeCategoryLabel,
components\products\selection\ProductCategoryTabs.tsx:19: mobileCategoryOpen,
components\products\selection\ProductCategoryTabs.tsx:20: mobileCategoryPrefix,
components\products\selection\ProductCategoryTabs.tsx:21: onToggleMobileCategory,
components\products\selection\ProductCategoryTabs.tsx:22: onCategoryChange,
components\products\selection\ProductCategoryTabs.tsx:23: }: ProductCategoryTabsProps) {
components\products\selection\ProductCategoryTabs.tsx:26: className={`category-tabs-wrap ${
components\products\selection\ProductCategoryTabs.tsx:27: mobileCategoryOpen ? "is-mobile-open" : ""
components\products\selection\ProductCategoryTabs.tsx:31: className="mobile-category-trigger"
components\products\selection\ProductCategoryTabs.tsx:33: onClick={onToggleMobileCategory}
components\products\selection\ProductCategoryTabs.tsx:36: {mobileCategoryPrefix}
components\products\selection\ProductCategoryTabs.tsx:37: {activeCategoryLabel}
components\products\selection\ProductCategoryTabs.tsx:39: <span className="mobile-category-symbol">
components\products\selection\ProductCategoryTabs.tsx:40: {mobileCategoryOpen ? "-" : "+"}
components\products\selection\ProductCategoryTabs.tsx:44: <div className="category-tabs">
components\products\selection\ProductCategoryTabs.tsx:45: {categories.map((category) => (
components\products\selection\ProductCategoryTabs.tsx:47: className={`category-tab ${
components\products\selection\ProductCategoryTabs.tsx:48: activeCategoryId === category.id ? "active" : ""
components\products\selection\ProductCategoryTabs.tsx:51: key={category.id}
components\products\selection\ProductCategoryTabs.tsx:52: onClick={() => onCategoryChange(category.id)}
components\products\selection\ProductCategoryTabs.tsx:54: {category.label}
components\products\selection\ProductFilterGroup.tsx:3: import type { ProductSelectionFilterGroup } from "./product-selection-ui.types";
components\products\selection\ProductFilterGroup.tsx:6: group: ProductSelectionFilterGroup;
components\products\selection\ProductFilterGroup.tsx:8: onToggleMobileGroup: (key: ProductSelectionFilterGroup["key"]) => void;
```


## 13. 搜索泵系列参考结构

```txt
app\about\foreach\AboutForeachClient.tsx:215: en: "Founded in 2012, FOREACH Technology, stock code 874030, is recognized as a National Specialized and Sophisticated “Little Giant” enterprise, a Shenzhen Gazelle enterprise, a National High-Tech Enterprise, and a Guangdong Engineering Technology Research Center. As an innovation leader in the field of microfluidic systems, FOREACH has long been dedicated to the R&D and manufacturing of core microfluidic components. The company has built a product matrix covering the full chain of fluidic systems for automated analytical instruments, including pumps, valves, sampling needles, fittings, elastomeric tubing, drivers, sensors, and other key components. Its products are widely used in life sciences, synthetic biology, high-end testing, and other fields, forming a high-precision and full-scenario microfluidic solution system.",
app\products\products.css:2481: 2. 折叠后仍然要显示“当前：柱塞泵”
app\products\products.css:2524: /* 当前：柱塞泵 要撑满整行，不要只包住文字 */
app\products\products.css:2924: 1. 隔膜泵真实产品图未放置前，避免破图图标和大面积空白
app\products\products.css:2954: /* 隔膜泵卡片内容比例优化 */
app\products\products.css:2981: /* 隔膜泵暂未放图时，卡片上半部分不要撑得太高 */
app\products\products.css:3005: 隔膜泵卡片参数分行：
app\products\products.css:3029: .products-selection-page .product-type-intro-module[data-product-type-id="diaphragm-pumps"]::after {
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:5: import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:191: * 这里仅针对隔膜泵详情页做显示层归一，不改原始参数数据。
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:294: if (title.includes("气液")) return "气液混合隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:295: if (title.includes("液体")) return "液体隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:296: if (title.includes("气体")) return "气体隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:298: return "隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:383: .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:432: let productType = "液体隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:435: productType = "气液混合隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:437: productType = "高压液体隔膜泵";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:498: category: "pumps",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:499: categoryId: "pumps",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:502: productTypeName: "隔膜泵",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:588: { label: "泵", href: "/products/pumps" },
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:589: { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:590: { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:623: title: "隔膜泵详情 | FOREACH",
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:629: "隔膜泵详情";
app\products\pumps\pipetting-pumps\[slug]\page.tsx:6: import detailsJson from "@/data/products/generated/pumps/pipetting-pumps/detail/index.json";
app\products\pumps\pipetting-pumps\[slug]\page.tsx:144: category: "pumps",
app\products\pumps\pipetting-pumps\[slug]\page.tsx:176: detailHref: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
app\products\pumps\pipetting-pumps\[slug]\page.tsx:177: href: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
app\products\pumps\pipetting-pumps\[slug]\page.tsx:178: selectionHref: detail.selectionHref || "/products/pumps/pipetting-pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:1: import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
app\products\pumps\plunger-pumps\[slug]\page.tsx:27: "ea-standard-piston-pumps": "ea-100-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:28: "ea-standard-plunger-pumps": "ea-100-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:29: "sm-micro-piston-pumps": "sm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:30: "sm-micro-plunger-pumps": "sm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:31: "sm-miniature-piston-pumps": "sm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:32: "sm-miniature-plunger-pumps": "sm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:33: "tm-ultra-micro-piston-pumps": "tm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:34: "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
app\products\pumps\plunger-pumps\[slug]\page.tsx:459: category: "pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:460: categoryId: "pumps",
app\products\pumps\plunger-pumps\[slug]\page.tsx:544: { label: "泵", href: "/products/pumps" },
app\products\pumps\plunger-pumps\[slug]\page.tsx:545: { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
app\products\pumps\plunger-pumps\[slug]\page.tsx:546: { label: model, href: "/products/pumps/plunger-pumps/" + slug },
app\products\pumps\plunger-pumps\[slug]\page.tsx:556: const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");
app\products\pumps\syringe-pumps\[slug]\page.tsx:3: import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
app\products\pumps\syringe-pumps\[slug]\page.tsx:11: category: "pumps",
app\products\pumps\syringe-pumps\[slug]\page.tsx:13: productTypeSlug: "syringe-pumps",
app\products\pumps\syringe-pumps\[slug]\page.tsx:14: productTypeName: "注射泵",
app\products\pumps\syringe-pumps\[slug]\page.tsx:37: selectionHref: "/products/pumps/syringe-pumps",
app\products\pumps\syringe-pumps\[slug]\page.tsx:38: detailHref: `/products/pumps/syringe-pumps/${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:5: import details from "@/data/products/generated/pumps/valveless-pumps/detail/index.json";
app\products\pumps\valveless-pumps\[slug]\page.tsx:56: category: "pumps",
app\products\pumps\valveless-pumps\[slug]\page.tsx:101: detail.detailHref || `/products/pumps/valveless-pumps/${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:102: href: detail.href || `/products/pumps/valveless-pumps/${detail.slug}`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:103: selectionHref: detail.selectionHref || "/products/pumps/valveless-pumps",
app\products\pumps\valveless-pumps\[slug]\page.tsx:115: productTypeName: "无阀泵",
app\products\pumps\valveless-pumps\[slug]\page.tsx:139: `${detail.model} FOREACH 无阀泵`,
app\products\pumps\valveless-pumps\[slug]\page.tsx:144: `${detail.model} FOREACH 无阀泵`,
app\products\[category]\[slug]\page.tsx:11: 示例：/products/pumps/plunger-pumps
app\products\[category]\[slug]\page.tsx:14: 5. 柱塞泵具体型号详情页已单独使用：
app\products\[category]\[slug]\page.tsx:15: /products/pumps/plunger-pumps/[slug]
app\[locale]\applications\analytical-instruments\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for analytical instruments.",
app\[locale]\applications\environmental-monitoring\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for environmental monitoring systems.",
app\[locale]\applications\ivd\page.tsx:41: "FOREACH provides pumps, valves, fittings, tubing and sensors for IVD fluidic systems.",
app\[locale]\applications\lab-automation\page.tsx:36: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for laboratory automation systems.",
app\[locale]\applications\life-science\page.tsx:36: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for life science instruments.",
app\[locale]\applications\synthetic-biology\page.tsx:28: "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for synthetic biology systems.",
app\[locale]\products\page.tsx:18: /products/pumps/plunger-pumps/[slug]
app\[locale]\products\page.tsx:20: app/[locale]/products/pumps/plunger-pumps/[slug]/page.tsx
components\contact\ContactInquiryForm.tsx:125: 深圳某某医疗_注射泵_样品测试申请_20260601.pdf
components\products\detail\product-detail.module.css:84: .mainImage .pumpSvg,
components\products\detail\product-detail.module.css:91: .mainImage.isZooming .pumpSvg,
components\products\detail\product-detail.module.css:104: .pumpSvg {
components\products\detail\product-detail.module.css:518: .mainImage.isZooming .pumpSvg,
components\products\detail\product-detail.module.css:523: .pumpSvg {
components\products\detail\product-detail.module.css:684: .pumpSvg,
components\products\detail\product-detail.module.css:1356: 柱塞泵详情页底部 CTA 最终样式：
components\products\detail\ProductDetailClient.tsx:142: text.includes("柱塞泵") ||
components\products\detail\ProductDetailClient.tsx:144: text.includes("plunger-pumps") ||
components\products\detail\ProductDetailClient.tsx:157: text.includes("隔膜泵") ||
components\products\detail\ProductDetailClient.tsx:160: text.includes("diaphragm-pumps") ||
components\products\detail\ProductDetailClient.tsx:173: text.includes("移液泵") ||
components\products\detail\ProductDetailClient.tsx:177: text.includes("pipetting-pumps") ||
components\products\detail\ProductDetailClient.tsx:187: text.includes("无阀泵") ||
components\products\detail\ProductDetailClient.tsx:190: text.includes("valveless-pumps") ||
components\products\detail\ProductDetailClient.tsx:203: text.includes("注射泵") ||
components\products\detail\ProductDetailClient.tsx:206: text.includes("syringe-pumps") ||
components\products\detail\ProductDetailClient.tsx:217: title: "注射泵可根据您的液路与结构需求进行定制",
components\products\detail\ProductDetailClient.tsx:218: desc: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
components\products\detail\ProductDetailClient.tsx:226: title: "无阀泵可根据您的液路需求进行定制",
components\products\detail\ProductDetailClient.tsx:227: desc: "恒永达可根据您的应用场景、目标排量、配比要求、液体兼容性、接口方式、清洗口和安装空间，协助确认适合自动化仪器集成的无阀泵配置。",
components\products\detail\ProductDetailClient.tsx:234: title: "柱塞泵可根据您的设备需求进行定制",
components\products\detail\ProductDetailClient.tsx:235: desc: "恒永达可根据您的设备结构、目标容量、液体兼容性、接口方式、控制方式和使用寿命要求，协助确认柱塞泵配置、泵头材质、柱塞材质及液路集成方案，适用于 IVD 分析仪、实验室自动化设备和生命科学仪器中的精密液体处理场景。",
components\products\detail\ProductDetailClient.tsx:243: title: "不确定如何选择隔膜泵型号？",
components\products\detail\ProductDetailClient.tsx:244: desc: "如果您不确定具体型号，可根据介质类型、流量、耐压、自吸能力、膜片材质、阀片材质、泵头材质、接口方式和安装空间等信息联系我们。恒永达可协助您确认适合自动化仪器液路的隔膜泵配置。",
components\products\detail\ProductDetailClient.tsx:252: title: "不确定如何选择移液泵型号？",
components\products\detail\ProductDetailClient.tsx:253: desc: "如果您不确定具体型号，可根据量程、吸头规格、液面检测方式、堵塞检测需求、通讯接口、安装空间和控制方式等信息联系我们。恒永达可协助您确认适合自动化仪器液体处理模块的移液泵配置。",
components\products\detail\ProductDetailClient.tsx:434: "隔膜泵"
components\products\detail\ProductDetailClient.tsx:451: (data.slug ? `/products/pumps/diaphragm-pumps/${data.slug}` : ""),
components\products\detail\ProductDetailClient.tsx:550: className={styles.pumpSvg}
components\products\selection\ProductSelectionClient.tsx:25: diaphragmPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:30: pipettingPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:34: valvelessPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:48: syringePumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:66: ...diaphragmPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:67: ...pipettingPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:68: ...valvelessPumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:69: ...syringePumpSelectionProducts,
components\products\selection\ProductSelectionClient.tsx:245: id: "pumps",
components\products\selection\ProductSelectionClient.tsx:374: * 1. 二级产品类型页只代表“柱塞泵”
components\products\selection\ProductSelectionClient.tsx:557: product.categoryId === "pumps" &&
components\products\selection\ProductSelectionClient.tsx:558: ["valveless-pump", "valveless-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:561: product.categoryId === "pumps" &&
components\products\selection\ProductSelectionClient.tsx:562: ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:577: ? `/products/pumps/valveless-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:578: : "/products/pumps/valveless-pumps";
components\products\selection\ProductSelectionClient.tsx:594: ? `/products/pumps/syringe-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:595: : "/products/pumps/syringe-pumps";
components\products\selection\ProductSelectionClient.tsx:598: product.categoryId === "pumps" &&
components\products\selection\ProductSelectionClient.tsx:599: ["diaphragm-pump", "diaphragm-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:614: ? `/products/pumps/diaphragm-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:615: : "/products/pumps/diaphragm-pumps";
components\products\selection\ProductSelectionClient.tsx:617: product.categoryId === "pumps" &&
components\products\selection\ProductSelectionClient.tsx:618: ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:633: ? `/products/pumps/pipetting-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:634: : "/products/pumps/pipetting-pumps";
components\products\selection\ProductSelectionClient.tsx:641: product.categoryId === "pumps" &&
components\products\selection\ProductSelectionClient.tsx:642: ["plunger-pump", "plunger-pumps"].includes(product.productTypeId);
components\products\selection\ProductSelectionClient.tsx:648: ? `/products/pumps/plunger-pumps/${slug}`
components\products\selection\ProductSelectionClient.tsx:649: : "/products/pumps/plunger-pumps";
components\products\selection\ProductSelectionClient.tsx:672: return initialCategoryId || categoryItems[0]?.id || "pumps";
components\products\selection\ProductSelectionClient.tsx:677: initialCategoryId || categoryItems[0]?.id || "pumps";
components\products\selection\ProductSelectionClient.tsx:685: initialCategoryId || categoryItems[0]?.id || "pumps";
components\products\selection\ProductSelectionClient.tsx:716: initialCategoryId || categoryItems[0]?.id || "pumps";
components\products\selection\ProductSelectionClient.tsx:743: * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
components\products\selection\ProductSelectionClient.tsx:759: * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
components\products\selection\ProductSelectionClient.tsx:875: * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
components\products\selection\ProductSelectionClient.tsx:940: const fallbackCategoryId = categoryItems[0]?.id || "pumps";
components\products\selection\ProductSelectionClient.tsx:1090: * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
components\products\selection\ProductSelectionClient.tsx:1114: * 1. 产品类型筛选项，例如“柱塞泵”，仍然走 handleProductTypeChange
components\products\selection\ProductSelectionClient.tsx:1233: * 2. productType 是产品类型，例如“柱塞泵”
components\products\selection\ProductSelectionClient.tsx:1256: * 2. productType 是产品类型，例如“柱塞泵”
components\products\selection\ProductSelectionClient.tsx:1258: * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
components\products\selection\ProductSelectionClient.tsx:1270: * 2. 例如 EA 常规柱塞泵命中：
components\products\selection\ProductSelectionClient.tsx:1271: *    /products/pumps/plunger-pumps/ea-standard-piston-pumps/
components\products\selection\ProductSelectionClient.tsx:1273: *    /products/pumps/plunger-pumps/
components\resources\ResourceSearchBar.tsx:54: recentKeywords = ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],
components\resources\technical-articles\TechnicalArticlesClient.tsx:71: if (article.category === "pumps-valves") {
components\resources\technical-articles\TechnicalArticlesClient.tsx:86: if (article.category === "pumps-valves") {
components\resources\technical-articles\TechnicalArticlesClient.tsx:87: return ["Pumps", "Valves", "Control"];
components\resources\technical-articles\TechnicalArticlesClient.tsx:164: ? ["接头", "PEEK", "材料兼容", "柱塞泵", "IVD"]
components\selection-cart\SelectionCartProvider.tsx:138: const isPumpSelection = item.sourceType === "pump-selection";
components\selection-cart\SelectionCartProvider.tsx:140: if (isPumpSelection) {
data\about-quality.ts:398: "Through the collaboration of inspection equipment, test fixtures, validation processes and data records, FOREACH continuously improves dimensional accuracy, functional performance and long-term stability of pumps, valves, sensors, tubing assemblies and connectors.",
data\about-research-manufacturing.ts:241: "FOREACH builds R&D, precision machining, extrusion manufacturing and engineering validation capabilities for pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
data\about-research-manufacturing.ts:472: desc: "FOREACH’s R&D and engineering teams focus on microfluidic core components and fluidic application technologies, covering pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules. With 60+ R&D and engineering personnel across product development, structural design, process validation and project support, FOREACH supports the full process from requirement analysis and concept design to prototyping, testing, validation and production introduction.",
data\about-research-manufacturing.ts:484: "Focused development of pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
data\about-research-manufacturing.ts:493: "Manufacturing structural parts for pumps, valves, fittings, sampling probes and related core components.",
data\about-research-manufacturing.ts:530: "Select pumps, valves, sensors, tubing and fittings based on working conditions",
data\about-research-manufacturing.ts:626: desc: "Supporting different flow, pressure, media and installation space requirements with pumps, valves, sensors, tubing, fittings, sampling probes and control modules.",
data\historyMilestones.ts:227: "DPL30、DPL60、DPGL800 系列隔膜泵产品发布",
data\historyMilestones.ts:228: "DPL30, DPL60, and DPGL800 Series Diaphragm Pumps launched",
data\historyMilestones.ts:359: "New-type solenoid valves, quick connectors, and miniature diaphragm air pumps launched",
data\historyMilestones.ts:407: "移液泵诞生，助力分子诊断行业发展",
data\historyMilestones.ts:415: "紧急组织生产隔膜泵、柱塞泵等产品，全力支持抗疫",
data\historyMilestones.ts:416: "Diaphragm pumps and piston pumps were urgently organized for production to support pandemic-related needs",
data\historyMilestones.ts:464: "推出注射泵、旋转阀、高压泵、恒流泵等产品",
data\historyMilestones.ts:465: "Syringe pumps, rotary valves, high-pressure pumps, and constant-flow pumps launched",
data\historyMilestones.ts:505: "柱塞泵累计销量达10万台",
data\historyMilestones.ts:506: "Cumulative sales volume of piston pumps reached 100,000 units",
data\historyMilestones.ts:546: "国内首款微型无阀泵产品上市，打破美国垄断",
data\historyMilestones.ts:587: "承接深圳市《基于微流体技术的一体化精密柱塞泵》的技术攻关项目",
data\historyMilestones.ts:636: "微型柱塞泵上市，进军 POCT 领域",
data\historyMilestones.ts:702: "柱塞泵上市",
data\home-application-flow.ts:110: "zh-CN": "注射泵",
data\home-application-flow.ts:121: "zh-CN": "移液泵",
data\home-application-flow.ts:278: "zh-CN": "隔膜泵",
data\home-application-flow.ts:373: "zh-CN": "柱塞泵",
data\home-application-flow.ts:631: "For IVD, life sciences, synthetic biology, high-end analytical instruments, and laboratory automation, FOREACH provides integrated fluidic support covering pumps, valves, sensors, tubing, fittings, sampling probes, and related core components.",
data\home-application-flow.ts:650: en: "Precision Pumps",
data\home-company-strength.ts:130: "Founded in 2012, FOREACH Technology focuses on core microfluidic components and fluidic solutions. As a specialized and innovation-driven enterprise, the company develops and manufactures pumps, valves, sampling probes, fittings, tubing, drivers, sensors, and other key fluid control components for life sciences, synthetic biology, high-end testing, IVD, and laboratory automation applications.",
data\home-company-strength.ts:398: "Continuously improving product structures around pumps, valves, sensors, and fluidic modules.",
data\home-inquiry.ts:102: "Support selection of pumps, valves, sensors, and tubing components based on flow rate, pressure, media, interfaces, and control methods.",
data\home-inquiry.ts:414: "zh-CN": "隔膜泵",
data\home-inquiry.ts:425: "zh-CN": "注射泵",
data\home-inquiry.ts:436: "zh-CN": "移液泵",
data\home-news.ts:207: "Focused on pumps, valves, sensors, fittings, tubing, and sampling probes, FOREACH continues to improve fluidic system support for automated analytical instruments.",
data\home-news.ts:302: en: "How do pumps, valves, and sensors work together in a microfluidic system?",
data\home-news.ts:345: "zh-CN": "如何为自动化分析仪器选择合适的隔膜泵？",
data\navigation.ts:84: public/images/products/pumps/syringe-pump.jpg
data\navigation.ts:86: /images/products/pumps/syringe-pump.jpg
data\navigation.ts:116: key: string; // 分类 key，例如 pumps
data\navigation.ts:295: "Core microfluidic components including pumps, valves, tubing, fittings, probes, and sensors.",
data\navigation.ts:304: key: "pumps",
data\navigation.ts:305: title: t("泵类", "Pumps", "Bombas", "Pompes", "펌프", "Насосы"),
data\navigation.ts:391: key: "pumps-card",
data\navigation.ts:392: categoryKey: "pumps",
data\navigation.ts:393: title: t("泵类产品", "Pumps", "Bombas", "Pompes", "펌프", "Насосы"),
data\navigation.ts:402: href: localizedPath("/products/pumps"),
data\navigation.ts:405: "/images/products/pumps/syringe-pump.jpg",
data\navigation.ts:406: t("注射泵", "Syringe Pump", "Bomba de jeringa", "Pompe seringue", "시린지 펌프", "Шприцевой насос"),
data\navigation.ts:410: "/images/products/pumps/diaphragm-pump.jpg",
data\navigation.ts:411: t("隔膜泵", "Diaphragm Pump", "Bomba de diafragma", "Pompe à membrane", "다이어프램 펌프", "Мембранный насос"),
data\navigation.ts:415: "/images/products/pumps/pipetting-pump.jpg",
data\navigation.ts:416: t("移液泵", "Pipetting Pump", "Bomba de pipeteo", "Pompe de pipetage", "피펫팅 펌프", "Пипеточный насос"),
data\navigation.ts:420: "/images/products/pumps/piston-pump.jpg",
data\navigation.ts:421: t("柱塞泵", "Piston Pump", "Bomba de pistón", "Pompe à piston", "피스톤 펌프", "Поршневой насос"),
data\navigation.ts:423: localizedPath("/products/pumps/plunger-pumps")
data\navigation.ts:426: "/images/products/pumps/rotary-pump.jpg",
data\navigation.ts:2459: title: useEnglish ? "Syringe Pump" : "注射泵",
data\navigation.ts:2468: title: useEnglish ? "Diaphragm Pump" : "隔膜泵",
data\navigation.ts:2477: title: useEnglish ? "Pipetting Pump" : "移液泵",
data\navigation.ts:2486: title: useEnglish ? "Piston Pump" : "柱塞泵",
data\site-footer.ts:52: key: "pumps", // 泵类链接 key
data\site-footer.ts:53: label: { china: "泵类", global: "Pumps" }, // 泵类链接文字
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:50: name: "注射泵",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:60: name: "柱塞泵",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:74: "用于样品瓶、样品杯、试管、孔板和反应腔等取样前端，可与注射泵、液位检测和清洗结构配合。",
data\applications\analytical-instruments\analytical-instruments-application.zh.ts:110: name: "隔膜泵",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:50: name: "注射泵",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:60: name: "柱塞泵",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:74: "用于样品杯、试剂瓶、标定液瓶、反应腔等取样与加液前端，可与注射泵、液位检测和清洗结构配合。",
data\applications\environmental-monitoring\environmental-monitoring-application.zh.ts:110: name: "隔膜泵",
data\applications\ivd\ivd-application.zh.ts:66: name: "注射泵",
data\applications\ivd\ivd-application.zh.ts:79: name: "柱塞泵",
data\applications\ivd\ivd-application.zh.ts:96: "用于样本杯、采血管、反应杯等取样前端，可与注射泵、液位检测和清洗结构配合，形成稳定的样本吸取路径。",
data\applications\ivd\ivd-application.zh.ts:144: name: "隔膜泵",
data\applications\lab-automation\lab-automation-application.zh.ts:58: name: "注射泵",
data\applications\lab-automation\lab-automation-application.zh.ts:68: name: "柱塞泵",
data\applications\lab-automation\lab-automation-application.zh.ts:118: name: "隔膜泵",
data\applications\life-science\life-science-application.zh.ts:58: name: "注射泵",
data\applications\life-science\life-science-application.zh.ts:68: name: "柱塞泵",
data\applications\life-science\life-science-application.zh.ts:118: name: "隔膜泵",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:50: name: "注射泵",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:60: name: "柱塞泵",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:74: "用于培养容器、反应腔、孔板、试剂瓶和样品管等取样与加液前端，可与注射泵、液位检测和清洗结构配合。",
data\applications\synthetic-biology\synthetic-biology-application.zh.ts:110: name: "隔膜泵",
data\contact-cooperation\contact.intl.ts:237: "Discuss the combination of pumps, valves, tubing, sensors, and other fluidic components.",
data\contact-cooperation\contact.zh.ts:251: options: ["隔膜泵", "注射泵", "移液泵", "陶瓷柱塞泵"], // 泵类产品选项
data\contact-cooperation\contact.zh.ts:302: "例如隔膜泵、注射泵、移液泵、柱塞泵、电磁阀、旋转阀、传感器等。", // 填写说明描述
data\contact-cooperation\distributor.intl.ts:185: desc: "Covers pumps, valves, intelligent control modules, fittings, tubing, needles, and key fluidic system components.",
data\contact-cooperation\distributor.intl.ts:206: desc: "For IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation, FOREACH provides pumps, valves, intelligent control modules, fittings, tubing, and needle products.",
data\contact-cooperation\distributor.intl.ts:262: desc: "With sales channels related to pumps, valves, tubing, fittings, sensors, and fluid control products.",
data\contact-cooperation\distributor.intl.ts:321: desc: "Pumps, valves, intelligent control modules, fittings, tubing, needles, or system-level fluidic solutions.",
data\products\detail\ea-product-details.zh.generated.ts:5: data-source/product-center/pumps/plunger-pump/ea/
data\products\detail\ea-product-details.zh.generated.ts:6: 01_EA常规柱塞泵_详情页资料_zh.xlsx
data\products\detail\ea-product-details.zh.generated.ts:15: category: "pumps";
data\products\detail\ea-product-details.zh.generated.ts:16: productFamily: "EA常规柱塞泵";
data\products\detail\ea-product-details.zh.generated.ts:35: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:36: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:39: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:55: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:57: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:58: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:64: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:67: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:68: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:71: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:87: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:89: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:90: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:96: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:99: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:100: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:103: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:119: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:121: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:122: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:128: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:131: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:132: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:135: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:151: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:153: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:154: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:160: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:163: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:164: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:167: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:183: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:185: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:186: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:192: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:195: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:196: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:199: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:215: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:217: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:218: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:224: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:227: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:228: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:231: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:247: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:249: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:250: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:256: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:259: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:260: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:263: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:279: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:281: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:282: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:288: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:291: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:292: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:295: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:311: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:313: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:314: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:320: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:323: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:324: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:327: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:343: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:345: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:346: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:352: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:355: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:356: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:359: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:375: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:377: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:378: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:384: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:387: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:388: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:391: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:407: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:409: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:410: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:416: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:419: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:420: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:423: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:439: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
data\products\detail\ea-product-details.zh.generated.ts:441: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:442: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:448: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-details.zh.generated.ts:451: "category":  "pumps",
data\products\detail\ea-product-details.zh.generated.ts:452: "productFamily":  "EA常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:455: "name":  "常规柱塞泵",
data\products\detail\ea-product-details.zh.generated.ts:471: "mainImage":  "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
data\products\detail\ea-product-details.zh.generated.ts:473: "/images/products/pumps/plunger-pump/ea/pump-ea-duanzi.webp",
data\products\detail\ea-product-details.zh.generated.ts:474: "/images/products/pumps/plunger-pump/ea/pump-ea-guangou.webp"
data\products\detail\ea-product-details.zh.generated.ts:480: "faqSeries":  "EA常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:5: data-source/product-center/pumps/plunger-pump/ea/
data\products\detail\ea-product-specs.zh.generated.ts:6: 02_EA常规柱塞泵_规格参数_zh.xlsx
data\products\detail\ea-product-specs.zh.generated.ts:29: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:107: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:185: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:263: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:341: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:419: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:497: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:575: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:653: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:731: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:809: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:887: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:965: "value":  "常规柱塞泵"
data\products\detail\ea-product-specs.zh.generated.ts:1043: "value":  "常规柱塞泵"
data\products\detail\plunger-pump-detail.generated.ts:3: 柱塞泵详情页自动生成数据
data\products\detail\plunger-pump-detail.generated.ts:5: 来源：data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx
data\products\detail\plunger-pump-detail.generated.ts:21: "title": "EA-100-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:22: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:23: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:24: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:25: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:27: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:108: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:109: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:113: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:146: "title": "EA-100-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:147: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:148: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:149: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:150: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:152: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:233: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:234: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:238: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:271: "title": "EA-250-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:272: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:273: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:274: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:275: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:277: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:358: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:359: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:363: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:396: "title": "EA-250-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:397: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:398: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:399: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:400: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:402: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:483: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:484: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:488: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:521: "title": "EA-500-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:522: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:523: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:524: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:525: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:527: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:608: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:609: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:613: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:646: "title": "EA-500-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:647: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:648: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:649: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:650: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:652: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:733: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:734: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:738: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:771: "title": "EA-1000-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:772: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:773: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:774: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:775: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:777: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:858: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:859: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:863: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:896: "title": "EA-1000-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:897: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:898: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:899: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:900: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:902: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:983: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:984: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:988: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1021: "title": "EA-2500-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1022: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1023: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1024: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1025: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1027: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1108: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1109: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1113: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1146: "title": "EA-2500-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1147: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1148: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1149: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1150: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1152: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1233: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1234: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1238: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1271: "title": "EA-5000-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1272: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1273: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1274: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1275: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1277: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1358: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1359: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1363: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1396: "title": "EA-5000-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1397: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1398: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1399: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1400: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1402: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1483: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1484: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1488: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1521: "title": "EA-10000-PMMA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1522: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1523: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1524: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1525: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1527: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1608: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1609: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1613: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1646: "title": "EA-10000-PEEK 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1647: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1648: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1649: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1650: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1652: "seriesName": "EA 常规柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1733: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\detail\plunger-pump-detail.generated.ts:1734: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\detail\plunger-pump-detail.generated.ts:1738: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\detail\plunger-pump-detail.generated.ts:1771: "title": "SM-50-PMMA 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1772: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1773: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1774: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1775: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1777: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1854: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:1855: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:1859: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:1862: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:1863: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:1892: "title": "SM-100-PMMA 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1893: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:1894: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1895: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:1896: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:1898: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:1975: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:1976: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:1980: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:1983: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:1984: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2013: "title": "SM-100-PEEK 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2014: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2015: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2016: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2017: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2019: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2096: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2097: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:2101: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:2104: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:2105: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2134: "title": "SM-250-PMMA 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2135: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2136: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2137: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2138: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2140: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2217: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2218: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:2222: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:2225: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:2226: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2255: "title": "SM-250-PEEK 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2256: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2257: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2258: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2259: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2261: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2338: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2339: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:2343: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:2346: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:2347: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2376: "title": "SM-500-PMMA 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2377: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2378: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2379: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2380: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2382: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2459: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2460: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:2464: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:2467: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:2468: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2497: "title": "SM-1000-PMMA 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2498: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2499: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2500: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2501: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2503: "seriesName": "SM 微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2580: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2581: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
data\products\detail\plunger-pump-detail.generated.ts:2585: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
data\products\detail\plunger-pump-detail.generated.ts:2588: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\detail\plunger-pump-detail.generated.ts:2589: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
data\products\detail\plunger-pump-detail.generated.ts:2618: "title": "TM-50-PMMA 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2619: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2620: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2621: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2622: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2624: "seriesName": "TM 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2701: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2702: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
data\products\detail\plunger-pump-detail.generated.ts:2709: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\detail\plunger-pump-detail.generated.ts:2710: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
data\products\detail\plunger-pump-detail.generated.ts:2714: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
data\products\detail\plunger-pump-detail.generated.ts:2739: "title": "TM-100-PMMA 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2740: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2741: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2742: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2743: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2745: "seriesName": "TM 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2822: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2823: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
data\products\detail\plunger-pump-detail.generated.ts:2830: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\detail\plunger-pump-detail.generated.ts:2831: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
data\products\detail\plunger-pump-detail.generated.ts:2835: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
data\products\detail\plunger-pump-detail.generated.ts:2860: "title": "TM-250-PMMA 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2861: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2862: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2863: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2864: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2866: "seriesName": "TM 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2943: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:2944: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
data\products\detail\plunger-pump-detail.generated.ts:2951: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\detail\plunger-pump-detail.generated.ts:2952: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
data\products\detail\plunger-pump-detail.generated.ts:2956: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
data\products\detail\plunger-pump-detail.generated.ts:2981: "title": "TM-500-PMMA 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:2982: "categoryCode": "pumps",
data\products\detail\plunger-pump-detail.generated.ts:2983: "categoryName": "泵类 / Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2984: "productTypeCode": "plunger-pumps",
data\products\detail\plunger-pump-detail.generated.ts:2985: "productTypeName": "柱塞泵 / Plunger Pumps",
data\products\detail\plunger-pump-detail.generated.ts:2987: "seriesName": "TM 超微型柱塞泵",
data\products\detail\plunger-pump-detail.generated.ts:3064: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\detail\plunger-pump-detail.generated.ts:3065: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
data\products\detail\plunger-pump-detail.generated.ts:3072: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\detail\plunger-pump-detail.generated.ts:3073: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
data\products\detail\plunger-pump-detail.generated.ts:3077: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
data\products\detail\plunger-pump-detail.summary.json:2: "sourceWorkbook": "data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx",
data\products\detail\plunger-pump-detail.summary.json:15: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0100UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:19: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0100UL.glb",
data\products\detail\plunger-pump-detail.summary.json:26: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0100UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:30: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0100UL.glb",
data\products\detail\plunger-pump-detail.summary.json:37: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0250UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:41: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0250UL.glb",
data\products\detail\plunger-pump-detail.summary.json:48: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0250UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:52: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0250UL.glb",
data\products\detail\plunger-pump-detail.summary.json:59: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:63: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0500UL.glb",
data\products\detail\plunger-pump-detail.summary.json:70: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-0500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:74: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-0500UL.glb",
data\products\detail\plunger-pump-detail.summary.json:81: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-1000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:85: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-1000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:92: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-1000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:96: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-1000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:103: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-2500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:107: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-2500UL.glb",
data\products\detail\plunger-pump-detail.summary.json:114: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-2500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:118: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-2500UL.glb",
data\products\detail\plunger-pump-detail.summary.json:125: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-5000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:129: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-5000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:136: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-5000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:140: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-5000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:147: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-10000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:151: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-10000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:158: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/ea/EA-10000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:162: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/ea/EA-10000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:169: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0050UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:173: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0050UL.glb",
data\products\detail\plunger-pump-detail.summary.json:180: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0100UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:184: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0100UL.glb",
data\products\detail\plunger-pump-detail.summary.json:191: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0100UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:195: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0100UL.glb",
data\products\detail\plunger-pump-detail.summary.json:202: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0250UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:206: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0250UL.glb",
data\products\detail\plunger-pump-detail.summary.json:213: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0250UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:217: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0250UL.glb",
data\products\detail\plunger-pump-detail.summary.json:224: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-0500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:228: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-0500UL.glb",
data\products\detail\plunger-pump-detail.summary.json:235: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/sm/SM-1000UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:239: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/sm/SM-1000UL.glb",
data\products\detail\plunger-pump-detail.summary.json:246: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/tm/TM-0050UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:250: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/tm/TM-0050UL.glb",
data\products\detail\plunger-pump-detail.summary.json:257: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/tm/TM-0100UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:261: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/tm/TM-0100UL.glb",
data\products\detail\plunger-pump-detail.summary.json:268: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/tm/TM-0250UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:272: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/tm/TM-0250UL.glb",
data\products\detail\plunger-pump-detail.summary.json:279: "relativePath": "private-assets/products/pumps/plunger-pumps/2d/tm/TM-0500UL.pdf",
data\products\detail\plunger-pump-detail.summary.json:283: "relativePath": "private-assets/products/pumps/plunger-pumps/3d/tm/TM-0500UL.glb",
data\products\detail\plunger-pump-detail.types.ts:3: 柱塞泵详情页数据类型
data\products\detail\plunger-pump-detail.types.ts:9: export type PlungerPumpSeriesCode = "EA" | "SM" | "TM";
data\products\detail\plunger-pump-detail.types.ts:11: export type PlungerPumpSpecification = {
data\products\detail\plunger-pump-detail.types.ts:46: seriesCode: PlungerPumpSeriesCode;
data\products\detail\plunger-pump-detail.types.ts:52: specifications: PlungerPumpSpecification[];
data\products\detail\product-detail-faq.zh.ts:20: * 同属 EA 常规柱塞泵系列，后续统一在这里补 FAQ。
data\products\detail\product-detail-faq.zh.ts:22: "EA常规柱塞泵": [
data\products\detail\product-detail-faq.zh.ts:24: question: "EA 常规柱塞泵适合哪些应用场景？",
data\products\detail\product-detail-faq.zh.ts:26: "EA 常规柱塞泵适用于 IVD 诊断设备、生命科学仪器、实验室自动化设备和分析仪器中的试剂分配、定量输送和液路集成场景。",
data\products\detail\product-detail.types.ts:18: | "pumps"
data\products\detail\product-detail.zh.ts:15: category: "pumps",
data\products\detail\product-detail.zh.ts:19: name: "常规柱塞泵",
data\products\generated\pumps\pump-series-content-audit.md:10: - 泵系列数据源：F:\WebsiteProjects\foreach-website-2026\data-source\product-center\pumps\FOREACH_泵系列_产品数据源.xlsx
data\products\generated\pumps\pump-series-content-audit.md:17: | ea-100-pmma | /products/pumps/plunger-pumps/ea-100-pmma | EA-100-PMMA 柱塞泵 | 100 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:18: | ea-250-pmma | /products/pumps/plunger-pumps/ea-250-pmma | EA-250-PMMA 柱塞泵 | 250 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:19: | sm-100-pmma | /products/pumps/plunger-pumps/sm-100-pmma | SM-100-PMMA 微型柱塞泵 | 100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:20: | ea-100-peek | /products/pumps/plunger-pumps/ea-100-peek | EA-100-PEEK 柱塞泵 | 100 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:21: | ea-250-peek | /products/pumps/plunger-pumps/ea-250-peek | EA-250-PEEK 柱塞泵 | 250 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:22: | ea-500-peek | /products/pumps/plunger-pumps/ea-500-peek | EA-500-PEEK 柱塞泵 | 500 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:23: | ea-500-pmma | /products/pumps/plunger-pumps/ea-500-pmma | EA-500-PMMA 柱塞泵 | 500 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:24: | ea-1000-peek | /products/pumps/plunger-pumps/ea-1000-peek | EA-1000-PEEK 柱塞泵 | 1000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:25: | ea-1000-pmma | /products/pumps/plunger-pumps/ea-1000-pmma | EA-1000-PMMA 柱塞泵 | 1000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:26: | ea-2500-peek | /products/pumps/plunger-pumps/ea-2500-peek | EA-2500-PEEK 柱塞泵 | 2500 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:27: | ea-2500-pmma | /products/pumps/plunger-pumps/ea-2500-pmma | EA-2500-PMMA 柱塞泵 | 2500 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:28: | ea-5000-peek | /products/pumps/plunger-pumps/ea-5000-peek | EA-5000-PEEK 柱塞泵 | 5000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:29: | ea-5000-pmma | /products/pumps/plunger-pumps/ea-5000-pmma | EA-5000-PMMA 柱塞泵 | 5000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:30: | ea-10000-peek | /products/pumps/plunger-pumps/ea-10000-peek | EA-10000-PEEK 柱塞泵 | 10000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:31: | ea-10000-pmma | /products/pumps/plunger-pumps/ea-10000-pmma | EA-10000-PMMA 柱塞泵 | 10000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:32: | sm-50-pmma | /products/pumps/plunger-pumps/sm-50-pmma | SM-50-PMMA 微型柱塞泵 | 50 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:33: | sm-100-peek | /products/pumps/plunger-pumps/sm-100-peek | SM-100-PEEK 微型柱塞泵 | 100 µL Miniature PEEK Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:34: | sm-250-peek | /products/pumps/plunger-pumps/sm-250-peek | SM-250-PEEK 微型柱塞泵 | 250 µL Miniature PEEK Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:35: | sm-250-pmma | /products/pumps/plunger-pumps/sm-250-pmma | SM-250-PMMA 微型柱塞泵 | 250 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:36: | sm-500-pmma | /products/pumps/plunger-pumps/sm-500-pmma | SM-500-PMMA 微型柱塞泵 | 500 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:37: | sm-1000-pmma | /products/pumps/plunger-pumps/sm-1000-pmma | SM-1000-PMMA 微型柱塞泵 | 1000 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
data\products\generated\pumps\pump-series-content-audit.md:45: 1. 中文 H1 是否保持型号式标题，例如：EA-100-PMMA 柱塞泵。
data\products\generated\pumps\pump-series-content-audit.md:47: 3. 柱塞泵 detailMode 是否为 custom_inquiry。
data\products\generated\pumps\pump-series-content-audit.md:48: 4. 柱塞泵 showModel 是否为 false。
data\products\generated\pumps\pump-series-content-detail-audit.md:12: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:16: - canonicalPath：/products/pumps/plunger-pumps/ea-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:17: - detailHref：/products/pumps/plunger-pumps/ea-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:21: - 中文 H1：EA-100-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:23: - 中文 titleTag：EA-100-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:25: - 中文 metaDescription：EA-100-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:33: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:39: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:46: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:50: - description：EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:67: - /images/products/pumps/plunger-pump/ea/ea-100-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:68: - /images/products/pumps/plunger-pump/ea/ea-100-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:81: A：EA-100-PMMA 属于 EA 常规柱塞泵，适合用于小体积试剂吸排、样本前处理、反应液定量加入和微量分配模块。该型号更适合 100 µL 级别的精密液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、目标分配体积、节拍和集成方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:103: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:107: - canonicalPath：/products/pumps/plunger-pumps/ea-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:108: - detailHref：/products/pumps/plunger-pumps/ea-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:112: - 中文 H1：EA-250-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:114: - 中文 titleTag：EA-250-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:116: - 中文 metaDescription：EA-250-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:124: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:130: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:135: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:139: - description：EA-250-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:156: - /images/products/pumps/plunger-pump/ea/ea-250-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:157: - /images/products/pumps/plunger-pump/ea/ea-250-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:170: A：EA-250-PMMA 属于 EA 常规柱塞泵，适合用于小体积试剂吸排、样本前处理、反应液定量加入和微量分配模块。该型号更适合 250 µL 级别的精密液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、目标分配体积、节拍和集成方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:192: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:196: - canonicalPath：/products/pumps/plunger-pumps/sm-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:197: - detailHref：/products/pumps/plunger-pumps/sm-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:201: - 中文 H1：SM-100-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:203: - 中文 titleTag：SM-100-PMMA 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:205: - 中文 metaDescription：SM-100-PMMA 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:213: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:224: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:228: - description：SM-100-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:245: - /images/products/pumps/plunger-pump/sm/sm-100-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:246: - /images/products/pumps/plunger-pump/sm/sm-100-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:259: A：SM-100-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 100 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:261: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-100-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:262: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:263: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:267: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:281: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:285: - canonicalPath：/products/pumps/plunger-pumps/ea-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:286: - detailHref：/products/pumps/plunger-pumps/ea-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:290: - 中文 H1：EA-100-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:292: - 中文 titleTag：EA-100-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:294: - 中文 metaDescription：EA-100-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:302: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:308: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:313: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:317: - description：EA-100-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:334: - /images/products/pumps/plunger-pump/ea/ea-100-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:335: - /images/products/pumps/plunger-pump/ea/ea-100-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:348: A：EA-100-PEEK 属于 EA 常规柱塞泵，适合用于小体积试剂吸排、样本前处理、反应液定量加入和微量分配模块。该型号更适合 100 µL 级别的精密液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、目标分配体积、节拍和集成方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:370: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:374: - canonicalPath：/products/pumps/plunger-pumps/ea-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:375: - detailHref：/products/pumps/plunger-pumps/ea-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:379: - 中文 H1：EA-250-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:381: - 中文 titleTag：EA-250-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:383: - 中文 metaDescription：EA-250-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:391: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:397: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:402: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:406: - description：EA-250-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:423: - /images/products/pumps/plunger-pump/ea/ea-250-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:424: - /images/products/pumps/plunger-pump/ea/ea-250-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:437: A：EA-250-PEEK 属于 EA 常规柱塞泵，适合用于小体积试剂吸排、样本前处理、反应液定量加入和微量分配模块。该型号更适合 250 µL 级别的精密液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、目标分配体积、节拍和集成方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:459: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:463: - canonicalPath：/products/pumps/plunger-pumps/ea-500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:464: - detailHref：/products/pumps/plunger-pumps/ea-500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:468: - 中文 H1：EA-500-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:470: - 中文 titleTag：EA-500-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:472: - 中文 metaDescription：EA-500-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:480: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:486: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:491: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:495: - description：EA-500-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:512: - /images/products/pumps/plunger-pump/ea/ea-500-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:513: - /images/products/pumps/plunger-pump/ea/ea-500-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:526: A：EA-500-PEEK 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 500 µL 级别的中小体积液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:548: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:552: - canonicalPath：/products/pumps/plunger-pumps/ea-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:553: - detailHref：/products/pumps/plunger-pumps/ea-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:557: - 中文 H1：EA-500-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:559: - 中文 titleTag：EA-500-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:561: - 中文 metaDescription：EA-500-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:569: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:575: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:580: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:584: - description：EA-500-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:601: - /images/products/pumps/plunger-pump/ea/ea-500-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:602: - /images/products/pumps/plunger-pump/ea/ea-500-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:615: A：EA-500-PMMA 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 500 µL 级别的中小体积液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:637: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:641: - canonicalPath：/products/pumps/plunger-pumps/ea-1000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:642: - detailHref：/products/pumps/plunger-pumps/ea-1000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:646: - 中文 H1：EA-1000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:648: - 中文 titleTag：EA-1000-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:650: - 中文 metaDescription：EA-1000-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:658: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:664: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:669: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:673: - description：EA-1000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:690: - /images/products/pumps/plunger-pump/ea/ea-1000-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:691: - /images/products/pumps/plunger-pump/ea/ea-1000-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:704: A：EA-1000-PEEK 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 1000 µL 级别的中小体积液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:726: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:730: - canonicalPath：/products/pumps/plunger-pumps/ea-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:731: - detailHref：/products/pumps/plunger-pumps/ea-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:735: - 中文 H1：EA-1000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:737: - 中文 titleTag：EA-1000-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:739: - 中文 metaDescription：EA-1000-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:747: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:753: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:758: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:762: - description：EA-1000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:779: - /images/products/pumps/plunger-pump/ea/ea-1000-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:780: - /images/products/pumps/plunger-pump/ea/ea-1000-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:793: A：EA-1000-PMMA 属于 EA 常规柱塞泵，适合用于常规试剂分配、缓冲液转移、稀释液加入和自动化液路中的定量吸排。该型号适合 1000 µL 级别的中小体积液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合液体介质、速度、寿命和阀路配置确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:815: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:819: - canonicalPath：/products/pumps/plunger-pumps/ea-2500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:820: - detailHref：/products/pumps/plunger-pumps/ea-2500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:824: - 中文 H1：EA-2500-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:826: - 中文 titleTag：EA-2500-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:828: - 中文 metaDescription：EA-2500-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:836: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:842: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:847: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:851: - description：EA-2500-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:868: - /images/products/pumps/plunger-pump/ea/ea-2500-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:869: - /images/products/pumps/plunger-pump/ea/ea-2500-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:882: A：EA-2500-PEEK 属于 EA 常规柱塞泵，适合用于较大体积试剂输送、清洗液定量加入、缓冲液转移和分析仪器中的液路补液模块。该型号适合 2500 µL 级别的液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合流量需求、压力条件、接口方式和控制方案确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:904: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:908: - canonicalPath：/products/pumps/plunger-pumps/ea-2500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:909: - detailHref：/products/pumps/plunger-pumps/ea-2500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:913: - 中文 H1：EA-2500-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:915: - 中文 titleTag：EA-2500-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:917: - 中文 metaDescription：EA-2500-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:925: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:931: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:936: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:940: - description：EA-2500-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:957: - /images/products/pumps/plunger-pump/ea/ea-2500-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:958: - /images/products/pumps/plunger-pump/ea/ea-2500-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:971: A：EA-2500-PMMA 属于 EA 常规柱塞泵，适合用于较大体积试剂输送、清洗液定量加入、缓冲液转移和分析仪器中的液路补液模块。该型号适合 2500 µL 级别的液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合流量需求、压力条件、接口方式和控制方案确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:993: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:997: - canonicalPath：/products/pumps/plunger-pumps/ea-5000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:998: - detailHref：/products/pumps/plunger-pumps/ea-5000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1002: - 中文 H1：EA-5000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1004: - 中文 titleTag：EA-5000-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1006: - 中文 metaDescription：EA-5000-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1014: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1020: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1025: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1029: - description：EA-5000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1046: - /images/products/pumps/plunger-pump/ea/ea-5000-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1047: - /images/products/pumps/plunger-pump/ea/ea-5000-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1060: A：EA-5000-PEEK 属于 EA 常规柱塞泵，适合用于较大体积试剂输送、清洗液定量加入、缓冲液转移和分析仪器中的液路补液模块。该型号适合 5000 µL 级别的液体处理任务。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合流量需求、压力条件、接口方式和控制方案确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1082: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1086: - canonicalPath：/products/pumps/plunger-pumps/ea-5000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1087: - detailHref：/products/pumps/plunger-pumps/ea-5000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1091: - 中文 H1：EA-5000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1093: - 中文 titleTag：EA-5000-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1095: - 中文 metaDescription：EA-5000-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1103: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1109: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1114: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1118: - description：EA-5000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1135: - /images/products/pumps/plunger-pump/ea/ea-5000-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1136: - /images/products/pumps/plunger-pump/ea/ea-5000-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1149: A：EA-5000-PMMA 属于 EA 常规柱塞泵，适合用于较大体积试剂输送、清洗液定量加入、缓冲液转移和分析仪器中的液路补液模块。该型号适合 5000 µL 级别的液体处理任务。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合流量需求、压力条件、接口方式和控制方案确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1171: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1175: - canonicalPath：/products/pumps/plunger-pumps/ea-10000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1176: - detailHref：/products/pumps/plunger-pumps/ea-10000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1180: - 中文 H1：EA-10000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1182: - 中文 titleTag：EA-10000-PEEK 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1184: - 中文 metaDescription：EA-10000-PEEK 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1192: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1198: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1203: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1207: - description：EA-10000-PEEK 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1224: - /images/products/pumps/plunger-pump/ea/ea-10000-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1225: - /images/products/pumps/plunger-pump/ea/ea-10000-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1238: A：EA-10000-PEEK 属于 EA 常规柱塞泵，适合用于大体积缓冲液、清洗液、稀释液和系统液的定量转移。该型号适合 10000 µL 级别的液体处理任务，更关注稳定输送、寿命和系统集成。PEEK 泵头更适合对化学兼容性、低析出或避光性有要求的液路。 最终选型需结合整机液路、安装空间、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1260: - seriesSlug：ea-standard-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1264: - canonicalPath：/products/pumps/plunger-pumps/ea-10000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1265: - detailHref：/products/pumps/plunger-pumps/ea-10000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1269: - 中文 H1：EA-10000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1271: - 中文 titleTag：EA-10000-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1273: - 中文 metaDescription：EA-10000-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1281: - customNotice：柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。
data\products\generated\pumps\pump-series-content-detail-audit.md:1287: | features | h2 | 产品特点 | 面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1292: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1296: - description：EA-10000-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1313: - /images/products/pumps/plunger-pump/ea/ea-10000-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1314: - /images/products/pumps/plunger-pump/ea/ea-10000-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1327: A：EA-10000-PMMA 属于 EA 常规柱塞泵，适合用于大体积缓冲液、清洗液、稀释液和系统液的定量转移。该型号适合 10000 µL 级别的液体处理任务，更关注稳定输送、寿命和系统集成。PMMA 泵头适用于对材料兼容性和成本平衡有要求的常规液路。 最终选型需结合整机液路、安装空间、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1349: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1353: - canonicalPath：/products/pumps/plunger-pumps/sm-50-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1354: - detailHref：/products/pumps/plunger-pumps/sm-50-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1358: - 中文 H1：SM-50-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1360: - 中文 titleTag：SM-50-PMMA 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1362: - 中文 metaDescription：SM-50-PMMA 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1370: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1381: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1385: - description：SM-50-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1402: - /images/products/pumps/plunger-pump/sm/sm-50-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1403: - /images/products/pumps/plunger-pump/sm/sm-50-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1416: A：SM-50-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 50 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1418: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-50-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1419: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1420: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1424: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1438: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1442: - canonicalPath：/products/pumps/plunger-pumps/sm-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1443: - detailHref：/products/pumps/plunger-pumps/sm-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1447: - 中文 H1：SM-100-PEEK 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1449: - 中文 titleTag：SM-100-PEEK 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1451: - 中文 metaDescription：SM-100-PEEK 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1459: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1470: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1474: - description：SM-100-PEEK 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1491: - /images/products/pumps/plunger-pump/sm/sm-100-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1492: - /images/products/pumps/plunger-pump/sm/sm-100-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1505: A：SM-100-PEEK 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 100 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1507: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-100-PEEK 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1508: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1509: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1513: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1527: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1531: - canonicalPath：/products/pumps/plunger-pumps/sm-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1532: - detailHref：/products/pumps/plunger-pumps/sm-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1536: - 中文 H1：SM-250-PEEK 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1538: - 中文 titleTag：SM-250-PEEK 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1540: - 中文 metaDescription：SM-250-PEEK 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1548: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1559: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1563: - description：SM-250-PEEK 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1580: - /images/products/pumps/plunger-pump/sm/sm-250-peek-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1581: - /images/products/pumps/plunger-pump/sm/sm-250-peek-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1594: A：SM-250-PEEK 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 250 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1596: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-250-PEEK 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1597: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1598: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1602: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1616: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1620: - canonicalPath：/products/pumps/plunger-pumps/sm-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1621: - detailHref：/products/pumps/plunger-pumps/sm-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1625: - 中文 H1：SM-250-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1627: - 中文 titleTag：SM-250-PMMA 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1629: - 中文 metaDescription：SM-250-PMMA 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1637: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1648: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1652: - description：SM-250-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1669: - /images/products/pumps/plunger-pump/sm/sm-250-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1670: - /images/products/pumps/plunger-pump/sm/sm-250-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1683: A：SM-250-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 250 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1685: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-250-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1686: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1687: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1691: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1705: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1709: - canonicalPath：/products/pumps/plunger-pumps/sm-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1710: - detailHref：/products/pumps/plunger-pumps/sm-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1714: - 中文 H1：SM-500-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1716: - 中文 titleTag：SM-500-PMMA 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1718: - 中文 metaDescription：SM-500-PMMA 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1726: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1737: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1741: - description：SM-500-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1758: - /images/products/pumps/plunger-pump/sm/sm-500-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1759: - /images/products/pumps/plunger-pump/sm/sm-500-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1772: A：SM-500-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 500 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1774: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-500-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1775: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1776: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1780: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1794: - seriesSlug：sm-miniature-piston-pumps
data\products\generated\pumps\pump-series-content-detail-audit.md:1798: - canonicalPath：/products/pumps/plunger-pumps/sm-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1799: - detailHref：/products/pumps/plunger-pumps/sm-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1803: - 中文 H1：SM-1000-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1805: - 中文 titleTag：SM-1000-PMMA 微型柱塞泵｜精密液体分配泵｜恒永达 FOREACH
data\products\generated\pumps\pump-series-content-detail-audit.md:1807: - 中文 metaDescription：SM-1000-PMMA 微型柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1815: - customNotice：SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1826: | faq | h2 | 常见问题 | 以下内容用于说明柱塞泵定制、材料选择和工程确认流程。 |
data\products\generated\pumps\pump-series-content-detail-audit.md:1830: - description：SM-1000-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1847: - /images/products/pumps/plunger-pump/sm/sm-1000-pmma-main.webp｜caption：产品图片仅用于结构展示
data\products\generated\pumps\pump-series-content-detail-audit.md:1848: - /images/products/pumps/plunger-pump/sm/sm-1000-pmma-detail.webp｜caption：泵头细节图仅用于结构说明
data\products\generated\pumps\pump-series-content-detail-audit.md:1861: A：SM-1000-PMMA 属于 SM 微型柱塞泵，适合用于空间受限的小型液路模块、紧凑型自动化设备、微量试剂分配单元和便携式检测设备。该型号主要用于 1000 µL 级别的微量液体吸排、分配和转移。最终配置需结合安装空间、液路路径、阀体搭配和控制方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1863: A：选型前需要确认目标分配体积、液体介质、泵头材料、接口形式、阀体搭配、光耦反馈、控制方式和安装空间。SM-1000-PMMA 属于微型柱塞泵，页面型号用于初步沟通和报价识别，最终型号以工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1864: - Q：SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？
data\products\generated\pumps\pump-series-content-detail-audit.md:1865: A：不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。
data\products\generated\pumps\pump-series-content-detail-audit.md:1869: A：可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。
data\products\generated\pumps\pump-series-content-detail-audit.md:1882: - detailHref：/products/pumps/plunger-pumps/ea-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1883: - cardImage：/images/products/pumps/plunger-pump/ea/ea-100-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1885: - 中文标题：EA-100-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1888: - 中文规格：容量：100 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1896: - detailHref：/products/pumps/plunger-pumps/ea-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1897: - cardImage：/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1899: - 中文标题：EA-100-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1902: - 中文规格：容量：100 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1910: - detailHref：/products/pumps/plunger-pumps/ea-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1911: - cardImage：/images/products/pumps/plunger-pump/ea/ea-250-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1913: - 中文标题：EA-250-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1916: - 中文规格：容量：250 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1924: - detailHref：/products/pumps/plunger-pumps/ea-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1925: - cardImage：/images/products/pumps/plunger-pump/ea/ea-250-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1927: - 中文标题：EA-250-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1930: - 中文规格：容量：250 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1938: - detailHref：/products/pumps/plunger-pumps/ea-500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1939: - cardImage：/images/products/pumps/plunger-pump/ea/ea-500-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1941: - 中文标题：EA-500-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1944: - 中文规格：容量：500 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1952: - detailHref：/products/pumps/plunger-pumps/ea-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1953: - cardImage：/images/products/pumps/plunger-pump/ea/ea-500-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1955: - 中文标题：EA-500-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1958: - 中文规格：容量：500 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1966: - detailHref：/products/pumps/plunger-pumps/ea-1000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1967: - cardImage：/images/products/pumps/plunger-pump/ea/ea-1000-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1969: - 中文标题：EA-1000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1972: - 中文规格：容量：1000 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1980: - detailHref：/products/pumps/plunger-pumps/ea-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:1981: - cardImage：/images/products/pumps/plunger-pump/ea/ea-1000-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1983: - 中文标题：EA-1000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1986: - 中文规格：容量：1000 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:1994: - detailHref：/products/pumps/plunger-pumps/ea-2500-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:1995: - cardImage：/images/products/pumps/plunger-pump/ea/ea-2500-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:1997: - 中文标题：EA-2500-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2000: - 中文规格：容量：2500 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2008: - detailHref：/products/pumps/plunger-pumps/ea-2500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2009: - cardImage：/images/products/pumps/plunger-pump/ea/ea-2500-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2011: - 中文标题：EA-2500-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2014: - 中文规格：容量：2500 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2022: - detailHref：/products/pumps/plunger-pumps/ea-5000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:2023: - cardImage：/images/products/pumps/plunger-pump/ea/ea-5000-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2025: - 中文标题：EA-5000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2028: - 中文规格：容量：5000 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2036: - detailHref：/products/pumps/plunger-pumps/ea-5000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2037: - cardImage：/images/products/pumps/plunger-pump/ea/ea-5000-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2039: - 中文标题：EA-5000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2042: - 中文规格：容量：5000 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2050: - detailHref：/products/pumps/plunger-pumps/ea-10000-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:2051: - cardImage：/images/products/pumps/plunger-pump/ea/ea-10000-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2053: - 中文标题：EA-10000-PEEK 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2056: - 中文规格：容量：10000 µL；泵头材料：PEEK；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2064: - detailHref：/products/pumps/plunger-pumps/ea-10000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2065: - cardImage：/images/products/pumps/plunger-pump/ea/ea-10000-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2067: - 中文标题：EA-10000-PMMA 柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2070: - 中文规格：容量：10000 µL；泵头材料：PMMA；类型：定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2078: - detailHref：/products/pumps/plunger-pumps/sm-50-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2079: - cardImage：/images/products/pumps/plunger-pump/sm/sm-50-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2081: - 中文标题：SM-50-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2084: - 中文规格：容量：50 µL；泵头材料：PMMA；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2092: - detailHref：/products/pumps/plunger-pumps/sm-100-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:2093: - cardImage：/images/products/pumps/plunger-pump/sm/sm-100-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2095: - 中文标题：SM-100-PEEK 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2098: - 中文规格：容量：100 µL；泵头材料：PEEK；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2106: - detailHref：/products/pumps/plunger-pumps/sm-100-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2107: - cardImage：/images/products/pumps/plunger-pump/sm/sm-100-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2109: - 中文标题：SM-100-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2112: - 中文规格：容量：100 µL；泵头材料：PMMA；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2120: - detailHref：/products/pumps/plunger-pumps/sm-250-peek
data\products\generated\pumps\pump-series-content-detail-audit.md:2121: - cardImage：/images/products/pumps/plunger-pump/sm/sm-250-peek-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2123: - 中文标题：SM-250-PEEK 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2126: - 中文规格：容量：250 µL；泵头材料：PEEK；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2134: - detailHref：/products/pumps/plunger-pumps/sm-250-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2135: - cardImage：/images/products/pumps/plunger-pump/sm/sm-250-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2137: - 中文标题：SM-250-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2140: - 中文规格：容量：250 µL；泵头材料：PMMA；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2148: - detailHref：/products/pumps/plunger-pumps/sm-500-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2149: - cardImage：/images/products/pumps/plunger-pump/sm/sm-500-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2151: - 中文标题：SM-500-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2154: - 中文规格：容量：500 µL；泵头材料：PMMA；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2162: - detailHref：/products/pumps/plunger-pumps/sm-1000-pmma
data\products\generated\pumps\pump-series-content-detail-audit.md:2163: - cardImage：/images/products/pumps/plunger-pump/sm/sm-1000-pmma-card.webp
data\products\generated\pumps\pump-series-content-detail-audit.md:2165: - 中文标题：SM-1000-PMMA 微型柱塞泵
data\products\generated\pumps\pump-series-content-detail-audit.md:2168: - 中文规格：容量：1000 µL；泵头材料：PMMA；类型：微型定制柱塞泵
data\products\generated\pumps\pump-series.detail.generated.ts:1: export const pumpSeriesDetailRecords = [
data\products\generated\pumps\pump-series.detail.generated.ts:6: "categorySlug": "pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:7: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:8: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:17: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:18: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:19: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:20: "detailHref": "/products/pumps/plunger-pumps/ea-100-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:27: "title": "100 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:28: "h1": "100 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:30: "titleTag": "EA-100-PMMA 常规柱塞泵｜100 μL PMMA 精密液体分配泵｜FOREACH 恒永达",
data\products\generated\pumps\pump-series.detail.generated.ts:31: "metaDescription": "EA-100-PMMA 是100 μL PMMA 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:32: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:34: "ogTitle": "100 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:35: "ogDescription": "100 μL PMMA 泵头常规柱塞泵，用于自动化仪器液路中的精密液体处理。最终配置可按应用需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:41: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:386: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:387: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\generated\pumps\pump-series.detail.generated.ts:391: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:423: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:432: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:776: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:777: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。",
data\products\generated\pumps\pump-series.detail.generated.ts:783: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:806: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:807: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。",
data\products\generated\pumps\pump-series.detail.generated.ts:813: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。",
data\products\generated\pumps\pump-series.detail.generated.ts:818: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\generated\pumps\pump-series.detail.generated.ts:819: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:836: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:837: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。",
data\products\generated\pumps\pump-series.detail.generated.ts:848: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\generated\pumps\pump-series.detail.generated.ts:849: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。",
data\products\generated\pumps\pump-series.detail.generated.ts:855: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:881: "categorySlug": "pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:882: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:883: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:892: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:893: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:894: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:895: "detailHref": "/products/pumps/plunger-pumps/ea-100-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:902: "title": "100 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:903: "h1": "100 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:905: "titleTag": "EA-100-PEEK 常规柱塞泵｜100 μL PEEK 精密液体分配泵｜FOREACH 恒永达",
data\products\generated\pumps\pump-series.detail.generated.ts:906: "metaDescription": "EA-100-PEEK 是100 μL PEEK 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:907: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:909: "ogTitle": "100 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:910: "ogDescription": "100 μL PEEK 泵头常规柱塞泵，用于自动化仪器液路中的精密液体处理。最终配置可按应用需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:916: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1261: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:1262: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\generated\pumps\pump-series.detail.generated.ts:1266: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1298: "canonicalPath": "/products/pumps/plunger-pumps/ea-100-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:1307: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:1651: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:1652: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。",
data\products\generated\pumps\pump-series.detail.generated.ts:1658: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1681: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:1682: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。",
data\products\generated\pumps\pump-series.detail.generated.ts:1688: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。",
data\products\generated\pumps\pump-series.detail.generated.ts:1693: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\generated\pumps\pump-series.detail.generated.ts:1694: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:1711: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:1712: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。",
data\products\generated\pumps\pump-series.detail.generated.ts:1723: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\generated\pumps\pump-series.detail.generated.ts:1724: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。",
data\products\generated\pumps\pump-series.detail.generated.ts:1730: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:1756: "categorySlug": "pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:1757: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:1758: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:1767: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:1768: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:1769: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:1770: "detailHref": "/products/pumps/plunger-pumps/ea-250-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:1777: "title": "250 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:1778: "h1": "250 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:1780: "titleTag": "EA-250-PMMA 常规柱塞泵｜250 μL PMMA 精密液体分配泵｜FOREACH 恒永达",
data\products\generated\pumps\pump-series.detail.generated.ts:1781: "metaDescription": "EA-250-PMMA 是250 μL PMMA 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对材料兼容性和项目成本平衡有要求的常规液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:1782: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:1784: "ogTitle": "250 μL PMMA 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:1785: "ogDescription": "250 μL PMMA 泵头常规柱塞泵，用于自动化仪器液路中的精密液体处理。最终配置可按应用需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:1791: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2136: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:2137: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\generated\pumps\pump-series.detail.generated.ts:2141: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2173: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-pmma",
data\products\generated\pumps\pump-series.detail.generated.ts:2182: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:2526: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:2527: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。",
data\products\generated\pumps\pump-series.detail.generated.ts:2533: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2556: "question": "SM 微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:2557: "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。",
data\products\generated\pumps\pump-series.detail.generated.ts:2563: "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。",
data\products\generated\pumps\pump-series.detail.generated.ts:2568: "question": "SM 微型柱塞泵支持哪些泵头材质？",
data\products\generated\pumps\pump-series.detail.generated.ts:2569: "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:2586: "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
data\products\generated\pumps\pump-series.detail.generated.ts:2587: "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。",
data\products\generated\pumps\pump-series.detail.generated.ts:2598: "question": "TM 超微型柱塞泵采用什么接口？",
data\products\generated\pumps\pump-series.detail.generated.ts:2599: "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。",
data\products\generated\pumps\pump-series.detail.generated.ts:2605: "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。",
data\products\generated\pumps\pump-series.detail.generated.ts:2631: "categorySlug": "pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:2632: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:2633: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:2642: "pumpTypeSlug": "plunger-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:2643: "seriesSlug": "ea-standard-piston-pumps",
data\products\generated\pumps\pump-series.detail.generated.ts:2644: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:2645: "detailHref": "/products/pumps/plunger-pumps/ea-250-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:2652: "title": "250 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:2653: "h1": "250 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:2655: "titleTag": "EA-250-PEEK 常规柱塞泵｜250 μL PEEK 精密液体分配泵｜FOREACH 恒永达",
data\products\generated\pumps\pump-series.detail.generated.ts:2656: "metaDescription": "EA-250-PEEK 是250 μL PEEK 泵头常规柱塞泵，适用于微量试剂分配、小体积样本处理、反应液补加和自动化检测设备液路模块。适合对化学兼容性、低析出或避光性有要求的液路项目。页面型号用于初步选型和报价沟通，最终配置需结合液体介质、接口、阀体和控制方式确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:2657: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:2659: "ogTitle": "250 μL PEEK 泵头常规柱塞泵",
data\products\generated\pumps\pump-series.detail.generated.ts:2660: "ogDescription": "250 μL PEEK 泵头常规柱塞泵，用于自动化仪器液路中的精密液体处理。最终配置可按应用需求确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:2666: "customNotice": "柱塞泵为定制化产品。页面型号用于初步选型、技术沟通和报价识别，最终泵头材质、柱塞材质、接口方式、阀体搭配、光耦反馈和控制方式需根据实际应用确认。",
data\products\generated\pumps\pump-series.detail.generated.ts:3011: "question": "EA 常规柱塞泵适合什么设备平台？",
data\products\generated\pumps\pump-series.detail.generated.ts:3012: "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
data\products\generated\pumps\pump-series.detail.generated.ts:3016: "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
data\products\generated\pumps\pump-series.detail.generated.ts:3048: "canonicalPath": "/products/pumps/plunger-pumps/ea-250-peek",
data\products\generated\pumps\pump-series.detail.generated.ts:3057: "customNotice": "Plunger pumps are custom-engineered products. The page model is for preliminary selection, technical communication, and quotation reference. Final pump head material, piston material, interface, valve configuration, optical feedback, and control method should be confirmed according to the application.",
data\products\generated\pumps\pump-series.detail.generated.ts:3401: "question": "EA 常规柱塞泵适合什么设备平台？",
```


## 14. 搜索详情页字段风险

```txt
components\products\detail\product-detail.module.css:422: .specTable {
components\products\detail\product-detail.module.css:431: .specTable tr {
components\products\detail\product-detail.module.css:435: .specTable tr:last-child {
components\products\detail\product-detail.module.css:439: .specTable th,
components\products\detail\product-detail.module.css:440: .specTable td {  font-weight: 500;
components\products\detail\product-detail.module.css:450: .specTable th:last-child,
components\products\detail\product-detail.module.css:451: .specTable td:last-child {  font-weight: 400;
components\products\detail\product-detail.module.css:457: .specTable th {
components\products\detail\product-detail.module.css:467: .specTable td {
components\products\detail\product-detail.module.css:606: .specTable {
components\products\detail\product-detail.module.css:612: .specTable tbody {
components\products\detail\product-detail.module.css:617: .specTable tr {
components\products\detail\product-detail.module.css:626: .specTable th,
components\products\detail\product-detail.module.css:627: .specTable td {  font-weight: 400;
components\products\detail\product-detail.module.css:642: .specTable th {
components\products\detail\product-detail.module.css:653: .specTable td {
components\products\detail\product-detail.module.css:1030: .container .specTableRow {
components\products\detail\product-detail.module.css:1042: .container .specTableRow > * {
components\products\detail\product-detail.module.css:1099: .container .specTableRow {
components\products\detail\product-detail.module.css:1108: .container .specTableRow > * {
components\products\detail\product-detail.module.css:1283: .specPanelClean .specTable {
components\products\detail\product-detail.module.css:1292: .specPanelClean .specTable tbody {
components\products\detail\product-detail.module.css:1297: .specPanelClean .specTable tr[data-product-spec-row="true"] {
components\products\detail\product-detail.module.css:1306: .specPanelClean .specTable tr[data-product-spec-row="true"]:first-child {
components\products\detail\product-detail.module.css:1310: .specPanelClean .specTable th,
components\products\detail\product-detail.module.css:1311: .specPanelClean .specTable td {  font-weight: 400;
components\products\detail\product-detail.module.css:1329: .specPanelClean .specTable th {  color: #111111;
components\products\detail\product-detail.module.css:1338: .specPanelClean .specTable td {  color: #111111;
components\products\detail\product-detail.module.css:1347: .specPanelClean .specTable tr[data-product-spec-row="true"]:hover th,
components\products\detail\product-detail.module.css:1348: .specPanelClean .specTable tr[data-product-spec-row="true"]:hover td {
components\products\detail\product-detail.module.css:1790: .container .specPanelClean .specTable {
components\products\detail\product-detail.module.css:1799: .container .specPanelClean .specTable tbody {
components\products\detail\product-detail.module.css:1806: .container .specPanelClean .specTable tr[data-product-spec-row="true"] {
components\products\detail\product-detail.module.css:1815: .container .specPanelClean .specTable th,
components\products\detail\product-detail.module.css:1816: .container .specPanelClean .specTable td {
components\products\detail\product-detail.module.css:1837: .container .specPanelClean .specTable th {
components\products\detail\product-detail.module.css:1843: .container .specPanelClean .specTable td {
components\products\detail\product-detail.module.css:1880: .container .specPanelClean .specTable tr[data-product-spec-row="true"] {
components\products\detail\product-detail.module.css:1884: .container .specPanelClean .specTable th,
components\products\detail\product-detail.module.css:1885: .container .specPanelClean .specTable td {
components\products\detail\product-detail.module.css:1893: .container .specPanelClean .specTable th {
components\products\detail\product-detail.module.css:1898: .container .specPanelClean .specTable td {
components\products\detail\product-detail.module.css:2113: .commonApplicationsText,
components\products\detail\product-detail.module.css:2128: .commonApplicationsText li,
components\products\detail\product-detail.module.css:2138: .commonApplicationsText span,
components\products\detail\ProductDetailClient.tsx:7: ProductDetailClient.tsx
components\products\detail\ProductDetailClient.tsx:33: type ProductDetailClientProps = {
components\products\detail\ProductDetailClient.tsx:306: export default function ProductDetailClient({
components\products\detail\ProductDetailClient.tsx:308: }: ProductDetailClientProps) {
components\products\detail\ProductDetailClient.tsx:791: {data.commonApplications.join("、")}
components\products\detail\ProductDetailClient.tsx:842: {data.showDrawingRequest ? (
components\products\detail\ProductDetailClient.tsx:933: <table className={styles.specTable}>
components\products\detail\ProductDetailClient.tsx:935: {data.specs.map((item) => (
components\products\detail\ProductModelViewer.tsx:11: 4. 同时兼容现有 ProductDetailClient.tsx 传入的 slug / modelName / modelUrl
components\products\selection\ProductSelectionCard.tsx:88: {cardSpecs.map((spec, index) => (
services\products\adapters\getPumpSeriesProductDetailAdapter.ts:528: function getCommonApplications(candidates: any[], locale: "zh" | "en") {
services\products\adapters\getPumpSeriesProductDetailAdapter.ts:531: const rawItems = Array.isArray(body?.commonApplications)
services\products\adapters\getPumpSeriesProductDetailAdapter.ts:532: ? body.commonApplications
services\products\adapters\getPumpSeriesProductDetailAdapter.ts:599: commonApplications: getCommonApplications(candidates, locale),
services\products\adapters\getPumpSeriesProductDetailAdapter.ts:606: showDrawingRequest: Boolean(resources.showDrawing),
services\products\detail\getProductDetailPageData.ts:116: commonApplications: detailRecord.commonApplications,
services\products\detail\getProductDetailPageData.ts:122: showDrawingRequest: detailRecord.show2DRequest,
data\products\detail\ea-product-details.zh.generated.ts:23: commonApplications: string[];
data\products\detail\ea-product-details.zh.generated.ts:49: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:81: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:113: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:145: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:177: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:209: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:241: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:273: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:305: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:337: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:369: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:401: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:433: "commonApplications":  [
data\products\detail\ea-product-details.zh.generated.ts:465: "commonApplications":  [
data\products\detail\product-detail.types.ts:39: commonApplications: string[];
data\products\detail\product-detail.types.ts:50: showDrawingRequest: boolean;
data\products\detail\product-detail.zh.ts:25: commonApplications: [
data\products\detail\product-detail.zh.ts:40: showDrawingRequest: true,
data\products\generated\pumps\pump-series-content-detail-audit.md:52: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:141: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:230: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:319: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:408: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:497: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:586: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:675: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:764: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:853: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:942: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:1031: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:1120: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:1209: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:1298: - commonApplications：IVD 分析仪；实验室自动化设备；生命科学仪器；分析仪器液路模块
data\products\generated\pumps\pump-series-content-detail-audit.md:1387: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:1476: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:1565: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:1654: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:1743: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series-content-detail-audit.md:1832: - commonApplications：紧凑型 IVD 设备；小型液路模块；实验室自动化设备；生命科学仪器
data\products\generated\pumps\pump-series.detail.generated.ts:60: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:447: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:935: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:1322: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:1810: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:2197: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:2685: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:3072: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:3560: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:3947: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:4435: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:4822: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:5310: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:5697: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:6185: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:6572: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:7060: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:7447: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:7935: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:8322: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:8810: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:9197: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:9685: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:10072: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:10560: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:10947: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:11435: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:11822: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:12310: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:12689: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:13169: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:13548: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:14028: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:14407: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:14887: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:15266: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:15746: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:16125: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:16605: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:16984: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:17464: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:17843: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:18323: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:18702: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:19182: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:19561: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:20041: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:20420: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:20900: "commonApplications": [
data\products\generated\pumps\pump-series.detail.generated.ts:21279: "commonApplications": [
data\products\generated\pumps\diaphragm-pumps\detail\dpgl800-gas-liquid-diaphragm-pump.json:9: "commonApplications": "气体抽吸、负压建立、气液混合物抽排、密闭容器抽气、气路辅助输送",
data\products\generated\pumps\diaphragm-pumps\detail\dpl30-liquid-diaphragm-pump.json:9: "commonApplications": "清洗液输送、试剂转移、废液抽排、管路预充、小流量液体循环",
data\products\generated\pumps\diaphragm-pumps\detail\dpl30h-liquid-diaphragm-pump.json:9: "commonApplications": "液体输送、试剂转移、加压供液、较长管路输送、阻力较高液路模块",
data\products\generated\pumps\diaphragm-pumps\detail\dpl60-liquid-diaphragm-pump.json:9: "commonApplications": "清洗液输送、废液抽排、管路冲洗、液体循环、快速排液",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:10: "commonApplications": "清洗液输送、试剂转移、废液抽排、管路预充、小流量液体循环",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:417: "commonApplications": "清洗液输送、废液抽排、管路冲洗、液体循环、快速排液",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:781: "commonApplications": "液体输送、试剂转移、加压供液、较长管路输送、阻力较高液路模块",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:1145: "commonApplications": "气体抽吸、负压建立、气液混合物抽排、密闭容器抽气、气路辅助输送",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:1394: "commonApplications": "清洗液输送、试剂转移、废液抽排、管路预充、小流量液体循环",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:1686: "commonApplications": "清洗液输送、试剂转移、废液抽排、管路预充、小流量液体循环",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:1978: "commonApplications": "清洗液输送、废液抽排、管路冲洗、液体循环、快速排液",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:2258: "commonApplications": "清洗液输送、废液抽排、管路冲洗、液体循环、快速排液",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:2538: "commonApplications": "液体输送、试剂转移、加压供液、较长管路输送、阻力较高液路模块",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:2818: "commonApplications": "液体输送、试剂转移、加压供液、较长管路输送、阻力较高液路模块",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:3098: "commonApplications": "气体抽吸、负压建立、气液混合物抽排、密闭容器抽气、气路辅助输送",
data\products\generated\pumps\diaphragm-pumps\detail\index.json:3338: "commonApplications": "气体抽吸、负压建立、气液混合物抽排、密闭容器抽气、气路辅助输送",
data\products\generated\pumps\pipetting-pumps\detail\index.json:18: "commonApplications":  [
data\products\generated\pumps\pipetting-pumps\detail\index.json:31: "showDrawingRequest":  true,
data\products\generated\pumps\pipetting-pumps\detail\index.json:535: "commonApplications":  [
data\products\generated\pumps\pipetting-pumps\detail\index.json:547: "showDrawingRequest":  true,
data\products\generated\pumps\pipetting-pumps\detail\index.json:1047: "commonApplications":  [
data\products\generated\pumps\pipetting-pumps\detail\index.json:1059: "showDrawingRequest":  true,
data\products\generated\pumps\syringe-pumps\detail\index.json:21: "commonApplications": [
data\products\generated\pumps\syringe-pumps\detail\index.json:149: "showDrawingRequest": true,
data\products\generated\pumps\syringe-pumps\detail\index.json:369: "commonApplications": [
data\products\generated\pumps\syringe-pumps\detail\index.json:497: "showDrawingRequest": true,
data\products\generated\pumps\syringe-pumps\detail\index.json:717: "commonApplications": [
data\products\generated\pumps\syringe-pumps\detail\index.json:853: "showDrawingRequest": true,
data\products\generated\pumps\syringe-pumps\detail\index.json:1077: "commonApplications": [
data\products\generated\pumps\syringe-pumps\detail\index.json:1213: "showDrawingRequest": true,
data\products\generated\pumps\valveless-pumps\detail\index.json:13: "commonApplications": [
data\products\generated\pumps\valveless-pumps\detail\index.json:174: "showDrawingRequest": true,
data\products\generated\pumps\valveless-pumps\detail\index.json:388: "commonApplications": [
data\products\generated\pumps\valveless-pumps\detail\index.json:562: "showDrawingRequest": true,
data\products\generated\pumps\valveless-pumps\detail\index.json:804: "commonApplications": [
data\products\generated\pumps\valveless-pumps\detail\index.json:977: "showDrawingRequest": true,
data\products\generated\pumps\valveless-pumps\detail\index.json:1219: "commonApplications": [
data\products\generated\pumps\valveless-pumps\detail\index.json:1576: "showDrawingRequest": true,
data\products\generated\pumps\valveless-pumps\detail\index.json:1748: "commonApplications": [
data\products\generated\pumps\valveless-pumps\detail\index.json:2105: "showDrawingRequest": true,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:3: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:69: commonApplications?: string;
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:87: const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:189: * ProductDetailClient 外层已经显示“规格参数”。
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:445: function adaptToProductDetailClientData(detail: DiaphragmDetail) {
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:452: const applications = splitApplications(detail.commonApplications);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:511: commonApplications: applications,
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:564: showDrawingRequest: Boolean(drawing2dUrl),
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:600: function getPreferredProductDetailData(slug: string) {
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:607: return adaptToProductDetailClientData(detail);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:619: const data = getPreferredProductDetailData(resolvedParams.slug);
app\products\pumps\diaphragm-pumps\[slug]\page.tsx:646: const data = getPreferredProductDetailData(resolvedParams.slug);
app\products\pumps\pipetting-pumps\[slug]\page.tsx:4: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\pumps\pipetting-pumps\[slug]\page.tsx:45: commonApplications?: string[];
app\products\pumps\pipetting-pumps\[slug]\page.tsx:55: showDrawingRequest?: boolean;
app\products\pumps\pipetting-pumps\[slug]\page.tsx:82: const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
app\products\pumps\pipetting-pumps\[slug]\page.tsx:152: commonApplications: Array.isArray(detail.commonApplications)
app\products\pumps\pipetting-pumps\[slug]\page.tsx:153: ? detail.commonApplications
app\products\pumps\pipetting-pumps\[slug]\page.tsx:164: showDrawingRequest: Boolean(detail.showDrawingRequest),
app\products\pumps\plunger-pumps\[slug]\page.tsx:6: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\pumps\plunger-pumps\[slug]\page.tsx:22: const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
app\products\pumps\plunger-pumps\[slug]\page.tsx:172: function getSeriesCommonApplications(seriesCode: string) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:402: function adaptToProductDetailClientData(detail: DetailRecord) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:475: commonApplications: applicationItems,
app\products\pumps\plunger-pumps\[slug]\page.tsx:555: function getPreferredProductDetailData(slug: string) {
app\products\pumps\plunger-pumps\[slug]\page.tsx:568: return adaptToProductDetailClientData(legacyDetail);
app\products\pumps\plunger-pumps\[slug]\page.tsx:586: const data = getPreferredProductDetailData(resolvedParams.slug);
app\products\pumps\plunger-pumps\[slug]\page.tsx:614: const data = getPreferredProductDetailData(resolvedParams.slug);
app\products\pumps\syringe-pumps\[slug]\page.tsx:2: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\pumps\syringe-pumps\[slug]\page.tsx:31: showDrawingRequest: true,
app\products\pumps\syringe-pumps\[slug]\page.tsx:99: return <ProductDetailClient data={toClientData(detail)} />;
app\products\pumps\valveless-pumps\[slug]\page.tsx:4: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\pumps\valveless-pumps\[slug]\page.tsx:66: commonApplications: Array.isArray(detail.commonApplications)
app\products\pumps\valveless-pumps\[slug]\page.tsx:67: ? detail.commonApplications
app\products\pumps\valveless-pumps\[slug]\page.tsx:116: showDrawingRequest: true,
app\products\pumps\valveless-pumps\[slug]\page.tsx:158: return <ProductDetailClient data={toClientData(detail)} />;
app\products\[category]\[slug]\page.tsx:23: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
app\products\[category]\[slug]\page.tsx:108: return <ProductDetailClient data={pageData} />;
```


## 15. ProductDetailClient 关键摘录

```tsx
----- 第 1 行至第 25 行 -----
    1: "use client";
    2: 
    3: 
    4: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    5: import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    6: /* =========================================================
    7:    ProductDetailClient.tsx
    8:    鎭掓案杈惧畼缃戯綔涓枃浜у搧璇︽儏椤?
    9: 
   10:    閲嶈璇存槑锛?
   11:    1. 椤甸潰缁撴瀯涓ユ牸鎸夌収鐢ㄦ埛鎻愪緵鐨?HTML 杞崲銆?
   12:    2. 鏈粡瑕佹眰锛屼笉璋冩暣鍘熷甯冨眬銆侀棿璺濄€佸瓧鍙蜂笌瑙嗚銆?
   13:    3. 褰撳墠鏄庣‘鏀瑰姩浠呭寘鎷細
   14:       - 涓诲瀷鍙?EA-100-PMMA
   15:       - 娣诲姞瑙勬牸涔︽寜閽?
   16:       - 鐢宠3D鏂囦欢鎸夐挳
   17:       - 涓枃涓嶆樉绀轰繚淇?
   18:       - 涓诲浘鎮仠鏀惧ぇ
   19:       - 鎵€鏈変笟鍔℃寜閽彧鐣欑鍙?
   20: ========================================================= */
   21: 
   22: import SitePageShell from "@/components/layout/SitePageShell";
   23: import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
   24: import { useMemo, useState } from "react";
   25: 

----- 第 21 行至第 51 行 -----
   21: 
   22: import SitePageShell from "@/components/layout/SitePageShell";
   23: import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
   24: import { useMemo, useState } from "react";
   25: 
   26: import type { CSSProperties, MouseEvent } from "react";
   27: import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
   28: import ProductModelViewer from "./ProductModelViewer";
   29: import styles from "./product-detail.module.css";
   30: 
   31: type ProductDetailTab = "spec" | "model3d" | "drawing";
   32: 
   33: type ProductDetailClientProps = {
   34:   data: ProductDetailPageData & Record<string, any>;
   35: };
   36: 
   37: type ZoomStyle = CSSProperties & {
   38:   "--zoom-x"?: string;
   39:   "--zoom-y"?: string;
   40: };
   41: 
   42: function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
   43:   const normalizedConfiguredUrl = configuredUrl?.trim();
   44: 
   45:   if (normalizedConfiguredUrl) {
   46:     return normalizedConfiguredUrl.includes("#")
   47:       ? normalizedConfiguredUrl
   48:       : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
   49:   }
   50: 
   51:   const normalizedSlug = slug.trim().toLowerCase();

----- 第 294 行至第 324 行 -----
  294:         <div className={styles.plungerBottomCtaText}>
  295:           <h2>{cta.title}</h2>
  296:           <p>{cta.desc}</p>
  297:         </div>
  298:         <a className={styles.plungerBottomCtaButton} href={cta.href}>
  299:           {cta.button}
  300:         </a>
  301:       </div>
  302:     </section>
  303:   );
  304: }
  305: 
  306: export default function ProductDetailClient({
  307:   data,
  308: }: ProductDetailClientProps) {
  309:     const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();
  310: 
  311: const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  312:   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  313:   const [activeThumb, setActiveThumb] = useState(0);
  314:   const [isZooming, setIsZooming] = useState(false);
  315:   const [zoomPosition, setZoomPosition] = useState({
  316:     x: 50,
  317:     y: 50,
  318:   });
  319: 
  320:   const realImages = useMemo(() => {
  321:     const images: string[] = [];
  322: 
  323:     if (data.mainImage) {
  324:       images.push(data.mainImage);

----- 第 296 行至第 326 行 -----
  296:           <p>{cta.desc}</p>
  297:         </div>
  298:         <a className={styles.plungerBottomCtaButton} href={cta.href}>
  299:           {cta.button}
  300:         </a>
  301:       </div>
  302:     </section>
  303:   );
  304: }
  305: 
  306: export default function ProductDetailClient({
  307:   data,
  308: }: ProductDetailClientProps) {
  309:     const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();
  310: 
  311: const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  312:   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  313:   const [activeThumb, setActiveThumb] = useState(0);
  314:   const [isZooming, setIsZooming] = useState(false);
  315:   const [zoomPosition, setZoomPosition] = useState({
  316:     x: 50,
  317:     y: 50,
  318:   });
  319: 
  320:   const realImages = useMemo(() => {
  321:     const images: string[] = [];
  322: 
  323:     if (data.mainImage) {
  324:       images.push(data.mainImage);
  325:     }
  326: 

----- 第 779 行至第 809 行 -----
  779:           <div className={styles.productInfo}>
  780:             <div className={styles.titleGroup}>
  781:               <h1 className={styles.productModelTitle}>{data.model}</h1>
  782:             </div>
  783: 
  784:             <p className={styles.productDesc}>
  785:               {(data as any).description || (Array.isArray(data.advantages) ? data.advantages.join("") : "")}
  786:             </p>
  787: 
  788:             <div className={styles.application}>
  789:               <p className={styles.applicationTitle}>{getDbSectionTitle("applications", "甯歌搴旂敤锛?)}</p>
  790:               <p className={styles.applicationText}>
  791:                 {data.commonApplications.join("銆?)}
  792:               </p>
  793:             </div>
  794: 
  795:             <div className={styles.operationArea}>
  796:               <div data-product-model-row="true" className={styles.modelLine}>
  797:                 <div className={styles.modelCodeWrap}>
  798:                   <div className={styles.modelCodeText}>
  799:                     <span className={styles.modelLabel}>鍨嬪彿锛?/span>
  800:                     <span className={styles.modelCode}>{getDisplayModelText(data)}</span>
  801:                   </div>
  802:                   <button
  803:                     className={styles.button}
  804:                     type="button"
  805:                     onClick={() => {
  806:                       const href = getModelActionHref(data);
  807: 
  808:                       if (isCustomInquiryMode(data)) {
  809:                         window.location.href = href;

----- 第 830 行至第 860 行 -----
  830: 
  831:               <div data-product-action-grid="true" className={styles.actionRow}>
  832:                 {data.showDatasheetRequest ? (
  833:                   <button
  834:                     className={styles.button}
  835:                     type="button"
  836:                     onClick={handleAddDatasheet}
  837:                   >
  838:                     娣诲姞瑙勬牸涔?
  839:                   </button>
  840:                 ) : null}
  841: 
  842:                 {data.showDrawingRequest ? (
  843:                   <button
  844:                     className={styles.button}
  845:                     type="button"
  846:                     aria-pressed={isDetailDrawingSelected}
  847:                     onClick={handleAddDrawing}
  848:                   >
  849:                     {isDetailDrawingSelected ? "宸叉坊鍔犲浘绾? : "娣诲姞鍥剧焊"}
  850:                   </button>
  851:                 ) : null}
  852: 
  853:                 {data.show3DRequest ? (
  854:                   <button
  855:                     className={styles.button}
  856:                     type="button"
  857:                     onClick={handleRequest3DFile}
  858:                   >
  859:                     鐢宠3D鏂囦欢
  860:                   </button>

----- 第 921 行至第 951 行 -----
  921:                 styles.panel,
  922:                 activeTab === "spec" ? styles.isActive : "",
  923:               ]
  924:                 .filter(Boolean)
  925:                 .join(" ")}
  926:             >
  927:               <div
  928:                 className={[
  929:                   styles.panelBox,
  930:                   styles.specPanelClean,
  931:                 ].join(" ")}
  932:               >
  933:                 <table className={styles.specTable}>
  934:                   <tbody>
  935:                     {data.specs.map((item) => (
  936:                       <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
  937:                         <th>{item.label}</th>
  938:                         <td>{item.value}</td>
  939:                       </tr>
  940:                     ))}
  941:                   </tbody>
  942:                 </table>
  943:               </div>
  944:             </div>
  945: 
  946:             <div
  947:               className={[
  948:                 styles.panel,
  949:                 activeTab === "model3d" ? styles.isActive : "",
  950:               ]
  951:                 .filter(Boolean)

----- 第 923 行至第 953 行 -----
  923:               ]
  924:                 .filter(Boolean)
  925:                 .join(" ")}
  926:             >
  927:               <div
  928:                 className={[
  929:                   styles.panelBox,
  930:                   styles.specPanelClean,
  931:                 ].join(" ")}
  932:               >
  933:                 <table className={styles.specTable}>
  934:                   <tbody>
  935:                     {data.specs.map((item) => (
  936:                       <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
  937:                         <th>{item.label}</th>
  938:                         <td>{item.value}</td>
  939:                       </tr>
  940:                     ))}
  941:                   </tbody>
  942:                 </table>
  943:               </div>
  944:             </div>
  945: 
  946:             <div
  947:               className={[
  948:                 styles.panel,
  949:                 activeTab === "model3d" ? styles.isActive : "",
  950:               ]
  951:                 .filter(Boolean)
  952:                 .join(" ")}
  953:             >
```


## 16. 产品详情页 CSS 关键摘录

```css
----- 第 1 行至第 16 行 -----
    1: /* =========================================================
    2:    product-detail.module.css
    3:    鎭掓案杈惧畼缃戯綔涓枃浜у搧璇︽儏椤?
    4: 
    5:    鏈枃浠朵弗鏍煎搴旂敤鎴锋彁渚涚殑 HTML 鏍峰紡銆?
    6:    闄ゅ浐瀹氶《閮ㄥ鑸墍闇€鐨勯《閮ㄥ亸绉诲锛屼笉璋冩暣鍘熷璁捐銆?
    7: ========================================================= */
    8: 
    9: .page {
   10:   --blue: #173368;
   11:   --blue-dark: #10264f;
   12:   --cyan: #09e9b4;
   13: 
   14:   --black: #111111;
   15:   --text: #263241;
   16:   --sub: #536274;

----- 第 59 行至第 81 行 -----
   59:   margin-top: 32px;
   60:   align-items: start;
   61: }
   62: 
   63: /* =========================================================
   64:    宸︿晶浜у搧鍥?
   65: ========================================================= */
   66: 
   67: .gallery {
   68:   width: 100%;
   69: }
   70: 
   71: .mainImage {
   72:   position: relative;
   73:   display: flex;
   74:   width: 100%;
   75:   height: 360px;
   76:   overflow: visible;
   77:   align-items: center;
   78:   justify-content: center;
   79:   border: 0;
   80:   background: #ffffff;
   81:   cursor: zoom-in;

----- 第 201 行至第 223 行 -----
  201:   padding-top: 8px;
  202: }
  203: 
  204: .titleGroup {
  205:   padding-bottom: 18px;
  206:   border-bottom: 1px solid var(--line-light);
  207: }
  208: 
  209: .productModelTitle {
  210:   margin: 0;
  211:   color: var(--blue);
  212:   font-size: 38px;
  213:   line-height: 1.08;
  214:   font-weight: 900;
  215:   letter-spacing: -0.035em;
  216: }
  217: 
  218: .productName {
  219:   margin: 8px 0 0;
  220:   color: #111111;
  221:   font-size: 24px;
  222:   line-height: 1.2;
  223:   font-weight: 800;

----- 第 228 行至第 250 行 -----
  228:   max-width: 640px;
  229:   margin: 18px 0 0;
  230:   color: #111111;
  231:   font-size: 17px;
  232:   line-height: 1.72;
  233:   font-weight: 400;
  234: }
  235: 
  236: .application {
  237:   margin-top: 28px;
  238: }
  239: 
  240: .applicationTitle {
  241:   margin: 0;
  242:   color: #111111;
  243:   font-size: 24px;
  244:   line-height: 1.35;
  245:   font-weight: 700;
  246: }
  247: 
  248: .applicationText {
  249:   margin: 8px 0 0;
  250:   color: #111111;

----- 第 232 行至第 254 行 -----
  232:   line-height: 1.72;
  233:   font-weight: 400;
  234: }
  235: 
  236: .application {
  237:   margin-top: 28px;
  238: }
  239: 
  240: .applicationTitle {
  241:   margin: 0;
  242:   color: #111111;
  243:   font-size: 24px;
  244:   line-height: 1.35;
  245:   font-weight: 700;
  246: }
  247: 
  248: .applicationText {
  249:   margin: 8px 0 0;
  250:   color: #111111;
  251:   font-size: 24px;
  252:   line-height: 1.65;
  253:   font-weight: 400;
  254: }

----- 第 240 行至第 262 行 -----
  240: .applicationTitle {
  241:   margin: 0;
  242:   color: #111111;
  243:   font-size: 24px;
  244:   line-height: 1.35;
  245:   font-weight: 700;
  246: }
  247: 
  248: .applicationText {
  249:   margin: 8px 0 0;
  250:   color: #111111;
  251:   font-size: 24px;
  252:   line-height: 1.65;
  253:   font-weight: 400;
  254: }
  255: 
  256: /* =========================================================
  257:    鍨嬪彿涓庢搷浣滃尯
  258: ========================================================= */
  259: 
  260: .operationArea {
  261:   margin-top: 52px;
  262:   padding-top: 24px;

----- 第 258 行至第 280 行 -----
  258: ========================================================= */
  259: 
  260: .operationArea {
  261:   margin-top: 52px;
  262:   padding-top: 24px;
  263:   border-top: 1px solid var(--line-light);
  264: }
  265: 
  266: .modelLine {
  267:   display: flex;
  268:   flex-wrap: wrap;
  269:   align-items: center;
  270:   justify-content: flex-start;
  271:   gap: 18px;
  272: }
  273: 
  274: .modelCodeWrap {
  275:   display: flex;
  276:   min-width: 0;
  277:   align-items: baseline;
  278:   gap: 10px;
  279:   white-space: nowrap;
  280: }

----- 第 266 行至第 288 行 -----
  266: .modelLine {
  267:   display: flex;
  268:   flex-wrap: wrap;
  269:   align-items: center;
  270:   justify-content: flex-start;
  271:   gap: 18px;
  272: }
  273: 
  274: .modelCodeWrap {
  275:   display: flex;
  276:   min-width: 0;
  277:   align-items: baseline;
  278:   gap: 10px;
  279:   white-space: nowrap;
  280: }
  281: 
  282: .modelLabel {
  283:   color: #111111;
  284:   font-size: 24px;
  285:   line-height: 1.15;
  286:   font-weight: 500;
  287:   white-space: nowrap;
  288: }

----- 第 274 行至第 296 行 -----
  274: .modelCodeWrap {
  275:   display: flex;
  276:   min-width: 0;
  277:   align-items: baseline;
  278:   gap: 10px;
  279:   white-space: nowrap;
  280: }
  281: 
  282: .modelLabel {
  283:   color: #111111;
  284:   font-size: 24px;
  285:   line-height: 1.15;
  286:   font-weight: 500;
  287:   white-space: nowrap;
  288: }
  289: 
  290: .modelCode {
  291:   display: inline-block;
  292:   padding: 0;
  293:   border: 0;
  294:   background: transparent;
  295:   color: #111111;
  296:   font-size: 28px;

----- 第 282 行至第 304 行 -----
  282: .modelLabel {
  283:   color: #111111;
  284:   font-size: 24px;
  285:   line-height: 1.15;
  286:   font-weight: 500;
  287:   white-space: nowrap;
  288: }
  289: 
  290: .modelCode {
  291:   display: inline-block;
  292:   padding: 0;
  293:   border: 0;
  294:   background: transparent;
  295:   color: #111111;
  296:   font-size: 28px;
  297:   line-height: 1.15;
  298:   font-weight: 500;
  299:   letter-spacing: 0.01em;
  300:   white-space: nowrap;
  301: }
  302: 
  303: .button {
  304:   min-width: 150px;

----- 第 327 行至第 349 行 -----
  327: 
  328: .actionRow {
  329:   display: grid;
  330:   grid-template-columns: repeat(4, 1fr);
  331:   margin-top: 24px;
  332:   gap: 20px;
  333: }
  334: 
  335: .modelLine .button {
  336:   width: auto;
  337:   min-width: 136px;
  338:   flex: 0 0 auto;
  339: }
  340: 
  341: /* =========================================================
  342:    涓嬫柟璧勬枡 Tab
  343: ========================================================= */
  344: 
  345: .detailSection {
  346:   margin-top: 64px;
  347: }
  348: 
  349: .tabNav {

----- 第 337 行至第 359 行 -----
  337:   min-width: 136px;
  338:   flex: 0 0 auto;
  339: }
  340: 
  341: /* =========================================================
  342:    涓嬫柟璧勬枡 Tab
  343: ========================================================= */
  344: 
  345: .detailSection {
  346:   margin-top: 64px;
  347: }
  348: 
  349: .tabNav {
  350:   display: flex;
  351:   height: 48px;
  352:   align-items: flex-end;
  353:   justify-content: center;
  354:   gap: 68px;
  355:   border-bottom: 1px solid var(--line);
  356: }
  357: 
  358: .tabButton {
  359:   position: relative;

----- 第 414 行至第 436 行 -----
  414: 
  415: .specPanelClean {
  416:   min-height: 0;
  417:   padding: 0;
  418:   border: 0;
  419:   background: #ffffff;
  420: }
  421: 
  422: .specTable {
  423:   width: 100%;
  424:   border: 1px solid #cbd5e3;
  425:   border-collapse: collapse;
  426:   table-layout: fixed;
  427:   background: #ffffff;
  428:   font-size: 15px;
  429: }
  430: 
  431: .specTable tr {
  432:   border-bottom: 1px solid #cbd5e3;
  433: }
  434: 
  435: .specTable tr:last-child {
  436:   border-bottom: 0;

----- 第 423 行至第 445 行 -----
  423:   width: 100%;
  424:   border: 1px solid #cbd5e3;
  425:   border-collapse: collapse;
  426:   table-layout: fixed;
  427:   background: #ffffff;
  428:   font-size: 15px;
  429: }
  430: 
  431: .specTable tr {
  432:   border-bottom: 1px solid #cbd5e3;
  433: }
  434: 
  435: .specTable tr:last-child {
  436:   border-bottom: 0;
  437: }
  438: 
  439: .specTable th,
  440: .specTable td {  font-weight: 500;
  441:   color: #111111;
  442: 
  443:   padding: 10px 16px;
  444:   border-right: 1px solid #cbd5e3;
  445:   line-height: 1.35;

----- 第 427 行至第 449 行 -----
  427:   background: #ffffff;
  428:   font-size: 15px;
  429: }
  430: 
  431: .specTable tr {
  432:   border-bottom: 1px solid #cbd5e3;
  433: }
  434: 
  435: .specTable tr:last-child {
  436:   border-bottom: 0;
  437: }
  438: 
  439: .specTable th,
  440: .specTable td {  font-weight: 500;
  441:   color: #111111;
  442: 
  443:   padding: 10px 16px;
  444:   border-right: 1px solid #cbd5e3;
  445:   line-height: 1.35;
  446:   text-align: left;
  447:   vertical-align: middle;
  448: }
  449: 
……已达到最大摘录数量，后续省略
```


## 17. app/products/page.tsx 内容

```tsx
/* =========================================================
   page.tsx
   鎭掓案杈惧畼缃戯綔涓枃浜у搧涓績鍏ュ彛椤?
   鏂囦欢璺緞锛?   app/products/page.tsx

   璇存槑锛?   1. 瀵瑰簲涓枃榛樿浜у搧涓績璺緞锛?products
   2. 涓枃椤甸潰涓嶅姞 /zh-CN 璺緞鍓嶇紑
   3. 椤甸潰缁撴瀯浜ょ粰 ProductSelectionClient 娓叉煋
   4. 褰撳墠闃舵浜у搧涓績鏁版嵁鏉ヨ嚜鏈湴闈欐€佹暟鎹笌 generated 鏁版嵁
   5. 鍚庣画濡傛灉鎺ュ悗绔?/ CMS / 鏁版嵁搴擄紝浼樺厛鏀?service 鎴?data 灞?========================================================= */

import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import "./products.css";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient locale="zh" />
    </Suspense>
  );
}

```


## 18. app/[locale]/products/page.tsx 内容

```tsx
/* =========================================================
   page.tsx
   鎭掓案杈惧畼缃戯綔澶氳瑷€浜у搧涓績閫夊瀷椤靛叆鍙?
   鏂囦欢璺緞锛?   app/[locale]/products/page.tsx

   璇存槑锛?   1. 澶栬浜у搧涓績璺緞锛?      /en/products
      /es/products
      /fr/products
      /ko/products
      /ru/products
   2. 涓枃榛樿璺緞涓嶅姞 /zh-CN锛屼腑鏂囦骇鍝佷腑蹇冧负 /products
   3. 褰撳墠澶栬浜у搧涓績浣跨敤 ProductSelectionClient 娓叉煋
   4. 浜у搧鍗＄墖璇︽儏閾炬帴鐩墠缁熶竴璺宠浆鍒颁腑鏂囨寮忚鎯呴〉锛?      /products/pumps/plunger-pumps/[slug]
   5. 鍚庣画濡傛灉鏂板澶栬浜у搧璇︽儏椤碉紝鍐嶅崟鐙鍔狅細
      app/[locale]/products/pumps/plunger-pumps/[slug]/page.tsx
========================================================= */

import { Suspense } from "react";
import { notFound } from "next/navigation";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";

type ProductSelectionLocale = "en" | "es" | "fr" | "ko" | "ru";
import "@/app/products/products.css";

const PRODUCT_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type ProductLocale = (typeof PRODUCT_LOCALES)[number];

type ProductsLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return PRODUCT_LOCALES.map((locale) => ({
    locale,
  }));
}

export default async function ProductsLocalePage({
  params,
}: ProductsLocalePageProps) {
  const { locale } = await params;

  if (!PRODUCT_LOCALES.includes(locale as ProductLocale)) {
    notFound();
  }
const productSelectionLocale =
    locale === "en" ||
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
      ? (locale as ProductSelectionLocale)
      : "en";

  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient locale={productSelectionLocale} />
    </Suspense>
  );
}

```


## 19. package.json 内容

```json
{
  "name": "foreach-website-2026",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "products:build-data": "node ./scripts/products/build-product-selection-data.js",
    "products:check-data": "node ./scripts/products/check-product-selection-data.js",
    "products:update": "npm run products:build-data && npm run products:check-data",
    "products:build-plunger-detail": "node ./scripts/products/build-plunger-pump-detail-data.js",
    "build:pump-series-data": "node scripts/products/build-pump-series-data.js && node scripts/products/apply-pump-series-faq-scope.js && node scripts/products/fix-pump-series-image-assets.js && node scripts/products/fix-pump-series-selection-card-assets.js",
    "generate:diaphragm-pumps": "node scripts/products/generate-diaphragm-pump-data.js"
  },
  "dependencies": {
    "@google/model-viewer": "^4.3.1",
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "tsx": "^4.22.4",
    "typescript": "^5"
  }
}

```


## 20. 下一步需要判断的问题

| 检查项 | 结论 |
| --- | --- |
| 是否已有 /products/valves 路由 | 待根据扫描内容判断 |
| 是否已有阀系列一级分类 | 待根据扫描内容判断 |
| 是否已有旋转阀数据 | 待根据扫描内容判断 |
| 是否已有高压阀数据 | 待根据扫描内容判断 |
| 是否已有电磁阀数据 | 待根据扫描内容判断 |
| 是否需要新增 data/products/generated/valves | 待根据扫描内容判断 |
| 是否需要新增 services/products/valves | 待根据扫描内容判断 |
| 是否需要修复 ProductDetailClient 默认值 | 待根据扫描内容判断 |
| 是否需要同步外语页面 | 待根据扫描内容判断 |