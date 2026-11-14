import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import supplementalCad from "../../data/products/configurator/tubing-assembly-cad-imports.json";
import supplementalSources from "../../data/products/configurator/tubing-assembly-cad-sources.json";
import { assemblyFittings, assemblyTubes, assemblyTubeMaterials, assemblyTubeSizeKey, assemblyTubeSizes, compatibleAssemblyFittings, getAssemblyFitting, getAssemblyTube, selectAssemblyTubeAttribute, selectAssemblyTubeSize } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyVectorPaths, getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";
import { assemblyCompatibilityWarnings, assemblySizeError, assemblyVerifiedTubeMaterials, assemblyEndFinishes, assemblyEndFinishLabel, defaultAssemblyChoice, defaultFlangedTubingChoice, endConnection, flangedTubingBom, normalizeFlangedChoice, reconcileAssemblyEnd, resolveAssemblyEndAlias, selectAssemblyConnection, selectAssemblyEndAttribute, selectAssemblyEndFinish, selectAssemblyFitting, validateFlangedChoice } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { createFlangedConfigurationCartItem, flangedConfigurationValidationError } from "../../data/products/configurator/flanged-tubing-cart";

assert.equal(assemblyTubes.length, 83);
assert.equal(new Set(assemblyTubes.map(t => t.key)).size, 83, "unique variant keys must preserve PTFE rows sharing a model or product code");
assert.equal(assemblyFittings.length, 145);
assert.equal(Object.keys(supplementalCad).length,37);
for (const [key, geometry] of Object.entries(supplementalCad)) {
  assert.ok(geometry.model3dUrl.includes(key.toLowerCase()));
  assert.equal(geometry.sourcePart,supplementalSources[key as keyof typeof supplementalSources].sourcePart);
  assert.match(geometry.sourceSha256,/^[a-f\d]{64}$/);
  assert.ok(existsSync(resolve(process.cwd(),"public",geometry.model3dUrl.slice(1))));
}
assert.deepEqual(assemblyFittings.filter(f=>!f.cadUrl).map(f=>f.model).sort(),["HNE-U28-32-PP-N","HSF6-U28-32-PK-N"].sort(),"only actual source gaps may show the missing preview notice");
assert.equal(assemblyFittings.filter(f => f.connection === "翻边").length, 70);
assert.equal(assemblyFittings.filter(f => f.connection === "卡箍").length, 66);
assert.equal(assemblyFittings.filter(f => f.connection === "卡环").length, 9);
for (const f of assemblyFittings.filter(f => f.connection !== "卡箍")) assert.ok(getAssemblyFittingVector(f.model), `${f.model} must have its own PDF/CAD vector source`);
assert.match(getAssemblyFitting("HF6-U28-20-PK-N")!.cadUrl!, /assembly-hf6-u28-20/, "U28 must use its exact STEP instead of provisional M6 CAD");
assert.match(getAssemblyFittingVector("HF6-U28-20-PK-N")!.source, /00750/);
assert.match(getAssemblyFittingVector("HN-U28-32-PK-N")!.source, /assembly-hn-u28-32/, "new CAD projection must use the matching family, thread and bore");
assert.equal(defaultAssemblyChoice("flanged-tubing-fep").a.series, "HFL");
assert.equal(endConnection(defaultAssemblyChoice("ferrule-kits-fep").a), "卡箍");
assert.equal(endConnection(defaultAssemblyChoice("retaining-ring-kits-pfa").a), "卡环");
assert.equal(defaultAssemblyChoice("retaining-ring-kits-pfa").a.series, "HSF6");
assert.equal(getAssemblyTube(defaultAssemblyChoice("retaining-ring-kits-pfa").tubeModel)?.material, "PFA", "published PFA assembly pages must keep their own tube material");
// Existing saved ring choices had no accessory code. Reopening must resolve
// the exact tube-sized kit without changing their selected fitting or finish.
const oldRingChoice = defaultAssemblyChoice("retaining-ring-kits-pfa");
oldRingChoice.a.accessoryCode = "";
const restoredRing = normalizeFlangedChoice(oldRingChoice);
assert.equal(restoredRing.a.fittingModel, oldRingChoice.a.fittingModel);
assert.equal(restoredRing.a.accessoryCode, "809801");
assert.match(flangedTubingBom(restoredRing).find(row=>row.part==="A 端卡环组件")!.specification,/CL-1S-16.*SUS.*PEEK/);
for (const [outer,code] of [[2,"809802"],[2.5,"809803"],[3,"809804"],[3.2,"809805"]] as const) {
  const end = selectAssemblyFitting(restoredRing.a,"HSF6-U28-32-PK-N",outer);
  assert.equal(end.accessoryCode,code,"changing OD selects a different exact kit rather than resizing one mesh");
  assert.equal(reconcileAssemblyEnd(end,1.6).accessoryCode,"809801");
}
assert.ok(getAssemblyTube(defaultAssemblyChoice("ferrule-kits-black-ptfe").tubeModel)?.color === "黑色");

// Fixed size pairs plus color/hardness must reach every published row without
// inventing a diameter combination or merging distinct material codes.
for (const target of assemblyTubes) {
  let selected = selectAssemblyTubeAttribute(assemblyTubes[0], "material", target.material)!;
  assert.ok(assemblyTubeSizes(target.material).includes(assemblyTubeSizeKey(target)));
  selected = selectAssemblyTubeSize(selected,assemblyTubeSizeKey(target))!;
  for (const key of ["color", "hardness"] as const) {
    selected = selectAssemblyTubeAttribute(selected, key, String(target[key]))!;
    assert.ok(selected, `${target.key}: ${key} must remain reachable`);
    assert.ok(assemblyTubes.includes(selected));
  }
  assert.deepEqual([selected.material, selected.outer, selected.inner, selected.color, selected.hardness], [target.material, target.outer, target.inner, target.color, target.hardness]);
  assert.ok(assemblyTubes.filter(t => t.material === selected.material && t.outer === selected.outer && t.inner === selected.inner && t.color === selected.color && t.hardness === selected.hardness).some(t => t.key === target.key));
}
for (const material of assemblyTubeMaterials) assert.deepEqual(new Set(assemblyTubeSizes(material)),new Set(assemblyTubes.filter(t=>t.material===material).map(assemblyTubeSizeKey)));
assert.ok(assemblyTubeSizes("FEP").includes("1.6 × 0.8"));
assert.equal(selectAssemblyTubeSize(assemblyTubes[0],"1.6 × 1.5"),undefined,"unpublished OD/ID pairs cannot be selected");
const duplicateTube = assemblyTubes.find(t=>t.code==="436137")!;
assert.equal(selectAssemblyTubeSize(duplicateTube,assemblyTubeSizeKey(duplicateTube))?.key,duplicateTube.key,"reselecting a fixed size must preserve the exact material code");
assert.equal(selectAssemblyTubeAttribute(assemblyTubes[0], "outer", "999"), undefined);
assert.equal(selectAssemblyTubeAttribute(assemblyTubes[0], "inner", "999"), undefined);
assert.deepEqual(assemblyTubes.filter(t=>t.model === "TH2-PTFE-N-16-32-100M").map(t=>t.code).sort(), ["436137", "439136"]);

for (const material of assemblyVerifiedTubeMaterials) for (const ca of ["翻边", "卡箍", "卡环"] as const) for (const cb of ["翻边", "卡箍", "卡环"] as const) {
  const tube = assemblyTubes.find(t => t.material === material && t.outer === 1.6) || assemblyTubes.find(t => t.material === material && t.outer === 3.2)!, value = { ...defaultFlangedTubingChoice(), tubeModel: tube.key, length: "625", tolerance: "2" };
  value.a = selectAssemblyConnection(value.a, ca, tube.outer); value.b = selectAssemblyConnection(value.b, cb, tube.outer);
  const {record,store} = saveFlangedConfiguration(emptyFlangedConfigurationStore(), value, "混搭验证", null);
  const restored = parseFlangedConfigurationStore(JSON.stringify(store)).configurations[0];
  assert.equal(endConnection(restored.choice.a), ca); assert.equal(endConnection(restored.choice.b), cb);
  assert.equal(restored.choice.tubeModel, tube.key);
  const sheets = buildFlangedDrawingSheets(record).join("");
  assert.ok(sheets.includes(material)); assert.ok(sheets.includes("625"));
  assert.ok(!/<image\b|<foreignObject\b|<canvas\b|data:image/.test(sheets));
  assert.ok(!/NaN|undefined/.test(sheets));
  const bom = flangedTubingBom(restored.choice);
  if (ca === "卡箍") assert.ok(bom.some(r=>r.part === "A 端卡箍"));
  if (ca === "卡环") assert.ok(bom.some(r=>r.part === "A 端卡环组件"));
  if (ca !== "翻边") assert.ok(!bom.some(r=>r.part === "A 端垫片"));
}
const value = { ...defaultFlangedTubingChoice(), length: "900" };
value.a = selectAssemblyFitting(value.a, "HF-M6-20-PV-N", 1.6);
value.b = selectAssemblyConnection(value.b, "卡环", 1.6);
assert.equal(value.a.material, "PVDF");
assert.equal(normalizeFlangedChoice({...value,a:{...value.a,material:"arbitrary"}}).a.material,"PVDF");
const profile = getAssemblyFittingVector(value.a.fittingModel)!;
assert.ok(assemblyVectorPaths(profile,280,520,180,80,true).every(d => !d.includes("NaN")));
const mismatch = { ...value, tubeModel: assemblyTubes.find(t => t.material === "PTFE" && t.outer > 3.2)!.key };
assert.ok(assemblyCompatibilityWarnings(mismatch).some(w => /不适配|必须/.test(w)));
assert.match(validateFlangedChoice(mismatch)!, /OD/);
const single = { ...value, mode: "single" as const };
const record = saveFlangedConfiguration(emptyFlangedConfigurationStore(),single,"单端混搭",null).record;
assert.ok(!flangedTubingBom(record.choice).some(r => r.part === "B 端接头"));
assert.deepEqual(record.choice.b, defaultFlangedTubingChoice().b, "hidden B assembly resets to defaults instead of leaking the previous ring selection");
const item = createFlangedConfigurationCartItem(record,{key:"qa",name:"qa.pdf",size:10,pageCount:2,sha256:"a".repeat(64)});
assert.equal(item.productName,"FEP 定制管组件");
assert.equal(item.flangedConfiguration?.choice.a.fittingModel,"HF-M6-20-PV-N");

// Every size/connection query is constrained by the actual catalog OD list.
for (const tube of assemblyTubes) for (const connection of ["翻边", "卡箍", "卡环"] as const) {
  const fits = compatibleAssemblyFittings(tube.outer, { connection });
  assert.ok(fits.every(f => f.connections.includes(connection) && f.outerDiameters.includes(tube.outer)));
  const end = selectAssemblyConnection(defaultFlangedTubingChoice().a, connection, tube.outer);
  if (end.fittingModel && !assemblyVerifiedTubeMaterials.some(m=>m===tube.material)) {
    assert.match(assemblySizeError({ ...defaultFlangedTubingChoice(), mode:"single", tubeModel:tube.key, a:end })!,/管材/);
  } else if (end.fittingModel) {
    assert.ok(getAssemblyFitting(end.fittingModel)!.outerDiameters.includes(tube.outer));
    assert.equal(assemblySizeError({ ...defaultFlangedTubingChoice(), mode:"single", tubeModel:tube.key, a:end }), null);
  } else if (!fits.length && connection !== "翻边") assert.equal(end.series, "");
}
for (const fitting of assemblyFittings) for (const outer of fitting.outerDiameters) {
  const tube = assemblyTubes.find(t => t.outer === outer);
  // Some ring fittings have a catalog OD (1.8 mm) with no published tube row.
  // Keep these catalog entries, but never offer them for a different tube OD.
  if (!tube) continue;
  let end = selectAssemblyConnection(defaultFlangedTubingChoice().a, fitting.connection, outer);
  for (const key of ["series", "thread", "material", "color"] as const) {
    end = selectAssemblyEndAttribute(end, key, key === "series" ? fitting.family : fitting[key], outer);
  }
  assert.equal(end.fittingModel, fitting.model, `${fitting.model}: separated selectors must reach the exact SKU at OD ${outer}`);
  assert.equal(assemblySizeError({ ...defaultFlangedTubingChoice(), mode:"single", tubeModel:tube.key, a:end }), null);
  let combined = selectAssemblyConnection(defaultFlangedTubingChoice().a, fitting.connection, outer);
  combined = selectAssemblyEndAttribute(combined, "series", fitting.family, outer);
  combined = selectAssemblyEndAttribute(combined, "thread", fitting.thread, outer);
  const finishes = assemblyEndFinishes(combined, outer);
  assert.ok(finishes.some(finish => finish.material === fitting.material && finish.color === fitting.color));
  combined = selectAssemblyEndFinish(combined, fitting, outer);
  assert.equal(combined.fittingModel, fitting.model, `${fitting.model}: the combined finish selector must reach the exact SKU`);
  assert.equal(combined.thread, fitting.thread, "a finish change cannot change the mating thread");
  assert.equal(assemblySizeError({ ...defaultFlangedTubingChoice(), mode:"single", tubeModel:tube.key, a:combined }), null);
}
assert.equal(assemblyEndFinishLabel({material:"PVDF",color:"本色"}),"PVDF（白色）");
assert.equal(assemblyEndFinishLabel({material:"PPS",color:"黑色"}),"PPS（黑色）");
assert.equal(assemblyEndFinishLabel({material:"PEEK",color:"本色"}),"PEEK（本色）","natural PEEK must not be called white");
const drawingFL = {...defaultFlangedTubingChoice().a,series:"FL",fittingModel:undefined,accessoryCode:undefined,material:"",color:"黑色"};
assert.deepEqual(assemblyEndFinishes(drawingFL,1.6),[{material:"PVDF",color:"本色"},{material:"PVDF",color:"黑色"}]);
assert.equal(resolveAssemblyEndAlias(drawingFL,1.6).fittingModel,"HFL-U28-16-PV-B");
assert.equal(resolveAssemblyEndAlias(drawingFL,2).fittingModel,"HFL-U28-20-PV-B");
const drawingFL6 = {...drawingFL,series:"FL6",material:"PPS"};
assert.equal(assemblyEndFinishes(drawingFL6,1.6).length,2);
assert.equal(selectAssemblyEndFinish(drawingFL6,{material:"PPS",color:"蓝色"},1.6).fittingModel,"HFL6-U28-16-PS-U");
assert.equal(selectAssemblyEndFinish(drawingFL6,{material:"POM",color:"黑色"},1.6).fittingModel,"","abbreviated names must use catalog finishes, not old PDF option lists");
assert.equal(resolveAssemblyEndAlias({...drawingFL6,material:"POM"},1.6).material,"POM","retain unavailable historical finishes for repair");
assert.equal(resolveAssemblyEndAlias({...drawingFL6,material:"POM"},1.6).fittingModel,"");
assert.deepEqual(assemblyEndFinishes(drawingFL6,25.4),[]);
// Separate upstream selectors resolve a real SKU, not a synthetic combination.
let staged = selectAssemblyEndAttribute(defaultFlangedTubingChoice().a,"series","HF",1.6);
staged = selectAssemblyEndAttribute(staged,"thread","M6×1",1.6);
staged = selectAssemblyEndAttribute(staged,"material","PPS",1.6);
assert.equal(staged.fittingModel,"HF-M6-20-PS-B");
assert.equal(staged.color,"黑色");
assert.equal(selectAssemblyEndFinish(staged,{material:"PPS",color:"本色"},1.6).fittingModel,"","a combined selector cannot create an unpublished finish");
assert.equal(selectAssemblyEndAttribute(staged,"color","本色",1.6).fittingModel, "", "a nonexistent PPS/natural combination cannot resolve to another SKU");
assert.equal(selectAssemblyFitting(staged,"HF-M6-32-PV-N",1.6).fittingModel,"", "direct model selection cannot bypass the size filter");
const resized = reconcileAssemblyEnd(staged,2.5);
assert.equal(resized.fittingModel,"HF-M6-25-PS-B");
assert.equal(resized.thread,staged.thread); assert.equal(resized.material,staged.material);
const micro = selectAssemblyFitting(staged,"HFL6-U40-16-PK-N",1.6);
const resizedMicro = reconcileAssemblyEnd(micro,3.2);
assert.equal(resizedMicro.fittingModel,""); assert.equal(resizedMicro.thread,"", "changing tube size must not silently change a 6-40 mating port to M6/U28");
assert.equal(reconcileAssemblyEnd(staged,25.4).fittingModel,"");

// Historical mismatches remain readable, but cannot be saved, drawn or re-added.
const original = saveFlangedConfiguration(emptyFlangedConfigurationStore(),value,"历史配置",null).record;
const badRecord = { ...original, choice:{...original.choice,tubeModel:"BFT03008"} };
const historical = parseFlangedConfigurationStore(JSON.stringify({version:1,nextNumber:2,activeId:badRecord.id,configurations:[badRecord]}));
assert.equal(historical.configurations[0].choice.a.fittingModel,value.a.fittingModel);
assert.match(flangedConfigurationValidationError(historical.configurations)!, /OD 2.5/);
assert.throws(()=>saveFlangedConfiguration(historical,badRecord.choice,badRecord.name,badRecord.id), /OD 2.5/);
assert.throws(()=>buildFlangedDrawingSheets(badRecord), /OD 2.5/);
assert.throws(()=>createFlangedConfigurationCartItem(badRecord,{key:"cached",name:"old.pdf",size:10,pageCount:2,sha256:"a".repeat(64)}), /OD 2.5/);
const wrongWasher = { ...value, mode:"single" as const, tubeModel:"BFT03007" };
assert.match(assemblySizeError(wrongWasher)!, /OD 2.*垫片/);
assert.equal(assemblySizeError({...wrongWasher,a:reconcileAssemblyEnd(value.a,2)}),null, "changing a supported tube OD must also change the washer bore");
const noSize = { ...value, tubeModel:assemblyTubes.find(t=>t.material==="PTFE"&&t.outer>3.2)!.key };
assert.throws(()=>saveFlangedConfiguration(emptyFlangedConfigurationStore(),noSize,"无配套",null),/OD/);
console.log("PASS: 83 tubes x 3 connection size filters; independent attributes; 27 verified-material mixed combinations; thread-preserving resize; historical mismatch retention and save/PDF/cart blocking.");
