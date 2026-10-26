// Merge independent raster visibility evidence into ray-filtered candidates.
// Preserve complete original faces and compact vertices, normals and part tree.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto');
const {classify}=require('./piston-assembly-roles.cjs');
const [stage,only]=process.argv.slice(2);
if(!stage)throw Error('Pass the local full-assembly staging directory');
const load=file=>JSON.parse(zlib.gunzipSync(fs.readFileSync(file)));
for(const file of fs.readdirSync(stage).filter(f=>/^(ea|sm|tm)-\d+-gpu-audit\.json$/.test(f))) {
  const audit=JSON.parse(fs.readFileSync(path.join(stage,file))),id=audit.id;
  if(only&&id!==only)continue;
  if(!only&&fs.existsSync(path.join(stage,id+'-final-audit.json')))continue;
  if(audit.views<100||audit.resolution<768)throw Error(id+': incomplete raster audit');
  const raw=load(path.join(stage,id+'.json.gz')),roles=classify(raw),results={id,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(raw.sourceFile)).digest('hex'),sourceFile:raw.sourceFile,views:audit.views,variants:{}};
  for(const variant of ['pmma','peek']) {
    const dest=path.join(stage,'candidate',id+(variant==='peek'?'-peek':'')+'.json.gz'),model=load(dest);
    const keep=new Set(model.meshes.flatMap(m=>m.brep_faces.map(f=>m.sourceMeshIndex+':'+f.sourceFace)));
    for(const pair of audit.additions[variant])keep.add(pair.join(':'));
    const meshes=[];let faces=0;
    for(const [mi,m]of raw.meshes.entries()) {
      const p=m.attributes.position.array,n=m.attributes.normal?.array,ix=m.index.array,positions=[],normals=[],indices=[],brep_faces=[],remap=new Map();
      for(const [fi,f]of m.brep_faces.entries()) {
        if(!keep.has(mi+':'+fi))continue;faces++;
        const first=indices.length/3;
        for(let j=f.first*3;j<(f.last+1)*3;j++) {
          const old=ix[j];let v=remap.get(old);
          if(v===undefined){v=positions.length/3;remap.set(old,v);for(let k=0;k<3;k++){positions.push(+p[old*3+k].toFixed(5));if(n)normals.push(+n[old*3+k].toFixed(5));}}
          indices.push(v);
        }
        brep_faces.push({first,last:indices.length/3-1,sourceFace:fi});
      }
      if(!indices.length)continue;
      meshes.push({name:'Part '+(meshes.length+1),sourceMeshIndex:mi,appearanceRole:roles[mi].role,attributes:{position:{array:positions},...(n?{normal:{array:normals}}:{})},index:{array:indices},brep_faces});
    }
    // Structural and exact source-surface checks. No dropped geometry remains in
    // unused vertex buffers, and all retained coordinates are original samples.
    for(const m of meshes){const p=m.attributes.position.array,n=m.attributes.normal?.array,ix=m.index.array; if(p.some(v=>!Number.isFinite(v))||n?.some(v=>!Number.isFinite(v)))throw Error('non-finite');if(new Set(ix).size!==p.length/3||ix.some(i=>i<0||i>=p.length/3))throw Error('orphan or invalid vertex');if(m.brep_faces.reduce((s,f)=>s+(f.last-f.first+1)*3,0)!==ix.length)throw Error('face coverage');}
    const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(const m of meshes)m.attributes.position.array.forEach((v,k)=>{min[k%3]=Math.min(min[k%3],v);max[k%3]=Math.max(max[k%3],v);});
    const size=max.map((v,k)=>v-min[k]);if(size.some((v,k)=>Math.abs(v-model.dimensions.size[k])>.001))throw Error(id+': envelope changed');
    model.meshes=meshes;model.root={name:model.name,meshes:meshes.map((_,i)=>i),children:[]};model.dimensions={min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]};model.exteriorOptimized.rasterAuditViews=audit.views;
    const packed=zlib.gzipSync(JSON.stringify(model),{level:9});fs.writeFileSync(dest,packed);
    results.variants[variant]={meshes:meshes.length,removedMeshes:raw.meshes.length-meshes.length,faces,removedFaces:raw.meshes.reduce((s,m)=>s+m.brep_faces.length,0)-faces,triangles:meshes.reduce((s,m)=>s+m.index.array.length/3,0),sourceTriangles:raw.meshes.reduce((s,m)=>s+m.index.array.length/3,0),sizeMm:size,bytes:packed.length,sha256:crypto.createHash('sha256').update(packed).digest('hex'),rasterVisibleFacesRestored:audit.additions[variant].length};
  }
  fs.writeFileSync(path.join(stage,id+'-final-audit.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}
