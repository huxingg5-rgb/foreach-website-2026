# 柱塞泵错误 probes 路径兼容页生成报告

生成时间：2026/7/7 21:26:22

项目目录：F:\WebsiteProjects\foreach-website-2026


## 1. 处理目的

历史错误路径 `/products/probes/[柱塞泵型号]` 会触发 Next.js `output: export` 的 `generateStaticParams` 报错。
本次为 EA / SM / TM 柱塞泵型号生成静态兼容页，使错误路径自动跳转到正确柱塞泵详情页。

## 2. 正确跳转规则

```txt
/products/probes/ea-100-peek  ->  /products/pumps/plunger-pumps/ea-100-peek
/products/probes/ea-100-pmma  ->  /products/pumps/plunger-pumps/ea-100-pmma
/products/probes/ea-250-peek  ->  /products/pumps/plunger-pumps/ea-250-peek
/products/probes/ea-250-pmma  ->  /products/pumps/plunger-pumps/ea-250-pmma
/products/probes/ea-500-peek  ->  /products/pumps/plunger-pumps/ea-500-peek
/products/probes/ea-500-pmma  ->  /products/pumps/plunger-pumps/ea-500-pmma
/products/probes/ea-1000-peek  ->  /products/pumps/plunger-pumps/ea-1000-peek
/products/probes/ea-1000-pmma  ->  /products/pumps/plunger-pumps/ea-1000-pmma
/products/probes/ea-2500-peek  ->  /products/pumps/plunger-pumps/ea-2500-peek
/products/probes/ea-2500-pmma  ->  /products/pumps/plunger-pumps/ea-2500-pmma
/products/probes/ea-5000-peek  ->  /products/pumps/plunger-pumps/ea-5000-peek
/products/probes/ea-5000-pmma  ->  /products/pumps/plunger-pumps/ea-5000-pmma
/products/probes/ea-10000-peek  ->  /products/pumps/plunger-pumps/ea-10000-peek
/products/probes/ea-10000-pmma  ->  /products/pumps/plunger-pumps/ea-10000-pmma
/products/probes/sm-50-pmma  ->  /products/pumps/plunger-pumps/sm-50-pmma
/products/probes/sm-100-peek  ->  /products/pumps/plunger-pumps/sm-100-peek
/products/probes/sm-100-pmma  ->  /products/pumps/plunger-pumps/sm-100-pmma
/products/probes/sm-250-peek  ->  /products/pumps/plunger-pumps/sm-250-peek
/products/probes/sm-250-pmma  ->  /products/pumps/plunger-pumps/sm-250-pmma
/products/probes/sm-500-pmma  ->  /products/pumps/plunger-pumps/sm-500-pmma
/products/probes/sm-1000-pmma  ->  /products/pumps/plunger-pumps/sm-1000-pmma
/products/probes/tm-50-pmma  ->  /products/pumps/plunger-pumps/tm-50-pmma
/products/probes/tm-100-pmma  ->  /products/pumps/plunger-pumps/tm-100-pmma
/products/probes/tm-250-pmma  ->  /products/pumps/plunger-pumps/tm-250-pmma
/products/probes/tm-500-pmma  ->  /products/pumps/plunger-pumps/tm-500-pmma
```

## 3. 已写入文件

```txt
app/products/probes/ea-100-peek/page.tsx
app/products/probes/ea-100-pmma/page.tsx
app/products/probes/ea-250-peek/page.tsx
app/products/probes/ea-250-pmma/page.tsx
app/products/probes/ea-500-peek/page.tsx
app/products/probes/ea-500-pmma/page.tsx
app/products/probes/ea-1000-peek/page.tsx
app/products/probes/ea-1000-pmma/page.tsx
app/products/probes/ea-2500-peek/page.tsx
app/products/probes/ea-2500-pmma/page.tsx
app/products/probes/ea-5000-peek/page.tsx
app/products/probes/ea-5000-pmma/page.tsx
app/products/probes/ea-10000-peek/page.tsx
app/products/probes/ea-10000-pmma/page.tsx
app/products/probes/sm-50-pmma/page.tsx
app/products/probes/sm-100-peek/page.tsx
app/products/probes/sm-100-pmma/page.tsx
app/products/probes/sm-250-peek/page.tsx
app/products/probes/sm-250-pmma/page.tsx
app/products/probes/sm-500-pmma/page.tsx
app/products/probes/sm-1000-pmma/page.tsx
app/products/probes/tm-50-pmma/page.tsx
app/products/probes/tm-100-pmma/page.tsx
app/products/probes/tm-250-pmma/page.tsx
app/products/probes/tm-500-pmma/page.tsx
```

## 4. 未变化文件

无。

## 5. 后续验证

重新启动 dev 后，即使访问 `/products/probes/ea-100-pmma`，也应该自动跳到 `/products/pumps/plunger-pumps/ea-100-pmma`，不再出现 `generateStaticParams` missing param 报错。