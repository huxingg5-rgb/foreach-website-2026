const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
  console.log("已确认文件夹:", rel);
}

function write(rel, content) {
  const full = p(rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });

  if (fs.existsSync(full)) {
    const bak = full + ".bak.syringe-detail";
    if (!fs.existsSync(bak)) {
      fs.copyFileSync(full, bak);
      console.log("已备份:", rel + ".bak.syringe-detail");
    }
  }

  fs.writeFileSync(full, content, "utf8");
  console.log("已写入:", rel);
}

ensureDir("data/products/generated/pumps/syringe-pumps/detail");
ensureDir("app/products/pumps/syringe-pumps/[slug]");
ensureDir("public/images/products/pumps/syringe-pumps");
ensureDir("public/documents/products/pumps/syringe-pumps/2d-drawings");
ensureDir("public/models/products/pumps/syringe-pumps");

const details = [
  {
    slug: "hmd3-30mm-solenoid-syringe-pump",
    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: "HMD3 30mm 电磁阀注射泵",
    h1Title: "HMD3 30mm 电磁阀注射泵",
    pageTitle: "HMD3 30mm 电磁阀注射泵",
    name: "HMD3 30mm 电磁阀注射泵",
    model: "HMD3 30mm 电磁阀注射泵",

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    description:
      "HMD3 30mm 电磁阀注射泵是一款面向小体积精密液体处理的单通道注射泵配置，采用 30mm 行程结构，可适配 50μL–5mL 玻璃注射器，适合对加液体积、结构尺寸和液路控制稳定性有要求的自动化仪器集成。\n\n该系列可根据项目需求配置 2端口、3端口及分配阀结构，支持 RS-232、RS-485、CAN 通讯方式，并可围绕端口形式、注射器规格、安装尺寸和液路连接方式进行定制确认。",

    commonApplications: [
      "小体积试剂加注",
      "样本定量分配",
      "校准液输送",
      "紧凑型分析仪器液路模块",
      "单通道液体处理单元"
    ],

    specifications: [
      { label: "产品系列", value: "HMD3 电磁阀系列注射泵" },
      { label: "阀结构", value: "电磁阀" },
      { label: "行程", value: "30mm" },
      { label: "通道配置", value: "单通道" },
      { label: "阀门配置", value: "2端口 / 3端口 / 3端口分配" },
      { label: "适配注射器", value: "50μL–5mL 玻璃注射器" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "标准接口", value: "1/4-28 UNF" },
      { label: "配置方式", value: "定制配置" }
    ],

    optionalConfigurations: [
      { label: "端口形式", value: "2端口 / 3端口 / 3端口分配" },
      { label: "注射器规格", value: "50μL–5mL" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "安装结构", value: "按项目确认" }
    ],

    faq: [
      {
        question: "HMD3 注射泵适合哪些配置需求？",
        answer: "HMD3 适合 30mm 行程、单通道、小体积精密加液和紧凑型液路集成需求，可根据项目确认端口形式和注射器规格。"
      },
      {
        question: "注射泵可以定制通道数和端口形式吗？",
        answer: "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"
      },
      {
        question: "注射泵支持哪些通讯方式？",
        answer: "可支持 RS-232、RS-485、CAN 等通讯方式，具体控制协议和接口形式可根据项目需求确认。"
      },
      {
        question: "是否可以提供 2D 图纸或 3D 模型？",
        answer: "可以。可根据选型需求提供 2D 图纸或 3D 模型，用于设备布局、结构验证和液路集成评估。"
      },
      {
        question: "如何确认具体型号配置？",
        answer: "建议根据注射器规格、加液量程、通道数量、阀门结构、安装空间和通讯方式提交需求，由工程师协助确认配置。"
      }
    ],

    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",
    additionalImages: [
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump-01.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump-02.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump-03.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump-04.webp"
    ],
    images: [],
    thumbnails: [],

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    drawingPdf: "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hmd3-solenoid-valve-syringe-pump-2d-drawing.pdf",
    model3d: "/models/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.glb",

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: "/products/pumps/syringe-pumps/hmd3-30mm-solenoid-syringe-pump"
  },
  {
    slug: "hmd6-60mm-solenoid-syringe-pump",
    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: "HMD6 60mm 电磁阀注射泵",
    h1Title: "HMD6 60mm 电磁阀注射泵",
    pageTitle: "HMD6 60mm 电磁阀注射泵",
    name: "HMD6 60mm 电磁阀注射泵",
    model: "HMD6 60mm 电磁阀注射泵",

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    description:
      "HMD6 60mm 电磁阀注射泵是一款 60mm 行程的电磁阀系列注射泵，支持 1–8 通道配置，可适配 25μL–25mL 玻璃注射器，适合中大量程定量输送、多通道加液和自动化液路模块集成。\n\n该系列可根据设备布局和液路需求选择不同通道数量、端口形式和阀门配置，支持 RS-232、RS-485、CAN 通讯方式；多通道配置、注射器规格和安装结构需结合项目空间和输送量程进一步确认。",

    commonApplications: [
      "多通道试剂加注",
      "中大量程定量输送",
      "自动化液路模块",
      "多通道样本处理",
      "试剂输送与清洗液分配"
    ],

    specifications: [
      { label: "产品系列", value: "HMD6 电磁阀系列注射泵" },
      { label: "阀结构", value: "电磁阀" },
      { label: "行程", value: "60mm" },
      { label: "通道配置", value: "1 / 2 / 3 / 4 / 6 / 8 通道" },
      { label: "阀门配置", value: "2端口 / 3端口 / 3端口分配" },
      { label: "适配注射器", value: "25μL–25mL 玻璃注射器" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "标准接口", value: "1/4-28 UNF" },
      { label: "配置方式", value: "定制配置" },
      { label: "备注", value: "多通道配置下，10mL 和 25mL 注射器需结合具体结构进一步确认" }
    ],

    optionalConfigurations: [
      { label: "通道数", value: "1 / 2 / 3 / 4 / 6 / 8 通道" },
      { label: "端口形式", value: "2端口 / 3端口 / 3端口分配" },
      { label: "注射器规格", value: "25μL–25mL" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "安装结构", value: "按项目确认" }
    ],

    faq: [
      {
        question: "HMD6 是否支持多通道配置？",
        answer: "HMD6 系列可支持 1、2、3、4、6、8 通道配置，具体通道数量需结合设备空间、注射器规格和液路结构确认。"
      },
      {
        question: "注射泵可以定制通道数和端口形式吗？",
        answer: "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。"
      },
      {
        question: "注射泵支持哪些通讯方式？",
        answer: "可支持 RS-232、RS-485、CAN 等通讯方式，具体控制协议和接口形式可根据项目需求确认。"
      },
      {
        question: "是否可以提供 2D 图纸或 3D 模型？",
        answer: "可以。可根据选型需求提供 2D 图纸或 3D 模型，用于设备布局、结构验证和液路集成评估。"
      },
      {
        question: "如何确认具体型号配置？",
        answer: "建议根据注射器规格、加液量程、通道数量、阀门结构、安装空间和通讯方式提交需求，由工程师协助确认配置。"
      }
    ],

    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",
    additionalImages: [
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump-01.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump-02.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump-03.webp",
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump-04.webp"
    ],
    images: [],
    thumbnails: [],

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    drawingPdf: "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hmd6-solenoid-valve-syringe-pump-2d-drawing.pdf",
    model3d: "/models/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.glb",

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: "/products/pumps/syringe-pumps/hmd6-60mm-solenoid-syringe-pump"
  },
  {
    slug: "hld3-30mm-rotary-valve-syringe-pump",
    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: "HLD3 30mm 旋转阀注射泵",
    h1Title: "HLD3 30mm 旋转阀注射泵",
    pageTitle: "HLD3 30mm 旋转阀注射泵",
    name: "HLD3 30mm 旋转阀注射泵",
    model: "HLD3 30mm 旋转阀注射泵",

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    description:
      "HLD3 30mm 旋转阀注射泵是一款 30mm 行程的多端口液路切换型注射泵，可适配 50μL–5mL 玻璃注射器，适合小体积定量分配、多端口试剂切换和样本转移等液路控制需求。\n\n该系列支持平面转阀或柱面转阀结构，可配置 3通非分配阀、3通分配阀和 9通分配阀等阀位形式，并可根据液路数量、切换逻辑、接口方式和安装空间进行定制确认。",

    commonApplications: [
      "小体积试剂分配",
      "多端口液路切换",
      "样本转移",
      "试剂选择阀集成",
      "小型分析仪器流路控制"
    ],

    specifications: [
      { label: "产品系列", value: "HLD3 旋转阀系列注射泵" },
      { label: "阀结构", value: "平面转阀 / 柱面转阀" },
      { label: "行程", value: "30mm" },
      { label: "通道配置", value: "单通道" },
      { label: "阀门配置", value: "3通非分配 / 3通分配 / 9通分配" },
      { label: "适配注射器", value: "50μL–5mL 玻璃注射器" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "标准接口", value: "1/4-28 UNF" },
      { label: "配置方式", value: "定制配置" }
    ],

    optionalConfigurations: [
      { label: "旋转阀结构", value: "平面转阀 / 柱面转阀" },
      { label: "阀位结构", value: "3通非分配 / 3通分配 / 9通分配" },
      { label: "注射器规格", value: "50μL–5mL" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "安装结构", value: "按项目确认" }
    ],

    faq: [
      {
        question: "HLD3 旋转阀系列可以配置哪些阀位？",
        answer: "HLD3 系列可根据项目需求配置 3通非分配阀、3通分配阀和 9通分配阀等结构，用于液路切换和试剂分配。"
      },
      {
        question: "旋转阀系列适合什么类型的液路需求？",
        answer: "旋转阀系列适合多端口液路切换、试剂选择、定量分配和样本转移等需要多阀位控制的液路系统。"
      },
      {
        question: "注射泵支持哪些通讯方式？",
        answer: "可支持 RS-232、RS-485、CAN 等通讯方式，具体控制协议和接口形式可根据项目需求确认。"
      },
      {
        question: "是否可以提供 2D 图纸或 3D 模型？",
        answer: "可以。可根据选型需求提供 2D 图纸或 3D 模型，用于设备布局、结构验证和液路集成评估。"
      },
      {
        question: "如何确认具体型号配置？",
        answer: "建议根据注射器规格、加液量程、通道数量、阀门结构、安装空间和通讯方式提交需求，由工程师协助确认配置。"
      }
    ],

    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",
    additionalImages: [
      "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump-01.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump-02.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump-03.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump-04.webp"
    ],
    images: [],
    thumbnails: [],

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    drawingPdf: "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hld3-rotary-valve-syringe-pump-2d-drawing.pdf",
    model3d: "/models/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.glb",

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: "/products/pumps/syringe-pumps/hld3-30mm-rotary-valve-syringe-pump"
  },
  {
    slug: "hld6-60mm-rotary-valve-syringe-pump",
    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: "HLD6 60mm 旋转阀注射泵",
    h1Title: "HLD6 60mm 旋转阀注射泵",
    pageTitle: "HLD6 60mm 旋转阀注射泵",
    name: "HLD6 60mm 旋转阀注射泵",
    model: "HLD6 60mm 旋转阀注射泵",

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    description:
      "HLD6 60mm 旋转阀注射泵是一款 60mm 行程的多端口旋转阀注射泵，可适配 25μL–25mL 玻璃注射器，适合中大量程定量输送、多端口试剂分配和复杂液路切换需求。\n\n该系列覆盖 HLD6 / HLD6M 相关配置，可根据项目需求配置 3通非分配阀、5通分配阀和 9通分配阀等旋转阀结构，并支持围绕阀位数量、端口形式、安装尺寸、通讯方式和系统集成方式进行定制确认。",

    commonApplications: [
      "多端口试剂分配",
      "中大量程液体输送",
      "复杂液路切换",
      "多试剂选择与分配",
      "自动化仪器液路集成"
    ],

    specifications: [
      { label: "产品系列", value: "HLD6 / HLD6M 旋转阀系列注射泵" },
      { label: "阀结构", value: "平面转阀 / 柱面转阀" },
      { label: "行程", value: "60mm" },
      { label: "通道配置", value: "单通道" },
      { label: "阀门配置", value: "3通非分配 / 5通分配 / 9通分配" },
      { label: "适配注射器", value: "25μL–25mL 玻璃注射器" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "标准接口", value: "1/4-28 UNF" },
      { label: "配置方式", value: "定制配置" }
    ],

    optionalConfigurations: [
      { label: "覆盖系列", value: "HLD6 / HLD6M" },
      { label: "旋转阀结构", value: "平面转阀 / 柱面转阀" },
      { label: "阀位结构", value: "3通非分配 / 5通分配 / 9通分配" },
      { label: "注射器规格", value: "25μL–25mL" },
      { label: "通讯方式", value: "RS-232 / RS-485 / CAN" },
      { label: "安装结构", value: "按项目确认" }
    ],

    faq: [
      {
        question: "HLD6 是否覆盖 HLD6M 配置？",
        answer: "该页面用于承接 HLD6 / HLD6M 相关 60mm 旋转阀系列配置，具体结构需根据阀位数量、端口形式和安装空间确认。"
      },
      {
        question: "旋转阀系列可以配置哪些阀位？",
        answer: "HLD 旋转阀系列可根据项目需求配置 3通、5通、9通等多端口阀位结构，用于液路切换和试剂分配。"
      },
      {
        question: "注射泵支持哪些通讯方式？",
        answer: "可支持 RS-232、RS-485、CAN 等通讯方式，具体控制协议和接口形式可根据项目需求确认。"
      },
      {
        question: "是否可以提供 2D 图纸或 3D 模型？",
        answer: "可以。可根据选型需求提供 2D 图纸或 3D 模型，用于设备布局、结构验证和液路集成评估。"
      },
      {
        question: "如何确认具体型号配置？",
        answer: "建议根据注射器规格、加液量程、通道数量、阀门结构、安装空间和通讯方式提交需求，由工程师协助确认配置。"
      }
    ],

    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp",
    additionalImages: [
      "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump-01.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump-02.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump-03.webp",
      "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump-04.webp"
    ],
    images: [],
    thumbnails: [],

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    drawingPdf: "/documents/products/pumps/syringe-pumps/2d-drawings/foreach-hld6-rotary-valve-syringe-pump-2d-drawing.pdf",
    model3d: "/models/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.glb",

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: "/products/pumps/syringe-pumps/hld6-60mm-rotary-valve-syringe-pump"
  }
];

write(
  "data/products/generated/pumps/syringe-pumps/detail/index.json",
  JSON.stringify(details, null, 2)
);

const pageTsx = `import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";

type Detail = (typeof syringePumpDetails)[number];

function toClientData(detail: Detail) {
  return {
    ...detail,

    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: detail.h1Title || detail.title,
    h1Title: detail.h1Title || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,
    name: detail.name || detail.title,
    model: detail.model || detail.title,

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: \`/products/pumps/syringe-pumps/\${detail.slug}\`,

    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],
  };
}

export function generateStaticParams() {
  return (syringePumpDetails as Detail[]).map((detail) => ({
    slug: detail.slug,
  }));
}

export default async function SyringePumpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = (syringePumpDetails as Detail[]).find((item) => item.slug === slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailClient data={toClientData(detail)} />;
}
`;

write("app/products/pumps/syringe-pumps/[slug]/page.tsx", pageTsx);

const audit = `const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ok(label, pass) {
  console.log(\`\${pass ? "✅" : "❌"} \${label}\`);
  return pass;
}

let allPass = true;
function check(label, pass) {
  allPass = ok(label, pass) && allPass;
}

const jsonPath = "data/products/generated/pumps/syringe-pumps/detail/index.json";
const pagePath = "app/products/pumps/syringe-pumps/[slug]/page.tsx";

console.log("\\n===== 注射泵详情页检查 =====\\n");

check("详情 JSON 存在", fs.existsSync(p(jsonPath)));
check("详情动态路由存在", fs.existsSync(p(pagePath)));

const details = fs.existsSync(p(jsonPath))
  ? JSON.parse(fs.readFileSync(p(jsonPath), "utf8"))
  : [];

check("详情页数量为 4", Array.isArray(details) && details.length === 4);

const required = [
  "hmd3-30mm-solenoid-syringe-pump",
  "hmd6-60mm-solenoid-syringe-pump",
  "hld3-30mm-rotary-valve-syringe-pump",
  "hld6-60mm-rotary-valve-syringe-pump"
];

for (const slug of required) {
  const item = details.find((x) => x.slug === slug);
  check(\`存在 \${slug}\`, Boolean(item));
  if (item) {
    check(\`\${slug} H1 存在\`, Boolean(item.h1Title));
    check(\`\${slug} 描述存在\`, Boolean(item.description));
    check(\`\${slug} 规格表存在\`, Array.isArray(item.specifications) && item.specifications.length >= 8);
    check(\`\${slug} 应用存在\`, Array.isArray(item.commonApplications) && item.commonApplications.length >= 4);
    check(\`\${slug} FAQ 存在\`, Array.isArray(item.faq) && item.faq.length >= 4);
    check(\`\${slug} 定制模式\`, item.isCustomInquiry === true && item.isCustomOnly === true);
    check(\`\${slug} 图纸按钮开启\`, item.showDrawingRequest === true);
    check(\`\${slug} 3D按钮关闭\`, item.show3DRequest === false);
  }
}

console.log("\\n===== 检查结果 =====\\n");

if (allPass) {
  console.log("✅ 注射泵详情页数据与路由已创建。");
  console.log("下一步打开：");
  for (const slug of required) {
    console.log(\`http://localhost:3000/products/pumps/syringe-pumps/\${slug}\`);
  }
} else {
  console.log("❌ 有检查项未通过，请根据上方红叉修正。");
}
`;

write("scripts/products/audit-syringe-pump-detail-pages.cjs", audit);

console.log("");
console.log("注射泵详情页第一版创建完成。");
console.log("下一步执行：");
console.log("node scripts/products/audit-syringe-pump-detail-pages.cjs");
console.log("npm run dev");