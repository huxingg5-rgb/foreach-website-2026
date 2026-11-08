import { getThreadBarbSelection, type ThreadBarbIdentity } from "./thread-to-barbed-selection.zh";

// Chinese product details only. Geometry crops use the existing model-linked
// 2D drawings; material/colour variants share geometry, not a sample photograph.
// A02 p.43 supplies the SB-M5 comparison: older PDFs incorrectly label M5×1.
// Do not use the SA-X32-32D linked PDF (its title identifies a U32 part).
// Keep both original drawing/CAD manifests and the selection copy unchanged.
const detailRoot = "/images/products/fittings/thread-to-barbed-fittings/details-zh/";
const photoRoot = "/images/products/fittings/thread-to-barbed-fittings/photos/";
type ProductIdentity = ThreadBarbIdentity & { mainImage?: string | null; image?: string | null; imageCard?: string | null };
type DetailPoint = { title: string; text: string };
export type ThreadBarbFigure = { src: string; alt: string; caption: string };
type Dimensions = { length?: number; width?: number; height?: number; crest: number };

const dimensions: Record<string, Dimensions> = {
  "SA-U32-16D": { length: 10.5, crest: 2.4 }, "SA-U32-32F": { length: 15, crest: 4 },
  "SA-U28-16D": { length: 13.8, crest: 2.4 }, "SA-U28-24D": { length: 16.1, crest: 3.5 },
  "SA-U28-32D": { length: 18.5, crest: 4.5 }, "SA-U28-40D": { length: 19.8, crest: 5.7 },
  "SA-U28-48D": { length: 23.8, crest: 7 }, "SA-X32-24D": { length: 15, crest: 3.6 },
  "SAL-U32-16D": { width: 11.44, height: 12, crest: 2.4 },
  "SAL-U32-32D": { width: 17.24, height: 13.75, crest: 4.5 },
  "SAL-U28-16D": { width: 12.27, height: 13.5, crest: 2.4 },
  "SAL-U28-32D": { width: 17.87, height: 15.5, crest: 4.5 },
  "SB-U28-16": { length: 24, crest: 2.9 }, "SB-U28-40": { length: 26, crest: 5.2 },
  "SB-M6-24": { length: 24, crest: 3.5 }, "SB-M6-32": { length: 26, crest: 4.5 },
  "SB-M6-40": { length: 26, crest: 5.2 },
  "SBS-M6-24D": { length: 19, crest: 3.5 }, "SBS-M6-32D": { length: 21.7, crest: 4.5 },
  "SBR-U28-16": { length: 26.4, crest: 2.7 }, "SBR-U28-24": { length: 26.4, crest: 3.5 },
  "SBR-U28-32": { length: 26.4, crest: 4.2 },
  "SC-M6-16": { length: 19, crest: 2.7 }, "SC-M6-32": { length: 20.3, crest: 4.5 },
  "SC-U28-16D": { length: 26.4, crest: 2.7 }, "SC-U28-24D": { length: 26.4, crest: 3.8 },
  "SC-U28-32D": { length: 26.4, crest: 4.5 },
};
const m5Dimensions: Record<string, Dimensions> = {
  "16D": { length: 13.2, crest: 2.4 }, "24D": { length: 15.5, crest: 3.5 },
  "32D": { length: 18.2, crest: 4.5 }, "40D": { length: 19.2, crest: 5.7 },
};
function sizeText(d: Dimensions) {
  return d.width !== undefined
    ? `图示横向尺寸 ${d.width} mm、高度 ${d.height} mm，倒刺峰径 ${d.crest} mm`
    : `总长 ${d.length} mm，倒刺峰径 ${d.crest} mm`;
}
function drawing(key: string, role: string): ThreadBarbFigure {
  return {
    src: `${detailRoot}${key.toLowerCase()}-dimensions.webp`,
    alt: `${key} 结构尺寸图：${sizeText(dimensions[key])}`,
    caption: `${role} · ${key} 尺寸图（mm）。`,
  };
}
const straightPhoto: ThreadBarbFigure = {
  src: `${photoRoot}male-thread-to-barb-straight-fitting-six-piece-lineup.webp`,
  alt: "外螺纹转倒刺直通系列实拍，六只不同大小的接头展示六角本体、螺纹与倒刺外形",
  caption: "直通系列实拍 · 外形对比，照片不作为尺寸比例依据。",
};
const bottomSection: ThreadBarbFigure = {
  src: `${detailRoot}sb-bottom-seal-catalog-section.webp`,
  alt: "接头手册 SB 底面密封结构剖面：A 为通孔，B 为倒刺峰径，C 为总长，D 为螺纹端长度，E 为六角对边",
  caption: "SB 手册结构示意 · A 通孔、B 峰径、C 总长、D 螺纹端长度、E 六角对边。",
};
const m5Table: ThreadBarbFigure = {
  src: `${detailRoot}sb-m5-catalog-dimensions.webp`,
  alt: "接头手册 SB-M5-16D、24D、32D、40D 尺寸对照表，接管内径为 1.6、2.4、3.2、4.0 mm",
  caption: "SB-M5 尺寸对比 · 对应左图 A–E，尺寸单位 mm。",
};

export function getThreadBarbProduct(data: ProductIdentity) {
  const current = getThreadBarbSelection(data);
  if (!current) return undefined;
  const { model, family, thread, tubeCode, tubeId, threadLabel } = current;
  const key = `${family}-${thread}-${tubeCode}`;
  const geometry = dimensions[key];
  const points: DetailPoint[] = [];
  let figures: ThreadBarbFigure[] = [];
  const ownDrawing = () => drawing(key, "当前规格结构");
  const hero = data.mainImage || data.imageCard || data.image;
  const hasDetailAppearance = (family === "SAL" && geometry) || (family === "SC" && thread === "U28" && geometry) || (family === "SA" && thread === "X32");
  const productFigure: ThreadBarbFigure = hero
    ? { src: hasDetailAppearance ? `${detailRoot}${model.toLowerCase()}-appearance.webp` : hero, alt: `${model} 产品外形图，展示${family === "SC" ? "内螺纹承接本体" : "螺纹端与本体"}及倒刺端`, caption: `当前型号 · ${model} 产品外形。` }
    : drawing("SA-U28-16D", "SA 直通结构示例");
  const tubePoint: DetailPoint = {
    title: "管径看内径，峰径看外廓",
    text: `本型号接 ${tubeId.toFixed(1)} mm 内径软管。图中的倒刺峰径是外部夹持轮廓，中心通孔是流道，两者都不能当作软管规格。`,
  };
  const interfacePoint: DetailPoint = {
    title: "螺纹端与旋拧部位",
    text: `当前为 ${threadLabel} 外螺纹；六角本体用于旋拧。螺纹外径、螺距及旋入长度需要一起核对，倒刺端用于接软管。`,
  };

  if (family === "SAL" && geometry) {
    const other = `SAL-${thread}-${tubeCode === "16D" ? "32D" : "16D"}`;
    const straight = `SA-${thread}-${tubeCode === "32D" && thread === "U32" ? "32F" : tubeCode}`;
    points.push(
      { title: "L 型外形与转角流道", text: "螺纹端与倒刺端呈 90° 布置，剖面可看到流道在本体内转向。与直通 SA 相比，软管从侧面引出，安装空间要同时看横向伸出和高度。" },
      { title: "当前尺寸与相邻管径", text: `${key}：${sizeText(geometry)}；${other}：${sizeText(dimensions[other])}。更换管径后，倒刺粗细和外形占用都会变化。` },
      { title: "直通与 L 型的区别", text: `${straight} 为直通结构，${sizeText(dimensions[straight])}。对比图用于观察出管方向与外形，轮廓字母和完整尺寸仍应按各自型号核对。` },
      interfacePoint, tubePoint,
    );
    figures = [ownDrawing(), drawing(other, "同螺纹、不同管径"), drawing(straight, "直通结构对比"), productFigure];
  } else if (family === "SA" && thread === "X32") {
    points.push(
      { title: "X32 锥螺纹与 U32 的区别", text: "X32 是本系列的 3.4 锥螺纹代码，U32 为 10-32 UNF。两者不能凭名称相近或外观相似互换，应核对配合端口图纸。" },
      { title: "2.4 mm 与 3.2 mm 接管规格", text: "24D、32D 分别对应 2.4 mm、3.2 mm 内径软管。右侧尺寸示例为 SA-X32-24D，总长 15 mm、倒刺峰径 3.6 mm；此数值仅用于该示例规格。" },
      { title: "六角本体与倒刺外廓", text: "六角部位用于旋拧，锥螺纹端连接设备，倒刺端连接软管。对照产品图时，分别辨认螺纹、六角和倒刺，不能只比较整体长度。" },
      tubePoint,
    );
    figures = [
      productFigure,
      drawing("SA-X32-24D", "X32 尺寸示例"), drawing("SA-U32-32F", "U32 螺纹结构对比"), straightPhoto,
    ];
  } else if (family === "SA" && geometry) {
    const other = thread === "U32" ? `SA-U32-${tubeCode === "16D" ? "32F" : "16D"}` : `SA-U28-${tubeCode === "32D" ? "16D" : "32D"}`;
    const elbow = `SAL-${thread}-${tubeCode === "16D" ? "16D" : "32D"}`;
    points.push(
      { title: "直通外形与接管端", text: "外螺纹、六角本体与倒刺端沿轴向排列。侧视图展示螺纹伸出和倒刺轮廓，端视图展示通孔与六角对边。" },
      { title: "不同管径的尺寸差别", text: `${key}：${sizeText(geometry)}；${other}：${sizeText(dimensions[other])}。管径变化会同时影响倒刺外廓和本体总长。` },
      { title: "与 L 型的外形对比", text: `${elbow} 将软管引出方向转为侧向。图中已标出对比规格；布管时分别查看接管内径、横向空间和高度。` },
      interfacePoint, tubePoint,
    );
    figures = [ownDrawing(), drawing(other, "同螺纹规格对比"), drawing(elbow, "L 型结构对比"), straightPhoto];
  } else if (family === "SB" && thread === "M5" && m5Dimensions[tubeCode]) {
    const d = m5Dimensions[tubeCode];
    points.push(
      { title: "底面与螺纹的位置", text: "螺纹端末端的平面用于与匹配端口底面接触，螺纹提供轴向压紧力。剖面示意同时展示中心通孔和倒刺外廓。" },
      { title: "当前规格与 M5 尺寸系列", text: `手册中 ${key} 的${sizeText(d)}。16D／24D／32D／40D 的总长依次为 13.2／15.5／18.2／19.2 mm，六角对边均为 6.35 mm。` },
      { title: "M5 与 M6 本体差别", text: "M5 规格采用 M5×0.8 螺纹。右侧 SB-M6-24 是 M6×1 对比示例，总长 24 mm；螺纹、本体长度和端口深度都需要分别核对。" },
      tubePoint,
    );
    figures = [bottomSection, m5Table, drawing("SB-M6-24", "M6 本体对比示例"), straightPhoto];
  } else if (family === "SB" && geometry) {
    const other = thread === "U28" ? `SB-U28-${tubeCode === "16" ? "40" : "16"}` : `SB-M6-${tubeCode === "24" ? "40" : "24"}`;
    const related = thread === "M6" ? "SBS-M6-24D" : "SBR-U28-16";
    points.push(
      { title: "底面密封结构", text: "螺纹端末端的平面与匹配端口底面接触，六角本体用于锁紧。核对侧视图时，应同时看螺纹端长度和末端位置。" },
      { title: "同螺纹、不同管径", text: `${key}：${sizeText(geometry)}；${other}：${sizeText(dimensions[other])}。同一螺纹下，接管尺寸和倒刺外形仍有区别。` },
      { title: thread === "M6" ? "标准款与短款" : "固定本体与旋转组件", text: thread === "M6" ? "SBS-M6-24D 为短款示例，总长 19 mm；与 SB-M6-24 的 24 mm 相比短 5 mm。短款的螺纹端长度也不同，需要重新核对端口深度。" : "SBR-U28-16 的剖面由外部旋拧件与内部管杆组成，区别于 SB 一体式本体。其总长为 26.4 mm，不能只按同为 U28 判断安装尺寸相同。" },
      tubePoint,
    );
    figures = [ownDrawing(), drawing(other, "同螺纹尺寸对比"), drawing(related, thread === "M6" ? "短款结构示例" : "可旋转结构示例"), straightPhoto];
  } else if (family === "SBS" && geometry) {
    const other = `SBS-M6-${tubeCode === "24D" ? "32D" : "24D"}`;
    const standard = `SB-M6-${current.sizeCode}`;
    points.push(
      { title: "短款缩短在哪里", text: `${key} 总长 ${geometry.length} mm，对应 ${standard} 为 ${dimensions[standard].length} mm，缩短 ${Number((dimensions[standard].length! - geometry.length!).toFixed(1))} mm。侧视图还可比较螺纹端伸出长度。` },
      { title: "两种接管规格", text: `${key}：${sizeText(geometry)}；${other}：${sizeText(dimensions[other])}。短款并非所有管径使用同一长度。` },
      { title: "末端平面与六角本体", text: "SBS 仍采用底面密封结构，六角部位提供旋拧位置。对比标准 SB 时，需同时确认端口底面、螺纹深度及轴向空间。" },
      tubePoint,
    );
    figures = [ownDrawing(), drawing(standard, "标准 SB 对比"), drawing(other, "另一接管规格"), bottomSection];
  } else if (family === "SBR" && geometry) {
    const other = `SBR-U28-${tubeCode === "32" ? "16" : "32"}`;
    points.push(
      { title: "旋拧件与管杆分体", text: "剖面可见外部带螺纹的旋拧件、滚花部位和内部贯通管杆。实拍展示外部旋转环及倒刺管口，便于与一体式 SB 外形区分。" },
      { title: "总长相同，倒刺尺寸不同", text: "SBR-U28-16／24／32 的总长均为 26.4 mm，倒刺峰径分别为 2.7／3.5／4.2 mm，对应 1.6／2.4／3.2 mm 内径软管。" },
      { title: "当前规格的识别点", text: `${key} 的倒刺峰径为 ${geometry.crest} mm。系列实拍只展示旋转结构，具体管径用型号与尺寸图确认。` },
      tubePoint,
    );
    figures = [ownDrawing(), drawing(other, "同系列管径对比"), {
      src: `${photoRoot}sbr-u28-pp-swivel-male-thread-to-barb-single-angle.webp`,
      alt: "SBR U28 系列实拍，展示外螺纹、滚花旋转环和倒刺管口",
      caption: "SBR U28 系列实拍 · 螺纹端、旋转环与倒刺端。",
    }, {
      src: `${photoRoot}sbr-u28-pp-swivel-male-thread-to-barb-three-piece-group.webp`,
      alt: "SBR U28 系列三件实拍，从不同角度查看旋转环和管口",
      caption: "SBR U28 多角度实拍 · 具体接管尺寸按型号确认。",
    }];
  } else if (family === "SC" && geometry) {
    const other = `SC-${thread}-${current.sizeCode === "32" ? "16" : "32"}${thread === "U28" ? "D" : ""}`;
    const otherThread = thread === "M6" ? `SC-U28-${current.sizeCode}D` : `SC-M6-${current.sizeCode === "16" ? "16" : "32"}`;
    points.push(
      { title: "内螺纹承接端与倒刺端", text: "剖面展示内螺纹腔、内部端面和通向倒刺的流道。内螺纹侧承接匹配的硬管接头组件，另一侧连接软管。" },
      { title: "同螺纹下的管径差别", text: `${key}：${sizeText(geometry)}；${other}：${sizeText(dimensions[other])}。软管内径变化不能只看螺纹规格。` },
      { title: "M6 与 U28 的本体外形", text: "SC-M6 为圆筒滚花本体，无独立外凸挡圈；SC-U28 带外凸环形部分，内螺纹腔和本体长度也不同。两类剖面用于比较承接结构。" },
      tubePoint,
    );
    figures = [ownDrawing(), drawing(other, "同螺纹管径对比"), drawing(otherThread, "另一内螺纹结构示例"), thread === "U28"
      ? productFigure
      : { src: `${photoRoot}sc-m6-pp-female-thread-to-barb-two-angle-pair.webp`, alt: "SC M6 系列实拍，圆筒滚花本体与倒刺端的两个角度", caption: "SC M6 系列实拍 · 圆筒本体与接管端。" }];
  } else {
    // Unpublished records can still be previewed. Label references explicitly;
    // never infer a missing geometry from a similar thread or tube code.
    points.push({ title: "螺纹与接管端", text: `${model} 采用 ${threadLabel}，接 ${tubeId.toFixed(1)} mm 内径软管。下列图片为系列结构示例，示例尺寸仅对应图注型号。` }, tubePoint);
    figures = family === "SAL"
      ? [drawing("SAL-U28-16D", "L 型示例"), drawing("SAL-U28-32D", "另一管径示例"), drawing("SA-U28-32D", "直通示例"), productFigure]
      : [drawing("SA-U28-16D", "直通结构示例"), drawing("SA-U28-32D", "另一管径示例"), bottomSection, straightPhoto];
  }
  return { model, family, points, figures };
}
