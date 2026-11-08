/* eslint-disable @typescript-eslint/no-require-imports -- Test the existing CommonJS CAD import pipeline. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),Module=require('node:module');
const root=path.resolve(__dirname,'../..');
const esbuild=require('./solenoid-viewer/node_modules/esbuild');
function load(entry){const filename=path.join(root,entry);const result=esbuild.buildSync({entryPoints:[filename],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'});const m=new Module(filename,module);m.filename=filename;m.paths=module.paths;m._compile(result.outputFiles[0].text,filename);return m.exports;}
const {quickConnectFittingSelectionProducts:catalog}=load('data/products/selection/quick-connect-fitting-selection.generated.ts');
const {isPublishedFittingProduct}=load('data/products/selection/fitting-publication.generated.ts');
const {getQuickConnectPairConfig}=load('data/products/configurator/quick-connect-pairing.ts');
const {getQuickConnectFittingCadAssets}=load('data/products/detail/quick-connect-fitting-cad-assets.ts');
const manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const sourceMap=require('../../data/products/detail/quick-connect-cad-source-map.json');
const published=catalog.filter(isPublishedFittingProduct),products=Object.values(manifest.products);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');

test('Every published model pairs only with published opposite-gender ends in its own series',()=>{
 assert.equal(published.length,175);
 for(const base of published){for(const locale of ['zh','en']){
  const config=getQuickConnectPairConfig({model:base.foreachModel,productCode:base.productCode},locale);
  assert.ok(config,base.foreachModel);assert.equal(config.baseGender,base.genderCode);
  assert.ok(config.options.some(p=>p.model===config.defaultModel));
  assert.ok(getQuickConnectFittingCadAssets(config.defaultModel.toLowerCase()),'default mate requires exact CAD: '+base.foreachModel);
  for(const option of config.options){const row=published.find(p=>p.foreachModel===option.model);assert.ok(row);assert.equal(row.series,base.series);assert.notEqual(row.genderCode,base.genderCode);assert.equal(row.productCode,option.productCode);}
  const matching=config.options.filter(p=>p.housingMaterial===base.housingMaterial&&p.sealingRingMaterial===base.sealingRingMaterial);
  if(matching.length)assert.ok(matching.some(p=>p.model===config.defaultModel),'default material: '+base.foreachModel);
 }}
 assert.equal(getQuickConnectPairConfig({model:'Q20'},'zh'),undefined);
});

test('Reviewed resources resolve exact published models, with original source-code exceptions retained',()=>{
 assert.equal(products.length,174);assert.equal(sourceMap.unavailable.length,1);
 for(const [slug,p] of Object.entries(manifest.products)){
  const row=published.find(row=>row.foreachModel===p.model&&row.productCode===p.productCode);assert.ok(row,slug);
  const source=sourceMap.records.find(s=>s.model===p.model&&s.productCode===p.productCode);assert.ok(source);
  assert.equal(source.pdf.replace(/-c\.pdf$/i,'').toLowerCase(),p.sourcePart);
  const assets=getQuickConnectFittingCadAssets(slug);assert.ok(assets);assert.equal(assets.model,p.model);
  assert.ok(fs.existsSync(path.join(root,'public',assets.model3dUrl)));
  const pdf=fs.readFileSync(path.join(root,'public',assets.drawingPdfUrl));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.subarray(-30).includes(Buffer.from('%%EOF')));assert.equal(hash(pdf),p.sourcePdfSha256);
  const mate=manifest.products[p.defaultMateSlug];assert.ok(mate);assert.equal(mate.series,p.series);assert.notEqual(mate.gender,p.gender);
 }
 assert.equal(getQuickConnectFittingCadAssets('q2004-snx-lppe'),undefined);
 assert.equal(getQuickConnectFittingCadAssets('q20'),undefined);
});

test('All prepared CAD files decode and retain finite millimeter dimensions and a mating centerline',()=>{
 const {decodeCompactCad}=load('scripts/products/solenoid-viewer/compact-cad.js');
 const {orientQuickConnectProduct}=load('scripts/products/solenoid-viewer/quick-connect-pair.js');
 const {getQuickConnectAssemblyReference}=load('scripts/products/solenoid-viewer/quick-connect-assembly.js');
 const THREE=require('./solenoid-viewer/node_modules/three');
 for(const [id,g] of Object.entries(manifest.geometries)){
  const raw=zlib.gunzipSync(fs.readFileSync(path.join(root,'public',g.model3dUrl)));const d=decodeCompactCad(new Uint8Array(raw));
  assert.ok(d.success&&d.meshes.length,id);assert.deepEqual(d.mating,g.mating);
  assert.ok(d.dimensions.size.every(v=>Number.isFinite(v)&&v>0&&v<300),id);
  for(const k of [0,1,2])if(k!==d.mating.axis)assert.ok(d.mating.center[k]>=d.dimensions.min[k]-.01&&d.mating.center[k]<=d.dimensions.max[k]+.01,'centerline outside geometry: '+id);
  const product=products.find(p=>p.viewerId===id),solid=new THREE.Group();orientQuickConnectProduct(d,solid,product);
  const reference=getQuickConnectAssemblyReference(product);assert.ok(reference,id);
  const origin=new THREE.Vector3(...reference.mouthCenter).applyQuaternion(solid.quaternion).add(solid.position);
  assert.ok(Math.abs(origin.x-(product.gender==='P'?-1.5:1.5))<1e-7);assert.ok(Math.abs(origin.y)<1e-7&&Math.abs(origin.z)<1e-7,id);
  const axis=new THREE.Vector3();axis.setComponent(reference.axis,reference.sign);axis.applyQuaternion(solid.quaternion);
  assert.ok(Math.abs(axis.x-(product.gender==='P'?1:-1))<1e-7,id);
  for(const mesh of d.meshes){assert.ok(mesh.attributes.position.array.every(Number.isFinite));assert.ok(mesh.index.array.every(i=>Number.isInteger(i)&&i>=0&&i<mesh.attributes.position.array.length/3));}
 }
});
