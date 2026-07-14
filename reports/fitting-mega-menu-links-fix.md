# 接头 Mega Menu 点击跳转修改结果

生成时间：2026/7/13 11:54:27

## 跳转地址

- 硬管接头 → /products/fittings/hard-tube-fittings
- 倒刺接头 → /products/fittings/barbed-fittings
- 螺纹转倒刺接头 → /products/fittings/thread-to-barbed-fittings
- 鲁尔接头 → /products/fittings/luer-fittings
- 快插接头 → /products/fittings/quick-connect-fittings
- 内螺纹互转接头 → /products/fittings/female-thread-adapters
- 穿板倒刺接头 → /products/fittings/bulkhead-barbed-fittings
- 过滤器与单向阀 → /products/fittings/filters

## 修改范围

- data/navigation.ts
  - 给8张接头导航图片补充各自的 localizedPath

- components/layout/SiteHeader.tsx
  - 读取 cardImage.href
  - 有链接时使用现有 Link 组件跳转
  - 点击后执行 closeAllPanels
  - 使用 display: contents，不改变现有网格与卡片样式

## 未修改

- 未修改CSS
- 未修改选型数据
- 未修改详情页

## 备份

- F:\WebsiteProjects\foreach-website-2026\data\navigation.ts.bak_fitting_mega_links_20260713035427
- F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx.bak_fitting_mega_links_20260713035427
