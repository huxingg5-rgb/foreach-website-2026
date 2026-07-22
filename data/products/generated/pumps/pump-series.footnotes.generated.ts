/* =========================================================
   pump-series.footnotes.generated.ts
   恒永达官网｜泵系列自动生成数据

   注意：
   1. 本文件由 scripts/products/build-pump-series-data.js 自动生成
   2. 不要手动修改本文件
   3. 如需修改内容，请修改 xlsx 数据源后重新运行：
      npm run build:pump-series-data
========================================================= */

export const pumpSeriesFootnotes = [
  {
    "footnoteId": "FN-CUSTOM-PUMP",
    "scope": "global",
    "module": "product_detail",
    "noteType": "custom_notice",
    "noteZh": "柱塞泵为定制化产品，最终方案需根据实际应用、液体介质和系统集成要求确认。",
    "noteEn": "Plunger pumps are custom-engineered products. The final solution should be confirmed according to the application, liquid media, and system integration requirements.",
    "renderPosition": "detail_notice",
    "displayStyle": "small_note",
    "sort": "100",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-FINAL-CONFIG",
    "scope": "global",
    "module": "product_detail",
    "noteType": "engineering_confirmation",
    "noteZh": "页面信息用于产品选型与方案评估参考，最终配置以 FOREACH 工程团队确认为准。",
    "noteEn": "Page information is provided for product selection and solution evaluation. Final configuration is subject to confirmation by the FOREACH engineering team.",
    "renderPosition": "page_bottom",
    "displayStyle": "small_note",
    "sort": "200",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-PARAMETER-CONDITION",
    "scope": "global",
    "module": "parameter_table",
    "noteType": "parameter_condition",
    "noteZh": "参数数据基于标准测试条件，实际表现可能受液体性质、工作环境和控制方式影响。",
    "noteEn": "Specifications are based on standard test conditions. Actual performance may vary depending on liquid properties, operating environment, and control method.",
    "renderPosition": "parameter_bottom",
    "displayStyle": "small_note",
    "sort": "300",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-MATERIAL-COMPATIBILITY",
    "scope": "global",
    "module": "parameter_table",
    "noteType": "material_notice",
    "noteZh": "接液材料需结合实际介质进行兼容性评估。",
    "noteEn": "Wetted materials should be evaluated for compatibility with the actual liquid media.",
    "renderPosition": "parameter_bottom",
    "displayStyle": "small_note",
    "sort": "400",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-IMAGE-FOR-REFERENCE",
    "scope": "global",
    "module": "image",
    "noteType": "image_notice",
    "noteZh": "产品图片仅用于结构与外观参考，具体外观以实际配置为准。",
    "noteEn": "Product images are for structural and appearance reference only. Actual appearance depends on the final configuration.",
    "renderPosition": "image_bottom",
    "displayStyle": "small_note",
    "sort": "500",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-DRAWING-PREVIEW",
    "scope": "global",
    "module": "resources",
    "noteType": "drawing_notice",
    "noteZh": "公开图纸和 3D 文件仅用于网页预览和初步评估。",
    "noteEn": "Public drawings and 3D files are provided for web preview and preliminary evaluation only.",
    "renderPosition": "resource_bottom",
    "displayStyle": "small_note",
    "sort": "600",
    "enabled": "yes"
  },
  {
    "footnoteId": "FN-ENGINEERING-FILES-NOT-PUBLIC",
    "scope": "global",
    "module": "resources",
    "noteType": "file_access",
    "noteZh": "STEP、STP、X_T、DWG、DXF 等工程文件不建议公开放置，如需获取请提交需求。",
    "noteEn": "Engineering files such as STEP, STP, X_T, DWG, and DXF should not be publicly exposed. Please submit a request if needed.",
    "renderPosition": "resource_bottom",
    "displayStyle": "small_note",
    "sort": "700",
    "enabled": "yes"
  }
] as const;
