// Build clean guide figures from existing FOREACH assets. Text sections stay in HTML.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import { getLocalizedAssemblyDetail } from "../../data/products/tubing-assemblies/localized";
import { getPublishedAssemblyConfigurations } from "../../data/products/tubing-assemblies/publication";
import fepMedia from "../../data/products/tubing-assemblies/fep-selection-media.zh.json";

const repo = process.cwd();
const root = "/images/products/tubing-assemblies/selection/";
const manifestFile = path.join(repo, "data/products/tubing-assemblies/selection-media.zh.json");
const dimensionsFile = path.join(repo, "data/products/tubing-assemblies/media-dimensions.json");
const digest = (bytes: Buffer) => crypto.createHash("sha256").update(bytes).digest("hex");
type Recipe = { file: string; path?: string; page?: number; crop: [number, number, number, number]; alt: string; caption: string; diagramOverride?: { path: string; sha256: string; top: number; bottom: number } };
const articleRoot = "public/images/resources/technical-articles/hard-tube-fittings-selection-guide/";
const recipes: Record<string, Recipe> = {
  ferruleSealing: { file: "ferrule-connection-exploded.webp", path: `${articleRoot}ferrule-connection-structure-zh.png`, crop: [0,.004,.7,.9], alt: "卡箍连接的端部结构，展示管材、螺纹接头与配套卡箍的装配关系", caption: "卡箍连接的部件与装配关系" },
  ringSealing: { file: "retaining-ring-sealing-components.webp", path: `${articleRoot}compression-ring-structure-international.png`, crop: [0,.004,1,.996], alt: "卡环连接的部件结构，A 为密封垫圈、B 为卡环压套、C 为螺纹接头", caption: "卡环压套、密封垫圈与接头的配合关系" },
  ringPliers: { file: "t-sf-4-ss-ring-installation-pliers.webp", path: `${articleRoot}compression-ring-installation-pliers-t-sf-4-ss.png`, crop: [0,0,1,.75], alt: "T-SF-4-SS 卡环安装钳，用于配套卡环压套与垫圈的预装", caption: "卡环套件预装工具 T-SF-4-SS" },
  ferruleStandardDimensions: { file: "hn-standard-fitting-dimensions.webp", page: 14, crop: [.4,.286,.28,.115], alt: "HN 标准卡箍接头的外形与剖面尺寸图", caption: "HN 标准接头尺寸示例，单位 mm" },
  ferruleCompactDimensions: { file: "hn6-compact-fitting-dimensions.webp", page: 14, crop: [.399,.568,.281,.113], alt: "HN6 紧凑卡箍接头的外形与剖面尺寸图", caption: "HN6 紧凑接头尺寸示例，单位 mm" },
  ringPpsDimensions: { file: "hsf6-pps-fitting-dimensions.webp", page: 21, crop: [.399,.31,.293,.112], alt: "HSF6 PPS 卡环接头尺寸示例，PEEK 材质应按自身型号图纸确认", caption: "HSF6 PPS 接头尺寸示例，单位 mm" },
  ringComponents: { file: "cl-1-ring-kit-components.webp", page: 21, crop: [.399,.569,.509,.32], alt: "CL-1S 与 CL-1X 卡环套件的尺寸图、系列说明与配套规格表", caption: "CL-1S 与 CL-1X 卡环套件尺寸及配套规格", diagramOverride: { path: "scripts/products/source-assets/tubing-assemblies/cl-1-ring-kit-dimensions-user-screenshot.png", sha256: "a986cba17acdc9bb76acbb3763179747819d33e31a5df4beebabcafc597955a4", top: 134, bottom: 570 } },
};

type GuideImage = { src: string; width: number; height: number; alt: string; caption: string; source: object; sha256: string };
async function main() {
  const dimensionsBefore = await fs.readFile(dimensionsFile);
  const dimensions = JSON.parse(dimensionsBefore.toString("utf8"));
  const images: Record<string, GuideImage> = {};
  const pending: { src: string; bytes: Buffer }[] = [];
  const manualBytes = await fs.readFile(path.join(repo, fepMedia.manual.path));
  if (digest(manualBytes) !== fepMedia.manual.sha256) throw new Error("Source catalogue changed; inspect the figure panels before rebuilding");
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdfRoot = path.join(repo, "node_modules/pdfjs-dist").replaceAll("\\", "/");
  const document = await pdfjs.getDocument({data:new Uint8Array(manualBytes),useSystemFonts:true,cMapUrl:`${pdfRoot}/cmaps/`,cMapPacked:true,standardFontDataUrl:`${pdfRoot}/standard_fonts/`}).promise;
  const pages = new Map<number, Buffer>();
  async function register(key: string, src: string, bytes: Buffer, alt: string, caption: string, source: object, write = false) {
    const metadata = await sharp(bytes).metadata();
    if (metadata.format !== "webp" || !metadata.width || !metadata.height) throw new Error(`Invalid WebP: ${src}`);
    images[key] = {src,width:metadata.width,height:metadata.height,alt,caption,source,sha256:digest(bytes)};
    dimensions[src] = {width:metadata.width,height:metadata.height};
    if(write) pending.push({src,bytes});
  }
  try {
    for (const [key, recipe] of Object.entries(recipes)) {
      let original: Buffer;
      if (recipe.page) {
        if (!pages.has(recipe.page)) {
          const page = await document.getPage(recipe.page);
          const viewport = page.getViewport({scale:8});
          const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
          await page.render({canvasContext:canvas.getContext("2d") as unknown as CanvasRenderingContext2D,viewport}).promise;
          pages.set(recipe.page,canvas.toBuffer("image/png"));
        }
        original = pages.get(recipe.page)!;
      } else original = await fs.readFile(path.join(repo,recipe.path!));
      const metadata = await sharp(original).metadata();
      const [x,y,width,height] = recipe.crop;
      const panel = await sharp(original).extract({left:Math.round(x*metadata.width!),top:Math.round(y*metadata.height!),width:Math.round(width*metadata.width!),height:Math.round(height*metadata.height!)}).flatten({background:"#ffffff"}).toBuffer();
      const trimmed = await sharp(panel).trim({background:"#ffffff",threshold:8}).toBuffer();
      let bytes = await sharp(trimmed).resize({width:1484}).extend({top:8,right:8,bottom:8,left:8,background:"#ffffff"}).webp({lossless:true,effort:6}).toBuffer();
      if (recipe.diagramOverride) {
        // Use the customer's screenshot where PDF gradient rendering loses detail.
        const replacement = recipe.diagramOverride;
        const screenshot = await fs.readFile(path.join(repo,replacement.path));
        if (digest(screenshot) !== replacement.sha256) throw new Error("Customer diagram screenshot changed");
        const band = await sharp(screenshot).flatten({background:"#ffffff"}).resize({width:1484}).png().toBuffer({resolveWithObject:true});
        const originalSize = await sharp(bytes).metadata();
        const top = await sharp(bytes).extract({left:0,top:0,width:1500,height:replacement.top}).png().toBuffer();
        const bottom = await sharp(bytes).extract({left:0,top:replacement.bottom,width:1500,height:originalSize.height!-replacement.bottom}).png().toBuffer();
        bytes = await sharp({create:{width:1500,height:replacement.top+band.info.height+originalSize.height!-replacement.bottom,channels:3,background:"#ffffff"}})
          .composite([{input:top,left:0,top:0},{input:band.data,left:8,top:replacement.top},{input:bottom,left:0,top:replacement.top+band.info.height}])
          .webp({lossless:true,effort:6}).toBuffer();
      }
      await register(key,root+recipe.file,bytes,recipe.alt,recipe.caption,{...recipe,sha256:digest(recipe.page ? manualBytes : original)},true);
    }
    const shared = { flangeSealing:"sealing", flangeConfiguration:"configuration", flangeStandardDimensions:"hfDimensions", flangeCompactDimensions:"hf6Dimensions", flatPort:"flatPort", conicalPort:"conicalPort", torqueTool:"torque" } as const;
    for(const [key,originalKey] of Object.entries(shared)) {
      const image=fepMedia.images[originalKey];
      const bytes=await fs.readFile(path.join(repo,"public",image.src));
      await register(key,image.src,bytes,image.alt,image.caption,{kind:"existing",path:image.src});
    }
    for(const family of ["flanged-tubing","ferrule-kits","retaining-ring-kits"] as const) {
      for(const configuration of getPublishedAssemblyConfigurations(family)) {
        const detail=getLocalizedAssemblyDetail("zh-CN",family,configuration);
        // The customer identified this photograph as 6-40 UNF and compact ferrule fittings.
        const ptfeFittingReference = family === "retaining-ring-kits" && configuration === "ptfe";
        const source = ptfeFittingReference ? "/images/products/tubing-assemblies/retaining-ring-pair-white-shadow-intro.png"
          : family === "flanged-tubing" && configuration === "fep"
          ? fepMedia.images.fep.src
          : family === "flanged-tubing" && configuration === "ptfe"
            ? fepMedia.images.ptfe.src : String(detail.mainImage);
        const original=await fs.readFile(path.join(repo,"public",source));
        const input=await sharp(original).metadata();
        const reuse=input.format === "webp" && input.width === 1500;
        const src=reuse ? source : `${root}${configuration}-${family}-guide-photo.webp`;
        const bytes=reuse ? original : await sharp(original).flatten({background:"#ffffff"}).resize({width:1500}).webp({lossless:true,effort:6}).toBuffer();
        await register(`${family}:${configuration}`,src,bytes,
          ptfeFittingReference ? "6-40 UNF 接头与紧凑卡箍接头的实拍对比，展示接头及管路连接" : String(detail.imageAlt),
          ptfeFittingReference ? "6-40 UNF 与紧凑卡箍接头实拍示例" : `${detail.h1Title}实拍示例`,
          {kind:"existing-photo",path:source,sha256:digest(original)},!reuse);
      }
    }
    if(digest(await fs.readFile(dimensionsFile)) !== digest(dimensionsBefore)) throw new Error("Dimensions changed during processing; rebuild against the current file");
    for(const {src,bytes} of pending) {
      const target=path.join(repo,"public",src);
      await fs.mkdir(path.dirname(target),{recursive:true});
      await fs.writeFile(target,bytes);
    }
    await fs.writeFile(manifestFile,JSON.stringify({images},null,2)+"\n");
    const ending=dimensionsBefore.includes(Buffer.from("\r\n")) ? "\r\n" : "\n";
    await fs.writeFile(dimensionsFile,JSON.stringify(dimensions,null,2).replace(/\n/g,ending)+ending);
    console.log(JSON.stringify({figures:Object.keys(images).length,newFiles:pending.length,dimensions:Object.fromEntries(Object.entries(images).map(([key,image])=>[key,[image.width,image.height]]))},null,2));
  } finally {await document.destroy();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
