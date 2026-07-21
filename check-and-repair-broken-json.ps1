$ErrorActionPreference = "Stop"

$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026"
if (!(Test-Path $ProjectRoot)) {
  Write-Host "找不到项目目录：$ProjectRoot" -ForegroundColor Red
  exit 1
}

Set-Location $ProjectRoot
New-Item -ItemType Directory -Force scripts\products | Out-Null

$NodeScript = @'
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const report = [];
let repairedCount = 0;
let failedCount = 0;

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function shouldSkipDir(name) {
  return ["node_modules", ".next", ".git", "out", "dist"].includes(name);
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) walk(full, files);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".json")) files.push(full);
  }
  return files;
}

function extractFirstJsonValue(raw) {
  const firstObject = raw.search(/[\[{]/);
  if (firstObject < 0) return null;

  const startChar = raw[firstObject];
  const endChar = startChar === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = firstObject; i < raw.length; i++) {
    const ch = raw[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === startChar) depth++;
    if (ch === endChar) depth--;

    if (depth === 0) {
      return raw.slice(firstObject, i + 1);
    }
  }

  return null;
}

function repairJsonFile(file, error) {
  const rel = path.relative(root, file);
  const raw = fs.readFileSync(file, "utf8");
  const extracted = extractFirstJsonValue(raw);

  if (!extracted) {
    report.push(`无法自动修复：${rel}`);
    failedCount++;
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(extracted);
  } catch (e) {
    report.push(`提取后仍无法解析：${rel}`);
    report.push(`  原错误：${error.message}`);
    report.push(`  提取错误：${e.message}`);
    failedCount++;
    return;
  }

  const backup = `${file}.bak_repair_json_parse_${stamp()}`;
  fs.copyFileSync(file, backup);
  fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + "\n", "utf8");

  // final verification
  JSON.parse(fs.readFileSync(file, "utf8"));
  repairedCount++;
  report.push(`已修复：${rel}`);
  report.push(`  备份：${path.relative(root, backup)}`);
}

const jsonFiles = [
  ...walk(path.join(root, "data")),
  ...walk(path.join(root, "app")),
  ...walk(path.join(root, "components")),
  ...walk(path.join(root, "public")),
  path.join(root, "package.json"),
  path.join(root, "tsconfig.json"),
  path.join(root, "next.config.json"),
].filter((file, index, arr) => fs.existsSync(file) && arr.indexOf(file) === index);

report.push("# JSON 解析错误检查与修复报告");
report.push("");
report.push(`检查时间：${new Date().toLocaleString()}`);
report.push(`检查 JSON 文件数：${jsonFiles.length}`);
report.push("");

for (const file of jsonFiles) {
  const rel = path.relative(root, file);
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    report.push(`发现损坏 JSON：${rel}`);
    report.push(`  错误：${error.message}`);
    repairJsonFile(file, error);
    report.push("");
  }
}

report.push("## 结果");
report.push("");
report.push(`自动修复数量：${repairedCount}`);
report.push(`无法修复数量：${failedCount}`);

if (repairedCount === 0 && failedCount === 0) {
  report.push("未发现损坏 JSON 文件。若页面仍报 JSON.parse，请继续检查源码里的 JSON.parse 调用。位置通常在 app / components / lib / data 的 ts 或 tsx 文件中。");
}

const reportPath = path.join(root, "json-parse-repair-report.md");
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log(report.join("\n"));
console.log("");
console.log("报告已生成：json-parse-repair-report.md");

if (failedCount > 0) process.exit(1);
'@

$ScriptPath = Join-Path (Get-Location) "scripts\products\check-and-repair-broken-json.cjs"
[System.IO.File]::WriteAllText($ScriptPath, $NodeScript, [System.Text.UTF8Encoding]::new($false))

node $ScriptPath

Write-Host ""
Write-Host "请重新启动开发服务：" -ForegroundColor Cyan
Write-Host "Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue"
Write-Host "npm run dev"
