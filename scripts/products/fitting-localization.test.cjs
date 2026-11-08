const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
require('tsx/cjs');
const {fittingText,fittingUiRows}=require('../../data/products/detail/fitting-ui.intl.ts');
const {FITTING_DELIVERY_COPY,FITTING_DELIVERY_POLICY:policy,FITTING_DELIVERY_POLICY_SOURCE:policySource}=require('../../data/products/detail/fitting-delivery.intl.ts');
const {FITTING_PUBLISHED_PRODUCTS}=require('../../data/products/selection/fitting-publication.generated.ts');
const {getLuerPairConfig,resolveLuerPair}=require('../../data/products/configurator/luer-pairing.ts');
const {getQuickConnectPairConfig}=require('../../data/products/configurator/quick-connect-pairing.ts');
const {STANDALONE_FITTING_TYPES,buildStandaloneFittingSelection}=require('../../data/products/configurator/standalone-fitting-selection.ts');
const {getFittingAfterSalesFormConfig}=require('../../data/products/detail/fitting-after-sales.intl.ts');
const {contactZhData}=require('../../data/contact-cooperation/contact.zh.ts');
const {getContactIntlData}=require('../../data/contact-cooperation/contact.intl.ts');
const locales=['zh','en','es','fr','ko','ru'];
const han=/[\u3400-\u9fff]/;
const placeholders=s=>(s.match(/\{\d+\}/g)||[]).sort();
test('view localization preserves semantic labels, catalog data and event values',()=>{
 const React=require('react');const {fittingView}=require('../../components/products/detail/fitting-view.ts');
 const data={model:'LS-16D-PP-N'},onChange=()=>{};
 function Picker(){throw Error('Presentation localization must not execute child components');}
 for(const locale of locales.slice(1)){
  const node=React.createElement(Picker,{label:'母端',config:data,value:'白色',onChange,title:'选择规格'},React.createElement('button',{value:'白色'},'白色'));
  const result=fittingView(node,locale);assert.equal(result.type,Picker);assert.equal(result.props.label,'母端');assert.equal(result.props.config,data);assert.equal(result.props.value,'白色');assert.equal(result.props.onChange,onChange);assert.ok(!han.test(result.props.title));assert.equal(result.props.children.props.value,'白色');assert.ok(!han.test(result.props.children.props.children));
 }
});
test('fitting messages have five complete translations with intact placeholders',()=>{
 const seen=new Set();
 for(const row of fittingUiRows){assert.ok(!seen.has(row[0]),'Duplicate message '+row[0]);seen.add(row[0]);
  for(let i=1;i<6;i++){assert.ok(row[i].trim()&&!han.test(row[i]),locales[i]+': '+row[0]);assert.deepEqual(placeholders(row[i]),placeholders(row[0]),row[0]);
   const source=row[0].replace(/\{\d+\}/g,'SKU-123');assert.ok(!han.test(fittingText(source,locales[i])),locales[i]+': '+source);
  }
 }
});
test('delivery summary gives regional couriers and the verified fitting warranty without contractual clauses',()=>{
 assert.deepEqual(policySource,{documentId:'FR-QR-YX-011',revision:'A00'});
 assert.deepEqual(Object.keys(policy).sort(),['domesticShipping','overseasShipping','warranty']);
 assert.match(policy.domesticShipping,/默认.*顺丰/);assert.match(policy.overseasShipping,/指定.*国际快递/);
 for(const locale of locales){
  const domestic=fittingText(policy.domesticShipping,locale),overseas=fittingText(policy.overseasShipping,locale),warranty=fittingText(policy.warranty,locale);
  assert.match(domestic,/顺丰|SF Express/);assert.doesNotMatch(overseas,/顺丰|SF Express|DHL|FedEx|UPS/);
  assert.match(warranty,/12/);assert.doesNotMatch(warranty,/18/);
  if(locale!=='zh')assert.ok(!han.test(domestic+overseas+warranty),locale);
 }
 assert.doesNotMatch(JSON.stringify(FITTING_DELIVERY_COPY),/EXW|Incoterms|验收|退货|风险|提交售后信息|质量问题进入|deemed accepted|Warranty exclusions|return freight|Support information:/);
});
test('shared delivery translates the current Chinese workflow and uses international couriers overseas',()=>{
 const React=require('react');global.React=React;
 const cssLoader=require.extensions['.css'];require.extensions['.css']=module=>{module.exports={};};
 let Delivery;try{Delivery=require('../../components/products/detail/FittingDeliveryZh.tsx').default;}finally{
  if(cssLoader)require.extensions['.css']=cssLoader;else delete require.extensions['.css'];
 }
 const {renderToStaticMarkup}=require('react-dom/server');
 for(const locale of locales){
  const html=renderToStaticMarkup(React.createElement(Delivery,{locale}));
  if(locale!=='zh'){
   assert.ok(html.includes(fittingText(policy.overseasShipping,locale)),locale);
   assert.ok(html.includes(fittingText(policy.warranty,locale)),locale);
   assert.doesNotMatch(html,/SF Express|顺丰/);
  }
  assert.equal((html.match(/<img /g)||[]).length,6,'Packaging photos: '+locale);
  assert.equal((html.match(/<h3>/g)||[]).length,4,'Packaging, courier and warranty headings: '+locale);
  for(const message of ['出厂检查：按对应产品的检验要求完成检查。','分类装袋：不同型号分别包装。','标签核对：核对型号、数量及批次信息。','缓冲防护：固定内袋，减少碰撞与挤压。','装箱复核：核对产品、数量和箱外标识。','随货资料：根据需求准备合格证、检验报告等资料。'])assert.ok(html.includes(fittingText(message,locale)),locale+': '+message);
  assert.ok(html.includes(fittingText(policy.warranty,locale)),locale);
  assert.doesNotMatch(html,/EXW|Incoterms|提交售后信息|不在保修范围|售后流程|customer bears|deemed accepted|return freight|Support information:/);
  if(locale!=='zh')assert.ok(!han.test(html),locale);
 }
});
test('after-sales forms keep localized option values, the original verification contract and the exact model',()=>{
 for(const locale of locales){
  const {data,initialValues}=getFittingAfterSalesFormConfig(locale,'LPS-16-PP-W');
  const source=locale==='zh'?contactZhData:getContactIntlData(locale);
  assert.deepEqual(data.form.requestTypes,source.form.requestTypes);
  assert.deepEqual(data.form.productGroups,source.form.productGroups);
  assert.deepEqual(data.form.projectStages,source.form.projectStages);
  assert.deepEqual(data.form.emailVerification,source.form.emailVerification);
  assert.ok(data.form.requestTypes.includes(initialValues.requestType));
  assert.ok(data.form.productGroups.flatMap(group=>group.options).includes(initialValues.productType));
  assert.ok(data.form.projectStages.includes(initialValues.projectStage));
  assert.equal(initialValues.targetModel,'LPS-16-PP-W');
  assert.equal(data.guide.items.length,5);
  assert.deepEqual(data.guide.items.map(item=>item.number),['01','02','03','04','05']);
  if(locale!=='zh')assert.ok(!han.test(JSON.stringify({form:data.form,guide:data.guide})),locale);
 }
});
test('the response promise remains 24 working hours in every language',()=>{
 const source='回复时间：工作日 08:30–18:00（北京时间）。可在线留言，我们会在24个工作小时内回复并跟进。';
 const required={zh:/24个工作小时/,en:/24 working hours/,es:/24 horas laborables/,fr:/24 heures ouvrées/,ko:/근무시간 기준 24시간/,ru:/24 рабочих часов/};
 for(const locale of locales)assert.match(fittingText(source,locale),required[locale],locale);
});
test('every Luer and quick-connect locale retains its published SKU and mating candidates',()=>{
 for(const product of FITTING_PUBLISHED_PRODUCTS){const identity={model:product.foreachModel,productCode:product.productCode,productTypeId:product.productTypeId};
  if(product.productTypeId==='luer-fittings'){
   const base=getLuerPairConfig(identity,'zh');assert.ok(base);
   for(const locale of locales){const config=getLuerPairConfig(identity,locale);assert.ok(config);assert.deepEqual(config.defaultChoice,base.defaultChoice);assert.deepEqual(resolveLuerPair(config,config.defaultChoice).map(p=>p.model),resolveLuerPair(base,base.defaultChoice).map(p=>p.model));assert.equal(resolveLuerPair(config,{mode:'single'})[0].productCode,product.productCode);}
  }
  if(product.productTypeId==='quick-connect-fittings'){
   const base=getQuickConnectPairConfig(identity,'zh');if(!base)continue;
   for(const locale of locales){const config=getQuickConnectPairConfig(identity,locale);assert.ok(config);assert.equal(config.baseModel,base.baseModel);assert.deepEqual(config.options.map(x=>x.model),base.options.map(x=>x.model));}
  }
 }
});
test('all standalone dimensions and visible SKU values have localized labels without changing selection values',()=>{
 for(const type of STANDALONE_FITTING_TYPES){const details=JSON.parse(fs.readFileSync(require('node:path').resolve(__dirname,'../../data/products/generated/fittings',type,'detail/index.json'),'utf8'));const config=buildStandaloneFittingSelection(type,details);
  for(const locale of locales.slice(1))for(const field of config.dimensions.filter(f=>!['profile','shape'].includes(f.key)&&f.label!=='密封方式')){
   assert.ok(!han.test(fittingText(field.label,locale)),field.label);
   for(const value of new Set(config.options.map(o=>o.attributes[field.key]).filter(Boolean)))assert.ok(!han.test(fittingText(value,locale)),locale+': '+value);
  }
 }
});
