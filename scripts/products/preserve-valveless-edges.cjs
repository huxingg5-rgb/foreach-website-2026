// Keep the original CAD display edges; pruning must not create artificial seams.
const fs=require('node:fs'),path=require('node:path');
const THREE=require(require.resolve('three',{paths:[path.join(__dirname,'solenoid-viewer')]}));
const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,s)=>v.startsWith('--')?[...a,[v.slice(2),s[i+1]]]:a,[]));
if(!args.before||!args.after||path.resolve(args.before).toLowerCase()===path.resolve(args.after).toLowerCase())throw new Error('Separate --before and --after directories required');
for(const id of args.model?[args.model]:['rpl-p4','rpl-p635','rpl-p15','drpl-0109']){
 const original=JSON.parse(fs.readFileSync(path.join(args.before,id+'.json'))),file=path.join(args.after,id+'.json'),candidate=JSON.parse(fs.readFileSync(file));
 if(!candidate.exteriorOptimized)throw new Error('Expected optimized candidate');
 const edgeReconstruction={};let bytes=0;
 const encode=a=>Buffer.from(a.buffer,a.byteOffset,a.byteLength).toString('base64');
 const make=src=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));g.setIndex(src.index.array);const e=new THREE.EdgesGeometry(g,26);g.dispose();return e;};
 const key=(a,i)=>Array.from(a.slice(i,i+6)).join(',');
 original.meshes.forEach((src,i)=>{
  if(!candidate.meshes[i].brep_faces.some(face=>face.first>face.last))return;
  const edges=make(src),base=make(candidate.meshes[i]),array=edges.attributes.position.array,current=base.attributes.position.array;
  const lookup=new Map();for(let j=0;j<current.length;j+=6){lookup.set(key(current,j),(j/6)*2);lookup.set([...current.slice(j+3,j+6),...current.slice(j,j+3)].join(','),(j/6)*2+1);}
  const order=new Int32Array(array.length/6),added=[];
  for(let j=0;j<array.length;j+=6){const existing=lookup.get(key(array,j));if(existing!==undefined)order[j/6]=existing;else{order[j/6]=-1-added.length/6;added.push(...array.slice(j,j+6));}}
  const extra=new Float32Array(added);edgeReconstruction[i]={order:encode(order),added:encode(extra)};bytes+=order.byteLength+extra.byteLength;
  edges.dispose();base.dispose();
 });
 delete candidate.exteriorOptimized.edgePositionsBase64;
 candidate.exteriorOptimized.edgeReconstruction=edgeReconstruction;
 fs.writeFileSync(file,JSON.stringify(candidate));console.log(JSON.stringify({id,edgeBytes:bytes,meshCount:Object.keys(edgeReconstruction).length}));
}
