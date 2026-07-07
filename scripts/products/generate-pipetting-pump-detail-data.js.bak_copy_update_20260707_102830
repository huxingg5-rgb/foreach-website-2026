const fs = require("fs");
const path = require("path");

const outDir = path.join(
  process.cwd(),
  "data/products/generated/pumps/pipetting-pumps/detail"
);

const outFile = path.join(outDir, "index.json");

function spec(label, value) {
  return { label, name: label, title: label, value, content: value };
}

function faq(question, answer) {
  return { question, answer };
}

const commonApps = [
  "自动化移液",
  "样本转移",
  "试剂分配",
  "微量液体处理",
  "实验室自动化设备集成"
];

const mainImage =
  "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp";

const details = [
  {
    slug: "smtp2-1000ul",
    productId: "pipetting-smtp2-1000ul",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp2-programmable-gas-displacement-pipetting-pump",
    seriesSlug: "smtp2-programmable-gas-displacement-pipetting-pump",
    model: "SMTP2-1000 μL",
    name: "SMTP2 可编程气体置换式移液泵",
    title: "SMTP2-1000 μL 可编程气体置换式移液泵",
    description:
      "SMTP2-1000 μL 可编程气体置换式移液泵适用于自动化仪器中的样本转移、试剂分配和微量液体处理场景，可集成液面检测、尖端堵塞检测、吸头有无检测和自动脱吸头功能，支持独立运行或多泵级联。",
    advantages: [
      "可编程气体置换式移液",
      "支持多种液面检测方式",
      "支持尖端堵塞检测",
      "支持自动脱吸头",
      "可级联多达 16 台泵"
    ],
    commonApplications: commonApps,
    modelDisplay: "SMTP2-1000 μL",
    displayModel: "SMTP2-1000 μL",
    foreachModel: "SMTP2-1000 μL",
    mainImage,
    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: true,
    detailHref: "/products/pumps/pipetting-pumps/smtp2-1000ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp2-1000ul",
    model3dUrl: "",
    drawing2dUrl: "",
    resources: {
      model3dUrl: "",
      drawing2dUrl: ""
    },
    specs: [
      spec("产品系列", "SMTP2 可编程气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("量程", "1000 μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("液面探测", "压力型 pLLD / 电容型 cLLD / 混合型 hLLD"),
      spec("定量分辨率", "标准模式 0.319 μL/步；高分辨率模式 0.02 μL/微步"),
      spec("满量程步数", "标准模式 3143 步；高分辨率模式 48000 微步"),
      spec("尖端堵塞检测", "支持 TPBD"),
      spec("吸头有无检测", "支持 TPON / TPOFF"),
      spec("自动脱吸头", "支持 ADTP"),
      spec("通讯接口", "RS232 / RS485 / CAN"),
      spec("级联能力", "最多级联 16 台泵"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行温湿度", "15°C to 40°C and 20% to 95% RH at 40°C，无冷凝"),
      spec("存储温湿度", "-20°C to 65°C and 30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("适配吸头", "主流一次性吸头及定制吸头适配需根据客户设备结构确认")
    ],
    faqs: [
      faq(
        "SMTP2-1000 μL 适合哪些自动化液体处理场景？",
        "适合样本转移、试剂分配、微量液体处理和实验室自动化设备中的移液模块集成。"
      ),
      faq(
        "SMTP2 与 SMTP4 的主要区别是什么？",
        "SMTP2 集成液面检测、尖端堵塞检测、吸头有无检测和多通讯接口，适合需要检测闭环和系统联动的自动化平台。"
      ),
      faq(
        "SMTP2 是否支持多台泵级联？",
        "支持。SMTP2 可独立运行，也可根据系统需求级联多达 16 台泵。"
      )
    ],
    seo: {
      title: "SMTP2-1000 μL 可编程气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP2-1000 μL 可编程气体置换式移液泵，支持 LLD、TPBD、TPON/OFF、自动脱吸头和 RS232/RS485/CAN 通讯，适用于自动化移液和微量液体处理。"
    }
  },
  {
    slug: "smtp4-100ul",
    productId: "pipetting-smtp4-100ul",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",
    model: "SMTP4-100 μL",
    name: "SMTP4 气体置换式移液泵",
    title: "SMTP4-100 μL 气体置换式移液泵",
    description:
      "SMTP4-100 μL 气体置换式移液泵适用于自动化仪器中的小体积样本转移和试剂分配场景，采用气体置换方式配合一次性吸头使用，可降低样本残留与交叉污染风险，并支持自动脱吸头。",
    advantages: [
      "气体置换式移液",
      "适用于 100 μL 小体积配置",
      "定量分辨率 0.05 μL/步",
      "支持自动脱吸头",
      "吸头配置可根据客户需求定制"
    ],
    commonApplications: commonApps,
    modelDisplay: "SMTP4-100 μL",
    displayModel: "SMTP4-100 μL",
    foreachModel: "SMTP4-100 μL",
    mainImage,
    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: true,
    detailHref: "/products/pumps/pipetting-pumps/smtp4-100ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp4-100ul",
    model3dUrl: "",
    drawing2dUrl: "",
    resources: {
      model3dUrl: "",
      drawing2dUrl: ""
    },
    specs: [
      spec("产品系列", "SMTP4 气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("量程", "100 μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("电机转速", "1~3000 pps"),
      spec("定量分辨率", "0.05 μL/步"),
      spec("适配吸头", "根据客户需求定制"),
      spec("装吸头所需力", "25 N"),
      spec("满量程步数", "2000 步"),
      spec("脱 TIP 头步数", "550 步"),
      spec("退 TIP 头推力", "转速 5 r/s 时退枪头电机推力大于 120 N"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行温湿度", "15°C to 40°C and 20% to 95% RH at 40°C，无冷凝"),
      spec("存储温湿度", "-20°C to 65°C and 30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("总体尺寸", "28 × 28 × 153.1 mm"),
      spec("重量", "300 g")
    ],
    faqs: [
      faq(
        "SMTP4-100 μL 适合哪些移液场景？",
        "适合小体积样本转移、试剂分配和自动化仪器中的基础移液模块集成。"
      ),
      faq(
        "SMTP4-100 μL 是否支持自动脱吸头？",
        "支持。SMTP4 集成自动脱吸头功能，可用于一次性吸头场景。"
      ),
      faq(
        "SMTP4 的吸头是否可以定制适配？",
        "可以。吸头配置需根据客户设备结构、吸头规格和移液场景进行确认。"
      )
    ],
    seo: {
      title: "SMTP4-100 μL 气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP4-100 μL 气体置换式移液泵，定量分辨率 0.05 μL/步，支持自动脱吸头和定制吸头适配，适用于自动化小体积移液。"
    }
  },
  {
    slug: "smtp4-500ul",
    productId: "pipetting-smtp4-500ul",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",
    model: "SMTP4-500 μL",
    name: "SMTP4 气体置换式移液泵",
    title: "SMTP4-500 μL 气体置换式移液泵",
    description:
      "SMTP4-500 μL 气体置换式移液泵适用于自动化仪器中的样本转移、试剂分配和中等体积微量液体处理场景，采用气体置换方式配合一次性吸头使用，并支持自动脱吸头和定制吸头适配。",
    advantages: [
      "气体置换式移液",
      "适用于 500 μL 配置",
      "定量分辨率 0.25 μL/步",
      "支持自动脱吸头",
      "吸头配置可根据客户需求定制"
    ],
    commonApplications: commonApps,
    modelDisplay: "SMTP4-500 μL",
    displayModel: "SMTP4-500 μL",
    foreachModel: "SMTP4-500 μL",
    mainImage,
    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: true,
    detailHref: "/products/pumps/pipetting-pumps/smtp4-500ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp4-500ul",
    model3dUrl: "",
    drawing2dUrl: "",
    resources: {
      model3dUrl: "",
      drawing2dUrl: ""
    },
    specs: [
      spec("产品系列", "SMTP4 气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("量程", "500 μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("电机转速", "1~3000 pps"),
      spec("定量分辨率", "0.25 μL/步"),
      spec("适配吸头", "根据客户需求定制"),
      spec("装吸头所需力", "30 N"),
      spec("满量程步数", "2000 步"),
      spec("脱 TIP 头步数", "550 步"),
      spec("退 TIP 头推力", "转速 5 r/s 时退枪头电机推力大于 120 N"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行温湿度", "15°C to 40°C and 20% to 95% RH at 40°C，无冷凝"),
      spec("存储温湿度", "-20°C to 65°C and 30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("总体尺寸", "28 × 28 × 153.1 mm"),
      spec("重量", "300 g")
    ],
    faqs: [
      faq(
        "SMTP4-500 μL 适合哪些移液场景？",
        "适合样本转移、试剂分配和自动化仪器中的中等体积移液模块集成。"
      ),
      faq(
        "SMTP4-500 μL 与 SMTP4-100 μL 的主要区别是什么？",
        "主要区别是量程和定量分辨率不同。SMTP4-500 μL 的量程为 500 μL，定量分辨率为 0.25 μL/步。"
      ),
      faq(
        "SMTP4-500 μL 是否支持定制吸头适配？",
        "支持。吸头配置需根据客户设备结构、吸头规格和移液场景进行确认。"
      )
    ],
    seo: {
      title: "SMTP4-500 μL 气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP4-500 μL 气体置换式移液泵，定量分辨率 0.25 μL/步，支持自动脱吸头和定制吸头适配，适用于自动化样本转移和试剂分配。"
    }
  }
];

for (const detail of details) {
  detail.specifications = detail.specs;
  detail.specificationGroups = [
    {
      title: "技术参数",
      items: detail.specs
    }
  ];
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(details, null, 2), "utf8");

console.log("generated:", outFile);
console.log("detail pages:", details.map((item) => item.slug).join(", "));
