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
  1. 只更新管路 JSON：主图路径 + CTA 文案
*/
const jsonPath = path.join(root, "data/products/generated/tubing/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到：" + path.relative(root, jsonPath));
  process.exit(1);
}

backup(jsonPath, "before_tubing_image_cta");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

for (const item of details) {
  const slug = item.slug;
  const dir = path.join(root, "public/images/products/tubing", slug);
  fs.mkdirSync(dir, { recursive: true });

  const main = `/images/products/tubing/${slug}/${slug}-main.webp`;
  const view2 = `/images/products/tubing/${slug}/${slug}-view-02.webp`;
  const view3 = `/images/products/tubing/${slug}/${slug}-view-03.webp`;
  const view4 = `/images/products/tubing/${slug}/${slug}-view-04.webp`;
  const view5 = `/images/products/tubing/${slug}/${slug}-view-05.webp`;

  item.image = main;
  item.mainImage = main;
  item.imagePath = main;
  item.imageAlt = item.title;
  item.alt = item.title;

  item.images = [main, view2, view3, view4, view5];
  item.thumbnails = [main, view2, view3, view4, view5];
  item.additionalImages = [view2, view3, view4, view5];

  item.bottomCtaTitle = "需要评估管路流阻与泵阀匹配？";
  item.bottomCtaDesc =
    "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。";
  item.bottomCtaButton = "联系工程师";
  item.bottomCtaHref = "/contact";

  const note = `图片放置说明

页面：${item.title}
路由：/products/tubing/${slug}

请把主图放到：
public/images/products/tubing/${slug}/${slug}-main.webp

可选角度图：
public/images/products/tubing/${slug}/${slug}-view-02.webp
public/images/products/tubing/${slug}/${slug}-view-03.webp
public/images/products/tubing/${slug}/${slug}-view-04.webp
public/images/products/tubing/${slug}/${slug}-view-05.webp
`;

  fs.writeFileSync(path.join(dir, "_image-slots.txt"), note, "utf8");
}

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");
console.log("已更新管路 JSON 主图路径和 CTA 文案。");

/*
  2. 重写管路静态详情页组件
  注意：这里不写任何新样式，不额外渲染新的 CTA。
  只把数据交给 ProductDetailClient，让它用原来的详情页样式。
*/
const sharedPath = path.join(root, "app/products/tubing/_components/TubingDetailStaticPage.tsx");
backup(sharedPath, "before_remove_custom_cta_style");

const shared = `import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";

type FaqItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type TubingDetailRecord = {
  slug: string;
  title: string;
  name?: string;
  model?: string;
  h1Title?: string;
  pageTitle?: string;
  displayModel?: string;
  description: string;
  image?: string;
  mainImage?: string;
  imagePath?: string;
  additionalImages?: string[];
  images?: string[];
  thumbnails?: string[];
  commonApplications?: string[];
  features?: string[];
  specs?: { label: string; value: string }[];
  faq?: FaqItem[];
  faqs?: FaqItem[];
  faqItems?: FaqItem[];
  detailFaqs?: FaqItem[];
  bottomCtaTitle?: string;
  bottomCtaDesc?: string;
  bottomCtaButton?: string;
  bottomCtaHref?: string;
};

const records = tubingDetailData as TubingDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

function findDetail(slug: string) {
  return records.find((item) => item.slug === slug);
}

function getFaqItems(detail: TubingDetailRecord) {
  const raw = Array.isArray(detail.faq)
    ? detail.faq
    : Array.isArray(detail.faqs)
      ? detail.faqs
      : Array.isArray(detail.faqItems)
        ? detail.faqItems
        : Array.isArray(detail.detailFaqs)
          ? detail.detailFaqs
          : [];

  return raw
    .map((item) => ({
      question: item.question || item.q || "",
      answer: item.answer || item.a || "",
      q: item.question || item.q || "",
      a: item.answer || item.a || "",
    }))
    .filter((item) => item.question && item.answer);
}

function toClientData(detail: TubingDetailRecord) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";
  const images = Array.isArray(detail.images) && detail.images.length > 0 ? detail.images : [image];
  const faqItems = getFaqItems(detail);

  return {
    ...detail,

    title: detail.title,
    name: detail.name || detail.title,
    model: detail.model || detail.title,
    h1Title: detail.h1Title || detail.title,
    pageTitle: detail.pageTitle || detail.title,
    displayModel: detail.displayModel || "按材质与尺寸选型",

    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "管路系列",
    category: "tubing",
    detailMode: "material_selection",

    image,
    mainImage: detail.mainImage || image,
    imagePath: detail.imagePath || image,
    alt: detail.title,
    imageAlt: detail.title,
    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images,
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : images,

    description: detail.description,
    shortDescription: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    features: Array.isArray(detail.features) ? detail.features : [],
    sellingPoints: Array.isArray(detail.features) ? detail.features : [],
    advantages: Array.isArray(detail.features) ? detail.features : [],

    specsTitle: "规格",
    specTitle: "规格",
    specificationTitle: "规格",
    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: faqItems,
    faqs: faqItems,
    faqItems,
    detailFaqs: faqItems,

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDesc: detail.bottomCtaDesc,
    bottomCtaButton: detail.bottomCtaButton,
    bottomCtaHref: detail.bottomCtaHref,

    showCustomInquiryCta: true,
    customInquiryHref: detail.bottomCtaHref || "/contact",
    contactHref: detail.bottomCtaHref || "/contact",
  };
}

export function getTubingMetadata(slug: string): Metadata {
  const detail = findDetail(slug);

  if (!detail) {
    return {
      title: "管路系列 | FOREACH",
    };
  }

  return {
    title: \`\${detail.title} | FOREACH 管路系列\`,
    description: detail.description,
  };
}

export default function TubingDetailStaticPage({ slug }: { slug: string }) {
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <div data-tubing-detail-page="true">
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );
}
`;

write(sharedPath, shared);

/*
  3. 只给 ProductDetailClient 增加 tubing CTA 数据入口
  不改 CSS，不写新样式。
*/
const clientPath = path.join(root, "components/products/detail/ProductDetailClient.tsx");

if (fs.existsSync(clientPath)) {
  backup(clientPath, "before_tubing_cta_data_patch");

  let client = fs.readFileSync(clientPath, "utf8");
  const marker = "TUBING_CTA_DATA_ONLY_20260707";

  if (!client.includes(marker) && client.includes("function getPlungerPumpBottomCta(data: any)")) {
    const helper = `
/*
  ${marker}
  管路详情页复用现有底部 CTA 样式，只提供 CTA 数据，不新增样式。
*/
function getTubingBottomCtaData(data: any) {
  const isTubing =
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"));

  if (!isTubing) {
    return null;
  }

  return {
    title: data?.bottomCtaTitle || "需要评估管路流阻与泵阀匹配？",
    desc:
      data?.bottomCtaDesc ||
      "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    button: data?.bottomCtaButton || "联系工程师",
    href: data?.bottomCtaHref || data?.contactHref || "/contact",
  };
}

`;

    client = client.replace(
      "function getPlungerPumpBottomCta(data: any)",
      helper + "function getPlungerPumpBottomCta(data: any)"
    );

    client = client.replace(
      /function getPlungerPumpBottomCta\(data: any\) \{\s*/,
      `function getPlungerPumpBottomCta(data: any) {
  const tubingCta = getTubingBottomCtaData(data);

  if (tubingCta) {
    return tubingCta;
  }

  `
    );

    fs.writeFileSync(clientPath, client, "utf8");
    console.log("已接入管路 CTA 数据，未修改样式。");
  } else {
    console.log("ProductDetailClient 已有管路 CTA 数据入口，或未找到 getPlungerPumpBottomCta，已跳过。");
  }
}

console.log("");
console.log("图片位置：");
for (const item of details) {
  console.log("public/images/products/tubing/" + item.slug + "/" + item.slug + "-main.webp");
}