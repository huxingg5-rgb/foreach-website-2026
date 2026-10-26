import * as THREE from 'three';
import {diaphragmFaceRoles} from './appearance-diaphragm-roles.js';

// Visual finishes follow the existing product photographs, not the STEP's
// engineering colors or a claim about the material grade of a component.
// Stable original face slots keep the same finish before and after pruning.
export function diaphragmMaterials(src,geometry,modelName,meshIndex){
 const defaults={side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1};
 const definitions={
  plastic:{color:0x151719,metalness:0,roughness:.62,envMapIntensity:.35},
  motorBlack:{color:0x101112,metalness:.15,roughness:.4,envMapIntensity:.55},
  metal:{color:0xaeb2b5,metalness:.85,roughness:.3,envMapIntensity:.8},
  brass:{color:0xb6a36b,metalness:.75,roughness:.38,envMapIntensity:.65},
  connectorBlack:{color:0x111315,metalness:0,roughness:.52,envMapIntensity:.35},
 };
 const names=Object.keys(definitions),materials=names.map(name=>new THREE.MeshStandardMaterial({...defaults,...definitions[name]}));
 const roles=diaphragmFaceRoles(modelName,meshIndex,src.brep_faces?.length);
 geometry.clearGroups();
 for(const [faceIndex,face] of (src.brep_faces||[]).entries()){
  if(face.last<face.first)continue;
  const role=Math.max(0,names.indexOf(roles?.[faceIndex]||'plastic'));
  const start=face.first*3,count=(face.last-face.first+1)*3,last=geometry.groups.at(-1);
  if(last&&last.materialIndex===role&&last.start+last.count===start)last.count+=count;
  else geometry.addGroup(start,count,role);
 }
 if(!src.brep_faces?.length&&src.index.array.length)geometry.addGroup(0,src.index.array.length,0);
 return materials;
}
