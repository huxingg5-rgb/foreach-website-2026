import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { createHash } from "node:crypto";
import manifest from "../../data/products/detail/remaining-fitting-cad-manifest.json";
import { getRemainingFittingCadAssets } from "../../data/products/detail/remaining-fitting-cad-assets";
import { FITTING_PUBLISHED_PRODUCTS } from "../../data/products/selection/fitting-publication.generated";
import { decodeCompactCad } from "./solenoid-viewer/compact-cad.js";

const root = path.resolve(import.meta.dirname, "../..");
const families = new Set(["female-thread-adapters", "bulkhead-barbed-fittings", "filters", "check-valves"]);
const targets = FITTING_PUBLISHED_PRODUCTS.filter(p => families.has(p.productTypeId));
const file = (url: string) => path.join(root, "public", url);
const decode = (url: string) => decodeCompactCad(new Uint8Array(zlib.gunzipSync(fs.readFileSync(file(url)))));

test("every published target has its own reviewed drawing and a real CAD asset", () => {
  assert.equal(targets.length, 26);
  assert.equal(Object.values(manifest.products).flatMap(Object.keys).length, targets.length);
  for (const target of targets) {
    const slug = target.foreachModel.toLowerCase();
    const asset = getRemainingFittingCadAssets(target.productTypeId, slug);
    assert.ok(asset, target.foreachModel);
    assert.equal(asset.model, target.foreachModel);
    assert.equal(asset.productCode, target.productCode);
    assert.ok(asset.drawingPdfUrl.includes(slug), `Wrong model drawing: ${slug}`);
    const pdf = fs.readFileSync(file(asset.drawingPdfUrl));
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    const entry = (manifest.products as Record<string, Record<string, { drawingSha256: string }>>)[target.productTypeId][slug];
    assert.equal(createHash("sha256").update(pdf).digest("hex"), entry.drawingSha256, slug);
    const model = decode(asset.model3dUrl);
    assert.equal(model.success, true);
    assert.ok(model.meshes.length > 0);
    assert.ok(model.dimensions.size.every((v: number) => v > 0));
  }
  assert.equal(getRemainingFittingCadAssets("quick-connect-fittings", "q2001-pmv-sacn"), undefined);
  assert.equal(getRemainingFittingCadAssets("filters", "g-178-64-pa-v"), undefined);
});

test("prepared geometry dimensions match actual vertices and exact assembly components", () => {
  for (const geometry of Object.values(manifest.geometries)) {
    const model = decode(geometry.model3dUrl);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const mesh of model.meshes) {
      assert.ok(mesh.index.array.length > 0);
      mesh.attributes.position.array.forEach((v: number, i: number) => {
        assert.ok(Number.isFinite(v));
        min[i % 3] = Math.min(min[i % 3], v);
        max[i % 3] = Math.max(max[i % 3], v);
      });
    }
    max.forEach((v, i) => assert.ok(Math.abs(v - min[i] - geometry.sizeMm[i]) < 1e-5, geometry.viewerId));
  }
  const cv = getRemainingFittingCadAssets("check-valves", "cv-be-32-pp-n")!;
  const checkValve = decode(cv.model3dUrl);
  assert.equal(checkValve.meshes.length, 3);
  assert.equal(checkValve.meshes.filter((m: { fittingFinish?: string }) => m.fittingFinish === "black").length, 1);
  assert.ok(Math.abs(checkValve.dimensions.size[2] - 32.74) < 1e-5);
  const filter60 = getRemainingFittingCadAssets("filters", "f-pe-60-32-pp-n")!;
  const filter100 = getRemainingFittingCadAssets("filters", "f-pe-100-32-pp-n")!;
  assert.notEqual(filter60.drawingPdfUrl, filter100.drawingPdfUrl);
  for (const filter of [filter60, filter100]) {
    const model = decode(filter.model3dUrl);
    assert.equal(model.meshes.length, 3);
    [19.7, 19.7, 32.7].forEach((value, i) => assert.ok(Math.abs(model.dimensions.size[i] - value) < 1e-5));
  }
});
