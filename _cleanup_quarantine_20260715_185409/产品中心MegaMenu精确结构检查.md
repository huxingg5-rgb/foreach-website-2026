# 产品中心 Mega Menu 精确结构检查

- 已恢复到本次动态高度修改前
- 当前错误版本备份：`.\components\layout\SiteHeader.tsx.bak_failed_dynamic_height_20260715_175816`
- 本次没有重新添加动画代码

## 一、activeMegaCards 完整计算区域

- 中心行号：397

```tsx
      377:       .sort((a, b) => a.order - b.order) ?? [];
      378: 
      379:   const currentMegaCategoryKey = activeMegaCategories.some(
      380:     (category) => category.key === activeMegaCategoryKey,
      381:   )
      382:     ? activeMegaCategoryKey
      383:     : activeMegaCategories[0]?.key ?? null;
      384: 
      385:   const activeMegaCategory =
      386:     activeMegaCategories.find(
      387:       (category) => category.key === currentMegaCategoryKey,
      388:     ) ??
      389:     activeMegaCategories[0] ??
      390:     null;
      391: 
      392:   const hasCategoryBoundCards =
      393:     activeMegaItem?.megaDropdown?.cards.some((card) =>
      394:       Boolean(card.categoryKey),
      395:     ) ?? false;
      396: 
>>>   397:   const activeMegaCards =
      398:     activeMegaItem?.megaDropdown?.cards
      399:       .filter((card) => card.enabled)
      400:       .filter((card) => {
      401:         // 如果没有任何卡片配置 categoryKey，就兼容旧数据，全部显示
      402:         if (!hasCategoryBoundCards) {
      403:           return true;
      404:         }
      405: 
      406:         // 如果配置了 categoryKey，就只显示当前左侧分类对应的卡片
      407:         return card.categoryKey === currentMegaCategoryKey;
      408:       })
      409:       .sort((a, b) => a.order - b.order) ?? [];
      410: 
      411:   /**
      412:    * 判断当前是不是 PC 鼠标设备
      413:    *
      414:    * 说明：
      415:    * 1. PC 端才使用 hover 展开 mega 下拉
      416:    * 2. 手机端 / 触摸设备不走这个逻辑，避免误触
      417:    */
      418:   function isPcHoverDevice() {
      419:     if (typeof window === "undefined") {
      420:       return false;
      421:     }
      422: 
      423:     const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      424:       .matches;
      425: 
      426:     const isWideScreen = window.innerWidth > 1000;
      427: 
      428:     return canHover && isWideScreen;
      429:   }
      430: 
      431:   /**
      432:    * 判断某个导航是否为当前选中状态
      433:    *
      434:    * 说明：
      435:    * 1. 所有页面都会先去掉语言前缀再比较
      436:    * 2. /en/about/history 会识别为 /about/history
      437:    * 3. About / Products / Applications 等栏目都能正常高亮
      438:    */
      439:   function isNavActive(item: NavigationItem) {
      440:     const itemHref = getLocalizedHref(item.href, currentLocale);
      441: 
      442:     const itemPathWithoutLocale = stripLocalePrefixFromPath(itemHref);
      443: 
      444:     const normalizedItemPathWithoutLocale =
      445:       itemPathWithoutLocale !== "/"
      446:         ? itemPathWithoutLocale.replace(/\/+$/, "")
      447:         : itemPathWithoutLocale;
      448: 
      449:     if (item.key === "home") {
      450:       return normalizedPathWithoutLocale === "/";
      451:     }
      452: 
      453:     if (
      454:       !normalizedItemPathWithoutLocale ||
      455:       normalizedItemPathWithoutLocale === "/"
      456:     ) {
      457:       return false;
      458:     }
      459: 
      460:     return (
      461:       normalizedPathWithoutLocale === normalizedItemPathWithoutLocale ||
      462:       normalizedPathWithoutLocale.startsWith(
      463:         `${normalizedItemPathWithoutLocale}/`,
      464:       )
      465:     );
      466: }
      467:     /**
      468:      * 页面滚动监听
      469:      *
      470:      * 作用：
      471:      * 1. 普通页面顶部时 Top 栏透明
      472:      * 2. 普通页面向下滚动后 Top 栏变白
      473:      * 3. 详情页即使在顶部，也会通过 shouldUseSolidHeader 保持白底
      474:      * 4. 给 html 添加 page-scrolled 类名
      475:      */
      476:     useEffect(() => {
      477:       function handleScroll() {
      478:         const scrollTop =
      479:           window.scrollY ||
      480:           window.pageYOffset ||
      481:           document.documentElement.scrollTop ||
      482:           document.body.scrollTop ||
      483:           0;
      484: 
      485:         const nextScrolled = scrollTop > 1;
      486: 
      487:         setIsScrolled(nextScrolled);
      488: 
      489:         document.documentElement.classList.toggle("page-scrolled", nextScrolled);
      490:       }
      491: 
      492:       handleScroll();
      493: 
      494:       window.addEventListener("scroll", handleScroll, { passive: true });
      495:       window.addEventListener("touchmove", handleScroll, { passive: true });
      496:       document.addEventListener("scroll", handleScroll, { passive: true });
      497: 
```

## 二、分类状态与 Hook 区域

- 中心行号：270

```tsx
      235:   const normalizedPathWithoutLocale = useMemo(() => {
      236:     if (currentPathWithoutLocale === "/") {
      237:       return "/";
      238:     }
      239: 
      240:     return currentPathWithoutLocale.replace(/\/+$/, "");
      241:   }, [currentPathWithoutLocale]);
      242: 
      243:   /* ================================
      244:      接头型号替代详情页判断
      245: 
      246:      说明：
      247:      1. 这个页面已经去掉 Banner
      248:      2. 页面一进入就是白底内容
      249:      3. Header 不能再用透明状态
      250:      4. 所以这个页面需要强制使用白底 Header
      251:   ================================ */
      252: const isFittingReplacementDetailPage =
      253:   normalizedPathWithoutLocale.startsWith(
      254:     "/resources/selection-support/fitting-replacement/q20/",
      255:   );
      256: 
      257:   const navigationItems = useMemo(
      258:     () => getVisibleNavigationItems(currentLocale),
      259:     [currentLocale],
      260:   ); // 根据当前语言获取可显示导航，并缓存结果
      261: 
      262:   const [isScrolled, setIsScrolled] = useState(false); // 控制 Top 栏是否进入滚动后的白底状态
      263: 
      264:   const [openPanel, setOpenPanel] = useState<OpenPanel>("none"); // 控制语言菜单 / 手机导航菜单哪个正在展开
      265: 
      266:   const [desktopMegaKey, setDesktopMegaKey] = useState<NavigationKey | null>(
      267:     null,
      268:   ); // 控制 PC 端当前打开哪个 mega / simple 下拉菜单
      269: 
>>>   270:   const [activeMegaCategoryKey, setActiveMegaCategoryKey] = useState<
      271:     string | null
      272:   >(null); // 控制 PC 端 mega 下拉左侧当前鼠标选中的分类
      273: 
      274:   /* ================================
      275:      手机端导航当前展开栏目
      276:      说明：
      277:      1. 用于实现手机端手风琴菜单
      278:      2. 同一时间只允许展开一个栏目
      279:      3. 点击产品中心时，其他栏目会自动收缩
      280:   ================================ */
      281:   const [openMobileSectionKey, setOpenMobileSectionKey] =
      282:     useState<NavigationKey | null>(null);
      283: 
      284:   /* ================================
      285:      PC 端搜索模式
      286:      说明：
      287:      1. 默认只显示一个搜索图标按钮，避免搜索框长期占用导航宽度
      288:      2. 点击搜索图标后，中间导航区域切换成搜索输入框
      289:      3. 点击搜索框以外区域、点击关闭按钮或按 ESC，会退出搜索模式
      290:   ================================ */
      291:   const [isSearchOpen, setIsSearchOpen] = useState(false);
      292:   const [searchQuery, setSearchQuery] = useState("");
      293: 
      294:   // 搜索模式表单区域，用于判断点击是否发生在搜索框内部
      295:   const searchModeRef = useRef<HTMLFormElement | null>(null);
      296: 
      297:   // 搜索图标按钮，用于避免点击按钮时被判断成外部点击
      298:   const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
      299: 
      300:   // 搜索输入框，用于打开搜索模式后自动聚焦
      301:   const searchInputRef = useRef<HTMLInputElement | null>(null);
      302: 
      303:   const isLanguageOpen = openPanel === "language"; // 判断语言菜单是否展开
      304: 
      305:   const isMobileMenuOpen = openPanel === "mobileNav"; // 判断手机端导航是否展开
      306: 
      307:     /* ================================
      308:      Header 最终白底状态
      309: 
      310:      说明：
      311:      1. 普通页面：滚动后才变白
      312:      2. 接头替代详情页：页面一进入就白底
      313:      3. 新闻详情页：页面一进入就白底
      314:      4. 产品中心页：页面一进入就白底
      315:      5. 下拉菜单 / 搜索展开时也保持白底
      316:   ================================ */
      317: 
      318:   /* ================================
      319:      新闻详情页判断
      320: 
      321:      说明：
      322:      1. /resources/news 和 /resources/news/ 都是新闻首页
      323:      2. /resources/news/[slug] 才是新闻详情页
      324:      3. 多语言路径已经通过 stripLocalePrefixFromPath 去掉语言前缀
      325:      4. 用 path segment 判断，避免新闻首页被误判
```

## 三、左右布局和产品网格区域

- 中心行号：1251

```tsx
     1161:                    * 说明：
     1162:                    * 1. 左侧栏目本身 categories 没有 href
     1163:                    * 2. 真正的跳转链接在 cards 里面
     1164:                    * 3. 所以这里通过 category.key 找到对应 card.categoryKey
     1165:                    */
     1166:                   const categoryPrimaryCard = activeMegaItem.megaDropdown?.cards
     1167:                     .filter((card) => card.enabled)
     1168:                     .sort((a, b) => a.order - b.order)
     1169:                     .find((card) => card.categoryKey === category.key);
     1170: 
     1171:                   /*
     1172:                     MEGA_CATEGORY_CLICK_FIX_20260708
     1173: 
     1174:                     说明：
     1175:                     1. 左侧分类 categories 本身没有 href；
     1176:                     2. 原逻辑只从右侧 card 里找 categoryPrimaryCard?.href；
     1177:                     3. 如果某个分类暂时没有匹配到右侧 card，左侧分类会被渲染成 div；
     1178:                     4. div 只能 hover 切换，点击不会跳转，所以“智控系列”点击没有反应；
     1179:                     5. 这里增加兜底跳转：
     1180:                        - 优先跳转当前分类对应的产品卡片链接；
     1181:                        - 如果没有匹配卡片，就跳转 Mega 菜单底部入口；
     1182:                        - 如果底部入口也没有，就回到 /products；
     1183:                     6. 后续如果要做到“智控系列”点击后自动筛选到智控产品，
     1184:                        应该继续在 data/navigation 里补齐对应 card.categoryKey 和 href。
     1185:                   */
     1186:                   /*
     1187:                     MEGA_CATEGORY_LINK_RESTORE_20260708
     1188: 
     1189:                     说明：
     1190:                     1. 左侧分类点击应跳转到当前分类对应的真实产品入口；
     1191:                     2. 不再兜底跳转 /products，因为当前页面本来就是 /products，会看起来没反应；
     1192:                     3. 分类链接只从对应 card.categoryKey 的第一张卡片里读取；
     1193:                     4. 如果某个分类没有对应 card，则只保留 hover 切换，不强行跳转。
     1194:                   */
     1195:                   const categoryHref = categoryPrimaryCard?.href;
     1196: 
     1197:                   const categoryContent = (
     1198:                     <>
     1199:                       <strong>
     1200:                         {getLocalizedText(category.title, currentLocale)}
     1201:                       </strong>
     1202: 
     1203:                       <span
     1204:                         className="site-nav-mega-category-arrow"
     1205:                         aria-hidden="true"
     1206:                       />
     1207:                     </>
     1208:                   );
     1209: 
     1210:                   /**
     1211:                    * 有 href 的栏目渲染成 Link
     1212:                    * 例如：恒永达文化 → /about/culture
     1213:                    */
     1214:                   if (categoryHref) {
     1215:                     return (
     1216:                       <Link
     1217:                         key={category.key}
     1218:                         href={getLocalizedHref(categoryHref, currentLocale)}
     1219:                         className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
     1220:                           ? "site-nav-mega-category-active"
     1221:                           : ""
     1222:                           }`}
     1223:                         onMouseEnter={() =>
     1224:                           setActiveMegaCategoryKey(category.key)
     1225:                         }                        onClick={closeAllPanels}
     1226:                       >
     1227:                         {categoryContent}
     1228:                       </Link>
     1229:                     );
     1230:                   }
     1231: 
     1232:                   /**
     1233:                    * 没有 href 的栏目只做 hover 切换
     1234:                    */
     1235:                   return (
     1236:                     <div
     1237:                       key={category.key}
     1238:                       className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
     1239:                         ? "site-nav-mega-category-active"
     1240:                         : ""
     1241:                         }`}
     1242:                       onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
     1243:                     >
     1244:                       {categoryContent}
     1245:                     </div>
     1246:                   );
     1247:                 })}
     1248:               </div>
     1249: 
     1250:               {/* 右侧内容区 */}
>>>  1251:               <div className="site-nav-mega-main" style={{ gridTemplateRows: "1fr", gap: 0, alignContent: "start" }}>
     1252:                 {/* 右侧顶部说明区 */}
     1253:                 <div className="site-nav-mega-heading" style={{ display: "none" }}>
     1254:                   <p>
     1255:                     {getLocalizedText(
     1256:                       activeMegaItem.key === "about" &&
     1257:                         activeMegaCards[0]?.description
     1258:                         ? activeMegaCards[0].description
     1259:                         : activeMegaCategory?.description ??
     1260:                         activeMegaItem.megaDropdown.description,
     1261:                       currentLocale,
     1262:                     )}
     1263:                   </p>
     1264:                 </div>
     1265: 
     1266:                 {/* 产品 / 图片入口区域 */}
     1267:                 <div className="site-nav-mega-product-area">
     1268:                   {activeMegaCards.map((card) => {
     1269:                     const cardImages = card.images || []; // 读取当前分类下的产品图片列表
     1270: 
     1271:                     const mainImage = card.image; // 读取单张主图，兼容旧数据结构
     1272: 
     1273:                     const displayProductImages = cardImages;
     1274: 
     1275:                     return (
     1276:                       <div key={card.key} className="site-nav-mega-product-group">
     1277:                         {displayProductImages.length > 0 ? (
     1278:                           <div className="site-nav-mega-product-grid">
     1279:                             {displayProductImages.map((cardImage) => {
     1280:                               const fallbackProductMeta =
     1281:                                 getProductImageDisplayMeta(
     1282:                                   cardImage.src,
     1283:                                   currentLocale,
     1284:                                 );
     1285: 
     1286:                               const productMeta = {
     1287:                                 title: cardImage.title
     1288:                                   ? getLocalizedText(
     1289:                                     cardImage.title,
     1290:                                     currentLocale,
     1291:                                   )
     1292:                                   : fallbackProductMeta.title,
     1293: 
     1294:                                 description: cardImage.description
     1295:                                   ? getLocalizedText(
     1296:                                     cardImage.description,
     1297:                                     currentLocale,
     1298:                                   )
     1299:                                   : fallbackProductMeta.description,
     1300:                               };
     1301: 
     1302:                                                             /* FITTING_MEGA_IMAGE_LINK_START */
     1303: 
     1304:                               const cardImageContent = (
     1305:                                 <Link
     1306:                                   key={cardImage.src}
     1307:                                   href={getLocalizedHref(
     1308:                                     cardImage.href ?? card.href,
     1309:                                     currentLocale,
     1310:                                   )}                        onClick={closeAllPanels}
     1311:                                   className="site-nav-product-clean-link"
     1312:                                 >
     1313:                                   <div className="site-nav-product-image-box">
     1314:                                     <Image
     1315:                                       className="site-nav-product-image"
     1316:                                       src={cardImage.src}
     1317:                                       alt={getLocalizedText(
     1318:                                         cardImage.alt,
     1319:                                         currentLocale,
     1320:                                       )}
     1321:                                       width={cardImage.width ?? 600}
     1322:                                       height={cardImage.height ?? 380}
     1323:                                     />
     1324:                                   </div>
     1325: 
     1326:                                   <strong className="site-nav-product-title">
     1327:                                     {productMeta.title}
     1328:                                   </strong>
     1329: 
     1330:                                   {activeMegaItem.key !== "applications" && productMeta.description ? (
     1331:                                     <span className="site-nav-product-desc">{productMeta.description}</span>
     1332:                                   ) : null}
     1333:                                 </Link>
     1334:                               );
     1335: 
     1336:                               const cardImageHref =
     1337:                                 cardImage.href
     1338:                                   ? getLocalizedHref(
     1339:                                       cardImage.href,
     1340:                                       currentLocale
     1341:                                     )
     1342:                                   : "";
     1343: 
     1344:                               return cardImageContent;
     1345: 
     1346:                               /* FITTING_MEGA_IMAGE_LINK_END */
     1347:                             })}
     1348:                           </div>
     1349:                         ) : mainImage ? (
     1350:                           <div className="site-nav-mega-single-image-box">
     1351:                             <Image
     1352:                               className="site-nav-mega-single-image"
     1353:                               src={mainImage.src}
     1354:                               alt={getLocalizedText(
     1355:                                 mainImage.alt,
     1356:                                 currentLocale,
     1357:                               )}
     1358:                               width={mainImage.width ?? 600}
     1359:                               height={mainImage.height ?? 380}
     1360:                             />
     1361:                           </div>
```

## 四、相关 CSS 定位

```text
app/globals.css:367:.site-nav-mega-main {
app/globals.css:1289:  .site-nav-mega-main {
app/globals.css:1399:  .site-nav-mega-main {
app/globals.css:1495:  .site-nav-mega-main {
app/globals.css:7694:.site-nav-mega-product-area {
app/globals.css:7706:.site-nav-mega-product-grid {
app/globals.css:8874:.site-nav-mega-about .site-nav-mega-main {
app/globals.css:8909:.site-nav-mega-about .site-nav-mega-product-area {
app/globals.css:8917:.site-nav-mega-about .site-nav-mega-product-grid {
app/globals.css:9004:.site-nav-mega-about .site-nav-mega-main {
app/globals.css:16253:  .site-nav-mega.site-nav-mega-open .site-nav-mega-main {
app/globals.css:16259:  .site-nav-mega.site-nav-mega-open .site-nav-mega-product-grid {
app/globals.css:16288:  .site-nav-mega-about.site-nav-mega-open .site-nav-mega-main {
app/globals.css:16324:  .site-nav-mega-about.site-nav-mega-open .site-nav-mega-product-area {
app/globals.css:16334:  .site-nav-mega-about.site-nav-mega-open .site-nav-mega-product-grid {
components/layout/SiteHeader.tsx:1251:              <div className="site-nav-mega-main" style={{ gridTemplateRows: "1fr", gap: 0, alignContent: "start" }}>
components/layout/SiteHeader.tsx:1267:                <div className="site-nav-mega-product-area">
components/layout/SiteHeader.tsx:1278:                          <div className="site-nav-mega-product-grid">
```

## 五、下一步修改原则

- 不再使用正则匹配整个 activeMegaCards 语句
- 动画 Hook 必须放在组件顶层，不能放入 filter、map 或条件分支
- 左右两侧使用同一个外层高度
- 只作用于 Products，不作用于 Applications
- 优先使用行数等级控制高度，避免复制 DOM 测量
