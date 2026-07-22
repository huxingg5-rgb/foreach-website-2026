const fs = require("fs");
const path = require("path");

const root = process.cwd();

function backup(file, tag) {
  if (fs.existsSync(file)) {
    const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    fs.copyFileSync(file, `${file}.bak_${tag}_${stamp}`);
  }
}

const file = path.join(root, "data/products/selection/tubing-selection.generated.ts");

if (!fs.existsSync(file)) {
  console.error("找不到文件：data/products/selection/tubing-selection.generated.ts");
  process.exit(1);
}

backup(file, "before_fix_card_subtitle_newlines");

const cards = [
  {
    productId: "pvc-tubing",
    slug: "pvc-tubing",
    titleZh: "PVC 管",
    titleEn: "PVC Tubing",
    materialZh: "聚氯乙烯（PVC）",
    materialEn: "Polyvinyl Chloride (PVC)",
    idRange: "1.6mm~19.1mm",
    temp: "-42℃~75℃",
    href: "/products/tubing/pvc-tubing",
    image: "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp"
  },
  {
    productId: "tpu-tubing",
    slug: "tpu-tubing",
    titleZh: "TPU 管",
    titleEn: "TPU Tubing",
    materialZh: "热塑性聚氨酯（TPU）",
    materialEn: "Thermoplastic Polyurethane (TPU)",
    idRange: "3.7mm~7.0mm",
    temp: "-30℃~70℃",
    href: "/products/tubing/tpu-tubing",
    image: "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp"
  },
  {
    productId: "fep-tubing",
    slug: "fep-tubing",
    titleZh: "FEP 管",
    titleEn: "FEP Tubing",
    materialZh: "氟化乙烯丙烯共聚物（FEP）",
    materialEn: "Fluorinated Ethylene Propylene (FEP)",
    idRange: "0.3mm~2.0mm",
    temp: "-230℃~200℃",
    href: "/products/tubing/fep-tubing",
    image: "/images/products/tubing/fep-tubing/fep-tubing-main.webp"
  },
  {
    productId: "ptfe-tubing",
    slug: "ptfe-tubing",
    titleZh: "PTFE 管",
    titleEn: "PTFE Tubing",
    materialZh: "聚四氟乙烯（PTFE）",
    materialEn: "Polytetrafluoroethylene (PTFE)",
    idRange: "1.5mm~2.0mm",
    temp: "-200℃~260℃",
    href: "/products/tubing/ptfe-tubing",
    image: "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp"
  },
  {
    productId: "peek-tubing",
    slug: "peek-tubing",
    titleZh: "PEEK 管",
    titleEn: "PEEK Tubing",
    materialZh: "聚醚醚酮（PEEK）",
    materialEn: "Polyether Ether Ketone (PEEK)",
    idRange: "0.2mm~0.8mm",
    temp: "-180℃~225℃",
    href: "/products/tubing/peek-tubing",
    image: "/images/products/tubing/peek-tubing/peek-tubing-main.webp"
  },
  {
    productId: "pfa-tubing",
    slug: "pfa-tubing",
    titleZh: "PFA 管",
    titleEn: "PFA Tubing",
    materialZh: "全氟烷氧基树脂（PFA）",
    materialEn: "Perfluoroalkoxy Alkane (PFA)",
    idRange: "0.5mm~1.0mm",
    temp: "-230℃~200℃",
    href: "/products/tubing/pfa-tubing",
    image: "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp"
  }
];

const products = cards.map((item) => ({
  productId: item.productId,
  categoryId: "tubing",
  productTypeId: "tubing",
  seriesId: "tubing",
  detailSlug: item.slug,
  slug: item.slug,

  cardTitle: {
    zh: item.titleZh,
    en: item.titleEn
  },

  /*
    这里必须用真实换行 \n，不能用字面量 \\n。
    页面上应显示三行：
    材料全称
    内径范围
    工作温度
  */
  cardSubtitle: {
    zh: `${item.materialZh}\n内径范围：${item.idRange}\n工作温度：${item.temp}`,
    en: `${item.materialEn}\nID range: ${item.idRange}\nWorking temperature: ${item.temp}`
  },

  description: {
    zh: `${item.materialZh}，内径范围 ${item.idRange}，工作温度 ${item.temp}。`,
    en: `${item.materialEn}, ID range ${item.idRange}, working temperature ${item.temp}.`
  },

  imageCard: item.image,
  imagePath: item.image,
  imageAlt: {
    zh: item.titleZh,
    en: item.titleEn
  },

  href: item.href,
  detailHref: item.href,
  productDetailHref: item.href,
  selectionHref: "/products",

  filters: {},
  searchKeywords: {
    zh: `${item.titleZh} ${item.materialZh} 管路 管材`,
    en: `${item.titleEn} ${item.materialEn} tubing`
  }
}));

const code = `import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";

export const tubingSelectionProducts: ProductSelectionProduct[] = ${JSON.stringify(products, null, 2)};

export const tubingSelectionCards = tubingSelectionProducts;

export default tubingSelectionProducts;
`;

fs.writeFileSync(file, code, "utf8");

console.log("已修复管路卡片副标题换行数据。");
console.log("现在 cardSubtitle 是真实换行，不再显示字面量 \\\\n。");