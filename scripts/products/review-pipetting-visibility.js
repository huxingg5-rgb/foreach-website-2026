import * as THREE from '/three/build/three.module.js';
const ids=['smtp2-500','smtp2-510','smtp2-520','smtp4-100ul','smtp4-250ul','smtp4-500ul'],size=1024;
const r=new THREE.WebGLRenderer({antialias:false});r.setSize(size,size);r.setClearColor(0);document.querySelector('#canvas').append(r.domElement);
const target=new THREE.WebGLRenderTarget(size,size);target.texture.colorSpace=THREE.NoColorSpace;
const mat=new THREE.ShaderMaterial({side:THREE.DoubleSide,vertexShader:'attribute vec3 faceColor; varying vec3 vColor; void main(){vColor=faceColor;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,1.0);}'});
const dirs=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])dirs.push([x,y,z]);
for(let i=0;i<128;i++){const y=1-2*(i+.217)/128,a=i*2.399963+.717,rad=Math.sqrt(1-y*y);dirs.push([rad*Math.cos(a),y,rad*Math.sin(a)]);}
const next=()=>new Promise(resolve=>{const c=new MessageChannel();c.port1.onmessage=()=>{c.port1.close();c.port2.close();resolve();};c.port2.postMessage(null);});
document.querySelector('#run').onclick=async()=>{document.querySelector('#run').disabled=true;try{
 for(const id of ids){
  const response=await fetch('/raw/'+id+'.json.gz');const raw=JSON.parse(await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).text());
  const scene=new THREE.Scene(),group=new THREE.Group(),lookup=[null],seen=new Set();scene.add(group);
  for(const [mi,m]of raw.meshes.entries()){
   const n=m.index.array.length,p=new Float32Array(n*3),colors=new Uint8Array(n*3);let off=0;
   for(const [fi,f]of m.brep_faces.entries()){const code=lookup.length;lookup.push([mi,fi]);for(let j=f.first*3;j<(f.last+1)*3;j++){const vi=m.index.array[j]*3;p.set(m.attributes.position.array.slice(vi,vi+3),off);colors.set([code&255,(code>>8)&255,(code>>16)&255],off);off+=3;}}
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('faceColor',new THREE.BufferAttribute(colors,3,true));group.add(new THREE.Mesh(g,mat));
  }
  const box=new THREE.Box3().setFromObject(group),center=box.getCenter(new THREE.Vector3()),radius=box.getSize(new THREE.Vector3()).length()*.53;group.position.copy(center).negate();
  const camera=new THREE.OrthographicCamera(-radius,radius,radius,-radius,.01,radius*20),pixels=new Uint8Array(size*size*4);
  for(const [vi,d]of dirs.entries()){
   camera.position.set(...d).normalize().multiplyScalar(radius*5);camera.up.set(0,1,0);if(Math.abs(d[1])===1&&d[0]===0&&d[2]===0)camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld();
   for(const shift of [[0,0],[.375,.125]]){const projection=camera.projectionMatrix.clone();camera.projectionMatrix.elements[12]+=2*shift[0]/size;camera.projectionMatrix.elements[13]+=2*shift[1]/size;r.setRenderTarget(target);r.render(scene,camera);r.readRenderTargetPixels(target,0,0,size,size,pixels);for(let j=0;j<pixels.length;j+=4){const code=pixels[j]+pixels[j+1]*256+pixels[j+2]*65536;if(code&&lookup[code])seen.add(code);}camera.projectionMatrix.copy(projection);}
   r.setRenderTarget(null);r.render(scene,camera);document.querySelector('#status').textContent=id+'：'+(vi+1)+' / '+dirs.length+' 方向';if(vi%3===0)await next();
  }
  const report={id,views:dirs.length,resolution:size,samplesPerPixel:2,keep:[...seen].map(c=>lookup[c])};
  await fetch('/audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(report)});
  document.querySelector('#report').textContent+=id+'：'+seen.size+' 个可见面\n';for(const mesh of group.children)mesh.geometry.dispose();r.renderLists.dispose();await next();
 }
 document.querySelector('#status').textContent='全部 6 个型号可见性核验完成';
}catch(e){document.querySelector('#status').textContent=String(e);console.error(e);}finally{document.querySelector('#run').disabled=false;}};
