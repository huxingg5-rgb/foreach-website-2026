const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.readFileSync(p(rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("已修改:", rel);
}

function backup(rel) {
  const full = p(rel);
  const bak = full + ".bak.image-paths";
  if (fs.existsSync(full) && !fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + ".bak.image-paths");
  }
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
  console.log("已确认文件夹:", rel);
}

/**
 * 1. 创建注射泵图片目录
 */
ensureDir("public/images/products/pumps/syringe-pumps");

/**
 * 2. 重写注射泵筛选页数据，统一图片路径
 */
const selectionRel = "data/products/selection/syringe-pump-selection.generated.ts";

const selectionContent = `import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
} from "./types";

export const syringePumpFilterLabels: ProductSelectionFilterLabel[] = [
  {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    filterKey: "filter01",
    label: {
      zh: "产品类型",
      en: "Product Type",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    inputType: "single",
    sortOrder: 10,
    visible: true,
  },
  {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    filterKey: "filter02",
    label: {
      zh: "行程",
      en: "Stroke",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    inputType: "single",
    sortOrder: 20,
    visible: true,
  },
];

export const syringePumpSelectionProducts: ProductSelectionProduct[] = [
  {
    productId: "hmd3-30mm-solenoid-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HMD3 电磁阀注射泵",
      en: "HMD3 Solenoid Valve Syringe Pump",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    cardSubtitle: {
      zh: "50 μL–5 mL 小体积精密加液\\n30mm 行程，单通道配置\\n支持 2端口、3端口及分配阀配置",
      en: "50 μL–5 mL small-volume precision dispensing\\n30 mm stroke, single-channel configuration\\nSupports 2-port, 3-port and dispensing valve options",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    filters: {
      filter01: "HMD 电磁阀系列注射泵",
      filter02: "30mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",
    detailSlug: "hmd3-30mm-solenoid-syringe-pump",
    sortOrder: 1201,
  },
  {
    productId: "hmd6-60mm-solenoid-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HMD6 电磁阀注射泵",
      en: "HMD6 Solenoid Valve Syringe Pump",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    cardSubtitle: {
      zh: "25 μL–25 mL 中大量程输送\\n60mm 行程，支持 1–8 通道配置\\n支持端口形式与注射器量程定制",
      en: "25 μL–25 mL mid-to-large volume dispensing\\n60 mm stroke, supports 1–8 channel configurations\\nCustom port options and syringe volume ranges",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    filters: {
      filter01: "HMD 电磁阀系列注射泵",
      filter02: "60mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",
    detailSlug: "hmd6-60mm-solenoid-syringe-pump",
    sortOrder: 1202,
  },
  {
    productId: "hld3-30mm-rotary-valve-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HLD3 旋转阀注射泵",
      en: "HLD3 Rotary Valve Syringe Pump",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    cardSubtitle: {
      zh: "50 μL–5 mL 小体积定量分配\\n30mm 行程，支持多端口切换\\n支持 3通、9通旋转阀配置",
      en: "50 μL–5 mL small-volume quantitative dispensing\\n30 mm stroke, supports multi-port switching\\nSupports 3-way and 9-way rotary valve options",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    filters: {
      filter01: "HLD 旋转阀系列注射泵",
      filter02: "30mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",
    detailSlug: "hld3-30mm-rotary-valve-syringe-pump",
    sortOrder: 1203,
  },
  {
    productId: "hld6-60mm-rotary-valve-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HLD6 旋转阀注射泵",
      en: "HLD6 Rotary Valve Syringe Pump",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    cardSubtitle: {
      zh: "25 μL–25 mL 大量程定量输送\\n60mm 行程，支持多端口切换\\n支持 3通、5通、9通旋转阀配置",
      en: "25 μL–25 mL large-volume quantitative dispensing\\n60 mm stroke, supports multi-port switching\\nSupports 3-way, 5-way and 9-way rotary valve options",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },
    filters: {
      filter01: "HLD 旋转阀系列注射泵",
      filter02: "60mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp",
    detailSlug: "hld6-60mm-rotary-valve-syringe-pump",
    sortOrder: 1204,
  },
];
`;

backup(selectionRel);
write(selectionRel, selectionContent);

/**
 * 3. 给顶部介绍区预留注射泵系列图片路径
 * 说明：如果当前组件支持 imagePath / image 字段，会直接生效；
 * 如果组件暂时不读取该字段，也不会影响构建，后续只需要在组件里读取即可。
 */
const introRel = "data/products/selection/product-type-intro.ts";

if (fs.existsSync(p(introRel))) {
  let text = read(introRel);

  if (text.includes("pumps:syringe-pump") && !text.includes("foreach-syringe-pump-series.webp")) {
    backup(introRel);

    const keyIndex = text.indexOf("pumps:syringe-pump");
    const objectStart = text.indexOf("{", keyIndex);

    if (objectStart !== -1) {
      text =
        text.slice(0, objectStart + 1) +
        `\n    imagePath: "/images/products/pumps/syringe-pumps/foreach-syringe-pump-series.webp",` +
        text.slice(objectStart + 1);

      write(introRel, text);
    } else {
      console.log("未能自动定位 syringe-pump intro 对象，跳过顶部图路径写入");
    }
  } else if (text.includes("foreach-syringe-pump-series.webp")) {
    console.log("顶部介绍图路径已存在，跳过:", introRel);
  } else {
    console.log("未找到 pumps:syringe-pump，跳过顶部图路径写入:", introRel);
  }
}

console.log("");
console.log("注射泵图片路径已统一。后续请把图片放到：");
console.log("public/images/products/pumps/syringe-pumps/");
console.log("");
console.log("需要放入的图片文件名：");
console.log("foreach-syringe-pump-series.webp");
console.log("foreach-hmd3-solenoid-valve-syringe-pump.webp");
console.log("foreach-hmd6-solenoid-valve-syringe-pump.webp");
console.log("foreach-hld3-rotary-valve-syringe-pump.webp");
console.log("foreach-hld6-rotary-valve-syringe-pump.webp");