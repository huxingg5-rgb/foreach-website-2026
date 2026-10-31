import * as THREE from 'three';

// Photographic appearance for the reviewed SMTP2 / SMTP4 exterior surfaces.
// Finish names describe display colours, not engineering material claims.
const finishes={
  black:{color:0x202226,metalness:.28,roughness:.43},
  polymer:{color:0x17191c,metalness:.12,roughness:.62},
  metal:{color:0xbfc2c5,metalness:.78,roughness:.34},
  chrome:{color:0xc9ced2,metalness:.95,roughness:.22},
  pcb:{color:0x003b1b,metalness:.12,roughness:.55},
  connector:{color:0xe5dec5,metalness:0,roughness:.58},
};
export function smtp2Materials(src, geometry) {
  const materials=[], slots=new Map();
  geometry.clearGroups();
  for(const face of src.brep_faces || [{first:0,last:src.index.array.length/3-1}]) {
    if(face.last<face.first)continue;
    const finish=finishes[face.finish||src.finish];
    const color=face.color || src.color || [.50,.53,.56],key=finish?(face.finish||src.finish):color.join(',');
    if(!slots.has(key)) {
      slots.set(key,materials.length);
      materials.push(new THREE.MeshStandardMaterial({...(finish||{color:new THREE.Color().setRGB(...color,THREE.SRGBColorSpace),metalness:.15,roughness:.55}),envMapIntensity:.8,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));
    }
    const start=face.first*3,count=(face.last-face.first+1)*3,slot=slots.get(key),last=geometry.groups.at(-1);
    if(last && last.materialIndex===slot && last.start+last.count===start)last.count+=count;
    else geometry.addGroup(start,count,slot);
  }
  return materials;
}
