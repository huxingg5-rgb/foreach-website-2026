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

const tubingCards = [
  {
    slug: "pvc-tubing",
    title: "PVC 管",
    model: "PVC 管",
    materialFullName: "聚氯乙烯（PVC）",
    innerDiameterRange: "1.6mm~19.1mm",
    workingTemperature: "-42℃~75℃",
    href: "/products/tubing/pvc-tubing",
    detailHref: "/products/tubing/pvc-tubing",
    image: "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
  },
  {
    slug: "tpu-tubing",
    title: "TPU 管",
    model: "TPU 管",
    materialFullName: "热塑性聚氨酯（TPU）",
    innerDiameterRange: "3.7mm~7.0mm",
    workingTemperature: "-30℃~70℃",
    href: "/products/tubing/tpu-tubing",
    detailHref: "/products/tubing/tpu-tubing",
    image: "/images/products/tubing/tpu-tubing/tpu-tubing-main.webp",
  },
  {
    slug: "fep-tubing",
    title: "FEP 管",
    model: "FEP 管",
    materialFullName: "氟化乙烯丙烯共聚物（FEP）",
    innerDiameterRange: "0.3mm~2.0mm",
    workingTemperature: "-230℃~200℃",
    href: "/products/tubing/fep-tubing",
    detailHref: "/products/tubing/fep-tubing",
    image: "/images/products/tubing/fep-tubing/fep-tubing-main.webp",
  },
  {
    slug: "ptfe-tubing",
    title: "PTFE 管",
    model: "PTFE 管",
    materialFullName: "聚四氟乙烯（PTFE）",
    innerDiameterRange: "1.5mm~2.0mm",
    workingTemperature: "-200℃~260℃",
    href: "/products/tubing/ptfe-tubing",
    detailHref: "/products/tubing/ptfe-tubing",
    image: "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp",
  },
  {
    slug: "peek-tubing",
    title: "PEEK 管",
    model: "PEEK 管",
    materialFullName: "聚醚醚酮（PEEK）",
    innerDiameterRange: "0.2mm~0.8mm",
    workingTemperature: "-180℃~225℃",
    href: "/products/tubing/peek-tubing",
    detailHref: "/products/tubing/peek-tubing",
    image: "/images/products/tubing/peek-tubing/peek-tubing-main.webp",
  },
  {
    slug: "pfa-tubing",
    title: "PFA 管",
    model: "PFA 管",
    materialFullName: "全氟烷氧基树脂（PFA）",
    innerDiameterRange: "0.5mm~1.0mm",
    workingTemperature: "-230℃~200℃",
    href: "/products/tubing/pfa-tubing",
    detailHref: "/products/tubing/pfa-tubing",
    image: "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp",
  },
];

/*
  1. 写入管路筛选页数据文件。
  这里给足 href/detailHref/productDetailHref/url/path，避免不同卡片组件取不同字段导致没链接。
*/
const selectionFile = path.join(root, "data/products/selection/tubing-selection.generated.ts");
backup(selectionFile, "before_tubing_selection_links");

const selectionCode = `export type TubingSelectionCard = {
  slug: string;
  title: string;
  model: string;
  materialFullName: string;
  innerDiameterRange: string;
  workingTemperature: string;
  href: string;
  detailHref: string;
  productDetailHref: string;
  url: string;
  path: string;
  image: string;
  imagePath: string;
  cardSubtitle: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
};

export const tubingSelectionCards: TubingSelectionCard[] = ${JSON.stringify(
  tubingCards.map((item) => ({
    ...item,
    productDetailHref: item.detailHref,
    url: item.detailHref,
    path: item.detailHref,
    imagePath: item.image,
    cardSubtitle: {
      zh: `${item.materialFullName}\\n内径范围：${item.innerDiameterRange}\\n工作温度：${item.workingTemperature}`,
      en: `${item.materialFullName}\\nID range: ${item.innerDiameterRange}\\nWorking temperature: ${item.workingTemperature}`,
    },
    description: {
      zh: `${item.materialFullName}，内径范围 ${item.innerDiameterRange}，工作温度 ${item.workingTemperature}。`,
      en: `${item.materialFullName}, ID range ${item.innerDiameterRange}, working temperature ${item.workingTemperature}.`,
    },
  })),
  null,
  2
)};

export const tubingSelectionProducts = tubingSelectionCards;

export default tubingSelectionCards;
`;

write(selectionFile, selectionCode);

/*
  2. 修复已有筛选数据里管路卡片没有 href/detailHref 的问题。
  扫描 data/products/selection 下所有 ts/tsx/json，把 pvc-tubing 等对象中的链接字段补齐。
*/
const selectionDir = path.join(root, "data/products/selection");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (/\.(ts|tsx|js|jsx|json)$/.test(entry.name) && !entry.name.includes(".bak_")) out.push(file);
  }
  return out;
}

for (const file of walk(selectionDir)) {
  let text = fs.readFileSync(file, "utf8");
  let original = text;

  for (const card of tubingCards) {
    const slug = card.slug;
    const href = card.detailHref;

    if (!text.includes(slug)) continue;

    /*
      如果对象里有 slug: "xxx-tubing"，但没有 detailHref/href，则在 slug 后补字段。
      这个替换尽量保守，只在包含该 slug 的位置附近补。
    */
    const slugPattern1 = new RegExp(`slug:\\s*["']${slug}["']\\s*,`, "g");
    text = text.replace(slugPattern1, (match) => {
      const insert = `${match}
    href: "${href}",
    detailHref: "${href}",
    productDetailHref: "${href}",
    url: "${href}",
    path: "${href}",`;
      return insert;
    });

    const slugPattern2 = new RegExp(`"slug"\\s*:\\s*"${slug}"\\s*,`, "g");
    text = text.replace(slugPattern2, (match) => {
      const insert = `${match}
    "href": "${href}",
    "detailHref": "${href}",
    "productDetailHref": "${href}",
    "url": "${href}",
    "path": "${href}",`;
      return insert;
    });
  }

  /*
    清理可能重复补出来的连续重复 href 字段。
    如果你之前已经有 href，这里可能会多一组；先保守不删除旧值，只保证有正确字段。
  */
  if (text !== original) {
    backup(file, "before_patch_tubing_links");
    fs.writeFileSync(file, text, "utf8");
    console.log("已补筛选链接：" + path.relative(root, file));
  }
}

/*
  3. 如果有 product-route-map.ts，补管路路由映射。
*/
const routeMapFile = path.join(root, "data/products/selection/product-route-map.ts");

if (fs.existsSync(routeMapFile)) {
  backup(routeMapFile, "before_tubing_route_map");

  let text = fs.readFileSync(routeMapFile, "utf8");

  const block = `
export const tubingProductRouteMap = {
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "peek-tubing": "/products/tubing/peek-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
};
`;

  if (!text.includes("tubingProductRouteMap")) {
    text += "\n" + block;
    fs.writeFileSync(routeMapFile, text, "utf8");
    console.log("已追加 tubingProductRouteMap：" + path.relative(root, routeMapFile));
  }
}

console.log("");
console.log("完成：管路筛选页链接已补齐。");
console.log("请打开 /products，点击管路系列，再点 6 张卡片的查看详情测试。");