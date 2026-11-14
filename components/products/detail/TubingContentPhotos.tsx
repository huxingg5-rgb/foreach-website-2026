import photos from "@/data/products/tubing/pvc-delivery-photos.zh.json";
import styles from "./TubingContentPhotos.module.css";
import { tubingView } from "./tubing-view";

export function TubingContentPhoto({ name, locale = "zh" }: { name: keyof typeof photos.photos; locale?: string }) {
  const photo = photos.photos[name];
  const src = photos.imageRoot + photo.filename;
  const caption = photo.caption.replaceAll("管材", "管子");
  return tubingView(<figure className={styles.figure} data-tubing-photo={name}>
    <a className={styles.photoLink} href={src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${caption}`}>
      {/* Preserve the complete framing of the user's manufacturing and packaging photographs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={photo.alt.replaceAll("管材", "管子")} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>, locale);
}

export function TubingManufacturingContent({ locale = "zh" }: { locale?: string } = {}) {
  return tubingView(<div data-tubing-manufacturing="true">
    <p><strong>FOREACH 的管子挤出线设在 10 万级洁净车间内，结合原料处理、挤出参数控制和在线测径，控制生产过程中的污染与尺寸变化。</strong>洁净环境有助于减少颗粒、纤维等异物接触管壁和管口；尺寸检查则关系到接头装配、管腔通流和批量安装的一致性。</p>
    <div className={styles.manufacturingPhotos}>
      <TubingContentPhoto name="extrusionControl" locale={locale} />
      <TubingContentPhoto name="onlineGauge" locale={locale} />
    </div>
    <p>用于样本、试剂或对本底敏感的液路时，可在选型阶段提出管内颗粒、清洗残留、尺寸公差和包装要求，结合所选型号安排样件检查与实际介质验证。在线测径用于监测外径等项目，内径、壁厚及其他要求按相应检验方法核对。</p>
    <p className={styles.note}>图片为管子制造现场示例，不同材料采用各自的加工条件。10 万级描述生产环境；无菌、生物相容性或特定检测本底要求，需对应到成品和项目资料。</p>
  </div>, locale);
}
