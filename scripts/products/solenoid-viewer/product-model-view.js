import * as THREE from 'three';
import {createDimensions} from './dimensions.js';
import {getProductResourceCopy} from '../../../data/products/detail/product-resource-copy.ts';

// Map the source measurement axes to the Q2001 display order (L=X, W=Z, H=Y).
// Keep the measured source sizes: rotating their box and remeasuring a world
// AABB would overstate dimensions for the slightly tilted SV10 STEP exports.
export function productDimensionAxes(data,solid){
 const axes=data.dimensions.axes.map(axis=>new THREE.Vector3(...axis).applyQuaternion(solid.quaternion));
 const available=new Set([0,1,2]);
 return [0,2,1].map(worldAxis=>{
  const index=[...available].sort((a,b)=>Math.abs(axes[b].getComponent(worldAxis))-Math.abs(axes[a].getComponent(worldAxis)))[0];
  available.delete(index);return index;
 });
}

function readProductSelection(){
 try{
  const selection=JSON.parse(new URLSearchParams(location.search).get('selection'));
  if(selection&&typeof selection.label==='string'&&typeof selection.value==='string'&&Array.isArray(selection.options)&&selection.options.length&&
    selection.options.every(option=>typeof option.value==='string'&&typeof option.label==='string'))return selection;
 }catch{/* A standalone preview can omit the parent selection. */}
 return null;
}

/** Q2001-style product summary, using only the model actually loaded. */
export function createProductModelView({data,solid,stage,camera,language}){
 const text=getProductResourceCopy(language),host=stage.parentElement;
 const panel=document.createElement('aside');panel.className='fitting-selector product-model-selector';panel.setAttribute('aria-label',text.view);
 const selection=readProductSelection();
 const title=document.createElement('h2');title.textContent=selection?.label||text.view;
 const selected=document.createElement('div'),mobile=document.createElement('select');
 if(selection){
  selected.className='fitting-choices product-model-choices';selected.setAttribute('role','radiogroup');selected.setAttribute('aria-label',selection.label);selected.setAttribute('aria-orientation','vertical');selected.dataset.productResourceSelection='true';
  mobile.className='fitting-mobile-select product-model-selection';mobile.setAttribute('aria-label',selection.label);mobile.dataset.productResourceSelection='true';
  const enabled=selection.options.filter(option=>!option.disabled),tabValue=enabled.find(option=>option.value===selection.value)?.value||enabled[0]?.value;
  const choose=value=>{
   if(value!==selection.value&&enabled.some(option=>option.value===value))parent.postMessage({type:'product-model-selection',value},location.origin);
  };
  for(const item of selection.options){
   const button=document.createElement('button');button.type='button';button.setAttribute('role','radio');button.setAttribute('aria-checked',String(item.value===selection.value));button.disabled=Boolean(item.disabled);button.dataset.productResourceValue=item.value;button.tabIndex=item.value===tabValue?0:-1;
   const label=document.createElement('strong');label.textContent=item.label;button.append(label);button.onclick=()=>choose(item.value);
   button.onkeydown=event=>{
    if(!enabled.length||!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key))return;
    event.preventDefault();const index=enabled.findIndex(option=>option.value===item.value);
    const next=event.key==='Home'?0:event.key==='End'?enabled.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+enabled.length)%enabled.length;
    choose(enabled[next].value);
   };selected.append(button);
   const option=document.createElement('option');option.value=item.value;option.textContent=item.label;option.disabled=Boolean(item.disabled);mobile.append(option);
  }
  mobile.value=selection.value;mobile.onchange=()=>choose(mobile.value);
 }else{
  // A single product remains a static view when there are no real variants.
  selected.className='product-model-selected';selected.textContent=text.whole;
 }
 const detail=document.createElement('div');detail.className='fitting-selected-detail';
 const heading=document.createElement('h3');heading.textContent=text.dimensions;
 const name=document.createElement('strong');name.className='product-model-name';name.textContent=data.name;
 const axisOrder=productDimensionAxes(data,solid),labels=[text.length,text.width,text.height];
 const metrics=document.createElement('dl');
 for(const [position,axis] of axisOrder.entries()){
  const row=document.createElement('div'),key=document.createElement('dt'),value=document.createElement('dd');
  key.textContent=labels[position];value.textContent=data.dimensions.size[axis].toFixed(2)+' mm';value.dataset.dimensionAxis=String(axis);
  row.append(key,value);metrics.append(row);
 }
 const reference=document.createElement('p');reference.className='product-dimension-reference';reference.textContent=data.dimensions.excludedWireTriangles||/wire/i.test(data.dimensions.source||'')?text.wireReference:text.reference;
 detail.append(heading,name,metrics,reference);panel.append(title,selected);if(selection)panel.append(mobile);panel.append(detail);host.append(panel);host.classList.add('has-product-model-selector');
 const dimensions=createDimensions(stage,camera,{axes:axisOrder,axisLabels:Object.fromEntries(axisOrder.map((axis,i)=>[axis,labels[i]])),offset:28,minSpan:12,side:'bottom',verticalSide:'right',clampLabels:true});
 dimensions.set({...data,dimensions:{...data.dimensions,housing:undefined}},solid);
 // Translations wrap differently on phones. Reserve the actual summary height.
 const toolbar=host.querySelector('.topbar'),leftToolbar=host.querySelector('.left-toolbar');
 const observer=new ResizeObserver(()=>{
  const inset=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--resource-tools-left'))||170;
  host.classList.toggle('product-tools-stacked',host.clientWidth<=600&&document.documentElement.classList.contains('external-resource-tabs')&&inset+leftToolbar.offsetWidth>host.clientWidth-12);
  host.style.setProperty('--product-summary-top',`${toolbar.offsetTop+toolbar.offsetHeight+12}px`);
  host.style.setProperty('--product-summary-bottom',`${panel.offsetTop+panel.offsetHeight+12}px`);
 });observer.observe(panel);observer.observe(toolbar);observer.observe(leftToolbar);observer.observe(host);
 return {
  update:()=>dimensions.update(),setDimensionsVisible:visible=>dimensions.setVisible(visible),
  dispose(){observer.disconnect();dimensions.dispose();panel.remove();host.classList.remove('has-product-model-selector','product-tools-stacked');host.style.removeProperty('--product-summary-bottom');host.style.removeProperty('--product-summary-top');},
 };
}
