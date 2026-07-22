# FOREACH 官网全站英文翻译执行任务

## 1. 项目与执行方式

项目目录：

```text
F:\WebsiteProjects\foreach-website-2026
```

项目技术：

- Next.js 16.2.6
- TypeScript
- App Router
- 静态导出 `output: export`
- 中文为当前主要完成版本
- 英文路由以 `/en/` 为主

本次由 Codex 直接在本地完成全部英文翻译，不需要中途向用户确认，也不要在阶段之间停下来等待回复。

必须完整执行：

1. 扫描现有国际化结构和所有用户可见中文；
2. 确认正式数据源、生成文件和生成脚本；
3. 按现有架构补齐英文；
4. 检查英文路由、链接、SEO 和辅助文本；
5. 检查英文页面中文残留；
6. 修复翻译引起的类型、路由或构建问题；
7. 运行最终构建；
8. 生成最终完成报告。

不需要先生成报告等待用户确认。所有检查完成后直接继续执行翻译，用户只检查最终版本。

---

## 2. Git 安全要求

本次只修改本地文件。

严禁执行：

```text
git switch
git checkout
git reset
git clean
git commit
git push
git merge
git rebase
```

不得创建、切换或删除 Git 分支。

不得向 `main` 或任何远程分支提交内容。

任务完成后保持所有修改为本地未提交状态，由用户检查最终版本后自行创建新分支并上传。

开始前执行：

```powershell
git status -sb
```

只记录当前状态，不要因为任务说明 Markdown 文件处于未跟踪状态而停止。

不得覆盖与本任务无关的既有本地修改。若发现已有修改，先识别用途，在其基础上继续工作，并在最终报告中列出。

不得在项目内部创建以下备份：

```text
*.bak
*.backup
*.old
*.copy
*.orig
*.tmp
副本文件
包含源码的备份目录
```

不要把 `.ts`、`.tsx`、`.js`、`.cjs`、`.css` 等源码副本放入 `reports` 或项目其他目录。

如确实需要临时备份，只能放到项目外：

```text
F:\WebsiteProjects\foreach-website-2026-backups\
```

优先依靠 Git diff，不要制造多余备份和一次性修复插件。

---

## 3. 核心目标

将官网中所有会展示给英文用户的中文内容，补充为自然、准确、专业的英文。

本次不是把中文网站替换成英文网站，而是：

- 保留中文内容；
- 保持中文页面正常；
- 补齐英文版本；
- 英文页面不得使用中文兜底；
- 中文和英文使用同一套现有数据结构、组件和路由架构。

正确示例：

```ts
{
  zh: "柱塞泵",
  en: "Plunger Pumps",
}
```

错误示例：

```ts
"柱塞泵" → "Plunger Pumps"
```

不得删除或覆盖中文字段。

---

## 4. “全部中文”的范围

必须处理所有会在英文前台显示的中文，包括但不限于：

### 4.1 全局界面

- Header
- 顶部导航
- Mega Menu
- 移动端导航
- 面包屑
- 全站搜索
- 搜索建议
- 搜索结果
- Footer
- 语言切换
- Cookie 或提示信息
- 404 页面
- 空状态
- 加载状态
- 错误提示
- 成功提示
- 分页
- 返回按钮

### 4.2 首页

- Hero 标题、说明和按钮
- 应用领域内容
- 核心产品内容
- 视频区
- 企业优势
- 研发与制造
- 质量与认证
- 新闻和资讯
- 联系 CTA
- 图片 `alt`
- SEO metadata

### 4.3 产品中心

- 顶部产品大类
- 左侧所有筛选项
- PC 和手机端筛选标题
- 展开/折叠辅助文字
- 产品卡片标题
- 产品卡片三行说明
- 标签
- 结果数量
- 清除筛选
- 查看详情
- 加入清单
- 已加入状态
- 选型清单
- 表单和提交提示
- 无结果提示
- 产品分类说明
- 图片 `alt`
- `aria-label`

### 4.4 所有产品详情页

- H1
- 型号说明
- 正文介绍
- 常见应用
- 规格参数字段
- 型号选择
- 配置说明
- 3D 模型区域
- 零件图区域
- 技术资料区域
- FAQ
- CTA
- 表单文字
- 错误和空状态
- SEO title
- SEO description
- Open Graph
- JSON-LD 或结构化数据
- 图片 `alt`
- `aria-label`

### 4.5 产品范围

必须覆盖：

- 泵系列
  - 柱塞泵
  - 注射泵
  - 无阀泵
  - 隔膜泵
- 阀系列
  - 旋转阀
  - 高压阀
  - 电磁阀
- 针系列
  - 采样针
  - 进样针
  - 冲洗针
  - 定制针
- 接头系列
  - 硬管接头
  - 倒刺接头或软管接头
  - 鲁尔接头
  - 快插接头
  - 其他当前在售接头
- 管路系列
  - PVC
  - TPU
  - FEP
  - PTFE
  - PEEK
  - PFA
- 智控系列
  - 气泡检测模块
  - 压力检测模块
  - 当前已上线的其他模块

### 4.6 其他页面

- 应用领域
- 资源中心
- 规格书下载
- 选型支持
- 安装教程
- 材料兼容性
- 技术文章
- 新闻中心
- 关于我们
- 公司介绍
- 质量体系
- 发展历程
- 研发与制造
- 企业文化
- 联系我们
- 经销商页面
- 表单页面
- 在线工具
- 管内流动阻尼计算工具

### 4.7 隐蔽但会展示的文字

必须检查：

- `placeholder`
- `title`
- `alt`
- `aria-label`
- `aria-description`
- `aria-valuetext`
- `data-*` 中用于界面显示的文字
- Toast
- Dialog
- Modal
- Tooltip
- 表单校验
- 客户端运行时异常提示
- 页面 metadata
- Open Graph
- Twitter metadata
- JSON-LD
- 静态生成的数据对象
- 前端中文兜底值

---

## 5. 不需要翻译或不得修改的内容

以下内容原则上保持不变：

- 产品型号
- 商品编码
- 零件编号
- 标准编号
- 文件名
- 图片路径
- PDF 路径
- 3D 模型路径
- URL slug
- 路由目录名
- TypeScript 变量名
- 函数名
- 组件名
- 类型名
- 接口字段名
- CSS 类名
- API 字段
- JSON 键名
- Excel Sheet 名称
- 代码注释
- 脚本日志
- Git 信息
- 单位
- 数值
- 公式
- 默认值
- 计算逻辑
- 校验逻辑
- 产品参数
- 材料缩写
- 通信协议缩写
- 螺纹规格
- 认证标准编号

例如以下内容保持不变：

```text
EA-100-PMMA
SMTP2
HLD6
MRV3
HP
6010
RPL
DRPL
ABD
PDM5
M6
1/4-28 UNF
10-32 UNF
RS232
RS485
CAN
PEEK
PPS
PVDF
PTFE
PFA
FEP
PVC
TPU
μL
mL/min
kPa
MPa
mm
°C
```

不得因为翻译而换算单位或修改数字格式。

---

## 6. 翻译风格

英文必须符合欧美工业 B2B、生命科学仪器、IVD 和实验室自动化行业的表达习惯。

要求：

- 专业
- 简洁
- 信息明确
- 工程化
- 自然英文
- 避免中式语序
- 避免空洞营销口号
- 避免夸大
- 避免逐字直译
- 同一术语全站统一

避免滥用：

```text
leading
advanced
excellent
high-quality
world-class
perfect
best
```

除非原文有明确依据，否则不要新增：

- 性能优势
- 认证
- 应用领域
- 寿命
- 精度
- 可靠性承诺
- 客户案例
- 市场地位

错误示例：

```text
According to your needs, we can provide customization.
```

推荐：

```text
Custom configurations are available for specific fluidic requirements.
```

错误示例：

```text
Provide stable and reliable fluid control for customers.
```

推荐：

```text
Designed for consistent fluid handling in automated instruments.
```

按钮优先使用简短动作词：

```text
View Details
Add to List
Contact Us
Calculate
Reset
Download Datasheet
Submit Request
```

不要把按钮写成冗长句子。

---

## 7. 术语优先级

翻译术语时按以下优先级判断：

1. 项目内正式术语翻译清单；
2. 已发布英文规格书；
3. 已发布英文产品手册；
4. 现有英文官网内容；
5. 产品正式数据源中的英文；
6. 行业通用表达。

重点查找并优先使用项目中的正式术语文件：

```text
Doc-1000-2509-0001_000_cn_恒永达产品常用术语翻译清单
```

若项目内存在多个英文版本，必须统一为正式版本，不得保留互相冲突的翻译。

若某个术语无法从项目资料确认：

- 使用行业通用英文；
- 不要杜撰参数含义；
- 在最终报告中列入“需要人工复核的术语”；
- 不要因为无法确认而中断整个任务。

---

## 8. 基础术语参考

以下是默认参考。若项目正式术语文件另有明确规定，以正式术语文件为准。

| 中文 | 英文 |
|---|---|
| 首页 | Home |
| 产品中心 | Products |
| 应用领域 | Applications |
| 资源中心 | Resources |
| 关于我们 | About Us |
| 联系我们 | Contact Us |
| 泵系列 | Pumps |
| 阀系列 | Valves |
| 针系列 | Probes & Needles |
| 接头系列 | Fittings |
| 管路系列 | Tubing |
| 智控系列 | Control Modules |
| 产品大类 | Product Category |
| 产品类别 | Product Category |
| 产品种类 | Product Type |
| 产品系列 | Product Series |
| 规格参数 | Specifications |
| 常见应用 | Typical Applications |
| 查看详情 | View Details |
| 加入清单 | Add to List |
| 已加入清单 | Added |
| 清除筛选 | Clear Filters |
| 联系工程师 | Contact an Engineer |
| 型号选择 | Model Selection |
| 提交选型需求 | Submit a Selection Request |
| 提交定制需求 | Submit a Custom Request |
| 三维模型 | 3D Model |
| 零件图 | Technical Drawing |
| 规格书下载 | Datasheet Downloads |
| 安装教程 | Installation Guides |
| 材料兼容性 | Material Compatibility |
| 技术文章 | Technical Articles |
| 新闻中心 | News |
| 公司介绍 | Company Overview |
| 质量体系 | Quality Management |
| 发展历程 | Milestones |
| 研发与制造 | R&D and Manufacturing |
| 企业文化 | Company Culture |

产品类别参考：

| 中文 | 英文 |
|---|---|
| 柱塞泵 | Plunger Pumps |
| 注射泵 | Syringe Pumps |
| 无阀泵 | Valveless Pumps |
| 隔膜泵 | Diaphragm Pumps |
| 旋转阀 | Rotary Valves |
| 高压阀 | High-Pressure Valves |
| 电磁阀 | Solenoid Valves |
| 硬管接头 | Rigid-Tube Fittings |
| 软管接头 | Barbed Fittings |
| 倒刺接头 | Barbed Fittings |
| 鲁尔接头 | Luer Fittings |
| 快插接头 | Quick-Connect Fittings |
| 采样针 | Sampling Probes |
| 进样针 | Injection Probes |
| 冲洗针 | Wash Probes |
| 定制针 | Custom Probes |
| 气泡检测模块 | Bubble Detection Module |
| 压力检测模块 | Pressure Detection Module |

不要机械套用。必须结合当前页面和正式产品命名确认。

---

## 9. 产品文案规则

### 9.1 型号必须保留

示例：

```text
MRV3 陶瓷多通道旋转阀
```

可翻译为：

```text
MRV3 Ceramic Multiport Rotary Valve
```

不得删除 `MRV3`。

### 9.2 中文标题和英文标题可以采用不同语序

中文可以型号优先，英文应符合海外用户阅读和搜索习惯。

示例：

```text
EA-100-PMMA 100 μL Plunger Pump
HP 7-Port High-Pressure Valve
6010 Series Solenoid Valve
SMTP2 Pipetting Pump
```

### 9.3 卡片标题保持简洁

卡片标题建议：

```text
型号 + 产品功能名称
```

不要把全部参数塞入标题。

### 9.4 不得改变参数

只能翻译已有内容，不得：

- 修改数值；
- 合并不同型号数据；
- 推测缺失参数；
- 新增认证；
- 新增应用；
- 把有刷和无刷寿命混用；
- 把 Accuracy、Precision、Repeatability 混用；
- 改变产品类型或产品定位。

### 9.5 规格字段结合语境翻译

重点区分：

```text
Flow Rate
Dispensing Volume
Pipetting Volume
Syringe Capacity
Stroke
Travel Range
Measurement Range
Accuracy
Precision
Repeatability
Resolution
Pressure
Vacuum
Service Life
Operating Temperature
Wetted Materials
Body Material
Port Type
Thread Size
Tube OD
Tube ID
Communication Interface
Motor Type
Valve Configuration
```

“量程”不能在所有页面统一机械翻译为 `Range`，必须结合具体产品含义。

---

## 10. 国际化结构要求

先检查项目当前使用的国际化方式，例如：

- `locale`
- `zh` / `en`
- `LocalizedText`
- `getText()`
- `getLocalizedText()`
- `pageText`
- taxonomy 字典
- locale JSON
- metadata 字典
- 路由适配器
- 数据生成器

必须沿用现有架构，不要新建第二套重复国际化系统。

不得用全局正则把中文直接替换成英文。

不得用一个通用翻译函数掩盖数据缺失。

不得在英文缺失时继续使用中文兜底，例如：

```ts
text.en || text.zh
```

英文页面用户可见内容应有明确英文值。

可以保留安全兜底以避免运行时崩溃，但必须保证正式英文数据已经补齐，兜底不会在正常英文页面触发。

---

## 11. 正式数据源与 generated 文件

项目中存在 Excel、JSON、TypeScript 数据源、生成脚本和 generated 文件。

必须先识别：

- 哪个是权威源数据；
- 哪些文件是自动生成；
- 哪些文件可以直接编辑；
- 哪些文件必须修改源数据后重新生成；
- 哪些适配器负责中文和英文输出。

执行原则：

1. 有正式源数据时，优先修改正式源数据；
2. 有生成脚本时，按现有流程重新生成；
3. 不得只改 generated 文件，让下次生成覆盖英文；
4. 不得为了翻译重写生成器；
5. 不得修改型号、商品编码、路由映射和参数；
6. 接头产品继续以正式在售清单为权威数据源；
7. 生成后检查中文和英文数据是否均保持完整；
8. 不要创建新的重复 Excel 或 JSON 数据源。

若 Excel 不适合安全自动修改，可在不破坏现有数据链的前提下，使用项目现有的英文补充层、locale 映射或适配器，但必须在最终报告中说明具体处理方式。

---

## 12. 英文路由和链接

所有英文页面必须保持英文 locale，不得点击后跳回中文路由。

重点检查：

```text
/en/
/en/products/
/en/products/pumps/
/en/products/valves/
/en/products/fittings/
/en/products/tubing/
/en/resources/
/en/applications/
/en/about/
/en/contact/
```

以及项目实际存在的全部英文子路由。

必须检查：

- Header 链接；
- Mega Menu 链接；
- Footer 链接；
- 产品卡片详情链接；
- 面包屑；
- 搜索结果；
- 新闻链接；
- 技术文章链接；
- 应用页面产品链接；
- CTA；
- 语言切换；
- 返回列表；
- 分页；
- canonical；
- alternates / hreflang；
- 静态导出路径。

英文页面点击任何内部链接，不得：

- 跳回中文；
- 丢失 `/en/`；
- 进入 404；
- 指向不存在的英文详情页。

不得翻译 URL slug。

---

## 13. 产品中心专项要求

### 13.1 顶部产品大类

中文示例：

```text
产品大类：接头系列
```

英文建议：

```text
Product Category: Fittings
```

分类英文：

```text
Pumps
Valves
Probes & Needles
Fittings
Tubing
Control Modules
```

### 13.2 左侧筛选

根据页面实际字段翻译：

```text
Product Category
Product Type
Product Series
Volume Range
Thread Size
Tube OD
Tube ID
Body Material
Wetted Material
Color
Valve Type
Port Configuration
Motor Type
Stroke
Communication Interface
```

PC 和手机端必须一致。

不得改变当前交互：

- PC 端筛选全部展开；
- 手机端默认折叠；
- 手机端点击展开和收起；
- 手机端选中后自动折叠；
- 选中状态保留；
- 产品卡片手机端一行一张；
- PC 端保持当前列数和布局。

### 13.3 阀系列

当前阀系列左侧结构应保持：

```text
Product Category
Valve Series
```

右侧继续显示全部三张阀卡片。

不得重新拆分为三个左侧选项，不得修改筛选逻辑。

### 13.4 结果数量

英文使用自然表达，例如：

```text
147 configurations found
3 valve series found
```

不要逐字写成：

```text
Found 147 basic configurations
```

---

## 14. 管内流动阻尼计算工具专项要求

现有中文工具的计算逻辑、参数、默认值和界面结构均已确认，不得重做工具。

英文名称优先使用：

```text
Flow Resistance Calculator
```

若页面需要更具体的 SEO 标题，可使用：

```text
Tubing Flow Resistance Calculator
```

只增加英文界面和英文 SEO，不得修改：

- 计算公式；
- 数值；
- 默认值；
- 单位；
- 输入类型；
- 下拉选项逻辑；
- 单选按钮逻辑；
- 校验规则；
- 结果计算；
- 图表或表格数据；
- 响应式布局；
- 按钮 hover；
- 品牌色；
- 中文文字和符号。

重点翻译：

- 页面标题；
- 页面说明；
- 工程参数；
- 流体参数；
- 管路参数；
- 输入字段；
- 选项；
- 占位文字；
- 校验提示；
- `Calculate`；
- `Reset`；
- 计算结果；
- 结果字段；
- 流态说明；
- 公式说明；
- SEO metadata；
- `alt`；
- `aria-label`；
- 英文路由和入口链接。

常见术语可参考：

| 中文 | 英文 |
|---|---|
| 工程参数 | System Parameters |
| 流体参数 | Fluid Properties |
| 管路参数 | Tubing Parameters |
| 开始计算 | Calculate |
| 重新计算 | Recalculate |
| 重置 | Reset |
| 计算结果 | Results |
| 流量 | Flow Rate |
| 压降 | Pressure Drop |
| 雷诺数 | Reynolds Number |
| 流态 | Flow Regime |
| 层流 | Laminar Flow |
| 过渡流 | Transitional Flow |
| 湍流 | Turbulent Flow |
| 动力黏度 | Dynamic Viscosity |
| 密度 | Density |
| 管内径 | Tube ID |
| 管长 | Tube Length |

必须以实际字段含义为准，不得凭表格机械套用。

---

## 15. 新闻、技术文章和长内容

英文路由中展示的新闻、技术文章、应用文章和公司内容也必须翻译，不得只翻译导航和标题。

要求：

- 标题英文自然；
- 摘要英文完整；
- 正文英文完整；
- 图片说明英文完整；
- 标签英文完整；
- metadata 英文完整；
- 内部链接保持英文 locale；
- 不删除中文正文；
- 不改变发布时间、作者、图片或原始事实。

若某篇英文内容暂时不存在，不得在英文路由直接显示整篇中文。

若页面架构暂不支持双语正文，应在现有内容模型内增加英文数据，而不是复制一套独立页面组件。

---

## 16. PDF、图片、视频和二进制资源

本次不要求重新制作或翻译 PDF、Word、视频字幕、图片中的中文文字等二进制资源。

但必须翻译英文页面中的：

- 下载入口标题；
- 文件说明；
- 按钮；
- 分类；
- 图片 `alt`；
- 视频标题；
- 视频说明；
- 空状态；
- 错误提示。

若项目已有对应英文 PDF，英文页面应优先链接英文 PDF。

若没有英文 PDF：

- 不得伪造文件；
- 不得修改文件内容；
- 保持现有下载逻辑；
- 在最终报告中列出仍为中文的下载资料。

---

## 17. 不得改变页面设计与功能

本次是翻译和国际化完善任务，不是重新设计任务。

严禁修改：

- 页面整体排版；
- 颜色；
- 品牌色；
- 卡片布局；
- 卡片数量；
- 图片；
- 图片顺序；
- 筛选逻辑；
- 分类结构；
- 响应式断点；
- PC 端展开状态；
- 手机端折叠状态；
- 计算逻辑；
- 表单业务逻辑；
- 加入清单逻辑；
- PDF 预览逻辑；
- 3D 模型逻辑；
- 页面动效；
- 路由 slug；
- 产品详情路径；
- 中文页面行为。

允许为了适应英文长度进行最小必要修复，例如：

- 避免英文按钮溢出；
- 允许文字自然换行；
- 修复英文被截断；
- 修复 `min-width` 导致的溢出。

这些调整必须：

- 最小化；
- 不改变中文视觉；
- 不改变整体布局；
- 在最终报告中单独列出。

---

## 18. 推荐执行顺序

不需要向用户报告中间结果，按以下顺序连续执行。

### 阶段 1：扫描与结构识别

1. 检查 `package.json`；
2. 检查 locale 路由；
3. 检查翻译函数和数据类型；
4. 扫描用户可见中文；
5. 识别正式数据源；
6. 识别 generated 文件；
7. 识别生成脚本；
8. 识别英文路由中文兜底。

扫描重点目录：

```text
app/
components/
data/
content/
lib/
public/
scripts/
```

只把会影响英文前台的内容纳入翻译，不要翻译代码注释和内部日志。

### 阶段 2：全局公共区域

1. Header；
2. Mega Menu；
3. 移动端导航；
4. Footer；
5. 面包屑；
6. 搜索；
7. 表单公共文字；
8. 通用按钮；
9. 通用空状态和错误提示；
10. 404。

### 阶段 3：首页与公共内容

1. 首页；
2. 应用导航；
3. 企业优势；
4. 新闻入口；
5. 公共 CTA；
6. metadata。

### 阶段 4：产品中心

1. 产品分类；
2. 产品筛选；
3. 产品卡片；
4. 结果数量；
5. 选型清单；
6. 响应式英文显示；
7. 英文详情链接。

### 阶段 5：产品详情

依次完成：

1. 泵；
2. 阀；
3. 针；
4. 接头；
5. 管路；
6. 智控模块。

每个系列都检查：

- 标题；
- 正文；
- 规格；
- 应用；
- FAQ；
- CTA；
- metadata；
- 详情链接。

### 阶段 6：其他内容页

1. 应用领域；
2. 资源中心；
3. 规格书下载；
4. 安装教程；
5. 材料兼容性；
6. 技术文章；
7. 新闻；
8. 关于我们；
9. 联系我们；
10. 经销商页面。

### 阶段 7：在线工具

1. 管内流动阻尼计算工具；
2. 其他已存在在线计算工具；
3. 工具导航；
4. 工具 SEO；
5. 英文校验提示。

### 阶段 8：SEO 和辅助文本

1. title；
2. description；
3. keywords；
4. alternates；
5. canonical；
6. Open Graph；
7. Twitter metadata；
8. JSON-LD；
9. alt；
10. aria-label。

### 阶段 9：残留检查和构建

1. 扫描英文前台中文残留；
2. 检查英文内部链接；
3. 检查静态路由；
4. 检查 TypeScript；
5. 运行可用的 lint/typecheck；
6. 运行 `npm run build`；
7. 修复所有由本次翻译引起的问题；
8. 再次运行最终构建。

---

## 19. 中文残留判断规则

简单搜索中文字符会找到大量合法中文源数据，所以不能把“仓库内存在中文”判断为失败。

允许保留：

- `zh` 字段；
- 中文页面内容；
- 中文新闻正文；
- 中文数据源；
- 中文文件名；
- 代码注释；
- 内部脚本日志；
- 不会在英文前台展示的中文。

不允许保留：

- 英文路由中的中文标题；
- 英文页面中的中文按钮；
- 英文筛选中的中文选项；
- 英文表单中的中文提示；
- 英文 metadata 中的中文；
- 英文 `alt` 或 `aria-label` 中的中文；
- 英文页面因 `en` 缺失而显示的中文兜底；
- 英文详情页中的中文规格字段；
- 英文 FAQ 中的中文问题或答案。

必须结合 locale 分支、数据读取方式和运行时路径判断是否会显示。

---

## 20. 构建与验证

先查看 `package.json` 中现有脚本。

存在以下脚本时才执行，不要自行新增：

```text
lint
typecheck
test
```

最终必须执行：

```powershell
npm run build
```

最终验收要求：

- 编译成功；
- TypeScript 通过；
- 静态导出成功；
- 无 404 路由生成错误；
- 无 `undefined`；
- 无缺失字段；
- 无 hydration 错误；
- 无中文英文类型不一致；
- 无生成数据错误；
- 无英文页面链接跳回中文；
- 无因翻译导致的明显布局溢出。

构建失败时：

- 继续定位并修复；
- 不要恢复或删除用户现有代码；
- 不要执行 `git reset`；
- 不要用跳过类型检查的方式通过构建；
- 不要降低 TypeScript 或 ESLint 规则；
- 不要使用 `any` 大面积绕过问题。

---

## 21. 最终输出文件

任务全部完成后，在项目根目录生成：

```text
全站英文翻译完成报告.md
```

报告必须包含：

1. 任务完成时间；
2. 修改模块；
3. 修改文件清单；
4. 新增英文内容范围；
5. 使用的正式术语来源；
6. 数据源和 generated 文件处理方式；
7. 重新运行的生成脚本；
8. 英文路由检查结果；
9. 英文链接检查结果；
10. SEO 翻译结果；
11. 在线工具翻译结果；
12. 英文页面中文残留检查结果；
13. 仍需人工复核的术语；
14. 没有英文版本的 PDF 或二进制资料；
15. 为适应英文长度进行的最小 CSS 调整；
16. lint/typecheck/test 结果；
17. `npm run build` 最终结果；
18. `git status -sb`；
19. `git diff --stat`；
20. 未提交修改说明。

同时生成：

```text
英文页面中文残留清单.md
```

若没有会在英文前台展示的中文，明确写：

```text
未发现会在英文前台显示的中文内容。
```

若仍有内容无法安全翻译，必须列出：

- 页面；
- 文件；
- 原中文；
- 原因；
- 是否影响英文前台；
- 建议人工确认内容。

不要隐瞒未完成内容。

---

## 22. 最终完成标准

只有同时满足以下条件才算完成：

- 中文页面保持正常；
- 英文页面不再显示中文兜底；
- 所有用户可见界面文字已英文处理；
- 产品正文、规格、应用和 FAQ 已英文处理；
- 新闻、技术文章和公司内容已英文处理；
- 管内流动阻尼计算工具已英文处理；
- 产品型号、参数、单位和公式未改变；
- 产品卡片数量未改变；
- 筛选结构和交互未改变；
- PC 和手机端布局未改变；
- 英文链接不跳回中文；
- 英文详情页不存在 404；
- SEO metadata 已英文处理；
- `alt` 和 `aria-label` 已英文处理；
- 正式数据源和 generated 关系清晰；
- 没有项目内源码备份和一次性修复副本；
- `npm run build` 成功；
- 没有执行 Git 提交、推送或分支切换；
- 最终报告完整。

---

## 23. 给 Codex 的最终执行指令

请完整阅读并严格执行本文件。

本次不需要中途向用户确认，不要停在扫描、术语表或单个模块阶段等待回复。

从项目现状开始，连续完成扫描、翻译、检查、修复和构建，直到达到最终完成标准。

只修改本地文件，不执行 Git 分支、提交和推送操作。

全部完成后停止，并向用户说明：

- 最终构建是否成功；
- 最终报告位置；
- 英文页面中文残留清单位置；
- 当前仍有哪些内容需要人工检查。
