import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";
import { Box3, Vector3 } from "three";
import { decodeCompactCad } from "./solenoid-viewer/compact-cad.js";
import { assemblyFittings, assemblyTubes } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblyMaterialAppearance } from "../../data/products/configurator/tubing-assembly-appearance";
import { assemblyPreviewAsset } from "../../data/products/configurator/tubing-assembly-preview";
import { getAssemblyAccessoryVector, getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";
import ringKits from "../../data/products/configurator/tubing-assembly-ring-kits.json";
import { assemblyCompatibilityWarnings, defaultFlangedTubingChoice, flangedTubingBom, legacyFlangedOuterDiameters, selectAssemblyConnection, selectAssemblyFitting } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";

const moduleUrl = pathToFileURL(`${process.cwd()}/public/models/products/tubing-assemblies/flanged-assembly-renderer.mjs`).href;
async function review() {
  const { createAssemblyTubeSurfaces, createAssemblyCadPart } = await import(moduleUrl);
  for (const series of ["FL","FL6"]) for (const thread of ["M6×1","1/4-28 UNF"]) for (const outer of legacyFlangedOuterDiameters) {
    const initial = defaultFlangedTubingChoice(), end={...initial.a,series,thread,fittingModel:undefined,accessoryCode:undefined,material:series==="FL6"?"PPS":"",color:series==="FL6"?"黑色":"本色"};
    const asset=assemblyPreviewAsset(end,outer);
    assert.equal(asset?.kind,"exact-cad");
    assert.ok(existsSync(resolve(process.cwd(),"public",asset!.url.slice(1))),`${series}/${thread}/OD ${outer} preview must exist`);
    const tube=assemblyTubes.find(t=>t.material==="FEP"&&t.outer===outer)!;
    const record=saveFlangedConfiguration(emptyFlangedConfigurationStore(),{...initial,mode:"single",tubeModel:tube.key,a:end,length:"500"},"预览分离验证",null).record;
    const drawing=buildFlangedDrawingSheets(record).join("");
    assert.ok(drawing.includes(`data-source-series="H${series}"`));
    assert.ok(drawing.includes(`data-source-model="${record.choice.a.fittingModel}"`));
    assert.ok(drawing.includes(getAssemblyFittingVector(record.choice.a.fittingModel)!.source),"the drawing must use the resolved catalog part's exact vector source");
    assert.ok(!drawing.includes('data-source-kind="raster-outline-trace"'));
  }
  assert.match(assemblyPreviewAsset({...defaultFlangedTubingChoice().a,fittingModel:"HN-U28-32-PK-N",series:"HN",connection:"卡箍"},3.2)!.url,/assembly-hn-u28-32/);
  assert.equal(assemblyPreviewAsset({...defaultFlangedTubingChoice().a,fittingModel:"HSF6-U28-32-PK-N",series:"HSF6",connection:"卡环"},3.2),null,"a model without exact CAD must not borrow another family");
  assert.equal(assemblyPreviewAsset(defaultFlangedTubingChoice().a,25.4),null);
  const finish = (mesh: Object3D) => (mesh as Mesh).material as MeshStandardMaterial;
  const release = (group: Object3D) => group.traverse(object => { const mesh = object as Mesh; mesh.geometry?.dispose(); if (mesh.material) for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) material.dispose(); });
  const flange = { connection:"翻边",enabled:true };
  const tubeConfig = (tube: typeof assemblyTubes[number]) => ({ mode:"double",inner:tube.inner,outer:tube.outer,tubeMaterial:tube.material,tubeColor:tube.color,a:flange,b:flange });
  for (const tube of assemblyTubes) {
    assert.ok(Number.isFinite(tube.inner) && Number.isFinite(tube.outer) && tube.inner > 0 && tube.outer > tube.inner,`${tube.key}: tube dimensions must define a positive wall thickness`);
    const group = createAssemblyTubeSurfaces(tubeConfig(tube));
    const body = finish(group.getObjectByName("assembly-tube-body"));
    const expected = assemblyMaterialAppearance(tube.material,tube.color);
    assert.equal(body.color.getHex(),expected.color);
    for (const name of ["assembly-tube-bore","a-tube-flange","b-tube-flange"]) {
      const surface = finish(group.getObjectByName(name));
      assert.equal(surface.color.getHex(),body.color.getHex(),`${tube.key}: ${name} must inherit tube color`);
      assert.equal(surface.opacity,body.opacity);
      assert.equal(surface.transparent,body.transparent);
    }
    assert.equal(body.transparent,tube.color === "透明");
    release(group);
  }
  const config = tubeConfig(assemblyTubes[0]);
  for (const [mode,a,b,names] of [
    ["single",flange,flange,["a-tube-flange"]],
    ["double",flange,{connection:"卡箍",enabled:true},["a-tube-flange"]],
    ["double",{connection:"卡环",enabled:true},flange,["b-tube-flange"]],
    ["double",{...flange,enabled:false},{...flange,enabled:false},[]],
  ] as const) {
    const group = createAssemblyTubeSurfaces({...config,mode,a,b});
    assert.deepEqual(group.children.filter((c: Object3D)=>c.name.endsWith("-tube-flange")).map((c: Object3D)=>c.name),names);
    release(group);
  }
  const colors = new Set(assemblyTubes.map(t=>t.color).concat(assemblyFittings.map(f=>f.color),assemblyFittings.flatMap(f=>f.accessories.map(a=>a.color))));
  assert.deepEqual([...colors].sort(),["本色","透明","黑色","蓝色","红色","黄色"].sort());
  const pigments = ["黑色","蓝色","红色","黄色"].map(color=>assemblyMaterialAppearance("PTFE",color).color);
  assert.equal(new Set(pigments).size,4,"explicit pigments cannot collapse to the natural finish");
  const triangle = { meshes:[{attributes:{position:{array:[0,0,0,1,0,0,0,1,0]}},index:{array:[0,1,2]}}] };
  // Real CAD regression: HN6 is exported in the opposite axial direction.
  // Its grip must face the tube middle at both ends, with the thread outward.
  for (const fitting of assemblyFittings.filter(f => f.family === "HN6" && f.thread === "M6×1")) {
    const data = decodeCompactCad(gunzipSync(readFileSync(resolve(process.cwd(), "public", fitting.cadUrl!.slice(1)))));
    for (const side of ["a", "b"]) {
      const group = createAssemblyCadPart(data, fitting, side), box = new Box3().setFromObject(group);
      const vertices: Vector3[] = [];
      group.traverse((object: Object3D) => {
        const mesh = object as Mesh;
        if (!mesh.isMesh) return;
        const positions = mesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) vertices.push(new Vector3().fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld));
      });
      const radius = Math.max(...vertices.map(v => Math.hypot(v.y, v.z)));
      const grip = vertices.filter(v => Math.hypot(v.y, v.z) > radius * .98);
      const gripX = grip.reduce((sum, v) => sum + v.x, 0) / grip.length;
      const fraction = (gripX - box.min.x) / (box.max.x - box.min.x);
      assert.ok(side === "a" ? fraction > .55 : fraction < .45, `${fitting.model}/${side}: grip faces inward (${fraction})`);
      assert.ok(Math.abs((box.min.y + box.max.y) / 2) < .001, "fitting bore must remain on the tube axis");
      release(group);
    }
  }
  for (const part of [...assemblyFittings,...assemblyFittings.flatMap(f=>f.accessories)]) {
    const group = createAssemblyCadPart(triangle,part,"a");
    const expected = assemblyMaterialAppearance(part.material,part.color);
    group.traverse((object: Object3D)=>{ if ((object as Mesh).isMesh) { const material=finish(object); assert.equal(material.color.getHex(),expected.color); assert.equal(material.metalness,expected.metalness); } });
    release(group);
  }
  const ferrules = [...new Map(assemblyFittings.flatMap(f=>f.accessories).filter(a=>a.model.startsWith("CL-0-") && a.cadUrl).map(a=>[a.cadUrl,a])).values()];
  assert.equal(ferrules.length,5,"all five exact CL-0 bore sizes must render");
  for (const ferrule of ferrules) {
    const data=decodeCompactCad(gunzipSync(readFileSync(resolve(process.cwd(),"public",ferrule.cadUrl!.slice(1)))));
    for (const side of ["a","b"]) {
      const group=createAssemblyCadPart(data,ferrule,side,true),box=new Box3().setFromObject(group),endRadii=[0,0];
      group.traverse((object:Object3D)=>{
        const mesh=object as Mesh;if(!mesh.isMesh)return;
        const p=mesh.geometry.attributes.position;
        for(let i=0;i<p.count;i++){
          const v=new Vector3().fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld),r=Math.hypot(v.y,v.z);
          if(v.x<box.min.x+.01)endRadii[0]=Math.max(endRadii[0],r);
          if(v.x>box.max.x-.01)endRadii[1]=Math.max(endRadii[1],r);
        }
      });
      assert.ok(side==="a"?endRadii[0]>endRadii[1]:endRadii[1]>endRadii[0],`${ferrule.model}/${side}: ferrule tip points toward its fitting`);
      release(group);
    }
  }
  for (const kit of ringKits) {
    const outer=kit.tubeOuterDiameters[0];
    const end=kit.model.startsWith("CL-1X-") ? selectAssemblyFitting({...defaultFlangedTubingChoice().a,connection:"卡环"},"HFL6-U40-16-PK-N",outer) : selectAssemblyConnection(defaultFlangedTubingChoice().a,"卡环",outer);
    assert.equal(end.series,kit.model.startsWith("CL-1X-")?"HFL6":"HSF6","ring family must match the actual kit type");
    assert.ok(getAssemblyFittingVector(end.fittingModel));
    assert.equal(end.accessoryCode,kit.productCode,"kit bore must follow the tube OD");
    assert.ok(getAssemblyAccessoryVector(end.fittingModel,end.accessoryCode),"2D output must include the same kit");
    const data=decodeCompactCad(gunzipSync(readFileSync(resolve(process.cwd(),"public",kit.cadUrl.slice(1)))));
    for (const side of ["a","b"]) {
      const group=createAssemblyCadPart(data,{...end,cadUrl:kit.cadUrl},side,true);
      const parts=group.children[0].children as Mesh[];
      assert.equal(parts.length,2);
      const steel=parts.find(p=>(p.material as MeshStandardMaterial).metalness===.68)!;
      const seal=parts.find(p=>(p.material as MeshStandardMaterial).color.getHex()===assemblyMaterialAppearance("PEEK","本色").color)!;
      assert.ok(steel && seal,"SUS sleeve and PEEK seal cannot inherit the fitting finish");
      const steelBox=new Box3().setFromObject(steel),sealBox=new Box3().setFromObject(seal);
      assert.ok(side==="a"?sealBox.min.x<steelBox.min.x-.3:sealBox.max.x>steelBox.max.x+.3,`${kit.model}/${side}: PEEK sealing face points outward`);
      let bore=Infinity;
      for(const mesh of parts) {
        const positions=mesh.geometry.attributes.position;
        for(let i=0;i<positions.count;i++) {
          const v=new Vector3().fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);
          bore=Math.min(bore,2*Math.hypot(v.y,v.z));
        }
      }
      assert.ok(Math.abs(bore-outer*.6)<.002,`${kit.model}: exact bore must remain coaxial with the tube`);
      release(group);
    }
  }
  const tube = assemblyTubes.find(t=>t.material==="PVC" && t.outer===3.2)!;
  const choice = {...defaultFlangedTubingChoice(),tubeModel:tube.key,length:"500"};
  choice.a=selectAssemblyConnection(choice.a,"卡箍",tube.outer);
  choice.b=selectAssemblyConnection(choice.b,"翻边",tube.outer);
  choice.a.accessoryCode="809650"; choice.a.washer="ETFE";
  const bom = flangedTubingBom(choice);
  assert.match(bom[0].specification,new RegExp(`硬度 ${tube.hardness}`));
  assert.match(bom.find(row=>row.part==="A 端卡箍")!.specification,/黄色/);
  assert.throws(()=>saveFlangedConfiguration(emptyFlangedConfigurationStore(),choice,"颜色审核",null),/管材/,"unapproved soft tubing cannot be exported just because its OD fits");
  const pendingClamp = {...choice,b:{...choice.b,connection:"卡箍" as const,series:"HN",fittingModel:""}};
  const warning = assemblyCompatibilityWarnings(pendingClamp).find(text=>text.startsWith("B 端"));
  assert.match(warning!,/卡箍连接工艺/);
  console.log("PASS: actual tube/flange/bore materials across 83 tube records; all fitting/accessory finishes; single and mixed ends; hardness and accessory color in BOM and vector sheets.");
}
void review();
