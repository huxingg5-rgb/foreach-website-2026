import * as THREE from 'three';
export function createDimensions(stage,camera,options={}){
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('dimension-overlay');svg.setAttribute('aria-hidden','true');stage.append(svg);
 let data,solid,visible=true,items=[],lastFrame='';
 const chosen=[null,null,null,null],shown=[true,true,true,true];
 const attr=(el,key,value)=>{value=String(value);if(el.getAttribute(key)!==value)el.setAttribute(key,value);};
 const element=(tag,attrs)=>{const e=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);svg.append(e);return e;};
 const format=v=>Number(v.toFixed(2)).toString();
 function set(model,object){data=model.dimensions;solid=object;svg.replaceChildren();items=[];lastFrame='';chosen.fill(null);shown.fill(true);if(!data)return;
  const axes=options.axes||[0,1,2],values=axes.map(axis=>({axis,value:data.size[axis]}));if(data.housing&&Math.abs(data.size[1]-data.housing.width)>=.01)values.push({axis:1,value:data.housing.width,housing:true});
  for(const {axis,value,housing} of values){const item={axis,housing,extension:element('path',{class:'dimension-extension'}),line:element('path',{class:'dimension-line'}),text:element('text',{'text-anchor':'middle','dominant-baseline':'middle',class:'dimension-label'})};item.text.textContent=(options.diameterAxis===axis?`${options.diameterLabel||'Ø'} `:'')+format(value)+' mm';items.push(item);}
 }
 function update(){if(!visible||!data)return;const w=stage.clientWidth,h=stage.clientHeight;solid.updateWorldMatrix(true,false);
  const frame=[w,h,...camera.matrixWorld.elements,...camera.projectionMatrix.elements,...solid.matrixWorld.elements].map(v=>Number(v).toFixed(6)).join(',');if(frame===lastFrame)return;lastFrame=frame;
  attr(svg,'viewBox',`0 0 ${w} ${h}`);svg.style.width=w+'px';svg.style.height=h+'px';
  const projectBox=box=>Array.from({length:8},(_,j)=>{const p=new THREE.Vector3();data.axes.forEach((a,k)=>p.addScaledVector(new THREE.Vector3(...a),j&(1<<k)?box.max[k]:box.min[k]));solid.localToWorld(p);p.project(camera);return [(p.x+1)*w/2,(1-p.y)*h/2];});
  const outerCorners=projectBox(data),housingCorners=data.housing?projectBox(data.housing):outerCorners;let widthNormal;
  for(let k=0;k<items.length;k++){const axis=items[k].axis,corners=items[k].housing?housingCorners:outerCorners,center=corners.reduce((a,p)=>[a[0]+p[0]/8,a[1]+p[1]/8],[0,0]);let best,previous;for(let j=0;j<8;j++){if(j&(1<<axis))continue;const a=corners[j],b=corners[j|(1<<axis)],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<.001)continue;let n=[-dy/len,dx/len],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2],distance=(mid[0]-center[0])*n[0]+(mid[1]-center[1])*n[1];if(distance<0){n=n.map(v=>-v);distance=-distance;}
   // Put the housing measurement on the opposite side of the total span.
   const sideBias=options.side&&Math.abs(dx)>Math.abs(dy)?(options.side==='top'?center[1]-mid[1]:mid[1]-center[1])*2:options.verticalSide&&Math.abs(dy)>=Math.abs(dx)?(options.verticalSide==='right'?mid[0]-center[0]:center[0]-mid[0])*2:0;
   const score=distance+sideBias-(items[k].housing&&widthNormal?Math.max(0,n[0]*widthNormal[0]+n[1]*widthNormal[1])*10000:0);
   const candidate={a,b,n,len,distance,score,id:j};if(j===chosen[k])previous=candidate;if(!best||score>best.score+0.01)best=candidate;}
   // Opposite box edges have equal projected scores. Keep the existing edge
   // until another is clearly better, rather than switching on float noise.
   if(previous&&best.score-previous.score<14)best=previous;
   if(best)chosen[k]=best.id;
   if(k===1&&best)widthNormal=best.n;
   shown[k]=Boolean(best&&best.len>(options.minSpan??(shown[k]?18:30)));
   const item=items[k];for(const e of [item.extension,item.line,item.text])e.style.display=shown[k]?'':'none';if(!shown[k])continue;
   const {a,b,n,len}=best,off=(options.offset??30)+k*5,A=a.map((v,i)=>v+n[i]*off),B=b.map((v,i)=>v+n[i]*off),u=[(B[0]-A[0])/len,(B[1]-A[1])/len];
   const xy=p=>p.map(v=>v.toFixed(2)).join(',');
   attr(item.extension,'d',`M ${xy(a)} L ${xy(A.map((v,i)=>v+n[i]*6))} M ${xy(b)} L ${xy(B.map((v,i)=>v+n[i]*6))}`);
   let path=`M ${xy(A)} L ${xy(B)}`;for(const [p,sgn] of [[A,1],[B,-1]]){const tip1=p.map((v,i)=>v+u[i]*sgn*7+n[i]*3),tip2=p.map((v,i)=>v+u[i]*sgn*7-n[i]*3);path+=` M ${xy(tip1)} L ${xy(p)} L ${xy(tip2)}`;}attr(item.line,'d',path);
   attr(item.text,'x',((A[0]+B[0])/2+n[0]*14).toFixed(2));attr(item.text,'y',((A[1]+B[1])/2+n[1]*14).toFixed(2));
  }
 }
 function setVisible(next){if(visible===next)return;visible=next;svg.style.display=visible?'':'none';if(visible)lastFrame='';}
 return {set,update,setVisible,dispose(){svg.remove();},toggle(){setVisible(!visible);update();return visible;}};
}
