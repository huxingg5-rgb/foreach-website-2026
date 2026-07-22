const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(p(rel));
}

function read(rel) {
  return fs.readFileSync(p(rel), "utf8");
}

function write(rel, content) {
  const full = p(rel);
  fs.writeFileSync(full, content, "utf8");
  console.log("已修改:", rel);
}

function backup(rel) {
  const full = p(rel);
  if (!fs.existsSync(full)) return;
  const bak = full + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + ".bak");
  }
}

function insertBeforeLastArrayClose(text, insertText) {
  const idx = text.lastIndexOf("];");
  if (idx === -1) return null;
  return text.slice(0, idx) + insertText + "\n" + text.slice(idx);
}

function findBalancedObject(text, keyText) {
  const keyIndex = text.indexOf(keyText);
  if (keyIndex === -1) return null;

  const colonIndex = text.indexOf(":", keyIndex);
  if (colonIndex === -1) return null;

  const openIndex = text.indexOf("{", colonIndex);
  if (openIndex === -1) return null;

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) {
      return {
        start: keyIndex,
        objectStart: openIndex,
        end: i + 1,
        block: text.slice(keyIndex, i + 1),
      };
    }
  }

  return null;
}

function replacePropertyBlock(block, propName, newPropBlock) {
  const propRegex = new RegExp("(\\n\\s*)" + propName + "\\s*:", "m");
  const match = block.match(propRegex);

  if (!match) {
    const insertAt = block.lastIndexOf("}");
    if (insertAt === -1) return block;
    return block.slice(0, insertAt) + "\n" + newPropBlock + "," + block.slice(insertAt);
  }

  const propStart = match.index + match[1].length;
  const colon = block.indexOf(":", propStart);
  let valueStart = colon + 1;

  while (/\s/.test(block[valueStart])) valueStart++;

  let end = valueStart;
  const first = block[valueStart];

  if (first === "{" || first === "[") {
    const open = first;
    const close = first === "{" ? "}" : "]";
    let depth = 0;
    let inString = false;
    let quote = "";
    let escaped = false;

    for (let i = valueStart; i < block.length; i++) {
      const ch = block[i];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === "\\") {
          escaped = true;
        } else if (ch === quote) {
          inString = false;
          quote = "";
        }
        continue;
      }

      if (ch === '"' || ch === "'" || ch === "`") {
        inString = true;
        quote = ch;
        continue;
      }

      if (ch === open) depth++;
      if (ch === close) depth--;

      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  } else {
    const comma = block.indexOf(",", valueStart);
    end = comma === -1 ? block.length : comma;
  }

  if (block[end] === ",") end++;

  return block.slice(0, propStart) + newPropBlock + block.slice(end);
}

/**
 * 1. 确认注射泵筛选数据文件存在
 */
const syringeDataRel = "data/products/selection/syringe-pump-selection.generated.ts";

if (!exists(syringeDataRel)) {
  console.error("未找到:", syringeDataRel);
  console.error("请先创建 syringe-pump-selection.generated.ts");
  process.exit(1);
}

/**
 * 1.1 尽量让 syringe 文件的 import 路径和无阀泵保持一致
 */
const valvelessDataRel = "data/products/selection/valveless-pump-selection.generated.ts";

if (exists(valvelessDataRel)) {
  const valvelessText = read(valvelessDataRel);
  const syringeText = read(syringeDataRel);

  const valvelessImport = valvelessText.match(
    /import\s+type\s*{[\s\S]*?ProductSelectionFilterLabel[\s\S]*?ProductSelectionProduct[\s\S]*?}\s*from\s*["'][^"']+["'];/
  );

  const syringeImport = syringeText.match(
    /import\s+type\s*{[\s\S]*?ProductSelectionFilterLabel[\s\S]*?ProductSelectionProduct[\s\S]*?}\s*from\s*["'][^"']+["'];/
  );

  if (valvelessImport && syringeImport && valvelessImport[0] !== syringeImport[0]) {
    backup(syringeDataRel);
    write(syringeDataRel, syringeText.replace(syringeImport[0], valvelessImport[0]));
  }
}

/**
 * 2. 接入 product-route-map.ts
 */
const routeMapRel = "data/products/selection/product-route-map.ts";

if (!exists(routeMapRel)) {
  console.error("未找到:", routeMapRel);
  process.exit(1);
}

{
  let text = read(routeMapRel);

  if (!text.includes("syringe-pumps") && !text.includes("syringe-pump")) {
    backup(routeMapRel);

    const insert = `
  {
    category: "pumps",
    slug: "syringe-pumps",
    productTypeId: "syringe-pump",
    label: "注射泵",
  },`;

    const next = insertBeforeLastArrayClose(text, insert);

    if (!next) {
      console.error("无法自动修改 product-route-map.ts：没有找到 ];");
      process.exit(1);
    }

    write(routeMapRel, next);
  } else {
    console.log("已存在注射泵路由映射，跳过:", routeMapRel);
  }
}

/**
 * 3. 接入 product-type-intro.ts
 */
const introRel = "data/products/selection/product-type-intro.ts";

if (!exists(introRel)) {
  console.error("未找到:", introRel);
  process.exit(1);
}

{
  let text = read(introRel);

  if (!text.includes("pumps:syringe-pump")) {
    backup(introRel);

    const valvelessKeys = [
      '"pumps:valveless-pump"',
      "'pumps:valveless-pump'",
      "pumps:valveless-pump",
    ];

    let sourceBlockInfo = null;
    for (const key of valvelessKeys) {
      sourceBlockInfo = findBalancedObject(text, key);
      if (sourceBlockInfo) break;
    }

    let newEntry = null;

    const newTitleBlock = `title: {
      zh: "注射泵系列",
      en: "Syringe Pumps",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    }`;

    const newDescriptionBlock = `description: {
      zh: "恒永达注射泵系列面向自动化分析仪器中的精密液体处理需求，适用于体外诊断、生命科学、实验室自动化和分析检测设备中的试剂加注、样本分配、定量输送和液路切换场景。\\n\\n产品分为电磁阀系列注射泵和旋转阀系列注射泵。电磁阀系列支持 1–8 通道配置，可选 2端口、3端口及3端口分配等阀门形式；旋转阀系列支持平面转阀和柱面转阀，可配置 3通、5通、9通等多端口阀位结构。\\n\\n注射泵平台提供 30mm 与 60mm 两种行程，适配 50μL–5mL 或 25μL–25mL 玻璃注射器，并支持 RS-232、RS-485、CAN 通讯方式。通道数、端口形式、阀位结构、安装尺寸和液路集成方式可根据项目需求定制。",
      en: "FOREACH syringe pumps are designed for precision liquid handling in automated analytical instruments, supporting reagent addition, sample dispensing, quantitative transfer and fluid path switching in IVD, life sciences, laboratory automation and analytical testing systems.\\n\\nThe series includes solenoid valve syringe pumps and rotary valve syringe pumps. Solenoid valve models support 1–8 channel configurations with 2-port, 3-port and 3-port dispensing valve options. Rotary valve models support planar or cylindrical rotary valves with 3-way, 5-way and 9-way multi-port configurations.\\n\\nThe platform provides 30 mm and 60 mm stroke options, supports 50 μL–5 mL or 25 μL–25 mL glass syringes, and supports RS-232, RS-485 and CAN communication. Channel count, port type, valve structure, mounting dimensions and fluidic integration can be customized for specific projects.",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    }`;

    if (sourceBlockInfo) {
      let copied = sourceBlockInfo.block;

      copied = copied.replace(/["']pumps:valveless-pump["']|pumps:valveless-pump/, '"pumps:syringe-pump"');
      copied = copied.replace(/valveless-pumps/g, "syringe-pumps");
      copied = copied.replace(/valveless-pump/g, "syringe-pump");
      copied = copied.replace(/无阀泵/g, "注射泵");
      copied = copied.replace(/Valveless Pumps/g, "Syringe Pumps");
      copied = copied.replace(/Valveless Pump/g, "Syringe Pump");

      copied = replacePropertyBlock(copied, "title", newTitleBlock);
      copied = replacePropertyBlock(copied, "description", newDescriptionBlock);

      newEntry = "\n  " + copied.trim().replace(/^["']?pumps:syringe-pump["']?\s*:/, '"pumps:syringe-pump":') + ",";
    } else {
      newEntry = `
  "pumps:syringe-pump": {
    ${newTitleBlock},
    ${newDescriptionBlock},
  },`;
    }

    const idx = text.lastIndexOf("};");

    if (idx === -1) {
      console.error("无法自动修改 product-type-intro.ts：没有找到 };");
      process.exit(1);
    }

    text = text.slice(0, idx) + newEntry + "\n" + text.slice(idx);
    write(introRel, text);
  } else {
    console.log("已存在注射泵顶部介绍，跳过:", introRel);
  }
}

/**
 * 4. 接入 ProductSelectionClient.tsx
 */
const clientRel = "components/products/selection/ProductSelectionClient.tsx";

if (!exists(clientRel)) {
  console.error("未找到:", clientRel);
  process.exit(1);
}

{
  let text = read(clientRel);
  let changed = false;

  const importBlock = `import {
  syringePumpFilterLabels,
  syringePumpSelectionProducts,
} from "@/data/products/selection/syringe-pump-selection.generated";`;

  if (!text.includes("syringePumpSelectionProducts")) {
    backup(clientRel);

    const valvelessImportRegex =
      /import\s*{[\s\S]*?valvelessPumpFilterLabels[\s\S]*?valvelessPumpSelectionProducts[\s\S]*?}\s*from\s*["'][^"']*valveless-pump-selection\.generated["'];/;

    if (valvelessImportRegex.test(text)) {
      text = text.replace(valvelessImportRegex, (m) => m + "\n" + importBlock);
    } else {
      const lastImport = [...text.matchAll(/^import .*;$/gm)].pop();
      if (lastImport) {
        const insertAt = lastImport.index + lastImport[0].length;
        text = text.slice(0, insertAt) + "\n" + importBlock + text.slice(insertAt);
      } else {
        text = importBlock + "\n" + text;
      }
    }

    changed = true;
  }

  if (!text.includes("...syringePumpSelectionProducts,")) {
    if (text.includes("...valvelessPumpSelectionProducts,")) {
      text = text.replace(
        "...valvelessPumpSelectionProducts,",
        "...valvelessPumpSelectionProducts,\n  ...syringePumpSelectionProducts,"
      );
      changed = true;
    } else {
      console.warn("警告：没有找到 ...valvelessPumpSelectionProducts, 请手动合并 syringePumpSelectionProducts");
    }
  }

  if (!text.includes("...syringePumpFilterLabels,")) {
    if (text.includes("...valvelessPumpFilterLabels,")) {
      text = text.replace(
        "...valvelessPumpFilterLabels,",
        "...valvelessPumpFilterLabels,\n  ...syringePumpFilterLabels,"
      );
      changed = true;
    } else {
      console.warn("警告：没有找到 ...valvelessPumpFilterLabels, 请手动合并 syringePumpFilterLabels");
    }
  }

  /**
   * 5. 给 makeDetailHref 增加注射泵分支
   */
  if (!text.includes("/products/pumps/syringe-pumps/${slug}")) {
    const valvelessBranchRegex =
      /(const\s+isValvelessPump\s*=[\s\S]*?;\s*)(\n\s*if\s*\(\s*isValvelessPump\s*\)\s*{[\s\S]*?return\s+slug\s*\?\s*`\/products\/pumps\/valveless-pumps\/\$\{slug\}`\s*:\s*["']\/products\/pumps\/valveless-pumps["'];\s*\n\s*})/;

    if (valvelessBranchRegex.test(text)) {
      text = text.replace(valvelessBranchRegex, (m, constBlock, ifBlock) => {
        const syringeConst = `${constBlock}
  const isSyringePump =
    product.categoryId === "pumps" &&
    ["syringe-pump", "syringe-pumps"].includes(product.productTypeId);
`;
        const syringeIf = `${ifBlock}

  if (isSyringePump) {
    const rawSlug =
      (product as any).detailSlug ||
      (product as any).seriesSlug ||
      (product as any).seriesId ||
      product.productId;

    const slug = String(rawSlug || "")
      .split("/")
      .filter(Boolean)
      .pop();

    return slug
      ? \`/products/pumps/syringe-pumps/\${slug}\`
      : "/products/pumps/syringe-pumps";
  }`;
        return syringeConst + syringeIf;
      });
      changed = true;
    } else {
      console.warn("警告：没有自动找到无阀泵 makeDetailHref 分支。详情链接可能需要后续手动补。");
    }
  }

  if (changed) {
    write(clientRel, text);
  } else {
    console.log("ProductSelectionClient.tsx 已接入或无需修改");
  }
}

console.log("");
console.log("注射泵筛选页接入完成。");
console.log("下一步执行：");
console.log("  npm run dev");
console.log("然后打开：");
console.log("  http://localhost:3000/products/pumps/syringe-pumps");