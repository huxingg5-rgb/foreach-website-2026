import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import source from "../../data/products/tubing-assemblies/selection-media.zh.json";

// Localized labels are composited onto the approved geometry. Chinese originals
// and the user-supplied CL-1 dimensions remain unchanged.
const root=process.cwd();
const locales=["en","es","fr","ko","ru"] as const;
const destination="/images/products/tubing-assemblies/detail-locales";
const units=["Unit: mm","Unidad: mm","Unité : mm","단위: mm","Единица: мм"];
const relief=["Thread relief height ≤ 1 mm","Altura de alivio ≤ 1 mm","Hauteur de dégagement ≤ 1 mm","나사 여유부 높이 ≤ 1 mm","Высота проточки ≤ 1 мм"];
type Image={src:string;width:number;height:number;sha256:string};
const escape=(value:string)=>value.replace(/[<>&"']/g,char=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"})[char]!);
function label(width:number,height:number,text:string,size:number){
  const fontSize=Math.min(size,(width-24)/(Array.from(text).reduce((n,c)=>n+(/[\uac00-\ud7af]/.test(c)?1:.57),0)));
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="white"/><text x="12" y="${Math.round((height+fontSize*.72)/2)}" font-family="Arial, Malgun Gothic, sans-serif" font-size="${fontSize}" fill="#111">${escape(text)}</text></svg>`);
}
async function save(locale:string,key:string,input:Buffer):Promise<Image>{
  const src=`${destination}/${locale}/${key}.webp`,target=path.join(root,"public",src);
  await fs.mkdir(path.dirname(target),{recursive:true});
  const output=await sharp(input).trim({background:"white",threshold:12}).resize({width:1500,withoutEnlargement:true}).webp({lossless:true}).toBuffer();
  await fs.writeFile(target,output);
  const {width,height}=await sharp(output).metadata();
  return {src,width:width!,height:height!,sha256:createHash("sha256").update(output).digest("hex")};
}
async function crop(input:Buffer,ratios:readonly number[]){
  const {width,height}=await sharp(input).metadata();
  const [x,y,w,h]=ratios;
  return sharp(input).extract({left:Math.round(width!*x),top:Math.round(height!*y),width:Math.floor(width!*w),height:Math.floor(height!*h)}).png().toBuffer();
}
async function main(){
  const manifestPath=path.join(root,"data/products/tubing-assemblies/detail-media.intl.json");
  const manifest:Record<string,Record<string,Image>>=JSON.parse(await fs.readFile(manifestPath,"utf8"));
  const article=path.join(root,"public/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide");
  const dimensions=["flangeStandardDimensions","flangeCompactDimensions","ferruleStandardDimensions","ferruleCompactDimensions","ringPpsDimensions"] as const;
  const ring=await fs.readFile(path.join(root,"scripts/products/source-assets/tubing-assemblies/cl-1-ring-kit-dimensions-user-screenshot.png"));
  for(const [index,locale]of locales.entries()){
    const images=manifest[locale]??={};
    const flange=await fs.readFile(path.join(article,`flanged-sealing-structure-${locale}.svg`));
    images.flangeSealing=await save(locale,"flange-sealing",await crop(await sharp(flange).png().toBuffer(),[0,.025,.7,.96]));
    const configuration=await fs.readFile(path.join(article,`assembly-components-${locale}.svg`));
    images.flangeConfiguration=await save(locale,"flange-configuration",await sharp(configuration).png().toBuffer());
    const ferrule=await fs.readFile(path.join(root,`public/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-connection-structure-${locale}.webp`));
    images.ferruleSealing=await save(locale,"ferrule-sealing",await crop(ferrule,[0,.025,.7,.93]));
    for(const key of dimensions){
      const original=source.images[key];
      const input=await fs.readFile(path.join(root,"public",original.src));
      const height=original.height;
      const translated=await sharp(input).composite([{input:label(540,76,units[index],42),left:0,top:height-76}]).png().toBuffer();
      images[key]=await save(locale,key,translated);
    }
    const port=source.images.flatPort;
    const input=await fs.readFile(path.join(root,"public",port.src));
    images.flatPort=await save(locale,"flat-port",await sharp(input).composite([{input:label(555,90,relief[index],38),left:945,top:438}]).png().toBuffer());
    images.ringComponents=await save(locale,"cl-1-kit-dimensions",ring);
  }
  await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+"\n");
  console.log(`Built technical figures for ${locales.length} locales; preserved source dimensions and model identifiers.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
