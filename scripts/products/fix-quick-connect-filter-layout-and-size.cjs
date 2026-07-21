const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-and-connect-quick-connect-selection.cjs"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const panelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `找不到文件：${path.relative(root, filePath)}`
    );
  }
}

function backup(filePath, label) {
  const backupPath =
    `${filePath}.bak_${label}_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

function writeFile(
  filePath,
  content
) {
  fs.writeFileSync(
    filePath,
    content.replace(/\r\n/g, "\n"),
    "utf8"
  );
}

/* =========================================================
   1. 修正生成脚本中的尺寸名称
========================================================= */

ensureFile(generatorPath);

backup(
  generatorPath,
  "quick_connect_size"
);

let generatorSource =
  fs.readFileSync(
    generatorPath,
    "utf8"
  );

const newTubeCodeMap = `const TUBE_CODE_MAP = {
  /*
   * 软管规格统一只显示公制尺寸。
   * 不再同时显示英制分数。
   */
  "01": "1.6 mm",
  "02": "3.2 mm",
  "03": "4.8 mm",
  "04": "6.4 mm",
  "05": "7.9 mm",
  "06": "9.5 mm",
  "08": "12.7 mm",
  "10": "16.0 mm",
  "12": "19.0 mm",

  /*
   * 螺纹规格使用完整名称。
   */
  "18N": "1/8\\"-27 NPT",
  "14N": "1/4\\"-18 NPT",
  "38N": "3/8\\"-18 NPT",
  "12N": "1/2\\"-14 NPT",
  "18T": "R1/8（BSPT）",
  "28U": "1/4\\"-28 UNF",
};`;

const mapPattern =
  /const\s+TUBE_CODE_MAP\s*=\s*\{[\s\S]*?\n\};/;

if (
  !mapPattern.test(
    generatorSource
  )
) {
  throw new Error(
    "没有在快插接头生成脚本中找到TUBE_CODE_MAP。"
  );
}

generatorSource =
  generatorSource.replace(
    mapPattern,
    newTubeCodeMap
  );

generatorSource =
  generatorSource
    .replace(
      /管尺寸或螺纹/g,
      "接管内径或螺纹"
    )
    .replace(
      /Tube Size or Thread/g,
      "Tube I.D. or Thread"
    );

writeFile(
  generatorPath,
  generatorSource
);

/* =========================================================
   2. 修正接管内径与螺纹的显示顺序

   复用ProductSelectionClient现有筛选选项排序，
   不新增CSS。
========================================================= */

ensureFile(clientPath);

backup(
  clientPath,
  "quick_connect_sort"
);

let clientSource =
  fs.readFileSync(
    clientPath,
    "utf8"
  );

const sortMarkerStart =
  "/* QUICK_CONNECT_FILTER02_SORT_START */";

const sortMarkerEnd =
  "/* QUICK_CONNECT_FILTER02_SORT_END */";

const oldSortBlockPattern =
  new RegExp(
    String.raw`\s*\/\* QUICK_CONNECT_FILTER02_SORT_START \*\/[\s\S]*?\/\* QUICK_CONNECT_FILTER02_SORT_END \*\/`,
    "g"
  );

clientSource =
  clientSource.replace(
    oldSortBlockPattern,
    ""
  );

const sortCode = `
  ${sortMarkerStart}

  /*
   * 快插接头的“接管内径或螺纹”排序：
   *
   * 1. 软管内径按照毫米数值从小到大；
   * 2. 螺纹规格放在所有软管尺寸之后；
   * 3. 不改变硬管接头和其他产品筛选。
   */
  if (
    productTypeId === "quick-connect-fittings" &&
    filterKey === "filter02"
  ) {
    const diameterOrder = [
      "1.6 mm",
      "3.2 mm",
      "4.8 mm",
      "6.4 mm",
      "7.9 mm",
      "9.5 mm",
      "12.7 mm",
      "16.0 mm",
      "19.0 mm",
    ];

    const threadOrder = [
      "1/8\\"-27 NPT",
      "1/4\\"-18 NPT",
      "3/8\\"-18 NPT",
      "1/2\\"-14 NPT",
      "R1/8（BSPT）",
      "1/4\\"-28 UNF",
    ];

    function getQuickConnectOptionOrder(
      value: string
    ) {
      const diameterIndex =
        diameterOrder.indexOf(value);

      if (diameterIndex >= 0) {
        return diameterIndex;
      }

      const threadIndex =
        threadOrder.indexOf(value);

      if (threadIndex >= 0) {
        return (
          diameterOrder.length +
          threadIndex
        );
      }

      return 999;
    }

    return [...options].sort(
      (
        current,
        next
      ) => {
        const currentValue =
          String(
            current.value ||
            current.label ||
            ""
          ).trim();

        const nextValue =
          String(
            next.value ||
            next.label ||
            ""
          ).trim();

        const orderDifference =
          getQuickConnectOptionOrder(
            currentValue
          ) -
          getQuickConnectOptionOrder(
            nextValue
          );

        if (orderDifference !== 0) {
          return orderDifference;
        }

        return currentValue.localeCompare(
          nextValue,
          "zh-CN",
          {
            numeric: true,
          }
        );
      }
    );
  }

  ${sortMarkerEnd}
`;

const sortFunctionPattern =
  /(function\s+sortHardTubeFilterOptionsForDisplay\s*\([\s\S]*?\)\s*\{)/;

if (
  !sortFunctionPattern.test(
    clientSource
  )
) {
  throw new Error(
    "没有找到sortHardTubeFilterOptionsForDisplay函数。"
  );
}

clientSource =
  clientSource.replace(
    sortFunctionPattern,
    `$1${sortCode}`
  );

writeFile(
  clientPath,
  clientSource
);

/* =========================================================
   3. 复用硬管接头的双列选项布局

   硬管接头原来：
   productTypeId === hard-tube-fittings
   filterKey === filter03

   快插接头新增：
   filter05 阀门配置
   filter06 形状
   filter07 外壳材质
   filter08 密封圈材质

   不增加CSS，只扩大现有双列条件。
========================================================= */

ensureFile(panelPath);

backup(
  panelPath,
  "quick_connect_two_columns"
);

let panelSource =
  fs.readFileSync(
    panelPath,
    "utf8"
  );

const twoColumnMarker =
  "QUICK_CONNECT_REUSE_HARD_TUBE_TWO_COLUMN";

if (
  !panelSource.includes(
    twoColumnMarker
  )
) {
  const hardTubeConditionPattern =
    /productTypeId\s*===\s*["']hard-tube-fittings["']\s*&&\s*filterKey\s*===\s*["']filter03["']/g;

  let replacementCount = 0;

  panelSource =
    panelSource.replace(
      hardTubeConditionPattern,
      (
        matched
      ) => {
        replacementCount += 1;

        return `(
          ${matched}
        ) ||
        (
          /* ${twoColumnMarker} */
          productTypeId === "quick-connect-fittings" &&
          [
            "filter05",
            "filter06",
            "filter07",
            "filter08",
          ].includes(filterKey)
        )`;
      }
    );

  if (
    replacementCount === 0
  ) {
    throw new Error(
      "没有找到硬管接头双列筛选条件，未修改ProductFilterPanel。"
    );
  }

  console.log(
    `双列条件修改数量：${replacementCount}`
  );
}

writeFile(
  panelPath,
  panelSource
);

/* =========================================================
   4. 重新生成快插接头选型数据
========================================================= */

delete require.cache[
  require.resolve(
    generatorPath
  )
];

require(
  generatorPath
);

console.log("");
console.log(
  "快插接头筛选显示已修正："
);

console.log(
  "1. 筛选名称：接管内径或螺纹"
);

console.log(
  "2. 软管规格只显示公制尺寸"
);

console.log(
  "3. 软管内径从小到大排序"
);

console.log(
  "4. 螺纹规格放在最后"
);

console.log(
  "5. 阀门配置、形状、外壳材质、密封圈材质一排两个"
);

console.log(
  "6. 未新增任何CSS"
);