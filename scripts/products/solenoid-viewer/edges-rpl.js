import * as THREE from 'three';

// Compact references restore the original display lines without storing another
// full edge mesh or letting removed contact faces produce artificial seams.
export function createDisplayEdges(geometry,patch){
  const base=new THREE.EdgesGeometry(geometry,26);
  if(!patch)return base;
  const decode=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0)).buffer;
  const order=new Int32Array(decode(patch.order)),added=new Float32Array(decode(patch.added));
  const source=base.attributes.position.array,positions=new Float32Array(order.length*6);
  for(let i=0;i<order.length;i++){
    const code=order[i];
    if(code<0)positions.set(added.subarray((-1-code)*6,(-code)*6),i*6);
    else {const start=(code>>>1)*6,reverse=code&1;positions.set(source.subarray(start+(reverse?3:0),start+(reverse?6:3)),i*6);positions.set(source.subarray(start+(reverse?0:3),start+(reverse?3:6)),i*6+3);}
  }
  base.dispose();const result=new THREE.BufferGeometry();result.setAttribute('position',new THREE.BufferAttribute(positions,3));return result;
}
