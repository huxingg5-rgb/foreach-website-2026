const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();
const reportFile = path.join(root, "官网产品中心 build 类型问题统一清理方案.md");

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function read(relPath) {
  const file = path.join(root, relPath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const r = rel(full);

    if (
      r.includes("node_modules/") ||
      r.includes(".next/") ||
      r.includes("out/") ||
      r.includes(".git/") ||
      r.includes(".bak_") ||
      r.includes(".bak.")
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) {
      out.push(full);
    }
  }

  return out;
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function mdCode(text, lang = "txt") {
  return "~~~" + lang + "\n" + String(text || "").trim() + "\n~~~\n";
}

function heading(title, level = 2) {
  return "\n" + "#".repeat(level) + " " + title + "\n";
}

function runBuildCapture() {
  try {
    const output = childProcess.execSync("npm run build", {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120000,
    });

    return {
      success: true,
      output,
    };
  } catch (error) {
    return {
      success: false,
      output: String((error.stdout || "") + "\n" + (error.stderr || "")),
    };
  }
}

function getFirstTypeError(buildOutput) {
  const lines = buildOutput.split(/\r?\n/);
  const index = lines.findIndex((line) => line.includes("Type error:"));

  if (index < 0) {
    return lines.slice(-80).join("\n");
  }

  return lines.slice(Math.max(0, index - 6), Math.min(lines.length, index + 22)).join("\n");
}

function findProductSelectionProductDefinitions() {
  const files = walk(path.join(root, "data"))
    .concat(walk(path.join(root, "components")))
    .filter((file) => /\.(ts|tsx)$/.test(file));

  const hits = [];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const patterns = [
      /export\s+type\s+ProductSelectionProduct\s*=/g,
      /export\s+interface\s+ProductSelectionProduct\s*/g,
      /type\s+ProductSelectionProduct\s*=/g,
      /interface\s+ProductSelectionProduct\s*/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        hits.push({
          file: rel(file),
          line: lineNumber(text, match.index),
        });
      }
    }
  }

  return hits;
}

function scanProductSelectionClientDirectUses() {
  const file = "components/products/selection/ProductSelectionClient.tsx";
  const text = read(file);
  const map = new Map();

  if (!text) return [];

  const pattern = /\bproduct\.([A-Za-z_$][A-Za-z0-9_$]*)/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const field = match[1];
    const line = lineNumber(text, match.index);

    if (!map.has(field)) map.set(field, []);
    map.get(field).push(line);
  }

  return Array.from(map.entries())
    .map(([field, lines]) => ({
      field,
      count: lines.length,
      lines: Array.from(new Set(lines)).slice(0, 12),
    }))
    .sort((a, b) => a.field.localeCompare(b.field));
}

function scanGeneratedSelectionFiles() {
  const dir = path.join(root, "data/products/selection");
  const files = walk(dir).filter((file) => file.endsWith(".ts"));
  const rows = [];

  for (const file of files) {
    const r = rel(file);

    if (!r.includes("selection.generated.ts")) continue;

    const text = fs.readFileSync(file, "utf8");
    const importMatch = text.match(/from\s+["']([^"']*types[^"']*)["']/);
    const keys = new Set();

    for (const match of text.matchAll(/^\s*"?([A-Za-z_$][A-Za-z0-9_$]*)"?\s*:/gm)) {
      keys.add(match[1]);
    }

    rows.push({
      file: r,
      typeImport: importMatch ? importMatch[1] : "未发现 types 引用",
      keys: Array.from(keys).sort(),
    });
  }

  return rows.sort((a, b) => a.file.localeCompare(b.file));
}

function scanAsAny() {
  const files = [
    "components/products/selection/ProductSelectionClient.tsx",
    "components/products/selection/ProductCardGrid.tsx",
    "components/products/selection/ProductSelectionCard.tsx",
    "app/products/valves/[slug]/page.tsx",
    "app/products/probes/[slug]/page.tsx",
    "app/products/pumps/syringe-pumps/[slug]/page.tsx",
    "app/products/pumps/valveless-pumps/[slug]/page.tsx",
    "app/products/pumps/pipetting-pumps/[slug]/page.tsx",
  ];

  return files.map((file) => {
    const text = read(file);
    const count = (text.match(/\bas any\b/g) || []).length;
    return `${file}：${count}`;
  });
}

function stripStrings(line) {
  return line
    .replace(/"([^"\\]|\\.)*"/g, '""')
    .replace(/'([^'\\]|\\.)*'/g, "''")
    .replace(/`([^`\\]|\\.)*`/g, "``");
}

function braceDelta(line) {
  const s = stripStrings(line);
  let delta = 0;

  for (const ch of s) {
    if (ch === "{") delta++;
    if (ch === "}") delta--;
  }

  return delta;
}

function scanDuplicateReturnProps(file) {
  const text = read(file);
  if (!text) return ["文件不存在或为空"];

  const lines = text.split(/\r?\n/);
  const functionLine = lines.findIndex((line) => line.includes("function toClientData"));

  if (functionLine < 0) return ["未发现 function toClientData"];

  const returnLine = lines.findIndex((line, index) => index > functionLine && line.includes("return {"));

  if (returnLine < 0) return ["未发现 toClientData return {"];

  let depth = 0;
  const props = [];

  for (let i = returnLine; i < lines.length; i++) {
    const line = lines[i];

    if (i === returnLine) {
      depth += braceDelta(line);
      continue;
    }

    if (depth === 1) {
      const match = line.match(/^ {4}([A-Za-z_$][A-Za-z0-9_$]*)\s*:/);
      if (match) {
        props.push({
          key: match[1],
          line: i + 1,
          text: line.trim(),
        });
      }
    }

    depth += braceDelta(line);

    if (depth === 0) break;
  }

  const byKey = new Map();

  for (const prop of props) {
    if (!byKey.has(prop.key)) byKey.set(prop.key, []);
    byKey.get(prop.key).push(prop);
  }

  const duplicated = Array.from(byKey.entries()).filter(([, items]) => items.length > 1);

  if (duplicated.length === 0) return ["未发现重复顶层字段"];

  const result = [];

  for (const [key, items] of duplicated) {
    result.push(`${key} 出现 ${items.length} 次`);
    for (const item of items) {
      result.push(`  line ${item.line}: ${item.text}`);
    }
  }

  return result;
}

function main() {
  const report = [];

  report.push("# 官网产品中心 build 类型问题统一清理方案\n");
  report.push(`生成时间：${new Date().toLocaleString()}\n`);
  report.push(`项目目录：${root}\n`);
  report.push("\n说明：本报告只检查，不修改业务文件。\n");

  report.push(heading("1. 当前 build 结果"));
  const build = runBuildCapture();
  report.push(`build 是否通过：${build.success ? "是" : "否"}\n\n`);
  report.push("当前最前面的 TypeScript 报错：\n\n");
  report.push(mdCode(getFirstTypeError(build.output)));

  report.push(heading("2. ProductSelectionProduct 类型定义位置"));
  const typeDefs = findProductSelectionProductDefinitions();

  if (typeDefs.length === 0) {
    report.push("未找到 ProductSelectionProduct 类型定义。\n");
  } else {
    report.push("| 文件 | 行号 |\n|---|---:|\n");
    for (const item of typeDefs) {
      report.push(`| ${item.file} | ${item.line} |\n`);
    }
  }

  report.push(heading("3. ProductSelectionClient.tsx 直接读取 product.xxx 的字段"));
  const productUses = scanProductSelectionClientDirectUses();

  if (productUses.length === 0) {
    report.push("未发现 product.xxx 直接读取。\n");
  } else {
    report.push("| 字段 | 次数 | 行号示例 |\n|---|---:|---|\n");
    for (const item of productUses) {
      report.push(`| ${item.field} | ${item.count} | ${item.lines.join(", ")} |\n`);
    }
  }

  report.push(heading("4. generated selection 文件字段和 types 引用"));
  const generatedRows = scanGeneratedSelectionFiles();

  for (const item of generatedRows) {
    report.push(heading(item.file, 3));
    report.push(`types 引用：${item.typeImport}\n\n`);
    report.push(mdCode(item.keys.join("\n")));
  }

  report.push(heading("5. as any 临时兼容数量"));
  report.push(mdCode(scanAsAny().join("\n")));

  report.push(heading("6. 详情页 toClientData 重复字段风险"));
  const detailPages = [
    "app/products/valves/[slug]/page.tsx",
    "app/products/probes/[slug]/page.tsx",
    "app/products/pumps/syringe-pumps/[slug]/page.tsx",
    "app/products/pumps/valveless-pumps/[slug]/page.tsx",
    "app/products/pumps/pipetting-pumps/[slug]/page.tsx",
  ];

  for (const file of detailPages) {
    report.push(heading(file, 3));
    report.push(mdCode(scanDuplicateReturnProps(file).join("\n")));
  }

  report.push(heading("7. 统一清理结论"));
  report.push("- 当前不建议继续按 build 报错逐条补丁式修改。\n");
  report.push("- 优先统一 ProductSelectionProduct 类型，覆盖真实 generated 数据字段。\n");
  report.push("- 再统一 ProductSelectionClient.tsx 的字段安全读取方式。\n");
  report.push("- 再整理 ProductCardGrid / ProductSelectionCard 的入参类型。\n");
  report.push("- 最后清理各详情页 toClientData 的重复字段和缺字段。\n");

  report.push(heading("8. 建议修改顺序"));
  report.push("1. 统一 data/products/selection/types.ts。\n");
  report.push("2. 统一 ProductSelectionClient.tsx 字段读取。\n");
  report.push("3. 统一 ProductCardGrid / ProductSelectionCard 类型来源。\n");
  report.push("4. 整理 valves / probes / syringe / valveless / pipetting 的 toClientData。\n");
  report.push("5. build 通过后，再逐步减少 as any。\n");

  fs.writeFileSync(reportFile, report.join(""), "utf8");

  console.log("已生成报告：");
  console.log(reportFile);
}

main();