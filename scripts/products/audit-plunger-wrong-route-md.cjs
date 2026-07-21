const fs = require("fs");
const path = require("path");
const http = require("http");

const root = process.cwd();
const reportPath = path.join(root, "plunger-wrong-route-debug-report.md");

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function read(p) {
  const file = path.join(root, p);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function section(title) {
  report.push(`\n## ${title}\n`);
}

function codeBlock(text, lang = "txt") {
  report.push(`\`\`\`${lang}\n${String(text || "").trim()}\n\`\`\`\n`);
}

function add(text = "") {
  report.push(String(text));
}

function findMatchesInFile(fileRel, patterns, context = 5) {
  const text = read(fileRel);
  if (!text) return [`缺失或为空：${fileRel}`];

  const lines = text.split(/\r?\n/);
  const results = [];

  patterns.forEach((pattern) => {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, "g");
    let m;
    while ((m = regex.exec(text)) !== null) {
      const ln = lineNumber(text, m.index);
      const start = Math.max(1, ln - context);
      const end = Math.min(lines.length, ln + context);
      results.push(`--- ${fileRel} line ${ln} | pattern: ${regex} ---\n` + lines.slice(start - 1, end).join("\n"));
      if (m.index === regex.lastIndex) regex.lastIndex++;
    }
  });

  return results.length ? results : [`未命中：${fileRel}`];
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

function searchAll(patterns) {
  const files = walk(root);
  const rows = [];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);

    patterns.forEach((pattern) => {
      const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, "g");
      let m;
      while ((m = regex.exec(text)) !== null) {
        const ln = lineNumber(text, m.index);
        rows.push(`${rel(file)}:${ln}  ${lines[ln - 1].trim()}`);
        if (m.index === regex.lastIndex) regex.lastIndex++;
      }
    });
  }

  return rows;
}

function normalizeLikeCardGuard(product, href) {
  const rawHref = String(href || "").trim();

  const hrefSlug = rawHref
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  const rawSlug = String(
    product.detailSlug ||
      product.slug ||
      product.productId ||
      hrefSlug ||
      ""
  )
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (rawSlug && /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(rawSlug)) {
    return `/products/pumps/plunger-pumps/${rawSlug}`;
  }

  if (
    rawHref.includes("/products/probes/") &&
    hrefSlug &&
    /^(ea|sm|tm)-\d+-(pmma|peek)$/.test(hrefSlug)
  ) {
    return `/products/pumps/plunger-pumps/${hrefSlug}`;
  }

  return rawHref || "/products";
}

function requestUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve({
          ok: true,
          statusCode: res.statusCode,
          body: body.slice(0, 200000),
        });
      });
    });

    req.on("error", (err) => {
      resolve({
        ok: false,
        error: err.message,
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        ok: false,
        error: "请求超时",
      });
    });
  });
}

async function main() {
  report = [];

  add("# 柱塞泵错误跳转到 probes 自动检查报告\n");
  add(`生成时间：${new Date().toLocaleString()}\n`);
  add(`项目目录：${root}\n`);
  add("\n本报告只检查，不修改业务文件。\n");

  section("1. 当前关键文件是否存在");

  [
    "components/products/selection/ProductSelectionClient.tsx",
    "components/products/selection/ProductCardGrid.tsx",
    "components/products/selection/ProductSelectionCard.tsx",
    "data/products/generated/pumps/pump-series.selection.generated.ts",
    "data/products/selection/probe-selection.generated.ts",
    "app/products/probes/[slug]/page.tsx",
    "app/products/pumps/plunger-pumps/[slug]/page.tsx",
  ].forEach((p) => {
    const full = path.join(root, p);
    if (fs.existsSync(full)) {
      const stat = fs.statSync(full);
      add(`- 存在：${p} | 修改时间：${stat.mtime.toLocaleString()}`);
    } else {
      add(`- 缺失：${p}`);
    }
  });

  section("2. ProductSelectionCard 最终按钮 href 代码");

  codeBlock(
    findMatchesInFile(
      "components/products/selection/ProductSelectionCard.tsx",
      [
        /FINAL_CARD_HREF_GUARD_20260707/g,
        /function normalizeCardDetailHref/g,
        /const safeDetailHref = normalizeCardDetailHref/g,
        /href=\{detailHref\}/g,
        /href=\{safeDetailHref\}/g,
        /className="product-link"/g,
      ],
      6
    ).join("\n\n"),
    "tsx"
  );

  section("3. ProductSelectionClient 详情链接出口代码");

  codeBlock(
    findMatchesInFile(
      "components/products/selection/ProductSelectionClient.tsx",
      [
        /function normalizeFinalProductDetailHref/g,
        /function makeDetailHref/g,
        /getDetailHref=\{\(product\) => normalizeFinalProductDetailHref\(product, makeDetailHref\(product\)\)\}/g,
        /PROBE_DETAIL_HREF_PATCH/g,
        /return `\/products\/probes\/\$\{probeSlug\}`;/g,
        /const isPlungerPump/g,
        /return slug\s*\?\s*`\/products\/pumps\/plunger-pumps\/\$\{slug\}`/g,
      ],
      7
    ).join("\n\n"),
    "tsx"
  );

  section("4. 全项目搜索错误链接与 probes 链接来源");

  const allMatches = searchAll([
    /\/products\/probes\/ea-100-pmma/g,
    /probes\/ea-100-pmma/g,
    /\/products\/probes\/\$\{/g,
    /products\/probes\//g,
  ]);

  codeBlock(allMatches.length ? allMatches.join("\n") : "未发现 /products/probes/ea-100-pmma 或相关错误链接。");

  section("5. EA-100-PMMA 在柱塞泵生成数据中的上下文");

  codeBlock(
    findMatchesInFile(
      "data/products/generated/pumps/pump-series.selection.generated.ts",
      [
        /"productId": "ea-100-pmma"/g,
        /"detailHref": "\/products\/pumps\/plunger-pumps\/ea-100-pmma"/g,
        /"title": "EA-100-PMMA"/g,
      ],
      8
    ).join("\n\n"),
    "ts"
  );

  section("6. probe-selection.generated.ts 是否误含 EA-100-PMMA");

  const probeText = read("data/products/selection/probe-selection.generated.ts");
  const probeHasEA100 = /ea-100-pmma|EA-100-PMMA/.test(probeText);

  add(`probe-selection.generated.ts 是否包含 EA-100-PMMA：${probeHasEA100 ? "是，有问题" : "否，未发现"}`);

  codeBlock(
    findMatchesInFile(
      "data/products/selection/probe-selection.generated.ts",
      [
        /href: "\/products\/probes\//g,
        /detailHref: "\/products\/probes\//g,
        /sourceType: "probe-selection"/g,
      ],
      3
    ).join("\n\n"),
    "ts"
  );

  section("7. 按当前最终保护逻辑模拟 href 结果");

  const tests = [
    {
      name: "柱塞泵被错误传入 probes 路径时，应自动纠正",
      product: {
        productId: "ea-100-pmma",
        detailSlug: "ea-100-pmma",
      },
      href: "/products/probes/ea-100-pmma",
    },
    {
      name: "柱塞泵正确路径保持正确",
      product: {
        productId: "ea-100-pmma",
        detailSlug: "ea-100-pmma",
      },
      href: "/products/pumps/plunger-pumps/ea-100-pmma",
    },
    {
      name: "真正针系列路径不应被改成柱塞泵",
      product: {
        productId: "sampling-probes",
        detailSlug: "sampling-probes",
        sourceType: "probe-selection",
      },
      href: "/products/probes/sampling-probes",
    },
  ];

  const testRows = tests.map((t) => {
    const result = normalizeLikeCardGuard(t.product, t.href);
    return [
      `测试：${t.name}`,
      `输入 href：${t.href}`,
      `输出 href：${result}`,
      "",
    ].join("\n");
  });

  codeBlock(testRows.join("\n"));

  section("8. 检查本地 dev 页面 HTML 中是否含错误链接");

  const page = await requestUrl("http://localhost:3000/products/");

  if (!page.ok) {
    add(`无法请求 http://localhost:3000/products/：${page.error}`);
    add("\n说明：如果 npm run dev 没有启动，这一项可以忽略。");
  } else {
    add(`HTTP 状态码：${page.statusCode}`);

    const hasWrong = page.body.includes("/products/probes/ea-100-pmma");
    const hasCorrect = page.body.includes("/products/pumps/plunger-pumps/ea-100-pmma");

    add(`HTML 是否包含错误链接 /products/probes/ea-100-pmma：${hasWrong ? "是" : "否"}`);
    add(`HTML 是否包含正确链接 /products/pumps/plunger-pumps/ea-100-pmma：${hasCorrect ? "是" : "否"}`);

    if (!hasWrong && !hasCorrect) {
      add("说明：产品卡片可能由客户端渲染，首屏 HTML 不一定包含具体卡片链接。");
    }
  }

  section("9. .next 编译缓存是否还含错误链接");

  if (fs.existsSync(path.join(root, ".next"))) {
    const nextFiles = [];
    function walkNext(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkNext(full);
        else if (/\.(js|mjs|json|html)$/.test(entry.name)) nextFiles.push(full);
      }
    }

    walkNext(path.join(root, ".next"));

    const hits = [];
    for (const file of nextFiles) {
      const text = fs.readFileSync(file, "utf8");
      if (text.includes("/products/probes/ea-100-pmma") || text.includes("probes/ea-100-pmma")) {
        hits.push(rel(file));
      }
    }

    codeBlock(hits.length ? hits.join("\n") : ".next 中未发现 /products/probes/ea-100-pmma。");
  } else {
    add(".next 不存在。");
  }

  section("10. 判断结论");

  const cardText = read("components/products/selection/ProductSelectionCard.tsx");
  const clientText = read("components/products/selection/ProductSelectionClient.tsx");
  const hasSafeHref = cardText.includes("href={safeDetailHref}");
  const stillDirectHref = cardText.includes("href={detailHref}");
  const hasFinalClientGuard = clientText.includes("normalizeFinalProductDetailHref(product, makeDetailHref(product))");
  const activeWrongHardLink = allMatches.some((line) => line.includes("/products/probes/ea-100-pmma"));

  add(`- ProductSelectionCard 是否使用 safeDetailHref：${hasSafeHref ? "是" : "否"}`);
  add(`- ProductSelectionCard 是否仍存在 href={detailHref}：${stillDirectHref ? "是，有风险" : "否"}`);
  add(`- ProductSelectionClient 是否包了最终纠正函数：${hasFinalClientGuard ? "是" : "否"}`);
  add(`- 活跃源码里是否存在 /products/probes/ea-100-pmma：${activeWrongHardLink ? "是，有问题" : "否"}`);

  if (hasSafeHref && !stillDirectHref && hasFinalClientGuard && !activeWrongHardLink) {
    add("\n初步判断：活跃源码里已经没有直接生成 /products/probes/ea-100-pmma 的来源。如果 dev 终端仍报这个地址，更可能是旧页面、旧窗口、旧缓存或曾经打开的 500 页面继续请求。");
  } else {
    add("\n初步判断：源码中仍可能存在未修正的详情链接出口，需要根据上方命中项继续修。");
  }

  fs.writeFileSync(reportPath, report.join("\n"), "utf8");
  console.log("已生成报告：");
  console.log(reportPath);
}

let report = [];

main().catch((err) => {
  fs.writeFileSync(reportPath, `# 脚本执行失败\n\n\`\`\`txt\n${err.stack || err.message}\n\`\`\`\n`, "utf8");
  console.error(err);
  process.exit(1);
});