const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const root = process.cwd();

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-selection.generated.ts"
);

const detailOutputPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "barbed-fittings",
  "detail",
  "index.json"
);

const pagePath = path.join(
  root,
  "app",
  "products",
  "fittings",
  "barbed-fittings",
  "[slug]",
  "page.tsx"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "barbed-fitting-detail-setup-report.json"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Required file not found: ${filePath}`
    );
  }
}

function ensureDirectoryForFile(filePath) {
  fs.mkdirSync(
    path.dirname(filePath),
    { recursive: true }
  );
}

function backup(filePath, suffix) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  const backupPath =
    `${filePath}.bak_${suffix}_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

function getText(value) {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    return String(
      value.zh ??
      value["zh-CN"] ??
      value.en ??
      Object.values(value)[0] ??
      ""
    ).trim();
  }

  return String(value).trim();
}

function slugify(value) {
  return getText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadTypeScriptModule(filePath) {
  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const transpiled =
    ts.transpileModule(
      source,
      {
        compilerOptions: {
          module:
            ts.ModuleKind.CommonJS,
          target:
            ts.ScriptTarget.ES2020,
          esModuleInterop: true,
          resolveJsonModule: true,
        },
        fileName: filePath,
      }
    ).outputText;

  const loadedModule =
    new Module(
      filePath,
      module
    );

  loadedModule.filename =
    filePath;

  loadedModule.paths =
    Module._nodeModulePaths(
      path.dirname(filePath)
    );

  loadedModule._compile(
    transpiled,
    filePath
  );

  return loadedModule.exports;
}

function getFilterValue(
  product,
  key
) {
  return getText(
    product?.filters?.[key]
  );
}

function normalizeMm(value) {
  const text =
    getText(value);

  const numberMatch =
    text.match(
      /\d+(?:\.\d+)?/
    );

  if (!numberMatch) {
    return text;
  }

  return `${numberMatch[0]} mm`;
}

function getModel(product) {
  const candidates = [
    product?.model,
    product?.modelCode,
    product?.modelDisplay,
    product?.displayModel,
    getText(product?.cardTitle),
    product?.productId,
  ]
    .map(getText)
    .filter(Boolean);

  const engineeringModel =
    candidates.find(
      (value) =>
        /[a-z]/i.test(value) &&
        /\d/.test(value) &&
        !value.includes("/")
    );

  return (
    engineeringModel ||
    candidates[0] ||
    ""
  );
}

function getPortCount(
  structure
) {
  const portCountMap = {
    "直通型": 2,
    "L型": 2,
    "T型": 3,
    "Y型": 3,
    "π型": 4,
    "十字型": 4,
    "倒刺堵头": 1,
  };

  return (
    portCountMap[structure] ||
    1
  );
}

function getProductName(
  structure,
  isReducer
) {
  if (
    structure ===
    "倒刺堵头"
  ) {
    return "倒刺堵头";
  }

  const baseNameMap = {
    "直通型": "直通",
    "L型": "L型",
    "T型": "T型",
    "Y型": "Y型",
    "π型": "π型四通",
    "十字型": "十字型四通",
  };

  const baseName =
    baseNameMap[structure] ||
    structure ||
    "倒刺";

  return (
    `${baseName}` +
    `${isReducer ? "异径" : "等径"}` +
    "倒刺接头"
  );
}

function getTubeDescription(
  structure,
  sizes,
  isReducer
) {
  const validSizes =
    sizes.filter(Boolean);

  if (
    validSizes.length === 0
  ) {
    return "适用于软管连接";
  }

  if (!isReducer) {
    return (
      `适用${validSizes[0]}` +
      "内径软管"
    );
  }

  if (
    structure === "直通型" ||
    structure === "L型"
  ) {
    return (
      `适用${validSizes[0]}` +
      "转" +
      `${validSizes[1]}` +
      "内径软管"
    );
  }

  return (
    "适用" +
    validSizes.join(" / ") +
    "内径软管"
  );
}

function makeFaqs({
  model,
  productName,
  tubeDescription,
  material,
}) {
  return [
    {
      question:
        `${model}适配什么规格的软管？`,
      answer:
        `${tubeDescription}。选型时应以软管实际内径及装配匹配情况为准。`,
    },
    {
      question:
        `${productName}的等径和异径如何区分？`,
      answer:
        "各接管端内径规格相同的为等径结构，不同接管端采用不同内径规格的为异径结构。",
    },
    {
      question:
        "倒刺接头尺寸对应软管内径还是外径？",
      answer:
        "本页面接管尺寸按适配软管内径显示，实际装配前应同时确认软管材质、硬度和尺寸公差。",
    },
    {
      question:
        `${material}材质是否适合当前介质？`,
      answer:
        "需要结合输送介质、工作温度、压力和清洁要求确认，无法确定时请提交工况由工程师协助核对。",
    },
    {
      question:
        `${model}是否可以申请2D图纸？`,
      answer:
        "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。",
    },
  ];
}

ensureFile(selectionPath);
ensureFile(clientPath);

const selectionModule =
  loadTypeScriptModule(
    selectionPath
  );

const products =
  selectionModule
    .barbedFittingSelectionProducts ||
  selectionModule
    .default ||
  [];

if (
  !Array.isArray(products) ||
  products.length === 0
) {
  throw new Error(
    "barbedFittingSelectionProducts is empty."
  );
}

const details = products
  .map((product, index) => {
    const model =
      getModel(product);

    if (!model) {
      return null;
    }

    const slug =
      slugify(model);

    const structure =
      getFilterValue(
        product,
        "filter01"
      ) ||
      getText(
        product.structureName
      );

    const rawSizes = [
      getFilterValue(
        product,
        "filter02"
      ),
      getFilterValue(
        product,
        "filter03"
      ),
      getFilterValue(
        product,
        "filter04"
      ),
    ];

    const sizes =
      rawSizes
        .map(normalizeMm)
        .filter(Boolean);

    const uniqueSizes =
      Array.from(
        new Set(sizes)
      );

    const isReducer =
      uniqueSizes.length > 1;

    const productName =
      getProductName(
        structure,
        isReducer
      );

    const tubeDescription =
      getTubeDescription(
        structure,
        sizes,
        isReducer
      );

    const material =
      getFilterValue(
        product,
        "filter05"
      ) ||
      getText(
        product.materialCode
      );

    const color =
      getFilterValue(
        product,
        "filter06"
      ) ||
      getText(
        product.colorName
      ) ||
      getText(
        product.colorCode
      );

    const productCode =
      getText(
        product.productCode
      ) ||
      getText(
        product.productId
      );

    const portCount =
      getPortCount(
        structure
      );

    const interfaceForm =
      structure ===
      "倒刺堵头"
        ? "单端堵头"
        : `${portCount}通${
            isReducer
              ? "异径"
              : "等径"
          }`;

    const description =
      `${tubeDescription}，采用` +
      `${material}材质，颜色为` +
      `${color}。`;

    const specs = [
      {
        label: "产品类别",
        value: "倒刺接头",
      },
      {
        label: "产品结构",
        value:
          structure ||
          productName,
      },
      {
        label: "接口形式",
        value: interfaceForm,
      },
    ];

    if (
      !isReducer &&
      uniqueSizes.length === 1
    ) {
      specs.push({
        label: "接管内径",
        value: uniqueSizes[0],
      });
    } else {
      sizes.forEach(
        (size, sizeIndex) => {
          specs.push({
            label:
              `接管内径${
                sizeIndex + 1
              }`,
            value: size,
          });
        }
      );
    }

    specs.push(
      {
        label: "材质",
        value:
          material || "—",
      },
      {
        label: "颜色",
        value:
          color || "—",
      },
      {
        label: "型号",
        value: model,
      },
      {
        label: "商品编码",
        value:
          productCode || "—",
      }
    );

    const image =
      getText(
        product.imageCard
      ) ||
      "/images/logo/foreach-logo-color.svg";

    const faqs =
      makeFaqs({
        model,
        productName,
        tubeDescription,
        material,
      });

    return {
      sourceType:
        "fitting-detail",

      category:
        "fittings",
      categoryId:
        "fittings",
      categoryLabel:
        "接头系列",

      productTypeId:
        "barbed-fittings",
      productTypeName:
        productName,

      productId:
        getText(
          product.productId
        ) ||
        model,

      productCode:
        productCode ||
        model,

      seriesId:
        "barbed-fittings",
      seriesName:
        productName,

      slug,
      model,

      name:
        productName,
      title:
        productName,
      displayName:
        productName,
      productName,

      modelDisplay:
        model,
      displayModel:
        model,
      foreachModel:
        model,

      description,
      shortDescription:
        description,
      heroDescription:
        description,

      commonApplications: [
        "仪器内部软管连接",
        "液路分配与转接",
        "泵阀管路连接",
        "实验室自动化设备",
      ],

      mainImage:
        image,
      image,
      imagePath:
        image,
      imageUrl:
        image,
      heroImage:
        image,
      imageCard:
        image,

      additionalImages: [],
      images: [],
      thumbnails: [],

      imageAlt:
        `${model} ${productName}`,

      detailMode:
        "standard_model",

      hideModelAction:
        false,

      showConfigurator:
        false,

      showDatasheetRequest:
        false,

      showDrawingRequest:
        true,

      show3DRequest:
        false,

      specs,
      specifications:
        specs,

      specGroups: [
        {
          title:
            "技术参数",
          items:
            specs,
        },
      ],

      faqs,
      faq:
        faqs,

      detailHref:
        `/products/fittings/barbed-fittings/${slug}`,

      href:
        `/products/fittings/barbed-fittings/${slug}`,

      selectionHref:
        "/products/fittings/barbed-fittings",

      contactHref:
        "/contact",

      bottomCta: {
        title:
          "需要确认倒刺接头规格？",
        description:
          "提交软管内径、产品结构、材质、颜色及使用工况，由工程师协助确认标准型号或定制方案。",
        buttonText:
          "联系工程师",
        href:
          "/contact",
      },

      seo: {
        title:
          `${model} ${productName} | FOREACH`,
        description:
          `${model}是一款${productName}，${description}`,
      },

      sectionTitleMap: {
        specification:
          "规格参数",
        applications:
          "常见应用",
        faq:
          "常见问题",
      },

      sourceIndex:
        Number(
          product.sourceIndex ??
          index
        ),
    };
  })
  .filter(Boolean);

ensureDirectoryForFile(
  detailOutputPath
);

fs.writeFileSync(
  detailOutputPath,
  JSON.stringify(
    details,
    null,
    2
  ) + "\n",
  "utf8"
);

const pageContent = `import type {
  ComponentType,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import detailsJson from "@/data/products/generated/fittings/barbed-fittings/detail/index.json";

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
  params: Promise<{
    slug: string;
  }>;
};

const details =
  detailsJson as DetailRecord[];

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{
    data: any;
  }>;

export const dynamicParams =
  false;

function normalizeSegment(
  value: string
) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function findDetail(
  slug: string
) {
  const target =
    normalizeSegment(slug);

  return details.find(
    (item) =>
      normalizeSegment(
        item.slug
      ) === target
  );
}

export function generateStaticParams() {
  return details.map(
    (detail) => ({
      slug:
        detail.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      detail.model + " " + (detail.name || detail.title || "倒刺接头") + " | FOREACH",

    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function BarbedFittingDetailPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <ProductDetailView
      data={detail}
    />
  );
}
`;

ensureDirectoryForFile(
  pagePath
);

const pageBackup =
  backup(
    pagePath,
    "barbed_detail_page"
  );

fs.writeFileSync(
  pagePath,
  pageContent,
  "utf8"
);

let clientContent =
  fs.readFileSync(
    clientPath,
    "utf8"
  )
  .replace(
    /\r\n/g,
    "\n"
  );

const markerStart =
  "/* BARBED_FITTING_DETAIL_HREF_START */";

const markerEnd =
  "/* BARBED_FITTING_DETAIL_HREF_END */";

const hrefPatch = `
  ${markerStart}

  /*
   * 倒刺接头标准型号详情链接。
   * 页面结构继续复用 ProductDetailClient，
   * 这里只负责把卡片导向具体型号。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const isBarbedFitting =
      rawProductTypeId ===
        "barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/barbed-fittings"
      );

    if (isBarbedFitting) {
      const rawCardTitle =
        (product as any)?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
          (product as any)?.modelCode ||
          (product as any)?.modelDisplay ||
          cardTitleText ||
          (product as any)?.productId ||
          ""
        ).trim();

      const modelSlug =
        model
          .toLowerCase()
          .replace(/μ/g, "u")
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          );

      return modelSlug
        ? "/products/fittings/barbed-fittings/" + modelSlug
        : "/products/fittings/barbed-fittings";
    }
  }

  ${markerEnd}
`;

const oldPatchPattern =
  new RegExp(
    String.raw`\s*\/\* BARBED_FITTING_DETAIL_HREF_START \*\/[\s\S]*?\/\* BARBED_FITTING_DETAIL_HREF_END \*\/`,
    "g"
  );

clientContent =
  clientContent.replace(
    oldPatchPattern,
    ""
  );

const makeDetailHrefPattern =
  /(function\s+makeDetailHref\s*\(\s*product\s*:\s*ProductSelectionProduct\s*\)\s*\{)/m;

if (
  !makeDetailHrefPattern.test(
    clientContent
  )
) {
  throw new Error(
    "makeDetailHref function was not found in ProductSelectionClient.tsx."
  );
}

clientContent =
  clientContent.replace(
    makeDetailHrefPattern,
    `$1${hrefPatch}`
  );

const clientBackup =
  backup(
    clientPath,
    "barbed_detail_href"
  );

fs.writeFileSync(
  clientPath,
  clientContent,
  "utf8"
);

ensureDirectoryForFile(
  reportPath
);

const report = {
  createdAt:
    new Date()
      .toISOString(),

  selectionSource:
    path.relative(
      root,
      selectionPath
    ),

  detailOutput:
    path.relative(
      root,
      detailOutputPath
    ),

  detailPage:
    path.relative(
      root,
      pagePath
    ),

  selectionClient:
    path.relative(
      root,
      clientPath
    ),

  generatedDetailCount:
    details.length,

  examples:
    details
      .slice(0, 5)
      .map(
        (detail) => ({
          model:
            detail.model,
          name:
            detail.name,
          href:
            detail.detailHref,
        })
      ),

  backups: {
    page:
      pageBackup
        ? path.relative(
            root,
            pageBackup
          )
        : "",

    client:
      clientBackup
        ? path.relative(
            root,
            clientBackup
          )
        : "",
  },
};

fs.writeFileSync(
  reportPath,
  JSON.stringify(
    report,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  `Generated detail records: ${details.length}`
);

console.log(
  `Detail data: ${path.relative(
    root,
    detailOutputPath
  )}`
);

console.log(
  `Detail page: ${path.relative(
    root,
    pagePath
  )}`
);

console.log(
  `Report: ${path.relative(
    root,
    reportPath
  )}`
);

console.log("");
console.log(
  "Barbed fitting detail setup completed."
);

/* BARBED_DETAIL_CONTENT_REFINEMENT_START */

/*
 * 倒刺接头详情数据生成完成后，
 * 自动补充结构化详情文案、常见应用和规格顺序。
 */
require("./refine-barbed-fitting-detail-content.cjs");

/* BARBED_DETAIL_CONTENT_REFINEMENT_END */
