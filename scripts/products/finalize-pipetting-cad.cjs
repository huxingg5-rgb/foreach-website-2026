// Publish only after independent ray + raster visibility audits have completed.
// node finalize-pipetting-cad.cjs STAGE_DIRECTORY
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {packCompactCad}=require('./compact-cad/pack.cjs');
const {finishForFace}=require('./pipetting-appearance.cjs');
const root=path.resolve(__dirname,'../..'),stage=process.argv[2];
const ids=['smtp2-500','smtp2-510','smtp2-520','smtp4-100ul','smtp4-250ul','smtp4-500ul'];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
async function main(){
 if(!stage||path.resolve(stage).toLowerCase().startsWith(path.join(root,'public').toLowerCase()))throw Error('Stage outside public/');
 const {decodeCompactCad}=await import('data:text/javascript;base64,'+fs.readFileSync(path.join(__dirname,'solenoid-viewer/compact-cad.js')).toString('base64'));
 const records=[],pending=[];fs.mkdirSync(path.join(stage,'candidate'),{recursive:true});
 for(const id of ids){
  const raw=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(stage,'raw',id+'.json.gz'))));
  const ray=JSON.parse(fs.readFileSync(path.join(stage,id+'-ray-audit.json'))),gpu=JSON.parse(fs.readFileSync(path.join(stage,id+'-gpu-audit.json')));
  if(ray.directions<102||gpu.views<142||gpu.resolution<1024)throw Error(id+': incomplete visibility audit');
  const keep=new Set([...ray.keep,...gpu.keep].map(p=>p.join(':'))),meshes=[],finishes={};let keptFaces=0;
  for(const [mi,m]of raw.meshes.entries()){
   const p=m.attributes.position.array,n=m.attributes.normal?.array,ix=m.index.array,positions=[],normals=[],indices=[],faces=[],remap=new Map();
   for(const [fi,f]of m.brep_faces.entries()){
    if(!keep.has(mi+':'+fi))continue;keptFaces++;const first=indices.length/3,finish=finishForFace(raw,m,f);finishes[finish]=(finishes[finish]||0)+1;
    for(let j=f.first*3;j<(f.last+1)*3;j++){
     const old=ix[j];let v=remap.get(old);
     if(v===undefined){v=positions.length/3;remap.set(old,v);for(let k=0;k<3;k++){positions.push(+p[old*3+k].toFixed(5)||0);if(n)normals.push(+n[old*3+k].toFixed(5)||0);}}
     indices.push(v);
    }
    faces.push({first,last:indices.length/3-1,sourceFace:fi,finish});
   }
   if(!indices.length)continue;
   assert.equal(new Set(indices).size,positions.length/3);
   meshes.push({name:'Part '+(meshes.length+1),sourceMeshIndex:mi,attributes:{position:{array:positions},...(n?{normal:{array:normals}}:{})},index:{array:indices},brep_faces:faces});
  }
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const m of meshes)m.attributes.position.array.forEach((v,k)=>{assert(Number.isFinite(v));min[k%3]=Math.min(min[k%3],v);max[k%3]=Math.max(max[k%3],v);});
  for(let k=0;k<3;k++){assert(Math.abs(min[k]-raw.dimensions.min[k])<.001,id+' minimum changed');assert(Math.abs(max[k]-raw.dimensions.max[k])<.001,id+' maximum changed');}
  const model={...raw,meshes,root:{name:raw.name,meshes:meshes.map((_,i)=>i),children:[]},exteriorOnly:true,exteriorOptimized:{method:'whole-BREP-face ray and raster visibility',rayDirections:ray.directions,rasterViews:gpu.views,rasterResolution:gpu.resolution},appearance:{...raw.appearance,photographicFinishes:true},dimensions:{...raw.dimensions,min,max,size:max.map((v,k)=>v-min[k])}};
  const packed=packCompactCad(model);assert.deepStrictEqual(decodeCompactCad(new Uint8Array(zlib.gunzipSync(packed.gzip))),model);
  const old=fs.readFileSync(path.join(stage,'before/public/models/products/pumps/pipetting-pumps/cad',id+'.fcad.gz'));
  assert(packed.gzip.length<old.length,id+': asset grew');assert(packed.gzip.length<24*1024*1024);
  const record={id,sourceMeshes:raw.meshes.length,meshCount:meshes.length,removedMeshes:raw.meshes.length-meshes.length,sourceFaces:raw.meshes.reduce((n,m)=>n+m.brep_faces.length,0),keptFaces,removedFaces:raw.meshes.reduce((n,m)=>n+m.brep_faces.length,0)-keptFaces,sourceTriangles:raw.meshes.reduce((n,m)=>n+m.index.array.length/3,0),triangles:packed.stats.triangles,beforeBytes:old.length,bytes:packed.gzip.length,reductionPercent:+((1-packed.gzip.length/old.length)*100).toFixed(1),sizeMm:model.dimensions.size,sha256:sha(packed.gzip),numericRoundTripExact:true,rasterRestoredFaces:gpu.keep.filter(p=>!new Set(ray.keep.map(p=>p.join(':'))).has(p.join(':'))).length,finishes};
  fs.writeFileSync(path.join(stage,'candidate',id+'.json.gz'),zlib.gzipSync(JSON.stringify(model),{level:9}));
  fs.writeFileSync(path.join(stage,'candidate',id+'.fcad.gz'),packed.gzip);pending.push([id+'.fcad.gz',packed.gzip]);records.push(record);console.log(JSON.stringify(record));
 }
 const output=path.join(root,'public/models/products/pumps/pipetting-pumps/cad');
 for(const filename of ['sources.json','smtp4-sources.json']){
  const manifest=JSON.parse(fs.readFileSync(path.join(stage,'before/public/models/products/pumps/pipetting-pumps/cad',filename)));
  for(const entry of manifest.models){const report=records.find(r=>r.id===entry.slug);Object.assign(entry,report);delete entry.id;entry.appearanceReference='Existing product gallery photographs';entry.exteriorOptimization={rayDirections:102,rasterViews:142,rasterResolution:1024,wholeFaces:true,geometryDecimation:false};}
  pending.push([filename,Buffer.from(JSON.stringify(manifest,null,2)+'\n')]);
 }
 for(const [filename,bytes]of pending)fs.writeFileSync(path.join(output,filename),bytes);
 fs.writeFileSync(path.join(stage,'final-audit.json'),JSON.stringify(records,null,2)+'\n');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
