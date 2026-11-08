const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const root = path.resolve(__dirname, "../..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data/products/detail/standalone-fitting-cad-manifest.json"), "utf8"));
const geometryByViewerId = new Map(
  Object.values(manifest.geometries).map((geometry) => [geometry.viewerId, geometry]),
);

test("standalone fitting products point to compressed geometry with positive dimensions", () => {
  const products = Object.values(manifest.products).flatMap((family) => Object.values(family));
  assert.ok(products.length > 0);
  const productsWith3d = products.filter((product) => product.viewerId);
  assert.ok(productsWith3d.length > 0);
  for (const product of productsWith3d) {
    const geometry = geometryByViewerId.get(product.viewerId);
    assert.ok(geometry, `${product.model} is missing a geometry mapping`);
    assert.ok(geometry.sizeMm.every((value) => Number(value) > 0), `${product.model} has invalid dimensions`);
    const file = path.join(root, "public", geometry.model3dUrl.replace(/^\/+/, ""));
    assert.ok(fs.existsSync(file), `${product.model} is missing ${file}`);
    const decoded = zlib.gunzipSync(fs.readFileSync(file));
    assert.ok(decoded.length > 1024, `${product.model} has an empty compressed model`);
  }
});

test("material variants reuse geometry while retaining product-specific drawings", () => {
  const products = Object.values(manifest.products).flatMap((family) => Object.values(family));
  const byViewer = new Map();
  for (const product of products.filter((item) => item.viewerId)) {
    const list = byViewer.get(product.viewerId) || [];
    list.push(product);
    byViewer.set(product.viewerId, list);
  }
  assert.ok([...byViewer.values()].some((items) => items.length > 1), "expected at least one shared geometry group");
  for (const items of byViewer.values()) {
    if (items.length < 2) continue;
    assert.ok(new Set(items.map((item) => item.drawingPdfUrl)).size > 1, "shared geometry variants should keep product drawings");
  }
});
