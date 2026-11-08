/* eslint-disable @typescript-eslint/no-require-imports -- Verify source-bound female component materials. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const esbuild=require('./solenoid-viewer/node_modules/esbuild'),THREE=require('./solenoid-viewer/node_modules/three');
const root=path.resolve(__dirname,'../..');
const manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const regions=require('../../data/products/detail/quick-connect-material-regions.json');
function load(entry){
 const filename=path.join(root,entry),result=esbuild.buildSync({entryPoints:[filename],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'});
 const m=new Module(filename,module);m._compile(result.outputFiles[0].text,filename);return m.exports;
}
const {decodeCompactCad}=load('scripts/products/solenoid-viewer/compact-cad.js');
const {quickConnectMaterials}=load('scripts/products/solenoid-viewer/appearance-quick-connect.js');
const cache=new Map();
function fixture(part){
 const id=`quick-connect-515-00-${part}`,entry=manifest.geometries[id];assert.ok(entry,id);
 const product=Object.values(manifest.products).find(p=>p.viewerId===id&&p.gender==='S');assert.ok(product,id);
 if(!cache.has(id))cache.set(id,decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',entry.model3dUrl)))));
 return {id,product,data:cache.get(id),entry};
}
function view(f,index=0,product=f.product,data=f.data){
 const src=data.meshes[index],geometry=new THREE.BufferGeometry();
 const materials=quickConnectMaterials(src,geometry,product,data);
 return {src,geometry,materials,role(faceIndex){
  const face=src.brep_faces[faceIndex];assert.ok(face,`${f.id} mesh ${index} face ${faceIndex}`);
  const start=face.first*3,end=(face.last+1)*3;
  const groups=geometry.groups.filter(g=>g.start<end&&g.start+g.count>start);
  assert.ok(groups.length,`${f.id} unassigned face ${faceIndex}`);
  const role=groups[0].materialIndex;
  assert.ok(groups.every(g=>g.materialIndex===role),`${f.id} unexpectedly mixed face ${faceIndex}`);
  assert.ok(groups[0].start<=start&&groups.at(-1).start+groups.at(-1).count>=end);
  return role;
 },dispose(){geometry.dispose();materials.forEach(m=>m.dispose());}};
}
function expectFaces(f,index,role,faces){
 const v=view(f,index);try{for(const face of faces)assert.equal(v.role(face),role,`${f.product.model} mesh ${index} face ${face}`);}finally{v.dispose();}
}
function assertSource(f,sha,faceCounts){
 assert.equal(f.entry.sourceSha256,sha,`${f.id} source changed: independently review the material fixture`);
 assert.deepEqual(f.data.meshes.map(m=>m.brep_faces.length),faceCounts,`${f.id} topology changed`);
}

// Independent expected roles come from the source assembly's separate solids,
// their complete geometry, and exact-model product renders. They do not derive
// expected roles from the generated regions JSON or from radial position.
const q20Solids=[
 ['05223','a6a515acb46dc10fa46e125f2e1a15305597a5011e672d73ed0bacc3c5650c33',[109,40,34,13,263,1],[2,0,2,2,0,0]],
 ['05256','927da9be6ad652fde905dfa93f827f840689016adc4c06f52bbd3d33f4bb1df5',[109,34,40,13,247,1],[2,2,0,2,0,0]],
 ['04944','a93022d37442abde84c78b37ae0968ec7122297f232b9bb560c2e985a0e38057',[108,33,34,14,247,1],[2,0,2,2,0,0]],
 ['04955','a958a9bccddb78aa27002e9a29b604d3919112f48e516517820b0177129292a8',[111,34,33,15,247,1],[2,2,0,2,0,0]],
 ['05224','230baf1bfee095ee5caab03b3e9b5304d68c317f3c04075b71c35106ed703285',[109,33,34,13,263,1],[2,0,2,2,0,0]],
 ['05257','bed873888b0d7bd85ee8d77c5e5cc3dfe805e1ba496a324f1d178e7174c9cc5e',[109,34,33,13,247,1],[2,2,0,2,0,0]],
 ['04945','4a05310800c147dc283ba175a1b721caf4f0e9d2293d424321f227ca448a22f1',[109,34,33,13,247,1],[2,2,0,2,0,0]],
 ['05258','56c24d467e3c6299906e8dc3575b557fb03af77be29d71ee3ad367573880ff3c',[109,34,37,13,247,1],[2,2,0,2,0,0]],
];

test('Q2001-SNX-SACN button guards stay molded plastic while its thin release plate stays metal',()=>{
 const f=fixture('05252');
 assertSource(f,'e8bb084db6d4a53f3d3065b5c5ceb7cb671dc75187f45a3da3474f5c6b068003',[265]);
 // Compare q2001-snx-sacn-main.jpg: the broad side guards are white like the
 // body. These ten faces were incorrectly grey solely through radial fallback.
 expectFaces(f,0,0,[125,128,139,140,145,146,148,149,152,159]);
 expectFaces(f,0,2,Array.from({length:74},(_,i)=>i+3));
});

test('All eight Q20 SMX separate steel and plastic solids retain their complete material',()=>{
 for(const [part,sha,counts,roles] of q20Solids){
  const f=fixture(part);assertSource(f,sha,counts);
  for(const [mesh,role] of roles.entries())expectFaces(f,mesh,role,Array.from({length:counts[mesh]},(_,i)=>i));
 }
 // This checks the previous false-positive housing face111, omitted plate
 // backface43 and bevels65..69, all nut threads, and the ground spring endface1.
});

test('Q4014N separate pins, springs and folded plate are entirely steel and its housings remain plastic',()=>{
 const f=fixture('05317'),counts=[108,13,14,29,82,43],roles=[0,2,2,2,2,0];
 assertSource(f,'2a4fa2de6433e8d1c89501960aabbfee3c24e92cf40f6cd1bc71ec78572e0749',counts);
 for(const [mesh,role] of roles.entries())expectFaces(f,mesh,role,Array.from({length:counts[mesh]},(_,i)=>i));
});

test('Q40 separate metal pins and complete threaded nuts do not inherit plastic from unmatched template faces',()=>{
 const fixtures=[
  ['04964','4f02e7667c081cf030b93d906806c5112342881d20aed08b067f43b8908d69d2',[373,29]],
  ['04975','2ea50fafc4bc843d5395f03e1f0c94b50c71b8880aa60db2548cb630f5ddef89',[377,29]],
  ['05200','1129600e6daee036c3d05be66ac2b16a35a0805c3f9b2abef6dca3641ecfc0ef',[260,29]],
  ['05205','1e37106357a39ca6b1abb54f4211e803c9c7ac2d2e9034bebae766e0f7266f21',[248,29]],
  ['05303','8c01e3d284cf83c5a0744ff9ed5b149fc23cd0d0e8385e15621c9a1fc65aed50',[372,35]],
  ['05304','a365bff011f2fdc433525d4873a9210e5a1d06d0b9d2ce9c4bebeac7c00fb6a0',[372,35]],
  ['05305','947d24f34d822d4e5102478403361f02226d801dbfa0f036ff6ef30deaca277b',[376,35]],
 ];
 for(const [part,sha,counts] of fixtures){
  const f=fixture(part);assertSource(f,sha,counts);
  expectFaces(f,1,2,Array.from({length:counts[1]},(_,i)=>i));
 }
});

test('Trimmed Q40 rear plate faces remain steel without coloring coplanar plastic guard ears',()=>{
 const a=fixture('05281');
 assertSource(a,'7e63e263c0962da432ed5db4b8a4e30b966489a594c0428b1b02ca914a2842ab',[276]);
 expectFaces(a,0,2,[72]);expectFaces(a,0,0,[69,131]);
 const b=fixture('05200');expectFaces(b,0,2,[145]);expectFaces(b,0,0,[60,115]);
});

test('Q60 rear steel faces and neighboring offset plastic faces keep distinct materials',()=>{
 const a=fixture('05211');
 assertSource(a,'744bba63620731de628821a1cff15e9768870def2042e9465a5d784e7754e9af',[391,11]);
 // Source topology: face319 joins 27 steel faces at Y45.3; plastic face26 is
 // independently offset at Y45.5. A partial template overlap is not a mixed face.
 expectFaces(a,0,2,[319]);expectFaces(a,0,0,[26]);
 const b=fixture('05210');
 assertSource(b,'e3a227a30aac5dd72d808a3ec940a4e43ed03f5a67a014691d436a9d9305776a',[402,9]);
 expectFaces(b,0,2,[329]);
});

test('All 88 female geometries use only source-bound steel/seal faces and default unresolved faces to plastic',()=>{
 let checked=0;
 for(const [id,entry]of Object.entries(manifest.geometries)){
  if(!Object.values(manifest.products).some(p=>p.viewerId===id&&p.gender==='S'))continue;
  const f=fixture(id.slice(-5)),mapping=regions.geometries[id];
  assert.ok(mapping,`${id} source mapping missing`);assert.equal(mapping.sourceSha256,entry.sourceSha256);
  for(const [index,src]of f.data.meshes.entries()){
   const mapped=mapping.meshes[index],v=view(f,index);
   try{
    assert.equal(mapped.faceCount,src.brep_faces.length);
    const steel=new Set(mapped.steelFaces),seal=new Set(mapped.sealFaces??[]),body=new Set(mapped.bodyFaces);
    for(const face of steel){assert.ok(!seal.has(face)&&!body.has(face),`${id} contradictory steel face ${face}`);}
    for(const face of seal)assert.ok(!body.has(face),`${id} contradictory seal face ${face}`);
    for(let face=0;face<src.brep_faces.length;face++)assert.equal(v.role(face),steel.has(face)?2:seal.has(face)?1:0,`${id} mesh ${index} unproved material at face ${face}`);
    assert.equal(v.materials[0].metalness,0);assert.equal(v.materials[1].metalness,0);assert.ok(v.materials[2].metalness>.7);
   }finally{v.dispose();}
  }
  checked++;
 }
 assert.equal(checked,88);
});

test('Absent or mismatched female material references cannot revive radial steel guessing',()=>{
 const f=fixture('05252');
 for(const invalid of [
  {product:{...f.product,viewerId:'unreviewed-female'},data:f.data},
  {product:f.product,data:{...f.data,meshes:f.data.meshes.map(src=>({...src,brep_faces:src.brep_faces.slice(0,-1)}))}},
 ]){
  const v=view(f,0,invalid.product,invalid.data);
  try{for(let face=0;face<v.src.brep_faces.length;face++)assert.equal(v.role(face),0,`unverified face ${face}`);}finally{v.dispose();}
 }
});
