import assert from "node:assert/strict";
import { test } from "node:test";
import { defaultAssemblyChoice } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { flangedWorkspaceRequest, readFlangedWorkspace } from "../../data/products/configurator/flanged-tubing-workspace-state";
import { assemblyText } from "../../data/products/configurator/tubing-assembly.intl";

const locales = ["zh", "en", "es", "fr", "ko", "ru"];
const entries = ["flanged-tubing", "ferrule-kits", "retaining-ring-kits"]
  .flatMap(family => [family, ...["fep", "ptfe", "pfa", "black-ptfe"].map(material => `${family}-${material}`)]);
const now = "2026-11-14T01:00:00Z";
function saved(entry: string) {
  const first = saveFlangedConfiguration(emptyFlangedConfigurationStore(), { ...defaultAssemblyChoice(entry), length: "1500" }, "Customer saved A", null, now, "saved-a", ["2d", "3d"]);
  return saveFlangedConfiguration(first.store, { ...first.record.choice, length: "1600", textA: "Customer mark" }, first.record.name, first.record.id, now, "unused");
}

test("initial reading preserves existing IDs, revisions, names, drawing choices and numbering", () => {
  const existing = saved("flanged-tubing-fep");
  const raw = JSON.stringify(existing.store);
  let reads = 0;
  const loaded = readFlangedWorkspace(() => { reads++; return raw; });
  assert.equal(reads, 1);
  assert.equal(loaded.error, "");
  assert.equal(JSON.stringify(loaded.store), raw);
  assert.equal(loaded.store.configurations[0].revision, 2);
  assert.deepEqual(loaded.store.configurations[0].drawingTypes, ["2d", "3d"]);
  const request = flangedWorkspaceRequest(loaded.store, "flanged-tubing-fep", false, "zh");
  assert.equal(request.editor?.record, null);
  assert.equal(request.editor?.name, "配置 2");
  assert.equal(JSON.stringify(loaded.store), raw);
});

test("invalid or inaccessible storage is reported without replacing the saved bytes", () => {
  const raw = '{"version":1,"customer-record":"do not overwrite"}';
  const loaded = readFlangedWorkspace(() => raw);
  assert.equal(raw, '{"version":1,"customer-record":"do not overwrite"}');
  assert.deepEqual(loaded.store, emptyFlangedConfigurationStore());
  assert.match(loaded.error, /原数据未被覆盖/);
  const blocked = readFlangedWorkspace(() => { throw new Error("Storage access denied"); });
  assert.equal(blocked.error, loaded.error);
  assert.deepEqual(readFlangedWorkspace(() => null), { store: emptyFlangedConfigurationStore(), error: "" });
});

test("all 15 entries and six languages share new/configured drawing request behavior", () => {
  for (const entry of entries) for (const locale of locales) {
    const { store, record } = saved(entry);
    const before = JSON.stringify(store);
    const drawing = flangedWorkspaceRequest(store, entry, true, locale);
    assert.equal(drawing.editor, null, `${locale}:${entry}`);
    assert.equal(drawing.drawing, record);
    const create = flangedWorkspaceRequest(store, entry, false, locale);
    assert.equal(create.drawing, null);
    assert.equal(create.editor?.record, null);
    assert.deepEqual(create.editor?.choice, defaultAssemblyChoice(entry));
    assert.equal(create.editor?.name, `${assemblyText("配置", locale)} 2`);
    assert.equal(JSON.stringify(store), before, "opening must not mutate the saved snapshot");
  }
});

test("a page drawing request never reuses another material or connection family's active record", () => {
  const { store } = saved("flanged-tubing-fep");
  for (const entry of ["flanged-tubing-ptfe", "flanged-tubing-black-ptfe", "ferrule-kits-fep", "retaining-ring-kits-fep"]) {
    const request = flangedWorkspaceRequest(store, entry, true, "en");
    assert.equal(request.drawing, null);
    assert.equal(request.editor?.record, null);
    assert.deepEqual(request.editor?.choice, defaultAssemblyChoice(entry));
  }
});
