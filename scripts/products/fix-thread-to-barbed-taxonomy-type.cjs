const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到文件：" + targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const exportName =
  "threadToBarbedFittingTaxonomyItems";

const declarationPattern =
  new RegExp(
    `export\\s+const\\s+${exportName}\\s*=`
  );

const declarationMatch =
  source.match(
    declarationPattern
  );

if (
  !declarationMatch ||
  declarationMatch.index == null
) {
  throw new Error(
    `没有找到 ${exportName}`
  );
}

const arrayStart =
  source.indexOf(
    "[",
    declarationMatch.index +
      declarationMatch[0].length
  );

if (arrayStart < 0) {
  throw new Error(
    "没有找到taxonomy数组开始位置。"
  );
}

let depth = 0;
let quote = "";
let escaped = false;
let lineComment = false;
let blockComment = false;
let arrayEnd = -1;

for (
  let index = arrayStart;
  index < source.length;
  index += 1
) {
  const char =
    source[index];

  const next =
    source[index + 1];

  if (lineComment) {
    if (char === "\n") {
      lineComment = false;
    }

    continue;
  }

  if (blockComment) {
    if (
      char === "*" &&
      next === "/"
    ) {
      blockComment = false;
      index += 1;
    }

    continue;
  }

  if (quote) {
    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === quote) {
      quote = "";
    }

    continue;
  }

  if (
    char === "/" &&
    next === "/"
  ) {
    lineComment = true;
    index += 1;
    continue;
  }

  if (
    char === "/" &&
    next === "*"
  ) {
    blockComment = true;
    index += 1;
    continue;
  }

  if (
    char === '"' ||
    char === "'" ||
    char === "`"
  ) {
    quote = char;
    continue;
  }

  if (char === "[") {
    depth += 1;
    continue;
  }

  if (char === "]") {
    depth -= 1;

    if (depth === 0) {
      arrayEnd =
        index + 1;
      break;
    }
  }
}

if (arrayEnd < 0) {
  throw new Error(
    "taxonomy数组没有正常结束。"
  );
}

const before =
  source.slice(
    0,
    arrayStart
  );

const taxonomyBlock =
  source.slice(
    arrayStart,
    arrayEnd
  );

const after =
  source.slice(
    arrayEnd
  );

const countsBefore = {
  parentId:
    (
      taxonomyBlock.match(
        /^\s*"parentId"\s*:/gm
      ) || []
    ).length,

  categoryId:
    (
      taxonomyBlock.match(
        /^\s*"categoryId"\s*:/gm
      ) || []
    ).length,

  productTypeId:
    (
      taxonomyBlock.match(
        /^\s*"productTypeId"\s*:/gm
      ) || []
    ).length,
};

if (
  countsBefore.parentId === 0 &&
  countsBefore.categoryId === 0 &&
  countsBefore.productTypeId === 0
) {
  console.log(
    "taxonomy数组中没有发现多余字段，无需修改。"
  );

  process.exit(0);
}

let fixedBlock =
  taxonomyBlock;

/*
 * 只处理taxonomy数组内的三个多余字段。
 * 不影响产品卡片中的categoryId和productTypeId。
 */
fixedBlock =
  fixedBlock.replace(
    /^\s*"parentId"\s*:\s*[^,\r\n]+,\s*\r?\n/gm,
    ""
  );

fixedBlock =
  fixedBlock.replace(
    /^\s*"categoryId"\s*:\s*[^,\r\n]+,\s*\r?\n/gm,
    ""
  );

fixedBlock =
  fixedBlock.replace(
    /^\s*"productTypeId"\s*:\s*[^,\r\n]+,?\s*\r?\n/gm,
    ""
  );

/*
 * 若productTypeId原本是对象最后一个字段，
 * 删除后可能导致sortOrder末尾仍保留逗号。
 * JSON式对象允许尾逗号，TypeScript中合法，不需要额外处理。
 */

const remaining = {
  parentId:
    (
      fixedBlock.match(
        /^\s*"parentId"\s*:/gm
      ) || []
    ).length,

  categoryId:
    (
      fixedBlock.match(
        /^\s*"categoryId"\s*:/gm
      ) || []
    ).length,

  productTypeId:
    (
      fixedBlock.match(
        /^\s*"productTypeId"\s*:/gm
      ) || []
    ).length,
};

if (
  remaining.parentId ||
  remaining.categoryId ||
  remaining.productTypeId
) {
  throw new Error(
    "仍有多余taxonomy字段未删除：" +
      JSON.stringify(
        remaining
      )
  );
}

const nextSource =
  before +
  fixedBlock +
  after;

/*
 * 确认产品数据区域仍然保留categoryId和productTypeId，
 * 避免误删全文件字段。
 */
const productArea =
  nextSource.slice(
    0,
    declarationMatch.index
  );

if (
  !productArea.includes(
    '"categoryId": "fittings"'
  )
) {
  throw new Error(
    "产品数据中的categoryId异常，已停止写入。"
  );
}

if (
  !productArea.includes(
    '"productTypeId": "thread-to-barbed-fittings"'
  )
) {
  throw new Error(
    "产品数据中的productTypeId异常，已停止写入。"
  );
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${targetPath}.bak_fix_taxonomy_type_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  nextSource,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "螺纹转倒刺taxonomy类型修复完成"
);
console.log(
  "============================================"
);
console.log(
  "删除parentId：",
  countsBefore.parentId
);
console.log(
  "删除categoryId：",
  countsBefore.categoryId
);
console.log(
  "删除productTypeId：",
  countsBefore.productTypeId
);
console.log("");
console.log(
  "产品卡片字段未删除。"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
