import {getFittingCatalog} from './fitting-companion.js';
import {getHardTubeAccessoryCopy,getHardTubeAccessoryKindLabel} from '../../../data/products/configurator/hard-tube-accessories.intl.ts';

const translations={
 zh:{washer:'垫片选择',ferrule:'卡箍选择',none:'仅显示接头',current:'当前配套件',outer:'外径',inner:'内径',height:'高度',thickness:'厚度',tube:'适配管外径',natural:'本色',yellow:'黄色',loading:'正在切换配套件…',error:'加载失败，请重新选择。'},
 en:{washer:'Washer selection',ferrule:'Ferrule selection',none:'Fitting only',current:'Selected part',outer:'Outer diameter',inner:'Inner diameter',height:'Height',thickness:'Thickness',tube:'Tube OD',natural:'Natural',yellow:'Yellow',loading:'Loading selected part…',error:'Unable to load. Please select again.'},
 es:{washer:'Selección de arandela',ferrule:'Selección de férula',none:'Solo racor',current:'Pieza seleccionada',outer:'Diámetro exterior',inner:'Diámetro interior',height:'Altura',thickness:'Espesor',tube:'DE del tubo',natural:'Natural',yellow:'Amarillo',loading:'Cargando la pieza…',error:'No se pudo cargar. Seleccione de nuevo.'},
 fr:{washer:'Choix de rondelle',ferrule:'Choix de bague',none:'Raccord seul',current:'Pièce sélectionnée',outer:'Diamètre extérieur',inner:'Diamètre intérieur',height:'Hauteur',thickness:'Épaisseur',tube:'DE du tube',natural:'Naturel',yellow:'Jaune',loading:'Chargement de la pièce…',error:'Échec du chargement. Sélectionnez à nouveau.'},
 ko:{washer:'와셔 선택',ferrule:'페룰 선택',none:'피팅만 표시',current:'선택한 부품',outer:'외경',inner:'내경',height:'높이',thickness:'두께',tube:'튜브 외경',natural:'자연색',yellow:'노란색',loading:'부품 불러오는 중…',error:'불러오지 못했습니다. 다시 선택하세요.'},
 ru:{washer:'Выбор шайбы',ferrule:'Выбор феррулы',none:'Только фитинг',current:'Выбранная деталь',outer:'Наружный диаметр',inner:'Внутренний диаметр',height:'Высота',thickness:'Толщина',tube:'Наружный диаметр трубки',natural:'Натуральный',yellow:'Жёлтый',loading:'Загрузка детали…',error:'Не удалось загрузить. Выберите снова.'},
};
const materials={SS:'SUS',PK:'PEEK',PT:'PTFE',ET:'ETFE',PP:'PP'};
const mm=value=>Number(value.toFixed(2))+' mm';

export function createFittingSelector(params,onChange) {
 const product=getFittingCatalog(params);if(!product)return null;
 const copy=translations[params.get('lang')]||translations.en;
 const locale=params.get('lang')||'en',catalogCopy=getHardTubeAccessoryCopy(locale);
 const selectionLabels={zh:'{kind}选择',en:'{kind} selection',es:'Selección: {kind}',fr:'Choix : {kind}',ko:'{kind} 선택',ru:'Выбор: {kind}'};
 const title=(selectionLabels[locale]||selectionLabels.en).replace('{kind}',getHardTubeAccessoryKindLabel(product.options[0].kind,locale));
 const panel=document.createElement('aside');panel.className='fitting-selector';panel.setAttribute('aria-label',title);
 const heading=document.createElement('h2');heading.textContent=title;
 const select=document.createElement('select');select.className='fitting-mobile-select';select.setAttribute('aria-label',title);
 const list=document.createElement('div');list.className='fitting-choices';list.setAttribute('role','radiogroup');list.setAttribute('aria-label',title);
 const detail=document.createElement('div');detail.className='fitting-selected-detail';
 const status=document.createElement('p');status.className='fitting-selection-status';status.setAttribute('role','status');
 const buttons=[];
 const choices=[...product.options,{code:'none',model:copy.none}];
 choices.forEach((item,index)=>{
   const option=document.createElement('option');option.value=item.code;option.textContent=item.model;select.append(option);
   const button=document.createElement('button');button.type='button';button.setAttribute('role','radio');button.dataset.accessoryCode=item.code;
   const model=document.createElement('strong');model.textContent=item.model;button.append(model);
   if(item.kind){
     const parts=item.model.split('-'), material=materials[parts.at(-2)]||(item.finish==='steel'?'SUS':'');
     const description=document.createElement('span');
     description.textContent=item.kind==='ferrule'?`${material} · ${parts.at(-1)==='Y'?catalogCopy.yellow:catalogCopy.natural} · ${mm(Number(parts[2])/10)}`:material;
     button.append(description);
   }
   button.onclick=()=>onChange(item.code);
   button.onkeydown=event=>{
     let next=index;
     if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%choices.length;
     else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index+choices.length-1)%choices.length;
     else if(event.key==='Home')next=0;else if(event.key==='End')next=choices.length-1;else return;
     event.preventDefault();buttons[next].focus();onChange(choices[next].code);
   };
   list.append(button);buttons.push(button);
 });
 select.onchange=()=>onChange(select.value);
 panel.append(heading,select,list,detail,status);document.getElementById('viewer').append(panel);document.getElementById('viewer').classList.add('has-fitting-selector');
 function setSelection(code,asset){
   select.value=code;
   buttons.forEach(button=>{const selected=button.dataset.accessoryCode===code;button.setAttribute('aria-checked',String(selected));button.tabIndex=selected?0:-1;});
   detail.replaceChildren();
   if(asset){
     const name=document.createElement('h3');name.textContent=copy.current;
     const model=document.createElement('strong');model.textContent=asset.model;
     const dimensions=document.createElement('dl');
     const size=asset.data.dimensions.size,geometry=asset.geometry;
     const rows=asset.kind==='washer'?[[copy.outer,geometry.outerDiameter],[copy.inner,geometry.innerDiameter],[copy.thickness,geometry.thickness]]:[[copy.outer,size[0]],[copy.inner,geometry.innerDiameter],[copy.height,size[2]],[copy.tube,Number(asset.model.split('-')[2])/10]];
     for(const [label,value] of rows){const row=document.createElement('div'),term=document.createElement('dt'),definition=document.createElement('dd');term.textContent=label;definition.textContent=mm(value);row.append(term,definition);dimensions.append(row);}
     detail.append(name,model,dimensions);
   }
   status.textContent='';panel.setAttribute('aria-busy','false');
 }
 return {setSelection,pending(){panel.setAttribute('aria-busy','true');status.textContent=copy.loading;},error(){panel.setAttribute('aria-busy','false');status.textContent=copy.error;}};
}
