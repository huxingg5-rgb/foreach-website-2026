/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the prepared CAD pipeline. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const esbuild=require('./solenoid-viewer/node_modules/esbuild'),THREE=require('./solenoid-viewer/node_modules/three');
const root=path.resolve(__dirname,'../..');
function compile(filename,code){const m=new Module(filename,module);m._compile(code,filename);return m.exports;}
function load(relative){const filename=path.join(root,relative);return compile(filename,esbuild.buildSync({entryPoints:[filename],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'}).outputFiles[0].text);}
const manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const references=require('../../data/products/detail/quick-connect-assembly-references.json');
const {decodeCompactCad}=load('scripts/products/solenoid-viewer/compact-cad.js');
const {getQuickConnectAssemblyReference,alignQuickConnectAssembly,quickConnectEnvelope}=load('scripts/products/solenoid-viewer/quick-connect-assembly.js');
const {orientQuickConnectProduct}=load('scripts/products/solenoid-viewer/quick-connect-pair.js');
const {getQuickConnectViewState}=load('scripts/products/solenoid-viewer/quick-connect-assembly-view.js');
const products=Object.values(manifest.products),cache=new Map();
function dataFor(product){if(!cache.has(product.viewerId)){const url=manifest.geometries[product.viewerId].model3dUrl;cache.set(product.viewerId,decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',url)))));}return cache.get(product.viewerId);}
function entry(product){const data=dataFor(product),solid=new THREE.Group();orientQuickConnectProduct(data,solid,product);return {product,data,solid};}
const xyz=(point,solid)=>new THREE.Vector3(...point).applyQuaternion(solid.quaternion).add(solid.position);
function close(a,b,message,tolerance=1e-8){assert.ok(Math.abs(a-b)<=tolerance,`${message}: ${a} vs ${b}`);}
function vectorClose(a,b,message,tolerance=1e-8){assert.ok(a.distanceTo(b)<=tolerance,`${message}: ${a.toArray()} vs ${b.toArray()}`);}
function aligned(first,second){const base=entry(first),mate=entry(second),before=base.solid.position.clone(),rotation=base.solid.quaternion.clone();const result=alignQuickConnectAssembly(first,base.data,base.solid,second,mate.data,mate.solid);assert.ok(result,`${first.model} + ${second.model} should align`);vectorClose(base.solid.position,before,'Base must remain stationary');assert.deepEqual(base.solid.quaternion.toArray(),rotation.toArray(),'Base rotation must remain unchanged');return {base,mate,result};}
function validatePair(pair){const {base,mate,result}=pair,label=base.product.model+' + '+mate.product.model;
 const a=getQuickConnectAssemblyReference(base.product),b=getQuickConnectAssemblyReference(mate.product);
 vectorClose(xyz(a.center,base.solid),xyz(b.center,mate.solid),label+' locking references');
 const male=base.product.gender==='P'?base:mate,female=base.product.gender==='S'?base:mate;
 const mr=getQuickConnectAssemblyReference(male.product),fr=getQuickConnectAssemblyReference(female.product);
 close(result.clearanceMm,(mr.grooveWidthMm-fr.thicknessMm)/2,label+' clearance');
 assert.ok(result.clearanceMm>=-1e-8,label+' cannot have a negative locking clearance');
 close(result.overlapMm,xyz(mr.mouthCenter,male.solid).x-xyz(fr.mouthCenter,female.solid).x,label+' physical overlap');
 const maleBox=quickConnectEnvelope(male.data,male.solid),femaleBox=quickConnectEnvelope(female.data,female.solid),box=maleBox.clone().union(femaleBox),size=box.getSize(new THREE.Vector3());
 const ms=maleBox.getSize(new THREE.Vector3()),ss=femaleBox.getSize(new THREE.Vector3());
 assert.ok(size.toArray().every(v=>Number.isFinite(v)&&v>0),label+' positive finite envelope');
 assert.ok(result.overlapMm>0&&result.overlapMm<Math.min(ms.x,ss.x),label+' plausible insertion');
 assert.ok(size.x>=Math.max(ms.x,ss.x)-1e-8&&size.x<=ms.x+ss.x+1e-8,label+' assembled length bounds');
 close(size.x,ms.x+ss.x-result.overlapMm,label+' assembled length vs overlap',1e-6);
 return size;
}

test('Every available product has source-matched locking references and consistent display orientation',()=>{
 assert.equal(products.length,174);assert.equal(Object.keys(manifest.geometries).length,148);
 for(const product of products){const ref=getQuickConnectAssemblyReference(product),geometry=manifest.geometries[product.viewerId],model=entry(product),label=product.model;
  assert.ok(ref,label);assert.equal(ref.sourceSha256,geometry.sourceSha256,label+' source identity');assert.equal(ref.gender,product.gender);assert.equal(ref.series,product.series);
  assert.ok([0,1,2].includes(ref.axis));assert.ok([-1,1].includes(ref.sign));assert.ok(ref.center.length===3&&ref.center.every(Number.isFinite));assert.ok(ref.mouthCenter.length===3&&ref.mouthCenter.every(Number.isFinite));
  assert.ok(ref.faceReferences.length>0,label+' CAD face evidence');for(const[mi,fi]of ref.faceReferences)assert.ok(model.data.meshes[mi]?.brep_faces[fi],label+' valid source face '+mi+':'+fi);
  const axis=new THREE.Vector3().setComponent(ref.axis,ref.sign).applyQuaternion(model.solid.quaternion);
  vectorClose(axis,new THREE.Vector3(product.gender==='P'?1:-1,0,0),label+' mating direction');
  if(product.gender==='S'){assert.ok(ref.releaseDirection?.length===3,label+' release direction');const release=new THREE.Vector3(...ref.releaseDirection);close(release.length(),1,label+' normalized release direction',1e-6);vectorClose(release.applyQuaternion(model.solid.quaternion),new THREE.Vector3(0,1,0),label+' release button faces up',1e-6);}
 }
 assert.equal(cache.size,148,'Each unique source CAD is decoded once');
});

test('All 174 default mating selections align, including female-base pages',()=>{
 let femaleBases=0;for(const product of products){const mate=manifest.products[product.defaultMateSlug];assert.ok(mate,product.model);assert.notEqual(product.gender,mate.gender);assert.equal(product.series,mate.series);validatePair(aligned(product,mate));if(product.gender==='S')femaleBases++;}assert.equal(femaleBases,88);
});

test('All 2900 same-series pairs align in both base directions with equal dimensions and no drift',()=>{
 let count=0;for(const series of ['Q20','Q40','Q60']){const males=products.filter(p=>p.series===series&&p.gender==='P'),females=products.filter(p=>p.series===series&&p.gender==='S');for(const male of males)for(const female of females){
  const forward=aligned(male,female),reverse=aligned(female,male),size=validatePair(forward),reverseSize=validatePair(reverse);vectorClose(size,reverseSize,male.model+' / '+female.model+' reverse-base envelope',1e-6);
  const position=forward.mate.solid.position.clone();const again=alignQuickConnectAssembly(male,forward.base.data,forward.base.solid,female,forward.mate.data,forward.mate.solid);assert.ok(again);vectorClose(forward.mate.solid.position,position,'Repeated alignment must not drift');close(again.overlapMm,forward.result.overlapMm,'Repeated insertion');count++;
 }}assert.equal(count,2900);
});

test('The established Q2001 assembly keeps its measured envelope',()=>{
 const p=manifest.products['q2001-pmv-sacn'],size=validatePair(aligned(p,manifest.products[p.defaultMateSlug]));close(size.x,56.80,'Q2001 L',.005);close(size.z,17.86,'Q2001 W',.005);close(size.y,20.53,'Q2001 H',.005);
});

test('Invalid or mismatched products cannot move a mating model',()=>{
 const p=manifest.products['q2001-pmv-sacn'],s=manifest.products['q2001-smv-sacn'],other=manifest.products['q6006-smv-sppe'];
 for(const bad of [p,other,{...s,viewerId:'not-a-cad'},{...s,model:'UNKNOWN'},{...s,viewerId:p.viewerId}]){const base=entry(p),mate=entry(s),before=mate.solid.position.clone();assert.equal(alignQuickConnectAssembly(p,base.data,base.solid,bad,mate.data,mate.solid),null);vectorClose(mate.solid.position,before,'Rejected pair must not move');}
 assert.equal(getQuickConnectAssemblyReference(undefined),null);assert.equal(getQuickConnectAssemblyReference({...p,viewerId:'missing'}),null);
});

test('Stale STEP hashes fail closed instead of reusing locking coordinates',async()=>{
 const product=manifest.products['q2001-pmv-sacn'],tampered=JSON.parse(JSON.stringify(references));tampered.geometries[product.viewerId].sourceSha256='0'.repeat(64);
 const filename=path.join(__dirname,'solenoid-viewer/quick-connect-assembly.js');const built=await esbuild.build({entryPoints:[filename],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent',plugins:[{name:'stale-reference-fixture',setup(build){build.onLoad({filter:/quick-connect-assembly-references\.json$/},()=>({contents:JSON.stringify(tampered),loader:'json'}));}}]});
 assert.equal(compile(filename,built.outputFiles[0].text).getQuickConnectAssemblyReference(product),null);
});

test('Male and female single views follow product gender for both base orders and missing mates',()=>{
 const male=entry(manifest.products['q6006-pnv-lppe']),female=entry(manifest.products['q6006-smv-sppe']);
 for(const[base,mate]of [[male,female],[female,male]])for(const mode of ['assembly','male','female']){const state=getQuickConnectViewState(base,mate,mode,true);assert.equal(state.male,male);assert.equal(state.female,female);assert.equal(state.activeMode,mode);assert.deepEqual(new Set(state.visible),new Set(mode==='assembly'?[male,female]:[mode==='male'?male:female]));}
 for(const base of [male,female])for(const mode of ['assembly','male','female']){const state=getQuickConnectViewState(base,null,mode,false),role=base.product.gender==='P'?'male':'female';assert.equal(state.activeMode,role);assert.deepEqual(state.visible,[base]);assert.equal(state[role],base);assert.ok(!state[role==='male'?'female':'male']);}
 const unsupported=getQuickConnectViewState(female,male,'assembly',false);assert.equal(unsupported.activeMode,'female');assert.deepEqual(unsupported.visible,[female]);
});
