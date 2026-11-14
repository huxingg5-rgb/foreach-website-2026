import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";
import { Box3, Vector3, type Object3D, type Mesh } from "three";
import { decodeCompactCad } from "./solenoid-viewer/compact-cad.js";
import { assemblyRingSpecifications } from "../../data/products/configurator/tubing-assembly-ring-specifications";
import { assemblyFittingAccessories, assemblyTubes, compatibleAssemblyFittings, getAssemblyFitting } from "../../data/products/configurator/tubing-assembly-catalog";
import { assemblySizeError, compatibleAssemblyTubes, defaultFlangedTubingChoice, flangedTubingBom, normalizeFlangedChoice, selectAssemblyConnection, selectAssemblyEndAttribute, selectAssemblyFitting, validateFlangedChoice } from "../../data/products/configurator/flanged-tubing";
import { emptyFlangedConfigurationStore, parseFlangedConfigurationStore, saveFlangedConfiguration } from "../../data/products/configurator/flanged-tubing-configurations";
import { buildFlangedDrawingSheets } from "../../components/products/tubing-assemblies/flanged-tubing-drawing";
import { getAssemblyFittingVector } from "../../data/products/configurator/tubing-assembly-vectors";

async function review() {
  const { createAssemblyCadPart }=await import(pathToFileURL(`${process.cwd()}/public/models/products/tubing-assemblies/flanged-assembly-renderer.mjs`).href);
  assert.equal(assemblyRingSpecifications.length,6);
  assert.deepEqual(assemblyRingSpecifications.map(s=>s.code).sort(),["809816","809817","809829","809814","809828","809815"].sort());
  for(const specification of assemblyRingSpecifications) {
    const f=getAssemblyFitting(specification.model)!;
    assert.equal(f.code,specification.code);
    const expectedLength=f.material==="PEEK"?15.5:20;
    if (f.cadUrl) for(const side of ["a","b"]) {
      const bytes=readFileSync(`public${f.cadUrl}`),data=decodeCompactCad(gunzipSync(bytes));
      const group=createAssemblyCadPart(data,f,side),box=new Box3().setFromObject(group);
      assert.ok(Math.abs((box.max.x-box.min.x)/.6-expectedLength)<.001,`${f.model}: render must use its own formal body length`);
      const counterbore:Vector3[]=[];
      const counterboreRadius=(f.material==="PEEK"?4:4.1)*.6/2;
      group.traverse((object:Object3D)=>{
        const mesh=object as Mesh;if(!mesh.isMesh)return;
        const positions=mesh.geometry.attributes.position;
        for(let i=0;i<positions.count;i++) {
          const point=new Vector3().fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);
          if(Math.abs(Math.hypot(point.y,point.z)-counterboreRadius)<.001)counterbore.push(point);
        }
      });
      assert.ok(counterbore.length>0,`${f.model}: actual threaded-end counterbore must exist`);
      const counterboreFraction=(counterbore.reduce((sum,p)=>sum+p.x,0)/counterbore.length-box.min.x)/(box.max.x-box.min.x);
      assert.ok(side==="a"?counterboreFraction<.3:counterboreFraction>.7,`${f.model}/${side}: threaded counterbore must face outward (${counterboreFraction})`);
      group.traverse((object:Object3D)=>{const mesh=object as Mesh;mesh.geometry?.dispose();if(mesh.material)for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material])m.dispose();});
    }
    const vector=getAssemblyFittingVector(f.model)!;
    if (f.cadUrl) assert.equal(vector.source,f.cadUrl,"2D and 3D must resolve the same exact geometry, including PEEK short bodies");
    else {
      assert.equal(f.model,"HSF6-U28-32-PK-N");
      assert.match(vector.source,/441-09-00289/ ,"missing exact CAD must retain its original PEEK 32 drawing, never PPS or a 1.7 bore body");
    }
    assert.ok(Math.abs(vector.width-expectedLength)<.001);
    assert.ok(vector.paths.some(commands=>{
      const points=commands.filter(c=>c.length>=3);
      if(points.length<2)return false;
      const xs=points.map(c=>Number(c[1])),ys=points.map(c=>Number(c[2]));
      return Math.max(...xs)-Math.min(...xs)>2 && ys.every(y=>Math.abs(y-vector.axisY)>1);
    }),`${f.model}: orthographic vector must retain axial silhouette edges`);
    for(const outer of specification.outerDiameters) {
      const tube=assemblyTubes.find(t=>t.material==="FEP"&&t.outer===outer)!;
      const ring=selectAssemblyFitting({...defaultFlangedTubingChoice().a,connection:"卡环"},f.model,outer);
      assert.equal(assemblyFittingAccessories(f,"卡环",outer)[0].model,`CL-1S-${outer*10}`);
      assert.equal(ring.accessoryCode,assemblyFittingAccessories(f,"卡环",outer)[0].productCode);
      const flange=selectAssemblyConnection(ring,"翻边",outer);
      assert.notEqual(flange.fittingModel,ring.fittingModel);
      assert.equal(flange.series,"HFL");
      const flangeAccessory=assemblyFittingAccessories(getAssemblyFitting(flange.fittingModel),"翻边",outer).find(a=>a.productCode===flange.accessoryCode)!;
      assert.ok(flangeAccessory && !flangeAccessory.productCodePending);
      assert.ok(!flangeAccessory.model.startsWith("WSS-"));
      const value={...defaultFlangedTubingChoice(),tubeModel:tube.key,length:"500",a:ring,b:flange};
      assert.equal(validateFlangedChoice(value),null);
      assert.ok(!flangedTubingBom(value).find(r=>r.part==="B 端垫片")!.specification.includes("PEEK"));
      const saved=saveFlangedConfiguration(emptyFlangedConfigurationStore(),value,"卡环核验",null);
      const restored=parseFlangedConfigurationStore(JSON.stringify(saved.store)).configurations[0];
      assert.equal(restored.choice.a.connection,"卡环");assert.equal(restored.choice.b.connection,"翻边");
      assert.equal(restored.choice.b.accessoryCode,flange.accessoryCode);
      const drawing=buildFlangedDrawingSheets(saved.record).join("");
      assert.ok(drawing.includes(vector.source) && drawing.includes(`CL-1S-${outer*10}`) && drawing.includes(flangeAccessory.model));
      assert.ok(!/<image\b|data:image/.test(drawing));
    }
  }
  const start=defaultFlangedTubingChoice().a;
  const micro=selectAssemblyFitting({...start,connection:"卡环"},"HFL6-U40-16-PK-N",1.6);
  assert.equal(micro.connection,"卡环");assert.equal(micro.accessoryCode,"809653");
  const choice={...defaultFlangedTubingChoice(),length:"500",a:micro,b:micro};
  assert.equal(assemblySizeError(choice),null);
  const drawing=buildFlangedDrawingSheets(saveFlangedConfiguration(emptyFlangedConfigurationStore(),choice,"微型卡环",null).record).join("");
  assert.ok(drawing.includes("CL-1X-16") && drawing.includes("assembly-cl-1x-16.fcad.gz"));
  assert.ok(!drawing.includes("WS-27"));
  const flange=selectAssemblyConnection(micro,"翻边",1.6);
  assert.equal(flange.fittingModel,micro.fittingModel);assert.equal(flange.accessoryCode,"WS-27");
  assert.equal(selectAssemblyConnection(flange,"卡环",1.6).accessoryCode,"809653");
  const microTubes=compatibleAssemblyTubes(choice);
  assert.ok(microTubes.length>0 && microTubes.every(t=>t.outer===1.6 && ["FEP","PTFE","PFA"].includes(t.material)),"micro connection limits both material and OD");
  const standard={...choice,a:selectAssemblyConnection(start,"卡环",1.6),b:selectAssemblyConnection(start,"翻边",1.6)};
  const allowed=compatibleAssemblyTubes(standard);
  assert.ok(allowed.some(t=>t.material==="PTFE"));
  assert.deepEqual(allowed.filter(t=>t.material==="PFA").map(t=>[t.outer,t.inner]),[[1.6,0.5],[1.6,0.8],[1.6,1]],"published PFA assemblies retain only their fixed catalog sizes");
  assert.ok(!allowed.some(t=>t.outer===6 || ["PEEK","PVC","TPU"].includes(t.material)));
  for(const material of ["PEEK","PVC","TPU"]) {
    const tube=assemblyTubes.find(t=>t.material===material && t.outer===1.6) || assemblyTubes.find(t=>t.material===material)!;
    assert.match(validateFlangedChoice({...standard,tubeModel:tube.key})!,/管材/);
  }
  assert.ok(!compatibleAssemblyFittings(2,{connection:"卡环"}).some(f=>f.model===micro.fittingModel));
  const m6=selectAssemblyEndAttribute(selectAssemblyConnection(start,"卡环",3.2),"thread","M6×1",3.2);
  assert.equal(m6.fittingModel,"HSF6-M6-32-PS-B");assert.equal(m6.material,"PPS");
  const incompatibleMicro={...choice,a:{...micro,accessoryCode:"809801"}};
  assert.equal(normalizeFlangedChoice(incompatibleMicro).a.accessoryCode,"809801","preserve an explicitly selected incompatible kit for correction");
  assert.match(validateFlangedChoice(incompatibleMicro)!,/卡环套件/);
  console.log("PASS: six ring-only HSF6 SKUs, exact CAD and vectors, five CL-1S sizes, verified flange switching, CL-1X micro isolation, and saved mixed connections.");
}
void review();
