# 螺纹转倒刺筛选实际渲染检查

生成时间：2026-07-12 21:04:41

> 本次只检查，不修改代码。

## 1. ProductFilterPanel.tsx 完整代码

```tsx
    1: "use client";
    2: 
    3: import { useEffect, useState } from "react";
    4: 
    5: import type {
    6:   ProductSelectionCategoryItem,
    7:   ProductSelectionFilterGroup,
    8: } from "./product-selection-ui.types";
    9: 
   10: type ProductFilterPanelProps = {
   11:   activeCategory: ProductSelectionCategoryItem;
   12:   activeProductTypeId?: string;
   13:   filterGroups: ProductSelectionFilterGroup[];
   14:   mobileOpenFilterGroups?: Record<string, boolean>;
   15:   emptyText: string;
   16:   resetButtonText?: string;
   17:   submitButtonText?: string;
   18:   onToggleMobileGroup?: (
   19:     key: ProductSelectionFilterGroup["key"]
   20:   ) => void;
   21:   isOptionActive: (
   22:     group: ProductSelectionFilterGroup,
   23:     value: string
   24:   ) => boolean;
   25:   isOptionDisabled?: (
   26:     group: ProductSelectionFilterGroup,
   27:     value: string
   28:   ) => boolean;
   29: 
   30:   onFilterChange: (
   31:     group: ProductSelectionFilterGroup,
   32:     value: string
   33:   ) => void;
   34:   onResetFilters?: () => void;
   35: };
   36: 
   37: 
   38: /* BARBED_PORT_FILTER_GROUP_START */
   39: 
   40: const BARBED_PORT_FILTER_KEYS = [
   41:   "filter02",
   42:   "filter03",
   43:   "filter04",
   44: ] as const;
   45: 
   46: const BARBED_PORT_SIZE_OPTIONS = [
   47:   "1.6 mm",
   48:   "2.4 mm",
   49:   "3.2 mm",
   50:   "4.0 mm",
   51:   "4.8 mm",
   52:   "6.4 mm",
   53:   "7.9 mm",
   54:   "9.5 mm",
   55:   "12.7 mm",
   56:   "16.0 mm",
   57: ];
   58: 
   59: function getBarbedPortCount(
   60:   structure: string
   61: ) {
   62:   const portCountMap: Record<
   63:     string,
   64:     number
   65:   > = {
   66:     "直通型": 2,
   67:     "L型": 2,
   68:     "T型": 3,
   69:     "Y型": 3,
   70:     "π型": 1,
   71:     "十字型": 1,
   72:     "倒刺堵头": 1,
   73:   };
   74: 
   75:   return portCountMap[structure] || 3;
   76: }
   77: 
   78: function BarbedPortFilterGroup({
   79:   filterGroups,
   80:   isOptionActive,
   81:   isOptionDisabled,
   82:   onFilterChange,
   83: }: {
   84:   filterGroups:
   85:     ProductSelectionFilterGroup[];
   86: 
   87:   isOptionActive: (
   88:     group:
   89:       ProductSelectionFilterGroup,
   90:     value: string
   91:   ) => boolean;
   92: 
   93:   isOptionDisabled?: (
   94:     group:
   95:       ProductSelectionFilterGroup,
   96:     value: string
   97:   ) => boolean;
   98: 
   99:   onFilterChange: (
  100:     group:
  101:       ProductSelectionFilterGroup,
  102:     value: string
  103:   ) => void;
  104: }) {
  105:   const structureGroup =
  106:     filterGroups.find(
  107:       (group) =>
  108:         group.key === "filter01"
  109:     );
  110: 
  111:   const activeStructure =
  112:     structureGroup?.options.find(
  113:       (option) =>
  114:         isOptionActive(
  115:           structureGroup,
  116:           option.value
  117:         )
  118:     )?.value || "";
  119: 
  120:   const enabledPortCount =
  121:     getBarbedPortCount(
  122:       activeStructure
  123:     );
  124: 
  125:   return (
  126:     <section
  127:       className="filter-group barbed-port-filter-group is-mobile-open"
  128:       data-barbed-port-filter="true"
  129:     >
  130:       <div className="barbed-port-heading-grid">
  131:         <div>接管内径1</div>
  132:         <div>接管内径2</div>
  133:         <div>接管内径3</div>
  134:       </div>
  135: 
  136:       <div className="barbed-port-columns">
  137:         {BARBED_PORT_FILTER_KEYS.map(
  138:           (filterKey, index) => {
  139:             const portNumber =
  140:               index + 1;
  141: 
  142:             const group =
  143:               filterGroups.find(
  144:                 (item) =>
  145:                   item.key === filterKey
  146:               ) ??
  147:               ({
  148:                 key: filterKey,
  149:                 title:
  150:                   `接管内径${portNumber}`,
  151:                 inputType: "single",
  152:                 options: [],
  153:               } as ProductSelectionFilterGroup);
  154: 
  155:             const portDisabled =
  156:               portNumber >
  157:               enabledPortCount;
  158: 
  159:             return (
  160:               <div
  161:                 className={
  162:                   portDisabled
  163:                     ? "barbed-port-column is-disabled"
  164:                     : "barbed-port-column"
  165:                 }
  166:                 key={filterKey}
  167:               >
  168:                 <div className="barbed-port-options">
  169:                   {BARBED_PORT_SIZE_OPTIONS.map(
  170:                     (value) => {
  171:                       const active =
  172:                         isOptionActive(
  173:                           group,
  174:                           value
  175:                         );
  176: 
  177:                       const disabled =
  178:                         !active &&
  179:                         (
  180:                           portDisabled ||
  181:                           Boolean(
  182:                             isOptionDisabled?.(
  183:                               group,
  184:                               value
  185:                             )
  186:                           )
  187:                         );
  188: 
  189:                       return (
  190:                         <button
  191:                           className={
  192:                             [
  193:                               "filter-option",
  194:                               "is-single",
  195:                               "barbed-port-option",
  196:                               active
  197:                                 ? "active"
  198:                                 : "",
  199:                               disabled
  200:                                 ? "is-disabled"
  201:                                 : "",
  202:                             ]
  203:                               .filter(Boolean)
  204:                               .join(" ")
  205:                           }
  206:                           type="button"
  207:                           key={value}
  208:                           disabled={disabled}
  209:                           aria-disabled={disabled}
  210:                           onClick={() => {
  211:                             if (disabled) {
  212:                               return;
  213:                             }
  214: 
  215:                             onFilterChange(
  216:                               group,
  217:                               value
  218:                             );
  219:                           }}
  220:                         >
  221:                           <span className="filter-check" />
  222: 
  223:                           <span className="barbed-port-option-label">
  224:                             {value}
  225:                           </span>
  226:                         </button>
  227:                       );
  228:                     }
  229:                   )}
  230:                 </div>
  231:               </div>
  232:             );
  233:           }
  234:         )}
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
  268:     <aside
  269:       className="filter-panel"
  270:       data-product-type-id={activeProductTypeId || ""}>
  271:       <div className="filter-panel-head">
  272:         <h2>{activeCategory.label}</h2>
  273:         <p>{activeCategory.description}</p>
  274:       </div>
  275: 
  276:       {filterGroups.length > 0 ? (
  277:         filterGroups.map((group) => {
  278:           if (
  279:             activeProductTypeId === "barbed-fittings" &&
  280:             group.key === "filter02"
  281:           ) {
  282:             return (
  283:               <div
  284:                 data-barbed-filter-group="ports"
  285:                 key="barbed-port-filter-group"
  286:               >
  287:                 <BarbedPortFilterGroup
  288:                   filterGroups={filterGroups}
  289:                   isOptionActive={isOptionActive}
  290:                 isOptionDisabled={isOptionDisabled}
  291:                   onFilterChange={onFilterChange}
  292:                 />
  293:               </div>
  294:             );
  295:           }
  296: 
  297:           if (
  298:             activeProductTypeId === "barbed-fittings" &&
  299:             (
  300:               group.key === "filter03" ||
  301:               group.key === "filter04"
  302:             )
  303:           ) {
  304:             return null;
  305:           }
  306: 
  307:           const isProductTypeGroup =
  308:             group.key === "productType";
  309: 
  310:           /*
  311:            * 只有这一组折叠：
  312:            * 接头系列 + 第一个产品种类。
  313:            */
  314:           const isCollapsibleProductType =
  315:             activeCategory.id === "fittings" &&
  316:             isProductTypeGroup;
  317: 
  318:           const isSingleSelectGroup =
  319:             group.key === "productType" ||
  320:             group.key === "filter01";
  321: 
  322:           const activeOption = group.options.find(
  323:             (option) =>
  324:               isOptionActive(group, option.value)
  325:           );
  326: 
  327:           const optionTypeClass = isSingleSelectGroup
  328:             ? "is-single"
  329:             : "is-multi";
  330: 
  331:           /*
  332:            * 保留原有列数逻辑。
  333:            */
  334:                     /*
  335:            * QUICK_CONNECT_TWO_COLUMN_FILTERS
  336:            *
  337:            * 继续使用现有 filter-options two 样式，
  338:            * 不新建快插接头专属CSS。
  339:            */
  340:           const quickConnectTwoColumnTitles = [
  341:             "阀门配置",
  342:             "Valve Configuration",
  343:             "形状",
  344:             "Shape",
  345:             "外壳材质",
  346:             "Housing Material",
  347:             "密封圈材质",
  348:             "Seal Material",
  349:           ];
  350: 
  351:           const shouldUseTwoColumns =
  352:             group.key === "productType" ||
  353:             group.key === "filter02" ||
  354:             group.key === "filter03" ||
  355:             quickConnectTwoColumnTitles.includes(group.title) ||
  356:             group.options.length > 4;
  357: 
  358:           const filterOptionsClass = `filter-options${
  359:             shouldUseTwoColumns ? " two" : " one"
  360:           }`;
  361: 
  362:           /*
  363:            * 只有接头的产品种类使用状态控制。
  364:            * 其他所有组始终展开。
  365:            */
  366:           const isGroupOpen = isCollapsibleProductType
  367:             ? isFittingProductTypeOpen
  368:             : true;
  369: 
  370:           const groupClassName = `filter-group${
  371:             isProductTypeGroup
  372:               ? " product-type-filter-group"
  373:               : ""
  374:           }${
  375:             isCollapsibleProductType
  376:               ? " fittings-product-type-filter-group"
  377:               : ""
  378:           }${isGroupOpen ? " is-mobile-open" : ""}`;
  379: 
  380:           const handleToggleGroup = () => {
  381:             if (!isCollapsibleProductType) {
  382:               return;
  383:             }
  384: 
  385:             setIsFittingProductTypeOpen(
  386:               (current) => !current
  387:             );
  388:           };
  389: 
  390:           const renderOptions = () => (
  391:             <div className={filterOptionsClass}>
  392:               {group.options.map((option) => {
  393:                 const active = isOptionActive(
  394:                   group,
  395:                   option.value
  396:                 );
  397: 
  398:                 return (
  399:                   <button
  400:                     className={`filter-option ${optionTypeClass}${
  401:                       active ? " active" : ""
  402:                     }`}
  403:                     type="button"
  404:                     key={option.value}
  405:                     onClick={() => {
  406:                       onFilterChange(
  407:                         group,
  408:                         option.value
  409:                       );
  410: 
  411:                       /*
  412:                        * 选择接头产品种类后自动收起。
  413:                        */
  414:                       if (isCollapsibleProductType) {
  415:                         setIsFittingProductTypeOpen(
  416:                           false
  417:                         );
  418:                       }
  419:                     }}
  420:                   >
  421:                     <span className="filter-check" />
  422:                     <span>{option.label}</span>
  423:                   </button>
  424:                 );
  425:               })}
  426:             </div>
  427:           );
  428: 
  429:           return (
  430:             <section
  431:               className={groupClassName}
  432:               key={group.key}
  433:             >
  434:               <button
  435:                 className={`filter-group-trigger${
  436:                   isCollapsibleProductType
  437:                     ? " product-type-filter-toggle"
  438:                     : ""
  439:                 }`}
  440:                 type="button"
  441:                 onClick={handleToggleGroup}
  442:                 aria-expanded={isGroupOpen}
  443:               >
  444:                 <span>{group.title}</span>
  445: 
  446:                 {isCollapsibleProductType ? (
  447:                   <span
  448:                     className="filter-group-symbol"
  449:                     aria-hidden="true"
  450:                   >
  451:                     {isGroupOpen ? "−" : "+"}
  452:                   </span>
  453:                 ) : null}
  454:               </button>
  455: 
  456:               {isCollapsibleProductType &&
  457:               !isFittingProductTypeOpen &&
  458:               activeOption ? (
  459:                 <div className="product-type-current-option">
  460:                   <button
  461:                     className="filter-option is-single active"
  462:                     type="button"
  463:                     onClick={() =>
  464:                       setIsFittingProductTypeOpen(
  465:                         true
  466:                       )
  467:                     }
  468:                   >
  469:                     <span className="filter-check" />
  470:                     <span>
  471:                       当前：{activeOption.label}
  472:                     </span>
  473:                   </button>
  474:                 </div>
  475:               ) : null}
  476: 
  477:               {isGroupOpen ? renderOptions() : null}
  478:             </section>
  479:           );
  480:         })
  481:       ) : (
  482:         <div className="filter-empty">
  483:           {emptyText}
  484:         </div>
  485:       )}
  486:     </aside>
  487:   );
  488: }
```

## 2. products.css 中筛选布局相关代码

```css
  125:   padding-top: 24px;
  126: }
  127: 
  128: .products-selection-page .selection-layout {
  129:   display: grid;
  130:   grid-template-columns: 320px minmax(0, 1fr);
  131:   gap: 28px;
  132:   align-items: start;
  133: }
  134: 
  135: .products-selection-page .filter-panel {
  136:   position: sticky;
  137:   top: 24px;
  138:   border: 1px solid var(--line);
  139:   background: #ffffff;
  140: }
  141: 
  142: .products-selection-page .filter-head {
  157:   color: var(--text-sub);
  158:   font-size: 13px;
  159:   line-height: 1.6;
  160: }
  161: 
  162: .products-selection-page .filter-group {
  163:   border-bottom: 1px solid var(--line);
  164: }
  165: 
  166: .products-selection-page .filter-group-title {
  167:   padding: 15px 18px 8px;
  168:   color: var(--brand-blue);
  169:   font-size: 14px;
  170:   font-weight: 920;
  171: }
  172: 
  173: .products-selection-page .filter-options {
  174:   display: grid;
  175:   gap: 8px;
  176:   padding: 0 12px 16px;
  177: }
  178: 
  179: .products-selection-page .filter-options.two {
  180:   grid-template-columns: repeat(2, minmax(0, 1fr));
  181: }
  182: 
  183: .products-selection-page .filter-btn {
  184:   min-height: 42px;
  185:   display: flex;
  186:   align-items: center;
  187:   gap: 12px;
  188:   border: 1px solid transparent;
  189:   background: #f3f6f9;
  190:   color: var(--text-main);
  191:   cursor: pointer;
  192:   padding: 0 12px;
  262:   transform: translate(-50%, -54%);
  263: }
  264: 
  265: .products-selection-page .filter-actions {
  266:   display: grid;
  267:   grid-template-columns: 1fr 1fr;
  268:   gap: 10px;
  269:   padding: 14px;
  270:   background: #ffffff;
  271: }
  272: 
  273: .products-selection-page .filter-action-btn {
  274:   min-height: 40px;
  275:   border-radius: 8px;
  276:   border: 1px solid rgba(23, 51, 104, 0.16);
  277:   background: #ffffff;
  278:   color: var(--brand-blue);
  279:   cursor: pointer;
  394:   color: var(--brand-cyan);
  395: }
  396: 
  397: .products-selection-page .product-grid {
  398:   display: grid;
  399:   grid-template-columns: repeat(3, minmax(0, 1fr));
  400:   gap: 18px;
  401: }
  402: 
  403: .products-selection-page .product-card {
  404:   position: relative;
  405:   min-height: 500px;
  406:   border: 1px solid var(--line);
  407:   background: #ffffff;
  408:   display: flex;
  409:   flex-direction: column;
  410:   overflow: hidden;
  411:   transform: translateY(0);
  550:   text-overflow: ellipsis;
  551: }
  552: 
  553: .products-selection-page .product-actions {
  554:   display: grid;
  555:   grid-template-columns: 1fr 1fr;
  556:   gap: 10px;
  557:   margin-top: auto;
  558:   padding-top: 18px;
  559: }
  560: 
  561: .products-selection-page .product-link,
  562: .products-selection-page .list-toggle {
  563:   height: 44px;
  564:   display: inline-flex;
  565:   align-items: center;
  566:   justify-content: center;
  567:   border-radius: 8px;
  610:   color: var(--text-sub);
  611: }
  612: 
  613: @media (min-width: 2100px) {
  614:   .products-selection-page .product-grid {
  615:     grid-template-columns: repeat(4, 420px);
  616:     gap: 24px;
  617:   }
  618: 
  619:   .products-selection-page .product-card {
  620:     width: 420px;
  621:     height: 540px;
  622:     min-height: 540px;
  623:   }
  624: 
  625:   .products-selection-page .product-image {
  626:     height: 378px;
  627:   }
  637:   .products-selection-page .container {
  638:     width: min(1440px, calc(100% - 56px));
  639:   }
  640: 
  641:   .products-selection-page .product-grid {
  642:     grid-template-columns: repeat(3, minmax(0, 1fr));
  643:     gap: 16px;
  644:   }
  645: 
  646:   .products-selection-page .product-card {
  647:     min-height: 500px;
  648:   }
  649: 
  650:   .products-selection-page .product-image {
  651:     height: 340px;
  652:   }
  653: 
  654:   .products-selection-page .product-body {
  657:   }
  658: }
  659: 
  660: @media (max-width: 1180px) {
  661:   .products-selection-page .selection-layout {
  662:     grid-template-columns: 1fr;
  663:   }
  664: 
  665:   .products-selection-page .filter-panel {
  666:     position: relative;
  667:     top: auto;
  668:   }
  669: 
  670:   .products-selection-page .product-grid {
  671:     grid-template-columns: repeat(2, minmax(0, 1fr));
  672:   }
  673: }
  674: 
  675: @media (max-width: 760px) {
  676:   .products-selection-page {
  677:     padding-top: 20px;
  678:   }
  679: 
  680:   .products-selection-page .container {
  681:     width: min(100% - 32px, 1440px);
  682:   }
  683: 
  690:   .products-selection-page .toolbar-left {
  691:     align-items: flex-start;
  692:     flex-direction: column;
  693:   }
  694: 
  695:   .products-selection-page .filter-options.two,
  696:   .products-selection-page .product-grid {
  697:     grid-template-columns: 1fr;
  698:   }
  699: 
  700:   .products-selection-page .product-card {
  701:     min-height: 480px;
  702:   }
  703: 
  704:   .products-selection-page .product-image {
  705:     height: 320px;
  706:   }
  707: 
  708:   .products-selection-page .product-title {
  709:     font-size: 22px;
  710:   }
  711: 
  712:   .products-selection-page .product-actions {
  713:     grid-template-columns: 1fr;
  714:   }
  715: }
  716: 
  717: /* FOREACH_PRODUCTS_LAYOUT_TUNE_V2_START */
  718: 
  719: /* =========================================================
  720:    浜у搧涓績閫夊瀷椤靛竷灞€寰皟 V2
  721: 
  722:    鍘熷洜锛?
  723:    1. 2K 涓嬪師 2200px 瀹瑰櫒 + 420px 鍥哄畾鍗＄墖杩囧ぇ
  724:    2. 瀹规槗鍑虹幇妯悜婊氬姩
  725:    3. 闈㈠寘灞?class 涓庡叾瀹冮〉闈㈠彲鑳藉啿绐?
  787: .products-selection-page .selection-section {
  788:   padding-top: 20px;
  789: }
  790: 
  791: .products-selection-page .selection-layout {
  792:   grid-template-columns: 300px minmax(0, 1fr);
  793:   gap: 22px;
  794: }
  795: 
  796: /* 宸︿晶绛涢€夌暐寰敹绱?*/
  797: .products-selection-page .filter-head {
  798:   padding: 16px 16px 14px;
  799: }
  800: 
  801: .products-selection-page .filter-head h3 {
  802:   font-size: 19px;
  803: }
  804: 
  805: .products-selection-page .filter-group-title {
  806:   padding: 14px 16px 8px;
  807: }
  808: 
  809: .products-selection-page .filter-options {
  810:   gap: 7px;
  811:   padding: 0 10px 14px;
  812: }
  813: 
  814: .products-selection-page .filter-btn {
  815:   min-height: 38px;
  816:   padding: 0 10px;
  817:   font-size: 13px;
  818: }
  819: 
  820: /* 鍙充晶宸ュ叿鏍?*/
  821: .products-selection-page .product-toolbar {
  828: }
  829: 
  830: /* 浜у搧缃戞牸锛氶粯璁?3 鍒楋紝2K 鍐嶇粰 4 鍒楋紝浣嗕笉鍥哄畾 420px */
  831: .products-selection-page .product-grid {
  832:   display: grid;
  833:   grid-template-columns: repeat(3, minmax(0, 1fr));
  834:   gap: 16px;
  835: }
  836: 
  837: /* 鍗＄墖灏哄锛氬彇娑堜箣鍓?420px 鍥哄畾瀹介珮 */
  838: .products-selection-page .product-card {
  839:   width: auto !important;
  840:   height: auto !important;
  841:   min-height: 410px !important;
  842: }
  843: 
  844: .products-selection-page .product-image {
  845:   height: 255px !important;
  876:   .products-selection-page .container {
  877:     width: min(1680px, calc(100% - 96px));
  878:   }
  879: 
  880:   .products-selection-page .product-grid {
  881:     grid-template-columns: repeat(4, minmax(0, 1fr));
  882:     gap: 18px;
  883:   }
  884: 
  885:   .products-selection-page .product-card {
  886:     width: auto !important;
  887:     height: auto !important;
  888:     min-height: 408px !important;
  889:   }
  890: 
  891:   .products-selection-page .product-image {
  892:     height: 250px !important;
  893:   }
  903:   .products-selection-page .container {
  904:     width: min(1480px, calc(100% - 64px));
  905:   }
  906: 
  907:   .products-selection-page .selection-layout {
  908:     grid-template-columns: 292px minmax(0, 1fr);
  909:     gap: 20px;
  910:   }
  911: 
  912:   .products-selection-page .product-grid {
  913:     grid-template-columns: repeat(3, minmax(0, 1fr));
  914:   }
  915: }
  916: 
  917: @media (max-width: 1280px) {
  918:   .products-selection-page .container {
  919:     width: min(100% - 40px, 1180px);
  920:   }
  921: 
  922:   .products-selection-page .selection-layout {
  923:     grid-template-columns: 1fr;
  924:   }
  925: 
  926:   .products-selection-page .filter-panel {
  927:     position: relative;
  928:     top: auto;
  929:   }
  930: 
  931:   .products-selection-page .product-grid {
  932:     grid-template-columns: repeat(2, minmax(0, 1fr));
  933:   }
  934: }
  935: 
  936: @media (max-width: 760px) {
  937:   .products-selection-page {
  938:     padding-top: 16px;
  939:   }
  940: 
  941:   .products-selection-page .container {
  942:     width: min(100% - 32px, 1440px);
  943:   }
  944: 
  947:     flex-direction: column;
  948:     gap: 10px;
  949:   }
  950: 
  951:   .products-selection-page .product-grid {
  952:     grid-template-columns: 1fr;
  953:   }
  954: 
  955:   .products-selection-page .product-image {
  956:     height: 260px !important;
  957:   }
  958: 
  959:   .products-selection-page .product-actions {
  960:     grid-template-columns: 1fr;
  961:   }
  962: }
  963: 
  964: /* FOREACH_PRODUCTS_LAYOUT_TUNE_V2_END */
  965: 
  966: 
  967: 
  968: /* FOREACH_PRODUCTS_CATEGORY_SPACING_TUNE_START */
  969: 
  970: /* =========================================================
  971:    浜у搧涓績锛氭悳绱㈡爮涓庝骇鍝佸ぇ绫绘寜閽棿璺濆井璋?
  972: 
 1060: .products-selection-page .mobile-category-trigger {
 1061:   display: none;
 1062: }
 1063: 
 1064: .products-selection-page .mobile-category-symbol,
 1065: .products-selection-page .filter-group-symbol {
 1066:   display: none;
 1067: }
 1068: 
 1069: .products-selection-page .filter-group-trigger {
 1070:   width: 100%;
 1071:   border: none;
 1072:   background: transparent;
 1073:   font-family: inherit;
 1074:   text-align: left;
 1075: }
 1076: 
 1077: @media (max-width: 760px) {
 1078:   .products-selection-page .category-tabs-wrap {
 1079:     border: 1px solid rgba(23, 51, 104, 0.12);
 1080:     background: #ffffff;
 1081:     margin-top: 18px !important;
 1117:     border-bottom: none;
 1118:   }
 1119: 
 1120:   .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
 1121:     display: grid !important;
 1122:     grid-template-columns: repeat(2, minmax(0, 1fr));
 1123:   }
 1124: 
 1125:   .products-selection-page .category-tab {
 1126:     width: 100%;
 1127:     min-height: 42px;
 1128:     justify-content: center;
 1129:   }
 1130: 
 1131:   .products-selection-page .filter-panel {
 1132:     display: block !important;
 1133:   }
 1134: 
 1135:   .products-selection-page .filter-group {
 1136:     border-bottom: 1px solid rgba(23, 51, 104, 0.12);
 1137:   }
 1138: 
 1139:   .products-selection-page .filter-group-trigger {
 1140:     min-height: 56px;
 1141:     padding: 0 22px;
 1142:     display: flex;
 1143:     align-items: center;
 1144:     justify-content: space-between;
 1145:     gap: 14px;
 1146:     cursor: pointer;
 1147:   }
 1148: 
 1149:   .products-selection-page .filter-group-symbol {
 1150:     width: 20px;
 1151:     min-width: 20px;
 1152:     display: inline-flex;
 1153:     align-items: center;
 1154:     justify-content: center;
 1155:     color: var(--brand-blue, #173368);
 1156:     font-size: 24px;
 1157:     line-height: 1;
 1158:     font-weight: 900;
 1159:   }
 1160: 
 1161:   .products-selection-page .filter-group .filter-options {
 1162:     display: none !important;
 1163:   }
 1164: 
 1165:   .products-selection-page .filter-group.is-mobile-open .filter-options {
 1166:     display: grid !important;
 1167:   }
 1168: }
 1169: 
 1170: /* FOREACH_PRODUCTS_MOBILE_CATEGORY_AND_FILTER_COLLAPSE_END */
 1171: 
 1172: /* FOREACH_PRODUCTS_PAGINATION_START */
 1173: 
 1174: /* =========================================================
 1175:    浜у搧涓績锛氬垎椤垫寜閽?
 1176: 
 1177:    璇存槑锛?
 1334:   padding-top: 24px;
 1335: }
 1336: 
 1337: .products-selection-page .selection-layout {
 1338:   display: grid;
 1339:   grid-template-columns: 300px minmax(0, 1fr);
 1340:   gap: 24px;
 1341:   align-items: start;
 1342: }
 1343: 
 1344: /* 宸︿晶绛涢€夋爮 */
 1345: .products-selection-page .filter-panel {
 1346:   position: sticky;
 1347:   top: 24px;
 1348:   border: 1px solid var(--line);
 1349:   background: #ffffff;
 1350: }
 1351: 
 1368:   color: var(--text-sub);
 1369:   font-size: 13px;
 1370:   line-height: 1.6;
 1371: }
 1372: 
 1373: .products-selection-page .filter-group {
 1374:   padding: 0;
 1375:   border-bottom: 1px solid var(--line);
 1376: }
 1377: 
 1378: .products-selection-page .filter-group-title,
 1379: .products-selection-page .filter-group-trigger {
 1380:   width: 100%;
 1381:   min-height: auto;
 1382:   margin: 0;
 1383:   padding: 15px 18px 8px;
 1384:   display: flex;
 1385:   align-items: center;
 1386:   justify-content: space-between;
 1387:   border: 0;
 1388:   background: transparent;
 1389:   color: var(--brand-blue);
 1390:   cursor: default;
 1391:   font-family: inherit;
 1393:   font-weight: 920;
 1394:   line-height: 1.35;
 1395:   text-align: left;
 1396: }
 1397: 
 1398: .products-selection-page .filter-group-symbol {
 1399:   display: none;
 1400: }
 1401: 
 1402: .products-selection-page .filter-options {
 1403:   display: grid;
 1404:   gap: 8px;
 1405:   padding: 0 12px 16px;
 1406: }
 1407: 
 1408: .products-selection-page .filter-options.one {
 1409:   grid-template-columns: 1fr;
 1410: }
 1411: 
 1412: .products-selection-page .filter-options.two {
 1413:   grid-template-columns: repeat(2, minmax(0, 1fr));
 1414: }
 1415: 
 1416: .products-selection-page .filter-option,
 1417: .products-selection-page .filter-btn {
 1418:   min-height: 42px;
 1419:   padding: 0 12px;
 1420:   display: flex;
 1421:   align-items: center;
 1422:   justify-content: flex-start;
 1423:   gap: 12px;
 1424:   border: 1px solid transparent;
 1425:   border-radius: 0;
 1511:   transform: translate(-50%, -54%);
 1512: }
 1513: 
 1514: .products-selection-page .filter-panel-actions {
 1515:   display: grid;
 1516:   grid-template-columns: 1fr 1fr;
 1517:   gap: 10px;
 1518:   padding: 14px;
 1519:   background: #ffffff;
 1520: }
 1521: 
 1522: .products-selection-page .filter-panel-actions button {
 1523:   min-height: 40px;
 1524:   border-radius: 8px;
 1525:   border: 1px solid rgba(23, 51, 104, 0.16);
 1526:   background: #ffffff;
 1527:   color: var(--brand-blue);
 1528:   cursor: pointer;
 1625: }
 1626: 
 1627: /* 浜у搧鍗＄墖 */
 1628: .products-selection-page .product-grid {
 1629:   display: grid;
 1630:   grid-template-columns: repeat(3, minmax(0, 1fr));
 1631:   gap: 18px;
 1632: }
 1633: 
 1634: .products-selection-page .product-card {
 1635:   position: relative;
 1636:   min-height: auto;
 1637:   border: 1px solid var(--line);
 1638:   background: #ffffff;
 1639:   display: flex;
 1640:   flex-direction: column;
 1641:   overflow: hidden;
 1642:   transform: translateY(0);
 1731:   text-overflow: ellipsis;
 1732: }
 1733: 
 1734: .products-selection-page .product-actions {
 1735:   display: grid;
 1736:   grid-template-columns: 1fr 1fr;
 1737:   gap: 10px;
 1738:   margin-top: auto;
 1739:   padding-top: 14px;
 1740: }
 1741: 
 1742: .products-selection-page .product-link,
 1743: .products-selection-page .list-toggle {
 1744:   height: 40px;
 1745:   display: inline-flex;
 1746:   align-items: center;
 1747:   justify-content: center;
 1748:   border-radius: 8px;
 1807: 
 1808: 
 1809: 
 1810: @media (max-width: 1180px) {
 1811:   .products-selection-page .selection-layout {
 1812:     grid-template-columns: 1fr;
 1813:   }
 1814: 
 1815:   .products-selection-page .filter-panel {
 1816:     position: relative;
 1817:     top: auto;
 1818:   }
 1819: 
 1820:   .products-selection-page .product-area {
 1821:     max-width: none;
 1822:   }
 1823: 
 1824:   .products-selection-page .product-grid {
 1825:     grid-template-columns: repeat(2, minmax(0, 1fr));
 1826:   }
 1827: }
 1828: 
 1829: @media (max-width: 760px) {
 1830:   .products-selection-page .container {
 1831:     width: min(100% - 32px, 1440px);
 1832:   }
 1833: 
 1834:   .products-selection-page .mobile-category-trigger {
 1835:     width: 100%;
 1836:     min-height: 48px;
 1837:     padding: 0 16px;
 1847:   }
 1848: 
 1849:   .products-selection-page .category-tabs {
 1850:     display: none;
 1851:     margin-top: 12px;
 1852:     grid-template-columns: repeat(2, minmax(0, 1fr));
 1853:     gap: 10px;
 1854:   }
 1855: 
 1856:   .products-selection-page .category-tabs-wrap.is-mobile-open .category-tabs {
 1857:     display: grid;
 1858:   }
 1859: 
 1860:   .products-selection-page .category-tab {
 1861:     width: 100%;
 1862:   }
 1863: 
 1864:   .products-selection-page .filter-group-title,
 1865:   .products-selection-page .filter-group-trigger {
 1866:     min-height: 52px;
 1867:     padding: 0 16px;
 1868:     cursor: pointer;
 1869:   }
 1870: 
 1871:   .products-selection-page .filter-group-symbol {
 1872:     display: inline-flex;
 1873:   }
 1874: 
 1875:   .products-selection-page .filter-group .filter-options {
 1876:     display: none;
 1877:     padding: 0 16px 16px;
 1878:   }
 1879: 
 1880:   .products-selection-page .filter-group.is-mobile-open .filter-options {
 1881:     display: grid;
 1882:   }
 1883: 
 1884:   .products-selection-page .filter-options.two {
 1885:     grid-template-columns: 1fr;
 1886:   }
 1887: 
 1888:   .products-selection-page .product-toolbar {
 1889:     align-items: flex-start;
 1890:     flex-direction: column;
 1891:   }
 1892: 
 1893:   .products-selection-page .product-grid {
 1894:     grid-template-columns: repeat(2, minmax(0, 1fr));
 1895:     gap: 12px;
 1896:   }
 1897: 
 1898:   .products-selection-page .product-card {
 1899:     min-height: auto;
 1900:   }
 1901: 
 1902:   .products-selection-page .product-image {
 1903:     width: 100%;
 1904:     aspect-ratio: 1 / 1;
 1905:     height: auto;
 1906:     padding: 8px;
 1968: 
 1969: .product-selection-layout,
 1970: .selection-layout,
 1971: .products-layout {
 1972:   display: grid !important;
 1973:   grid-template-columns: 420px minmax(0, 1fr) !important;
 1974:   gap: 32px !important;
 1975: }
 1976: 
 1977: .product-filter-sidebar,
 1978: .filter-sidebar,
 1979: .selection-sidebar {
 1980:   width: 420px !important;
 1981:   min-width: 420px !important;
 1982: }
 1983: 
 1984: .product-card-grid,
 1985: .selection-card-grid,
 1986: .products-grid {
 1987:   grid-template-columns: repeat(3, minmax(300px, 1fr)) !important;
 1988:   gap: 28px !important;
 1989: }
 1990: 
 1991: @media (max-width: 1200px) {
 1992:   .product-selection-layout,
 1993:   .selection-layout,
 1994:   .products-layout {
 1995:     grid-template-columns: 340px minmax(0, 1fr) !important;
 1996:   }
 1997: 
 1998:   .product-filter-sidebar,
 1999:   .filter-sidebar,
 2000:   .selection-sidebar {
 2001:     width: 340px !important;
 2002:     min-width: 340px !important;
 2003:   }
 2004: }
 2005: 
 2006: @media (max-width: 768px) {
 2007:   .product-selection-layout,
 2102:   margin-right: auto !important;
 2103: }
 2104: 
 2105: .products-selection-page .selection-layout {
 2106:   display: grid !important;
 2107:   grid-template-columns: 420px minmax(0, 1fr) !important;
 2108:   gap: 32px !important;
 2109:   align-items: start !important;
 2110: }
 2111: 
 2112: .products-selection-page .product-area {
 2113:   width: 100% !important;
 2114:   max-width: none !important;
 2115:   min-width: 0 !important;
 2116: }
 2117: 
 2118: .products-selection-page .product-grid {
 2119:   display: grid !important;
 2120:   grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
 2121:   gap: 28px !important;
 2122: }
 2123: 
 2124: @media (max-width: 1180px) {
 2125:   .products-selection-page .container {
 2126:     width: min(100% - 48px, 100%) !important;
 2127:     max-width: none !important;
 2128:   }
 2129: 
 2130:   .products-selection-page .selection-layout {
 2131:     grid-template-columns: 1fr !important;
 2132:   }
 2133: 
 2134:   .products-selection-page .product-grid {
 2135:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 2136:   }
 2137: }
 2138: 
 2139: @media (max-width: 760px) {
 2140:   .products-selection-page .container {
 2141:     width: min(100% - 32px, 100%) !important;
 2142:   }
 2143: 
 2144:   .products-selection-page .product-grid {
 2145:     grid-template-columns: 1fr !important;
 2146:   }
 2147: }
 2148: 
 2149: /* ===== FOREACH final product center width END ===== */
 2150: 
 2151: 
 2152: /* ===== FOREACH product card final stable START ===== */
 2153: 
 2154: /*
 2155:   产品中心卡片最终稳定版：
 2156:   - 保留顶部绿色线
 2157:   - 保留 hover / 选中绿边
 2228: /* 按钮区域压缩，不再留太多空白 */
 2229: .products-selection-page .product-actions {
 2230:   margin-top: 12px !important;
 2231:   padding-top: 0 !important;
 2232:   display: grid !important;
 2233:   grid-template-columns: 1fr 1fr !important;
 2234:   gap: 10px !important;
 2235: }
 2236: 
 2237: .products-selection-page .product-link,
 2238: .products-selection-page .list-toggle {
 2239:   height: 38px !important;
 2240:   min-height: 38px !important;
 2241:   padding: 0 12px !important;
 2242:   font-size: 13px !important;
 2243:   font-weight: 700 !important;
 2244: }
 2245: 
 2326: }
 2327: 
 2328: /* 中等屏幕及以下：统一 2 个一排 */
 2329: @media (max-width: 1500px) {
 2330:   .products-selection-page .product-grid {
 2331:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 2332:   }
 2333: 
 2334:   .products-selection-page .product-card,
 2335:   .products-selection-page .product-card-link {
 2336:     min-width: 0 !important;
 2337:   }
 2338: }
 2339: 
 2340: /* 手机屏幕：仍然保持 2 个一排，不切成 1 个一排 */
 2341: @media (max-width: 900px) {
 2342:   .products-selection-page .product-grid {
 2343:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 2344:   }
 2345: }
 2346: 
 2347: /* 极窄屏保护：防止按钮和文字撑破卡片 */
 2348: @media (max-width: 520px) {
 2349:   .products-selection-page .product-grid {
 2350:     gap: 10px !important;
 2351:   }
 2352: 
 2353:   .products-selection-page .product-card {
 2354:     min-width: 0 !important;
 2355:   }
 2482:    3. 当前项要和普通筛选项一样撑满一整行
 2483:    4. 桌面端产品类型标题右侧必须显示 + / -
 2484: ========================================================= */
 2485: 
 2486: /* 桌面端：产品类型标题保持原筛选标题风格，同时右侧显示 + / - */
 2487: .products-selection-page .product-type-filter-group .filter-group-trigger {
 2488:   width: 100%;
 2489:   min-height: auto;
 2490:   margin: 0;
 2491:   padding: 15px 18px 8px;
 2492:   border: 0;
 2493:   background: transparent;
 2494:   display: flex !important;
 2495:   align-items: center;
 2496:   justify-content: space-between;
 2497:   color: var(--brand-blue);
 2498:   font-family: inherit;
 2499:   font-size: 14px;
 2502:   text-align: left;
 2503:   cursor: pointer;
 2504: }
 2505: 
 2506: /* 桌面端：强制产品类型右侧 + / - 显示出来 */
 2507: .products-selection-page .product-type-filter-group .filter-group-symbol {
 2508:   display: inline-flex !important;
 2509:   align-items: center;
 2510:   justify-content: center;
 2511:   min-width: 20px;
 2512:   margin-left: auto;
 2513:   color: var(--brand-blue);
 2514:   font-size: 18px;
 2515:   font-weight: 900;
 2516:   line-height: 1;
 2517: }
 2518: 
 2519: /* 产品类型折叠后的当前项区域：恢复和普通筛选项一致的左右间距 */
 2528:   justify-content: flex-start;
 2529: }
 2530: 
 2531: /* 桌面端：产品类型未展开时只显示当前项，不显示完整选项 */
 2532: @media (min-width: 901px) {
 2533:   .products-selection-page .product-type-filter-group:not(.is-mobile-open) > .filter-options {
 2534:     display: none !important;
 2535:   }
 2536: 
 2537:   .products-selection-page .product-type-filter-group.is-mobile-open > .filter-options {
 2538:     display: grid !important;
 2539:   }
 2540: }
 2541: 
 2542: /* 产品中心：产品种类介绍区最终整理版
 2543:    说明：
 2544:    1. 这是产品中心顶部产品种类介绍区的唯一最终样式
 2545:    2. 左侧产品图固定占位，右侧正文吃满剩余空间
 2546:    3. HaloFlx 仅作为右下角背景装饰，不参与布局、不预留空间
 2547:    4. 只加粗 .product-type-intro-emphasis 包住的指定文字
 2548: ========================================================= */
 2549: 
 2552:   isolation: isolate !important;
 2553:   width: 100% !important;
 2554:   margin: 0 0 28px !important;
 2555:   padding: 24px 0 24px 0 !important;
 2556:   display: grid !important;
 2557:   grid-template-columns: 430px minmax(0, 1fr) !important;
 2558:   gap: 46px !important;
 2559:   align-items: center !important;
 2560:   justify-content: stretch !important;
 2561:   overflow: hidden !important;
 2562:   border: 0 !important;
 2563:   border-top: 1px solid var(--line) !important;
 2564:   background: transparent !important;
 2565: }
 2566: 
 2567: /* 左侧产品图 */
 2568: .products-selection-page .product-type-intro-image {
 2569:   position: relative !important;
 2644: 
 2645: /* 中等屏幕 */
 2646: @media (max-width: 1400px) {
 2647:   .products-selection-page .product-type-intro-module {
 2648:     padding: 24px 0 22px 0 !important;
 2649:     grid-template-columns: 390px minmax(0, 1fr) !important;
 2650:     gap: 38px !important;
 2651:   }
 2652: 
 2653:   .products-selection-page .product-type-intro-image {
 2654:     width: 390px !important;
 2655:     height: 290px !important;
 2656:   }
 2657: 
 2658:   .products-selection-page .product-type-intro-image img {
 2659:     transform: scale(1.14) !important;
 2660:   }
 2661: 
 2679: /* 手机端 */
 2680: @media (max-width: 900px) {
 2681:   .products-selection-page .product-type-intro-module {
 2682:     margin-bottom: 20px !important;
 2683:     padding: 22px 0 20px !important;
 2684:     grid-template-columns: 1fr !important;
 2685:     gap: 14px !important;
 2686:   }
 2687: 
 2688:   .products-selection-page .product-type-intro-image {
 2689:     width: 100% !important;
 2690:     height: 230px !important;
 2691:   }
 2692: 
 2693:   .products-selection-page .product-type-intro-image img {
 2694:     transform: scale(1.08) !important;
 2695:   }
 2696: 
 2864:    2. 当前仅保留添加图纸与加入清单两个操作
 2865:    3. 默认白底蓝字，选中后深蓝底 + 荧光字
 2866: ========================================================= */
 2867: .products-selection-page .product-actions {
 2868:   display: grid !important;
 2869:   grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 2870:   gap: 8px !important;
 2871: }
 2872: 
 2873: .products-selection-page .product-link,
 2874: .products-selection-page .list-toggle {
 2875:   height: 34px !important;
 2876:   min-height: 34px !important;
 2877:   padding: 0 8px !important;
 2878:   border: 1px solid var(--brand-blue, #173368) !important;
 2879:   border-radius: 6px !important;
 2880:   background: #ffffff !important;
 2881:   color: var(--brand-blue, #173368) !important;
 2900:   color: var(--brand-cyan, #09e9b4) !important;
 2901: }
 2902: 
 2903: @media (max-width: 900px) {
 2904:   .products-selection-page .product-actions {
 2905:     grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 2906:     gap: 6px !important;
 2907:   }
 2908: 
 2909:   .products-selection-page .product-link,
 2910:   .products-selection-page .list-toggle {
 2911:     height: 30px !important;
 2912:     min-height: 30px !important;
 2913:     padding: 0 6px !important;
 2914:     font-size: 11px !important;
 2915:   }
 2916: }
 2917: 
 3030:   content: "HaloDp" !important;
 3031: }
 3032: /* ===== FOREACH diaphragm product type intro brand word END ===== */
 3033: /* ===== FOREACH desktop hide filter symbol START ===== */
 3034: @media (min-width: 901px) {
 3035:   .products-selection-page .filter-panel .filter-group-trigger .filter-group-symbol,
 3036:   .products-selection-page .filter-panel .product-type-filter-toggle .filter-group-symbol {
 3037:     display: none !important;
 3038:   }
 3039: }
 3040: /* ===== FOREACH desktop hide filter symbol END ===== */
 3041: 
 3042: /* =========================================================
 3043:    接头系列：仅第一个“产品种类”显示加减折叠按钮
 3044:    ========================================================= */
 3045: 
 3046: .products-selection-page
 3047: .fittings-product-type-filter-group
 3048: .product-type-filter-toggle {
 3049:   width: 100%;
 3050:   min-height: 42px;
 3051:   padding: 12px 16px;
 3052:   border: 0;
 3053:   background: #ffffff;
 3054:   color: var(--brand-blue);
 3055:   display: flex;
 3056:   align-items: center;
 3057:   justify-content: space-between;
 3058:   gap: 16px;
 3059:   cursor: pointer;
 3061:   font-weight: 900;
 3062:   text-align: left;
 3063: }
 3064: 
 3065: .products-selection-page
 3066: .fittings-product-type-filter-group
 3067: .product-type-filter-toggle::after {
 3068:   content: "+";
 3069:   width: 24px;
 3070:   height: 24px;
 3071:   flex: 0 0 24px;
 3072:   display: inline-flex;
 3073:   align-items: center;
 3074:   justify-content: center;
 3075:   color: var(--brand-blue);
 3076:   font-size: 21px;
 3077:   font-weight: 500;
 3078:   line-height: 1;
 3079: }
 3080: 
 3081: .products-selection-page
 3082: .fittings-product-type-filter-group.is-mobile-open
 3083: .product-type-filter-toggle::after {
 3084:   content: "−";
 3085: }
 3086: 
 3087: .products-selection-page
 3088: .fittings-product-type-filter-group
 3089: .product-type-filter-toggle:hover {
 3090:   background: #f8fafc;
 3091: }
 3092: 
 3093: /* 避免组件内已有符号与伪元素重复 */
 3094: .products-selection-page
 3095: .fittings-product-type-filter-group
 3096: .product-type-filter-toggle
 3097: .filter-group-symbol {
 3098:   display: none;
 3099: }
 3100: 
 3101: 
 3102: /* BARBED_FITTING_FILTER_LAYOUT_START */
 3103: 
 3104: /*
 3105:  * 倒刺接头接管内径布局
 3106:  *
 3107:  * 1. 接管1、接管2、接管3横向一排
 3108:  * 2. 每个接管内部的内径选项两列排列
 3109:  * 3. 选项使用与主体材质相同的按钮形式
 3110:  */
 3111: 
 3112: /*
 3113:  * 倒刺接头筛选内容较多，
 3114:  * 仅在该筛选存在时适当加宽左栏。
 3115:  */
 3116: .products-selection-page
 3117:   .selection-layout:has(
 3118:     [data-barbed-port-filter="true"]
 3119:   ) {
 3120:   grid-template-columns:
 3121:     460px minmax(0, 1fr);
 3122: }
 3123: 
 3124: .products-selection-page
 3125:   .barbed-port-filter-title {
 3126:   cursor: default;
 3127: }
 3128: 
 3129: .products-selection-page
 3130:   .barbed-port-columns {
 3131:   display: grid;
 3132:   grid-template-columns:
 3133:     repeat(3, minmax(0, 1fr));
 3134:   gap: 10px;
 3135:   padding: 0 12px 16px;
 3136: }
 3137: 
 3138: .products-selection-page
 3139:   .barbed-port-column {
 3140:   min-width: 0;
 3141:   padding: 10px;
 3142:   border: 1px solid #e5ebf2;
 3143:   background: #ffffff;
 3144: }
 3145: 
 3146: .products-selection-page
 3147:   .barbed-port-column-title {
 3148:   margin-bottom: 8px;
 3149:   color: #173368;
 3150:   font-size: 13px;
 3151:   font-weight: 850;
 3152:   line-height: 1.3;
 3153: }
 3154: 
 3155: .products-selection-page
 3156:   .barbed-port-options {
 3157:   display: grid;
 3158:   grid-template-columns:
 3159:     repeat(2, minmax(0, 1fr));
 3160:   gap: 6px;
 3161: }
 3162: 
 3163: .products-selection-page
 3164:   .barbed-port-option {
 3165:   width: 100%;
 3166:   min-width: 0;
 3167:   min-height: 38px;
 3168:   padding: 0 7px;
 3169:   gap: 6px;
 3170:   justify-content: flex-start;
 3171:   font-size: 12px;
 3172: }
 3173: 
 3174: .products-selection-page
 3175:   .barbed-port-option
 3176:   .filter-check {
 3177:   width: 11px;
 3178:   height: 11px;
 3179:   flex: 0 0 11px;
 3180: }
 3181: 
 3182: .products-selection-page
 3183:   .barbed-port-option-label {
 3184:   min-width: 0;
 3185:   overflow: hidden;
 3186:   text-overflow: ellipsis;
 3187:   white-space: nowrap;
 3188: }
 3189: 
 3190: .products-selection-page
 3191:   .barbed-port-column.is-disabled {
 3192:   background: #f5f7fa;
 3193:   border-color: #e6eaf0;
 3194: }
 3195: 
 3196: .products-selection-page
 3197:   .barbed-port-column.is-disabled
 3198:   .barbed-port-column-title {
 3199:   color: #9aa5b5;
 3200: }
 3201: 
 3202: .products-selection-page
 3203:   .barbed-port-disabled {
 3204:   min-height: 38px;
 3205:   display: flex;
 3206:   align-items: center;
 3207:   justify-content: center;
 3208:   border: 1px solid #e2e7ed;
 3209:   background: #eef1f5;
 3210:   color: #9aa5b5;
 3211:   font-size: 12px;
 3212:   font-weight: 700;
 3213: }
 3214: 
 3215: /*
 3217:  * 三个接管仍然保持同一排。
 3218:  */
 3219: @media (max-width: 1180px) {
 3220:   .products-selection-page
 3221:     .selection-layout:has(
 3222:       [data-barbed-port-filter="true"]
 3223:     ) {
 3224:     grid-template-columns: 1fr;
 3225:   }
 3226: }
 3227: 
 3228: /*
 3229:  * 手机端空间不足时再改为纵向，
 3230:  * 避免按钮文字被压坏。
 3231:  */
 3232: @media (max-width: 760px) {
 3233:   .products-selection-page
 3234:     .barbed-port-columns {
 3235:     grid-template-columns: 1fr;
 3236:   }
 3237: 
 3238:   .products-selection-page
 3239:     .barbed-port-options {
 3240:     grid-template-columns:
 3241:       repeat(2, minmax(0, 1fr));
 3242:   }
 3243: }
 3244: 
 3245: /* BARBED_FITTING_FILTER_LAYOUT_END */
 3246: 
 3247: /* BARBED_PORT_VERTICAL_LIST_START */
 3248: 
 3249: /*
 3250:  * 接管1、接管2、接管3横向三列；
 3251:  * 每个接管下面的内径选项竖向单列排列。
 3252:  */
 3253: .products-selection-page .barbed-port-columns {
 3254:   display: grid;
 3255:   grid-template-columns: repeat(3, minmax(0, 1fr));
 3256:   gap: 10px;
 3257:   padding: 0 12px 16px;
 3258: }
 3259: 
 3260: .products-selection-page .barbed-port-column {
 3261:   min-width: 0;
 3262: }
 3263: 
 3264: .products-selection-page .barbed-port-options {
 3265:   display: grid;
 3266:   grid-template-columns: 1fr;
 3267:   gap: 6px;
 3268: }
 3269: 
 3270: .products-selection-page .barbed-port-option {
 3271:   width: 100%;
 3272:   min-width: 0;
 3273:   min-height: 40px;
 3274:   padding: 0 10px;
 3275:   display: flex;
 3276:   align-items: center;
 3277:   justify-content: flex-start;
 3278:   gap: 8px;
 3279:   font-size: 13px;
 3280: }
 3281: 
 3282: .products-selection-page .barbed-port-option-label {
 3283:   display: block;
 3284:   min-width: 0;
 3285:   overflow: visible;
 3286:   text-overflow: clip;
 3287:   white-space: nowrap;
 3288: }
 3289: 
 3290: .products-selection-page .barbed-port-option .filter-check {
 3291:   width: 12px;
 3292:   height: 12px;
 3293:   flex: 0 0 12px;
 3294: }
 3295: 
 3296: /* BARBED_PORT_VERTICAL_LIST_END */
 3297: 
 3298: /* BARBED_PORT_FINAL_DISABLED_STYLE_START */
 3299: 
 3300: /*
 3301:  * 接管1、接管2、接管3横向三列。
 3302:  */
 3303: .products-selection-page .barbed-port-columns {
 3304:   display: grid;
 3305:   grid-template-columns:
 3306:     repeat(3, minmax(0, 1fr));
 3307:   gap: 10px;
 3308:   padding: 0 12px 16px;
 3309: }
 3310: 
 3311: /*
 3312:  * 去掉每个接管列自己的外框。
 3313:  */
 3314: .products-selection-page .barbed-port-column,
 3315: .products-selection-page .barbed-port-column.is-disabled {
 3316:   min-width: 0;
 3317:   padding: 0 !important;
 3318:   border: 0 !important;
 3319:   background: transparent !important;
 3320: }
 3321: 
 3322: /*
 3323:  * 每个接管的尺寸竖向排列。
 3324:  */
 3325: .products-selection-page .barbed-port-options {
 3326:   display: grid;
 3327:   grid-template-columns: 1fr;
 3328:   gap: 6px;
 3329: }
 3330: 
 3331: .products-selection-page .barbed-port-option {
 3332:   width: 100%;
 3333:   min-width: 0;
 3334:   min-height: 40px;
 3335:   padding: 0 8px;
 3336:   justify-content: flex-start;
 3337:   gap: 7px;
 3338: }
 3339: 
 3340: .products-selection-page .barbed-port-option-label {
 3341:   overflow: visible;
 3342:   text-overflow: clip;
 3343:   white-space: nowrap;
 3344: }
 3345: 
 3346: /*
 3347:  * 当前组合中不存在的内径：
 3348:  * 保留显示、变灰、不可点击。
 3349:  */
 3350: .products-selection-page .barbed-port-option.is-disabled,
 3351: .products-selection-page .barbed-port-option:disabled {
 3352:   border-color: #e4e8ed !important;
 3353:   background: #f1f3f6 !important;
 3354:   color: #a5adba !important;
 3355:   cursor: not-allowed !important;
 3356:   opacity: 1 !important;
 3357: }
 3358: 
 3359: .products-selection-page
 3360:   .barbed-port-option.is-disabled
 3361:   .filter-check,
 3362: .products-selection-page
 3363:   .barbed-port-option:disabled
 3364:   .filter-check {
 3365:   border-color: #cbd2dc !important;
 3366:   background: #e7eaee !important;
 3367:   box-shadow: none !important;
 3368: }
 3369: 
 3370: .products-selection-page
 3371:   .barbed-port-option.is-disabled:hover,
 3372: .products-selection-page
 3373:   .barbed-port-option:disabled:hover {
 3374:   border-color: #e4e8ed !important;
 3375:   background: #f1f3f6 !important;
 3376:   color: #a5adba !important;
 3377: }
 3378: 
 3379: .products-selection-page
 3380:   .barbed-port-column.is-disabled
 3381:   .barbed-port-column-title {
 3382:   color: #a5adba;
 3383: }
 3384: 
 3385: /* BARBED_PORT_FINAL_DISABLED_STYLE_END */
 3386: 
 3387: /* BARBED_PORT_FINAL_LAYOUT_START */
 3388: 
 3389: /*
 3390:  * 只保留：
 3391:  * 接管内径1 / 接管内径2 / 接管内径3
 3392:  */
 3393: .products-selection-page
 3394:   .barbed-port-filter-title,
 3395: .products-selection-page
 3396:   .barbed-port-column-title {
 3397:   display: none !important;
 3398: }
 3399: 
 3400: .products-selection-page
 3401:   .barbed-port-heading-grid {
 3402:   display: grid;
 3403:   grid-template-columns:
 3404:     repeat(3, minmax(0, 1fr));
 3405:   gap: 10px;
 3406:   padding: 14px 12px 8px;
 3407:   color: #173368;
 3408:   font-size: 13px;
 3409:   font-weight: 850;
 3410:   line-height: 1.3;
 3411: }
 3412: 
 3413: .products-selection-page
 3414:   .barbed-port-columns {
 3415:   display: grid;
 3416:   grid-template-columns:
 3417:     repeat(3, minmax(0, 1fr));
 3418:   gap: 10px;
 3419:   padding: 0 12px 16px;
 3420: }
 3421: 
 3422: .products-selection-page
 3423:   .barbed-port-column,
 3424: .products-selection-page
 3425:   .barbed-port-column.is-disabled {
 3426:   min-width: 0;
 3427:   padding: 0 !important;
 3428:   border: 0 !important;
 3429:   background: transparent !important;
 3430: }
 3431: 
 3432: .products-selection-page
 3433:   .barbed-port-options {
 3434:   display: grid;
 3435:   grid-template-columns: 1fr;
 3436:   gap: 6px;
 3437: }
 3438: 
 3439: .products-selection-page
 3440:   .barbed-port-option {
 3441:   width: 100%;
 3442:   min-width: 0;
 3443:   min-height: 40px;
 3444:   padding: 0 8px;
 3445:   justify-content: flex-start;
 3446:   gap: 7px;
 3447: }
 3448: 
 3449: .products-selection-page
 3450:   .barbed-port-option-label {
 3451:   overflow: visible;
 3452:   text-overflow: clip;
 3453:   white-space: nowrap;
 3454: }
 3455: 
 3456: /*
 3457:  * 无对应型号的内径：
 3458:  * 保留位置、灰色显示、不能点击。
 3459:  */
 3460: .products-selection-page
 3461:   .barbed-port-option.is-disabled,
 3462: .products-selection-page
 3463:   .barbed-port-option:disabled {
 3464:   border-color: #e4e8ed !important;
 3465:   background: #f1f3f6 !important;
 3466:   color: #a8b0bc !important;
 3467:   cursor: not-allowed !important;
 3468:   opacity: 1 !important;
 3469: }
 3470: 
 3471: .products-selection-page
 3472:   .barbed-port-option.is-disabled
 3473:   .filter-check,
 3474: .products-selection-page
 3475:   .barbed-port-option:disabled
 3476:   .filter-check {
 3477:   border-color: #cbd2dc !important;
 3478:   background: #e6e9ed !important;
 3479:   box-shadow: none !important;
 3480: }
 3481: 
 3482: .products-selection-page
 3483:   .barbed-port-option.is-disabled:hover,
 3484: .products-selection-page
 3485:   .barbed-port-option:disabled:hover {
 3486:   border-color: #e4e8ed !important;
 3487:   background: #f1f3f6 !important;
 3488:   color: #a8b0bc !important;
 3489: }
 3490: 
 3491: /* BARBED_PORT_FINAL_LAYOUT_END */
 3492: 
 3493: /* =========================================================
 3494:    THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_START
 3495: 
 3496:    螺纹转倒刺接头筛选布局：
 3497:    1. 密封方式 filter02：每个选项独占一整行
 3498:    2. 连接结构 filter01：两个选项一排
 3499:    3. 只影响 thread-to-barbed-fittings
 3500:    ========================================================= */
 3501: 
 3502: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3503:   .filter-group-filter02
 3504:   .filter-options,
 3505: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3506:   [data-filter-key="filter02"]
 3507:   .filter-options {
 3508:   display: grid !important;
 3509:   grid-template-columns: minmax(0, 1fr) !important;
 3510: }
 3511: 
 3512: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3513:   .filter-group-filter01
 3514:   .filter-options,
 3515: .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3516:   [data-filter-key="filter01"]
 3517:   .filter-options {
 3518:   display: grid !important;
 3519:   grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
 3520: }
 3521: 
 3522: @media (max-width: 760px) {
 3523:   .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3524:     .filter-group-filter01
 3525:     .filter-options,
 3526:   .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
 3527:     [data-filter-key="filter01"]
 3528:     .filter-options {
 3529:     grid-template-columns: minmax(0, 1fr) !important;
 3530:   }
 3531: }
 3532: 
 3533: /* THREAD_TO_BARBED_FILTER_LAYOUT_FINAL_END */
```

## 3. 检查目标

- 找出密封方式当前为什么固定为两列
- 找出连接结构当前为什么固定为一列
- 确认实际生效的是哪个组件和哪个 CSS 选择器
- 下一步只修改真正生效的位置
