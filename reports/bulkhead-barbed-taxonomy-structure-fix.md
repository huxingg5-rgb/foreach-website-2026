# 穿板倒刺接头taxonomy结构修复

生成时间：2026/7/13 11:43:11

## 原因

- 原taxonomy缺少 `type: "productType"`
- 原taxonomy的 `id` 为 `fittings:bulkhead-barbed-fittings`
- ProductSelectionClient按产品类型ID `bulkhead-barbed-fittings` 查询，因此匹配失败
- 匹配失败后页面回退显示内部ID

## 修复结果

- type：productType
- id：bulkhead-barbed-fittings
- 中文名称：穿板倒刺接头
- 未修改组件
- 未修改CSS
- 未修改产品卡片数据

- 备份：F:\WebsiteProjects\foreach-website-2026\data\products\selection\bulkhead-barbed-fitting-selection.generated.ts.bak_taxonomy_structure_20260713034311
