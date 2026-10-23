import * as THREE from 'three';

// Visual finish based on RPL product photographs, not engineering material claims.
export function rplMaterials(src, geometry) {
  const defaults={side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1};
  const materials=[
    new THREE.MeshStandardMaterial({...defaults,color:0x96999c,metalness:.85,roughness:.3,envMapIntensity:.8}),
    new THREE.MeshStandardMaterial({...defaults,color:0x101112,metalness:.05,roughness:.7,envMapIntensity:.3}),
    new THREE.MeshStandardMaterial({...defaults,color:0xdcd8cb,metalness:0,roughness:.42}),
    new THREE.MeshStandardMaterial({...defaults,color:0x151617,metalness:0,roughness:.58,envMapIntensity:.4}),
  ];
  // Two coplanar STEP faces span both the metal support and the white head flange.
  // Split their finish at the flange's rear plane in the tilted head coordinate frame.
  const flangeTransition=materials[0].clone();
  flangeTransition.onBeforeCompile=shader=>{
    shader.uniforms.rplHeadColor={value:materials[2].color};
    shader.vertexShader='varying float vRplHeadAxis;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\nvRplHeadAxis=dot(position.yz,vec2(0.9596,0.2814));');
    shader.fragmentShader='varying float vRplHeadAxis;\nuniform vec3 rplHeadColor;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',
      '#include <color_fragment>\nfloat headMask=step(50.2,vRplHeadAxis);\ndiffuseColor.rgb=mix(diffuseColor.rgb,rplHeadColor,headMask);');
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',
      '#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,0.42,headMask);');
    shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>',
      '#include <metalnessmap_fragment>\nmetalnessFactor=mix(metalnessFactor,0.0,headMask);');
  };
  flangeTransition.customProgramCacheKey=()=> 'rpl-p15-head-flange-v1';
  materials.push(flangeTransition);
  const p=src.attributes.position.array,indices=src.index.array;
  const faces=src.brep_faces||[{first:0,last:indices.length/3-1}];
  geometry.clearGroups();
  for(const [faceIndex,face] of faces.entries()){
    // Pruned faces keep their original slots so reviewed material IDs stay stable.
    if(face.last<face.first)continue;
    // The reference uses black over the entire motor enclosure, including both end caps.
    let role=src.appearanceRole==='motor'?1:src.appearanceRole==='head'?2:src.appearanceRole==='black'?3:0;
    if(src.appearanceRole==='assembly'){
      const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
      for(let i=face.first*3;i<(face.last+1)*3;i++){const v=indices[i]*3;for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[v+k]);max[k]=Math.max(max[k],p[v+k]);}}
      const [x,y,z]=min.map((v,k)=>(v+max[k])/2);
      // P15's external STEP combines the head and support into one shell.
      const radial=z-(.294*y-7);
      if(y>58 && Math.abs(x)<18 && Math.abs(radial)<17)role=2;
      // Reviewed face groups in RPL_P15_外发.stp (SHA256 62ee2be9...):
      // the two wash-port bases belong to the white head; only their caps are black.
      // Large-port cylindrical bosses are part of the warm-white head;
      // the separate hex fittings and their outer end collars remain metallic.
      // These groups are specific to the supplied 1,585-face exterior assembly.
      if(faces.length===1585){
        if(faceIndex===0||(faceIndex>=7&&faceIndex<=44)||(faceIndex>=50&&faceIndex<=88))role=0;
        if([0,7,8,50,51,52].includes(faceIndex))role=2;
        if((faceIndex>=1&&faceIndex<=6)||(faceIndex>=45&&faceIndex<=49))role=2;
        // Entire molded head: rear shoulder, rectangular flange, and rounded corners.
        if((faceIndex>=247&&faceIndex<=256)||[258,259,261,262,265].includes(faceIndex))role=2;
        if(faceIndex===260||faceIndex===264)role=4;
        if((faceIndex>=89&&faceIndex<=93)||(faceIndex>=1360&&faceIndex<=1362))role=2;
        if((faceIndex>=94&&faceIndex<=246)||(faceIndex>=1363&&faceIndex<=1515))role=3;
      }
    }
    const start=face.first*3,count=(face.last-face.first+1)*3,last=geometry.groups.at(-1);
    if(last&&last.materialIndex===role&&last.start+last.count===start)last.count+=count;
    else geometry.addGroup(start,count,role);
  }
  return materials;
}
