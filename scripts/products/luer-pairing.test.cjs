const test = require("node:test");
const assert = require("node:assert/strict");

const details = require("../../data/products/generated/fittings/luer-fittings/detail/index.json");

function seriesOf(product) {
  return String(product.seriesCode || product.seriesName || product.model || "").trim().toUpperCase();
}

function roleOf(product) {
  const series = seriesOf(product);
  if (["LS", "PMLS"].includes(series)) return "female";
  if (["LCR", "LPT", "LNS", "LPBL"].includes(series)) return "accessory";
  return "male";
}

function tubeOf(product) {
  return String(product.specs?.find((item) => item.label === "接管内径")?.value || "").trim();
}

test("published Luer ends have opposite-gender candidates at the same tubing size", () => {
  const ends = details.filter((product) => roleOf(product) !== "accessory");
  const sizes = new Set(ends.map(tubeOf).filter(Boolean));
  assert.deepEqual([...sizes].sort(), ["1.6 mm", "2.4 mm", "3.2 mm"]);
  for (const product of ends) {
    const opposite = ends.filter((candidate) => roleOf(candidate) !== roleOf(product) && tubeOf(candidate) === tubeOf(product));
    assert.ok(opposite.length > 0, `${product.model} has no same-size opposite-gender candidate`);
  }
});

test("Luer accessories are excluded from opposite-gender pairing", () => {
  const accessorySeries = new Set(["LCR", "LPT", "LNS", "LPBL"]);
  for (const product of details.filter((item) => accessorySeries.has(seriesOf(item)))) {
    assert.equal(roleOf(product), "accessory");
  }
  assert.ok(details.some((product) => ["LSL", "LRL"].includes(seriesOf(product))));
});
