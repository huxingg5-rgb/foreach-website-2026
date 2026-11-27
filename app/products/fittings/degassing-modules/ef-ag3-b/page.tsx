import type { Metadata } from "next";
import { getDegassingModuleLanguageAlternates } from "@/data/products/detail/degassing-module-locales";
import Image from "next/image";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { DegassingModuleDelivery } from "@/components/products/detail/DegassingModuleContent";
import { GuideBlock } from "@/components/products/detail/InstrumentGuideBlock";
import selectionBase from "@/components/products/detail/EaPumpDetailContent.module.css";
import selectionStyles from "@/components/products/detail/CompactInstrumentGuide.module.css";
import figureStyles from "@/components/products/detail/InstrumentProductSections.module.css";
import { degassingModuleZh as product } from "@/data/products/detail/degassing-module.zh";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

import "../../../products.css";

const [mainImage, ...additionalImages] = product.gallery;

export const metadata: Metadata = {
  title: { absolute: `${product.title} | 恒永达` },
  description: product.description,
  ...buildProductSocialMetadata({
    data: { mainImage: mainImage.src, mainImageAlt: mainImage.alt },
    title: product.title,
    description: product.description,
    canonicalUrl: product.href,
  }),
  alternates: { canonical: product.href, languages: getDegassingModuleLanguageAlternates() },
};

const detail: ProductDetailPageData & {
  productTypeId: string;
  productTypeName: string;
  detailHref: string;
  imageCard: string;
  h1Title: string;
  description: string;
  mainImageAlt: string;
  drawing2dUrl: string;
} = {
  category: "fittings",
  productTypeId: product.typeId,
  productTypeName: product.name,
  detailHref: product.href,
  imageCard: product.cardImage.src,
  slug: product.slug,
  model: product.model,
  h1Title: product.heading,
  name: product.name,
  description: product.introduction,
  advantages: [],
  commonApplications: [],
  mainImage: mainImage.src,
  mainImageAlt: mainImage.alt,
  additionalImages: additionalImages.map(photo => photo.src),
  additionalImageAlts: additionalImages.map(photo => photo.alt),
  showConfigurator: false,
  showDatasheetRequest: false,
  showDrawingRequest: false,
  show3DRequest: false,
  cadRequestAvailable: true,
  drawing2dUrl: product.drawing2dUrl,
  specSeriesKey: product.slug,
  breadcrumbs: [
    { label: "首页", href: "/" },
    { label: "产品中心", href: "/products/" },
    { label: "接头系列", href: "/products/fittings/" },
    { label: product.name, href: product.modelListHref },
    { label: product.model },
  ],
  specs: [
    { label: "型号", value: product.model },
    { label: "产品类型", value: product.name },
    ...product.specificationGroups.flatMap(group =>
      group.rows.map(([label, value]) => ({ label, value })),
    ),
  ],
};

function DegassingModuleSelection() {
  const curveRoot = "/images/products/fittings/degassing-modules/ef-ag3-b/selection";
  const curves = [
    {
      file: "dissolved-oxygen-removal-curve.webp",
      alt: "流量与溶解氧去除率参考曲线。25 °C 水分别对应 2.7、6.7、13.3 kPa 绝压，另列 45 °C 水在 6.7 kPa 绝压下的曲线。",
      caption: "流量与溶解氧去除率。先按液温和真空侧绝对压力选曲线，再按目标流量读去除率。",
    },
    {
      file: "liquid-pressure-drop-curve.webp",
      alt: "25 °C 水试中，液侧压降随流量上升的系列参考曲线。",
      caption: "流量与液侧压降。在相同流量处读压降，再与设备可用压力余量对照。",
    },
  ];

  return (
    <section lang="zh-CN" className={`${selectionBase.content} ${selectionStyles.guide} ${selectionStyles.engineeringGuide}`} aria-label="脱气膜选型与使用">
      <section className={selectionStyles.phase}>
        <h2>1 选型与配置</h2>
        <p>EF-AG3-B 采用外部灌流结构，液体流经中空纤维膜丝外侧，溶解气体透过膜丝后由真空侧抽走。先确定工作流量、脱气目标和允许压降，再核对液温、介质相容性及可用真空条件。</p>
        <GuideBlock number="1.1" columns={["选型项目", "配置与确认"]} section={{
          id: "degassing-selection-inputs",
          title: "工作流量与脱气目标",
          intro: "按设备实际运行工况确定下列输入，再结合参考曲线核对目标工作点。",
          rows: [
            ["工作流量", "记录设备常用和最大流量", "连续供液与启停工况都要核对。"],
            ["脱气目标", "用处理前后的溶解氧浓度评估脱气效果", "结合喷头出墨或设备运行表现验证。"],
            ["允许压降", "在目标流量下检查组件液侧压降", "同时计入过滤器、管路和接头的压力损失。"],
            ["液温与真空条件", "按实际液温和真空侧绝对压力选择参考曲线", "工作真空条件需结合介质的饱和蒸气压核对。"],
          ],
        }} />
        <GuideBlock number="1.2" section={{
          id: "degassing-materials",
          title: "接液材料与介质相容性",
          intro: "工作液和清洗液一并核对，记录介质成分、浓度、液温和接触时间。",
        }}>
          <p>膜丝为 PMP，壳体及端盖采用 PP 和不锈钢，封装采用环氧树脂。按完整接液材料组合确认介质相容性。</p>
        </GuideBlock>
        <GuideBlock number="1.3" section={{
          id: "degassing-reference-curves",
          title: "流量、脱气效果与液侧压降",
          intro: "在目标流量处分别读取相应真空条件下的溶解氧去除率和液侧压降。系列水试显示，流量升高时，溶解氧去除率下降、液侧压降上升。同温同流量下，真空侧绝对压力较低的曲线对应较高的参考去除率。",
          note: "曲线按系列水试参考图读数复绘，实际设备应按介质、液温和目标工作点实测。",
        }}>
          <div className={`${figureStyles.figures} ${figureStyles.figuresPaired}`}>
            {curves.map(({ file, alt, caption }) => (
              <figure className={figureStyles.figure} key={file}>
                <a href={`${curveRoot}/${file}`} target="_blank" rel="noreferrer" aria-label={`放大查看：${alt}`}>
                  <Image src={`${curveRoot}/${file}`} alt={alt} width={1200} height={900} sizes="(max-width: 1000px) 95vw, 45vw" />
                </a>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
          <p><strong>读图示例</strong>　以 25 °C 水和 1,000 mL/min 为例，6.7 kPa 真空侧绝压曲线的溶解氧去除率约为 58%，同流量的水试液侧压降约为 2.3 kPa。两项均为系列图读近似值。</p>
        </GuideBlock>
      </section>

      <section className={selectionStyles.phase}>
        <h2>2 接口与安装</h2>
        <GuideBlock number="2.1" section={{
          id: "degassing-ports",
          title: "接口识别与装机空间",
          intro: "两个液体口和一个真空口均为 NPT 1/8。侧向接口和一个端面接口通液，另一端面接口接真空。接管前核对端口标记，按总长 159 mm、端盖外径 Ø42 mm 和侧口位置预留接管空间。",
        }} />
        <GuideBlock number="2.2" section={{
          id: "degassing-connections",
          title: "供墨与真空管路",
          intro: "先确认组件在供墨回路中的位置。液路建议配置过滤器，安装位置按设备设计确定。",
          rows: [
            ["供墨液路示例", "墨水箱 → 供液泵 → 脱气膜组件 → 储液腔 → 打印头", "示例从较低的侧向液体口进液，从上方端面液体口出液。部分设备可将组件装在储液腔与打印头之间，按实际供墨回路确定。"],
            ["真空管路", "真空口 → 捕集器 → 真空泵", "在管路上设置真空表读取绝对压力。捕集器用于截留冷凝液或泄漏液体，便于发现漏液并保护真空泵。水性墨水应用建议使真空口朝下。"],
          ],
        }} />
      </section>

      <GuideBlock number="3" heading="h2" section={{
        id: "degassing-commissioning",
        title: "首次充液与工作点验证",
        intro: "先核对安装方向和端口，再充液排气，按目标流量复核脱气效果与压降。",
        steps: [
          ["确认接管", "按标记核对进液口、出液口和真空口，检查捕集器与真空表是否接入。"],
          ["从低位液口缓慢注液", "逐步注液以排出组件内的空气，可配合抽真空帮助排气。初次充液体积约 40 mL，为系列参考值。"],
          ["按实际液温设定真空条件", "运行时，真空侧绝对压力应不低于液体在工作温度下的饱和蒸气压，避免过度蒸发影响液体组分或真空泵。"],
          ["在目标流量下验收", "记录介质、液温、流量和真空侧绝对压力。用溶解氧仪测量处理前后浓度，用差压表记录液侧压降，复核脱气目标和液路压力余量。"],
        ],
      }} />

      <GuideBlock number="4" heading="h2" section={{
        id: "degassing-storage",
        title: "日常检查与储存",
        intro: "工况变化后重新记录流量、液温、真空侧绝对压力和液侧压降，并检查捕集器是否有冷凝液或漏液迹象。",
      }}>
        <p>室内干燥储存，温度低于 45 °C，避免日晒。使用后防止组件内残留水冻结。</p>
      </GuideBlock>
    </section>
  );
}

export default function DegassingModulePage() {
  return (
    <ProductDetailClient
      data={detail}
      customerCategoryMode="fitting-zh"
      customerCategoryContent={{
        selection: <DegassingModuleSelection key="selection" />,
        delivery: <DegassingModuleDelivery key="delivery" locale="zh-CN" />,
      }}
    />
  );
}
