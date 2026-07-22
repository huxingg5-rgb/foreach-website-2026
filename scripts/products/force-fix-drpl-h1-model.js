const fs = require("fs");

const detailJson = "data/products/generated/pumps/valveless-pumps/detail/index.json";

const details = JSON.parse(fs.readFileSync(detailJson, "utf8").replace(/^\uFEFF/, ""));

const map = {
  "drpl-0109": {
    h1: "DRPL-0109 稀释比1:9 双头无阀泵",
    shortModel: "DRPL-0109",
    fullCode: "DRPL-0109-0100",
    ratio: "1:9",
  },
  "drpl-0119": {
    h1: "DRPL-0119 稀释比1:19 双头无阀泵",
    shortModel: "DRPL-0119",
    fullCode: "DRPL-0119-0060",
    ratio: "1:19",
  },
};

for (const item of details) {
  const config = map[item.slug];
  if (!config) continue;

  // 关键：H1 当前可能读的是 model，所以这里也同步改
  item.model = config.h1;
  item.title = config.h1;
  item.name = config.h1;
  item.h1Title = config.h1;
  item.pageTitle = config.h1;

  // 保留真实产品编码，后续清单/搜索/规格仍能用完整型号
  item.productCode = config.fullCode;
  item.foreachModel = config.shortModel;

  item.modelShort = config.shortModel;
  item.fullModelCode = config.fullCode;
  item.ratio = config.ratio;

  item.seo = item.seo || {};
  item.seo.title = `${config.h1} - 恒永达`;

  if (typeof item.seo.description === "string") {
    item.seo.description = item.seo.description
      .replace(/DRPL-0109\s*1:9\s*双头比例输送无阀泵/g, map["drpl-0109"].h1)
      .replace(/DRPL-0119\s*1:19\s*双头比例输送无阀泵/g, map["drpl-0119"].h1);
  }
}

fs.writeFileSync(detailJson, JSON.stringify(details, null, 2), "utf8");

console.log("DRPL H1/model/title/name forced.");