const fs = require("fs");
const path = require("path");

const root = process.cwd();

function backup(file, tag) {
  if (fs.existsSync(file)) {
    const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    fs.copyFileSync(file, `${file}.bak_${tag}_${stamp}`);
  }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("已写入：" + path.relative(root, file));
}

/*
  1. 重写干净的管路选型数据，修复乱码和重复字段。
*/
const selectionFile = path.join(root, "data/products/selection/tubing-selection.generated.ts");
backup(selectionFile, "before_rewrite_clean_tubing_selection");

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

const selectionCode = `import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";

export const tubingSelectionProducts: ProductSelectionProduct[] = ${JSON.stringify(
  cards.map((item) => ({
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

    cardSubtitle: {
      zh: `${item.materialZh}\\n内径范围：${item.idRange}\\n工作温度：${item.temp}`,
      en: `${item.materialEn}\\nID range: ${item.idRange}\\nWorking temperature: ${item.temp}`
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
  })),
  null,
  2
)};

export const tubingSelectionCards = tubingSelectionProducts;

export default tubingSelectionProducts;
`;

write(selectionFile, selectionCode);

/*
  2. 接入 ProductSelectionClient：
     - 导入 tubingSelectionProducts
     - getProductsByCategory("tubing") 返回管路 6 张卡片
     - getFirstProductTypeId("tubing") 返回 tubing
     - makeDetailHref 优先识别 /products/tubing/
*/
const clientFile = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(clientFile)) {
  console.error("找不到 ProductSelectionClient.tsx");
  process.exit(1);
}

backup(clientFile, "before_connect_tubing_selection");

let text = fs.readFileSync(clientFile, "utf8");

if (!text.includes("tubingSelectionProducts")) {
  const importLine = `import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";\n`;

  const anchor = `import ProductCardGrid from "./ProductCardGrid";`;
  if (text.includes(anchor)) {
    text = text.replace(anchor, importLine + anchor);
  } else {
    text = importLine + text;
  }
}

/*
  2.1 getProductsByCategory 增加 tubing 分支。
*/
if (!text.includes("TUBING_GET_PRODUCTS_BY_CATEGORY_20260707")) {
  text = text.replace(
    /function getProductsByCategory\(([^)]*)\)\s*\{\s*/,
    (match) => `${match}
  /*
    TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
    管路系列直接返回 6 张材料卡片。
  */
  if (String(arguments[0] || "") === "tubing") {
    return tubingSelectionProducts;
  }

`
  );
}

/*
  2.2 getFirstProductTypeId 增加 tubing 分支。
*/
if (!text.includes("TUBING_GET_FIRST_PRODUCT_TYPE_20260707")) {
  text = text.replace(
    /function getFirstProductTypeId\(([^)]*)\)\s*\{\s*/,
    (match) => `${match}
  /*
    TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  */
  if (String(arguments[0] || "") === "tubing") {
    return "tubing";
  }

`
  );
}

/*
  2.3 makeDetailHref 增加 tubing 分支。
*/
if (!text.includes("TUBING_MAKE_DETAIL_HREF_20260707")) {
  text = text.replace(
    /function makeDetailHref\(product: ProductSelectionProduct\)\s*\{\s*/,
    (match) => `${match}
  /*
    TUBING_MAKE_DETAIL_HREF_20260707
    管路卡片优先使用 detailHref / href。
  */
  {
    const rawHref = String(
      (product as any).detailHref ||
        (product as any).productDetailHref ||
        (product as any).href ||
        ""
    ).trim();

    if (rawHref.includes("/products/tubing/")) {
      return rawHref;
    }

    const rawSlug = String(
      (product as any).detailSlug ||
        (product as any).slug ||
        (product as any).productId ||
        ""
    )
      .split("/")
      .filter(Boolean)
      .pop()
      ?.toLowerCase();

    if (
      rawSlug === "pvc-tubing" ||
      rawSlug === "tpu-tubing" ||
      rawSlug === "fep-tubing" ||
      rawSlug === "ptfe-tubing" ||
      rawSlug === "peek-tubing" ||
      rawSlug === "pfa-tubing"
    ) {
      return \`/products/tubing/\${rawSlug}\`;
    }
  }

`
  );
}

fs.writeFileSync(clientFile, text, "utf8");
console.log("已接入 ProductSelectionClient 管路数据。");

console.log("");
console.log("完成：");
console.log("1. 已重写干净的 tubing-selection.generated.ts");
console.log("2. 已让 getProductsByCategory('tubing') 返回 6 张管路卡片");
console.log("3. 已让管路卡片查看详情跳转到 /products/tubing/[slug]");