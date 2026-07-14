# 穿板倒刺接头数据源与页面接入检查

生成时间：2026/7/13 10:22:42

## 一、权威数据源

- Excel：data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx
- Sheet：08_穿板倒刺接头 
- 非空行：11
- 识别业务行：9
- 唯一型号：9
- 唯一商品编码：9

## 二、型号分类

- PMB穿板倒刺接头：9
- PMBSN六角螺母：0

### PMB型号

- PMB-U28-24D-PP-N
- PMB-U28-32D-PP-N
- PMB-U28-24D-PA-W
- PMB-U28-32D-PA-W
- PMB-U28-16D-PP-N
- PMB-U28-16D-PA-W
- PMB-M6-40-PP-N
- PMB-M10-64-PP-N
- PMB-M12-79-PP-N

### PMBSN型号

- 未识别到PMBSN型号

## 三、Excel业务行

| Excel行 | 分类 | 型号 | 商品编码 | 原始内容 |
|---:|---|---|---|---|
| 3 | 穿板倒刺接头 | PMB-U28-24D-PP-N | 809462 | 穿板倒刺接头｜PMB｜443-02-00039｜穿板倒刺接头 PMB-U28-24D-PP-N｜809462｜｜｜｜｜｜｜ |
| 4 | 穿板倒刺接头 | PMB-U28-32D-PP-N | 809463 | 穿板倒刺接头｜PMB｜443-02-00040｜穿板倒刺接头 PMB-U28-32D-PP-N｜809463｜｜｜｜｜｜｜ |
| 5 | 穿板倒刺接头 | PMB-U28-24D-PA-W | 809496 | 穿板倒刺接头｜PMB｜443-02-00073｜穿板倒刺接头 PMB-U28-24D-PA-W｜809496｜｜｜｜｜｜｜ |
| 6 | 穿板倒刺接头 | PMB-U28-32D-PA-W | 809497 | 穿板倒刺接头｜PMB｜443-02-00074｜穿板倒刺接头 PMB-U28-32D-PA-W｜809497｜｜｜｜｜｜｜ |
| 7 | 穿板倒刺接头 | PMB-U28-16D-PP-N | 809304 | 穿板倒刺接头｜PMB｜443-02-00323｜穿板倒刺接头 PMB-U28-16D-PP-N｜809304｜｜｜｜｜｜｜ |
| 8 | 穿板倒刺接头 | PMB-U28-16D-PA-W | 809517 | 穿板倒刺接头｜PMB｜443-02-00470｜穿板倒刺接头 PMB-U28-16D-PA-W｜809517｜｜｜｜｜｜｜ |
| 9 | 穿板倒刺接头 | PMB-M6-40-PP-N | 806233 | 穿板倒刺接头｜PMB｜382-19-00400｜穿板倒刺接头 PMB-M6-40-PP-N｜806233｜｜｜｜｜｜｜ |
| 10 | 穿板倒刺接头 | PMB-M10-64-PP-N | 806235 | 穿板倒刺接头｜PMB｜382-19-00402｜穿板倒刺接头 PMB-M10-64-PP-N｜806235｜｜｜｜｜｜｜ |
| 11 | 穿板倒刺接头 | PMB-M12-79-PP-N | 806236 | 穿板倒刺接头｜PMB｜382-19-00403｜穿板倒刺接头 PMB-M12-79-PP-N｜806236｜｜｜｜｜｜｜ |

## 四、鲁尔接头同级接入位置

- ProductSelectionClient存在：是
- 鲁尔接头相关代码行：2

- 第3396行：`* 鲁尔接头双向组合联动：`
- 第3404行：`"luer-fittings"`

## 五、现有路由映射文件

- data/products/selection/product-route-map.ts

## 六、图片资源

- 命中图片：0

- 暂未找到PMB、PMBSN或商品编码命名的图片

## 七、项目内已有穿板倒刺文件

- scripts/products/audit-bulkhead-barbed-fitting-source.cjs

## 八、建议页面架构

- 产品类型ID：`bulkhead-barbed-fittings`
- 选型页：`/products/fittings/bulkhead-barbed-fittings`
- 详情页：`/products/fittings/bulkhead-barbed-fittings/[slug]`
- 选型数据：`data/products/selection/bulkhead-barbed-fitting-selection.generated.ts`
- 详情数据：`data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json`
- 继续复用 `ProductSelectionClient`、`ProductFilterPanel` 和 `ProductDetailClient`
- 不新增穿板倒刺专属CSS

