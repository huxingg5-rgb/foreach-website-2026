// Restore whole original faces flagged by the independent rendered comparison.
// Usage: --before DIR --after DIR --report FILE
const fs=require('node:fs'),path=require('node:path');
const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,s)=>v.startsWith('--')?[...a,[v.slice(2),s[i+1]]]:a,[]));
if(!args.before||!args.after||!args.report)throw new Error('Need --before, --after and --report');
if(path.resolve(args.before).toLowerCase()===path.resolve(args.after).toLowerCase())throw new Error('Keep the original directory separate from candidates');
const report=JSON.parse(fs.readFileSync(args.report));
if(report.status==='running'||report.status==='error')throw new Error('A completed review report is required');
for(const model of report.models){
  if(!/^(rpl-p4|rpl-p635|rpl-p15|drpl-0109|dpl30-db|dpl30-bb|dpl60-db|dpl60-bb|dpl30h-ds|dpl30h-bs|dpgl800-bs)$/.test(model.id))throw new Error('Unknown model');
  const file=path.join(args.after,model.id+'.json');
  const original=JSON.parse(fs.readFileSync(path.join(args.before,model.id+'.json')));
  const candidate=JSON.parse(fs.readFileSync(file));
  if(!candidate.exteriorOptimized)throw new Error('Expected a pruned candidate');
  if(!Array.isArray(model.restoreFaces))throw new Error('Expected a review report with face attribution');
  for(const pair of model.restoreFaces){
    if(!Array.isArray(pair)||pair.length!==2||!pair.every(Number.isInteger)||!original.meshes[pair[0]]?.brep_faces[pair[1]])throw new Error('Invalid original face ID');
  }
  const restore=new Set(model.restoreFaces.map(([mi,fi])=>`${mi}:${fi}`));
  let restored=0,triangles=0;
  for(const [mi,src] of original.meshes.entries()){
    const keep=src.brep_faces.map((face,fi)=>{
      const surviving=candidate.meshes[mi].brep_faces[fi];
      if(surviving.first<=surviving.last)return true;
      if(restore.has(`${mi}:${fi}`)){restored++;return true;}return false;
    });
    const attributes={};for(const [key,value] of Object.entries(src.attributes))attributes[key]={...value,array:[]};
    const indices=[],remap=new Map();
    const faces=src.brep_faces.map((face,fi)=>{
      const first=indices.length/3;
      if(keep[fi])for(let j=face.first*3;j<(face.last+1)*3;j++){
        const old=src.index.array[j];
        if(!remap.has(old)){
          remap.set(old,remap.size);
          for(const [key,value] of Object.entries(src.attributes)){
            const size=value.itemSize||3;
            attributes[key].array.push(...value.array.slice(old*size,(old+1)*size));
          }
        }
        indices.push(remap.get(old));
      }
      return {...face,first,last:indices.length/3-1};
    });
    candidate.meshes[mi]={...src,attributes,index:{...src.index,array:indices},brep_faces:faces};
    triangles+=indices.length/3;
  }
  candidate.exteriorOptimized.retainedTriangles=triangles;
  candidate.exteriorOptimized.reviewRestoredFaces=(candidate.exteriorOptimized.reviewRestoredFaces||0)+restored;
  // The edge references target the candidate's current tessellation; regenerate
  // them after restoring faces instead of silently reusing stale indices.
  if(restored)delete candidate.exteriorOptimized.edgeReconstruction;
  fs.writeFileSync(file,JSON.stringify(candidate));
  console.log(JSON.stringify({id:model.id,restoredFaces:restored,triangles}));
}
