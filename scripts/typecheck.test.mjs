import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

test("Next preview includes cannot pull historical caches into the shared type check", () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { config, error } = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  assert.equal(error, undefined);
  // Next can append these entries when another local preview starts. They must
  // remain excluded without deleting that preview's files or hiding real code.
  const include = [...config.include,
    ".next-codex/dev/types/**/*.ts", ".next-codex-fit2d/dev/types/**/*.ts",
    ".next/pvc-customer-rewrite-20261113/dev/types/**/*.ts",
    ".next/tubing-preview-20261115/dev/types/**/*.ts",
  ];
  const parsed = ts.parseJsonConfigFileContent({ ...config, include }, ts.sys, root);
  assert.deepEqual(parsed.errors, []);
  const files = parsed.fileNames.map(file => path.relative(root, file).replaceAll("\\", "/"));
  const generated = files.filter(file => file.startsWith(".next"));
  assert.ok(generated.every(file => file.startsWith(".next/types/")), generated.join("\n"));
  assert.ok(files.includes("app/page.tsx"));
  assert.ok(files.includes("components/products/tubing-assemblies/FlangedTubingWorkspace.tsx"));
  assert.ok(files.includes("scripts/products/tubing-assembly-3d.test.ts"));
  assert.equal(parsed.options.strict, true);
});
