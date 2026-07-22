const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    name: "过滤器",
    expectedCount: 18,
    filePath: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "filters",
      "detail",
      "index.json"
    ),
  },
  {
    name: "单向阀",
    expectedCount: 16,
    filePath: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "check-valves",
      "detail",
      "index.json"
    ),
  },
];

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-detail-spec-clean-report.md"
);

const removeLabels = new Set([
  "料号",
  "关联型号",
]);

function text(value) {
  return String(value ?? "").trim();
}

function normalizeColor(
  model,
  currentValue
) {
  const normalizedModel =
    text(model).toUpperCase();

  const normalizedValue =
    text(currentValue).toUpperCase();

  /*
   * V没有出现在现有正式颜色代码表中。
   * 不推断具体色名，直接不在规格表显示颜色。
   */
  if (
    normalizedModel.endsWith("-V") ||
    normalizedValue === "V" ||
    normalizedValue === "V色" ||
    normalizedValue === "V色代码"
  ) {
    return "";
  }

  if (
    normalizedModel.endsWith("-N") ||
    normalizedValue === "N" ||
    normalizedValue === "N色" ||
    normalizedValue === "N色代码"
  ) {
    return "本色";
  }

  if (
    normalizedModel.endsWith("-B") ||
    normalizedValue === "B" ||
    normalizedValue === "B色" ||
    normalizedValue === "B色代码"
  ) {
    return "黑色";
  }

  /*
   * 源数据已经明确写成本色、黑色等中文时保留。
   */
  return text(currentValue);
}

function cleanItems(
  items,
  detail,
  counters
) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (
        !item ||
        typeof item !== "object"
      ) {
        return item;
      }

      const label =
        text(item.label);

      if (removeLabels.has(label)) {
        if (label === "料号") {
          counters.removedItemNumber += 1;
        }

        if (label === "关联型号") {
          counters.removedRelatedModel += 1;
        }

        return null;
      }

      if (label === "颜色") {
        const color =
          normalizeColor(
            detail.model,
            item.value
          );

        if (!color) {
          counters.removedUnknownColor += 1;
          return null;
        }

        if (
          color !==
          text(item.value)
        ) {
          counters.normalizedColor += 1;
        }

        return {
          ...item,
          value: color,
        };
      }

      return item;
    })
    .filter(Boolean);
}

function cleanDetail(
  detail,
  counters
) {
  const specs =
    cleanItems(
      detail.specs,
      detail,
      counters
    );

  const specifications =
    cleanItems(
      detail.specifications,
      detail,
      counters
    );

  const specGroups =
    Array.isArray(
      detail.specGroups
    )
      ? detail.specGroups.map(
          (group) => ({
            ...group,

            items:
              cleanItems(
                group.items,
                detail,
                counters
              ),
          })
        )
      : [];

  return {
    ...detail,
    specs,
    specifications,
    specGroups,
  };
}

function assertClean(
  details,
  targetName
) {
  for (const detail of details) {
    const allItems = [
      ...(Array.isArray(detail.specs)
        ? detail.specs
        : []),

      ...(Array.isArray(
        detail.specifications
      )
        ? detail.specifications
        : []),

      ...(Array.isArray(
        detail.specGroups
      )
        ? detail.specGroups.flatMap(
            (group) =>
              Array.isArray(
                group.items
              )
                ? group.items
                : []
          )
        : []),
    ];

    for (const item of allItems) {
      const label =
        text(item?.label);

      const value =
        text(item?.value);

      if (removeLabels.has(label)) {
        throw new Error(
          `${targetName}仍存在规格字段：${label}，型号：${detail.model}`
        );
      }

      if (
        label === "颜色" &&
        (
          value === "V" ||
          value === "V色" ||
          value === "V色代码"
        )
      ) {
        throw new Error(
          `${targetName}仍存在未定义的V颜色：${detail.model}`
        );
      }
    }
  }
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const results = [];

for (const target of targets) {
  if (
    !fs.existsSync(
      target.filePath
    )
  ) {
    throw new Error(
      `未找到${target.name}详情数据：${target.filePath}`
    );
  }

  const original =
    JSON.parse(
      fs.readFileSync(
        target.filePath,
        "utf8"
      )
    );

  if (
    !Array.isArray(original) ||
    original.length !==
      target.expectedCount
  ) {
    throw new Error(
      `${target.name}数量异常：` +
        `${Array.isArray(original) ? original.length : "非数组"}` +
        `/${target.expectedCount}`
    );
  }

  const counters = {
    removedItemNumber: 0,
    removedRelatedModel: 0,
    removedUnknownColor: 0,
    normalizedColor: 0,
  };

  const cleaned =
    original.map(
      (detail) =>
        cleanDetail(
          detail,
          counters
        )
    );

  assertClean(
    cleaned,
    target.name
  );

  const backupPath =
    `${target.filePath}.bak_clean_specs_${stamp}`;

  fs.copyFileSync(
    target.filePath,
    backupPath
  );

  fs.writeFileSync(
    target.filePath,
    JSON.stringify(
      cleaned,
      null,
      2
    ) + "\n",
    "utf8"
  );

  results.push({
    ...target,
    counters,
    backupPath,
  });
}

const totalDetails =
  results.reduce(
    (sum, item) =>
      sum +
      item.expectedCount,
    0
  );

const report = [
  "# 过滤器与单向阀详情规格清洗结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修改范围",
  "",
  `- 过滤器：18条`,
  `- 单向阀：16条`,
  `- 总详情：${totalDetails}条`,
  "",
  "## 处理规则",
  "",
  "- 删除规格中的“料号”",
  "- 删除规格中的“关联型号”",
  "- N统一显示为“本色”",
  "- B统一显示为“黑色”",
  "- V没有正式颜色定义，删除对应颜色参数",
  "- 不修改底层料号、竞品型号等内部数据",
  "- 不修改详情页组件与样式",
  "",
];

for (const result of results) {
  report.push(
    `## ${result.name}`
  );
  report.push("");
  report.push(
    `- 删除料号项：${result.counters.removedItemNumber}`
  );
  report.push(
    `- 删除关联型号项：${result.counters.removedRelatedModel}`
  );
  report.push(
    `- 删除未定义V颜色项：${result.counters.removedUnknownColor}`
  );
  report.push(
    `- 规范已知颜色项：${result.counters.normalizedColor}`
  );
  report.push(
    `- 备份：${result.backupPath}`
  );
  report.push("");
}

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "详情页规格清洗完成"
);
console.log(
  "============================================"
);

for (const result of results) {
  console.log("");
  console.log(
    `${result.name}：${result.expectedCount}条`
  );
  console.log(
    `删除料号项：${result.counters.removedItemNumber}`
  );
  console.log(
    `删除关联型号项：${result.counters.removedRelatedModel}`
  );
  console.log(
    `删除V颜色项：${result.counters.removedUnknownColor}`
  );
  console.log(
    `规范已知颜色项：${result.counters.normalizedColor}`
  );
}

console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
