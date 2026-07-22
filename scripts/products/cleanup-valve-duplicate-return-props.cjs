const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_cleanup_duplicate_return_props_${stamp}`);

const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

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

const functionLine = lines.findIndex((line) => line.includes("function toClientData"));

if (functionLine < 0) {
  console.error("没有找到 function toClientData。");
  process.exit(1);
}

const returnLine = lines.findIndex((line, index) => {
  return index > functionLine && line.includes("return {");
});

if (returnLine < 0) {
  console.error("没有找到 toClientData 里的 return {。");
  process.exit(1);
}

let depth = 0;
let endLine = -1;
const props = [];

for (let i = returnLine; i < lines.length; i++) {
  const line = lines[i];

  // return { 这一行先计入深度
  if (i === returnLine) {
    depth += braceDelta(line);
    continue;
  }

  // 只记录 return 对象第一层属性
  if (depth === 1) {
    const match = line.match(/^ {4}([A-Za-z_$][A-Za-z0-9_$]*)\s*:/);
    if (match) {
      props.push({
        key: match[1],
        line: i,
        text: line.trim(),
      });
    }
  }

  depth += braceDelta(line);

  if (depth === 0) {
    endLine = i;
    break;
  }
}

if (endLine < 0) {
  console.error("没有找到 return 对象结束位置。");
  process.exit(1);
}

const byKey = new Map();

for (const prop of props) {
  if (!byKey.has(prop.key)) byKey.set(prop.key, []);
  byKey.get(prop.key).push(prop);
}

const duplicated = Array.from(byKey.entries()).filter(([, items]) => items.length > 1);

console.log("toClientData 顶层字段数量：" + props.length);
console.log("重复字段数量：" + duplicated.length);

if (duplicated.length === 0) {
  console.log("没有发现重复顶层字段，不需要修改。");
  process.exit(0);
}

for (const [key, items] of duplicated) {
  console.log("");
  console.log(`${key} 出现次数：${items.length}`);
  for (const item of items) {
    console.log(`  line ${item.line + 1}: ${item.text}`);
  }
}

const propStartLines = props.map((p) => p.line);

function nextPropLineAfter(line) {
  const next = propStartLines.find((n) => n > line);
  return typeof next === "number" ? next : endLine;
}

const removeIndexes = new Set();

/*
  对每一个重复字段：保留最后一次出现，删除前面的重复块。
  删除范围：从该字段开始，到下一个顶层字段前一行。
*/
for (const [, items] of duplicated) {
  const keep = items[items.length - 1];

  for (const item of items.slice(0, -1)) {
    const start = item.line;
    const end = nextPropLineAfter(item.line) - 1;

    for (let i = start; i <= end; i++) {
      removeIndexes.add(i);
    }
  }
}

const nextLines = lines.filter((_, index) => !removeIndexes.has(index));

fs.writeFileSync(file, nextLines.join("\n"), "utf8");

console.log("");
console.log("已清理重复字段块。");
console.log("删除行数：" + removeIndexes.size);
console.log("保留规则：每个重复字段保留最后一次出现。");