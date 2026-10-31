import * as THREE from 'three';

// Diameter callout attached to the actual bore rim, separate from the outside span.
export function createFittingBoreDimension(stage,camera,asset,object) {
 const diameter=asset.geometry.innerDiameter;
 if(!(diameter>0))return null;
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
 svg.classList.add('dimension-overlay','fitting-bore-dimension');svg.setAttribute('aria-hidden','true');stage.append(svg);
 const line=document.createElementNS(ns,'path');line.setAttribute('class','dimension-line');svg.append(line);
 const label=document.createElementNS(ns,'text');label.setAttribute('class','dimension-label');label.setAttribute('dominant-baseline','middle');svg.append(label);
 const names={zh:'内径',en:'ID',es:'DI',fr:'DI',ko:'내경',ru:'Внутр. Ø'};
 const lang=new URLSearchParams(location.search).get('lang');
 label.textContent=`${names[lang]||names.en}${lang==='ru'?'':' Ø'} ${Number(diameter.toFixed(2))} mm`;
 const dimensions=asset.data.dimensions,axis=asset.kind==='washer'?1:2,other=asset.kind==='washer'?2:1;
 const center=dimensions.min.map((v,i)=>(v+dimensions.max[i])/2);center[axis]=dimensions.max[axis];
 let visible=true,lastFrame='';
 const attr=(element,key,value)=>{value=String(value);if(element.getAttribute(key)!==value)element.setAttribute(key,value);};
 function update(){
  if(!visible)return;
  object.updateWorldMatrix(true,false);
  const w=stage.clientWidth,h=stage.clientHeight;
  const frame=[w,h,...camera.matrixWorld.elements,...camera.projectionMatrix.elements,...object.matrixWorld.elements].map(v=>Number(v).toFixed(6)).join(',');
  if(frame===lastFrame)return;lastFrame=frame;
  attr(svg,'viewBox',`0 0 ${w} ${h}`);svg.style.width=w+'px';svg.style.height=h+'px';
  const project=point=>{const p=object.localToWorld(new THREE.Vector3(...point)).project(camera);return [(p.x+1)*w/2,(1-p.y)*h/2];};
  const rim=Array.from({length:32},(_,i)=>{const p=[...center],angle=i*Math.PI/16;p[0]+=diameter/2*Math.cos(angle);p[other]+=diameter/2*Math.sin(angle);return project(p);});
  const corners=Array.from({length:8},(_,i)=>project(dimensions.min.map((v,k)=>i&(1<<k)?dimensions.max[k]:v)));
  const anchor=rim.reduce((best,p)=>p[1]+p[0]*.15>best[1]+best[0]*.15?p:best);
  const bend=[THREE.MathUtils.clamp(Math.max(...rim.map(p=>p[0]))+34,20,w-132),Math.min(h-35,Math.max(...corners.map(p=>p[1]))+43)];
  const end=[bend[0]+100,bend[1]],dx=bend[0]-anchor[0],dy=bend[1]-anchor[1],length=Math.hypot(dx,dy),u=[dx/length,dy/length],n=[-u[1],u[0]];
  const arrowA=anchor.map((v,i)=>v+u[i]*7+n[i]*3),arrowB=anchor.map((v,i)=>v+u[i]*7-n[i]*3),xy=p=>p.map(v=>v.toFixed(2)).join(',');
  attr(line,'d',`M ${xy(anchor)} L ${xy(bend)} L ${xy(end)} M ${xy(arrowA)} L ${xy(anchor)} L ${xy(arrowB)}`);
  attr(label,'x',bend[0]);attr(label,'y',bend[1]+15);
 }
 return {update,setVisible(next){if(visible===next)return;visible=next;svg.style.display=next?'':'none';if(next)lastFrame='';},dispose(){svg.remove();}};
}
