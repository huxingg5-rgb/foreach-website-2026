const fs = require("fs");

const file = "data/products/selection/diaphragm-pump-selection.generated.ts";

const map = {
  "DPL30-24DB-EP/PS": "dpl30-24db-ep-ps-liquid-diaphragm-pump",
  "DPL30-24BB-EP/PS": "dpl30-24bb-ep-ps-liquid-diaphragm-pump",
  "DPL60-24DB-EP/PS": "dpl60-24db-ep-ps-liquid-diaphragm-pump",
  "DPL60-24BB-EP/PS": "dpl60-24bb-ep-ps-liquid-diaphragm-pump",
  "DPL30H-24DS-EP/PS": "dpl30h-24ds-ep-ps-liquid-diaphragm-pump",
  "DPL30H-24BS-EP/PS": "dpl30h-24bs-ep-ps-liquid-diaphragm-pump",
  "DPGL800-24BS6-EP/PS": "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
  "DPGL800-24BS6-FF/PS": "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
};

const backup = `${file}.bak_force_8_model_links_${new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14)}`;

fs.copyFileSync(file, backup);

let code = fs.readFileSync(file, "utf8");

function findObjectStart(text, index) {
  let i = index;
  while (i >= 0) {
    if (text[i] === "{") return i;
    i--;
  }
  return -1;
}

function findObjectEnd(text, start) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) return i;
  }

  return -1;
}

Object.entries(map).forEach(([model, slug]) => {
  const href = `/products/pumps/diaphragm-pumps/${slug}`;

  const modelIndex = code.indexOf(model);

  if (modelIndex < 0) {
    console.log("未找到型号:", model);
    return;
  }

  const start = findObjectStart(code, modelIndex);
  const end = findObjectEnd(code, start);

  if (start < 0 || end < 0) {
    console.log("未找到对象边界:", model);
    return;
  }

  let block = code.slice(start, end + 1);

  if (/detailSlug\s*:/.test(block)) {
    block = block.replace(/detailSlug\s*:\s*["'][^"']*["']/, `detailSlug: "${slug}"`);
  } else {
    block = block.replace(/(productId\s*:\s*["'][^"']+["'],)/, `$1\n  detailSlug: "${slug}",`);
  }

  if (/detailHref\s*:/.test(block)) {
    block = block.replace(/detailHref\s*:\s*["'][^"']*["']/, `detailHref: "${href}"`);
  } else {
    block = block.replace(/(detailSlug\s*:\s*["'][^"']+["'],)/, `$1\n  detailHref: "${href}",`);
  }

  if (/href\s*:/.test(block)) {
    block = block.replace(/href\s*:\s*["'][^"']*["']/, `href: "${href}"`);
  }

  code = code.slice(0, start) + block + code.slice(end + 1);

  console.log("已修正:", model, "=>", href);
});

fs.writeFileSync(file, code, "utf8");

console.log("backup:", backup);
console.log("done");
