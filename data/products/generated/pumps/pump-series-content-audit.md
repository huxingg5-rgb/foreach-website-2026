# 泵系列数据库内容审查

生成时间：2026-07-03T10:18:26.843Z

## 一、当前数据源状态

- 产品数量：21
- 路由数量：21
- 选型卡片数量：21
- 泵系列数据源：F:\WebsiteProjects\foreach-website-2026\data-source\product-center\pumps\FOREACH_泵系列_产品数据源.xlsx
- 全站脚注库：F:\WebsiteProjects\foreach-website-2026\data-source\global\FOREACH_全站脚注库.xlsx

## 二、产品页面基础信息

| productId | 路由 | 中文 H1 | 英文 H1 | detailMode | showModel |
|---|---|---|---|---|---|
| ea-100-pmma | /products/pumps/plunger-pumps/ea-100-pmma | EA-100-PMMA 柱塞泵 | 100 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-250-pmma | /products/pumps/plunger-pumps/ea-250-pmma | EA-250-PMMA 柱塞泵 | 250 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| sm-100-pmma | /products/pumps/plunger-pumps/sm-100-pmma | SM-100-PMMA 微型柱塞泵 | 100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| ea-100-peek | /products/pumps/plunger-pumps/ea-100-peek | EA-100-PEEK 柱塞泵 | 100 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-250-peek | /products/pumps/plunger-pumps/ea-250-peek | EA-250-PEEK 柱塞泵 | 250 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-500-peek | /products/pumps/plunger-pumps/ea-500-peek | EA-500-PEEK 柱塞泵 | 500 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-500-pmma | /products/pumps/plunger-pumps/ea-500-pmma | EA-500-PMMA 柱塞泵 | 500 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-1000-peek | /products/pumps/plunger-pumps/ea-1000-peek | EA-1000-PEEK 柱塞泵 | 1000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-1000-pmma | /products/pumps/plunger-pumps/ea-1000-pmma | EA-1000-PMMA 柱塞泵 | 1000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-2500-peek | /products/pumps/plunger-pumps/ea-2500-peek | EA-2500-PEEK 柱塞泵 | 2500 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-2500-pmma | /products/pumps/plunger-pumps/ea-2500-pmma | EA-2500-PMMA 柱塞泵 | 2500 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-5000-peek | /products/pumps/plunger-pumps/ea-5000-peek | EA-5000-PEEK 柱塞泵 | 5000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-5000-pmma | /products/pumps/plunger-pumps/ea-5000-pmma | EA-5000-PMMA 柱塞泵 | 5000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-10000-peek | /products/pumps/plunger-pumps/ea-10000-peek | EA-10000-PEEK 柱塞泵 | 10000 µL PEEK Plunger Pump for Precision Dispensing | custom_inquiry | false |
| ea-10000-pmma | /products/pumps/plunger-pumps/ea-10000-pmma | EA-10000-PMMA 柱塞泵 | 10000 µL PMMA Plunger Pump for Precision Dispensing | custom_inquiry | false |
| sm-50-pmma | /products/pumps/plunger-pumps/sm-50-pmma | SM-50-PMMA 微型柱塞泵 | 50 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| sm-100-peek | /products/pumps/plunger-pumps/sm-100-peek | SM-100-PEEK 微型柱塞泵 | 100 µL Miniature PEEK Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| sm-250-peek | /products/pumps/plunger-pumps/sm-250-peek | SM-250-PEEK 微型柱塞泵 | 250 µL Miniature PEEK Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| sm-250-pmma | /products/pumps/plunger-pumps/sm-250-pmma | SM-250-PMMA 微型柱塞泵 | 250 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| sm-500-pmma | /products/pumps/plunger-pumps/sm-500-pmma | SM-500-PMMA 微型柱塞泵 | 500 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |
| sm-1000-pmma | /products/pumps/plunger-pumps/sm-1000-pmma | SM-1000-PMMA 微型柱塞泵 | 1000 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | custom_inquiry | false |

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
