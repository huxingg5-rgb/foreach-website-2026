import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { assemblyPreviewConfig } from "../../data/products/configurator/tubing-assembly-preview";
import { defaultAssemblyChoice } from "../../data/products/configurator/flanged-tubing";
import { assemblyText } from "../../data/products/configurator/tubing-assembly.intl";

test("default preload preserves each material entry and exact selected sources", () => {
  for (const family of ["flanged-tubing", "ferrule-kits", "retaining-ring-kits"]) for (const entry of ["fep", "ptfe", "pfa", "black-ptfe"]) {
    const choice = defaultAssemblyChoice(`${family}-${entry}`), config = assemblyPreviewConfig(choice);
    assert.equal(config.tubeMaterial, entry === "black-ptfe" ? "PTFE" : entry.toUpperCase());
    assert.equal(config.a.fittingModel, choice.a.fittingModel);
    assert.equal(config.b.fittingModel, choice.b.fittingModel);
    assert.ok(config.a.cadUrl && config.a.accessoryCadUrl, `${entry}: the actual default parts must be warmed`);
    assert.deepEqual(assemblyPreviewConfig({ ...choice, length: "1500", textA: "Customer label", company: "Company" }), config,
      "annotations and customer fields must not invalidate the CAD cache key");
  }
});

test("CAD warm-up starts bodies/accessories together, deduplicates both ends and retries failed sources", async () => {
  const moduleUrl = pathToFileURL(`${process.cwd()}/public/models/products/tubing-assemblies/flanged-assembly-renderer.mjs`).href;
  const { preloadFlangedAssembly } = await import(moduleUrl);
  const config = assemblyPreviewConfig(defaultAssemblyChoice("flanged-tubing-fep"));
  const fixture = readFileSync(`public${config.a.cadUrl}`);
  const originalFetch = globalThis.fetch, requests: string[] = [];
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  let failure = true;
  globalThis.fetch = (async input => {
    const url = String(input); requests.push(url);
    if (url.endsWith("retry") && failure) return new Response("unavailable", { status: 503 });
    await gate;
    return new Response(fixture, { status: 200 });
  }) as typeof fetch;
  try {
    const body = "/preview-loading-test/body", accessory = "/preview-loading-test/accessory";
    const selected = { ...config, mode: "double", a: { ...config.a, cadUrl: body, accessoryCadUrl: accessory }, b: { ...config.b, cadUrl: body, accessoryCadUrl: accessory } };
    const first = preloadFlangedAssembly(selected), concurrent = preloadFlangedAssembly(selected);
    assert.deepEqual(requests, [body, accessory], "accessory fetch must begin before the blocked body finishes; A/B and concurrent warm-ups share requests");
    release(); await Promise.all([first, concurrent]);
    await preloadFlangedAssembly(selected);
    assert.equal(requests.length, 2, "decoded sources are reused on subsequent selection");
    const retry = { ...selected, mode: "single", a: { ...selected.a, cadUrl: "/preview-loading-test/retry", accessoryCadUrl: undefined } };
    await assert.rejects(preloadFlangedAssembly(retry), /unavailable/);
    failure = false; await preloadFlangedAssembly(retry);
    assert.equal(requests.filter(url => url.endsWith("retry")).length, 2, "a failed response must not poison the shared cache");
    await preloadFlangedAssembly({ ...selected, mode: "single", a: { ...selected.a, enabled: false } });
    assert.equal(requests.length, 4, "disabled/incompatible ends must not be prefetched");
  } finally { globalThis.fetch = originalFetch; release(); }
});

test("loading, updating and recoverable errors are localized in all six languages", () => {
  for (const locale of ["zh", "en", "es", "fr", "ko", "ru"]) {
    for (const key of ["正在加载组件预览…", "正在更新预览…", "预览更新失败，仍显示上次预览。", "预览暂时无法加载。", "重试"]) {
      const text = assemblyText(key, locale);
      assert.ok(text);
      if (locale !== "zh") assert.ok(!/\p{Script=Han}/u.test(text), `${locale}: ${key}`);
    }
  }
});
