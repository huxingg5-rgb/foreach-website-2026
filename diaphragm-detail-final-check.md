# 隔膜泵详情页最终检查

## 1. Git 状态

 M app/products/products.css
 M components/products/detail/product-detail.module.css
 M components/products/selection/ProductCardGrid.tsx
 M components/products/selection/ProductFilterPanel.tsx
 M components/products/selection/ProductSelectionCard.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/selection-cart/GlobalSelectionCartDrawer.tsx
 M components/selection-cart/SelectionCartProvider.tsx
 M components/selection-cart/selection-cart.types.ts
 M data/products/selection/product-route-map.ts
 M data/products/selection/product-type-intro.ts
 M package.json
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_card_actions_20260706_145558
?? app/products/products.css.bak_card_actions_continue_20260706_145741
?? app/products/products.css.bak_diaphragm_card_style_20260706_211722
?? app/products/products.css.bak_diaphragm_subtitle_multiline_20260706_212104
?? app/products/products.css.bak_drawing_cart_only_20260706_151114
?? app/products/products.css.bak_final_detail_cart_20260706_163743
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? app/products/products.css.bak_overall_fix_20260706_162940
?? app/products/products.css.bak_remove_wrong_top_controls_20260706_220032
?? app/products/pumps/diaphragm-pumps/
?? check-diaphragm-xlsx.js
?? components/products/detail/product-detail.module.css.bak_application_content_18px_20260706_223105
?? components/products/detail/product-detail.module.css.bak_fix_application_content_smaller_20260706_223014
?? components/products/detail/product-detail.module.css.bak_fix_common_application_same_as_desc_20260706_222853
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
?? components/products/selection/ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_filter_labels_20260706_213305
?? components/products/selection/ProductSelectionClient.tsx.bak_add_diaphragm_medium_filter_20260706_212928
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
?? "data-source/product-center/pumps/FOREACH_\351\232\224\350\206\234\346\263\265\347\263\273\345\210\227_\344\272\247\345\223\201\346\225\260\346\215\256\346\272\220.xlsx"
?? data/products/generated/pumps/diaphragm-pumps/
?? data/products/selection/diaphragm-pump-selection.generated.ts
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_force_8_model_links_20260706144122
?? data/products/selection/diaphragm-pump-selection.generated.ts.bak_patch_8_model_detail_slug_20260706144617
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-route-map.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_filter_20260706_212515
?? data/products/selection/product-route-map.ts.bak_fix_diaphragm_medium_routes_safe_20260706_212652
?? data/products/selection/product-route-map.ts.bak_fix_series_insert_position_20260706_212801
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_text_20260706140919
?? data/products/selection/product-type-intro.ts.bak_diaphragm_intro_three_types_20260706141622
?? data/products/selection/product-type-intro.ts.bak_fix_diaphragm_intro_text_20260706_220635
?? data/products/selection/product-type-intro.ts.bak_remove_detail_text_20260706_161958
?? detail-route-files-check.md
?? diaphragm-detail-final-check.md
?? diaphragm-detail-vs-plunger-detail-check.md
?? diaphragm-pump-filter-fix-context.md
?? diaphragm-pump-selection-inspect.txt
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
?? scripts/products/generate-diaphragm-pump-data.js
?? selection_cart_overall_audit.md
?? "\357\200\272"
?? "\357\200\272s\357\200\252subtitles\357\200\252\357\200\277s\357\200\252[s\357\200\252subtitles\357\200\252]s\357\200\252\357\200\272s\357\200\252[s\357\200\252],',"

---

## 2. 8 个配置级详情页是否存在

閰嶇疆绾ц鎯呴〉鏁伴噺: 8

slug: dpl30-24db-ep-ps-liquid-diaphragm-pump
title: DPL30-24DB-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL30-24DB-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL30-24DB-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ湁鍒风數鏈猴紝閫傜敤浜庤嚜鍔ㄥ寲浠櫒娑茶矾涓殑娓呮礂娑茶緭閫併€佽瘯鍓傝浆绉汇€佸簾娑叉娊鎺掋€佺璺鍏呭拰灏忔祦閲忔恫浣撳惊鐜€傝閰嶇疆棰濆畾娴侀噺 300 mL/min锛岄瀹氬帇鍔?100 kPa锛岄€傚悎瀵圭粨鏋勭揣鍑戙€佸熀纭€杈撻€佹€ц兘鍜屾垚鏈帶鍒舵湁瑕佹眰鐨?IVD銆佺敓鍛界瀛︺€佸疄楠屽鑷姩鍖栧拰鍒嗘瀽妫€娴嬭澶囥€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459001

slug: dpl30-24bb-ep-ps-liquid-diaphragm-pump
title: DPL30-24BB-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL30-24BB-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL30-24BB-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ棤鍒风數鏈猴紝闈㈠悜闇€瑕侀暱鏈熺ǔ瀹氳繍琛岀殑鑷姩鍖栦华鍣ㄦ恫璺紝鍙敤浜庢竻娲楁恫杈撻€併€佽瘯鍓傝浆绉汇€佸簾娑叉娊鎺掋€佺璺鍏呭拰灏忔祦閲忔恫浣撳惊鐜€傝閰嶇疆棰濆畾娴侀噺 300 mL/min锛岄瀹氬帇鍔?100 kPa锛岀浉姣旀湁鍒风數鏈虹増鏈洿閫傚悎瀵瑰鍛姐€佺ǔ瀹氭€у拰缁存姢棰戠巼鏈夎姹傜殑璁惧骞冲彴銆傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459002

slug: dpl60-24db-ep-ps-liquid-diaphragm-pump
title: DPL60-24DB-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL60-24DB-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL60-24DB-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ湁鍒风數鏈猴紝閫傜敤浜庤嚜鍔ㄥ寲浠櫒涓祦閲忛渶姹傛洿楂樼殑娓呮礂娑茶緭閫併€佸簾娑叉娊鎺掋€佽瘯鍓傝浆绉诲拰娑蹭綋寰幆鍦烘櫙銆傝閰嶇疆棰濆畾娴侀噺 600 mL/min锛岄瀹氬帇鍔?100 kPa锛岄€傚悎闇€瑕佹彁鍗囪緭閫佹晥鐜囷紝鍚屾椂鍏虫敞鎴愭湰鍜岀粨鏋勯泦鎴愮┖闂寸殑 IVD銆佸疄楠屽鑷姩鍖栥€佺敓鍛界瀛﹀拰鍒嗘瀽妫€娴嬭澶囥€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459003

slug: dpl60-24bb-ep-ps-liquid-diaphragm-pump
title: DPL60-24BB-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL60-24BB-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL60-24BB-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ棤鍒风數鏈猴紝閫傜敤浜庨渶瑕佷腑绛夋祦閲忓拰闀挎椂闂磋繍琛岀ǔ瀹氭€х殑鑷姩鍖栦华鍣ㄦ恫璺紝鍙敤浜庢竻娲楁恫杈撻€併€佸簾娑叉娊鎺掋€佽瘯鍓傝浆绉诲拰寰幆娑茶矾銆傝閰嶇疆棰濆畾娴侀噺 600 mL/min锛岄瀹氬帇鍔?100 kPa锛岄€傚悎瀵规祦閲忋€佸鍛姐€佽繍琛岀ǔ瀹氭€у拰浣庣淮鎶よ姹傝緝楂樼殑 IVD銆佸疄楠屽鑷姩鍖栧拰鍒嗘瀽妫€娴嬭澶囥€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459004

slug: dpl30h-24ds-ep-ps-liquid-diaphragm-pump
title: DPL30H-24DS-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL30H-24DS-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL30H-24DS-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ湁鍒风數鏈猴紝閫傜敤浜庡杈撳嚭鍘嬪姏瑕佹眰鏇撮珮鐨勮嚜鍔ㄥ寲浠櫒娑茶矾锛屽彲鐢ㄤ簬娓呮礂娑茶緭閫併€佽瘯鍓傝浆绉汇€佺璺鍏呫€佸簾娑叉娊鎺掑拰杈冮珮鍘嬪姏娑蹭綋杈撻€併€傝閰嶇疆棰濆畾娴侀噺 300 mL/min锛岄瀹氬帇鍔?600 kPa锛岄€傚悎闇€瑕佸寮鸿€愬帇鑳藉姏锛屽悓鏃跺吋椤炬垚鏈帶鍒剁殑 IVD銆佺敓鍛界瀛﹀拰鍒嗘瀽妫€娴嬭澶囥€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459007

slug: dpl30h-24bs-ep-ps-liquid-diaphragm-pump
title: DPL30H-24BS-EP/PS 娑蹭綋闅旇啘娉?modelDisplay: DPL30H-24BS-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPL30H-24BS-EP/PS 娑蹭綋闅旇啘娉甸噰鐢ㄦ棤鍒风數鏈猴紝闈㈠悜杈冮珮鍘嬪姏鍜岄暱鏈熻繍琛岃姹傜殑鑷姩鍖栦华鍣ㄦ恫璺紝鍙敤浜庢竻娲楁恫杈撻€併€佽瘯鍓傝浆绉汇€佸簾娑叉娊鎺掋€佺璺鍏呭拰鍘嬪姏瑕佹眰鏇撮珮鐨勬恫浣撹緭閫佸満鏅€傝閰嶇疆棰濆畾娴侀噺 300 mL/min锛岄瀹氬帇鍔?600 kPa锛岄€傚悎瀵硅€愬帇銆佸鍛姐€佺ǔ瀹氭€у拰缁存姢鍛ㄦ湡瑕佹眰杈冮珮鐨?IVD銆佺敓鍛界瀛︺€佸疄楠屽鑷姩鍖栧拰鍒嗘瀽妫€娴嬭澶囥€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459008

slug: dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump
title: DPGL800-24BS6-EP/PS 姘旀恫娣峰悎闅旇啘娉?modelDisplay: DPGL800-24BS6-EP/PS
button: 鍨嬪彿閫夋嫨
description: DPGL800-24BS6-EP/PS 姘旀恫娣峰悎闅旇啘娉甸€傜敤浜庤嚜鍔ㄥ寲浠櫒涓殑姘旀恫娣峰悎浠嬭川鎶芥帓銆佸簾娑叉娊鍚搞€佺璺帓绌恒€佽礋鍘嬫娊鍚稿拰姘旀恫娣峰悎娑茶矾澶勭悊銆傝閰嶇疆閲囩敤鏃犲埛鐢垫満锛岄瀹氭祦閲?6 L/min锛岄瀹氬帇鍔?30 kPa锛岄€傚悎 IVD銆佸疄楠屽鑷姩鍖栥€佺敓鍛界瀛﹀拰鍒嗘瀽妫€娴嬭澶囦腑鐨勫簾娑插鐞嗕笌姘旀恫娣峰悎杈撻€佹ā鍧椼€傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459039

slug: dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump
title: DPGL800-24BS6-FF/PS 姘旀恫娣峰悎闅旇啘娉?modelDisplay: DPGL800-24BS6-FF/PS
button: 鍨嬪彿閫夋嫨
description: DPGL800-24BS6-FF/PS 姘旀恫娣峰悎闅旇啘娉甸€傜敤浜庢皵娑叉贩鍚堜粙璐ㄦ娊鎺掋€佸簾娑叉娊鍚搞€佺璺帓绌恒€佽礋鍘嬫娊鍚镐互鍙婂鏉愭枡鍏煎鎬ц姹傛洿楂樼殑鑷姩鍖栦华鍣ㄦ恫璺€傝閰嶇疆閲囩敤鏃犲埛鐢垫満锛岄瀹氭祦閲?6 L/min锛岄瀹氬帇鍔?30 kPa锛屽苟閲囩敤 FF/PS 鏉愯川缁勫悎锛岄€傚悎 IVD銆佸疄楠屽鑷姩鍖栥€佺敓鍛界瀛﹀拰鍒嗘瀽妫€娴嬭澶囦腑鐨勫簾娑蹭笌姘旀恫娣峰悎娑茶矾銆傚闇€杩涗竴姝ョ‘璁ら厤缃紝鍙偣鍑烩€滃瀷鍙烽€夋嫨鈥濓紝鎸夋车绫诲瀷銆佹祦閲忋€佽€愬帇銆佺數鏈虹被鍨嬨€佽啘鐗囨潗璐ㄣ€侀榾鐗囨潗璐ㄥ拰娉靛ご鏉愯川杩涜绛涢€夛紝骞堕€夋嫨鍚堥€傚瀷鍙枫€?models: 459040

---

## 3. 8 张卡片是否指向配置级详情页


### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 13

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30-liquid-diaphragm-pump",
    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 15

    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 16

    "detailSlug": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24DB-EP/PS",
      "en": "DPL30-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30 brushed liquid diaphragm pump, 300 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 79

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30-liquid-diaphragm-pump",
    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 81

    "seriesSlug": "dpl30-liquid-diaphragm-pump",
    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 82

    "detailSlug": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30-24BB-EP/PS",
      "en": "DPL30-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30 brushless liquid diaphragm pump, 300 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 145

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl60-liquid-diaphragm-pump",
    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 147

    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 148

    "detailSlug": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24DB-EP/PS",
      "en": "DPL60-24DB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n600 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n600 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL60 brushed liquid diaphragm pump, 600 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 211

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl60-liquid-diaphragm-pump",
    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 213

    "seriesSlug": "dpl60-liquid-diaphragm-pump",
    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 214

    "detailSlug": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL60-24BB-EP/PS",
      "en": "DPL60-24BB-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n600 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n600 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL60 brushless liquid diaphragm pump, 600 mL/min, 100 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 277

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30h-liquid-diaphragm-pump",
    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 279

    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 280

    "detailSlug": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24DS-EP/PS",
      "en": "DPL30H-24DS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "有刷电机\n300 mL/min\n寿命 3000 h",
      "en": "Brushed motor\n300 mL/min\nService life 3000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30H brushed liquid diaphragm pump, 300 mL/min, 600 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 343

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpl30h-liquid-diaphragm-pump",
    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 345

    "seriesSlug": "dpl30h-liquid-diaphragm-pump",
    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 346

    "detailSlug": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPL30H-24BS-EP/PS",
      "en": "DPL30H-24BS-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n300 mL/min\n寿命 10000 h",
      "en": "Brushless motor\n300 mL/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPL30H brushless liquid diaphragm pump, 300 mL/min, 600 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 409

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpgl800-gas-liquid-diaphragm-pump",
    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 411

    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 412

    "detailSlug": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-EP/PS",
      "en": "DPGL800-24BS6-EP/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPGL800 brushless gas liquid diaphragm pump, 6 L/min, +30 kPa and below -90 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 475

    "productTypeSlug": "diaphragm-pumps",
    "seriesId": "dpgl800-gas-liquid-diaphragm-pump",
    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 477

    "seriesSlug": "dpgl800-gas-liquid-diaphragm-pump",
    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 478

    "detailSlug": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    "cardTitle": {
      "zh": "DPGL800-24BS6-FF/PS",
      "en": "DPGL800-24BS6-FF/PS"
    },
    "cardSubtitle": {
      "zh": "无刷电机\n6 L/min\n寿命 10000 h",
      "en": "Brushless motor\n6 L/min\nService life 10000 h"
    },
    "imageCard": "",
    "imageAlt": {
      "zh": "DPGL800 brushless gas liquid diaphragm pump, 6 L/min, +30 kPa and below -90 kPa",

### F:\WebsiteProjects\foreach-website-2026\data\products\selection\diaphragm-pump-selection.generated.ts Line 543

      "zh": "隔膜泵",
      "en": "Diaphragm Pumps"
    },
    "href": "/products/pumps/diaphragm-pumps",
    "enabled": true,
    "order": 20
  }
] as any[];

export const diaphragmPumpFilterLabels = [
  {
    "productTypeId": "diaphragm-pump",

---

## 4. 查看详情是否新开页面


### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 9

import type { ProductSelectionProductItem } from "./product-selection-ui.types";

type ProductCardGridProps = {
  products: ProductSelectionProductItem[];
  selectedList: ReadonlySet<string>;
  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

export default function ProductCardGrid({
  products,
  selectedList,
  detailButtonText,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 14

  detailButtonText: string;
  addToListText: string;
  addedToListText: string;
  getTitle: (product: ProductSelectionProductItem) => string;
  getSubtitle: (product: ProductSelectionProductItem) => string;
  getDetailHref: (product: ProductSelectionProductItem) => string;
  onToggleList: (product: ProductSelectionProductItem) => void;
};

export default function ProductCardGrid({
  products,
  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 21

};

export default function ProductCardGrid({
  products,
  selectedList,
  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 26

  detailButtonText,
  addToListText,
  addedToListText,
  getTitle,
  getSubtitle,
  getDetailHref,
  onToggleList,
}: ProductCardGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title = getTitle(product);
        const subtitle = getSubtitle(product);

        return (
          <ProductSelectionCard
            product={product}
            title={title}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 40

        return (
          <ProductSelectionCard
            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}
          />
        );
      })}
    </div>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductCardGrid.tsx Line 42

            product={product}
            title={title}
            subtitle={subtitle}
            detailHref={getDetailHref(product)}
            isAdded={selectedList.has(product.productId)}
            detailButtonText={detailButtonText}
            addToListText={addToListText}
            addedToListText={addedToListText}
            key={product.productId}
            onToggleList={onToggleList}
          />
        );
      })}
    </div>
  );
}

---

## 5. 规格表是否存在重复来源


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 728

                  styles.panelBox,
                  styles.specPanelClean,
                ].join(" ")}
              >
                <table className={styles.specTable}>
                  <tbody>
                    {data.specs.map((item) => (
                      <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
                        <th>{item.label}</th>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 730

                ].join(" ")}
              >
                <table className={styles.specTable}>
                  <tbody>
                    {data.specs.map((item) => (
                      <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
                        <th>{item.label}</th>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 185

    .filter((item) => item.label && item.value);
}


function normalizeSpecGroupTitle(value: unknown) {
  const title = getText(value);

  /*
   * ProductDetailClient 外层已经显示“规格参数”。
   * 如果数据分组标题也叫“规格参数”，页面会出现重复标题。
   * 这里仅针对隔膜泵详情页做显示层归一，不改原始参数数据。
   */
  if (!title || title === "规格参数") {
    return "技术参数";
  }

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 201

  return title;
}


function dedupeSpecifications<T extends { label?: string; name?: string; title?: string; value?: string; content?: string; note?: string; remark?: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = [
      item.label || item.name || item.title || "",
      item.value || item.content || "",
      item.note || item.remark || "",
    ]
      .map((value) => String(value).trim())
      .join("||");

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 230

function groupSpecifications(detail: DiaphragmDetail) {
  const map = new Map<string, DiaphragmSpec[]>();

  (detail.specifications || []).forEach((item) => {
    const key = normalizeSpecGroupTitle(item.tableName);
    const rows = map.get(key) || [];
    rows.push(item);
    map.set(key, rows);
  });

  const groups = Array.from(map.entries()).map(([title, rows]) => ({
    title,
    items: rows
      .map((item) => {
        const label = getText(item.parameter);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 314

  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl = findMediaUrlByType(detail, "主图");
  const drawing2dUrl = findMediaUrlByType(detail, "2D");
  const model3dUrl = findMediaUrlByType(detail, "3D");
  const curveImageUrl = findMediaUrlByType(detail, "曲线");
  const datasheetUrl = findMediaUrlByType(detail, "规格书");

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 315

  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl = findMediaUrlByType(detail, "主图");
  const drawing2dUrl = findMediaUrlByType(detail, "2D");
  const model3dUrl = findMediaUrlByType(detail, "3D");
  const curveImageUrl = findMediaUrlByType(detail, "曲线");
  const datasheetUrl = findMediaUrlByType(detail, "规格书");


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 387

        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 389


    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 390

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,

---

## 6. build 检查


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 6.0s
  Running TypeScript ...
  Finished TypeScript in 4.5s ...
  Collecting page data using 23 workers ...
  Generating static pages using 23 workers (0/577) ...
  Generating static pages using 23 workers (144/577) 
  Generating static pages using 23 workers (288/577) 
  Generating static pages using 23 workers (432/577) 
鉁?Generating static pages using 23 workers (577/577) in 2.1s
  Finalizing page optimization ...

Route (app)
鈹?鈼?/
鈹?鈼?/_not-found
鈹?鈼?/[locale]
鈹?鈹?/en
鈹?鈹?/es
鈹?鈹?/fr
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/culture
鈹?鈹?/en/about/culture
鈹?鈹?/es/about/culture
鈹?鈹?/fr/about/culture
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/foreach
鈹?鈹?/en/about/foreach
鈹?鈹?/es/about/foreach
鈹?鈹?/fr/about/foreach
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/history
鈹?鈹?/en/about/history
鈹?鈹?/es/about/history
鈹?鈹?/fr/about/history
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/quality
鈹?鈹?/en/about/quality
鈹?鈹?/es/about/quality
鈹?鈹?/fr/about/quality
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/research-manufacturing
鈹?鈹?/en/about/research-manufacturing
鈹?鈹?/es/about/research-manufacturing
鈹?鈹?/fr/about/research-manufacturing
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/analytical-instruments
鈹?鈹?/en/applications/analytical-instruments
鈹?鈹?/es/applications/analytical-instruments
鈹?鈹?/fr/applications/analytical-instruments
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/environmental-monitoring
鈹?鈹?/en/applications/environmental-monitoring
鈹?鈹?/es/applications/environmental-monitoring
鈹?鈹?/fr/applications/environmental-monitoring
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/ivd
鈹?鈹?/en/applications/ivd
鈹?鈹?/es/applications/ivd
鈹?鈹?/fr/applications/ivd
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/lab-automation
鈹?鈹?/en/applications/lab-automation
鈹?鈹?/es/applications/lab-automation
鈹?鈹?/fr/applications/lab-automation
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/life-science
鈹?鈹?/en/applications/life-science
鈹?鈹?/es/applications/life-science
鈹?鈹?/fr/applications/life-science
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/synthetic-biology
鈹?鈹?/en/applications/synthetic-biology
鈹?鈹?/es/applications/synthetic-biology
鈹?鈹?/fr/applications/synthetic-biology
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact
鈹?鈹?/en/contact
鈹?鈹?/es/contact
鈹?鈹?/fr/contact
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact/distributor
鈹?鈹?/en/contact/distributor
鈹?鈹?/es/contact/distributor
鈹?鈹?/fr/contact/distributor
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/products
鈹?鈹?/en/products
鈹?鈹?/es/products
鈹?鈹?/fr/products
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources
鈹?鈹?/en/resources
鈹?鈹?/es/resources
鈹?鈹?/fr/resources
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/datasheets
鈹?鈹?/en/resources/datasheets
鈹?鈹?/es/resources/datasheets
鈹?鈹?/fr/resources/datasheets
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide
鈹?鈹?/en/resources/installation-guide
鈹?鈹?/es/resources/installation-guide
鈹?鈹?/fr/resources/installation-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide/[slug]
鈹?鈹?/en/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/en/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/en/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+22 more paths]
鈹?鈼?/[locale]/resources/material-compatibility
鈹?鈹?/en/resources/material-compatibility
鈹?鈹?/es/resources/material-compatibility
鈹?鈹?/fr/resources/material-compatibility
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news
鈹?鈹?/en/resources/news
鈹?鈹?/es/resources/news
鈹?鈹?/fr/resources/news
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news/[slug]
鈹?鈹?/en/resources/news/adlm-2026
鈹?鈹?/en/resources/news/whx-labs-dubai-2026
鈹?鈹?/en/resources/news/gazelle-enterprise-2025
鈹?鈹?[+47 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement
鈹?鈹?/en/resources/selection-support/fitting-replacement
鈹?鈹?/es/resources/selection-support/fitting-replacement
鈹?鈹?/fr/resources/selection-support/fitting-replacement
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+172 more paths]
鈹?鈼?/[locale]/resources/technical-articles
鈹?鈹?/en/resources/technical-articles
鈹?鈹?/es/resources/technical-articles
鈹?鈹?/fr/resources/technical-articles
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/technical-articles/[slug]
鈹?鈹?/en/resources/technical-articles/selecting-microfluidic-fittings
鈹?鈹?/en/resources/technical-articles/peek-ptfe-pfa-material-differences
鈹?鈹?/en/resources/technical-articles/low-pressure-vs-high-pressure-fittings
鈹?鈹?[+57 more paths]
鈹?鈼?/about/culture
鈹?鈼?/about/foreach
鈹?鈼?/about/history
鈹?鈼?/about/quality
鈹?鈼?/about/research-manufacturing
鈹?鈼?/applications/analytical-instruments
鈹?鈼?/applications/environmental-monitoring
鈹?鈼?/applications/ivd
鈹?鈼?/applications/lab-automation
鈹?鈼?/applications/life-science
鈹?鈼?/applications/synthetic-biology
鈹?鈼?/contact
鈹?鈼?/contact/distributor
鈹?鈼?/products
鈹?鈼?/products/[category]
鈹?鈹?/products/pumps
鈹?鈼?/products/[category]/[slug]
鈹?鈹?/products/pumps/plunger-pumps
鈹?鈹?/products/pumps/diaphragm-pumps
鈹?鈹?/products/pumps/pipetting-pumps
鈹?鈹?[+17 more paths]
鈹?鈼?/products/[category]/[slug]/[seriesSlug]
鈹?鈹?/products/pumps/plunger-pumps/ea-standard-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/sm-miniature-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/tm-ultra-compact-piston-pumps
鈹?鈹?[+3 more paths]
鈹?鈼?/products/pumps/diaphragm-pumps/[slug]
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump
鈹?鈹?[+9 more paths]
鈹?鈼?/products/pumps/plunger-pumps/[slug]
鈹?鈹?/products/pumps/plunger-pumps/ea-100-pmma
鈹?鈹?/products/pumps/plunger-pumps/ea-100-peek
鈹?鈹?/products/pumps/plunger-pumps/ea-250-pmma
鈹?鈹?[+30 more paths]
鈹?鈼?/resources
鈹?鈼?/resources/datasheets
鈹?鈼?/resources/installation-guide
鈹?鈼?/resources/installation-guide/[slug]
鈹?鈹?/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/resources/material-compatibility
鈹?鈼?/resources/news
鈹?鈼?/resources/news/[slug]
鈹?鈹?/resources/news/adlm-2026
鈹?鈹?/resources/news/whx-labs-dubai-2026
鈹?鈹?/resources/news/gazelle-enterprise-2025
鈹?鈹?[+7 more paths]
鈹?鈼?/resources/selection-support/fitting-replacement
鈹?鈼?/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+32 more paths]
鈹?鈼?/resources/technical-articles
鈹?鈼?/resources/technical-articles/[slug]
  鈹?/resources/technical-articles/selecting-microfluidic-fittings
  鈹?/resources/technical-articles/peek-ptfe-pfa-material-differences
  鈹?/resources/technical-articles/low-pressure-vs-high-pressure-fittings
  鈹?[+9 more paths]


鈼? (Static)  prerendered as static content
鈼? (SSG)     prerendered as static HTML (uses generateStaticParams)

