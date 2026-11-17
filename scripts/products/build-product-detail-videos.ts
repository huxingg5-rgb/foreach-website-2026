import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getInstallationGuidePageData } from "../../services/resources/installation-guide/getInstallationGuidePageData";
import { getSv10RelatedVideo } from "../../data/resources/installation-guide/installation-guide.sv10.en";

// Derive a small client manifest from the existing, reviewed video library.
// Product pages must not ship the complete watch-page bodies and product catalogues.
const root = fileURLToPath(new URL("../../", import.meta.url));
const target = path.join(root, "data/products/detail/product-detail-videos.generated.json");
const locales = ["en", "es", "fr", "ko", "ru"] as const;
// The reviewed watch pages have the strictest model/motor relations. Older
// translated hubs contain broader series tags; translations share these identities.
const canonical = new Map(getInstallationGuidePageData("en").guides.map(guide => [guide.id, guide]));
const manifest = Object.fromEntries(locales.map(locale => {
  const guides = getInstallationGuidePageData(locale).guides;
  const sv10 = getSv10RelatedVideo(locale);
  const videos = [sv10, ...guides.filter(guide => guide.id !== sv10.id)]
    .filter(guide => {
      const source = canonical.get(guide.id) ?? guide;
      return source.category !== "company" && guide.videoPlatform === "youtube" && guide.videoUrl && source.relationKeys?.length;
    })
    .map(guide => {
      const source = canonical.get(guide.id) ?? guide;
      const src = new URL(guide.videoUrl!);
      if (src.hostname !== "www.youtube.com" || !/^\/embed\/[\w-]{11}$/.test(src.pathname)) {
        throw new Error(`Invalid product video source: ${guide.id}`);
      }
      src.searchParams.set("hl", locale);
      src.searchParams.set("cc_lang_pref", locale);
      const cover = guide.thumbnail || "";
      if (!cover || (cover.startsWith("/") && !fs.existsSync(path.join(root, "public", cover)))) {
        throw new Error(`Missing product video cover: ${guide.id}`);
      }
      return {
        id: guide.id, title: guide.title, cover, kind: "youtube", src: src.toString(),
        relationKeys: source.relationKeys, priority: source.relationPriority ?? 0,
      };
    });
  if (new Set(videos.map(video => video.id)).size !== videos.length) throw new Error(`Duplicate video in ${locale}`);
  return [locale, videos] as const;
}));
const content = `${JSON.stringify(manifest, null, 2)}\n`;
const expectedIds = manifest.en.map(video => video.id).sort().join(",");
for (const locale of locales) {
  if (manifest[locale].map(video => video.id).sort().join(",") !== expectedIds) {
    throw new Error(`Incomplete product video translations: ${locale}`);
  }
}
if (process.argv.includes("--check")) {
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== content) {
    throw new Error("Product detail video manifest is stale. Run tsx scripts/products/build-product-detail-videos.ts.");
  }
} else if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== content) {
  fs.writeFileSync(target, content);
}
console.log(`Product detail videos: ${locales.length} locales, ${manifest.en.length} relevant clips per locale.`);
