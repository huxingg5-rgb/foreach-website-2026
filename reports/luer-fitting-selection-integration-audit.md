# 鲁尔接头筛选页面接入检查

生成时间：2026/7/12 21:44:15

> 本次只检查，没有修改项目代码。

## data/products/selection/product-selection.generated.ts

- 文件大小：27028 bytes
- 总行数：972

```ts
   15 |   ProductSelectionProduct,
   16 |   ProductSelectionTaxonomyItem,
   17 | } from "./product-selection.types";
   18 | 
   19 | export const selectionProducts: ProductSelectionProduct[] = [
   20 |   {
   21 |     "productId": "pump-ea-100ul-pmma",
   22 |     "categoryId": "pumps",
   23 |     "productTypeId": "plunger-pump",
   24 |     "seriesId": "ea",
   25 |     "cardTitle": {
   26 |       "zh": "EA-100-PMMA",
   27 |       "en": "EA-100-PMMA"
   28 |     },
   29 |     "cardSubtitle": {
   30 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
   31 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
   32 |     },
   33 |     "filters": {
   34 |       "filter01": "EA 常规柱塞泵",
   35 |       "filter02": "100μL",
   36 |       "filter03": "PMMA"
   37 |     },
   38 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-pmma.webp",
   39 |     "detailSlug": "ea-100-pmma",
   40 |     "status": "active",
   41 |     "sortOrder": 201,
   42 |     "searchKeywords": {
...
   46 |   },
   47 |   {
   48 |     "productId": "pump-ea-100ul-peek",
   49 |     "categoryId": "pumps",
   50 |     "productTypeId": "plunger-pump",
   51 |     "seriesId": "ea",
   52 |     "cardTitle": {
   53 |       "zh": "EA-100-PEEK",
   54 |       "en": "EA-100-PEEK"
   55 |     },
   56 |     "cardSubtitle": {
   57 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
   58 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
   59 |     },
   60 |     "filters": {
   61 |       "filter01": "EA 常规柱塞泵",
   62 |       "filter02": "100μL",
   63 |       "filter03": "PEEK"
   64 |     },
   65 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-100ul-peek.webp",
   66 |     "detailSlug": "ea-100-peek",
   67 |     "status": "active",
   68 |     "sortOrder": 202,
   69 |     "searchKeywords": {
...
   73 |   },
   74 |   {
   75 |     "productId": "pump-ea-250ul-pmma",
   76 |     "categoryId": "pumps",
   77 |     "productTypeId": "plunger-pump",
   78 |     "seriesId": "ea",
   79 |     "cardTitle": {
   80 |       "zh": "EA-250-PMMA",
   81 |       "en": "EA-250-PMMA"
   82 |     },
   83 |     "cardSubtitle": {
   84 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
   85 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
   86 |     },
   87 |     "filters": {
   88 |       "filter01": "EA 常规柱塞泵",
   89 |       "filter02": "250μL",
   90 |       "filter03": "PMMA"
   91 |     },
   92 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-pmma.webp",
   93 |     "detailSlug": "ea-250-pmma",
   94 |     "status": "active",
   95 |     "sortOrder": 301,
   96 |     "searchKeywords": {
...
  100 |   },
  101 |   {
  102 |     "productId": "pump-ea-250ul-peek",
  103 |     "categoryId": "pumps",
  104 |     "productTypeId": "plunger-pump",
  105 |     "seriesId": "ea",
  106 |     "cardTitle": {
  107 |       "zh": "EA-250-PEEK",
  108 |       "en": "EA-250-PEEK"
  109 |     },
  110 |     "cardSubtitle": {
  111 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  112 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  113 |     },
  114 |     "filters": {
  115 |       "filter01": "EA 常规柱塞泵",
  116 |       "filter02": "250μL",
  117 |       "filter03": "PEEK"
  118 |     },
  119 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-250ul-peek.webp",
  120 |     "detailSlug": "ea-250-peek",
  121 |     "status": "active",
  122 |     "sortOrder": 302,
  123 |     "searchKeywords": {
...
  127 |   },
  128 |   {
  129 |     "productId": "pump-ea-500ul-pmma",
  130 |     "categoryId": "pumps",
  131 |     "productTypeId": "plunger-pump",
  132 |     "seriesId": "ea",
  133 |     "cardTitle": {
  134 |       "zh": "EA-500-PMMA",
  135 |       "en": "EA-500-PMMA"
  136 |     },
  137 |     "cardSubtitle": {
  138 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  139 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  140 |     },
  141 |     "filters": {
  142 |       "filter01": "EA 常规柱塞泵",
  143 |       "filter02": "500μL",
  144 |       "filter03": "PMMA"
  145 |     },
  146 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-pmma.webp",
  147 |     "detailSlug": "ea-500-pmma",
  148 |     "status": "active",
  149 |     "sortOrder": 401,
  150 |     "searchKeywords": {
...
  154 |   },
  155 |   {
  156 |     "productId": "pump-ea-500ul-peek",
  157 |     "categoryId": "pumps",
  158 |     "productTypeId": "plunger-pump",
  159 |     "seriesId": "ea",
  160 |     "cardTitle": {
  161 |       "zh": "EA-500-PEEK",
  162 |       "en": "EA-500-PEEK"
  163 |     },
  164 |     "cardSubtitle": {
  165 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  166 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  167 |     },
  168 |     "filters": {
  169 |       "filter01": "EA 常规柱塞泵",
  170 |       "filter02": "500μL",
  171 |       "filter03": "PEEK"
  172 |     },
  173 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-500ul-peek.webp",
  174 |     "detailSlug": "ea-500-peek",
  175 |     "status": "active",
  176 |     "sortOrder": 402,
  177 |     "searchKeywords": {
...
  181 |   },
  182 |   {
  183 |     "productId": "pump-ea-1000ul-pmma",
  184 |     "categoryId": "pumps",
  185 |     "productTypeId": "plunger-pump",
  186 |     "seriesId": "ea",
  187 |     "cardTitle": {
  188 |       "zh": "EA-1000-PMMA",
  189 |       "en": "EA-1000-PMMA"
  190 |     },
  191 |     "cardSubtitle": {
  192 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  193 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  194 |     },
  195 |     "filters": {
  196 |       "filter01": "EA 常规柱塞泵",
  197 |       "filter02": "1000μL",
  198 |       "filter03": "PMMA"
  199 |     },
  200 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-pmma.webp",
  201 |     "detailSlug": "ea-1000-pmma",
  202 |     "status": "active",
  203 |     "sortOrder": 501,
  204 |     "searchKeywords": {
...
  208 |   },
  209 |   {
  210 |     "productId": "pump-ea-1000ul-peek",
  211 |     "categoryId": "pumps",
  212 |     "productTypeId": "plunger-pump",
  213 |     "seriesId": "ea",
  214 |     "cardTitle": {
  215 |       "zh": "EA-1000-PEEK",
  216 |       "en": "EA-1000-PEEK"
  217 |     },
  218 |     "cardSubtitle": {
  219 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  220 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  221 |     },
  222 |     "filters": {
  223 |       "filter01": "EA 常规柱塞泵",
  224 |       "filter02": "1000μL",
  225 |       "filter03": "PEEK"
  226 |     },
  227 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-1000ul-peek.webp",
  228 |     "detailSlug": "ea-1000-peek",
  229 |     "status": "active",
  230 |     "sortOrder": 502,
  231 |     "searchKeywords": {
...
  235 |   },
  236 |   {
  237 |     "productId": "pump-ea-2500ul-pmma",
  238 |     "categoryId": "pumps",
  239 |     "productTypeId": "plunger-pump",
  240 |     "seriesId": "ea",
  241 |     "cardTitle": {
  242 |       "zh": "EA-2500-PMMA",
  243 |       "en": "EA-2500-PMMA"
  244 |     },
  245 |     "cardSubtitle": {
  246 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  247 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  248 |     },
  249 |     "filters": {
  250 |       "filter01": "EA 常规柱塞泵",
  251 |       "filter02": "2500μL",
  252 |       "filter03": "PMMA"
  253 |     },
  254 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-pmma.webp",
  255 |     "detailSlug": "ea-2500-pmma",
  256 |     "status": "active",
  257 |     "sortOrder": 601,
  258 |     "searchKeywords": {
...
  262 |   },
  263 |   {
  264 |     "productId": "pump-ea-2500ul-peek",
  265 |     "categoryId": "pumps",
  266 |     "productTypeId": "plunger-pump",
  267 |     "seriesId": "ea",
  268 |     "cardTitle": {
  269 |       "zh": "EA-2500-PEEK",
  270 |       "en": "EA-2500-PEEK"
  271 |     },
  272 |     "cardSubtitle": {
  273 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  274 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  275 |     },
  276 |     "filters": {
  277 |       "filter01": "EA 常规柱塞泵",
  278 |       "filter02": "2500μL",
  279 |       "filter03": "PEEK"
  280 |     },
  281 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-2500ul-peek.webp",
  282 |     "detailSlug": "ea-2500-peek",
  283 |     "status": "active",
  284 |     "sortOrder": 602,
  285 |     "searchKeywords": {
...
  289 |   },
  290 |   {
  291 |     "productId": "pump-ea-5000ul-pmma",
  292 |     "categoryId": "pumps",
  293 |     "productTypeId": "plunger-pump",
  294 |     "seriesId": "ea",
  295 |     "cardTitle": {
  296 |       "zh": "EA-5000-PMMA",
  297 |       "en": "EA-5000-PMMA"
  298 |     },
  299 |     "cardSubtitle": {
  300 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  301 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  302 |     },
  303 |     "filters": {
  304 |       "filter01": "EA 常规柱塞泵",
  305 |       "filter02": "5000μL",
  306 |       "filter03": "PMMA"
  307 |     },
  308 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-pmma.webp",
  309 |     "detailSlug": "ea-5000-pmma",
  310 |     "status": "active",
  311 |     "sortOrder": 701,
  312 |     "searchKeywords": {
...
  316 |   },
  317 |   {
  318 |     "productId": "pump-ea-5000ul-peek",
  319 |     "categoryId": "pumps",
  320 |     "productTypeId": "plunger-pump",
  321 |     "seriesId": "ea",
  322 |     "cardTitle": {
  323 |       "zh": "EA-5000-PEEK",
  324 |       "en": "EA-5000-PEEK"
  325 |     },
  326 |     "cardSubtitle": {
  327 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  328 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  329 |     },
  330 |     "filters": {
  331 |       "filter01": "EA 常规柱塞泵",
  332 |       "filter02": "5000μL",
  333 |       "filter03": "PEEK"
  334 |     },
  335 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-5000ul-peek.webp",
  336 |     "detailSlug": "ea-5000-peek",
  337 |     "status": "active",
  338 |     "sortOrder": 702,
  339 |     "searchKeywords": {
...
  343 |   },
  344 |   {
  345 |     "productId": "pump-ea-10000ul-pmma",
  346 |     "categoryId": "pumps",
  347 |     "productTypeId": "plunger-pump",
  348 |     "seriesId": "ea",
  349 |     "cardTitle": {
  350 |       "zh": "EA-10000-PMMA",
  351 |       "en": "EA-10000-PMMA"
  352 |     },
  353 |     "cardSubtitle": {
  354 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  355 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  356 |     },
  357 |     "filters": {
  358 |       "filter01": "EA 常规柱塞泵",
  359 |       "filter02": "10000μL",
  360 |       "filter03": "PMMA"
  361 |     },
  362 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-pmma.webp",
  363 |     "detailSlug": "ea-10000-pmma",
  364 |     "status": "active",
  365 |     "sortOrder": 801,
  366 |     "searchKeywords": {
...
  370 |   },
  371 |   {
  372 |     "productId": "pump-ea-10000ul-peek",
  373 |     "categoryId": "pumps",
  374 |     "productTypeId": "plunger-pump",
  375 |     "seriesId": "ea",
  376 |     "cardTitle": {
  377 |       "zh": "EA-10000-PEEK",
  378 |       "en": "EA-10000-PEEK"
  379 |     },
  380 |     "cardSubtitle": {
  381 |       "zh": "1/4-28 UNF 液路接口\n满行程 CV < 0.5%\n单泵 / 泵阀一体 / 控制器可选",
  382 |       "en": "1/4-28 UNF Fluidic Ports\nCV < 0.5% at Full Stroke\nStandalone / Valve / Controller Options"
  383 |     },
  384 |     "filters": {
  385 |       "filter01": "EA 常规柱塞泵",
  386 |       "filter02": "10000μL",
  387 |       "filter03": "PEEK"
  388 |     },
  389 |     "imageCard": "/images/products/pumps/plunger-pump/ea/pump-ea-10000ul-peek.webp",
  390 |     "detailSlug": "ea-10000-peek",
  391 |     "status": "active",
  392 |     "sortOrder": 802,
  393 |     "searchKeywords": {
...
  397 |   },
  398 |   {
  399 |     "productId": "pump-sm-50ul-pmma",
  400 |     "categoryId": "pumps",
  401 |     "productTypeId": "plunger-pump",
  402 |     "seriesId": "sm",
  403 |     "cardTitle": {
  404 |       "zh": "SM-50-PMMA",
  405 |       "en": "SM-50-PMMA"
  406 |     },
  407 |     "cardSubtitle": {
  408 |       "zh": "SM 微型柱塞泵",
  409 |       "en": "SM Miniature Plunger Pump"
  410 |     },
  411 |     "filters": {
  412 |       "filter01": "SM 微型柱塞泵",
  413 |       "filter02": "50μL",
  414 |       "filter03": "PMMA"
  415 |     },
  416 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-50ul-pmma.webp",
  417 |     "detailSlug": "sm-50-pmma",
  418 |     "status": "active",
  419 |     "sortOrder": 901,
  420 |     "searchKeywords": {
...
  424 |   },
  425 |   {
  426 |     "productId": "pump-sm-100ul-pmma",
  427 |     "categoryId": "pumps",
  428 |     "productTypeId": "plunger-pump",
  429 |     "seriesId": "sm",
  430 |     "cardTitle": {
  431 |       "zh": "SM-100-PMMA",
  432 |       "en": "SM-100-PMMA"
  433 |     },
  434 |     "cardSubtitle": {
  435 |       "zh": "SM 微型柱塞泵",
  436 |       "en": "SM Miniature Plunger Pump"
  437 |     },
  438 |     "filters": {
  439 |       "filter01": "SM 微型柱塞泵",
  440 |       "filter02": "100μL",
  441 |       "filter03": "PMMA"
  442 |     },
  443 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-pmma.webp",
  444 |     "detailSlug": "sm-100-pmma",
  445 |     "status": "active",
  446 |     "sortOrder": 902,
  447 |     "searchKeywords": {
...
  451 |   },
  452 |   {
  453 |     "productId": "pump-sm-100ul-peek",
  454 |     "categoryId": "pumps",
  455 |     "productTypeId": "plunger-pump",
  456 |     "seriesId": "sm",
  457 |     "cardTitle": {
  458 |       "zh": "SM-100-PEEK",
  459 |       "en": "SM-100-PEEK"
  460 |     },
  461 |     "cardSubtitle": {
  462 |       "zh": "SM 微型柱塞泵",
  463 |       "en": "SM Miniature Plunger Pump"
  464 |     },
  465 |     "filters": {
  466 |       "filter01": "SM 微型柱塞泵",
  467 |       "filter02": "100μL",
  468 |       "filter03": "PEEK"
  469 |     },
  470 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-100ul-peek.webp",
  471 |     "detailSlug": "sm-100-peek",
  472 |     "status": "active",
  473 |     "sortOrder": 903,
  474 |     "searchKeywords": {
...
  478 |   },
  479 |   {
  480 |     "productId": "pump-sm-250ul-pmma",
  481 |     "categoryId": "pumps",
  482 |     "productTypeId": "plunger-pump",
  483 |     "seriesId": "sm",
  484 |     "cardTitle": {
  485 |       "zh": "SM-250-PMMA",
  486 |       "en": "SM-250-PMMA"
  487 |     },
  488 |     "cardSubtitle": {
  489 |       "zh": "SM 微型柱塞泵",
  490 |       "en": "SM Miniature Plunger Pump"
  491 |     },
  492 |     "filters": {
  493 |       "filter01": "SM 微型柱塞泵",
  494 |       "filter02": "250μL",
  495 |       "filter03": "PMMA"
  496 |     },
  497 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-pmma.webp",
  498 |     "detailSlug": "sm-250-pmma",
  499 |     "status": "active",
  500 |     "sortOrder": 904,
  501 |     "searchKeywords": {
...
  505 |   },
  506 |   {
  507 |     "productId": "pump-sm-250ul-peek",
  508 |     "categoryId": "pumps",
  509 |     "productTypeId": "plunger-pump",
  510 |     "seriesId": "sm",
  511 |     "cardTitle": {
  512 |       "zh": "SM-250-PEEK",
  513 |       "en": "SM-250-PEEK"
  514 |     },
  515 |     "cardSubtitle": {
  516 |       "zh": "SM 微型柱塞泵",
  517 |       "en": "SM Miniature Plunger Pump"
  518 |     },
  519 |     "filters": {
  520 |       "filter01": "SM 微型柱塞泵",
  521 |       "filter02": "250μL",
  522 |       "filter03": "PEEK"
  523 |     },
  524 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-250ul-peek.webp",
  525 |     "detailSlug": "sm-250-peek",
  526 |     "status": "active",
  527 |     "sortOrder": 905,
  528 |     "searchKeywords": {
...
  532 |   },
  533 |   {
  534 |     "productId": "pump-sm-500ul-pmma",
  535 |     "categoryId": "pumps",
  536 |     "productTypeId": "plunger-pump",
  537 |     "seriesId": "sm",
  538 |     "cardTitle": {
  539 |       "zh": "SM-500-PMMA",
  540 |       "en": "SM-500-PMMA"
  541 |     },
  542 |     "cardSubtitle": {
  543 |       "zh": "SM 微型柱塞泵",
  544 |       "en": "SM Miniature Plunger Pump"
  545 |     },
  546 |     "filters": {
  547 |       "filter01": "SM 微型柱塞泵",
  548 |       "filter02": "500μL",
  549 |       "filter03": "PMMA"
  550 |     },
  551 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-500ul-pmma.webp",
  552 |     "detailSlug": "sm-500-pmma",
  553 |     "status": "active",
  554 |     "sortOrder": 906,
  555 |     "searchKeywords": {
...
  559 |   },
  560 |   {
  561 |     "productId": "pump-sm-1000ul-pmma",
  562 |     "categoryId": "pumps",
  563 |     "productTypeId": "plunger-pump",
  564 |     "seriesId": "sm",
  565 |     "cardTitle": {
  566 |       "zh": "SM-1000-PMMA",
  567 |       "en": "SM-1000-PMMA"
  568 |     },
  569 |     "cardSubtitle": {
  570 |       "zh": "SM 微型柱塞泵",
  571 |       "en": "SM Miniature Plunger Pump"
  572 |     },
  573 |     "filters": {
  574 |       "filter01": "SM 微型柱塞泵",
  575 |       "filter02": "1000μL",
  576 |       "filter03": "PMMA"
  577 |     },
  578 |     "imageCard": "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
  579 |     "detailSlug": "sm-1000-pmma",
  580 |     "status": "active",
  581 |     "sortOrder": 907,
  582 |     "searchKeywords": {
...
  586 |   },
  587 |   {
  588 |     "productId": "pump-tm-50ul-pmma",
  589 |     "categoryId": "pumps",
  590 |     "productTypeId": "plunger-pump",
  591 |     "seriesId": "tm",
  592 |     "cardTitle": {
  593 |       "zh": "TM-50-PMMA",
  594 |       "en": "TM-50-PMMA"
  595 |     },
  596 |     "cardSubtitle": {
  597 |       "zh": "TM 超微型柱塞泵",
  598 |       "en": "TM Ultra-Compact Plunger Pump"
  599 |     },
  600 |     "filters": {
  601 |       "filter01": "TM 超微型柱塞泵",
  602 |       "filter02": "50μL",
  603 |       "filter03": "PMMA"
  604 |     },
  605 |     "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-50ul-pmma.webp",
  606 |     "detailSlug": "tm-50-pmma",
  607 |     "status": "active",
  608 |     "sortOrder": 1001,
  609 |     "searchKeywords": {
...
  613 |   },
  614 |   {
  615 |     "productId": "pump-tm-100ul-pmma",
  616 |     "categoryId": "pumps",
  617 |     "productTypeId": "plunger-pump",
  618 |     "seriesId": "tm",
  619 |     "cardTitle": {
  620 |       "zh": "TM-100-PMMA",
  621 |       "en": "TM-100-PMMA"
  622 |     },
  623 |     "cardSubtitle": {
  624 |       "zh": "TM 超微型柱塞泵",
  625 |       "en": "TM Ultra-Compact Plunger Pump"
  626 |     },
  627 |     "filters": {
  628 |       "filter01": "TM 超微型柱塞泵",
  629 |       "filter02": "100μL",
  630 |       "filter03": "PMMA"
  631 |     },
  632 |     "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-100ul-pmma.webp",
  633 |     "detailSlug": "tm-100-pmma",
  634 |     "status": "active",
  635 |     "sortOrder": 1002,
  636 |     "searchKeywords": {
...
  640 |   },
  641 |   {
  642 |     "productId": "pump-tm-250ul-pmma",
  643 |     "categoryId": "pumps",
  644 |     "productTypeId": "plunger-pump",
  645 |     "seriesId": "tm",
  646 |     "cardTitle": {
  647 |       "zh": "TM-250-PMMA",
  648 |       "en": "TM-250-PMMA"
  649 |     },
  650 |     "cardSubtitle": {
  651 |       "zh": "TM 超微型柱塞泵",
  652 |       "en": "TM Ultra-Compact Plunger Pump"
  653 |     },
  654 |     "filters": {
  655 |       "filter01": "TM 超微型柱塞泵",
  656 |       "filter02": "250μL",
  657 |       "filter03": "PMMA"
  658 |     },
  659 |     "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-250ul-pmma.webp",
  660 |     "detailSlug": "tm-250-pmma",
  661 |     "status": "active",
  662 |     "sortOrder": 1003,
  663 |     "searchKeywords": {
...
  667 |   },
  668 |   {
  669 |     "productId": "pump-tm-500ul-pmma",
  670 |     "categoryId": "pumps",
  671 |     "productTypeId": "plunger-pump",
  672 |     "seriesId": "tm",
  673 |     "cardTitle": {
  674 |       "zh": "TM-500-PMMA",
  675 |       "en": "TM-500-PMMA"
  676 |     },
  677 |     "cardSubtitle": {
  678 |       "zh": "TM 超微型柱塞泵",
  679 |       "en": "TM Ultra-Compact Plunger Pump"
  680 |     },
  681 |     "filters": {
  682 |       "filter01": "TM 超微型柱塞泵",
  683 |       "filter02": "500μL",
  684 |       "filter03": "PMMA"
  685 |     },
  686 |     "imageCard": "/images/products/pumps/plunger-pump/tm/pump-tm-500ul-pmma.webp",
  687 |     "detailSlug": "tm-500-pmma",
  688 |     "status": "active",
  689 |     "sortOrder": 1004,
  690 |     "searchKeywords": {
...
  693 |     }
  694 |   }
  695 | ];
  696 | 
  697 | export const selectionFilterLabels: ProductSelectionFilterLabel[] = [
  698 |   {
  699 |     "categoryId": "pumps",
  700 |     "productTypeId": "plunger-pump",
  701 |     "filterKey": "filter01",
  702 |     "label": {
  703 |       "zh": "产品系列",
  704 |       "en": "Series",
  705 |       "es": "",
  706 |       "fr": "",
  707 |       "ko": "",
  708 |       "ru": ""
  709 |     },
...
  712 |     "visible": true
  713 |   },
  714 |   {
  715 |     "categoryId": "pumps",
  716 |     "productTypeId": "plunger-pump",
  717 |     "filterKey": "filter02",
  718 |     "label": {
  719 |       "zh": "量程",
  720 |       "en": "Volume",
  721 |       "es": "",
  722 |       "fr": "",
  723 |       "ko": "",
  724 |       "ru": ""
...
  728 |     "visible": true
  729 |   },
  730 |   {
  731 |     "categoryId": "pumps",
  732 |     "productTypeId": "plunger-pump",
  733 |     "filterKey": "filter03",
  734 |     "label": {
  735 |       "zh": "泵头材质",
  736 |       "en": "Pump Head Material",
  737 |       "es": "",
  738 |       "fr": "",
  739 |       "ko": "",
  740 |       "ru": ""
...
  744 |     "visible": true
  745 |   },
  746 |   {
  747 |     "categoryId": "pumps",
  748 |     "productTypeId": "plunger-pump",
  749 |     "filterKey": "filter04",
  750 |     "label": {
  751 |       "zh": "",
  752 |       "en": "",
  753 |       "es": "",
  754 |       "fr": "",
  755 |       "ko": "",
  756 |       "ru": ""
...
  760 |     "visible": false
  761 |   },
  762 |   {
  763 |     "categoryId": "pumps",
  764 |     "productTypeId": "plunger-pump",
  765 |     "filterKey": "filter05",
  766 |     "label": {
  767 |       "zh": "",
  768 |       "en": "",
  769 |       "es": "",
  770 |       "fr": "",
  771 |       "ko": "",
  772 |       "ru": ""
...
  776 |     "visible": false
  777 |   },
  778 |   {
  779 |     "categoryId": "pumps",
  780 |     "productTypeId": "plunger-pump",
  781 |     "filterKey": "filter06",
  782 |     "label": {
  783 |       "zh": "",
  784 |       "en": "",
  785 |       "es": "",
  786 |       "fr": "",
  787 |       "ko": "",
  788 |       "ru": ""
...
  792 |     "visible": false
  793 |   },
  794 |   {
  795 |     "categoryId": "pumps",
  796 |     "productTypeId": "plunger-pump",
  797 |     "filterKey": "filter07",
  798 |     "label": {
  799 |       "zh": "",
  800 |       "en": "",
  801 |       "es": "",
  802 |       "fr": "",
  803 |       "ko": "",
  804 |       "ru": ""
...
  808 |     "visible": false
  809 |   }
  810 | ];
  811 | 
  812 | export const selectionTaxonomyItems: ProductSelectionTaxonomyItem[] = [
  813 |   {
  814 |     "type": "category",
  815 |     "id": "pumps",
  816 |     "label": {
  817 |       "zh": "泵系列",
  818 |       "en": "Pumps",
  819 |       "es": "",
  820 |       "fr": "",
```

## data/products/selection/product-route-map.ts

- 文件大小：20485 bytes
- 总行数：607

```ts
   29 | 
   30 | export type ProductTypeRouteEntry = {
   31 |   category: string;
   32 |   categoryId: string;
   33 |   productTypeId: string;
   34 |   label: string;
   35 |   title: string;
   36 |   description: string;
   37 | };
   38 | 
   39 | export type ProductSeriesRouteEntry = {
   40 |   category: string;
   41 |   slug: string;
   42 |   categoryId: string;
   43 |   productTypeId: string;
   44 |   filterKey: SelectionFilterKey;
   45 |   filterValue: string;
   46 |   initialFilters: ProductRouteInitialFilters;
   47 |   label: string;
   48 |   title: string;
   49 |   description: string;
   50 | };
   51 | 
...
   91 |       categoryId: "fittings",
   92 |       label: "接头系列",
   93 |       title: "接头系列 | FOREACH",
   94 |       description:
   95 |         "恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头、堵头、过滤器和单向阀。",
   96 |     },  },
   97 | 
   98 |   productTypes: {
   99 |     "plunger-pumps": {
  100 |       category: "pumps",
  101 |       categoryId: "pumps",
  102 |       productTypeId: "plunger-pump",
  103 |       label: "柱塞泵",
  104 |       title: "柱塞泵 | FOREACH",
  105 |       description:
  106 |         "柱塞泵适用于自动化分析仪器、IVD、生命科学和实验室自动化设备中的精密液体处理。",
  107 |     },
  108 | 
  109 |     "diaphragm-pumps": {
  110 |       category: "pumps",
  111 |       categoryId: "pumps",
  112 |       productTypeId: "diaphragm-pump",
  113 |       label: "隔膜泵",
  114 |       title: "隔膜泵 | FOREACH",
  115 |       description:
  116 |         "隔膜泵适用于清洗、废液、试剂输送和仪器内部中低流量液体传输场景。",
  117 |     },
  118 | 
  119 |     "pipetting-pumps": {
  120 |       category: "pumps",
  121 |       categoryId: "pumps",
  122 |       productTypeId: "pipette-pump",
  123 |       label: "移液泵",
  124 |       title: "移液泵 | FOREACH",
  125 |       description:
  126 |         "移液泵适用于自动化移液、加样、分液和微量液体处理场景。",
  127 |     },
  128 | 
  129 |     "syringe-pumps": {
  130 |       category: "pumps",
  131 |       categoryId: "pumps",
  132 |       productTypeId: "syringe-pump",
  133 |       label: "注射泵",
  134 |       title: "注射泵 | FOREACH",
  135 |       description:
  136 |         "注射泵适用于高精度进样、注液、梯度控制和稳定流量输出场景。",
  137 |     },
  138 | 
  139 |     "valveless-pumps": {
  140 |       category: "pumps",
  141 |       categoryId: "pumps",
  142 |       productTypeId: "valveless-pump",
  143 |       label: "无阀泵",
  144 |       title: "无阀泵 | FOREACH",
  145 |       description:
  146 |         "无阀泵适用于简化液路结构、降低阀件依赖和提高系统集成度的精密液体处理场景。",
  147 |   
  148 |     },
  149 | 
  150 |     "hard-tube-fittings": {
  151 |       category: "fittings",
  152 |       categoryId: "fittings",
  153 |       productTypeId: "hard-tube-fittings",
  154 |       label: "硬管接头",
  155 |       title: "硬管接头 | FOREACH",
  156 |       description:
  157 |         "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
  158 |     },
  159 | 
  160 |     "barbed-fittings": {
  161 |       category: "fittings",
  162 |       categoryId: "fittings",
  163 |       productTypeId: "barbed-fittings",
  164 |       label: "倒刺接头",
  165 |       title: "倒刺接头 | FOREACH",
  166 |       description:
  167 |         "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
  168 |     },
  169 | 
  170 |     "luer-fittings": {
  171 |       category: "fittings",
  172 |       categoryId: "fittings",
  173 |       productTypeId: "luer-fittings",
  174 |       label: "鲁尔接头",
  175 |       title: "鲁尔接头 | FOREACH",
  176 |       description:
  177 |         "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
  178 |     },
  179 | 
  180 |     "quick-connect-fittings": {
  181 |       category: "fittings",
  182 |       categoryId: "fittings",
  183 |       productTypeId: "quick-connect-fittings",
  184 |       label: "快插接头",
  185 |       title: "快插接头 | FOREACH",
  186 |       description:
  187 |         "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
  188 |     },
  189 | 
  190 |     "female-thread-adapters": {
  191 |       category: "fittings",
  192 |       categoryId: "fittings",
  193 |       productTypeId: "female-thread-adapters",
  194 |       label: "内螺纹互转接头",
  195 |       title: "内螺纹互转接头 | FOREACH",
  196 |       description:
  197 |         "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
  198 |     },
  199 | 
  200 |     "plugs": {
  201 |       category: "fittings",
  202 |       categoryId: "fittings",
  203 |       productTypeId: "plugs",
  204 |       label: "堵头",
  205 |       title: "堵头 | FOREACH",
  206 |       description:
  207 |         "堵头覆盖螺纹堵头、倒刺堵头、公鲁尔堵头、标滚堵头、紧凑堵头和顶丝堵头。",
  208 |     },
  209 | 
  210 |     "filters": {
  211 |       category: "fittings",
  212 |       categoryId: "fittings",
  213 |       productTypeId: "filters",
  214 |       label: "过滤器",
  215 |       title: "过滤器 | FOREACH",
  216 |       description:
  217 |         "过滤器用于自动化仪器液路中的颗粒拦截、流体净化和水循环过滤。",
  218 |     },
  219 | 
  220 |     "check-valves": {
  221 |       category: "fittings",
  222 |       categoryId: "fittings",
  223 |       productTypeId: "check-valves",
  224 |       label: "单向阀",
  225 |       title: "单向阀 | FOREACH",
  226 |       description:
  227 |         "单向阀用于控制流体单向流动并降低液路回流风险。",
  228 | 
  229 | },
  230 | 
  231 |   },
...
  234 |     "ea-standard-piston-pumps": {
  235 |       category: "pumps",
  236 |       slug: "plunger-pumps",
  237 |       categoryId: "pumps",
  238 |       productTypeId: "plunger-pump",
  239 |       filterKey: "filter01",
  240 |       filterValue: "EA 常规柱塞泵",
  241 |       initialFilters: {
  242 |         filter01: ["EA 常规柱塞泵"],
  243 |       },
  244 |       label: "EA 常规柱塞泵",
  245 |       title: "EA 常规柱塞泵 | FOREACH",
  246 |       description:
  247 |         "EA 常规柱塞泵适合作为自动化分析仪器中的标准平台型精密液体处理模块。",
  248 |     },
  249 | 
  250 |     "sm-miniature-piston-pumps": {
  251 |       category: "pumps",
  252 |       slug: "plunger-pumps",
  253 |       categoryId: "pumps",
  254 |       productTypeId: "plunger-pump",
  255 |       filterKey: "filter01",
  256 |       filterValue: "SM 微型柱塞泵",
  257 |       initialFilters: {
  258 |         filter01: ["SM 微型柱塞泵"],
  259 |       },
  260 |       label: "SM 微型柱塞泵",
  261 |       title: "SM 微型柱塞泵 | FOREACH",
  262 |       description:
  263 |         "SM 微型柱塞泵面向空间受限的自动化仪器液路模块，适用于小型化精密液体处理场景。",
  264 |     },
  265 | 
  266 |     "tm-ultra-compact-piston-pumps": {
  267 |       category: "pumps",
  268 |       slug: "plunger-pumps",
  269 |       categoryId: "pumps",
  270 |       productTypeId: "plunger-pump",
  271 |       filterKey: "filter01",
  272 |       filterValue: "TM 超微型柱塞泵",
  273 |       initialFilters: {
  274 |         filter01: ["TM 超微型柱塞泵"],
  275 |       },
  276 |       label: "TM 超微型柱塞泵",
  277 |       title: "TM 超微型柱塞泵 | FOREACH",
  278 |       description:
  279 |         "TM 超微型柱塞泵适用于对安装空间、结构集成度和微量液体处理要求更高的精密仪器场景。",
  280 |     },
  281 |   
  282 |     "gas-diaphragm-pumps": {
  283 |       category: "pumps",
  284 |       slug: "diaphragm-pumps",
  285 |       categoryId: "pumps",
  286 |       productTypeId: "diaphragm-pump",
  287 |       filterKey: "filter01",
  288 |       filterValue: "气体隔膜泵",
  289 |       initialFilters: {
  290 |         filter01: ["气体隔膜泵"],
  291 |       },
  292 |       label: "气泵",
  293 |       title: "气体隔膜泵 | FOREACH",
  294 |       description:
  295 |         "气体隔膜泵适用于仪器内部气体抽吸、正负压建立和气路辅助输送等场景。当前型号数据待补充。",
  296 |     },
  297 | 
  298 |     "liquid-diaphragm-pumps": {
  299 |       category: "pumps",
  300 |       slug: "diaphragm-pumps",
  301 |       categoryId: "pumps",
  302 |       productTypeId: "diaphragm-pump",
  303 |       filterKey: "filter01",
  304 |       filterValue: "液体隔膜泵",
  305 |       initialFilters: {
  306 |         filter01: ["液体隔膜泵"],
  307 |       },
  308 |       label: "液泵",
  309 |       title: "液体隔膜泵 | FOREACH",
  310 |       description:
  311 |         "液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和液体循环等场景。",
  312 |     },
  313 | 
  314 |     "gas-liquid-diaphragm-pumps": {
  315 |       category: "pumps",
  316 |       slug: "diaphragm-pumps",
  317 |       categoryId: "pumps",
  318 |       productTypeId: "diaphragm-pump",
  319 |       filterKey: "filter01",
  320 |       filterValue: "气液混合隔膜泵",
  321 |       initialFilters: {
  322 |         filter01: ["气液混合隔膜泵"],
  323 |       },
  324 |       label: "气液混合泵",
  325 |       title: "气液混合隔膜泵 | FOREACH",
  326 |       description:
  327 |         "气液混合隔膜泵适用于气体抽吸、负压建立和气液混合物抽排等场景。",
  328 |     },
  329 | },
  330 | 
...
  343 |     slug,
  344 |   }));
  345 | }
  346 | 
  347 | export function getSeriesRouteParams() {
  348 |   return Object.entries(productRouteMap.series).map(([seriesSlug, route]) => ({
  349 |     category: route.category,
  350 |     slug: route.slug,
  351 |     seriesSlug,
  352 |   }));
  353 | }
  354 | 
  355 | export function resolveCategoryRoute(category: string) {
...
  365 | 
  366 |   return route;
  367 | }
  368 | 
  369 | export function resolveSeriesRoute(
  370 |   category: string,
  371 |   slug: string,
  372 |   seriesSlug: string
  373 | ) {
  374 |   const route = productRouteMap.series[seriesSlug];
  375 | 
  376 |   if (!route || route.category !== category || route.slug !== slug) {
  377 |     return null;
...
  381 | }
  382 | 
  383 | export function hasProductTypeRouteByIds(
  384 |   categoryId: string,
  385 |   productTypeId: string
  386 | ) {
  387 |   return Object.values(productRouteMap.productTypes).some((route) => {
  388 |     return (
  389 |       route.categoryId === categoryId &&
  390 |       route.productTypeId === productTypeId
  391 |     );
  392 |   });
  393 | }
  394 | 
  395 | export function getProductTypeHrefByIds(
  396 |   categoryId: string,
  397 |   productTypeId: string
  398 | ) {
  399 |   const matchedRoute = Object.entries(productRouteMap.productTypes).find(
  400 |     ([, route]) => {
  401 |       return (
  402 |         route.categoryId === categoryId &&
  403 |         route.productTypeId === productTypeId
  404 |       );
  405 |     }
  406 |   );
  407 | 
  408 |   if (!matchedRoute) {
  409 |     return null;
  410 |   }
  411 | 
...
  417 | export function getProductTypeFilterOptionsByCategory(categoryId: string) {
  418 |   return Object.values(productRouteMap.productTypes)
  419 |     .filter((route) => route.categoryId === categoryId)
  420 |     .map((route) => ({
  421 |       value: route.productTypeId,
  422 |       label: route.label,
  423 |       href: getProductTypeHrefByIds(route.categoryId, route.productTypeId),
  424 |     }));
  425 | }
  426 | 
  427 | export function getSeriesHrefByFilterValue(
  428 |   categoryId: string,
  429 |   productTypeId: string,
  430 |   filterKey: string,
  431 |   filterValue: string
  432 | ) {
  433 |   const matchedRoute = Object.entries(productRouteMap.series).find(
  434 |     ([, route]) => {
  435 |       return (
  436 |         route.categoryId === categoryId &&
  437 |         route.productTypeId === productTypeId &&
  438 |         route.filterKey === filterKey &&
  439 |         route.filterValue === filterValue
  440 |       );
  441 |     }
  442 |   );
  443 | 
  444 |   if (!matchedRoute) {
  445 |     return null;
...
  451 | }
  452 | 
  453 | export function getSeriesFilterOptionsByProductType(
  454 |   categoryId: string,
  455 |   productTypeId: string,
  456 |   filterKey: string
  457 | ) {
  458 |   return Object.entries(productRouteMap.series)
  459 |     .filter(([, route]) => {
  460 |       return (
  461 |         route.categoryId === categoryId &&
  462 |         route.productTypeId === productTypeId &&
  463 |         route.filterKey === filterKey
  464 |       );
  465 |     })
  466 |     .map(([seriesSlug, route]) => ({
  467 |       value: route.filterValue,
  468 |       label: route.label,
  469 |       href: `/products/${route.category}/${route.slug}/${seriesSlug}`,
  470 |     }));
...
  482 | ========================================================= */
  483 | 
  484 | export type ProductTypeIntroEntry = {
  485 |   categoryId: string;
  486 |   productTypeId: string;
  487 |   title: string;
  488 |   paragraphs: string[];
  489 |   image: {
  490 |     src: string;
  491 |     alt: string;
  492 |   };
  493 | };
  494 | 
  495 | export const productTypeIntroMap: Record<string, ProductTypeIntroEntry> = {
  496 |   "pumps:plunger-pump": {
  497 |     categoryId: "pumps",
  498 |     productTypeId: "plunger-pump",
  499 |     title: "柱塞泵系列",
  500 |     paragraphs: [
  501 |       "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
  502 |       "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型，并支持与电磁阀、控制器、光耦反馈及泵阀一体化方案组合使用。",
  503 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  504 |     ],
  505 |     image: {
  506 |       src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
...
  509 |   },
  510 | 
  511 |   "pumps:diaphragm-pump": {
  512 |     categoryId: "pumps",
  513 |     productTypeId: "diaphragm-pump",
  514 |     title: "隔膜泵系列",
  515 |     paragraphs: [
  516 |       "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
  517 |       "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
  518 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
  519 |     ],
  520 |     image: {
  521 |       src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
...
  524 |   },
  525 | 
  526 |   "pumps:pipette-pump": {
  527 |     categoryId: "pumps",
  528 |     productTypeId: "pipette-pump",
  529 |     title: "移液泵系列",
  530 |     paragraphs: [
  531 |       "恒永达移液泵系列面向自动化移液、加样、分液和样本处理场景，可用于体外诊断、生命科学、实验室自动化和分析仪器中的微量液体操作。",
  532 |       "产品可结合液面检测、压力监测、堵针识别和控制模块，实现更稳定的吸液、排液和移液过程，适合对重复性、稳定性和系统集成度要求较高的仪器平台。",
  533 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  534 |     ],
  535 |     image: {
  536 |       src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
...
  539 |   },
  540 | 
  541 |   "pumps:syringe-pump": {
  542 |     categoryId: "pumps",
  543 |     productTypeId: "syringe-pump",
  544 |     title: "注射泵系列",
  545 |     paragraphs: [
  546 |       "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出，可应用于分析仪器、实验室自动化、生命科学和精密液体处理系统。",
  547 |       "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型，适合需要稳定体积控制和精密注液的设备平台。",
  548 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  549 |     ],
  550 |     image: {
  551 |       src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
...
  554 |   },
  555 | 
  556 |   "pumps:valveless-pump": {
  557 |     categoryId: "pumps",
  558 |     productTypeId: "valveless-pump",
  559 |     title: "无阀泵系列",
  560 |     paragraphs: [
  561 |       "恒永达无阀泵系列适用于需要简化液路结构、减少阀件依赖和提高系统集成度的精密液体处理场景，可用于紧凑型分析仪器和自动化设备。",
  562 |       "无阀泵通过结构设计减少传统阀件带来的维护和集成复杂度，适合对紧凑空间、低维护需求和稳定输送性能有要求的仪器液路。",
  563 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  564 |     ],
  565 |     image: {
  566 |       src: "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
...
  569 |   },
  570 | 
  571 |   "pumps:high-pressure-pump": {
  572 |     categoryId: "pumps",
  573 |     productTypeId: "high-pressure-pump",
  574 |     title: "高压泵系列",
  575 |     paragraphs: [
  576 |       "恒永达高压泵系列适用于对压力稳定性、耐压能力和连续输送性能要求较高的分析仪器液路场景。",
  577 |       "该系列可用于需要稳定压力输出、精密流量控制和高可靠性液体输送的仪器平台，并可根据压力范围、流量需求、材料兼容性和系统接口进行配置。",
  578 |       "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。"
  579 |     ],
  580 |     image: {
  581 |       src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
...
  585 | };
  586 | 
  587 | export function getProductTypeIntroByIds(
  588 |   categoryId: string,
  589 |   productTypeId: string
  590 | ) {
  591 |   return productTypeIntroMap[`${categoryId}:${productTypeId}`] || null;
  592 | }
  593 | 
  594 | 
  595 | 
  596 | export const tubingProductRouteMap = {
  597 |   "pvc-tubing": "/products/tubing/pvc-tubing",
  598 |   "tpu-tubing": "/products/tubing/tpu-tubing",
  599 |   "fep-tubing": "/products/tubing/fep-tubing",
```

## components/products/selection/ProductSelectionClient.tsx

- 文件大小：81422 bytes
- 总行数：3084

```ts
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
   44 | } from "@/data/products/selection/probe-selection.generated";
   45 | 
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
   48 | import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
   49 | import {
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   threadToBarbedDetailHrefByModel,
   72 |   threadToBarbedDetailHrefByProductCode,
   73 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   74 | 
   75 | import ProductCardGrid from "./ProductCardGrid";
   76 | import ProductCategoryTabs from "./ProductCategoryTabs";
   77 | import ProductEmptyState from "./ProductEmptyState";
   78 | import ProductFilterPanel from "./ProductFilterPanel";
   79 | import ProductSelectionPagination from "./ProductSelectionPagination";
   80 | import ProductSelectionToolbar from "./ProductSelectionToolbar";
   81 | import { getLocalizedFilterOptionLabel } from "./filter-option-i18n";
   82 | import {
   83 |   syringePumpFilterLabels,
   84 |   syringePumpSelectionProducts,
   85 | } from "@/data/products/selection/syringe-pump-selection.generated";
   86 | import { controlModuleSelectionProducts, controlModuleTaxonomyItems, controlModuleFilterLabels } from "@/data/products/selection/control-module-selection.generated";
   87 | 
   88 | import type {
   89 |   ProductSelectionFilterLabel,
   90 |   ProductSelectionProduct,
   91 |   SelectionFilterKey,
   92 |   SelectionLocale,
   93 | } from "@/data/products/selection/product-selection.types";
   94 | 
...
   97 |   ProductSelectionFilterGroup,
   98 |   ProductSelectionSelectedTag,
   99 | } from "./product-selection-ui.types";
  100 | 
  101 | const selectionProducts = [
  102 |     ...quickConnectFittingSelectionProducts,
  103 |   ...threadToBarbedFittingSelectionProducts,
  104 | ...baseSelectionProducts,
  105 |   ...diaphragmPumpSelectionProducts,
  106 |   ...pipettingPumpSelectionProducts,
  107 |   ...valvelessPumpSelectionProducts,
  108 |   ...valveSelectionProducts,
  109 |   ...probeSelectionProducts,
  110 |   ...tubingSelectionProducts,
  111 |   ...hardTubeFittingSelectionProducts,
  112 |   ...barbedFittingSelectionProducts,
  113 |   ...syringePumpSelectionProducts,
  114 |   ...controlModuleSelectionProducts,
  115 | ].filter((product, index, array) => {
  116 |   return index === array.findIndex((item) => item.productId === product.productId);
  117 | });
  118 | 
  119 | const selectionTaxonomyItems = [
  120 |     ...quickConnectFittingTaxonomyItems,
  121 |   ...threadToBarbedFittingTaxonomyItems,
  122 | ...baseSelectionTaxonomyItems,
  123 |   ...hardTubeFittingTaxonomyItems,
  124 |   ...barbedFittingTaxonomyItems,
  125 |   ...diaphragmPumpTaxonomyItems,
  126 |   ...controlModuleTaxonomyItems,
  127 | ].filter((item, index, array) => {
  128 |   return index === array.findIndex((entry) => entry.id === item.id);
  129 | });
  130 | 
  131 | const selectionFilterLabels = [
  132 |     ...quickConnectFittingFilterLabels,
  133 |   ...threadToBarbedFittingFilterLabels,
  134 | ...baseSelectionFilterLabels,
  135 |   ...hardTubeFittingFilterLabels,
  136 |   ...barbedFittingFilterLabels,
  137 |   ...diaphragmPumpFilterLabels,
  138 |   ...pipettingPumpFilterLabels,
  139 |   ...valvelessPumpFilterLabels,
  140 |   ...valveFilterLabels,
  141 |   ...probeFilterLabels,
  142 |   ...syringePumpFilterLabels,
  143 |   ...controlModuleFilterLabels,
...
  145 |   return (
  146 |     index ===
  147 |     array.findIndex((item) => {
  148 |       return (
  149 |         (item as any).productTypeId === (label as any).productTypeId &&
  150 |         (item as any).filterKey === (label as any).filterKey
  151 |       );
  152 |     })
  153 |   );
  154 | });
  155 | 
  156 | type ProductSelectionClientProps = {
  157 |   locale?: SelectionLocale;
  158 |   pageData?: unknown;
  159 |   initialCategoryId?: string;
  160 |   initialProductTypeId?: string;
  161 |   initialFilters?: Partial<Record<SelectionFilterKey, string[]>>;
  162 | };
  163 | 
  164 | type SelectedFilterMap = Partial<Record<SelectionFilterKey, Set<string>>>;
  165 | 
  166 | const FILTER_KEYS: SelectionFilterKey[] = [
  167 |   "filter01",
  168 |   "filter02",
  169 |   "filter03",
  170 |   "filter04",
  171 |   "filter05",
  172 |   "filter06",
  173 |   "filter07",
  174 |   "filter08",
  175 | ];
...
  346 |   return value[locale] || value.zh || value.en || fallback;
  347 | }
  348 | 
  349 | function getTaxonomyLabel(locale: SelectionLocale, id: string) {
  350 |   const item = selectionTaxonomyItems.find((entry) => entry.id === id);
  351 | 
  352 |   return getText(locale, item?.label, id);
  353 | }
  354 | 
  355 | function getCategoryItems(locale: SelectionLocale) {
  356 |   const generatedCategories = selectionTaxonomyItems
  357 |     .filter((item) => item.type === "category")
  358 |     .map((item) => {
  359 |       const fallback = DEFAULT_CATEGORIES.find(
  360 |         (category) => category.id === item.id
  361 |       );
  362 | 
  363 |       return {
  364 |         id: item.id,
...
  391 |     TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
  392 |     管路系列直接返回 6 张材料卡片。
  393 |   */
  394 |   if (String(arguments[0] || "") === "tubing") {
  395 |     return tubingSelectionProducts;
  396 |   }
  397 | 
  398 | return selectionProducts
  399 |     .filter((product) => product.categoryId === categoryId)
  400 |     .filter((product, index, array) => {
  401 |       return (
  402 |         index ===
  403 |         array.findIndex((item) => item.productId === product.productId)
  404 |       );
  405 |     });
  406 | }
  407 | 
  408 | function getFirstProductTypeId(categoryId: string) {
  409 |   
  410 |   /*
  411 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  412 |   */
  413 |   if (String(arguments[0] || "") === "tubing") {
  414 |     return "tubing";
  415 |   }
  416 | 
  417 | const products = getProductsByCategory(categoryId);
  418 |   const first = products[0];
  419 | 
  420 |   if (first?.productTypeId) {
  421 |     return first.productTypeId;
  422 |   }
  423 | 
  424 |   return (
  425 |     getProductTypeFilterOptionsByCategory(categoryId)[0]?.value || ""
  426 |   );
  427 | }
  428 | 
  429 | function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  430 |   return selectionFilterLabels
  431 |     .filter((item): item is ProductSelectionFilterLabel => {
  432 |       const label = item as any;
  433 | 
  434 |       return Boolean(
  435 |         label &&
  436 |           typeof label === "object" &&
  437 |           label.productTypeId === productTypeId &&
  438 |           label.visible
  439 |       );
  440 |     })
  441 |     .sort((current, next) => {
  442 |       const currentSortOrder = Number((current as any).sortOrder ?? 0);
  443 |       const nextSortOrder = Number((next as any).sortOrder ?? 0);
  444 | 
  445 |       return currentSortOrder - nextSortOrder;
...
  455 | function getFilterOptions(
  456 |   products: ProductSelectionProduct[],
  457 |   filterKey: SelectionFilterKey,
  458 |   selectedFilters: SelectedFilterMap,
  459 |   productTypeId: string
  460 | ) {
  461 |   /*
  462 |    * 硬管接头的接管外径可能包含多个兼容尺寸。
  463 |    *
  464 |    * 例如：
  465 |    * 1.6 mm|1.8 mm|2.0 mm
  466 |    *
  467 |    * 左侧筛选必须拆成三个独立选项。
  468 |    */
  469 |   if (
  470 |     productTypeId === "hard-tube-fittings" &&
  471 |     filterKey === "filter03"
  472 |   ) {
  473 |     const expandedProducts = products.flatMap((product) => {
  474 |       const values = splitFilterValues(
  475 |         (product.filters || {})[filterKey]
  476 |       );
  477 | 
  478 |       if (values.length <= 1) {
...
  489 |       }));
  490 |     });
  491 | 
  492 |     return getProductFilterOptions({
  493 |       productTypeId,
  494 |       products: expandedProducts,
  495 |       filterKey,
  496 |       selectedFilters,
  497 |     });
  498 |   }
  499 | 
  500 |   return getProductFilterOptions({
  501 |     productTypeId,
  502 |     products,
  503 |     filterKey,
  504 |     selectedFilters,
  505 |   });
  506 | }
  507 | function getDefaultSelectedFilters(
  508 |   _categoryId: string,
  509 |   _productTypeId: string
  510 | ): SelectedFilterMap {
  511 |   /*
  512 |    * 说明：
  513 |    * 1. 二级产品类型页只代表“柱塞泵”
  514 |    * 2. 不应该默认选中 EA / SM / TM
  515 |    * 3. 三级系列页会通过 initialFilters 单独选中对应系列
  516 |    */
  517 |   return {};
  518 | }
  519 | 
  520 | function getInitialSelectedFilters(
  521 |   categoryId: string,
  522 |   productTypeId: string,
  523 |   initialFilters?: ProductSelectionClientProps["initialFilters"]
  524 | ): SelectedFilterMap {
  525 |   const selected = getDefaultSelectedFilters(categoryId, productTypeId);
  526 | 
  527 |   if (!initialFilters) {
  528 |     return selected;
  529 |   }
  530 | 
  531 |   FILTER_KEYS.forEach((filterKey) => {
  532 |     const values = initialFilters[filterKey];
  533 | 
...
  558 | 
  559 |   return 12;
  560 | }
  561 | 
  562 | function getDefaultMobileOpenFilterGroups(productTypeId: string) {
  563 |   const openGroups: Record<string, boolean> = {
  564 |     productType: false,
  565 |   };
  566 | 
  567 |   getVisibleFilterLabels(productTypeId).forEach((filter) => {
  568 |     openGroups[filter.filterKey] = false;
  569 |   });
  570 | 
  571 |   return openGroups;
  572 | }
  573 | 
  574 | function normalizeDetailPathPart(value: unknown) {
  575 |   return String(value || "")
...
  670 |     getSelectionLocalizedText(product.cardTitle, "zh"),
  671 |     product.productId,
  672 |     product.detailSlug,
  673 |     product.seriesId,
  674 |     product.filters?.filter01,
  675 |     product.filters?.filter02,
  676 |     product.filters?.filter03,
  677 |     getSelectionLocalizedText(product.searchKeywords, "en"),
  678 |     getSelectionLocalizedText(product.searchKeywords, "zh"),
  679 |   ]
  680 |     .map(cleanPlungerHrefText)
  681 |     .filter(Boolean)
  682 |     .join(" ");
...
  766 | 
  767 |     避免后续通用逻辑把链接改回产品类型筛选页。
  768 |   */
  769 |   {
  770 |     const rawProductTypeId =
  771 |       String(
  772 |         (product as any)?.productTypeId ||
  773 |         ""
  774 |       ).trim();
  775 | 
  776 |     const rawSourceType =
  777 |       String(
  778 |         (product as any)?.sourceType ||
  779 |         ""
  780 |       ).trim();
...
  791 |         product || {}
  792 |       );
  793 | 
  794 |     const isQuickConnect =
  795 |       rawProductTypeId ===
  796 |         "quick-connect-fittings" ||
  797 |       rawSourceType ===
  798 |         "quick-connect-selection" ||
  799 |       rawExistingHref.includes(
  800 |         "/products/fittings/quick-connect-fittings/"
  801 |       ) ||
  802 |       rawProductText.includes(
  803 |         "快插接头"
...
  931 |    * 优先按商品编码匹配，
  932 |    * 避免相同基础型号、不同 O 圈配置产生重复地址。
  933 |    */
  934 |   {
  935 |     const rawProductTypeId =
  936 |       String(
  937 |         (product as any)
  938 |           ?.productTypeId ||
  939 |         ""
  940 |       ).trim();
  941 | 
  942 |     const rawExistingHref =
  943 |       String(
  944 |         (product as any)
  945 |           ?.detailHref ||
  946 |         (product as any)
  947 |           ?.href ||
  948 |         ""
  949 |       ).trim();
  950 | 
  951 |     const isThreadToBarbed =
  952 |       rawProductTypeId ===
  953 |         "thread-to-barbed-fittings" ||
  954 |       rawExistingHref.includes(
  955 |         "/products/fittings/thread-to-barbed-fittings"
  956 |       );
  957 | 
  958 |     if (isThreadToBarbed) {
  959 |       const productCode =
  960 |         String(
  961 |           (product as any)
  962 |             ?.productCode ||
  963 |           (product as any)
  964 |             ?.productId ||
  965 |           ""
  966 |         ).trim();
...
  995 |           ""
  996 |         ).trim();
  997 | 
  998 |       const matchedHref =
  999 |         threadToBarbedDetailHrefByProductCode[
 1000 |           productCode
 1001 |         ] ||
 1002 |         threadToBarbedDetailHrefByModel[
 1003 |           model
 1004 |         ];
 1005 | 
 1006 |       if (matchedHref) {
 1007 |         return matchedHref;
 1008 |       }
 1009 | 
 1010 |       return (
 1011 |         rawExistingHref ||
 1012 |         "/products/fittings/thread-to-barbed-fittings"
 1013 |       );
 1014 |     }
 1015 |   }
 1016 | 
 1017 |   /* THREAD_TO_BARBED_DETAIL_HREF_END */
 1018 | 
 1019 |   /* BARBED_FITTING_DETAIL_HREF_START */
 1020 | 
...
 1023 |    * 页面结构继续复用 ProductDetailClient，
 1024 |    * 这里只负责把卡片导向具体型号。
 1025 |    */
 1026 |   {
 1027 |     const rawProductTypeId =
 1028 |       String(
 1029 |         (product as any)?.productTypeId ||
 1030 |         ""
 1031 |       ).trim();
 1032 | 
 1033 |     const rawExistingHref =
 1034 |       String(
 1035 |         (product as any)?.detailHref ||
 1036 |         (product as any)?.href ||
 1037 |         ""
 1038 |       ).trim();
 1039 | 
 1040 |     const isBarbedFitting =
 1041 |       rawProductTypeId ===
 1042 |         "barbed-fittings" ||
 1043 |       rawExistingHref.includes(
 1044 |         "/products/fittings/barbed-fittings"
 1045 |       );
 1046 | 
 1047 |     if (isBarbedFitting) {
 1048 |       const rawCardTitle =
 1049 |         (product as any)?.cardTitle;
...
 1115 |   */
 1116 |   if (
 1117 |     (product as any)?.categoryId === "control" ||
 1118 |     (product as any)?.category === "control" ||
 1119 |     (product as any)?.productTypeId === "control-module" ||
 1120 |     (product as any)?.productTypeLabel === "智控模块"
 1121 |   ) {
 1122 |     const rawHref = String(
 1123 |       (product as any).detailHref ||
 1124 |         (product as any).href ||
 1125 |         ""
 1126 |     ).trim();
 1127 | 
...
 1367 | 
 1368 |   /*
 1369 |     PROBE_DETAIL_HREF_PATCH_20260709
 1370 | 
 1371 |     针系列在产品中心中使用中文 productTypeId 显示筛选项，
 1372 |     详情路由不能依赖 productTypeId。
 1373 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1374 |   */
 1375 |   if (
 1376 |     (product as any)?.sourceType === "probe-selection" ||
 1377 |     (product as any)?.category === "probes" ||
 1378 |     (product as any)?.categoryLabel === "针系列"
 1379 |   ) {
 1380 |     const rawHref = String(
...
 1414 | 
 1415 |   /*
 1416 |     PROBE_DETAIL_HREF_PATCH_20260708
 1417 | 
 1418 |     针系列产品类型使用中文显示，详情路径不能依赖 productTypeId。
 1419 |     这里优先读取 detailHref / href / productTypeSlug / detailSlug / routeSlug / slug。
 1420 |     避免生成 /products/probes/undefined。
 1421 |   */
 1422 |   if (
 1423 |     (product as any)?.sourceType === "probe-selection" ||
 1424 |     (product as any)?.category === "probes" ||
 1425 |     (product as any)?.categoryLabel === "针系列"
 1426 |   ) {
...
 1461 | 
 1462 |   /*
 1463 |     VALVE_DETAIL_HREF_PATCH_20260707
 1464 | 
 1465 |     阀系列产品类型为了中文显示，productTypeId 可能是“旋转阀 / 高压阀 / 电磁阀”。
 1466 |     因此详情链接不能只依赖 productTypeId。
 1467 |     这里优先读取 detailHref / href / detailSlug / routeSlug / slug / seriesSlug。
 1468 |     避免生成 /products/valves/undefined/。
 1469 |   */
 1470 |   if ((product as any)?.categoryId === "valves") {
 1471 |     const rawHref = String(
 1472 |       (product as any).detailHref ||
 1473 |         (product as any).href ||
 1474 |         ""
...
 1505 | 
 1506 |   
 1507 |   const isValveProduct =
 1508 |     product.categoryId === "valves" &&
 1509 |     ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(String(product.productTypeId || ""));
 1510 | 
 1511 |   if (isValveProduct) {
 1512 |     return (
 1513 |       (product as any).detailHref ||
 1514 |       (product as any).href ||
 1515 |       `/products/valves/${product.productTypeId}`
 1516 |     );
 1517 |   }
 1518 | 
 1519 |   const isValvelessPump =
 1520 |     product.categoryId === "pumps" &&
 1521 |     ["valveless-pump", "valveless-pumps"].includes(String(product.productTypeId || ""));
 1522 | 
 1523 |   const isSyringePump =
 1524 |     product.categoryId === "pumps" &&
 1525 |     ["syringe-pump", "syringe-pumps"].includes(String(product.productTypeId || ""));
 1526 | 
 1527 |   if (isValvelessPump) {
 1528 |     const rawSlug =
 1529 |       (product as any).detailSlug ||
 1530 |       (product as any).seriesSlug ||
 1531 |       (product as any).seriesId ||
 1532 |       product.productId;
 1533 | 
...
 1558 |       : "/products/pumps/syringe-pumps";
 1559 |   }
 1560 | const isDiaphragmPump =
 1561 |     product.categoryId === "pumps" &&
 1562 |     ["diaphragm-pump", "diaphragm-pumps"].includes(String(product.productTypeId || ""));
 1563 | 
 1564 |   if (isDiaphragmPump) {
 1565 |     const rawSlug =
 1566 |       (product as any).detailSlug ||
 1567 |       (product as any).seriesSlug ||
 1568 |       (product as any).seriesId ||
 1569 |       product.productId;
 1570 | 
...
 1577 |       ? `/products/pumps/diaphragm-pumps/${slug}`
 1578 |       : "/products/pumps/diaphragm-pumps";
 1579 |   }  const isPipettingPump =
 1580 |     product.categoryId === "pumps" &&
 1581 |     ["pipette-pump", "pipetting-pump", "pipetting-pumps"].includes(String(product.productTypeId || ""));
 1582 | 
 1583 |   if (isPipettingPump) {
 1584 |     const rawSlug =
 1585 |       (product as any).detailSlug ||
 1586 |       (product as any).seriesSlug ||
 1587 |       (product as any).seriesId ||
 1588 |       product.productId;
 1589 | 
...
 1601 | 
 1602 | 
 1603 |   const isPlungerPump =
 1604 |     product.categoryId === "pumps" &&
 1605 |     ["plunger-pump", "plunger-pumps"].includes(String(product.productTypeId || ""));
 1606 | 
 1607 |   if (isPlungerPump) {
 1608 |     const slug = getPlungerPumpModelSlugForDetailHref(product);
 1609 | 
 1610 |     return slug
 1611 |       ? `/products/pumps/plunger-pumps/${slug}`
 1612 |       : "/products/pumps/plunger-pumps";
 1613 |   }
...
 1618 | /*
 1619 |  * 硬管接头接管外径筛选排序
 1620 |  *
 1621 |  * 仅作用于：
 1622 |  * productTypeId = hard-tube-fittings
 1623 |  * filter03 = 接管外径
 1624 |  */
 1625 | function sortHardTubeFilterOptionsForDisplay(
 1626 |   productTypeId: string,
 1627 |   filterKey: SelectionFilterKey,
 1628 |   options: Array<{
 1629 |     value: string;
 1630 |     label: string;
 1631 |   }>
 1632 | ) {
 1633 |   /* QUICK_CONNECT_FILTER02_SORT_START */
 1634 | 
...
 1639 |    * 2. 螺纹规格放在所有软管尺寸之后；
 1640 |    * 3. 不改变硬管接头和其他产品筛选。
 1641 |    */
 1642 |   if (
 1643 |     productTypeId === "quick-connect-fittings" &&
 1644 |     filterKey === "filter02"
 1645 |   ) {
 1646 |     const diameterOrder = [
 1647 |       "1.6 mm",
 1648 |       "3.2 mm",
 1649 |       "4.8 mm",
 1650 |       "6.4 mm",
 1651 |       "7.9 mm",
...
 1734 | 
 1735 | 
 1736 | 
 1737 |   if (
 1738 |     productTypeId !== "hard-tube-fittings" ||
 1739 |     filterKey !== "filter03"
 1740 |   ) {
 1741 |     return options;
 1742 |   }
 1743 | 
 1744 |   const tubeOdOrder = new Map<string, number>([
 1745 |     ["1.6 mm", 10],
 1746 |     ["1.8 mm", 20],
...
 1771 |  * THREAD_TO_BARBED_FINAL_FILTER_LAYOUT
 1772 |  *
 1773 |  * 螺纹转倒刺接头：
 1774 |  * filter02 = 密封方式，每项独占一行
 1775 |  * filter01 = 连接结构，两个一排
 1776 |  */
 1777 | function getProductFilterGroupLayout(
 1778 |   productTypeId: string,
 1779 |   filterKey: SelectionFilterKey
 1780 | ): ProductSelectionFilterGroup["layout"] | undefined {
 1781 |   if (productTypeId !== "thread-to-barbed-fittings") {
 1782 |     return undefined;
 1783 |   }
 1784 | 
 1785 |   if (filterKey === "filter02") {
 1786 |     return "one";
 1787 |   }
 1788 | 
 1789 |   if (filterKey === "filter01") {
 1790 |     return "two";
 1791 |   }
 1792 | 
 1793 |   return undefined;
 1794 | }
 1795 | export default function ProductSelectionClient({
 1796 |   locale = "zh",
 1797 |   initialCategoryId,
 1798 |   initialProductTypeId,
 1799 |   initialFilters,
 1800 | }: ProductSelectionClientProps) {
 1801 |   const router = useRouter();
 1802 |   const searchParams = useSearchParams();
 1803 |   const requestedCategoryId = searchParams.get("category");
 1804 |   const requestedProductTypeId = searchParams.get("productType");
 1805 | 
 1806 |   const pageText =
 1807 |     PRODUCT_SELECTION_PAGE_TEXT[locale] || PRODUCT_SELECTION_PAGE_TEXT.zh;
 1808 | 
 1809 |   const categoryItems = useMemo(() => getCategoryItems(locale), [locale]);
 1810 | 
 1811 |   const [activeCategoryId, setActiveCategoryId] = useState(() => {
 1812 |     return initialCategoryId || categoryItems[0]?.id || "pumps";
 1813 |   });
 1814 | 
 1815 |   const [activeProductTypeId, setActiveProductTypeId] = useState(() => {
 1816 |     const initialActiveCategoryId =
 1817 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1818 | 
 1819 |     return initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1820 |   });
 1821 | 
 1822 |   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterMap>(
 1823 |     () => {
 1824 |       const initialActiveCategoryId =
 1825 |         initialCategoryId || categoryItems[0]?.id || "pumps";
 1826 |       const initialActiveProductTypeId =
 1827 |         initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1828 | 
 1829 |       return getInitialSelectedFilters(
 1830 |         initialActiveCategoryId,
 1831 |         initialActiveProductTypeId,
 1832 |         initialFilters
 1833 |       );
 1834 |     }
 1835 |   );
 1836 |   const {
 1837 |     items: selectionCartItems,
 1838 |     addItem,
 1839 |     removeItem,
...
 1853 |     Record<string, boolean>
 1854 |   >(() => {
 1855 |     const initialActiveCategoryId =
 1856 |       initialCategoryId || categoryItems[0]?.id || "pumps";
 1857 |     const initialActiveProductTypeId =
 1858 |       initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);
 1859 | 
 1860 |     return getDefaultMobileOpenFilterGroups(initialActiveProductTypeId);
 1861 |   });
 1862 |   const [currentProductPage, setCurrentProductPage] = useState(1);
 1863 |   const [productsPageSize, setProductsPageSize] = useState(12);
 1864 | 
 1865 |   const activeCategory = useMemo(() => {
 1866 |     return (
 1867 |       categoryItems.find((category) => category.id === activeCategoryId) ||
 1868 |       categoryItems[0] ||
...
 1882 |      * 1. 先读取已有产品数据中的产品类型
 1883 |      * 2. 这部分用于已经有产品卡片的数据，例如 EA 柱塞泵
 1884 |      */
 1885 |     categoryProducts.forEach((product) => {
 1886 |       if (!product.productTypeId) return;
 1887 | 
 1888 |       if (!optionMap.has(product.productTypeId)) {
 1889 |         optionMap.set(product.productTypeId, {
 1890 |           value: product.productTypeId,
 1891 |           label: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 1892 |         });
 1893 |       }
 1894 |     });
 1895 | 
 1896 |     /*
 1897 |      * 说明：
 1898 |      * 1. 再从 product-route-map.ts 补充正式产品类型入口
 1899 |      * 2. 这样即使隔膜泵 / 移液泵 / 注射泵 / 无阀泵 / 高压泵暂时没有产品数据
...
 1911 |     return Array.from(optionMap.values());
 1912 |   }, [activeCategoryId, categoryProducts, locale]);
 1913 | 
 1914 |   const currentTypeProducts = useMemo(() => {
 1915 |     if (!activeProductTypeId) {
 1916 |       return categoryProducts;
 1917 |     }
 1918 | 
 1919 |     return categoryProducts.filter((product) => {
 1920 |       return product.productTypeId === activeProductTypeId;
 1921 |     });
 1922 |   }, [activeProductTypeId, categoryProducts]);
 1923 | 
 1924 |   const activeFilterLabels = useMemo(() => {
 1925 |     return getVisibleFilterLabels(activeProductTypeId);
 1926 |   }, [activeProductTypeId]);
 1927 | 
 1928 |   const filterGroups = useMemo<ProductSelectionFilterGroup[]>(() => {
 1929 |     const groups: ProductSelectionFilterGroup[] = [];
 1930 | 
 1931 |     if (productTypeOptions.length > 0) {
 1932 |       groups.push({
 1933 |         key: "productType",
 1934 |         title:
...
 1945 |         currentTypeProducts as any,
 1946 | 
 1947 |         (label as any).filterKey,
 1948 |         selectedFilters,
 1949 |         activeProductTypeId
 1950 |       );
 1951 | 
 1952 |       if (options.length === 0) return;
 1953 | 
 1954 |       groups.push({
 1955 |         key: (label as any).filterKey,
 1956 |         title: getText(locale, label.label, (label as any).filterKey),
 1957 |         inputType: label.inputType,
 1958 |         layout: getProductFilterGroupLayout(
 1959 |           activeProductTypeId,
 1960 |           (label as any).filterKey as SelectionFilterKey
 1961 |         ),
 1962 |         options: sortHardTubeFilterOptionsForDisplay(
 1963 |           activeProductTypeId,
 1964 |           (label as any).filterKey,
 1965 |           options.map((option) => ({
 1966 |             ...option,
 1967 |             label: getLocalizedFilterOptionLabel(
 1968 |               option.label || option.value,
 1969 |               locale
 1970 |             ),
 1971 |           }))
...
 1973 |       });
 1974 |     });
 1975 | 
 1976 |     return groups;
 1977 |   }, [activeCategoryId, activeFilterLabels, activeProductTypeId, currentTypeProducts, locale, productTypeOptions, selectedFilters]);
 1978 | 
 1979 |   const matchedProducts = useMemo(() => {
 1980 |     const keyword = searchKeyword.trim().toLowerCase();
 1981 | 
 1982 |     return categoryProducts.filter((product) => {
 1983 |       if (activeProductTypeId && product.productTypeId !== activeProductTypeId) {
 1984 |         return false;
 1985 |       }
 1986 | 
 1987 |       const filterMatched = FILTER_KEYS.every((filterKey) => {
 1988 |         const selectedValues = selectedFilters[filterKey];
 1989 | 
 1990 |         if (!selectedValues || selectedValues.size === 0) {
 1991 |           return true;
...
 2009 | 
 2010 |       const searchText = [
 2011 |         product.productId,
 2012 |         product.categoryId,
 2013 |         product.productTypeId,
 2014 |         product.seriesId,
 2015 |         product.detailSlug,
 2016 |         ((product.cardTitle as any)?.zh || ""),
 2017 |         ((product.cardTitle as any)?.en || ""),
 2018 |         ((product.cardSubtitle as any)?.zh || ""),
 2019 |         ((product.cardSubtitle as any)?.en || ""),
 2020 |         ((product.searchKeywords as any)?.zh || ""),
 2021 |         ((product.searchKeywords as any)?.en || ""),
...
 2026 |         .toLowerCase();
 2027 | 
 2028 |       return searchText.includes(keyword);
 2029 |     });
 2030 |   }, [activeProductTypeId, categoryProducts, searchKeyword, selectedFilters]);
 2031 | 
 2032 |   /*
 2033 |    * 当前产品种类介绍数据
 2034 |    * 说明：
 2035 |    * 1. 根据当前产品大类和产品类型匹配介绍内容
 2036 |    * 2. 例如 pumps + plunger-pump 会显示柱塞泵系列介绍
 2037 |    * 3. 找不到时不显示横幅
 2038 |    */
 2039 |   const activeProductTypeIntro = getProductTypeIntroByIds(
 2040 |     activeCategoryId,
 2041 |     activeProductTypeId
 2042 |   );
 2043 |   const selectedTagItems = useMemo<ProductSelectionSelectedTag[]>(() => {
 2044 |     const tags: ProductSelectionSelectedTag[] = [];
 2045 | 
 2046 |     if (activeProductTypeId) {
 2047 |       tags.push({
 2048 |         key: "productType",
 2049 |         value: activeProductTypeId,
 2050 |         label:
 2051 |           productTypeOptions.find(
 2052 |             (option) => option.value === activeProductTypeId
 2053 |           )?.label ||
 2054 |           getTaxonomyLabel(locale, activeProductTypeId),
 2055 |       });
 2056 |     }
 2057 | 
 2058 |     FILTER_KEYS.forEach((filterKey) => {
 2059 |       const values = selectedFilters[filterKey];
 2060 | 
 2061 |       if (!values || values.size === 0) return;
 2062 | 
...
 2069 |       });
 2070 |     });
 2071 | 
 2072 |     return tags;
 2073 |   }, [activeProductTypeId, locale, productTypeOptions, selectedFilters]);
 2074 | 
 2075 |   const totalProductPages = Math.max(
 2076 |     1,
 2077 |     Math.ceil(matchedProducts.length / productsPageSize)
 2078 |   );
 2079 | 
 2080 |   const safeCurrentProductPage = Math.min(
 2081 |     currentProductPage,
...
 2111 |         ? preferredCategoryId
 2112 |         : fallbackCategoryId;
 2113 | 
 2114 |     const categoryProductsForUrl = getProductsByCategory(nextCategoryId);
 2115 |     const preferredProductTypeId =
 2116 |       requestedProductTypeId || initialProductTypeId;
 2117 | 
 2118 |     const productTypeExistsInProducts = Boolean(
 2119 |       preferredProductTypeId &&
 2120 |         categoryProductsForUrl.some(
 2121 |           (product) => product.productTypeId === preferredProductTypeId
 2122 |         )
 2123 |     );
 2124 | 
 2125 |     const productTypeExistsInRouteMap = Boolean(
 2126 |       preferredProductTypeId &&
 2127 |         hasProductTypeRouteByIds(nextCategoryId, preferredProductTypeId)
 2128 |     );
 2129 | 
 2130 |     const nextProductTypeId =
 2131 |       preferredProductTypeId &&
 2132 |       (productTypeExistsInProducts || productTypeExistsInRouteMap)
 2133 |         ? preferredProductTypeId
 2134 |         : getFirstProductTypeId(nextCategoryId);
 2135 | 
 2136 |     const hasQuerySelection = Boolean(requestedCategoryId || requestedProductTypeId);
 2137 | 
 2138 |     setActiveCategoryId(nextCategoryId);
 2139 |     setActiveProductTypeId(nextProductTypeId);
 2140 |     setSelectedFilters(
 2141 |       hasQuerySelection
 2142 |         ? getDefaultSelectedFilters(nextCategoryId, nextProductTypeId)
 2143 |         : getInitialSelectedFilters(
 2144 |             nextCategoryId,
 2145 |             nextProductTypeId,
 2146 |             initialFilters
 2147 |           )
 2148 |     );
 2149 |     setSearchKeyword("");
 2150 |     setMobileCategoryOpen(false);
 2151 |     setMobileOpenFilterGroups(
 2152 |       getDefaultMobileOpenFilterGroups(nextProductTypeId)
 2153 |     );
 2154 |   }, [
 2155 |     categoryItems,
 2156 |     requestedCategoryId,
 2157 |     requestedProductTypeId,
 2158 |     initialCategoryId,
 2159 |     initialProductTypeId,
 2160 |     initialFilters,
 2161 |   ]);
 2162 | 
 2163 |   useEffect(() => {
 2164 |     setCurrentProductPage(1);
 2165 |   }, [
 2166 |     activeCategoryId,
 2167 |     activeProductTypeId,
 2168 |     selectedFilters,
 2169 |     searchKeyword,
 2170 |     productsPageSize,
 2171 |   ]);
 2172 |   /*
 2173 |    * 筛选项联动后的自动清理：
 2174 |    * 1. 当用户切换产品系列后，量程 / 材质可能不再属于当前系列
 2175 |    * 2. 这里根据当前可见 filterGroups 自动移除无效筛选值
...
 2230 |     });
 2231 |   }, [filterGroups]);
 2232 | 
 2233 |   function handleCategoryChange(categoryId: string) {
 2234 |     const firstProductTypeId = getFirstProductTypeId(categoryId);
 2235 | 
 2236 |     setActiveCategoryId(categoryId);
 2237 |     setActiveProductTypeId(firstProductTypeId);
 2238 |     setSelectedFilters(getDefaultSelectedFilters(categoryId, firstProductTypeId));
 2239 |     setSearchKeyword("");
 2240 |     setMobileCategoryOpen(false);
 2241 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2242 |   }
 2243 | 
 2244 |   function toggleMobileFilterGroup(key: ProductSelectionFilterGroup["key"]) {
 2245 |     setMobileOpenFilterGroups((current) => ({
 2246 |       ...current,
 2247 |       [key]: !current[key],
 2248 |     }));
 2249 |   }
 2250 | 
 2251 |   function handleProductTypeChange(productTypeId: string) {
 2252 |     /*
 2253 |      * 说明：
 2254 |      * 1. 点击产品类型时，优先跳转正式 URL
 2255 |      * 2. 柱塞泵会跳到 /products/pumps/plunger-pumps/
 2256 |      * 3. 没配置正式 URL 的类型，才走原来的前端筛选逻辑
 2257 |      */
 2258 |     const productTypeHref = getProductTypeHrefByIds(
 2259 |       activeCategoryId,
 2260 |       productTypeId
 2261 |     );
 2262 | 
 2263 |     if (productTypeHref) {
 2264 |       router.push(productTypeHref);
 2265 |       return;
 2266 |     }
 2267 | 
 2268 |     setActiveProductTypeId(productTypeId);
 2269 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, productTypeId));
 2270 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(productTypeId));
 2271 |   }
 2272 | 
 2273 |   function handleFilterChange(
 2274 |     group: ProductSelectionFilterGroup,
 2275 |     value: string
 2276 |   ) {
 2277 |     /*
 2278 |      * 说明：
...
 2302 |      * 3. 命中后不 router.push，而是原地切换状态并同步地址栏
 2303 |      */
 2304 |     const seriesHref = getSeriesHrefByFilterValue(
 2305 |       activeCategoryId,
 2306 |       activeProductTypeId,
 2307 |       group.key,
 2308 |       value
 2309 |     );
 2310 | 
 2311 |     if (seriesHref) {
 2312 |       const isAlreadySelected = selectedFilters[filterKey]?.has(value) || false;
 2313 |       const productTypeHref = getProductTypeHrefByIds(
 2314 |         activeCategoryId,
 2315 |         activeProductTypeId
 2316 |       );
 2317 | 
 2318 |       setSelectedFilters((current) => {
 2319 |         const next: SelectedFilterMap = {
 2320 |           ...current,
 2321 |         };
 2322 | 
 2323 |         /*
...
 2401 | ) {
 2402 | 
 2403 |   if (
 2404 | 
 2405 |     activeProductTypeId !==
 2406 | 
 2407 |     "barbed-fittings"
 2408 | 
 2409 |   ) {
 2410 | 
 2411 |     return false;
 2412 | 
 2413 |   }
...
 2483 |   > = {
 2484 | 
 2485 |     filter02: [
 2486 | 
 2487 |       "filter01",
 2488 | 
 2489 |       "filter05",
 2490 | 
 2491 |       "filter06",
 2492 | 
 2493 |     ],
 2494 | 
 2495 | 
 2496 |     filter03: [
 2497 | 
 2498 |       "filter01",
 2499 | 
 2500 |       "filter02",
 2501 | 
 2502 |       "filter05",
 2503 | 
 2504 |       "filter06",
 2505 | 
 2506 |     ],
 2507 | 
 2508 | 
 2509 |     filter04: [
 2510 | 
 2511 |       "filter01",
 2512 | 
 2513 |       "filter02",
 2514 | 
 2515 |       "filter03",
 2516 | 
 2517 |       "filter05",
 2518 | 
 2519 |       "filter06",
...
 2647 |  * 1. 选择接管内径后，不兼容的螺纹变灰；
 2648 |  * 2. 选择螺纹后，不兼容的接管内径变灰；
 2649 |  * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 2650 |  * 4. 已选中的选项保留取消能力，不设置为禁用；
 2651 |  * 5. 只影响 thread-to-barbed-fittings。
 2652 |  */
 2653 | function isProductFilterOptionDisabled(
 2654 |   group: ProductSelectionFilterGroup,
 2655 |   value: string
 2656 | ) {
 2657 |   /*
 2658 |    * 保留原倒刺接头三端口禁用逻辑。
 2659 |    */
...
 2666 |     return true;
 2667 |   }
 2668 | 
 2669 |   if (
 2670 |     activeProductTypeId !==
 2671 |     "thread-to-barbed-fittings"
 2672 |   ) {
 2673 |     return false;
 2674 |   }
 2675 | 
 2676 |   if (
 2677 |     !FILTER_KEYS.includes(
 2678 |       group.key as SelectionFilterKey
 2679 |     )
...
 2772 |     /*
 2773 |      * 说明：
 2774 |      * 1. 这个函数用于告诉筛选面板：当前选项是否处于选中状态
 2775 |      * 2. productType 是产品类型，例如“柱塞泵”
 2776 |      * 3. filter01 / filter02 / filter03 是普通筛选项，例如产品系列、量程、材质
 2777 |      * 4. 这里必须先判断 FILTER_KEYS，避免 TypeScript 认为 string 不能索引 selectedFilters
 2778 |      */
 2779 |     if (group.key === "productType") {
 2780 |       return activeProductTypeId === value;
 2781 |     }
 2782 | 
 2783 |     if (!FILTER_KEYS.includes(group.key as SelectionFilterKey)) {
 2784 |       return false;
 2785 |     }
 2786 | 
 2787 |     const filterKey = group.key as SelectionFilterKey;
 2788 | 
...
 2795 |     /*
 2796 |      * 说明：
 2797 |      * 1. 这个函数用于移除顶部“已选筛选标签”
 2798 |      * 2. productType 是产品类型，例如“柱塞泵”
 2799 |      * 3. filter01 是产品系列，例如 EA / SM / TM
 2800 |      * 4. 在三级系列页清除 EA / SM / TM 时，应回到二级柱塞泵页面
 2801 |      */
 2802 | 
 2803 |     if (key === "productType") {
 2804 |       setActiveProductTypeId("");
 2805 |       setSelectedFilters({});
 2806 |       return;
 2807 |     }
 2808 | 
 2809 |     /*
 2810 |      * 说明：
 2811 |      * 1. 判断当前清除的标签是否命中正式系列路由
 2812 |      * 2. 例如 EA 常规柱塞泵命中：
...
 2815 |      *    /products/pumps/plunger-pumps/
 2816 |      */
 2817 |     const seriesHref = getSeriesHrefByFilterValue(
 2818 |       activeCategoryId,
 2819 |       activeProductTypeId,
 2820 |       key,
 2821 |       value
 2822 |     );
 2823 | 
 2824 |     if (seriesHref) {
 2825 |       const productTypeHref = getProductTypeHrefByIds(
 2826 |         activeCategoryId,
 2827 |         activeProductTypeId
 2828 |       );
 2829 | 
 2830 |       if (productTypeHref) {
 2831 |         router.push(productTypeHref);
 2832 |         return;
 2833 |       }
 2834 |     }
 2835 | 
...
 2862 |       return next;
 2863 |     });
 2864 |   }
 2865 |   function resetCurrentFilters() {
 2866 |     const firstProductTypeId = getFirstProductTypeId(activeCategoryId);
 2867 | 
 2868 |     setActiveProductTypeId(firstProductTypeId);
 2869 |     setSelectedFilters(getDefaultSelectedFilters(activeCategoryId, firstProductTypeId));
 2870 |     setSearchKeyword("");
 2871 |     setMobileOpenFilterGroups(getDefaultMobileOpenFilterGroups(firstProductTypeId));
 2872 |   }
 2873 |   function createProductCartItem(
 2874 |     product: ProductSelectionProduct
 2875 |   ): SelectionCartItemInput {
 2876 |     const title = getText(locale, product.cardTitle, product.productId);
 2877 | 
 2878 |     return {
 2879 |       sourceType: "pump-selection",
 2880 |       sourceLabel: "产品中心",
 2881 |       productName: getTaxonomyLabel(locale, String(product.productTypeId || "")),
 2882 |       productCode: product.productId,
 2883 |       foreachModel: title,
 2884 |       competitorModels: [],
 2885 |       quantity: 1,
 2886 |       needDrawing: false,
 2887 |       imagePath:
 2888 |       product.imageCard ||
 2889 |       (() => {
...
 2971 | 
 2972 |             {activeProductTypeIntro ? (
 2973 |               <section
 2974 |                 className="product-type-intro-module"
 2975 |                 data-product-type-id={activeProductTypeId || ""}
 2976 |                 aria-label={locale === "zh" ? `${activeProductTypeIntro.title}产品种类说明` : `${activeProductTypeIntro.title} product type overview`}
 2977 |               >
 2978 |                 <div className="product-type-intro-image">
 2979 |                   <img
 2980 |                     src={activeProductTypeIntro.image.src}
 2981 |                     alt={activeProductTypeIntro.image.alt}
 2982 |                     loading="lazy"
 2983 |                   />
...
 3015 |                   typeof activeCategory.description === "string"
 3016 |                     ? activeCategory.description
 3017 |                     : getText(locale, activeCategory.description as any, ""),
 3018 |               }}
 3019 |               activeProductTypeId={activeProductTypeId}
 3020 |               filterGroups={filterGroups}
 3021 |               mobileOpenFilterGroups={mobileOpenFilterGroups}
 3022 |               onToggleMobileGroup={toggleMobileFilterGroup}
 3023 |               isOptionActive={isFilterOptionActive}
 3024 |               isOptionDisabled={isProductFilterOptionDisabled}
 3025 |               onFilterChange={handleFilterChange}
 3026 |               emptyText={pageText.filterEmpty}
 3027 |             />
```

## components/products/selection/ProductFilterPanel.tsx

- 文件大小：14340 bytes
- 总行数：534

```ts
    8 | } from "./product-selection-ui.types";
    9 | 
   10 | type ProductFilterPanelProps = {
   11 |   activeCategory: ProductSelectionCategoryItem;
   12 |   activeProductTypeId?: string;
   13 |   filterGroups: ProductSelectionFilterGroup[];
   14 |   mobileOpenFilterGroups?: Record<string, boolean>;
   15 |   emptyText: string;
   16 |   resetButtonText?: string;
   17 |   submitButtonText?: string;
   18 |   onToggleMobileGroup?: (
   19 |     key: ProductSelectionFilterGroup["key"]
   20 |   ) => void;
...
  104 | }) {
  105 |   const structureGroup =
  106 |     filterGroups.find(
  107 |       (group) =>
  108 |         group.key === "filter01"
  109 |     );
  110 | 
  111 |   const activeStructure =
  112 |     structureGroup?.options.find(
  113 |       (option) =>
  114 |         isOptionActive(
  115 |           structureGroup,
  116 |           option.value
...
  241 | 
  242 | 
  243 | export default function ProductFilterPanel({
  244 |   activeCategory,
  245 |   activeProductTypeId,
  246 |   filterGroups,
  247 |   emptyText,
  248 |   isOptionActive,
  249 |   isOptionDisabled,
  250 |   onFilterChange,
  251 | }: ProductFilterPanelProps) {
  252 |   /*
  253 |    * 只有接头系列中的第一个“产品种类”允许折叠。
...
  266 | 
  267 |   return (
  268 |     <aside
  269 |       className="filter-panel"
  270 |       data-product-type-id={activeProductTypeId || ""}>
  271 |       <div className="filter-panel-head">
  272 |         <h2>{activeCategory.label}</h2>
  273 |         <p>{activeCategory.description}</p>
  274 |       </div>
  275 | 
  276 |       {filterGroups.length > 0 ? (
  277 |         filterGroups.map((group) => {
  278 |           if (
  279 |             activeProductTypeId === "barbed-fittings" &&
  280 |             group.key === "filter02"
  281 |           ) {
  282 |             return (
  283 |               <div
  284 |                 data-barbed-filter-group="ports"
  285 |                 key="barbed-port-filter-group"
  286 |               >
  287 |                 <BarbedPortFilterGroup
...
  294 |             );
  295 |           }
  296 | 
  297 |           if (
  298 |             activeProductTypeId === "barbed-fittings" &&
  299 |             (
  300 |               group.key === "filter03" ||
  301 |               group.key === "filter04"
  302 |             )
  303 |           ) {
  304 |             return null;
  305 |           }
  306 | 
...
  316 |             isProductTypeGroup;
  317 | 
  318 |           const isSingleSelectGroup =
  319 |             group.key === "productType" ||
  320 |             group.key === "filter01";
  321 | 
  322 |           const activeOption = group.options.find(
  323 |             (option) =>
  324 |               isOptionActive(group, option.value)
  325 |           );
  326 | 
  327 |           const optionTypeClass = isSingleSelectGroup
  328 |             ? "is-single"
...
  347 |             "密封圈材质",
  348 |             "Seal Material",
  349 |           ];
  350 | 
  351 |           const isThreadToBarbed =
  352 |             activeProductTypeId ===
  353 |             "thread-to-barbed-fittings";
  354 | 
  355 |           const shouldUseTwoColumns =
  356 |             isThreadToBarbed &&
  357 |             group.key === "filter02"
  358 |               ? false
  359 |               : isThreadToBarbed &&
  360 |                   group.key === "filter01"
  361 |                 ? true
  362 |                 : group.key === "productType" ||
  363 |                   group.key === "filter02" ||
  364 |                   group.key === "filter03" ||
  365 |                   quickConnectTwoColumnTitles.includes(
  366 |                     group.title
  367 |                   ) ||
  368 |                   group.options.length > 4;
```

## data/products/selection/luer-fitting-selection.generated.ts

- 文件大小：145665 bytes
- 总行数：4511

```ts
    1 | /*
    2 |  * 自动生成：鲁尔接头选型数据
    3 |  *
    4 |  * 数据源：
    5 |  * F:\\WebsiteProjects\\foreach-website-2026\\data-source\\product-center\\fittings\\FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx
    6 |  * 工作表：
    7 |  * 03_鲁尔接头
    8 |  *
    9 |  * 请勿手工修改。
   10 |  */
   11 | 
   12 | import type {
   13 |   ProductSelectionFilterLabel,
   14 |   ProductSelectionProduct,
   15 |   ProductSelectionTaxonomyItem,
   16 | } from "./product-selection.types";
   17 | 
   18 | export const luerFittingSelectionProducts:
   19 |   ProductSelectionProduct[] =
   20 | [
   21 |   {
   22 |     "productId": "809558",
   23 |     "categoryId": "fittings",
   24 |     "productTypeId": "luer-fittings",
   25 |     "seriesId": "lsl",
   26 |     "cardTitle": {
   27 |       "zh": "固定公鲁尔芯子",
   28 |       "en": "固定公鲁尔芯子"
   29 |     },
   30 |     "cardSubtitle": {
   31 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
   32 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
   33 |     },
   34 |     "filters": {
   35 |       "filter01": "公鲁尔芯子",
   36 |       "filter02": "LSL 固定芯子",
   37 |       "filter03": "1.6 mm",
   38 |       "filter05": "PP",
   39 |       "filter06": "本色"
   40 |     },
   41 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-16-PP-N.jpg",
   42 |     "detailSlug": "lsl-16-pp-n",
   43 |     "status": "active",
   44 |     "sortOrder": 1,
   45 |     "searchKeywords": {
   46 |       "zh": "公鲁尔芯子 固定 LSL-16-PP-N LSL-16-PP-N 809558 443-02-00142 公鲁尔芯子 LSL 固定公鲁尔芯子 1.6 mm PP 本色",
   47 |       "en": "LSL-16-PP-N 809558 443-02-00142 LSL 1.6 mm PP"
   48 |     }
   49 |   },
   50 |   {
   51 |     "productId": "809705",
   52 |     "categoryId": "fittings",
   53 |     "productTypeId": "luer-fittings",
   54 |     "seriesId": "lsl",
   55 |     "cardTitle": {
   56 |       "zh": "固定公鲁尔芯子",
   57 |       "en": "固定公鲁尔芯子"
   58 |     },
   59 |     "cardSubtitle": {
   60 |       "zh": "适配1.6 mm内径软管\nPA材质｜白色",
   61 |       "en": "适配1.6 mm内径软管\nPA材质｜白色"
   62 |     },
   63 |     "filters": {
   64 |       "filter01": "公鲁尔芯子",
   65 |       "filter02": "LSL 固定芯子",
   66 |       "filter03": "1.6 mm",
   67 |       "filter05": "PA",
   68 |       "filter06": "白色"
   69 |     },
   70 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-16-PA-W.jpg",
   71 |     "detailSlug": "lsl-16-pa-w",
   72 |     "status": "active",
   73 |     "sortOrder": 2,
   74 |     "searchKeywords": {
   75 |       "zh": "公鲁尔芯子 固定 LSL-16-PA-W LSL-16-PA-W 809705 443-02-00262 公鲁尔芯子 LSL 固定公鲁尔芯子 1.6 mm PA 白色",
   76 |       "en": "LSL-16-PA-W 809705 443-02-00262 LSL 1.6 mm PA"
   77 |     }
   78 |   },
   79 |   {
   80 |     "productId": "809560",
   81 |     "categoryId": "fittings",
   82 |     "productTypeId": "luer-fittings",
   83 |     "seriesId": "lsl",
   84 |     "cardTitle": {
   85 |       "zh": "固定公鲁尔芯子",
   86 |       "en": "固定公鲁尔芯子"
   87 |     },
   88 |     "cardSubtitle": {
   89 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
   90 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
   91 |     },
   92 |     "filters": {
   93 |       "filter01": "公鲁尔芯子",
   94 |       "filter02": "LSL 固定芯子",
   95 |       "filter03": "2.4 mm",
   96 |       "filter05": "PP",
   97 |       "filter06": "本色"
   98 |     },
   99 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-24-PP-N.jpg",
  100 |     "detailSlug": "lsl-24-pp-n",
  101 |     "status": "active",
  102 |     "sortOrder": 3,
  103 |     "searchKeywords": {
  104 |       "zh": "公鲁尔芯子 固定 LSL-24-PP-N LSL-24-PP-N 809560 443-02-00144 公鲁尔芯子 LSL 固定公鲁尔芯子 2.4 mm PP 本色",
  105 |       "en": "LSL-24-PP-N 809560 443-02-00144 LSL 2.4 mm PP"
  106 |     }
  107 |   },
  108 |   {
  109 |     "productId": "809707",
  110 |     "categoryId": "fittings",
  111 |     "productTypeId": "luer-fittings",
  112 |     "seriesId": "lsl",
  113 |     "cardTitle": {
  114 |       "zh": "固定公鲁尔芯子",
  115 |       "en": "固定公鲁尔芯子"
  116 |     },
  117 |     "cardSubtitle": {
  118 |       "zh": "适配2.4 mm内径软管\nPA材质｜白色",
  119 |       "en": "适配2.4 mm内径软管\nPA材质｜白色"
  120 |     },
  121 |     "filters": {
  122 |       "filter01": "公鲁尔芯子",
  123 |       "filter02": "LSL 固定芯子",
  124 |       "filter03": "2.4 mm",
  125 |       "filter05": "PA",
  126 |       "filter06": "白色"
  127 |     },
  128 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-24-PA-W.jpg",
  129 |     "detailSlug": "lsl-24-pa-w",
  130 |     "status": "active",
  131 |     "sortOrder": 4,
  132 |     "searchKeywords": {
  133 |       "zh": "公鲁尔芯子 固定 LSL-24-PA-W LSL-24-PA-W 809707 443-02-00264 公鲁尔芯子 LSL 固定公鲁尔芯子 2.4 mm PA 白色",
  134 |       "en": "LSL-24-PA-W 809707 443-02-00264 LSL 2.4 mm PA"
  135 |     }
  136 |   },
  137 |   {
  138 |     "productId": "809562",
  139 |     "categoryId": "fittings",
  140 |     "productTypeId": "luer-fittings",
  141 |     "seriesId": "lsl",
  142 |     "cardTitle": {
  143 |       "zh": "固定公鲁尔芯子",
  144 |       "en": "固定公鲁尔芯子"
  145 |     },
  146 |     "cardSubtitle": {
  147 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
  148 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
  149 |     },
  150 |     "filters": {
  151 |       "filter01": "公鲁尔芯子",
  152 |       "filter02": "LSL 固定芯子",
  153 |       "filter03": "3.2 mm",
  154 |       "filter05": "PP",
  155 |       "filter06": "本色"
  156 |     },
  157 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-32-PP-N.jpg",
  158 |     "detailSlug": "lsl-32-pp-n",
  159 |     "status": "active",
  160 |     "sortOrder": 5,
  161 |     "searchKeywords": {
  162 |       "zh": "公鲁尔芯子 固定 LSL-32-PP-N LSL-32-PP-N 809562 443-02-00146 公鲁尔芯子 LSL 固定公鲁尔芯子 3.2 mm PP 本色",
  163 |       "en": "LSL-32-PP-N 809562 443-02-00146 LSL 3.2 mm PP"
  164 |     }
  165 |   },
  166 |   {
  167 |     "productId": "809709",
  168 |     "categoryId": "fittings",
  169 |     "productTypeId": "luer-fittings",
  170 |     "seriesId": "lsl",
  171 |     "cardTitle": {
  172 |       "zh": "固定公鲁尔芯子",
  173 |       "en": "固定公鲁尔芯子"
  174 |     },
  175 |     "cardSubtitle": {
  176 |       "zh": "适配3.2 mm内径软管\nPA材质｜白色",
  177 |       "en": "适配3.2 mm内径软管\nPA材质｜白色"
  178 |     },
  179 |     "filters": {
  180 |       "filter01": "公鲁尔芯子",
  181 |       "filter02": "LSL 固定芯子",
  182 |       "filter03": "3.2 mm",
  183 |       "filter05": "PA",
  184 |       "filter06": "白色"
  185 |     },
  186 |     "imageCard": "/images/products/fittings/luer-fittings/products/LSL-32-PA-W.jpg",
  187 |     "detailSlug": "lsl-32-pa-w",
  188 |     "status": "active",
  189 |     "sortOrder": 6,
  190 |     "searchKeywords": {
  191 |       "zh": "公鲁尔芯子 固定 LSL-32-PA-W LSL-32-PA-W 809709 443-02-00266 公鲁尔芯子 LSL 固定公鲁尔芯子 3.2 mm PA 白色",
  192 |       "en": "LSL-32-PA-W 809709 443-02-00266 LSL 3.2 mm PA"
  193 |     }
  194 |   },
  195 |   {
  196 |     "productId": "809559",
  197 |     "categoryId": "fittings",
  198 |     "productTypeId": "luer-fittings",
  199 |     "seriesId": "lrl",
  200 |     "cardTitle": {
  201 |       "zh": "旋转公鲁尔芯子",
  202 |       "en": "旋转公鲁尔芯子"
  203 |     },
  204 |     "cardSubtitle": {
  205 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
  206 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
  207 |     },
  208 |     "filters": {
  209 |       "filter01": "公鲁尔芯子",
  210 |       "filter02": "LRL 旋转芯子",
  211 |       "filter03": "1.6 mm",
  212 |       "filter05": "PP",
  213 |       "filter06": "本色"
  214 |     },
  215 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-16-PP-N.jpg",
  216 |     "detailSlug": "lrl-16-pp-n",
  217 |     "status": "active",
  218 |     "sortOrder": 7,
  219 |     "searchKeywords": {
  220 |       "zh": "公鲁尔芯子 旋转 LRL-16-PP-N LRL-16-PP-N 809559 443-02-00143 公鲁尔芯子 LRL 旋转公鲁尔芯子 1.6 mm PP 本色",
  221 |       "en": "LRL-16-PP-N 809559 443-02-00143 LRL 1.6 mm PP"
  222 |     }
  223 |   },
  224 |   {
  225 |     "productId": "809706",
  226 |     "categoryId": "fittings",
  227 |     "productTypeId": "luer-fittings",
  228 |     "seriesId": "lrl",
  229 |     "cardTitle": {
  230 |       "zh": "旋转公鲁尔芯子",
  231 |       "en": "旋转公鲁尔芯子"
  232 |     },
  233 |     "cardSubtitle": {
  234 |       "zh": "适配1.6 mm内径软管\nPA材质｜白色",
  235 |       "en": "适配1.6 mm内径软管\nPA材质｜白色"
  236 |     },
  237 |     "filters": {
  238 |       "filter01": "公鲁尔芯子",
  239 |       "filter02": "LRL 旋转芯子",
  240 |       "filter03": "1.6 mm",
  241 |       "filter05": "PA",
  242 |       "filter06": "白色"
  243 |     },
  244 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-16-PA-W.jpg",
  245 |     "detailSlug": "lrl-16-pa-w",
  246 |     "status": "active",
  247 |     "sortOrder": 8,
  248 |     "searchKeywords": {
  249 |       "zh": "公鲁尔芯子 旋转 LRL-16-PA-W LRL-16-PA-W 809706 443-02-00263 公鲁尔芯子 LRL 旋转公鲁尔芯子 1.6 mm PA 白色",
  250 |       "en": "LRL-16-PA-W 809706 443-02-00263 LRL 1.6 mm PA"
  251 |     }
  252 |   },
  253 |   {
  254 |     "productId": "809711",
  255 |     "categoryId": "fittings",
  256 |     "productTypeId": "luer-fittings",
  257 |     "seriesId": "lrl",
  258 |     "cardTitle": {
  259 |       "zh": "旋转公鲁尔芯子",
  260 |       "en": "旋转公鲁尔芯子"
  261 |     },
  262 |     "cardSubtitle": {
  263 |       "zh": "适配1.6 mm内径软管\nPVDF材质｜本色",
  264 |       "en": "适配1.6 mm内径软管\nPVDF材质｜本色"
  265 |     },
  266 |     "filters": {
  267 |       "filter01": "公鲁尔芯子",
  268 |       "filter02": "LRL 旋转芯子",
  269 |       "filter03": "1.6 mm",
  270 |       "filter05": "PVDF",
  271 |       "filter06": "本色"
  272 |     },
  273 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-16-PV-N.jpg",
  274 |     "detailSlug": "lrl-16-pv-n",
  275 |     "status": "active",
  276 |     "sortOrder": 9,
  277 |     "searchKeywords": {
  278 |       "zh": "公鲁尔芯子 旋转 LRL-16-PV-N LRL-16-PV-N 809711 443-02-00283 公鲁尔芯子 LRL 旋转公鲁尔芯子 1.6 mm PVDF 本色",
  279 |       "en": "LRL-16-PV-N 809711 443-02-00283 LRL 1.6 mm PVDF"
  280 |     }
  281 |   },
  282 |   {
  283 |     "productId": "809561",
  284 |     "categoryId": "fittings",
  285 |     "productTypeId": "luer-fittings",
  286 |     "seriesId": "lrl",
  287 |     "cardTitle": {
  288 |       "zh": "旋转公鲁尔芯子",
  289 |       "en": "旋转公鲁尔芯子"
  290 |     },
  291 |     "cardSubtitle": {
  292 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
  293 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
  294 |     },
  295 |     "filters": {
  296 |       "filter01": "公鲁尔芯子",
  297 |       "filter02": "LRL 旋转芯子",
  298 |       "filter03": "2.4 mm",
  299 |       "filter05": "PP",
  300 |       "filter06": "本色"
  301 |     },
  302 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-24-PP-N.jpg",
  303 |     "detailSlug": "lrl-24-pp-n",
  304 |     "status": "active",
  305 |     "sortOrder": 10,
  306 |     "searchKeywords": {
  307 |       "zh": "公鲁尔芯子 旋转 LRL-24-PP-N LRL-24-PP-N 809561 443-02-00145 公鲁尔芯子 LRL 旋转公鲁尔芯子 2.4 mm PP 本色",
  308 |       "en": "LRL-24-PP-N 809561 443-02-00145 LRL 2.4 mm PP"
  309 |     }
  310 |   },
  311 |   {
  312 |     "productId": "809708",
  313 |     "categoryId": "fittings",
  314 |     "productTypeId": "luer-fittings",
  315 |     "seriesId": "lrl",
  316 |     "cardTitle": {
  317 |       "zh": "旋转公鲁尔芯子",
  318 |       "en": "旋转公鲁尔芯子"
  319 |     },
  320 |     "cardSubtitle": {
  321 |       "zh": "适配2.4 mm内径软管\nPA材质｜白色",
  322 |       "en": "适配2.4 mm内径软管\nPA材质｜白色"
  323 |     },
  324 |     "filters": {
  325 |       "filter01": "公鲁尔芯子",
  326 |       "filter02": "LRL 旋转芯子",
  327 |       "filter03": "2.4 mm",
  328 |       "filter05": "PA",
  329 |       "filter06": "白色"
  330 |     },
  331 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-24-PA-W.jpg",
  332 |     "detailSlug": "lrl-24-pa-w",
  333 |     "status": "active",
  334 |     "sortOrder": 11,
  335 |     "searchKeywords": {
  336 |       "zh": "公鲁尔芯子 旋转 LRL-24-PA-W LRL-24-PA-W 809708 443-02-00265 公鲁尔芯子 LRL 旋转公鲁尔芯子 2.4 mm PA 白色",
  337 |       "en": "LRL-24-PA-W 809708 443-02-00265 LRL 2.4 mm PA"
  338 |     }
  339 |   },
  340 |   {
  341 |     "productId": "809712",
  342 |     "categoryId": "fittings",
  343 |     "productTypeId": "luer-fittings",
  344 |     "seriesId": "lrl",
  345 |     "cardTitle": {
  346 |       "zh": "旋转公鲁尔芯子",
  347 |       "en": "旋转公鲁尔芯子"
  348 |     },
  349 |     "cardSubtitle": {
  350 |       "zh": "适配2.4 mm内径软管\nPVDF材质｜本色",
  351 |       "en": "适配2.4 mm内径软管\nPVDF材质｜本色"
  352 |     },
  353 |     "filters": {
  354 |       "filter01": "公鲁尔芯子",
  355 |       "filter02": "LRL 旋转芯子",
  356 |       "filter03": "2.4 mm",
  357 |       "filter05": "PVDF",
  358 |       "filter06": "本色"
  359 |     },
  360 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-24-PV-N.jpg",
  361 |     "detailSlug": "lrl-24-pv-n",
  362 |     "status": "active",
  363 |     "sortOrder": 12,
  364 |     "searchKeywords": {
  365 |       "zh": "公鲁尔芯子 旋转 LRL-24-PV-N LRL-24-PV-N 809712 443-02-00284 公鲁尔芯子 LRL 旋转公鲁尔芯子 2.4 mm PVDF 本色",
  366 |       "en": "LRL-24-PV-N 809712 443-02-00284 LRL 2.4 mm PVDF"
  367 |     }
  368 |   },
  369 |   {
  370 |     "productId": "809563",
  371 |     "categoryId": "fittings",
  372 |     "productTypeId": "luer-fittings",
  373 |     "seriesId": "lrl",
  374 |     "cardTitle": {
  375 |       "zh": "旋转公鲁尔芯子",
  376 |       "en": "旋转公鲁尔芯子"
  377 |     },
  378 |     "cardSubtitle": {
  379 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
  380 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
  381 |     },
  382 |     "filters": {
  383 |       "filter01": "公鲁尔芯子",
  384 |       "filter02": "LRL 旋转芯子",
  385 |       "filter03": "3.2 mm",
  386 |       "filter05": "PP",
  387 |       "filter06": "本色"
  388 |     },
  389 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-32-PP-N.jpg",
  390 |     "detailSlug": "lrl-32-pp-n",
  391 |     "status": "active",
  392 |     "sortOrder": 13,
  393 |     "searchKeywords": {
  394 |       "zh": "公鲁尔芯子 旋转 LRL-32-PP-N LRL-32-PP-N 809563 443-02-00147 公鲁尔芯子 LRL 旋转公鲁尔芯子 3.2 mm PP 本色",
  395 |       "en": "LRL-32-PP-N 809563 443-02-00147 LRL 3.2 mm PP"
  396 |     }
  397 |   },
  398 |   {
  399 |     "productId": "809710",
  400 |     "categoryId": "fittings",
  401 |     "productTypeId": "luer-fittings",
  402 |     "seriesId": "lrl",
  403 |     "cardTitle": {
  404 |       "zh": "旋转公鲁尔芯子",
  405 |       "en": "旋转公鲁尔芯子"
  406 |     },
  407 |     "cardSubtitle": {
  408 |       "zh": "适配3.2 mm内径软管\nPA材质｜白色",
  409 |       "en": "适配3.2 mm内径软管\nPA材质｜白色"
  410 |     },
  411 |     "filters": {
  412 |       "filter01": "公鲁尔芯子",
  413 |       "filter02": "LRL 旋转芯子",
  414 |       "filter03": "3.2 mm",
  415 |       "filter05": "PA",
  416 |       "filter06": "白色"
  417 |     },
  418 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-32-PA-W.jpg",
  419 |     "detailSlug": "lrl-32-pa-w",
  420 |     "status": "active",
  421 |     "sortOrder": 14,
  422 |     "searchKeywords": {
  423 |       "zh": "公鲁尔芯子 旋转 LRL-32-PA-W LRL-32-PA-W 809710 443-02-00267 公鲁尔芯子 LRL 旋转公鲁尔芯子 3.2 mm PA 白色",
  424 |       "en": "LRL-32-PA-W 809710 443-02-00267 LRL 3.2 mm PA"
  425 |     }
  426 |   },
  427 |   {
  428 |     "productId": "809713",
  429 |     "categoryId": "fittings",
  430 |     "productTypeId": "luer-fittings",
  431 |     "seriesId": "lrl",
  432 |     "cardTitle": {
  433 |       "zh": "旋转公鲁尔芯子",
  434 |       "en": "旋转公鲁尔芯子"
  435 |     },
  436 |     "cardSubtitle": {
  437 |       "zh": "适配3.2 mm内径软管\nPVDF材质｜本色",
  438 |       "en": "适配3.2 mm内径软管\nPVDF材质｜本色"
  439 |     },
  440 |     "filters": {
  441 |       "filter01": "公鲁尔芯子",
  442 |       "filter02": "LRL 旋转芯子",
  443 |       "filter03": "3.2 mm",
  444 |       "filter05": "PVDF",
  445 |       "filter06": "本色"
  446 |     },
  447 |     "imageCard": "/images/products/fittings/luer-fittings/products/LRL-32-PV-N.jpg",
  448 |     "detailSlug": "lrl-32-pv-n",
  449 |     "status": "active",
  450 |     "sortOrder": 15,
  451 |     "searchKeywords": {
  452 |       "zh": "公鲁尔芯子 旋转 LRL-32-PV-N LRL-32-PV-N 809713 443-02-00285 公鲁尔芯子 LRL 旋转公鲁尔芯子 3.2 mm PVDF 本色",
  453 |       "en": "LRL-32-PV-N 809713 443-02-00285 LRL 3.2 mm PVDF"
  454 |     }
  455 |   },
  456 |   {
  457 |     "productId": "809672",
  458 |     "categoryId": "fittings",
  459 |     "productTypeId": "luer-fittings",
  460 |     "seriesId": "lpr",
  461 |     "cardTitle": {
  462 |       "zh": "旋转锁圈公鲁尔接头",
  463 |       "en": "旋转锁圈公鲁尔接头"
  464 |     },
  465 |     "cardSubtitle": {
  466 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
  467 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
  468 |     },
  469 |     "filters": {
  470 |       "filter01": "公鲁尔接头",
  471 |       "filter02": "LPR 旋转锁圈",
  472 |       "filter03": "1.6 mm",
  473 |       "filter05": "PP",
  474 |       "filter06": "本色"
  475 |     },
  476 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-N.jpg",
  477 |     "detailSlug": "lpr-16-pp-n",
  478 |     "status": "active",
  479 |     "sortOrder": 16,
  480 |     "searchKeywords": {
  481 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-N LPR-16-PP-N 809672 443-02-00236 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 本色",
  482 |       "en": "LPR-16-PP-N 809672 443-02-00236 LPR 1.6 mm PP"
  483 |     }
  484 |   },
  485 |   {
  486 |     "productId": "809673",
  487 |     "categoryId": "fittings",
  488 |     "productTypeId": "luer-fittings",
  489 |     "seriesId": "lpr",
  490 |     "cardTitle": {
  491 |       "zh": "旋转锁圈公鲁尔接头",
  492 |       "en": "旋转锁圈公鲁尔接头"
  493 |     },
  494 |     "cardSubtitle": {
  495 |       "zh": "适配1.6 mm内径软管\nPP材质｜白色",
  496 |       "en": "适配1.6 mm内径软管\nPP材质｜白色"
  497 |     },
  498 |     "filters": {
  499 |       "filter01": "公鲁尔接头",
  500 |       "filter02": "LPR 旋转锁圈",
  501 |       "filter03": "1.6 mm",
  502 |       "filter05": "PP",
  503 |       "filter06": "白色"
  504 |     },
  505 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-W.jpg",
  506 |     "detailSlug": "lpr-16-pp-w",
  507 |     "status": "active",
  508 |     "sortOrder": 17,
  509 |     "searchKeywords": {
  510 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-W LPR-16-PP-W 809673 443-02-00237 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 白色",
  511 |       "en": "LPR-16-PP-W 809673 443-02-00237 LPR 1.6 mm PP"
  512 |     }
  513 |   },
  514 |   {
  515 |     "productId": "809674",
  516 |     "categoryId": "fittings",
  517 |     "productTypeId": "luer-fittings",
  518 |     "seriesId": "lpr",
  519 |     "cardTitle": {
  520 |       "zh": "旋转锁圈公鲁尔接头",
  521 |       "en": "旋转锁圈公鲁尔接头"
  522 |     },
  523 |     "cardSubtitle": {
  524 |       "zh": "适配1.6 mm内径软管\nPP材质｜蓝色",
  525 |       "en": "适配1.6 mm内径软管\nPP材质｜蓝色"
  526 |     },
  527 |     "filters": {
  528 |       "filter01": "公鲁尔接头",
  529 |       "filter02": "LPR 旋转锁圈",
  530 |       "filter03": "1.6 mm",
  531 |       "filter05": "PP",
  532 |       "filter06": "蓝色"
  533 |     },
  534 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-B.jpg",
  535 |     "detailSlug": "lpr-16-pp-b",
  536 |     "status": "active",
  537 |     "sortOrder": 18,
  538 |     "searchKeywords": {
  539 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-B LPR-16-PP-B 809674 443-02-00238 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 蓝色",
  540 |       "en": "LPR-16-PP-B 809674 443-02-00238 LPR 1.6 mm PP"
  541 |     }
  542 |   },
  543 |   {
  544 |     "productId": "809675",
  545 |     "categoryId": "fittings",
  546 |     "productTypeId": "luer-fittings",
  547 |     "seriesId": "lpr",
  548 |     "cardTitle": {
  549 |       "zh": "旋转锁圈公鲁尔接头",
  550 |       "en": "旋转锁圈公鲁尔接头"
  551 |     },
  552 |     "cardSubtitle": {
  553 |       "zh": "适配1.6 mm内径软管\nPP材质｜红色",
  554 |       "en": "适配1.6 mm内径软管\nPP材质｜红色"
  555 |     },
  556 |     "filters": {
  557 |       "filter01": "公鲁尔接头",
  558 |       "filter02": "LPR 旋转锁圈",
  559 |       "filter03": "1.6 mm",
  560 |       "filter05": "PP",
  561 |       "filter06": "红色"
  562 |     },
  563 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-R.jpg",
  564 |     "detailSlug": "lpr-16-pp-r",
  565 |     "status": "active",
  566 |     "sortOrder": 19,
  567 |     "searchKeywords": {
  568 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-R LPR-16-PP-R 809675 443-02-00239 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 红色",
  569 |       "en": "LPR-16-PP-R 809675 443-02-00239 LPR 1.6 mm PP"
  570 |     }
  571 |   },
  572 |   {
  573 |     "productId": "809676",
  574 |     "categoryId": "fittings",
  575 |     "productTypeId": "luer-fittings",
  576 |     "seriesId": "lpr",
  577 |     "cardTitle": {
  578 |       "zh": "旋转锁圈公鲁尔接头",
  579 |       "en": "旋转锁圈公鲁尔接头"
  580 |     },
  581 |     "cardSubtitle": {
  582 |       "zh": "适配1.6 mm内径软管\nPP材质｜绿色",
  583 |       "en": "适配1.6 mm内径软管\nPP材质｜绿色"
  584 |     },
  585 |     "filters": {
  586 |       "filter01": "公鲁尔接头",
  587 |       "filter02": "LPR 旋转锁圈",
  588 |       "filter03": "1.6 mm",
  589 |       "filter05": "PP",
  590 |       "filter06": "绿色"
  591 |     },
  592 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-G.jpg",
  593 |     "detailSlug": "lpr-16-pp-g",
  594 |     "status": "active",
  595 |     "sortOrder": 20,
  596 |     "searchKeywords": {
  597 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-G LPR-16-PP-G 809676 443-02-00240 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 绿色",
  598 |       "en": "LPR-16-PP-G 809676 443-02-00240 LPR 1.6 mm PP"
  599 |     }
  600 |   },
  601 |   {
  602 |     "productId": "809677",
  603 |     "categoryId": "fittings",
  604 |     "productTypeId": "luer-fittings",
  605 |     "seriesId": "lpr",
  606 |     "cardTitle": {
  607 |       "zh": "旋转锁圈公鲁尔接头",
  608 |       "en": "旋转锁圈公鲁尔接头"
  609 |     },
  610 |     "cardSubtitle": {
  611 |       "zh": "适配1.6 mm内径软管\nPP材质｜紫色",
  612 |       "en": "适配1.6 mm内径软管\nPP材质｜紫色"
  613 |     },
  614 |     "filters": {
  615 |       "filter01": "公鲁尔接头",
  616 |       "filter02": "LPR 旋转锁圈",
  617 |       "filter03": "1.6 mm",
  618 |       "filter05": "PP",
  619 |       "filter06": "紫色"
  620 |     },
  621 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-U.jpg",
  622 |     "detailSlug": "lpr-16-pp-u",
  623 |     "status": "active",
  624 |     "sortOrder": 21,
  625 |     "searchKeywords": {
  626 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-U LPR-16-PP-U 809677 443-02-00241 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 紫色",
  627 |       "en": "LPR-16-PP-U 809677 443-02-00241 LPR 1.6 mm PP"
  628 |     }
  629 |   },
  630 |   {
  631 |     "productId": "809678",
  632 |     "categoryId": "fittings",
  633 |     "productTypeId": "luer-fittings",
  634 |     "seriesId": "lpr",
  635 |     "cardTitle": {
  636 |       "zh": "旋转锁圈公鲁尔接头",
  637 |       "en": "旋转锁圈公鲁尔接头"
  638 |     },
  639 |     "cardSubtitle": {
  640 |       "zh": "适配1.6 mm内径软管\nPP材质｜橙色",
  641 |       "en": "适配1.6 mm内径软管\nPP材质｜橙色"
  642 |     },
  643 |     "filters": {
  644 |       "filter01": "公鲁尔接头",
  645 |       "filter02": "LPR 旋转锁圈",
  646 |       "filter03": "1.6 mm",
  647 |       "filter05": "PP",
  648 |       "filter06": "橙色"
  649 |     },
  650 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-O.jpg",
  651 |     "detailSlug": "lpr-16-pp-o",
  652 |     "status": "active",
  653 |     "sortOrder": 22,
  654 |     "searchKeywords": {
  655 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-O LPR-16-PP-O 809678 443-02-00242 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 橙色",
  656 |       "en": "LPR-16-PP-O 809678 443-02-00242 LPR 1.6 mm PP"
  657 |     }
  658 |   },
  659 |   {
  660 |     "productId": "809679",
  661 |     "categoryId": "fittings",
  662 |     "productTypeId": "luer-fittings",
  663 |     "seriesId": "lpr",
  664 |     "cardTitle": {
  665 |       "zh": "旋转锁圈公鲁尔接头",
  666 |       "en": "旋转锁圈公鲁尔接头"
  667 |     },
  668 |     "cardSubtitle": {
  669 |       "zh": "适配1.6 mm内径软管\nPP材质｜黄色",
  670 |       "en": "适配1.6 mm内径软管\nPP材质｜黄色"
  671 |     },
  672 |     "filters": {
  673 |       "filter01": "公鲁尔接头",
  674 |       "filter02": "LPR 旋转锁圈",
  675 |       "filter03": "1.6 mm",
  676 |       "filter05": "PP",
  677 |       "filter06": "黄色"
  678 |     },
  679 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-Y.jpg",
  680 |     "detailSlug": "lpr-16-pp-y",
  681 |     "status": "active",
  682 |     "sortOrder": 23,
  683 |     "searchKeywords": {
  684 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PP-Y LPR-16-PP-Y 809679 443-02-00243 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PP 黄色",
  685 |       "en": "LPR-16-PP-Y 809679 443-02-00243 LPR 1.6 mm PP"
  686 |     }
  687 |   },
  688 |   {
  689 |     "productId": "809680",
  690 |     "categoryId": "fittings",
  691 |     "productTypeId": "luer-fittings",
  692 |     "seriesId": "lpr",
  693 |     "cardTitle": {
  694 |       "zh": "旋转锁圈公鲁尔接头",
  695 |       "en": "旋转锁圈公鲁尔接头"
  696 |     },
  697 |     "cardSubtitle": {
  698 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
  699 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
  700 |     },
  701 |     "filters": {
  702 |       "filter01": "公鲁尔接头",
  703 |       "filter02": "LPR 旋转锁圈",
  704 |       "filter03": "2.4 mm",
  705 |       "filter05": "PP",
  706 |       "filter06": "本色"
  707 |     },
  708 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-N.jpg",
  709 |     "detailSlug": "lpr-24-pp-n",
  710 |     "status": "active",
  711 |     "sortOrder": 24,
  712 |     "searchKeywords": {
  713 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-N LPR-24-PP-N 809680 443-02-00244 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 本色",
  714 |       "en": "LPR-24-PP-N 809680 443-02-00244 LPR 2.4 mm PP"
  715 |     }
  716 |   },
  717 |   {
  718 |     "productId": "809681",
  719 |     "categoryId": "fittings",
  720 |     "productTypeId": "luer-fittings",
  721 |     "seriesId": "lpr",
  722 |     "cardTitle": {
  723 |       "zh": "旋转锁圈公鲁尔接头",
  724 |       "en": "旋转锁圈公鲁尔接头"
  725 |     },
  726 |     "cardSubtitle": {
  727 |       "zh": "适配2.4 mm内径软管\nPP材质｜白色",
  728 |       "en": "适配2.4 mm内径软管\nPP材质｜白色"
  729 |     },
  730 |     "filters": {
  731 |       "filter01": "公鲁尔接头",
  732 |       "filter02": "LPR 旋转锁圈",
  733 |       "filter03": "2.4 mm",
  734 |       "filter05": "PP",
  735 |       "filter06": "白色"
  736 |     },
  737 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-W.jpg",
  738 |     "detailSlug": "lpr-24-pp-w",
  739 |     "status": "active",
  740 |     "sortOrder": 25,
  741 |     "searchKeywords": {
  742 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-W LPR-24-PP-W 809681 443-02-00245 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 白色",
  743 |       "en": "LPR-24-PP-W 809681 443-02-00245 LPR 2.4 mm PP"
  744 |     }
  745 |   },
  746 |   {
  747 |     "productId": "809682",
  748 |     "categoryId": "fittings",
  749 |     "productTypeId": "luer-fittings",
  750 |     "seriesId": "lpr",
  751 |     "cardTitle": {
  752 |       "zh": "旋转锁圈公鲁尔接头",
  753 |       "en": "旋转锁圈公鲁尔接头"
  754 |     },
  755 |     "cardSubtitle": {
  756 |       "zh": "适配2.4 mm内径软管\nPP材质｜蓝色",
  757 |       "en": "适配2.4 mm内径软管\nPP材质｜蓝色"
  758 |     },
  759 |     "filters": {
  760 |       "filter01": "公鲁尔接头",
  761 |       "filter02": "LPR 旋转锁圈",
  762 |       "filter03": "2.4 mm",
  763 |       "filter05": "PP",
  764 |       "filter06": "蓝色"
  765 |     },
  766 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-B.jpg",
  767 |     "detailSlug": "lpr-24-pp-b",
  768 |     "status": "active",
  769 |     "sortOrder": 26,
  770 |     "searchKeywords": {
  771 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-B LPR-24-PP-B 809682 443-02-00246 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 蓝色",
  772 |       "en": "LPR-24-PP-B 809682 443-02-00246 LPR 2.4 mm PP"
  773 |     }
  774 |   },
  775 |   {
  776 |     "productId": "809683",
  777 |     "categoryId": "fittings",
  778 |     "productTypeId": "luer-fittings",
  779 |     "seriesId": "lpr",
  780 |     "cardTitle": {
  781 |       "zh": "旋转锁圈公鲁尔接头",
  782 |       "en": "旋转锁圈公鲁尔接头"
  783 |     },
  784 |     "cardSubtitle": {
  785 |       "zh": "适配2.4 mm内径软管\nPP材质｜红色",
  786 |       "en": "适配2.4 mm内径软管\nPP材质｜红色"
  787 |     },
  788 |     "filters": {
  789 |       "filter01": "公鲁尔接头",
  790 |       "filter02": "LPR 旋转锁圈",
  791 |       "filter03": "2.4 mm",
  792 |       "filter05": "PP",
  793 |       "filter06": "红色"
  794 |     },
  795 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-R.jpg",
  796 |     "detailSlug": "lpr-24-pp-r",
  797 |     "status": "active",
  798 |     "sortOrder": 27,
  799 |     "searchKeywords": {
  800 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-R LPR-24-PP-R 809683 443-02-00247 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 红色",
  801 |       "en": "LPR-24-PP-R 809683 443-02-00247 LPR 2.4 mm PP"
  802 |     }
  803 |   },
  804 |   {
  805 |     "productId": "809684",
  806 |     "categoryId": "fittings",
  807 |     "productTypeId": "luer-fittings",
  808 |     "seriesId": "lpr",
  809 |     "cardTitle": {
  810 |       "zh": "旋转锁圈公鲁尔接头",
  811 |       "en": "旋转锁圈公鲁尔接头"
  812 |     },
  813 |     "cardSubtitle": {
  814 |       "zh": "适配2.4 mm内径软管\nPP材质｜绿色",
  815 |       "en": "适配2.4 mm内径软管\nPP材质｜绿色"
  816 |     },
  817 |     "filters": {
  818 |       "filter01": "公鲁尔接头",
  819 |       "filter02": "LPR 旋转锁圈",
  820 |       "filter03": "2.4 mm",
  821 |       "filter05": "PP",
  822 |       "filter06": "绿色"
  823 |     },
  824 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-G.jpg",
  825 |     "detailSlug": "lpr-24-pp-g",
  826 |     "status": "active",
  827 |     "sortOrder": 28,
  828 |     "searchKeywords": {
  829 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-G LPR-24-PP-G 809684 443-02-00248 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 绿色",
  830 |       "en": "LPR-24-PP-G 809684 443-02-00248 LPR 2.4 mm PP"
  831 |     }
  832 |   },
  833 |   {
  834 |     "productId": "809685",
  835 |     "categoryId": "fittings",
  836 |     "productTypeId": "luer-fittings",
  837 |     "seriesId": "lpr",
  838 |     "cardTitle": {
  839 |       "zh": "旋转锁圈公鲁尔接头",
  840 |       "en": "旋转锁圈公鲁尔接头"
  841 |     },
  842 |     "cardSubtitle": {
  843 |       "zh": "适配2.4 mm内径软管\nPP材质｜紫色",
  844 |       "en": "适配2.4 mm内径软管\nPP材质｜紫色"
  845 |     },
  846 |     "filters": {
  847 |       "filter01": "公鲁尔接头",
  848 |       "filter02": "LPR 旋转锁圈",
  849 |       "filter03": "2.4 mm",
  850 |       "filter05": "PP",
  851 |       "filter06": "紫色"
  852 |     },
  853 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-U.jpg",
  854 |     "detailSlug": "lpr-24-pp-u",
  855 |     "status": "active",
  856 |     "sortOrder": 29,
  857 |     "searchKeywords": {
  858 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-U LPR-24-PP-U 809685 443-02-00249 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 紫色",
  859 |       "en": "LPR-24-PP-U 809685 443-02-00249 LPR 2.4 mm PP"
  860 |     }
  861 |   },
  862 |   {
  863 |     "productId": "809686",
  864 |     "categoryId": "fittings",
  865 |     "productTypeId": "luer-fittings",
  866 |     "seriesId": "lpr",
  867 |     "cardTitle": {
  868 |       "zh": "旋转锁圈公鲁尔接头",
  869 |       "en": "旋转锁圈公鲁尔接头"
  870 |     },
  871 |     "cardSubtitle": {
  872 |       "zh": "适配2.4 mm内径软管\nPP材质｜橙色",
  873 |       "en": "适配2.4 mm内径软管\nPP材质｜橙色"
  874 |     },
  875 |     "filters": {
  876 |       "filter01": "公鲁尔接头",
  877 |       "filter02": "LPR 旋转锁圈",
  878 |       "filter03": "2.4 mm",
  879 |       "filter05": "PP",
  880 |       "filter06": "橙色"
  881 |     },
  882 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-O.jpg",
  883 |     "detailSlug": "lpr-24-pp-o-809686",
  884 |     "status": "active",
  885 |     "sortOrder": 30,
  886 |     "searchKeywords": {
  887 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-O LPR-24-PP-O 809686 443-02-00250 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 橙色",
  888 |       "en": "LPR-24-PP-O 809686 443-02-00250 LPR 2.4 mm PP"
  889 |     }
  890 |   },
  891 |   {
  892 |     "productId": "809687",
  893 |     "categoryId": "fittings",
  894 |     "productTypeId": "luer-fittings",
  895 |     "seriesId": "lpr",
  896 |     "cardTitle": {
  897 |       "zh": "旋转锁圈公鲁尔接头",
  898 |       "en": "旋转锁圈公鲁尔接头"
  899 |     },
  900 |     "cardSubtitle": {
  901 |       "zh": "适配2.4 mm内径软管\nPP材质｜黄色",
  902 |       "en": "适配2.4 mm内径软管\nPP材质｜黄色"
  903 |     },
  904 |     "filters": {
  905 |       "filter01": "公鲁尔接头",
  906 |       "filter02": "LPR 旋转锁圈",
  907 |       "filter03": "2.4 mm",
  908 |       "filter05": "PP",
  909 |       "filter06": "黄色"
  910 |     },
  911 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-Y.jpg",
  912 |     "detailSlug": "lpr-24-pp-y",
  913 |     "status": "active",
  914 |     "sortOrder": 31,
  915 |     "searchKeywords": {
  916 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-Y LPR-24-PP-Y 809687 443-02-00251 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 黄色",
  917 |       "en": "LPR-24-PP-Y 809687 443-02-00251 LPR 2.4 mm PP"
  918 |     }
  919 |   },
  920 |   {
  921 |     "productId": "809688",
  922 |     "categoryId": "fittings",
  923 |     "productTypeId": "luer-fittings",
  924 |     "seriesId": "lpr",
  925 |     "cardTitle": {
  926 |       "zh": "旋转锁圈公鲁尔接头",
  927 |       "en": "旋转锁圈公鲁尔接头"
  928 |     },
  929 |     "cardSubtitle": {
  930 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
  931 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
  932 |     },
  933 |     "filters": {
  934 |       "filter01": "公鲁尔接头",
  935 |       "filter02": "LPR 旋转锁圈",
  936 |       "filter03": "3.2 mm",
  937 |       "filter05": "PP",
  938 |       "filter06": "本色"
  939 |     },
  940 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-N.jpg",
  941 |     "detailSlug": "lpr-32-pp-n",
  942 |     "status": "active",
  943 |     "sortOrder": 32,
  944 |     "searchKeywords": {
  945 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-N LPR-32-PP-N 809688 443-02-00252 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 本色",
  946 |       "en": "LPR-32-PP-N 809688 443-02-00252 LPR 3.2 mm PP"
  947 |     }
  948 |   },
  949 |   {
  950 |     "productId": "809689",
  951 |     "categoryId": "fittings",
  952 |     "productTypeId": "luer-fittings",
  953 |     "seriesId": "lpr",
  954 |     "cardTitle": {
  955 |       "zh": "旋转锁圈公鲁尔接头",
  956 |       "en": "旋转锁圈公鲁尔接头"
  957 |     },
  958 |     "cardSubtitle": {
  959 |       "zh": "适配3.2 mm内径软管\nPP材质｜白色",
  960 |       "en": "适配3.2 mm内径软管\nPP材质｜白色"
  961 |     },
  962 |     "filters": {
  963 |       "filter01": "公鲁尔接头",
  964 |       "filter02": "LPR 旋转锁圈",
  965 |       "filter03": "3.2 mm",
  966 |       "filter05": "PP",
  967 |       "filter06": "白色"
  968 |     },
  969 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-W.jpg",
  970 |     "detailSlug": "lpr-32-pp-w",
  971 |     "status": "active",
  972 |     "sortOrder": 33,
  973 |     "searchKeywords": {
  974 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-W LPR-32-PP-W 809689 443-02-00253 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 白色",
  975 |       "en": "LPR-32-PP-W 809689 443-02-00253 LPR 3.2 mm PP"
  976 |     }
  977 |   },
  978 |   {
  979 |     "productId": "809690",
  980 |     "categoryId": "fittings",
  981 |     "productTypeId": "luer-fittings",
  982 |     "seriesId": "lpr",
  983 |     "cardTitle": {
  984 |       "zh": "旋转锁圈公鲁尔接头",
  985 |       "en": "旋转锁圈公鲁尔接头"
  986 |     },
  987 |     "cardSubtitle": {
  988 |       "zh": "适配3.2 mm内径软管\nPP材质｜蓝色",
  989 |       "en": "适配3.2 mm内径软管\nPP材质｜蓝色"
  990 |     },
  991 |     "filters": {
  992 |       "filter01": "公鲁尔接头",
  993 |       "filter02": "LPR 旋转锁圈",
  994 |       "filter03": "3.2 mm",
  995 |       "filter05": "PP",
  996 |       "filter06": "蓝色"
  997 |     },
  998 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-B.jpg",
  999 |     "detailSlug": "lpr-32-pp-b",
 1000 |     "status": "active",
 1001 |     "sortOrder": 34,
 1002 |     "searchKeywords": {
 1003 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-B LPR-32-PP-B 809690 443-02-00254 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 蓝色",
 1004 |       "en": "LPR-32-PP-B 809690 443-02-00254 LPR 3.2 mm PP"
 1005 |     }
 1006 |   },
 1007 |   {
 1008 |     "productId": "809691",
 1009 |     "categoryId": "fittings",
 1010 |     "productTypeId": "luer-fittings",
 1011 |     "seriesId": "lpr",
 1012 |     "cardTitle": {
 1013 |       "zh": "旋转锁圈公鲁尔接头",
 1014 |       "en": "旋转锁圈公鲁尔接头"
 1015 |     },
 1016 |     "cardSubtitle": {
 1017 |       "zh": "适配3.2 mm内径软管\nPP材质｜红色",
 1018 |       "en": "适配3.2 mm内径软管\nPP材质｜红色"
 1019 |     },
 1020 |     "filters": {
 1021 |       "filter01": "公鲁尔接头",
 1022 |       "filter02": "LPR 旋转锁圈",
 1023 |       "filter03": "3.2 mm",
 1024 |       "filter05": "PP",
 1025 |       "filter06": "红色"
 1026 |     },
 1027 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-R.jpg",
 1028 |     "detailSlug": "lpr-32-pp-r",
 1029 |     "status": "active",
 1030 |     "sortOrder": 35,
 1031 |     "searchKeywords": {
 1032 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-R LPR-32-PP-R 809691 443-02-00255 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 红色",
 1033 |       "en": "LPR-32-PP-R 809691 443-02-00255 LPR 3.2 mm PP"
 1034 |     }
 1035 |   },
 1036 |   {
 1037 |     "productId": "809693",
 1038 |     "categoryId": "fittings",
 1039 |     "productTypeId": "luer-fittings",
 1040 |     "seriesId": "lpr",
 1041 |     "cardTitle": {
 1042 |       "zh": "旋转锁圈公鲁尔接头",
 1043 |       "en": "旋转锁圈公鲁尔接头"
 1044 |     },
 1045 |     "cardSubtitle": {
 1046 |       "zh": "适配3.2 mm内径软管\nPP材质｜紫色",
 1047 |       "en": "适配3.2 mm内径软管\nPP材质｜紫色"
 1048 |     },
 1049 |     "filters": {
 1050 |       "filter01": "公鲁尔接头",
 1051 |       "filter02": "LPR 旋转锁圈",
 1052 |       "filter03": "3.2 mm",
 1053 |       "filter05": "PP",
 1054 |       "filter06": "紫色"
 1055 |     },
 1056 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-U.jpg",
 1057 |     "detailSlug": "lpr-32-pp-u",
 1058 |     "status": "active",
 1059 |     "sortOrder": 36,
 1060 |     "searchKeywords": {
 1061 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-U LPR-32-PP-U 809693 443-02-00257 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 紫色",
 1062 |       "en": "LPR-32-PP-U 809693 443-02-00257 LPR 3.2 mm PP"
 1063 |     }
 1064 |   },
 1065 |   {
 1066 |     "productId": "809694",
 1067 |     "categoryId": "fittings",
 1068 |     "productTypeId": "luer-fittings",
 1069 |     "seriesId": "lpr",
 1070 |     "cardTitle": {
 1071 |       "zh": "旋转锁圈公鲁尔接头",
 1072 |       "en": "旋转锁圈公鲁尔接头"
 1073 |     },
 1074 |     "cardSubtitle": {
 1075 |       "zh": "适配3.2 mm内径软管\nPP材质｜橙色",
 1076 |       "en": "适配3.2 mm内径软管\nPP材质｜橙色"
 1077 |     },
 1078 |     "filters": {
 1079 |       "filter01": "公鲁尔接头",
 1080 |       "filter02": "LPR 旋转锁圈",
 1081 |       "filter03": "3.2 mm",
 1082 |       "filter05": "PP",
 1083 |       "filter06": "橙色"
 1084 |     },
 1085 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-O.jpg",
 1086 |     "detailSlug": "lpr-32-pp-o",
 1087 |     "status": "active",
 1088 |     "sortOrder": 37,
 1089 |     "searchKeywords": {
 1090 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-O LPR-32-PP-O 809694 443-02-00258 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 橙色",
 1091 |       "en": "LPR-32-PP-O 809694 443-02-00258 LPR 3.2 mm PP"
 1092 |     }
 1093 |   },
 1094 |   {
 1095 |     "productId": "809695",
 1096 |     "categoryId": "fittings",
 1097 |     "productTypeId": "luer-fittings",
 1098 |     "seriesId": "lpr",
 1099 |     "cardTitle": {
 1100 |       "zh": "旋转锁圈公鲁尔接头",
 1101 |       "en": "旋转锁圈公鲁尔接头"
 1102 |     },
 1103 |     "cardSubtitle": {
 1104 |       "zh": "适配3.2 mm内径软管\nPP材质｜黄色",
 1105 |       "en": "适配3.2 mm内径软管\nPP材质｜黄色"
 1106 |     },
 1107 |     "filters": {
 1108 |       "filter01": "公鲁尔接头",
 1109 |       "filter02": "LPR 旋转锁圈",
 1110 |       "filter03": "3.2 mm",
 1111 |       "filter05": "PP",
 1112 |       "filter06": "黄色"
 1113 |     },
 1114 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-Y.jpg",
 1115 |     "detailSlug": "lpr-32-pp-y",
 1116 |     "status": "active",
 1117 |     "sortOrder": 38,
 1118 |     "searchKeywords": {
 1119 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-Y LPR-32-PP-Y 809695 443-02-00259 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 黄色",
 1120 |       "en": "LPR-32-PP-Y 809695 443-02-00259 LPR 3.2 mm PP"
 1121 |     }
 1122 |   },
 1123 |   {
 1124 |     "productId": "809290",
 1125 |     "categoryId": "fittings",
 1126 |     "productTypeId": "luer-fittings",
 1127 |     "seriesId": "lpr",
 1128 |     "cardTitle": {
 1129 |       "zh": "旋转锁圈公鲁尔接头",
 1130 |       "en": "旋转锁圈公鲁尔接头"
 1131 |     },
 1132 |     "cardSubtitle": {
 1133 |       "zh": "适配2.4 mm内径软管\nPA材质｜白色",
 1134 |       "en": "适配2.4 mm内径软管\nPA材质｜白色"
 1135 |     },
 1136 |     "filters": {
 1137 |       "filter01": "公鲁尔接头",
 1138 |       "filter02": "LPR 旋转锁圈",
 1139 |       "filter03": "2.4 mm",
 1140 |       "filter05": "PA",
 1141 |       "filter06": "白色"
 1142 |     },
 1143 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-W.jpg",
 1144 |     "detailSlug": "lpr-24-pa-w",
 1145 |     "status": "active",
 1146 |     "sortOrder": 39,
 1147 |     "searchKeywords": {
 1148 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-W LPR-24-PA-W 809290 443-02-00316 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 白色",
 1149 |       "en": "LPR-24-PA-W 809290 443-02-00316 LPR 2.4 mm PA"
 1150 |     }
 1151 |   },
 1152 |   {
 1153 |     "productId": "809291",
 1154 |     "categoryId": "fittings",
 1155 |     "productTypeId": "luer-fittings",
 1156 |     "seriesId": "lpr",
 1157 |     "cardTitle": {
 1158 |       "zh": "旋转锁圈公鲁尔接头",
 1159 |       "en": "旋转锁圈公鲁尔接头"
 1160 |     },
 1161 |     "cardSubtitle": {
 1162 |       "zh": "适配2.4 mm内径软管\nPA材质｜黄色",
 1163 |       "en": "适配2.4 mm内径软管\nPA材质｜黄色"
 1164 |     },
 1165 |     "filters": {
 1166 |       "filter01": "公鲁尔接头",
 1167 |       "filter02": "LPR 旋转锁圈",
 1168 |       "filter03": "2.4 mm",
 1169 |       "filter05": "PA",
 1170 |       "filter06": "黄色"
 1171 |     },
 1172 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-Y.jpg",
 1173 |     "detailSlug": "lpr-24-pa-y",
 1174 |     "status": "active",
 1175 |     "sortOrder": 40,
 1176 |     "searchKeywords": {
 1177 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-Y LPR-24-PA-Y 809291 443-02-00317 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 黄色",
 1178 |       "en": "LPR-24-PA-Y 809291 443-02-00317 LPR 2.4 mm PA"
 1179 |     }
 1180 |   },
 1181 |   {
 1182 |     "productId": "809299",
 1183 |     "categoryId": "fittings",
 1184 |     "productTypeId": "luer-fittings",
 1185 |     "seriesId": "lpr",
 1186 |     "cardTitle": {
 1187 |       "zh": "旋转锁圈公鲁尔接头",
 1188 |       "en": "旋转锁圈公鲁尔接头"
 1189 |     },
 1190 |     "cardSubtitle": {
 1191 |       "zh": "适配3.2 mm内径软管\nPA材质｜蓝色",
 1192 |       "en": "适配3.2 mm内径软管\nPA材质｜蓝色"
 1193 |     },
 1194 |     "filters": {
 1195 |       "filter01": "公鲁尔接头",
 1196 |       "filter02": "LPR 旋转锁圈",
 1197 |       "filter03": "3.2 mm",
 1198 |       "filter05": "PA",
 1199 |       "filter06": "蓝色"
 1200 |     },
 1201 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-B.jpg",
 1202 |     "detailSlug": "lpr-32-pa-b",
 1203 |     "status": "active",
 1204 |     "sortOrder": 41,
 1205 |     "searchKeywords": {
 1206 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-B LPR-32-PA-B 809299 443-02-00318 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 蓝色",
 1207 |       "en": "LPR-32-PA-B 809299 443-02-00318 LPR 3.2 mm PA"
 1208 |     }
 1209 |   },
 1210 |   {
 1211 |     "productId": "809320",
 1212 |     "categoryId": "fittings",
 1213 |     "productTypeId": "luer-fittings",
 1214 |     "seriesId": "lpr",
 1215 |     "cardTitle": {
 1216 |       "zh": "旋转锁圈公鲁尔接头",
 1217 |       "en": "旋转锁圈公鲁尔接头"
 1218 |     },
 1219 |     "cardSubtitle": {
 1220 |       "zh": "适配1.6 mm内径软管\nPA材质｜白色",
 1221 |       "en": "适配1.6 mm内径软管\nPA材质｜白色"
 1222 |     },
 1223 |     "filters": {
 1224 |       "filter01": "公鲁尔接头",
 1225 |       "filter02": "LPR 旋转锁圈",
 1226 |       "filter03": "1.6 mm",
 1227 |       "filter05": "PA",
 1228 |       "filter06": "白色"
 1229 |     },
 1230 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-W.jpg",
 1231 |     "detailSlug": "lpr-16-pa-w",
 1232 |     "status": "active",
 1233 |     "sortOrder": 42,
 1234 |     "searchKeywords": {
 1235 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-W LPR-16-PA-W 809320 443-02-00332 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 白色",
 1236 |       "en": "LPR-16-PA-W 809320 443-02-00332 LPR 1.6 mm PA"
 1237 |     }
 1238 |   },
 1239 |   {
 1240 |     "productId": "809331",
 1241 |     "categoryId": "fittings",
 1242 |     "productTypeId": "luer-fittings",
 1243 |     "seriesId": "lpr",
 1244 |     "cardTitle": {
 1245 |       "zh": "旋转锁圈公鲁尔接头",
 1246 |       "en": "旋转锁圈公鲁尔接头"
 1247 |     },
 1248 |     "cardSubtitle": {
 1249 |       "zh": "适配1.6 mm内径软管\nPA材质｜蓝色",
 1250 |       "en": "适配1.6 mm内径软管\nPA材质｜蓝色"
 1251 |     },
 1252 |     "filters": {
 1253 |       "filter01": "公鲁尔接头",
 1254 |       "filter02": "LPR 旋转锁圈",
 1255 |       "filter03": "1.6 mm",
 1256 |       "filter05": "PA",
 1257 |       "filter06": "蓝色"
 1258 |     },
 1259 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-B.jpg",
 1260 |     "detailSlug": "lpr-16-pa-b",
 1261 |     "status": "active",
 1262 |     "sortOrder": 43,
 1263 |     "searchKeywords": {
 1264 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-B LPR-16-PA-B 809331 443-02-00333 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 蓝色",
 1265 |       "en": "LPR-16-PA-B 809331 443-02-00333 LPR 1.6 mm PA"
 1266 |     }
 1267 |   },
 1268 |   {
 1269 |     "productId": "809333",
 1270 |     "categoryId": "fittings",
 1271 |     "productTypeId": "luer-fittings",
 1272 |     "seriesId": "lpr",
 1273 |     "cardTitle": {
 1274 |       "zh": "旋转锁圈公鲁尔接头",
 1275 |       "en": "旋转锁圈公鲁尔接头"
 1276 |     },
 1277 |     "cardSubtitle": {
 1278 |       "zh": "适配1.6 mm内径软管\nPA材质｜红色",
 1279 |       "en": "适配1.6 mm内径软管\nPA材质｜红色"
 1280 |     },
 1281 |     "filters": {
 1282 |       "filter01": "公鲁尔接头",
 1283 |       "filter02": "LPR 旋转锁圈",
 1284 |       "filter03": "1.6 mm",
 1285 |       "filter05": "PA",
 1286 |       "filter06": "红色"
 1287 |     },
 1288 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-R.jpg",
 1289 |     "detailSlug": "lpr-16-pa-r",
 1290 |     "status": "active",
 1291 |     "sortOrder": 44,
 1292 |     "searchKeywords": {
 1293 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-R LPR-16-PA-R 809333 443-02-00334 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 红色",
 1294 |       "en": "LPR-16-PA-R 809333 443-02-00334 LPR 1.6 mm PA"
 1295 |     }
 1296 |   },
 1297 |   {
 1298 |     "productId": "809342",
 1299 |     "categoryId": "fittings",
 1300 |     "productTypeId": "luer-fittings",
 1301 |     "seriesId": "lpr",
 1302 |     "cardTitle": {
 1303 |       "zh": "旋转锁圈公鲁尔接头",
 1304 |       "en": "旋转锁圈公鲁尔接头"
 1305 |     },
 1306 |     "cardSubtitle": {
 1307 |       "zh": "适配1.6 mm内径软管\nPA材质｜绿色",
 1308 |       "en": "适配1.6 mm内径软管\nPA材质｜绿色"
 1309 |     },
 1310 |     "filters": {
 1311 |       "filter01": "公鲁尔接头",
 1312 |       "filter02": "LPR 旋转锁圈",
 1313 |       "filter03": "1.6 mm",
 1314 |       "filter05": "PA",
 1315 |       "filter06": "绿色"
 1316 |     },
 1317 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-G.jpg",
 1318 |     "detailSlug": "lpr-16-pa-g",
 1319 |     "status": "active",
 1320 |     "sortOrder": 45,
 1321 |     "searchKeywords": {
 1322 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-G LPR-16-PA-G 809342 443-02-00335 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 绿色",
 1323 |       "en": "LPR-16-PA-G 809342 443-02-00335 LPR 1.6 mm PA"
 1324 |     }
 1325 |   },
 1326 |   {
 1327 |     "productId": "809351",
 1328 |     "categoryId": "fittings",
 1329 |     "productTypeId": "luer-fittings",
 1330 |     "seriesId": "lpr",
 1331 |     "cardTitle": {
 1332 |       "zh": "旋转锁圈公鲁尔接头",
 1333 |       "en": "旋转锁圈公鲁尔接头"
 1334 |     },
 1335 |     "cardSubtitle": {
 1336 |       "zh": "适配1.6 mm内径软管\nPA材质｜紫色",
 1337 |       "en": "适配1.6 mm内径软管\nPA材质｜紫色"
 1338 |     },
 1339 |     "filters": {
 1340 |       "filter01": "公鲁尔接头",
 1341 |       "filter02": "LPR 旋转锁圈",
 1342 |       "filter03": "1.6 mm",
 1343 |       "filter05": "PA",
 1344 |       "filter06": "紫色"
 1345 |     },
 1346 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-U.jpg",
 1347 |     "detailSlug": "lpr-16-pa-u",
 1348 |     "status": "active",
 1349 |     "sortOrder": 46,
 1350 |     "searchKeywords": {
 1351 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-U LPR-16-PA-U 809351 443-02-00336 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 紫色",
 1352 |       "en": "LPR-16-PA-U 809351 443-02-00336 LPR 1.6 mm PA"
 1353 |     }
 1354 |   },
 1355 |   {
 1356 |     "productId": "809352",
 1357 |     "categoryId": "fittings",
 1358 |     "productTypeId": "luer-fittings",
 1359 |     "seriesId": "lpr",
 1360 |     "cardTitle": {
 1361 |       "zh": "旋转锁圈公鲁尔接头",
 1362 |       "en": "旋转锁圈公鲁尔接头"
 1363 |     },
 1364 |     "cardSubtitle": {
 1365 |       "zh": "适配1.6 mm内径软管\nPA材质｜橙色",
 1366 |       "en": "适配1.6 mm内径软管\nPA材质｜橙色"
 1367 |     },
 1368 |     "filters": {
 1369 |       "filter01": "公鲁尔接头",
 1370 |       "filter02": "LPR 旋转锁圈",
 1371 |       "filter03": "1.6 mm",
 1372 |       "filter05": "PA",
 1373 |       "filter06": "橙色"
 1374 |     },
 1375 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-O.jpg",
 1376 |     "detailSlug": "lpr-16-pa-o",
 1377 |     "status": "active",
 1378 |     "sortOrder": 47,
 1379 |     "searchKeywords": {
 1380 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-O LPR-16-PA-O 809352 443-02-00337 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 橙色",
 1381 |       "en": "LPR-16-PA-O 809352 443-02-00337 LPR 1.6 mm PA"
 1382 |     }
 1383 |   },
 1384 |   {
 1385 |     "productId": "809353",
 1386 |     "categoryId": "fittings",
 1387 |     "productTypeId": "luer-fittings",
 1388 |     "seriesId": "lpr",
 1389 |     "cardTitle": {
 1390 |       "zh": "旋转锁圈公鲁尔接头",
 1391 |       "en": "旋转锁圈公鲁尔接头"
 1392 |     },
 1393 |     "cardSubtitle": {
 1394 |       "zh": "适配1.6 mm内径软管\nPA材质｜黄色",
 1395 |       "en": "适配1.6 mm内径软管\nPA材质｜黄色"
 1396 |     },
 1397 |     "filters": {
 1398 |       "filter01": "公鲁尔接头",
 1399 |       "filter02": "LPR 旋转锁圈",
 1400 |       "filter03": "1.6 mm",
 1401 |       "filter05": "PA",
 1402 |       "filter06": "黄色"
 1403 |     },
 1404 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-Y.jpg",
 1405 |     "detailSlug": "lpr-16-pa-y",
 1406 |     "status": "active",
 1407 |     "sortOrder": 48,
 1408 |     "searchKeywords": {
 1409 |       "zh": "旋转锁圈公鲁尔接头 LPR-16-PA-Y LPR-16-PA-Y 809353 443-02-00338 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 1.6 mm PA 黄色",
 1410 |       "en": "LPR-16-PA-Y 809353 443-02-00338 LPR 1.6 mm PA"
 1411 |     }
 1412 |   },
 1413 |   {
 1414 |     "productId": "809355",
 1415 |     "categoryId": "fittings",
 1416 |     "productTypeId": "luer-fittings",
 1417 |     "seriesId": "lpr",
 1418 |     "cardTitle": {
 1419 |       "zh": "旋转锁圈公鲁尔接头",
 1420 |       "en": "旋转锁圈公鲁尔接头"
 1421 |     },
 1422 |     "cardSubtitle": {
 1423 |       "zh": "适配2.4 mm内径软管\nPA材质｜蓝色",
 1424 |       "en": "适配2.4 mm内径软管\nPA材质｜蓝色"
 1425 |     },
 1426 |     "filters": {
 1427 |       "filter01": "公鲁尔接头",
 1428 |       "filter02": "LPR 旋转锁圈",
 1429 |       "filter03": "2.4 mm",
 1430 |       "filter05": "PA",
 1431 |       "filter06": "蓝色"
 1432 |     },
 1433 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-B.jpg",
 1434 |     "detailSlug": "lpr-24-pa-b",
 1435 |     "status": "active",
 1436 |     "sortOrder": 49,
 1437 |     "searchKeywords": {
 1438 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-B LPR-24-PA-B 809355 443-02-00340 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 蓝色",
 1439 |       "en": "LPR-24-PA-B 809355 443-02-00340 LPR 2.4 mm PA"
 1440 |     }
 1441 |   },
 1442 |   {
 1443 |     "productId": "809356",
 1444 |     "categoryId": "fittings",
 1445 |     "productTypeId": "luer-fittings",
 1446 |     "seriesId": "lpr",
 1447 |     "cardTitle": {
 1448 |       "zh": "旋转锁圈公鲁尔接头",
 1449 |       "en": "旋转锁圈公鲁尔接头"
 1450 |     },
 1451 |     "cardSubtitle": {
 1452 |       "zh": "适配2.4 mm内径软管\nPA材质｜红色",
 1453 |       "en": "适配2.4 mm内径软管\nPA材质｜红色"
 1454 |     },
 1455 |     "filters": {
 1456 |       "filter01": "公鲁尔接头",
 1457 |       "filter02": "LPR 旋转锁圈",
 1458 |       "filter03": "2.4 mm",
 1459 |       "filter05": "PA",
 1460 |       "filter06": "红色"
 1461 |     },
 1462 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-R.jpg",
 1463 |     "detailSlug": "lpr-24-pa-r",
 1464 |     "status": "active",
 1465 |     "sortOrder": 50,
 1466 |     "searchKeywords": {
 1467 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-R LPR-24-PA-R 809356 443-02-00341 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 红色",
 1468 |       "en": "LPR-24-PA-R 809356 443-02-00341 LPR 2.4 mm PA"
 1469 |     }
 1470 |   },
 1471 |   {
 1472 |     "productId": "809363",
 1473 |     "categoryId": "fittings",
 1474 |     "productTypeId": "luer-fittings",
 1475 |     "seriesId": "lpr",
 1476 |     "cardTitle": {
 1477 |       "zh": "旋转锁圈公鲁尔接头",
 1478 |       "en": "旋转锁圈公鲁尔接头"
 1479 |     },
 1480 |     "cardSubtitle": {
 1481 |       "zh": "适配2.4 mm内径软管\nPA材质｜绿色",
 1482 |       "en": "适配2.4 mm内径软管\nPA材质｜绿色"
 1483 |     },
 1484 |     "filters": {
 1485 |       "filter01": "公鲁尔接头",
 1486 |       "filter02": "LPR 旋转锁圈",
 1487 |       "filter03": "2.4 mm",
 1488 |       "filter05": "PA",
 1489 |       "filter06": "绿色"
 1490 |     },
 1491 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-G.jpg",
 1492 |     "detailSlug": "lpr-24-pa-g",
 1493 |     "status": "active",
 1494 |     "sortOrder": 51,
 1495 |     "searchKeywords": {
 1496 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-G LPR-24-PA-G 809363 443-02-00342 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 绿色",
 1497 |       "en": "LPR-24-PA-G 809363 443-02-00342 LPR 2.4 mm PA"
 1498 |     }
 1499 |   },
 1500 |   {
 1501 |     "productId": "809364",
 1502 |     "categoryId": "fittings",
 1503 |     "productTypeId": "luer-fittings",
 1504 |     "seriesId": "lpr",
 1505 |     "cardTitle": {
 1506 |       "zh": "旋转锁圈公鲁尔接头",
 1507 |       "en": "旋转锁圈公鲁尔接头"
 1508 |     },
 1509 |     "cardSubtitle": {
 1510 |       "zh": "适配2.4 mm内径软管\nPA材质｜紫色",
 1511 |       "en": "适配2.4 mm内径软管\nPA材质｜紫色"
 1512 |     },
 1513 |     "filters": {
 1514 |       "filter01": "公鲁尔接头",
 1515 |       "filter02": "LPR 旋转锁圈",
 1516 |       "filter03": "2.4 mm",
 1517 |       "filter05": "PA",
 1518 |       "filter06": "紫色"
 1519 |     },
 1520 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-U.jpg",
 1521 |     "detailSlug": "lpr-24-pa-u",
 1522 |     "status": "active",
 1523 |     "sortOrder": 52,
 1524 |     "searchKeywords": {
 1525 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-U LPR-24-PA-U 809364 443-02-00343 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 紫色",
 1526 |       "en": "LPR-24-PA-U 809364 443-02-00343 LPR 2.4 mm PA"
 1527 |     }
 1528 |   },
 1529 |   {
 1530 |     "productId": "809365",
 1531 |     "categoryId": "fittings",
 1532 |     "productTypeId": "luer-fittings",
 1533 |     "seriesId": "lpr",
 1534 |     "cardTitle": {
 1535 |       "zh": "旋转锁圈公鲁尔接头",
 1536 |       "en": "旋转锁圈公鲁尔接头"
 1537 |     },
 1538 |     "cardSubtitle": {
 1539 |       "zh": "适配2.4 mm内径软管\nPA材质｜橙色",
 1540 |       "en": "适配2.4 mm内径软管\nPA材质｜橙色"
 1541 |     },
 1542 |     "filters": {
 1543 |       "filter01": "公鲁尔接头",
 1544 |       "filter02": "LPR 旋转锁圈",
 1545 |       "filter03": "2.4 mm",
 1546 |       "filter05": "PA",
 1547 |       "filter06": "橙色"
 1548 |     },
 1549 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-O.jpg",
 1550 |     "detailSlug": "lpr-24-pa-o",
 1551 |     "status": "active",
 1552 |     "sortOrder": 53,
 1553 |     "searchKeywords": {
 1554 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PA-O LPR-24-PA-O 809365 443-02-00344 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PA 橙色",
 1555 |       "en": "LPR-24-PA-O 809365 443-02-00344 LPR 2.4 mm PA"
 1556 |     }
 1557 |   },
 1558 |   {
 1559 |     "productId": "809368",
 1560 |     "categoryId": "fittings",
 1561 |     "productTypeId": "luer-fittings",
 1562 |     "seriesId": "lpr",
 1563 |     "cardTitle": {
 1564 |       "zh": "旋转锁圈公鲁尔接头",
 1565 |       "en": "旋转锁圈公鲁尔接头"
 1566 |     },
 1567 |     "cardSubtitle": {
 1568 |       "zh": "适配3.2 mm内径软管\nPA材质｜红色",
 1569 |       "en": "适配3.2 mm内径软管\nPA材质｜红色"
 1570 |     },
 1571 |     "filters": {
 1572 |       "filter01": "公鲁尔接头",
 1573 |       "filter02": "LPR 旋转锁圈",
 1574 |       "filter03": "3.2 mm",
 1575 |       "filter05": "PA",
 1576 |       "filter06": "红色"
 1577 |     },
 1578 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-R.jpg",
 1579 |     "detailSlug": "lpr-32-pa-r",
 1580 |     "status": "active",
 1581 |     "sortOrder": 54,
 1582 |     "searchKeywords": {
 1583 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-R LPR-32-PA-R 809368 443-02-00347 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 红色",
 1584 |       "en": "LPR-32-PA-R 809368 443-02-00347 LPR 3.2 mm PA"
 1585 |     }
 1586 |   },
 1587 |   {
 1588 |     "productId": "809372",
 1589 |     "categoryId": "fittings",
 1590 |     "productTypeId": "luer-fittings",
 1591 |     "seriesId": "lpr",
 1592 |     "cardTitle": {
 1593 |       "zh": "旋转锁圈公鲁尔接头",
 1594 |       "en": "旋转锁圈公鲁尔接头"
 1595 |     },
 1596 |     "cardSubtitle": {
 1597 |       "zh": "适配3.2 mm内径软管\nPA材质｜绿色",
 1598 |       "en": "适配3.2 mm内径软管\nPA材质｜绿色"
 1599 |     },
 1600 |     "filters": {
 1601 |       "filter01": "公鲁尔接头",
 1602 |       "filter02": "LPR 旋转锁圈",
 1603 |       "filter03": "3.2 mm",
 1604 |       "filter05": "PA",
 1605 |       "filter06": "绿色"
 1606 |     },
 1607 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-G.jpg",
 1608 |     "detailSlug": "lpr-32-pa-g",
 1609 |     "status": "active",
 1610 |     "sortOrder": 55,
 1611 |     "searchKeywords": {
 1612 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-G LPR-32-PA-G 809372 443-02-00348 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 绿色",
 1613 |       "en": "LPR-32-PA-G 809372 443-02-00348 LPR 3.2 mm PA"
 1614 |     }
 1615 |   },
 1616 |   {
 1617 |     "productId": "809373",
 1618 |     "categoryId": "fittings",
 1619 |     "productTypeId": "luer-fittings",
 1620 |     "seriesId": "lpr",
 1621 |     "cardTitle": {
 1622 |       "zh": "旋转锁圈公鲁尔接头",
 1623 |       "en": "旋转锁圈公鲁尔接头"
 1624 |     },
 1625 |     "cardSubtitle": {
 1626 |       "zh": "适配3.2 mm内径软管\nPA材质｜紫色",
 1627 |       "en": "适配3.2 mm内径软管\nPA材质｜紫色"
 1628 |     },
 1629 |     "filters": {
 1630 |       "filter01": "公鲁尔接头",
 1631 |       "filter02": "LPR 旋转锁圈",
 1632 |       "filter03": "3.2 mm",
 1633 |       "filter05": "PA",
 1634 |       "filter06": "紫色"
 1635 |     },
 1636 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-U.jpg",
 1637 |     "detailSlug": "lpr-32-pa-u",
 1638 |     "status": "active",
 1639 |     "sortOrder": 56,
 1640 |     "searchKeywords": {
 1641 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-U LPR-32-PA-U 809373 443-02-00349 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 紫色",
 1642 |       "en": "LPR-32-PA-U 809373 443-02-00349 LPR 3.2 mm PA"
 1643 |     }
 1644 |   },
 1645 |   {
 1646 |     "productId": "809402",
 1647 |     "categoryId": "fittings",
 1648 |     "productTypeId": "luer-fittings",
 1649 |     "seriesId": "lpr",
 1650 |     "cardTitle": {
 1651 |       "zh": "旋转锁圈公鲁尔接头",
 1652 |       "en": "旋转锁圈公鲁尔接头"
 1653 |     },
 1654 |     "cardSubtitle": {
 1655 |       "zh": "适配3.2 mm内径软管\nPA材质｜橙色",
 1656 |       "en": "适配3.2 mm内径软管\nPA材质｜橙色"
 1657 |     },
 1658 |     "filters": {
 1659 |       "filter01": "公鲁尔接头",
 1660 |       "filter02": "LPR 旋转锁圈",
 1661 |       "filter03": "3.2 mm",
 1662 |       "filter05": "PA",
 1663 |       "filter06": "橙色"
 1664 |     },
 1665 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-O.jpg",
 1666 |     "detailSlug": "lpr-32-pa-o",
 1667 |     "status": "active",
 1668 |     "sortOrder": 57,
 1669 |     "searchKeywords": {
 1670 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-O LPR-32-PA-O 809402 443-02-00350 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 橙色",
 1671 |       "en": "LPR-32-PA-O 809402 443-02-00350 LPR 3.2 mm PA"
 1672 |     }
 1673 |   },
 1674 |   {
 1675 |     "productId": "809403",
 1676 |     "categoryId": "fittings",
 1677 |     "productTypeId": "luer-fittings",
 1678 |     "seriesId": "lpr",
 1679 |     "cardTitle": {
 1680 |       "zh": "旋转锁圈公鲁尔接头",
 1681 |       "en": "旋转锁圈公鲁尔接头"
 1682 |     },
 1683 |     "cardSubtitle": {
 1684 |       "zh": "适配3.2 mm内径软管\nPA材质｜黄色",
 1685 |       "en": "适配3.2 mm内径软管\nPA材质｜黄色"
 1686 |     },
 1687 |     "filters": {
 1688 |       "filter01": "公鲁尔接头",
 1689 |       "filter02": "LPR 旋转锁圈",
 1690 |       "filter03": "3.2 mm",
 1691 |       "filter05": "PA",
 1692 |       "filter06": "黄色"
 1693 |     },
 1694 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-Y.jpg",
 1695 |     "detailSlug": "lpr-32-pa-y",
 1696 |     "status": "active",
 1697 |     "sortOrder": 58,
 1698 |     "searchKeywords": {
 1699 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-Y LPR-32-PA-Y 809403 443-02-00351 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 黄色",
 1700 |       "en": "LPR-32-PA-Y 809403 443-02-00351 LPR 3.2 mm PA"
 1701 |     }
 1702 |   },
 1703 |   {
 1704 |     "productId": "809866",
 1705 |     "categoryId": "fittings",
 1706 |     "productTypeId": "luer-fittings",
 1707 |     "seriesId": "lpr",
 1708 |     "cardTitle": {
 1709 |       "zh": "旋转锁圈公鲁尔接头",
 1710 |       "en": "旋转锁圈公鲁尔接头"
 1711 |     },
 1712 |     "cardSubtitle": {
 1713 |       "zh": "适配2.4 mm内径软管\nPP材质｜橙色",
 1714 |       "en": "适配2.4 mm内径软管\nPP材质｜橙色"
 1715 |     },
 1716 |     "filters": {
 1717 |       "filter01": "公鲁尔接头",
 1718 |       "filter02": "LPR 旋转锁圈",
 1719 |       "filter03": "2.4 mm",
 1720 |       "filter05": "PP",
 1721 |       "filter06": "橙色"
 1722 |     },
 1723 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-O.jpg",
 1724 |     "detailSlug": "lpr-24-pp-o-809866",
 1725 |     "status": "active",
 1726 |     "sortOrder": 59,
 1727 |     "searchKeywords": {
 1728 |       "zh": "旋转锁圈公鲁尔接头 LPR-24-PP-O LPR-24-PP-O 809866 443-02-00619 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 2.4 mm PP 橙色",
 1729 |       "en": "LPR-24-PP-O 809866 443-02-00619 LPR 2.4 mm PP"
 1730 |     }
 1731 |   },
 1732 |   {
 1733 |     "productId": "809692",
 1734 |     "categoryId": "fittings",
 1735 |     "productTypeId": "luer-fittings",
 1736 |     "seriesId": "lpr",
 1737 |     "cardTitle": {
 1738 |       "zh": "旋转锁圈公鲁尔接头",
 1739 |       "en": "旋转锁圈公鲁尔接头"
 1740 |     },
 1741 |     "cardSubtitle": {
 1742 |       "zh": "适配3.2 mm内径软管\nPP材质｜绿色",
 1743 |       "en": "适配3.2 mm内径软管\nPP材质｜绿色"
 1744 |     },
 1745 |     "filters": {
 1746 |       "filter01": "公鲁尔接头",
 1747 |       "filter02": "LPR 旋转锁圈",
 1748 |       "filter03": "3.2 mm",
 1749 |       "filter05": "PP",
 1750 |       "filter06": "绿色"
 1751 |     },
 1752 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-G.jpg",
 1753 |     "detailSlug": "lpr-32-pp-g",
 1754 |     "status": "active",
 1755 |     "sortOrder": 60,
 1756 |     "searchKeywords": {
 1757 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PP-G LPR-32-PP-G 809692 443-02-00686 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PP 绿色",
 1758 |       "en": "LPR-32-PP-G 809692 443-02-00686 LPR 3.2 mm PP"
 1759 |     }
 1760 |   },
 1761 |   {
 1762 |     "productId": "809367",
 1763 |     "categoryId": "fittings",
 1764 |     "productTypeId": "luer-fittings",
 1765 |     "seriesId": "lpr",
 1766 |     "cardTitle": {
 1767 |       "zh": "旋转锁圈公鲁尔接头",
 1768 |       "en": "旋转锁圈公鲁尔接头"
 1769 |     },
 1770 |     "cardSubtitle": {
 1771 |       "zh": "适配3.2 mm内径软管\nPA材质｜白色",
 1772 |       "en": "适配3.2 mm内径软管\nPA材质｜白色"
 1773 |     },
 1774 |     "filters": {
 1775 |       "filter01": "公鲁尔接头",
 1776 |       "filter02": "LPR 旋转锁圈",
 1777 |       "filter03": "3.2 mm",
 1778 |       "filter05": "PA",
 1779 |       "filter06": "白色"
 1780 |     },
 1781 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-W.jpg",
 1782 |     "detailSlug": "lpr-32-pa-w",
 1783 |     "status": "active",
 1784 |     "sortOrder": 61,
 1785 |     "searchKeywords": {
 1786 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PA-W LPR-32-PA-W 809367 443-02-00687 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PA 白色",
 1787 |       "en": "LPR-32-PA-W 809367 443-02-00687 LPR 3.2 mm PA"
 1788 |     }
 1789 |   },
 1790 |   {
 1791 |     "productId": "809932",
 1792 |     "categoryId": "fittings",
 1793 |     "productTypeId": "luer-fittings",
 1794 |     "seriesId": "lpr",
 1795 |     "cardTitle": {
 1796 |       "zh": "旋转锁圈公鲁尔接头",
 1797 |       "en": "旋转锁圈公鲁尔接头"
 1798 |     },
 1799 |     "cardSubtitle": {
 1800 |       "zh": "适配3.2 mm内径软管\nPVDF材质｜本色",
 1801 |       "en": "适配3.2 mm内径软管\nPVDF材质｜本色"
 1802 |     },
 1803 |     "filters": {
 1804 |       "filter01": "公鲁尔接头",
 1805 |       "filter02": "LPR 旋转锁圈",
 1806 |       "filter03": "3.2 mm",
 1807 |       "filter05": "PVDF",
 1808 |       "filter06": "本色"
 1809 |     },
 1810 |     "imageCard": "",
 1811 |     "detailSlug": "lpr-32-pv-n",
 1812 |     "status": "active",
 1813 |     "sortOrder": 62,
 1814 |     "searchKeywords": {
 1815 |       "zh": "旋转锁圈公鲁尔接头 LPR-32-PV-N LPR-32-PV-N 809932 443-02-00697 公鲁尔接头 LPR 旋转锁圈公鲁尔接头 3.2 mm PVDF 本色",
 1816 |       "en": "LPR-32-PV-N 809932 443-02-00697 LPR 3.2 mm PVDF"
 1817 |     }
 1818 |   },
 1819 |   {
 1820 |     "productId": "809669",
 1821 |     "categoryId": "fittings",
 1822 |     "productTypeId": "luer-fittings",
 1823 |     "seriesId": "lps",
 1824 |     "cardTitle": {
 1825 |       "zh": "固定锁圈公鲁尔接头",
 1826 |       "en": "固定锁圈公鲁尔接头"
 1827 |     },
 1828 |     "cardSubtitle": {
 1829 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
 1830 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
 1831 |     },
 1832 |     "filters": {
 1833 |       "filter01": "公鲁尔接头",
 1834 |       "filter02": "LPS 固定锁圈",
 1835 |       "filter03": "1.6 mm",
 1836 |       "filter05": "PP",
 1837 |       "filter06": "本色"
 1838 |     },
 1839 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-N.jpg",
 1840 |     "detailSlug": "lps-16-pp-n",
 1841 |     "status": "active",
 1842 |     "sortOrder": 63,
 1843 |     "searchKeywords": {
 1844 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-N LPS-16-PP-N 809669 443-02-00233 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 本色",
 1845 |       "en": "LPS-16-PP-N 809669 443-02-00233 LPS 1.6 mm PP"
 1846 |     }
 1847 |   },
 1848 |   {
 1849 |     "productId": "809670",
 1850 |     "categoryId": "fittings",
 1851 |     "productTypeId": "luer-fittings",
 1852 |     "seriesId": "lps",
 1853 |     "cardTitle": {
 1854 |       "zh": "固定锁圈公鲁尔接头",
 1855 |       "en": "固定锁圈公鲁尔接头"
 1856 |     },
 1857 |     "cardSubtitle": {
 1858 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
 1859 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
 1860 |     },
 1861 |     "filters": {
 1862 |       "filter01": "公鲁尔接头",
 1863 |       "filter02": "LPS 固定锁圈",
 1864 |       "filter03": "2.4 mm",
 1865 |       "filter05": "PP",
 1866 |       "filter06": "本色"
 1867 |     },
 1868 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-N.jpg",
 1869 |     "detailSlug": "lps-24-pp-n",
 1870 |     "status": "active",
 1871 |     "sortOrder": 64,
 1872 |     "searchKeywords": {
 1873 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-N LPS-24-PP-N 809670 443-02-00234 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 本色",
 1874 |       "en": "LPS-24-PP-N 809670 443-02-00234 LPS 2.4 mm PP"
 1875 |     }
 1876 |   },
 1877 |   {
 1878 |     "productId": "809671",
 1879 |     "categoryId": "fittings",
 1880 |     "productTypeId": "luer-fittings",
 1881 |     "seriesId": "lps",
 1882 |     "cardTitle": {
 1883 |       "zh": "固定锁圈公鲁尔接头",
 1884 |       "en": "固定锁圈公鲁尔接头"
 1885 |     },
 1886 |     "cardSubtitle": {
 1887 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
 1888 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
 1889 |     },
 1890 |     "filters": {
 1891 |       "filter01": "公鲁尔接头",
 1892 |       "filter02": "LPS 固定锁圈",
 1893 |       "filter03": "3.2 mm",
 1894 |       "filter05": "PP",
 1895 |       "filter06": "本色"
 1896 |     },
 1897 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-N.jpg",
 1898 |     "detailSlug": "lps-32-pp-n",
 1899 |     "status": "active",
 1900 |     "sortOrder": 65,
 1901 |     "searchKeywords": {
 1902 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-N LPS-32-PP-N 809671 443-02-00235 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 本色",
 1903 |       "en": "LPS-32-PP-N 809671 443-02-00235 LPS 3.2 mm PP"
 1904 |     }
 1905 |   },
 1906 |   {
 1907 |     "productId": "809139",
 1908 |     "categoryId": "fittings",
 1909 |     "productTypeId": "luer-fittings",
 1910 |     "seriesId": "lps",
 1911 |     "cardTitle": {
 1912 |       "zh": "固定锁圈公鲁尔接头",
 1913 |       "en": "固定锁圈公鲁尔接头"
 1914 |     },
 1915 |     "cardSubtitle": {
 1916 |       "zh": "适配3.2 mm内径软管\nPP材质｜蓝色",
 1917 |       "en": "适配3.2 mm内径软管\nPP材质｜蓝色"
 1918 |     },
 1919 |     "filters": {
 1920 |       "filter01": "公鲁尔接头",
 1921 |       "filter02": "LPS 固定锁圈",
 1922 |       "filter03": "3.2 mm",
 1923 |       "filter05": "PP",
 1924 |       "filter06": "蓝色"
 1925 |     },
 1926 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-B.jpg",
 1927 |     "detailSlug": "lps-32-pp-b",
 1928 |     "status": "active",
 1929 |     "sortOrder": 66,
 1930 |     "searchKeywords": {
 1931 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-B LPS-32-PP-B 809139 443-02-00290 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 蓝色",
 1932 |       "en": "LPS-32-PP-B 809139 443-02-00290 LPS 3.2 mm PP"
 1933 |     }
 1934 |   },
 1935 |   {
 1936 |     "productId": "809140",
 1937 |     "categoryId": "fittings",
 1938 |     "productTypeId": "luer-fittings",
 1939 |     "seriesId": "lps",
 1940 |     "cardTitle": {
 1941 |       "zh": "固定锁圈公鲁尔接头",
 1942 |       "en": "固定锁圈公鲁尔接头"
 1943 |     },
 1944 |     "cardSubtitle": {
 1945 |       "zh": "适配3.2 mm内径软管\nPP材质｜紫色",
 1946 |       "en": "适配3.2 mm内径软管\nPP材质｜紫色"
 1947 |     },
 1948 |     "filters": {
 1949 |       "filter01": "公鲁尔接头",
 1950 |       "filter02": "LPS 固定锁圈",
 1951 |       "filter03": "3.2 mm",
 1952 |       "filter05": "PP",
 1953 |       "filter06": "紫色"
 1954 |     },
 1955 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-U.jpg",
 1956 |     "detailSlug": "lps-32-pp-u",
 1957 |     "status": "active",
 1958 |     "sortOrder": 67,
 1959 |     "searchKeywords": {
 1960 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-U LPS-32-PP-U 809140 443-02-00291 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 紫色",
 1961 |       "en": "LPS-32-PP-U 809140 443-02-00291 LPS 3.2 mm PP"
 1962 |     }
 1963 |   },
 1964 |   {
 1965 |     "productId": "809130",
 1966 |     "categoryId": "fittings",
 1967 |     "productTypeId": "luer-fittings",
 1968 |     "seriesId": "lps",
 1969 |     "cardTitle": {
 1970 |       "zh": "固定锁圈公鲁尔接头",
 1971 |       "en": "固定锁圈公鲁尔接头"
 1972 |     },
 1973 |     "cardSubtitle": {
 1974 |       "zh": "适配1.6 mm内径软管\nPP材质｜白色",
 1975 |       "en": "适配1.6 mm内径软管\nPP材质｜白色"
 1976 |     },
 1977 |     "filters": {
 1978 |       "filter01": "公鲁尔接头",
 1979 |       "filter02": "LPS 固定锁圈",
 1980 |       "filter03": "1.6 mm",
 1981 |       "filter05": "PP",
 1982 |       "filter06": "白色"
 1983 |     },
 1984 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-W.jpg",
 1985 |     "detailSlug": "lps-16-pp-w",
 1986 |     "status": "active",
 1987 |     "sortOrder": 68,
 1988 |     "searchKeywords": {
 1989 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-W LPS-16-PP-W 809130 443-02-00292 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 白色",
 1990 |       "en": "LPS-16-PP-W 809130 443-02-00292 LPS 1.6 mm PP"
 1991 |     }
 1992 |   },
 1993 |   {
 1994 |     "productId": "809149",
 1995 |     "categoryId": "fittings",
 1996 |     "productTypeId": "luer-fittings",
 1997 |     "seriesId": "lps",
 1998 |     "cardTitle": {
 1999 |       "zh": "固定锁圈公鲁尔接头",
 2000 |       "en": "固定锁圈公鲁尔接头"
 2001 |     },
 2002 |     "cardSubtitle": {
 2003 |       "zh": "适配1.6 mm内径软管\nPP材质｜蓝色",
 2004 |       "en": "适配1.6 mm内径软管\nPP材质｜蓝色"
 2005 |     },
 2006 |     "filters": {
 2007 |       "filter01": "公鲁尔接头",
 2008 |       "filter02": "LPS 固定锁圈",
 2009 |       "filter03": "1.6 mm",
 2010 |       "filter05": "PP",
 2011 |       "filter06": "蓝色"
 2012 |     },
 2013 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-B.jpg",
 2014 |     "detailSlug": "lps-16-pp-b",
 2015 |     "status": "active",
 2016 |     "sortOrder": 69,
 2017 |     "searchKeywords": {
 2018 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-B LPS-16-PP-B 809149 443-02-00293 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 蓝色",
 2019 |       "en": "LPS-16-PP-B 809149 443-02-00293 LPS 1.6 mm PP"
 2020 |     }
 2021 |   },
 2022 |   {
 2023 |     "productId": "809150",
 2024 |     "categoryId": "fittings",
 2025 |     "productTypeId": "luer-fittings",
 2026 |     "seriesId": "lps",
 2027 |     "cardTitle": {
 2028 |       "zh": "固定锁圈公鲁尔接头",
 2029 |       "en": "固定锁圈公鲁尔接头"
 2030 |     },
 2031 |     "cardSubtitle": {
 2032 |       "zh": "适配1.6 mm内径软管\nPP材质｜红色",
 2033 |       "en": "适配1.6 mm内径软管\nPP材质｜红色"
 2034 |     },
 2035 |     "filters": {
 2036 |       "filter01": "公鲁尔接头",
 2037 |       "filter02": "LPS 固定锁圈",
 2038 |       "filter03": "1.6 mm",
 2039 |       "filter05": "PP",
 2040 |       "filter06": "红色"
 2041 |     },
 2042 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-R.jpg",
 2043 |     "detailSlug": "lps-16-pp-r",
 2044 |     "status": "active",
 2045 |     "sortOrder": 70,
 2046 |     "searchKeywords": {
 2047 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-R LPS-16-PP-R 809150 443-02-00294 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 红色",
 2048 |       "en": "LPS-16-PP-R 809150 443-02-00294 LPS 1.6 mm PP"
 2049 |     }
 2050 |   },
 2051 |   {
 2052 |     "productId": "809159",
 2053 |     "categoryId": "fittings",
 2054 |     "productTypeId": "luer-fittings",
 2055 |     "seriesId": "lps",
 2056 |     "cardTitle": {
 2057 |       "zh": "固定锁圈公鲁尔接头",
 2058 |       "en": "固定锁圈公鲁尔接头"
 2059 |     },
 2060 |     "cardSubtitle": {
 2061 |       "zh": "适配1.6 mm内径软管\nPP材质｜绿色",
 2062 |       "en": "适配1.6 mm内径软管\nPP材质｜绿色"
 2063 |     },
 2064 |     "filters": {
 2065 |       "filter01": "公鲁尔接头",
 2066 |       "filter02": "LPS 固定锁圈",
 2067 |       "filter03": "1.6 mm",
 2068 |       "filter05": "PP",
 2069 |       "filter06": "绿色"
 2070 |     },
 2071 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-G.jpg",
 2072 |     "detailSlug": "lps-16-pp-g",
 2073 |     "status": "active",
 2074 |     "sortOrder": 71,
 2075 |     "searchKeywords": {
 2076 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-G LPS-16-PP-G 809159 443-02-00295 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 绿色",
 2077 |       "en": "LPS-16-PP-G 809159 443-02-00295 LPS 1.6 mm PP"
 2078 |     }
 2079 |   },
 2080 |   {
 2081 |     "productId": "809160",
 2082 |     "categoryId": "fittings",
 2083 |     "productTypeId": "luer-fittings",
 2084 |     "seriesId": "lps",
 2085 |     "cardTitle": {
 2086 |       "zh": "固定锁圈公鲁尔接头",
 2087 |       "en": "固定锁圈公鲁尔接头"
 2088 |     },
 2089 |     "cardSubtitle": {
 2090 |       "zh": "适配1.6 mm内径软管\nPP材质｜紫色",
 2091 |       "en": "适配1.6 mm内径软管\nPP材质｜紫色"
 2092 |     },
 2093 |     "filters": {
 2094 |       "filter01": "公鲁尔接头",
 2095 |       "filter02": "LPS 固定锁圈",
 2096 |       "filter03": "1.6 mm",
 2097 |       "filter05": "PP",
 2098 |       "filter06": "紫色"
 2099 |     },
 2100 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-U.jpg",
 2101 |     "detailSlug": "lps-16-pp-u",
 2102 |     "status": "active",
 2103 |     "sortOrder": 72,
 2104 |     "searchKeywords": {
 2105 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-U LPS-16-PP-U 809160 443-02-00296 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 紫色",
 2106 |       "en": "LPS-16-PP-U 809160 443-02-00296 LPS 1.6 mm PP"
 2107 |     }
 2108 |   },
 2109 |   {
 2110 |     "productId": "809169",
 2111 |     "categoryId": "fittings",
 2112 |     "productTypeId": "luer-fittings",
 2113 |     "seriesId": "lps",
 2114 |     "cardTitle": {
 2115 |       "zh": "固定锁圈公鲁尔接头",
 2116 |       "en": "固定锁圈公鲁尔接头"
 2117 |     },
 2118 |     "cardSubtitle": {
 2119 |       "zh": "适配1.6 mm内径软管\nPP材质｜橙色",
 2120 |       "en": "适配1.6 mm内径软管\nPP材质｜橙色"
 2121 |     },
 2122 |     "filters": {
 2123 |       "filter01": "公鲁尔接头",
 2124 |       "filter02": "LPS 固定锁圈",
 2125 |       "filter03": "1.6 mm",
 2126 |       "filter05": "PP",
 2127 |       "filter06": "橙色"
 2128 |     },
 2129 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-O.jpg",
 2130 |     "detailSlug": "lps-16-pp-o",
 2131 |     "status": "active",
 2132 |     "sortOrder": 73,
 2133 |     "searchKeywords": {
 2134 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-O LPS-16-PP-O 809169 443-02-00297 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 橙色",
 2135 |       "en": "LPS-16-PP-O 809169 443-02-00297 LPS 1.6 mm PP"
 2136 |     }
 2137 |   },
 2138 |   {
 2139 |     "productId": "809170",
 2140 |     "categoryId": "fittings",
 2141 |     "productTypeId": "luer-fittings",
 2142 |     "seriesId": "lps",
 2143 |     "cardTitle": {
 2144 |       "zh": "固定锁圈公鲁尔接头",
 2145 |       "en": "固定锁圈公鲁尔接头"
 2146 |     },
 2147 |     "cardSubtitle": {
 2148 |       "zh": "适配1.6 mm内径软管\nPP材质｜黄色",
 2149 |       "en": "适配1.6 mm内径软管\nPP材质｜黄色"
 2150 |     },
 2151 |     "filters": {
 2152 |       "filter01": "公鲁尔接头",
 2153 |       "filter02": "LPS 固定锁圈",
 2154 |       "filter03": "1.6 mm",
 2155 |       "filter05": "PP",
 2156 |       "filter06": "黄色"
 2157 |     },
 2158 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-Y.jpg",
 2159 |     "detailSlug": "lps-16-pp-y",
 2160 |     "status": "active",
 2161 |     "sortOrder": 74,
 2162 |     "searchKeywords": {
 2163 |       "zh": "固定锁圈公鲁尔接头 LPS-16-PP-Y LPS-16-PP-Y 809170 443-02-00298 公鲁尔接头 LPS 固定锁圈公鲁尔接头 1.6 mm PP 黄色",
 2164 |       "en": "LPS-16-PP-Y 809170 443-02-00298 LPS 1.6 mm PP"
 2165 |     }
 2166 |   },
 2167 |   {
 2168 |     "productId": "809188",
 2169 |     "categoryId": "fittings",
 2170 |     "productTypeId": "luer-fittings",
 2171 |     "seriesId": "lps",
 2172 |     "cardTitle": {
 2173 |       "zh": "固定锁圈公鲁尔接头",
 2174 |       "en": "固定锁圈公鲁尔接头"
 2175 |     },
 2176 |     "cardSubtitle": {
 2177 |       "zh": "适配2.4 mm内径软管\nPP材质｜白色",
 2178 |       "en": "适配2.4 mm内径软管\nPP材质｜白色"
 2179 |     },
 2180 |     "filters": {
 2181 |       "filter01": "公鲁尔接头",
 2182 |       "filter02": "LPS 固定锁圈",
 2183 |       "filter03": "2.4 mm",
 2184 |       "filter05": "PP",
 2185 |       "filter06": "白色"
 2186 |     },
 2187 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-W.jpg",
 2188 |     "detailSlug": "lps-24-pp-w",
 2189 |     "status": "active",
 2190 |     "sortOrder": 75,
 2191 |     "searchKeywords": {
 2192 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-W LPS-24-PP-W 809188 443-02-00299 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 白色",
 2193 |       "en": "LPS-24-PP-W 809188 443-02-00299 LPS 2.4 mm PP"
 2194 |     }
 2195 |   },
 2196 |   {
 2197 |     "productId": "809260",
 2198 |     "categoryId": "fittings",
 2199 |     "productTypeId": "luer-fittings",
 2200 |     "seriesId": "lps",
 2201 |     "cardTitle": {
 2202 |       "zh": "固定锁圈公鲁尔接头",
 2203 |       "en": "固定锁圈公鲁尔接头"
 2204 |     },
 2205 |     "cardSubtitle": {
 2206 |       "zh": "适配2.4 mm内径软管\nPP材质｜蓝色",
 2207 |       "en": "适配2.4 mm内径软管\nPP材质｜蓝色"
 2208 |     },
 2209 |     "filters": {
 2210 |       "filter01": "公鲁尔接头",
 2211 |       "filter02": "LPS 固定锁圈",
 2212 |       "filter03": "2.4 mm",
 2213 |       "filter05": "PP",
 2214 |       "filter06": "蓝色"
 2215 |     },
 2216 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-B.jpg",
 2217 |     "detailSlug": "lps-24-pp-b",
 2218 |     "status": "active",
 2219 |     "sortOrder": 76,
 2220 |     "searchKeywords": {
 2221 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-B LPS-24-PP-B 809260 443-02-00300 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 蓝色",
 2222 |       "en": "LPS-24-PP-B 809260 443-02-00300 LPS 2.4 mm PP"
 2223 |     }
 2224 |   },
 2225 |   {
 2226 |     "productId": "809261",
 2227 |     "categoryId": "fittings",
 2228 |     "productTypeId": "luer-fittings",
 2229 |     "seriesId": "lps",
 2230 |     "cardTitle": {
 2231 |       "zh": "固定锁圈公鲁尔接头",
 2232 |       "en": "固定锁圈公鲁尔接头"
 2233 |     },
 2234 |     "cardSubtitle": {
 2235 |       "zh": "适配2.4 mm内径软管\nPP材质｜红色",
 2236 |       "en": "适配2.4 mm内径软管\nPP材质｜红色"
 2237 |     },
 2238 |     "filters": {
 2239 |       "filter01": "公鲁尔接头",
 2240 |       "filter02": "LPS 固定锁圈",
 2241 |       "filter03": "2.4 mm",
 2242 |       "filter05": "PP",
 2243 |       "filter06": "红色"
 2244 |     },
 2245 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-R.jpg",
 2246 |     "detailSlug": "lps-24-pp-r",
 2247 |     "status": "active",
 2248 |     "sortOrder": 77,
 2249 |     "searchKeywords": {
 2250 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-R LPS-24-PP-R 809261 443-02-00301 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 红色",
 2251 |       "en": "LPS-24-PP-R 809261 443-02-00301 LPS 2.4 mm PP"
 2252 |     }
 2253 |   },
 2254 |   {
 2255 |     "productId": "809270",
 2256 |     "categoryId": "fittings",
 2257 |     "productTypeId": "luer-fittings",
 2258 |     "seriesId": "lps",
 2259 |     "cardTitle": {
 2260 |       "zh": "固定锁圈公鲁尔接头",
 2261 |       "en": "固定锁圈公鲁尔接头"
 2262 |     },
 2263 |     "cardSubtitle": {
 2264 |       "zh": "适配2.4 mm内径软管\nPP材质｜绿色",
 2265 |       "en": "适配2.4 mm内径软管\nPP材质｜绿色"
 2266 |     },
 2267 |     "filters": {
 2268 |       "filter01": "公鲁尔接头",
 2269 |       "filter02": "LPS 固定锁圈",
 2270 |       "filter03": "2.4 mm",
 2271 |       "filter05": "PP",
 2272 |       "filter06": "绿色"
 2273 |     },
 2274 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-G.jpg",
 2275 |     "detailSlug": "lps-24-pp-g",
 2276 |     "status": "active",
 2277 |     "sortOrder": 78,
 2278 |     "searchKeywords": {
 2279 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-G LPS-24-PP-G 809270 443-02-00302 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 绿色",
 2280 |       "en": "LPS-24-PP-G 809270 443-02-00302 LPS 2.4 mm PP"
 2281 |     }
 2282 |   },
 2283 |   {
 2284 |     "productId": "809271",
 2285 |     "categoryId": "fittings",
 2286 |     "productTypeId": "luer-fittings",
 2287 |     "seriesId": "lps",
 2288 |     "cardTitle": {
 2289 |       "zh": "固定锁圈公鲁尔接头",
 2290 |       "en": "固定锁圈公鲁尔接头"
 2291 |     },
 2292 |     "cardSubtitle": {
 2293 |       "zh": "适配2.4 mm内径软管\nPP材质｜紫色",
 2294 |       "en": "适配2.4 mm内径软管\nPP材质｜紫色"
 2295 |     },
 2296 |     "filters": {
 2297 |       "filter01": "公鲁尔接头",
 2298 |       "filter02": "LPS 固定锁圈",
 2299 |       "filter03": "2.4 mm",
 2300 |       "filter05": "PP",
 2301 |       "filter06": "紫色"
 2302 |     },
 2303 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-U.jpg",
 2304 |     "detailSlug": "lps-24-pp-u",
 2305 |     "status": "active",
 2306 |     "sortOrder": 79,
 2307 |     "searchKeywords": {
 2308 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-U LPS-24-PP-U 809271 443-02-00303 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 紫色",
 2309 |       "en": "LPS-24-PP-U 809271 443-02-00303 LPS 2.4 mm PP"
 2310 |     }
 2311 |   },
 2312 |   {
 2313 |     "productId": "809272",
 2314 |     "categoryId": "fittings",
 2315 |     "productTypeId": "luer-fittings",
 2316 |     "seriesId": "lps",
 2317 |     "cardTitle": {
 2318 |       "zh": "固定锁圈公鲁尔接头",
 2319 |       "en": "固定锁圈公鲁尔接头"
 2320 |     },
 2321 |     "cardSubtitle": {
 2322 |       "zh": "适配2.4 mm内径软管\nPP材质｜橙色",
 2323 |       "en": "适配2.4 mm内径软管\nPP材质｜橙色"
 2324 |     },
 2325 |     "filters": {
 2326 |       "filter01": "公鲁尔接头",
 2327 |       "filter02": "LPS 固定锁圈",
 2328 |       "filter03": "2.4 mm",
 2329 |       "filter05": "PP",
 2330 |       "filter06": "橙色"
 2331 |     },
 2332 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-O.jpg",
 2333 |     "detailSlug": "lps-24-pp-o",
 2334 |     "status": "active",
 2335 |     "sortOrder": 80,
 2336 |     "searchKeywords": {
 2337 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-O LPS-24-PP-O 809272 443-02-00304 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 橙色",
 2338 |       "en": "LPS-24-PP-O 809272 443-02-00304 LPS 2.4 mm PP"
 2339 |     }
 2340 |   },
 2341 |   {
 2342 |     "productId": "809273",
 2343 |     "categoryId": "fittings",
 2344 |     "productTypeId": "luer-fittings",
 2345 |     "seriesId": "lps",
 2346 |     "cardTitle": {
 2347 |       "zh": "固定锁圈公鲁尔接头",
 2348 |       "en": "固定锁圈公鲁尔接头"
 2349 |     },
 2350 |     "cardSubtitle": {
 2351 |       "zh": "适配2.4 mm内径软管\nPP材质｜黄色",
 2352 |       "en": "适配2.4 mm内径软管\nPP材质｜黄色"
 2353 |     },
 2354 |     "filters": {
 2355 |       "filter01": "公鲁尔接头",
 2356 |       "filter02": "LPS 固定锁圈",
 2357 |       "filter03": "2.4 mm",
 2358 |       "filter05": "PP",
 2359 |       "filter06": "黄色"
 2360 |     },
 2361 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-Y.jpg",
 2362 |     "detailSlug": "lps-24-pp-y",
 2363 |     "status": "active",
 2364 |     "sortOrder": 81,
 2365 |     "searchKeywords": {
 2366 |       "zh": "固定锁圈公鲁尔接头 LPS-24-PP-Y LPS-24-PP-Y 809273 443-02-00305 公鲁尔接头 LPS 固定锁圈公鲁尔接头 2.4 mm PP 黄色",
 2367 |       "en": "LPS-24-PP-Y 809273 443-02-00305 LPS 2.4 mm PP"
 2368 |     }
 2369 |   },
 2370 |   {
 2371 |     "productId": "809274",
 2372 |     "categoryId": "fittings",
 2373 |     "productTypeId": "luer-fittings",
 2374 |     "seriesId": "lps",
 2375 |     "cardTitle": {
 2376 |       "zh": "固定锁圈公鲁尔接头",
 2377 |       "en": "固定锁圈公鲁尔接头"
 2378 |     },
 2379 |     "cardSubtitle": {
 2380 |       "zh": "适配3.2 mm内径软管\nPP材质｜白色",
 2381 |       "en": "适配3.2 mm内径软管\nPP材质｜白色"
 2382 |     },
 2383 |     "filters": {
 2384 |       "filter01": "公鲁尔接头",
 2385 |       "filter02": "LPS 固定锁圈",
 2386 |       "filter03": "3.2 mm",
 2387 |       "filter05": "PP",
 2388 |       "filter06": "白色"
 2389 |     },
 2390 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-W.jpg",
 2391 |     "detailSlug": "lps-32-pp-w",
 2392 |     "status": "active",
 2393 |     "sortOrder": 82,
 2394 |     "searchKeywords": {
 2395 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-W LPS-32-PP-W 809274 443-02-00306 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 白色",
 2396 |       "en": "LPS-32-PP-W 809274 443-02-00306 LPS 3.2 mm PP"
 2397 |     }
 2398 |   },
 2399 |   {
 2400 |     "productId": "809275",
 2401 |     "categoryId": "fittings",
 2402 |     "productTypeId": "luer-fittings",
 2403 |     "seriesId": "lps",
 2404 |     "cardTitle": {
 2405 |       "zh": "固定锁圈公鲁尔接头",
 2406 |       "en": "固定锁圈公鲁尔接头"
 2407 |     },
 2408 |     "cardSubtitle": {
 2409 |       "zh": "适配3.2 mm内径软管\nPP材质｜红色",
 2410 |       "en": "适配3.2 mm内径软管\nPP材质｜红色"
 2411 |     },
 2412 |     "filters": {
 2413 |       "filter01": "公鲁尔接头",
 2414 |       "filter02": "LPS 固定锁圈",
 2415 |       "filter03": "3.2 mm",
 2416 |       "filter05": "PP",
 2417 |       "filter06": "红色"
 2418 |     },
 2419 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-R.jpg",
 2420 |     "detailSlug": "lps-32-pp-r",
 2421 |     "status": "active",
 2422 |     "sortOrder": 83,
 2423 |     "searchKeywords": {
 2424 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-R LPS-32-PP-R 809275 443-02-00307 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 红色",
 2425 |       "en": "LPS-32-PP-R 809275 443-02-00307 LPS 3.2 mm PP"
 2426 |     }
 2427 |   },
 2428 |   {
 2429 |     "productId": "809280",
 2430 |     "categoryId": "fittings",
 2431 |     "productTypeId": "luer-fittings",
 2432 |     "seriesId": "lps",
 2433 |     "cardTitle": {
 2434 |       "zh": "固定锁圈公鲁尔接头",
 2435 |       "en": "固定锁圈公鲁尔接头"
 2436 |     },
 2437 |     "cardSubtitle": {
 2438 |       "zh": "适配3.2 mm内径软管\nPP材质｜绿色",
 2439 |       "en": "适配3.2 mm内径软管\nPP材质｜绿色"
 2440 |     },
 2441 |     "filters": {
 2442 |       "filter01": "公鲁尔接头",
 2443 |       "filter02": "LPS 固定锁圈",
 2444 |       "filter03": "3.2 mm",
 2445 |       "filter05": "PP",
 2446 |       "filter06": "绿色"
 2447 |     },
 2448 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-G.jpg",
 2449 |     "detailSlug": "lps-32-pp-g",
 2450 |     "status": "active",
 2451 |     "sortOrder": 84,
 2452 |     "searchKeywords": {
 2453 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-G LPS-32-PP-G 809280 443-02-00308 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 绿色",
 2454 |       "en": "LPS-32-PP-G 809280 443-02-00308 LPS 3.2 mm PP"
 2455 |     }
 2456 |   },
 2457 |   {
 2458 |     "productId": "809281",
 2459 |     "categoryId": "fittings",
 2460 |     "productTypeId": "luer-fittings",
 2461 |     "seriesId": "lps",
 2462 |     "cardTitle": {
 2463 |       "zh": "固定锁圈公鲁尔接头",
 2464 |       "en": "固定锁圈公鲁尔接头"
 2465 |     },
 2466 |     "cardSubtitle": {
 2467 |       "zh": "适配3.2 mm内径软管\nPP材质｜橙色",
 2468 |       "en": "适配3.2 mm内径软管\nPP材质｜橙色"
 2469 |     },
 2470 |     "filters": {
 2471 |       "filter01": "公鲁尔接头",
 2472 |       "filter02": "LPS 固定锁圈",
 2473 |       "filter03": "3.2 mm",
 2474 |       "filter05": "PP",
 2475 |       "filter06": "橙色"
 2476 |     },
 2477 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-O.jpg",
 2478 |     "detailSlug": "lps-32-pp-o",
 2479 |     "status": "active",
 2480 |     "sortOrder": 85,
 2481 |     "searchKeywords": {
 2482 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-O LPS-32-PP-O 809281 443-02-00309 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 橙色",
 2483 |       "en": "LPS-32-PP-O 809281 443-02-00309 LPS 3.2 mm PP"
 2484 |     }
 2485 |   },
 2486 |   {
 2487 |     "productId": "809282",
 2488 |     "categoryId": "fittings",
 2489 |     "productTypeId": "luer-fittings",
 2490 |     "seriesId": "lps",
 2491 |     "cardTitle": {
 2492 |       "zh": "固定锁圈公鲁尔接头",
 2493 |       "en": "固定锁圈公鲁尔接头"
 2494 |     },
 2495 |     "cardSubtitle": {
 2496 |       "zh": "适配3.2 mm内径软管\nPP材质｜黄色",
 2497 |       "en": "适配3.2 mm内径软管\nPP材质｜黄色"
 2498 |     },
 2499 |     "filters": {
 2500 |       "filter01": "公鲁尔接头",
 2501 |       "filter02": "LPS 固定锁圈",
 2502 |       "filter03": "3.2 mm",
 2503 |       "filter05": "PP",
 2504 |       "filter06": "黄色"
 2505 |     },
 2506 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-Y.jpg",
 2507 |     "detailSlug": "lps-32-pp-y",
 2508 |     "status": "active",
 2509 |     "sortOrder": 86,
 2510 |     "searchKeywords": {
 2511 |       "zh": "固定锁圈公鲁尔接头 LPS-32-PP-Y LPS-32-PP-Y 809282 443-02-00310 公鲁尔接头 LPS 固定锁圈公鲁尔接头 3.2 mm PP 黄色",
 2512 |       "en": "LPS-32-PP-Y 809282 443-02-00310 LPS 3.2 mm PP"
 2513 |     }
 2514 |   },
 2515 |   {
 2516 |     "productId": "809314",
 2517 |     "categoryId": "fittings",
 2518 |     "productTypeId": "luer-fittings",
 2519 |     "seriesId": "lp",
 2520 |     "cardTitle": {
 2521 |       "zh": "一体式公鲁尔接头",
 2522 |       "en": "一体式公鲁尔接头"
 2523 |     },
 2524 |     "cardSubtitle": {
 2525 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
 2526 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
 2527 |     },
 2528 |     "filters": {
 2529 |       "filter01": "公鲁尔接头",
 2530 |       "filter02": "LP 一体式",
 2531 |       "filter03": "3.2 mm",
 2532 |       "filter05": "PP",
 2533 |       "filter06": "本色"
 2534 |     },
 2535 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-N.jpg",
 2536 |     "detailSlug": "lp-32d-pp-n",
 2537 |     "status": "active",
 2538 |     "sortOrder": 87,
 2539 |     "searchKeywords": {
 2540 |       "zh": "一体式公鲁尔接头 LP-32D-PP-N LP-32D-PP-N 809314 443-02-00329 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PP 本色",
 2541 |       "en": "LP-32D-PP-N 809314 443-02-00329 LP 3.2 mm PP"
 2542 |     }
 2543 |   },
 2544 |   {
 2545 |     "productId": "809781",
 2546 |     "categoryId": "fittings",
 2547 |     "productTypeId": "luer-fittings",
 2548 |     "seriesId": "lp",
 2549 |     "cardTitle": {
 2550 |       "zh": "一体式公鲁尔接头",
 2551 |       "en": "一体式公鲁尔接头"
 2552 |     },
 2553 |     "cardSubtitle": {
 2554 |       "zh": "适配3.2 mm内径软管\nPA材质｜白色",
 2555 |       "en": "适配3.2 mm内径软管\nPA材质｜白色"
 2556 |     },
 2557 |     "filters": {
 2558 |       "filter01": "公鲁尔接头",
 2559 |       "filter02": "LP 一体式",
 2560 |       "filter03": "3.2 mm",
 2561 |       "filter05": "PA",
 2562 |       "filter06": "白色"
 2563 |     },
 2564 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-W.jpg",
 2565 |     "detailSlug": "lp-32d-pa-w",
 2566 |     "status": "active",
 2567 |     "sortOrder": 88,
 2568 |     "searchKeywords": {
 2569 |       "zh": "一体式公鲁尔接头 LP-32D-PA-W LP-32D-PA-W 809781 443-02-00447 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 白色",
 2570 |       "en": "LP-32D-PA-W 809781 443-02-00447 LP 3.2 mm PA"
 2571 |     }
 2572 |   },
 2573 |   {
 2574 |     "productId": "809782",
 2575 |     "categoryId": "fittings",
 2576 |     "productTypeId": "luer-fittings",
 2577 |     "seriesId": "lp",
 2578 |     "cardTitle": {
 2579 |       "zh": "一体式公鲁尔接头",
 2580 |       "en": "一体式公鲁尔接头"
 2581 |     },
 2582 |     "cardSubtitle": {
 2583 |       "zh": "适配3.2 mm内径软管\nPA材质｜蓝色",
 2584 |       "en": "适配3.2 mm内径软管\nPA材质｜蓝色"
 2585 |     },
 2586 |     "filters": {
 2587 |       "filter01": "公鲁尔接头",
 2588 |       "filter02": "LP 一体式",
 2589 |       "filter03": "3.2 mm",
 2590 |       "filter05": "PA",
 2591 |       "filter06": "蓝色"
 2592 |     },
 2593 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-B.jpg",
 2594 |     "detailSlug": "lp-32d-pa-b",
 2595 |     "status": "active",
 2596 |     "sortOrder": 89,
 2597 |     "searchKeywords": {
 2598 |       "zh": "一体式公鲁尔接头 LP-32D-PA-B LP-32D-PA-B 809782 443-02-00448 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 蓝色",
 2599 |       "en": "LP-32D-PA-B 809782 443-02-00448 LP 3.2 mm PA"
 2600 |     }
 2601 |   },
 2602 |   {
 2603 |     "productId": "809783",
 2604 |     "categoryId": "fittings",
 2605 |     "productTypeId": "luer-fittings",
 2606 |     "seriesId": "lp",
 2607 |     "cardTitle": {
 2608 |       "zh": "一体式公鲁尔接头",
 2609 |       "en": "一体式公鲁尔接头"
 2610 |     },
 2611 |     "cardSubtitle": {
 2612 |       "zh": "适配3.2 mm内径软管\nPA材质｜红色",
 2613 |       "en": "适配3.2 mm内径软管\nPA材质｜红色"
 2614 |     },
 2615 |     "filters": {
 2616 |       "filter01": "公鲁尔接头",
 2617 |       "filter02": "LP 一体式",
 2618 |       "filter03": "3.2 mm",
 2619 |       "filter05": "PA",
 2620 |       "filter06": "红色"
 2621 |     },
 2622 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-R.jpg",
 2623 |     "detailSlug": "lp-32d-pa-r",
 2624 |     "status": "active",
 2625 |     "sortOrder": 90,
 2626 |     "searchKeywords": {
 2627 |       "zh": "一体式公鲁尔接头 LP-32D-PA-R LP-32D-PA-R 809783 443-02-00449 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 红色",
 2628 |       "en": "LP-32D-PA-R 809783 443-02-00449 LP 3.2 mm PA"
 2629 |     }
 2630 |   },
 2631 |   {
 2632 |     "productId": "809784",
 2633 |     "categoryId": "fittings",
 2634 |     "productTypeId": "luer-fittings",
 2635 |     "seriesId": "lp",
 2636 |     "cardTitle": {
 2637 |       "zh": "一体式公鲁尔接头",
 2638 |       "en": "一体式公鲁尔接头"
 2639 |     },
 2640 |     "cardSubtitle": {
 2641 |       "zh": "适配3.2 mm内径软管\nPA材质｜绿色",
 2642 |       "en": "适配3.2 mm内径软管\nPA材质｜绿色"
 2643 |     },
 2644 |     "filters": {
 2645 |       "filter01": "公鲁尔接头",
 2646 |       "filter02": "LP 一体式",
 2647 |       "filter03": "3.2 mm",
 2648 |       "filter05": "PA",
 2649 |       "filter06": "绿色"
 2650 |     },
 2651 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-G.jpg",
 2652 |     "detailSlug": "lp-32d-pa-g",
 2653 |     "status": "active",
 2654 |     "sortOrder": 91,
 2655 |     "searchKeywords": {
 2656 |       "zh": "一体式公鲁尔接头 LP-32D-PA-G LP-32D-PA-G 809784 443-02-00450 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 绿色",
 2657 |       "en": "LP-32D-PA-G 809784 443-02-00450 LP 3.2 mm PA"
 2658 |     }
 2659 |   },
 2660 |   {
 2661 |     "productId": "809785",
 2662 |     "categoryId": "fittings",
 2663 |     "productTypeId": "luer-fittings",
 2664 |     "seriesId": "lp",
 2665 |     "cardTitle": {
 2666 |       "zh": "一体式公鲁尔接头",
 2667 |       "en": "一体式公鲁尔接头"
 2668 |     },
 2669 |     "cardSubtitle": {
 2670 |       "zh": "适配3.2 mm内径软管\nPA材质｜紫色",
 2671 |       "en": "适配3.2 mm内径软管\nPA材质｜紫色"
 2672 |     },
 2673 |     "filters": {
 2674 |       "filter01": "公鲁尔接头",
 2675 |       "filter02": "LP 一体式",
 2676 |       "filter03": "3.2 mm",
 2677 |       "filter05": "PA",
 2678 |       "filter06": "紫色"
 2679 |     },
 2680 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-U.jpg",
 2681 |     "detailSlug": "lp-32d-pa-u",
 2682 |     "status": "active",
 2683 |     "sortOrder": 92,
 2684 |     "searchKeywords": {
 2685 |       "zh": "一体式公鲁尔接头 LP-32D-PA-U LP-32D-PA-U 809785 443-02-00451 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 紫色",
 2686 |       "en": "LP-32D-PA-U 809785 443-02-00451 LP 3.2 mm PA"
 2687 |     }
 2688 |   },
 2689 |   {
 2690 |     "productId": "809786",
 2691 |     "categoryId": "fittings",
 2692 |     "productTypeId": "luer-fittings",
 2693 |     "seriesId": "lp",
 2694 |     "cardTitle": {
 2695 |       "zh": "一体式公鲁尔接头",
 2696 |       "en": "一体式公鲁尔接头"
 2697 |     },
 2698 |     "cardSubtitle": {
 2699 |       "zh": "适配3.2 mm内径软管\nPA材质｜橙色",
 2700 |       "en": "适配3.2 mm内径软管\nPA材质｜橙色"
 2701 |     },
 2702 |     "filters": {
 2703 |       "filter01": "公鲁尔接头",
 2704 |       "filter02": "LP 一体式",
 2705 |       "filter03": "3.2 mm",
 2706 |       "filter05": "PA",
 2707 |       "filter06": "橙色"
 2708 |     },
 2709 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-O.jpg",
 2710 |     "detailSlug": "lp-32d-pa-o",
 2711 |     "status": "active",
 2712 |     "sortOrder": 93,
 2713 |     "searchKeywords": {
 2714 |       "zh": "一体式公鲁尔接头 LP-32D-PA-O LP-32D-PA-O 809786 443-02-00452 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 橙色",
 2715 |       "en": "LP-32D-PA-O 809786 443-02-00452 LP 3.2 mm PA"
 2716 |     }
 2717 |   },
 2718 |   {
 2719 |     "productId": "809787",
 2720 |     "categoryId": "fittings",
 2721 |     "productTypeId": "luer-fittings",
 2722 |     "seriesId": "lp",
 2723 |     "cardTitle": {
 2724 |       "zh": "一体式公鲁尔接头",
 2725 |       "en": "一体式公鲁尔接头"
 2726 |     },
 2727 |     "cardSubtitle": {
 2728 |       "zh": "适配3.2 mm内径软管\nPA材质｜黄色",
 2729 |       "en": "适配3.2 mm内径软管\nPA材质｜黄色"
 2730 |     },
 2731 |     "filters": {
 2732 |       "filter01": "公鲁尔接头",
 2733 |       "filter02": "LP 一体式",
 2734 |       "filter03": "3.2 mm",
 2735 |       "filter05": "PA",
 2736 |       "filter06": "黄色"
 2737 |     },
 2738 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-Y.jpg",
 2739 |     "detailSlug": "lp-32d-pa-y",
 2740 |     "status": "active",
 2741 |     "sortOrder": 94,
 2742 |     "searchKeywords": {
 2743 |       "zh": "一体式公鲁尔接头 LP-32D-PA-Y LP-32D-PA-Y 809787 443-02-00453 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PA 黄色",
 2744 |       "en": "LP-32D-PA-Y 809787 443-02-00453 LP 3.2 mm PA"
 2745 |     }
 2746 |   },
 2747 |   {
 2748 |     "productId": "809667",
 2749 |     "categoryId": "fittings",
 2750 |     "productTypeId": "luer-fittings",
 2751 |     "seriesId": "lp",
 2752 |     "cardTitle": {
 2753 |       "zh": "一体式公鲁尔接头",
 2754 |       "en": "一体式公鲁尔接头"
 2755 |     },
 2756 |     "cardSubtitle": {
 2757 |       "zh": "适配3.2 mm内径软管\nPP材质｜红色",
 2758 |       "en": "适配3.2 mm内径软管\nPP材质｜红色"
 2759 |     },
 2760 |     "filters": {
 2761 |       "filter01": "公鲁尔接头",
 2762 |       "filter02": "LP 一体式",
 2763 |       "filter03": "3.2 mm",
 2764 |       "filter05": "PP",
 2765 |       "filter06": "红色"
 2766 |     },
 2767 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-R.jpg",
 2768 |     "detailSlug": "lp-32d-pp-r",
 2769 |     "status": "active",
 2770 |     "sortOrder": 95,
 2771 |     "searchKeywords": {
 2772 |       "zh": "一体式公鲁尔接头 LP-32D-PP-R LP-32D-PP-R 809667 443-02-00471 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PP 红色",
 2773 |       "en": "LP-32D-PP-R 809667 443-02-00471 LP 3.2 mm PP"
 2774 |     }
 2775 |   },
 2776 |   {
 2777 |     "productId": "809668",
 2778 |     "categoryId": "fittings",
 2779 |     "productTypeId": "luer-fittings",
 2780 |     "seriesId": "lp",
 2781 |     "cardTitle": {
 2782 |       "zh": "一体式公鲁尔接头",
 2783 |       "en": "一体式公鲁尔接头"
 2784 |     },
 2785 |     "cardSubtitle": {
 2786 |       "zh": "适配3.2 mm内径软管\nPP材质｜绿色",
 2787 |       "en": "适配3.2 mm内径软管\nPP材质｜绿色"
 2788 |     },
 2789 |     "filters": {
 2790 |       "filter01": "公鲁尔接头",
 2791 |       "filter02": "LP 一体式",
 2792 |       "filter03": "3.2 mm",
 2793 |       "filter05": "PP",
 2794 |       "filter06": "绿色"
 2795 |     },
 2796 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-G.jpg",
 2797 |     "detailSlug": "lp-32d-pp-g",
 2798 |     "status": "active",
 2799 |     "sortOrder": 96,
 2800 |     "searchKeywords": {
 2801 |       "zh": "一体式公鲁尔接头 LP-32D-PP-G LP-32D-PP-G 809668 443-02-00472 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PP 绿色",
 2802 |       "en": "LP-32D-PP-G 809668 443-02-00472 LP 3.2 mm PP"
 2803 |     }
 2804 |   },
 2805 |   {
 2806 |     "productId": "809789",
 2807 |     "categoryId": "fittings",
 2808 |     "productTypeId": "luer-fittings",
 2809 |     "seriesId": "lp",
 2810 |     "cardTitle": {
 2811 |       "zh": "一体式公鲁尔接头",
 2812 |       "en": "一体式公鲁尔接头"
 2813 |     },
 2814 |     "cardSubtitle": {
 2815 |       "zh": "适配3.2 mm内径软管\nPP材质｜紫色",
 2816 |       "en": "适配3.2 mm内径软管\nPP材质｜紫色"
 2817 |     },
 2818 |     "filters": {
 2819 |       "filter01": "公鲁尔接头",
 2820 |       "filter02": "LP 一体式",
 2821 |       "filter03": "3.2 mm",
 2822 |       "filter05": "PP",
 2823 |       "filter06": "紫色"
 2824 |     },
 2825 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-U.jpg",
 2826 |     "detailSlug": "lp-32d-pp-u",
 2827 |     "status": "active",
 2828 |     "sortOrder": 97,
 2829 |     "searchKeywords": {
 2830 |       "zh": "一体式公鲁尔接头 LP-32D-PP-U LP-32D-PP-U 809789 443-02-00473 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PP 紫色",
 2831 |       "en": "LP-32D-PP-U 809789 443-02-00473 LP 3.2 mm PP"
 2832 |     }
 2833 |   },
 2834 |   {
 2835 |     "productId": "809830",
 2836 |     "categoryId": "fittings",
 2837 |     "productTypeId": "luer-fittings",
 2838 |     "seriesId": "lp",
 2839 |     "cardTitle": {
 2840 |       "zh": "一体式公鲁尔接头",
 2841 |       "en": "一体式公鲁尔接头"
 2842 |     },
 2843 |     "cardSubtitle": {
 2844 |       "zh": "适配3.2 mm内径软管\nPP材质｜蓝色",
 2845 |       "en": "适配3.2 mm内径软管\nPP材质｜蓝色"
 2846 |     },
 2847 |     "filters": {
 2848 |       "filter01": "公鲁尔接头",
 2849 |       "filter02": "LP 一体式",
 2850 |       "filter03": "3.2 mm",
 2851 |       "filter05": "PP",
 2852 |       "filter06": "蓝色"
 2853 |     },
 2854 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-B.jpg",
 2855 |     "detailSlug": "lp-32d-pp-b",
 2856 |     "status": "active",
 2857 |     "sortOrder": 98,
 2858 |     "searchKeywords": {
 2859 |       "zh": "一体式公鲁尔接头 LP-32D-PP-B LP-32D-PP-B 809830 443-02-00584 公鲁尔接头 LP 一体式公鲁尔接头 3.2 mm PP 蓝色",
 2860 |       "en": "LP-32D-PP-B 809830 443-02-00584 LP 3.2 mm PP"
 2861 |     }
 2862 |   },
 2863 |   {
 2864 |     "productId": "809312",
 2865 |     "categoryId": "fittings",
 2866 |     "productTypeId": "luer-fittings",
 2867 |     "seriesId": "lp",
 2868 |     "cardTitle": {
 2869 |       "zh": "一体式公鲁尔接头",
 2870 |       "en": "一体式公鲁尔接头"
 2871 |     },
 2872 |     "cardSubtitle": {
 2873 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
 2874 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
 2875 |     },
 2876 |     "filters": {
 2877 |       "filter01": "公鲁尔接头",
 2878 |       "filter02": "LP 一体式",
 2879 |       "filter03": "1.6 mm",
 2880 |       "filter05": "PP",
 2881 |       "filter06": "本色"
 2882 |     },
 2883 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PP-N.jpg",
 2884 |     "detailSlug": "lp-16d-pp-n",
 2885 |     "status": "active",
 2886 |     "sortOrder": 99,
 2887 |     "searchKeywords": {
 2888 |       "zh": "一体式公鲁尔接头 LP-16D-PP-N LP-16D-PP-N 809312 443-02-00327 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PP 本色",
 2889 |       "en": "LP-16D-PP-N 809312 443-02-00327 LP 1.6 mm PP"
 2890 |     }
 2891 |   },
 2892 |   {
 2893 |     "productId": "809255",
 2894 |     "categoryId": "fittings",
 2895 |     "productTypeId": "luer-fittings",
 2896 |     "seriesId": "lp",
 2897 |     "cardTitle": {
 2898 |       "zh": "一体式公鲁尔接头",
 2899 |       "en": "一体式公鲁尔接头"
 2900 |     },
 2901 |     "cardSubtitle": {
 2902 |       "zh": "适配1.6 mm内径软管\nPA材质｜白色",
 2903 |       "en": "适配1.6 mm内径软管\nPA材质｜白色"
 2904 |     },
 2905 |     "filters": {
 2906 |       "filter01": "公鲁尔接头",
 2907 |       "filter02": "LP 一体式",
 2908 |       "filter03": "1.6 mm",
 2909 |       "filter05": "PA",
 2910 |       "filter06": "白色"
 2911 |     },
 2912 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-W.jpg",
 2913 |     "detailSlug": "lp-16d-pa-w",
 2914 |     "status": "active",
 2915 |     "sortOrder": 100,
 2916 |     "searchKeywords": {
 2917 |       "zh": "一体式公鲁尔接头 LP-16D-PA-W LP-16D-PA-W 809255 443-02-00456 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 白色",
 2918 |       "en": "LP-16D-PA-W 809255 443-02-00456 LP 1.6 mm PA"
 2919 |     }
 2920 |   },
 2921 |   {
 2922 |     "productId": "809256",
 2923 |     "categoryId": "fittings",
 2924 |     "productTypeId": "luer-fittings",
 2925 |     "seriesId": "lp",
 2926 |     "cardTitle": {
 2927 |       "zh": "一体式公鲁尔接头",
 2928 |       "en": "一体式公鲁尔接头"
 2929 |     },
 2930 |     "cardSubtitle": {
 2931 |       "zh": "适配1.6 mm内径软管\nPA材质｜蓝色",
 2932 |       "en": "适配1.6 mm内径软管\nPA材质｜蓝色"
 2933 |     },
 2934 |     "filters": {
 2935 |       "filter01": "公鲁尔接头",
 2936 |       "filter02": "LP 一体式",
 2937 |       "filter03": "1.6 mm",
 2938 |       "filter05": "PA",
 2939 |       "filter06": "蓝色"
 2940 |     },
 2941 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-B.jpg",
 2942 |     "detailSlug": "lp-16d-pa-b",
 2943 |     "status": "active",
 2944 |     "sortOrder": 101,
 2945 |     "searchKeywords": {
 2946 |       "zh": "一体式公鲁尔接头 LP-16D-PA-B LP-16D-PA-B 809256 443-02-00457 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 蓝色",
 2947 |       "en": "LP-16D-PA-B 809256 443-02-00457 LP 1.6 mm PA"
 2948 |     }
 2949 |   },
 2950 |   {
 2951 |     "productId": "809257",
 2952 |     "categoryId": "fittings",
 2953 |     "productTypeId": "luer-fittings",
 2954 |     "seriesId": "lp",
 2955 |     "cardTitle": {
 2956 |       "zh": "一体式公鲁尔接头",
 2957 |       "en": "一体式公鲁尔接头"
 2958 |     },
 2959 |     "cardSubtitle": {
 2960 |       "zh": "适配1.6 mm内径软管\nPA材质｜红色",
 2961 |       "en": "适配1.6 mm内径软管\nPA材质｜红色"
 2962 |     },
 2963 |     "filters": {
 2964 |       "filter01": "公鲁尔接头",
 2965 |       "filter02": "LP 一体式",
 2966 |       "filter03": "1.6 mm",
 2967 |       "filter05": "PA",
 2968 |       "filter06": "红色"
 2969 |     },
 2970 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-R.jpg",
 2971 |     "detailSlug": "lp-16d-pa-r",
 2972 |     "status": "active",
 2973 |     "sortOrder": 102,
 2974 |     "searchKeywords": {
 2975 |       "zh": "一体式公鲁尔接头 LP-16D-PA-R LP-16D-PA-R 809257 443-02-00458 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 红色",
 2976 |       "en": "LP-16D-PA-R 809257 443-02-00458 LP 1.6 mm PA"
 2977 |     }
 2978 |   },
 2979 |   {
 2980 |     "productId": "809259",
 2981 |     "categoryId": "fittings",
 2982 |     "productTypeId": "luer-fittings",
 2983 |     "seriesId": "lp",
 2984 |     "cardTitle": {
 2985 |       "zh": "一体式公鲁尔接头",
 2986 |       "en": "一体式公鲁尔接头"
 2987 |     },
 2988 |     "cardSubtitle": {
 2989 |       "zh": "适配1.6 mm内径软管\nPA材质｜绿色",
 2990 |       "en": "适配1.6 mm内径软管\nPA材质｜绿色"
 2991 |     },
 2992 |     "filters": {
 2993 |       "filter01": "公鲁尔接头",
 2994 |       "filter02": "LP 一体式",
 2995 |       "filter03": "1.6 mm",
 2996 |       "filter05": "PA",
 2997 |       "filter06": "绿色"
 2998 |     },
 2999 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-G.jpg",
 3000 |     "detailSlug": "lp-16d-pa-g",
 3001 |     "status": "active",
 3002 |     "sortOrder": 103,
 3003 |     "searchKeywords": {
 3004 |       "zh": "一体式公鲁尔接头 LP-16D-PA-G LP-16D-PA-G 809259 443-02-00459 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 绿色",
 3005 |       "en": "LP-16D-PA-G 809259 443-02-00459 LP 1.6 mm PA"
 3006 |     }
 3007 |   },
 3008 |   {
 3009 |     "productId": "809319",
 3010 |     "categoryId": "fittings",
 3011 |     "productTypeId": "luer-fittings",
 3012 |     "seriesId": "lp",
 3013 |     "cardTitle": {
 3014 |       "zh": "一体式公鲁尔接头",
 3015 |       "en": "一体式公鲁尔接头"
 3016 |     },
 3017 |     "cardSubtitle": {
 3018 |       "zh": "适配1.6 mm内径软管\nPA材质｜紫色",
 3019 |       "en": "适配1.6 mm内径软管\nPA材质｜紫色"
 3020 |     },
 3021 |     "filters": {
 3022 |       "filter01": "公鲁尔接头",
 3023 |       "filter02": "LP 一体式",
 3024 |       "filter03": "1.6 mm",
 3025 |       "filter05": "PA",
 3026 |       "filter06": "紫色"
 3027 |     },
 3028 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-U.jpg",
 3029 |     "detailSlug": "lp-16d-pa-u",
 3030 |     "status": "active",
 3031 |     "sortOrder": 104,
 3032 |     "searchKeywords": {
 3033 |       "zh": "一体式公鲁尔接头 LP-16D-PA-U LP-16D-PA-U 809319 443-02-00460 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 紫色",
 3034 |       "en": "LP-16D-PA-U 809319 443-02-00460 LP 1.6 mm PA"
 3035 |     }
 3036 |   },
 3037 |   {
 3038 |     "productId": "809344",
 3039 |     "categoryId": "fittings",
 3040 |     "productTypeId": "luer-fittings",
 3041 |     "seriesId": "lp",
 3042 |     "cardTitle": {
 3043 |       "zh": "一体式公鲁尔接头",
 3044 |       "en": "一体式公鲁尔接头"
 3045 |     },
 3046 |     "cardSubtitle": {
 3047 |       "zh": "适配1.6 mm内径软管\nPA材质｜橙色",
 3048 |       "en": "适配1.6 mm内径软管\nPA材质｜橙色"
 3049 |     },
 3050 |     "filters": {
 3051 |       "filter01": "公鲁尔接头",
 3052 |       "filter02": "LP 一体式",
 3053 |       "filter03": "1.6 mm",
 3054 |       "filter05": "PA",
 3055 |       "filter06": "橙色"
 3056 |     },
 3057 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-O.jpg",
 3058 |     "detailSlug": "lp-16d-pa-o",
 3059 |     "status": "active",
 3060 |     "sortOrder": 105,
 3061 |     "searchKeywords": {
 3062 |       "zh": "一体式公鲁尔接头 LP-16D-PA-O LP-16D-PA-O 809344 443-02-00461 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 橙色",
 3063 |       "en": "LP-16D-PA-O 809344 443-02-00461 LP 1.6 mm PA"
 3064 |     }
 3065 |   },
 3066 |   {
 3067 |     "productId": "809354",
 3068 |     "categoryId": "fittings",
 3069 |     "productTypeId": "luer-fittings",
 3070 |     "seriesId": "lp",
 3071 |     "cardTitle": {
 3072 |       "zh": "一体式公鲁尔接头",
 3073 |       "en": "一体式公鲁尔接头"
 3074 |     },
 3075 |     "cardSubtitle": {
 3076 |       "zh": "适配1.6 mm内径软管\nPA材质｜黄色",
 3077 |       "en": "适配1.6 mm内径软管\nPA材质｜黄色"
 3078 |     },
 3079 |     "filters": {
 3080 |       "filter01": "公鲁尔接头",
 3081 |       "filter02": "LP 一体式",
 3082 |       "filter03": "1.6 mm",
 3083 |       "filter05": "PA",
 3084 |       "filter06": "黄色"
 3085 |     },
 3086 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-Y.jpg",
 3087 |     "detailSlug": "lp-16d-pa-y",
 3088 |     "status": "active",
 3089 |     "sortOrder": 106,
 3090 |     "searchKeywords": {
 3091 |       "zh": "一体式公鲁尔接头 LP-16D-PA-Y LP-16D-PA-Y 809354 443-02-00462 公鲁尔接头 LP 一体式公鲁尔接头 1.6 mm PA 黄色",
 3092 |       "en": "LP-16D-PA-Y 809354 443-02-00462 LP 1.6 mm PA"
 3093 |     }
 3094 |   },
 3095 |   {
 3096 |     "productId": "809313",
 3097 |     "categoryId": "fittings",
 3098 |     "productTypeId": "luer-fittings",
 3099 |     "seriesId": "lp",
 3100 |     "cardTitle": {
 3101 |       "zh": "一体式公鲁尔接头",
 3102 |       "en": "一体式公鲁尔接头"
 3103 |     },
 3104 |     "cardSubtitle": {
 3105 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
 3106 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
 3107 |     },
 3108 |     "filters": {
 3109 |       "filter01": "公鲁尔接头",
 3110 |       "filter02": "LP 一体式",
 3111 |       "filter03": "2.4 mm",
 3112 |       "filter05": "PP",
 3113 |       "filter06": "本色"
 3114 |     },
 3115 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PP-N.jpg",
 3116 |     "detailSlug": "lp-24d-pp-n",
 3117 |     "status": "active",
 3118 |     "sortOrder": 107,
 3119 |     "searchKeywords": {
 3120 |       "zh": "一体式公鲁尔接头 LP-24D-PP-N LP-24D-PP-N 809313 443-02-00328 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PP 本色",
 3121 |       "en": "LP-24D-PP-N 809313 443-02-00328 LP 2.4 mm PP"
 3122 |     }
 3123 |   },
 3124 |   {
 3125 |     "productId": "809366",
 3126 |     "categoryId": "fittings",
 3127 |     "productTypeId": "luer-fittings",
 3128 |     "seriesId": "lp",
 3129 |     "cardTitle": {
 3130 |       "zh": "一体式公鲁尔接头",
 3131 |       "en": "一体式公鲁尔接头"
 3132 |     },
 3133 |     "cardSubtitle": {
 3134 |       "zh": "适配2.4 mm内径软管\nPA材质｜白色",
 3135 |       "en": "适配2.4 mm内径软管\nPA材质｜白色"
 3136 |     },
 3137 |     "filters": {
 3138 |       "filter01": "公鲁尔接头",
 3139 |       "filter02": "LP 一体式",
 3140 |       "filter03": "2.4 mm",
 3141 |       "filter05": "PA",
 3142 |       "filter06": "白色"
 3143 |     },
 3144 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-W.jpg",
 3145 |     "detailSlug": "lp-24d-pa-w",
 3146 |     "status": "active",
 3147 |     "sortOrder": 108,
 3148 |     "searchKeywords": {
 3149 |       "zh": "一体式公鲁尔接头 LP-24D-PA-W LP-24D-PA-W 809366 443-02-00463 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 白色",
 3150 |       "en": "LP-24D-PA-W 809366 443-02-00463 LP 2.4 mm PA"
 3151 |     }
 3152 |   },
 3153 |   {
 3154 |     "productId": "809666",
 3155 |     "categoryId": "fittings",
 3156 |     "productTypeId": "luer-fittings",
 3157 |     "seriesId": "lp",
 3158 |     "cardTitle": {
 3159 |       "zh": "一体式公鲁尔接头",
 3160 |       "en": "一体式公鲁尔接头"
 3161 |     },
 3162 |     "cardSubtitle": {
 3163 |       "zh": "适配2.4 mm内径软管\nPA材质｜蓝色",
 3164 |       "en": "适配2.4 mm内径软管\nPA材质｜蓝色"
 3165 |     },
 3166 |     "filters": {
 3167 |       "filter01": "公鲁尔接头",
 3168 |       "filter02": "LP 一体式",
 3169 |       "filter03": "2.4 mm",
 3170 |       "filter05": "PA",
 3171 |       "filter06": "蓝色"
 3172 |     },
 3173 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-B.jpg",
 3174 |     "detailSlug": "lp-24d-pa-b",
 3175 |     "status": "active",
 3176 |     "sortOrder": 109,
 3177 |     "searchKeywords": {
 3178 |       "zh": "一体式公鲁尔接头 LP-24D-PA-B LP-24D-PA-B 809666 443-02-00464 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 蓝色",
 3179 |       "en": "LP-24D-PA-B 809666 443-02-00464 LP 2.4 mm PA"
 3180 |     }
 3181 |   },
 3182 |   {
 3183 |     "productId": "809485",
 3184 |     "categoryId": "fittings",
 3185 |     "productTypeId": "luer-fittings",
 3186 |     "seriesId": "lp",
 3187 |     "cardTitle": {
 3188 |       "zh": "一体式公鲁尔接头",
 3189 |       "en": "一体式公鲁尔接头"
 3190 |     },
 3191 |     "cardSubtitle": {
 3192 |       "zh": "适配2.4 mm内径软管\nPA材质｜红色",
 3193 |       "en": "适配2.4 mm内径软管\nPA材质｜红色"
 3194 |     },
 3195 |     "filters": {
 3196 |       "filter01": "公鲁尔接头",
 3197 |       "filter02": "LP 一体式",
 3198 |       "filter03": "2.4 mm",
 3199 |       "filter05": "PA",
 3200 |       "filter06": "红色"
 3201 |     },
 3202 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-R.jpg",
 3203 |     "detailSlug": "lp-24d-pa-r",
 3204 |     "status": "active",
 3205 |     "sortOrder": 110,
 3206 |     "searchKeywords": {
 3207 |       "zh": "一体式公鲁尔接头 LP-24D-PA-R LP-24D-PA-R 809485 443-02-00465 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 红色",
 3208 |       "en": "LP-24D-PA-R 809485 443-02-00465 LP 2.4 mm PA"
 3209 |     }
 3210 |   },
 3211 |   {
 3212 |     "productId": "809486",
 3213 |     "categoryId": "fittings",
 3214 |     "productTypeId": "luer-fittings",
 3215 |     "seriesId": "lp",
 3216 |     "cardTitle": {
 3217 |       "zh": "一体式公鲁尔接头",
 3218 |       "en": "一体式公鲁尔接头"
 3219 |     },
 3220 |     "cardSubtitle": {
 3221 |       "zh": "适配2.4 mm内径软管\nPA材质｜绿色",
 3222 |       "en": "适配2.4 mm内径软管\nPA材质｜绿色"
 3223 |     },
 3224 |     "filters": {
 3225 |       "filter01": "公鲁尔接头",
 3226 |       "filter02": "LP 一体式",
 3227 |       "filter03": "2.4 mm",
 3228 |       "filter05": "PA",
 3229 |       "filter06": "绿色"
 3230 |     },
 3231 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-G.jpg",
 3232 |     "detailSlug": "lp-24d-pa-g",
 3233 |     "status": "active",
 3234 |     "sortOrder": 111,
 3235 |     "searchKeywords": {
 3236 |       "zh": "一体式公鲁尔接头 LP-24D-PA-G LP-24D-PA-G 809486 443-02-00466 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 绿色",
 3237 |       "en": "LP-24D-PA-G 809486 443-02-00466 LP 2.4 mm PA"
 3238 |     }
 3239 |   },
 3240 |   {
 3241 |     "productId": "809487",
 3242 |     "categoryId": "fittings",
 3243 |     "productTypeId": "luer-fittings",
 3244 |     "seriesId": "lp",
 3245 |     "cardTitle": {
 3246 |       "zh": "一体式公鲁尔接头",
 3247 |       "en": "一体式公鲁尔接头"
 3248 |     },
 3249 |     "cardSubtitle": {
 3250 |       "zh": "适配2.4 mm内径软管\nPA材质｜紫色",
 3251 |       "en": "适配2.4 mm内径软管\nPA材质｜紫色"
 3252 |     },
 3253 |     "filters": {
 3254 |       "filter01": "公鲁尔接头",
 3255 |       "filter02": "LP 一体式",
 3256 |       "filter03": "2.4 mm",
 3257 |       "filter05": "PA",
 3258 |       "filter06": "紫色"
 3259 |     },
 3260 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-U.jpg",
 3261 |     "detailSlug": "lp-24d-pa-u",
 3262 |     "status": "active",
 3263 |     "sortOrder": 112,
 3264 |     "searchKeywords": {
 3265 |       "zh": "一体式公鲁尔接头 LP-24D-PA-U LP-24D-PA-U 809487 443-02-00467 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 紫色",
 3266 |       "en": "LP-24D-PA-U 809487 443-02-00467 LP 2.4 mm PA"
 3267 |     }
 3268 |   },
 3269 |   {
 3270 |     "productId": "809488",
 3271 |     "categoryId": "fittings",
 3272 |     "productTypeId": "luer-fittings",
 3273 |     "seriesId": "lp",
 3274 |     "cardTitle": {
 3275 |       "zh": "一体式公鲁尔接头",
 3276 |       "en": "一体式公鲁尔接头"
 3277 |     },
 3278 |     "cardSubtitle": {
 3279 |       "zh": "适配2.4 mm内径软管\nPA材质｜橙色",
 3280 |       "en": "适配2.4 mm内径软管\nPA材质｜橙色"
 3281 |     },
 3282 |     "filters": {
 3283 |       "filter01": "公鲁尔接头",
 3284 |       "filter02": "LP 一体式",
 3285 |       "filter03": "2.4 mm",
 3286 |       "filter05": "PA",
 3287 |       "filter06": "橙色"
 3288 |     },
 3289 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-O.jpg",
 3290 |     "detailSlug": "lp-24d-pa-o",
 3291 |     "status": "active",
 3292 |     "sortOrder": 113,
 3293 |     "searchKeywords": {
 3294 |       "zh": "一体式公鲁尔接头 LP-24D-PA-O LP-24D-PA-O 809488 443-02-00468 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 橙色",
 3295 |       "en": "LP-24D-PA-O 809488 443-02-00468 LP 2.4 mm PA"
 3296 |     }
 3297 |   },
 3298 |   {
 3299 |     "productId": "809489",
 3300 |     "categoryId": "fittings",
 3301 |     "productTypeId": "luer-fittings",
 3302 |     "seriesId": "lp",
 3303 |     "cardTitle": {
 3304 |       "zh": "一体式公鲁尔接头",
 3305 |       "en": "一体式公鲁尔接头"
 3306 |     },
 3307 |     "cardSubtitle": {
 3308 |       "zh": "适配2.4 mm内径软管\nPA材质｜黄色",
 3309 |       "en": "适配2.4 mm内径软管\nPA材质｜黄色"
 3310 |     },
 3311 |     "filters": {
 3312 |       "filter01": "公鲁尔接头",
 3313 |       "filter02": "LP 一体式",
 3314 |       "filter03": "2.4 mm",
 3315 |       "filter05": "PA",
 3316 |       "filter06": "黄色"
 3317 |     },
 3318 |     "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-Y.jpg",
 3319 |     "detailSlug": "lp-24d-pa-y",
 3320 |     "status": "active",
 3321 |     "sortOrder": 114,
 3322 |     "searchKeywords": {
 3323 |       "zh": "一体式公鲁尔接头 LP-24D-PA-Y LP-24D-PA-Y 809489 443-02-00469 公鲁尔接头 LP 一体式公鲁尔接头 2.4 mm PA 黄色",
 3324 |       "en": "LP-24D-PA-Y 809489 443-02-00469 LP 2.4 mm PA"
 3325 |     }
 3326 |   },
 3327 |   {
 3328 |     "productId": "809570",
 3329 |     "categoryId": "fittings",
 3330 |     "productTypeId": "luer-fittings",
 3331 |     "seriesId": "ls",
 3332 |     "cardTitle": {
 3333 |       "zh": "母鲁尔接头",
 3334 |       "en": "母鲁尔接头"
 3335 |     },
 3336 |     "cardSubtitle": {
 3337 |       "zh": "适配1.6 mm内径软管\nPP材质｜本色",
 3338 |       "en": "适配1.6 mm内径软管\nPP材质｜本色"
 3339 |     },
 3340 |     "filters": {
 3341 |       "filter01": "母鲁尔接头",
 3342 |       "filter02": "LS 母鲁尔",
 3343 |       "filter03": "1.6 mm",
 3344 |       "filter05": "PP",
 3345 |       "filter06": "本色"
 3346 |     },
 3347 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-16D-PP-N.jpg",
 3348 |     "detailSlug": "ls-16d-pp-n",
 3349 |     "status": "active",
 3350 |     "sortOrder": 115,
 3351 |     "searchKeywords": {
 3352 |       "zh": "母鲁尔 LS-16D-PP-N LS-16D-PP-N 809570 443-02-00154 母鲁尔接头 LS 母鲁尔接头 1.6 mm PP 本色",
 3353 |       "en": "LS-16D-PP-N 809570 443-02-00154 LS 1.6 mm PP"
 3354 |     }
 3355 |   },
 3356 |   {
 3357 |     "productId": "809699",
 3358 |     "categoryId": "fittings",
 3359 |     "productTypeId": "luer-fittings",
 3360 |     "seriesId": "ls",
 3361 |     "cardTitle": {
 3362 |       "zh": "母鲁尔接头",
 3363 |       "en": "母鲁尔接头"
 3364 |     },
 3365 |     "cardSubtitle": {
 3366 |       "zh": "适配1.6 mm内径软管\nPA材质｜白色",
 3367 |       "en": "适配1.6 mm内径软管\nPA材质｜白色"
 3368 |     },
 3369 |     "filters": {
 3370 |       "filter01": "母鲁尔接头",
 3371 |       "filter02": "LS 母鲁尔",
 3372 |       "filter03": "1.6 mm",
 3373 |       "filter05": "PA",
 3374 |       "filter06": "白色"
 3375 |     },
 3376 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-16D-PA-W.jpg",
 3377 |     "detailSlug": "ls-16d-pa-w",
 3378 |     "status": "active",
 3379 |     "sortOrder": 116,
 3380 |     "searchKeywords": {
 3381 |       "zh": "母鲁尔 LS-16D-PA-W LS-16D-PA-W 809699 443-02-00268 母鲁尔接头 LS 母鲁尔接头 1.6 mm PA 白色",
 3382 |       "en": "LS-16D-PA-W 809699 443-02-00268 LS 1.6 mm PA"
 3383 |     }
 3384 |   },
 3385 |   {
 3386 |     "productId": "809571",
 3387 |     "categoryId": "fittings",
 3388 |     "productTypeId": "luer-fittings",
 3389 |     "seriesId": "ls",
 3390 |     "cardTitle": {
 3391 |       "zh": "母鲁尔接头",
 3392 |       "en": "母鲁尔接头"
 3393 |     },
 3394 |     "cardSubtitle": {
 3395 |       "zh": "适配2.4 mm内径软管\nPP材质｜本色",
 3396 |       "en": "适配2.4 mm内径软管\nPP材质｜本色"
 3397 |     },
 3398 |     "filters": {
 3399 |       "filter01": "母鲁尔接头",
 3400 |       "filter02": "LS 母鲁尔",
 3401 |       "filter03": "2.4 mm",
 3402 |       "filter05": "PP",
 3403 |       "filter06": "本色"
 3404 |     },
 3405 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-24D-PP-N.jpg",
 3406 |     "detailSlug": "ls-24d-pp-n",
 3407 |     "status": "active",
 3408 |     "sortOrder": 117,
 3409 |     "searchKeywords": {
 3410 |       "zh": "母鲁尔 LS-24D-PP-N LS-24D-PP-N 809571 443-02-00155 母鲁尔接头 LS 母鲁尔接头 2.4 mm PP 本色",
 3411 |       "en": "LS-24D-PP-N 809571 443-02-00155 LS 2.4 mm PP"
 3412 |     }
 3413 |   },
 3414 |   {
 3415 |     "productId": "809700",
 3416 |     "categoryId": "fittings",
 3417 |     "productTypeId": "luer-fittings",
 3418 |     "seriesId": "ls",
 3419 |     "cardTitle": {
 3420 |       "zh": "母鲁尔接头",
 3421 |       "en": "母鲁尔接头"
 3422 |     },
 3423 |     "cardSubtitle": {
 3424 |       "zh": "适配2.4 mm内径软管\nPA材质｜白色",
 3425 |       "en": "适配2.4 mm内径软管\nPA材质｜白色"
 3426 |     },
 3427 |     "filters": {
 3428 |       "filter01": "母鲁尔接头",
 3429 |       "filter02": "LS 母鲁尔",
 3430 |       "filter03": "2.4 mm",
 3431 |       "filter05": "PA",
 3432 |       "filter06": "白色"
 3433 |     },
 3434 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-24D-PA-W.jpg",
 3435 |     "detailSlug": "ls-24d-pa-w",
 3436 |     "status": "active",
 3437 |     "sortOrder": 118,
 3438 |     "searchKeywords": {
 3439 |       "zh": "母鲁尔 LS-24D-PA-W LS-24D-PA-W 809700 443-02-00269 母鲁尔接头 LS 母鲁尔接头 2.4 mm PA 白色",
 3440 |       "en": "LS-24D-PA-W 809700 443-02-00269 LS 2.4 mm PA"
 3441 |     }
 3442 |   },
 3443 |   {
 3444 |     "productId": "809572",
 3445 |     "categoryId": "fittings",
 3446 |     "productTypeId": "luer-fittings",
 3447 |     "seriesId": "ls",
 3448 |     "cardTitle": {
 3449 |       "zh": "母鲁尔接头",
 3450 |       "en": "母鲁尔接头"
 3451 |     },
 3452 |     "cardSubtitle": {
 3453 |       "zh": "适配3.2 mm内径软管\nPP材质｜本色",
 3454 |       "en": "适配3.2 mm内径软管\nPP材质｜本色"
 3455 |     },
 3456 |     "filters": {
 3457 |       "filter01": "母鲁尔接头",
 3458 |       "filter02": "LS 母鲁尔",
 3459 |       "filter03": "3.2 mm",
 3460 |       "filter05": "PP",
 3461 |       "filter06": "本色"
 3462 |     },
 3463 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-32D-PP-N.jpg",
 3464 |     "detailSlug": "ls-32d-pp-n",
 3465 |     "status": "active",
 3466 |     "sortOrder": 119,
 3467 |     "searchKeywords": {
 3468 |       "zh": "母鲁尔 LS-32D-PP-N LS-32D-PP-N 809572 443-02-00156 母鲁尔接头 LS 母鲁尔接头 3.2 mm PP 本色",
 3469 |       "en": "LS-32D-PP-N 809572 443-02-00156 LS 3.2 mm PP"
 3470 |     }
 3471 |   },
 3472 |   {
 3473 |     "productId": "809701",
 3474 |     "categoryId": "fittings",
 3475 |     "productTypeId": "luer-fittings",
 3476 |     "seriesId": "ls",
 3477 |     "cardTitle": {
 3478 |       "zh": "母鲁尔接头",
 3479 |       "en": "母鲁尔接头"
 3480 |     },
 3481 |     "cardSubtitle": {
 3482 |       "zh": "适配3.2 mm内径软管\nPA材质｜白色",
 3483 |       "en": "适配3.2 mm内径软管\nPA材质｜白色"
 3484 |     },
 3485 |     "filters": {
 3486 |       "filter01": "母鲁尔接头",
 3487 |       "filter02": "LS 母鲁尔",
 3488 |       "filter03": "3.2 mm",
 3489 |       "filter05": "PA",
 3490 |       "filter06": "白色"
 3491 |     },
 3492 |     "imageCard": "/images/products/fittings/luer-fittings/products/LS-32D-PA-W.jpg",
 3493 |     "detailSlug": "ls-32d-pa-w",
 3494 |     "status": "active",
 3495 |     "sortOrder": 120,
 3496 |     "searchKeywords": {
 3497 |       "zh": "母鲁尔 LS-32D-PA-W LS-32D-PA-W 809701 443-02-00270 母鲁尔接头 LS 母鲁尔接头 3.2 mm PA 白色",
 3498 |       "en": "LS-32D-PA-W 809701 443-02-00270 LS 3.2 mm PA"
 3499 |     }
 3500 |   },
 3501 |   {
 3502 |     "productId": "809576",
 3503 |     "categoryId": "fittings",
 3504 |     "productTypeId": "luer-fittings",
 3505 |     "seriesId": "pmls",
 3506 |     "cardTitle": {
 3507 |       "zh": "穿板母鲁尔接头",
 3508 |       "en": "穿板母鲁尔接头"
 3509 |     },
 3510 |     "cardSubtitle": {
 3511 |       "zh": "1/4-28 UNF｜适配1.6 mm内径软管\nPP材质｜本色",
 3512 |       "en": "1/4-28 UNF｜适配1.6 mm内径软管\nPP材质｜本色"
 3513 |     },
 3514 |     "filters": {
 3515 |       "filter01": "穿板母鲁尔接头",
 3516 |       "filter02": "PMLS 穿板母鲁尔",
 3517 |       "filter03": "1.6 mm",
 3518 |       "filter04": "1/4-28 UNF",
 3519 |       "filter05": "PP",
 3520 |       "filter06": "本色"
 3521 |     },
 3522 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-16D-PP-N.jpg",
 3523 |     "detailSlug": "pmls-u28-16d-pp-n",
 3524 |     "status": "active",
 3525 |     "sortOrder": 121,
 3526 |     "searchKeywords": {
 3527 |       "zh": "穿板母鲁尔 PMLS-U28-16D-PP-N PMLS-U28-16D-PP-N 809576 443-02-00160 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 1.6 mm 1/4-28 UNF PP 本色",
 3528 |       "en": "PMLS-U28-16D-PP-N 809576 443-02-00160 PMLS 1.6 mm 1/4-28 UNF PP"
 3529 |     }
 3530 |   },
 3531 |   {
 3532 |     "productId": "809702",
 3533 |     "categoryId": "fittings",
 3534 |     "productTypeId": "luer-fittings",
 3535 |     "seriesId": "pmls",
 3536 |     "cardTitle": {
 3537 |       "zh": "穿板母鲁尔接头",
 3538 |       "en": "穿板母鲁尔接头"
 3539 |     },
 3540 |     "cardSubtitle": {
 3541 |       "zh": "1/4-28 UNF｜适配1.6 mm内径软管\nPA材质｜白色",
 3542 |       "en": "1/4-28 UNF｜适配1.6 mm内径软管\nPA材质｜白色"
 3543 |     },
 3544 |     "filters": {
 3545 |       "filter01": "穿板母鲁尔接头",
 3546 |       "filter02": "PMLS 穿板母鲁尔",
 3547 |       "filter03": "1.6 mm",
 3548 |       "filter04": "1/4-28 UNF",
 3549 |       "filter05": "PA",
 3550 |       "filter06": "白色"
 3551 |     },
 3552 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-16D-PA-W.jpg",
 3553 |     "detailSlug": "pmls-u28-16d-pa-w",
 3554 |     "status": "active",
 3555 |     "sortOrder": 122,
 3556 |     "searchKeywords": {
 3557 |       "zh": "穿板母鲁尔 PMLS-U28-16D-PA-W PMLS-U28-16D-PA-W 809702 443-02-00271 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 1.6 mm 1/4-28 UNF PA 白色",
 3558 |       "en": "PMLS-U28-16D-PA-W 809702 443-02-00271 PMLS 1.6 mm 1/4-28 UNF PA"
 3559 |     }
 3560 |   },
 3561 |   {
 3562 |     "productId": "809577",
 3563 |     "categoryId": "fittings",
 3564 |     "productTypeId": "luer-fittings",
 3565 |     "seriesId": "pmls",
 3566 |     "cardTitle": {
 3567 |       "zh": "穿板母鲁尔接头",
 3568 |       "en": "穿板母鲁尔接头"
 3569 |     },
 3570 |     "cardSubtitle": {
 3571 |       "zh": "1/4-28 UNF｜适配2.4 mm内径软管\nPP材质｜本色",
 3572 |       "en": "1/4-28 UNF｜适配2.4 mm内径软管\nPP材质｜本色"
 3573 |     },
 3574 |     "filters": {
 3575 |       "filter01": "穿板母鲁尔接头",
 3576 |       "filter02": "PMLS 穿板母鲁尔",
 3577 |       "filter03": "2.4 mm",
 3578 |       "filter04": "1/4-28 UNF",
 3579 |       "filter05": "PP",
 3580 |       "filter06": "本色"
 3581 |     },
 3582 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-24D-PP-N.jpg",
 3583 |     "detailSlug": "pmls-u28-24d-pp-n",
 3584 |     "status": "active",
 3585 |     "sortOrder": 123,
 3586 |     "searchKeywords": {
 3587 |       "zh": "穿板母鲁尔 PMLS-U28-24D-PP-N PMLS-U28-24D-PP-N 809577 443-02-00161 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 2.4 mm 1/4-28 UNF PP 本色",
 3588 |       "en": "PMLS-U28-24D-PP-N 809577 443-02-00161 PMLS 2.4 mm 1/4-28 UNF PP"
 3589 |     }
 3590 |   },
 3591 |   {
 3592 |     "productId": "809703",
 3593 |     "categoryId": "fittings",
 3594 |     "productTypeId": "luer-fittings",
 3595 |     "seriesId": "pmls",
 3596 |     "cardTitle": {
 3597 |       "zh": "穿板母鲁尔接头",
 3598 |       "en": "穿板母鲁尔接头"
 3599 |     },
 3600 |     "cardSubtitle": {
 3601 |       "zh": "1/4-28 UNF｜适配2.4 mm内径软管\nPA材质｜白色",
 3602 |       "en": "1/4-28 UNF｜适配2.4 mm内径软管\nPA材质｜白色"
 3603 |     },
 3604 |     "filters": {
 3605 |       "filter01": "穿板母鲁尔接头",
 3606 |       "filter02": "PMLS 穿板母鲁尔",
 3607 |       "filter03": "2.4 mm",
 3608 |       "filter04": "1/4-28 UNF",
 3609 |       "filter05": "PA",
 3610 |       "filter06": "白色"
 3611 |     },
 3612 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-24D-PA-W.jpg",
 3613 |     "detailSlug": "pmls-u28-24d-pa-w",
 3614 |     "status": "active",
 3615 |     "sortOrder": 124,
 3616 |     "searchKeywords": {
 3617 |       "zh": "穿板母鲁尔 PMLS-U28-24D-PA-W PMLS-U28-24D-PA-W 809703 443-02-00272 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 2.4 mm 1/4-28 UNF PA 白色",
 3618 |       "en": "PMLS-U28-24D-PA-W 809703 443-02-00272 PMLS 2.4 mm 1/4-28 UNF PA"
 3619 |     }
 3620 |   },
 3621 |   {
 3622 |     "productId": "809578",
 3623 |     "categoryId": "fittings",
 3624 |     "productTypeId": "luer-fittings",
 3625 |     "seriesId": "pmls",
 3626 |     "cardTitle": {
 3627 |       "zh": "穿板母鲁尔接头",
 3628 |       "en": "穿板母鲁尔接头"
 3629 |     },
 3630 |     "cardSubtitle": {
 3631 |       "zh": "1/4-28 UNF｜适配3.2 mm内径软管\nPP材质｜本色",
 3632 |       "en": "1/4-28 UNF｜适配3.2 mm内径软管\nPP材质｜本色"
 3633 |     },
 3634 |     "filters": {
 3635 |       "filter01": "穿板母鲁尔接头",
 3636 |       "filter02": "PMLS 穿板母鲁尔",
 3637 |       "filter03": "3.2 mm",
 3638 |       "filter04": "1/4-28 UNF",
 3639 |       "filter05": "PP",
 3640 |       "filter06": "本色"
 3641 |     },
 3642 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-32D-PP-N.jpg",
 3643 |     "detailSlug": "pmls-u28-32d-pp-n",
 3644 |     "status": "active",
 3645 |     "sortOrder": 125,
 3646 |     "searchKeywords": {
 3647 |       "zh": "穿板母鲁尔 PMLS-U28-32D-PP-N PMLS-U28-32D-PP-N 809578 443-02-00162 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 3.2 mm 1/4-28 UNF PP 本色",
 3648 |       "en": "PMLS-U28-32D-PP-N 809578 443-02-00162 PMLS 3.2 mm 1/4-28 UNF PP"
 3649 |     }
 3650 |   },
 3651 |   {
 3652 |     "productId": "809665",
 3653 |     "categoryId": "fittings",
 3654 |     "productTypeId": "luer-fittings",
 3655 |     "seriesId": "pmls",
 3656 |     "cardTitle": {
 3657 |       "zh": "穿板母鲁尔接头",
 3658 |       "en": "穿板母鲁尔接头"
 3659 |     },
 3660 |     "cardSubtitle": {
 3661 |       "zh": "1/4-28 UNF｜适配3.2 mm内径软管\nPVDF材质｜本色",
 3662 |       "en": "1/4-28 UNF｜适配3.2 mm内径软管\nPVDF材质｜本色"
 3663 |     },
 3664 |     "filters": {
 3665 |       "filter01": "穿板母鲁尔接头",
 3666 |       "filter02": "PMLS 穿板母鲁尔",
 3667 |       "filter03": "3.2 mm",
 3668 |       "filter04": "1/4-28 UNF",
 3669 |       "filter05": "PVDF",
 3670 |       "filter06": "本色"
 3671 |     },
 3672 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-32D-PV-N.jpg",
 3673 |     "detailSlug": "pmls-u28-32d-pv-n",
 3674 |     "status": "active",
 3675 |     "sortOrder": 126,
 3676 |     "searchKeywords": {
 3677 |       "zh": "穿板母鲁尔 PMLS-U28-32D-PV-N PMLS-U28-32D-PV-N 809665 443-02-00229 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 3.2 mm 1/4-28 UNF PVDF 本色",
 3678 |       "en": "PMLS-U28-32D-PV-N 809665 443-02-00229 PMLS 3.2 mm 1/4-28 UNF PVDF"
 3679 |     }
 3680 |   },
 3681 |   {
 3682 |     "productId": "809704",
 3683 |     "categoryId": "fittings",
 3684 |     "productTypeId": "luer-fittings",
 3685 |     "seriesId": "pmls",
 3686 |     "cardTitle": {
 3687 |       "zh": "穿板母鲁尔接头",
 3688 |       "en": "穿板母鲁尔接头"
 3689 |     },
 3690 |     "cardSubtitle": {
 3691 |       "zh": "1/4-28 UNF｜适配3.2 mm内径软管\nPA材质｜白色",
 3692 |       "en": "1/4-28 UNF｜适配3.2 mm内径软管\nPA材质｜白色"
 3693 |     },
 3694 |     "filters": {
 3695 |       "filter01": "穿板母鲁尔接头",
 3696 |       "filter02": "PMLS 穿板母鲁尔",
 3697 |       "filter03": "3.2 mm",
 3698 |       "filter04": "1/4-28 UNF",
 3699 |       "filter05": "PA",
 3700 |       "filter06": "白色"
 3701 |     },
 3702 |     "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-32D-PA-W.jpg",
 3703 |     "detailSlug": "pmls-u28-32d-pa-w",
 3704 |     "status": "active",
 3705 |     "sortOrder": 127,
 3706 |     "searchKeywords": {
 3707 |       "zh": "穿板母鲁尔 PMLS-U28-32D-PA-W PMLS-U28-32D-PA-W 809704 443-02-00273 穿板母鲁尔接头 PMLS 穿板母鲁尔接头 3.2 mm 1/4-28 UNF PA 白色",
 3708 |       "en": "PMLS-U28-32D-PA-W 809704 443-02-00273 PMLS 3.2 mm 1/4-28 UNF PA"
 3709 |     }
 3710 |   },
 3711 |   {
 3712 |     "productId": "809579",
 3713 |     "categoryId": "fittings",
 3714 |     "productTypeId": "luer-fittings",
 3715 |     "seriesId": "lcr",
 3716 |     "cardTitle": {
 3717 |       "zh": "鲁尔色环",
 3718 |       "en": "鲁尔色环"
 3719 |     },
 3720 |     "cardSubtitle": {
 3721 |       "zh": "LCR系列\nPP材质｜本色",
 3722 |       "en": "LCR系列\nPP材质｜本色"
 3723 |     },
 3724 |     "filters": {
 3725 |       "filter01": "色环",
 3726 |       "filter02": "LCR 色环",
 3727 |       "filter05": "PP",
 3728 |       "filter06": "本色"
 3729 |     },
 3730 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PP-N.jpg",
 3731 |     "detailSlug": "lcr-pp-n",
 3732 |     "status": "active",
 3733 |     "sortOrder": 128,
 3734 |     "searchKeywords": {
 3735 |       "zh": "鲁尔 色环 LCR-PP-N LCR-PP-N 809579 443-02-00163 色环 LCR 鲁尔色环 PP 本色",
 3736 |       "en": "LCR-PP-N 809579 443-02-00163 LCR PP"
 3737 |     }
 3738 |   },
 3739 |   {
 3740 |     "productId": "809580",
 3741 |     "categoryId": "fittings",
 3742 |     "productTypeId": "luer-fittings",
 3743 |     "seriesId": "lcr",
 3744 |     "cardTitle": {
 3745 |       "zh": "鲁尔色环",
 3746 |       "en": "鲁尔色环"
 3747 |     },
 3748 |     "cardSubtitle": {
 3749 |       "zh": "LCR系列\nPA材质｜白色",
 3750 |       "en": "LCR系列\nPA材质｜白色"
 3751 |     },
 3752 |     "filters": {
 3753 |       "filter01": "色环",
 3754 |       "filter02": "LCR 色环",
 3755 |       "filter05": "PA",
 3756 |       "filter06": "白色"
 3757 |     },
 3758 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-W.jpg",
 3759 |     "detailSlug": "lcr-pa-w",
 3760 |     "status": "active",
 3761 |     "sortOrder": 129,
 3762 |     "searchKeywords": {
 3763 |       "zh": "鲁尔 色环 LCR-PA-W LCR-PA-W 809580 443-02-00164 色环 LCR 鲁尔色环 PA 白色",
 3764 |       "en": "LCR-PA-W 809580 443-02-00164 LCR PA"
 3765 |     }
 3766 |   },
 3767 |   {
 3768 |     "productId": "809581",
 3769 |     "categoryId": "fittings",
 3770 |     "productTypeId": "luer-fittings",
 3771 |     "seriesId": "lcr",
 3772 |     "cardTitle": {
 3773 |       "zh": "鲁尔色环",
 3774 |       "en": "鲁尔色环"
 3775 |     },
 3776 |     "cardSubtitle": {
 3777 |       "zh": "LCR系列\nPA材质｜蓝色",
 3778 |       "en": "LCR系列\nPA材质｜蓝色"
 3779 |     },
 3780 |     "filters": {
 3781 |       "filter01": "色环",
 3782 |       "filter02": "LCR 色环",
 3783 |       "filter05": "PA",
 3784 |       "filter06": "蓝色"
 3785 |     },
 3786 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-B.jpg",
 3787 |     "detailSlug": "lcr-pa-b",
 3788 |     "status": "active",
 3789 |     "sortOrder": 130,
 3790 |     "searchKeywords": {
 3791 |       "zh": "鲁尔 色环 LCR-PA-B LCR-PA-B 809581 443-02-00165 色环 LCR 鲁尔色环 PA 蓝色",
 3792 |       "en": "LCR-PA-B 809581 443-02-00165 LCR PA"
 3793 |     }
 3794 |   },
 3795 |   {
 3796 |     "productId": "809582",
 3797 |     "categoryId": "fittings",
 3798 |     "productTypeId": "luer-fittings",
 3799 |     "seriesId": "lcr",
 3800 |     "cardTitle": {
 3801 |       "zh": "鲁尔色环",
 3802 |       "en": "鲁尔色环"
 3803 |     },
 3804 |     "cardSubtitle": {
 3805 |       "zh": "LCR系列\nPA材质｜红色",
 3806 |       "en": "LCR系列\nPA材质｜红色"
 3807 |     },
 3808 |     "filters": {
 3809 |       "filter01": "色环",
 3810 |       "filter02": "LCR 色环",
 3811 |       "filter05": "PA",
 3812 |       "filter06": "红色"
 3813 |     },
 3814 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-R.jpg",
 3815 |     "detailSlug": "lcr-pa-r",
 3816 |     "status": "active",
 3817 |     "sortOrder": 131,
 3818 |     "searchKeywords": {
 3819 |       "zh": "鲁尔 色环 LCR-PA-R LCR-PA-R 809582 443-02-00166 色环 LCR 鲁尔色环 PA 红色",
 3820 |       "en": "LCR-PA-R 809582 443-02-00166 LCR PA"
 3821 |     }
 3822 |   },
 3823 |   {
 3824 |     "productId": "809583",
 3825 |     "categoryId": "fittings",
 3826 |     "productTypeId": "luer-fittings",
 3827 |     "seriesId": "lcr",
 3828 |     "cardTitle": {
 3829 |       "zh": "鲁尔色环",
 3830 |       "en": "鲁尔色环"
 3831 |     },
 3832 |     "cardSubtitle": {
 3833 |       "zh": "LCR系列\nPA材质｜绿色",
 3834 |       "en": "LCR系列\nPA材质｜绿色"
 3835 |     },
 3836 |     "filters": {
 3837 |       "filter01": "色环",
 3838 |       "filter02": "LCR 色环",
 3839 |       "filter05": "PA",
 3840 |       "filter06": "绿色"
 3841 |     },
 3842 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-G.jpg",
 3843 |     "detailSlug": "lcr-pa-g",
 3844 |     "status": "active",
 3845 |     "sortOrder": 132,
 3846 |     "searchKeywords": {
 3847 |       "zh": "鲁尔 色环 LCR-PA-G LCR-PA-G 809583 443-02-00167 色环 LCR 鲁尔色环 PA 绿色",
 3848 |       "en": "LCR-PA-G 809583 443-02-00167 LCR PA"
 3849 |     }
 3850 |   },
 3851 |   {
 3852 |     "productId": "809584",
 3853 |     "categoryId": "fittings",
 3854 |     "productTypeId": "luer-fittings",
 3855 |     "seriesId": "lcr",
 3856 |     "cardTitle": {
 3857 |       "zh": "鲁尔色环",
 3858 |       "en": "鲁尔色环"
 3859 |     },
 3860 |     "cardSubtitle": {
 3861 |       "zh": "LCR系列\nPA材质｜紫色",
 3862 |       "en": "LCR系列\nPA材质｜紫色"
 3863 |     },
 3864 |     "filters": {
 3865 |       "filter01": "色环",
 3866 |       "filter02": "LCR 色环",
 3867 |       "filter05": "PA",
 3868 |       "filter06": "紫色"
 3869 |     },
 3870 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-U.jpg",
 3871 |     "detailSlug": "lcr-pa-u",
 3872 |     "status": "active",
 3873 |     "sortOrder": 133,
 3874 |     "searchKeywords": {
 3875 |       "zh": "鲁尔 色环 LCR-PA-U LCR-PA-U 809584 443-02-00168 色环 LCR 鲁尔色环 PA 紫色",
 3876 |       "en": "LCR-PA-U 809584 443-02-00168 LCR PA"
 3877 |     }
 3878 |   },
 3879 |   {
 3880 |     "productId": "809585",
 3881 |     "categoryId": "fittings",
 3882 |     "productTypeId": "luer-fittings",
 3883 |     "seriesId": "lcr",
 3884 |     "cardTitle": {
 3885 |       "zh": "鲁尔色环",
 3886 |       "en": "鲁尔色环"
 3887 |     },
 3888 |     "cardSubtitle": {
 3889 |       "zh": "LCR系列\nPA材质｜橙色",
 3890 |       "en": "LCR系列\nPA材质｜橙色"
 3891 |     },
 3892 |     "filters": {
 3893 |       "filter01": "色环",
 3894 |       "filter02": "LCR 色环",
 3895 |       "filter05": "PA",
 3896 |       "filter06": "橙色"
 3897 |     },
 3898 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-O.jpg",
 3899 |     "detailSlug": "lcr-pa-o",
 3900 |     "status": "active",
 3901 |     "sortOrder": 134,
 3902 |     "searchKeywords": {
 3903 |       "zh": "鲁尔 色环 LCR-PA-O LCR-PA-O 809585 443-02-00169 色环 LCR 鲁尔色环 PA 橙色",
 3904 |       "en": "LCR-PA-O 809585 443-02-00169 LCR PA"
 3905 |     }
 3906 |   },
 3907 |   {
 3908 |     "productId": "809586",
 3909 |     "categoryId": "fittings",
 3910 |     "productTypeId": "luer-fittings",
 3911 |     "seriesId": "lcr",
 3912 |     "cardTitle": {
 3913 |       "zh": "鲁尔色环",
 3914 |       "en": "鲁尔色环"
 3915 |     },
 3916 |     "cardSubtitle": {
 3917 |       "zh": "LCR系列\nPA材质｜黄色",
 3918 |       "en": "LCR系列\nPA材质｜黄色"
 3919 |     },
 3920 |     "filters": {
 3921 |       "filter01": "色环",
 3922 |       "filter02": "LCR 色环",
 3923 |       "filter05": "PA",
 3924 |       "filter06": "黄色"
 3925 |     },
 3926 |     "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-Y.jpg",
 3927 |     "detailSlug": "lcr-pa-y",
 3928 |     "status": "active",
 3929 |     "sortOrder": 135,
 3930 |     "searchKeywords": {
 3931 |       "zh": "鲁尔 色环 LCR-PA-Y LCR-PA-Y 809586 443-02-00170 色环 LCR 鲁尔色环 PA 黄色",
 3932 |       "en": "LCR-PA-Y 809586 443-02-00170 LCR PA"
 3933 |     }
 3934 |   },
 3935 |   {
 3936 |     "productId": "809587",
 3937 |     "categoryId": "fittings",
 3938 |     "productTypeId": "luer-fittings",
 3939 |     "seriesId": "lpt",
 3940 |     "cardTitle": {
 3941 |       "zh": "鲁尔内螺纹套",
 3942 |       "en": "鲁尔内螺纹套"
 3943 |     },
 3944 |     "cardSubtitle": {
 3945 |       "zh": "LPT系列\nPP材质｜本色",
 3946 |       "en": "LPT系列\nPP材质｜本色"
 3947 |     },
 3948 |     "filters": {
 3949 |       "filter01": "鲁尔内螺纹套",
 3950 |       "filter02": "LPT 内螺纹套",
 3951 |       "filter05": "PP",
 3952 |       "filter06": "本色"
 3953 |     },
 3954 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PP-N.jpg",
 3955 |     "detailSlug": "lpt-pp-n",
 3956 |     "status": "active",
 3957 |     "sortOrder": 136,
 3958 |     "searchKeywords": {
 3959 |       "zh": "鲁尔内螺纹套 LPT-PP-N LPT-PP-N 809587 443-02-00171 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PP 本色",
 3960 |       "en": "LPT-PP-N 809587 443-02-00171 LPT PP"
 3961 |     }
 3962 |   },
 3963 |   {
 3964 |     "productId": "809588",
 3965 |     "categoryId": "fittings",
 3966 |     "productTypeId": "luer-fittings",
 3967 |     "seriesId": "lpt",
 3968 |     "cardTitle": {
 3969 |       "zh": "鲁尔内螺纹套",
 3970 |       "en": "鲁尔内螺纹套"
 3971 |     },
 3972 |     "cardSubtitle": {
 3973 |       "zh": "LPT系列\nPA材质｜白色",
 3974 |       "en": "LPT系列\nPA材质｜白色"
 3975 |     },
 3976 |     "filters": {
 3977 |       "filter01": "鲁尔内螺纹套",
 3978 |       "filter02": "LPT 内螺纹套",
 3979 |       "filter05": "PA",
 3980 |       "filter06": "白色"
 3981 |     },
 3982 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-W.jpg",
 3983 |     "detailSlug": "lpt-pa-w",
 3984 |     "status": "active",
 3985 |     "sortOrder": 137,
 3986 |     "searchKeywords": {
 3987 |       "zh": "鲁尔内螺纹套 LPT-PA-W LPT-PA-W 809588 443-02-00172 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 白色",
 3988 |       "en": "LPT-PA-W 809588 443-02-00172 LPT PA"
 3989 |     }
 3990 |   },
 3991 |   {
 3992 |     "productId": "809589",
 3993 |     "categoryId": "fittings",
 3994 |     "productTypeId": "luer-fittings",
 3995 |     "seriesId": "lpt",
 3996 |     "cardTitle": {
 3997 |       "zh": "鲁尔内螺纹套",
 3998 |       "en": "鲁尔内螺纹套"
 3999 |     },
 4000 |     "cardSubtitle": {
 4001 |       "zh": "LPT系列\nPA材质｜蓝色",
 4002 |       "en": "LPT系列\nPA材质｜蓝色"
 4003 |     },
 4004 |     "filters": {
 4005 |       "filter01": "鲁尔内螺纹套",
 4006 |       "filter02": "LPT 内螺纹套",
 4007 |       "filter05": "PA",
 4008 |       "filter06": "蓝色"
 4009 |     },
 4010 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-B.jpg",
 4011 |     "detailSlug": "lpt-pa-b",
 4012 |     "status": "active",
 4013 |     "sortOrder": 138,
 4014 |     "searchKeywords": {
 4015 |       "zh": "鲁尔内螺纹套 LPT-PA-B LPT-PA-B 809589 443-02-00173 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 蓝色",
 4016 |       "en": "LPT-PA-B 809589 443-02-00173 LPT PA"
 4017 |     }
 4018 |   },
 4019 |   {
 4020 |     "productId": "809590",
 4021 |     "categoryId": "fittings",
 4022 |     "productTypeId": "luer-fittings",
 4023 |     "seriesId": "lpt",
 4024 |     "cardTitle": {
 4025 |       "zh": "鲁尔内螺纹套",
 4026 |       "en": "鲁尔内螺纹套"
 4027 |     },
 4028 |     "cardSubtitle": {
 4029 |       "zh": "LPT系列\nPA材质｜红色",
 4030 |       "en": "LPT系列\nPA材质｜红色"
 4031 |     },
 4032 |     "filters": {
 4033 |       "filter01": "鲁尔内螺纹套",
 4034 |       "filter02": "LPT 内螺纹套",
 4035 |       "filter05": "PA",
 4036 |       "filter06": "红色"
 4037 |     },
 4038 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-R.jpg",
 4039 |     "detailSlug": "lpt-pa-r",
 4040 |     "status": "active",
 4041 |     "sortOrder": 139,
 4042 |     "searchKeywords": {
 4043 |       "zh": "鲁尔内螺纹套 LPT-PA-R LPT-PA-R 809590 443-02-00174 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 红色",
 4044 |       "en": "LPT-PA-R 809590 443-02-00174 LPT PA"
 4045 |     }
 4046 |   },
 4047 |   {
 4048 |     "productId": "809591",
 4049 |     "categoryId": "fittings",
 4050 |     "productTypeId": "luer-fittings",
 4051 |     "seriesId": "lpt",
 4052 |     "cardTitle": {
 4053 |       "zh": "鲁尔内螺纹套",
 4054 |       "en": "鲁尔内螺纹套"
 4055 |     },
 4056 |     "cardSubtitle": {
 4057 |       "zh": "LPT系列\nPA材质｜绿色",
 4058 |       "en": "LPT系列\nPA材质｜绿色"
 4059 |     },
 4060 |     "filters": {
 4061 |       "filter01": "鲁尔内螺纹套",
 4062 |       "filter02": "LPT 内螺纹套",
 4063 |       "filter05": "PA",
 4064 |       "filter06": "绿色"
 4065 |     },
 4066 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-G.jpg",
 4067 |     "detailSlug": "lpt-pa-g",
 4068 |     "status": "active",
 4069 |     "sortOrder": 140,
 4070 |     "searchKeywords": {
 4071 |       "zh": "鲁尔内螺纹套 LPT-PA-G LPT-PA-G 809591 443-02-00175 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 绿色",
 4072 |       "en": "LPT-PA-G 809591 443-02-00175 LPT PA"
 4073 |     }
 4074 |   },
 4075 |   {
 4076 |     "productId": "809592",
 4077 |     "categoryId": "fittings",
 4078 |     "productTypeId": "luer-fittings",
 4079 |     "seriesId": "lpt",
 4080 |     "cardTitle": {
 4081 |       "zh": "鲁尔内螺纹套",
 4082 |       "en": "鲁尔内螺纹套"
 4083 |     },
 4084 |     "cardSubtitle": {
 4085 |       "zh": "LPT系列\nPA材质｜紫色",
 4086 |       "en": "LPT系列\nPA材质｜紫色"
 4087 |     },
 4088 |     "filters": {
 4089 |       "filter01": "鲁尔内螺纹套",
 4090 |       "filter02": "LPT 内螺纹套",
 4091 |       "filter05": "PA",
 4092 |       "filter06": "紫色"
 4093 |     },
 4094 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-U.jpg",
 4095 |     "detailSlug": "lpt-pa-u",
 4096 |     "status": "active",
 4097 |     "sortOrder": 141,
 4098 |     "searchKeywords": {
 4099 |       "zh": "鲁尔内螺纹套 LPT-PA-U LPT-PA-U 809592 443-02-00176 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 紫色",
 4100 |       "en": "LPT-PA-U 809592 443-02-00176 LPT PA"
 4101 |     }
 4102 |   },
 4103 |   {
 4104 |     "productId": "809593",
 4105 |     "categoryId": "fittings",
 4106 |     "productTypeId": "luer-fittings",
 4107 |     "seriesId": "lpt",
 4108 |     "cardTitle": {
 4109 |       "zh": "鲁尔内螺纹套",
 4110 |       "en": "鲁尔内螺纹套"
 4111 |     },
 4112 |     "cardSubtitle": {
 4113 |       "zh": "LPT系列\nPA材质｜橙色",
 4114 |       "en": "LPT系列\nPA材质｜橙色"
 4115 |     },
 4116 |     "filters": {
 4117 |       "filter01": "鲁尔内螺纹套",
 4118 |       "filter02": "LPT 内螺纹套",
 4119 |       "filter05": "PA",
 4120 |       "filter06": "橙色"
 4121 |     },
 4122 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-O.jpg",
 4123 |     "detailSlug": "lpt-pa-o",
 4124 |     "status": "active",
 4125 |     "sortOrder": 142,
 4126 |     "searchKeywords": {
 4127 |       "zh": "鲁尔内螺纹套 LPT-PA-O LPT-PA-O 809593 443-02-00177 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 橙色",
 4128 |       "en": "LPT-PA-O 809593 443-02-00177 LPT PA"
 4129 |     }
 4130 |   },
 4131 |   {
 4132 |     "productId": "809594",
 4133 |     "categoryId": "fittings",
 4134 |     "productTypeId": "luer-fittings",
 4135 |     "seriesId": "lpt",
 4136 |     "cardTitle": {
 4137 |       "zh": "鲁尔内螺纹套",
 4138 |       "en": "鲁尔内螺纹套"
 4139 |     },
 4140 |     "cardSubtitle": {
 4141 |       "zh": "LPT系列\nPA材质｜黄色",
 4142 |       "en": "LPT系列\nPA材质｜黄色"
 4143 |     },
 4144 |     "filters": {
 4145 |       "filter01": "鲁尔内螺纹套",
 4146 |       "filter02": "LPT 内螺纹套",
 4147 |       "filter05": "PA",
 4148 |       "filter06": "黄色"
 4149 |     },
 4150 |     "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-Y.jpg",
 4151 |     "detailSlug": "lpt-pa-y",
 4152 |     "status": "active",
 4153 |     "sortOrder": 143,
 4154 |     "searchKeywords": {
 4155 |       "zh": "鲁尔内螺纹套 LPT-PA-Y LPT-PA-Y 809594 443-02-00178 鲁尔内螺纹套 LPT 鲁尔内螺纹套 PA 黄色",
 4156 |       "en": "LPT-PA-Y 809594 443-02-00178 LPT PA"
 4157 |     }
 4158 |   },
 4159 |   {
 4160 |     "productId": "809596",
 4161 |     "categoryId": "fittings",
 4162 |     "productTypeId": "luer-fittings",
 4163 |     "seriesId": "lns",
 4164 |     "cardTitle": {
 4165 |       "zh": "滚花螺母",
 4166 |       "en": "滚花螺母"
 4167 |     },
 4168 |     "cardSubtitle": {
 4169 |       "zh": "LNS系列\nPP材质｜本色",
 4170 |       "en": "LNS系列\nPP材质｜本色"
 4171 |     },
 4172 |     "filters": {
 4173 |       "filter01": "滚花螺母",
 4174 |       "filter02": "LNS 滚花螺母",
 4175 |       "filter04": "1/4-28 UNF",
 4176 |       "filter05": "PP",
 4177 |       "filter06": "本色"
 4178 |     },
 4179 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PP-N.jpg",
 4180 |     "detailSlug": "lns-u28-pp-n",
 4181 |     "status": "active",
 4182 |     "sortOrder": 144,
 4183 |     "searchKeywords": {
 4184 |       "zh": "滚花螺母 LNS-U28-PP-N LNS-U28-PP-N 809596 443-02-00179 滚花螺母 LNS 滚花螺母 1/4-28 UNF PP 本色",
 4185 |       "en": "LNS-U28-PP-N 809596 443-02-00179 LNS 1/4-28 UNF PP"
 4186 |     }
 4187 |   },
 4188 |   {
 4189 |     "productId": "809597",
 4190 |     "categoryId": "fittings",
 4191 |     "productTypeId": "luer-fittings",
 4192 |     "seriesId": "lns",
 4193 |     "cardTitle": {
 4194 |       "zh": "滚花螺母",
 4195 |       "en": "滚花螺母"
 4196 |     },
 4197 |     "cardSubtitle": {
 4198 |       "zh": "LNS系列\nPA材质｜白色",
 4199 |       "en": "LNS系列\nPA材质｜白色"
 4200 |     },
 4201 |     "filters": {
 4202 |       "filter01": "滚花螺母",
 4203 |       "filter02": "LNS 滚花螺母",
 4204 |       "filter04": "1/4-28 UNF",
 4205 |       "filter05": "PA",
 4206 |       "filter06": "白色"
 4207 |     },
 4208 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-W.jpg",
 4209 |     "detailSlug": "lns-u28-pa-w",
 4210 |     "status": "active",
 4211 |     "sortOrder": 145,
 4212 |     "searchKeywords": {
 4213 |       "zh": "滚花螺母 LNS-U28-PA-W LNS-U28-PA-W 809597 443-02-00180 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 白色",
 4214 |       "en": "LNS-U28-PA-W 809597 443-02-00180 LNS 1/4-28 UNF PA"
 4215 |     }
 4216 |   },
 4217 |   {
 4218 |     "productId": "809598",
 4219 |     "categoryId": "fittings",
 4220 |     "productTypeId": "luer-fittings",
 4221 |     "seriesId": "lns",
 4222 |     "cardTitle": {
 4223 |       "zh": "滚花螺母",
 4224 |       "en": "滚花螺母"
 4225 |     },
 4226 |     "cardSubtitle": {
 4227 |       "zh": "LNS系列\nPA材质｜蓝色",
 4228 |       "en": "LNS系列\nPA材质｜蓝色"
 4229 |     },
 4230 |     "filters": {
 4231 |       "filter01": "滚花螺母",
 4232 |       "filter02": "LNS 滚花螺母",
 4233 |       "filter04": "1/4-28 UNF",
 4234 |       "filter05": "PA",
 4235 |       "filter06": "蓝色"
 4236 |     },
 4237 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-B.jpg",
 4238 |     "detailSlug": "lns-u28-pa-b",
 4239 |     "status": "active",
 4240 |     "sortOrder": 146,
 4241 |     "searchKeywords": {
 4242 |       "zh": "滚花螺母 LNS-U28-PA-B LNS-U28-PA-B 809598 443-02-00181 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 蓝色",
 4243 |       "en": "LNS-U28-PA-B 809598 443-02-00181 LNS 1/4-28 UNF PA"
 4244 |     }
 4245 |   },
 4246 |   {
 4247 |     "productId": "809599",
 4248 |     "categoryId": "fittings",
 4249 |     "productTypeId": "luer-fittings",
 4250 |     "seriesId": "lns",
 4251 |     "cardTitle": {
 4252 |       "zh": "滚花螺母",
 4253 |       "en": "滚花螺母"
 4254 |     },
 4255 |     "cardSubtitle": {
 4256 |       "zh": "LNS系列\nPA材质｜红色",
 4257 |       "en": "LNS系列\nPA材质｜红色"
 4258 |     },
 4259 |     "filters": {
 4260 |       "filter01": "滚花螺母",
 4261 |       "filter02": "LNS 滚花螺母",
 4262 |       "filter04": "1/4-28 UNF",
 4263 |       "filter05": "PA",
 4264 |       "filter06": "红色"
 4265 |     },
 4266 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-R.jpg",
 4267 |     "detailSlug": "lns-u28-pa-r",
 4268 |     "status": "active",
 4269 |     "sortOrder": 147,
 4270 |     "searchKeywords": {
 4271 |       "zh": "滚花螺母 LNS-U28-PA-R LNS-U28-PA-R 809599 443-02-00182 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 红色",
 4272 |       "en": "LNS-U28-PA-R 809599 443-02-00182 LNS 1/4-28 UNF PA"
 4273 |     }
 4274 |   },
 4275 |   {
 4276 |     "productId": "809600",
 4277 |     "categoryId": "fittings",
 4278 |     "productTypeId": "luer-fittings",
 4279 |     "seriesId": "lns",
 4280 |     "cardTitle": {
 4281 |       "zh": "滚花螺母",
 4282 |       "en": "滚花螺母"
 4283 |     },
 4284 |     "cardSubtitle": {
 4285 |       "zh": "LNS系列\nPA材质｜绿色",
 4286 |       "en": "LNS系列\nPA材质｜绿色"
 4287 |     },
 4288 |     "filters": {
 4289 |       "filter01": "滚花螺母",
 4290 |       "filter02": "LNS 滚花螺母",
 4291 |       "filter04": "1/4-28 UNF",
 4292 |       "filter05": "PA",
 4293 |       "filter06": "绿色"
 4294 |     },
 4295 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-G.jpg",
 4296 |     "detailSlug": "lns-u28-pa-g",
 4297 |     "status": "active",
 4298 |     "sortOrder": 148,
 4299 |     "searchKeywords": {
 4300 |       "zh": "滚花螺母 LNS-U28-PA-G LNS-U28-PA-G 809600 443-02-00183 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 绿色",
 4301 |       "en": "LNS-U28-PA-G 809600 443-02-00183 LNS 1/4-28 UNF PA"
 4302 |     }
 4303 |   },
 4304 |   {
 4305 |     "productId": "809601",
 4306 |     "categoryId": "fittings",
 4307 |     "productTypeId": "luer-fittings",
 4308 |     "seriesId": "lns",
 4309 |     "cardTitle": {
 4310 |       "zh": "滚花螺母",
 4311 |       "en": "滚花螺母"
 4312 |     },
 4313 |     "cardSubtitle": {
 4314 |       "zh": "LNS系列\nPA材质｜紫色",
 4315 |       "en": "LNS系列\nPA材质｜紫色"
 4316 |     },
 4317 |     "filters": {
 4318 |       "filter01": "滚花螺母",
 4319 |       "filter02": "LNS 滚花螺母",
 4320 |       "filter04": "1/4-28 UNF",
 4321 |       "filter05": "PA",
 4322 |       "filter06": "紫色"
 4323 |     },
 4324 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-U.jpg",
 4325 |     "detailSlug": "lns-u28-pa-u",
 4326 |     "status": "active",
 4327 |     "sortOrder": 149,
 4328 |     "searchKeywords": {
 4329 |       "zh": "滚花螺母 LNS-U28-PA-U LNS-U28-PA-U 809601 443-02-00184 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 紫色",
 4330 |       "en": "LNS-U28-PA-U 809601 443-02-00184 LNS 1/4-28 UNF PA"
 4331 |     }
 4332 |   },
 4333 |   {
 4334 |     "productId": "809602",
 4335 |     "categoryId": "fittings",
 4336 |     "productTypeId": "luer-fittings",
 4337 |     "seriesId": "lns",
 4338 |     "cardTitle": {
 4339 |       "zh": "滚花螺母",
 4340 |       "en": "滚花螺母"
 4341 |     },
 4342 |     "cardSubtitle": {
 4343 |       "zh": "LNS系列\nPA材质｜橙色",
 4344 |       "en": "LNS系列\nPA材质｜橙色"
 4345 |     },
 4346 |     "filters": {
 4347 |       "filter01": "滚花螺母",
 4348 |       "filter02": "LNS 滚花螺母",
 4349 |       "filter04": "1/4-28 UNF",
 4350 |       "filter05": "PA",
 4351 |       "filter06": "橙色"
 4352 |     },
 4353 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-O.jpg",
 4354 |     "detailSlug": "lns-u28-pa-o",
 4355 |     "status": "active",
 4356 |     "sortOrder": 150,
 4357 |     "searchKeywords": {
 4358 |       "zh": "滚花螺母 LNS-U28-PA-O LNS-U28-PA-O 809602 443-02-00185 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 橙色",
 4359 |       "en": "LNS-U28-PA-O 809602 443-02-00185 LNS 1/4-28 UNF PA"
 4360 |     }
 4361 |   },
 4362 |   {
 4363 |     "productId": "809603",
 4364 |     "categoryId": "fittings",
 4365 |     "productTypeId": "luer-fittings",
 4366 |     "seriesId": "lns",
 4367 |     "cardTitle": {
 4368 |       "zh": "滚花螺母",
 4369 |       "en": "滚花螺母"
 4370 |     },
 4371 |     "cardSubtitle": {
 4372 |       "zh": "LNS系列\nPA材质｜黄色",
 4373 |       "en": "LNS系列\nPA材质｜黄色"
 4374 |     },
 4375 |     "filters": {
 4376 |       "filter01": "滚花螺母",
 4377 |       "filter02": "LNS 滚花螺母",
 4378 |       "filter04": "1/4-28 UNF",
 4379 |       "filter05": "PA",
 4380 |       "filter06": "黄色"
 4381 |     },
 4382 |     "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-Y.jpg",
 4383 |     "detailSlug": "lns-u28-pa-y",
 4384 |     "status": "active",
 4385 |     "sortOrder": 151,
 4386 |     "searchKeywords": {
 4387 |       "zh": "滚花螺母 LNS-U28-PA-Y LNS-U28-PA-Y 809603 443-02-00186 滚花螺母 LNS 滚花螺母 1/4-28 UNF PA 黄色",
 4388 |       "en": "LNS-U28-PA-Y 809603 443-02-00186 LNS 1/4-28 UNF PA"
 4389 |     }
 4390 |   }
 4391 | ];
 4392 | 
 4393 | export const luerFittingSelectionFilterLabels:
 4394 |   ProductSelectionFilterLabel[] =
 4395 | [
 4396 |   {
 4397 |     "categoryId": "fittings",
 4398 |     "productTypeId": "luer-fittings",
 4399 |     "filterKey": "filter01",
 4400 |     "label": {
 4401 |       "zh": "产品类型",
 4402 |       "en": "Product Type",
 4403 |       "es": "Product Type",
 4404 |       "fr": "Product Type",
 4405 |       "ko": "Product Type",
 4406 |       "ru": "Product Type"
 4407 |     },
...
 4410 |     "visible": true
 4411 |   },
 4412 |   {
 4413 |     "categoryId": "fittings",
 4414 |     "productTypeId": "luer-fittings",
 4415 |     "filterKey": "filter02",
 4416 |     "label": {
 4417 |       "zh": "产品系列",
 4418 |       "en": "Product Series",
 4419 |       "es": "Product Series",
 4420 |       "fr": "Product Series",
 4421 |       "ko": "Product Series",
 4422 |       "ru": "Product Series"
...
 4426 |     "visible": true
 4427 |   },
 4428 |   {
 4429 |     "categoryId": "fittings",
 4430 |     "productTypeId": "luer-fittings",
 4431 |     "filterKey": "filter03",
 4432 |     "label": {
 4433 |       "zh": "接管内径",
 4434 |       "en": "Tube Inner Diameter",
 4435 |       "es": "Tube Inner Diameter",
 4436 |       "fr": "Tube Inner Diameter",
 4437 |       "ko": "Tube Inner Diameter",
 4438 |       "ru": "Tube Inner Diameter"
...
 4442 |     "visible": true
 4443 |   },
 4444 |   {
 4445 |     "categoryId": "fittings",
 4446 |     "productTypeId": "luer-fittings",
 4447 |     "filterKey": "filter04",
 4448 |     "label": {
 4449 |       "zh": "螺纹规格",
 4450 |       "en": "Thread",
 4451 |       "es": "Thread",
 4452 |       "fr": "Thread",
 4453 |       "ko": "Thread",
 4454 |       "ru": "Thread"
...
 4458 |     "visible": true
 4459 |   },
 4460 |   {
 4461 |     "categoryId": "fittings",
 4462 |     "productTypeId": "luer-fittings",
 4463 |     "filterKey": "filter05",
 4464 |     "label": {
 4465 |       "zh": "材质",
 4466 |       "en": "Material",
 4467 |       "es": "Material",
 4468 |       "fr": "Material",
 4469 |       "ko": "Material",
 4470 |       "ru": "Material"
...
 4474 |     "visible": true
 4475 |   },
 4476 |   {
 4477 |     "categoryId": "fittings",
 4478 |     "productTypeId": "luer-fittings",
 4479 |     "filterKey": "filter06",
 4480 |     "label": {
 4481 |       "zh": "颜色",
 4482 |       "en": "Color",
 4483 |       "es": "Color",
 4484 |       "fr": "Color",
 4485 |       "ko": "Color",
 4486 |       "ru": "Color"
...
 4490 |     "visible": true
 4491 |   }
 4492 | ];
 4493 | 
 4494 | export const luerFittingSelectionTaxonomyItems:
 4495 |   ProductSelectionTaxonomyItem[] =
 4496 | [
 4497 |   {
 4498 |     "type": "productType",
 4499 |     "id": "luer-fittings",
 4500 |     "label": {
 4501 |       "zh": "鲁尔接头",
 4502 |       "en": "Luer Fittings",
 4503 |       "es": "Luer Fittings",
 4504 |       "fr": "Luer Fittings",
 4505 |       "ko": "Luer Fittings",
 4506 |       "ru": "Luer Fittings"
 4507 |     },
 4508 |     "sortOrder": 40
 4509 |   }
 4510 | ];
 4511 | 
```

## 鲁尔接头生成数据确认

- 产品记录：151
- 筛选标签：6
- 包含 productTypeId=luer-fittings：true

## 下一步

根据当前聚合文件的实际结构，将鲁尔接头的产品、筛选标签和产品分类追加进去，并补充产品中心路由。

