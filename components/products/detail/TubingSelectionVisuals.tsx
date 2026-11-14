/* eslint-disable @next/next/no-img-element -- Preserve the source WebP photos and allow full-size inspection. */
import { getTubingGallery } from "@/data/products/tubing/gallery";
import assemblyMedia from "@/data/products/tubing-assemblies/fep-selection-media.zh.json";
import styles from "./TubingSelectionVisuals.module.css";
import { tubingView } from "./tubing-view";
import { tubingLocale } from "@/data/products/tubing/detail-locales";

type Material = "pvc" | "tpu" | "fep" | "ptfe" | "pfa" | "peek";
type FlangedMaterial = "fep" | "ptfe" | "pfa";
type Photo = { src: string; alt: string; width: number; height: number; caption: string; note?: string; contain?: boolean; closeup?: boolean };

const materialViews: Record<Material, { match: string; title: string; note: string }> = {
  pvc: { match: "foreach-clear-flexible-pvc-tubing.webp", title: "PVC 盘卷与透明管口", note: "观察管内液体和可见气泡，转弯及套接表现再结合硬度、壁厚与实际走线比较。" },
  tpu: { match: "foreach-flexible-tpu-tubing-instrument-routing.webp", title: "TPU 管材与柔性布管", note: "把转弯、运动行程和固定点一起纳入试装，检查管身是否受拉、摩擦或局部压扁。" },
  fep: { match: "foreach-fep-tubing-0.8mm-id-1.6mm-od-option.webp", title: "FEP 管口与内腔实拍", note: "从管口认识内腔与管壁。流量及充液量按所选型号计算，接头则核对外径与端部结构。" },
  ptfe: { match: "foreach-ptfe-tubing-natural-black-variants.webp", title: "本色与黑色 PTFE 管", note: "按完整型号区分颜色与尺寸；有避光要求时，再核对黑色配置和实际检测条件。" },
  pfa: { match: "pfa-tubing-main.webp", title: "PFA 管材与管端外观", note: "选管时同时考虑管径、成品长度和转弯空间，连接位置另行核对端口与配套零件。" },
  peek: { match: "foreach-chemical-resistant-peek-tubing-color-options.webp", title: "PEEK 管材与颜色识别", note: "将颜色与具体型号、内外径对应记录，避免更换时只看颜色而混用不同内孔的管子。" },
};

function PhotoFigure({ photo, compact = false, locale = "zh" }: { photo: Photo; compact?: boolean; locale?: string }) {
  return tubingView(<figure className={`${styles.figure} ${compact ? styles.compact : ""}`} data-tubing-guide-photo="true">
    <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${photo.caption}`}>
      <img className={photo.contain ? styles.contain : photo.closeup ? styles.closeup : undefined} src={photo.src} alt={photo.alt}
        width={photo.width} height={photo.height} loading="lazy" decoding="async" />
    </a>
    <figcaption><strong>{photo.caption}</strong>{photo.note ? <span>{photo.note}</span> : null}</figcaption>
  </figure>, locale);
}

export function TubingMaterialPhoto({ material, locale = "zh" }: { material: Material; locale?: string }) {
  const view = materialViews[material];
  const photo = getTubingGallery(`${material}-tubing`)?.find(image => image.src.endsWith(view.match));
  if (!photo) return null;
  return <PhotoFigure compact locale={locale} photo={{ ...photo, alt: photo.alt[tubingLocale(locale)], width: 1500, height: 1500, caption: view.title, note: view.note }} />;
}

const barbStructures: Photo = {
  src: "/images/resources/technical-articles/what-is-a-barbed-fitting/barbed-fittings-group-blue.webp",
  alt: "直通、弯头、T 型与 Y 型等倒刺接头实物展示",
  width: 2375, height: 1237, contain: true,
  caption: "按走向选择直通、转角或分支结构",
  note: "结构决定布管走向，每个接管端仍需分别核对适配软管内径。",
};

export function TubingConnectionPhotos({ material, locale = "zh" }: { material: "pvc" | "tpu" | "peek"; locale?: string }) {
  if (material === "pvc") return <div className={styles.photoPair}>
    <PhotoFigure locale={locale} photo={{
      src: "/images/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/clear-pvc-tubing-on-barbed-fitting-cover.webp",
      alt: "透明 PVC 软管套在倒刺接头上的连接近景",
      width: 1600, height: 1200,
      caption: "PVC 软管与倒刺接头的套接位置",
      note: "核对软管内径、插入位置及管口状态，再检查密封与连接保持。",
    }} />
    <PhotoFigure locale={locale} photo={barbStructures} />
  </div>;
  if (material === "tpu") return <PhotoFigure compact locale={locale} photo={barbStructures} />;
  const photo = getTubingGallery("peek-tubing")?.find(image => image.src.endsWith("foreach-peek-tubing-0.8mm-id-1.6mm-od-option-fitting.webp"));
  return photo ? <PhotoFigure compact locale={locale} photo={{ ...photo, alt: photo.alt[tubingLocale(locale)], width: 1500, height: 1500, closeup: true,
    caption: "PEEK 管与螺纹接头的连接外观", note: "先按管外径选择夹持零件，再核对设备端螺纹、密封结构与插入要求。" }} /> : null;
}

export function TubingAssemblyPhotos({ material, companion, locale = "zh" }: { material: FlangedMaterial; companion: Photo; locale?: string }) {
  return <div className={styles.photoPair}>
    <PhotoFigure locale={locale} photo={{ ...assemblyMedia.images[material], alt: tubingLocale(locale) === "zh" ? assemblyMedia.images[material].alt : `${material.toUpperCase()} 法兰翻边管组件实拍`,
      caption: `${material.toUpperCase()} 法兰翻边管组件实拍`,
      note: "核对管端翻边、支撑垫片及接收端口的密封面。",
    }} />
    <PhotoFigure locale={locale} photo={{ ...companion, alt: tubingLocale(locale) === "zh" ? companion.alt : companion.caption }} />
  </div>;
}
