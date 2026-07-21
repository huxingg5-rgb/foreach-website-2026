# 接头导航与产品种类顺序修改结果

生成时间：2026/7/13 11:47:54

## 最终顺序

1. 硬管接头（hard-tube-fittings）
2. 倒刺接头（barbed-fittings）
3. 螺纹转倒刺接头（thread-to-barbed-fittings）
4. 鲁尔接头（luer-fittings）
5. 快插接头（quick-connect-fittings）
6. 内螺纹互转接头（female-thread-adapters）
7. 穿板倒刺接头（bulkhead-barbed-fittings）
8. 过滤器与单向阀（filters）

## 修改文件

- data/navigation.ts
  - 修改Mega Menu接头系列8张导航卡片的顺序
  - 将旧名称统一为正式产品类型名称
  - 保留现有8张图片，仅重新对应产品类型

- components/products/selection/ProductSelectionClient.tsx
  - 左侧“产品种类”按固定顺序显示
  - 接头系列总入口默认从“硬管接头”开始
  - 不改变各产品类型内部筛选逻辑

- data/products/selection/product-route-map.ts
  - 接头类型按统一顺序排列
  - 补充螺纹转倒刺接头路由配置
  - 统一中文名称

## 备份

- F:\WebsiteProjects\foreach-website-2026\data\navigation.ts.bak_fitting_order_20260713034754
- F:\WebsiteProjects\foreach-website-2026\components\products\selection\ProductSelectionClient.tsx.bak_fitting_order_20260713034754
- F:\WebsiteProjects\foreach-website-2026\data\products\selection\product-route-map.ts.bak_fitting_order_20260713034754
