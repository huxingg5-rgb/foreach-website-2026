const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("已写入：" + path.relative(root, file));
}

function backup(file) {
  if (fs.existsSync(file)) {
    const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    fs.copyFileSync(file, `${file}.bak_tubing_image_cta_${stamp}`);
  }
}

/*
  1. 修复管路 JSON 主图路径
*/
const detailJson = path.join(root, "data/products/generated/tubing/detail/index.json");

if (!fs.existsSync(detailJson)) {
  console.error("找不到管路详情 JSON：data/products/generated/tubing/detail/index.json");
  process.exit(1);
}

backup(detailJson);

const details = JSON.parse(fs.readFileSync(detailJson, "utf8"));

for (const item of details) {
  const slug = item.slug;
  const imageDir = path.join(root, "public/images/products/tubing", slug);

  fs.mkdirSync(imageDir, { recursive: true });

  const mainImage = `/images/products/tubing/${slug}/${slug}-main.webp`;
  const view2 = `/images/products/tubing/${slug}/${slug}-view-02.webp`;
  const view3 = `/images/products/tubing/${slug}/${slug}-view-03.webp`;
  const view4 = `/images/products/tubing/${slug}/${slug}-view-04.webp`;
  const view5 = `/images/products/tubing/${slug}/${slug}-view-05.webp`;

  item.image = mainImage;
  item.mainImage = mainImage;
  item.imagePath = mainImage;
  item.imageAlt = item.title;
  item.alt = item.title;

  item.additionalImages = [view2, view3, view4, view5];
  item.images = [mainImage, view2, view3, view4, view5];
  item.thumbnails = [mainImage, view2, view3, view4, view5];

  const readme = `管路详情页图片位置

当前页面：${item.title}
页面路径：/products/tubing/${slug}

请把图片放在这个文件夹：
public/images/products/tubing/${slug}/

建议文件名：
1. ${slug}-main.webp       主图
2. ${slug}-view-02.webp    角度图 2
3. ${slug}-view-03.webp    角度图 3
4. ${slug}-view-04.webp    角度图 4
5. ${slug}-view-05.webp    角度图 5

网站引用路径不要写 public，页面中使用：
/images/products/tubing/${slug}/${slug}-main.webp
`;

  fs.writeFileSync(path.join(imageDir, "_image-slots.txt"), readme, "utf8");
}

fs.writeFileSync(detailJson, JSON.stringify(details, null, 2) + "\n", "utf8");
console.log("已更新管路主图路径，并创建图片文件夹。");

/*
  2. 重写管路详情页共享组件，强制在底部显示联系工程师 CTA
*/
const sharedPath = path.join(root, "app/products/tubing/_components/TubingDetailStaticPage.tsx");
backup(sharedPath);

const shared = `import type { ComponentType, CSSProperties } from "react";
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

    bottomCtaTitle:
      detail.bottomCtaTitle || "需要评估管路流阻与泵阀匹配？",
    bottomCtaDesc:
      detail.bottomCtaDesc ||
      "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    bottomCtaButton: detail.bottomCtaButton || "联系工程师",
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    showCustomInquiryCta: false,
    customInquiryHref: detail.bottomCtaHref || "/contact",
    contactHref: detail.bottomCtaHref || "/contact",
  };
}

const ctaWrapStyle: CSSProperties = {
  width: "min(1180px, calc(100% - 40px))",
  margin: "32px auto 56px",
  padding: "28px 32px",
  border: "1px solid rgba(23, 51, 104, 0.18)",
  background: "#f7fafc",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "24px",
  flexWrap: "wrap",
};

const ctaTextStyle: CSSProperties = {
  flex: "1 1 520px",
};

const ctaTitleStyle: CSSProperties = {
  margin: "0 0 10px",
  color: "#173368",
  fontSize: "24px",
  lineHeight: 1.25,
  fontWeight: 700,
};

const ctaDescStyle: CSSProperties = {
  margin: 0,
  color: "#334155",
  fontSize: "15px",
  lineHeight: 1.8,
};

const ctaButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "0 24px",
  borderRadius: "6px",
  background: "#173368",
  color: "#09E9B4",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 600,
  border: "1px solid #173368",
};

function TubingEngineerCta({ detail }: { detail: TubingDetailRecord }) {
  const title = detail.bottomCtaTitle || "需要评估管路流阻与泵阀匹配？";
  const desc =
    detail.bottomCtaDesc ||
    "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。";
  const button = detail.bottomCtaButton || "联系工程师";
  const href = detail.bottomCtaHref || "/contact";

  return (
    <section style={ctaWrapStyle} aria-label="管路工程师支持">
      <div style={ctaTextStyle}>
        <h2 style={ctaTitleStyle}>{title}</h2>
        <p style={ctaDescStyle}>{desc}</p>
      </div>
      <a href={href} style={ctaButtonStyle}>
        {button}
      </a>
    </section>
  );
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
      <TubingEngineerCta detail={detail} />
    </div>
  );
}
`;

write(sharedPath, shared);

console.log("");
console.log("图片放置位置：");
for (const item of details) {
  console.log("public/images/products/tubing/" + item.slug + "/" + item.slug + "-main.webp");
}

console.log("");
console.log("已强制显示管路详情页底部：联系工程师 CTA。");