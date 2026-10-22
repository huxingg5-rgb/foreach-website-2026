import * as THREE from 'three';
// Visual match to local photographs 01.webp--04.webp. No CAD material claims.
const palette={housing:0xc9cbc7,head:0xd8d7c9,base:0xbda174,connector:0xeff0eb,red:0xbb2820,black:0x17191b,silver:0xc9ccce};
export function photoMaterials(src,geometry,baseZ,isPlate){
 const defaults={side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1};
 const body=new THREE.MeshStandardMaterial({...defaults,color:0xffffff,metalness:.06,roughness:.48});
 body.onBeforeCompile=shader=>{
  shader.uniforms.baseZ={value:baseZ};
  for(const key of ['housing','head','base','connector'])shader.uniforms['photo_'+key]={value:new THREE.Color(palette[key])};
  shader.vertexShader='varying vec3 photoPosition;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nphotoPosition = position;');
  shader.fragmentShader='varying vec3 photoPosition;\nuniform float baseZ;\nuniform vec3 photo_housing, photo_head, photo_base, photo_connector;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float heightFromBody = photoPosition.z - baseZ;
   vec3 photoColor = photo_housing;
   if(heightFromBody > 0.0) photoColor = photo_head;
   if(heightFromBody > 11.9) photoColor = photo_base;
   ${isPlate?'':'if(heightFromBody > 14.94) photoColor = photo_connector;'}
   diffuseColor.rgb *= photoColor;
  `);
 };
 body.customProgramCacheKey=()=>isPlate?'photo-plate-v1':'photo-thread-v1';
 const red=new THREE.MeshStandardMaterial({...defaults,color:palette.red,metalness:0,roughness:.48});
 const black=new THREE.MeshStandardMaterial({...defaults,color:palette.black,metalness:0,roughness:.48});
 const silver=new THREE.MeshStandardMaterial({...defaults,color:palette.silver,metalness:.65,roughness:.28});
 const mats=[body,red,black,silver];
 const positions=src.attributes.position.array,indices=src.index.array;
 const faces=src.brep_faces.map(face=>{const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let j=face.first*3;j<(face.last+1)*3;j++){const v=indices[j]*3;for(let k=0;k<3;k++){min[k]=Math.min(min[k],positions[v+k]);max[k]=Math.max(max[k],positions[v+k]);}}return {face,min,max,center:min.map((v,k)=>(v+max[k])/2)};});
 const wireFaces=src.appearanceRole==='wires'?faces:faces.filter(f=>f.min[2]-baseZ < -50 && f.max[2]-baseZ < -40);
 let wireAxis=0,wireCenter=0;
 if(wireFaces.length){const ranges=[0,1].map(k=>[Math.min(...wireFaces.map(f=>f.center[k])),Math.max(...wireFaces.map(f=>f.center[k]))]);wireAxis=ranges[0][1]-ranges[0][0]>ranges[1][1]-ranges[1][0]?0:1;wireCenter=(ranges[wireAxis][0]+ranges[wireAxis][1])/2;}
 geometry.clearGroups();
 let previousGroup=null;
 for(const f of faces){let role=0;const zlo=f.min[2]-baseZ,zhi=f.max[2]-baseZ;
  if(src.appearanceRole==='fastener')role=3;
  else if(src.appearanceRole==='wires'||zlo<-50&&zhi<-40)role=f.center[wireAxis]<wireCenter?1:2;
  // Detailed screw surfaces within the CAD's fastener height bands.
  else if((zlo>=6.89&&zhi<=8.91||zlo>=9.39&&zhi<=10.91||!isPlate&&zlo>=5.88&&zhi<=7.94)&&f.max[0]-f.min[0]<5&&f.max[1]-f.min[1]<5)role=3;
  else if(!src.name&&zlo>14.85)role=3;
  const start=f.face.first*3,count=(f.face.last-f.face.first+1)*3;
  if(previousGroup&&previousGroup.materialIndex===role&&previousGroup.start+previousGroup.count===start)previousGroup.count+=count;
  else{geometry.addGroup(start,count,role);previousGroup=geometry.groups.at(-1);}
 }
 return mats;
}
