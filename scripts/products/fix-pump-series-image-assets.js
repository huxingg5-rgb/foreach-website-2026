const fs = require("fs");
const path = require("path");

const detailFile = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series.detail.generated.ts"
);

if (!fs.existsSync(detailFile)) {
  throw new Error("未找到详情生成文件：" + detailFile);
}

const source = fs.readFileSync(detailFile, "utf8");
const match = source.match(/export const\s+(\w+)\s*=\s*([\s\S]*?)\s+as const;?/);

if (!match) {
  throw new Error("未找到 export const 数据");
}

const constName = match[1];
const records = JSON.parse(match[2]);

function fixImagePath(value) {
  if (typeof value !== "string") return value;

  return value.replace(
    /\/images\/products\/pumps\/plunger-pump\/(ea|sm)\/\1-(\d+)-(pmma|peek)-(main|detail)\.webp/gi,
    (_all, series, capacity, material) =>
      `/images/products/pumps/plunger-pump/${series.toLowerCase()}/pump-${series.toLowerCase()}-${capacity}ul-${material.toLowerCase()}.webp`
  );
}

function getImageValue(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return "";

  const keys = ["src", "url", "image", "imageUrl", "imagePath", "path", "href"];
  for (const key of keys) {
    if (
      typeof item[key] === "string" &&
      item[key].includes("/images/products/pumps/plunger-pump/")
    ) {
      return item[key];
    }
  }

  return "";
}

function walk(value) {
  if (typeof value === "string") {
    return fixImagePath(value);
  }

  if (Array.isArray(value)) {
    const walked = value.map(walk);

    const result = [];
    const seenImages = new Set();

    for (const item of walked) {
      const imageValue = getImageValue(item);

      if (imageValue) {
        if (seenImages.has(imageValue)) continue;
        seenImages.add(imageValue);
      }

      result.push(item);
    }

    return result;
  }

  if (value && typeof value === "object") {
    const next = {};
    for (const [key, item] of Object.entries(value)) {
      next[key] = walk(item);
    }
    return next;
  }

  return value;
}

const fixedRecords = walk(records);

const nextSource =
  `export const ${constName} = ${JSON.stringify(fixedRecords, null, 2)} as const;\n`;

fs.writeFileSync(detailFile, nextSource, "utf8");

console.log("✅ 已修复泵系列详情页图片路径");