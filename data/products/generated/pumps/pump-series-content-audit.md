# 泵系列数据库内容审查

生成时间：2026-07-03T08:45:21.327Z

## 一、当前数据源状态

- 产品数量：3
- 路由数量：3
- 选型卡片数量：3
- 泵系列数据源：F:\WebsiteProjects\foreach-website-2026\data-source\product-center\pumps\FOREACH_泵系列_产品数据源.xlsx
- 全站脚注库：F:\WebsiteProjects\foreach-website-2026\data-source\global\FOREACH_全站脚注库.xlsx

## 二、产品页面基础信息

| productId | 路由 | 中文 H1 | 英文 H1 | detailMode | showModel |
|---|---|---|---|---|---|
| ea-100-pmma | /products/pumps/plunger-pumps/ea-100-pmma | EA-100-PMMA 柱塞泵 | 100 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-250-pmma | /products/pumps/plunger-pumps/ea-250-pmma | EA-250-PMMA 柱塞泵 | 250 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| sm-100-pmma | /products/pumps/plunger-pumps/sm-100-pmma | SM-100-PMMA 微型柱塞泵 | 100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |

## 三、需要人工确认的问题

- 暂无脚本级 warning。

## 四、下一步人工检查重点

1. 中文 H1 是否保持型号式标题，例如：EA-100-PMMA 柱塞泵。
2. 英文 H1 是否为描述式标题，不直接堆型号。
3. 柱塞泵 detailMode 是否为 custom_inquiry。
4. 柱塞泵 showModel 是否为 false。
5. 详情页 H2 / tab 标题是否来自 06_页面模块与标题。
6. 选型卡片文案是否来自 07_选型卡片。
7. 图片说明是否来自 10_图片资源。
8. 脚注正文是否来自全站脚注库，产品表只写 footnoteIds。
