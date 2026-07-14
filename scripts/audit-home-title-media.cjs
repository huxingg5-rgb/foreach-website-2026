const fs = require("fs");

const css = fs.readFileSync("app/globals.css", "utf8");

function findClosingBrace(start) {
  let depth = 0;
  let quote = null;
  let comment = false;

  for (let i = start; i < css.length; i += 1) {
    const char = css[i];
    const next = css[i + 1];

    if (comment) {
      if (char === "*" && next === "/") {
        comment = false;
        i += 1;
      }
      continue;
    }

    if (!quote && char === "/" && next === "*") {
      comment = true;
      i += 1;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        i += 1;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "{") depth += 1;

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}

function getMediaContext(index) {
  const mediaPattern = /@media[^{]+\{/g;
  const candidates = [];

  let match;

  while ((match = mediaPattern.exec(css)) !== null) {
    if (match.index > index) break;

    const openBrace = css.indexOf("{", match.index);
    const closeBrace = findClosingBrace(openBrace);

    if (closeBrace >= index) {
      candidates.push({
        text: match[0].replace(/\{$/, "").trim(),
        start: match.index,
      });
    }
  }

  if (!candidates.length) {
    return "无媒体查询（全局规则）";
  }

  return candidates[candidates.length - 1].text;
}

const selectorPattern =
  /(^|\n)([ \t]*(?:html\[[^\]]+\]\s+)?\.(?:home-hero-title|home-flow-title)[^{]*\{)/g;

let match;
let count = 0;

while ((match = selectorPattern.exec(css)) !== null) {
  const selectorStart = match.index + match[1].length;
  const openBrace = css.indexOf("{", selectorStart);
  const closeBrace = findClosingBrace(openBrace);

  if (closeBrace < 0) continue;

  const selector = css
    .slice(selectorStart, openBrace)
    .trim();

  const body = css.slice(openBrace + 1, closeBrace);

  const fontSize =
    body.match(/font-size\s*:\s*([^;]+);/i)?.[1]?.trim() ??
    "未设置";

  const lineHeight =
    body.match(/line-height\s*:\s*([^;]+);/i)?.[1]?.trim() ??
    "未设置";

  const lineNumber =
    css.slice(0, selectorStart).split("\n").length;

  count += 1;

  console.log("");
  console.log(`===== 规则 ${count} =====`);
  console.log(`行号：${lineNumber}`);
  console.log(`选择器：${selector}`);
  console.log(`媒体查询：${getMediaContext(selectorStart)}`);
  console.log(`font-size：${fontSize}`);
  console.log(`line-height：${lineHeight}`);
}

console.log("");
console.log(`共找到 ${count} 个标题规则。`);
