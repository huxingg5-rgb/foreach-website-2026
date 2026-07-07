cd F:\WebsiteProjects\foreach-website-2026

New-Item -ItemType Directory -Force scripts\products | Out-Null

$Script = @'
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

function writeUtf8(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log("已写入：" + path.relative(root, filePath));
}

const baseImage = "/images/products/common/product-placeholder.svg";

const details = [
  {
    slug: "pvc-tubing",
    title: "PVC 管",
    material: "PVC",
    fullName: "聚氯乙烯（PVC）",
    idRange: "1.6mm~19.1mm",
    temp: "-42℃~75℃",
    extra: "55A / 65A 硬度，按目录规格选择",
    connection: "倒刺接头、快插接头等软管连接件",
    description: "PVC 管采用聚氯乙烯（PVC）材质，内径范围覆盖 1.6mm~19.1mm，工作温度范围为 -42℃~75℃。该系列管材柔性好，适用于常规低压液路、清洗液、废液和设备内部辅助管路连接。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["清洗液输送", "废液排放", "低压试剂连接", "设备内部软管布管", "常规液路转接"],
    features: ["柔性好，便于设备内部布管", "适合常规低压液体连接", "便于观察液体流动状态", "适合搭配倒刺接头、快插接头等软管连接件"],
    faq: [
      ["PVC 管适合哪些液路？", "PVC 管适合常规低压液路、清洗液、废液和设备内部辅助管路，不建议直接用于强腐蚀介质或高洁净要求很高的液路。"],
      ["PVC 管和 TPU 管怎么选？", "PVC 管更适合固定式低压管路和常规辅助液路；TPU 管弹性更好，更适合运动部件、反复弯折或动态布管位置。"],
      ["PVC 管内径如何确认？", "需要结合目标流量、泵阀接口、接头尺寸、管路长度和允许压降确认。内径过小会增加流体阻力，内径过大则可能增加死体积。"],
      ["PVC 管可以搭配哪些接头？", "PVC 管通常可搭配倒刺接头、快插接头等软管连接件，具体需要根据管材内径、软硬度、插入深度和工作压力确认。"],
      ["PVC 管选型前需要提供哪些信息？", "建议提供介质类型、目标流量、内径/外径、管路长度、温度范围、压力范围、接头类型和是否需要进行流阻或压降评估。"]
    ]
  },
  {
    slug: "tpu-tubing",
    title: "TPU 管",
    material: "TPU",
    fullName: "热塑性聚氨酯（TPU）",
    idRange: "3.7mm~7.0mm",
    temp: "-30℃~70℃",
    extra: "85A / 95A 硬度，按目录规格选择",
    connection: "倒刺接头、快插接头等软管连接件",
    description: "TPU 管采用热塑性聚氨酯（TPU）材质，内径范围覆盖 3.7mm~7.0mm，工作温度范围为 -30℃~70℃。该系列管材弹性好，适用于弯折、回弹、运动部件和设备内部动态布管场景。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["运动部件液路", "动态布管", "清洗液路径", "软管转接", "设备内部柔性连接"],
    features: ["弹性好，适合弯折布管", "适合运动部件和动态液路", "可按内径、长度和硬度需求选型", "适合搭配倒刺接头和软管连接件"],
    faq: [
      ["TPU 管适合哪些液路？", "TPU 管适合需要弯折、回弹或动态布管的柔性液路，例如运动部件连接、清洗液路径和设备内部软管转接。"],
      ["TPU 管和 PVC 管有什么区别？", "TPU 管弹性和耐弯折能力更适合动态液路；PVC 管更适合常规低压固定管路和成本敏感的辅助液路。"],
      ["TPU 管选型时为什么要关注弯折条件？", "弯折半径、运动频率和管路固定方式会影响管材寿命、流量稳定性和压降，因此动态布管场景需要提前确认。"],
      ["TPU 管可以搭配哪些接头？", "TPU 管通常可搭配倒刺接头或快插接头，具体需要结合管材内径、硬度、插入深度和工作压力确认密封可靠性。"],
      ["TPU 管选型前需要提供哪些信息？", "建议提供介质、目标流量、管径、管路长度、运动方式、弯折空间、温度范围、压力范围和接头类型。"]
    ]
  },
  {
    slug: "fep-tubing",
    title: "FEP 管",
    material: "FEP",
    fullName: "氟化乙烯丙烯共聚物（FEP）",
    idRange: "0.3mm~2.0mm",
    temp: "-230℃~200℃",
    extra: "50A / 60A 硬度，按目录规格选择",
    connection: "平底接头、卡箍接头、卡环接头等硬管连接件",
    description: "FEP 管采用氟化乙烯丙烯共聚物（FEP）材质，内径范围覆盖 0.3mm~2.0mm，工作温度范围为 -230℃~200℃。该系列管材具有良好的透明性和耐化学性，适用于试剂输送、样本路径和分析仪器液路连接。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["试剂输送", "样本路径", "分析仪器液路", "透明观察管路", "低吸附液路连接"],
    features: ["透明度好，便于观察液体状态", "耐化学性好，适合多种试剂路径", "适合低吸附、低残留液路", "可搭配平底接头、卡箍接头、卡环接头等硬管接头"],
    faq: [
      ["FEP 管适合哪些液路？", "FEP 管适合需要透明观察、耐化学和低吸附的试剂输送、样本路径和分析仪器液路。"],
      ["FEP 管和 PTFE 管怎么选？", "FEP 管透明度更好，更适合需要观察液体状态的管路；PTFE 管更强调低摩擦、低吸附和耐化学稳定性。"],
      ["FEP 管为什么适合观察液路状态？", "FEP 管透明性较好，便于观察气泡、液体状态和管路流动情况，适合仪器内部需要状态确认的试剂路径。"],
      ["FEP 管可以搭配哪些接头？", "FEP 管通常可搭配平底接头、卡箍接头、卡环接头等硬管连接件，具体需要确认管外径、端口结构和密封方式。"],
      ["FEP 管选型前需要确认哪些参数？", "建议确认介质类型、目标流量、内径/外径、管路长度、温度范围、压力范围、接头数量和是否需要流阻或死体积评估。"]
    ]
  },
  {
    slug: "ptfe-tubing",
    title: "PTFE 管",
    material: "PTFE",
    fullName: "聚四氟乙烯（PTFE）",
    idRange: "1.5mm~2.0mm",
    temp: "-200℃~260℃",
    extra: "可选本色、黑色和透明颜色，按目录规格选择",
    connection: "平底接头、卡箍接头、卡环接头等硬管连接件",
    description: "PTFE 管采用聚四氟乙烯（PTFE）材质，内径范围覆盖 1.5mm~2.0mm，工作温度范围为 -200℃~260℃。该系列管材具有低摩擦和耐化学特性，适用于低吸附、低残留和稳定输送要求较高的液路系统。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["低吸附试剂路径", "样本输送管路", "腐蚀性介质输送", "分析仪器液路", "稳定流体连接"],
    features: ["低摩擦，液体输送稳定", "耐化学性好", "适合低吸附、低残留液路", "可用于硬管连接结构"],
    faq: [
      ["PTFE 管适合哪些液路？", "PTFE 管适合对耐化学性、低吸附、低残留和稳定输送要求较高的试剂路径、样本路径和分析仪器液路。"],
      ["PTFE 管和 FEP 管怎么选？", "FEP 管更适合需要透明观察的液路；PTFE 管更适合强调低摩擦、低吸附和耐化学稳定性的液路。"],
      ["PTFE 管是否适合透明观察？", "PTFE 管通常不作为透明观察管路优先选择。如果需要观察气泡或液体状态，可以优先考虑 FEP 管。"],
      ["PTFE 管可以搭配哪些接头？", "PTFE 管通常可搭配平底接头、卡箍接头、卡环接头等硬管连接件，需根据管外径、端口结构和密封方式确认。"],
      ["PTFE 管选型时为什么要关注死体积？", "管路内径、长度、接头数量和端口结构都会影响死体积与残留量，分析仪器或低残留液路需要提前评估。"]
    ]
  },
  {
    slug: "peek-tubing",
    title: "PEEK 管",
    material: "PEEK",
    fullName: "聚醚醚酮（PEEK）",
    idRange: "0.2mm~0.8mm",
    temp: "-180℃~225℃",
    extra: "90A / 95A 硬度，按目录规格选择",
    connection: "高压接头、平底接头、卡箍接头、卡环接头等硬管连接件",
    description: "PEEK 管采用聚醚醚酮（PEEK）材质，内径范围覆盖 0.2mm~0.8mm，工作温度范围为 -180℃~225℃。该系列管材适用于精密分析仪器、小内径液路和对尺寸稳定性要求较高的流体连接场景。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["分析仪器液路", "小内径管路", "精密进样路径", "高稳定流体连接", "仪器内部硬管连接"],
    features: ["机械强度高", "尺寸稳定性好", "适合小内径精密液路", "适合分析仪器和高要求流体系统"],
    faq: [
      ["PEEK 管适合哪些仪器？", "PEEK 管适合分析仪器、精密液路、小内径流路和对尺寸稳定性要求较高的设备内部连接。"],
      ["PEEK 管和 FEP / PTFE 管怎么选？", "PEEK 管更强调机械强度、尺寸稳定和小内径精密连接；FEP / PTFE 更偏氟塑料耐化学和低吸附液路。"],
      ["PEEK 管选型时为什么要确认内径？", "PEEK 管常用于小内径流路，内径会直接影响流阻、流量、压力和系统响应，需要结合目标流量和管路长度确认。"],
      ["PEEK 管可以用于流阻计算吗？", "可以。提供目标流量、内径、管长、接头数量、介质黏度和压力范围后，可评估压降、流体阻力和泵阀匹配情况。"],
      ["PEEK 管选型前需要提供哪些信息？", "建议提供介质类型、目标流量、内径/外径、长度、温度、压力范围、接头类型和仪器空间限制。"]
    ]
  },
  {
    slug: "pfa-tubing",
    title: "PFA 管",
    material: "PFA",
    fullName: "全氟烷氧基树脂（PFA）",
    idRange: "0.5mm~1.0mm",
    temp: "-230℃~200℃",
    extra: "本色，按目录规格选择",
    connection: "平底接头、卡箍接头、卡环接头等硬管连接件",
    description: "PFA 管采用全氟烷氧基树脂（PFA）材质，内径范围覆盖 0.5mm~1.0mm，工作温度范围为 -230℃~200℃。该系列管材适用于高洁净、耐腐蚀和低析出要求较高的试剂输送与分析仪器液路。可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认。",
    applications: ["高纯试剂输送", "腐蚀性介质路径", "低析出液路", "高洁净流体系统", "分析仪器管路"],
    features: ["耐腐蚀性好", "适合高洁净液路", "低析出，适合高要求试剂路径", "可用于氟塑料硬管连接结构"],
    faq: [
      ["PFA 管适合哪些液路？", "PFA 管适合高洁净、耐腐蚀、低析出和高要求试剂输送场景，也可用于分析仪器内部高要求流体系统。"],
      ["PFA 管和 PTFE 管怎么选？", "PFA 综合性能接近 PTFE，同时成型加工性更好，适合对高洁净、耐腐蚀和加工稳定性都有要求的液路。"],
      ["PFA 管适合腐蚀性介质吗？", "PFA 管适合多种腐蚀性介质路径，但具体仍需结合介质类型、浓度、温度和接触时间确认材料兼容性。"],
      ["PFA 管可以搭配哪些接头？", "PFA 管通常可搭配平底接头、卡箍接头、卡环接头等硬管连接件，需确认管外径、密封结构和安装空间。"],
      ["PFA 管选型前需要确认哪些信息？", "建议提供介质类型、浓度、目标流量、内径/外径、管路长度、温度、压力范围、接头数量和洁净度要求。"]
    ]
  }
];

const normalized = details.map((item) => {
  const faqs = item.faq.map(([question, answer]) => ({
    question,
    answer,
    q: question,
    a: answer,
  }));

  return {
    slug: item.slug,
    title: item.title,
    name: item.title,
    model: item.title,
    h1Title: item.title,
    pageTitle: item.title,
    displayModel: "按材质与尺寸选型",
    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "管路系列",
    category: "tubing",
    detailMode: "material_selection",
    material: item.material,
    materialFullName: item.fullName,
    innerDiameterRange: item.idRange,
    workingTemperature: item.temp,
    image: baseImage,
    additionalImages: [],
    images: [],
    thumbnails: [],
    description: item.description,
    shortDescription: item.description,
    commonApplications: item.applications,
    features: item.features,
    sellingPoints: item.features,
    advantages: item.features,
    specsTitle: "规格",
    specTitle: "规格",
    specificationTitle: "规格",
    specs: [
      { label: "材料", value: item.material },
      { label: "材料全称", value: item.fullName },
      { label: "内径范围", value: item.idRange },
      { label: "工作温度", value: item.temp },
      { label: "规格补充", value: item.extra },
      { label: "适配连接方式", value: item.connection },
      { label: "材料合规资料", value: "可提供 RoHS 等材料合规资料，具体文件随材质与项目要求确认" },
    ],
    faq: faqs,
    faqs,
    faqItems: faqs,
    detailFaqs: faqs,
    bottomCtaTitle: "需要评估管路流阻与泵阀匹配？",
    bottomCtaDesc:
      "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    bottomCtaButton: "联系工程师",
    bottomCtaHref: "/contact",
  };
});

const detailJsonPath = path.join(root, "data/products/generated/tubing/detail/index.json");
backup(detailJsonPath, "tubing_detail_before_write");
writeUtf8(detailJsonPath, JSON.stringify(normalized, null, 2) + "\n");

const pagePath = path.join(root, "app/products/tubing/[slug]/page.tsx");
backup(pagePath, "tubing_page_before_write");

const pageCode = `import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";

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
  additionalImages?: string[];
  images?: string[];
  thumbnails?: string[];
  commonApplications?: string[];
  features?: string[];
  specsTitle?: string;
  specTitle?: string;
  specificationTitle?: string;
  specs?: { label: string; value: string }[];
  faq?: { question: string; answer: string; q?: string; a?: string }[];
  faqs?: { question: string; answer: string; q?: string; a?: string }[];
  faqItems?: { question: string; answer: string; q?: string; a?: string }[];
  detailFaqs?: { question: string; answer: string; q?: string; a?: string }[];
  bottomCtaTitle?: string;
  bottomCtaDesc?: string;
  bottomCtaButton?: string;
  bottomCtaHref?: string;
};

const details = tubingDetailData as TubingDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return details.map((item) => ({ slug: item.slug }));
}

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

function getFaqItems(detail: TubingDetailRecord) {
  const rawFaqItems = Array.isArray(detail.faq)
    ? detail.faq
    : Array.isArray(detail.faqs)
      ? detail.faqs
      : Array.isArray(detail.faqItems)
        ? detail.faqItems
        : Array.isArray(detail.detailFaqs)
          ? detail.detailFaqs
          : [];

  return rawFaqItems
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
  const faqItems = getFaqItems(detail);

  return {
    ...detail,
    slug: detail.slug,
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
    mainImage: image,
    imagePath: image,
    alt: detail.title,
    imageAlt: detail.title,
    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],
    description: detail.description,
    shortDescription: detail.description,
    commonApplications: Array.isArray(detail.commonApplications) ? detail.commonApplications : [],
    features: Array.isArray(detail.features) ? detail.features : [],
    sellingPoints: Array.isArray(detail.features) ? detail.features : [],
    advantages: Array.isArray(detail.features) ? detail.features : [],
    specsTitle: detail.specsTitle || "规格",
    specTitle: detail.specTitle || detail.specsTitle || "规格",
    specificationTitle: detail.specificationTitle || detail.specsTitle || "规格",
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return { title: "管路系列 | FOREACH" };
  }

  return {
    title: `${detail.title} | FOREACH 管路系列`,
    description: detail.description,
  };
}

export default async function TubingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

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

writeUtf8(pagePath, pageCode);

const clientPath = path.join(root, "components/products/detail/ProductDetailClient.tsx");

if (fs.existsSync(clientPath)) {
  backup(clientPath, "tubing_bottom_cta_before_patch");

  let client = fs.readFileSync(clientPath, "utf8");
  const marker = "TUBING_DETAIL_BOTTOM_CTA_20260707";

  if (!client.includes(marker)) {
    const helperCode = `
/*
  ${marker}
  管路详情页底部 CTA：流阻计算、压降估算、死体积评估、管材与泵阀匹配。
*/
function isTubingDetailData(data: any): boolean {
  return (
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"))
  );
}

function getTubingDetailBottomCta(data: any) {
  if (!isTubingDetailData(data)) {
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

    if (client.includes("function getPlungerPumpBottomCta(data: any)")) {
      client = client.replace(
        "function getPlungerPumpBottomCta(data: any)",
        helperCode + "function getPlungerPumpBottomCta(data: any)"
      );
    } else {
      client += "\n" + helperCode;
    }
  }

  if (
    client.includes("function getPlungerPumpBottomCta(data: any)") &&
    !client.includes("const tubingBottomCta = getTubingDetailBottomCta(data);")
  ) {
    client = client.replace(
      /function getPlungerPumpBottomCta\(data: any\) \{\s*/,
      `function getPlungerPumpBottomCta(data: any) {
  const tubingBottomCta = getTubingDetailBottomCta(data);

  if (tubingBottomCta) {
    return tubingBottomCta;
  }

  `
    );
  }

  writeUtf8(clientPath, client);
} else {
  console.log("未找到 ProductDetailClient.tsx，跳过底部 CTA 补丁。");
}

console.log("");
console.log("管路详情页已生成：");
for (const item of normalized) {
  console.log("/products/tubing/" + item.slug);
}
console.log("");
console.log("建议下一步运行：npm run build");
'@

[System.IO.File]::WriteAllText(
  (Join-Path (Get-Location) "scripts\products\add-tubing-detail-pages-clean.cjs"),
  $Script,
  [System.Text.UTF8Encoding]::new($false)
)

node scripts\products\add-tubing-detail-pages-clean.cjs

Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

npm run dev
