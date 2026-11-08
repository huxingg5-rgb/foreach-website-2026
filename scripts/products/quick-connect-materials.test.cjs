/* eslint-disable @typescript-eslint/no-require-imports -- Verify the existing FCAD viewer pipeline. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const esbuild=require('./solenoid-viewer/node_modules/esbuild'),THREE=require('./solenoid-viewer/node_modules/three');
const root=path.resolve(__dirname,'../..');
const manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const pilot=require('../../data/products/detail/quick-connect-pilot-preview.json');
const regions=require('../../data/products/detail/quick-connect-material-regions.json');
function load(entry){
 const filename=path.join(root,entry),result=esbuild.buildSync({entryPoints:[filename],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'});
 const m=new Module(filename,module);m._compile(result.outputFiles[0].text,filename);return m.exports;
}
const {decodeCompactCad}=load('scripts/products/solenoid-viewer/compact-cad.js');
const {quickConnectMaterials}=load('scripts/products/solenoid-viewer/appearance-quick-connect.js');
const read=url=>decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',url))));
function materialize(product,data,index=0,preview=false){
 const src=data.meshes[index],geometry=new THREE.BufferGeometry();
 const materials=quickConnectMaterials(src,geometry,product,data,preview);
 const role=faceIndex=>{
  const face=src.brep_faces[faceIndex],start=face.first*3,end=(face.last+1)*3;
  const group=geometry.groups.find(g=>start>=g.start&&end<=g.start+g.count);
  assert.ok(group,'Face must have one complete material group: '+faceIndex);return group.materialIndex;
 };
 return {src,geometry,materials,role,dispose(){geometry.dispose();materials.forEach(m=>m.dispose());}};
}

test('The Q2001 release-button spring is metallic in both original and preview geometry',()=>{
 const product=manifest.products['q2001-smv-sacn'];
 for(const [url,preview]of [[manifest.geometries[product.viewerId].model3dUrl,false],[pilot.geometries[product.viewerId].model3dUrl,true]]){
  const data=read(url),view=materialize(product,data,0,preview);
  // Exact STEP helical tube surfaces and its wire end below the release button.
  for(const face of [352,353,357,358,359,361,362,363,364,365,366])assert.equal(view.role(face),2,`${url} spring face ${face}`);
  for(const face of [350,351,354,355,356,360,367,368,369])assert.equal(view.role(face),0,`${url} plastic spring support face ${face}`);
  assert.ok(view.materials[2].metalness>.7);
  view.dispose();
 }
});

test('Every CAD-backed product keeps full material coverage and its own housing finish',()=>{
 let checked=0;
 for(const [id,entry]of Object.entries(manifest.geometries)){
  const data=read(entry.model3dUrl),sourceDimensions=JSON.stringify(data.dimensions);
  for(const product of Object.values(manifest.products).filter(p=>p.viewerId===id)){
   for(let i=0;i<data.meshes.length;i++){
    const view=materialize(product,data,i);let end=0;
    const entry=regions.geometries[id],mapping=entry?.meshes[i];
    if(mapping){
     assert.equal(entry.sourceSha256,manifest.geometries[id].sourceSha256);
     assert.equal(mapping.faceCount,view.src.brep_faces.length,product.model);
     const mappedFaces=[...mapping.steelFaces,...mapping.bodyFaces,...(mapping.sealFaces??[])];
     assert.equal(new Set(mappedFaces).size,mappedFaces.length,product.model);
     for(const face of mapping.steelFaces)assert.equal(view.role(face),2,`${product.model} steel ${face}`);
     for(const face of mapping.bodyFaces)assert.equal(view.role(face),0,`${product.model} body ${face}`);
     for(const face of mapping.sealFaces??[])assert.equal(view.role(face),1,`${product.model} seal ${face}`);
    }
    for(const group of view.geometry.groups){
     assert.equal(group.start,end,product.model);assert.ok(group.count>0&&group.count%3===0,product.model);
     assert.ok([0,1,2].includes(group.materialIndex),product.model);end+=group.count;
    }
    assert.equal(end,view.src.index.array.length,product.model);
    assert.equal(view.materials[0].color.getHex(),product.series==='Q60'?0x8f989b:product.housingMaterial==='PP'?0xd2cba8:0xe1e3df,product.model);
    assert.equal(view.materials[0].metalness,0);assert.equal(view.materials[1].metalness,0);
    assert.equal(JSON.stringify(data.dimensions),sourceDimensions);
    view.dispose();
   }
   checked++;
  }
 }
 assert.equal(checked,174);
});

test('Q40 and Q60 springs remain metallic while the adjacent supports remain plastic',()=>{
 const fixtures=[
  {slug:'q4006-smv-sacn',steel:[77,78,79,80,81,82,84,366,370,376,377,378],body:[83,367,368,369,371,372,373,374,375]},
  {slug:'q6006-smv-sppe',steel:[420,421,422,423,424,425,426,427,428,429,430,431],body:[148,149,150,151,152,153,154]},
 ];
 for(const fixture of fixtures){
  const product=manifest.products[fixture.slug],data=read(manifest.geometries[product.viewerId].model3dUrl),view=materialize(product,data);
  for(const face of fixture.steel)assert.equal(view.role(face),2,`${product.model} spring ${face}`);
  for(const face of fixture.body)assert.equal(view.role(face),0,`${product.model} support ${face}`);
  view.dispose();
 }
});

test('The pictured PP female keeps its molded guards plastic and the complete nut and latch metallic',()=>{
 const product=manifest.products['q2001-smv-sppe'],data=read(manifest.geometries[product.viewerId].model3dUrl);
 for(const preview of [false,true]){
  const view=materialize(product,data,0,preview);
  for(const face of [129,140,155,166,291,320,348,353,367])assert.equal(view.role(face),0,`plastic guard face ${face}`);
  for(const face of [85,86,94,122,368,372,379,167,180,228,229,240])assert.equal(view.role(face),2,`metal hardware face ${face}`);
  view.dispose();
 }
});

test('Q60 uses its photographed grey housing, silver release plate and black seals',()=>{
 const female=manifest.products['q6006-smv-sppe'],data=read(manifest.geometries[female.viewerId].model3dUrl),view=materialize(female,data);
 for(const face of [432,447,470,500])assert.equal(view.role(face),2,`Q60 release plate ${face}`);
 for(const face of [501,542,543,544,545,546,547])assert.equal(view.role(face),1,`Q60 panel seal ${face}`);
 for(const face of [502,512,525,541])assert.equal(view.role(face),0,`Q60 plastic lock ring ${face}`);
 assert.equal(view.materials[0].color.getHex(),0x8f989b);assert.equal(view.materials[0].metalness,0);view.dispose();
 const male=manifest.products['q6008-pnx-sppe'],maleData=read(manifest.geometries[male.viewerId].model3dUrl),maleView=materialize(male,maleData);
 for(const face of [64,65])assert.equal(maleView.role(face),1,`Q60 male O-ring ${face}`);
 for(const face of [63,68,69])assert.equal(maleView.role(face),0,`Q60 plastic O-ring groove ${face}`);
 maleView.dispose();
});
