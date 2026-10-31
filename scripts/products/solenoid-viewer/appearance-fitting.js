import * as THREE from 'three';

const colors = {peek:0xa58f61, natural:0x979e96, black:0x202124, steel:0x92999e, yellow:0xc7a237};

export function updateFittingMaterial(material,finish) {
  material.color.setHex(colors[finish] ?? colors.natural);
  material.metalness=finish==='steel'?.75:0;
  material.roughness=finish==='steel'?.3:.38;
}

// A visual material finish only; every variant uses the same source geometry.
export function fittingMaterials(src, geometry, finish) {
  // Slightly darker light finishes remain legible under the shared studio lights.
  geometry.clearGroups();
  geometry.addGroup(0, src.index.array.length, 0);
  return [new THREE.MeshStandardMaterial({
    color:colors[finish] ?? colors.natural, metalness:finish==='steel'?.75:0, roughness:finish==='steel'?.3:.38,
    envMapIntensity:.55, side:THREE.DoubleSide,
    polygonOffset:true, polygonOffsetFactor:1, polygonOffsetUnits:1,
  })];
}
