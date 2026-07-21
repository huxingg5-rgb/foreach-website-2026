/* =========================================================
   plunger-pump-detail.generated.ts
   柱塞泵详情页自动生成数据

   来源：data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx

   说明：
   1. 不要手动修改本文件
   2. 详情页正文来自 06_详情正文
   3. 技术参数表来自 05_详情参数_型号表
   4. FAQ 来自 07_FAQ，规则为“通用 + 当前系列”
   5. 2D / 3D 私有路径只用于脚本校验，不写入前端数据
========================================================= */

import type { PlungerPumpDetail } from "./plunger-pump-detail.types";

export const plungerPumpDetails: PlungerPumpDetail[] = [
  {
    "model": "EA-100-PMMA",
    "slug": "ea-100-pmma",
    "title": "EA-100-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "100 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 100 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于体外诊断（IVD）分析仪、小型反应模块和自动化检测设备中的微量液体处理场景，可用于低容量液体分配、反应液补加和小体积样本处理。实际项目可根据液体兼容性、结构空间和系统集成需求进一步确认泵头材质、柱塞材质及其他配置。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "100 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-100-PEEK",
    "slug": "ea-100-peek",
    "title": "EA-100-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "100 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 100 μL 聚醚醚酮（PEEK）展示配置适用于对避光、液体兼容性或长期稳定性要求更高的微量液体处理场景，可用于分子诊断、生命科学样本处理、特殊试剂分配和小体积反应体系构建。实际项目可根据液体特性、结构空间和系统集成方式进一步确认完整配置。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "100 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-250-PMMA",
    "slug": "ea-250-pmma",
    "title": "EA-250-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "250 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 250 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于体外诊断（IVD）、生化分析、免疫分析和实验室自动化设备中的常规液体分配与反应液处理场景，可用于样本稀释、试剂分配模块和中小体积反应体系构建。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "250 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PVDF / PPS / PEEK / POM；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-250-PEEK",
    "slug": "ea-250-peek",
    "title": "EA-250-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "250 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 250 μL 聚醚醚酮（PEEK）展示配置适用于特殊试剂分配、避光试剂输送和对材料兼容性要求较高的中小体积液路模块，可用于分子检测、生命科学分析、化学分析设备和高稳定性试剂处理场景。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "250 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PVDF / PPS / PEEK / POM；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-500-PMMA",
    "slug": "ea-500-pmma",
    "title": "EA-500-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "500 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 500 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于自动化分析仪器中的常规试剂输送、反应液处理、样本稀释和缓冲液定量分配场景。该量程适合主流体外诊断（IVD）和实验室自动化设备中的中等体积液体处理任务。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PVDF / PP / PTFE / PEEK / POM / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-500-PEEK",
    "slug": "ea-500-peek",
    "title": "EA-500-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "500 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 500 μL 聚醚醚酮（PEEK）展示配置适用于对液体兼容性、避光条件或长期稳定性要求更高的中等体积液体输送场景，可用于特殊试剂、分子诊断试剂、生命科学试剂和分析仪器液路模块。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PVDF / PP / PTFE / PEEK / POM / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-1000-PMMA",
    "slug": "ea-1000-pmma",
    "title": "EA-1000-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "1000 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 1000 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于体外诊断（IVD）、生化分析和实验室自动化设备中的常规试剂输送、稀释液添加和缓冲液分配场景，可用于反应体系供液、试剂转移和分析仪器中的标准液路模块。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "1000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PVDF / POM / PEEK / PTFE / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-1000-PEEK",
    "slug": "ea-1000-peek",
    "title": "EA-1000-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "1000 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 1000 μL 聚醚醚酮（PEEK）展示配置适用于中等体积特殊试剂输送、避光试剂处理和高兼容性液路系统，可用于生命科学、分子诊断、分析检测和长期运行的自动化仪器平台。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "1000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PVDF / POM / PEEK / PTFE / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-2500-PMMA",
    "slug": "ea-2500-pmma",
    "title": "EA-2500-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "2500 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 2500 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于自动化分析设备中的缓冲液输送、稀释液添加、清洗液补充和中大体积试剂转移场景。该量程更适合承担系统供液和中大体积定量输送任务，可用于体外诊断（IVD）、实验室自动化和分析检测设备中的液路供应模块。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "2500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / POM / PEEK / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "14.2 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 / 1.42 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 / 2236 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-2500-PEEK",
    "slug": "ea-2500-peek",
    "title": "EA-2500-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "2500 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 2500 μL 聚醚醚酮（PEEK）展示配置适用于中大体积特殊试剂、避光液体、缓冲液和清洗液的稳定输送场景。该配置适合对液体兼容性、材料稳定性和长期运行可靠性要求更高的分析仪器液路系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "2500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / POM / PEEK / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "14.2 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 / 1.42 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 / 2236 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-5000-PMMA",
    "slug": "ea-5000-pmma",
    "title": "EA-5000-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "5000 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 5000 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于清洗液添加、缓冲液输送、管路预充和自动化设备中的中大体积补液任务。该量程更适合系统清洗、液路冲洗和稳定供液场景，可用于体外诊断（IVD）、生化分析、实验室自动化和分析检测设备中的供液模块。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "5000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PEEK / PVDF / POM / PSU / PC；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-5000-PEEK",
    "slug": "ea-5000-peek",
    "title": "EA-5000-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "5000 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 5000 μL 聚醚醚酮（PEEK）展示配置适用于需要避光、耐化学或更高液体兼容性的中大体积液体输送场景，可用于特殊清洗液、缓冲液、生命科学试剂和分析仪器流路系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "5000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PCTG / PMMA / PPS / PEEK / PVDF / POM / PSU / PC；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-10000-PMMA",
    "slug": "ea-10000-pmma",
    "title": "EA-10000-PMMA 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "10000 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 10000 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于大体积清洗液输送、缓冲液补充、系统冲洗、管路预充和自动化设备中的稳定供液模块。该量程更适合承担大体积液体处理任务，可用于分析仪器和实验室自动化设备中的清洗、冲洗和补液系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "10000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PTFE / PEI / PSU / PMMA / PPS / PVDF / POM / PEEK；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "25.4 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "4000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "EA-10000-PEEK",
    "slug": "ea-10000-peek",
    "title": "EA-10000-PEEK 常规柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "EA",
    "seriesName": "EA 常规柱塞泵",
    "capacity": "10000 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 10000 μL 聚醚醚酮（PEEK）展示配置适用于大体积特殊液体、避光液体、清洗液和缓冲液的稳定输送。该配置适合对材料兼容性、避光性和长期运行稳定性要求更高的设备平台，可用于分析仪器中的高要求供液、冲洗和管路维护模块。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "10000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PTFE / PEI / PSU / PMMA / PPS / PVDF / POM / PEEK；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "25.4 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8° / 0.9°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "4000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程准确性",
        "value": "< 2.0%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "EA 常规柱塞泵适合什么设备平台？",
        "answer": "EA 常规柱塞泵适合作为标准平台型精密液体处理模块，可用于体外诊断（IVD）、生化分析、免疫分析、生命科学、实验室自动化和分析检测设备。该系列更适合需要稳定定量输送、长期运行可靠性和多种配置组合的自动化仪器平台。"
      },
      {
        "question": "EA 系列支持哪些泵头材质？",
        "answer": "EA 常规柱塞泵可根据量程、结构和项目需求评估多种泵头材质，包括 PCTG、PMMA、PPS、PVDF、PP、PTFE、PEEK、POM、PSU、PEI、PC 等工程材料。具体组合需要结合液体兼容性、结构强度、加工方式和项目批量确认。"
      },
      {
        "question": "EA 系列是否可以进行泵阀一体或控制集成？",
        "answer": "可以。EA 系列可根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建自动化分析仪器中的精密液体处理单元。具体集成方式需要结合整机液路方案确认。"
      },
      {
        "question": "为什么产品卡片只显示部分配置？",
        "answer": "产品卡片主要用于展示常用基础配置，便于客户快速识别型号、接口、重复性和满量程分辨率。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式都可以根据需求进一步确认。"
      },
      {
        "question": "如何确认最终型号？",
        "answer": "最终型号需要结合液体体积、泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件、控制方式和系统集成方案共同确认。页面展示型号用于快速识别，完整组合需结合项目需求确认。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-50-PMMA",
    "slug": "sm-50-pmma",
    "title": "SM-50-PMMA 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "50 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 50 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于小型体外诊断（IVD）设备、紧凑型检测模块和微量液体控制系统中的低容量液体处理任务，可用于微量试剂分配、低容量反应液补加和小体积样本处理。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "50 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-100-PMMA",
    "slug": "sm-100-pmma",
    "title": "SM-100-PMMA 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "100 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 100 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于即时检测（POCT）、小型分析仪器、紧凑型实验室自动化模块和微量试剂分配系统。该量程适合小体积液体处理、样本稀释和低容量液路定量控制。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "100 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA / PEEK / AL6063 / AL6061；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-100-PEEK",
    "slug": "sm-100-peek",
    "title": "SM-100-PEEK 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "100 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 100 μL 聚醚醚酮（PEEK）展示配置适用于紧凑型设备中对避光、耐化学或液体兼容性要求更高的微量液体处理模块，可用于分子诊断、生命科学样本处理、特殊试剂分配和小体积高稳定性液路系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "100 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA / PEEK / AL6063 / AL6061；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-250-PMMA",
    "slug": "sm-250-pmma",
    "title": "SM-250-PMMA 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "250 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 250 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于紧凑型体外诊断（IVD）仪器、小型反应模块、样本处理单元和微量试剂输送系统。该量程适合中小体积液体分配，可用于小型设备中的反应液分配和样本处理任务。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "250 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "AL6061 / PMMA / PEI / PEEK / POM；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-250-PEEK",
    "slug": "sm-250-peek",
    "title": "SM-250-PEEK 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "250 μL",
    "pumpHeadMaterialCode": "PEEK",
    "pumpHeadMaterial": "聚醚醚酮（PEEK）",
    "description": "该 250 μL 聚醚醚酮（PEEK）展示配置适用于小型化液路系统中的特殊试剂分配、避光试剂输送和高兼容性液体处理场景。该配置适合分子诊断、生命科学试剂、小型分析仪器和对泵头材料稳定性要求较高的紧凑型设备。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "250 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚醚醚酮（PEEK）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "AL6061 / PMMA / PEI / PEEK / POM；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-500-PMMA",
    "slug": "sm-500-pmma",
    "title": "SM-500-PMMA 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "500 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 500 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于小型分析设备、紧凑型实验室自动化模块和中等体积试剂输送系统。该量程适合在有限空间内实现常规试剂输送、样本处理和反应液分配，适合小型化仪器平台的液路集成。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "AL6061 / PEI / PMMA / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "SM-1000-PMMA",
    "slug": "sm-1000-pmma",
    "title": "SM-1000-PMMA 微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "SM",
    "seriesName": "SM 微型柱塞泵",
    "capacity": "1000 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 1000 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于紧凑型仪器中的常规试剂输送、稀释液添加、缓冲液分配和小型供液模块。该量程适合在小型设备中承担中等体积液体处理任务，适合兼顾液体处理能力和结构紧凑性的液路系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "1000 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PEI / PMMA / POM / PSU；其他工程材料可根据项目评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "1/4-28 UNF / M6"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1.27 mm"
      },
      {
        "label": "满量程步数",
        "value": "2000 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 1.0%"
      },
      {
        "label": "设计寿命",
        "value": "500 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "SM 微型柱塞泵主要适合什么类型的设备？",
        "answer": "SM 微型柱塞泵面向紧凑型仪器和小型化液路模块设计，适合小型体外诊断（IVD）设备、即时检测（POCT）模块、小型分析仪器、实验室自动化子模块和空间有限的精密液体处理系统。"
      },
      {
        "question": "SM 系列和 EA 系列有什么区别？",
        "answer": "SM 系列更强调小型化结构和紧凑液路集成，适合设备内部空间有限的应用场景。EA 系列更偏标准平台型柱塞泵，适用于更宽范围的自动化分析仪器液体处理需求。"
      },
      {
        "question": "SM 微型柱塞泵支持哪些泵头材质？",
        "answer": "SM 微型柱塞泵官网主展示配置以常用泵头材质为主，可根据不同量程、液体兼容性、结构强度、加工方式和项目批量需求评估更多泵头材质方案。除 PMMA、PEEK 外，也可结合项目需求评估铝合金、PEI、POM、PSU 等材料方案。"
      },
      {
        "question": "SM 系列可以做泵阀一体或控制集成吗？",
        "answer": "SM 系列可以根据系统需求与电磁阀、控制器、光耦反馈、阀组件及其他液路部件组合，用于构建紧凑型液体处理模块。具体集成方式需要结合设备空间、安装方式、控制逻辑和完整型号组合确认。"
      },
      {
        "question": "SM 系列为什么适合紧凑型液路模块？",
        "answer": "SM 系列重点在于小型化结构、紧凑液路布局和模块化集成，适合设备内部空间有限但仍需要稳定液体处理能力的应用场景。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "TM-50-PMMA",
    "slug": "tm-50-pmma",
    "title": "TM-50-PMMA 超微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "TM",
    "seriesName": "TM 超微型柱塞泵",
    "capacity": "50 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 50 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于超紧凑型检测模块、便携式分析设备和低容量微流体控制场景。该量程适合微量液体处理、低容量样本处理和小型反应单元，可用于对安装空间要求较高的微量液路系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "50 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "6-40 UNF"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1 mm"
      },
      {
        "label": "满量程步数",
        "value": "2540 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 2.0%"
      },
      {
        "label": "设计寿命",
        "value": "300 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
        "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
      },
      {
        "question": "TM 系列和 SM 系列有什么区别？",
        "answer": "TM 系列比 SM 系列更强调超微型结构和有限空间安装，适合更小型的检测模块、便携式设备和低容量液路系统。SM 系列则适合紧凑型仪器和小型液路模块，结构空间和液体处理能力相对更宽。"
      },
      {
        "question": "TM 超微型柱塞泵采用什么接口？",
        "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
      },
      {
        "question": "TM 系列支持哪些泵头材质？",
        "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
      },
      {
        "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
        "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "TM-100-PMMA",
    "slug": "tm-100-pmma",
    "title": "TM-100-PMMA 超微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "TM",
    "seriesName": "TM 超微型柱塞泵",
    "capacity": "100 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 100 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于便携式检测设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和微量液路单元。该量程适合小体积液体处理、样本分配和低容量液路控制，可用于空间受限的自动化液体处理平台。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "100 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "6-40 UNF"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1 mm"
      },
      {
        "label": "满量程步数",
        "value": "2540 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 2.0%"
      },
      {
        "label": "设计寿命",
        "value": "300 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
        "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
      },
      {
        "question": "TM 系列和 SM 系列有什么区别？",
        "answer": "TM 系列比 SM 系列更强调超微型结构和有限空间安装，适合更小型的检测模块、便携式设备和低容量液路系统。SM 系列则适合紧凑型仪器和小型液路模块，结构空间和液体处理能力相对更宽。"
      },
      {
        "question": "TM 超微型柱塞泵采用什么接口？",
        "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
      },
      {
        "question": "TM 系列支持哪些泵头材质？",
        "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
      },
      {
        "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
        "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "TM-250-PMMA",
    "slug": "tm-250-pmma",
    "title": "TM-250-PMMA 超微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "TM",
    "seriesName": "TM 超微型柱塞泵",
    "capacity": "250 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 250 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于小型分析设备、微型液路模块和紧凑型实验室自动化单元中的定量分配任务。该量程适合常规微量试剂输送、样本处理和小体积反应体系构建，适合需要小型化集成的仪器平台。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "250 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "6-40 UNF"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1 mm"
      },
      {
        "label": "满量程步数",
        "value": "2540 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 2.0%"
      },
      {
        "label": "设计寿命",
        "value": "300 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
        "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
      },
      {
        "question": "TM 系列和 SM 系列有什么区别？",
        "answer": "TM 系列比 SM 系列更强调超微型结构和有限空间安装，适合更小型的检测模块、便携式设备和低容量液路系统。SM 系列则适合紧凑型仪器和小型液路模块，结构空间和液体处理能力相对更宽。"
      },
      {
        "question": "TM 超微型柱塞泵采用什么接口？",
        "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
      },
      {
        "question": "TM 系列支持哪些泵头材质？",
        "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
      },
      {
        "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
        "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  },
  {
    "model": "TM-500-PMMA",
    "slug": "tm-500-pmma",
    "title": "TM-500-PMMA 超微型柱塞泵",
    "categoryCode": "pumps",
    "categoryName": "泵类 / Pumps",
    "productTypeCode": "plunger-pumps",
    "productTypeName": "柱塞泵 / Plunger Pumps",
    "seriesCode": "TM",
    "seriesName": "TM 超微型柱塞泵",
    "capacity": "500 μL",
    "pumpHeadMaterialCode": "PMMA",
    "pumpHeadMaterial": "聚甲基丙烯酸甲酯（PMMA）",
    "description": "该 500 μL 聚甲基丙烯酸甲酯（PMMA）展示配置适用于空间受限设备中的常规试剂输送、低容量缓冲液添加和小型液路系统供液。该量程适合在超紧凑结构中承担相对较大的微量输送任务，可用于便携式检测、小型分析仪器和模块化液体处理系统。",
    "specifications": [
      {
        "label": "标称容量",
        "value": "500 μL"
      },
      {
        "label": "当前展示泵头材质",
        "value": "聚甲基丙烯酸甲酯（PMMA）"
      },
      {
        "label": "泵头材质可选范围",
        "value": "PMMA；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估"
      },
      {
        "label": "柱塞材质可选范围",
        "value": "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估"
      },
      {
        "label": "液路接口",
        "value": "6-40 UNF"
      },
      {
        "label": "行程",
        "value": "12.7 mm"
      },
      {
        "label": "推荐最高转速",
        "value": "600 RPM"
      },
      {
        "label": "电机步距角",
        "value": "1.8°"
      },
      {
        "label": "导程",
        "value": "1 mm"
      },
      {
        "label": "满量程步数",
        "value": "2540 Step"
      },
      {
        "label": "100%量程准确性",
        "value": "< 0.5%"
      },
      {
        "label": "100%量程重复性",
        "value": "< 0.5%"
      },
      {
        "label": "2%量程重复性",
        "value": "< 1.5%"
      },
      {
        "label": "背隙",
        "value": "< 2.0%"
      },
      {
        "label": "设计寿命",
        "value": "300 万次"
      },
      {
        "label": "最大流体压力",
        "value": "≤0.3 MPa"
      }
    ],
    "faqs": [
      {
        "question": "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？",
        "answer": "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。"
      },
      {
        "question": "TM 超微型柱塞泵主要适合什么类型的设备？",
        "answer": "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。"
      },
      {
        "question": "TM 系列和 SM 系列有什么区别？",
        "answer": "TM 系列比 SM 系列更强调超微型结构和有限空间安装，适合更小型的检测模块、便携式设备和低容量液路系统。SM 系列则适合紧凑型仪器和小型液路模块，结构空间和液体处理能力相对更宽。"
      },
      {
        "question": "TM 超微型柱塞泵采用什么接口？",
        "answer": "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。"
      },
      {
        "question": "TM 系列支持哪些泵头材质？",
        "answer": "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。"
      },
      {
        "question": "TM 系列可以和阀、控制器或光耦反馈组合吗？",
        "answer": "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。"
      }
    ],
    "resources": {
      "drawing2dRequestOnly": true,
      "model3dRequestOnly": true,
      "buttons": {
        "drawing2d": {
          "zh": "申请 2D 图纸",
          "en": "Request 2D Drawing"
        },
        "model3d": {
          "zh": "申请 3D 模型",
          "en": "Request 3D Model"
        }
      }
    }
  }
];

export const plungerPumpDetailBySlug: Record<string, PlungerPumpDetail> = Object.fromEntries(
  plungerPumpDetails.map((detail) => [detail.slug, detail]),
);

export function getPlungerPumpDetailBySlug(
  slug: string,
): PlungerPumpDetail | undefined {
  return plungerPumpDetailBySlug[slug];
}

export function getPlungerPumpDetailByModel(
  model: string,
): PlungerPumpDetail | undefined {
  return plungerPumpDetails.find((detail) => detail.model === model);
}
