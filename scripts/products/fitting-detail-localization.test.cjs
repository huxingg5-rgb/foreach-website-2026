/* eslint-disable @typescript-eslint/no-require-imports -- Node CJS installs the TSX/CSS test adapters before loading server content. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
require('tsx/cjs');
require.extensions['.css']=module=>{module.exports={__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})};};
global.React=require('react');
const {fittingDetailView,registerFittingDetail}=require('../../components/products/detail/fitting-detail-view.ts');
const {fittingSelectionTemplate}=require('../../components/products/detail/FittingLocalizedSelectionContent.tsx');
const {fittingDetailText,fittingDetailCopyRows}=require('../../data/products/detail/fitting-detail-copy.intl.ts');
const {FITTING_PUBLISHED_PRODUCTS}=require('../../data/products/selection/fitting-publication.generated.ts');
const root=path.join(__dirname,'../../data/products/generated/fittings');
const locales=['en','es','fr','ko','ru'];
const products=fs.readdirSync(root).flatMap(type=>{
 const file=path.join(root,type,'detail/index.json');
 return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')).map(data=>({...data,productTypeId:type})):[];
});
const placeholders=s=>(s.match(/\{R?\d+\}/g)||[]).sort();
function inspect(node,result={text:[],ids:[],blocks:[],assets:[],links:[]}){
 if(typeof node==='string'){result.text.push(node);return result;}
 if(Array.isArray(node)){node.forEach(child=>inspect(child,result));return result;}
 if(!React.isValidElement(node))return result;
 const p=node.props;
 if(p.id)result.ids.push(p.id);
 if(typeof node.type==='string'&&/^(?:h[1-6]|table|thead|tbody|tr|th|td|figure|ol|ul|li)$/.test(node.type))result.blocks.push(node.type);
 for(const key of ['alt','title','aria-label'])if(typeof p[key]==='string')result.text.push(p[key]);
 if(p.src)result.assets.push(p.src);
 if(typeof p.href==='string')result.links.push(p.href.replace(/^\/(?:en|es|fr|ko|ru)(?=\/)/,''));
 if(p.dangerouslySetInnerHTML){
  const html=p.dangerouslySetInnerHTML.__html.replace(/<style\b[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi,'');
  result.text.push(html.replace(/<[^>]*>/g,''),...[...html.matchAll(/\b(?:alt|aria-label|title)="([^"]*)"/g)].map(m=>m[1]));
  result.blocks.push(...[...html.matchAll(/<(h[1-6]|table|thead|tbody|tr|th|td|figure|ol|ul|li)\b/g)].map(m=>m[1]));
  result.ids.push(...[...html.matchAll(/\bid="([^"]*)"/g)].map(m=>m[1]));
  result.assets.push(...[...html.matchAll(/\bsrc="([^"]*)"/g)].map(m=>m[1]));
  result.links.push(...[...html.matchAll(/\bhref="([^"]*)"/g)].map(m=>m[1].replace(/^\/(?:en|es|fr|ko|ru)(?=\/)/,'')));
 }
 inspect(p.children,result);return result;
}
test('current Chinese detail messages retain every model/value and rich-text slot in five languages',()=>{
 for(const row of fittingDetailCopyRows){
  assert.equal(row.length,6);
  for(let i=1;i<6;i++){
   assert.ok(row[i].trim(),row[0]+' '+locales[i-1]);
   assert.ok(!/[\u3400-\u9fff]/.test(row[i]),row[0]+' '+locales[i-1]);
   assert.deepEqual(placeholders(row[i]),placeholders(row[0]),row[0]+' '+locales[i-1]);
  }
 }
});
test('only registered pure content resolves; selector/config/client props remain untouched',()=>{
 const data={label:'母端',model:'LS-16D-PP-N'};
 function Client(){throw Error('Client components must not execute');}
 function Static(){return React.createElement('p',{},'特性与用途');}
 registerFittingDetail(Static);
 const node=React.createElement('div',{},React.createElement(Static),React.createElement(Client,{data,value:'白色',label:'母端'}));
 const result=fittingDetailView(node,{locale:'en',text:v=>fittingDetailText(v,'en')});
 const client=React.Children.toArray(result.props.children)[1];
 assert.equal(client.type,Client);assert.equal(client.props.data,data);assert.equal(client.props.value,'白色');assert.equal(client.props.label,'母端');
});
test('all fitting detail variants use the Chinese sections, tables, images and links in every locale',()=>{
 assert.ok(products.length>=827);
 const failures=[];
 for(const data of products){
  const source=inspect(fittingDetailView(fittingSelectionTemplate(data),{locale:'zh-CN',text:v=>v}));
  if(FITTING_PUBLISHED_PRODUCTS.some(p=>p.productTypeId===data.productTypeId&&p.foreachModel===(data.foreachModel||data.model)))assert.ok(source.blocks.includes('h2'),data.model+' published Chinese detail');
  for(const locale of locales){
   const target=inspect(fittingDetailView(fittingSelectionTemplate(data),{locale,text:v=>fittingDetailText(v,locale)}));
   const han=target.text.filter(v=>/[\u3400-\u9fff]/.test(v));
   if(han.length)failures.push({model:data.model||data.foreachModel,locale,text:[...new Set(han)].slice(0,3)});
   assert.deepEqual(target.ids,source.ids,data.model+' anchors '+locale);
   assert.deepEqual(target.blocks,source.blocks,data.model+' structure '+locale);
   assert.deepEqual(target.assets,source.assets,data.model+' images '+locale);
   assert.deepEqual(target.links.slice().sort(),source.links.slice().sort(),data.model+' links '+locale);
  }
 }
 assert.deepEqual(failures,[]);
});
