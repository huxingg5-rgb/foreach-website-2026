// node scripts/products/build-smtp2-cad-assets.cjs SMTP_SOURCE_DIRECTORY STAGING_DIRECTORY
// Match the existing cards using the source folder's 3D文件说明.txt, not filename similarity.
// Staging only: run the exterior visibility audits and finalize-pipetting-cad
// before publishing. Re-importing must never overwrite reviewed assets.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {packCompactCad}=require('./compact-cad/pack.cjs');
const root=path.resolve(__dirname,'../..'),source=process.argv[2],stage=process.argv[3];
if(!source||!stage)throw Error('Pass source and staging directories');
const publicRoot=path.join(root,'public');
if(path.resolve(stage).toLowerCase().startsWith(publicRoot.toLowerCase()))throw Error('Stage outside public/');
const configs=[['smtp2-500','515-00-02247-02.stp','LTE008',8],['smtp2-510','515-00-02439-02.stp','LTE045',45],['smtp2-520','515-00-02550-02.stp','LTE072',72]];
const tessellation={linearUnit:'millimeter',linearDeflectionType:'absolute_value',linearDeflection:.03,angularDeflection:.5};
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
async function main(){
 const occt=await require(path.join(root,'public/vendor/occt/occt-import-js.js'))();
 const {decodeCompactCad}=await import('data:text/javascript;base64,'+fs.readFileSync(path.join(__dirname,'solenoid-viewer/compact-cad.js')).toString('base64'));
 fs.mkdirSync(stage,{recursive:true});const records=[],pending=[];
 for(const [slug,file,adapter,lengthMm]of configs){
  const input=fs.readFileSync(path.join(source,file));
  if(!input.subarray(0,128).includes(Buffer.from('ISO-10303-21')))throw Error('Invalid STEP: '+file);
  const raw=occt.ReadStepFile(input,tessellation);
  if(!raw.success||!raw.meshes.length)throw Error('Import failed: '+file);
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const [i,mesh]of raw.meshes.entries()){
   mesh.name=`Part ${i+1}`;
   // Same 0.00001 mm coordinate storage used by the existing pump pipeline.
   mesh.attributes.position.array=mesh.attributes.position.array.map(v=>+v.toFixed(5)||0);
   if(mesh.attributes.normal)mesh.attributes.normal.array=mesh.attributes.normal.array.map(v=>+v.toFixed(5)||0);
   const p=mesh.attributes.position.array,ix=mesh.index.array;
   if(p.some(v=>!Number.isFinite(v))||ix.some(v=>!Number.isInteger(v)||v<0||v>=p.length/3))throw Error('Invalid geometry: '+slug);
   p.forEach((v,k)=>{min[k%3]=Math.min(min[k%3],v);max[k%3]=Math.max(max[k%3],v);});
  }
  const size=max.map((v,k)=>v-min[k]),model={name:slug.toUpperCase(),success:true,meshes:raw.meshes,root:{name:slug.toUpperCase(),meshes:raw.meshes.map((_,i)=>i),children:[]},exteriorOnly:true,appearance:{smtp2:true},rotationEuler:[0,0,Math.PI],dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
  const packed=packCompactCad(model);
  assert.deepStrictEqual(decodeCompactCad(new Uint8Array(zlib.gunzipSync(packed.gzip))),model);
  if(packed.gzip.length>24*1024*1024)throw Error('Asset exceeds static hosting limit');
  fs.writeFileSync(path.join(stage,slug+'.json.gz'),zlib.gzipSync(JSON.stringify(model)));
  const record={slug,sourceModel:file,sourceSha256:sha(input),adapter,adapterNominalLengthMm:lengthMm,configuration:'without cover (-02)',tessellation,coordinateDecimals:5,meshCount:model.meshes.length,triangles:packed.stats.triangles,sizeMm:size,asset:slug+'.fcad.gz',bytes:packed.gzip.length,sha256:sha(packed.gzip),numericRoundTripExact:true};
  records.push(record);pending.push([record.asset,packed.gzip]);console.log(JSON.stringify(record));
 }
 const manifest={mappingSource:'3D文件说明.txt: 2247=SMTP2-500; 2439=SMTP2-510; 2550=SMTP2-520; -02=without cover',models:records};
 fs.writeFileSync(path.join(stage,'sources.json'),JSON.stringify(manifest,null,2)+'\n');
 for(const [name,bytes]of pending)fs.writeFileSync(path.join(stage,name),bytes);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
