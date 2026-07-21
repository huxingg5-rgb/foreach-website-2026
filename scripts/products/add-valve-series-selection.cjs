/* =========================================================
   add-valve-series-selection.cjs
   恒永达官网｜阀系列产品中心接入脚本

   作用：
   1. 新增阀系列选型卡片数据
   2. 新增阀系列详情页基础数据
   3. 新增 /products/valves/[slug] 详情页
   4. 自动修改 ProductSelectionClient.tsx，把阀系列接入产品中心
   5. 所有被修改的旧文件都会自动备份，方便出错后回退

   当前阀系列分为：
   - 旋转阀 rotary-valves
   - 高压阀 high-pressure-valves
   - 电磁阀 solenoid-valves

   重要说明：
   这一步是“阀系列第一版官网接入”，先解决产品中心有内容、
   卡片能显示、详情页不 404。后续拿到完整规格表后，再做
   xlsx -> generated -> service -> ProductDetailClient 的正式数据库化详情页。
========================================================= */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

/* =========================================================
   基础工具函数
========================================================= */

/**
 * 生成当前时间戳，用于备份文件名。
 */
function getStamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "_",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
}

/**
 * 把项目相对路径转换成绝对路径。
 */
function resolveProjectPath(relativePath) {
  return path.join(root, relativePath);
}

/**
 * 确保目录存在。
 */
function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * 写文件前自动备份。
 */
function writeFileWithBackup(relativePath, content) {
  const filePath = resolveProjectPath(relativePath);
  ensureDir(filePath);

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_valve_series_${getStamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`已备份：${path.relative(root, backupPath)}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`已写入：${relativePath}`);
}

/**
 * 修改文件前自动备份。
 */
function patchFile(relativePath, patcher) {
  const filePath = resolveProjectPath(relativePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`找不到文件：${relativePath}`);
  }

  const original = fs.readFileSync(filePath, "utf8");
  const patched = patcher(original);

  if (patched === original) {
    console.log(`无变化：${relativePath}`);
    return;
  }

  const backupPath = `${filePath}.bak_valve_series_${getStamp()}`;
  fs.copyFileSync(filePath, backupPath);
  fs.writeFileSync(filePath, patched, "utf8");

  console.log(`已修改：${relativePath}`);
  console.log(`已备份：${path.relative(root, backupPath)}`);
}

/* =========================================================
   1. 新增阀系列产品中心卡片数据
========================================================= */

const valveSelectionData = String.raw`/* =========================================================
   valve-selection.generated.ts
   恒永达官网｜阀系列产品中心卡片数据

   说明：
   1. 当前文件用于产品中心“阀系列”第一版上线
   2. 后续如果整理出阀系列 Excel 数据源，可再改为 xlsx 自动生成
   3. 这里先放三类阀：旋转阀、高压阀、电磁阀
   4. 字段保留较完整，是为了兼容现有产品卡片、筛选、清单功能
========================================================= */

import type { ProductSelectionProduct } from "./product-selection.types";

/**
 * 阀系列筛选标签。
 * ProductSelectionClient 会把这些标签合并到现有筛选系统里。
 */
export const valveFilterLabels = {
  filter01: "阀类型",
  filter02: "液路功能",
  filter03: "压力范围",
  filter04: "配置方式",
} as const;

/**
 * 阀系列产品中心卡片。
 *
 * 注意：
 * - 这里使用 as unknown as ProductSelectionProduct[]
 *   是为了兼容当前产品中心历史字段较多、不同系列字段不完全统一的问题。
 * - 后续阀系列完成数据库化后，可以把字段正式收敛到统一类型。
 */
const valveProducts = [
  {
    id: "rotary-valves",
    productId: "rotary-valves",
    productCode: "ROTARY-VALVE-SERIES",
    code: "ROTARY-VALVE-SERIES",
    model: "Rotary Valve Series",
    title: "旋转阀系列",
    name: "旋转阀系列",
    productName: "旋转阀系列",
    seriesName: "旋转阀",
    categoryId: "valves",
    categoryLabel: "阀系列",
    productTypeId: "rotary-valves",
    productTypeLabel: "旋转阀",
    seriesId: "rotary-valves",
    seriesLabel: "旋转阀",
    image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imagePath: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imageUrl: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imageAlt: "FOREACH 旋转阀系列",
    subtitle: "多通道流路切换 / 试剂选择 / 清洗路径管理",
    cardSubtitle: "多通道流路切换 / 试剂选择 / 清洗路径管理",
    description:
      "旋转阀用于多试剂、多样本、多清洗液和多废液路径的集中切换，适合自动化分析仪器、IVD、生命科学和实验室自动化设备中的多通道流路管理。",
    summary:
      "用于多通道路径切换、试剂选择、清洗路径管理和复杂液路集成。",
    tags: ["多通道切换", "路径管理", "低残留"],
    specs: [
      { label: "功能定位", value: "多通道流路切换" },
      { label: "典型应用", value: "试剂选择、清洗路径、废液路径管理" },
      { label: "配置方式", value: "按通道数、接口、材料和安装空间定制" },
    ],
    filter01: "旋转阀",
    filter02: "多通道切换",
    filter03: "常规压力",
    filter04: "定制配置",
    filters: {
      filter01: "旋转阀",
      filter02: "多通道切换",
      filter03: "常规压力",
      filter04: "定制配置",
    },
    href: "/products/valves/rotary-valves",
    detailHref: "/products/valves/rotary-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },
  {
    id: "high-pressure-valves",
    productId: "high-pressure-valves",
    productCode: "HIGH-PRESSURE-VALVE-SERIES",
    code: "HIGH-PRESSURE-VALVE-SERIES",
    model: "High-pressure Valve Series",
    title: "高压阀系列",
    name: "高压阀系列",
    productName: "高压阀系列",
    seriesName: "高压阀",
    categoryId: "valves",
    categoryLabel: "阀系列",
    productTypeId: "high-pressure-valves",
    productTypeLabel: "高压阀",
    seriesId: "high-pressure-valves",
    seriesLabel: "高压阀",
    image: "/images/products/common/product-placeholder.svg",
    imagePath: "/images/products/common/product-placeholder.svg",
    imageUrl: "/images/products/common/product-placeholder.svg",
    imageAlt: "FOREACH 高压阀系列",
    subtitle: "高压液路控制 / 分析仪器流路切换 / 耐压场景",
    cardSubtitle: "高压液路控制 / 分析仪器流路切换 / 耐压场景",
    description:
      "高压阀用于高压流体控制、分析检测流路切换和耐压液路模块集成，适合对密封可靠性、耐压能力和流路稳定性要求较高的自动化仪器。",
    summary:
      "用于高压流体控制、分析仪器流路切换和耐压液路集成。",
    tags: ["高压控制", "密封可靠", "分析仪器"],
    specs: [
      { label: "功能定位", value: "高压液路控制" },
      { label: "典型应用", value: "高压流路切换、分析检测、耐压液路模块" },
      { label: "配置方式", value: "按压力范围、接口、材料和密封结构确认" },
    ],
    filter01: "高压阀",
    filter02: "高压控制",
    filter03: "高压",
    filter04: "定制配置",
    filters: {
      filter01: "高压阀",
      filter02: "高压控制",
      filter03: "高压",
      filter04: "定制配置",
    },
    href: "/products/valves/high-pressure-valves",
    detailHref: "/products/valves/high-pressure-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },
  {
    id: "solenoid-valves",
    productId: "solenoid-valves",
    productCode: "SOLENOID-VALVE-SERIES",
    code: "SOLENOID-VALVE-SERIES",
    model: "Solenoid Valve Series",
    title: "电磁阀系列",
    name: "电磁阀系列",
    productName: "电磁阀系列",
    seriesName: "电磁阀",
    categoryId: "valves",
    categoryLabel: "阀系列",
    productTypeId: "solenoid-valves",
    productTypeLabel: "电磁阀",
    seriesId: "solenoid-valves",
    seriesLabel: "电磁阀",
    image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imagePath: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imageUrl: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imageAlt: "FOREACH 电磁阀系列",
    subtitle: "通断控制 / 试剂路径控制 / 液路模块集成",
    cardSubtitle: "通断控制 / 试剂路径控制 / 液路模块集成",
    description:
      "电磁阀用于液路通断控制、试剂路径控制和自动化仪器阀组集成，适合 IVD、生命科学、实验室自动化和分析仪器中的小型化流体控制模块。",
    summary:
      "用于液路通断控制、试剂路径控制和自动化仪器阀组集成。",
    tags: ["通断控制", "响应快速", "模块集成"],
    specs: [
      { label: "功能定位", value: "液路通断控制" },
      { label: "典型应用", value: "试剂路径、清洗路径、废液路径通断" },
      { label: "配置方式", value: "按通路、位数、接口、密封材料和驱动方式确认" },
    ],
    filter01: "电磁阀",
    filter02: "通断控制",
    filter03: "常规压力",
    filter04: "定制配置",
    filters: {
      filter01: "电磁阀",
      filter02: "通断控制",
      filter03: "常规压力",
      filter04: "定制配置",
    },
    href: "/products/valves/solenoid-valves",
    detailHref: "/products/valves/solenoid-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },
] as const;

export const valveSelectionProducts =
  valveProducts as unknown as ProductSelectionProduct[];
`;

writeFileWithBackup(
  "data/products/selection/valve-selection.generated.ts",
  valveSelectionData,
);

/* =========================================================
   2. 新增阀系列详情页数据
========================================================= */

const valveDetailJson = JSON.stringify(
  [
    {
      slug: "rotary-valves",
      title: "旋转阀系列",
      seoTitle: "旋转阀系列｜多通道流路切换与试剂路径管理",
      model: "Rotary Valve Series",
      productTypeName: "旋转阀",
      description:
        "旋转阀用于多试剂、多样本、多清洗液和多废液路径的集中切换，适合自动化分析仪器、IVD、生命科学和实验室自动化设备中的多通道流路管理。",
      image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
      applications: [
        "多试剂路径切换",
        "样本与清洗液路径管理",
        "废液路径集中控制",
        "自动化分析仪器多通道液路",
      ],
      advantages: [
        "适合复杂液路中的多通道切换",
        "减少多个单独阀组带来的空间占用",
        "便于进行试剂、清洗液和废液路径集中管理",
        "可根据通道数、接口、材料和安装空间进行配置确认",
      ],
      specs: [
        { label: "产品类型", value: "旋转阀" },
        { label: "核心功能", value: "多通道流路切换" },
        { label: "典型应用", value: "试剂选择、清洗路径、废液路径管理" },
        { label: "配置方式", value: "按通道数、接口、材料和安装空间确认" },
      ],
    },
    {
      slug: "high-pressure-valves",
      title: "高压阀系列",
      seoTitle: "高压阀系列｜高压流体控制与分析仪器液路切换",
      model: "High-pressure Valve Series",
      productTypeName: "高压阀",
      description:
        "高压阀用于高压流体控制、分析检测流路切换和耐压液路模块集成，适合对密封可靠性、耐压能力和流路稳定性要求较高的自动化仪器。",
      image: "/images/products/common/product-placeholder.svg",
      applications: [
        "高压流路切换",
        "分析检测液路控制",
        "耐压液路模块集成",
        "高压样品或试剂路径管理",
      ],
      advantages: [
        "面向高压流体控制场景",
        "重点关注密封可靠性和耐压稳定性",
        "适合分析仪器中的高压流路切换",
        "可根据压力范围、接口、材料和密封结构确认配置",
      ],
      specs: [
        { label: "产品类型", value: "高压阀" },
        { label: "核心功能", value: "高压液路控制" },
        { label: "典型应用", value: "高压流路切换、分析检测、耐压液路模块" },
        { label: "配置方式", value: "按压力范围、接口、材料和密封结构确认" },
      ],
    },
    {
      slug: "solenoid-valves",
      title: "电磁阀系列",
      seoTitle: "电磁阀系列｜液路通断控制与自动化仪器阀组集成",
      model: "Solenoid Valve Series",
      productTypeName: "电磁阀",
      description:
        "电磁阀用于液路通断控制、试剂路径控制和自动化仪器阀组集成，适合 IVD、生命科学、实验室自动化和分析仪器中的小型化流体控制模块。",
      image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
      applications: [
        "试剂路径通断控制",
        "清洗液路径控制",
        "废液路径控制",
        "自动化仪器阀组集成",
      ],
      advantages: [
        "适合液路通断控制和路径管理",
        "便于与泵、传感器、接头和管路组合使用",
        "适合小型化自动化仪器液路模块",
        "可根据通路、位数、接口、密封材料和驱动方式确认配置",
      ],
      specs: [
        { label: "产品类型", value: "电磁阀" },
        { label: "核心功能", value: "液路通断控制" },
        { label: "典型应用", value: "试剂路径、清洗路径、废液路径通断" },
        { label: "配置方式", value: "按通路、位数、接口、密封材料和驱动方式确认" },
      ],
    },
  ],
  null,
  2,
);

writeFileWithBackup(
  "data/products/generated/valves/detail/index.json",
  `${valveDetailJson}\n`,
);

/* =========================================================
   3. 新增阀系列详情页路由
========================================================= */

const valveDetailPage = String.raw`/* =========================================================
   app/products/valves/[slug]/page.tsx
   恒永达官网｜阀系列详情页入口

   说明：
   1. 当前页面用于阀系列第一版详情页
   2. 数据读取自 data/products/generated/valves/detail/index.json
   3. 后续阀系列完成参数表后，可再改成正式 ProductDetailClient 统一详情页
   4. 当前页面支持静态导出 generateStaticParams
========================================================= */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import details from "@/data/products/generated/valves/detail/index.json";

import "./valve-detail.css";

type ValveDetail = (typeof details)[number];

type ValveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * 根据 slug 获取阀系列详情数据。
 */
function getValveDetailBySlug(slug: string): ValveDetail | null {
  return details.find((item) => item.slug === slug) || null;
}

/**
 * 静态导出需要预生成所有阀系列详情路径。
 */
export function generateStaticParams() {
  return details.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * 详情页 SEO 信息。
 */
export async function generateMetadata({
  params,
}: ValveDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getValveDetailBySlug(slug);

  if (!detail) {
    return {};
  }

  return {
    title: detail.seoTitle,
    description: detail.description,
  };
}

/**
 * 阀系列详情页。
 */
export default async function ValveDetailPage({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const detail = getValveDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="valve-detail-page">
      <section className="valve-detail-hero">
        <div className="valve-detail-hero__media">
          <Image
            src={detail.image}
            alt={detail.title}
            width={640}
            height={480}
            priority
          />
        </div>

        <div className="valve-detail-hero__content">
          <p className="valve-detail-eyebrow">阀系列 / Valve Series</p>
          <h1>{detail.title}</h1>
          <p className="valve-detail-model">{detail.model}</p>
          <p className="valve-detail-desc">{detail.description}</p>

          <div className="valve-detail-actions">
            <Link className="valve-detail-primary" href="/contact">
              联系我们
            </Link>
            <Link className="valve-detail-secondary" href="/products">
              返回产品中心
            </Link>
          </div>
        </div>
      </section>

      <section className="valve-detail-section">
        <div className="valve-detail-section__head">
          <p>Applications</p>
          <h2>常见应用</h2>
        </div>

        <div className="valve-detail-chip-grid">
          {detail.applications.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="valve-detail-section">
        <div className="valve-detail-section__head">
          <p>Advantages</p>
          <h2>产品特点</h2>
        </div>

        <div className="valve-detail-card-grid">
          {detail.advantages.map((item) => (
            <article key={item} className="valve-detail-card">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="valve-detail-section">
        <div className="valve-detail-section__head">
          <p>Specifications</p>
          <h2>基础规格</h2>
        </div>

        <table className="valve-detail-table">
          <tbody>
            {detail.specs.map((item) => (
              <tr key={item.label}>
                <th>{item.label}</th>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="valve-detail-cta">
        <div>
          <h2>需要确认阀系列配置？</h2>
          <p>
            可根据液体介质、压力范围、通路数量、接口方式、密封材料和安装空间提交需求，
            恒永达可协助确认适合自动化仪器集成的阀类产品配置。
          </p>
        </div>
        <Link href="/contact">提交需求</Link>
      </section>
    </main>
  );
}
`;

writeFileWithBackup("app/products/valves/[slug]/page.tsx", valveDetailPage);

/* =========================================================
   4. 新增阀系列详情页 CSS
========================================================= */

const valveDetailCss = String.raw`/* =========================================================
   valve-detail.css
   恒永达官网｜阀系列详情页样式

   说明：
   1. 仅作用于 /products/valves/[slug]
   2. 使用品牌深蓝 #173368 与科技强调色 #09E9B4
   3. 保持 B2B 工业精密感，不使用电商风大阴影
========================================================= */

.valve-detail-page {
  background: #f6f8fb;
  color: #173368;
}

.valve-detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
  gap: 56px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 72px 40px 56px;
}

.valve-detail-hero__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 520px;
  background: #ffffff;
  border: 1px solid rgba(23, 51, 104, 0.12);
}

.valve-detail-hero__media img {
  width: min(78%, 560px);
  height: auto;
  object-fit: contain;
}

.valve-detail-hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.valve-detail-eyebrow {
  margin: 0 0 14px;
  color: #09a988;
  font-size: 15px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.valve-detail-hero h1 {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.12;
  color: #173368;
}

.valve-detail-model {
  margin: 16px 0 0;
  font-size: 20px;
  color: rgba(23, 51, 104, 0.72);
}

.valve-detail-desc {
  margin: 28px 0 0;
  font-size: 18px;
  line-height: 1.9;
  color: rgba(16, 30, 58, 0.86);
}

.valve-detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.valve-detail-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  height: 44px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.valve-detail-primary {
  background: #173368;
  border: 1px solid #173368;
  color: #09e9b4;
}

.valve-detail-primary:hover {
  background: #10264f;
  color: #09e9b4;
}

.valve-detail-secondary {
  background: #ffffff;
  border: 1px solid rgba(23, 51, 104, 0.24);
  color: #173368;
}

.valve-detail-secondary:hover {
  border-color: #173368;
}

.valve-detail-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 40px 56px;
}

.valve-detail-section__head {
  margin-bottom: 24px;
}

.valve-detail-section__head p {
  margin: 0 0 8px;
  color: #09a988;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.valve-detail-section__head h2 {
  margin: 0;
  font-size: 30px;
  color: #173368;
}

.valve-detail-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.valve-detail-chip-grid span {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 18px;
  background: #ffffff;
  border: 1px solid rgba(23, 51, 104, 0.14);
  color: #173368;
  font-size: 15px;
}

.valve-detail-card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.valve-detail-card {
  min-height: 120px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(23, 51, 104, 0.12);
  color: rgba(16, 30, 58, 0.88);
  font-size: 16px;
  line-height: 1.7;
}

.valve-detail-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid rgba(23, 51, 104, 0.12);
}

.valve-detail-table th,
.valve-detail-table td {
  padding: 18px 24px;
  border-bottom: 1px solid rgba(23, 51, 104, 0.1);
  text-align: left;
  font-size: 16px;
  line-height: 1.7;
}

.valve-detail-table th {
  width: 220px;
  color: #173368;
  background: rgba(23, 51, 104, 0.04);
  font-weight: 600;
}

.valve-detail-table td {
  color: rgba(16, 30, 58, 0.86);
}

.valve-detail-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  max-width: 1440px;
  margin: 20px auto 72px;
  padding: 40px;
  background: #173368;
  color: #ffffff;
}

.valve-detail-cta h2 {
  margin: 0 0 12px;
  font-size: 28px;
  color: #ffffff;
}

.valve-detail-cta p {
  margin: 0;
  max-width: 860px;
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
}

.valve-detail-cta a {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 6px;
  background: #ffffff;
  color: #173368;
  text-decoration: none;
  font-size: 15px;
}

@media (max-width: 1024px) {
  .valve-detail-hero {
    grid-template-columns: 1fr;
    padding: 48px 24px 36px;
  }

  .valve-detail-hero__media {
    min-height: 360px;
  }

  .valve-detail-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .valve-detail-section {
    padding: 24px 24px 42px;
  }

  .valve-detail-cta {
    margin: 12px 24px 56px;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .valve-detail-hero {
    padding: 36px 16px 28px;
    gap: 28px;
  }

  .valve-detail-hero__media {
    min-height: 300px;
  }

  .valve-detail-desc {
    font-size: 16px;
  }

  .valve-detail-actions {
    width: 100%;
  }

  .valve-detail-actions a {
    flex: 1 1 100%;
  }

  .valve-detail-card-grid {
    grid-template-columns: 1fr;
  }

  .valve-detail-table th,
  .valve-detail-table td {
    display: block;
    width: 100%;
  }

  .valve-detail-table th {
    border-bottom: 0;
  }
}
`;

writeFileWithBackup(
  "app/products/valves/[slug]/valve-detail.css",
  valveDetailCss,
);

/* =========================================================
   5. 修改 ProductSelectionClient.tsx
========================================================= */

patchFile("components/products/selection/ProductSelectionClient.tsx", (source) => {
  let next = source;

  /**
   * 5.1 增加阀系列数据 import。
   */
  if (!next.includes("valve-selection.generated")) {
    const importAnchor =
      '} from "@/data/products/selection/valveless-pump-selection.generated";';

    if (!next.includes(importAnchor)) {
      throw new Error(
        "没有找到无阀泵 import 锚点，ProductSelectionClient.tsx 结构可能变化，请先检查 import 区域。",
      );
    }

    next = next.replace(
      importAnchor,
      `${importAnchor}
import {
  valveSelectionProducts,
  valveFilterLabels,
} from "@/data/products/selection/valve-selection.generated";`,
    );
  }

  /**
   * 5.2 把阀系列卡片加入产品池。
   */
  if (!next.includes("...valveSelectionProducts")) {
    const productAnchor = "...valvelessPumpSelectionProducts,";

    if (!next.includes(productAnchor)) {
      throw new Error(
        "没有找到产品池锚点 ...valvelessPumpSelectionProducts, 请检查 baseSelectionProducts 区域。",
      );
    }

    next = next.replace(
      productAnchor,
      `${productAnchor}
  ...valveSelectionProducts,`,
    );
  }

  /**
   * 5.3 把阀系列筛选标签加入筛选系统。
   */
  if (!next.includes("...valveFilterLabels")) {
    const labelAnchor = "...valvelessPumpFilterLabels,";

    if (!next.includes(labelAnchor)) {
      throw new Error(
        "没有找到筛选标签锚点 ...valvelessPumpFilterLabels, 请检查 filterLabels 区域。",
      );
    }

    next = next.replace(
      labelAnchor,
      `${labelAnchor}
  ...valveFilterLabels,`,
    );
  }

  /**
   * 5.4 给阀系列卡片详情链接增加兜底逻辑。
   * 如果卡片自身有 detailHref，就使用 detailHref。
   */
  if (!next.includes("const isValveProduct =")) {
    const routeAnchor = "const isValvelessPump =";

    if (!next.includes(routeAnchor)) {
      throw new Error(
        "没有找到详情链接锚点 const isValvelessPump =，请检查 getDetailHref 相关函数。",
      );
    }

    next = next.replace(
      routeAnchor,
      `const isValveProduct =
    product.categoryId === "valves" &&
    ["rotary-valves", "high-pressure-valves", "solenoid-valves"].includes(
      product.productTypeId,
    );

  if (isValveProduct) {
    return (
      product.detailHref ||
      product.href ||
      \`/products/valves/\${product.productTypeId}\`
    );
  }

  ${routeAnchor}`,
    );
  }

  return next;
});

console.log("");
console.log("阀系列产品中心接入完成。");
console.log("");
console.log("下一步请运行：");
console.log("npm run build");
console.log("");
console.log("测试路径：");
console.log("/products");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");