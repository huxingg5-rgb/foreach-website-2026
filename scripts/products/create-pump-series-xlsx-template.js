/* =========================================================
   create-pump-series-xlsx-template.js
   恒永达官网｜泵系列数据库表格模板生成脚本

   说明：
   1. 生成泵系列产品数据源 xlsx
   2. 生成全站脚注库 xlsx
   3. H1 / H2 / 正文 / 卡片 / 图片说明都写入表格
   4. 后续 build-pump-series-data.js 只负责解析，不自动创作文案
========================================================= */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const ROOT = process.cwd();

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeWorkbook(filePath, sheets) {
  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    const worksheet = XLSX.utils.json_to_sheet(sheet.rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
  }

  XLSX.writeFile(workbook, filePath);
  console.log("✅ 已生成：" + filePath);
}

ensureDir(path.join(ROOT, "data-source/product-center/pumps"));
ensureDir(path.join(ROOT, "data-source/global"));

/* =========================================================
   1. 泵系列产品数据源
========================================================= */

const pumpWorkbookPath = path.join(
  ROOT,
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

writeWorkbook(pumpWorkbookPath, [
  {
    name: "00_说明",
    rows: [
      {
        item: "用途",
        description:
          "本文件为泵系列产品数据库式数据源。当前阶段只服务于泵系列，不强制扩展到接头、阀、传感器等产品线。",
      },
      {
        item: "原则",
        description:
          "表格负责内容，脚本负责解析，前端负责渲染。脚本不得自动生成 H1、H2、正文、卡片文案或图片说明。",
      },
      {
        item: "脚注规则",
        description:
          "脚注正文单独放在全站脚注库，本表只写 footnoteIds 引用。",
      },
    ],
  },
  {
    name: "01_泵系列页面规则",
    rows: [
      {
        pumpTypeSlug: "plunger-pumps",
        pumpTypeNameZh: "柱塞泵",
        pumpTypeNameEn: "Piston Pump",
        detailMode: "custom_inquiry",
        showModelDefault: "no",
        selectorMode: "requirement_guide",
        showSelectorEntry: "yes",
        defaultNoticeZh:
          "柱塞泵为定制品，如需柱塞泵定制方案，请联系我们或提交需求表单。",
        defaultNoticeEn:
          "Plunger pumps are custom-engineered products. Please contact us or submit your requirements for a customized pump solution.",
        primaryButtonZh: "联系我们",
        primaryButtonEn: "Contact Us",
        primaryButtonHref: "/contact",
        secondaryButtonZh: "提交需求表单",
        secondaryButtonEn: "Submit Requirements",
        secondaryButtonHref: "/contact",
        remark: "柱塞泵前台不单独显示固定型号，引导客户提交定制需求。",
      },
      {
        pumpTypeSlug: "diaphragm-pumps",
        pumpTypeNameZh: "隔膜泵",
        pumpTypeNameEn: "Diaphragm Pumps",
        detailMode: "model_display",
        showModelDefault: "yes",
        selectorMode: "model_filter",
        showSelectorEntry: "yes",
        defaultNoticeZh: "",
        defaultNoticeEn: "",
        primaryButtonZh: "型号筛选",
        primaryButtonEn: "Model Filter",
        primaryButtonHref: "/products/pumps/diaphragm-pumps",
        secondaryButtonZh: "加入清单",
        secondaryButtonEn: "Add to List",
        secondaryButtonHref: "#",
        remark: "隔膜泵可显示标准型号，后续再补型号筛选项。",
      },
    ],
  },
  {
    name: "02_泵产品索引",
    rows: [
      {
        productId: "ea-100-pmma",
        slug: "ea-100-pmma",
        routeSlug: "ea-100-pmma",
        categorySlug: "pumps",
        pumpTypeSlug: "plunger-pumps",
        seriesSlug: "standard-piston-pump",
        seriesCode: "EA",
        internalModelRef: "EA-100-PMMA",
        capacity: "100 µL",
        material: "PMMA",
        showInFrontend: "yes",
        enabled: "yes",
        sort: 100,
      },
      {
        productId: "ea-250-pmma",
        slug: "ea-250-pmma",
        routeSlug: "ea-250-pmma",
        categorySlug: "pumps",
        pumpTypeSlug: "plunger-pumps",
        seriesSlug: "standard-piston-pump",
        seriesCode: "EA",
        internalModelRef: "EA-250-PMMA",
        capacity: "250 µL",
        material: "PMMA",
        showInFrontend: "yes",
        enabled: "yes",
        sort: 110,
      },
      {
        productId: "sm-100-pmma",
        slug: "sm-100-pmma",
        routeSlug: "sm-100-pmma",
        categorySlug: "pumps",
        pumpTypeSlug: "plunger-pumps",
        seriesSlug: "miniature-piston-pump",
        seriesCode: "SM",
        internalModelRef: "SM-100-PMMA",
        capacity: "100 µL",
        material: "PMMA",
        showInFrontend: "yes",
        enabled: "yes",
        sort: 200,
      },
    ],
  },
  {
    name: "03_路由与页面映射",
    rows: [
      {
        productId: "ea-100-pmma",
        routeSlug: "ea-100-pmma",
        canonicalPath: "/products/pumps/piston-pump/ea-100-pmma",
        detailHref: "/products/pumps/piston-pump/ea-100-pmma",
        legacyRedirectFrom: "/products/pumps/piston-pump/ea-100-pmma/",
        trailingSlashPolicy: "no_trailing_slash",
        routeEnabled: "yes",
      },
      {
        productId: "ea-250-pmma",
        routeSlug: "ea-250-pmma",
        canonicalPath: "/products/pumps/piston-pump/ea-250-pmma",
        detailHref: "/products/pumps/piston-pump/ea-250-pmma",
        legacyRedirectFrom: "/products/pumps/piston-pump/ea-250-pmma/",
        trailingSlashPolicy: "no_trailing_slash",
        routeEnabled: "yes",
      },
      {
        productId: "sm-100-pmma",
        routeSlug: "sm-100-pmma",
        canonicalPath: "/products/pumps/piston-pump/sm-100-pmma",
        detailHref: "/products/pumps/piston-pump/sm-100-pmma",
        legacyRedirectFrom: "/products/pumps/piston-pump/sm-100-pmma/",
        trailingSlashPolicy: "no_trailing_slash",
        routeEnabled: "yes",
      },
    ],
  },
  {
    name: "04_详情页首屏",
    rows: [
      {
        productId: "ea-100-pmma",
        titleZh: "EA-100-PMMA 柱塞泵",
        titleEn: "100 µL PMMA Plunger Pump for Precision Dispensing",
        detailMode: "custom_inquiry",
        showModel: "no",
        displayModel: "EA-100-PMMA",
        customNoticeZh:
          "柱塞泵为定制品，如需柱塞泵定制方案，请联系我们或提交需求表单。",
        customNoticeEn:
          "Plunger pumps are custom-engineered products. Please contact us or submit your requirements for a customized pump solution.",
        primaryButtonZh: "联系我们",
        primaryButtonEn: "Contact Us",
        primaryButtonHref: "/contact",
        secondaryButtonZh: "提交需求表单",
        secondaryButtonEn: "Submit Requirements",
        secondaryButtonHref: "/contact",
        showAddToList: "no",
        showModelFilter: "no",
      },
      {
        productId: "ea-250-pmma",
        titleZh: "EA-250-PMMA 柱塞泵",
        titleEn: "250 µL PMMA Plunger Pump for Precision Dispensing",
        detailMode: "custom_inquiry",
        showModel: "no",
        displayModel: "EA-250-PMMA",
        customNoticeZh:
          "柱塞泵为定制品，如需柱塞泵定制方案，请联系我们或提交需求表单。",
        customNoticeEn:
          "Plunger pumps are custom-engineered products. Please contact us or submit your requirements for a customized pump solution.",
        primaryButtonZh: "联系我们",
        primaryButtonEn: "Contact Us",
        primaryButtonHref: "/contact",
        secondaryButtonZh: "提交需求表单",
        secondaryButtonEn: "Submit Requirements",
        secondaryButtonHref: "/contact",
        showAddToList: "no",
        showModelFilter: "no",
      },
      {
        productId: "sm-100-pmma",
        titleZh: "SM-100-PMMA 微型柱塞泵",
        titleEn: "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems",
        detailMode: "custom_inquiry",
        showModel: "no",
        displayModel: "SM-100-PMMA",
        customNoticeZh:
          "柱塞泵为定制品，如需柱塞泵定制方案，请联系我们或提交需求表单。",
        customNoticeEn:
          "Plunger pumps are custom-engineered products. Please contact us or submit your requirements for a customized pump solution.",
        primaryButtonZh: "联系我们",
        primaryButtonEn: "Contact Us",
        primaryButtonHref: "/contact",
        secondaryButtonZh: "提交需求表单",
        secondaryButtonEn: "Submit Requirements",
        secondaryButtonHref: "/contact",
        showAddToList: "no",
        showModelFilter: "no",
      },
    ],
  },
  {
    name: "05_SEO与HTML标记",
    rows: [
      {
        productId: "ea-100-pmma",
        locale: "zh",
        titleTag: "EA-100-PMMA 柱塞泵｜恒永达 FOREACH",
        metaDescription:
          "EA-100-PMMA 柱塞泵适用于精密液体分配、自动化分析仪器和 IVD 液路系统。柱塞泵为定制品，具体方案需根据应用确认。",
        h1: "EA-100-PMMA 柱塞泵",
        canonicalPath: "/products/pumps/piston-pump/ea-100-pmma",
        robots: "index,follow",
        ogTitle: "EA-100-PMMA 柱塞泵",
        ogDescription:
          "适用于精密液体分配和自动化仪器液路集成的定制柱塞泵方案。",
      },
      {
        productId: "ea-100-pmma",
        locale: "en",
        titleTag:
          "100 µL PMMA Plunger Pump for Precision Dispensing | FOREACH",
        metaDescription:
          "100 µL PMMA plunger pump for precision dispensing, automated analyzers, IVD instruments, and custom fluidic systems. Final configuration is confirmed by FOREACH engineering.",
        h1: "100 µL PMMA Plunger Pump for Precision Dispensing",
        canonicalPath: "/products/pumps/piston-pump/ea-100-pmma",
        robots: "index,follow",
        ogTitle: "100 µL PMMA Plunger Pump for Precision Dispensing",
        ogDescription:
          "Custom-engineered plunger pump solution for precision dispensing and automated fluidic integration.",
      },
      {
        productId: "ea-250-pmma",
        locale: "zh",
        titleTag: "EA-250-PMMA 柱塞泵｜恒永达 FOREACH",
        metaDescription:
          "EA-250-PMMA 柱塞泵适用于中小容量精密分配和自动化液路集成，最终方案需根据应用定制确认。",
        h1: "EA-250-PMMA 柱塞泵",
        canonicalPath: "/products/pumps/piston-pump/ea-250-pmma",
        robots: "index,follow",
        ogTitle: "EA-250-PMMA 柱塞泵",
        ogDescription:
          "适用于自动化仪器液路集成的定制柱塞泵方案。",
      },
      {
        productId: "ea-250-pmma",
        locale: "en",
        titleTag:
          "250 µL PMMA Plunger Pump for Precision Dispensing | FOREACH",
        metaDescription:
          "250 µL PMMA plunger pump for precision dispensing, fluid transfer, and custom liquid handling systems.",
        h1: "250 µL PMMA Plunger Pump for Precision Dispensing",
        canonicalPath: "/products/pumps/piston-pump/ea-250-pmma",
        robots: "index,follow",
        ogTitle: "250 µL PMMA Plunger Pump for Precision Dispensing",
        ogDescription:
          "Custom plunger pump solution for precision liquid handling and instrument integration.",
      },
      {
        productId: "sm-100-pmma",
        locale: "zh",
        titleTag: "SM-100-PMMA 微型柱塞泵｜恒永达 FOREACH",
        metaDescription:
          "SM-100-PMMA 微型柱塞泵适用于空间紧凑型仪器中的精密液体分配和液路集成。",
        h1: "SM-100-PMMA 微型柱塞泵",
        canonicalPath: "/products/pumps/piston-pump/sm-100-pmma",
        robots: "index,follow",
        ogTitle: "SM-100-PMMA 微型柱塞泵",
        ogDescription:
          "适用于紧凑型自动化仪器的微型柱塞泵定制方案。",
      },
      {
        productId: "sm-100-pmma",
        locale: "en",
        titleTag:
          "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | FOREACH",
        metaDescription:
          "100 µL miniature PMMA plunger pump for compact automated instruments and custom fluidic systems.",
        h1: "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems",
        canonicalPath: "/products/pumps/piston-pump/sm-100-pmma",
        robots: "index,follow",
        ogTitle:
          "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems",
        ogDescription:
          "Miniature custom plunger pump solution for compact fluidic systems.",
      },
    ],
  },
  {
    name: "06_页面模块与标题",
    rows: [
      {
        productId: "ea-100-pmma",
        locale: "zh",
        sectionKey: "features",
        headingLevel: "h2",
        headingText: "产品特点",
        leadText: "面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。",
        renderComponent: "feature_cards",
        sort: 100,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "zh",
        sectionKey: "specifications",
        headingLevel: "h2",
        headingText: "技术参数",
        leadText: "以下参数用于方案评估，最终配置需结合实际应用、液体介质和集成方式确认。",
        renderComponent: "parameter_table",
        sort: 200,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "zh",
        sectionKey: "downloads",
        headingLevel: "h2",
        headingText: "资料与图纸",
        leadText: "可查看公开资料和预览文件，完整工程文件请通过需求提交方式获取。",
        renderComponent: "resource_cards",
        sort: 300,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "zh",
        sectionKey: "faq",
        headingLevel: "h2",
        headingText: "常见问题",
        leadText: "以下内容用于说明柱塞泵定制、材料选择和工程确认流程。",
        renderComponent: "faq_list",
        sort: 400,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "en",
        sectionKey: "features",
        headingLevel: "h2",
        headingText: "Product Features",
        leadText:
          "A custom plunger pump solution for precision liquid dispensing in automated analytical instruments.",
        renderComponent: "feature_cards",
        sort: 100,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "en",
        sectionKey: "specifications",
        headingLevel: "h2",
        headingText: "Technical Specifications",
        leadText:
          "The following specifications are provided for application evaluation. Final configuration depends on the liquid, instrument layout, and integration requirements.",
        renderComponent: "parameter_table",
        sort: 200,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "en",
        sectionKey: "downloads",
        headingLevel: "h2",
        headingText: "Downloads and Drawings",
        leadText:
          "Public preview files may be available. Full engineering files should be requested through the requirement submission process.",
        renderComponent: "resource_cards",
        sort: 300,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        locale: "en",
        sectionKey: "faq",
        headingLevel: "h2",
        headingText: "FAQ",
        leadText:
          "Common questions about plunger pump customization, material selection, and engineering confirmation.",
        renderComponent: "faq_list",
        sort: 400,
        enabled: "yes",
      },
    ],
  },
  {
    name: "07_选型卡片",
    rows: [
      {
        productId: "ea-100-pmma",
        pumpTypeSlug: "plunger-pumps",
        seriesSlug: "standard-piston-pump",
        cardTitleZh: "EA-100-PMMA 柱塞泵",
        cardTitleEn: "100 µL PMMA Plunger Pump",
        cardSubtitleZh: "适用于精密液体分配与自动化仪器液路集成",
        cardSubtitleEn:
          "For precision dispensing and automated fluidic integration",
        cardDescriptionZh:
          "EA 系列柱塞泵适用于 IVD 分析仪、实验室自动化设备和分析仪器中的微量液体吸排、分配和转移场景。",
        cardDescriptionEn:
          "EA series plunger pumps support precision aspiration, dispensing, and transfer tasks in IVD analyzers, laboratory automation systems, and analytical instruments.",
        cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：定制柱塞泵",
        cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Custom plunger pump",
        cardBadges: "Custom|Precision Dispensing|PMMA",
        cardImage:
          "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
        detailHref: "/products/pumps/piston-pump/ea-100-pmma",
        showInSelection: "yes",
        sort: 100,
      },
    ],
  },
  {
    name: "08_详情页正文",
    rows: [
      {
        productId: "ea-100-pmma",
        descriptionZh:
          "EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体分配、吸排和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、控制方式和液路集成形式需根据实际应用确认。",
        descriptionEn:
          "The 100 µL PMMA plunger pump is designed for precision dispensing, aspiration, and liquid transfer in automated instruments. It is a custom-engineered pump solution, and the final structure, materials, interfaces, control method, and fluidic integration are confirmed according to the application.",
        advantagesZh:
          "适用于微量液体精密分配|支持泵体材料和接口定制|可配合阀、控制器和光耦方案集成|适用于自动化分析仪器液路系统",
        advantagesEn:
          "Suitable for precision micro-volume dispensing|Supports pump material and interface customization|Can be integrated with valves, controllers, and optical sensors|Designed for automated analytical fluidic systems",
        commonApplicationsZh:
          "IVD 分析仪|实验室自动化设备|生命科学仪器|分析仪器液路模块",
        commonApplicationsEn:
          "IVD analyzers|Laboratory automation systems|Life science instruments|Analytical instrument fluidic modules",
      },
    ],
  },
  {
    name: "09_详情页参数",
    rows: [
      {
        productId: "ea-100-pmma",
        groupNameZh: "基础参数",
        groupNameEn: "Basic Specifications",
        paramNameZh: "容量范围",
        paramNameEn: "Volume Range",
        paramValueZh: "100 µL",
        paramValueEn: "100 µL",
        unit: "",
        sort: 100,
        visible: "yes",
        parameterFootnoteIds: "FN-PARAMETER-CONDITION",
      },
      {
        productId: "ea-100-pmma",
        groupNameZh: "材料",
        groupNameEn: "Materials",
        paramNameZh: "泵头材料",
        paramNameEn: "Pump Head Material",
        paramValueZh: "PMMA",
        paramValueEn: "PMMA",
        unit: "",
        sort: 200,
        visible: "yes",
        parameterFootnoteIds: "FN-MATERIAL-COMPATIBILITY",
      },
      {
        productId: "ea-100-pmma",
        groupNameZh: "接口",
        groupNameEn: "Interface",
        paramNameZh: "接口螺纹",
        paramNameEn: "Thread Interface",
        paramValueZh: "1/4-28 UNF / M6 可选",
        paramValueEn: "1/4-28 UNF / M6 optional",
        unit: "",
        sort: 300,
        visible: "yes",
        parameterFootnoteIds: "",
      },
    ],
  },
  {
    name: "10_图片资源",
    rows: [
      {
        productId: "ea-100-pmma",
        imageUsage: "detailImages",
        imagePaths:
          "/images/products/pumps/plunger-pump/ea/ea-100-pmma-main.webp；/images/products/pumps/plunger-pump/ea/ea-100-pmma-detail.webp",
        imageAltZh: "EA-100-PMMA 柱塞泵产品图；EA-100-PMMA 柱塞泵泵头细节图",
        imageAltEn:
          "EA-100-PMMA plunger pump product image；EA-100-PMMA plunger pump head detail image",
        imageCaptionZh: "产品图片仅用于结构展示；泵头细节图仅用于结构说明",
        imageCaptionEn:
          "Product image for structural reference only；Pump head detail image for structural reference only",
        showCaption: "yes",
        fallbackImage: "/images/products/common/product-placeholder.webp",
        imageFootnoteIds: "FN-IMAGE-FOR-REFERENCE",
        sort: 100,
      },
    ],
  },
  {
    name: "11_资料资源",
    rows: [
      {
        productId: "ea-100-pmma",
        drawing2dUrl: "/assets/products/ea/2d-drawings/EA-0100UL.pdf",
        model3dUrl: "/assets/products/ea/3d-models/EA-0100UL.glb",
        datasheetUrl: "",
        manualUrl: "",
        showDrawing: "yes",
        show3D: "yes",
        showDatasheet: "no",
        showManual: "no",
        resourceFootnoteIds:
          "FN-DRAWING-PREVIEW|FN-ENGINEERING-FILES-NOT-PUBLIC",
      },
    ],
  },
  {
    name: "12_FAQ",
    rows: [
      {
        faqId: "FAQ-PLUNGER-CUSTOM-001",
        scope: "product",
        productId: "ea-100-pmma",
        pumpTypeSlug: "plunger-pumps",
        questionZh: "柱塞泵是否可以直接按型号下单？",
        answerZh:
          "柱塞泵为定制化产品，具体结构、材料、接口和控制方式需根据实际应用确认。建议提交需求后由 FOREACH 工程团队协助确认方案。",
        questionEn: "Can this plunger pump be ordered directly by model?",
        answerEn:
          "Plunger pumps are custom-engineered products. The final structure, materials, interfaces, and control method should be confirmed according to the application. Please submit your requirements for engineering confirmation.",
        sort: 100,
        enabled: "yes",
      },
    ],
  },
  {
    name: "13_选型入口划分",
    rows: [
      {
        pumpTypeSlug: "plunger-pumps",
        selectorMode: "requirement_guide",
        selectorTitleZh: "柱塞泵定制需求提交",
        selectorTitleEn: "Custom Plunger Pump Requirement",
        selectorDescriptionZh:
          "请根据实际应用提交容量范围、泵头材料、接口、控制方式及液路集成需求，FOREACH 工程团队将协助确认最终方案。",
        selectorDescriptionEn:
          "Submit your volume range, pump head material, interface, control method, and fluidic integration requirements. FOREACH engineering will help confirm the final solution.",
        entryButtonZh: "提交需求表单",
        entryButtonEn: "Submit Requirements",
        entryHref: "/contact",
        enabled: "yes",
      },
    ],
  },
  {
    name: "14_脚注引用映射",
    rows: [
      {
        productId: "ea-100-pmma",
        targetBlock: "hero_notice",
        renderPosition: "detail_notice",
        footnoteIds: "FN-CUSTOM-PUMP",
        sort: 100,
        enabled: "yes",
      },
      {
        productId: "ea-100-pmma",
        targetBlock: "page_bottom",
        renderPosition: "page_bottom",
        footnoteIds: "FN-FINAL-CONFIG",
        sort: 200,
        enabled: "yes",
      },
    ],
  },
  {
    name: "15_脚本分解规则",
    rows: [
      {
        outputFile: "pump-series.detail.generated.ts",
        sourceSheets:
          "02_泵产品索引|03_路由与页面映射|04_详情页首屏|05_SEO与HTML标记|06_页面模块与标题|08_详情页正文|09_详情页参数|10_图片资源|11_资料资源|12_FAQ|14_脚注引用映射",
        description: "生成泵系列详情页数据。",
      },
      {
        outputFile: "pump-series.selection.generated.ts",
        sourceSheets: "07_选型卡片",
        description: "生成泵系列选型卡片数据。",
      },
      {
        outputFile: "pump-series.routes.generated.ts",
        sourceSheets: "02_泵产品索引|03_路由与页面映射",
        description: "生成泵系列路由数据。",
      },
    ],
  },
]);

/* =========================================================
   2. 全站脚注库
========================================================= */

const footnoteWorkbookPath = path.join(
  ROOT,
  "data-source/global/FOREACH_全站脚注库.xlsx"
);

writeWorkbook(footnoteWorkbookPath, [
  {
    name: "01_脚注库",
    rows: [
      {
        footnoteId: "FN-CUSTOM-PUMP",
        scope: "global",
        module: "product_detail",
        noteType: "custom_notice",
        noteZh: "柱塞泵为定制化产品，最终方案需根据实际应用、液体介质和系统集成要求确认。",
        noteEn:
          "Plunger pumps are custom-engineered products. The final solution should be confirmed according to the application, liquid media, and system integration requirements.",
        renderPosition: "detail_notice",
        displayStyle: "small_note",
        sort: 100,
        enabled: "yes",
      },
      {
        footnoteId: "FN-FINAL-CONFIG",
        scope: "global",
        module: "product_detail",
        noteType: "engineering_confirmation",
        noteZh: "页面信息用于产品选型与方案评估参考，最终配置以 FOREACH 工程团队确认为准。",
        noteEn:
          "Page information is provided for product selection and solution evaluation. Final configuration is subject to confirmation by the FOREACH engineering team.",
        renderPosition: "page_bottom",
        displayStyle: "small_note",
        sort: 200,
        enabled: "yes",
      },
      {
        footnoteId: "FN-PARAMETER-CONDITION",
        scope: "global",
        module: "parameter_table",
        noteType: "parameter_condition",
        noteZh: "参数数据基于标准测试条件，实际表现可能受液体性质、工作环境和控制方式影响。",
        noteEn:
          "Specifications are based on standard test conditions. Actual performance may vary depending on liquid properties, operating environment, and control method.",
        renderPosition: "parameter_bottom",
        displayStyle: "small_note",
        sort: 300,
        enabled: "yes",
      },
      {
        footnoteId: "FN-MATERIAL-COMPATIBILITY",
        scope: "global",
        module: "parameter_table",
        noteType: "material_notice",
        noteZh: "接液材料需结合实际介质进行兼容性评估。",
        noteEn:
          "Wetted materials should be evaluated for compatibility with the actual liquid media.",
        renderPosition: "parameter_bottom",
        displayStyle: "small_note",
        sort: 400,
        enabled: "yes",
      },
      {
        footnoteId: "FN-IMAGE-FOR-REFERENCE",
        scope: "global",
        module: "image",
        noteType: "image_notice",
        noteZh: "产品图片仅用于结构与外观参考，具体外观以实际配置为准。",
        noteEn:
          "Product images are for structural and appearance reference only. Actual appearance depends on the final configuration.",
        renderPosition: "image_bottom",
        displayStyle: "small_note",
        sort: 500,
        enabled: "yes",
      },
      {
        footnoteId: "FN-DRAWING-PREVIEW",
        scope: "global",
        module: "resources",
        noteType: "drawing_notice",
        noteZh: "公开图纸和 3D 文件仅用于网页预览和初步评估。",
        noteEn:
          "Public drawings and 3D files are provided for web preview and preliminary evaluation only.",
        renderPosition: "resource_bottom",
        displayStyle: "small_note",
        sort: 600,
        enabled: "yes",
      },
      {
        footnoteId: "FN-ENGINEERING-FILES-NOT-PUBLIC",
        scope: "global",
        module: "resources",
        noteType: "file_access",
        noteZh: "STEP、STP、X_T、DWG、DXF 等工程文件不建议公开放置，如需获取请提交需求。",
        noteEn:
          "Engineering files such as STEP, STP, X_T, DWG, and DXF should not be publicly exposed. Please submit a request if needed.",
        renderPosition: "resource_bottom",
        displayStyle: "small_note",
        sort: 700,
        enabled: "yes",
      },
    ],
  },
]);

console.log("✅ 泵系列数据库表格模板已创建完成");
