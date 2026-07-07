const fs = require("fs");

const file = "data/products/generated/pumps/diaphragm-pumps/detail/index.json";
const raw = JSON.parse(fs.readFileSync(file, "utf8"));

const details = Array.isArray(raw) ? raw : Object.values(raw).flat();

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function getModel(detail) {
  return normalizeText(
    detail.modelDisplay ||
    detail.displayModel ||
    detail.foreachModel ||
    detail.modelCode ||
    detail.model ||
    detail.title ||
    detail.slug
  );
}

function getExpected(model, slug) {
  const text = `${model} ${slug}`.toUpperCase();

  if (text.includes("24DB") || text.includes("24DS")) {
    return { motor: "有刷电机", life: "3000 h" };
  }

  if (text.includes("24BB") || text.includes("24BS")) {
    return { motor: "无刷电机", life: "10000 h" };
  }

  return { motor: "", life: "" };
}

function collectSpecRows(detail) {
  const rows = [];

  function walk(value, path = "") {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }

    if (typeof value === "object") {
      const label = normalizeText(
        value.label ||
        value.name ||
        value.key ||
        value.title ||
        value.parameter ||
        value.specName
      );

      const specValue = normalizeText(
        value.value ||
        value.val ||
        value.text ||
        value.content ||
        value.description
      );

      if (label || specValue) {
        const combined = `${label} ${specValue}`;
        if (
          combined.includes("寿命") ||
          combined.toLowerCase().includes("life") ||
          combined.includes("电机") ||
          combined.toLowerCase().includes("motor")
        ) {
          rows.push({
            path,
            label,
            value: specValue,
          });
        }
      }

      for (const [key, child] of Object.entries(value)) {
        if (
          key === "label" ||
          key === "name" ||
          key === "key" ||
          key === "title" ||
          key === "parameter" ||
          key === "specName" ||
          key === "value" ||
          key === "val" ||
          key === "text" ||
          key === "content" ||
          key === "description"
        ) {
          continue;
        }

        walk(child, path ? `${path}.${key}` : key);
      }
    }
  }

  walk(detail.specs, "specs");
  walk(detail.specifications, "specifications");
  walk(detail.specGroups, "specGroups");
  walk(detail.technicalSpecifications, "technicalSpecifications");
  walk(detail.modelConfigurations, "modelConfigurations");

  return rows;
}

function hasMixedLife(value) {
  const text = normalizeText(value).toLowerCase();
  return (
    text.includes("3000") &&
    (text.includes("10000") || text.includes("10,000"))
  );
}

function hasMixedMotor(value) {
  const text = normalizeText(value);
  return text.includes("有刷") && text.includes("无刷");
}

const selected = details.filter((detail) => {
  const slug = normalizeText(detail.slug);
  const model = getModel(detail);
  return /dpl30|dpl60|dpl30h|dpgl800/i.test(`${slug} ${model}`);
});

for (const detail of selected) {
  const slug = normalizeText(detail.slug);
  const model = getModel(detail);
  const expected = getExpected(model, slug);
  const rows = collectSpecRows(detail);

  const motorRows = rows.filter((row) => {
    const text = `${row.label} ${row.value}`;
    return text.includes("电机") || text.toLowerCase().includes("motor");
  });

  const lifeRows = rows.filter((row) => {
    const text = `${row.label} ${row.value}`;
    return text.includes("寿命") || text.toLowerCase().includes("life");
  });

  console.log(`\n## ${model}`);
  console.log(`- slug: ${slug}`);
  console.log(`- 预期电机类型: ${expected.motor || "未识别"}`);
  console.log(`- 预期寿命: ${expected.life || "未识别"}`);
  console.log(`- 电机相关规格项数量: ${motorRows.length}`);
  console.log(`- 寿命相关规格项数量: ${lifeRows.length}`);

  if (motorRows.length) {
    console.log(`\n### 电机相关规格项`);
    for (const row of motorRows) {
      const warning = hasMixedMotor(`${row.label} ${row.value}`) ? "  ⚠️ 混合了有刷/无刷" : "";
      console.log(`- ${row.path} | ${row.label}: ${row.value}${warning}`);
    }
  }

  if (lifeRows.length) {
    console.log(`\n### 寿命相关规格项`);
    for (const row of lifeRows) {
      const warning = hasMixedLife(`${row.label} ${row.value}`) ? "  ⚠️ 混合了 3000h / 10000h" : "";
      console.log(`- ${row.path} | ${row.label}: ${row.value}${warning}`);
    }
  }

  const motorText = motorRows.map((row) => `${row.label} ${row.value}`).join(" / ");
  const lifeText = lifeRows.map((row) => `${row.label} ${row.value}`).join(" / ");

  const problems = [];

  if (motorRows.length > 1) {
    problems.push("电机类型重复");
  }

  if (lifeRows.length > 1) {
    problems.push("寿命重复");
  }

  if (hasMixedMotor(motorText)) {
    problems.push("电机类型混合了有刷/无刷");
  }

  if (hasMixedLife(lifeText)) {
    problems.push("寿命混合了 3000h / 10000h");
  }

  if (expected.motor && motorText && !motorText.includes(expected.motor)) {
    problems.push(`电机类型不符合预期，应为 ${expected.motor}`);
  }

  if (expected.life && lifeText && !lifeText.replace(/,/g, "").includes(expected.life.replace(/,/g, ""))) {
    problems.push(`寿命不符合预期，应为 ${expected.life}`);
  }

  if (problems.length) {
    console.log(`\n### 问题判断`);
    for (const problem of problems) {
      console.log(`- ⚠️ ${problem}`);
    }
  } else {
    console.log(`\n### 问题判断`);
    console.log(`- 未发现明显问题`);
  }
}
