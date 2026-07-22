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
    const backupPath = `${filePath}.bak_valve_custom_detail_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`已备份：${path.relative(root, backupPath)}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`已写入：${relativePath}`);
}

/* =========================================================
   1. 阀系列定制详情页数据
========================================================= */

const valveDetailData = [
  {
    slug: "rotary-valves",
    categoryName: "旋转阀",
    title: "MRV3 陶瓷多通道旋转阀",
    customModelText: "定制配置请联系我们",
    intro:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配、清洗路径管理和废液路径集中控制。产品可根据通道数量、通径、接口形式、触液材料、驱动方式和安装空间进行配置确认。",
    image: "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
    imageAlt: "MRV3 陶瓷多通道旋转阀",
    highlights: [
      "10 / 16 / 24 通道可选",
      "耐压 0.7MPa",
      "内容积低至 2.9μL",
      "PCTFE / 氧化锆陶瓷 / 蓝宝石触液材料",
    ],
    applications: [
      "多试剂路径切换",
      "多样本分配",
      "清洗液路径管理",
      "废液路径集中控制",
      "自动化分析仪器多通道液路",
      "IVD 与实验室自动化设备",
    ],
    customOptions: [
      "通道数量：10 / 16 / 24 通道",
      "通道直径：1.2 / 1.0 / 0.5mm",
      "接口形式：1/4-28UNF / 6-40UNF",
      "触液材料：PCTFE / 氧化锆陶瓷 / 蓝宝石",
      "驱动配置：电机 / 驱动器可选",
      "通讯接口：RS232 / RS485",
      "安装方式：根据仪器内部空间确认",
    ],
    specs: [
      { label: "产品类型", value: "旋转阀" },
      { label: "典型型号", value: "MRV3-D10 / MRV3-D16 / MRV3-D24" },
      { label: "通道数量", value: "10 / 16 / 24" },
      { label: "通道直径", value: "1.2 / 1.0 / 0.5mm" },
      { label: "内容积", value: "15.8 / 10 / 2.9μL" },
      { label: "耐压", value: "0.7MPa" },
      { label: "寿命", value: "100万圈" },
      { label: "适用电源", value: "DC24V/2A±10%" },
    ],
    faq: [
      {
        q: "MRV3 旋转阀是标准品还是定制品？",
        a: "官网页面按定制配置展示。通道数量、通径、接口、材料、驱动器和通讯方式需要结合客户液路方案确认。",
      },
      {
        q: "旋转阀主要适合什么场景？",
        a: "主要适用于多试剂、多样本、多清洗液和多废液路径的集中切换，常见于 IVD、生命科学和实验室自动化设备。",
      },
      {
        q: "是否可以只采购阀头？",
        a: "可根据项目需求确认阀头、整阀、电机和驱动器等配置方式。",
      },
    ],
  },
  {
    slug: "high-pressure-valves",
    categoryName: "高压阀",
    title: "HP 三位七通高压阀",
    customModelText: "定制配置请联系我们",
    intro:
      "HP 三位七通高压阀用于高压流体控制、HPLC 自动进样、高压流路切换、系统排气和分析仪器高压液路模块集成。产品按项目需求确认压力范围、通道结构、接口形式、触液材料、驱动方式和安装空间。",
    image: "/images/products/common/product-placeholder.svg",
    imageAlt: "HP 三位七通高压阀",
    highlights: [
      "三位七通高压流路控制",
      "最大工作压力 25MPa",
      "内体积 0.8μL",
      "适用于 HPLC 自动进样与排气场景",
    ],
    applications: [
      "HPLC 自动进样",
      "高压流路切换",
      "进样位 / 抽样位 / 排气位切换",
      "分析仪器高压液路模块",
      "高压液体分配与切换",
    ],
    customOptions: [
      "通道结构：三位七通",
      "压力范围：按系统压力需求确认",
      "接口形式：10-32UNF",
      "通道直径：0.4mm",
      "内体积：0.8μL",
      "触液材料：按介质兼容性确认",
      "安装空间：根据整机结构确认",
    ],
    specs: [
      { label: "产品类型", value: "高压阀" },
      { label: "典型型号", value: "HP-37SSU3204" },
      { label: "结构", value: "三位七通" },
      { label: "最大工作压力", value: "25MPa" },
      { label: "通道直径", value: "0.4mm" },
      { label: "内体积", value: "0.8μL" },
      { label: "接口", value: "10-32UNF" },
      { label: "寿命", value: "15万 cycles（纯水）" },
    ],
    faq: [
      {
        q: "HP 高压阀是否按标准型号直接选购？",
        a: "官网按定制品展示。具体型号、压力、接口和安装方式需要结合客户高压液路方案确认。",
      },
      {
        q: "高压阀适合哪些设备？",
        a: "适用于 HPLC、分析仪器、高压自动进样模块和需要高压流路切换的液路系统。",
      },
      {
        q: "高压阀选型时最需要确认什么？",
        a: "需要确认系统压力、介质、接口、切换位置、内体积要求和安装空间。",
      },
    ],
  },
  {
    slug: "solenoid-valves",
    categoryName: "电磁阀",
    title: "6010 系列电磁阀",
    customModelText: "定制配置请联系我们",
    intro:
      "6010 系列电磁阀用于自动化仪器中的液路通断控制、试剂路径控制、清洗路径控制、废液路径控制和阀组集成。产品可根据通口数、阀形式、接口方式、膜片材质、底板材质、阀座材质、电压和节能回路进行配置确认。",
    image: "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
    imageAlt: "6010 系列电磁阀",
    highlights: [
      "2通 / 3通结构可选",
      "NO / NC / 万向阀形式可选",
      "-75kPa～0.25MPa 使用压力范围",
      "支持基板型、螺纹型和倒刺型配置",
    ],
    applications: [
      "试剂路径通断控制",
      "清洗液路径控制",
      "废液路径控制",
      "自动化仪器阀组集成",
      "IVD 分析仪器",
      "实验室自动化设备",
    ],
    customOptions: [
      "结构形式：基板型 / 螺纹型 / 倒刺型",
      "通口数：2 / 3",
      "阀形式：万向 / NO / NC",
      "接口方式：M6 / 1/4-28UNF / 倒刺 / 基板",
      "膜片材质：EPDM / FKM / FFKM",
      "额定电压：DC 12V / 24V",
      "节能回路：标准型 / 节能型",
    ],
    specs: [
      { label: "产品类型", value: "电磁阀" },
      { label: "典型型号", value: "SV10-P / SV10-M6 / SV10-U28 / SV10-B16" },
      { label: "通口数", value: "2 / 3" },
      { label: "阀形式", value: "万向 / NO / NC" },
      { label: "使用压力范围", value: "-75kPa～0.25MPa" },
      { label: "孔口直径", value: "1.4mm" },
      { label: "阀室内容积", value: "20μL" },
      { label: "CV", value: "0.03" },
      { label: "膜片材质", value: "EPDM / FKM / FFKM" },
    ],
    faq: [
      {
        q: "6010 电磁阀为什么按定制品展示？",
        a: "6010 电磁阀涉及结构形式、通口数、阀形式、膜片材质、底板材质、阀座材质、电压和节能回路等多项配置，实际项目中通常需要按液路方案确认。",
      },
      {
        q: "基板型、螺纹型和倒刺型怎么选择？",
        a: "基板型适合阀组集成，螺纹型适合标准接头连接，倒刺型适合软管连接。具体方式需要结合整机空间和管路方案确认。",
      },
      {
        q: "膜片材质如何选择？",
        a: "需要根据试剂、清洗液、温度和寿命要求确认 EPDM、FKM 或 FFKM 等材料。",
      },
    ],
  },
];

writeFileWithBackup(
  "data/products/generated/valves/detail/index.json",
  `${JSON.stringify(valveDetailData, null, 2)}\n`,
);

/* =========================================================
   2. 写入阀系列定制详情页
========================================================= */

const pageTsx = `import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import valveDetailData from "@/data/products/generated/valves/detail/index.json";

import "./valve-detail.css";

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

type ValveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return valveDetails.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const data = valveDetails.find((item) => item.slug === slug);

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
  const data = valveDetails.find((item) => item.slug === slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="valveDetailPage">
      <section className="valveDetailBreadcrumb">
        <Link href="/">首页</Link>
        <span>/</span>
        <Link href="/products">产品中心</Link>
        <span>/</span>
        <span>{data.categoryName}</span>
      </section>

      <section className="valveDetailHero">
        <div className="valveDetailImagePanel">
          <div className="valveDetailImageBox">
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={520}
              height={420}
              priority
            />
          </div>
        </div>

        <div className="valveDetailInfo">
          <p className="valveDetailEyebrow">FOREACH 阀系列定制配置</p>
          <h1>{data.title}</h1>

          <div className="valveDetailModel">
            <span>型号：</span>
            <strong>{data.customModelText}</strong>
          </div>

          <p className="valveDetailIntro">{data.intro}</p>

          <div className="valveDetailHighlights">
            {data.highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="valveDetailActions">
            <Link className="valvePrimaryButton" href="/contact">
              联系我们
            </Link>
            <Link className="valveSecondaryButton" href="/products">
              返回产品中心
            </Link>
          </div>
        </div>
      </section>

      <section className="valveDetailSection">
        <div className="valveSectionTitle">
          <p>Applications</p>
          <h2>常见应用</h2>
        </div>

        <div className="valveApplicationGrid">
          {data.applications.map((item) => (
            <div className="valveApplicationCard" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="valveDetailSection">
        <div className="valveSectionTitle">
          <p>Custom Options</p>
          <h2>可定制配置</h2>
        </div>

        <div className="valveCustomGrid">
          {data.customOptions.map((item) => (
            <div className="valveCustomItem" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="valveDetailSection">
        <div className="valveSectionTitle">
          <p>Specifications</p>
          <h2>关键规格参数</h2>
        </div>

        <div className="valveSpecTableWrap">
          <table className="valveSpecTable">
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

        <p className="valveSpecNote">
          注：以上参数用于官网选型参考，具体配置需结合实际介质、压力、接口、安装空间和系统控制方式确认。
        </p>
      </section>

      <section className="valveDetailSection">
        <div className="valveSectionTitle">
          <p>FAQ</p>
          <h2>常见问题</h2>
        </div>

        <div className="valveFaqList">
          {data.faq.map((item) => (
            <details className="valveFaqItem" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="valveDetailCta">
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
   3. 写入详情页样式
========================================================= */

const css = `:root {
  --valve-blue: #173368;
  --valve-mint: #09e9b4;
  --valve-text: #10213f;
  --valve-muted: #66758f;
  --valve-line: #dfe6f1;
  --valve-bg: #f6f9fd;
}

.valveDetailPage {
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

writeFileWithBackup("app/products/valves/[slug]/valve-detail.css", css);

console.log("");
console.log("阀系列定制详情页已生成：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");
console.log("");
console.log("下一步运行：");
console.log("Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue");
console.log("npm run dev");