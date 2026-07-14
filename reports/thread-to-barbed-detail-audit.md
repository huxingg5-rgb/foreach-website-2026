# 螺纹转倒刺接头详情页接入审计

生成时间：2026/7/12 21:12:07

> 本次只检查，没有修改任何代码或文件。

## 1. 数据概况

- 筛选型号数量：**101**
- JPG 文件数量：**90**
- PDF 文件数量：**59**
- JPG 成功匹配：**68**
- JPG 未匹配型号：**33**
- PDF 成功匹配：**0**
- PDF 未匹配型号：**101**
- 重复 slug 组数：**2**

## 2. 系列数量

```json
{
  "SA": 45,
  "SAL": 10,
  "SB": 34,
  "SBS": 4,
  "SBR": 3,
  "SC": 5
}
```

## 3. 推荐详情结构

```text
data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
app/products/fittings/thread-to-barbed-fittings/[slug]/page.tsx
components/products/detail/ProductDetailClient.tsx
```

建议继续使用：

```ts
detailMode: "standard_model"
productTypeId: "thread-to-barbed-fittings"
```

## 4. 型号与资源匹配

| 商品编码 | 型号 | slug | JPG | PDF |
|---|---|---|---|---|
| 809268 | SA-U32-24F-PP-N | sa-u32-24f-pp-n | SA-U32-24F-PP-N.jpg | 缺失 |
| 809269 | SA-U32-32F-PP-N | sa-u32-32f-pp-n | SA-U32-32F-PP-N.jpg | 缺失 |
| 809323 | SA-U32-24F-PA-W | sa-u32-24f-pa-w | SA-U32-24F-PA-W.jpg | 缺失 |
| 809339 | SA-U32-16F-PA-W | sa-u32-16f-pa-w | SA-U32-16F-PA-W.jpg | 缺失 |
| 809340 | SA-U32-32F-PA-W | sa-u32-32f-pa-w | SA-U32-32F-PA-W.jpg | 缺失 |
| 809382 | SAL-U32-16D-PP-N | sal-u32-16d-pp-n | SAL-U32-16D-PP-N.jpg | 缺失 |
| 809383 | SAL-U32-16D-PA-W | sal-u32-16d-pa-w | SAL-U32-16D-PA-W.jpg | 缺失 |
| 809384 | SAL-U32-32D-PP-N | sal-u32-32d-pp-n | SAL-U32-32D-PP-N.jpg | 缺失 |
| 809385 | SAL-U32-32D-PA-W | sal-u32-32d-pa-w | SAL-U32-32D-PA-W.jpg | 缺失 |
| 809386 | SAL-U28-16D-PP-N | sal-u28-16d-pp-n | SAL-U28-16D-PP-N.jpg | 缺失 |
| 809387 | SAL-U28-16D-PA-W | sal-u28-16d-pa-w | SAL-U28-16D-PA-W.jpg | 缺失 |
| 809388 | SAL-U28-32D-PP-N | sal-u28-32d-pp-n | SAL-U28-32D-PP-N.jpg | 缺失 |
| 809389 | SAL-U28-32D-PA-W | sal-u28-32d-pa-w | SAL-U28-32D-PA-W.jpg | 缺失 |
| 809465 | SA-U28-16D-PP-N | sa-u28-16d-pp-n | SA-U28-16D-PP-N.jpg | 缺失 |
| 809466 | SA-U28-24D-PP-N | sa-u28-24d-pp-n | SA-U28-24D-PP-N.jpg | 缺失 |
| 809467 | SA-U28-32D-PP-N | sa-u28-32d-pp-n | SA-U28-32D-PP-N.jpg | 缺失 |
| 809468 | SA-U28-40D-PP-N | sa-u28-40d-pp-n | SA-U28-40D-PP-N.jpg | 缺失 |
| 809469 | SA-U28-48D-PP-N | sa-u28-48d-pp-n | SA-U28-48D-PP-N.jpg | 缺失 |
| 809470 | SA-1/8NPT-24C-PP-N | sa-1-8npt-24c-pp-n | 缺失 | 缺失 |
| 809471 | SA-1/8NPT-32C-PP-N | sa-1-8npt-32c-pp-n | 缺失 | 缺失 |
| 809472 | SA-1/8NPT-40C-PP-N | sa-1-8npt-40c-pp-n | 缺失 | 缺失 |
| 809473 | SA-1/8NPT-48C-PP-N | sa-1-8npt-48c-pp-n | 缺失 | 缺失 |
| 809474 | SA-1/8NPT-64C-PP-N | sa-1-8npt-64c-pp-n | 缺失 | 缺失 |
| 809475 | SAL-1/8NPT-64D-PP-N | sal-1-8npt-64d-pp-n | 缺失 | 缺失 |
| 809476 | SA-1/4NPT-32D-PP-N | sa-1-4npt-32d-pp-n | 缺失 | 缺失 |
| 809477 | SA-1/4NPT-64D-PP-N | sa-1-4npt-64d-pp-n | 缺失 | 缺失 |
| 809478 | SA-1/4NPT-95D-PP-N | sa-1-4npt-95d-pp-n | 缺失 | 缺失 |
| 809494 | SA-U28-24D-PA-W | sa-u28-24d-pa-w | SA-U28-24D-PA-W.jpg | 缺失 |
| 809495 | SA-U28-40D-PA-W | sa-u28-40d-pa-w | SA-U28-40D-PA-W.jpg | 缺失 |
| 809500 | SA-U28-32D-PA-W | sa-u28-32d-pa-w | SA-U28-32D-PA-W.jpg | 缺失 |
| 809501 | SA-U28-48D-PA-W | sa-u28-48d-pa-w | SA-U28-48D-PA-W.jpg | 缺失 |
| 809502 | SA-1/8NPT-24C-PA-W | sa-1-8npt-24c-pa-w | 缺失 | 缺失 |
| 809503 | SA-1/8NPT-32C-PA-W | sa-1-8npt-32c-pa-w | 缺失 | 缺失 |
| 809504 | SA-1/8NPT-40C-PA-W | sa-1-8npt-40c-pa-w | 缺失 | 缺失 |
| 809505 | SA-1/8NPT-48C-PA-W | sa-1-8npt-48c-pa-w | 缺失 | 缺失 |
| 809506 | SA-1/8NPT-64C-PA-W | sa-1-8npt-64c-pa-w | 缺失 | 缺失 |
| 809507 | SAL-1/8NPT-64D-PA-W | sal-1-8npt-64d-pa-w | 缺失 | 缺失 |
| 809509 | SA-1/4NPT-64D-PA-W | sa-1-4npt-64d-pa-w | 缺失 | 缺失 |
| 809510 | SA-1/4NPT-95D-PA-W | sa-1-4npt-95d-pa-w | 缺失 | 缺失 |
| 809826 | SA-U32-24F-PV-N | sa-u32-24f-pv-n | 缺失 | 缺失 |
| 809835 | SA-X32-32D-PA-W | sa-x32-32d-pa-w | SA-X32-32D-PA-W.jpg | 缺失 |
| 809836 | SA-X32-24D-PP-N | sa-x32-24d-pp-n | SA-X32-24D-PP-N.jpg | 缺失 |
| 809847 | SA-X32-24D-PA-W | sa-x32-24d-pa-w | SA-X32-24D-PA-W.jpg | 缺失 |
| 809848 | SA-X32-32D-PP-N | sa-x32-32d-pp-n | SA-X32-32D-PP-N.jpg | 缺失 |
| 839936 | SA-3/8NPT-127-PP-N | sa-3-8npt-127-pp-n | 缺失 | 缺失 |
| 809948 | SA-U32-16D-PP-N | sa-u32-16d-pp-n | 缺失 | 缺失 |
| 809952 | SA-U32-16D-PA-W | sa-u32-16d-pa-w | 缺失 | 缺失 |
| 809490 | SA-G1/8-40C-PV-N | sa-g1-8-40c-pv-n | 缺失 | 缺失 |
| 809546 | SA-G1/8-40C-PV-N(O圈FKM) | sa-g1-8-40c-pv-n | 缺失 | 缺失 |
| 809034 | SA-G1/8-64C-PP-N（带O圈） | sa-g1-8-64c-pp-n | 缺失 | 缺失 |
| 809867 | SA-G1/8-40C-PV-N（带O圈） | sa-g1-8-40c-pv-n | 缺失 | 缺失 |
| 809868 | SA-G1/8-40C-PP-N（带O圈） | sa-g1-8-40c-pp-n | 缺失 | 缺失 |
| 809873 | SA-G1/8-64C-PV-N（带O圈） | sa-g1-8-64c-pv-n | 缺失 | 缺失 |
| 809924 | SA-G1/8-64C-PP-N（带O圈） | sa-g1-8-64c-pp-n | 缺失 | 缺失 |
| 809953 | SA-G1/8-64C-PK-N（带o圈） | sa-g1-8-64c-pk-n | 缺失 | 缺失 |
| 809003 | SB-U28-16-PP-N | sb-u28-16-pp-n | SB-U28-16-PP-N.jpg | 缺失 |
| 809007 | SB-U28-24-PP-N | sb-u28-24-pp-n | SB-U28-24-PP-N.jpg | 缺失 |
| 809010 | SB-U28-32-PP-N | sb-u28-32-pp-n | SB-U28-32-PP-N.jpg | 缺失 |
| 809014 | SB-U28-40-PP-N | sb-u28-40-pp-n | SB-U28-40-PP-N.jpg | 缺失 |
| 809017 | SB-M6-16-PP-N | sb-m6-16-pp-n | SB-M6-16-PP-N.jpg | 缺失 |
| 809021 | SB-M6-24-PP-N | sb-m6-24-pp-n | SB-M6-24-PP-N.jpg | 缺失 |
| 809024 | SB-M6-32-PP-N | sb-m6-32-pp-n | SB-M6-32-PP-N.jpg | 缺失 |
| 809028 | SB-M6-40-PP-N | sb-m6-40-pp-n | SB-M6-40-PP-N.jpg | 缺失 |
| 809002 | SB-U28-16-AC-B | sb-u28-16-ac-b | SB-U28-16-AC-B.jpg | 缺失 |
| 809006 | SB-U28-24-AC-B | sb-u28-24-ac-b | SB-U28-24-AC-B.jpg | 缺失 |
| 809009 | SB-U28-32-AC-B | sb-u28-32-ac-b | SB-U28-32-AC-B.jpg | 缺失 |
| 809013 | SB-U28-40-AC-B | sb-u28-40-ac-b | SB-U28-40-AC-B.jpg | 缺失 |
| 809020 | SB-M6-24-AC-B | sb-m6-24-ac-b | SB-M6-24-AC-B.jpg | 缺失 |
| 809027 | SB-M6-40-AC-B | sb-m6-40-ac-b | SB-M6-40-AC-B.jpg | 缺失 |
| 809001 | SB-U28-16-PV-N | sb-u28-16-pv-n | SB-U28-16-PV-N.jpg | 缺失 |
| 809005 | SB-U28-24-PV-N | sb-u28-24-pv-n | SB-U28-24-PV-N.jpg | 缺失 |
| 809008 | SB-U28-32-PV-N | sb-u28-32-pv-n | SB-U28-32-PV-N.jpg | 缺失 |
| 809012 | SB-U28-40-PV-N | sb-u28-40-pv-n | SB-U28-40-PV-N.jpg | 缺失 |
| 809015 | SB-M6-16-PV-N | sb-m6-16-pv-n | SB-M6-16-PV-N.jpg | 缺失 |
| 809019 | SB-M6-24-PV-N | sb-m6-24-pv-n | SB-M6-24-PV-N.jpg | 缺失 |
| 809022 | SB-M6-32-PV-N | sb-m6-32-pv-n | SB-M6-32-PV-N.jpg | 缺失 |
| 809026 | SB-M6-40-PV-N | sb-m6-40-pv-n | SB-M6-40-PV-N.jpg | 缺失 |
| 809004 | SB-U28-16-PP-W | sb-u28-16-pp-w | 缺失 | 缺失 |
| 809011 | SB-U28-32-PP-W | sb-u28-32-pp-w | 缺失 | 缺失 |
| 809018 | SB-M6-16-PP-W | sb-m6-16-pp-w | 缺失 | 缺失 |
| 809025 | SB-M6-32-PP-W | sb-m6-32-pp-w | 缺失 | 缺失 |
| 809479 | SB-M5-24D-PP-N | sb-m5-24d-pp-n | SB-M5-24D-PP-N.jpg | 缺失 |
| 809480 | SB-M5-32D-PP-N | sb-m5-32d-pp-n | SB-M5-32D-PP-N.jpg | 缺失 |
| 809481 | SB-M5-40D-PP-N | sb-m5-40d-pp-n | SB-M5-40D-PP-N.jpg | 缺失 |
| 809511 | SB-M5-24D-PA-W | sb-m5-24d-pa-w | SB-M5-24D-PA-W.jpg | 缺失 |
| 809512 | SB-M5-32D-PA-W | sb-m5-32d-pa-w | SB-M5-32D-PA-W.jpg | 缺失 |
| 809513 | SB-M5-40D-PA-W | sb-m5-40d-pa-w | SB-M5-40D-PA-W.jpg | 缺失 |
| 809647 | SB-M5-16D-PP-N | sb-m5-16d-pp-n | SB-M5-16D-PP-N.jpg | 缺失 |
| 809301 | SB-M5-16D-PA-W | sb-m5-16d-pa-w | SB-M5-16D-PA-W.jpg | 缺失 |
| 809302 | SBS-M6-24D-PP-N | sbs-m6-24d-pp-n | SBS-M6-24D-PP-N.jpg | 缺失 |
| 809303 | SBS-M6-32D-PP-N | sbs-m6-32d-pp-n | SBS-M6-32D-PP-N.jpg | 缺失 |
| 809535 | SBS-M6-24D-PA-W | sbs-m6-24d-pa-w | SBS-M6-24D-PA-W.jpg | 缺失 |
| 809536 | SBS-M6-32D-PA-W | sbs-m6-32d-pa-w | SBS-M6-32D-PA-W.jpg | 缺失 |
| 809528 | SBR-U28-16-PP-N | sbr-u28-16-pp-n | SBR-U28-16-PP-N.jpg | 缺失 |
| 809529 | SBR-U28-24-PP-N | sbr-u28-24-pp-n | SBR-U28-24-PP-N.jpg | 缺失 |
| 809530 | SBR-U28-32-PP-N | sbr-u28-32-pp-n | SBR-U28-32-PP-N.jpg | 缺失 |
| 809522 | SC-U28-16D-PP-N | sc-u28-16d-pp-n | SC-U28-16D-PP-N.jpg | 缺失 |
| 809523 | SC-U28-24D-PP-N | sc-u28-24d-pp-n | SC-U28-24D-PP-N.jpg | 缺失 |
| 809524 | SC-U28-32D-PP-N | sc-u28-32d-pp-n | SC-U28-32D-PP-N.jpg | 缺失 |
| 809292 | SC-M6-16-PP-N | sc-m6-16-pp-n | SC-M6-16-PP-N.jpg | 缺失 |
| 809293 | SC-M6-32-PP-N | sc-m6-32-pp-n | SC-M6-32-PP-N.jpg | 缺失 |

## 5. 未匹配 JPG 的型号

- SA-1/8NPT-24C-PP-N（809470）
- SA-1/8NPT-32C-PP-N（809471）
- SA-1/8NPT-40C-PP-N（809472）
- SA-1/8NPT-48C-PP-N（809473）
- SA-1/8NPT-64C-PP-N（809474）
- SAL-1/8NPT-64D-PP-N（809475）
- SA-1/4NPT-32D-PP-N（809476）
- SA-1/4NPT-64D-PP-N（809477）
- SA-1/4NPT-95D-PP-N（809478）
- SA-1/8NPT-24C-PA-W（809502）
- SA-1/8NPT-32C-PA-W（809503）
- SA-1/8NPT-40C-PA-W（809504）
- SA-1/8NPT-48C-PA-W（809505）
- SA-1/8NPT-64C-PA-W（809506）
- SAL-1/8NPT-64D-PA-W（809507）
- SA-1/4NPT-64D-PA-W（809509）
- SA-1/4NPT-95D-PA-W（809510）
- SA-U32-24F-PV-N（809826）
- SA-3/8NPT-127-PP-N（839936）
- SA-U32-16D-PP-N（809948）
- SA-U32-16D-PA-W（809952）
- SA-G1/8-40C-PV-N（809490）
- SA-G1/8-40C-PV-N(O圈FKM)（809546）
- SA-G1/8-64C-PP-N（带O圈）（809034）
- SA-G1/8-40C-PV-N（带O圈）（809867）
- SA-G1/8-40C-PP-N（带O圈）（809868）
- SA-G1/8-64C-PV-N（带O圈）（809873）
- SA-G1/8-64C-PP-N（带O圈）（809924）
- SA-G1/8-64C-PK-N（带o圈）（809953）
- SB-U28-16-PP-W（809004）
- SB-U28-32-PP-W（809011）
- SB-M6-16-PP-W（809018）
- SB-M6-32-PP-W（809025）

## 6. 未匹配 PDF 的型号

- SA-U32-24F-PP-N（809268）
- SA-U32-32F-PP-N（809269）
- SA-U32-24F-PA-W（809323）
- SA-U32-16F-PA-W（809339）
- SA-U32-32F-PA-W（809340）
- SAL-U32-16D-PP-N（809382）
- SAL-U32-16D-PA-W（809383）
- SAL-U32-32D-PP-N（809384）
- SAL-U32-32D-PA-W（809385）
- SAL-U28-16D-PP-N（809386）
- SAL-U28-16D-PA-W（809387）
- SAL-U28-32D-PP-N（809388）
- SAL-U28-32D-PA-W（809389）
- SA-U28-16D-PP-N（809465）
- SA-U28-24D-PP-N（809466）
- SA-U28-32D-PP-N（809467）
- SA-U28-40D-PP-N（809468）
- SA-U28-48D-PP-N（809469）
- SA-1/8NPT-24C-PP-N（809470）
- SA-1/8NPT-32C-PP-N（809471）
- SA-1/8NPT-40C-PP-N（809472）
- SA-1/8NPT-48C-PP-N（809473）
- SA-1/8NPT-64C-PP-N（809474）
- SAL-1/8NPT-64D-PP-N（809475）
- SA-1/4NPT-32D-PP-N（809476）
- SA-1/4NPT-64D-PP-N（809477）
- SA-1/4NPT-95D-PP-N（809478）
- SA-U28-24D-PA-W（809494）
- SA-U28-40D-PA-W（809495）
- SA-U28-32D-PA-W（809500）
- SA-U28-48D-PA-W（809501）
- SA-1/8NPT-24C-PA-W（809502）
- SA-1/8NPT-32C-PA-W（809503）
- SA-1/8NPT-40C-PA-W（809504）
- SA-1/8NPT-48C-PA-W（809505）
- SA-1/8NPT-64C-PA-W（809506）
- SAL-1/8NPT-64D-PA-W（809507）
- SA-1/4NPT-64D-PA-W（809509）
- SA-1/4NPT-95D-PA-W（809510）
- SA-U32-24F-PV-N（809826）
- SA-X32-32D-PA-W（809835）
- SA-X32-24D-PP-N（809836）
- SA-X32-24D-PA-W（809847）
- SA-X32-32D-PP-N（809848）
- SA-3/8NPT-127-PP-N（839936）
- SA-U32-16D-PP-N（809948）
- SA-U32-16D-PA-W（809952）
- SA-G1/8-40C-PV-N（809490）
- SA-G1/8-40C-PV-N(O圈FKM)（809546）
- SA-G1/8-64C-PP-N（带O圈）（809034）
- SA-G1/8-40C-PV-N（带O圈）（809867）
- SA-G1/8-40C-PP-N（带O圈）（809868）
- SA-G1/8-64C-PV-N（带O圈）（809873）
- SA-G1/8-64C-PP-N（带O圈）（809924）
- SA-G1/8-64C-PK-N（带o圈）（809953）
- SB-U28-16-PP-N（809003）
- SB-U28-24-PP-N（809007）
- SB-U28-32-PP-N（809010）
- SB-U28-40-PP-N（809014）
- SB-M6-16-PP-N（809017）
- SB-M6-24-PP-N（809021）
- SB-M6-32-PP-N（809024）
- SB-M6-40-PP-N（809028）
- SB-U28-16-AC-B（809002）
- SB-U28-24-AC-B（809006）
- SB-U28-32-AC-B（809009）
- SB-U28-40-AC-B（809013）
- SB-M6-24-AC-B（809020）
- SB-M6-40-AC-B（809027）
- SB-U28-16-PV-N（809001）
- SB-U28-24-PV-N（809005）
- SB-U28-32-PV-N（809008）
- SB-U28-40-PV-N（809012）
- SB-M6-16-PV-N（809015）
- SB-M6-24-PV-N（809019）
- SB-M6-32-PV-N（809022）
- SB-M6-40-PV-N（809026）
- SB-U28-16-PP-W（809004）
- SB-U28-32-PP-W（809011）
- SB-M6-16-PP-W（809018）
- SB-M6-32-PP-W（809025）
- SB-M5-24D-PP-N（809479）
- SB-M5-32D-PP-N（809480）
- SB-M5-40D-PP-N（809481）
- SB-M5-24D-PA-W（809511）
- SB-M5-32D-PA-W（809512）
- SB-M5-40D-PA-W（809513）
- SB-M5-16D-PP-N（809647）
- SB-M5-16D-PA-W（809301）
- SBS-M6-24D-PP-N（809302）
- SBS-M6-32D-PP-N（809303）
- SBS-M6-24D-PA-W（809535）
- SBS-M6-32D-PA-W（809536）
- SBR-U28-16-PP-N（809528）
- SBR-U28-24-PP-N（809529）
- SBR-U28-32-PP-N（809530）
- SC-U28-16D-PP-N（809522）
- SC-U28-24D-PP-N（809523）
- SC-U28-32D-PP-N（809524）
- SC-M6-16-PP-N（809292）
- SC-M6-32-PP-N（809293）

## 7. 未使用 JPG

- SA-14NPT-32D-PA-W.jpg
- SA-14NPT-32D-PP-N.jpg
- SA-14NPT-64D-PA-W.jpg
- SA-14NPT-64D-PP-N.jpg
- SA-14NPT-95D-PA-W.jpg
- SA-14NPT-95D-PP-N.jpg
- SA-18NPT-24C-PA-W.jpg
- SA-18NPT-24C-PP-N.jpg
- SA-18NPT-32C-PA-W.jpg
- SA-18NPT-32C-PP-N.jpg
- SA-18NPT-40C-PA-W.jpg
- SA-18NPT-40C-PP-N.jpg
- SA-18NPT-48C-PA-W.jpg
- SA-18NPT-48C-PP-N.jpg
- SA-18NPT-64C-PA-W.jpg
- SA-18NPT-64C-PP-N.jpg
- SA-U28-16D-PA-W.jpg
- SA-U32-16F-PP-N.jpg
- SAL-18NPT-64D-PA-W.jpg
- SAL-18NPT-64D-PP-N.jpg
- SB-M6-16-AC-B.jpg
- SB-M6-32-AC-B.jpg

## 8. 未使用 PDF

- 443-00-00304-C.pdf
- 443-00-00306-C.pdf
- 443-00-00307-C.pdf
- 443-00-00308-C.pdf
- 443-00-00309-C.pdf
- 443-00-00310-C.pdf
- 443-00-00311-C.pdf
- 443-00-00328-C.pdf
- 443-00-00335-C.pdf
- 443-00-00336-C.pdf
- 443-00-00337-C.pdf
- 443-00-00338-C.pdf
- 443-00-00339-C.pdf
- 443-00-00340-C.pdf
- 443-00-00341-C.pdf
- 443-00-00342-C.pdf
- 443-01-00021-C.pdf
- 443-01-00022-C.pdf
- 443-01-00023-C.pdf
- 443-01-00077-C.pdf
- 443-01-00095-C.pdf
- 443-01-00096-C.pdf
- 443-01-00138-C.pdf
- 443-01-00139-C.pdf
- 443-01-00140-C.pdf
- 443-01-00142-C.pdf
- 443-01-00143-C.pdf
- 443-01-00144-C.pdf
- 443-01-00145-C.pdf
- 443-02-00042-C.pdf
- 443-02-00043-C.pdf
- 443-02-00044-C.pdf
- 443-02-00045-C.pdf
- 443-02-00046-C.pdf
- 443-02-00047-C.pdf
- 443-02-00048-C.pdf
- 443-02-00049-C.pdf
- 443-02-00050-C.pdf
- 443-02-00051-C.pdf
- 443-02-00052-C.pdf
- 443-02-00053-C.pdf
- 443-02-00054-C.pdf
- 443-02-00055-C.pdf
- 443-02-00057-C.pdf
- 443-02-00058-C.pdf
- 443-02-00072-C.pdf
- 443-02-00077-C.pdf
- 443-02-00078-C.pdf
- 443-02-00079-C.pdf
- 443-02-00080-C.pdf
- 443-02-00081-C.pdf
- 443-02-00084-C.pdf
- 443-02-00086-C.pdf
- 443-02-00087-C.pdf
- 443-02-00088-C.pdf
- 443-02-00089-C.pdf
- 443-02-00090-C.pdf
- 443-02-00588-C.pdf
- 443-02-00589-C.pdf

## 9. 重复 slug

### sa-g1-8-40c-pv-n

- SA-G1/8-40C-PV-N（809490）
- SA-G1/8-40C-PV-N(O圈FKM)（809546）
- SA-G1/8-40C-PV-N（带O圈）（809867）

### sa-g1-8-64c-pp-n

- SA-G1/8-64C-PP-N（带O圈）（809034）
- SA-G1/8-64C-PP-N（带O圈）（809924）

## 10. 现有详情页参考文件

### app/products/fittings/barbed-fittings/[slug]/page.tsx

```text
    1: import type {
    2:   ComponentType,
    3: } from "react";
    4: 
    5: import type {
    6:   Metadata,
    7: } from "next";
    8: 
    9: import {
   10:   notFound,
   11: } from "next/navigation";
   12: 
   13: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   14: import detailsJson from "@/data/products/generated/fittings/barbed-fittings/detail/index.json";
   15: 
   16: import "../../../products.css";
   17: 
   18: type DetailRecord = {
   19:   slug: string;
   20:   model: string;
   21:   name?: string;
   22:   title?: string;
   23:   description?: string;
   24:   seo?: {
   25:     title?: string;
   26:     description?: string;
   27:   };
   28:   [key: string]: unknown;
   29: };
   30: 
   31: type PageProps = {
   32:   params: Promise<{
   33:     slug: string;
   34:   }>;
   35: };
   36: 
   37: const details =
   38:   detailsJson as DetailRecord[];
   39: 
   40: const ProductDetailView =
   41:   ProductDetailClient as unknown as ComponentType<{
   42:     data: any;
   43:   }>;
   44: 
   45: export const dynamicParams =
   46:   false;
   47: 
   48: function normalizeSegment(
   49:   value: string
   50: ) {
   51:   return String(value || "")
   52:     .trim()
   53:     .toLowerCase();
   54: }
   55: 
   56: function findDetail(
   57:   slug: string
   58: ) {
   59:   const target =
   60:     normalizeSegment(slug);
   61: 
   62:   return details.find(
   63:     (item) =>
   64:       normalizeSegment(
   65:         item.slug
   66:       ) === target
   67:   );
   68: }
   69: 
   70: export function generateStaticParams() {
   71:   return details.map(
   72:     (detail) => ({
   73:       slug:
   74:         detail.slug,
   75:     })
   76:   );
   77: }
   78: 
   79: export async function generateMetadata({
   80:   params,
   81: }: PageProps): Promise<Metadata> {
   82:   const {
   83:     slug,
   84:   } = await params;
   85: 
   86:   const detail =
   87:     findDetail(slug);
   88: 
   89:   if (!detail) {
   90:     return {};
   91:   }
   92: 
   93:   return {
   94:     title:
   95:       detail.seo?.title ||
   96:       detail.model + " " + (detail.name || detail.title || "倒刺接头") + " | FOREACH",
   97: 
   98:     description:
   99:       detail.seo?.description ||
  100:       detail.description,
  101:   };
  102: }
  103: 
  104: export default async function BarbedFittingDetailPage({
  105:   params,
  106: }: PageProps) {
  107:   const {
  108:     slug,
  109:   } = await params;
  110: 
  111:   const detail =
  112:     findDetail(slug);
  113: 
  114:   if (!detail) {
  115:     notFound();
  116:   }
  117: 
  118:   return (
  119:     <ProductDetailView
  120:       data={detail}
  121:     />
  122:   );
  123: }
  124: 
```

### app/products/fittings/quick-connect-fittings/[slug]/page.tsx

```text
    1: import type {
    2:   ComponentType,
    3: } from "react";
    4: 
    5: import type {
    6:   Metadata,
    7: } from "next";
    8: 
    9: import {
   10:   notFound,
   11: } from "next/navigation";
   12: 
   13: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   14: import detailsJson from "@/data/products/generated/fittings/quick-connect-fittings/detail/index.json";
   15: 
   16: import "../../../products.css";
   17: 
   18: type DetailRecord = {
   19:   slug: string;
   20:   model: string;
   21:   name?: string;
   22:   title?: string;
   23:   description?: string;
   24:   seo?: {
   25:     title?: string;
   26:     description?: string;
   27:   };
   28:   [key: string]: unknown;
   29: };
   30: 
   31: type PageProps = {
   32:   params: Promise<{
   33:     slug: string;
   34:   }>;
   35: };
   36: 
   37: const details =
   38:   detailsJson as DetailRecord[];
   39: 
   40: const ProductDetailView =
   41:   ProductDetailClient as unknown as ComponentType<{
   42:     data: any;
   43:   }>;
   44: 
   45: export const dynamicParams =
   46:   false;
   47: 
   48: function normalizeSegment(
   49:   value: string
   50: ) {
   51:   return String(
   52:     value ||
   53:     ""
   54:   )
   55:     .trim()
   56:     .toLowerCase();
   57: }
   58: 
   59: function findDetail(
   60:   slug: string
   61: ) {
   62:   const target =
   63:     normalizeSegment(
   64:       slug
   65:     );
   66: 
   67:   return details.find(
   68:     (item) =>
   69:       normalizeSegment(
   70:         item.slug
   71:       ) ===
   72:       target
   73:   );
   74: }
   75: 
   76: export function generateStaticParams() {
   77:   return details.map(
   78:     (detail) => ({
   79:       slug:
   80:         detail.slug,
   81:     })
   82:   );
   83: }
   84: 
   85: export async function generateMetadata({
   86:   params,
   87: }: PageProps): Promise<Metadata> {
   88:   const {
   89:     slug,
   90:   } = await params;
   91: 
   92:   const detail =
   93:     findDetail(
   94:       slug
   95:     );
   96: 
   97:   if (
   98:     !detail
   99:   ) {
  100:     return {};
  101:   }
  102: 
  103:   return {
  104:     title:
  105:       detail.seo?.title ||
  106:       `${detail.model} ${detail.name || detail.title || "快插接头"} | FOREACH`,
  107: 
  108:     description:
  109:       detail.seo?.description ||
  110:       detail.description,
  111:   };
  112: }
  113: 
  114: export default async function QuickConnectFittingDetailPage({
  115:   params,
  116: }: PageProps) {
  117:   const {
  118:     slug,
  119:   } = await params;
  120: 
  121:   const detail =
  122:     findDetail(
  123:       slug
  124:     );
  125: 
  126:   if (
  127:     !detail
  128:   ) {
  129:     notFound();
  130:   }
  131: 
  132:   return (
  133:     <ProductDetailView
  134:       data={
  135:         detail
  136:       }
  137:     />
  138:   );
  139: }
  140: 
```

### app/products/[category]/[slug]/[seriesSlug]/page.tsx

```text
    1: import type { ComponentType } from "react";
    2: import type { Metadata } from "next";
    3: import { notFound } from "next/navigation";
    4: import { Suspense } from "react";
    5: 
    6: import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
    7: import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
    8: import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
    9: 
   10: import {
   11:   getSeriesRouteParams,
   12:   resolveSeriesRoute,
   13: } from "@/data/products/selection/product-route-map";
   14: 
   15: import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
   16: 
   17: import "../../../products.css";
   18: 
   19: type ProductsSeriesRoutePageProps = {
   20:   params: Promise<{
   21:     category: string;
   22:     slug: string;
   23:     seriesSlug: string;
   24:   }>;
   25: };
   26: 
   27: type HardTubeDetailRecord = {
   28:   slug: string;
   29:   model: string;
   30: 
   31:   title?: string;
   32:   name?: string;
   33:   description?: string;
   34: 
   35:   sourceType?: string;
   36:   category?: string;
   37:   categoryId?: string;
   38:   productTypeId?: string;
   39:   productTypeName?: string;
   40: 
   41:   advantages?: string[];
   42:   commonApplications?: string[];
   43: 
   44:   mainImage?: string;
   45:   image?: string;
   46:   heroImage?: string;
   47:   imageCard?: string;
   48:   additionalImages?: string[];
   49: 
   50:   specs?: Array<{
   51:     label: string;
   52:     value: string;
   53:   }>;
   54: 
   55:   faqs?: Array<{
   56:     question: string;
   57:     answer: string;
   58:   }>;
   59: 
   60:   seo?: {
   61:     title?: string;
   62:     description?: string;
   63:   };
   64: 
   65:   [key: string]: unknown;
   66: };
   67: 
   68: const hardTubeDetails =
   69:   hardTubeDetailsJson as HardTubeDetailRecord[];
   70: 
   71: const ProductDetailView =
   72:   ProductDetailClient as unknown as ComponentType<{
   73:     data: any;
   74:   }>;
   75: 
   76: export const dynamicParams = false;
   77: 
   78: function normalizeSegment(value: unknown) {
   79:   return String(value || "")
   80:     .trim()
   81:     .toLowerCase()
   82:     .split("/")
   83:     .filter(Boolean)
   84:     .pop() || "";
   85: }
   86: 
   87: function findHardTubeDetail(
   88:   category: string,
   89:   slug: string,
   90:   seriesSlug: string
   91: ) {
   92:   if (
   93:     category !== "fittings" ||
   94:     slug !== "hard-tube-fittings"
   95:   ) {
   96:     return null;
   97:   }
   98: 
   99:   const targetSlug =
  100:     normalizeSegment(seriesSlug);
  101: 
  102:   return (
  103:     hardTubeDetails.find((item) => {
  104:       return (
  105:         normalizeSegment(item.slug) ===
  106:         targetSlug
  107:       );
  108:     }) || null
  109:   );
  110: }
  111: 
  112: function toHardTubeClientData(
  113:   detail: HardTubeDetailRecord
  114: ) {
  115:   const mainImage =
  116:     detail.mainImage ||
  117:     detail.image ||
  118:     detail.heroImage ||
  119:     detail.imageCard ||
  120:     "";
  121: 
  122:   return {
  123:     ...detail,
  124: 
  125:     sourceType: "fitting-detail",
  126: 
  127:     category: "fittings",
  128:     categoryId: "fittings",
  129:     categoryLabel: "接头系列",
  130: 
  131:     productTypeId:
  132:       "hard-tube-fittings",
  133: 
  134:     productTypeName:
  135:       detail.productTypeName ||
  136:       detail.name ||
  137:       "硬管接头",
  138: 
  139:     slug: detail.slug,
  140:     model: detail.model,
```

### components/products/detail/ProductDetailClient.tsx

```text
    1: "use client";
    2: 
    3: 
    4: import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
    5: import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
    6: /* =========================================================
    7:    ProductDetailClient.tsx
    8:    恒永达官网｜中文产品详情页
    9: 
   10:    重要说明：
   11:    1. 页面结构严格按照用户提供的 HTML 转换。
   12:    2. 未经要求，不调整原始布局、间距、字号与视觉。
   13:    3. 当前明确改动仅包括：
   14:       - 主型号 EA-100-PMMA
   15:       - 添加规格书按钮
   16:       - 申请3D文件按钮
   17:       - 中文不显示保修
   18:       - 主图悬停放大
   19:       - 所有业务按钮只留端口
   20: ========================================================= */
   21: 
   22: import SitePageShell from "@/components/layout/SitePageShell";
   23: import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
   24: import { useMemo, useState } from "react";
   25: 
   26: import type { CSSProperties, MouseEvent } from "react";
   27: import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
   28: import ProductModelViewer from "./ProductModelViewer";
   29: import styles from "./product-detail.module.css";
   30: 
   31: type ProductDetailTab = "spec" | "model3d" | "drawing";
   32: 
   33: type ProductDetailClientProps = {
   34:   data: ProductDetailPageData & Record<string, any>;
   35: };
   36: 
   37: type ZoomStyle = CSSProperties & {
   38:   "--zoom-x"?: string;
   39:   "--zoom-y"?: string;
   40: };
   41: 
   42: function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
   43:   const normalizedConfiguredUrl = configuredUrl?.trim();
   44: 
   45:   if (normalizedConfiguredUrl) {
   46:     return normalizedConfiguredUrl.includes("#")
   47:       ? normalizedConfiguredUrl
   48:       : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
   49:   }
   50: 
   51:   const normalizedSlug = slug.trim().toLowerCase();
   52:   const match = normalizedSlug.match(/^(ea|sm|tm)-(\d+)/);
   53: 
   54:   if (!match) {
   55:     return "";
   56:   }
   57: 
   58:   const seriesCode = match[1];
   59:   const seriesUpper = seriesCode.toUpperCase();
   60:   const capacityCode = String(Number(match[2])).padStart(4, "0") + "UL";
   61: 
   62:   return (
   63:     "/assets/products/" +
   64:     seriesCode +
   65:     "/2d-drawings/" +
   66:     seriesUpper +
   67:     "-" +
   68:     capacityCode +
   69:     ".pdf#toolbar=0&navpanes=0&scrollbar=1"
   70:   );
   71: }
   72: 
   73: function isPlungerPumpDisplayModel(value: unknown): boolean {
   74:   const model = String(value || "").trim();
   75: 
   76:   return /^(EA|SM|TM)-/i.test(model);
   77: }
   78: 
   79: 
   80: function isTubingDetailData(data: any): boolean {
   81:   return (
   82:     data?.productCategory === "tubing" ||
   83:     data?.productType === "tubing" ||
   84:     data?.category === "tubing" ||
   85:     data?.detailMode === "material_selection" ||
   86:     (typeof data?.slug === "string" && data.slug.includes("-tubing"))
   87:   );
   88: }
   89: 
   90: function getDisplayModelText(data: any): string {
   91:   if (isTubingDetailData(data)) {
   92:     return "XXX-XXX-XX-XX";
   93:   }
   94: 
   95:   if (isCustomInquiryMode(data)) {
   96:     return "定制配置请联系我们";
   97:   }
   98: 
   99:   return (data as any).displayModel || data.model || "";
  100: }
  101: 
  102: function isCustomInquiryMode(data: any): boolean {
  103:   
  104:   if (
  105:     isValvelessPumpDetailData(data) ||
  106:     data?.isCustomOnly === true ||
  107:     data?.showCustomInquiryCta === true
  108:   ) {
  109:     return true;
  110:   }
  111: const detailMode = String(
  112:     data?.detailMode ||
  113:       data?.hero?.detailMode ||
  114:       data?.productMode ||
  115:       data?.mode ||
  116:       ""
  117:   ).trim();
  118: 
  119:   if (
  120:     detailMode === "custom_inquiry" ||
  121:     detailMode === "custom" ||
  122:     detailMode === "customized"
  123:   ) {
  124:     return true;
  125:   }
  126: 
  127:   if (
  128:     detailMode === "standard_model" ||
  129:     detailMode === "standard" ||
  130:     detailMode === "selection" ||
  131:     detailMode === "configurable"
  132:   ) {
  133:     return false;
  134:   }
  135: 
  136:   if (data?.isCustomInquiry === true) {
  137:     return true;
  138:   }
  139: 
  140:   if (data?.showConfigurator === true || data?.hasConfigurator === true) {
```

### data/products/generated/fittings/barbed-fittings/detail/index.json

```text
    1: [
    2:   {
    3:     "sourceType": "fitting-detail",
    4:     "category": "fittings",
    5:     "categoryId": "fittings",
    6:     "categoryLabel": "接头系列",
    7:     "productTypeId": "barbed-fittings",
    8:     "productTypeName": "直通等径倒刺接头",
    9:     "productId": "809276",
   10:     "productCode": "809276",
   11:     "seriesId": "barbed-fittings",
   12:     "seriesName": "直通等径倒刺接头",
   13:     "slug": "ba-16f-pp-n",
   14:     "model": "BA-16F-PP-N",
   15:     "name": "直通等径倒刺接头",
   16:     "title": "直通等径倒刺接头",
   17:     "displayName": "直通等径倒刺接头",
   18:     "productName": "直通等径倒刺接头",
   19:     "modelDisplay": "BA-16F-PP-N",
   20:     "displayModel": "BA-16F-PP-N",
   21:     "foreachModel": "BA-16F-PP-N",
   22:     "description": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
   23:     "shortDescription": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
   24:     "heroDescription": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
   25:     "commonApplications": [
   26:       "同规格软管直线连接",
   27:       "仪器内部管路延长",
   28:       "泵阀与软管连接",
   29:       "液路直线转接"
   30:     ],
   31:     "mainImage": "/images/logo/foreach-logo-color.svg",
   32:     "image": "/images/logo/foreach-logo-color.svg",
   33:     "imagePath": "/images/logo/foreach-logo-color.svg",
   34:     "imageUrl": "/images/logo/foreach-logo-color.svg",
   35:     "heroImage": "/images/logo/foreach-logo-color.svg",
   36:     "imageCard": "/images/logo/foreach-logo-color.svg",
   37:     "additionalImages": [],
   38:     "images": [],
   39:     "thumbnails": [],
   40:     "imageAlt": "BA-16F-PP-N 直通等径倒刺接头",
   41:     "detailMode": "standard_model",
   42:     "hideModelAction": false,
   43:     "showConfigurator": false,
   44:     "showDatasheetRequest": false,
   45:     "showDrawingRequest": true,
   46:     "show3DRequest": false,
   47:     "specs": [
   48:       {
   49:         "label": "型号",
   50:         "value": "BA-16F-PP-N"
   51:       },
   52:       {
   53:         "label": "商品编码",
   54:         "value": "809276"
   55:       },
   56:       {
   57:         "label": "产品类别",
   58:         "value": "倒刺接头"
   59:       },
   60:       {
   61:         "label": "产品结构",
   62:         "value": "直通型"
   63:       },
   64:       {
   65:         "label": "接口形式",
   66:         "value": "2通等径"
   67:       },
   68:       {
   69:         "label": "接管内径",
   70:         "value": "1.6 mm"
   71:       },
   72:       {
   73:         "label": "材质",
   74:         "value": "PP"
   75:       },
   76:       {
   77:         "label": "颜色",
   78:         "value": "本色"
   79:       }
   80:     ],
   81:     "specifications": [
   82:       {
   83:         "label": "型号",
   84:         "value": "BA-16F-PP-N"
   85:       },
   86:       {
   87:         "label": "商品编码",
   88:         "value": "809276"
   89:       },
   90:       {
   91:         "label": "产品类别",
   92:         "value": "倒刺接头"
   93:       },
   94:       {
   95:         "label": "产品结构",
   96:         "value": "直通型"
   97:       },
   98:       {
   99:         "label": "接口形式",
  100:         "value": "2通等径"
  101:       },
  102:       {
  103:         "label": "接管内径",
  104:         "value": "1.6 mm"
  105:       },
  106:       {
  107:         "label": "材质",
  108:         "value": "PP"
  109:       },
  110:       {
  111:         "label": "颜色",
  112:         "value": "本色"
  113:       }
  114:     ],
  115:     "specGroups": [
  116:       {
  117:         "title": "技术参数",
  118:         "items": [
  119:           {
  120:             "label": "型号",
  121:             "value": "BA-16F-PP-N"
  122:           },
  123:           {
  124:             "label": "商品编码",
  125:             "value": "809276"
  126:           },
  127:           {
  128:             "label": "产品类别",
  129:             "value": "倒刺接头"
  130:           },
  131:           {
  132:             "label": "产品结构",
  133:             "value": "直通型"
  134:           },
  135:           {
  136:             "label": "接口形式",
  137:             "value": "2通等径"
  138:           },
  139:           {
  140:             "label": "接管内径",
```

### data/products/generated/fittings/quick-connect-fittings/detail/index.json

```text
    1: [
    2:   {
    3:     "sourceType": "fitting-detail",
    4:     "category": "fittings",
    5:     "categoryId": "fittings",
    6:     "categoryLabel": "接头系列",
    7:     "productTypeId": "quick-connect-fittings",
    8:     "productTypeName": "Q20公端直通带阀快插接头",
    9:     "productTypeLabel": "快插接头",
   10:     "productId": "839041",
   11:     "productCode": "839041",
   12:     "seriesId": "q20",
   13:     "seriesName": "Q20",
   14:     "slug": "q2001-pmv-sacn",
   15:     "model": "Q2001-PMV-SACN",
   16:     "name": "Q20公端直通带阀快插接头",
   17:     "title": "Q20公端直通带阀快插接头",
   18:     "displayName": "Q20公端直通带阀快插接头",
   19:     "productName": "Q20公端直通带阀快插接头",
   20:     "modelDisplay": "Q2001-PMV-SACN",
   21:     "displayModel": "Q2001-PMV-SACN",
   22:     "foreachModel": "Q2001-PMV-SACN",
   23:     "description": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
   24:     "shortDescription": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
   25:     "heroDescription": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
   26:     "advantages": [
   27:       "适配1.6 mm接管内径",
   28:       "带阀",
   29:       "可穿板安装",
   30:       "POM外壳材质"
   31:     ],
   32:     "commonApplications": [
   33:       "IVD设备内部液路",
   34:       "分析仪器液路模块",
   35:       "设备面板液路接口",
   36:       "需断开关闭流路的连接点"
   37:     ],
   38:     "mainImage": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   39:     "image": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   40:     "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   41:     "imageUrl": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   42:     "heroImage": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   43:     "imageCard": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
   44:     "additionalImages": [],
   45:     "images": [],
   46:     "thumbnails": [],
   47:     "imageAlt": "Q2001-PMV-SACN Q20公端直通带阀快插接头",
   48:     "mainImageAlt": "Q2001-PMV-SACN Q20公端直通带阀快插接头",
   49:     "detailMode": "standard_model",
   50:     "hideModelAction": false,
   51:     "showConfigurator": false,
   52:     "showDatasheetRequest": false,
   53:     "showDrawingRequest": true,
   54:     "show3DRequest": false,
   55:     "drawing2dUrl": "",
   56:     "drawingPdfUrl": "",
   57:     "resources": {},
   58:     "specSeriesKey": "q20",
   59:     "specs": [
   60:       {
   61:         "label": "型号",
   62:         "value": "Q2001-PMV-SACN"
   63:       },
   64:       {
   65:         "label": "商品编码",
   66:         "value": "839041"
   67:       },
   68:       {
   69:         "label": "产品类别",
   70:         "value": "快插接头"
   71:       },
   72:       {
   73:         "label": "产品系列",
   74:         "value": "Q20"
   75:       },
   76:       {
   77:         "label": "接管内径",
   78:         "value": "1.6 mm"
   79:       },
   80:       {
   81:         "label": "公母端",
   82:         "value": "公端"
   83:       },
   84:       {
   85:         "label": "安装方式",
   86:         "value": "穿板"
   87:       },
   88:       {
   89:         "label": "阀门配置",
   90:         "value": "带阀"
   91:       },
   92:       {
   93:         "label": "形状",
   94:         "value": "直通"
   95:       },
   96:       {
   97:         "label": "外壳材质",
   98:         "value": "POM"
   99:       },
  100:       {
  101:         "label": "密封圈材质",
  102:         "value": "NBR"
  103:       }
  104:     ],
  105:     "specifications": [
  106:       {
  107:         "label": "型号",
  108:         "value": "Q2001-PMV-SACN"
  109:       },
  110:       {
  111:         "label": "商品编码",
  112:         "value": "839041"
  113:       },
  114:       {
  115:         "label": "产品类别",
  116:         "value": "快插接头"
  117:       },
  118:       {
  119:         "label": "产品系列",
  120:         "value": "Q20"
  121:       },
  122:       {
  123:         "label": "接管内径",
  124:         "value": "1.6 mm"
  125:       },
  126:       {
  127:         "label": "公母端",
  128:         "value": "公端"
  129:       },
  130:       {
  131:         "label": "安装方式",
  132:         "value": "穿板"
  133:       },
  134:       {
  135:         "label": "阀门配置",
  136:         "value": "带阀"
  137:       },
  138:       {
  139:         "label": "形状",
  140:         "value": "直通"
```

### scripts/products/setup-barbed-fitting-detail-like-hard-tube.cjs

```text
    1: const fs = require("fs");
    2: const path = require("path");
    3: const Module = require("module");
    4: const ts = require("typescript");
    5: 
    6: const root = process.cwd();
    7: 
    8: const selectionPath = path.join(
    9:   root,
   10:   "data",
   11:   "products",
   12:   "selection",
   13:   "barbed-fitting-selection.generated.ts"
   14: );
   15: 
   16: const detailOutputPath = path.join(
   17:   root,
   18:   "data",
   19:   "products",
   20:   "generated",
   21:   "fittings",
   22:   "barbed-fittings",
   23:   "detail",
   24:   "index.json"
   25: );
   26: 
   27: const pagePath = path.join(
   28:   root,
   29:   "app",
   30:   "products",
   31:   "fittings",
   32:   "barbed-fittings",
   33:   "[slug]",
   34:   "page.tsx"
   35: );
   36: 
   37: const clientPath = path.join(
   38:   root,
   39:   "components",
   40:   "products",
   41:   "selection",
   42:   "ProductSelectionClient.tsx"
   43: );
   44: 
   45: const reportPath = path.join(
   46:   root,
   47:   "reports",
   48:   "barbed-fitting-detail-setup-report.json"
   49: );
   50: 
   51: const stamp = new Date()
   52:   .toISOString()
   53:   .replace(/[-:T.Z]/g, "")
   54:   .slice(0, 14);
   55: 
   56: function ensureFile(filePath) {
   57:   if (!fs.existsSync(filePath)) {
   58:     throw new Error(
   59:       `Required file not found: ${filePath}`
   60:     );
   61:   }
   62: }
   63: 
   64: function ensureDirectoryForFile(filePath) {
   65:   fs.mkdirSync(
   66:     path.dirname(filePath),
   67:     { recursive: true }
   68:   );
   69: }
   70: 
   71: function backup(filePath, suffix) {
   72:   if (!fs.existsSync(filePath)) {
   73:     return "";
   74:   }
   75: 
   76:   const backupPath =
   77:     `${filePath}.bak_${suffix}_${stamp}`;
   78: 
   79:   fs.copyFileSync(
   80:     filePath,
   81:     backupPath
   82:   );
   83: 
   84:   return backupPath;
   85: }
   86: 
   87: function getText(value) {
   88:   if (value == null) {
   89:     return "";
   90:   }
   91: 
   92:   if (typeof value === "string") {
   93:     return value.trim();
   94:   }
   95: 
   96:   if (typeof value === "number") {
   97:     return String(value);
   98:   }
   99: 
  100:   if (typeof value === "object") {
  101:     return String(
  102:       value.zh ??
  103:       value["zh-CN"] ??
  104:       value.en ??
  105:       Object.values(value)[0] ??
  106:       ""
  107:     ).trim();
  108:   }
  109: 
  110:   return String(value).trim();
  111: }
  112: 
  113: function slugify(value) {
  114:   return getText(value)
  115:     .toLowerCase()
  116:     .replace(/μ/g, "u")
  117:     .replace(/[^a-z0-9]+/g, "-")
  118:     .replace(/^-+|-+$/g, "");
  119: }
  120: 
  121: function loadTypeScriptModule(filePath) {
  122:   const source = fs.readFileSync(
  123:     filePath,
  124:     "utf8"
  125:   );
  126: 
  127:   const transpiled =
  128:     ts.transpileModule(
  129:       source,
  130:       {
  131:         compilerOptions: {
  132:           module:
  133:             ts.ModuleKind.CommonJS,
  134:           target:
  135:             ts.ScriptTarget.ES2020,
  136:           esModuleInterop: true,
  137:           resolveJsonModule: true,
  138:         },
  139:         fileName: filePath,
  140:       }
```

### scripts/products/setup-quick-connect-model-detail-like-barbed.cjs

```text
    1: const fs = require("fs");
    2: const path = require("path");
    3: 
    4: const root = process.cwd();
    5: 
    6: const sourceDataPath = path.join(
    7:   root,
    8:   "data",
    9:   "products",
   10:   "generated",
   11:   "fittings",
   12:   "quick-connect-fittings",
   13:   "index.json"
   14: );
   15: 
   16: const detailOutputPath = path.join(
   17:   root,
   18:   "data",
   19:   "products",
   20:   "generated",
   21:   "fittings",
   22:   "quick-connect-fittings",
   23:   "detail",
   24:   "index.json"
   25: );
   26: 
   27: const pagePath = path.join(
   28:   root,
   29:   "app",
   30:   "products",
   31:   "fittings",
   32:   "quick-connect-fittings",
   33:   "[slug]",
   34:   "page.tsx"
   35: );
   36: 
   37: const selectionClientPath = path.join(
   38:   root,
   39:   "components",
   40:   "products",
   41:   "selection",
   42:   "ProductSelectionClient.tsx"
   43: );
   44: 
   45: const reportPath = path.join(
   46:   root,
   47:   "reports",
   48:   "quick-connect-model-detail-setup-report.json"
   49: );
   50: 
   51: const stamp = new Date()
   52:   .toISOString()
   53:   .replace(/[-:T.Z]/g, "")
   54:   .slice(0, 14);
   55: 
   56: function ensureFile(filePath) {
   57:   if (!fs.existsSync(filePath)) {
   58:     throw new Error(
   59:       "Required file not found: " +
   60:       path.relative(root, filePath)
   61:     );
   62:   }
   63: }
   64: 
   65: function ensureDirectoryForFile(filePath) {
   66:   fs.mkdirSync(
   67:     path.dirname(filePath),
   68:     {
   69:       recursive: true,
   70:     }
   71:   );
   72: }
   73: 
   74: function backup(filePath, suffix) {
   75:   if (!fs.existsSync(filePath)) {
   76:     return "";
   77:   }
   78: 
   79:   const backupPath =
   80:     filePath +
   81:     ".bak_" +
   82:     suffix +
   83:     "_" +
   84:     stamp;
   85: 
   86:   fs.copyFileSync(
   87:     filePath,
   88:     backupPath
   89:   );
   90: 
   91:   return backupPath;
   92: }
   93: 
   94: function cleanText(value) {
   95:   return String(
   96:     value ?? ""
   97:   ).trim();
   98: }
   99: 
  100: function slugify(value) {
  101:   return cleanText(value)
  102:     .toLowerCase()
  103:     .replace(/μ/g, "u")
  104:     .replace(/[^a-z0-9]+/g, "-")
  105:     .replace(/^-+|-+$/g, "");
  106: }
  107: 
  108: function getLocalizedText(value) {
  109:   if (value == null) {
  110:     return "";
  111:   }
  112: 
  113:   if (
  114:     typeof value === "string" ||
  115:     typeof value === "number"
  116:   ) {
  117:     return cleanText(value);
  118:   }
  119: 
  120:   if (
  121:     typeof value === "object"
  122:   ) {
  123:     return cleanText(
  124:       value.zh ??
  125:       value["zh-CN"] ??
  126:       value.en ??
  127:       Object.values(value)[0] ??
  128:       ""
  129:     );
  130:   }
  131: 
  132:   return cleanText(value);
  133: }
  134: 
  135: function getConnectionInfo(value) {
  136:   const original =
  137:     cleanText(value);
  138: 
  139:   const metricInBrackets =
  140:     original.match(
```

## 11. 下一步

检查报告确认后，下一步只做：

1. 生成详情 JSON；
2. 导入 JPG 主图；
3. 导入 PDF 二维图；
4. 暂不修改公共详情组件；
5. 暂不做型号选择交互。

