import * as THREE from 'three';
import {pistonFinishGeometry} from './appearance-piston-roles.js';

// Finishes follow product photographs. Full-assembly assets carry component
// roles and retain only surfaces visible with the selected head material.
export function pistonMaterials(src, geometry, modelName, meshIndex, headMaterial = 'pmma') {
  if (typeof src.appearanceRole === 'number') {
    geometry.clearGroups();
    geometry.addGroup(0, src.index.array.length, src.appearanceRole);
  } else {
    const finish = pistonFinishGeometry(src, modelName, src.appearanceRole === 'motor-bands' ? -1 : meshIndex);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(finish.positions, 3));
    if (finish.normals) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(finish.normals, 3));
    geometry.setIndex(finish.indices);
    geometry.clearGroups();
    finish.groups.forEach(group => geometry.addGroup(group.start, group.count, group.materialIndex));
    if (!finish.normals) geometry.computeVertexNormals();
  }
  const base = {side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1};
  return [
    new THREE.MeshStandardMaterial({...base, color: 0x17191c, metalness: .25, roughness: .42, envMapIntensity: .65}),
    new THREE.MeshStandardMaterial({...base, color: 0x101113, metalness: .12, roughness: .68, envMapIntensity: .4}),
    new THREE.MeshStandardMaterial({...base, color: 0xbfc2c5, metalness: .78, roughness: .34, envMapIntensity: .85}),
    new THREE.MeshStandardMaterial({...base, color: 0xc9ced2, metalness: .95, roughness: .22, envMapIntensity: 1}),
    headMaterial === 'peek'
      ? new THREE.MeshStandardMaterial({...base, color: 0xc4b68e, metalness: 0, roughness: .36, envMapIntensity: .5})
      : new THREE.MeshPhysicalMaterial({...base, color: 0xf3f6f7, metalness: 0, roughness: .13, transmission: .88, thickness: 2.2, ior: 1.49, envMapIntensity: 1.1, clearcoat: .65, clearcoatRoughness: .12}),
    new THREE.MeshStandardMaterial({...base, color: 0xe8e4d7, metalness: .05, roughness: .23, envMapIntensity: .7}),
  ];
}
