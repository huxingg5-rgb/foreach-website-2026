const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFileWithBackup(relativePath, content) {
  const filePath = abs(relativePath);
  ensureDir(filePath);

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_fix_valve_detail_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log("已写入：" + relativePath);
}

/* =========================================================
   1. 修复阀详情页：使用 CSS Module，不再直接 import 普通 css
========================================================= */

const pageTsx = `import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import valveDetailData from "@/data/products/generated/valves/detail/index.json";

import styles from "./valve-detail.module.css";

type ValveDetailItem = {
  slug: string;
  categoryName: string;
  title: string;
  customModelText: string;
  intro: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  applications: string[];
  customOptions: string[];
  specs: {
    label: string;
    value: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
};

const valveDetails = valveDetailData as ValveDetailItem[];

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "rotary-valves" },
    { slug: "high-pressure-valves" },
    { slug: "solenoid-valves" },
  ];
}

type ValveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getValveDetailBySlug(slug: string) {
  return valveDetails.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const data = getValveDetailBySlug(slug);

  if (!data) {
    return {
      title: "阀系列产品｜恒永达 FOREACH",
    };
  }

  return {
    title: \`\${data.title}｜\${data.categoryName}｜恒永达 FOREACH\`,
    description: data.intro,
  };
}

export default async function ValveDetailPage({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const data = getValveDetailBySlug(slug);

  if (!data) {
    notFound();
  }

  return (
    <main className={styles.valveDetailPage}>
      <section className={styles.valveDetailBreadcrumb}>
        <Link href="/">首页</Link>
        <span>/</span>
        <Link href="/products">产品中心</Link>
        <span>/</span>
        <span>{data.categoryName}</span>
      </section>

      <section className={styles.valveDetailHero}>
        <div className={styles.valveDetailImagePanel}>
          <div className={styles.valveDetailImageBox}>
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={520}
              height={420}
              priority
            />
          </div>
        </div>

        <div className={styles.valveDetailInfo}>
          <p className={styles.valveDetailEyebrow}>FOREACH 阀系列定制配置</p>
          <h1>{data.title}</h1>

          <div className={styles.valveDetailModel}>
            <span>型号：</span>
            <strong>{data.customModelText}</strong>
          </div>

          <p className={styles.valveDetailIntro}>{data.intro}</p>

          <div className={styles.valveDetailHighlights}>
            {data.highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={styles.valveDetailActions}>
            <Link className={styles.valvePrimaryButton} href="/contact">
              联系我们
            </Link>
            <Link className={styles.valveSecondaryButton} href="/products">
              返回产品中心
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.valveDetailSection}>
        <div className={styles.valveSectionTitle}>
          <p>Applications</p>
          <h2>常见应用</h2>
        </div>

        <div className={styles.valveApplicationGrid}>
          {data.applications.map((item) => (
            <div className={styles.valveApplicationCard} key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.valveDetailSection}>
        <div className={styles.valveSectionTitle}>
          <p>Custom Options</p>
          <h2>可定制配置</h2>
        </div>

        <div className={styles.valveCustomGrid}>
          {data.customOptions.map((item) => (
            <div className={styles.valveCustomItem} key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.valveDetailSection}>
        <div className={styles.valveSectionTitle}>
          <p>Specifications</p>
          <h2>关键规格参数</h2>
        </div>

        <div className={styles.valveSpecTableWrap}>
          <table className={styles.valveSpecTable}>
            <tbody>
              {data.specs.map((item) => (
                <tr key={\`\${item.label}-\${item.value}\`}>
                  <th>{item.label}</th>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.valveSpecNote}>
          注：以上参数用于官网选型参考，具体配置需结合实际介质、压力、接口、安装空间和系统控制方式确认。
        </p>
      </section>

      <section className={styles.valveDetailSection}>
        <div className={styles.valveSectionTitle}>
          <p>FAQ</p>
          <h2>常见问题</h2>
        </div>

        <div className={styles.valveFaqList}>
          {data.faq.map((item) => (
            <details className={styles.valveFaqItem} key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.valveDetailCta}>
        <div>
          <p>Custom Inquiry</p>
          <h2>提交阀系列定制需求</h2>
          <span>
            请提供介质、压力范围、接口方式、通道数量、安装空间和控制方式，我们将协助确认合适的阀配置。
          </span>
        </div>

        <Link href="/contact">提交定制需求</Link>
      </section>
    </main>
  );
}
`;

writeFileWithBackup("app/products/valves/[slug]/page.tsx", pageTsx);

/* =========================================================
   2. 写入 CSS Module
========================================================= */

const cssModule = `.valveDetailPage {
  --valve-blue: #173368;
  --valve-mint: #09e9b4;
  --valve-text: #10213f;
  --valve-muted: #66758f;
  --valve-line: #dfe6f1;
  --valve-bg: #f6f9fd;

  color: var(--valve-text);
  background: #ffffff;
}

.valveDetailBreadcrumb {
  max-width: 1440px;
  margin: 0 auto;
  padding: 22px 40px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--valve-muted);
  font-size: 14px;
  border-bottom: 1px solid var(--valve-line);
}

.valveDetailBreadcrumb a {
  color: var(--valve-blue);
  text-decoration: none;
}

.valveDetailHero {
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 40px 48px;
  display: grid;
  grid-template-columns: minmax(360px, 520px) minmax(0, 1fr);
  gap: 56px;
  align-items: center;
}

.valveDetailImagePanel {
  border: 1px solid var(--valve-line);
  background: #ffffff;
}

.valveDetailImageBox {
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
}

.valveDetailImageBox img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.valveDetailInfo {
  max-width: 760px;
}

.valveDetailEyebrow {
  margin: 0 0 12px;
  color: var(--valve-blue);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.valveDetailInfo h1 {
  margin: 0;
  color: var(--valve-blue);
  font-size: 38px;
  line-height: 1.18;
  font-weight: 800;
}

.valveDetailModel {
  margin-top: 22px;
  padding: 14px 18px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  border: 1px solid var(--valve-blue);
  color: var(--valve-blue);
  font-size: 15px;
}

.valveDetailModel strong {
  font-weight: 600;
}

.valveDetailIntro {
  margin: 24px 0 0;
  color: #17243c;
  font-size: 17px;
  line-height: 1.9;
}

.valveDetailHighlights {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.valveDetailHighlights span {
  padding: 8px 12px;
  background: rgba(9, 233, 180, 0.12);
  color: var(--valve-blue);
  border: 1px solid rgba(9, 233, 180, 0.38);
  font-size: 14px;
  font-weight: 600;
}

.valveDetailActions {
  margin-top: 34px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.valvePrimaryButton,
.valveSecondaryButton {
  min-width: 150px;
  height: 44px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--valve-blue);
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
}

.valvePrimaryButton {
  background: var(--valve-blue);
  color: var(--valve-mint);
}

.valveSecondaryButton {
  background: #ffffff;
  color: var(--valve-blue);
}

.valveDetailSection {
  max-width: 1440px;
  margin: 0 auto;
  padding: 46px 40px;
  border-top: 1px solid var(--valve-line);
}

.valveSectionTitle {
  margin-bottom: 24px;
}

.valveSectionTitle p {
  margin: 0 0 6px;
  color: var(--valve-mint);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.valveSectionTitle h2 {
  margin: 0;
  color: var(--valve-blue);
  font-size: 28px;
  line-height: 1.25;
}

.valveApplicationGrid,
.valveCustomGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.valveApplicationCard,
.valveCustomItem {
  min-height: 64px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  border: 1px solid var(--valve-line);
  background: #ffffff;
  color: var(--valve-text);
  font-size: 15px;
  line-height: 1.55;
}

.valveCustomItem {
  background: var(--valve-bg);
}

.valveSpecTableWrap {
  border: 1px solid var(--valve-line);
  overflow-x: auto;
}

.valveSpecTable {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.valveSpecTable th,
.valveSpecTable td {
  padding: 15px 18px;
  border-bottom: 1px solid var(--valve-line);
  text-align: left;
  vertical-align: top;
}

.valveSpecTable th {
  width: 260px;
  background: var(--valve-bg);
  color: var(--valve-blue);
  font-weight: 700;
}

.valveSpecTable tr:last-child th,
.valveSpecTable tr:last-child td {
  border-bottom: 0;
}

.valveSpecNote {
  margin: 14px 0 0;
  color: var(--valve-muted);
  font-size: 14px;
  line-height: 1.7;
}

.valveFaqList {
  display: grid;
  gap: 12px;
}

.valveFaqItem {
  border: 1px solid var(--valve-line);
  background: #ffffff;
}

.valveFaqItem summary {
  cursor: pointer;
  padding: 18px 20px;
  color: var(--valve-blue);
  font-size: 16px;
  font-weight: 700;
}

.valveFaqItem p {
  margin: 0;
  padding: 0 20px 20px;
  color: var(--valve-muted);
  font-size: 15px;
  line-height: 1.8;
}

.valveDetailCta {
  max-width: 1440px;
  margin: 24px auto 72px;
  padding: 34px 40px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  background: var(--valve-blue);
  color: #ffffff;
}

.valveDetailCta p {
  margin: 0 0 6px;
  color: var(--valve-mint);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.valveDetailCta h2 {
  margin: 0 0 10px;
  font-size: 28px;
}

.valveDetailCta span {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
}

.valveDetailCta a {
  min-width: 168px;
  height: 46px;
  padding: 0 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: var(--valve-blue);
  text-decoration: none;
  font-weight: 800;
}

@media (max-width: 980px) {
  .valveDetailHero {
    grid-template-columns: 1fr;
    padding: 36px 20px;
  }

  .valveDetailBreadcrumb,
  .valveDetailSection {
    padding-left: 20px;
    padding-right: 20px;
  }

  .valveApplicationGrid,
  .valveCustomGrid {
    grid-template-columns: 1fr;
  }

  .valveDetailInfo h1 {
    font-size: 30px;
  }

  .valveDetailCta {
    margin-left: 20px;
    margin-right: 20px;
    padding: 28px 24px;
    flex-direction: column;
    align-items: flex-start;
  }
}
`;

writeFileWithBackup("app/products/valves/[slug]/valve-detail.module.css", cssModule);

/* =========================================================
   3. 删除旧普通 CSS，避免继续被错误引用
========================================================= */

const oldCssPath = abs("app/products/valves/[slug]/valve-detail.css");

if (fs.existsSync(oldCssPath)) {
  const oldCssBackup = `${oldCssPath}.bak_removed_${stamp()}`;
  fs.copyFileSync(oldCssPath, oldCssBackup);
  fs.unlinkSync(oldCssPath);
  console.log("已移除旧普通 CSS，并备份：" + path.relative(root, oldCssBackup));
}

console.log("");
console.log("阀系列详情页已修复为 CSS Module。");
console.log("请访问：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");