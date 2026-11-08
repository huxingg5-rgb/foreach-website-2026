/* eslint-disable @typescript-eslint/no-require-imports -- Read existing lossless FCAD assets. */
// Build reviewed spring regions from the exact CAD's offset tubular coil.
// This generator does not edit any geometry, dimensions, or source STEP.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const root=path.resolve(__dirname,'../..'),esbuild=require('./solenoid-viewer/node_modules/esbuild');
const decoder=new Module(__filename,module);decoder._compile(esbuild.buildSync({entryPoints:[path.join(__dirname,'solenoid-viewer/compact-cad.js')],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,__filename);
const manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const hardware=require('../../data/products/detail/quick-connect-hardware-regions.json');
// Keep matching evidence in the hardware audit; ship only the runtime masks.
const output={schemaVersion:1,geometries:Object.fromEntries(Object.entries(hardware.geometries).map(([id,{sourceSha256,meshes}])=>[id,{sourceSha256,meshes:JSON.parse(JSON.stringify(meshes))}]))};
const report={checkedGeometries:0,springGeometries:[],noMatchingSpring:[],maleGeometries:[]};
function features(mesh,face){const p=mesh.attributes.position.array,n=mesh.attributes.normal.array,ix=mesh.index.array,lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];let normal0,curved=false;const points=[];for(let i=face.first*3;i<(face.last+1)*3;i++){const v=ix[i]*3,pt=p.slice(v,v+3);points.push(pt);for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],pt[k]);hi[k]=Math.max(hi[k],pt[k]);}if(!normal0)normal0=n.slice(v,v+3);else if(normal0.reduce((s,x,k)=>s+x*n[v+k],0)<.99999)curved=true;}return{lo,hi,size:hi.map((v,k)=>v-lo[k]),curved,points};}
for(const [id,geometry]of Object.entries(manifest.geometries)){
 report.checkedGeometries++;const product=Object.values(manifest.products).find(p=>p.viewerId===id);
 if(product.gender!=='S'){report.maleGeometries.push(id);continue;}
 const data=decoder.exports.decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',geometry.model3dUrl))));
 // The reviewed release coils are circular wire swept around an axis
 // perpendicular to the flow. Infer their own center from full-turn faces:
 // mating datums in some supplied assemblies are offset from the body.
 const candidates=[],rejected=[];
 const profiles=[{kind:'release',radius:product.series==='Q60'?3:2.25,inner:product.series==='Q60'?2.15:1.62},...(product.series==='Q60'?[]:[{kind:'internal',radius:1,inner:.68}])];
 const all=data.meshes.flatMap((mesh,meshIndex)=>mesh.brep_faces.map((face,faceIndex)=>({meshIndex,faceIndex,...features(mesh,face)})));
 for(const profile of profiles){const {radius,inner}=profile;
 const seeds=[];
 for(const f of all){if(!f.curved)continue;for(const axis of [0,1,2].filter(k=>profile.kind==='release'?k!==data.mating.axis:k===data.mating.axis)){
  const rest=[0,1,2].filter(k=>k!==axis);
  if(f.size[axis]<.2||f.size[axis]>6||!rest.every(k=>Math.abs(f.size[k]-2*radius)<.035))continue;
  const center=rest.map(k=>(f.lo[k]+f.hi[k])/2);
  if(profile.kind==='internal'&&Math.hypot(...rest.map((k,j)=>center[j]-data.mating.center[k]))<2)continue;
  const rs=f.points.map(pt=>Math.hypot(...rest.map((k,j)=>pt[k]-center[j])));
  if(Math.min(...rs)<inner||Math.max(...rs)>radius+.025||Math.max(...rs)-Math.min(...rs)<.12)continue;
  const seed=seeds.find(s=>s.axis===axis&&s.center.every((v,j)=>Math.abs(v-center[j])<.025));if(seed){seed.lo=Math.min(seed.lo,f.lo[axis]);seed.hi=Math.max(seed.hi,f.hi[axis]);}else seeds.push({axis,rest,center,lo:f.lo[axis],hi:f.hi[axis]});
 }}
 for(const seed of seeds){const found=[];
  for(const f of all){
   if(f.lo[seed.axis]<seed.lo-.9||f.hi[seed.axis]>seed.hi+.9)continue;
   if(!seed.rest.every((k,j)=>f.lo[k]>=seed.center[j]-radius-.025&&f.hi[k]<=seed.center[j]+radius+.025))continue;
   const rs=f.points.map(pt=>Math.hypot(...seed.rest.map((k,j)=>pt[k]-seed.center[j]))),rmin=Math.min(...rs),rmax=Math.max(...rs);
   const tubular=rmin>=inner&&rmax<=radius+.025;
   const endCap=!f.curved&&Math.max(...f.size)<=.9;
   if(tubular&&(f.curved||endCap))found.push(f);
  }
  if(!found.length)continue;
  const lo=Math.min(...found.map(f=>f.lo[seed.axis])),hi=Math.max(...found.map(f=>f.hi[seed.axis]));
  const longFaces=found.filter(f=>f.curved&&f.size[seed.axis]>1.5&&seed.rest.every(k=>f.size[k]>radius*1.5)).length;
  // End sections and two long opposed surfaces must form a complete coil.
  const compressed=profile.kind==='release'&&['quick-connect-515-00-05339','quick-connect-515-00-05340'].includes(id)&&found.length===12&&Math.abs(hi-lo-5.29974)<.001;
  if(found.length<10||found.length>22||(!compressed&&longFaces<2)||hi-lo<4.0||hi-lo>8.5){rejected.push({found:found.map(f=>[f.meshIndex,f.faceIndex]),lo,hi,longFaces});continue;}
  for(const meshIndex of new Set(found.map(f=>f.meshIndex))){const springs=found.filter(f=>f.meshIndex===meshIndex).map(f=>f.faceIndex);
   const supports=profile.kind==='internal'?[]:all.filter(f=>f.meshIndex===meshIndex&&!f.curved&&!springs.includes(f.faceIndex)&&f.lo[seed.axis]>=lo-.025&&f.hi[seed.axis]<=hi+.025&&seed.rest.every((k,j)=>f.lo[k]>=seed.center[j]-radius-.025&&f.hi[k]<=seed.center[j]+radius+.025)).map(f=>f.faceIndex);
   candidates.push({meshIndex,springs,supports,valid:true,axis:seed.axis,center:seed.center,span:hi-lo,longFaces,kind:profile.kind});
  }
 }
 }
 if(!candidates.length){report.noMatchingSpring.push({id,model:product.model,reason:'offset tubular coil not verified',rejected});continue;}
 const entry=output.geometries[id]??={sourceSha256:geometry.sourceSha256,meshes:data.meshes.map(mesh=>({faceCount:mesh.brep_faces.length,steelFaces:[],bodyFaces:[],complete:false}))};
 for(const c of candidates.filter(c=>c.valid)){const target=entry.meshes[c.meshIndex];target.steelFaces=[...new Set([...target.steelFaces,...c.springs])].sort((a,b)=>a-b);target.bodyFaces=[...new Set([...target.bodyFaces,...c.supports])].filter(i=>!target.steelFaces.includes(i)).sort((a,b)=>a-b);}
 report.springGeometries.push({id,model:product.model,series:product.series,meshes:candidates.filter(c=>c.valid).map(c=>({meshIndex:c.meshIndex,steelFaces:c.springs,bodyFaces:c.supports,kind:c.kind}))});
}
// Exact component evidence takes precedence over the coil-support candidate
// scan: a ground spring end stays steel, and a complete polymer housing stays
// polymer. Fixed hashes make a source revision an explicit review failure.
const reviewedComponents=require('./quick-connect-material-source-review.cjs');
for(const[id,review]of Object.entries(reviewedComponents)){
 if(!review.componentRoles)continue;
 const target=output.geometries[id];
 if(target.sourceSha256!==review.sourceSha256||target.meshes.map(m=>m.faceCount).join(',')!==review.faceCounts.join(','))throw Error('Reviewed component source changed: '+id);
 for(const[mi,role]of review.componentRoles.entries()){
  if(role!==0&&role!==2)continue;
  const mesh=target.meshes[mi],faces=Array.from({length:mesh.faceCount},(_,i)=>i);
  mesh.steelFaces=role===2?faces:[];mesh.bodyFaces=role===0?faces:[];mesh.sealFaces=[];mesh.complete=true;
 }
}
output.coverage={checkedGeometries:report.checkedGeometries,maleGeometries:report.maleGeometries.length,releaseSpringGeometries:report.springGeometries.filter(r=>r.meshes.some(m=>m.kind==='release')).length,internalSpringGeometries:report.springGeometries.filter(r=>r.meshes.some(m=>m.kind==='internal')).length,noMatchingSpring:report.noMatchingSpring.map(r=>({id:r.id,model:r.model}))};
fs.writeFileSync(path.join(root,'data/products/detail/quick-connect-material-regions.json'),JSON.stringify(output,null,2)+'\n');
const reportPath=process.argv[2];if(reportPath)fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checked:report.checkedGeometries,springs:report.springGeometries.length,springBySeries:report.springGeometries.reduce((o,r)=>(o[r.series]=(o[r.series]||0)+1,o),{}),unmatched:report.noMatchingSpring,hardware:Object.keys(hardware.geometries).length},null,2));
