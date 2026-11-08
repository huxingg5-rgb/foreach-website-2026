"use client";

import { fittingView } from "@/components/products/detail/fitting-view";
import { useEffect, useRef, useState } from "react";
import type { LuerPart } from "@/data/products/configurator/luer-pairing";
import FittingResourceViewer from "@/components/products/detail/FittingResourceViewer";
import staticAssets from "@/data/products/configurator/luer-static-preview-assets.json";
import styles from "./LuerAssemblyPreview.module.css";

type SpriteKind = "male" | "core" | "collar" | "female" | "ring" | "nut" | "plug";
type StaticArtwork = { url: string; bounds: { min: number[]; max: number[] } };
const staticArtwork: Readonly<Record<string, StaticArtwork>> = staticAssets.products;
const sprites = new Map<string, Promise<HTMLCanvasElement>>();
const finishes: Record<string, string> = { N: "#d6d7d5", W: "#e6e6e2", B: "#414240", R: "#d94443", G: "#22b687", U: "#344eae", O: "#f47d42", Y: "#f3d562" };
const role: Record<string, string> = { LPS: "公端", LPR: "公端", LP: "公端", LS: "普通母端", PMLS: "穿板母端", LCR: "色环", LNS: "螺母", LSL: "固定式芯子", LRL: "旋转式芯子", LPT: "锁圈", LPBL: "堵头" };

function color(part: LuerPart) { return finishes[part.model.split("-").at(-1)!] || finishes.N; }

function loadArtwork(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(Error(`Image could not load: ${src}`));
    image.src = src;
  });
}

function projectNut(artwork: HTMLCanvasElement): HTMLCanvasElement {
  // Project the selected PNG into a shallow side view. Display depth is
  // illustrative, not a CAD dimension or a replacement 3D asset.
  const height = 660, faceWidth = Math.ceil(height * Math.cos(85 * Math.PI / 180));
  const depth = 112;
  const source = document.createElement("canvas");
  source.width = Math.round(height * artwork.width / artwork.height); source.height = height;
  const sourceContext = source.getContext("2d")!;
  sourceContext.drawImage(artwork, 0, 0, source.width, height);
  const pixels = sourceContext.getImageData(0, 0, source.width, height).data;
  const rows: { left: number; rgb: number[] }[] = [];
  for (let y = 0; y < height; y++) {
    let left = source.width;
    const channels: number[][] = [[], [], []];
    for (let x = 0; x < source.width; x++) {
      const i = (y * source.width + x) * 4;
      if (pixels[i + 3] < 192 || Math.min(pixels[i], pixels[i + 1], pixels[i + 2]) >= 250) continue;
      left = Math.min(left, x);
      for (let c = 0; c < 3; c++) channels[c].push(pixels[i + c]);
    }
    rows.push({ left, rgb: channels.map(values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)] || 0) });
  }
  const result = document.createElement("canvas");
  result.width = depth + faceWidth; result.height = height;
  const ctx = result.getContext("2d")!;
  ctx.drawImage(artwork, 0, 0, faceWidth, height);
  for (let y = 0; y < height; y++) {
    if (rows[y].left === source.width) continue;
    // Carry the PNG's own contour and surface colors through the side wall.
    // A short neighborhood suppresses raster fringes without blurring edges.
    const nearby = rows.slice(Math.max(0, y - 6), Math.min(height, y + 7)).filter(row => row.left < source.width);
    const normal = y / (height - 1) * 2 - 1;
    const light = .82 + .17 * Math.sqrt(1 - normal * normal) - .08 * normal;
    const rgb = [0, 1, 2].map(c => Math.round(nearby.reduce((sum, row) => sum + row.rgb[c], 0) / nearby.length * light));
    ctx.fillStyle = `rgb(${rgb.join(",")})`;
    ctx.fillRect(rows[y].left / source.width * faceWidth, y, depth + 1, 1);
  }
  // The visible face remains the actual selected PNG, including its bore.
  ctx.drawImage(artwork, depth, 0, faceWidth, height);
  return result;
}

/** Preserve the supplied PNG artwork's alpha, silhouette and shading.
 * The nut is projected into the assembly view at its threaded mounting position.
 * This is a 2D assembly illustration, not a new or modified CAD model.
 */
function sprite(part: LuerPart, kind: SpriteKind): Promise<HTMLCanvasElement> {
  const baked = staticArtwork[part.model];
  const sourcePath = baked?.url || part.imagePath;
  const key = `${kind}:${part.model}:${sourcePath}`;
  if (sprites.has(key)) return sprites.get(key)!;
  const promise = (async () => {
    const image = await loadArtwork(sourcePath);
    const source = document.createElement("canvas");
    // The male PNG contains two views; the ring PNG includes a side view.
    // Female and nut artwork are used in their original supplied view.
    const crop = baked ? [0, 0, image.width, image.height]
      : kind === "male" && ["LPS", "LPR"].includes(part.family) ? [0, image.height / 2, image.width, image.height / 2]
      : kind === "collar" ? [0, 0, image.width / 2, image.height]
      : kind === "ring" ? [image.width * .76, 0, image.width * .24, image.height]
      : [0, 0, image.width, image.height];
    source.width = Math.ceil(crop[2]); source.height = Math.ceil(crop[3]);
    const ctx = source.getContext("2d")!;
    ctx.drawImage(image, ...crop as [number, number, number, number], 0, 0, source.width, source.height);
    const pixels = ctx.getImageData(0, 0, source.width, source.height);
    // The red collar has an existing white-background JPG instead of a PNG.
    // Remove only its white padding; preserve the exact SKU's original colour.
    if (kind === "collar" && !part.previewImagePath && !baked) {
      for (let i = 0; i < pixels.data.length; i += 4) {
        if (Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]) >= 248) pixels.data[i + 3] = 0;
      }
      ctx.putImageData(pixels, 0, 0);
    }
    let left = source.width, top = source.height, right = 0, bottom = 0;
    for (let y = 0; y < source.height; y++) for (let x = 0; x < source.width; x++) {
      const i = (y * source.width + x) * 4;
      const low = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
      // Ignore opaque white padding when finding bounds without deleting
      // any pixels from the supplied transparent product artwork.
      if (pixels.data[i + 3] > 32 && low < 250) { left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y); }
    }
    if (left > right || top > bottom) throw Error("Empty product image");
    const result = document.createElement("canvas");
    const w = right - left + 1, h = bottom - top + 1;
    result.width = w; result.height = h;
    const output = result.getContext("2d")!;
    if (!baked && ["male", "core", "collar"].includes(kind)) { output.translate(w, 0); output.scale(-1, 1); }
    output.drawImage(source, left, top, w, h, 0, 0, w, h);
    return kind === "nut" ? projectNut(result) : result;
  })();
  sprites.set(key, promise);
  void promise.catch(() => sprites.delete(key));
  return promise;
}

function opaqueHousingWidth(artwork: HTMLCanvasElement): number {
  // The one-piece PNG shows both its wide outer housing and the narrower cone.
  // Locate the housing rim from its silhouette so the cone stays hidden inside
  // the female fitting, without moving parts or changing the supplied artwork.
  const ctx = artwork.getContext("2d")!;
  const upper = ctx.getImageData(0, Math.floor(artwork.height * .3), artwork.width, 1).data;
  const lower = ctx.getImageData(0, Math.floor(artwork.height * .7), artwork.width, 1).data;
  for (let x = artwork.width - 1; x >= 0; x--) {
    if (upper[x * 4 + 3] > 192 && lower[x * 4 + 3] > 192) return x + 1;
  }
  return artwork.width;
}

export default function LuerAssemblyPreview({ locale = "zh", parts, hero = false, singleImage = false, assembleCore = false, imageOnly = false }: { locale?: string; parts: LuerPart[] | null; hero?: boolean; singleImage?: boolean; assembleCore?: boolean; imageOnly?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [renderedModels, setRenderedModels] = useState("");
  const models = parts?.map(p => p.model).join(" + ") || "";
  const imagePart = singleImage && parts?.length === 1 ? parts[0] : null;
  // The shared core/accessory flow composes the selected core's own side view
  // with its collar. Entries outside this flow retain their preview behaviour.
  const coreArtwork = assembleCore && Boolean(parts?.some(p => ["LSL", "LRL"].includes(p.family)));
  // Selection dialogs stay on cached artwork; CAD is opened in product resources.
  const useCad = !imageOnly && !imagePart && Boolean(parts?.some(p =>
    coreArtwork && ["LPT", "LSL", "LRL"].includes(p.family) ? false
      : !p.previewImagePath || ["LSL", "LRL", "LPT", "LPBL"].includes(p.family)));
  useEffect(() => {
    if (!parts?.length || useCad || imagePart) return;
    let canceled = false;
    // One-piece LP artwork is an exterior view: the housing covers the seated
    // female. LPS/LPR cutaways keep their original order, while standalone parts
    // retain the complete cone. Apply by family, including LP chosen as a mate.
    const exteriorMale = parts.some(p => ["LS", "PMLS"].includes(p.family))
      ? parts.find(p => p.family === "LP") : undefined;
    const layerOrder: SpriteKind[] = coreArtwork ? ["core", "female", "collar", "ring", "nut"]
      : exteriorMale ? ["female", "male", "ring", "nut"] : ["male", "plug", "female", "ring", "nut"];
    const layers = parts.map(p => ({ part: p, kind: (p.family === "LPBL" ? "plug" : ["LPS", "LPR", "LP"].includes(p.family) ? "male"
      : ["LSL", "LRL"].includes(p.family) ? "core" : p.family === "LPT" ? "collar"
      : p.family === "LCR" ? "ring" : p.family === "LNS" ? "nut" : "female") as SpriteKind }))
      .sort((a, b) => layerOrder.indexOf(a.kind) - layerOrder.indexOf(b.kind));
    Promise.all(layers.map(async layer => ({ ...layer, image: await sprite(layer.part, layer.kind) }))).then(loaded => {
      if (canceled || !canvas.current) return;
      const target = canvas.current, ctx = target.getContext("2d")!;
      target.width = 1380; target.height = 600;
      ctx.clearRect(0, 0, target.width, target.height);
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, target.width, target.height);
      // Fixed mating plane: changing one size keeps other PNG parts in place.
      // Lengths follow the exact reviewed drawings; this remains an illustration.
      const scale = 1380 / 52, center = 300;
      // Separate LSL/LRL source cone seats 1.17 mm shallower than the complete LPS
      // source assembly; match the existing CAD placement without altering it.
      const femaleOffset = coreArtwork ? -.051 / .03 : -.086 / .03;
      const core = parts.find(p => ["LSL", "LRL"].includes(p.family));
      const coreLength = core ? [20, 22.3, 25][["1.6", "2.4", "3.2"].indexOf(core.tube)] : 20;
      const origin = coreArtwork && !parts.some(p => ["LS", "PMLS"].includes(p.family)) ? 17.7 + coreLength / 2 : 20;
      for (const layer of loaded) {
        let x: number, w: number, h: number;
        const baked = staticArtwork[layer.part.model];
        if (baked) {
          // The baked side view uses the reviewed CAD assembly coordinates.
          w = baked.bounds.max[0] - baked.bounds.min[0];
          h = baked.bounds.max[1] - baked.bounds.min[1];
          x = baked.bounds.min[0];
        } else if (layer.kind === "male") {
          const index = ["1.6", "2.4", "3.2"].indexOf(layer.part.tube);
          w = (layer.part.family === "LP" ? [14.85, 17.15, 19.85] : [20, 22.3, 25])[index];
          h = w * layer.image.height / layer.image.width; x = 8.3 - w;
        } else if (layer.kind === "core") {
          w = coreLength; h = w * layer.image.height / layer.image.width; x = 8.3 - w;
        } else if (layer.kind === "collar") {
          // Collar axial bounds [9, 20] translated by -13.9 in the source CAD.
          w = 11; h = w * layer.image.height / layer.image.width; x = -4.9;
        } else if (layer.kind === "female") {
          const index = ["1.6", "2.4", "3.2"].indexOf(layer.part.tube);
          w = (layer.part.family === "PMLS" ? [20.9, 23.2, 25.9] : [13.9, 16.2, 18.9])[index];
          h = w * layer.image.height / layer.image.width; x = 5 + femaleOffset;
        } else {
          h = layer.kind === "ring" ? 14.3 : 11; w = h * layer.image.width / layer.image.height;
          if (layer.kind === "nut") {
            // Place the PNG-based projection on the threaded female end.
            x = 13.9 + femaleOffset + (parts.some(p => p.family === "LCR") ? .8 : 0) + 2;
          } else x = 13.9 + femaleOffset + .8 - 2.5;
        }
        const left = parts.length === 1 ? (target.width - w * scale) / 2 : (x + origin) * scale;
        if (layer.part === exteriorMale) {
          const visibleWidth = opaqueHousingWidth(layer.image);
          ctx.drawImage(layer.image, 0, 0, visibleWidth, layer.image.height, left, center - h * scale / 2, w * scale * visibleWidth / layer.image.width, h * scale);
        } else {
          ctx.drawImage(layer.image, left, center - h * scale / 2, w * scale, h * scale);
        }
      }
      setStatus("ready");
      setRenderedModels(parts.map(p => p.model).join(" + "));
    }).catch(() => { if (!canceled) setStatus("error"); });
    return () => { canceled = true; };
  }, [parts, useCad, imagePart, coreArtwork]);

  const ready = Boolean(parts && status === "ready" && renderedModels === models);
  return fittingView(<figure className={`${styles.figure} ${hero ? styles.hero : ""}`} data-luer-assembly="true" data-assembly-models={models} data-preview-mode={imagePart ? "image" : useCad ? "cad" : "png"} data-assembly-ready={imagePart || useCad ? undefined : String(ready)}>
    <div className={styles.stage}>
      {imagePart ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.productImage} src={imagePart.imagePath} alt={`${imagePart.name} ${imagePart.model}`} />
      ) : useCad && parts ? <FittingResourceViewer locale={locale} drawings={[]} modelSource={{ kind: "luer", parts }} active preview /> : <>
        <canvas ref={canvas} className={styles.canvas} role="img" aria-label={parts?.length === 1 ? `${models} 单件预览` : `鲁尔装配组合：${models}`} />
        {!ready ? <div className={styles.status}>{!parts ? "请选择有效规格以查看组合" : status === "error" ? "组合预览暂时无法加载，请查看下方零件图。" : "正在加载组合预览…"}</div> : null}
      </>}
    </div>
    <figcaption>
      {parts ? <div className={styles.legend}>{parts.map(part => <span className={styles.part} key={part.model} data-assembly-part={part.family} data-model={part.model} title={part.model}><i className={styles.dot} style={{ backgroundColor: color(part) }} />{role[part.family]}{part.tube ? ` ${part.tube} mm` : ` · ${part.color}`}</span>)}</div> : null}
      <p className={styles.note}>{imagePart ? "仅当前零件；尺寸以对应零件图为准。" : "组合示意，按所选零件联动展示；装配尺寸以零件图为准。"}</p>
    </figcaption>
  </figure>, locale);
}
