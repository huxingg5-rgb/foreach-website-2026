/* =========================================================
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

  products: [
  {
    "productCode": "839041",
    "foreachModel": "Q2001-PMV-SACN",
    "competitorModels": [
      "A0012",
      "B0001",
      "C0001"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf"
  },
  {
    "productCode": "839130",
    "foreachModel": "Q2001-PMV-SACN",
    "competitorModels": [
      "A0013",
      "B0002",
      "C0002"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf"
  },
  {
    "productCode": "839019",
    "foreachModel": "Q2001-PMX-SACN",
    "competitorModels": [
      "A0014",
      "B0003",
      "C0003"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMX-SACN.pdf"
  },
  {
    "productCode": "839034",
    "foreachModel": "Q2001-PNV-SACN",
    "competitorModels": [
      "A0015",
      "B0004",
      "C0004"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNV-SACN.pdf"
  },
  {
    "productCode": "839120",
    "foreachModel": "Q2001-PNX-SACE",
    "competitorModels": [
      "A0016",
      "B0005",
      "C0005"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNX-SACE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SACE.pdf"
  },
  {
    "productCode": "839012",
    "foreachModel": "Q2001-PNX-SACN",
    "competitorModels": [
      "A0017",
      "B0006",
      "C0006"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SACN.pdf"
  },
  {
    "productCode": "839085",
    "foreachModel": "Q2001-PMV-SPPE",
    "competitorModels": [
      "A0018",
      "B0007",
      "C0007"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SPPE.pdf"
  },
  {
    "productCode": "839063",
    "foreachModel": "Q2001-PMX-SPPE",
    "competitorModels": [
      "A0019",
      "B0008",
      "C0008"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMX-SPPE.pdf"
  },
  {
    "productCode": "839078",
    "foreachModel": "Q2001-PNV-SPPE",
    "competitorModels": [
      "A0020",
      "B0009",
      "C0009"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNV-SPPE.pdf"
  },
  {
    "productCode": "839056",
    "foreachModel": "Q2001-PNX-SPPE",
    "competitorModels": [
      "A0021",
      "B0010",
      "C0010"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PNX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PNX-SPPE.pdf"
  },
  {
    "productCode": "839030",
    "foreachModel": "Q2001-SMV-SACN",
    "competitorModels": [
      "A0022",
      "B0011",
      "C0011"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMV-SACN.pdf"
  },
  {
    "productCode": "839115",
    "foreachModel": "Q2001-SMV-SACN",
    "competitorModels": [
      "A0023",
      "B0012",
      "C0012"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMV-SACN.pdf"
  },
  {
    "productCode": "839008",
    "foreachModel": "Q2001-SMX-SACN",
    "competitorModels": [
      "A0024",
      "B0013",
      "C0013"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMX-SACN.pdf"
  },
  {
    "productCode": "839133",
    "foreachModel": "Q2001-SMX-SACN",
    "competitorModels": [
      "A0025",
      "B0014",
      "C0014"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMX-SACN.pdf"
  },
  {
    "productCode": "839023",
    "foreachModel": "Q2001-SNV-SACN",
    "competitorModels": [
      "A0026",
      "B0015",
      "C0015"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNV-SACN.pdf"
  },
  {
    "productCode": "839001",
    "foreachModel": "Q2001-SNX-SACN",
    "competitorModels": [
      "A0027",
      "B0016",
      "C0016"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNX-SACN.pdf"
  },
  {
    "productCode": "839074",
    "foreachModel": "Q2001-SMV-SPPE",
    "competitorModels": [
      "A0028",
      "B0017",
      "C0017"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMV-SPPE.pdf"
  },
  {
    "productCode": "839052",
    "foreachModel": "Q2001-SMX-SPPE",
    "competitorModels": [
      "A0029",
      "B0018",
      "C0018"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SMX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SMX-SPPE.pdf"
  },
  {
    "productCode": "839067",
    "foreachModel": "Q2001-SNV-SPPE",
    "competitorModels": [
      "A0030",
      "B0019",
      "C0019"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNV-SPPE.pdf"
  },
  {
    "productCode": "839045",
    "foreachModel": "Q2001-SNX-SPPE",
    "competitorModels": [
      "A0031",
      "B0020",
      "C0020"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-SNX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-SNX-SPPE.pdf"
  },
  {
    "productCode": "839042",
    "foreachModel": "Q2002-PMV-SACN",
    "competitorModels": [
      "A0032",
      "B0021",
      "C0021"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMV-SACN.pdf"
  },
  {
    "productCode": "839119",
    "foreachModel": "Q2002-PMX-SACE",
    "competitorModels": [
      "A0033",
      "B0022",
      "C0022"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SACE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SACE.pdf"
  },
  {
    "productCode": "839020",
    "foreachModel": "Q2002-PMX-SACN",
    "competitorModels": [
      "A0034",
      "B0023",
      "C0023"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SACN.pdf"
  },
  {
    "productCode": "839035",
    "foreachModel": "Q2002-PNV-SACN",
    "competitorModels": [
      "A0035",
      "B0024",
      "C0024"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-SACN.pdf"
  },
  {
    "productCode": "839099",
    "foreachModel": "Q2002-PNX-SACE",
    "competitorModels": [
      "A0036",
      "B0025",
      "C0025"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-SACE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SACE.pdf"
  },
  {
    "productCode": "839013",
    "foreachModel": "Q2002-PNX-SACN",
    "competitorModels": [
      "A0037",
      "B0026",
      "C0026"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-SACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SACN.pdf"
  },
  {
    "productCode": "839086",
    "foreachModel": "Q2002-PMV-SPPE",
    "competitorModels": [
      "A0038",
      "B0027",
      "C0027"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMV-SPPE.pdf"
  },
  {
    "productCode": "839064",
    "foreachModel": "Q2002-PMX-SPPE",
    "competitorModels": [
      "A0039",
      "B0028",
      "C0028"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SPPE.pdf"
  },
  {
    "productCode": "839138",
    "foreachModel": "Q2002-PMX-SPPE",
    "competitorModels": [
      "A0040",
      "B0029",
      "C0029"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PMX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PMX-SPPE.pdf"
  },
  {
    "productCode": "839079",
    "foreachModel": "Q2002-PNV-SPPE",
    "competitorModels": [
      "A0041",
      "B0030",
      "C0030"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-SPPE.pdf"
  },
  {
    "productCode": "839057",
    "foreachModel": "Q2002-PNX-SPPE",
    "competitorModels": [
      "A0042",
      "B0031",
      "C0031"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-SPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-SPPE.pdf"
  },
  {
    "productCode": "839038",
    "foreachModel": "Q2002-PNV-LACN",
    "competitorModels": [
      "A0043",
      "B0032",
      "C0032"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-LACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-LACN.pdf"
  },
  {
    "productCode": "839016",
    "foreachModel": "Q2002-PNX-LACN",
    "competitorModels": [
      "A0044",
      "B0033",
      "C0033"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-LACN.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-LACN.pdf"
  },
  {
    "productCode": "839082",
    "foreachModel": "Q2002-PNV-LPPE",
    "competitorModels": [
      "A0045",
      "B0034",
      "C0034"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNV-LPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNV-LPPE.pdf"
  },
  {
    "productCode": "839060",
    "foreachModel": "Q2002-PNX-LPPE",
    "competitorModels": [
      "A0046",
      "B0035",
      "C0035"
    ],
    "packageText": "25pcs/pkg",
    "showOnHome": true,
    "note": "",
    "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2002-PNX-LPPE.webp",
    "drawingPdfPath": "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2002-PNX-LPPE.pdf"
  }
],

  modelRules: [
  {
    "series": "Q20",
    "fieldOrder": 1,
    "fieldKey": "series",
    "fieldName": {
      "zh": "系列",
      "en": "Series",
      "es": "Serie",
      "fr": "Série",
      "ko": "시리즈",
      "ru": "Серия"
    },
    "positionDescription": "第1段前3位",
    "code": "Q20",
    "meaning": {
      "zh": "Q20 快插接头",
      "en": "Q20 Quick Disconnect Coupling",
      "es": "Acoplamiento rápido Q20",
      "fr": "Raccord rapide Q20",
      "ko": "Q20 퀵 디스커넥트 커플링",
      "ru": "Q20 быстроразъемное соединение"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 2,
    "fieldKey": "tubeOrThread",
    "fieldName": {
      "zh": "管尺寸或螺纹",
      "en": "Tube Size or Thread",
      "es": "Tamaño de tubo o rosca",
      "fr": "Taille du tube ou filetage",
      "ko": "튜브 크기 또는 나사",
      "ru": "Размер трубки или резьба"
    },
    "positionDescription": "第1段去掉系列后的剩余字符",
    "code": "01",
    "meaning": {
      "zh": "1/16\"（1.6mm）",
      "en": "1/16\" (1.6mm)",
      "es": "1/16\" (1.6mm)",
      "fr": "1/16\" (1.6mm)",
      "ko": "1/16\" (1.6mm)",
      "ru": "1/16\" (1.6mm)"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 2,
    "fieldKey": "tubeOrThread",
    "fieldName": {
      "zh": "管尺寸或螺纹",
      "en": "Tube Size or Thread",
      "es": "Tamaño de tubo o rosca",
      "fr": "Taille du tube ou filetage",
      "ko": "튜브 크기 또는 나사",
      "ru": "Размер трубки или резьба"
    },
    "positionDescription": "第1段去掉系列后的剩余字符",
    "code": "02",
    "meaning": {
      "zh": "1/8\"（3.2mm）",
      "en": "1/8\" (3.2mm)",
      "es": "1/8\" (3.2mm)",
      "fr": "1/8\" (3.2mm)",
      "ko": "1/8\" (3.2mm)",
      "ru": "1/8\" (3.2mm)"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 2,
    "fieldKey": "tubeOrThread",
    "fieldName": {
      "zh": "管尺寸或螺纹",
      "en": "Tube Size or Thread",
      "es": "Tamaño de tubo o rosca",
      "fr": "Taille du tube ou filetage",
      "ko": "튜브 크기 또는 나사",
      "ru": "Размер трубки или резьба"
    },
    "positionDescription": "第1段去掉系列后的剩余字符",
    "code": "03",
    "meaning": {
      "zh": "3/16\"（4.8mm）",
      "en": "3/16\" (4.8mm)",
      "es": "3/16\" (4.8mm)",
      "fr": "3/16\" (4.8mm)",
      "ko": "3/16\" (4.8mm)",
      "ru": "3/16\" (4.8mm)"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 2,
    "fieldKey": "tubeOrThread",
    "fieldName": {
      "zh": "管尺寸或螺纹",
      "en": "Tube Size or Thread",
      "es": "Tamaño de tubo o rosca",
      "fr": "Taille du tube ou filetage",
      "ko": "튜브 크기 또는 나사",
      "ru": "Размер трубки или резьба"
    },
    "positionDescription": "第1段去掉系列后的剩余字符",
    "code": "04",
    "meaning": {
      "zh": "1/4\"（6.4mm）",
      "en": "1/4\" (6.4mm)",
      "es": "1/4\" (6.4mm)",
      "fr": "1/4\" (6.4mm)",
      "ko": "1/4\" (6.4mm)",
      "ru": "1/4\" (6.4mm)"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 2,
    "fieldKey": "tubeOrThread",
    "fieldName": {
      "zh": "管尺寸或螺纹",
      "en": "Tube Size or Thread",
      "es": "Tamaño de tubo o rosca",
      "fr": "Taille du tube ou filetage",
      "ko": "튜브 크기 또는 나사",
      "ru": "Размер трубки или резьба"
    },
    "positionDescription": "第1段去掉系列后的剩余字符",
    "code": "18N",
    "meaning": {
      "zh": "1/8\"-27NPT",
      "en": "1/8\"-27NPT",
      "es": "1/8\"-27NPT",
      "fr": "1/8\"-27NPT",
      "ko": "1/8\"-27NPT",
      "ru": "1/8\"-27NPT"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 3,
    "fieldKey": "gender",
    "fieldName": {
      "zh": "公母端",
      "en": "Male/Female",
      "es": "Macho/Hembra",
      "fr": "Mâle/Femelle",
      "ko": "수/암",
      "ru": "Штекер/гнездо"
    },
    "positionDescription": "第2段第1位",
    "code": "P",
    "meaning": {
      "zh": "公端",
      "en": "Male",
      "es": "Macho",
      "fr": "Mâle",
      "ko": "수형",
      "ru": "Штекер"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 3,
    "fieldKey": "gender",
    "fieldName": {
      "zh": "公母端",
      "en": "Male/Female",
      "es": "Macho/Hembra",
      "fr": "Mâle/Femelle",
      "ko": "수/암",
      "ru": "Штекер/гнездо"
    },
    "positionDescription": "第2段第1位",
    "code": "S",
    "meaning": {
      "zh": "母端",
      "en": "Female",
      "es": "Hembra",
      "fr": "Femelle",
      "ko": "암형",
      "ru": "Гнездо"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 4,
    "fieldKey": "panelMount",
    "fieldName": {
      "zh": "是否穿板",
      "en": "Panel Mount",
      "es": "Montaje en panel",
      "fr": "Montage panneau",
      "ko": "패널 장착",
      "ru": "Панельный монтаж"
    },
    "positionDescription": "第2段第2位",
    "code": "M",
    "meaning": {
      "zh": "穿板",
      "en": "Panel Mount",
      "es": "Montaje en panel",
      "fr": "Montage panneau",
      "ko": "패널 장착",
      "ru": "Панельный монтаж"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 4,
    "fieldKey": "panelMount",
    "fieldName": {
      "zh": "是否穿板",
      "en": "Panel Mount",
      "es": "Montaje en panel",
      "fr": "Montage panneau",
      "ko": "패널 장착",
      "ru": "Панельный монтаж"
    },
    "positionDescription": "第2段第2位",
    "code": "N",
    "meaning": {
      "zh": "非穿板",
      "en": "Non Panel Mount",
      "es": "Sin montaje en panel",
      "fr": "Sans montage panneau",
      "ko": "비패널 장착",
      "ru": "Без панельного монтажа"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 5,
    "fieldKey": "valved",
    "fieldName": {
      "zh": "是否带阀",
      "en": "Valved",
      "es": "Valved",
      "fr": "Avec valve",
      "ko": "밸브 유무",
      "ru": "Наличие клапана"
    },
    "positionDescription": "第2段第3位",
    "code": "V",
    "meaning": {
      "zh": "带阀",
      "en": "Valved",
      "es": "Con válvula",
      "fr": "Avec valve",
      "ko": "밸브 있음",
      "ru": "С клапаном"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 5,
    "fieldKey": "valved",
    "fieldName": {
      "zh": "是否带阀",
      "en": "Valved",
      "es": "Valved",
      "fr": "Avec valve",
      "ko": "밸브 유무",
      "ru": "Наличие клапана"
    },
    "positionDescription": "第2段第3位",
    "code": "X",
    "meaning": {
      "zh": "不带阀",
      "en": "Non-Valved",
      "es": "Sin válvula",
      "fr": "Sans valve",
      "ko": "밸브 없음",
      "ru": "Без клапана"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 6,
    "fieldKey": "shape",
    "fieldName": {
      "zh": "形状",
      "en": "Shape",
      "es": "Forma",
      "fr": "Forme",
      "ko": "형상",
      "ru": "Форма"
    },
    "positionDescription": "第3段第1位",
    "code": "S",
    "meaning": {
      "zh": "直通",
      "en": "In-line",
      "es": "En línea",
      "fr": "En ligne",
      "ko": "인라인",
      "ru": "Прямой"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 6,
    "fieldKey": "shape",
    "fieldName": {
      "zh": "形状",
      "en": "Shape",
      "es": "Forma",
      "fr": "Forme",
      "ko": "형상",
      "ru": "Форма"
    },
    "positionDescription": "第3段第1位",
    "code": "L",
    "meaning": {
      "zh": "L 型",
      "en": "Elbow",
      "es": "Codo",
      "fr": "Coudé",
      "ko": "엘보",
      "ru": "Угловой"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 7,
    "fieldKey": "housingMaterial",
    "fieldName": {
      "zh": "外壳材质",
      "en": "Housing Material",
      "es": "Material de la carcasa",
      "fr": "Matériau du corps",
      "ko": "하우징 재질",
      "ru": "Материал корпуса"
    },
    "positionDescription": "第3段中间字符",
    "code": "AC",
    "meaning": {
      "zh": "POM",
      "en": "POM",
      "es": "POM",
      "fr": "POM",
      "ko": "POM",
      "ru": "POM"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 7,
    "fieldKey": "housingMaterial",
    "fieldName": {
      "zh": "外壳材质",
      "en": "Housing Material",
      "es": "Material de la carcasa",
      "fr": "Matériau du corps",
      "ko": "하우징 재질",
      "ru": "Материал корпуса"
    },
    "positionDescription": "第3段中间字符",
    "code": "PP",
    "meaning": {
      "zh": "PP",
      "en": "PP",
      "es": "PP",
      "fr": "PP",
      "ko": "PP",
      "ru": "PP"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 8,
    "fieldKey": "sealingRingMaterial",
    "fieldName": {
      "zh": "密封圈材质",
      "en": "Sealing Ring Material",
      "es": "Material de la junta",
      "fr": "Matériau du joint",
      "ko": "씰링 링 재질",
      "ru": "Материал уплотнительного кольца"
    },
    "positionDescription": "第3段最后1位",
    "code": "N",
    "meaning": {
      "zh": "NBR",
      "en": "NBR",
      "es": "NBR",
      "fr": "NBR",
      "ko": "NBR",
      "ru": "NBR"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 8,
    "fieldKey": "sealingRingMaterial",
    "fieldName": {
      "zh": "密封圈材质",
      "en": "Sealing Ring Material",
      "es": "Material de la junta",
      "fr": "Matériau du joint",
      "ko": "씰링 링 재질",
      "ru": "Материал уплотнительного кольца"
    },
    "positionDescription": "第3段最后1位",
    "code": "E",
    "meaning": {
      "zh": "EPDM",
      "en": "EPDM",
      "es": "EPDM",
      "fr": "EPDM",
      "ko": "EPDM",
      "ru": "EPDM"
    }
  },
  {
    "series": "Q20",
    "fieldOrder": 8,
    "fieldKey": "sealingRingMaterial",
    "fieldName": {
      "zh": "密封圈材质",
      "en": "Sealing Ring Material",
      "es": "Material de la junta",
      "fr": "Matériau du joint",
      "ko": "씰링 링 재질",
      "ru": "Материал уплотнительного кольца"
    },
    "positionDescription": "第3段最后1位",
    "code": "F",
    "meaning": {
      "zh": "FKM",
      "en": "FKM",
      "es": "FKM",
      "fr": "FKM",
      "ko": "FKM",
      "ru": "FKM"
    }
  }
],
};
