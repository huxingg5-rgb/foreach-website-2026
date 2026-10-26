// Conservative website-only pruning. Preserve every retained BREP face verbatim.
// Usage: node ... --before DIR --after DIR --deps DIR [--model drpl-0109]
// --deps points to an isolated npm install of three + three-mesh-bvh.
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,s)=>v.startsWith('--')?[...a,[v.slice(2),s[i+1]]]:a,[]));
const ids=args.model?[args.model]:['rpl-p4','rpl-p635','rpl-p15','drpl-0109'];
async function main(){
  if(!args.before||!args.after||!args.deps)throw new Error('Need --before, --after and --deps');
  if(path.resolve(args.before).toLowerCase()===path.resolve(args.after).toLowerCase())throw new Error('Keep the original directory separate from candidates');
  const THREE=await import(pathToFileURL(path.join(args.deps,'three/build/three.module.js')));
  const {MeshBVH,SAH}=await import(pathToFileURL(path.join(args.deps,'three-mesh-bvh/src/index.js')));
  fs.mkdirSync(args.after,{recursive:true});
  for(const id of ids){
    const input=JSON.parse(fs.readFileSync(path.join(args.before,id+'.json')));
    if(input.exteriorOptimized)throw new Error('Use unmodified original models');
    let vertexCount=0,indexCount=0;for(const s of input.meshes){vertexCount+=s.attributes.position.array.length/3;indexCount+=s.index.array.length;}
    const positions=new Float32Array(vertexCount*3),indices=new Uint32Array(indexCount);
    let vo=0,io=0;input.meshes.forEach(s=>{positions.set(s.attributes.position.array,vo*3);s.index.array.forEach((v,j)=>indices[io+j]=v+vo);io+=s.index.array.length;vo+=s.attributes.position.array.length/3;});
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setIndex(new THREE.BufferAttribute(indices,1));
    const bvh=new MeshBVH(geometry,{strategy:SAH,indirect:true,targetLeafSize:8});
    const ray=new THREE.Ray(),point=new THREE.Vector3(),a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),normal=new THREE.Vector3(),edge=new THREE.Vector3();
    const directions=[];for(let k=0;k<80;k++){const y=1-2*(k+.5)/80,r=Math.sqrt(1-y*y),angle=k*Math.PI*(3-Math.sqrt(5));directions.push(new THREE.Vector3(r*Math.cos(angle),y,r*Math.sin(angle)));}
    for(let k=0;k<3;k++)for(const sign of [-1,1]){const v=new THREE.Vector3();v.setComponent(k,sign);directions.push(v);}
    const bounds=input.dimensions;const removed=[],stats={model:id,beforeTriangles:indexCount/3,afterTriangles:0,removedFaces:0,rays:0,removedMeshFaces:{}};
    function escapes(p,d){ray.direction.copy(d);ray.origin.copy(p).addScaledVector(d,.0005);stats.rays++;return !bvh.raycastFirst(ray,THREE.DoubleSide,0,Infinity);}
    function visiblePoint(p,n,full){
      // Extrema also control camera fit and dimension alignment; never remove them.
      if(['x','y','z'].some((k,i)=>Math.abs(p[k]-bounds.min[i])<.00001||Math.abs(p[k]-bounds.max[i])<.00001))return true;
      if(escapes(p,n)||escapes(p,normal.clone().copy(n).negate()))return true;
      if(full)for(const d of directions)if(escapes(p,d))return true;
      return false;
    }
    for(const [mi,s] of input.meshes.entries()){
      const p=s.attributes.position.array,ix=s.index.array,keep=[];
      for(const [fi,f] of s.brep_faces.entries()){
        let visible=false;
        // All triangle centroids are checked; then all vertices and edge midpoints
        // are checked along their smooth normals. Any exposure preserves the ENTIRE face.
        for(let t=f.first;t<=f.last&&!visible;t++){
          a.fromArray(p,ix[t*3]*3);b.fromArray(p,ix[t*3+1]*3);c.fromArray(p,ix[t*3+2]*3);
          normal.subVectors(b,a).cross(edge.subVectors(c,a)).normalize();
          point.copy(a).add(b).add(c).multiplyScalar(1/3);
          if(visiblePoint(point,normal,true)){visible=true;break;}
          for(let j=0;j<3&&!visible;j++){
            const vi=ix[t*3+j];point.fromArray(p,vi*3);
            const n=s.attributes.normal?new THREE.Vector3().fromArray(s.attributes.normal.array,vi*3).normalize():normal;
            if(visiblePoint(point,n,false)){visible=true;break;}
            point.add(new THREE.Vector3().fromArray(p,ix[t*3+(j+1)%3]*3)).multiplyScalar(.5);
            if(visiblePoint(point,normal,false))visible=true;
          }
        }
        keep[fi]=visible;
        if(!visible){removed.push([mi,fi]);stats.removedFaces++;stats.removedMeshFaces[mi]=(stats.removedMeshFaces[mi]||0)+1;}
      }
      // Retain empty face/mesh slots so original material IDs and tree refs stay stable.
      const newIndex=[],remap=new Map(),newAttributes={};
      for(const key of Object.keys(s.attributes))newAttributes[key]={...s.attributes[key],array:[]};
      s.brep_faces=s.brep_faces.map((f,fi)=>{const first=newIndex.length/3;if(keep[fi])for(let i=f.first*3;i<(f.last+1)*3;i++){
        const old=ix[i];if(!remap.has(old)){remap.set(old,remap.size);for(const [key,attr] of Object.entries(s.attributes)){const size=attr.itemSize||3;newAttributes[key].array.push(...attr.array.slice(old*size,(old+1)*size));}}newIndex.push(remap.get(old));
      }return {...f,first,last:newIndex.length/3-1};});
      s.attributes=newAttributes;s.index={...s.index,array:newIndex};stats.afterTriangles+=newIndex.length/3;
      if(mi%12===0)console.log(id,'mesh',mi+'/'+input.meshes.length,'removed faces',stats.removedFaces,'rays',stats.rays);
    }
    input.exteriorOptimized={method:'whole-brep-face-occlusion',version:1,sphereDirections:80,axisDirections:6,sourceTriangles:stats.beforeTriangles,retainedTriangles:stats.afterTriangles};
    fs.writeFileSync(path.join(args.after,id+'.json'),JSON.stringify(input));
    fs.writeFileSync(path.join(args.after,id+'-pruning-report.json'),JSON.stringify({...stats,removed},null,2));
    console.log(JSON.stringify(stats));geometry.dispose();
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
