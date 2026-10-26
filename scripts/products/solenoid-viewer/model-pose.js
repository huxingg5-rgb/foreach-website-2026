import * as THREE from 'three';

const a=Math.SQRT1_2;
// Rows map source coordinates to display X/right, Y/motor-up and Z/front.
// The DPL30/60 pump heads also need their original 45-degree twist removed.
const brushed=[[-a,a,0],[0,0,1],[a,a,0]];
const brushless=[[0,-a,a],[-1,0,0],[0,-a,-a]];
const diaphragmBases={
  'dpl30-db':brushed,'dpl60-db':brushed,
  'dpl30-bb':brushless,'dpl60-bb':brushless,
  'dpl30h-ds':[[-1,0,0],[0,0,1],[0,1,0]],
  'dpl30h-bs':[[0,0,1],[1,0,0],[0,1,0]],
  'dpgl800-bs':[[1,0,0],[0,0,1],[0,-1,0]],
};
// These three EA exports have Z along the pump axis; the remaining files use Y.
// The outlet faces +X in these exports, so map it to the viewer's front (+Z).
const pistonZUp=new Set(['EA-2500UL','EA-5000UL','EA-0010ML']);
const basisFor=data=>data.appearance?.piston
  ? (data.appearance.fullAssembly?[[1,0,0],[0,1,0],[0,0,1]]:pistonZUp.has(data.name)?[[0,1,0],[0,0,1],[1,0,0]]:[[1,0,0],[0,1,0],[0,0,1]])
  : data.appearance?.diaphragm?diaphragmBases[data.name.toLowerCase()]:undefined;

export function applyModelPose(data,solid){
  const basis=basisFor(data);
  if(basis){
    const [x,y,z]=basis;
    solid.quaternion.setFromRotationMatrix(new THREE.Matrix4().set(
      ...x,0,...y,0,...z,0,0,0,0,1,
    ));
  }else if(data.rotationEuler)solid.rotation.set(...data.rotationEuler);
  else solid.rotation.x=data.rotationX??Math.PI/2;
}

// Keep vertices and CAD metadata untouched. Only display dimensions use the
// upright product axes; rotating the original axis-aligned box overstates them.
export function modelWithDisplayDimensions(data){
  const axes=basisFor(data);
  if(!axes)return data;
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(const mesh of data.meshes){
    const p=mesh.attributes.position.array;
    for(let i=0;i<p.length;i+=3)for(let k=0;k<3;k++){
      const axis=axes[k],value=axis[0]*p[i]+axis[1]*p[i+1]+axis[2]*p[i+2];
      min[k]=Math.min(min[k],value);max[k]=Math.max(max[k],value);
    }
  }
  return {...data,dimensions:{...data.dimensions,axes,min,max,size:max.map((v,k)=>v-min[k])}};
}
