const fs = require("fs");
const path = require("path");

const outDir = path.join(
  process.cwd(),
  "data/products/generated/pumps/pipetting-pumps/detail"
);

const outFile = path.join(outDir, "index.json");

function spec(label, value) {
  return {
    label,
    name: label,
    title: label,
    value,
    content: value,
  };
}

function faq(question, answer) {
  return { question, answer };
}

function buildDetail(detail) {
  const specs = detail.specs || [];

  return {
    ...detail,
    advantages: [],
    specifications: specs,
    specificationGroups: [
      {
        title: "技术参数",
        items: specs,
      },
    ],
  };
}

const resourceBase = {
  imageDir: "/images/products/pumps/pipetting-pumps",
  modelDir: "/models/products/pumps/pipetting-pumps",
  drawingDir: "/documents/products/pumps/pipetting-pumps/2d-drawings",
};

const resourceFiles = {
  smtp2_1000ul: {
    image:
      "foreach-smtp2-1000ul-programmable-gas-displacement-pipetting-pump.webp",
    model3d:
      "foreach-smtp2-1000ul-programmable-gas-displacement-pipetting-pump.glb",
    drawing2d:
      "foreach-smtp2-1000ul-programmable-gas-displacement-pipetting-pump-2d-drawing.pdf",
    imageAltEn:
      "FOREACH SMTP2 1000μL programmable gas displacement pipetting pump for automated sample transfer and reagent dispensing",
  },
  smtp4_100ul: {
    image:
      "foreach-smtp4-100ul-gas-displacement-pipetting-pump.webp",
    model3d:
      "foreach-smtp4-100ul-gas-displacement-pipetting-pump.glb",
    drawing2d:
      "foreach-smtp4-100ul-gas-displacement-pipetting-pump-2d-drawing.pdf",
    imageAltEn:
      "FOREACH SMTP4 100μL gas displacement pipetting pump for small-volume automated pipetting",
  },
  smtp4_500ul: {
    image:
      "foreach-smtp4-500ul-gas-displacement-pipetting-pump.webp",
    model3d:
      "foreach-smtp4-500ul-gas-displacement-pipetting-pump.glb",
    drawing2d:
      "foreach-smtp4-500ul-gas-displacement-pipetting-pump-2d-drawing.pdf",
    imageAltEn:
      "FOREACH SMTP4 500μL gas displacement pipetting pump for automated sample transfer and reagent dispensing",
  },
};

function resources(key) {
  const file = resourceFiles[key];

  return {
    mainImage: `${resourceBase.imageDir}/${file.image}`,
    imageAltEn: file.imageAltEn,
    imageAlt: file.imageAltEn,
    mainImageAlt: file.imageAltEn,
    model3dUrl: `${resourceBase.modelDir}/${file.model3d}`,
    drawing2dUrl: `${resourceBase.drawingDir}/${file.drawing2d}`,
    drawingPdfUrl: `${resourceBase.drawingDir}/${file.drawing2d}`,
    resources: {
      model3dUrl: `${resourceBase.modelDir}/${file.model3d}`,
      drawing2dUrl: `${resourceBase.drawingDir}/${file.drawing2d}`,
      drawingPdfUrl: `${resourceBase.drawingDir}/${file.drawing2d}`,
      imageAltEn: file.imageAltEn,
    },
    plannedFiles: {
      mainImage: `public${resourceBase.imageDir}/${file.image}`,
      model3d: `public${resourceBase.modelDir}/${file.model3d}`,
      drawing2d: `public${resourceBase.drawingDir}/${file.drawing2d}`,
    },
  };
}

const details = [
  buildDetail({
    slug: "smtp2-1000ul",
    productId: "pipetting-smtp2-1000ul",
    productCode: "SMTP2-1000μL",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp2-programmable-gas-displacement-pipetting-pump",
    seriesSlug: "smtp2-programmable-gas-displacement-pipetting-pump",

    model: "SMTP2 1000μL 可编程气体置换式移液泵",
    name: "SMTP2 1000μL 可编程气体置换式移液泵",
    title: "SMTP2 1000μL 可编程气体置换式移液泵",
    modelDisplay: "SMTP2-1000μL",
    displayModel: "SMTP2-1000μL",
    foreachModel: "SMTP2-1000μL",

    description:
      "SMTP2 1000μL 可编程气体置换式移液泵面向自动化仪器中的样本转移、试剂加样和微量液体处理场景设计，采用气体置换式移液方式配合一次性吸头使用，可降低样本残留与交叉污染风险。该型号集成液面检测、尖端堵塞检测、吸头有无检测和自动脱吸头功能，并支持 RS232、RS485、CAN 通讯接口，适合需要稳定移液控制、状态反馈和系统集成的自动化平台。",

    commonApplications: [
      "自动化移液",
      "样本转移",
      "试剂加样",
      "微量液体处理",
      "实验室自动化设备集成",
      "体外诊断仪器液体处理模块"
    ],

    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,

    detailHref: "/products/pumps/pipetting-pumps/smtp2-1000ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp2-1000ul",

    ...resources("smtp2_1000ul"),

    specs: [
      spec("产品名称", "SMTP2 1000μL 可编程气体置换式移液泵"),
      spec("型号", "SMTP2-1000μL"),
      spec("产品系列", "SMTP2 可编程气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("标称量程", "1000μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("定量分辨率", "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步"),
      spec("满量程步数", "标准模式 3143 步；高分辨率模式 48000 微步"),
      spec("液面探测", "支持压力型 pLLD、电容型 cLLD、混合型 hLLD"),
      spec("尖端堵塞检测", "支持 TPBD 尖端堵塞检测"),
      spec("吸头有无检测", "支持 TPON / TPOFF 吸头有无检测"),
      spec("自动脱吸头", "支持 ADTP 自动脱吸头"),
      spec("通讯接口", "RS232 / RS485 / CAN"),
      spec("级联能力", "最多可级联 16 台泵"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行环境", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝"),
      spec("存储环境", "-20°C to 65°C，30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("吸头适配", "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认")
    ],

    faqs: [
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵适合哪些应用场景？",
        "SMTP2 1000μL 可编程气体置换式移液泵适用于自动化仪器中的样本转移、试剂加样、微量液体处理和实验室自动化设备集成，也可用于体外诊断仪器中的液体处理模块。"
      ),
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵为什么采用气体置换式移液方式？",
        "气体置换式移液方式可配合一次性吸头使用，使液体不直接接触泵体内部结构，有助于降低样本残留与交叉污染风险，适合对洁净度和重复性有要求的自动化移液场景。"
      ),
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵支持哪些检测功能？",
        "SMTP2 1000μL 可编程气体置换式移液泵支持液面检测、尖端堵塞检测、吸头有无检测等功能，可帮助系统判断吸液、排液和吸头状态，提升自动化运行过程的可靠性。"
      ),
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵支持哪些通讯接口？",
        "SMTP2 1000μL 可编程气体置换式移液泵支持 RS232、RS485、CAN 通讯接口，便于接入不同类型的自动化仪器控制系统。"
      ),
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵是否支持自动脱吸头？",
        "支持。SMTP2 1000μL 可编程气体置换式移液泵集成自动脱吸头功能，适合使用一次性吸头的自动化液体处理场景，可减少人工干预。"
      ),
      faq(
        "SMTP2 1000μL 可编程气体置换式移液泵的吸头是否可以定制适配？",
        "可以。吸头适配需要根据客户设备结构、吸头规格、装配空间和移液流程进行确认，后续可通过选型或需求提交进一步确认配置。"
      )
    ],

    seo: {
      title: "SMTP2 1000μL 可编程气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP2 1000μL 可编程气体置换式移液泵，支持液面检测、尖端堵塞检测、吸头有无检测、自动脱吸头和 RS232/RS485/CAN 通讯，适用于自动化样本转移、试剂加样和微量液体处理。"
    }
  }),

  buildDetail({
    slug: "smtp4-100ul",
    productId: "pipetting-smtp4-100ul",
    productCode: "SMTP4-100μL",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",

    model: "SMTP4 100μL 气体置换式移液泵",
    name: "SMTP4 100μL 气体置换式移液泵",
    title: "SMTP4 100μL 气体置换式移液泵",
    modelDisplay: "SMTP4-100μL",
    displayModel: "SMTP4-100μL",
    foreachModel: "SMTP4-100μL",

    description:
      "SMTP4 100μL 气体置换式移液泵面向自动化仪器中的小体积样本转移、试剂加样和微量液体处理场景设计，采用气体置换式移液方式配合一次性吸头使用，可降低样本残留与交叉污染风险。该型号适用于 100μL 量程的基础移液需求，支持自动脱吸头，吸头配置可根据客户设备结构和移液场景进行定制确认，适合对装配空间、移液稳定性和系统集成有要求的自动化平台。",

    commonApplications: [
      "小体积样本转移",
      "试剂加样",
      "自动化移液",
      "微量液体处理",
      "紧凑型仪器集成"
    ],

    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,

    detailHref: "/products/pumps/pipetting-pumps/smtp4-100ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp4-100ul",

    ...resources("smtp4_100ul"),

    specs: [
      spec("产品名称", "SMTP4 100μL 气体置换式移液泵"),
      spec("型号", "SMTP4-100μL"),
      spec("产品系列", "SMTP4 气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("标称量程", "100μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("电机转速", "1~3000 pps"),
      spec("定量分辨率", "0.05μL/步"),
      spec("适配吸头", "根据客户需求定制"),
      spec("装吸头所需力", "25 N"),
      spec("满量程步数", "2000 步"),
      spec("脱 TIP 头步数", "550 步"),
      spec("退 TIP 头推力", "转速 5 r/s 时退枪头电机推力大于 120 N"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行环境", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝"),
      spec("存储环境", "-20°C to 65°C，30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("总体尺寸", "28 × 28 × 153.1 mm"),
      spec("重量", "300 g")
    ],

    faqs: [
      faq(
        "SMTP4 100μL 气体置换式移液泵适合哪些应用场景？",
        "SMTP4 100μL 气体置换式移液泵适用于小体积样本转移、试剂加样、自动化移液和紧凑型仪器中的微量液体处理模块。"
      ),
      faq(
        "SMTP4 100μL 气体置换式移液泵为什么采用气体置换式移液方式？",
        "气体置换式移液方式可配合一次性吸头使用，使液体不直接接触泵体内部结构，有助于降低样本残留与交叉污染风险。"
      ),
      faq(
        "SMTP4 100μL 气体置换式移液泵的定量分辨率是多少？",
        "SMTP4 100μL 气体置换式移液泵的定量分辨率为 0.05μL/步，适合小体积液体处理场景。"
      ),
      faq(
        "SMTP4 100μL 气体置换式移液泵是否支持自动脱吸头？",
        "支持。该型号支持自动脱吸头功能，适合使用一次性吸头的自动化液体处理场景。"
      ),
      faq(
        "SMTP4 100μL 气体置换式移液泵的吸头是否可以定制适配？",
        "可以。吸头配置需要根据客户设备结构、吸头规格、装配空间和移液流程进行确认。"
      )
    ],

    seo: {
      title: "SMTP4 100μL 气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP4 100μL 气体置换式移液泵，定量分辨率 0.05μL/步，支持自动脱吸头和定制吸头适配，适用于小体积样本转移、试剂加样和自动化移液。"
    }
  }),

  buildDetail({
    slug: "smtp4-500ul",
    productId: "pipetting-smtp4-500ul",
    productCode: "SMTP4-500μL",
    category: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",

    model: "SMTP4 500μL 气体置换式移液泵",
    name: "SMTP4 500μL 气体置换式移液泵",
    title: "SMTP4 500μL 气体置换式移液泵",
    modelDisplay: "SMTP4-500μL",
    displayModel: "SMTP4-500μL",
    foreachModel: "SMTP4-500μL",

    description:
      "SMTP4 500μL 气体置换式移液泵面向自动化仪器中的样本转移、试剂加样和中等体积微量液体处理场景设计，采用气体置换式移液方式配合一次性吸头使用，可降低样本残留与交叉污染风险。该型号适用于 500μL 量程的移液需求，相比 100μL 配置覆盖更大的移液体积范围，支持自动脱吸头，吸头配置可根据客户设备结构和移液场景进行定制确认，适合需要稳定移液、结构集成和一次性吸头适配的自动化平台。",

    commonApplications: [
      "样本转移",
      "试剂加样",
      "自动化移液",
      "中等体积液体处理",
      "实验室自动化设备集成"
    ],

    additionalImages: [],
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,

    detailHref: "/products/pumps/pipetting-pumps/smtp4-500ul",
    selectionHref: "/products/pumps/pipetting-pumps",
    specSeriesKey: "smtp4-500ul",

    ...resources("smtp4_500ul"),

    specs: [
      spec("产品名称", "SMTP4 500μL 气体置换式移液泵"),
      spec("型号", "SMTP4-500μL"),
      spec("产品系列", "SMTP4 气体置换式移液泵"),
      spec("移液方式", "气体置换式"),
      spec("标称量程", "500μL"),
      spec("驱动设计", "四线双极步进丝杆电机"),
      spec("电机转速", "1~3000 pps"),
      spec("定量分辨率", "0.25μL/步"),
      spec("适配吸头", "根据客户需求定制"),
      spec("装吸头所需力", "30 N"),
      spec("满量程步数", "2000 步"),
      spec("脱 TIP 头步数", "550 步"),
      spec("退 TIP 头推力", "转速 5 r/s 时退枪头电机推力大于 120 N"),
      spec("运行噪音", "<60 dBA，仅室内使用"),
      spec("运行环境", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝"),
      spec("存储环境", "-20°C to 65°C，30% to 85% RH，无冷凝"),
      spec("介质温度", "15°C to 40°C"),
      spec("电源要求", "24VDC 500mA"),
      spec("总体尺寸", "28 × 28 × 153.1 mm"),
      spec("重量", "300 g")
    ],

    faqs: [
      faq(
        "SMTP4 500μL 气体置换式移液泵适合哪些应用场景？",
        "SMTP4 500μL 气体置换式移液泵适用于样本转移、试剂加样、自动化移液和中等体积液体处理场景。"
      ),
      faq(
        "SMTP4 500μL 气体置换式移液泵与 SMTP4 100μL 气体置换式移液泵有什么区别？",
        "主要区别是量程和定量分辨率不同。SMTP4 500μL 气体置换式移液泵覆盖更大的移液体积范围，适合中等体积样本转移和试剂加样。"
      ),
      faq(
        "SMTP4 500μL 气体置换式移液泵的定量分辨率是多少？",
        "SMTP4 500μL 气体置换式移液泵的定量分辨率为 0.25μL/步。"
      ),
      faq(
        "SMTP4 500μL 气体置换式移液泵是否支持自动脱吸头？",
        "支持。该型号支持自动脱吸头功能，适合使用一次性吸头的自动化液体处理场景。"
      ),
      faq(
        "SMTP4 500μL 气体置换式移液泵的吸头是否可以定制适配？",
        "可以。吸头配置需要根据客户设备结构、吸头规格、装配空间和移液流程进行确认。"
      )
    ],

    seo: {
      title: "SMTP4 500μL 气体置换式移液泵 | FOREACH",
      description:
        "FOREACH SMTP4 500μL 气体置换式移液泵，定量分辨率 0.25μL/步，支持自动脱吸头和定制吸头适配，适用于样本转移、试剂加样和中等体积自动化移液。"
    }
  })
];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(details, null, 2), "utf8");

console.log("generated:", outFile);
console.log("detail pages:");
details.forEach((item) => {
  console.log(`- ${item.slug} | ${item.model} | ${item.productCode}`);
  console.log(`  image: ${item.plannedFiles.mainImage}`);
  console.log(`  model3d: ${item.plannedFiles.model3d}`);
  console.log(`  drawing2d: ${item.plannedFiles.drawing2d}`);
});
