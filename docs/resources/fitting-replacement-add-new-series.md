# 接头替代查询｜新增产品系列操作规范

文件路径：

```txt
docs/resources/fitting-replacement-add-new-series.md
```

适用模块：

```txt
资源中心 / 选型支持 / 接头替代查询
```

适用范围：

```txt
Q20 快插接头
Q40 快插接头
Q60 快插接头
硬管接头
倒刺接头
鲁尔接头
过滤接头
止回接头
其它后续需要做型号替代查询、图纸预览、加入清单、发送询盘的接头产品
```

---

# 1. 模块定位

接头相关内容分两个系统：

```txt
产品中心
= 展示产品体系、产品分类、产品介绍、应用说明

资源中心 / 接头替代查询
= 查询型号、查竞品替代、看图纸、加清单、发询盘
```

所以不是所有接头内容都放进 `fitting-replacement`。

`fitting-replacement` 只放和以下功能有关的数据：

```txt
型号替代
竞品编码
商品编码
恒永达型号
型号解析规则
选型指引规则
图纸 PDF
产品图片路径
是否首页展示
是否加入清单
是否需要图纸
```

产品中心的完整介绍、产品分类页、应用场景、宣传文案，不放在这里。

---

# 2. 当前标准数据层级

当前 Q20 属于：

```txt
接头类产品 / 快插接头 / Q20
```

对应目录结构：

```txt
data/resources/fitting-replacement/
├─ fitting-replacement.types.ts
├─ fitting-replacement-series.config.ts
└─ fittings/
   └─ quick-connect/
      └─ q20/
         ├─ q20.zh.ts
         ├─ q20.page.zh.ts
         └─ q20.detail.zh.ts
```

含义：

```txt
fitting-replacement
= 接头替代查询模块

fittings
= 接头类产品

quick-connect
= 快插接头

q20
= Q20 系列
```

后续新增系列时，必须按这个层级扩展，不要把所有接头数据塞进一个文件。

---

# 3. 后续新增系列的目录规则

## 3.1 快插接头 Q40

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/
├─ q40.zh.ts
├─ q40.page.zh.ts
└─ q40.detail.zh.ts
```

## 3.2 快插接头 Q60

```txt
data/resources/fitting-replacement/fittings/quick-connect/q60/
├─ q60.zh.ts
├─ q60.page.zh.ts
└─ q60.detail.zh.ts
```

## 3.3 硬管接头

```txt
data/resources/fitting-replacement/fittings/hard-tube/
├─ hard-tube.zh.ts
├─ hard-tube.page.zh.ts
└─ hard-tube.detail.zh.ts
```

## 3.4 倒刺接头

```txt
data/resources/fitting-replacement/fittings/barbed/
├─ barbed.zh.ts
├─ barbed.page.zh.ts
└─ barbed.detail.zh.ts
```

## 3.5 鲁尔接头

```txt
data/resources/fitting-replacement/fittings/luer/
├─ luer.zh.ts
├─ luer.page.zh.ts
└─ luer.detail.zh.ts
```

---

# 4. 文件职责说明

每个系列一般有 3 个数据文件。

## 4.1 产品数据文件

示例：

```txt
q20.zh.ts
q40.zh.ts
hard-tube.zh.ts
barbed.zh.ts
```

作用：

```txt
1. 存放产品列表 products
2. 存放型号解析规则 modelRules
3. 存放搜索基础数据 search
4. 通常由 Excel 转换脚本自动生成
```

Q20 示例：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
```

导出名：

```ts
export const fittingReplacementQuickConnectQ20ZhData
```

---

## 4.2 首页文案文件

示例：

```txt
q20.page.zh.ts
q40.page.zh.ts
hard-tube.page.zh.ts
barbed.page.zh.ts
```

作用：

```txt
1. 存放 Banner 文案
2. 存放面包屑 breadcrumbs
3. 存放搜索框文案
4. 不存放产品数据
```

Q20 示例：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.zh.ts
```

导出名：

```ts
export const fittingReplacementQuickConnectQ20PageZh
```

---

## 4.3 详情页文案文件

示例：

```txt
q20.detail.zh.ts
q40.detail.zh.ts
hard-tube.detail.zh.ts
barbed.detail.zh.ts
```

作用：

```txt
1. 存放详情页面包屑
2. 存放详情页按钮文案
3. 存放图纸预览文案
4. 存放 FAQ 或详情页说明文案
5. 不存放产品列表
```

Q20 示例：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.zh.ts
```

导出名：

```ts
export const fittingReplacementQuickConnectQ20DetailZh
```

---

# 5. 图片与图纸目录规则

## 5.1 产品图片目录

所有接头替代查询图片统一放在：

```txt
public/images/resources/selection-support/fitting-replacement/
```

按系列分：

```txt
public/images/resources/selection-support/fitting-replacement/q20/products
public/images/resources/selection-support/fitting-replacement/q40/products
public/images/resources/selection-support/fitting-replacement/q60/products
public/images/resources/selection-support/fitting-replacement/hard-tube/products
public/images/resources/selection-support/fitting-replacement/barbed/products
```

图片命名建议：

```txt
Q2001-PMV-SPPE.webp
Q4001-xxxx.webp
hard-tube-xxxx.webp
barbed-xxxx.webp
```

页面引用路径从 `/images/...` 开始，例如：

```txt
/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SPPE.webp
```

---

## 5.2 图纸 PDF 目录

所有接头替代查询图纸统一放在：

```txt
public/downloads/resources/selection-support/fitting-replacement/
```

按系列分：

```txt
public/downloads/resources/selection-support/fitting-replacement/q20/drawings
public/downloads/resources/selection-support/fitting-replacement/q40/drawings
public/downloads/resources/selection-support/fitting-replacement/q60/drawings
public/downloads/resources/selection-support/fitting-replacement/hard-tube/drawings
public/downloads/resources/selection-support/fitting-replacement/barbed/drawings
```

PDF 命名建议和恒永达型号一致：

```txt
Q2001-PMV-SPPE.pdf
Q4001-xxxx.pdf
```

注意：

```txt
1. 文件名大小写必须完全一致
2. 线上 Linux 区分大小写
3. 不要使用 .PDF 和 .pdf 混用
4. 不要有空格
5. 不建议使用中文文件名
6. 本地能打开，不代表线上一定能打开
7. 必须确认 PDF 已提交到 Git
```

检查 PDF 是否被 Git 跟踪：

```powershell
git ls-files "public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SPPE.pdf"
```

如果没有输出，需要强制添加：

```powershell
git add -f "public/downloads/resources/selection-support/fitting-replacement/q20/drawings"
```

---

# 6. 新增一个产品系列的标准流程

下面以新增 Q40 为例。

---

## 第一步：准备 Excel 原始数据

Q40 Excel 至少需要包含：

```txt
商品编码
恒永达型号
竞品A编码
竞品B编码
竞品C编码
包装
是否首页展示
备注
型号解析规则
字段顺序
字段名称
代码
含义
是否前台显示
```

如果是硬管接头、倒刺接头，先确认字段结构，不要一边写代码一边补字段。

---

## 第二步：新增数据目录

Q40：

```powershell
New-Item -ItemType Directory -Force .\data\resources\fitting-replacement\fittings\quick-connect\q40
```

硬管接头：

```powershell
New-Item -ItemType Directory -Force .\data\resources\fitting-replacement\fittings\hard-tube
```

倒刺接头：

```powershell
New-Item -ItemType Directory -Force .\data\resources\fitting-replacement\fittings\barbed
```

---

## 第三步：新增产品数据文件

Q40：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh.ts
```

推荐导出名：

```ts
export const fittingReplacementQuickConnectQ40ZhData
```

硬管接头：

```txt
data/resources/fitting-replacement/fittings/hard-tube/hard-tube.zh.ts
```

推荐导出名：

```ts
export const fittingReplacementHardTubeZhData
```

倒刺接头：

```txt
data/resources/fitting-replacement/fittings/barbed/barbed.zh.ts
```

推荐导出名：

```ts
export const fittingReplacementBarbedZhData
```

---

## 第四步：新增首页文案文件

Q40：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.page.zh.ts
```

推荐导出名：

```ts
export const fittingReplacementQuickConnectQ40PageZh
```

示例结构：

```ts
export const fittingReplacementQuickConnectQ40PageZh = {
  banner: {
    title: "Q40 接头替代查询",
    description:
      "输入竞品编码、商品编码或恒永达型号，快速查找 Q40 快插接头对应产品。",
  },

  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "接头替代查询",
      href: "/resources/selection-support/fitting-replacement",
    },
  ],

  search: {
    placeholder: "请输入竞品编码、商品编码或恒永达型号",
    buttonText: "搜索",
  },
} as const;
```

---

## 第五步：新增详情页文案文件

Q40：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.detail.zh.ts
```

推荐导出名：

```ts
export const fittingReplacementQuickConnectQ40DetailZh
```

如果详情页文案暂时和 Q20 一致，可以先复制 Q20 的 `q20.detail.zh.ts`，但文件必须单独建，方便后续差异化。

---

# 7. 更新系列配置

修改：

```txt
data/resources/fitting-replacement/fitting-replacement-series.config.ts
```

当前 Q20 配置保留。新增 Q40 时，先扩展类型：

```ts
export type FittingReplacementSeriesKey = "q20" | "q40";
```

新增 Q40 配置：

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

加入配置集合：

```ts
export const FITTING_REPLACEMENT_SERIES_CONFIG_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementSeriesConfig
> = {
  q20: Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  q40: Q40_FITTING_REPLACEMENT_SERIES_CONFIG,
};
```

硬管接头、倒刺接头也按同样方式新增：

```ts
export type FittingReplacementSeriesKey =
  | "q20"
  | "q40"
  | "hard-tube"
  | "barbed";
```

---

# 8. 更新首页 service 数据源

修改：

```txt
services/resources/getFittingReplacementHomeData.ts
```

新增 import，例如 Q40：

```ts
import { fittingReplacementQuickConnectQ40ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh";
import { fittingReplacementQuickConnectQ40PageZh } from "@/data/resources/fitting-replacement/fittings/quick-connect/q40/q40.page.zh";
```

新增映射：

```ts
q40: {
  productData: fittingReplacementQuickConnectQ40ZhData,
  pageText: fittingReplacementQuickConnectQ40PageZh,
},
```

这样后续调用：

```ts
getFittingReplacementHomeData("q40")
```

就可以读取 Q40 首页数据。

---

# 9. 更新详情页 service 数据源

修改：

```txt
services/resources/getFittingReplacementDetailData.ts
```

新增 import，例如 Q40：

```ts
import { fittingReplacementQuickConnectQ40ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh";
import { fittingReplacementQuickConnectQ40DetailZh } from "@/data/resources/fitting-replacement/fittings/quick-connect/q40/q40.detail.zh";
```

新增映射：

```ts
q40: {
  pageData: fittingReplacementQuickConnectQ40ZhData,
  detailText: fittingReplacementQuickConnectQ40DetailZh,
},
```

这样后续调用：

```ts
getFittingReplacementDetailData(productCode, "q40")
```

就可以读取 Q40 详情页数据。

---

# 10. 新增详情页路由

如果新增 Q40，需要新增：

```txt
app/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

这个文件可以复制 Q20 详情页入口，只改：

```txt
Q20_FITTING_REPLACEMENT_SERIES_CONFIG
```

为：

```txt
Q40_FITTING_REPLACEMENT_SERIES_CONFIG
```

中文详情页路径：

```txt
/resources/selection-support/fitting-replacement/q40/商品编码
```

外语详情页路径：

```txt
/[locale]/resources/selection-support/fitting-replacement/q40/商品编码
```

对应外语路由：

```txt
app/[locale]/resources/selection-support/fitting-replacement/q40/[productCode]/page.tsx
```

---

# 11. 转换脚本规则

每个系列建议有独立转换脚本。

当前 Q20 脚本：

```txt
scripts/resources/convert-q20-fitting-replacement.ts
```

生成目标：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
```

后续 Q40 建议新增：

```txt
scripts/resources/convert-q40-fitting-replacement.ts
```

生成目标：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q40/q40.zh.ts
```

硬管接头建议新增：

```txt
scripts/resources/convert-hard-tube-fitting-replacement.ts
```

生成目标：

```txt
data/resources/fitting-replacement/fittings/hard-tube/hard-tube.zh.ts
```

倒刺接头建议新增：

```txt
scripts/resources/convert-barbed-fitting-replacement.ts
```

生成目标：

```txt
data/resources/fitting-replacement/fittings/barbed/barbed.zh.ts
```

脚本必须保证：

```txt
1. 输出路径是新分级目录
2. 自动创建输出目录
3. 生成文件的 import 使用 @/data/...
4. 生成文件的 export 名称和 service 引用一致
5. 不要再生成旧路径 fitting-replacement.zh.ts
```

---

# 12. 新增单个产品的流程

如果只是给已有 Q20 新增一个产品，不需要新增目录。

流程：

```txt
1. 在 Q20 Excel 原始表里新增产品行
2. 添加产品图片到 q20/products
3. 添加 PDF 图纸到 q20/drawings
4. 重新运行 Q20 转换脚本
5. npm run build
6. 检查详情页是否生成
7. 提交 Git
```

运行转换脚本：

```powershell
npx tsx scripts/resources/convert-q20-fitting-replacement.ts
```

生成文件：

```txt
data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts
```

---

# 13. 新增系列后的测试清单

每次新增系列或新增产品后，必须测试：

```txt
1. npm run dev 是否正常
2. npm run build 是否通过
3. 首页是否正常显示
4. 搜索是否能找到产品
5. 查看详情是否能打开
6. 商品编码是否正确
7. 兼容编码是否正确
8. 型号解析是否正确
9. 产品图片是否显示
10. PDF 图纸直链是否能打开
11. 详情页图纸预览是否能打开
12. 加入清单是否正常
13. 添加图纸是否正常
14. 外语路径是否不 404
15. GitHub / Vercel 部署是否成功
```

---

# 14. 常见问题

## 14.1 本地 PDF 能打开，线上打不开

检查 PDF 是否进入 Git：

```powershell
git ls-files "public/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SPPE.pdf"
```

如果没有输出：

```powershell
git add -f "public/downloads/resources/selection-support/fitting-replacement/q20/drawings"
git commit -m "add fitting drawing pdf files"
git push
```

---

## 14.2 本地能打开，线上 404

检查文件名大小写：

```txt
Q2001-PMV-SPPE.pdf
```

不能写成：

```txt
Q2001-PMV-SPPE.PDF
q2001-pmv-sppe.pdf
Q2001-PMV-SPPE (1).pdf
```

---

## 14.3 搜索不到产品

检查：

```txt
1. 商品编码是否写错
2. 恒永达型号是否写错
3. 竞品编码是否进入 competitorModels
4. 转换脚本是否重新运行
5. 页面数据文件是否已更新
```

---

## 14.4 详情页 404

检查：

```txt
1. getFittingReplacementDetailStaticParams 是否生成该商品编码
2. 商品编码是否在 products 数据里
3. 页面路径是否带正确系列
4. 是否重新 npm run build
```

---

## 14.5 型号解析不正确

检查：

```txt
1. modelRules 是否包含该字段
2. fieldKey 是否正确
3. code 是否和型号切分结果一致
4. 当前系列型号结构是否和 Q20 一样
5. 如果不一样，需要扩展 fittingReplacementModelParser.ts
```

---

# 15. 哪些文件不要重复新建

新增 Q40、硬管接头、倒刺接头时，不要重复新建这些组件：

```txt
components/resources/fitting-replacement/FittingReplacementHome.tsx
components/resources/fitting-replacement/FittingReplacementDetail.tsx
components/resources/fitting-replacement/FittingReplacementGuide.tsx
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx
components/resources/fitting-replacement/FittingReplacementFaq.tsx
components/common/product-card/ProductBasicCard.tsx
```

这些组件继续复用。

新增系列时，只新增：

```txt
数据
配置
图纸
图片
路由入口
必要的转换脚本
```

---

# 16. 总结原则

核心原则：

```txt
数据按产品类型和系列分级
组件按功能复用
路径按系列区分
样式尽量公共化
后续接后台优先改 service
不要复制组件
不要把所有接头塞进一个数据文件
```

当前标准：

```txt
fitting-replacement
└─ fittings
   └─ quick-connect
      └─ q20
```

后续扩展：

```txt
fitting-replacement
└─ fittings
   ├─ quick-connect
   │  ├─ q20
   │  ├─ q40
   │  └─ q60
   ├─ hard-tube
   ├─ barbed
   ├─ luer
   ├─ filter
   └─ check-valve
```
 