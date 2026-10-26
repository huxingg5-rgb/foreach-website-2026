// Package already reviewed exterior candidates, without touching source GLBs or 2D drawings.
// node ... CANDIDATE_DIRECTORY SOURCES_JSON
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto');
const input=process.argv[2],sources=process.argv[3];
if(!input||!sources)throw Error('Pass reviewed candidate directory and sources.json');
const output=path.resolve(__dirname,'../../public/models/products/pumps/diaphragm-pumps/cad');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const manifest=JSON.parse(fs.readFileSync(sources));
const ids=['dpl30-db','dpl30-bb','dpl60-db','dpl60-bb','dpl30h-ds','dpl30h-bs','dpgl800-bs'];
if(manifest.length!==ids.length||ids.some(id=>!manifest.some(item=>item.slug===id)))throw Error('Unexpected model manifest');
const pending=[];
for(const item of manifest){
 const bytes=fs.readFileSync(path.join(input,item.slug+'.json')),data=JSON.parse(bytes);
 if(item.name!==item.slug.toUpperCase()||data.name!==item.name)throw Error('Candidate identity does not match the source manifest: '+item.slug);
 if(!data.appearance?.diaphragm||!data.exteriorOnly||!data.exteriorOptimized)throw Error('Expected an exterior-only diaphragm candidate: '+item.slug);
 const triangles=data.meshes.reduce((sum,mesh)=>sum+mesh.index.array.length/3,0);
 if(!Number.isInteger(triangles)||triangles<=0||triangles>item.triangles||triangles!==data.exteriorOptimized.retainedTriangles)throw Error('Invalid candidate triangle count: '+item.slug);
 const packed=zlib.gzipSync(bytes,{level:9});
 if(!zlib.gunzipSync(packed).equals(bytes))throw Error('Gzip round-trip failed');
 if(packed.length>24*1024*1024)throw Error('Model exceeds static asset limit');
 pending.push({file:item.slug+'.json.gz',packed});
 item.optimized={triangles:data.exteriorOptimized.retainedTriangles,nonemptyMeshes:data.meshes.filter(m=>m.index.array.length).length,
  jsonBytes:bytes.length,gzipBytes:packed.length,jsonSha256:hash(bytes),gzipSha256:hash(packed)};
 console.log(JSON.stringify({id:item.slug,...item.optimized}));
}
// Validate the complete batch before replacing any production asset.
fs.mkdirSync(output,{recursive:true});
for(const item of pending)fs.writeFileSync(path.join(output,item.file),item.packed);
fs.writeFileSync(path.join(output,'sources.json'),JSON.stringify(manifest,null,2)+'\n');
