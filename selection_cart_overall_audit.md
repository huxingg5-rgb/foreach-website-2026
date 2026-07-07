# Selection Cart Overall Audit

Generated: 2026-07-06 16:27:51

## Git Status
```text
 M app/products/products.css
 M components/products/selection/ProductCardGrid.tsx
 M components/products/selection/ProductSelectionCard.tsx
 M components/products/selection/ProductSelectionClient.tsx
 M components/selection-cart/GlobalSelectionCartDrawer.tsx
 M components/selection-cart/SelectionCartProvider.tsx
 M components/selection-cart/selection-cart.types.ts
 M data/products/selection/product-type-intro.ts
?? app/products/products.css.bak_20260706_140218
?? app/products/products.css.bak_card_actions_20260706_145558
?? app/products/products.css.bak_card_actions_continue_20260706_145741
?? app/products/products.css.bak_drawing_cart_only_20260706_151114
?? app/products/products.css.bak_mobile_card_final_append_20260706_142435
?? app/products/products.css.bak_mobile_card_font_20260706_142035
?? app/products/products.css.bak_mobile_card_real_fix_20260706_142254
?? components/products/selection/ProductCardGrid.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductCardGrid.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductCardGrid.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductCardGrid.tsx.bak_remove_get_detail_href_20260706_162127
?? components/products/selection/ProductSelectionCard.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionCard.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionCard.tsx.bak_fix_detail_href_runtime_20260706_161703
?? components/products/selection/ProductSelectionCard.tsx.bak_remove_detail_link_20260706_161438
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_20260706_145558
?? components/products/selection/ProductSelectionClient.tsx.bak_card_actions_continue_20260706_145741
?? components/products/selection/ProductSelectionClient.tsx.bak_drawing_cart_only_20260706_151114
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_breadcrumb_props_20260706_152816
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_grid_props_format_20260706_162432
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_parse_tail_20260706_145849
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_product_selection_type_20260706_162332
?? components/products/selection/ProductSelectionClient.tsx.bak_fix_return_intro_20260706_152558
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_cart_display_20260706_153601
?? components/products/selection/ProductSelectionClient.tsx.bak_pump_custom_cart_20260706_154636
?? components/products/selection/ProductSelectionClient.tsx.bak_remove_get_detail_href_20260706_162127
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_fix_cart_table_header_20260706_155155
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/GlobalSelectionCartDrawer.tsx.bak_pump_drawer_body_20260706_154833
?? components/selection-cart/SelectionCartProvider.tsx.bak_card_actions_20260706_145558
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_cart_display_20260706_153601
?? components/selection-cart/SelectionCartProvider.tsx.bak_pump_custom_cart_20260706_154636
?? components/selection-cart/selection-cart.types.ts.bak_card_actions_20260706_145558
?? data/products/selection/product-type-intro.ts.bak_remove_detail_text_20260706_161958
?? "iteProjectsforeach-website-2026componentsselection-cartGlobalSelectionCartDrawer.tsx\357\200\242"
?? product_card_actions_audit.md
?? product_center_intro_layout_check_and_fix.md
?? product_intro_layout_audit.md
?? product_intro_layout_code_context.md
?? "productsselectionProductSelectionClient.tsx\357\200\242"
?? selection_cart_overall_audit.md
?? "\357\200\272"
?? "\357\200\272s\357\200\252subtitles\357\200\252\357\200\277s\357\200\252[s\357\200\252subtitles\357\200\252]s\357\200\252\357\200\272s\357\200\252[s\357\200\252],',"

```

## Changed Files
```text
app/products/products.css
components/products/selection/ProductCardGrid.tsx
components/products/selection/ProductSelectionCard.tsx
components/products/selection/ProductSelectionClient.tsx
components/selection-cart/GlobalSelectionCartDrawer.tsx
components/selection-cart/SelectionCartProvider.tsx
components/selection-cart/selection-cart.types.ts
data/products/selection/product-type-intro.ts

```

## Database File Check
如果下面为空，说明没有改 data/products、scripts/products、xlsx。
```text

data/products/selection/product-type-intro.ts



```

## 3D Residue Check
```text

  components\selection-cart\SelectionCartProvider.tsx:50:  clearCart: () => void;
  components\selection-cart\SelectionCartProvider.tsx:51:
  components\selection-cart\SelectionCartProvider.tsx:52:  changeQuantity: (id: string, qua
ntity: number) => void;
  components\selection-cart\SelectionCartProvider.tsx:53:  toggleDrawingNeed: (id: string, 
needDrawing: boolean) => void;
> components\selection-cart\SelectionCartProvider.tsx:54:  toggleModel3dNeed: (id: string, 
needModel3d: boolean) => void;
  components\selection-cart\SelectionCartProvider.tsx:55:
  components\selection-cart\SelectionCartProvider.tsx:56:  getItem: (
  components\selection-cart\SelectionCartProvider.tsx:57:    sourceType: SelectionCartSourc
eType,
  components\selection-cart\SelectionCartProvider.tsx:58:    productCode: string
  components\selection-cart\SelectionCartProvider.tsx:59:  ) => SelectionCartItem | undefin
ed;
  components\selection-cart\SelectionCartProvider.tsx:60:
  components\selection-cart\SelectionCartProvider.tsx:117:          ? raw.competitorModels
  components\selection-cart\SelectionCartProvider.tsx:118:          : [],
  components\selection-cart\SelectionCartProvider.tsx:119:        quantity: Math.max(1, Num
ber(raw.quantity || 1)),
  components\selection-cart\SelectionCartProvider.tsx:120:        needDrawing: Boolean(raw.
needDrawing),
> components\selection-cart\SelectionCartProvider.tsx:121:        needModel3d: Boolean((raw
 as any).needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:122:        imagePath: raw.imagePath,
  components\selection-cart\SelectionCartProvider.tsx:123:        detailHref: `/resources/s
election-support/fitting-replacement/q20/${raw.productCode}`,
  components\selection-cart\SelectionCartProvider.tsx:124:      };
  components\selection-cart\SelectionCartProvider.tsx:125:
  components\selection-cart\SelectionCartProvider.tsx:126:      return normalizedItem;
  components\selection-cart\SelectionCartProvider.tsx:127:    })
  components\selection-cart\SelectionCartProvider.tsx:249:          return {
  components\selection-cart\SelectionCartProvider.tsx:250:            ...item,
  components\selection-cart\SelectionCartProvider.tsx:251:            quantity: item.quanti
ty + quantity,
  components\selection-cart\SelectionCartProvider.tsx:252:            needDrawing: Boolean(
item.needDrawing || input.needDrawing),
> components\selection-cart\SelectionCartProvider.tsx:253:            needModel3d: Boolean(
item.needModel3d || input.needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:254:          };
  components\selection-cart\SelectionCartProvider.tsx:255:        });
  components\selection-cart\SelectionCartProvider.tsx:256:      }
  components\selection-cart\SelectionCartProvider.tsx:257:
  components\selection-cart\SelectionCartProvider.tsx:258:      return [
  components\selection-cart\SelectionCartProvider.tsx:259:        ...prev,
  components\selection-cart\SelectionCartProvider.tsx:261:          ...input,
  components\selection-cart\SelectionCartProvider.tsx:262:          id,
  components\selection-cart\SelectionCartProvider.tsx:263:          quantity,
  components\selection-cart\SelectionCartProvider.tsx:264:          needDrawing: Boolean(in
put.needDrawing),
> components\selection-cart\SelectionCartProvider.tsx:265:          needModel3d: Boolean(in
put.needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:266:        },
  components\selection-cart\SelectionCartProvider.tsx:267:      ];
  components\selection-cart\SelectionCartProvider.tsx:268:    });
  components\selection-cart\SelectionCartProvider.tsx:269:  }
  components\selection-cart\SelectionCartProvider.tsx:270:
  components\selection-cart\SelectionCartProvider.tsx:271:  function removeItem(id: string)
 {
  components\selection-cart\SelectionCartProvider.tsx:305:      });
  components\selection-cart\SelectionCartProvider.tsx:306:    });
  components\selection-cart\SelectionCartProvider.tsx:307:  }
  components\selection-cart\SelectionCartProvider.tsx:308:
> components\selection-cart\SelectionCartProvider.tsx:309:  function toggleModel3dNeed(id: 
string, needModel3d: boolean) {
  components\selection-cart\SelectionCartProvider.tsx:310:    setItems((prev) => {
  components\selection-cart\SelectionCartProvider.tsx:311:      return prev.map((item) => {
  components\selection-cart\SelectionCartProvider.tsx:312:        if (item.id !== id) retur
n item;
  components\selection-cart\SelectionCartProvider.tsx:313:
  components\selection-cart\SelectionCartProvider.tsx:314:        return {
  components\selection-cart\SelectionCartProvider.tsx:315:          ...item,
> components\selection-cart\SelectionCartProvider.tsx:316:          needModel3d,
  components\selection-cart\SelectionCartProvider.tsx:317:        };
  components\selection-cart\SelectionCartProvider.tsx:318:      });
  components\selection-cart\SelectionCartProvider.tsx:319:    });
  components\selection-cart\SelectionCartProvider.tsx:320:  }
  components\selection-cart\SelectionCartProvider.tsx:321:
  components\selection-cart\SelectionCartProvider.tsx:322:  function getItem(sourceType: Se
lectionCartSourceType, productCode: string) {
  components\selection-cart\SelectionCartProvider.tsx:362:      removeItem,
  components\selection-cart\SelectionCartProvider.tsx:363:      clearCart,
  components\selection-cart\SelectionCartProvider.tsx:364:      changeQuantity,
  components\selection-cart\SelectionCartProvider.tsx:365:      toggleDrawingNeed,
> components\selection-cart\SelectionCartProvider.tsx:366:      toggleModel3dNeed,
  components\selection-cart\SelectionCartProvider.tsx:367:      getItem,
  components\selection-cart\SelectionCartProvider.tsx:368:      copyCartText,
  components\selection-cart\SelectionCartProvider.tsx:369:      generatePdfList,
  components\selection-cart\SelectionCartProvider.tsx:370:      printTime,
  components\selection-cart\SelectionCartProvider.tsx:371:    };
  components\selection-cart\SelectionCartProvider.tsx:372:  }, [items, isOpen, printTime]);
  app\products\products.css:2859:
  app\products\products.css:2860:/* =======================================================
==
  app\products\products.css:2861:   产品中心：产品卡片三按钮功能接入样式
  app\products\products.css:2862:   说明：
> app\products\products.css:2863:   1. 添加图纸 / 申请3D / 加入清单 三个按钮
  app\products\products.css:2864:   2. 默认白底蓝字，选中后深蓝底 + 荧光色文字
  app\products\products.css:2865:   3. 只补充新按钮，不覆盖产品卡片整体结构
  app\products\products.css:2866:========================================================= 
*/
  app\products\products.css:2867:.products-selection-page .product-actions {
  app\products\products.css:2868:  grid-template-columns: repeat(3, minmax(0, 1fr)) !import
ant;
  app\products\products.css:2869:}
  app\products\products.css:2870:
  app\products\products.css:2871:.products-selection-page .product-link,
> app\products\products.css:2872:.products-selection-page .model3d-toggle,
  app\products\products.css:2873:.products-selection-page .list-toggle {
  app\products\products.css:2874:  height: 34px !important;
  app\products\products.css:2875:  min-height: 34px !important;
  app\products\products.css:2876:  padding: 0 8px !important;
  app\products\products.css:2877:  border: 1px solid var(--brand-blue, #173368) !important;
  app\products\products.css:2878:  border-radius: 6px !important;
  app\products\products.css:2890:  cursor: pointer !important;
  app\products\products.css:2891:}
  app\products\products.css:2892:
  app\products\products.css:2893:.products-selection-page .product-link:hover,
> app\products\products.css:2894:.products-selection-page .model3d-toggle:hover,
  app\products\products.css:2895:.products-selection-page .list-toggle:hover,
  app\products\products.css:2896:.products-selection-page .product-link.active,
> app\products\products.css:2897:.products-selection-page .model3d-toggle.active,
  app\products\products.css:2898:.products-selection-page .list-toggle.active {
  app\products\products.css:2899:  background: var(--brand-blue, #173368) !important;
  app\products\products.css:2900:  border-color: var(--brand-blue, #173368) !important;
  app\products\products.css:2901:  color: var(--brand-cyan, #09e9b4) !important;
  app\products\products.css:2902:}
  app\products\products.css:2903:
  app\products\products.css:2907:    gap: 6px !important;
  app\products\products.css:2908:  }
  app\products\products.css:2909:
  app\products\products.css:2910:  .products-selection-page .product-link,
> app\products\products.css:2911:  .products-selection-page .model3d-toggle,
  app\products\products.css:2912:  .products-selection-page .list-toggle {
  app\products\products.css:2913:    height: 30px !important;
  app\products\products.css:2914:    min-height: 30px !important;
  app\products\products.css:2915:    padding: 0 4px !important;
  app\products\products.css:2916:    font-size: 11px !important;
  app\products\products.css:2917:  }
  app\products\products.css:2921:/* =======================================================
==
  app\products\products.css:2922:   产品中心：产品卡片两按钮最终功能样式
  app\products\products.css:2923:   说明：
  app\products\products.css:2924:   1. 当前只做 添加图纸 / 加入清单
> app\products\products.css:2925:   2. 申请3D 暂不做，隐藏残留 model3d-toggle
  app\products\products.css:2926:   3. 默认白底蓝字，选中后深蓝底 + 荧光字
  app\products\products.css:2927:========================================================= 
*/
  app\products\products.css:2928:.products-selection-page .product-actions {
  app\products\products.css:2929:  display: grid !important;
  app\products\products.css:2930:  grid-template-columns: repeat(2, minmax(0, 1fr)) !import
ant;
  app\products\products.css:2931:  gap: 8px !important;
  app\products\products.css:2932:}
  app\products\products.css:2933:
> app\products\products.css:2934:.products-selection-page .model3d-toggle {
  app\products\products.css:2935:  display: none !important;
  app\products\products.css:2936:}
  app\products\products.css:2937:
  app\products\products.css:2938:.products-selection-page .product-link,
  app\products\products.css:2939:.products-selection-page .list-toggle {
  app\products\products.css:2940:  height: 34px !important;



```

## Cart Field Check
```text

  components\selection-cart\selection-cart.types.ts:15:   说明：
  components\selection-cart\selection-cart.types.ts:16:   后续如果增加泵、阀、传感器，可以继续扩展字符串。
  components\selection-cart\selection-cart.types.ts:17:*/
> components\selection-cart\selection-cart.types.ts:18:export type SelectionCartSourceType 
=
  components\selection-cart\selection-cart.types.ts:19:  | "fitting-replacement"
> components\selection-cart\selection-cart.types.ts:20:  | "pump-selection"
  components\selection-cart\selection-cart.types.ts:21:  | "valve-selection"
  components\selection-cart\selection-cart.types.ts:22:  | "sensor-selection"
  components\selection-cart\selection-cart.types.ts:23:  | "custom";
  components\selection-cart\selection-cart.types.ts:24:
  components\selection-cart\selection-cart.types.ts:25:/* 全局清单单项 */
> components\selection-cart\selection-cart.types.ts:26:export interface SelectionCartItem {
> components\selection-cart\selection-cart.types.ts:27:  /* 全局唯一 ID，建议格式：sourceType:product
Code */
  components\selection-cart\selection-cart.types.ts:28:  id: string;
  components\selection-cart\selection-cart.types.ts:29:
  components\selection-cart\selection-cart.types.ts:30:  /* 来源模块 */
> components\selection-cart\selection-cart.types.ts:31:  sourceType: SelectionCartSourceTyp
e;
  components\selection-cart\selection-cart.types.ts:32:
  components\selection-cart\selection-cart.types.ts:33:  /* 来源模块中文名称，例如：接头型号替代查询 */
  components\selection-cart\selection-cart.types.ts:34:  sourceLabel: string;
  components\selection-cart\selection-cart.types.ts:35:
  components\selection-cart\selection-cart.types.ts:36:  /* 产品分类名称，例如：Q20 快插接头 */
  components\selection-cart\selection-cart.types.ts:37:  productName: string;
  components\selection-cart\selection-cart.types.ts:38:
> components\selection-cart\selection-cart.types.ts:39:  /* 商品编码，例如：839034 */
> components\selection-cart\selection-cart.types.ts:40:  productCode: string;
  components\selection-cart\selection-cart.types.ts:41:
  components\selection-cart\selection-cart.types.ts:42:  /* 恒永达型号，例如：Q2001-PNV-SACN */
> components\selection-cart\selection-cart.types.ts:43:  foreachModel: string;
  components\selection-cart\selection-cart.types.ts:44:
> components\selection-cart\selection-cart.types.ts:45:  /* 兼容编码，例如：A0015 / B0004 / C0004 *
/
> components\selection-cart\selection-cart.types.ts:46:  competitorModels: string[];
  components\selection-cart\selection-cart.types.ts:47:
  components\selection-cart\selection-cart.types.ts:48:  /* 数量 */
  components\selection-cart\selection-cart.types.ts:49:  quantity: number;
  components\selection-cart\selection-cart.types.ts:50:
  components\selection-cart\selection-cart.types.ts:51:  /* 是否需要 2D 图纸 */
> components\selection-cart\selection-cart.types.ts:52:  needDrawing: boolean;
  components\selection-cart\selection-cart.types.ts:53:
  components\selection-cart\selection-cart.types.ts:54:  /* 产品详情页链接 */
> components\selection-cart\selection-cart.types.ts:55:  detailHref?: string;
  components\selection-cart\selection-cart.types.ts:56:
  components\selection-cart\selection-cart.types.ts:57:  /* 产品图片路径 */
  components\selection-cart\selection-cart.types.ts:58:  imagePath?: string;
  components\selection-cart\selection-cart.types.ts:59:}
  components\selection-cart\selection-cart.types.ts:60:
  components\selection-cart\selection-cart.types.ts:62:   说明：
  components\selection-cart\selection-cart.types.ts:63:   id 和 quantity 可以自动补齐。
  components\selection-cart\selection-cart.types.ts:64:*/
> components\selection-cart\selection-cart.types.ts:65:export type SelectionCartItemInput =
 Omit<
> components\selection-cart\selection-cart.types.ts:66:  SelectionCartItem,
  components\selection-cart\selection-cart.types.ts:67:  "id" | "quantity"
  components\selection-cart\selection-cart.types.ts:68:> & {
  components\selection-cart\selection-cart.types.ts:69:  id?: string;
  components\selection-cart\selection-cart.types.ts:70:  quantity?: number;
  components\selection-cart\selection-cart.types.ts:71:}; 
  components\selection-cart\SelectionCartProvider.tsx:24:} from "react";
  components\selection-cart\SelectionCartProvider.tsx:25:
  components\selection-cart\SelectionCartProvider.tsx:26:import type {
> components\selection-cart\SelectionCartProvider.tsx:27:  SelectionCartItem,
> components\selection-cart\SelectionCartProvider.tsx:28:  SelectionCartItemInput,
> components\selection-cart\SelectionCartProvider.tsx:29:  SelectionCartSourceType,
  components\selection-cart\SelectionCartProvider.tsx:30:} from "./selection-cart.types";
  components\selection-cart\SelectionCartProvider.tsx:31:
  components\selection-cart\SelectionCartProvider.tsx:32:/* 新版全局清单缓存 key */
  components\selection-cart\SelectionCartProvider.tsx:33:const GLOBAL_CART_STORAGE_KEY = "f
oreach_global_selection_cart_v1";
  components\selection-cart\SelectionCartProvider.tsx:34:
  components\selection-cart\SelectionCartProvider.tsx:39:const LEGACY_FITTING_CART_STORAGE_
KEY = "foreach_fitting_replacement_cart_v1";
  components\selection-cart\SelectionCartProvider.tsx:40:
  components\selection-cart\SelectionCartProvider.tsx:41:interface SelectionCartContextValu
e {
> components\selection-cart\SelectionCartProvider.tsx:42:  items: SelectionCartItem[];
  components\selection-cart\SelectionCartProvider.tsx:43:  isOpen: boolean;
  components\selection-cart\SelectionCartProvider.tsx:44:
  components\selection-cart\SelectionCartProvider.tsx:45:  openCart: () => void;
  components\selection-cart\SelectionCartProvider.tsx:46:  closeCart: () => void;
  components\selection-cart\SelectionCartProvider.tsx:47:
> components\selection-cart\SelectionCartProvider.tsx:48:  addItem: (item: SelectionCartIte
mInput) => void;
  components\selection-cart\SelectionCartProvider.tsx:49:  removeItem: (id: string) => void
;
  components\selection-cart\SelectionCartProvider.tsx:50:  clearCart: () => void;
  components\selection-cart\SelectionCartProvider.tsx:51:
  components\selection-cart\SelectionCartProvider.tsx:52:  changeQuantity: (id: string, qua
ntity: number) => void;
> components\selection-cart\SelectionCartProvider.tsx:53:  toggleDrawingNeed: (id: string, 
needDrawing: boolean) => void;
  components\selection-cart\SelectionCartProvider.tsx:54:  toggleModel3dNeed: (id: string, 
needModel3d: boolean) => void;
  components\selection-cart\SelectionCartProvider.tsx:55:
  components\selection-cart\SelectionCartProvider.tsx:56:  getItem: (
> components\selection-cart\SelectionCartProvider.tsx:57:    sourceType: SelectionCartSourc
eType,
> components\selection-cart\SelectionCartProvider.tsx:58:    productCode: string
> components\selection-cart\SelectionCartProvider.tsx:59:  ) => SelectionCartItem | undefin
ed;
  components\selection-cart\SelectionCartProvider.tsx:60:
  components\selection-cart\SelectionCartProvider.tsx:61:  copyCartText: () => Promise<void
>;
  components\selection-cart\SelectionCartProvider.tsx:62:  generatePdfList: () => void;
  components\selection-cart\SelectionCartProvider.tsx:63:
  components\selection-cart\SelectionCartProvider.tsx:64:  printTime: string;
  components\selection-cart\SelectionCartProvider.tsx:72:   生成清单项 ID
  components\selection-cart\SelectionCartProvider.tsx:73:==================================
======================= */
  components\selection-cart\SelectionCartProvider.tsx:74:function buildCartItemId(item: {
> components\selection-cart\SelectionCartProvider.tsx:75:  sourceType: SelectionCartSourceT
ype;
> components\selection-cart\SelectionCartProvider.tsx:76:  productCode: string;
  components\selection-cart\SelectionCartProvider.tsx:77:}) {
> components\selection-cart\SelectionCartProvider.tsx:78:  return `${item.sourceType}:${ite
m.productCode}`;
  components\selection-cart\SelectionCartProvider.tsx:79:}
  components\selection-cart\SelectionCartProvider.tsx:80:
  components\selection-cart\SelectionCartProvider.tsx:81:/* ===============================
==========================
  components\selection-cart\SelectionCartProvider.tsx:82:   兼容旧版接头清单数据
  components\selection-cart\SelectionCartProvider.tsx:83:
  components\selection-cart\SelectionCartProvider.tsx:84:   说明：
> components\selection-cart\SelectionCartProvider.tsx:85:   旧版 FittingSelectionCartItem 没有 
sourceType、sourceLabel、productName。
  components\selection-cart\SelectionCartProvider.tsx:86:   这里做一次兼容转换。
  components\selection-cart\SelectionCartProvider.tsx:87:==================================
======================= */
> components\selection-cart\SelectionCartProvider.tsx:88:function normalizeLegacyFittingIte
ms(rawItems: unknown): SelectionCartItem[] {
  components\selection-cart\SelectionCartProvider.tsx:89:  if (!Array.isArray(rawItems)) re
turn [];
  components\selection-cart\SelectionCartProvider.tsx:90:
  components\selection-cart\SelectionCartProvider.tsx:91:  return rawItems
  components\selection-cart\SelectionCartProvider.tsx:92:    .map((item) => {
  components\selection-cart\SelectionCartProvider.tsx:93:      if (!item || typeof item !==
 "object") return null;
  components\selection-cart\SelectionCartProvider.tsx:94:
> components\selection-cart\SelectionCartProvider.tsx:95:      const raw = item as Partial<
SelectionCartItem> & {
> components\selection-cart\SelectionCartProvider.tsx:96:        productCode?: string;
> components\selection-cart\SelectionCartProvider.tsx:97:        foreachModel?: string;
> components\selection-cart\SelectionCartProvider.tsx:98:        competitorModels?: string[
];
  components\selection-cart\SelectionCartProvider.tsx:99:        quantity?: number;
> components\selection-cart\SelectionCartProvider.tsx:100:        needDrawing?: boolean;
  components\selection-cart\SelectionCartProvider.tsx:101:        imagePath?: string;
  components\selection-cart\SelectionCartProvider.tsx:102:      };
  components\selection-cart\SelectionCartProvider.tsx:103:
> components\selection-cart\SelectionCartProvider.tsx:104:      if (!raw.productCode || !ra
w.foreachModel) return null;
  components\selection-cart\SelectionCartProvider.tsx:105:
> components\selection-cart\SelectionCartProvider.tsx:106:      const normalizedItem: Selec
tionCartItem = {
  components\selection-cart\SelectionCartProvider.tsx:107:        id: buildCartItemId({
> components\selection-cart\SelectionCartProvider.tsx:108:          sourceType: "fitting-re
placement",
> components\selection-cart\SelectionCartProvider.tsx:109:          productCode: raw.produc
tCode,
  components\selection-cart\SelectionCartProvider.tsx:110:        }),
> components\selection-cart\SelectionCartProvider.tsx:111:        sourceType: "fitting-repl
acement",
  components\selection-cart\SelectionCartProvider.tsx:112:        sourceLabel: "接头型号替代查询",
  components\selection-cart\SelectionCartProvider.tsx:113:        productName: "Q20 快插接头",
> components\selection-cart\SelectionCartProvider.tsx:114:        productCode: raw.productC
ode,
> components\selection-cart\SelectionCartProvider.tsx:115:        foreachModel: raw.foreach
Model,
> components\selection-cart\SelectionCartProvider.tsx:116:        competitorModels: Array.i
sArray(raw.competitorModels)
> components\selection-cart\SelectionCartProvider.tsx:117:          ? raw.competitorModels
  components\selection-cart\SelectionCartProvider.tsx:118:          : [],
  components\selection-cart\SelectionCartProvider.tsx:119:        quantity: Math.max(1, Num
ber(raw.quantity || 1)),
> components\selection-cart\SelectionCartProvider.tsx:120:        needDrawing: Boolean(raw.
needDrawing),
  components\selection-cart\SelectionCartProvider.tsx:121:        needModel3d: Boolean((raw
 as any).needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:122:        imagePath: raw.imagePath,
> components\selection-cart\SelectionCartProvider.tsx:123:        detailHref: `/resources/s
election-support/fitting-replacement/q20/${raw.productCode}`,
  components\selection-cart\SelectionCartProvider.tsx:124:      };
  components\selection-cart\SelectionCartProvider.tsx:125:
  components\selection-cart\SelectionCartProvider.tsx:126:      return normalizedItem;
  components\selection-cart\SelectionCartProvider.tsx:127:    })
> components\selection-cart\SelectionCartProvider.tsx:128:    .filter(Boolean) as Selection
CartItem[];
  components\selection-cart\SelectionCartProvider.tsx:129:}
  components\selection-cart\SelectionCartProvider.tsx:130:
  components\selection-cart\SelectionCartProvider.tsx:131:/* ==============================
===========================
  components\selection-cart\SelectionCartProvider.tsx:132:   生成复制文本
  components\selection-cart\SelectionCartProvider.tsx:133:=================================
======================== */
> components\selection-cart\SelectionCartProvider.tsx:134:function buildCartText(items: Sel
ectionCartItem[]) {
  components\selection-cart\SelectionCartProvider.tsx:135:  if (items.length === 0) {
  components\selection-cart\SelectionCartProvider.tsx:136:    return "暂无选型产品";
  components\selection-cart\SelectionCartProvider.tsx:137:  }
  components\selection-cart\SelectionCartProvider.tsx:138:
  components\selection-cart\SelectionCartProvider.tsx:139:  const lines = items.map((item, 
index) => {
> components\selection-cart\SelectionCartProvider.tsx:140:    const isPumpSelection = item.
sourceType === "pump-selection";
  components\selection-cart\SelectionCartProvider.tsx:141:
  components\selection-cart\SelectionCartProvider.tsx:142:    if (isPumpSelection) {
  components\selection-cart\SelectionCartProvider.tsx:143:      return [
  components\selection-cart\SelectionCartProvider.tsx:144:        `#${index + 1}`,
  components\selection-cart\SelectionCartProvider.tsx:145:        `来源：${item.sourceLabel}`,
> components\selection-cart\SelectionCartProvider.tsx:146:        `产品类型：${item.productName}
`,
> components\selection-cart\SelectionCartProvider.tsx:147:        `产品型号：${item.foreachModel
}`,
  components\selection-cart\SelectionCartProvider.tsx:148:        `数量：${item.quantity}`,
> components\selection-cart\SelectionCartProvider.tsx:149:        `2D 图纸：${item.needDrawing
 ? "需要" : "暂不需要"}`,
  components\selection-cart\SelectionCartProvider.tsx:150:      ].join("\n");
  components\selection-cart\SelectionCartProvider.tsx:151:    }
  components\selection-cart\SelectionCartProvider.tsx:152:
  components\selection-cart\SelectionCartProvider.tsx:153:    return [
  components\selection-cart\SelectionCartProvider.tsx:154:      `#${index + 1}`,
  components\selection-cart\SelectionCartProvider.tsx:155:      `来源：${item.sourceLabel}`,
  components\selection-cart\SelectionCartProvider.tsx:156:      `产品：${item.productName}`,
> components\selection-cart\SelectionCartProvider.tsx:157:      `商品编码：${item.productCode}`,
> components\selection-cart\SelectionCartProvider.tsx:158:      `恒永达型号：${item.foreachModel}
`,
> components\selection-cart\SelectionCartProvider.tsx:159:      `兼容编码：${item.competitorMode
ls.join(" / ") || "-"}`,
  components\selection-cart\SelectionCartProvider.tsx:160:      `数量：${item.quantity}`,
> components\selection-cart\SelectionCartProvider.tsx:161:      `2D 图纸：${item.needDrawing ?
 "需要" : "暂不需要"}`,
  components\selection-cart\SelectionCartProvider.tsx:162:    ].join("\n");
  components\selection-cart\SelectionCartProvider.tsx:163:  });
  components\selection-cart\SelectionCartProvider.tsx:164:
  components\selection-cart\SelectionCartProvider.tsx:165:  return lines.join("\n\n");
  components\selection-cart\SelectionCartProvider.tsx:166:}
  components\selection-cart\SelectionCartProvider.tsx:169:}: {
  components\selection-cart\SelectionCartProvider.tsx:170:  children: ReactNode;
  components\selection-cart\SelectionCartProvider.tsx:171:}) {
> components\selection-cart\SelectionCartProvider.tsx:172:  const [items, setItems] = useSt
ate<SelectionCartItem[]>([]);
  components\selection-cart\SelectionCartProvider.tsx:173:  const [isOpen, setIsOpen] = use
State(false);
  components\selection-cart\SelectionCartProvider.tsx:174:  const [hasMounted, setHasMounte
d] = useState(false);
  components\selection-cart\SelectionCartProvider.tsx:175:  const [printTime, setPrintTime]
 = useState("");
  components\selection-cart\SelectionCartProvider.tsx:176:
  components\selection-cart\SelectionCartProvider.tsx:177:  /* 读取本地缓存 */
  components\selection-cart\SelectionCartProvider.tsx:180:      const rawGlobalCart = windo
w.localStorage.getItem(GLOBAL_CART_STORAGE_KEY);
  components\selection-cart\SelectionCartProvider.tsx:181:
  components\selection-cart\SelectionCartProvider.tsx:182:      if (rawGlobalCart) {
> components\selection-cart\SelectionCartProvider.tsx:183:        const parsedGlobalCart = 
JSON.parse(rawGlobalCart) as SelectionCartItem[];
  components\selection-cart\SelectionCartProvider.tsx:184:
  components\selection-cart\SelectionCartProvider.tsx:185:        setItems(
  components\selection-cart\SelectionCartProvider.tsx:186:          parsedGlobalCart.map((i
tem) => {
  components\selection-cart\SelectionCartProvider.tsx:187:            return {
  components\selection-cart\SelectionCartProvider.tsx:188:              ...item,
  components\selection-cart\SelectionCartProvider.tsx:189:              quantity: Math.max(
1, Number(item.quantity || 1)),
> components\selection-cart\SelectionCartProvider.tsx:190:              needDrawing: Boolea
n(item.needDrawing),
  components\selection-cart\SelectionCartProvider.tsx:191:            };
  components\selection-cart\SelectionCartProvider.tsx:192:          })
  components\selection-cart\SelectionCartProvider.tsx:193:        );
  components\selection-cart\SelectionCartProvider.tsx:194:
  components\selection-cart\SelectionCartProvider.tsx:195:        setHasMounted(true);
  components\selection-cart\SelectionCartProvider.tsx:229:    setIsOpen(false);
  components\selection-cart\SelectionCartProvider.tsx:230:  }
  components\selection-cart\SelectionCartProvider.tsx:231:
> components\selection-cart\SelectionCartProvider.tsx:232:  function addItem(input: Selecti
onCartItemInput) {
  components\selection-cart\SelectionCartProvider.tsx:233:    const id =
  components\selection-cart\SelectionCartProvider.tsx:234:      input.id ||
  components\selection-cart\SelectionCartProvider.tsx:235:      buildCartItemId({
> components\selection-cart\SelectionCartProvider.tsx:236:        sourceType: input.sourceT
ype,
> components\selection-cart\SelectionCartProvider.tsx:237:        productCode: input.produc
tCode,
  components\selection-cart\SelectionCartProvider.tsx:238:      });
  components\selection-cart\SelectionCartProvider.tsx:239:
  components\selection-cart\SelectionCartProvider.tsx:240:    const quantity = Math.max(1, 
Number(input.quantity || 1));
  components\selection-cart\SelectionCartProvider.tsx:241:
  components\selection-cart\SelectionCartProvider.tsx:242:    setItems((prev) => {
  components\selection-cart\SelectionCartProvider.tsx:249:          return {
  components\selection-cart\SelectionCartProvider.tsx:250:            ...item,
  components\selection-cart\SelectionCartProvider.tsx:251:            quantity: item.quanti
ty + quantity,
> components\selection-cart\SelectionCartProvider.tsx:252:            needDrawing: Boolean(
item.needDrawing || input.needDrawing),
  components\selection-cart\SelectionCartProvider.tsx:253:            needModel3d: Boolean(
item.needModel3d || input.needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:254:          };
  components\selection-cart\SelectionCartProvider.tsx:255:        });
  components\selection-cart\SelectionCartProvider.tsx:256:      }
  components\selection-cart\SelectionCartProvider.tsx:257:
  components\selection-cart\SelectionCartProvider.tsx:261:          ...input,
  components\selection-cart\SelectionCartProvider.tsx:262:          id,
  components\selection-cart\SelectionCartProvider.tsx:263:          quantity,
> components\selection-cart\SelectionCartProvider.tsx:264:          needDrawing: Boolean(in
put.needDrawing),
  components\selection-cart\SelectionCartProvider.tsx:265:          needModel3d: Boolean(in
put.needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:266:        },
  components\selection-cart\SelectionCartProvider.tsx:267:      ];
  components\selection-cart\SelectionCartProvider.tsx:268:    });
  components\selection-cart\SelectionCartProvider.tsx:269:  }
  components\selection-cart\SelectionCartProvider.tsx:293:    });
  components\selection-cart\SelectionCartProvider.tsx:294:  }
  components\selection-cart\SelectionCartProvider.tsx:295:
> components\selection-cart\SelectionCartProvider.tsx:296:  function toggleDrawingNeed(id: 
string, needDrawing: boolean) {
  components\selection-cart\SelectionCartProvider.tsx:297:    setItems((prev) => {
  components\selection-cart\SelectionCartProvider.tsx:298:      return prev.map((item) => {
  components\selection-cart\SelectionCartProvider.tsx:299:        if (item.id !== id) retur
n item;
  components\selection-cart\SelectionCartProvider.tsx:300:
  components\selection-cart\SelectionCartProvider.tsx:301:        return {
  components\selection-cart\SelectionCartProvider.tsx:302:          ...item,
> components\selection-cart\SelectionCartProvider.tsx:303:          needDrawing,
  components\selection-cart\SelectionCartProvider.tsx:304:        };
  components\selection-cart\SelectionCartProvider.tsx:305:      });
  components\selection-cart\SelectionCartProvider.tsx:306:    });
  components\selection-cart\SelectionCartProvider.tsx:307:  }
  components\selection-cart\SelectionCartProvider.tsx:308:
  components\selection-cart\SelectionCartProvider.tsx:319:    });
  components\selection-cart\SelectionCartProvider.tsx:320:  }
  components\selection-cart\SelectionCartProvider.tsx:321:
> components\selection-cart\SelectionCartProvider.tsx:322:  function getItem(sourceType: Se
lectionCartSourceType, productCode: string) {
  components\selection-cart\SelectionCartProvider.tsx:323:    const id = buildCartItemId({
> components\selection-cart\SelectionCartProvider.tsx:324:      sourceType,
> components\selection-cart\SelectionCartProvider.tsx:325:      productCode,
  components\selection-cart\SelectionCartProvider.tsx:326:    });
  components\selection-cart\SelectionCartProvider.tsx:327:
  components\selection-cart\SelectionCartProvider.tsx:328:    return items.find((item) => i
tem.id === id);
  components\selection-cart\SelectionCartProvider.tsx:329:  }
  components\selection-cart\SelectionCartProvider.tsx:330:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:106:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:107:  /* 已经标记“已添加图纸”的型号 */
  components\selection-cart\GlobalSelectionCartDrawer.tsx:108:  const requestDrawingItems =
 useMemo(() => {
> components\selection-cart\GlobalSelectionCartDrawer.tsx:109:    return items.filter((item
) => item.needDrawing);
  components\selection-cart\GlobalSelectionCartDrawer.tsx:110:  }, [items]);
  components\selection-cart\GlobalSelectionCartDrawer.tsx:111:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:112:  /* 图纸需求数量 */
  components\selection-cart\GlobalSelectionCartDrawer.tsx:113:  const drawingNeedCount = re
questDrawingItems.length;
  components\selection-cart\GlobalSelectionCartDrawer.tsx:114:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:131:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:132:     说明：
  components\selection-cart\GlobalSelectionCartDrawer.tsx:133:     1. CompanyInfoRequestMod
al 不依赖具体业务字段
> components\selection-cart\GlobalSelectionCartDrawer.tsx:134:     2. 所以这里把 productCode / c
ompetitorModels 转成 metaLines
  components\selection-cart\GlobalSelectionCartDrawer.tsx:135:     3. 后续规格书申请也可以用类似方式转换数据
  components\selection-cart\GlobalSelectionCartDrawer.tsx:136:  ===========================
============================== */
  components\selection-cart\GlobalSelectionCartDrawer.tsx:137:  const drawingRequestModalIt
ems = useMemo<CompanyInfoRequestItem[]>(() => {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:138:    return requestDrawingItem
s.map((item) => {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:139:      return {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:140:        id: item.id,
> components\selection-cart\GlobalSelectionCartDrawer.tsx:141:        title: item.foreachMo
del,
  components\selection-cart\GlobalSelectionCartDrawer.tsx:142:        metaLines:
> components\selection-cart\GlobalSelectionCartDrawer.tsx:143:          item.sourceType ===
 "pump-selection"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:144:            ? [
> components\selection-cart\GlobalSelectionCartDrawer.tsx:145:                `产品类型：${item.
productName}`,
> components\selection-cart\GlobalSelectionCartDrawer.tsx:146:                `产品型号：${item.
foreachModel}`,
  components\selection-cart\GlobalSelectionCartDrawer.tsx:147:                `数量：${item.qu
antity}`,
  components\selection-cart\GlobalSelectionCartDrawer.tsx:148:              ]
  components\selection-cart\GlobalSelectionCartDrawer.tsx:149:            : [
> components\selection-cart\GlobalSelectionCartDrawer.tsx:150:                `商品编码：${item.
productCode}`,
> components\selection-cart\GlobalSelectionCartDrawer.tsx:151:                `兼容编码：${item.
competitorModels.join(" / ") || "-"}`,
  components\selection-cart\GlobalSelectionCartDrawer.tsx:152:                `数量：${item.qu
antity}`,
  components\selection-cart\GlobalSelectionCartDrawer.tsx:153:              ],
  components\selection-cart\GlobalSelectionCartDrawer.tsx:154:      };
  components\selection-cart\GlobalSelectionCartDrawer.tsx:155:    });
  components\selection-cart\GlobalSelectionCartDrawer.tsx:156:  }, [requestDrawingItems]);
  components\selection-cart\GlobalSelectionCartDrawer.tsx:166:  ===========================
============================== */
  components\selection-cart\GlobalSelectionCartDrawer.tsx:167:  useEffect(() => {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:168:    const currentSignature = 
items
> components\selection-cart\GlobalSelectionCartDrawer.tsx:169:      .map((item) => `${item.
id}:${item.quantity}:${item.needDrawing}`)
  components\selection-cart\GlobalSelectionCartDrawer.tsx:170:      .join("|");
  components\selection-cart\GlobalSelectionCartDrawer.tsx:171:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:172:    if (!previousCartSignatur
eRef.current) {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:173:      previousCartSignatureRe
f.current = currentSignature;
  components\selection-cart\GlobalSelectionCartDrawer.tsx:174:      return;
  components\selection-cart\GlobalSelectionCartDrawer.tsx:326:                    <tr key={
item.id}>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:327:                      <td>{in
dex + 1}</td>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:328:                      <td>{it
em.sourceLabel}</td>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:329:                      <td>{it
em.productCode}</td>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:330:                      <td>{it
em.competitorModels.join(" / ") || "-"}</td>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:331:                      <td>{it
em.foreachModel}</td>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:332:                      <td>{it
em.quantity}</td>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:333:                      <td>{it
em.needDrawing ? "需要" : "暂不需要"}</td>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:334:                    </tr>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:335:                  );
  components\selection-cart\GlobalSelectionCartDrawer.tsx:336:                })
  components\selection-cart\GlobalSelectionCartDrawer.tsx:337:              )}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:338:            </tbody>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:441:                            <
div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:442:                             
 <span>{item.sourceLabel}</span>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:443:
> components\selection-cart\GlobalSelectionCartDrawer.tsx:444:                             
 {item.detailHref ? (
  components\selection-cart\GlobalSelectionCartDrawer.tsx:445:                             
   <Link
  components\selection-cart\GlobalSelectionCartDrawer.tsx:446:                             
     className={styles.itemTitleLink}
> components\selection-cart\GlobalSelectionCartDrawer.tsx:447:                             
     href={item.detailHref}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:448:                             
     target="_blank"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:449:                             
     rel="noopener noreferrer"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:450:                             
     title="新窗口打开详情页"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:451:                             
   >
> components\selection-cart\GlobalSelectionCartDrawer.tsx:452:                             
     {item.foreachModel}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:453:                             
   </Link>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:454:                             
 ) : (
> components\selection-cart\GlobalSelectionCartDrawer.tsx:455:                             
   <h3>{item.foreachModel}</h3>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:456:                             
 )}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:457:                            <
/div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:458:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:459:                            <
button
  components\selection-cart\GlobalSelectionCartDrawer.tsx:460:                             
 className={
> components\selection-cart\GlobalSelectionCartDrawer.tsx:461:                             
   item.needDrawing
  components\selection-cart\GlobalSelectionCartDrawer.tsx:462:                             
     ? `${styles.drawingButton} ${styles.active}`
  components\selection-cart\GlobalSelectionCartDrawer.tsx:463:                             
     : styles.drawingButton
  components\selection-cart\GlobalSelectionCartDrawer.tsx:464:                             
 }
  components\selection-cart\GlobalSelectionCartDrawer.tsx:465:                             
 type="button"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:466:                             
 onClick={() => {
> components\selection-cart\GlobalSelectionCartDrawer.tsx:467:                             
   toggleDrawingNeed(item.id, !item.needDrawing);
  components\selection-cart\GlobalSelectionCartDrawer.tsx:468:                             
 }}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:469:                            >
> components\selection-cart\GlobalSelectionCartDrawer.tsx:470:                             
 {item.needDrawing ? "已添加图纸" : "添加图纸"}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:471:                            <
/button>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:472:                          </d
iv>                          {item.sourceType === "pump-selection" ? (
  components\selection-cart\GlobalSelectionCartDrawer.tsx:473:                            <
div className={styles.infoRow}>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:474:                             
 <span>产品类型</span>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:475:                             
 <strong>{item.productName}</strong>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:476:                            <
/div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:477:                          ) :
 (
  components\selection-cart\GlobalSelectionCartDrawer.tsx:478:                            <
>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:479:                             
 <div className={styles.infoRow}>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:480:                             
   <span>兼容编码</span>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:481:                             
   <strong>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:482:                             
     {item.competitorModels.join(" / ") || "-"}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:483:                             
   </strong>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:484:                             
 </div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:485:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:486:                             
 <div className={styles.infoRow}>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:487:                             
   <span>商品编码</span>
> components\selection-cart\GlobalSelectionCartDrawer.tsx:488:                             
   <strong>{item.productCode}</strong>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:489:                             
 </div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:490:                            <
/>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:491:                          )}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:492:
  components\selection-cart\GlobalSelectionCartDrawer.tsx:493:                          <di
v className={styles.quantityRow}>
  components\products\selection\ProductSelectionClient.tsx:4:import { useRouter, useSearchP
arams } from "next/navigation";
  components\products\selection\ProductSelectionClient.tsx:5:import ResourceSearchBar from 
"@/components/resources/ResourceSearchBar";
  components\products\selection\ProductSelectionClient.tsx:6:import { useSelectionCart } fr
om "@/components/selection-cart/SelectionCartProvider";
> components\products\selection\ProductSelectionClient.tsx:7:import type { SelectionCartIte
mInput } from "@/components/selection-cart/selection-cart.types";
  components\products\selection\ProductSelectionClient.tsx:8:
  components\products\selection\ProductSelectionClient.tsx:9:/* ===========================
==============================
  components\products\selection\ProductSelectionClient.tsx:10:   ProductSelectionClient.tsx
  components\products\selection\ProductSelectionClient.tsx:11:   恒永达官网｜产品中心选型页客户端组件
  components\products\selection\ProductSelectionClient.tsx:12:
  components\products\selection\ProductSelectionClient.tsx:81:    searchPlaceholder: "搜索产品名
称、系列、量程、材质等关键词",
  components\products\selection\ProductSelectionClient.tsx:82:    searchButton: "搜索",
  components\products\selection\ProductSelectionClient.tsx:83:    mobileCategoryPrefix: "产品
大类：",
> components\products\selection\ProductSelectionClient.tsx:84:    productTypeLabel: "产品类型",
  components\products\selection\ProductSelectionClient.tsx:85:    resultPrefix: "已找到 ",
  components\products\selection\ProductSelectionClient.tsx:86:    resultSuffix: " 个基础配置",
  components\products\selection\ProductSelectionClient.tsx:87:    resetFilters: "清除筛选",
  components\products\selection\ProductSelectionClient.tsx:88:    submitRequirement: "提交需求"
,
  components\products\selection\ProductSelectionClient.tsx:89:    detailButton: "查看详情",
  components\products\selection\ProductSelectionClient.tsx:265:        label: getText(local
e, item.label, fallback?.label || item.id),
  components\products\selection\ProductSelectionClient.tsx:266:        description:
  components\products\selection\ProductSelectionClient.tsx:267:          fallback?.descript
ion ||
> components\products\selection\ProductSelectionClient.tsx:268:          "根据产品类型、系列和筛选条件选择基
础配置。",
  components\products\selection\ProductSelectionClient.tsx:269:        sortOrder: item.sort
Order,
  components\products\selection\ProductSelectionClient.tsx:270:      };
  components\products\selection\ProductSelectionClient.tsx:271:    });
  components\products\selection\ProductSelectionClient.tsx:272:
  components\products\selection\ProductSelectionClient.tsx:273:  const categoryMap = new Ma
p<string, ProductSelectionCategoryItem>();
  components\products\selection\ProductSelectionClient.tsx:325:): SelectedFilterMap {
  components\products\selection\ProductSelectionClient.tsx:326:  /*
  components\products\selection\ProductSelectionClient.tsx:327:   * 说明：
> components\products\selection\ProductSelectionClient.tsx:328:   * 1. 二级产品类型页只代表“柱塞泵”
  components\products\selection\ProductSelectionClient.tsx:329:   * 2. 不应该默认选中 EA / SM / TM
  components\products\selection\ProductSelectionClient.tsx:330:   * 3. 三级系列页会通过 initialFilt
ers 单独选中对应系列
  components\products\selection\ProductSelectionClient.tsx:331:   */
  components\products\selection\ProductSelectionClient.tsx:332:  return {};
  components\products\selection\ProductSelectionClient.tsx:333:}
  components\products\selection\ProductSelectionClient.tsx:454:    .replace(/^-+|-+$/g, "")
;
  components\products\selection\ProductSelectionClient.tsx:455:}
  components\products\selection\ProductSelectionClient.tsx:456:
> components\products\selection\ProductSelectionClient.tsx:457:function getPlungerPumpModel
SlugForDetailHref(product: ProductSelectionProduct) {
  components\products\selection\ProductSelectionClient.tsx:458:  const existingSlug = norma
lizePlungerPathPart(product.detailSlug);
  components\products\selection\ProductSelectionClient.tsx:459:
  components\products\selection\ProductSelectionClient.tsx:460:  if (/^(ea|sm|tm)-\d+-(pmma
|peek)$/i.test(existingSlug)) {
  components\products\selection\ProductSelectionClient.tsx:461:    return existingSlug.toLo
werCase();
  components\products\selection\ProductSelectionClient.tsx:462:  }
  components\products\selection\ProductSelectionClient.tsx:505:/* ===== FOREACH plunger pum
p model detail href helpers END ===== */
  components\products\selection\ProductSelectionClient.tsx:506:
  components\products\selection\ProductSelectionClient.tsx:507:
> components\products\selection\ProductSelectionClient.tsx:508:function makeDetailHref(prod
uct: ProductSelectionProduct) {
  components\products\selection\ProductSelectionClient.tsx:509:  const isPlungerPump =
  components\products\selection\ProductSelectionClient.tsx:510:    product.categoryId === "
pumps" &&
  components\products\selection\ProductSelectionClient.tsx:511:    ["plunger-pump", "plunge
r-pumps"].includes(product.productTypeId);
  components\products\selection\ProductSelectionClient.tsx:512:
  components\products\selection\ProductSelectionClient.tsx:513:  if (isPlungerPump) {
> components\products\selection\ProductSelectionClient.tsx:514:    const slug = getPlungerP
umpModelSlugForDetailHref(product);
  components\products\selection\ProductSelectionClient.tsx:515:
  components\products\selection\ProductSelectionClient.tsx:516:    return slug
  components\products\selection\ProductSelectionClient.tsx:517:      ? `/products/pumps/plu
nger-pumps/${slug}`
  components\products\selection\ProductSelectionClient.tsx:518:      : "/products/pumps/plu
nger-pumps";
  components\products\selection\ProductSelectionClient.tsx:519:  }
  components\products\selection\ProductSelectionClient.tsx:563:    }
  components\products\selection\ProductSelectionClient.tsx:564:  );
  components\products\selection\ProductSelectionClient.tsx:565:  const {
> components\products\selection\ProductSelectionClient.tsx:566:    items: selectionCartItem
s,
  components\products\selection\ProductSelectionClient.tsx:567:    addItem,
  components\products\selection\ProductSelectionClient.tsx:568:    removeItem,
  components\products\selection\ProductSelectionClient.tsx:569:    getItem,
  components\products\selection\ProductSelectionClient.tsx:570:    toggleDrawingNeed,
  components\products\selection\ProductSelectionClient.tsx:571:  } = useSelectionCart();
  components\products\selection\ProductSelectionClient.tsx:572:
  components\products\selection\ProductSelectionClient.tsx:573:  const selectedList = useMe
mo(() => {
  components\products\selection\ProductSelectionClient.tsx:574:    return new Set(
> components\products\selection\ProductSelectionClient.tsx:575:      selectionCartItems
> components\products\selection\ProductSelectionClient.tsx:576:        .filter((item) => it
em.sourceType === "pump-selection")
> components\products\selection\ProductSelectionClient.tsx:577:        .map((item) => item.
productCode)
  components\products\selection\ProductSelectionClient.tsx:578:    );
> components\products\selection\ProductSelectionClient.tsx:579:  }, [selectionCartItems]);
  components\products\selection\ProductSelectionClient.tsx:580:
  components\products\selection\ProductSelectionClient.tsx:581:  const selectedDrawingList 
= useMemo(() => {
  components\products\selection\ProductSelectionClient.tsx:582:    return new Set(
> components\products\selection\ProductSelectionClient.tsx:583:      selectionCartItems
> components\products\selection\ProductSelectionClient.tsx:584:        .filter((item) => it
em.sourceType === "pump-selection" && item.needDrawing)
> components\products\selection\ProductSelectionClient.tsx:585:        .map((item) => item.
productCode)
  components\products\selection\ProductSelectionClient.tsx:586:    );
> components\products\selection\ProductSelectionClient.tsx:587:  }, [selectionCartItems]);
  components\products\selection\ProductSelectionClient.tsx:588:const [searchKeyword, setSea
rchKeyword] = useState("");
  components\products\selection\ProductSelectionClient.tsx:589:  const [mobileCategoryOpen,
 setMobileCategoryOpen] = useState(false);
  components\products\selection\ProductSelectionClient.tsx:590:  const [mobileOpenFilterGro
ups, setMobileOpenFilterGroups] = useState<
  components\products\selection\ProductSelectionClient.tsx:591:    Record<string, boolean>
  components\products\selection\ProductSelectionClient.tsx:592:  >(() => {
  components\products\selection\ProductSelectionClient.tsx:617:
  components\products\selection\ProductSelectionClient.tsx:618:    /*
  components\products\selection\ProductSelectionClient.tsx:619:     * 说明：
> components\products\selection\ProductSelectionClient.tsx:620:     * 1. 先读取已有产品数据中的产品类型
  components\products\selection\ProductSelectionClient.tsx:621:     * 2. 这部分用于已经有产品卡片的数据，例如
 EA 柱塞泵
  components\products\selection\ProductSelectionClient.tsx:622:     */
  components\products\selection\ProductSelectionClient.tsx:623:    categoryProducts.forEach
((product) => {
  components\products\selection\ProductSelectionClient.tsx:624:      if (!product.productTy
peId) return;
  components\products\selection\ProductSelectionClient.tsx:625:
  components\products\selection\ProductSelectionClient.tsx:633:
  components\products\selection\ProductSelectionClient.tsx:634:    /*
  components\products\selection\ProductSelectionClient.tsx:635:     * 说明：
> components\products\selection\ProductSelectionClient.tsx:636:     * 1. 再从 product-route-m
ap.ts 补充正式产品类型入口
  components\products\selection\ProductSelectionClient.tsx:637:     * 2. 这样即使隔膜泵 / 移液泵 / 注射
泵 / 无阀泵 / 高压泵暂时没有产品数据
> components\products\selection\ProductSelectionClient.tsx:638:     * 3. 左侧“产品类型”里也会先显示对应入口
  components\products\selection\ProductSelectionClient.tsx:639:     */
  components\products\selection\ProductSelectionClient.tsx:640:    getProductTypeFilterOpti
onsByCategory(activeCategoryId).forEach((option) => {
  components\products\selection\ProductSelectionClient.tsx:641:      if (!optionMap.has(opt
ion.value)) {
  components\products\selection\ProductSelectionClient.tsx:642:        optionMap.set(option
.value, {
  components\products\selection\ProductSelectionClient.tsx:643:          value: option.valu
e,
  components\products\selection\ProductSelectionClient.tsx:749:  /*
  components\products\selection\ProductSelectionClient.tsx:750:   * 当前产品种类介绍数据
  components\products\selection\ProductSelectionClient.tsx:751:   * 说明：
> components\products\selection\ProductSelectionClient.tsx:752:   * 1. 根据当前产品大类和产品类型匹配介绍内容
  components\products\selection\ProductSelectionClient.tsx:753:   * 2. 例如 pumps + plunger-p
ump 会显示柱塞泵系列介绍
  components\products\selection\ProductSelectionClient.tsx:754:   * 3. 找不到时不显示横幅
  components\products\selection\ProductSelectionClient.tsx:755:   */
  components\products\selection\ProductSelectionClient.tsx:756:  const activeProductTypeInt
ro = getProductTypeIntroByIds(
  components\products\selection\ProductSelectionClient.tsx:757:    activeCategoryId,
  components\products\selection\ProductSelectionClient.tsx:964:  function handleProductType
Change(productTypeId: string) {
  components\products\selection\ProductSelectionClient.tsx:965:    /*
  components\products\selection\ProductSelectionClient.tsx:966:     * 说明：
> components\products\selection\ProductSelectionClient.tsx:967:     * 1. 点击产品类型时，优先跳转正式 URL
  components\products\selection\ProductSelectionClient.tsx:968:     * 2. 柱塞泵会跳到 /products/p
umps/plunger-pumps/
  components\products\selection\ProductSelectionClient.tsx:969:     * 3. 没配置正式 URL 的类型，才走原来
的前端筛选逻辑
  components\products\selection\ProductSelectionClient.tsx:970:     */
  components\products\selection\ProductSelectionClient.tsx:971:    const productTypeHref = 
getProductTypeHrefByIds(
  components\products\selection\ProductSelectionClient.tsx:972:      activeCategoryId,
  components\products\selection\ProductSelectionClient.tsx:989:  ) {
  components\products\selection\ProductSelectionClient.tsx:990:    /*
  components\products\selection\ProductSelectionClient.tsx:991:     * 说明：
> components\products\selection\ProductSelectionClient.tsx:992:     * 1. 产品类型筛选项，例如“柱塞泵”，仍然
走 handleProductTypeChange
  components\products\selection\ProductSelectionClient.tsx:993:     * 2. 产品系列筛选项，例如 EA / SM
 / TM，不再使用 router.push
  components\products\selection\ProductSelectionClient.tsx:994:     * 3. 系列点击改为：
  components\products\selection\ProductSelectionClient.tsx:995:     *    - 原地更新 selectedFil
ters
  components\products\selection\ProductSelectionClient.tsx:996:     *    - 用 window.history
.pushState 同步地址栏
  components\products\selection\ProductSelectionClient.tsx:997:     *    - 不触发 Next.js 页面重新
跳转，避免页面明显跳动
  components\products\selection\ProductSelectionClient.tsx:1052:      /*
  components\products\selection\ProductSelectionClient.tsx:1053:       * 说明：
  components\products\selection\ProductSelectionClient.tsx:1054:       * 1. 选中系列时，同步到三级 URL
> components\products\selection\ProductSelectionClient.tsx:1055:       * 2. 取消系列时，回到二级产品类型 
URL
  components\products\selection\ProductSelectionClient.tsx:1056:       * 3. 使用 pushState 不触
发 Next 路由跳转，页面不会明显跳动
  components\products\selection\ProductSelectionClient.tsx:1057:       */
  components\products\selection\ProductSelectionClient.tsx:1058:      const nextHref = isAl
readySelected
  components\products\selection\ProductSelectionClient.tsx:1059:        ? productTypeHref
  components\products\selection\ProductSelectionClient.tsx:1060:        : seriesHref;
  components\products\selection\ProductSelectionClient.tsx:1108:    /*
  components\products\selection\ProductSelectionClient.tsx:1109:     * 说明：
  components\products\selection\ProductSelectionClient.tsx:1110:     * 1. 这个函数用于告诉筛选面板：当前选项
是否处于选中状态
> components\products\selection\ProductSelectionClient.tsx:1111:     * 2. productType 是产品类型
，例如“柱塞泵”
  components\products\selection\ProductSelectionClient.tsx:1112:     * 3. filter01 / filter
02 / filter03 是普通筛选项，例如产品系列、量程、材质
  components\products\selection\ProductSelectionClient.tsx:1113:     * 4. 这里必须先判断 FILTER_KE
YS，避免 TypeScript 认为 string 不能索引 selectedFilters
  components\products\selection\ProductSelectionClient.tsx:1114:     */
  components\products\selection\ProductSelectionClient.tsx:1115:    if (group.key === "prod
uctType") {
  components\products\selection\ProductSelectionClient.tsx:1116:      return activeProductT
ypeId === value;
  components\products\selection\ProductSelectionClient.tsx:1131:    /*
  components\products\selection\ProductSelectionClient.tsx:1132:     * 说明：
  components\products\selection\ProductSelectionClient.tsx:1133:     * 1. 这个函数用于移除顶部“已选筛选标签
”
> components\products\selection\ProductSelectionClient.tsx:1134:     * 2. productType 是产品类型
，例如“柱塞泵”
  components\products\selection\ProductSelectionClient.tsx:1135:     * 3. filter01 是产品系列，例如
 EA / SM / TM
  components\products\selection\ProductSelectionClient.tsx:1136:     * 4. 在三级系列页清除 EA / SM 
/ TM 时，应回到二级柱塞泵页面
  components\products\selection\ProductSelectionClient.tsx:1137:     */
  components\products\selection\ProductSelectionClient.tsx:1138:
  components\products\selection\ProductSelectionClient.tsx:1139:    if (key === "productTyp
e") {
  components\products\selection\ProductSelectionClient.tsx:1147:     * 1. 判断当前清除的标签是否命中正式系列
路由
  components\products\selection\ProductSelectionClient.tsx:1148:     * 2. 例如 EA 常规柱塞泵命中：
  components\products\selection\ProductSelectionClient.tsx:1149:     *    /products/pumps/p
lunger-pumps/ea-standard-piston-pumps/
> components\products\selection\ProductSelectionClient.tsx:1150:     * 3. 清除后跳回产品类型页：
  components\products\selection\ProductSelectionClient.tsx:1151:     *    /products/pumps/p
lunger-pumps/
  components\products\selection\ProductSelectionClient.tsx:1152:     */
  components\products\selection\ProductSelectionClient.tsx:1153:    const seriesHref = getS
eriesHrefByFilterValue(
  components\products\selection\ProductSelectionClient.tsx:1154:      activeCategoryId,
  components\products\selection\ProductSelectionClient.tsx:1155:      activeProductTypeId,
  components\products\selection\ProductSelectionClient.tsx:1212:  function createProductCar
tItem(
  components\products\selection\ProductSelectionClient.tsx:1213:    product: ProductSelecti
onProduct,
  components\products\selection\ProductSelectionClient.tsx:1214:    options: {
> components\products\selection\ProductSelectionClient.tsx:1215:      needDrawing?: boolean
;
  components\products\selection\ProductSelectionClient.tsx:1216:    } = {}
> components\products\selection\ProductSelectionClient.tsx:1217:  ): SelectionCartItemInput
 {
  components\products\selection\ProductSelectionClient.tsx:1218:    const title = getText(l
ocale, product.cardTitle, product.productId);
  components\products\selection\ProductSelectionClient.tsx:1219:    const subtitle = getTex
t(locale, product.cardSubtitle, "");
  components\products\selection\ProductSelectionClient.tsx:1220:
  components\products\selection\ProductSelectionClient.tsx:1221:    return {
> components\products\selection\ProductSelectionClient.tsx:1222:      sourceType: "pump-sel
ection",
  components\products\selection\ProductSelectionClient.tsx:1223:      sourceLabel: "产品中心",
  components\products\selection\ProductSelectionClient.tsx:1224:      productName: getTaxon
omyLabel(locale, product.productTypeId),
> components\products\selection\ProductSelectionClient.tsx:1225:      productCode: product.
productId,
> components\products\selection\ProductSelectionClient.tsx:1226:      foreachModel: title,
> components\products\selection\ProductSelectionClient.tsx:1227:      competitorModels: [],
  components\products\selection\ProductSelectionClient.tsx:1228:      quantity: 1,
> components\products\selection\ProductSelectionClient.tsx:1229:      needDrawing: Boolean(
options.needDrawing),
  components\products\selection\ProductSelectionClient.tsx:1230:      imagePath: product.im
ageCard,
> components\products\selection\ProductSelectionClient.tsx:1231:      detailHref: makeDetai
lHref(product as ProductSelectionProduct),
  components\products\selection\ProductSelectionClient.tsx:1232:    };
  components\products\selection\ProductSelectionClient.tsx:1233:  }
  components\products\selection\ProductSelectionClient.tsx:1234:
  components\products\selection\ProductSelectionClient.tsx:1235:  function ensureProductInC
art(
  components\products\selection\ProductSelectionClient.tsx:1236:    product: ProductSelecti
onProduct,
  components\products\selection\ProductSelectionClient.tsx:1237:    options: {
> components\products\selection\ProductSelectionClient.tsx:1238:      needDrawing?: boolean
;
  components\products\selection\ProductSelectionClient.tsx:1239:    } = {}
  components\products\selection\ProductSelectionClient.tsx:1240:  ) {
> components\products\selection\ProductSelectionClient.tsx:1241:    const currentItem = get
Item("pump-selection", product.productId);
  components\products\selection\ProductSelectionClient.tsx:1242:
  components\products\selection\ProductSelectionClient.tsx:1243:    if (!currentItem) {
  components\products\selection\ProductSelectionClient.tsx:1244:      addItem(createProduct
CartItem(product, options));
  components\products\selection\ProductSelectionClient.tsx:1245:      return;
  components\products\selection\ProductSelectionClient.tsx:1246:    }
  components\products\selection\ProductSelectionClient.tsx:1247:
> components\products\selection\ProductSelectionClient.tsx:1248:    if (options.needDrawing
 && !currentItem.needDrawing) {
  components\products\selection\ProductSelectionClient.tsx:1249:      toggleDrawingNeed(cur
rentItem.id, true);
  components\products\selection\ProductSelectionClient.tsx:1250:    }
  components\products\selection\ProductSelectionClient.tsx:1251:  }
  components\products\selection\ProductSelectionClient.tsx:1252:
  components\products\selection\ProductSelectionClient.tsx:1253:  function requestProductDr
awing(product: ProductSelectionProduct) {
  components\products\selection\ProductSelectionClient.tsx:1254:    ensureProductInCart(pro
duct, {
> components\products\selection\ProductSelectionClient.tsx:1255:      needDrawing: true,
  components\products\selection\ProductSelectionClient.tsx:1256:    });
  components\products\selection\ProductSelectionClient.tsx:1257:  }
  components\products\selection\ProductSelectionClient.tsx:1258:
  components\products\selection\ProductSelectionClient.tsx:1259:  function toggleProductInL
ist(product: ProductSelectionProduct) {
> components\products\selection\ProductSelectionClient.tsx:1260:    const currentItem = get
Item("pump-selection", product.productId);
  components\products\selection\ProductSelectionClient.tsx:1261:
  components\products\selection\ProductSelectionClient.tsx:1262:    if (currentItem) {
  components\products\selection\ProductSelectionClient.tsx:1263:      removeItem(currentIte
m.id);
  components\products\selection\ProductSelectionClient.tsx:1264:      return;
  components\products\selection\ProductSelectionClient.tsx:1265:    }
  app\products\products.css:2362:  }
  app\products\products.css:2363:}
  app\products\products.css:2364:
> app\products\products.css:2365:/* 产品型号保护：允许换行，不强制省略 */
  app\products\products.css:2366:.products-selection-page .product-card h3,
  app\products\products.css:2367:.products-selection-page .product-card-title,
  app\products\products.css:2368:.products-selection-page .product-name {
  app\products\products.css:2369:  white-space: normal !important;
  app\products\products.css:2370:  overflow: visible !important;
  app\products\products.css:2417:  flex-direction: column;
  app\products\products.css:2418:}
  app\products\products.css:2419:
> app\products\products.css:2420:/* 产品型号：允许换行，但不要被省略 */
  app\products\products.css:2421:.products-selection-page .product-card h3,
  app\products\products.css:2422:.products-selection-page .product-card-title,
  app\products\products.css:2423:.products-selection-page .product-name {
  app\products\products.css:2424:  min-height: 32px;
  app\products\products.css:2425:  white-space: normal !important;
  app\products\products.css:2475:  }
  app\products\products.css:2476:}
  app\products\products.css:2477:
> app\products\products.css:2478:/* 产品中心：修复产品类型当前项宽度
  app\products\products.css:2479:   说明：
> app\products\products.css:2480:   1. 产品类型是唯一一个桌面端也需要折叠的筛选组
  app\products\products.css:2481:   2. 折叠后仍然要显示“当前：柱塞泵”
  app\products\products.css:2482:   3. 当前项要和普通筛选项一样撑满一整行
> app\products\products.css:2483:   4. 桌面端产品类型标题右侧必须显示 + / -
  app\products\products.css:2484:========================================================= 
*/
  app\products\products.css:2485:
> app\products\products.css:2486:/* 桌面端：产品类型标题保持原筛选标题风格，同时右侧显示 + / - */
  app\products\products.css:2487:.products-selection-page .product-type-filter-group .filte
r-group-trigger {
  app\products\products.css:2488:  width: 100%;
  app\products\products.css:2489:  min-height: auto;
  app\products\products.css:2490:  margin: 0;
  app\products\products.css:2491:  padding: 15px 18px 8px;
  app\products\products.css:2503:  cursor: pointer;
  app\products\products.css:2504:}
  app\products\products.css:2505:
> app\products\products.css:2506:/* 桌面端：强制产品类型右侧 + / - 显示出来 */
  app\products\products.css:2507:.products-selection-page .product-type-filter-group .filte
r-group-symbol {
  app\products\products.css:2508:  display: inline-flex !important;
  app\products\products.css:2509:  align-items: center;
  app\products\products.css:2510:  justify-content: center;
  app\products\products.css:2511:  min-width: 20px;
  app\products\products.css:2516:  line-height: 1;
  app\products\products.css:2517:}
  app\products\products.css:2518:
> app\products\products.css:2519:/* 产品类型折叠后的当前项区域：恢复和普通筛选项一致的左右间距 */
  app\products\products.css:2520:.products-selection-page .product-type-current-option {
  app\products\products.css:2521:  padding: 0 12px 16px;
  app\products\products.css:2522:}
  app\products\products.css:2523:
  app\products\products.css:2524:/* 当前：柱塞泵 要撑满整行，不要只包住文字 */
  app\products\products.css:2528:  justify-content: flex-start;
  app\products\products.css:2529:}
  app\products\products.css:2530:
> app\products\products.css:2531:/* 桌面端：产品类型未展开时只显示当前项，不显示完整选项 */
  app\products\products.css:2532:@media (min-width: 901px) {
  app\products\products.css:2533:  .products-selection-page .product-type-filter-group:not(
.is-mobile-open) > .filter-options {
  app\products\products.css:2534:    display: none !important;
  app\products\products.css:2535:  }
  app\products\products.css:2536:



```

## Product Card Link / Button Check
```text

  components\selection-cart\selection-cart.types.ts:52:  needDrawing: boolean;
  components\selection-cart\selection-cart.types.ts:53:
  components\selection-cart\selection-cart.types.ts:54:  /* 产品详情页链接 */
> components\selection-cart\selection-cart.types.ts:55:  detailHref?: string;
  components\selection-cart\selection-cart.types.ts:56:
  components\selection-cart\selection-cart.types.ts:57:  /* 产品图片路径 */
  components\selection-cart\selection-cart.types.ts:58:  imagePath?: string;
  components\selection-cart\selection-cart.types.ts:59:}
  components\selection-cart\selection-cart.types.ts:60:
  components\selection-cart\SelectionCartProvider.tsx:120:        needDrawing: Boolean(raw.
needDrawing),
  components\selection-cart\SelectionCartProvider.tsx:121:        needModel3d: Boolean((raw
 as any).needModel3d),
  components\selection-cart\SelectionCartProvider.tsx:122:        imagePath: raw.imagePath,
> components\selection-cart\SelectionCartProvider.tsx:123:        detailHref: `/resources/s
election-support/fitting-replacement/q20/${raw.productCode}`,
  components\selection-cart\SelectionCartProvider.tsx:124:      };
  components\selection-cart\SelectionCartProvider.tsx:125:
  components\selection-cart\SelectionCartProvider.tsx:126:      return normalizedItem;
  components\selection-cart\SelectionCartProvider.tsx:127:    })
  components\selection-cart\SelectionCartProvider.tsx:128:    .filter(Boolean) as Selection
CartItem[];
  components\selection-cart\GlobalSelectionCartDrawer.tsx:387:            onClick={closeCar
t}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:388:          />
  components\selection-cart\GlobalSelectionCartDrawer.tsx:389:
> components\selection-cart\GlobalSelectionCartDrawer.tsx:390:          <aside className={s
tyles.drawer} aria-label="选型清单">
  components\selection-cart\GlobalSelectionCartDrawer.tsx:391:            <div className={s
tyles.head}>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:392:              <div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:393:                <h2>选型清单</h2>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:394:                <p>确认型号、数量与图纸
需求，后续可统一提交或生成资料包。</p>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:395:              </div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:425:                  <div classN
ame={styles.list}>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:426:                    {items.ma
p((item) => {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:427:                      return 
(
> components\selection-cart\GlobalSelectionCartDrawer.tsx:428:                        <arti
cle className={styles.item} key={item.id}>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:429:                          <bu
tton
  components\selection-cart\GlobalSelectionCartDrawer.tsx:430:                            c
lassName={styles.removeButton}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:431:                            t
ype="button"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:432:                            a
ria-label="删除该产品"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:433:                            o
nClick={() => {
  components\selection-cart\GlobalSelectionCartDrawer.tsx:441:                            <
div>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:442:                             
 <span>{item.sourceLabel}</span>
  components\selection-cart\GlobalSelectionCartDrawer.tsx:443:
> components\selection-cart\GlobalSelectionCartDrawer.tsx:444:                             
 {item.detailHref ? (
  components\selection-cart\GlobalSelectionCartDrawer.tsx:445:                             
   <Link
  components\selection-cart\GlobalSelectionCartDrawer.tsx:446:                             
     className={styles.itemTitleLink}
> components\selection-cart\GlobalSelectionCartDrawer.tsx:447:                             
     href={item.detailHref}
  components\selection-cart\GlobalSelectionCartDrawer.tsx:448:                             
     target="_blank"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:449:                             
     rel="noopener noreferrer"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:450:                             
     title="新窗口打开详情页"
  components\selection-cart\GlobalSelectionCartDrawer.tsx:451:                             
   >
  components\selection-cart\GlobalSelectionCartDrawer.tsx:452:                             
     {item.foreachModel}
  components\products\selection\ProductSelectionClient.tsx:454:    .replace(/^-+|-+$/g, "")
;
  components\products\selection\ProductSelectionClient.tsx:455:}
  components\products\selection\ProductSelectionClient.tsx:456:
> components\products\selection\ProductSelectionClient.tsx:457:function getPlungerPumpModel
SlugForDetailHref(product: ProductSelectionProduct) {
  components\products\selection\ProductSelectionClient.tsx:458:  const existingSlug = norma
lizePlungerPathPart(product.detailSlug);
  components\products\selection\ProductSelectionClient.tsx:459:
  components\products\selection\ProductSelectionClient.tsx:460:  if (/^(ea|sm|tm)-\d+-(pmma
|peek)$/i.test(existingSlug)) {
  components\products\selection\ProductSelectionClient.tsx:461:    return existingSlug.toLo
werCase();
  components\products\selection\ProductSelectionClient.tsx:462:  }
  components\products\selection\ProductSelectionClient.tsx:505:/* ===== FOREACH plunger pum
p model detail href helpers END ===== */
  components\products\selection\ProductSelectionClient.tsx:506:
  components\products\selection\ProductSelectionClient.tsx:507:
> components\products\selection\ProductSelectionClient.tsx:508:function makeDetailHref(prod
uct: ProductSelectionProduct) {
  components\products\selection\ProductSelectionClient.tsx:509:  const isPlungerPump =
  components\products\selection\ProductSelectionClient.tsx:510:    product.categoryId === "
pumps" &&
  components\products\selection\ProductSelectionClient.tsx:511:    ["plunger-pump", "plunge
r-pumps"].includes(product.productTypeId);
  components\products\selection\ProductSelectionClient.tsx:512:
  components\products\selection\ProductSelectionClient.tsx:513:  if (isPlungerPump) {
> components\products\selection\ProductSelectionClient.tsx:514:    const slug = getPlungerP
umpModelSlugForDetailHref(product);
  components\products\selection\ProductSelectionClient.tsx:515:
  components\products\selection\ProductSelectionClient.tsx:516:    return slug
  components\products\selection\ProductSelectionClient.tsx:517:      ? `/products/pumps/plu
nger-pumps/${slug}`
  components\products\selection\ProductSelectionClient.tsx:518:      : "/products/pumps/plu
nger-pumps";
  components\products\selection\ProductSelectionClient.tsx:519:  }
  components\products\selection\ProductSelectionClient.tsx:1228:      quantity: 1,
  components\products\selection\ProductSelectionClient.tsx:1229:      needDrawing: Boolean(
options.needDrawing),
  components\products\selection\ProductSelectionClient.tsx:1230:      imagePath: product.im
ageCard,
> components\products\selection\ProductSelectionClient.tsx:1231:      detailHref: makeDetai
lHref(product as ProductSelectionProduct),
  components\products\selection\ProductSelectionClient.tsx:1232:    };
  components\products\selection\ProductSelectionClient.tsx:1233:  }
  components\products\selection\ProductSelectionClient.tsx:1234:
  components\products\selection\ProductSelectionClient.tsx:1235:  function ensureProductInC
art(
  components\products\selection\ProductSelectionClient.tsx:1236:    product: ProductSelecti
onProduct,
  components\products\selection\ProductSelectionClient.tsx:1355:                    getSubt
itle={(product) =>
  components\products\selection\ProductSelectionClient.tsx:1356:                      getTe
xt(locale, product.cardSubtitle, "")
  components\products\selection\ProductSelectionClient.tsx:1357:                    }
> components\products\selection\ProductSelectionClient.tsx:1358:                    onReque
stDrawing={requestProductDrawing}
> components\products\selection\ProductSelectionClient.tsx:1359:                    onToggl
eList={toggleProductInList}
  components\products\selection\ProductSelectionClient.tsx:1360:                  />
  components\products\selection\ProductSelectionClient.tsx:1361:
  components\products\selection\ProductSelectionClient.tsx:1362:                  <ProductS
electionPagination
  components\products\selection\ProductSelectionClient.tsx:1363:                    current
Page={safeCurrentProductPage}
  components\products\selection\ProductSelectionClient.tsx:1364:                    totalPa
ges={totalProductPages}
  components\products\selection\ProductCardGrid.tsx:2:
  components\products\selection\ProductCardGrid.tsx:3:import ProductSelectionCard from "./P
roductSelectionCard";
  components\products\selection\ProductCardGrid.tsx:4:
> components\products\selection\ProductCardGrid.tsx:5:import type { ProductSelectionProduct
Item } from "./product-selection-ui.types";
  components\products\selection\ProductCardGrid.tsx:6:
  components\products\selection\ProductCardGrid.tsx:7:type ProductCardGridProps = {
> components\products\selection\ProductCardGrid.tsx:8:  products: ProductSelectionProductIt
em[];
  components\products\selection\ProductCardGrid.tsx:9:  selectedList: ReadonlySet<string>;
  components\products\selection\ProductCardGrid.tsx:10:  selectedDrawingList: ReadonlySet<s
tring>;
  components\products\selection\ProductCardGrid.tsx:11:  addToListText: string;
  components\products\selection\ProductCardGrid.tsx:12:  addedToListText: string;
> components\products\selection\ProductCardGrid.tsx:13:  getTitle: (product: ProductSelecti
onProductItem) => string;
> components\products\selection\ProductCardGrid.tsx:14:  getSubtitle: (product: ProductSele
ctionProductItem) => string;
> components\products\selection\ProductCardGrid.tsx:15:  onRequestDrawing: (product: Produc
tSelectionProductItem) => void;
> components\products\selection\ProductCardGrid.tsx:16:  onToggleList: (product: ProductSel
ectionProductItem) => void;
  components\products\selection\ProductCardGrid.tsx:17:};
  components\products\selection\ProductCardGrid.tsx:18:
  components\products\selection\ProductCardGrid.tsx:19:export default function ProductCardG
rid({
  components\products\selection\ProductCardGrid.tsx:20:  products,
  components\products\selection\ProductCardGrid.tsx:21:  selectedList,
  components\products\selection\ProductCardGrid.tsx:24:  addedToListText,
  components\products\selection\ProductCardGrid.tsx:25:  getTitle,
  components\products\selection\ProductCardGrid.tsx:26:  getSubtitle,
> components\products\selection\ProductCardGrid.tsx:27:  onRequestDrawing,
> components\products\selection\ProductCardGrid.tsx:28:  onToggleList,
  components\products\selection\ProductCardGrid.tsx:29:}: ProductCardGridProps) {
  components\products\selection\ProductCardGrid.tsx:30:  return (
  components\products\selection\ProductCardGrid.tsx:31:    <div className="product-grid">
  components\products\selection\ProductCardGrid.tsx:32:      {products.map((product) => {
  components\products\selection\ProductCardGrid.tsx:33:        const title = getTitle(produ
ct);
  components\products\selection\ProductCardGrid.tsx:43:            addToListText={addToList
Text}
  components\products\selection\ProductCardGrid.tsx:44:            addedToListText={addedTo
ListText}
  components\products\selection\ProductCardGrid.tsx:45:            key={product.productId}
> components\products\selection\ProductCardGrid.tsx:46:            onRequestDrawing={onRequ
estDrawing}
> components\products\selection\ProductCardGrid.tsx:47:            onToggleList={onToggleLi
st}
  components\products\selection\ProductCardGrid.tsx:48:          />
  components\products\selection\ProductCardGrid.tsx:49:        );
  components\products\selection\ProductCardGrid.tsx:50:      })}
  components\products\selection\ProductCardGrid.tsx:51:    </div>
  components\products\selection\ProductCardGrid.tsx:52:  );
  components\products\selection\ProductSelectionCard.tsx:1:"use client";
  components\products\selection\ProductSelectionCard.tsx:2:
> components\products\selection\ProductSelectionCard.tsx:3:import type { ProductSelectionPr
oductItem } from "./product-selection-ui.types";
  components\products\selection\ProductSelectionCard.tsx:4:import { getProductCardSpecs } f
rom "@/data/products/selection/card-copy/plunger-pump-card-copy";
  components\products\selection\ProductSelectionCard.tsx:5:
  components\products\selection\ProductSelectionCard.tsx:6:type ProductSelectionCardProps =
 {
> components\products\selection\ProductSelectionCard.tsx:7:  product: ProductSelectionProdu
ctItem;
  components\products\selection\ProductSelectionCard.tsx:8:  title: string;
  components\products\selection\ProductSelectionCard.tsx:9:  subtitle: string;
  components\products\selection\ProductSelectionCard.tsx:10:
  components\products\selection\ProductSelectionCard.tsx:11:  isAdded: boolean;
  components\products\selection\ProductSelectionCard.tsx:12:  isDrawingRequested: boolean;
  components\products\selection\ProductSelectionCard.tsx:13:  addToListText: string;
  components\products\selection\ProductSelectionCard.tsx:14:  addedToListText: string;
> components\products\selection\ProductSelectionCard.tsx:15:  onRequestDrawing: (product: P
roductSelectionProductItem) => void;
> components\products\selection\ProductSelectionCard.tsx:16:  onToggleList: (product: Produ
ctSelectionProductItem) => void;
  components\products\selection\ProductSelectionCard.tsx:17:};
  components\products\selection\ProductSelectionCard.tsx:18:
  components\products\selection\ProductSelectionCard.tsx:19:export default function Product
SelectionCard({
  components\products\selection\ProductSelectionCard.tsx:20:  product,
  components\products\selection\ProductSelectionCard.tsx:21:  title,
  components\products\selection\ProductSelectionCard.tsx:25:  isDrawingRequested,
  components\products\selection\ProductSelectionCard.tsx:26:  addToListText,
  components\products\selection\ProductSelectionCard.tsx:27:  addedToListText,
> components\products\selection\ProductSelectionCard.tsx:28:  onRequestDrawing,
> components\products\selection\ProductSelectionCard.tsx:29:  onToggleList,
  components\products\selection\ProductSelectionCard.tsx:30:}: ProductSelectionCardProps) {
  components\products\selection\ProductSelectionCard.tsx:31:  const cardSpecs = getProductC
ardSpecs(product);
  components\products\selection\ProductSelectionCard.tsx:32:
  components\products\selection\ProductSelectionCard.tsx:33:  return (
> components\products\selection\ProductSelectionCard.tsx:34:    <article className="product
-card" title={title}>
  components\products\selection\ProductSelectionCard.tsx:35:      <span className="selected
-bar" />
  components\products\selection\ProductSelectionCard.tsx:36:
  components\products\selection\ProductSelectionCard.tsx:37:      <div className="product-i
mage" aria-label={title}>
  components\products\selection\ProductSelectionCard.tsx:38:        {product.imageCard ? (
  components\products\selection\ProductSelectionCard.tsx:39:          <img src={product.ima
geCard} alt={title} loading="lazy" />
  components\products\selection\ProductSelectionCard.tsx:55:
  components\products\selection\ProductSelectionCard.tsx:56:        <div className="product
-actions">
  components\products\selection\ProductSelectionCard.tsx:57:          <button
> components\products\selection\ProductSelectionCard.tsx:58:            className={`product
-link ${isDrawingRequested ? "active" : ""}`}
  components\products\selection\ProductSelectionCard.tsx:59:            type="button"
> components\products\selection\ProductSelectionCard.tsx:60:            onClick={() => onRe
questDrawing(product)}
  components\products\selection\ProductSelectionCard.tsx:61:          >
  components\products\selection\ProductSelectionCard.tsx:62:            {isDrawingRequested
 ? "已添加图纸" : "添加图纸"}
  components\products\selection\ProductSelectionCard.tsx:63:          </button>
  components\products\selection\ProductSelectionCard.tsx:64:
  components\products\selection\ProductSelectionCard.tsx:65:          <button
> components\products\selection\ProductSelectionCard.tsx:66:            className={`list-to
ggle ${isAdded ? "active" : ""}`}
  components\products\selection\ProductSelectionCard.tsx:67:            type="button"
> components\products\selection\ProductSelectionCard.tsx:68:            onClick={() => onTo
ggleList(product)}
  components\products\selection\ProductSelectionCard.tsx:69:          >
  components\products\selection\ProductSelectionCard.tsx:70:            {isAdded ? addedToL
istText : addToListText}
  components\products\selection\ProductSelectionCard.tsx:71:          </button>
  components\products\selection\ProductSelectionCard.tsx:72:        </div>
  components\products\selection\ProductSelectionCard.tsx:73:      </div>
  app\products\products.css:558:  padding-top: 18px;
  app\products\products.css:559:}
  app\products\products.css:560:
> app\products\products.css:561:.products-selection-page .product-link,
> app\products\products.css:562:.products-selection-page .list-toggle {
  app\products\products.css:563:  height: 44px;
  app\products\products.css:564:  display: inline-flex;
  app\products\products.css:565:  align-items: center;
  app\products\products.css:566:  justify-content: center;
  app\products\products.css:567:  border-radius: 8px;
  app\products\products.css:577:    color 0.2s ease;
  app\products\products.css:578:}
  app\products\products.css:579:
> app\products\products.css:580:.products-selection-page .product-link:hover,
> app\products\products.css:581:.products-selection-page .list-toggle:hover,
> app\products\products.css:582:.products-selection-page .list-toggle.active {
  app\products\products.css:583:  background: var(--brand-blue);
  app\products\products.css:584:  border-color: var(--brand-blue);
  app\products\products.css:585:  color: var(--brand-cyan);
  app\products\products.css:586:}
  app\products\products.css:587:
  app\products\products.css:865:  padding-top: 14px;
  app\products\products.css:866:}
  app\products\products.css:867:
> app\products\products.css:868:.products-selection-page .product-link,
> app\products\products.css:869:.products-selection-page .list-toggle {
  app\products\products.css:870:  height: 38px;
  app\products\products.css:871:  font-size: 13px;
  app\products\products.css:872:}
  app\products\products.css:873:
  app\products\products.css:874:/* 2K / 澶у睆锛氬唴瀹逛笉瑕佹棤闄愭斁澶э紝鍗＄墖鏀规垚鏇寸揣鍑戠殑 4 鍒?*/
  app\products\products.css:1739:  padding-top: 14px;
  app\products\products.css:1740:}
  app\products\products.css:1741:
> app\products\products.css:1742:.products-selection-page .product-link,
> app\products\products.css:1743:.products-selection-page .list-toggle {
  app\products\products.css:1744:  height: 40px;
  app\products\products.css:1745:  display: inline-flex;
  app\products\products.css:1746:  align-items: center;
  app\products\products.css:1747:  justify-content: center;
  app\products\products.css:1748:  border-radius: 8px;
  app\products\products.css:1759:    color 0.2s ease;
  app\products\products.css:1760:}
  app\products\products.css:1761:
> app\products\products.css:1762:.products-selection-page .product-link:hover,
> app\products\products.css:1763:.products-selection-page .list-toggle:hover,
> app\products\products.css:1764:.products-selection-page .list-toggle.active {
  app\products\products.css:1765:  background: var(--brand-blue);
  app\products\products.css:1766:  border-color: var(--brand-blue);
  app\products\products.css:1767:  color: var(--brand-cyan);
  app\products\products.css:1768:}
  app\products\products.css:1769:
  app\products\products.css:1925:    padding-top: 12px;
  app\products\products.css:1926:  }
  app\products\products.css:1927:
> app\products\products.css:1928:  .products-selection-page .product-link,
> app\products\products.css:1929:  .products-selection-page .list-toggle {
  app\products\products.css:1930:    height: 34px;
  app\products\products.css:1931:    font-size: 12px;
  app\products\products.css:1932:  }
  app\products\products.css:1933:}
  app\products\products.css:1934:
  app\products\products.css:2234:  gap: 10px !important;
  app\products\products.css:2235:}
  app\products\products.css:2236:
> app\products\products.css:2237:.products-selection-page .product-link,
> app\products\products.css:2238:.products-selection-page .list-toggle {
  app\products\products.css:2239:  height: 38px !important;
  app\products\products.css:2240:  min-height: 38px !important;
  app\products\products.css:2241:  padding: 0 12px !important;
  app\products\products.css:2242:  font-size: 13px !important;
  app\products\products.css:2243:  font-weight: 700 !important;
  app\products\products.css:2274:    gap: 8px !important;
  app\products\products.css:2275:  }
  app\products\products.css:2276:
> app\products\products.css:2277:  .products-selection-page .product-link,
> app\products\products.css:2278:  .products-selection-page .list-toggle {
  app\products\products.css:2279:    height: 36px !important;
  app\products\products.css:2280:    min-height: 36px !important;
  app\products\products.css:2281:  }
  app\products\products.css:2282:}
  app\products\products.css:2283:
  app\products\products.css:2293:
  app\products\products.css:2294:.products-selection-page .product-card:hover .product-titl
e,
  app\products\products.css:2295:.products-selection-page .product-card:focus-within .produ
ct-title,
> app\products\products.css:2296:.products-selection-page .product-card:has(.list-toggle.ac
tive) .product-title,
> app\products\products.css:2297:.products-selection-page .product-card:has(.list-toggle[ar
ia-pressed="true"]) .product-title,
> app\products\products.css:2298:.products-selection-page .product-card:has(.list-toggle[da
ta-active="true"]) .product-title,
> app\products\products.css:2299:.products-selection-page .product-card:has(.list-toggle.is
-active) .product-title,
  app\products\products.css:2300:.products-selection-page .product-card.active .product-tit
le,
  app\products\products.css:2301:.products-selection-page .product-card.selected .product-t
itle,
  app\products\products.css:2302:.products-selection-page .product-card.is-selected .produc
t-title,
  app\products\products.css:2303:.products-selection-page .product-card[data-selected="true
"] .product-title {
  app\products\products.css:2304:  color: var(--brand-cyan, #09e9b4) !important;
  app\products\products.css:2846:    gap: 8px !important;
  app\products\products.css:2847:  }
  app\products\products.css:2848:
> app\products\products.css:2849:  .products-selection-page .product-link,
> app\products\products.css:2850:  .products-selection-page .list-toggle {
  app\products\products.css:2851:    height: 32px !important;
  app\products\products.css:2852:    min-height: 32px !important;
  app\products\products.css:2853:    padding: 0 8px !important;
  app\products\products.css:2854:    font-size: 12px !important;
  app\products\products.css:2855:    line-height: 1 !important;
  app\products\products.css:2868:  grid-template-columns: repeat(3, minmax(0, 1fr)) !import
ant;
  app\products\products.css:2869:}
  app\products\products.css:2870:
> app\products\products.css:2871:.products-selection-page .product-link,
  app\products\products.css:2872:.products-selection-page .model3d-toggle,
> app\products\products.css:2873:.products-selection-page .list-toggle {
  app\products\products.css:2874:  height: 34px !important;
  app\products\products.css:2875:  min-height: 34px !important;
  app\products\products.css:2876:  padding: 0 8px !important;
  app\products\products.css:2877:  border: 1px solid var(--brand-blue, #173368) !important;
  app\products\products.css:2878:  border-radius: 6px !important;
  app\products\products.css:2890:  cursor: pointer !important;
  app\products\products.css:2891:}
  app\products\products.css:2892:
> app\products\products.css:2893:.products-selection-page .product-link:hover,
  app\products\products.css:2894:.products-selection-page .model3d-toggle:hover,
> app\products\products.css:2895:.products-selection-page .list-toggle:hover,
> app\products\products.css:2896:.products-selection-page .product-link.active,
  app\products\products.css:2897:.products-selection-page .model3d-toggle.active,
> app\products\products.css:2898:.products-selection-page .list-toggle.active {
  app\products\products.css:2899:  background: var(--brand-blue, #173368) !important;
  app\products\products.css:2900:  border-color: var(--brand-blue, #173368) !important;
  app\products\products.css:2901:  color: var(--brand-cyan, #09e9b4) !important;
  app\products\products.css:2902:}
  app\products\products.css:2903:
  app\products\products.css:2907:    gap: 6px !important;
  app\products\products.css:2908:  }
  app\products\products.css:2909:
> app\products\products.css:2910:  .products-selection-page .product-link,
  app\products\products.css:2911:  .products-selection-page .model3d-toggle,
> app\products\products.css:2912:  .products-selection-page .list-toggle {
  app\products\products.css:2913:    height: 30px !important;
  app\products\products.css:2914:    min-height: 30px !important;
  app\products\products.css:2915:    padding: 0 4px !important;
  app\products\products.css:2916:    font-size: 11px !important;
  app\products\products.css:2917:  }
  app\products\products.css:2935:  display: none !important;
  app\products\products.css:2936:}
  app\products\products.css:2937:
> app\products\products.css:2938:.products-selection-page .product-link,
> app\products\products.css:2939:.products-selection-page .list-toggle {
  app\products\products.css:2940:  height: 34px !important;
  app\products\products.css:2941:  min-height: 34px !important;
  app\products\products.css:2942:  padding: 0 8px !important;
  app\products\products.css:2943:  border: 1px solid var(--brand-blue, #173368) !important;
  app\products\products.css:2944:  border-radius: 6px !important;
  app\products\products.css:2956:  cursor: pointer !important;
  app\products\products.css:2957:}
  app\products\products.css:2958:
> app\products\products.css:2959:.products-selection-page .product-link:hover,
> app\products\products.css:2960:.products-selection-page .list-toggle:hover,
> app\products\products.css:2961:.products-selection-page .product-link.active,
> app\products\products.css:2962:.products-selection-page .list-toggle.active {
  app\products\products.css:2963:  background: var(--brand-blue, #173368) !important;
  app\products\products.css:2964:  border-color: var(--brand-blue, #173368) !important;
  app\products\products.css:2965:  color: var(--brand-cyan, #09e9b4) !important;
  app\products\products.css:2966:}
  app\products\products.css:2967:
  app\products\products.css:2971:    gap: 6px !important;
  app\products\products.css:2972:  }
  app\products\products.css:2973:
> app\products\products.css:2974:  .products-selection-page .product-link,
> app\products\products.css:2975:  .products-selection-page .list-toggle {
  app\products\products.css:2976:    height: 30px !important;
  app\products\products.css:2977:    min-height: 30px !important;
  app\products\products.css:2978:    padding: 0 6px !important;
  app\products\products.css:2979:    font-size: 11px !important;
  app\products\products.css:2980:  }



```

## Current Diff
```diff
diff --git a/app/products/products.css b/app/products/products.css
index 88474d5..7e02356 100644
--- a/app/products/products.css
+++ b/app/products/products.css
@@ -2542,22 +2542,23 @@
 /* 浜у搧涓績锛氫骇鍝佺绫讳粙缁嶅尯鏈€缁堟暣鐞嗙増
    璇存槑锛?    1. 杩欐槸浜у搧涓績椤堕儴浜у搧绉嶇被浠嬬粛鍖虹殑鍞竴鏈€缁堟牱寮?-   2. 娓呯悊鎺変箣鍓嶅弽澶嶈拷鍔犵殑閲嶅瑕嗙洊鍧?-   3. 宸︿晶浜у搧鍥炬斁澶э紝鍙充晶姝ｆ枃淇濇寔榛戣壊澶у瓧鍙?-   4. HaloFlx 鍥哄畾鍦ㄥ彸涓嬭锛屼娇鐢ㄨ崸鍏夎壊浣庨€忔槑搴?-   5. 鍙姞绮?.product-type-intro-emphasis 鍖呬綇鐨勬寚瀹氭枃瀛?+   2. 宸︿晶浜у搧鍥惧浐瀹氬崰浣嶏紝鍙充晶姝ｆ枃鍚冩弧鍓╀綑绌洪棿
+   3. HaloFlx 浠呬綔涓哄彸涓嬭鑳屾櫙瑁呴グ锛屼笉鍙備笌甯冨眬銆佷笉棰勭暀绌洪棿
+   4. 鍙姞绮?.product-type-intro-emphasis 鍖呬綇鐨勬寚瀹氭枃瀛? ========================================================= */
 
 .products-selection-page .product-type-intro-module {
   position: relative !important;
+  isolation: isolate !important;
   width: 100% !important;
   margin: 0 0 28px !important;
-  padding: 24px 340px 24px 0 !important;
+  padding: 24px 0 24px 0 !important;
   display: grid !important;
   grid-template-columns: 430px minmax(0, 1fr) !important;
   gap: 46px !important;
   align-items: center !important;
-  justify-content: start !important;
+  justify-content: stretch !important;
+  overflow: hidden !important;
   border: 0 !important;
   border-top: 1px solid var(--line) !important;
   background: transparent !important;
@@ -2565,6 +2566,8 @@
 
 /* 宸︿晶浜у搧鍥?*/
 .products-selection-page .product-type-intro-image {
+  position: relative !important;
+  z-index: 2 !important;
   width: 430px !important;
   height: 320px !important;
   display: flex !important;
@@ -2583,10 +2586,12 @@
   transform-origin: center center !important;
 }
 
-/* 鍙充晶鏂囧瓧 */
+/* 鍙充晶鏂囧瓧锛氫笉鍐嶉檺瀹斤紝璁╂鏂囬摵鍒板彸渚?*/
 .products-selection-page .product-type-intro-copy {
+  position: relative !important;
+  z-index: 2 !important;
   width: 100% !important;
-  max-width: 920px !important;
+  max-width: none !important;
   min-width: 0 !important;
   padding-top: 2px !important;
 }
@@ -2617,10 +2622,11 @@
   font-weight: 800 !important;
 }
 
-/* HaloFlx 鍙充笅瑙掕楗板瓧 */
+/* HaloFlx 鍙充笅瑙掕楗板瓧锛氳儗鏅眰锛屼笉鍗犵┖闂?*/
 .products-selection-page .product-type-intro-module::after {
   content: "HaloFlx";
   position: absolute !important;
+  z-index: 1 !important;
   top: auto !important;
   right: 28px !important;
   bottom: 18px !important;
@@ -2630,7 +2636,7 @@
   font-weight: 840 !important;
   line-height: 1 !important;
   letter-spacing: -0.05em !important;
-  opacity: 0.18 !important;
+  opacity: 0.14 !important;
   white-space: nowrap !important;
   pointer-events: none !important;
   user-select: none !important;
@@ -2639,7 +2645,7 @@
 /* 涓瓑灞忓箷 */
 @media (max-width: 1400px) {
   .products-selection-page .product-type-intro-module {
-    padding: 24px 280px 22px 0 !important;
+    padding: 24px 0 22px 0 !important;
     grid-template-columns: 390px minmax(0, 1fr) !important;
     gap: 38px !important;
   }
@@ -2666,7 +2672,7 @@
     right: 18px !important;
     bottom: 16px !important;
     font-size: 70px !important;
-    opacity: 0.16 !important;
+    opacity: 0.13 !important;
   }
 }
 
@@ -2689,7 +2695,7 @@
   }
 
   .products-selection-page .product-type-intro-copy {
-    max-width: 100% !important;
+    max-width: none !important;
     padding-top: 0 !important;
   }
 
@@ -2707,7 +2713,6 @@
     display: none !important;
   }
 }
-
 /* 浜у搧涓績锛氬彇娑堝乏渚х瓫閫夋爮鍚搁《
    璇存槑锛?    1. 宸︿晶绛涢€夋爮涓嶅啀闅忕潃椤甸潰婊氬姩涓€鐩村仠鍦ㄩ《閮?@@ -2799,3 +2804,179 @@
   gap: 3px;
   line-height: 1.35;
 }
+
+
+/* =========================================================
+   浜у搧涓績锛氭墜鏈虹浜у搧鍗＄墖瀛楀彿鏈€缁堜慨姝?+   璇存槑锛?+   1. 鏀惧湪 products.css 鏈€鍚庯紝鐢ㄤ簬鍘嬩綇鍓嶉潰閲嶅鏍峰紡
+   2. 鍙奖鍝嶆墜鏈虹浜у搧鍗＄墖
+   3. 鏀跺皬鍨嬪彿銆佷笁琛屽弬鏁板拰鎸夐挳鏂囧瓧
+   4. 涓嶅奖鍝嶆闈㈢
+========================================================= */
+@media (max-width: 900px) {
+  .products-selection-page .product-card .product-title,
+  .products-selection-page .product-card h3,
+  .products-selection-page .product-card-title,
+  .products-selection-page .product-name {
+    font-size: 16px !important;
+    line-height: 1.22 !important;
+    min-height: auto !important;
+    margin-bottom: 8px !important;
+  }
+
+  .products-selection-page .product-param-line,
+  .products-selection-page .product-card-specs,
+  .products-selection-page .product-card-specs li,
+  .products-selection-page .product-card-description,
+  .products-selection-page .product-summary {
+    font-size: 12px !important;
+    line-height: 1.38 !important;
+  }
+
+  .products-selection-page .product-card-specs {
+    min-height: 56px !important;
+    margin-top: -2px !important;
+    gap: 2px !important;
+  }
+
+  .products-selection-page .product-actions,
+  .products-selection-page .product-card-actions {
+    margin-top: 8px !important;
+    gap: 8px !important;
+  }
+
+  .products-selection-page .product-link,
+  .products-selection-page .list-toggle {
+    height: 32px !important;
+    min-height: 32px !important;
+    padding: 0 8px !important;
+    font-size: 12px !important;
+    line-height: 1 !important;
+  }
+}
+
+
+/* =========================================================
+   浜у搧涓績锛氫骇鍝佸崱鐗囦笁鎸夐挳鍔熻兘鎺ュ叆鏍峰紡
+   璇存槑锛?+   1. 娣诲姞鍥剧焊 / 鐢宠3D / 鍔犲叆娓呭崟 涓変釜鎸夐挳
+   2. 榛樿鐧藉簳钃濆瓧锛岄€変腑鍚庢繁钃濆簳 + 鑽у厜鑹叉枃瀛?+   3. 鍙ˉ鍏呮柊鎸夐挳锛屼笉瑕嗙洊浜у搧鍗＄墖鏁翠綋缁撴瀯
+========================================================= */
+.products-selection-page .product-actions {
+  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
+}
+
+.products-selection-page .product-link,
+.products-selection-page .model3d-toggle,
+.products-selection-page .list-toggle {
+  height: 34px !important;
+  min-height: 34px !important;
+  padding: 0 8px !important;
+  border: 1px solid var(--brand-blue, #173368) !important;
+  border-radius: 6px !important;
+  background: #ffffff !important;
+  color: var(--brand-blue, #173368) !important;
+  display: inline-flex !important;
+  align-items: center !important;
+  justify-content: center !important;
+  font-family: inherit !important;
+  font-size: 12px !important;
+  font-weight: 760 !important;
+  line-height: 1 !important;
+  text-decoration: none !important;
+  white-space: nowrap !important;
+  cursor: pointer !important;
+}
+
+.products-selection-page .product-link:hover,
+.products-selection-page .model3d-toggle:hover,
+.products-selection-page .list-toggle:hover,
+.products-selection-page .product-link.active,
+.products-selection-page .model3d-toggle.active,
+.products-selection-page .list-toggle.active {
+  background: var(--brand-blue, #173368) !important;
+  border-color: var(--brand-blue, #173368) !important;
+  color: var(--brand-cyan, #09e9b4) !important;
+}
+
+@media (max-width: 900px) {
+  .products-selection-page .product-actions {
+    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
+    gap: 6px !important;
+  }
+
+  .products-selection-page .product-link,
+  .products-selection-page .model3d-toggle,
+  .products-selection-page .list-toggle {
+    height: 30px !important;
+    min-height: 30px !important;
+    padding: 0 4px !important;
+    font-size: 11px !important;
+  }
+}
+
+
+/* =========================================================
+   浜у搧涓績锛氫骇鍝佸崱鐗囦袱鎸夐挳鏈€缁堝姛鑳芥牱寮?+   璇存槑锛?+   1. 褰撳墠鍙仛 娣诲姞鍥剧焊 / 鍔犲叆娓呭崟
+   2. 鐢宠3D 鏆備笉鍋氾紝闅愯棌娈嬬暀 model3d-toggle
+   3. 榛樿鐧藉簳钃濆瓧锛岄€変腑鍚庢繁钃濆簳 + 鑽у厜瀛?+========================================================= */
+.products-selection-page .product-actions {
+  display: grid !important;
+  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
+  gap: 8px !important;
+}
+
+.products-selection-page .model3d-toggle {
+  display: none !important;
+}
+
+.products-selection-page .product-link,
+.products-selection-page .list-toggle {
+  height: 34px !important;
+  min-height: 34px !important;
+  padding: 0 8px !important;
+  border: 1px solid var(--brand-blue, #173368) !important;
+  border-radius: 6px !important;
+  background: #ffffff !important;
+  color: var(--brand-blue, #173368) !important;
+  display: inline-flex !important;
+  align-items: center !important;
+  justify-content: center !important;
+  font-family: inherit !important;
+  font-size: 12px !important;
+  font-weight: 760 !important;
+  line-height: 1 !important;
+  text-decoration: none !important;
+  white-space: nowrap !important;
+  cursor: pointer !important;
+}
+
+.products-selection-page .product-link:hover,
+.products-selection-page .list-toggle:hover,
+.products-selection-page .product-link.active,
+.products-selection-page .list-toggle.active {
+  background: var(--brand-blue, #173368) !important;
+  border-color: var(--brand-blue, #173368) !important;
+  color: var(--brand-cyan, #09e9b4) !important;
+}
+
+@media (max-width: 900px) {
+  .products-selection-page .product-actions {
+    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
+    gap: 6px !important;
+  }
+
+  .products-selection-page .product-link,
+  .products-selection-page .list-toggle {
+    height: 30px !important;
+    min-height: 30px !important;
+    padding: 0 6px !important;
+    font-size: 11px !important;
+  }
+}
+
diff --git a/components/products/selection/ProductCardGrid.tsx b/components/products/selection/ProductCardGrid.tsx
index 4a63106..552fb5d 100644
--- a/components/products/selection/ProductCardGrid.tsx
+++ b/components/products/selection/ProductCardGrid.tsx
@@ -1,4 +1,4 @@
-"use client";
+锘?use client";
 
 import ProductSelectionCard from "./ProductSelectionCard";
 
@@ -7,24 +7,24 @@ import type { ProductSelectionProductItem } from "./product-selection-ui.types";
 type ProductCardGridProps = {
   products: ProductSelectionProductItem[];
   selectedList: ReadonlySet<string>;
-  detailButtonText: string;
+  selectedDrawingList: ReadonlySet<string>;
   addToListText: string;
   addedToListText: string;
   getTitle: (product: ProductSelectionProductItem) => string;
   getSubtitle: (product: ProductSelectionProductItem) => string;
-  getDetailHref: (product: ProductSelectionProductItem) => string;
-  onToggleList: (productId: string) => void;
+  onRequestDrawing: (product: ProductSelectionProductItem) => void;
+  onToggleList: (product: ProductSelectionProductItem) => void;
 };
 
 export default function ProductCardGrid({
   products,
   selectedList,
-  detailButtonText,
+  selectedDrawingList,
   addToListText,
   addedToListText,
   getTitle,
   getSubtitle,
-  getDetailHref,
+  onRequestDrawing,
   onToggleList,
 }: ProductCardGridProps) {
   return (
@@ -38,12 +38,12 @@ export default function ProductCardGrid({
             product={product}
             title={title}
             subtitle={subtitle}
-            detailHref={getDetailHref(product)}
             isAdded={selectedList.has(product.productId)}
-            detailButtonText={detailButtonText}
+            isDrawingRequested={selectedDrawingList.has(product.productId)}
             addToListText={addToListText}
             addedToListText={addedToListText}
             key={product.productId}
+            onRequestDrawing={onRequestDrawing}
             onToggleList={onToggleList}
           />
         );
@@ -51,3 +51,5 @@ export default function ProductCardGrid({
     </div>
   );
 }
+
+
diff --git a/components/products/selection/ProductSelectionCard.tsx b/components/products/selection/ProductSelectionCard.tsx
index 11cc155..6a65e33 100644
--- a/components/products/selection/ProductSelectionCard.tsx
+++ b/components/products/selection/ProductSelectionCard.tsx
@@ -7,26 +7,27 @@ type ProductSelectionCardProps = {
   product: ProductSelectionProductItem;
   title: string;
   subtitle: string;
-  detailHref: string;
+
   isAdded: boolean;
-  detailButtonText: string;
+  isDrawingRequested: boolean;
   addToListText: string;
   addedToListText: string;
-  onToggleList: (productId: string) => void;
+  onRequestDrawing: (product: ProductSelectionProductItem) => void;
+  onToggleList: (product: ProductSelectionProductItem) => void;
 };
 
 export default function ProductSelectionCard({
   product,
   title,
   subtitle,
-  detailHref,
+
   isAdded,
-  detailButtonText,
+  isDrawingRequested,
   addToListText,
   addedToListText,
+  onRequestDrawing,
   onToggleList,
 }: ProductSelectionCardProps) {
-
   const cardSpecs = getProductCardSpecs(product);
 
   return (
@@ -37,12 +38,13 @@ export default function ProductSelectionCard({
         {product.imageCard ? (
           <img src={product.imageCard} alt={title} loading="lazy" />
         ) : (
-          <div className="product-image-placeholder">閺嗗倹妫ら崶鍓у</div>
+          <div className="product-image-placeholder">鏆傛棤鍥剧墖</div>
         )}
       </div>
 
       <div className="product-body">
         <h3 className="product-title">{title}</h3>
+
         {cardSpecs.length > 0 ? (
           <ul className="product-card-specs" aria-label={`${title} 鏍稿績鍙傛暟`}>
             {cardSpecs.map((spec) => (
@@ -52,19 +54,18 @@ export default function ProductSelectionCard({
         ) : null}
 
         <div className="product-actions">
-          <a
-            className="product-link"
-            href={detailHref}
-            target="_blank"
-            rel="noopener noreferrer"
+          <button
+            className={`product-link ${isDrawingRequested ? "active" : ""}`}
+            type="button"
+            onClick={() => onRequestDrawing(product)}
           >
-            {detailButtonText}
-          </a>
+            {isDrawingRequested ? "宸叉坊鍔犲浘绾? : "娣诲姞鍥剧焊"}
+          </button>
 
           <button
             className={`list-toggle ${isAdded ? "active" : ""}`}
             type="button"
-            onClick={() => onToggleList(product.productId)}
+            onClick={() => onToggleList(product)}
           >
             {isAdded ? addedToListText : addToListText}
           </button>
@@ -75,5 +76,3 @@ export default function ProductSelectionCard({
 }
 
 
-
-
diff --git a/components/products/selection/ProductSelectionClient.tsx b/components/products/selection/ProductSelectionClient.tsx
index 5d11afd..eeb3848 100644
--- a/components/products/selection/ProductSelectionClient.tsx
+++ b/components/products/selection/ProductSelectionClient.tsx
@@ -1,8 +1,10 @@
-"use client";
+锘?use client";
 
 import { useEffect, useMemo, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
+import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
+import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
 
 /* =========================================================
    ProductSelectionClient.tsx
@@ -560,9 +562,30 @@ export default function ProductSelectionClient({
       );
     }
   );
+  const {
+    items: selectionCartItems,
+    addItem,
+    removeItem,
+    getItem,
+    toggleDrawingNeed,
+  } = useSelectionCart();
+
+  const selectedList = useMemo(() => {
+    return new Set(
+      selectionCartItems
+        .filter((item) => item.sourceType === "pump-selection")
+        .map((item) => item.productCode)
+    );
+  }, [selectionCartItems]);
 
-  const [selectedList, setSelectedList] = useState<Set<string>>(() => new Set());
-  const [searchKeyword, setSearchKeyword] = useState("");
+  const selectedDrawingList = useMemo(() => {
+    return new Set(
+      selectionCartItems
+        .filter((item) => item.sourceType === "pump-selection" && item.needDrawing)
+        .map((item) => item.productCode)
+    );
+  }, [selectionCartItems]);
+const [searchKeyword, setSearchKeyword] = useState("");
   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
   const [mobileOpenFilterGroups, setMobileOpenFilterGroups] = useState<
     Record<string, boolean>
@@ -1184,86 +1207,105 @@ export default function ProductSelectionClient({
     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
   }
 
-  function toggleProductInList(productId: string) {
-    setSelectedList((current) => {
-      const next = new Set(current);
 
-      if (next.has(productId)) {
-        next.delete(productId);
-      } else {
-        next.add(productId);
-      }
 
-      return next;
+  function createProductCartItem(
+    product: ProductSelectionProduct,
+    options: {
+      needDrawing?: boolean;
+    } = {}
+  ): SelectionCartItemInput {
+    const title = getText(locale, product.cardTitle, product.productId);
+    const subtitle = getText(locale, product.cardSubtitle, "");
+
+    return {
+      sourceType: "pump-selection",
+      sourceLabel: "浜у搧涓績",
+      productName: getTaxonomyLabel(locale, product.productTypeId),
+      productCode: product.productId,
+      foreachModel: title,
+      competitorModels: [],
+      quantity: 1,
+      needDrawing: Boolean(options.needDrawing),
+      imagePath: product.imageCard,
+      detailHref: makeDetailHref(product as ProductSelectionProduct),
+    };
+  }
+
+  function ensureProductInCart(
+    product: ProductSelectionProduct,
+    options: {
+      needDrawing?: boolean;
+    } = {}
+  ) {
+    const currentItem = getItem("pump-selection", product.productId);
+
+    if (!currentItem) {
+      addItem(createProductCartItem(product, options));
+      return;
+    }
+
+    if (options.needDrawing && !currentItem.needDrawing) {
+      toggleDrawingNeed(currentItem.id, true);
+    }
+  }
+
+  function requestProductDrawing(product: ProductSelectionProduct) {
+    ensureProductInCart(product, {
+      needDrawing: true,
     });
   }
 
-  return (
-    <div data-product-breadcrumb-shell="true" data-product-center-page="true">
-<SitePageShell
-      breadcrumbAriaLabel={
-        locale === "zh" ? "闈㈠寘灞戝鑸? : "Breadcrumb"
-      }
-      breadcrumbItems={[
-        {
-          label: pageText.breadcrumbHome,
-          href: locale === "zh" ? "/" : `/${locale}`,
-        },
-        {
-          label: pageText.breadcrumbCurrent,
-        },
-      ]}
-    >
-      <main className="products-selection-page page">
-      <div className="container">
-        
-
-        <ResourceSearchBar
-          value={searchKeyword}
-          onChange={setSearchKeyword}
-          onSearch={setSearchKeyword}
-          placeholder={pageText.searchPlaceholder}
-          searchButtonText={pageText.searchButton}
-          showRecentKeywords={false}
-        />
-
-        <ProductCategoryTabs
-          categories={categoryItems}
-          activeCategoryId={activeCategoryId}
-          activeCategoryLabel={activeCategory.label}
-          mobileCategoryOpen={mobileCategoryOpen}
-          mobileCategoryPrefix={pageText.mobileCategoryPrefix}
-          onToggleMobileCategory={() =>
-            setMobileCategoryOpen((current) => !current)
-          }
-          onCategoryChange={handleCategoryChange}
-        />
-
-        {activeProductTypeIntro ? (
-          <section
-            className="product-type-intro-module"
-            aria-label={`${activeProductTypeIntro.title}浜у搧绉嶇被璇存槑`}
-          >
-            <div className="product-type-intro-image">
-              <img
-                src={activeProductTypeIntro.image.src}
-                alt={activeProductTypeIntro.image.alt}
-                loading="lazy"
-              />
-            </div>
+  function toggleProductInList(product: ProductSelectionProduct) {
+    const currentItem = getItem("pump-selection", product.productId);
+
+    if (currentItem) {
+      removeItem(currentItem.id);
+      return;
+    }
 
-            <div className="product-type-intro-copy">
-              <h2>{activeProductTypeIntro.title}</h2>
+    addItem(createProductCartItem(product));
+  }
+  return (
+    <div className="products-selection-page">
+      <SitePageShell
+        breadcrumbAriaLabel={locale === "zh" ? "闈㈠寘灞戝鑸? : "Breadcrumb"}
+        breadcrumbItems={[
+          {
+            label: pageText.breadcrumbHome,
+            href: locale === "zh" ? "/" : `/${locale}`,
+          },
+          {
+            label: pageText.breadcrumbCurrent,
+          },
+        ]}
+      >
+        <main className="products-main">
+          <div className="products-container">
+            {activeProductTypeIntro ? (
+              <section
+                className="product-type-intro-module"
+                aria-label={`${activeProductTypeIntro.title}浜у搧绉嶇被璇存槑`}
+              >
+                <div className="product-type-intro-image">
+                  <img
+                    src={activeProductTypeIntro.image.src}
+                    alt={activeProductTypeIntro.image.alt}
+                    loading="lazy"
+                  />
+                </div>
 
-              {activeProductTypeIntro.paragraphs.map((paragraph) => {
-                const emphasisText = "璇︽儏椤垫煡鐪嬫垨鎻愪氦閫夊瀷闇€姹傜‘璁?;
-                const emphasisIndex = paragraph.indexOf(emphasisText);
+                <div className="product-type-intro-copy">
+                  <h2>{activeProductTypeIntro.title}</h2>
+                  {activeProductTypeIntro.paragraphs.map((paragraph) => {
+                    const emphasisText = "璇︽儏椤垫煡鐪嬫垨鎻愪氦閫夊瀷闇€姹傜‘璁?;
+                    const emphasisIndex = paragraph.indexOf(emphasisText);
 
-                if (emphasisIndex < 0) {
-                  return <p key={paragraph}>{paragraph}</p>;
-                }
+                    if (emphasisIndex < 0) {
+                      return <p key={paragraph}>{paragraph}</p>;
+                    }
 
-                return (
+                    return (
                   <p key={paragraph}>
                     {paragraph.slice(0, emphasisIndex)}
                     <strong className="product-type-intro-emphasis">
@@ -1304,7 +1346,7 @@ export default function ProductSelectionClient({
                   <ProductCardGrid
                     products={pagedProducts}
                     selectedList={selectedList}
-                    detailButtonText={pageText.detailButton}
+                    selectedDrawingList={selectedDrawingList}
                     addToListText={pageText.addToList}
                     addedToListText={pageText.addedToList}
                     getTitle={(product) =>
@@ -1313,7 +1355,7 @@ export default function ProductSelectionClient({
                     getSubtitle={(product) =>
                       getText(locale, product.cardSubtitle, "")
                     }
-                    getDetailHref={makeDetailHref}
+                    onRequestDrawing={requestProductDrawing}
                     onToggleList={toggleProductInList}
                   />
 
@@ -1339,4 +1381,13 @@ export default function ProductSelectionClient({
     </SitePageShell>
 </div>
   );
-}
\ No newline at end of file
+}
+
+
+
+
+
+
+
+
+
diff --git a/components/selection-cart/GlobalSelectionCartDrawer.tsx b/components/selection-cart/GlobalSelectionCartDrawer.tsx
index 6691146..e4e7295 100644
--- a/components/selection-cart/GlobalSelectionCartDrawer.tsx
+++ b/components/selection-cart/GlobalSelectionCartDrawer.tsx
@@ -1,4 +1,4 @@
-"use client";
+锘?use client";
 
 /* =========================================================
    GlobalSelectionCartDrawer.tsx
@@ -139,11 +139,18 @@ export default function GlobalSelectionCartDrawer() {
       return {
         id: item.id,
         title: item.foreachModel,
-        metaLines: [
-          `鍟嗗搧缂栫爜锛?{item.productCode}`,
-          `鍏煎缂栫爜锛?{item.competitorModels.join(" / ") || "-"}`,
-          `鏁伴噺锛?{item.quantity}`,
-        ],
+        metaLines:
+          item.sourceType === "pump-selection"
+            ? [
+                `浜у搧绫诲瀷锛?{item.productName}`,
+                `浜у搧鍨嬪彿锛?{item.foreachModel}`,
+                `鏁伴噺锛?{item.quantity}`,
+              ]
+            : [
+                `鍟嗗搧缂栫爜锛?{item.productCode}`,
+                `鍏煎缂栫爜锛?{item.competitorModels.join(" / ") || "-"}`,
+                `鏁伴噺锛?{item.quantity}`,
+              ],
       };
     });
   }, [requestDrawingItems]);
@@ -300,9 +307,9 @@ export default function GlobalSelectionCartDrawer() {
               <tr>
                 <th>搴忓彿</th>
                 <th>鏉ユ簮</th>
-                <th>鍟嗗搧缂栫爜</th>
-                <th>鍏煎缂栫爜</th>
-                <th>鎭掓案杈惧瀷鍙?/th>
+                <th>浜у搧淇℃伅</th>
+                <th>鍏宠仈淇℃伅</th>
+                <th>鍨嬪彿</th>
                 <th>鏁伴噺</th>
                 <th>2D 鍥剧焊</th>
               </tr>
@@ -462,19 +469,26 @@ export default function GlobalSelectionCartDrawer() {
                             >
                               {item.needDrawing ? "宸叉坊鍔犲浘绾? : "娣诲姞鍥剧焊"}
                             </button>
-                          </div>
-
-                          <div className={styles.infoRow}>
-                            <span>鍏煎缂栫爜</span>
-                            <strong>
-                              {item.competitorModels.join(" / ") || "-"}
-                            </strong>
-                          </div>
-
-                          <div className={styles.infoRow}>
-                            <span>鍟嗗搧缂栫爜</span>
-                            <strong>{item.productCode}</strong>
-                          </div>
+                          </div>                          {item.sourceType === "pump-selection" ? (
+                            <div className={styles.infoRow}>
+                              <span>浜у搧绫诲瀷</span>
+                              <strong>{item.productName}</strong>
+                            </div>
+                          ) : (
+                            <>
+                              <div className={styles.infoRow}>
+                                <span>鍏煎缂栫爜</span>
+                                <strong>
+                                  {item.competitorModels.join(" / ") || "-"}
+                                </strong>
+                              </div>
+
+                              <div className={styles.infoRow}>
+                                <span>鍟嗗搧缂栫爜</span>
+                                <strong>{item.productCode}</strong>
+                              </div>
+                            </>
+                          )}
 
                           <div className={styles.quantityRow}>
                             <label htmlFor={`global-cart-qty-${item.id}`}>
@@ -576,4 +590,7 @@ export default function GlobalSelectionCartDrawer() {
       {isMounted ? createPortal(printDocument, document.body) : null}
     </>
   );
-}
\ No newline at end of file
+}
+
+
+
diff --git a/components/selection-cart/SelectionCartProvider.tsx b/components/selection-cart/SelectionCartProvider.tsx
index 090b228..f1aae5a 100644
--- a/components/selection-cart/SelectionCartProvider.tsx
+++ b/components/selection-cart/SelectionCartProvider.tsx
@@ -1,4 +1,4 @@
-"use client";
+锘?use client";
 
 /* =========================================================
    SelectionCartProvider.tsx
@@ -51,6 +51,7 @@ interface SelectionCartContextValue {
 
   changeQuantity: (id: string, quantity: number) => void;
   toggleDrawingNeed: (id: string, needDrawing: boolean) => void;
+  toggleModel3dNeed: (id: string, needModel3d: boolean) => void;
 
   getItem: (
     sourceType: SelectionCartSourceType,
@@ -117,6 +118,7 @@ function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
           : [],
         quantity: Math.max(1, Number(raw.quantity || 1)),
         needDrawing: Boolean(raw.needDrawing),
+        needModel3d: Boolean((raw as any).needModel3d),
         imagePath: raw.imagePath,
         detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
       };
@@ -135,30 +137,33 @@ function buildCartText(items: SelectionCartItem[]) {
   }
 
   const lines = items.map((item, index) => {
+    const isPumpSelection = item.sourceType === "pump-selection";
+
+    if (isPumpSelection) {
+      return [
+        `#${index + 1}`,
+        `鏉ユ簮锛?{item.sourceLabel}`,
+        `浜у搧绫诲瀷锛?{item.productName}`,
+        `浜у搧鍨嬪彿锛?{item.foreachModel}`,
+        `鏁伴噺锛?{item.quantity}`,
+        `2D 鍥剧焊锛?{item.needDrawing ? "闇€瑕? : "鏆備笉闇€瑕?}`,
+      ].join("\n");
+    }
+
     return [
-      `${index + 1}. ${item.foreachModel}`,
+      `#${index + 1}`,
       `鏉ユ簮锛?{item.sourceLabel}`,
+      `浜у搧锛?{item.productName}`,
       `鍟嗗搧缂栫爜锛?{item.productCode}`,
+      `鎭掓案杈惧瀷鍙凤細${item.foreachModel}`,
       `鍏煎缂栫爜锛?{item.competitorModels.join(" / ") || "-"}`,
       `鏁伴噺锛?{item.quantity}`,
       `2D 鍥剧焊锛?{item.needDrawing ? "闇€瑕? : "鏆備笉闇€瑕?}`,
     ].join("\n");
   });
 
-  return [
-    "鎭掓案杈鹃€夊瀷娓呭崟",
-    "",
-    "璇峰崗鍔╃‘璁や互涓嬪瀷鍙枫€佹暟閲忓強鍥剧焊闇€姹傦細",
-    "",
-    lines.join("\n\n"),
-    "",
-    "璇存槑锛氭渶缁堥€傞厤鎬ч渶缁撳悎绠″緞銆佹潗璐ㄣ€佸瘑灏佷欢銆佽繛鎺ユ柟寮忋€佽€愬帇瑕佹眰鍙婂疄闄呭簲鐢ㄧ幆澧冭繘琛岀‘璁ゃ€?,
-  ].join("\n");
+  return lines.join("\n\n");
 }
-
-/* =========================================================
-   Provider
-========================================================= */
 export function SelectionCartProvider({
   children,
 }: {
@@ -245,6 +250,7 @@ export function SelectionCartProvider({
             ...item,
             quantity: item.quantity + quantity,
             needDrawing: Boolean(item.needDrawing || input.needDrawing),
+            needModel3d: Boolean(item.needModel3d || input.needModel3d),
           };
         });
       }
@@ -256,6 +262,7 @@ export function SelectionCartProvider({
           id,
           quantity,
           needDrawing: Boolean(input.needDrawing),
+          needModel3d: Boolean(input.needModel3d),
         },
       ];
     });
@@ -299,6 +306,19 @@ export function SelectionCartProvider({
     });
   }
 
+  function toggleModel3dNeed(id: string, needModel3d: boolean) {
+    setItems((prev) => {
+      return prev.map((item) => {
+        if (item.id !== id) return item;
+
+        return {
+          ...item,
+          needModel3d,
+        };
+      });
+    });
+  }
+
   function getItem(sourceType: SelectionCartSourceType, productCode: string) {
     const id = buildCartItemId({
       sourceType,
@@ -343,6 +363,7 @@ export function SelectionCartProvider({
       clearCart,
       changeQuantity,
       toggleDrawingNeed,
+      toggleModel3dNeed,
       getItem,
       copyCartText,
       generatePdfList,
@@ -370,4 +391,5 @@ export function useSelectionCart() {
   }
 
   return context;
-}
\ No newline at end of file
+}
+
diff --git a/components/selection-cart/selection-cart.types.ts b/components/selection-cart/selection-cart.types.ts
index fb22848..7c26f75 100644
--- a/components/selection-cart/selection-cart.types.ts
+++ b/components/selection-cart/selection-cart.types.ts
@@ -1,4 +1,4 @@
-/* =========================================================
+锘?* =========================================================
    selection-cart.types.ts
    鎭掓案杈惧畼缃戯綔鍏ㄥ眬閫夊瀷娓呭崟绫诲瀷瀹氫箟
 
@@ -68,4 +68,4 @@ export type SelectionCartItemInput = Omit<
 > & {
   id?: string;
   quantity?: number;
-}; 
\ No newline at end of file
+}; 

```
