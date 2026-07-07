const fs = require("fs");
const path = require("path");

const root = process.cwd();

const pumpSelectionFile = path.join(
  root,
  "data/products/generated/pumps/pump-series.selection.generated.ts"
);

const reportFile = path.join(
  root,
  "legacy-probe-plunger-redirect-pages-report.md"
);

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

if (!fs.existsSync(pumpSelectionFile)) {
  throw new Error("找不到柱塞泵选型数据文件：data/products/generated/pumps/pump-series.selection.generated.ts");
}

const source = fs.readFileSync(pumpSelectionFile, "utf8");

const slugSet = new Set();

for (const match of source.matchAll(/"productId"\s*:\s*"(ea|sm|tm)-\d+-(pmma|peek)"/gi)) {
  slugSet.add(match[0].match(/"([^"]+)"\s*$/)?.[1]);
}

const slugs = Array.from(slugSet)
  .filter(Boolean)
  .sort((a, b) => {
    const order = { ea: 1, sm: 2, tm: 3 };
    const [pa, va] = a.split("-");
    const [pb, vb] = b.split("-");
    return (order[pa] || 9) - (order[pb] || 9) || Number(va) - Number(vb) || a.localeCompare(b);
  });

if (slugs.length === 0) {
  throw new Error("没有从 pump-series.selection.generated.ts 中识别到 EA / SM / TM 柱塞泵型号。");
}

const created = [];
const unchanged = [];

for (const slug of slugs) {
  const targetHref = `/products/pumps/plunger-pumps/${slug}`;
  const routeFile = path.join(root, "app/products/probes", slug, "page.tsx");

  const pageCode = `const targetHref = "${targetHref}";

export const metadata = {
  title: "Redirecting | FOREACH",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: targetHref,
  },
};

export default function LegacyProbePlungerRedirectPage() {
  return (
    <main style={{ padding: "80px 24px", fontFamily: "Arial, sans-serif" }}>
      <meta httpEquiv="refresh" content={\`0;url=\${targetHref}\`} />
      <script
        dangerouslySetInnerHTML={{
          __html: \`window.location.replace(\${JSON.stringify(targetHref)});\`,
        }}
      />
      <h1 style={{ margin: "0 0 12px", fontSize: 24 }}>Redirecting...</h1>
      <p style={{ margin: "0 0 20px", color: "#4b5563" }}>
        This plunger pump page has moved to the correct pump route.
      </p>
      <a href={targetHref}>Open correct product page</a>
    </main>
  );
}
`;

  if (fs.existsSync(routeFile)) {
    const old = fs.readFileSync(routeFile, "utf8");
    if (old === pageCode) {
      unchanged.push(rel(routeFile));
      continue;
    }

    const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    fs.copyFileSync(routeFile, `${routeFile}.bak_legacy_probe_redirect_${stamp}`);
  }

  write(routeFile, pageCode);
  created.push(rel(routeFile));
}

const report = [];

report.push("# 柱塞泵错误 probes 路径兼容页生成报告\n");
report.push(`生成时间：${new Date().toLocaleString()}\n`);
report.push(`项目目录：${root}\n`);

report.push("\n## 1. 处理目的\n");
report.push("历史错误路径 `/products/probes/[柱塞泵型号]` 会触发 Next.js `output: export` 的 `generateStaticParams` 报错。");
report.push("本次为 EA / SM / TM 柱塞泵型号生成静态兼容页，使错误路径自动跳转到正确柱塞泵详情页。");

report.push("\n## 2. 正确跳转规则\n");
report.push("```txt");
for (const slug of slugs) {
  report.push(`/products/probes/${slug}  ->  /products/pumps/plunger-pumps/${slug}`);
}
report.push("```");

report.push("\n## 3. 已写入文件\n");
if (created.length > 0) {
  report.push("```txt");
  report.push(...created);
  report.push("```");
} else {
  report.push("无新增写入，文件已存在且内容一致。");
}

report.push("\n## 4. 未变化文件\n");
if (unchanged.length > 0) {
  report.push("```txt");
  report.push(...unchanged);
  report.push("```");
} else {
  report.push("无。");
}

report.push("\n## 5. 后续验证\n");
report.push("重新启动 dev 后，即使访问 `/products/probes/ea-100-pmma`，也应该自动跳到 `/products/pumps/plunger-pumps/ea-100-pmma`，不再出现 `generateStaticParams` missing param 报错。");

fs.writeFileSync(reportFile, report.join("\n"), "utf8");

console.log("已生成柱塞泵错误 probes 路径兼容页。");
console.log("生成数量：" + created.length);
console.log("未变化数量：" + unchanged.length);
console.log("报告文件：legacy-probe-plunger-redirect-pages-report.md");