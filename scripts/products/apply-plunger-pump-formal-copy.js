const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到泵系列数据源：" + file);
}

const wb = XLSX.readFile(file);

function readSheet(name) {
  return XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: "" });
}

function writeSheet(name, rows) {
  wb.Sheets[name] = XLSX.utils.json_to_sheet(rows);
}

function text(value) {
  return String(value || "").trim();
}

function upsertRows(rows, keyFields, nextRows) {
  const result = [...rows];

  for (const next of nextRows) {
    const index = result.findIndex((row) =>
      keyFields.every((key) => text(row[key]) === text(next[key]))
    );

    if (index >= 0) {
      result[index] = {
        ...result[index],
        ...next,
      };
    } else {
      result.push(next);
    }
  }

  return result;
}

/* =========================================================
   04_详情页首屏
========================================================= */

let heroRows = readSheet("04_详情页首屏");

heroRows = upsertRows(heroRows, ["productId"], [
  {
    productId: "ea-100-pmma",
    titleZh: "EA-100-PMMA 柱塞泵",
    titleEn: "100 µL PMMA Plunger Pump for Precision Dispensing",
    detailMode: "custom_inquiry",
    showModel: "no",
    displayModel: "EA-100-PMMA",
    customNoticeZh: "柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。",
    customNoticeEn: "Plunger pumps are custom-engineered products. Pump head material, volume range, interface, valve configuration, and control method should be confirmed according to the application. Please contact us or submit your requirements for solution evaluation.",
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
    customNoticeZh: "柱塞泵为定制化产品，最终配置需结合分配容量、液体介质、阀路结构和仪器空间进行确认。",
    customNoticeEn: "Plunger pumps are custom-engineered products. Final configuration should be confirmed based on dispensing volume, liquid media, valve layout, and instrument space.",
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
    customNoticeZh: "SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。",
    customNoticeEn: "SM miniature plunger pumps are designed for compact fluidic systems. Volume, material, interface, and control configuration should be confirmed according to the instrument layout.",
    primaryButtonZh: "联系我们",
    primaryButtonEn: "Contact Us",
    primaryButtonHref: "/contact",
    secondaryButtonZh: "提交需求表单",
    secondaryButtonEn: "Submit Requirements",
    secondaryButtonHref: "/contact",
    showAddToList: "no",
    showModelFilter: "no",
  },
]);

writeSheet("04_详情页首屏", heroRows);

/* =========================================================
   05_SEO与HTML标记
========================================================= */

let seoRows = readSheet("05_SEO与HTML标记");

seoRows = upsertRows(seoRows, ["productId", "locale"], [
  {
    productId: "ea-100-pmma",
    locale: "zh",
    titleTag: "EA-100-PMMA 柱塞泵｜精密液体分配泵｜恒永达 FOREACH",
    metaDescription: "EA-100-PMMA 柱塞泵适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的微量液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。",
    h1: "EA-100-PMMA 柱塞泵",
    canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
    robots: "index,follow",
    ogTitle: "EA-100-PMMA 柱塞泵",
    ogDescription: "面向自动化分析仪器液路系统的定制化精密柱塞泵方案。",
  },
  {
    productId: "ea-100-pmma",
    locale: "en",
    titleTag: "100 µL PMMA Plunger Pump for Precision Dispensing | FOREACH",
    metaDescription: "100 µL PMMA plunger pump for precision aspiration, dispensing, and liquid transfer in automated analyzers, IVD instruments, and custom fluidic systems.",
    h1: "100 µL PMMA Plunger Pump for Precision Dispensing",
    canonicalPath: "/products/pumps/plunger-pumps/ea-100-pmma",
    robots: "index,follow",
    ogTitle: "100 µL PMMA Plunger Pump for Precision Dispensing",
    ogDescription: "Custom-engineered plunger pump solution for precision liquid handling and automated fluidic integration.",
  },
  {
    productId: "ea-250-pmma",
    locale: "zh",
    titleTag: "EA-250-PMMA 柱塞泵｜中小容量精密分配泵｜恒永达 FOREACH",
    metaDescription: "EA-250-PMMA 柱塞泵适用于自动化分析仪器中的中小容量液体分配、试剂转移和液路模块集成，最终配置需根据应用确认。",
    h1: "EA-250-PMMA 柱塞泵",
    canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
    robots: "index,follow",
    ogTitle: "EA-250-PMMA 柱塞泵",
    ogDescription: "适用于中小容量精密液体分配和自动化液路模块集成的定制柱塞泵方案。",
  },
  {
    productId: "ea-250-pmma",
    locale: "en",
    titleTag: "250 µL PMMA Plunger Pump for Precision Dispensing | FOREACH",
    metaDescription: "250 µL PMMA plunger pump for reagent dispensing, sample transfer, and fluidic module integration in automated analytical instruments.",
    h1: "250 µL PMMA Plunger Pump for Precision Dispensing",
    canonicalPath: "/products/pumps/plunger-pumps/ea-250-pmma",
    robots: "index,follow",
    ogTitle: "250 µL PMMA Plunger Pump for Precision Dispensing",
    ogDescription: "Custom plunger pump solution for medium-small volume precision liquid handling and instrument integration.",
  },
  {
    productId: "sm-100-pmma",
    locale: "zh",
    titleTag: "SM-100-PMMA 微型柱塞泵｜紧凑型液路系统用泵｜恒永达 FOREACH",
    metaDescription: "SM-100-PMMA 微型柱塞泵适用于空间紧凑型自动化仪器中的微量液体吸排、分配和转移，支持定制化液路集成。",
    h1: "SM-100-PMMA 微型柱塞泵",
    canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
    robots: "index,follow",
    ogTitle: "SM-100-PMMA 微型柱塞泵",
    ogDescription: "适用于紧凑型自动化仪器和小型液路模块的微型柱塞泵方案。",
  },
  {
    productId: "sm-100-pmma",
    locale: "en",
    titleTag: "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems | FOREACH",
    metaDescription: "100 µL miniature PMMA plunger pump for compact automated instruments, micro-volume liquid handling, and custom fluidic integration.",
    h1: "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems",
    canonicalPath: "/products/pumps/plunger-pumps/sm-100-pmma",
    robots: "index,follow",
    ogTitle: "100 µL Miniature PMMA Plunger Pump for Compact Fluidic Systems",
    ogDescription: "Miniature custom plunger pump solution for compact fluidic systems and micro-volume dispensing.",
  },
]);

writeSheet("05_SEO与HTML标记", seoRows);

/* =========================================================
   06_页面模块与标题
========================================================= */

let sectionRows = readSheet("06_页面模块与标题");

const products = [
  {
    productId: "ea-100-pmma",
    zhLead: "面向自动化分析仪器中的微量液体分配需求，提供稳定、可定制的 EA 系列柱塞泵方案。",
    enLead: "A customizable EA series plunger pump solution for micro-volume liquid handling in automated analytical instruments.",
  },
  {
    productId: "ea-250-pmma",
    zhLead: "面向中小容量液体分配、试剂转移和液路模块集成需求，提供可定制的 EA 系列柱塞泵方案。",
    enLead: "A customizable EA series plunger pump solution for medium-small volume dispensing, reagent transfer, and fluidic module integration.",
  },
  {
    productId: "sm-100-pmma",
    zhLead: "面向空间紧凑型自动化仪器，提供小体积结构下的微量液体分配方案。",
    enLead: "A miniature plunger pump solution for micro-volume liquid handling in compact automated instruments.",
  },
];

const sectionDefaults = [];

for (const item of products) {
  sectionDefaults.push(
    {
      productId: item.productId,
      locale: "zh",
      sectionKey: "features",
      headingLevel: "h2",
      headingText: "产品特点",
      leadText: item.zhLead,
      renderComponent: "feature_cards",
      sort: 100,
      enabled: "yes",
    },
    {
      productId: item.productId,
      locale: "zh",
      sectionKey: "applications",
      headingLevel: "label",
      headingText: "常见应用：",
      leadText: "",
      renderComponent: "application_summary",
      sort: 150,
      enabled: "yes",
    },
    {
      productId: item.productId,
      locale: "zh",
      sectionKey: "spec_tab",
      headingLevel: "tab",
      headingText: "规格",
      leadText: "",
      renderComponent: "spec_tab",
      sort: 210,
      enabled: "yes",
    },
    {
      productId: item.productId,
      locale: "zh",
      sectionKey: "model3d_tab",
      headingLevel: "tab",
      headingText: "3D模型",
      leadText: "",
      renderComponent: "model3d_tab",
      sort: 220,
      enabled: "yes",
    },
    {
      productId: item.productId,
      locale: "zh",
      sectionKey: "drawing_tab",
      headingLevel: "tab",
      headingText: "零件图",
      leadText: "",
      renderComponent: "drawing_tab",
      sort: 230,
      enabled: "yes",
    },
    {
      productId: item.productId,
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
      productId: item.productId,
      locale: "en",
      sectionKey: "features",
      headingLevel: "h2",
      headingText: "Product Features",
      leadText: item.enLead,
      renderComponent: "feature_cards",
      sort: 100,
      enabled: "yes",
    },
    {
      productId: item.productId,
      locale: "en",
      sectionKey: "faq",
      headingLevel: "h2",
      headingText: "FAQ",
      leadText: "Common questions about plunger pump customization, material selection, and engineering confirmation.",
      renderComponent: "faq_list",
      sort: 400,
      enabled: "yes",
    }
  );
}

sectionRows = upsertRows(sectionRows, ["productId", "locale", "sectionKey"], sectionDefaults);
writeSheet("06_页面模块与标题", sectionRows);

/* =========================================================
   08_详情页正文
========================================================= */

let bodyRows = readSheet("08_详情页正文");

bodyRows = upsertRows(bodyRows, ["productId"], [
  {
    productId: "ea-100-pmma",
    descriptionZh: "EA-100-PMMA 柱塞泵用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。",
    descriptionEn: "The 100 µL PMMA plunger pump is designed for precision aspiration, dispensing, and liquid transfer in automated instruments. It is a custom-engineered pump solution, and the final structure, materials, interfaces, valve configuration, and control method are confirmed according to the application.",
    advantagesZh: "适用于微量液体精密分配|支持泵头材料、接口和阀路搭配定制|可配合控制器、光耦和电磁阀集成|适用于自动化分析仪器液路系统",
    advantagesEn: "Suitable for precision micro-volume dispensing|Supports pump head material, interface, and valve configuration customization|Can be integrated with controllers, optical sensors, and solenoid valves|Designed for automated analytical fluidic systems",
    commonApplicationsZh: "IVD 分析仪|实验室自动化设备|生命科学仪器|分析仪器液路模块",
    commonApplicationsEn: "IVD analyzers|Laboratory automation systems|Life science instruments|Analytical instrument fluidic modules",
  },
  {
    productId: "ea-250-pmma",
    descriptionZh: "EA-250-PMMA 柱塞泵适用于自动化仪器中的中小容量液体分配、试剂转移和液路模块集成。具体结构、材料、接口和控制方式需根据样本、试剂及整机布局进行确认。",
    descriptionEn: "The 250 µL PMMA plunger pump is suitable for medium-small volume liquid dispensing, reagent transfer, and fluidic module integration in automated instruments. Structure, materials, interfaces, and control method should be confirmed according to the sample, reagent, and instrument layout.",
    advantagesZh: "适用于中小容量精密液体分配|支持多种泵头材料和接口方案|可与阀、控制器和传感器组成集成液路模块|适用于自动化检测设备和分析仪器",
    advantagesEn: "Suitable for medium-small volume precision dispensing|Supports multiple pump head materials and interface options|Can be integrated with valves, controllers, and sensors as a fluidic module|Designed for automated testing equipment and analytical instruments",
    commonApplicationsZh: "IVD 分析仪|试剂分配模块|样本转移模块|实验室自动化设备",
    commonApplicationsEn: "IVD analyzers|Reagent dispensing modules|Sample transfer modules|Laboratory automation systems",
  },
  {
    productId: "sm-100-pmma",
    descriptionZh: "SM-100-PMMA 微型柱塞泵适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。",
    descriptionEn: "The 100 µL miniature PMMA plunger pump is designed for space-limited automated equipment and compact fluidic systems requiring micro-volume aspiration, dispensing, and transfer. Final configuration should be confirmed according to instrument space, fluidic routing, and control method.",
    advantagesZh: "适用于紧凑型仪器空间|支持微量液体吸排与分配|可根据液路结构进行定制集成|适用于小型自动化检测模块",
    advantagesEn: "Designed for compact instrument layouts|Supports micro-volume aspiration and dispensing|Can be customized according to fluidic structure|Suitable for small automated testing modules",
    commonApplicationsZh: "紧凑型 IVD 设备|小型液路模块|实验室自动化设备|生命科学仪器",
    commonApplicationsEn: "Compact IVD instruments|Small fluidic modules|Laboratory automation systems|Life science instruments",
  },
]);

writeSheet("08_详情页正文", bodyRows);

/* =========================================================
   07_选型卡片
========================================================= */

let cardRows = readSheet("07_选型卡片");

cardRows = upsertRows(cardRows, ["productId"], [
  {
    productId: "ea-100-pmma",
    pumpTypeSlug: "plunger-pumps",
    seriesSlug: "ea-standard-piston-pumps",
    cardTitleZh: "EA-100-PMMA 柱塞泵",
    cardTitleEn: "100 µL PMMA Plunger Pump",
    cardSubtitleZh: "微量精密分配与自动化液路集成",
    cardSubtitleEn: "Micro-volume precision dispensing and fluidic integration",
    cardDescriptionZh: "适用于 IVD 分析仪、实验室自动化设备和分析仪器中的微量吸排、分配和转移任务。",
    cardDescriptionEn: "Suitable for micro-volume aspiration, dispensing, and transfer tasks in IVD analyzers, laboratory automation systems, and analytical instruments.",
    cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：定制柱塞泵",
    cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Custom plunger pump",
    cardBadges: "Custom|100 µL|PMMA",
    cardImage: "/images/products/pumps/plunger-pump/ea/ea-100-pmma-card.webp",
    detailHref: "/products/pumps/plunger-pumps/ea-100-pmma",
    databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-100-pmma",
    showInSelection: "yes",
    sort: 100,
  },
  {
    productId: "ea-250-pmma",
    pumpTypeSlug: "plunger-pumps",
    seriesSlug: "ea-standard-piston-pumps",
    cardTitleZh: "EA-250-PMMA 柱塞泵",
    cardTitleEn: "250 µL PMMA Plunger Pump",
    cardSubtitleZh: "中小容量精密分配与液路模块集成",
    cardSubtitleEn: "Medium-small volume dispensing and fluidic module integration",
    cardDescriptionZh: "适用于自动化分析仪器中的试剂分配、样本转移和中小容量液体处理任务。",
    cardDescriptionEn: "Suitable for reagent dispensing, sample transfer, and medium-small volume liquid handling tasks in automated analytical instruments.",
    cardSpecsZh: "容量：250 µL|泵头材料：PMMA|类型：定制柱塞泵",
    cardSpecsEn: "Volume: 250 µL|Pump head: PMMA|Type: Custom plunger pump",
    cardBadges: "Custom|250 µL|PMMA",
    cardImage: "/images/products/pumps/plunger-pump/ea/ea-250-pmma-card.webp",
    detailHref: "/products/pumps/plunger-pumps/ea-250-pmma",
    databasePreviewHref: "/products/pumps-db/plunger-pumps/ea-standard-piston-pumps/ea-250-pmma",
    showInSelection: "yes",
    sort: 110,
  },
  {
    productId: "sm-100-pmma",
    pumpTypeSlug: "plunger-pumps",
    seriesSlug: "sm-miniature-piston-pumps",
    cardTitleZh: "SM-100-PMMA 微型柱塞泵",
    cardTitleEn: "100 µL Miniature PMMA Plunger Pump",
    cardSubtitleZh: "紧凑型仪器用微量液体分配方案",
    cardSubtitleEn: "Micro-volume dispensing for compact instruments",
    cardDescriptionZh: "适用于空间受限的自动化设备和紧凑型液路系统中的微量吸排、分配和转移。",
    cardDescriptionEn: "Suitable for micro-volume aspiration, dispensing, and transfer in space-limited automated instruments and compact fluidic systems.",
    cardSpecsZh: "容量：100 µL|泵头材料：PMMA|类型：微型定制柱塞泵",
    cardSpecsEn: "Volume: 100 µL|Pump head: PMMA|Type: Miniature custom plunger pump",
    cardBadges: "Custom|Miniature|PMMA",
    cardImage: "/images/products/pumps/plunger-pump/sm/sm-100-pmma-card.webp",
    detailHref: "/products/pumps/plunger-pumps/sm-100-pmma",
    databasePreviewHref: "/products/pumps-db/plunger-pumps/sm-miniature-piston-pumps/sm-100-pmma",
    showInSelection: "yes",
    sort: 200,
  },
]);

writeSheet("07_选型卡片", cardRows);

XLSX.writeFile(wb, file);

console.log("✅ 已将柱塞泵基础正式文案写入泵系列 xlsx 数据源");