/* eslint-disable @typescript-eslint/no-require-imports -- Verify source FCAD BREP datums. */
// Assembly uses the male retention groove and female locking land, not body length.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const root=path.resolve(__dirname,'../..'),manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json'),hardware=require('../../data/products/detail/quick-connect-hardware-regions.json');
const esbuild=require('./solenoid-viewer/node_modules/esbuild'),decoder=new Module(__filename,module);
decoder._compile(esbuild.buildSync({entryPoints:[path.join(__dirname,'solenoid-viewer/compact-cad.js')],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,__filename);
const cache=new Map();
function load(id){if(cache.has(id))return cache.get(id);const data=decoder.exports.decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',manifest.geometries[id].model3dUrl)))),axis=data.mating.axis,perp=[0,1,2].filter(k=>k!==axis);const faces=data.meshes.flatMap((mesh,mi)=>mesh.brep_faces.map((face,fi)=>{const p=mesh.attributes.position.array,n=mesh.attributes.normal.array,ix=mesh.index.array,lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];let radiusMin=Infinity,radiusMax=0,normalAxial=0,count=0;for(let j=face.first*3;j<(face.last+1)*3;j++){const v=ix[j]*3;for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],p[v+k]);hi[k]=Math.max(hi[k],p[v+k]);}const r=Math.hypot(...perp.map(k=>p[v+k]-data.mating.center[k]));radiusMin=Math.min(radiusMin,r);radiusMax=Math.max(radiusMax,r);normalAxial+=Math.abs(n[v+axis]);count++;}return{mesh:mi,face:fi,lo,hi,span:hi.map((v,k)=>v-lo[k]),radiusMin,radiusMax,normalAxial:normalAxial/count};}));const model={data,faces,axis,perp,min:[0,1,2].map(k=>Math.min(...faces.map(f=>f.lo[k]))),max:[0,1,2].map(k=>Math.max(...faces.map(f=>f.hi[k])))};cache.set(id,model);return model;}
function endpoint(model,axial,sourceDirection=false){const {axis,data,min,max}=model,sign=sourceDirection?data.mating.sign:axial-min[axis]<max[axis]-axial?-1:1,mouthCenter=data.mating.center.slice();mouthCenter[axis]=sign<0?min[axis]:max[axis];return{axis,sign,mouthCenter};}
function direction(id,model){const matches=hardware.geometries[id].evidence.filter(e=>e.kind==='latch'&&e.transform).sort((a,b)=>b.matchedFaces-a.matchedFaces);if(matches.length){const t=matches[0].transform;return{releaseDirection:t.p.map((k,i)=>k===0?t.s[i]:0),releaseDirectionEvidence:{reference:matches[0].reference,transform:t,method:'verified asymmetric release-button template'}};}
 // An isolated Q40 latch retains the same broad folded button dimensions.
 const candidates=model.faces.filter(f=>hardware.geometries[id].meshes[f.mesh].steelFaces.includes(f.face)&&f.span[model.axis]>7&&f.span[model.axis]<9.5&&model.perp.some(k=>f.span[k]<.003&&model.perp.some(j=>j!==k&&f.span[j]>10&&f.span[j]<13))).map(f=>{const k=model.perp.find(k=>f.span[k]<.003),offset=(f.lo[k]+f.hi[k])/2-model.data.mating.center[k];return{face:f,axis:k,offset};}).sort((a,b)=>Math.abs(b.offset)-Math.abs(a.offset));
 if(!candidates.length)throw Error('Unverified button direction '+id);const c=candidates[0],v=[0,0,0];v[c.axis]=Math.sign(c.offset);return{releaseDirection:v,releaseDirectionEvidence:{faceReferences:[[c.face.mesh,c.face.face]],method:'outer planar face of the isolated folded button'}};
}
const output={schemaVersion:1,description:'Source BREP retention groove and locking-land datums for neutral assembled display; geometry and product dimensions are unchanged.',geometries:{},products:{}};
const missing=[];
for(const [id,g]of Object.entries(manifest.geometries)){
 const product=Object.values(manifest.products).find(p=>p.viewerId===id);
 const model=load(id),{data,axis,perp,faces}=model;
 let reference;
 if(product.gender==='P'){
  const radius=product.series==='Q20'?2.8:product.series==='Q40'?4.45:10,width=product.series==='Q60'?6.99:1.3;
  const groove=faces.filter(f=>Math.abs(f.span[axis]-width)<.006&&Math.abs(f.radiusMin-radius)<.004&&Math.abs(f.radiusMax-radius)<.004&&f.normalAxial<.003);
  const coordinates=[...new Set(groove.map(f=>(f.lo[axis]+f.hi[axis]).toFixed(4)))];
  if(groove.length<1||coordinates.length!==1){missing.push({id,model:product.model,kind:'groove',faces:groove.map(f=>[f.mesh,f.face])});continue;}
  const center=data.mating.center.slice();center[axis]=(groove[0].lo[axis]+groove[0].hi[axis])/2;
  reference={...endpoint(model,center[axis],true),center,grooveInterval:[groove[0].lo[axis],groove[0].hi[axis]],grooveWidthMm:groove[0].span[axis],grooveRadiusMm:radius,faceReferences:groove.map(f=>[f.mesh,f.face]),method:'coaxial cylindrical retention-groove floor'};
 }else if(product.series==='Q60'){
  // Q60's 3.8 mm outer lock-ring envelope includes the lead-in ramp. The
  // actual retaining land is the 1.6 mm cylindrical contact surface.
  const proof=hardware.geometries[id].evidence.find(e=>e.kind==='latch'&&e.reference==='quick-connect-515-00-04969');
  if(!proof)throw Error('Unverified Q60 locking-land orientation '+id);
  const source=load('quick-connect-515-00-04969'),near=(a,b)=>a.every((v,k)=>Math.abs(v-b[k])<.012),mapped={};
  for(const index of [434,439,440,451,453,456]){
   const f=source.faces.find(f=>f.mesh===0&&f.face===index),t=proof.transform;
   const lo=t.p.map((k,i)=>(t.s[i]>0?f.lo[k]:-f.hi[k])+proof.offset[i]),hi=t.p.map((k,i)=>(t.s[i]>0?f.hi[k]:-f.lo[k])+proof.offset[i]);
   mapped[index]=faces.filter(f=>near(f.lo,lo)&&near(f.hi,hi));
  }
  if(mapped[451].length!==1||mapped[456].length!==1)throw Error('Ambiguous Q60 contact faces '+id);
  const land=mapped[456][0],shoulder=mapped[451][0],center=data.mating.center.slice();
  if(Math.abs(land.span[axis]-1.6)>.002)throw Error('Changed Q60 locking land '+id);
  center[axis]=(land.lo[axis]+land.hi[axis])/2;
  const t=proof.transform,planeInterval=[41.5,45.3].map(v=>t.s[axis]*v+proof.offset[axis]).sort((a,b)=>a-b);
  reference={axis,sign:data.mating.sign,mouthCenter:data.mating.center.slice(),center,thicknessMm:land.span[axis],lockingLandInterval:[land.lo[axis],land.hi[axis]],plateEnvelopeInterval:planeInterval,faceReferences:[[land.mesh,land.face],[shoulder.mesh,shoulder.face]],...direction(id,model),engagementSurfaces:{lockingCylinder:[land.mesh,land.face],loadShoulder:[shoulder.mesh,shoulder.face],insertionChamfer:mapped[453].map(f=>[f.mesh,f.face]),outerBackEdge:mapped[434].map(f=>[f.mesh,f.face]),outerFrontPatches:[...mapped[439],...mapped[440]].map(f=>[f.mesh,f.face])},method:'midpoint of actual cylindrical locking land; neutral assembly, not the loaded shoulder-contact position'};
 }else{
  const planes=faces.filter(f=>f.span[axis]<.003&&f.normalAxial>.999&&Math.max(...perp.map(k=>f.span[k]))>8&&Math.min(f.lo[axis]-model.min[axis],model.max[axis]-f.hi[axis])<7);
  const groups=[];for(const face of planes){let group=groups.find(g=>Math.abs(g.position-face.lo[axis])<.003);if(!group)groups.push(group={position:face.lo[axis],faces:[]});group.faces.push(face);}
  const pairs=groups.flatMap(a=>groups.filter(b=>b.position>a.position&&Math.abs(b.position-a.position-.9)<.006).map(b=>[a,b]));
  if(pairs.length!==1){missing.push({id,model:product.model,kind:'latch',planes:groups.map(g=>({position:g.position,faces:g.faces.map(f=>[f.mesh,f.face])}))});continue;}
  const [a,b]=pairs[0],center=data.mating.center.slice();center[axis]=(a.position+b.position)/2;
  reference={...endpoint(model,center[axis]),center,thicknessMm:b.position-a.position,lockingLandInterval:[a.position,b.position],faceReferences:[...a.faces,...b.faces].map(f=>[f.mesh,f.face]),...direction(id,model),method:'parallel faces of the metal release plate'};
 }
 output.geometries[id]={gender:product.gender,series:product.series,sourceSha256:g.sourceSha256,...reference};
}
for(const [slug,p]of Object.entries(manifest.products))if(output.geometries[p.viewerId])output.products[slug]=p.viewerId;
if(missing.length||Object.keys(output.geometries).length!==Object.keys(manifest.geometries).length||Object.keys(output.products).length!==Object.keys(manifest.products).length)throw Error('Incomplete source assembly datums '+JSON.stringify(missing));
fs.writeFileSync(path.join(root,'data/products/detail/quick-connect-assembly-references.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({geometries:Object.keys(output.geometries).length,products:Object.keys(output.products).length,missing},null,2));
