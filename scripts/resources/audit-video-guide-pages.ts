import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getVideoGuideDetail } from "@/data/resources/installation-guide/video-guide-details.en";
import { getVideoGuideRelatedProducts } from "@/services/resources/installation-guide/getVideoGuideRelatedProducts";
import { getVideoGuideProduct } from "@/data/resources/installation-guide/video-guide-products";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";

// The existing inventory beginning at Q60, captured before the 2026-10-21 revision.
const expectedIds = [
  "q60-quick-fitting", "female-thread-conversion", "bubble-detection-module",
  "dpl30-vs-dpl30h", "dpgl800-vacuum-test", "dpl-series-introduction",
  "lld-liquid-level-detection", "about-foreach",
  "dpl60-brushed-pressure-test", "dpl60-brushed-flow-rate-test", "dpl60-brushless-flow-rate-test",
  "dpl30-brushed-pressure-test", "dpl30-brushless-pressure-test", "dpl30-brushless-flow-rate-test", "dpl30-brushed-flow-rate-test",
  "five-wire-brushless-control-wires", "two-wire-brushless-diaphragm-pump",
  "diaphragm-pump-hose-barb-protection", "diaphragm-pump-placement-stability", "diaphragm-installation",
  "800-series-gas-liquid", "brushed-vs-brushless-lifespan", "60-series-pressure", "motor-selection",
  "30h-series-pressure", "diaphragm-selection",
].map(id => `youtube-${id}`);

const guides = getInstallationGuidePageData("en").guides;
const titles = new Set<string>();
const manifest = expectedIds.map(id => {
  const guide = guides.find(item => item.id === id);
  const detail = getVideoGuideDetail("en", id);
  assert(guide && detail, `Missing historical video/detail: ${id}`);
  assert.equal(guide.title, detail.title, `List/detail title mismatch: ${id}`);
  assert.equal(guide.detailHref, detail.detailHref);
  assert(!/\b(?:FOREACH|Q60\w*|DPL\w*|DPGL\w*|ABD|LLD|SMTP\w*)\b/i.test(detail.title), `Model/brand-led H1: ${id}`);
  assert(!titles.has(detail.title), `Duplicate H1: ${detail.title}`);
  titles.add(detail.title);
  assert(Number.isFinite(Date.parse(detail.uploadDate)), `Invalid upload date: ${id}`);
  const duration = detail.duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/);
  assert(duration, `Invalid duration: ${id}`);
  const seconds = Number(duration[1] || 0) * 60 + Number(duration[2] || 0);
  assert(seconds > 0);
  detail.highlights.forEach(item => assert(item.start === undefined || item.start < seconds, `Timestamp outside video: ${id}`));
  const sidebar = getVideoGuideRelatedProducts(id);
  const footer = getVideoGuideRelatedProducts(id, "footer");
  assert(sidebar.length > 0 && sidebar.length <= 2, `Sidebar products: ${id}`);
  assert(footer.length >= sidebar.length && footer.length <= 10, `Footer products: ${id}`);
  for (const product of footer) {
    assert(product.href.startsWith("/en/products/") && product.href.endsWith("/"), `Noncanonical product: ${product.href}`);
    assert(product.imageAlt.trim(), `Missing image ALT: ${product.id}`);
    assert(fs.existsSync(path.join(process.cwd(), "public", product.imageSrc)), `Missing image: ${product.imageSrc}`);
  }
  const links = [...new Set([
    ...detail.products.map(item => item.href), ...footer.map(item => item.href),
    ...(detail.seriesLink ? [detail.seriesLink.href] : []),
  ])];
  assert(links.every(href => href.startsWith("/en/") && href.endsWith("/")), `Noncanonical content link: ${id}`);
  return { ...detail, sidebar, footer, links };
});
assert.equal(manifest.length, 26);

function productVideos(id: string, relationKeys: string[]) {
  return getRelatedResourcesData({ sourceType: "product", sourceId: id, sourceSlug: id, relationKeys, locale: "en" }).videos;
}

const reverseLinks = ["dpl30-db", "dpl30-bb", "dpl60-db", "dpl60-bb", "dpl30h-ds", "dpl30h-bs", "dpgl800-bs"].map(key => {
  const series = key.split("-")[0];
  const videos = productVideos(key, [`series:${series}`]);
  const isBrushless = key.endsWith("-bb");
  if (series === "dpl30" || series === "dpl60") {
    const motor = isBrushless ? "brushless" : "brushed";
    const wrongMotor = isBrushless ? "brushed" : "brushless";
    assert(videos.some(video => video.id === `youtube-${series}-${motor}-flow-rate-test`), `Missing correct motor test on ${key}`);
    assert(!videos.some(video => video.id === `youtube-${series}-${wrongMotor}-flow-rate-test`), `Wrong motor test on ${key}`);
  }
  if (series === "dpl30h") assert(!videos.some(video => video.id.includes("hose-barb-protection")), `Threaded pump linked to barb guide: ${key}`);
  return { href: getVideoGuideProduct(key).href, videos: videos.map(video => ({ id: video.id, href: video.detailHref })) };
});

for (const entry of [
  { id: "abd-air-bubble-detector", keys: ["series:abd"], href: "/en/products/control/air-bubble-detectors/abd/", expected: "bubble-detection-module" },
  { id: "sampling-probes", keys: ["category:sampling-probes"], href: getVideoGuideProduct("sampling-probes").href, expected: "lld-liquid-level-detection" },
  { id: "smtp2-1000ul", keys: ["series:smtp2"], href: getVideoGuideProduct("smtp2-1000ul").href, expected: "lld-liquid-level-detection" },
  { id: "q6006-snx-sppe", keys: ["series:q60"], href: manifest[0].sidebar[0].href, expected: "q60-quick-fitting" },
  { id: "ut-u28-20-pp-n", keys: ["category:female-thread-adapters"], href: manifest[1].sidebar[0].href, expected: "female-thread-conversion" },
]) {
  const videos = productVideos(entry.id, entry.keys);
  assert(videos.some(video => video.id === `youtube-${entry.expected}`), `Missing video on ${entry.id}`);
  reverseLinks.push({ href: entry.href, videos: videos.map(video => ({ id: video.id, href: video.detailHref })) });
}

const search = JSON.parse(fs.readFileSync("public/search-data/global-search-index.en.v3.json", "utf8")) as {m:string;h:string;t:string;d:string}[];
for (const video of manifest) {
  const entries = search.filter(item => item.m === "installation-guides" && `/en${item.h}` === video.detailHref);
  assert.equal(entries.length, 1, `Search detail entry: ${video.id}`);
  assert.equal(entries[0].t, video.title);
  assert(video.description.startsWith(entries[0].d.replace(/…$/, "")), `Stale search summary: ${video.id}`);
}

const output = process.argv.find(arg => arg.startsWith("--output="))?.slice("--output=".length);
if (output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify({ checkedAt: new Date().toISOString(), videos: manifest, reverseLinks }, null, 2));
}
console.log(`PASS: ${manifest.length} historical video pages; ${reverseLinks.length} product backlink groups; canonical links, source timing, images and search entries.`);
