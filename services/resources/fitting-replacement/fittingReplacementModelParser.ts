/* =========================================================
   fittingReplacementModelParser.ts
   恒永达官网｜接头替代查询型号解析工具

   文件路径：
   services/resources/fitting-replacement/fittingReplacementModelParser.ts

   作用：
   1. 统一解析接头型号代码
   2. 避免 Home 页面和 Detail 页面重复写 split / parse 逻辑
   3. 为后续 Q40 / Q60 / 其他系列接头做模板基础
   4. 为后续“接头选型指引”提供统一解析能力

   当前支持：
   1. Q20 系列
   2. 后续 Q40 / Q60 如果编码结构一致，可以继续复用
   3. 如果后续编码结构不同，只需要优先改这个文件

   注意：
   1. 这里只做“型号代码拆解与规则匹配”
   2. 不处理页面样式
   3. 不处理搜索
   4. 不处理加入清单
========================================================= */

import type {
  FittingModelRule,
  ParsedFittingModelField,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

/* =========================================================
   型号字段顺序

   示例：
   Q2001-PMV-SPPE

   拆分为：
   Q20 | 01 | P | M | V | S | PP | E

   对应字段：
   series                系列
   tubeOrThread          管尺寸或螺纹
   gender                公母端
   panelMount            是否穿板
   valved                是否带阀
   shape                 形状
   housingMaterial       外壳材质
   sealingRingMaterial   密封圈材质
========================================================= */
export const FITTING_MODEL_FIELD_ORDER: FittingModelRule["fieldKey"][] = [
  "series",
  "tubeOrThread",
  "gender",
  "panelMount",
  "valved",
  "shape",
  "housingMaterial",
  "sealingRingMaterial",
];

/* =========================================================
   拆分接头型号代码

   示例：
   Q2001-PMV-SPPE

   firstPart  = Q2001
   secondPart = PMV
   thirdPart  = SPPE

   说明：
   1. 当前 Q20 编码按这个结构拆
   2. Q40 / Q60 如果结构一致，可以直接复用
   3. 如果后续某个系列编码结构不一样，再在这里扩展
========================================================= */
export function splitFittingModelCode(
  model: string
): Record<FittingModelRule["fieldKey"], string> {
  const [firstPart = "", secondPart = "", thirdPart = ""] = model.split("-");

  return {
    series: firstPart.slice(0, 3),
    tubeOrThread: firstPart.slice(3),
    gender: secondPart.slice(0, 1),
    panelMount: secondPart.slice(1, 2),
    valved: secondPart.slice(2, 3),
    shape: thirdPart.slice(0, 1),
    housingMaterial: thirdPart.slice(1, -1),
    sealingRingMaterial: thirdPart.slice(-1),
  };
}

/* =========================================================
   根据型号和规则生成解析结果

   重要说明：
   1. 不能只按代码判断含义
   2. 必须同时匹配 fieldKey + code
   3. 例如 S 在不同位置可能分别代表“母端”和“直通”
   4. 所以必须结合字段位置判断
========================================================= */
export function parseFittingModelWithRules(
  model: string,
  rules: FittingModelRule[]
): ParsedFittingModelField[] {
  const codeMap = splitFittingModelCode(model);

  return FITTING_MODEL_FIELD_ORDER.map((fieldKey) => {
    const code = codeMap[fieldKey];

    const matchedRule = rules.find((rule) => {
      return rule.fieldKey === fieldKey && rule.code === code;
    });

    if (!matchedRule) {
      return null;
    }

    return {
      fieldOrder: matchedRule.fieldOrder,
      fieldKey: matchedRule.fieldKey,
      fieldName: matchedRule.fieldName,
      code,
      meaning: matchedRule.meaning,
    };
  }).filter((field): field is ParsedFittingModelField => {
    return Boolean(field);
  });
}

/* =========================================================
   从解析结果中获取指定字段

   说明：
   详情页参数表需要经常按 fieldKey 找字段。
========================================================= */
export function getParsedFittingField(
  parsedFields: ParsedFittingModelField[],
  fieldKey: FittingModelRule["fieldKey"]
) {
  return parsedFields.find((field) => {
    return field.fieldKey === fieldKey;
  });
}

/* =========================================================
   根据解析结果获取产品展示名称

   说明：
   1. 当前 Q20 统一显示为 Q20 快插接头
   2. 后续 Q40 / Q60 可以通过 rules 里的 series meaning 自动返回名称
   3. 如果没有解析到 series，就使用 fallback
========================================================= */
export function getFittingProductDisplayName(
  parsedFields: ParsedFittingModelField[],
  fallback = "Q20 快插接头"
) {
  const seriesField = parsedFields.find((field) => {
    return field.fieldKey === "series";
  });

  return seriesField?.meaning.zh || fallback;
} 