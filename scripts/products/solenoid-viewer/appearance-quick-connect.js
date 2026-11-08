import * as THREE from 'three';
import {createDisplayEdges} from './edges-rpl.js';
import {getQuickConnectMaterialRoles} from './quick-connect-material-regions.js';

export function quickConnectDisplayEdges(src,geometry,preview=false){
 if(!preview||!src.reviewedDisplayEdges)return createDisplayEdges(geometry);
 const edges=new THREE.BufferGeometry();
 edges.setAttribute('position',new THREE.Float32BufferAttribute(src.reviewedDisplayEdges,3));
 return edges;
}

// Visual finishes checked against the existing exact-model product photos.
// Geometry and material names remain those of the verified product record.
const palette={POM:0xe1e3df,PP:0xd2cba8,seal:0x181a1b,steel:0xa2a7ac};

export function quickConnectMaterials(src,geometry,product,data,preview=false){
 const finish=preview?{POM:0xb4b8b2,PP:0xb8aa76,seal:0x151719,steel:0x8e9091}:palette;
 const defaults={side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1};
 // Calibrated against the Q60 product renders: medium cool grey under the
 // viewer lighting, distinct from the silver release plate and black seals.
 const bodyColor=product.series==='Q60'?0x8f989b:finish[product.housingMaterial]??finish.POM;
 const body=new THREE.MeshStandardMaterial({...defaults,color:bodyColor,metalness:0,roughness:preview?.54:.4,envMapIntensity:preview?.28:.45});
 const seal=new THREE.MeshStandardMaterial({...defaults,color:finish.seal,metalness:0,roughness:.57});
 const steel=new THREE.MeshStandardMaterial({...defaults,color:product.series==='Q60'?0x73797c:finish.steel,metalness:preview?.82:.72,roughness:.3,envMapIntensity:preview?.9:.7});
 const faceRoles=getQuickConnectMaterialRoles(src,product,data);
 const reviewed=preview&&data.appearance?.reviewedQ2001Materials;
 // Female hardware is identified from the source components/surfaces. The
 // housing must not inherit a metal finish merely for being near the button.
 if(product.gender==='S'||reviewed||faceRoles?.every(role=>role!==undefined)){
  geometry.clearGroups();let previous;
  for(const [i,face]of src.brep_faces.entries()){
   const role=faceRoles?.[i]??(reviewed?face.materialRole:0)??0,start=face.first*3,length=(face.last-face.first+1)*3;
   if(previous&&previous.materialIndex===role&&previous.start+previous.count===start)previous.count+=length;
   else{geometry.addGroup(start,length,role);previous=geometry.groups.at(-1);}
  }
  return [body,seal,steel];
 }
 const p=src.attributes.position.array,indices=src.index.array,axis=data.mating.axis,center=data.mating.center;
 const perpendicular=[0,1,2].filter(k=>k!==axis),min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 for(let i=0;i<p.length;i+=3)for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[i+k]);max[k]=Math.max(max[k],p[i+k]);}
 const ringRadius=product.series==='Q20'?4.25:product.series==='Q40'?5.9:9.65;
 const radialSize=Math.max(...perpendicular.map(k=>(max[k]-min[k])/2));
 // The Q20 sealing torus is a separate, thin closed source mesh. Do not color
 // internal valve plugs or invent an O-ring when the supplied CAD omits it.
 const isSeal=product.gender==='P'&&max[axis]-min[axis]<2.6&&Math.abs(radialSize-ringRadius)<.13;
 geometry.clearGroups();
 if(isSeal){geometry.addGroup(0,indices.length,1);return [body,seal,steel];}
 const faces=src.brep_faces||[{first:0,last:indices.length/3-1}];
 const nutRadius=product.series==='Q20'?7.7:10.2;
 let previous;
 for(const [i,face]of faces.entries()){
  let lo=Infinity,hi=-Infinity,radial=0,count=0,nAxial=0;
  for(let j=face.first*3;j<(face.last+1)*3;j++){
   const v=indices[j]*3;lo=Math.min(lo,p[v+axis]);hi=Math.max(hi,p[v+axis]);
   radial+=Math.hypot(...perpendicular.map(k=>p[v+k]-center[k]));
   nAxial+=Math.abs(src.attributes.normal?.array[v+axis]??1);count++;
  }
  radial/=count;nAxial/=count;
  // Only the exposed planar flats of the separate metal lock nut are tinted;
  // the plastic flange and the threaded body keep the housing finish.
  const nut=product.panel==='M'&&product.series!=='Q60'&&radial>nutRadius&&nAxial<.08&&(hi-lo)>1.6&&(hi-lo)<7;
  const role=faceRoles?.[i]??(nut?2:0),start=face.first*3,length=(face.last-face.first+1)*3;
  if(previous&&previous.materialIndex===role&&previous.start+previous.count===start)previous.count+=length;
  else{geometry.addGroup(start,length,role);previous=geometry.groups.at(-1);}
 }
 return [body,seal,steel];
}
