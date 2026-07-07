const fs = require("fs");
const path = require("path");

const root = process.cwd();
const report = [];

function abs(relativePath) {
  return path.join(root, relativePath);
}

function line(title = "") {
  report.push("");
  report.push("## " + title);
  report.push("");
}

function code(content) {
  report.push("```txt");
  report.push(content);
  report.push("```");
  report.push("");
}

function read(relativePath) {
  const filePath = abs(relativePath);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

function findLines(text, patterns, context = 2) {
  const lines = text.split(/\r?\n/);
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const hit = patterns.some((pattern) => {
      if (pattern instanceof RegExp) return pattern.test(lines[i]);
      return lines[i].includes(pattern);
    });

    if (!hit) continue;

    const start = Math.max(0, i - context);
    const end = Math.min(lines.length - 1, i + context);

    out.push("---- match around line " + (i + 1) + " ----");
    for (let j = start; j <= end; j++) {
      out.push(String(j + 1).padStart(5, " ") + " | " + lines[j]);
    }
  }

  return out.join("\n") || "未找到匹配内容";
}

report.push("# 针系列 FAQ 显示问题检查报告");
report.push("");
report.push("生成时间：" + new Date().toLocaleString());
report.push("");

line("1. 检查当前 Git 状态");
try {
  const { execSync } = require("child_process");
  code(execSync("git status --short", { cwd: root, encoding: "utf8" }) || "无未提交变更");
} catch (error) {
  code("无法读取 git status：" + error.message);
}

line("2. 检查针系列详情 JSON 的 FAQ 数量");

const jsonPath = "data/products/generated/probes/detail/index.json";
const jsonText = read(jsonPath);

if (!jsonText) {
  code("找不到文件：" + jsonPath);
} else {
  try {
    const details = JSON.parse(jsonText);
    const targetSlugs = [
      "sampling-probes",
      "piercing-probes",
      "wash-probes",
      "stirring-paddles",
    ];

    const rows = [];

    for (const slug of targetSlugs) {
      const item = details.find((x) => x.slug === slug);

      if (!item) {
        rows.push(slug + "：未找到");
        continue;
      }

      rows.push("");
      rows.push("### " + slug);
      rows.push("title: " + item.title);
      rows.push("faq count: " + (Array.isArray(item.faq) ? item.faq.length : "不是数组"));
      rows.push("faqs count: " + (Array.isArray(item.faqs) ? item.faqs.length : "不是数组/不存在"));
      rows.push("faqItems count: " + (Array.isArray(item.faqItems) ? item.faqItems.length : "不是数组/不存在"));
      rows.push("detailFaqs count: " + (Array.isArray(item.detailFaqs) ? item.detailFaqs.length : "不是数组/不存在"));

      const faqs = Array.isArray(item.faq) ? item.faq : [];
      faqs.forEach((faq, index) => {
        rows.push(`${index + 1}. ${faq.question || faq.q || "无 question"}`);
      });
    }

    code(rows.join("\n"));
  } catch (error) {
    code("JSON 解析失败：" + error.message);
  }
}

line("3. 检查针系列 page.tsx 是否正确透传 FAQ");

const probePagePath = "app/products/probes/[slug]/page.tsx";
const probePageText = read(probePagePath);

if (!probePageText) {
  code("找不到文件：" + probePagePath);
} else {
  code(findLines(
    probePageText,
    [
      "const faqItems",
      "rawFaqItems",
      "faq:",
      "faqs:",
      "faqItems",
      "detailFaqs",
      "customFaqs",
      "ProductDetailView",
      "toClientData",
    ],
    4
  ));
}

line("4. 检查 ProductDetailClient FAQ 渲染逻辑");

const detailClientPath = "components/products/detail/ProductDetailClient.tsx";
const detailClientText = read(detailClientPath);

if (!detailClientText) {
  code("找不到文件：" + detailClientPath);
} else {
  code(findLines(
    detailClientText,
    [
      "faq",
      "faqs",
      "faqItems",
      "detailFaqs",
      "customFaqs",
      "slice(0, 3)",
      "slice(0,3)",
      "slice(0, 4)",
      "slice(0,4)",
      "defaultFaq",
      "fallback",
      "plunger",
      "Plunger",
    ],
    3
  ));
}

line("5. 专门检查是否存在 FAQ 数量限制");

if (!detailClientText) {
  code("未检查，因为 ProductDetailClient.tsx 不存在");
} else {
  const limitPatterns = [
    /\.slice\(\s*0\s*,\s*3\s*\)/g,
    /\.slice\(\s*0\s*,\s*4\s*\)/g,
    /\.slice\(\s*0\s*,\s*5\s*\)/g,
    /faq[a-zA-Z0-9_]*\.slice/g,
    /visibleFaq/g,
    /displayFaq/g,
  ];

  const result = findLines(detailClientText, limitPatterns, 4);
  code(result);
}

line("6. 检查是否仍有柱塞泵 FAQ fallback 影响针系列");

if (!detailClientText) {
  code("未检查，因为 ProductDetailClient.tsx 不存在");
} else {
  code(findLines(
    detailClientText,
    [
      "getPlungerPump",
      "Plunger",
      "柱塞泵",
      "PMMA",
      "PEEK",
      "EA ",
      "isCustomOnly",
      "isCustomInquiry",
    ],
    3
  ));
}

line("7. 搜索针系列 FAQ 字段在项目中的使用");

const searchFiles = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if ([".next", "node_modules", ".git"].includes(entry.name)) continue;
      walk(full);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) continue;

    const text = fs.readFileSync(full, "utf8");

    if (
      text.includes("probe-detail") ||
      text.includes("sampling-probes") ||
      text.includes("piercing-probes") ||
      text.includes("wash-probes") ||
      text.includes("stirring-paddles")
    ) {
      searchFiles.push(path.relative(root, full));
    }
  }
}

["app", "components", "data", "services"].forEach((dir) => walk(abs(dir)));

code(searchFiles.join("\n") || "未找到相关文件");

line("8. 检查端口提示");

report.push("请确认你浏览器打开的是当前 npm run dev 输出的端口。");
report.push("");
report.push("如果终端显示：");
code("Local: http://localhost:3001");
report.push("那就必须打开 3001，不要继续看 3000。");
report.push("");

const outPath = abs("probe-faq-check-report.md");
fs.writeFileSync(outPath, report.join("\n"), "utf8");

console.log("");
console.log("检查完成，报告已生成：");
console.log("probe-faq-check-report.md");
console.log("");
console.log("请把这个 md 文件内容发我，或者直接把文件上传。");