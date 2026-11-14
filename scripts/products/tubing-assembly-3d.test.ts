import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";
import { Box3, Vector3, type Object3D, type Mesh, type MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { decodeCompactCad } from "./solenoid-viewer/compact-cad.js";
import { tubingAssembly3dConfig } from "../../data/products/configurator/tubing-assembly-3d";
import { assemblyFittings, assemblyFittingAccessories, assemblyTubes } from "../../data/products/configurator/tubing-assembly-catalog";
import { defaultFlangedTubingChoice, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";

async function review() {
  const { createTubingAssemblyModel, prepareTubingAssemblyExport, disposeTubingAssembly, DISPLAY_TUBE_LENGTH_MM } = await import(pathToFileURL(`${process.cwd()}/public/models/products/tubing-assemblies/interactive/model-core.mjs`).href);
  const cadCache = new Map<string, ReturnType<typeof decodeCompactCad>>();
  const load = async (url: string) => { if (!cadCache.has(url)) cadCache.set(url, decodeCompactCad(gunzipSync(readFileSync(`public${url}`)))); return cadCache.get(url)!; };
  const size = (object: Object3D) => new Box3().setFromObject(object).getSize(new Vector3());
  const choice = defaultFlangedTubingChoice(); choice.length = "500";
  choice.a = selectAssemblyFitting({ ...choice.a, connection: "卡环" }, "HSF6-U28-16-PK-N", 1.6);
  choice.b = selectAssemblyFitting({ ...choice.b, connection: "卡环" }, "HSF6-M6-16-PS-B", 1.6);
  choice.company = "must-not-enter-3d"; choice.contact = "must-not-enter-3d";
  const config = tubingAssembly3dConfig(choice), model = await createTubingAssemblyModel(config, load);
  assert.equal(model.missing.length, 0);
  assert.ok(!JSON.stringify(config).includes("must-not-enter-3d"));
  const tube = model.root.getObjectByName("assembly-tube-body");
  assert.ok(Math.abs(size(tube).y - 1.6) < .00001, "tube OD must be 1.6 real millimetres");
  assert.ok(Math.abs(size(tube).z - 1.6) < .00001);
  assert.ok(Math.abs(size(tube).x - DISPLAY_TUBE_LENGTH_MM) < .00001);
  const a = model.root.children.find((c: Object3D) => c.userData.role === "a-body");
  const b = model.root.children.find((c: Object3D) => c.userData.role === "b-body");
  assert.ok(Math.abs(size(a).x - 15.5) < .00001, "PEEK body uses its own 15.5 mm drawing");
  assert.ok(Math.abs(size(a).y - 6.4) < .0001);
  assert.ok(Math.abs(size(b).x - 20) < .00001, "PPS body remains 20 mm at the same scale");
  assert.ok(Math.abs(size(b).y - 6) < .00001);
  for (const part of model.root.children.filter((c: Object3D) => c.userData.kind === "accessory")) {
    const measured = size(part); assert.ok(Math.abs(measured.x - 4.1) < .01); assert.ok(Math.abs(measured.y - 4.6) < .001);
  }
  const long = await createTubingAssemblyModel(tubingAssembly3dConfig({ ...choice, length: "1500" }), load);
  assert.ok(Math.abs(size(long.root).x - size(model.root).x) < .00001, "requested L never stretches parts or tube geometry");
  assert.equal(long.root.userData.specifiedLength, "1500");
  const output = prepareTubingAssemblyExport(model.root);
  assert.ok(Math.abs(size(output).x * 1000 - size(model.root).x) < .00001, "GLB metre units preserve millimetre physical sizes");
  assert.equal(output.userData.units, "meter"); assert.equal(output.userData.specifiedLength, "500");
  assert.equal(output.userData.tubeLengthIsDiagrammatic, true);
  const thickTube = assemblyTubes.find(t => t.material === "PTFE" && t.outer === 3.2)!;
  const thickChoice = { ...choice, tubeModel: thickTube.key, a: selectAssemblyFitting(choice.a, "HSF6-U28-32-PS-B", 3.2), b: selectAssemblyFitting(choice.b, "HSF6-M6-32-PS-B", 3.2) };
  const thick = await createTubingAssemblyModel(tubingAssembly3dConfig(thickChoice), load);
  assert.ok(Math.abs(size(thick.root.getObjectByName("assembly-tube-body")).y - 3.2) < .0001);
  const absentChoice = { ...thickChoice, a: selectAssemblyFitting(thickChoice.a, "HSF6-U28-32-PK-N", 3.2) };
  const absent = await createTubingAssemblyModel(tubingAssembly3dConfig(absentChoice), load);
  assert.equal(absent.missing.find((p: { kind: string }) => p.kind === "body")?.model, "HSF6-U28-32-PK-N");
  assert.ok(!absent.root.children.some((c: Object3D) => c.userData.role === "a-body"), "missing HSF6 stays empty");
  const single = await createTubingAssemblyModel(tubingAssembly3dConfig({ ...choice, mode: "single" }), load);
  assert.ok(!single.root.children.some((c: Object3D) => c.userData.side === "b"));
  for (const item of [model, long, thick, absent, single]) disposeTubingAssembly(item.root);
  console.log("PASS: actual OD and exact CAD millimetres, 15.5/20 mm finishes, fixed display tube length, GLB metre conversion, missing HSF6 gaps, single ends, and customer-data isolation.");
  let combinations = 0, complete = 0;
  const missingModels = new Set<string>();
  for (const fitting of assemblyFittings) for (const outer of fitting.outerDiameters) for (const connection of fitting.connections) {
    const compatibleTube = assemblyTubes.find(tube => ["FEP", "PTFE"].includes(tube.material) && tube.outer === outer);
    if (!compatibleTube || !assemblyFittingAccessories(fitting, connection, outer).length) continue;
    const end = selectAssemblyFitting({ ...choice.a, connection }, fitting.model, outer);
    const item = await createTubingAssemblyModel(tubingAssembly3dConfig({ ...choice, mode: "single", tubeModel: compatibleTube.key, a: end }), load);
    combinations++; if (!item.missing.length) complete++;
    for (const part of item.missing) { missingModels.add(part.model); assert.ok(!item.root.children.some((object: Object3D) => object.userData.role === `${part.side}-${part.kind}`)); }
    for (const part of item.root.children.filter((object: Object3D) => object.userData.geometryKind === "exact-cad")) assert.ok(size(part).length() > 0, `${part.name} must have actual geometry`);
    assert.ok(Math.abs(size(item.root.getObjectByName("assembly-tube-body")).y - outer) < .0001);
    disposeTubingAssembly(item.root);
  }
  console.log(`PASS: ${combinations} fitting/connection/OD combinations; ${complete} complete; unavailable exact sources left empty: ${[...missingModels].join(", ")}.`);
  if (process.argv[2]) {
    const file = readFileSync(process.argv[2]);
    assert.equal(file.toString("utf8", 0, 4), "glTF"); assert.equal(file.readUInt32LE(4), 2);
    const exported = await new GLTFLoader().parseAsync(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength), "");
    exported.scene.updateMatrixWorld(true);
    let assembly: Object3D | undefined;
    exported.scene.traverse(object => { if (object.userData.tubeLengthIsDiagrammatic) assembly = object; });
    assert.ok(assembly, "downloaded GLB must retain assembly dimensions");
    assert.equal(assembly.userData.units, "meter"); assert.equal(assembly.userData.dimensionalMetadataUnits, "millimeter");
    const outer = assembly.userData.tubeOuterDiameter, tubeBody = assembly.getObjectByName("assembly-tube-body")!;
    const tubeSize = size(tubeBody).multiplyScalar(1000);
    assert.ok(Math.abs(tubeSize.y - outer) < .0001); assert.ok(Math.abs(tubeSize.z - outer) < .0001);
    assert.ok(Math.abs(tubeSize.x - DISPLAY_TUBE_LENGTH_MM) < .0001);
    assert.ok(assembly.children.some(part => part.userData.role === "a-body"));
    assert.ok(assembly.children.some(part => part.userData.role === "b-body"));
    for (const part of assembly.children.filter(part => part.userData.geometryKind === "exact-cad")) {
      const source = await load(part.userData.source);
      const axes = [[], [], []] as number[][];
      for (const mesh of source.meshes) mesh.attributes.position.array.forEach((value: number, index: number) => axes[index % 3].push(value));
      const originalSize = axes.map(values => values.reduce((a, b) => Math.max(a, b), -Infinity) - values.reduce((a, b) => Math.min(a, b), Infinity)).sort((a, b) => a - b);
      const downloadedSize = size(part).multiplyScalar(1000).toArray().sort((a, b) => a - b);
      downloadedSize.forEach((value, index) => assert.ok(Math.abs(value - originalSize[index]) < .001, `${part.name}: downloaded CAD size must match its original source`));
    }
    assert.ok(assembly.children.every(part => part.visible), "view filters must not remove parts from export");
    assembly.traverse(object => { const mesh = object as Mesh; if (mesh.isMesh) assert.ok(!(mesh.material as MeshStandardMaterial).wireframe, "wireframe view must not contaminate the exported file"); });
    console.log(`PASS: browser-downloaded GLB ${file.byteLength} bytes; both ends, true tube OD/ID metadata, millimetre CAD bounds, and schematic L preserved.`);
  }
}
void review();
