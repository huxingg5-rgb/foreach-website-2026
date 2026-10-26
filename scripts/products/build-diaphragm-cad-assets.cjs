// Website-only tessellation of the supplied external-release STEP files. Never writes 2D assets.
// node scripts/products/build-diaphragm-cad-assets.cjs SOURCE_DIRECTORY OUTPUT_DIRECTORY
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),source=process.argv[2],output=process.argv[3];
if(!source||!output)throw Error('Pass external-release STEP source and a separate output directory');
const specs=[
 ['dpl30-db','DPL30-DB','DPL30-BDC-外发版本模型.stp'],
 ['dpl30-bb','DPL30-BB','DPL30-BLDC-外发版本模型.stp'],
 ['dpl60-db','DPL60-DB','DPL60-BDC-外发版本模型.stp'],
 ['dpl60-bb','DPL60-BB','DPL60-BLDC-外发版本模型.stp'],
 ['dpl30h-ds','DPL30H-DS','DPL30H-BDC-外发版本模型.stp'],
 ['dpl30h-bs','DPL30H-BS','DPL30H-BLDC-外发版本模型.stp'],
 ['dpgl800-bs','DPGL800-BS','86泵-接口朝向下-外发版本模型.stp'],
];
const tessellation={linearUnit:'millimeter',linearDeflectionType:'absolute_value',linearDeflection:.03,angularDeflection:.15};
async function main(){
 const occt=await require(path.join(root,'public/vendor/occt/occt-import-js.js'))();
 fs.mkdirSync(output,{recursive:true});const manifest=[];
 for(const [slug,name,file]of specs){
  const bytes=fs.readFileSync(path.join(source,file));
  if(!bytes.subarray(0,128).includes(Buffer.from('ISO-10303-21')))throw Error('Invalid STEP: '+file);
  const result=occt.ReadStepFile(bytes,tessellation);
  if(!result.success||!result.meshes.length)throw Error('Import failed: '+file);
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];let triangles=0;
  for(const mesh of result.meshes){
   const positions=mesh.attributes.position.array;
   positions.forEach((v,i)=>{min[i%3]=Math.min(min[i%3],v);max[i%3]=Math.max(max[i%3],v);});
   mesh.attributes.position.array=positions.map(v=>Number(v.toFixed(5)));
   if(mesh.attributes.normal)mesh.attributes.normal.array=mesh.attributes.normal.array.map(v=>Number(v.toFixed(5)));
   triangles+=mesh.index.array.length/3;
  }
  const size=max.map((v,i)=>v-min[i]);
  const rotationEuler=size[2]>size[0]?[0,Math.PI/2,0]:[0,0,0];
  const model={name,...result,exteriorOnly:true,appearance:{diaphragm:true},rotationEuler,
   dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
  fs.writeFileSync(path.join(output,slug+'.json'),JSON.stringify(model));
  const record={slug,name,sourceModel:file,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),tessellation,triangles,meshSlots:result.meshes.length,sizeMm:size};
  manifest.push(record);console.log(JSON.stringify(record));
 }
 fs.writeFileSync(path.join(output,'sources.json'),JSON.stringify(manifest,null,2)+'\n');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
