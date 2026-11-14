import assert from "node:assert/strict";
import { assemblyFamilies, assemblyFittingAccessories, assemblyTubes, compatibleAssemblyFittings, getAssemblyFitting } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyRingSpecifications } from "../../data/products/configurator/tubing-assembly-ring-specifications";
import { assemblySizeError, defaultFlangedTubingChoice, flangedTubingBom, normalizeFlangedChoice, reconcileAssemblyEnd, selectAssemblyConnection, selectAssemblyFitting, validateFlangedChoice, type FlangedEnd } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { createFlangedConfigurationCartItem, flangedConfigurationValidationError } from "../../data/products/configurator/flanged-tubing-cart";
import { tubingAssembly3dConfig } from "../../data/products/configurator/tubing-assembly-3d";
import { assemblyExteriorPreviewAsset, assemblyPreviewAsset } from "../../data/products/configurator/tubing-assembly-preview";
import { assemblyText } from "../../data/products/configurator/tubing-assembly.intl";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";

assert.ok(!assemblyFamilies("翻边").includes("HSF6"));
assert.ok(assemblyFamilies("卡环").includes("HSF6"));
const attachment = { key:"cached", name:"previous.pdf", size:10, pageCount:2, sha256:"a".repeat(64) };
let combinations = 0;
for (const specification of assemblyRingSpecifications) for (const outer of specification.outerDiameters) {
  const fitting = getAssemblyFitting(specification.model)!;
  assert.deepEqual(fitting.connections,["卡环"]);
  assert.ok(!compatibleAssemblyFittings(outer,{connection:"翻边"}).some(f=>f.model===fitting.model));
  assert.deepEqual(assemblyFittingAccessories(fitting,"翻边",outer),[]);
  const tube = assemblyTubes.find(t=>t.material==="PTFE" && t.outer===outer)!;
  const base = defaultFlangedTubingChoice();
  const ring = selectAssemblyFitting({...base.a,connection:"卡环"},fitting.model,outer);
  const kit = assemblyFittingAccessories(fitting,"卡环",outer).find(a=>a.productCode===ring.accessoryCode)!;
  assert.equal(kit.model,`CL-1S-${outer*10}`);
  assert.deepEqual(assemblyFittingAccessories({...fitting,accessories:[{...kit,productCodePending:true}]},"卡环",outer),[],"unconfirmed product codes cannot be offered as verified hardware");
  const flange = selectAssemblyConnection(ring,"翻边",outer);
  assert.equal(flange.connection,"翻边");
  assert.equal(flange.series,"HFL");
  const valid = {...base,tubeModel:tube.key,length:"500",a:ring,b:flange};
  assert.equal(validateFlangedChoice(valid),null);
  const saved = saveFlangedConfiguration(emptyFlangedConfigurationStore(),valid,"配套核验",null);
  assert.match(flangedTubingBom(valid).find(row=>row.part==="A 端卡环组件")!.specification,/CL-1S-.*SUS.*PEEK/);
  assert.equal(tubingAssembly3dConfig(valid).a.accessoryModel,kit.model);
  assert.ok(buildFlangedDrawingSheets(saved.record).join("").includes(kit.model));
  for (const side of ["a","b"] as const) {
    const invalidEnd: FlangedEnd = {...ring,connection:"翻边",accessoryCode:`WSS-${outer*10}`,washer:"SUS"};
    const invalid = {...valid,[side]:invalidEnd};
    const record = {...saved.record,choice:invalid};
    const before = JSON.stringify(record);
    assert.deepEqual(normalizeFlangedChoice(invalid)[side],invalidEnd,"normalization must not turn a historical flange request into a ring assembly");
    assert.deepEqual(reconcileAssemblyEnd(invalidEnd,outer),invalidEnd,"opening a historical mismatch must not choose replacement hardware");
    const message = validateFlangedChoice(invalid)!;
    assert.ok(message.includes(fitting.model) && message.includes("翻边"));
    assert.equal(assemblySizeError(invalid),message);
    assert.equal(assemblyPreviewAsset(invalidEnd,outer),null);
    assert.equal(assemblyExteriorPreviewAsset(invalidEnd,outer),null);
    const restored = parseFlangedConfigurationStore(JSON.stringify({...saved.store,configurations:[record]}));
    assert.deepEqual(restored.configurations[0].choice,invalid,"historical records remain editable without overwriting their original data");
    assert.throws(()=>saveFlangedConfiguration(restored,invalid,record.name,record.id),/暂无翻边/);
    assert.throws(()=>buildFlangedDrawingSheets(record),/暂无翻边/);
    assert.throws(()=>tubingAssembly3dConfig(invalid),/暂无翻边/);
    assert.throws(()=>createFlangedConfigurationCartItem(record,attachment),/暂无翻边/);
    for (const locale of ["en","es","fr","ko","ru"]) {
      assert.ok(!/\p{Script=Han}/u.test(assemblyText(message,locale)),`${locale}: translate the complete compatibility error`);
      assert.ok(!/\p{Script=Han}/u.test(flangedConfigurationValidationError([record],locale)!.replace(record.name,"")),`${locale}: localize saved/cart validation`);
    }
    assert.equal(JSON.stringify(record),before,"validation and output rejection must leave saved records untouched");
    const corrected = {...invalid,[side]:selectAssemblyConnection(invalidEnd,"卡环",outer)};
    assert.equal(corrected[side].fittingModel,fitting.model);
    assert.equal(corrected[side].accessoryCode,kit.productCode);
    assert.equal(validateFlangedChoice(corrected),null);
    assert.doesNotThrow(()=>saveFlangedConfiguration(restored,corrected,record.name,record.id));
    combinations++;
  }
  const wrongKit = {...valid,a:{...ring,accessoryCode:"WSS-16"}};
  assert.equal(normalizeFlangedChoice(wrongKit).a.accessoryCode,"WSS-16");
  assert.match(validateFlangedChoice(wrongKit)!,/卡环套件/);
  assert.throws(()=>saveFlangedConfiguration(emptyFlangedConfigurationStore(),wrongKit,"错误配件",null));
}
console.log(`PASS: ${combinations} historical HSF6/flange mismatches rejected on both ends, preserved for editing, corrected explicitly, with verified kits and localized save/drawing/3D/cart checks.`);
