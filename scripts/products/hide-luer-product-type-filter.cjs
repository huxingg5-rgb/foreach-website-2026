const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-luer-fitting-selection-and-assets.cjs"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function backup(filePath) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const backupPath =
    filePath +
    ".bak_hide_luer_filter01_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    "已备份：" + backupPath
  );
}

/*
 * 1. 修改生成脚本
 */
let generatorSource =
  read(generatorPath);

backup(generatorPath);

const generatorPattern =
  /(\{\s*categoryId:\s*"fittings",\s*productTypeId:\s*PRODUCT_TYPE_ID,\s*filterKey:\s*"filter01",[\s\S]*?visible:\s*)true(\s*,?\s*\})/;

if (
  !generatorPattern.test(
    generatorSource
  )
) {
  throw new Error(
    "生成脚本中没有找到鲁尔 filter01 标签。"
  );
}

generatorSource =
  generatorSource.replace(
    generatorPattern,
    "$1false$2"
  );

fs.writeFileSync(
  generatorPath,
  generatorSource,
  "utf8"
);

/*
 * 2. 修改当前已生成的数据
 */
let generatedSource =
  read(generatedPath);

backup(generatedPath);

const generatedPattern =
  /("productTypeId":\s*"luer-fittings",\s*"filterKey":\s*"filter01",[\s\S]*?"visible":\s*)true/;

if (
  !generatedPattern.test(
    generatedSource
  )
) {
  throw new Error(
    "生成数据中没有找到鲁尔 filter01 标签。"
  );
}

generatedSource =
  generatedSource.replace(
    generatedPattern,
    "$1false"
  );

fs.writeFileSync(
  generatedPath,
  generatedSource,
  "utf8"
);

console.log("");
console.log("============================================");
console.log("鲁尔接头产品类型筛选已隐藏");
console.log("============================================");
console.log("已隐藏：filter01 产品类型");
console.log("保留：产品系列、接管内径、螺纹规格、材质、颜色");
console.log("");
