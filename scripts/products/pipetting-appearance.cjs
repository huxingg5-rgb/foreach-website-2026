// Visual finishes matched to the SMTP2 and SMTP4 product gallery photographs.
// The STEP exports contain fused solids and no per-component colour metadata.
// Classify complete source BREP faces by their physical regions (millimetres),
// never by post-pruning mesh order. These colours do not specify materials.
function finishForFace(model,mesh,face){
 const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
 for(let j=face.first*3;j<(face.last+1)*3;j++)for(let k=0;k<3;k++){
  const v=mesh.attributes.position.array[mesh.index.array[j]*3+k];min[k]=Math.min(min[k],v);max[k]=Math.max(max[k],v);
 }
 const size=max.map((v,k)=>v-min[k]),smtp2=Boolean(model.appearance.smtp2);
 if(smtp2){
  if(min[2]>=29.49&&max[2]<=31.51&&min[1]>=-22.41&&max[1]<=92.61&&min[0]>=-14.01&&max[0]<=14.01)return 'pcb';
  if(min[2]>=31.49){
   if(max[1]<-14.9||max[0]<-7&&min[1]>15&&max[1]<65)return 'connector';
   if(Math.max(...size)<1.7||Math.min(size[0],size[1])<.4)return 'metal';
   return 'polymer';
  }
  if(min[1]>=model.dimensions.max[1]-8.1)return 'chrome';
  if(min[1]>=93.59&&max[1]<=104.1&&Math.max(Math.abs(min[0]),Math.abs(max[0]))<5.1&&min[2]>-5.1&&max[2]<5.1)return 'chrome';
  if(min[1]>33.5&&max[1]<85.9&&min[0]>-3.1&&max[0]<3.1&&min[2]>-3.1&&max[2]<3.1)return 'chrome';
 }else{
  if(min[1]>=model.dimensions.max[1]-4.7)return 'chrome';
  if(min[1]>=40.9&&max[1]<=100&&min[0]>-3.1&&max[0]<3.1&&min[2]>-3.1&&max[2]<3.1)return 'chrome';
  if(min[1]>=40.9&&max[1]<=47&&Math.max(size[0],size[2])<6.2&&size[1]<6.2&&(Math.abs(min[0])>8||Math.abs(min[2])>8))return 'metal';
 }
 return max[1]<31.61?'polymer':'black';
}
module.exports={finishForFace};
