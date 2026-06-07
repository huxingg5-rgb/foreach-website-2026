# 接头替代查询模块｜新增系列操作文档

> 文件路径：  
> `docs/resources/fitting-replacement-add-new-series.md`

> 适用模块：  
> 接头替代查询 / Fitting Replacement  
> 当前已完成基础系列：`q20`  
> 后续可新增：`q40`、`q60`、硬管接头、倒刺接头、鲁尔接头等。

---

## 1. 文档目的

这个文档用于指导后续在官网中新增一个“接头替代查询系列”。

例如：

```txt
已有：
Q20 快插接头

后续可能新增：
Q40 快插接头
Q60 快插接头
硬管接头
倒刺接头
鲁尔接头
过滤接头
止回接头
```

新增系列时，原则上不要重新写一套页面组件，而是复用现有结构：

```txt
页面入口 page.tsx
  ↓
services 数据服务层
  ↓
data 系列静态数据 / 多语言文案
  ↓
components 公共展示组件
  ↓
public 图片 / PDF 静态资源
```

这样后续接后端、CMS、数据库时，只需要优先改 `services` 和 `data`，不需要大面积重写组件。

---

## 2. 当前模块结构总览

当前接头替代查询模块主要由这些文件组成：

```txt
app
└─ resources
   └─ selection-support
      └─ fitting-replacement
         ├─ page.tsx
         ├─ fitting-replacement.css
         └─ q20
            └─ [productCode]
               ├─ page.tsx
               └─ fitting-replacement-detail.css

app
└─ [locale]
   └─ resources
      └─ selection-support
         └─ fitting-replacement
            ├─ page.tsx
            └─ q20
               └─ [productCode]
                  └─ page.tsx

components
└─ resources
   └─ fitting-replacement
      ├─ FittingReplacementHome.tsx
      ├─ FittingReplacementGuide.tsx
      ├─ FittingReplacementDetail.tsx
      ├─ FittingReplacementDrawingPreview.tsx
      ├─ FittingReplacementFaq.tsx
      └─ FittingSelectionCart.tsx

components
└─ common
   ├─ breadcrumb
   └─ product-card

data
└─ resources
   └─ fitting-replacement
      ├─ fitting-replacement.types.ts
      ├─ fitting-replacement-series.config.ts
      └─ fittings
         └─ quick-connect
            └─ q20
               ├─ q20.zh.ts
               ├─ q20.page.intl.ts
               └─ q20.detail.intl.ts

services
└─ resources
   ├─ getFittingReplacementHomeData.ts
   ├─ getFittingReplacementDetailData.ts
   └─ fitting-replacement
      └─ fittingReplacementModelParser.ts

scripts
└─ resources
   └─ convert-q20-fitting-replacement.ts

public
└─ images
   └─ resources
      └─ selection-support
         └─ fitting-replacement
            └─ q20
               └─ products

public
└─ downloads
   └─ resources
      └─ selection-support
         └─ fitting-replacement
            └─ q20
               └─ drawings
```

---

## 3. 新增系列前先确定这些信息

新增一个系列前，先确定下面这些字段：

```txt
系列名称：Q40 快插接头
seriesKey：q40
seriesCode：Q40
URL 路径：/resources/selection-support/fitting-replacement/q40/[productCode]
中文产品名称：Q40 快插接头
英文产品名称：Q40 Quick-connect Fitting
西语产品名称：Conector Q40
法语产品名称：Raccord Q40
韩语产品名称：Q40 퀵 커넥트 피팅
俄语产品名称：Фитинг Q40
```

注意：

```txt
seriesKey 一律小写短横线或小写数字组合
例如：
q40
q60
hard-tube
barbed
luer
```

不要使用：

```txt
Q40
Q-40
q_40
Q40Series
```

---

## 4. 新增系列需要新增 / 修改的文件清单

以新增 `q40` 为例，需要处理这些文件。

### 4.1 新增数据文件

新建：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh.ts
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.page.intl.ts
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.detail.intl.ts
```

作用：

```txt
q40.zh.ts
  存放 Q40 产品数据和型号解析规则

q40.page.intl.ts
  存放 Q40 首页多语言文案

q40.detail.intl.ts
  存放 Q40 详情页多语言文案
```

---

### 4.2 修改系列配置

修改：

```txt
data/resources/fitting-replacement/fitting-replacement-series.config.ts
```

需要做：

```txt
1. 扩展 FittingReplacementSeriesKey
2. 新增 Q40_FITTING_REPLACEMENT_SERIES_CONFIG
3. 加入 FITTING_REPLACEMENT_SERIES_CONFIG_MAP
```

示例：

```ts
export type FittingReplacementSeriesKey = "q20" | "q40";
```

新增配置示例：

```ts
export const Q40_FITTING_REPLACEMENT_SERIES_CONFIG: FittingReplacementSeriesConfig =
  {
    seriesKey: "q40",
    seriesCode: "Q40",
    productName: "Q40 快插接头",
    sourceType: "fitting-replacement",
    sourceLabel: "接头替代查询",
    homeHref: "/resources/selection-support/fitting-replacement",
    detailBaseHref: "/resources/selection-support/fitting-replacement/q40",
    drawingBaseHref:
      "/downloads/resources/selection-support/fitting-replacement/q40/drawings",
  };
```

配置集合增加：

```ts
export const FITTING_REPLACEMENT_SERIES_CONFIG_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementSeriesConfig
> = {
  q20: Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  q40: Q40_FITTING_REPLACEMENT_SERIES_CONFIG,
};
```

---

### 4.3 修改数据服务层

需要修改：

```txt
services/resources/getFittingReplacementHomeData.ts
services/resources/getFittingReplacementDetailData.ts
```

目的：

```txt
让 service 知道 q40 的数据来源
让首页和详情页可以根据 seriesKey 读取不同系列
```

当前 Q20 是静态数据源，新增 Q40 时要加入类似配置。

示例结构：

```ts
const FITTING_REPLACEMENT_HOME_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementHomeStaticDataSource
> = {
  q20: {
    pageData: fittingReplacementQuickConnectQ20ZhData,
    getPageIntl: getFittingReplacementQuickConnectQ20PageIntl,
  },

  q40: {
    pageData: fittingReplacementQuickConnectQ40ZhData,
    getPageIntl: getFittingReplacementQuickConnectQ40PageIntl,
  },
};
```

详情页同理：

```ts
const FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementStaticDataSource
> = {
  q20: {
    pageData: fittingReplacementQuickConnectQ20ZhData,
    getDetailIntl: getFittingReplacementQuickConnectQ20DetailIntl,
  },

  q40: {
    pageData: fittingReplacementQuickConnectQ40ZhData,
    getDetailIntl: getFittingReplacementQuickConnectQ40DetailIntl,
  },
};
```

注意：

```txt
如果 service 当前还只写死 q20，需要先把结构整理成 map。
不要在组件里判断 q20 / q40。
组件只接收 service 返回的数据。
```

---

### 4.4 新增页面路由

如果新增 Q40 详情页，需要新建中文路由：

```txt
app/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

也需要新建外语路由：

```txt
app/[locale]/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

这两个文件可以复制 Q20 的详情页入口，然后只改：

```ts
const SERIES_CONFIG = Q40_FITTING_REPLACEMENT_SERIES_CONFIG;
```

中文详情页固定传：

```ts
const PAGE_LOCALE = "zh";
```

外语详情页使用：

```ts
locale
```

注意：

```txt
中文路径不加 /zh-CN
英文路径才是 /en
西语路径才是 /es
法语路径才是 /fr
韩语路径才是 /ko
俄语路径才是 /ru
```

---

### 4.5 新增图片资源

产品图片放这里：

```txt
public/images/resources/selection-support/fitting-replacement/q40/products
```

命名规则：

```txt
Q4001-PMV-SPPE.webp
Q4001-PMV-SACN.webp
```

页面引用路径：

```txt
/images/resources/selection-support/fitting-replacement/q40/products/Q4001-PMV-SPPE.webp
```

注意：

```txt
图片文件名建议和 foreachModel 保持一致。
这样数据导入脚本可以自动生成 imagePath。
```

---

### 4.6 新增图纸 PDF

图纸 PDF 放这里：

```txt
public/downloads/resources/selection-support/fitting-replacement/q40/drawings
```

命名规则：

```txt
Q4001-PMV-SPPE.pdf
Q4001-PMV-SACN.pdf
```

页面引用路径：

```txt
/downloads/resources/selection-support/fitting-replacement/q40/drawings/Q4001-PMV-SPPE.pdf
```

注意：

```txt
PDF 文件名必须和 foreachModel 一致。
否则详情页 PDF 预览会找不到文件。
```

---

## 5. Excel 数据源规则

当前 Q20 使用 Excel 转换脚本生成静态数据。

现有脚本：

```txt
scripts/resources/convert-q20-fitting-replacement.ts
```

后续新增系列有两种方式。

---

### 5.1 简单方式：复制一个 Q40 转换脚本

复制：

```txt
scripts/resources/convert-q20-fitting-replacement.ts
```

新建：

```txt
scripts/resources/convert-q40-fitting-replacement.ts
```

修改：

```ts
const SOURCE_EXCEL_PATH = path.join(
  PROJECT_ROOT,
  "data-source",
  "resources",
  "fitting-replacement",
  "Q40系列_测试数据.xlsx"
);

const OUTPUT_TS_PATH = path.join(
  PROJECT_ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "fittings/quick-connect/q40/q40.zh.ts"
);

const TARGET_SERIES = "Q40";
```

执行：

```powershell
npx tsx scripts/resources/convert-q40-fitting-replacement.ts
```

优点：

```txt
简单
不容易影响 Q20
适合前期快速做
```

缺点：

```txt
Q20 / Q40 / Q60 脚本重复
后期维护成本较高
```

---

### 5.2 推荐方式：做一个通用转换脚本

后期建议改成：

```txt
scripts/resources/convert-fitting-replacement-series.ts
```

执行方式：

```powershell
npx tsx scripts/resources/convert-fitting-replacement-series.ts q40
npx tsx scripts/resources/convert-fitting-replacement-series.ts q60
```

脚本根据传入的 seriesKey 自动判断：

```txt
输入 Excel
输出 TS 文件
图片路径
PDF 路径
TARGET_SERIES
```

示例映射：

```ts
const SERIES_CONVERT_CONFIG = {
  q20: {
    targetSeries: "Q20",
    sourceExcel: "Q20系列_测试数据.xlsx",
    outputFile:
      "data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts",
    imageBasePath:
      "/images/resources/selection-support/fitting-replacement/q20/products",
    drawingBasePath:
      "/downloads/resources/selection-support/fitting-replacement/q20/drawings",
  },

  q40: {
    targetSeries: "Q40",
    sourceExcel: "Q40系列_测试数据.xlsx",
    outputFile:
      "data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh.ts",
    imageBasePath:
      "/images/resources/selection-support/fitting-replacement/q40/products",
    drawingBasePath:
      "/downloads/resources/selection-support/fitting-replacement/q40/drawings",
  },
};
```

---

## 6. Excel 表格字段要求

Excel 至少需要这两个 Sheet：

```txt
型号解析规则
产品数据模板
```

### 6.1 型号解析规则 Sheet

建议字段：

```txt
适用系列
字段顺序
字段名称
位置说明
代码
含义_中文
Meaning_English
Significado_Español
Signification_Français
의미_한국어
Значение_Русский
```

注意：

```txt
同一个代码在不同字段里可能含义不同。
例如 S 在“公母端”里可能是母端；
S 在“形状”里可能是直通。
所以不能只按代码判断，一定要按 fieldKey + code 判断。
```

---

### 6.2 产品数据模板 Sheet

建议字段：

```txt
商品编码
型号
竞品A编码
竞品B编码
竞品C编码
包装
是否首页展示
备注
```

后续如果竞品编码很多，可以扩展为：

```txt
竞品A编码
竞品B编码
竞品C编码
竞品D编码
竞品E编码
```

或者后期改成：

```txt
兼容编码
```

里面用英文逗号或斜杠分隔。

注意：

```txt
商品编码不能为空
型号不能为空
型号必须和 PDF / 图片文件名保持一致
是否首页展示 建议填 是 / 否
```

---

## 7. 多语言文案文件规则

每个系列都要有两个多语言文案文件：

```txt
q40.page.intl.ts
q40.detail.intl.ts
```

---

### 7.1 page.intl.ts 负责首页

主要包含：

```txt
banner
breadcrumbs
search
homeText.tabs
homeText.history
homeText.guide
homeText.productSection
homeText.productCard
homeText.emptyResult
homeText.pagination
```

必须包含 6 种语言：

```txt
zh
en
es
fr
ko
ru
```

注意：

```txt
按钮文案尽量短。
法语、俄语、西语不要硬翻长句。
产品卡片里尤其要短。
```

推荐按钮文案：

```txt
英文：View Details / Add to List
西语：Detalles / Añadir
法语：Détails / Ajouter
韩语：상세 보기 / 추가
俄语：Детали / Добавить
```

---

### 7.2 detail.intl.ts 负责详情页

主要包含：

```txt
breadcrumbs
tableLabels
actions
drawingPreview
faq
```

其中：

```txt
drawingPreview
```

控制详情页 2D 图纸区域：

```txt
title
loadingLabel
previewButton
description
```

注意：

```txt
PDF iframe 应进入页面就挂载预加载。
点击“预览图纸”只是隐藏封面，不应该点击后才开始加载 PDF。
```

---

## 8. 详情页路径规则

中文详情页：

```txt
/resources/selection-support/fitting-replacement/q40/商品编码
```

英文详情页：

```txt
/en/resources/selection-support/fitting-replacement/q40/商品编码
```

西语详情页：

```txt
/es/resources/selection-support/fitting-replacement/q40/商品编码
```

法语详情页：

```txt
/fr/resources/selection-support/fitting-replacement/q40/商品编码
```

韩语详情页：

```txt
/ko/resources/selection-support/fitting-replacement/q40/商品编码
```

俄语详情页：

```txt
/ru/resources/selection-support/fitting-replacement/q40/商品编码
```

不要出现：

```txt
/zh-CN/resources/selection-support/fitting-replacement/q40/商品编码
/fr-FR/resources/selection-support/fitting-replacement/q40/商品编码
/ru-RU/resources/selection-support/fitting-replacement/q40/商品编码
```

---

## 9. 详情页链接生成规则

详情页链接统一从这里生成：

```txt
data/resources/fitting-replacement/fitting-replacement-series.config.ts
```

函数：

```ts
getFittingReplacementDetailHref(productCode, seriesKey, locale)
```

要求：

```txt
中文 locale = zh，不加前缀
外语 locale = en / es / fr / ko / ru，加对应前缀
```

不要在组件里手写：

```ts
`/resources/selection-support/fitting-replacement/q40/${productCode}`
```

应该统一写：

```ts
getFittingReplacementDetailHref(
  product.productCode,
  SERIES_CONFIG.seriesKey,
  locale
)
```

否则会出现：

```txt
外语首页点击详情后跳回中文详情页
```

---

## 10. 卡片显示规则

首页产品卡片只展示核心信息：

```txt
产品名称
商品编码
恒永达型号
兼容编码
查看详情
加入清单
```

注意：

```txt
兼容编码可能很长。
卡片里不要强行显示全部内容撑开布局。
```

当前规则：

```txt
卡片中显示完整字符串，但 CSS 限制一行。
超出宽度用省略号。
鼠标 hover 时通过 title 查看完整内容。
详情页显示完整兼容编码。
```

实现位置：

```txt
components/common/product-card/ProductBasicCard.tsx
components/common/product-card/ProductBasicCard.module.css
```

---

## 11. 清单逻辑规则

产品清单由全局 Provider 管理：

```txt
components/selection-cart/SelectionCartProvider.tsx
```

当前按钮逻辑应该是：

```txt
未加入清单 → 显示“加入清单”
点击后 → 加入清单，按钮变成“已加入清单”
再次点击 → 从清单移除，按钮恢复“加入清单”
```

不要做成：

```txt
每点一次就重复增加一个相同型号
```

因为接头替代查询场景里，一个型号通常只需要加入一次，数量后续可以在清单里调整。

---

## 12. 图纸逻辑规则

详情页有两个动作：

```txt
加入清单
添加图纸
```

含义：

```txt
加入清单：
表示客户关注这个产品型号。

添加图纸：
表示客户希望后续提交需求时，把该型号 2D 图纸也纳入资料范围。
```

注意：

```txt
添加图纸时，如果产品还没加入清单，需要自动加入清单，并设置 needDrawing = true。
```

PDF 预览逻辑：

```txt
进入详情页后 iframe 立即挂载，提前加载 PDF。
用户看到的是“点击预览图纸”的封面。
点击封面后，隐藏封面，显示已加载的 PDF。
```

---

## 13. 图纸数量限制建议

当前静态官网如果要限制图纸数量，只能做前端软限制。

建议规则：

```txt
同一浏览器一周最多申请 20 份图纸。
超过 20 份后提示联系销售。
```

提示文案：

```txt
本周图纸申请数量已达上限。
如需更多型号图纸或批量资料，请联系销售团队，我们将为您统一整理发送。
```

注意：

```txt
前端限制可以被清缓存、换浏览器、无痕模式绕过。
真正限制“一个人一周 20 份图纸”，必须后期接后端，用邮箱验证码识别用户。
```

后期正式方案：

```txt
邮箱验证码
  ↓
后端记录邮箱、本周图纸数量、图纸型号、IP、时间
  ↓
超过 20 份，不自动发送，提示联系销售
```

---

## 14. Banner 图片规则

接头替代查询 Banner 图片建议放在：

```txt
public/images/resources/selection-support/banner
```

命名示例：

```txt
resources-selection-support-fitting-replacement-banner-1920x520-v001.webp
```

页面引用路径：

```txt
/images/resources/selection-support/banner/resources-selection-support-fitting-replacement-banner-1920x520-v001.webp
```

注意：

```txt
不要把文字做进图片。
标题和描述仍然用多语言数据渲染。
图片只做背景。
```

推荐尺寸：

```txt
1920 × 520 px
```

如果页面需要更高：

```txt
1920 × 600 px
```

---

## 15. CSS 规则

接头替代查询首页 CSS：

```txt
app/resources/selection-support/fitting-replacement/fitting-replacement.css
```

详情页 CSS：

```txt
app/resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css
```

新增系列如果复用详情页样式，可以直接 import 同一份 CSS。

注意：

```txt
不要把资源中心、接头替代查询、详情页样式继续堆到 app/globals.css。
```

公共产品卡片样式：

```txt
components/common/product-card/ProductBasicCard.module.css
```

这个文件会影响：

```txt
接头替代查询首页卡片
接头选型指引结果卡片
未来其它使用 ProductBasicCard 的页面
```

修改时要注意影响范围。

---

## 16. 新增 Q40 标准步骤

以新增 Q40 为例，完整步骤如下。

### 第 1 步：准备资源文件

新建文件夹：

```txt
public/images/resources/selection-support/fitting-replacement/q40/products
public/downloads/resources/selection-support/fitting-replacement/q40/drawings
```

放入：

```txt
Q40 产品图 .webp
Q40 图纸 .pdf
```

---

### 第 2 步：准备 Excel

放入：

```txt
data-source/resources/fitting-replacement/Q40系列_测试数据.xlsx
```

确保包含：

```txt
型号解析规则
产品数据模板
```

---

### 第 3 步：生成 q40.zh.ts

简单方案：

```txt
复制 convert-q20-fitting-replacement.ts
改成 convert-q40-fitting-replacement.ts
```

执行：

```powershell
npx tsx scripts/resources/convert-q40-fitting-replacement.ts
```

生成：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh.ts
```

---

### 第 4 步：新增多语言文案

新建：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.page.intl.ts
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.detail.intl.ts
```

可以复制 Q20 的文案文件，再把：

```txt
Q20
q20
Q20 快插接头
```

替换为：

```txt
Q40
q40
Q40 快插接头
```

然后逐一检查 6 种语言。

---

### 第 5 步：扩展系列配置

修改：

```txt
data/resources/fitting-replacement/fitting-replacement-series.config.ts
```

增加：

```txt
q40
Q40_FITTING_REPLACEMENT_SERIES_CONFIG
```

---

### 第 6 步：扩展 service 数据源

修改：

```txt
services/resources/getFittingReplacementHomeData.ts
services/resources/getFittingReplacementDetailData.ts
```

让 service 支持：

```txt
seriesKey = q40
```

---

### 第 7 步：新增详情页路由

新建中文详情页：

```txt
app/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

新建外语详情页：

```txt
app/[locale]/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

---

### 第 8 步：检查导航入口

如果 Q40 暂时不作为单独入口，可以先不改导航。

如果要在页面上增加系列切换，后续再新增：

```txt
Q20
Q40
Q60
```

系列切换组件。

暂时建议：

```txt
先不要做系列切换。
先把 Q40 详情页链路跑通。
再考虑首页如何展示多个系列。
```

---

## 17. 测试清单

新增系列后必须测试。

### 17.1 build 测试

```powershell
npm run build
```

必须通过。

---

### 17.2 中文路径测试

```txt
/resources/selection-support/fitting-replacement
/resources/selection-support/fitting-replacement/q40/839041
```

注意：

```txt
商品编码要换成 Q40 真实商品编码。
```

---

### 17.3 外语路径测试

```txt
/en/resources/selection-support/fitting-replacement/q40/商品编码
/es/resources/selection-support/fitting-replacement/q40/商品编码
/fr/resources/selection-support/fitting-replacement/q40/商品编码
/ko/resources/selection-support/fitting-replacement/q40/商品编码
/ru/resources/selection-support/fitting-replacement/q40/商品编码
```

检查：

```txt
1. 面包屑语言是否正确
2. 表格字段语言是否正确
3. 按钮语言是否正确
4. FAQ 语言是否正确
5. 2D 图纸文案语言是否正确
6. PDF 是否能预览
```

---

### 17.4 详情页跳转测试

从外语首页点击详情：

```txt
/en/resources/selection-support/fitting-replacement
```

点击产品卡片：

```txt
View Details
```

应该进入：

```txt
/en/resources/selection-support/fitting-replacement/q40/商品编码
```

不能跳回：

```txt
/resources/selection-support/fitting-replacement/q40/商品编码
```

---

### 17.5 清单测试

测试：

```txt
第一次点击加入清单
  → 按钮变成已加入清单

第二次点击已加入清单
  → 从清单移除，按钮恢复加入清单

详情页点击添加图纸
  → 如果产品未加入清单，需要自动加入清单并标记 needDrawing = true
```

---

### 17.6 图片和 PDF 测试

检查控制台是否有 404：

```txt
产品图 .webp 不能 404
图纸 .pdf 不能 404
```

如果 404，优先检查：

```txt
1. 文件名是否和 foreachModel 完全一致
2. 后缀是否正确
3. public 路径是否正确
4. 数据里的 imagePath / drawingPdfPath 是否正确
```

---

## 18. 常见错误

### 错误 1：外语详情页跳回中文

原因：

```txt
getFittingReplacementDetailHref 没有传 locale
```

修复：

```ts
getFittingReplacementDetailHref(
  product.productCode,
  SERIES_CONFIG.seriesKey,
  locale
)
```

---

### 错误 2：PDF 不能打开

可能原因：

```txt
1. PDF 文件损坏
2. PDF 文件被加密软件处理过
3. 文件名前后空格
4. 文件名和 foreachModel 不一致
5. public 路径写错
```

检查命令示例：

```powershell
Format-Hex -Path ".\public\downloads\resources\selection-support\fitting-replacement\q40\drawings\Q4001-PMV-SPPE.pdf" | Select-Object -First 2
```

正常 PDF 开头应该能看到：

```txt
%PDF
```

---

### 错误 3：图片不显示

可能原因：

```txt
1. 图片路径不对
2. 图片文件名和型号不一致
3. 图片格式不是 webp
4. 文件没有放到 public 目录
```

---

### 错误 4：TypeScript 报 readonly 类型错误

原因：

```txt
intl.ts 文件用了 as const
组件 props 里如果写普通数组，会和 readonly 数组类型冲突
```

解决：

```ts
readonly items: readonly FittingReplacementFaqItem[];
```

---

### 错误 5：按钮文字把卡片撑变形

原因：

```txt
法语 / 俄语 / 西语按钮文案太长
```

解决：

```txt
优先缩短文案
其次调整 ProductBasicCard.module.css
```

推荐短文案：

```txt
Détails
Ajouter
Детали
Добавить
Detalles
Añadir
```

---

### 错误 6：新增系列后 build 没有生成静态详情页

原因：

```txt
generateStaticParams 没有从新系列数据中读取 productCode
```

解决：

```txt
检查 app/.../q40/[productCode]/page.tsx 是否使用了 q40 的 SERIES_CONFIG
检查 getFittingReplacementDetailStaticParams 是否支持 seriesKey = q40
```

---

## 19. 提交前检查

提交前执行：

```powershell
npm run build
git status
```

确认没有无关文件：

```txt
.bak
临时备份文件夹
未使用图片
测试 PDF
```

如果没问题：

```powershell
git add .
git commit -m "新增接头替代查询 Q40 系列支持"
git push
```

如果只是完善文档：

```powershell
git add docs/resources/fitting-replacement-add-new-series.md
git commit -m "完善接头替代查询新增系列说明文档"
git push
```

---

## 20. 最终原则

新增系列时遵守这几个原则：

```txt
1. 数据进 data，不写死在组件里
2. 获取数据进 services，不写死在 page.tsx
3. 页面入口只负责传参和渲染
4. 图片和 PDF 进 public
5. 多语言进 intl.ts
6. CSS 不进 globals.css
7. 中文路径不加 /zh-CN
8. 外语详情页必须保留 locale
9. 图纸完整信息放详情页，首页卡片只做简洁展示
10. 后期接后端时，优先替换 service，不重写组件
``` 