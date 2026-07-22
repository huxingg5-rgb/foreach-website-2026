const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();
const productTypeId = "bulkhead-barbed-fittings";
const selectionHref = "/products/fittings/bulkhead-barbed-fittings";
const placeholder = "/images/logo/foreach-logo-color.svg";

const records = [
  ["PMB-U28-24D-PP-N", "809462", "443-02-00039"],
  ["PMB-U28-32D-PP-N", "809463", "443-02-00040"],
  ["PMB-U28-24D-PA-W", "809496", "443-02-00073"],
  ["PMB-U28-32D-PA-W", "809497", "443-02-00074"],
  ["PMB-U28-16D-PP-N", "809304", "443-02-00323"],
  ["PMB-U28-16D-PA-W", "809517", "443-02-00470"],
  ["PMB-M6-40-PP-N", "806233", "382-19-00400"],
  ["PMB-M10-64-PP-N", "806235", "382-19-00402"],
  ["PMB-M12-79-PP-N", "806236", "382-19-00403"],
];

const selectionPath = path.join(
  root,
  "data/products/selection/bulkhead-barbed-fitting-selection.generated.ts"
);
const detailPath = path.join(
  root,
  "data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json"
);
const detailRoutePath = path.join(
  root,
  "app/products/fittings/bulkhead-barbed-fittings/[slug]/page.tsx"
);
const clientPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);
const routeMapPath = path.join(
  root,
  "data/products/selection/product-route-map.ts"
);
const reportPath = path.join(
  root,
  "reports/bulkhead-barbed-fitting-build-report.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function ml(zh, en) {
  return { zh, en, es: en, fr: en, ko: en, ru: en };
}

function slug(model) {
  return model.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function parse(model) {
  const match = model.match(
    /^PMB-(U28|M6|M10|M12)-(\d+D?)-(PP|PA)-(N|W)$/
  );

  if (!match) {
    throw new Error(`无法解析型号：${model}`);
  }

  const threadMap = {
    U28: "1/4-28 UNF",
    M6: "M6",
    M10: "M10",
    M12: "M12",
  };

  const tubeMap = {
    "16": "1.6 mm",
    "24": "2.4 mm",
    "32": "3.2 mm",
    "40": "4.0 mm",
    "64": "6.4 mm",
    "79": "7.9 mm",
  };

  const [, threadCode, tubeCodeRaw, material, colorCode] = match;
  const tubeCode = tubeCodeRaw.replace(/D$/, "");
  const thread = threadMap[threadCode];
  const tubeId = tubeMap[tubeCode];
  const color = colorCode === "N" ? "本色" : "白色";

  if (!thread || !tubeId) {
    throw new Error(`型号字段不完整：${model}`);
  }

  return { thread, tubeId, material, color };
}

function selectionProduct(record, index) {
  const [model, productCode] = record;
  const parsed = parse(model);
  const detailHref = `${selectionHref}/${slug(model)}`;

  return {
    productId: productCode,
    productCode,
    categoryId: "fittings",
    category: "fittings",
    productTypeId,
    productType: productTypeId,
    seriesId: "pmb",
    seriesName: ml("PMB穿板倒刺接头", "PMB Bulkhead Barbed Fitting"),
    model,
    displayModel: model,
    name: ml("穿板倒刺接头", "Bulkhead Barbed Fitting"),
    title: ml("穿板倒刺接头", "Bulkhead Barbed Fitting"),
    displayName: ml("穿板倒刺接头", "Bulkhead Barbed Fitting"),
    cardTitle: ml(model, model),
    cardSubtitle: ml(
      [
        "穿板倒刺接头",
        `${parsed.thread}螺纹，壳体材质为${parsed.material}`,
        `适配${parsed.tubeId}接管内径`,
      ].join("\n"),
      [
        "Bulkhead Barbed Fitting",
        `${parsed.thread} thread, ${parsed.material} housing`,
        `For ${parsed.tubeId} tube ID`,
      ].join("\n")
    ),
    image: placeholder,
    imagePath: placeholder,
    imageUrl: placeholder,
    imageAlt: ml(
      `${model} 穿板倒刺接头`,
      `${model} bulkhead barbed fitting`
    ),
    filters: {
      filter01: parsed.thread,
      filter02: parsed.tubeId,
      filter03: parsed.material,
      filter04: parsed.color,
    },
    detailHref,
    href: detailHref,
    selectionHref,
    searchKeywords: ml(
      `${model} ${productCode} 穿板倒刺接头 PMB ${parsed.thread} ${parsed.tubeId} ${parsed.material} ${parsed.color}`,
      `${model} ${productCode} bulkhead barbed fitting PMB ${parsed.thread} ${parsed.tubeId} ${parsed.material} ${parsed.color}`
    ),
    sortOrder: index + 1,
  };
}

function detailRecord(record, index) {
  const [model, productCode, internalCode] = record;
  const parsed = parse(model);
  const detailHref = `${selectionHref}/${slug(model)}`;
  const description =
    `${model}是一款穿板倒刺接头，采用${parsed.thread}螺纹，` +
    `适配${parsed.tubeId}接管内径，壳体材质为${parsed.material}。` +
    "适用于仪器面板、设备壳体或隔板两侧的软管连接。";

  const specs = [
    { label: "型号", value: model },
    { label: "商品编码", value: productCode },
    { label: "螺纹规格", value: parsed.thread },
    { label: "接管内径", value: parsed.tubeId },
    { label: "壳体材质", value: parsed.material },
    { label: "颜色", value: parsed.color },
  ];

  const faqs = [
    {
      question: `${model}的螺纹规格是什么？`,
      answer: `该型号采用${parsed.thread}螺纹。安装前应结合面板厚度和安装空间核对装配尺寸。`,
    },
    {
      question: `${model}适配多大接管内径？`,
      answer: `该型号适配${parsed.tubeId}接管内径，装配时应同时确认软管材质和尺寸公差。`,
    },
    {
      question: `${model}的壳体材质是什么？`,
      answer: `当前型号的壳体材质为${parsed.material}，介质兼容性应结合温度、压力和使用周期确认。`,
    },
    {
      question: "穿板倒刺接头适合什么安装方式？",
      answer: "适用于仪器面板、设备壳体或隔板穿板安装，用于连接面板两侧的软管液路。",
    },
    {
      question: `${model}是否可以申请二维图纸？`,
      answer: "可以将当前产品加入清单并提交图纸需求，由工程师根据型号和商品编码核对资料版本。",
    },
  ];

  return {
    sourceType: "fitting-detail",
    category: "fittings",
    categoryId: "fittings",
    categoryLabel: "接头系列",
    productTypeId,
    productTypeName: "穿板倒刺接头",
    productTypeLabel: "穿板倒刺接头",
    productId: productCode,
    productCode,
    productIds: [productCode],
    productCodes: [productCode],
    internalCodes: [internalCode],
    seriesId: "pmb",
    seriesName: "PMB穿板倒刺接头",
    slug: slug(model),
    model,
    hasStandardModel: true,
    name: "穿板倒刺接头",
    title: "穿板倒刺接头",
    displayName: "穿板倒刺接头",
    productName: "穿板倒刺接头",
    modelDisplay: model,
    displayModel: model,
    foreachModel: model,
    description,
    shortDescription: description,
    heroDescription: description,
    advantages: [
      `${parsed.thread}穿板螺纹`,
      `适配${parsed.tubeId}接管内径`,
      `${parsed.material}壳体材质`,
      "用于面板或隔板穿板连接",
    ],
    commonApplications: [
      "IVD仪器内部软管连接",
      "分析仪器面板穿板连接",
      "设备壳体内外液路连接",
      "实验室自动化设备管路集成",
    ],
    mainImage: placeholder,
    image: placeholder,
    imagePath: placeholder,
    imageUrl: placeholder,
    heroImage: placeholder,
    imageCard: placeholder,
    additionalImages: [],
    images: [],
    thumbnails: [],
    imageAlt: `${model} 穿板倒刺接头`,
    mainImageAlt: `${model} 穿板倒刺接头`,
    detailMode: "standard_model",
    hideModelAction: false,
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,
    drawing2dUrl: "",
    drawingPdfUrl: "",
    resources: {},
    specs,
    specifications: specs,
    specGroups: [{ title: "技术参数", items: specs }],
    faqs,
    faq: faqs,
    detailHref,
    href: detailHref,
    selectionHref,
    contactHref: "/contact",
    bottomCta: {
      title: "需要确认穿板倒刺接头规格？",
      description:
        "提交螺纹规格、接管内径、软管材质、介质和安装空间，由工程师协助确认适用型号。",
      buttonText: "联系工程师",
      href: "/contact",
    },
    seo: {
      title: `${model} 穿板倒刺接头 | FOREACH`,
      description,
    },
    sectionTitleMap: {
      specification: "规格参数",
      applications: "常见应用",
      faq: "常见问题",
    },
    sourceRows: [index + 3],
    sourceIndex: index + 1,
  };
}

function selectionSource(products) {
  const taxonomy = [
    {
      id: "fittings:bulkhead-barbed-fittings",
      categoryId: "fittings",
      categoryLabel: ml("接头系列", "Fittings"),
      productTypeId,
      productTypeLabel: ml(
        "穿板倒刺接头",
        "Bulkhead Barbed Fittings"
      ),
      label: ml("穿板倒刺接头", "Bulkhead Barbed Fittings"),
      sortOrder: 65,
      visible: true,
    },
  ];

  const labels = [
    ["filter01", "螺纹规格", "Thread Size", 10],
    ["filter02", "接管内径", "Tube ID", 20],
    ["filter03", "壳体材质", "Housing Material", 30],
    ["filter04", "颜色", "Color", 40],
  ].map(([filterKey, zh, en, sortOrder]) => ({
    categoryId: "fittings",
    productTypeId,
    filterKey,
    label: ml(zh, en),
    inputType: "multiple",
    sortOrder,
    visible: true,
  }));

  return `export const bulkheadBarbedFittingSelectionProducts =
${JSON.stringify(products, null, 2)} as any[];

export const bulkheadBarbedFittingTaxonomyItems =
${JSON.stringify(taxonomy, null, 2)} as any[];

export const bulkheadBarbedFittingFilterLabels =
${JSON.stringify(labels, null, 2)} as any[];
`;
}

function detailRouteSource() {
  return `import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import detailsJson from "@/data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json";

import "../../../products.css";

type DetailRecord = {
  slug: string;
  model: string;
  name?: string;
  title?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  [key: string]: unknown;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const details = detailsJson as DetailRecord[];

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{ data: any }>;

export const dynamicParams = false;

function findDetail(slug: string) {
  const target = String(slug || "").trim().toLowerCase();

  return details.find(
    (item) =>
      String(item.slug || "").trim().toLowerCase() === target
  );
}

export function generateStaticParams() {
  return details.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      \`\${detail.model} \${detail.name || detail.title || "穿板倒刺接头"} | FOREACH\`,
    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function BulkheadBarbedFittingDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={detail} />;
}
`;
}

function insertBefore(source, anchor, addition, label) {
  const count = source.split(anchor).length - 1;

  if (count !== 1) {
    throw new Error(`无法唯一定位${label}：${count}`);
  }

  return source.replace(anchor, addition + anchor);
}

function updateClient(source) {
  if (!source.includes("BULKHEAD_BARBED_GENERATED_IMPORT_START")) {
    const anchor =
      '} from "@/data/products/selection/luer-fitting-selection.generated";';

    const count = source.split(anchor).length - 1;

    if (count !== 1) {
      throw new Error("无法唯一定位鲁尔接头导入结束：" + count);
    }

    source = source.replace(
      anchor,
      `${anchor}

/* BULKHEAD_BARBED_GENERATED_IMPORT_START */
import {
  bulkheadBarbedFittingFilterLabels,
  bulkheadBarbedFittingSelectionProducts,
  bulkheadBarbedFittingTaxonomyItems,
} from "@/data/products/selection/bulkhead-barbed-fitting-selection.generated";
/* BULKHEAD_BARBED_GENERATED_IMPORT_END */`
    );
  }

  if (!source.includes("BULKHEAD_BARBED_SELECTION_PRODUCTS_START")) {
    source = insertBefore(
      source,
      "...luerFittingSelectionProducts,",
      `/* BULKHEAD_BARBED_SELECTION_PRODUCTS_START */
  ...(bulkheadBarbedFittingSelectionProducts as unknown as typeof baseSelectionProducts),
  /* BULKHEAD_BARBED_SELECTION_PRODUCTS_END */
`,
      "产品数组"
    );
  }

  if (!source.includes("BULKHEAD_BARBED_TAXONOMY_START")) {
    source = insertBefore(
      source,
      "...luerFittingSelectionTaxonomyItems,",
      `/* BULKHEAD_BARBED_TAXONOMY_START */
  ...(bulkheadBarbedFittingTaxonomyItems as unknown as typeof baseSelectionTaxonomyItems),
  /* BULKHEAD_BARBED_TAXONOMY_END */
`,
      "分类数组"
    );
  }

  if (!source.includes("BULKHEAD_BARBED_FILTER_LABELS_START")) {
    source = insertBefore(
      source,
      "...luerFittingSelectionFilterLabels,",
      `/* BULKHEAD_BARBED_FILTER_LABELS_START */
  ...(bulkheadBarbedFittingFilterLabels as unknown as typeof baseSelectionFilterLabels),
  /* BULKHEAD_BARBED_FILTER_LABELS_END */
`,
      "筛选标签数组"
    );
  }

  if (!source.includes("BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START")) {
    const start = source.indexOf(
      "function getProductFilterGroupLayout("
    );
    const body = source.indexOf("{", start);

    if (start < 0 || body < 0) {
      throw new Error("未找到筛选布局函数。");
    }

    source =
      source.slice(0, body + 1) +
      `

  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_START */
  if (productTypeId === "bulkhead-barbed-fittings") {
    return "two";
  }
  /* BULKHEAD_BARBED_TWO_COLUMN_LAYOUT_END */
` +
      source.slice(body + 1);
  }

  return source;
}

function updateRouteMap(source) {
  if (source.includes('"bulkhead-barbed-fittings": {')) {
    return source;
  }

  return insertBefore(
    source,
    '    "luer-fittings": {',
    `    "bulkhead-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "bulkhead-barbed-fittings",
      label: "穿板倒刺接头",
      title: "穿板倒刺接头 | FOREACH",
      description:
        "穿板倒刺接头适用于仪器面板、设备壳体和隔板两侧的软管液路连接，可根据螺纹规格、接管内径、壳体材质和颜色进行选型。",
    },

`,
    "产品路由映射"
  );
}

function checkTs(fileName, source) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
    reportDiagnostics: true,
    fileName,
  });

  const errors = (result.diagnostics || []).filter(
    (item) => item.category === ts.DiagnosticCategory.Error
  );

  if (errors.length) {
    throw new Error(
      `${fileName}语法错误：\n` +
        errors
          .map((item) =>
            ts.flattenDiagnosticMessageText(item.messageText, "\n")
          )
          .join("\n")
    );
  }
}

const products = records.map(selectionProduct);
const details = records.map(detailRecord);
const generatedSelection = selectionSource(products);
const generatedRoute = detailRouteSource();

if (!fs.existsSync(clientPath) || !fs.existsSync(routeMapPath)) {
  throw new Error("没有找到公共选型页文件或路由映射文件。");
}

const updatedClient = updateClient(
  fs.readFileSync(clientPath, "utf8")
);
const updatedRouteMap = updateRouteMap(
  fs.readFileSync(routeMapPath, "utf8")
);

checkTs("bulkhead-barbed-fitting-selection.generated.ts", generatedSelection);
checkTs("ProductSelectionClient.tsx", updatedClient);
checkTs("product-route-map.ts", updatedRouteMap);
checkTs("bulkhead-barbed-fittings/[slug]/page.tsx", generatedRoute);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

for (const file of [
  clientPath,
  routeMapPath,
  selectionPath,
  detailPath,
  detailRoutePath,
]) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `${file}.bak_bulkhead_barbed_${stamp}`);
  }
}

for (const file of [selectionPath, detailPath, detailRoutePath, reportPath]) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

fs.writeFileSync(selectionPath, generatedSelection, "utf8");
fs.writeFileSync(
  detailPath,
  JSON.stringify(details, null, 2) + "\n",
  "utf8"
);
fs.writeFileSync(detailRoutePath, generatedRoute, "utf8");
fs.writeFileSync(clientPath, updatedClient, "utf8");
fs.writeFileSync(routeMapPath, updatedRouteMap, "utf8");

const report = [
  "# 穿板倒刺接头系列生成结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "- 选型卡片：9",
  "- 详情数据：9",
  "- 产品类型ID：bulkhead-barbed-fittings",
  "- 选型页：/products/fittings/bulkhead-barbed-fittings",
  "- 未新增CSS",
  "",
  ...records.map(
    ([model, code]) => `- ${model}｜${code}`
  ),
  "",
].join("\n");

fs.writeFileSync(reportPath, report, "utf8");

console.log("");
console.log("穿板倒刺接头系列生成完成");
console.log("选型卡片：9");
console.log("详情数据：9");
console.log("选型页：", selectionHref);
console.log("报告：", reportPath);
console.log("");
