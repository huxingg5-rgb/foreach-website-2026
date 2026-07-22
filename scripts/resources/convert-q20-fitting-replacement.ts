/* =========================================================
   convert-q20-fitting-replacement.ts
   恒永达官网｜快插接头 Q20 型号替代资料 Excel 转换脚本

   文件路径：
   scripts/resources/convert-q20-fitting-replacement.ts

   作用：
   1. 读取市场部维护的 Excel 原始资料
   2. 读取 Sheet：型号解析规则
   3. 读取 Sheet：产品数据模板
   4. 只筛选 Q20 数据
   5. 自动生成：
      data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts

   当前数据层级：
   fitting-replacement
   └─ fittings
      └─ quick-connect
         └─ q20

   说明：
   1. Excel 是人维护的数据源
   2. q20.zh.ts 是 Next.js 页面读取的 Q20 产品数据文件
   3. 后期做后台时，这个脚本逻辑可以迁移到后台导入功能中
========================================================= */

import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

/* =========================================================
   项目路径配置

   process.cwd() 表示当前执行命令所在的项目根目录。

   执行命令：
   npx tsx scripts/resources/convert-q20-fitting-replacement.ts
========================================================= */
const PROJECT_ROOT = process.cwd();

/* Excel 原始资料路径 */
const SOURCE_EXCEL_PATH = path.join(
  PROJECT_ROOT,
  "data-source",
  "resources",
  "fitting-replacement",
  "Q20系列_测试数据.xlsx"
);

/* 自动生成的 TypeScript 数据文件路径 */
const OUTPUT_TS_PATH = path.join(
  PROJECT_ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "fittings",
  "quick-connect",
  "q20",
  "q20.zh.ts"
);

/* Excel Sheet 名称，必须和 Excel 里保持一致 */
const RULE_SHEET_NAME = "型号解析规则";
const PRODUCT_SHEET_NAME = "产品数据模板";

/* 当前第一版只生成 Q20 */
const TARGET_SERIES = "Q20";

/* =========================================================
   Excel 行数据类型
========================================================= */
type ExcelRow = Record<string, unknown>;

/* =========================================================
   安全读取单元格内容

   说明：
   1. Excel 里可能有空单元格
   2. 商品编码可能被 Excel 识别成数字
   3. 这里统一转成字符串，方便后面写入 TS 文件
========================================================= */
function getCell(row: ExcelRow, key: string): string {
  const value = row[key];

  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   判断“是否”为真

   支持：
   是 / YES / Yes / yes / true / 1
========================================================= */
function isYes(value: string): boolean {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue === "是" ||
    normalizedValue === "yes" ||
    normalizedValue === "true" ||
    normalizedValue === "1"
  );
}

/* =========================================================
   读取指定 Sheet

   defval: "" 的作用：
   空单元格也保留为空字符串，避免字段缺失
========================================================= */
function readSheetRows(workbook: XLSX.WorkBook, sheetName: string): ExcelRow[] {
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`找不到 Sheet：${sheetName}`);
  }

  return XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
    defval: "",
  });
}

/* =========================================================
   根据字段顺序和字段名称生成 fieldKey

   说明：
   1. fieldKey 是代码内部使用的英文键名
   2. 不能只根据代码判断含义，因为 S 在不同位置含义不同
   3. 所以要根据“字段顺序 / 字段名称”判断
========================================================= */
function getFieldKey(fieldOrder: number, fieldNameZh: string) {
  if (fieldOrder === 1 || fieldNameZh.includes("系列")) {
    return "series";
  }

  if (fieldOrder === 2 || fieldNameZh.includes("管尺寸")) {
    return "tubeOrThread";
  }

  if (fieldOrder === 3 || fieldNameZh.includes("公母端")) {
    return "gender";
  }

  if (fieldOrder === 4 || fieldNameZh.includes("穿板")) {
    return "panelMount";
  }

  if (fieldOrder === 5 || fieldNameZh.includes("带阀")) {
    return "valved";
  }

  if (fieldOrder === 6 || fieldNameZh.includes("形状")) {
    return "shape";
  }

  if (fieldOrder === 7 || fieldNameZh.includes("外壳材质")) {
    return "housingMaterial";
  }

  if (fieldOrder === 8 || fieldNameZh.includes("密封圈材质")) {
    return "sealingRingMaterial";
  }

  throw new Error(`无法识别字段：字段顺序=${fieldOrder}，字段名称=${fieldNameZh}`);
}

/* =========================================================
   生成多语言文本对象

   说明：
   1. zh 必须有
   2. 其他语言如果 Excel 里为空，就不写入
========================================================= */
function buildI18nText(values: {
  zh: string;
  en?: string;
  es?: string;
  fr?: string;
  ko?: string;
  ru?: string;
}) {
  const result: Record<string, string> = {
    zh: values.zh,
  };

  if (values.en) result.en = values.en;
  if (values.es) result.es = values.es;
  if (values.fr) result.fr = values.fr;
  if (values.ko) result.ko = values.ko;
  if (values.ru) result.ru = values.ru;

  return result;
}

/* =========================================================
   读取型号解析规则

   Excel 对应 Sheet：
   型号解析规则

   本脚本只读取 Q20：
   系列 === Q20
========================================================= */
function buildModelRules(ruleRows: ExcelRow[]) {
  return ruleRows
    .filter((row) => getCell(row, "系列") === TARGET_SERIES)
    .filter((row) => isYes(getCell(row, "是否前台显示")))
    .map((row) => {
      const fieldOrder = Number(getCell(row, "字段顺序"));
      const fieldNameZh = getCell(row, "字段名称_中文");
      const code = getCell(row, "代码");

      if (!fieldOrder || !fieldNameZh || !code) {
        throw new Error(
          `型号解析规则存在空字段，请检查：字段顺序=${fieldOrder}，字段名称=${fieldNameZh}，代码=${code}`
        );
      }

      return {
        series: getCell(row, "系列"),
        fieldOrder,
        fieldKey: getFieldKey(fieldOrder, fieldNameZh),
        fieldName: buildI18nText({
          zh: fieldNameZh,
          en: getCell(row, "字段名称_English"),
          es: getCell(row, "字段名称_Español"),
          fr: getCell(row, "字段名称_Français"),
          ko: getCell(row, "字段名称_한국어"),
          ru: getCell(row, "字段名称_Русский"),
        }),
        positionDescription: getCell(row, "取值位置_中文"),
        code,
        meaning: buildI18nText({
          zh: getCell(row, "含义_中文"),
          en: getCell(row, "Meaning_English"),
          es: getCell(row, "Significado_Español"),
          fr: getCell(row, "Signification_Français"),
          ko: getCell(row, "의미_한국어"),
          ru: getCell(row, "Значение_Русский"),
        }),
      };
    });
}

/* =========================================================
   读取产品数据

   Excel 对应 Sheet：
   产品数据模板

   当前表格字段：
   商品编码
   型号
   竞品A编码
   竞品B编码
   竞品C编码
   包装
   是否首页展示
   备注
========================================================= */
function buildProducts(productRows: ExcelRow[]) {
  return productRows
    .filter((row) => getCell(row, "型号").startsWith(TARGET_SERIES))
    .map((row) => {
      const productCode = getCell(row, "商品编码");
      const foreachModel = getCell(row, "型号");

      if (!productCode || !foreachModel) {
        throw new Error(
          `产品数据存在空字段，请检查：商品编码=${productCode}，型号=${foreachModel}`
        );
      }

      const competitorModels = [
        getCell(row, "竞品A编码"),
        getCell(row, "竞品B编码"),
        getCell(row, "竞品C编码"),
      ].filter(Boolean);

      return {
        productCode,
        foreachModel,
        competitorModels,
        packageText: getCell(row, "包装"),
        showOnHome: isYes(getCell(row, "是否首页展示")),
        note: getCell(row, "备注"),
        imagePath: `/images/resources/selection-support/fitting-replacement/q20/products/${foreachModel}.webp`,
        drawingPdfPath: `/downloads/resources/selection-support/fitting-replacement/q20/drawings/${foreachModel}.pdf`,
      };
    });
}

/* =========================================================
   生成 TypeScript 文件内容
========================================================= */
function buildOutputFileContent(params: {
  products: ReturnType<typeof buildProducts>;
  modelRules: ReturnType<typeof buildModelRules>;
}) {
  const { products, modelRules } = params;

  return `/* =========================================================
   q20.zh.ts
   恒永达官网｜接头替代查询｜快插接头 Q20 中文数据

   文件路径：
   data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh.ts

   作用：
   1. 存放快插接头 Q20 的产品数据
   2. 存放 Q20 型号解析规则
   3. 供接头替代查询首页、详情页、选型指引读取

   注意：
   1. 此文件由 scripts/resources/convert-q20-fitting-replacement.ts 自动生成
   2. 不建议手动修改本文件
   3. 如需修改产品数据，请修改 Excel：
      data-source/resources/fitting-replacement/Q20系列_测试数据.xlsx
   4. 修改 Excel 后重新运行：
      npx tsx scripts/resources/convert-q20-fitting-replacement.ts
========================================================= */

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

export const fittingReplacementQuickConnectQ20ZhData: FittingReplacementPageData = {
  banner: {
    eyebrow: "选型支持",
    title: "接头替代查询",
    description:
      "输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品。",
  },

  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "接头替代查询",
      href: "/resources/selection-support/fitting-replacement",
    },
  ],

  search: {
    placeholder: "输入竞品编码、商品编码或恒永达型号",
    buttonText: "搜索",
  },

  products: ${JSON.stringify(products, null, 2)},

  modelRules: ${JSON.stringify(modelRules, null, 2)},
};
`;
}

/* =========================================================
   主流程
========================================================= */
function main() {
  if (!fs.existsSync(SOURCE_EXCEL_PATH)) {
    throw new Error(`找不到 Excel 文件：${SOURCE_EXCEL_PATH}`);
  }

  const workbook = XLSX.readFile(SOURCE_EXCEL_PATH);

  const ruleRows = readSheetRows(workbook, RULE_SHEET_NAME);
  const productRows = readSheetRows(workbook, PRODUCT_SHEET_NAME);

  const modelRules = buildModelRules(ruleRows);
  const products = buildProducts(productRows);

  const outputContent = buildOutputFileContent({
    products,
    modelRules,
  });

  fs.mkdirSync(path.dirname(OUTPUT_TS_PATH), {
    recursive: true,
  });

  fs.writeFileSync(OUTPUT_TS_PATH, outputContent, "utf-8");

  console.log("转换完成");
  console.log(`Excel 文件：${SOURCE_EXCEL_PATH}`);
  console.log(`生成文件：${OUTPUT_TS_PATH}`);
  console.log(`Q20 型号解析规则数量：${modelRules.length}`);
  console.log(`Q20 产品数量：${products.length}`);
}

main(); 