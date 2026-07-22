const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-selection.types.ts"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到类型文件：" + targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const typeStart = source.search(
  /export\s+type\s+SelectionFilterKey\s*=/
);

if (typeStart < 0) {
  throw new Error(
    "没有找到 SelectionFilterKey 类型定义。"
  );
}

const typeEnd = source.indexOf(
  ";",
  typeStart
);

if (typeEnd < 0) {
  throw new Error(
    "SelectionFilterKey 类型定义没有正常结束。"
  );
}

const typeBlock = source.slice(
  typeStart,
  typeEnd + 1
);

if (
  typeBlock.includes(
    '"filter09"'
  )
) {
  console.log(
    "SelectionFilterKey 已包含 filter09，无需修改。"
  );

  process.exit(0);
}

if (
  !typeBlock.includes(
    '"filter08"'
  )
) {
  throw new Error(
    "SelectionFilterKey 中没有找到 filter08，停止自动修改。"
  );
}

const updatedTypeBlock =
  typeBlock.replace(
    /(\|\s*"filter08")(\s*;)/,
    '$1\n  | "filter09"$2'
  );

if (
  updatedTypeBlock === typeBlock ||
  !updatedTypeBlock.includes(
    '"filter09"'
  )
) {
  throw new Error(
    "filter09 插入失败。"
  );
}

source =
  source.slice(
    0,
    typeStart
  ) +
  updatedTypeBlock +
  source.slice(
    typeEnd + 1
  );

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${targetPath}.bak_add_filter09_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "SelectionFilterKey 已补充 filter09"
);
console.log(
  "备份：",
  backupPath
);
console.log("");
