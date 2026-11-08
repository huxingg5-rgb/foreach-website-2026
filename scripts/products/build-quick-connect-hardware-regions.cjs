/* eslint-disable @typescript-eslint/no-require-imports -- Offline verified CAD surface matching. */
// Matches reviewed hardware shapes by complete face bounding boxes. No radial
// or thin-band material guesses: plastic guard ribs remain the default body.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),Module=require('node:module');
const root=path.resolve(__dirname,'../..'),manifest=require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const esbuild=require('./solenoid-viewer/node_modules/esbuild'),entry=path.join(__dirname,'solenoid-viewer/compact-cad.js'),decoder=new Module(entry,module);
decoder._compile(esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,logLevel:'silent'}).outputFiles[0].text,entry);
const {decodeCompactCad}=decoder.exports;
function load(id){const d=decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',manifest.geometries[id].model3dUrl))));return {faceCounts:d.meshes.map(m=>m.brep_faces.length),faces:d.meshes.flatMap((mesh,mi)=>mesh.brep_faces.map((f,fi)=>{const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(let j=f.first*3;j<(f.last+1)*3;j++)for(let k=0;k<3;k++){const v=mesh.attributes.position.array[mesh.index.array[j]*3+k];lo[k]=Math.min(lo[k],v);hi[k]=Math.max(hi[k],v);}return {mesh:mi,face:fi,lo,hi};}))};}
const ids=['04956','05238','05271','05265','04965','04969','04971'].map(v=>'quick-connect-515-00-'+v),cache=new Map();const get=id=>{if(!cache.has(id))cache.set(id,load(id));return cache.get(id);};
const references=[
 {id:ids[0],kind:'nut',anchor:140,ranges:[[140,156]]},
 {id:ids[1],kind:'nut',anchor:80,ranges:[[80,89],[117,117],[386,397]]},
 {id:ids[1],kind:'latch',anchor:181,ranges:[[162,235]]},
 {id:ids[2],kind:'latch',anchor:186,ranges:[[167,240]]},
 {id:ids[3],kind:'latch',anchor:70,ranges:[[51,124]]},
 {id:ids[4],kind:'nut',anchor:288,ranges:[[81,84],[288,304]]},
 {id:ids[4],kind:'latch',anchor:13,ranges:[[1,2],[6,27]]},
 // Q60 source rendering: dark silver release plate and round button, light
 // grey PP housing/lock ring, black mounting washer and male toroidal seal.
 {id:ids[5],kind:'latch',anchor:470,ranges:[[432,500]],minimum:48},
 {id:ids[5],kind:'panelSeal',anchor:501,ranges:[[501,501],[542,547]],minimum:5},
 {id:ids[6],kind:'ringSeal',anchor:64,ranges:[[64,65]],minimum:2},
].map(t=>{
 const model=get(t.id),faces=model.faces.filter(f=>f.mesh===0&&t.ranges.some(([a,b])=>f.face>=a&&f.face<=b));
 const body=model.faces.filter(f=>f.mesh===0&&!faces.includes(f)&&(
   t.id===ids[0]&&f.lo[0]>=5.2149&&f.hi[0]<=9.2151 ||
   t.kind==='latch'&&[ids[1],ids[2]].includes(t.id)&&((f.lo[2]>=-19.5001&&f.hi[2]<=-15.9999)||(f.lo[2]>=-27.8001&&f.hi[2]<=-24.7999)) ||
   t.kind==='latch'&&t.id===ids[3]&&(f.face<=50||(f.face>=195&&f.face<=218)) ||
   t.kind==='latch'&&t.id===ids[4]&&(f.face===0||(f.face>=29&&f.face<=36)||(f.lo[2]>=-22.3501&&f.hi[2]<=-18.9499&&!(f.face>=81&&f.face<=84)))));
 return {...t,series:ids.indexOf(t.id)>=5?'Q60':t.id===ids[4]?'Q40':'Q20',faces,body,seed:model.faces.find(f=>f.mesh===0&&f.face===t.anchor)};
});
const permutations=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]],transforms=permutations.flatMap(p=>Array.from({length:8},(_,i)=>({p,s:[0,1,2].map(k=>i&(1<<k)?-1:1)})));
const near=(a,b)=>Math.max(...a.map((v,i)=>Math.abs(v-b[i])))<.012;
const bounds=(f,t)=>{const lo=t.p.map((k,i)=>t.s[i]>0?f.lo[k]:-f.hi[k]),hi=t.p.map((k,i)=>t.s[i]>0?f.hi[k]:-f.lo[k]);return {lo,hi};};
const output={schemaVersion:1,description:'Exact CAD surface templates checked against model-specific product renderings: hardware, plastic guards, Q60 release button/plate and black seals. Q60 housing and lock ring retain light grey PP finish.',references:references.map(({id,kind,anchor,ranges})=>({id,kind,anchor,ranges})),geometries:{}};
for(const[id,geometry]of Object.entries(manifest.geometries)){
 const products=Object.values(manifest.products).filter(p=>p.viewerId===id),product=products[0];if(!['Q20','Q40','Q60'].includes(product.series))continue;
 const target=get(id),byKind={nut:new Set(),latch:new Set(),panelSeal:new Set(),ringSeal:new Set()},bodySet=new Set(),evidence=[];
 for(const template of references){
  if(template.series!==product.series)continue;
  if(template.kind==='nut'&&product.panel!=='M'||template.kind==='latch'&&product.gender!=='S'||template.kind==='panelSeal'&&product.panel!=='M'||template.kind==='ringSeal'&&product.gender!=='P')continue;
  let best=null;
  for(const transform of transforms){
   const seed=bounds(template.seed,transform),span=seed.hi.map((v,k)=>v-seed.lo[k]);
   for(const candidate of target.faces.filter(f=>near(f.hi.map((v,k)=>v-f.lo[k]),span))){
    const offset=candidate.lo.map((v,k)=>v-seed.lo[k]);let matches=[];
    for(const face of template.faces){const b=bounds(face,transform);const lo=b.lo.map((v,k)=>v+offset[k]),hi=b.hi.map((v,k)=>v+offset[k]);const found=target.faces.filter(f=>near(f.lo,lo)&&near(f.hi,hi));if(found.length===1)matches.push(found[0].mesh+':'+found[0].face);}
    if(!best||matches.length>best.matches.length)best={matches,transform,offset};
   }
  }
  const minimum=template.minimum??(template.kind==='nut'?14:template.series==='Q40'?20:54);
  if(best&&best.matches.length>=minimum){for(const f of best.matches)byKind[template.kind].add(f);
   if(template.id!==ids[3]||product.panel==='N')for(const face of template.body){const b=bounds(face,best.transform),lo=b.lo.map((v,k)=>v+best.offset[k]),hi=b.hi.map((v,k)=>v+best.offset[k]);const found=target.faces.filter(f=>near(f.lo,lo)&&near(f.hi,hi));if(found.length===1)bodySet.add(found[0].mesh+':'+found[0].face);}
   evidence.push({reference:template.id,kind:template.kind,matchedFaces:best.matches.length,templateFaces:template.faces.length,transform:best.transform,offset:best.offset});}
 }
 // This source keeps the release plate as a separate 82-face solid. Its
 // 0.9 mm plate and folded 0.9 mm button share the Q40 template dimensions.
 // The two other isolated solids are the PP housing and threaded connector.
 if(id==='quick-connect-515-00-05317'){
  if(target.faceCounts.join(',')!=='108,13,14,29,82,43')throw Error('Q4014N component structure changed');
  for(const f of target.faces){if(f.mesh===4)byKind.latch.add(f.mesh+':'+f.face);if(f.mesh===0||f.mesh===5)bodySet.add(f.mesh+':'+f.face);}
  evidence.push({kind:'latch',reference:id,isolatedMesh:4,matchedFaces:82,method:'separate release plate solid; matching Q40 plate and button dimensions'});
 }
 // Require recognition of each hardware kind, but retain partial status: CAD
 // intersections can split a few source surfaces differently across variants.
 const complete=(product.panel!=='M'||byKind.nut.size>=17)&&(product.gender!=='S'||byKind.latch.size>=(product.series==='Q40'?20:54));
 if(!complete&&product.series==='Q20')throw Error('Unreviewed hardware variant '+product.model+' '+JSON.stringify(Object.fromEntries(Object.entries(byKind).map(([k,v])=>[k,v.size]))));
 const pairs=set=>[...set].map(v=>v.split(':').map(Number)).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const steel=pairs(new Set([...byKind.nut,...byKind.latch]));
 const seals=pairs(new Set([...byKind.panelSeal,...byKind.ringSeal]));
 const body=pairs(bodySet).filter(([m,f])=>!steel.some(([mi,fi])=>m===mi&&f===fi));
 output.geometries[id]={sourceSha256:geometry.sourceSha256,meshes:target.faceCounts.map((faceCount,mi)=>({faceCount,steelFaces:steel.filter(([m])=>m===mi).map(([,f])=>f),bodyFaces:body.filter(([m])=>m===mi).map(([,f])=>f),sealFaces:seals.filter(([m])=>m===mi).map(([,f])=>f),complete:false})),evidence};
}
// Re-check every inferred steel face against complete source surfaces and
// surface normals, then apply hash-locked isolated-component evidence.
const refinement=require('./refine-quick-connect-female-materials.cjs')(manifest,output,output);
output.review={method:'Complete CAD surfaces, same-facing normals, and fixed-identity isolated components',femaleGeometries:refinement.checkedFemaleGeometries,sourceSurfaceToleranceMm:refinement.toleranceMm,sourceNormalDotMinimum:refinement.normalDotMinimum};
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(refinement,null,2)+'\n');
const destination=path.join(root,'data/products/detail/quick-connect-hardware-regions.json');fs.writeFileSync(destination,JSON.stringify(output,null,2)+'\n');console.log('Matched Q20/Q40/Q60 hardware in '+Object.keys(output.geometries).length+' geometries.');
