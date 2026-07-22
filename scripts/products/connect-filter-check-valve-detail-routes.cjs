const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const routes = [
  {
    type: "filters",
    componentName: "FilterDetailPage",
    fallbackName: "过滤器",
    jsonImport:
      "@/data/products/generated/fittings/filters/detail/index.json",
  },
  {
    type: "check-valves",
    componentName: "CheckValveDetailPage",
    fallbackName: "单向阀",
    jsonImport:
      "@/data/products/generated/fittings/check-valves/detail/index.json",
  },
];

function createRouteSource(config) {
  return `import type {
  ComponentType,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import detailsJson from "${config.jsonImport}";

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
    value || ""
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
    findDetail(
      slug
    );

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      \`\${detail.model} \${detail.name || detail.title || "${config.fallbackName}"} | FOREACH\`,

    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function ${config.componentName}({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

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
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

for (const config of routes) {
  const directory = path.join(
    root,
    "app",
    "products",
    "fittings",
    config.type,
    "[slug]"
  );

  const targetPath = path.join(
    directory,
    "page.tsx"
  );

  fs.mkdirSync(
    directory,
    {
      recursive: true,
    }
  );

  if (fs.existsSync(targetPath)) {
    const backupPath =
      `${targetPath}.bak_connect_detail_${stamp}`;

    fs.copyFileSync(
      targetPath,
      backupPath
    );

    console.log(
      "已备份：",
      backupPath
    );
  }

  const source =
    createRouteSource(
      config
    );

  const result =
    ts.transpileModule(
      source,
      {
        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          jsx:
            ts.JsxEmit.Preserve,
        },

        reportDiagnostics:
          true,

        fileName:
          targetPath,
      }
    );

  const errors =
    (
      result.diagnostics ||
      []
    ).filter(
      (diagnostic) =>
        diagnostic.category ===
        ts.DiagnosticCategory.Error
    );

  if (errors.length) {
    throw new Error(
      `${config.type}路由语法检查失败：\n` +
        errors
          .map(
            (diagnostic) =>
              ts.flattenDiagnosticMessageText(
                diagnostic.messageText,
                "\n"
              )
          )
          .join("\n")
    );
  }

  fs.writeFileSync(
    targetPath,
    source,
    "utf8"
  );

  console.log(
    "已创建：",
    targetPath
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀详情路由接入完成"
);
console.log(
  "============================================"
);
console.log(
  "未新增CSS"
);
console.log(
  "未修改ProductDetailClient"
);
console.log(
  "未修改详情页结构"
);
console.log(
  "直接复用现有产品详情页样式"
);
console.log("");
