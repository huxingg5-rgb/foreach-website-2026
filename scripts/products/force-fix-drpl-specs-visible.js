const fs = require("fs");

const file = "data/products/generated/pumps/valveless-pumps/detail/index.json";

function spec(label, value) {
  return {
    label,
    name: label,
    title: label,
    value,
    content: value,
  };
}

const details = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));

const drpl = details.find((x) => x.slug === "drpl");

if (!drpl) {
  throw new Error("未找到 drpl");
}

drpl.specs = Array.isArray(drpl.specs) ? drpl.specs : [];

function removeLabels(labels) {
  drpl.specs = drpl.specs.filter((s) => {
    const label = s.label || s.name || s.title || "";
    return !labels.includes(label);
  });
}

function insertAfter(afterLabel, items) {
  const index = drpl.specs.findIndex((s) => (s.label || s.name || s.title) === afterLabel);

  if (index >= 0) {
    drpl.specs.splice(index + 1, 0, ...items);
  } else {
    drpl.specs.unshift(...items);
  }
}

removeLabels([
  "DRPL-0109-0100",
  "DRPL-0119-0060",
  "1:9 配比配置",
  "1:19 配比配置",
]);

insertAfter("配比范围", [
  spec(
    "1:9 配比配置",
    "DRPL-0109-0100｜浓缩液 100 μL｜稀释液 900 μL｜配液量 1 mL｜QMin 60 mL/min｜QMax 300 mL/min"
  ),
  spec(
    "1:19 配比配置",
    "DRPL-0119-0060｜浓缩液 60 μL｜稀释液 1140 μL｜配液量 1.2 mL｜QMin 72 mL/min｜QMax 360 mL/min"
  ),
]);

drpl.specifications = drpl.specs;

drpl.specificationGroups = [
  {
    title: "技术参数",
    items: drpl.specs,
  },
];

fs.writeFileSync(file, JSON.stringify(details, null, 2), "utf8");

console.log("DRPL specs visible rows patched.");