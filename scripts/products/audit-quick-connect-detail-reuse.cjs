const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-detail-reuse-audit.md"
);

function walk(
  directory,
  output = []
) {
  if (!fs.existsSync(directory)) {
    return output;
  }

  const entries =
    fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    );

  for (
    const entry of entries
  ) {
    if (
      entry.name ===
        "node_modules" ||
      entry.name ===
        ".next" ||
      entry.name ===
        ".git"
    ) {
      continue;
    }

    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (
      entry.isDirectory()
    ) {
      walk(
        fullPath,
        output
      );
    } else {
      output.push(
        fullPath
      );
    }
  }

  return output;
}

function relative(
  filePath
) {
  return path
    .relative(
      root,
      filePath
    )
    .replace(
      /\\/g,
      "/"
    );
}

function readText(
  filePath
) {
  try {
    return fs.readFileSync(
      filePath,
      "utf8"
    );
  } catch {
    return "";
  }
}

function cleanLine(
  value,
  maxLength = 240
) {
  const result =
    String(
      value ?? ""
    )
      .replace(
        /\r?\n/g,
        " / "
      )
      .trim();

  if (
    result.length >
    maxLength
  ) {
    return (
      result.slice(
        0,
        maxLength
      ) +
      "..."
    );
  }

  return result;
}

function escapeMarkdown(
  value
) {
  return cleanLine(
    value
  ).replace(
    /\|/g,
    "\\|"
  );
}

function addCodeMatches(
  report,
  filePath,
  pattern,
  limit = 30
) {
  const content =
    readText(
      filePath
    );

  const lines =
    content.split(
      /\r?\n/
    );

  const matches = [];

  lines.forEach(
    (
      line,
      index
    ) => {
      if (
        matches.length <
          limit &&
        pattern.test(
          line
        )
      ) {
        matches.push({
          lineNumber:
            index + 1,

          content:
            line.trim(),
        });
      }
    }
  );

  if (
    matches.length === 0
  ) {
    return;
  }

  report.push(
    `### \`${relative(
      filePath
    )}\``
  );

  report.push("");

  matches.forEach(
    (item) => {
      report.push(
        `- L${item.lineNumber}：\`${escapeMarkdown(
          item.content
        )}\``
      );
    }
  );

  report.push("");
}

const report = [];

report.push(
  "# 快插接头详情页复用检查报告"
);

report.push("");

report.push(
  `生成时间：${new Date().toISOString()}`
);

report.push("");

let branch =
  "未识别";

let statusCount = 0;

try {
  branch =
    execFileSync(
      "git",
      [
        "branch",
        "--show-current",
      ],
      {
        cwd: root,
        encoding: "utf8",
      }
    ).trim();

  const status =
    execFileSync(
      "git",
      [
        "status",
        "--short",
      ],
      {
        cwd: root,
        encoding: "utf8",
      }
    ).trim();

  statusCount =
    status
      ? status
          .split(
            /\r?\n/
          )
          .length
      : 0;
} catch {}

report.push(
  "## 一、当前项目状态"
);

report.push("");

report.push(
  `- 当前分支：${branch}`
);

report.push(
  `- 未提交文件数：${statusCount}`
);

report.push("");

report.push(
  "## 二、硬管接头详情数据"
);

report.push("");

const dataFiles =
  walk(
    path.join(
      root,
      "data"
    )
  );

const hardTubeJsonFiles =
  dataFiles.filter(
    (filePath) => {
      return (
        /hard-tube-fittings/i.test(
          filePath
        ) &&
        /detail/i.test(
          filePath
        ) &&
        /\.json$/i.test(
          filePath
        )
      );
    }
  );

if (
  hardTubeJsonFiles.length ===
  0
) {
  report.push(
    "未找到硬管接头详情JSON。"
  );

  report.push("");
}

for (
  const filePath of
  hardTubeJsonFiles
) {
  report.push(
    `### \`${relative(
      filePath
    )}\``
  );

  report.push("");

  try {
    const parsed =
      JSON.parse(
        readText(
          filePath
        )
      );

    const items =
      Array.isArray(
        parsed
      )
        ? parsed
        : [
            parsed,
          ];

    report.push(
      `- 数据数量：${items.length}`
    );

    if (
      items.length >
      0
    ) {
      const first =
        items[0] || {};

      report.push(
        `- 顶层字段：${Object.keys(
          first
        ).join("、")}`
      );

      report.push("");

      report.push(
        "#### 第一条数据摘要"
      );

      report.push("");

      const fields = [
        "slug",
        "model",
        "title",
        "name",
        "productCode",
        "productType",
        "series",
        "description",
        "image",
        "imagePath",
        "detailHref",
      ];

      fields.forEach(
        (field) => {
          const value =
            first[
              field
            ];

          if (
            value !==
              undefined &&
            String(
              value
            ).trim()
          ) {
            report.push(
              `- ${field}：${cleanLine(
                value
              )}`
            );
          }
        }
      );
    }
  } catch (
    error
  ) {
    report.push(
      `- JSON读取失败：${error.message}`
    );
  }

  report.push("");
}

report.push(
  "## 三、硬管接头详情路由"
);

report.push("");

const codeFiles =
  [
    "app",
    "components",
    "services",
    "data",
  ]
    .flatMap(
      (folder) =>
        walk(
          path.join(
            root,
            folder
          )
        )
    )
    .filter(
      (filePath) =>
        /\.(ts|tsx|js|cjs|mjs)$/i.test(
          filePath
        )
    );

const hardTubeCodeFiles =
  codeFiles.filter(
    (filePath) => {
      const content =
        readText(
          filePath
        );

      return (
        content.includes(
          "hard-tube-fittings"
        ) ||
        content.includes(
          "ProductDetailClient"
        )
      );
    }
  );

if (
  hardTubeCodeFiles.length ===
  0
) {
  report.push(
    "未找到硬管接头详情路由或组件。"
  );

  report.push("");
}

for (
  const filePath of
  hardTubeCodeFiles
    .slice(
      0,
      80
    )
) {
  addCodeMatches(
    report,
    filePath,
    /hard-tube-fittings|ProductDetailClient|generateStaticParams|getDetail|detailData|seriesSlug|slug/,
    30
  );
}

report.push(
  "## 四、ProductDetailClient结构"
);

report.push("");

const detailClientPath =
  path.join(
    root,
    "components",
    "products",
    "detail",
    "ProductDetailClient.tsx"
  );

if (
  fs.existsSync(
    detailClientPath
  )
) {
  const detailLines =
    readText(
      detailClientPath
    ).split(
      /\r?\n/
    );

  report.push(
    `- 文件：\`${relative(
      detailClientPath
    )}\``
  );

  report.push(
    `- 总行数：${detailLines.length}`
  );

  report.push("");

  addCodeMatches(
    report,
    detailClientPath,
    /interface|type Product|specs|faq|images|commonApplications|productCode|model|selection|showDrawingRequest/,
    60
  );
} else {
  report.push(
    "未找到ProductDetailClient.tsx。"
  );

  report.push("");
}

report.push(
  "## 五、硬管接头服务和适配器"
);

report.push("");

const hardTubeServiceFiles =
  codeFiles.filter(
    (filePath) => {
      const content =
        readText(
          filePath
        );

      return (
        /hard-tube-fittings/i.test(
          content
        ) &&
        (
          /adapter/i.test(
            filePath
          ) ||
          /service/i.test(
            filePath
          ) ||
          /get.*detail/i.test(
            content
          )
        )
      );
    }
  );

if (
  hardTubeServiceFiles.length ===
  0
) {
  report.push(
    "没有找到明确的硬管接头服务或适配器。"
  );
} else {
  hardTubeServiceFiles.forEach(
    (filePath) => {
      report.push(
        `- \`${relative(
          filePath
        )}\``
      );
    }
  );
}

report.push("");

report.push(
  "## 六、快插接头当前文件"
);

report.push("");

const quickConnectFiles =
  [
    "app",
    "components",
    "data",
    "services",
    "scripts",
  ]
    .flatMap(
      (folder) =>
        walk(
          path.join(
            root,
            folder
          )
        )
    )
    .filter(
      (filePath) =>
        /quick-connect|quick-connect-fittings/i.test(
          filePath
        )
    );

if (
  quickConnectFiles.length ===
  0
) {
  report.push(
    "未找到快插接头相关文件。"
  );
} else {
  quickConnectFiles
    .slice(
      0,
      180
    )
    .forEach(
      (filePath) => {
        report.push(
          `- \`${relative(
            filePath
          )}\``
        );
      }
    );
}

report.push("");

report.push(
  "## 七、快插接头图片资源"
);

report.push("");

const imageFiles =
  walk(
    path.join(
      root,
      "public",
      "images"
    )
  ).filter(
    (filePath) =>
      /quick|q20|q40|q60|connector/i.test(
        path.basename(
          filePath
        )
      )
  );

if (
  imageFiles.length ===
  0
) {
  report.push(
    "没有找到明确的快插接头图片。"
  );
} else {
  imageFiles
    .slice(
      0,
      180
    )
    .forEach(
      (filePath) => {
        report.push(
          `- \`${relative(
            filePath
          )}\``
        );
      }
    );
}

report.push("");

report.push(
  "## 八、实施原则"
);

report.push("");

report.push(
  "- 复用硬管接头详情页路由和组件。"
);

report.push(
  "- 复用ProductDetailClient。"
);

report.push(
  "- 不新增快插接头专属CSS。"
);

report.push(
  "- Q20、Q40、Q60各建立一个系列详情页。"
);

report.push(
  "- 不为191个商品编码分别建立详情页。"
);

report.push(
  "- 现有接头替代查询模块保持独立。"
);

report.push("");

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join(
    "\n"
  ) + "\n",
  "utf8"
);

console.log("");

console.log(
  "检查完成："
);

console.log(
  relative(
    reportPath
  )
);