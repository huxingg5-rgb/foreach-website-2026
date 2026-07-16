const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const dataPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.generated.ts"
);

for (const filePath of [clientPath, dataPath]) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`找不到文件：${filePath}`);
  }
}

const clientSource = fs.readFileSync(clientPath, "utf8");
const dataSource = fs.readFileSync(dataPath, "utf8");

/*
 * 从快插接头数据中自动找到 Mounting 对应的 filter key，
 * 避免直接猜测 filter04。
 */
function findMountingFilterKey(source) {
  const mountingIndexes = [];

  for (const text of [
    '"Mounting"',
    '"安装方式"',
    '"安装形式"',
    '"安装"',
  ]) {
    let index = source.indexOf(text);

    while (index >= 0) {
      mountingIndexes.push(index);
      index = source.indexOf(text, index + text.length);
    }
  }

  for (const index of mountingIndexes) {
    const start = Math.max(0, index - 1200);
    const end = Math.min(source.length, index + 1200);
    const context = source.slice(start, end);

    const keyMatches = [
      ...context.matchAll(
        /(?:"key"|key)\s*:\s*"(filter\d+)"/g
      ),
    ];

    if (keyMatches.length > 0) {
      /*
       * 优先使用距离 Mounting 最近的筛选 key。
       */
      let nearest = null;

      for (const match of keyMatches) {
        const absoluteIndex =
          start + (match.index || 0);

        const distance =
          Math.abs(absoluteIndex - index);

        if (!nearest || distance < nearest.distance) {
          nearest = {
            key: match[1],
            distance,
          };
        }
      }

      if (nearest) {
        return nearest.key;
      }
    }
  }

  return "";
}

const mountingFilterKey =
  findMountingFilterKey(dataSource);

if (!mountingFilterKey) {
  throw new Error(
    "没有在快插接头数据中找到 Mounting 对应的筛选字段。"
  );
}

console.log(
  `已定位 Mounting 对应字段：${mountingFilterKey}`
);

const startMarker =
  "/* QUICK_CONNECT_SERIES_TWO_COLUMN_START */";

const endMarker =
  "/* QUICK_CONNECT_SERIES_TWO_COLUMN_END */";

const startIndex =
  clientSource.indexOf(startMarker);

const endIndex =
  clientSource.indexOf(endMarker);

if (
  startIndex < 0 ||
  endIndex < 0 ||
  endIndex <= startIndex
) {
  throw new Error(
    "没有找到之前添加的快插接头两列布局标记。"
  );
}

const oldBlock = clientSource.slice(
  startIndex,
  endIndex + endMarker.length
);

const newBlock = `/* QUICK_CONNECT_SERIES_TWO_COLUMN_START */
/*
 * 快插接头两列布局：
 * 1. Product Series：Q20 / Q40 / Q60
 * 2. Mounting：Panel Mount / Non-Panel Mount
 */
if (
  productTypeId ===
    "quick-connect-fittings" &&
  (
    filterKey ===
      "filter01" ||
    filterKey ===
      "${mountingFilterKey}"
  )
) {
  return "two";
}
/* QUICK_CONNECT_SERIES_TWO_COLUMN_END */`;

if (oldBlock === newBlock) {
  console.log(
    "快插接头 Mounting 两列规则已经存在，无需重复修改。"
  );

  process.exit(0);
}

const newClientSource =
  clientSource.slice(0, startIndex) +
  newBlock +
  clientSource.slice(
    endIndex + endMarker.length
  );

const now = new Date();

const stamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  "_",
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
  String(now.getSeconds()).padStart(2, "0"),
].join("");

const backupPath =
  `${clientPath}.bak_quick_connect_mounting_two_${stamp}`;

fs.copyFileSync(clientPath, backupPath);
fs.writeFileSync(
  clientPath,
  newClientSource,
  "utf8"
);

console.log("");
console.log("Mounting 已改为两个一排。");
console.log(`修改文件：${clientPath}`);
console.log(`备份文件：${backupPath}`);
console.log(`使用字段：${mountingFilterKey}`);
