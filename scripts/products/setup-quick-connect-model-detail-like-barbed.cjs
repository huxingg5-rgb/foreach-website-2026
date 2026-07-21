const fs = require("fs");
const path = require("path");

const root = process.cwd();

const sourceDataPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "index.json"
);

const detailOutputPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "detail",
  "index.json"
);

const pagePath = path.join(
  root,
  "app",
  "products",
  "fittings",
  "quick-connect-fittings",
  "[slug]",
  "page.tsx"
);

const selectionClientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-model-detail-setup-report.json"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "Required file not found: " +
      path.relative(root, filePath)
    );
  }
}

function ensureDirectoryForFile(filePath) {
  fs.mkdirSync(
    path.dirname(filePath),
    {
      recursive: true,
    }
  );
}

function backup(filePath, suffix) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  const backupPath =
    filePath +
    ".bak_" +
    suffix +
    "_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

function cleanText(value) {
  return String(
    value ?? ""
  ).trim();
}

function slugify(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLocalizedText(value) {
  if (value == null) {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return cleanText(value);
  }

  if (
    typeof value === "object"
  ) {
    return cleanText(
      value.zh ??
      value["zh-CN"] ??
      value.en ??
      Object.values(value)[0] ??
      ""
    );
  }

  return cleanText(value);
}

function getConnectionInfo(value) {
  const original =
    cleanText(value);

  const metricInBrackets =
    original.match(
      /[（(]\s*(\d+(?:\.\d+)?)\s*mm\s*[）)]/i
    );

  if (metricInBrackets) {
    const display =
      metricInBrackets[1] +
      " mm";

    return {
      type:
        "tube",

      label:
        "接管内径",

      display,

      sentence:
        "适配" +
        display +
        "接管内径",
    };
  }

  const metricOnly =
    original.match(
      /^(\d+(?:\.\d+)?)\s*mm$/i
    );

  if (metricOnly) {
    const display =
      metricOnly[1] +
      " mm";

    return {
      type:
        "tube",

      label:
        "接管内径",

      display,

      sentence:
        "适配" +
        display +
        "接管内径",
    };
  }

  return {
    type:
      "thread",

    label:
      "螺纹规格",

    display:
      original || "—",

    sentence:
      original
        ? "适配" +
          original +
          "螺纹接口"
        : "接口规格以具体型号为准",
  };
}

function getProductName(row) {
  return [
    cleanText(
      row.series ||
      row.modelSeries
    ),
    cleanText(
      row.gender
    ),
    cleanText(
      row.shape
    ),
    cleanText(
      row.valved
    ),
    "快插接头",
  ]
    .filter(Boolean)
    .join("");
}

function getInstallationSentence(row) {
  const panelMount =
    cleanText(
      row.panelMount
    );

  if (
    panelMount ===
    "穿板"
  ) {
    return "可穿板安装";
  }

  if (
    panelMount ===
    "非穿板"
  ) {
    return "非穿板结构";
  }

  return panelMount
    ? panelMount
    : "安装方式以具体型号为准";
}

function resolveImage(model, series) {
  if (
    series ===
    "Q20"
  ) {
    const relativePath =
      "/images/resources/selection-support/fitting-replacement/q20/products/" +
      model +
      ".webp";

    const absolutePath =
      path.join(
        root,
        "public",
        relativePath.replace(
          /^\//,
          ""
        )
      );

    if (
      fs.existsSync(
        absolutePath
      )
    ) {
      return relativePath;
    }
  }

  return "/images/products/FIT/Quick connector_200x200_01_v001.jpg";
}

function resolveAdditionalImages(
  model,
  series
) {
  if (
    series !==
    "Q20"
  ) {
    return [];
  }

  const relativePath =
    "/images/resources/selection-support/fitting-replacement/q20/products/" +
    model +
    "_2.webp";

  const absolutePath =
    path.join(
      root,
      "public",
      relativePath.replace(
        /^\//,
        ""
      )
    );

  return fs.existsSync(
    absolutePath
  )
    ? [
        relativePath,
      ]
    : [];
}

function makeFaqs({
  model,
  productName,
  connection,
  material,
  panelMount,
  valved,
}) {
  return [
    {
      question:
        model +
        "适配什么接口？",

      answer:
        connection.sentence +
        "。选型时还需要同时确认公母端、阀门配置和设备安装方式。",
    },
    {
      question:
        model +
        "是带阀还是不带阀？",

      answer:
        "该型号为" +
        valved +
        "结构。带阀型号在接头断开时可以关闭流路，不带阀型号断开后流路保持开放。",
    },
    {
      question:
        productName +
        "是否支持穿板安装？",

      answer:
        panelMount === "穿板"
          ? "该型号支持穿板安装，适用于设备面板、机壳或固定支架上的接口布置。"
          : "该型号为非穿板结构，通常用于管路中的直接连接。",
    },
    {
      question:
        material +
        "材质是否适合当前介质？",

      answer:
        "需要结合输送介质、工作温度、压力、清洁要求和密封圈材质综合确认，无法确定时请提交工况由工程师协助核对。",
    },
    {
      question:
        model +
        "是否可以申请二维图纸？",

      answer:
        "可以将当前型号加入清单并添加图纸需求，由工程师核对商品编码和资料版本后提供。",
    },
  ];
}

ensureFile(
  sourceDataPath
);

ensureFile(
  selectionClientPath
);

const rows =
  JSON.parse(
    fs.readFileSync(
      sourceDataPath,
      "utf8"
    )
  );

if (
  !Array.isArray(rows) ||
  rows.length === 0
) {
  throw new Error(
    "Quick-connect source data is empty."
  );
}

const details =
  rows
    .map(
      (
        row,
        index
      ) => {
        const model =
          cleanText(
            row.foreachModel ||
            row.model
          );

        if (
          !model
        ) {
          return null;
        }

        const slug =
          slugify(
            model
          );

        const series =
          cleanText(
            row.series ||
            row.modelSeries
          ).toUpperCase();

        const productCode =
          cleanText(
            row.productCode ||
            row.productId
          );

        const productName =
          getProductName(
            row
          );

        const connection =
          getConnectionInfo(
            row.tubeOrThread
          );

        const material =
          cleanText(
            row.housingMaterial
          ) ||
          "—";

        const sealMaterial =
          cleanText(
            row.sealingRingMaterial
          ) ||
          "—";

        const panelMount =
          cleanText(
            row.panelMount
          ) ||
          "—";

        const installationSentence =
          getInstallationSentence(
            row
          );

        const description =
          connection.sentence +
          "，采用" +
          material +
          "材质，" +
          installationSentence +
          "。";

        const specs = [
          {
            label:
              "产品类别",

            value:
              "快插接头",
          },
          {
            label:
              "产品系列",

            value:
              series ||
              "—",
          },
          {
            label:
              connection.label,

            value:
              connection.display,
          },
          {
            label:
              "公母端",

            value:
              cleanText(
                row.gender
              ) ||
              "—",
          },
          {
            label:
              "安装方式",

            value:
              panelMount,
          },
          {
            label:
              "阀门配置",

            value:
              cleanText(
                row.valved
              ) ||
              "—",
          },
          {
            label:
              "形状",

            value:
              cleanText(
                row.shape
              ) ||
              "—",
          },
          {
            label:
              "外壳材质",

            value:
              material,
          },
          {
            label:
              "密封圈材质",

            value:
              sealMaterial,
          },
          {
            label:
              "型号",

            value:
              model,
          },
          {
            label:
              "商品编码",

            value:
              productCode ||
              "—",
          },
        ];

        const image =
          resolveImage(
            model,
            series
          );

        const additionalImages =
          resolveAdditionalImages(
            model,
            series
          );

        const faqs =
          makeFaqs({
            model,
            productName,
            connection,
            material,
            panelMount,
            valved:
              cleanText(
                row.valved
              ) ||
              "对应",
          });

        const detailHref =
          "/products/fittings/quick-connect-fittings/" +
          slug;

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
            "quick-connect-fittings",

          productTypeName:
            productName,

          productTypeLabel:
            "快插接头",

          productId:
            productCode ||
            model,

          productCode:
            productCode ||
            model,

          seriesId:
            series.toLowerCase(),

          seriesName:
            series,

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

          advantages: [
            connection.sentence,
            cleanText(
              row.valved
            ) ||
              "多种阀门配置",
            installationSentence,
            material +
              "外壳材质",
          ],

          commonApplications: [
            "仪器内部液路连接",
            "IVD设备",
            "分析仪器",
            "实验室自动化",
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

          additionalImages,

          images:
            additionalImages,

          thumbnails:
            additionalImages,

          imageAlt:
            model +
            " " +
            productName,

          mainImageAlt:
            model +
            " " +
            productName,

          detailMode:
            "standard_model",

          hideModelAction:
            false,

          showConfigurator:
            false,

          showDatasheetRequest:
            false,

          showDrawingRequest:
            Boolean(
              row.hasDrawing2d
            ),

          show3DRequest:
            false,

          drawing2dUrl:
            "",

          drawingPdfUrl:
            "",

          resources: {},

          specSeriesKey:
            series.toLowerCase(),

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

          detailHref,

          href:
            detailHref,

          selectionHref:
            "/products/fittings/quick-connect-fittings",

          contactHref:
            "/contact",

          bottomCta: {
            title:
              "需要确认快插接头型号？",

            description:
              "提交接口尺寸、公母端、阀门配置、安装方式、材质及使用工况，由工程师协助确认标准型号。",

            buttonText:
              "联系工程师",

            href:
              "/contact",
          },

          seo: {
            title:
              model +
              " " +
              productName +
              " | FOREACH",

            description:
              model +
              "是一款" +
              productName +
              "，" +
              description,
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
              row.sourceRow ??
              index
            ),
        };
      }
    )
    .filter(Boolean);

if (
  details.length !==
  rows.length
) {
  throw new Error(
    "Detail count does not match source count: " +
    details.length +
    " / " +
    rows.length
  );
}

ensureDirectoryForFile(
  detailOutputPath
);

const detailBackup =
  backup(
    detailOutputPath,
    "quick_connect_model_details"
  );

fs.writeFileSync(
  detailOutputPath,
  JSON.stringify(
    details,
    null,
    2
  ) +
    "\n",
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
import detailsJson from "@/data/products/generated/fittings/quick-connect-fittings/detail/index.json";

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
  return String(
    value ||
    ""
  )
    .trim()
    .toLowerCase();
}

function findDetail(
  slug: string
) {
  const target =
    normalizeSegment(
      slug
    );

  return details.find(
    (item) =>
      normalizeSegment(
        item.slug
      ) ===
      target
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
    findDetail(
      slug
    );

  if (
    !detail
  ) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      \`\${detail.model} \${detail.name || detail.title || "快插接头"} | FOREACH\`,

    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function QuickConnectFittingDetailPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

  if (
    !detail
  ) {
    notFound();
  }

  return (
    <ProductDetailView
      data={
        detail
      }
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
    "quick_connect_model_page"
  );

fs.writeFileSync(
  pagePath,
  pageContent,
  "utf8"
);

/*
 * 修改筛选卡片查看详情链接。
 *
 * 当前旧逻辑会将快插接头导向：
 * /q20#商品编码
 *
 * 新逻辑改为：
 * /q2001-pmv-sacn
 */
let selectionClientSource =
  fs.readFileSync(
    selectionClientPath,
    "utf8"
  )
    .replace(
      /\r\n/g,
      "\n"
    );

const hrefMarker =
  "QUICK_CONNECT_MODEL_DETAIL_HREF_20260712";

if (
  !selectionClientSource.includes(
    hrefMarker
  )
) {
  const oldMarker =
    "QUICK_CONNECT_DETAIL_HREF_PRIORITY_20260712";

  const oldMarkerIndex =
    selectionClientSource.indexOf(
      oldMarker
    );

  if (
    oldMarkerIndex ===
    -1
  ) {
    throw new Error(
      "Existing quick-connect href block was not found."
    );
  }

  const searchArea =
    selectionClientSource.slice(
      oldMarkerIndex,
      oldMarkerIndex +
        8000
    );

  const quickConnectIfText =
    "if (isQuickConnect) {";

  const relativeIfIndex =
    searchArea.indexOf(
      quickConnectIfText
    );

  if (
    relativeIfIndex ===
    -1
  ) {
    throw new Error(
      "isQuickConnect branch was not found."
    );
  }

  const insertIndex =
    oldMarkerIndex +
    relativeIfIndex +
    quickConnectIfText.length;

  const hrefBlock = `

      /*
        QUICK_CONNECT_MODEL_DETAIL_HREF_20260712

        快插接头进入具体型号详情页，
        不再进入Q20/Q40/Q60系列汇总页。
      */
      {
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

        const modelCandidates = [
          (product as any)?.foreachModel,
          (product as any)?.model,
          (product as any)?.modelCode,
          (product as any)?.modelDisplay,
          (product as any)?.displayModel,
          cardTitleText,
          JSON.stringify(
            (product as any)?.searchKeywords ||
            {}
          ),
          JSON.stringify(
            product ||
            {}
          ),
        ]
          .map(
            (value) =>
              String(
                value ||
                ""
              )
          )
          .join(
            " "
          );

        const modelMatch =
          modelCandidates.match(
            /\\bQ(?:20|40|60)[A-Z0-9]*-[A-Z0-9]+-[A-Z0-9]+\\b/i
          );

        if (
          modelMatch
        ) {
          const modelSlug =
            modelMatch[0]
              .toLowerCase()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-+|-+$/g,
                ""
              );

          return (
            "/products/fittings/quick-connect-fittings/" +
            modelSlug
          );
        }
      }
`;

  selectionClientSource =
    selectionClientSource.slice(
      0,
      insertIndex
    ) +
    hrefBlock +
    selectionClientSource.slice(
      insertIndex
    );
}

const selectionClientBackup =
  backup(
    selectionClientPath,
    "quick_connect_model_href"
  );

fs.writeFileSync(
  selectionClientPath,
  selectionClientSource,
  "utf8"
);

ensureDirectoryForFile(
  reportPath
);

const report = {
  createdAt:
    new Date()
      .toISOString(),

  sourceData:
    path.relative(
      root,
      sourceDataPath
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
      selectionClientPath
    ),

  generatedDetailCount:
    details.length,

  seriesCounts:
    details.reduce(
      (
        output,
        detail
      ) => {
        const series =
          detail.seriesName ||
          "UNKNOWN";

        output[
          series
        ] =
          (
            output[
              series
            ] ||
            0
          ) +
          1;

        return output;
      },
      {}
    ),

  examples:
    details
      .slice(
        0,
        5
      )
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
    detail:
      detailBackup
        ? path.relative(
            root,
            detailBackup
          )
        : "",

    page:
      pageBackup
        ? path.relative(
            root,
            pageBackup
          )
        : "",

    selectionClient:
      selectionClientBackup
        ? path.relative(
            root,
            selectionClientBackup
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
  ) +
    "\n",
  "utf8"
);

console.log("");
console.log(
  "Quick-connect model detail setup completed."
);

console.log(
  "Generated detail records: " +
  details.length
);

console.log(
  "Q20: " +
  details.filter(
    (item) =>
      item.seriesName ===
      "Q20"
  ).length
);

console.log(
  "Q40: " +
  details.filter(
    (item) =>
      item.seriesName ===
      "Q40"
  ).length
);

console.log(
  "Q60: " +
  details.filter(
    (item) =>
      item.seriesName ===
      "Q60"
  ).length
);

console.log("");
console.log(
  "Example:"
);

console.log(
  details[0].detailHref
);

console.log("");
console.log(
  "No CSS files were modified."
);