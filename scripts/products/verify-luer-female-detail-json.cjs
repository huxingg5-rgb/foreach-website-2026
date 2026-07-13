const fs = require("fs");
const path = require("path");

const root = process.cwd();

const luerPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "luer-fittings",
  "detail",
  "index.json"
);

const femalePath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "female-thread-adapters",
  "detail",
  "index.json"
);

function readDetail(filePath) {
  const source =
    fs.readFileSync(
      filePath,
      "utf8"
    );

  if (
    source.includes(
      '"model3DUrl"'
    )
  ) {
    throw new Error(
      "仍存在重复字段 model3DUrl：" +
        filePath
    );
  }

  return JSON.parse(source);
}

const luer =
  readDetail(luerPath);

const female =
  readDetail(femalePath);

console.log("");
console.log(
  "鲁尔接头详情：",
  luer.length
);

console.log(
  "内螺纹互转详情：",
  female.length
);

console.log("");
console.log(
  "鲁尔接头资源："
);
console.log(
  "有主图：",
  luer.filter(
    (item) =>
      item.mainImage
  ).length
);
console.log(
  "有二维图：",
  luer.filter(
    (item) =>
      item.drawingPdfUrl
  ).length
);
console.log(
  "有3D模型：",
  luer.filter(
    (item) =>
      item.model3dUrl
  ).length
);

console.log("");
console.log(
  "内螺纹互转资源："
);
console.log(
  "有主图：",
  female.filter(
    (item) =>
      item.mainImage
  ).length
);
console.log(
  "有二维图：",
  female.filter(
    (item) =>
      item.drawingPdfUrl
  ).length
);
console.log(
  "有3D模型：",
  female.filter(
    (item) =>
      item.model3dUrl
  ).length
);

if (
  luer.length !== 151 ||
  female.length !== 24
) {
  throw new Error(
    "详情数量验证失败。"
  );
}

console.log("");
console.log(
  "详情JSON验证通过。"
);
console.log("");
