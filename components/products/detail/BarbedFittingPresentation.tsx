import { registerFittingDetail } from "./fitting-detail-view";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { OriginalProfile } from "@/components/resources/technical-articles/articles/BarbedExpansionDiagram";
import { getBarbedFittingPresentation, type BarbedDetail } from "@/data/products/detail/barbed-fitting-presentation";
import { getBarbedFittingImageAlt } from "@/data/products/detail/barbed-fitting-gallery";
import productDetails from "@/data/products/generated/fittings/barbed-fittings/detail/index.json";
import styles from "./BarbedFittingPresentation.module.css";

const assetRoot = "/images/products/fittings/barbed-fittings/ba-24f-pp-n/details/";
const photoRoot = "/images/products/fittings/barbed-fittings/photos/";
const catalogue = "/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf#page=32";
const profiles = [
  { code: "C", range: "42%–69%", series: "经典" },
  { code: "F", range: "25%–32%", series: "400" },
  { code: "D", range: "24%–50%", series: "200" },
  { code: "V", range: "32%–60%", series: "500" },
  { code: "X", range: "32%–50%", series: "600" },
] as const;

export function BarbedProductDetails({ data }: { data: BarbedDetail }) {
  const info = getBarbedFittingPresentation(data);
  const { model, family, structure, material, color, tubing, currentProfiles, otherCodes, isPlug } = info;
  const mainImage = data.mainImage || data.image || "";
  const gallery = (data.additionalImages || []).filter((src): src is string => typeof src === "string" && !!getBarbedFittingImageAlt(src, "zh"));
  const isStraightReference = family === "BA" && !info.isReducing && !gallery.length;
  const shapeFile = { BA: "ba-straight", BL: "bl-elbow", BT: "bt-tee", BY: "by-wye", BX4: "bx4-cross", BF4: "bf4-pi" }[family];
  const referenceModels = productDetails.filter(item => item.model !== model && item.name === data.name && item.model.startsWith(`${family}-`));
  const materialReference = referenceModels.find(item => item.model.split("-").slice(0, -2).join("-") === info.segments.slice(0, -2).join("-")) || referenceModels[0];
  const sizeReference = referenceModels.find(item => item.model.endsWith(`-${info.segments.slice(-2).join("-")}`)) || referenceModels[1];
  const profileViews = profiles.filter(profile => currentProfiles.includes(profile.code));
  const profileText = currentProfiles.length
    ? `${otherCodes.length || info.hasUnspecifiedProfile ? `其中 ${info.tubeCodes.filter(code => info.profileFor(code)).join("、")} 接管段采用 ` : ""}${currentProfiles.join(" / ")} 型倒刺轮廓`
    : "倒刺轮廓按图纸确认";
  const photo = (src: string, caption: string, alt = caption) => <figure>
    <Image src={src} alt={alt} width={1500} height={1500} sizes="(max-width: 1024px) 45vw, 450px" style={{ objectFit: "contain" }} />
    <figcaption>{caption}</figcaption>
  </figure>;
  return <div className="fx-sec" id="fx-product-detail" data-barbed-presentation="product">
    <h2>产品实物与接口</h2>
    <p>{model} 的产品外形、倒刺轮廓与{structure?.name || "接头"}样式对比，帮助核对接管结构和软管匹配。</p>
    <div className="fx-row">
      <div>
        <h3>接头细节</h3>
        <p>结合当前型号图纸，重点查看这些部位：</p>
        <ul>
          <li>外观：检查本体与接管端有无毛刺、损伤，倒刺轮廓是否完整</li>
          <li>接口：{tubing}；{profileText}。{otherCodes.length ? `${otherCodes.join("、")} 接管段按本型号图纸确认。` : "核对导入段、峰部和后方接管段。"}{isPlug ? "堵头用于封闭软管端部，没有贯通流道。" : ""}</li>
          <li>材料与配合：当前型号为 {material} {color}，装配时检查软管能否装到位，以及包覆与保持状态</li>
        </ul>
        <p className="fx-photo-note">右侧系列实拍、轮廓示意与其他型号图用于样式对比；{model} 的具体外形和尺寸以本型号产品图及图纸为准。</p>
      </div>
      <div className={`fx-pics ${styles.productPictures}`}>
      {photo(mainImage, `${model} ${data.name || structure?.name || "产品外形"}`)}
      <figure>
        <div className={`${styles.productVisual} ${styles.profileDetail}`}>
          {(profileViews.length ? profileViews : profiles).map(profile => <svg key={profile.code} viewBox="0 0 150 285" role="img" aria-label={`${profile.code} 型倒刺轮廓示意`}><OriginalProfile profile={profile.code} x={0} y={0} /></svg>)}
        </div>
        <figcaption>{currentProfiles.length ? `${currentProfiles.join(" / ")} 型倒刺轮廓（手册示意${otherCodes.length ? "，仅对应已标识接管段" : ""}）` : "C/F/D/V/X 轮廓参考，本型号按图纸确认"}</figcaption>
      </figure>
      {isStraightReference ? <figure>
        <div className={`${styles.productVisual} ${styles.photoPair}`}>
          <Image src={`${photoRoot}pp-equal-straight-barbed-fitting-compact-tapered-body.webp`} alt="PP 本色直通接头 C 型轮廓实拍参考" width={1500} height={1500} sizes="(max-width: 1024px) 22vw, 225px" />
          <Image src={`${photoRoot}pp-equal-straight-barbed-fitting-side-view.webp`} alt="PP 本色直通接头 D 型轮廓实拍参考" width={1500} height={1500} sizes="(max-width: 1024px) 22vw, 225px" />
        </div>
        <figcaption>PP 本色轮廓对比：左 C 型，右 D 型</figcaption>
      </figure> : gallery[0] ? photo(gallery[0], `${structure?.name}系列实拍参考`, getBarbedFittingImageAlt(gallery[0], "zh"))
        : shapeFile ? photo(`${assetRoot}${shapeFile}.webp`, `${structure?.name}本体样式（等径示意）`)
        : materialReference ? photo(materialReference.mainImage, `材质样式参考：${materialReference.model}`) : null}
      {isStraightReference ? photo(`${photoRoot}equal-straight-barbed-fittings-mixed-lineup-dark.webp`, "C/D 系列样式：PA 白色与 PP 本色", getBarbedFittingImageAlt(`${photoRoot}equal-straight-barbed-fittings-mixed-lineup-dark.webp`, "zh"))
        : gallery[1] ? photo(gallery[1], "接管端与本体外观（系列参考）", getBarbedFittingImageAlt(gallery[1], "zh"))
        : materialReference && !isPlug ? photo(materialReference.mainImage, `其他配置参考：${materialReference.model}`)
        : sizeReference ? photo(sizeReference.mainImage, `其他尺寸参考：${sizeReference.model}`) : null}
      </div>
    </div>
  </div>;
}

export function BarbedModelCode({ model }: { model: string }) {
  const segments = model.split("-");
  const parts = segments.map((code, index) => [code, index === 0 ? "本体结构" : index === segments.length - 2 ? "本体材料" : index === segments.length - 1 ? "颜色" : "接管尺寸 / 轮廓"]);
  const columns = parts.map(() => "var(--segment-width)").join(" var(--dash-width) ");
  return <div className={styles.modelCodeScroll} tabIndex={0} role="region" aria-label="型号组成，小屏可横向查看"><div className={styles.modelCode} style={{ gridTemplateColumns: columns }} aria-label={`${model} 型号拆解`}>
    {parts.map(([code, label], index) => <Fragment key={`${index}-${code}`}>
      {index > 0 ? <span className={styles.dash} style={{ gridColumn: index * 2 }} aria-hidden="true" /> : null}
      <b style={{ gridColumn: index * 2 + 1 }}>{code}</b>
      <small style={{ gridColumn: index * 2 + 1 }}>{label}</small>
    </Fragment>)}
  </div></div>;
}

export function BarbedProfileComparison({ currentProfiles }: { currentProfiles: string[] }) {
  return <figure className={styles.profileComparison}>
    <div className={styles.profileGrid}>
      {profiles.map(profile => <div className={styles.profileCard} data-current={currentProfiles.includes(profile.code) ? "true" : undefined} key={profile.code}>
        <h3>{profile.code}</h3>
        <svg viewBox="0 0 150 285" role="img" aria-label={`${profile.code} 型倒刺轮廓`}><OriginalProfile profile={profile.code} x={0} y={0} /></svg>
        <p>膨胀率<strong>{profile.range}</strong></p>
        <p>系列：{profile.series}</p>
        <span className={styles.currentLabel}>{currentProfiles.includes(profile.code) ? "当前型号采用" : "\u00a0"}</span>
      </div>)}
    </div>
    <figcaption>C/F/D/V/X 表示倒刺轮廓。图中区间用于比较系列内不同规格，单个型号按具体尺寸计算；系列编号不代表压力等级。</figcaption>
  </figure>;
}

export function BarbedStructureGuide() {
  const shapes = [
    { file: "ba-straight", label: "BA 直通型", href: "/products/fittings/barbed-fittings/ba-24f-pp-n/" },
    { file: "bl-elbow", label: "BL L 型", href: "/products/fittings/barbed-fittings/bl-32f-pp-n/" },
    { file: "bt-tee", label: "BT T 型", href: "/products/fittings/barbed-fittings/bt-32d-pp-n/" },
    { file: "by-wye", label: "BY Y 型", href: "/products/fittings/barbed-fittings/by-32d-pp-n/" },
    { file: "bx4-cross", label: "BX4 十字型", href: catalogue },
    { file: "bf4-pi", label: "BF4 π 型", href: catalogue },
  ];
  return <div className={styles.structureGrid} aria-label="六种倒刺接头本体结构">
    {shapes.map(shape => <figure key={shape.file}>
      <Link href={shape.href}><Image src={`${assetRoot}${shape.file}.webp`} alt={`${shape.label}倒刺接头本体示意`} width={1500} height={1500} sizes="(max-width: 640px) 45vw, 200px" /><span>{shape.label}</span></Link>
    </figure>)}
  </div>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(BarbedProductDetails, BarbedModelCode, BarbedProfileComparison, BarbedStructureGuide);
