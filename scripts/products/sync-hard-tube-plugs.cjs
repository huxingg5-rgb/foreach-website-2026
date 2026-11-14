// Synchronize only plugs: preserve existing non-plug product data and copy.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const XLSX=require('xlsx');
const {readHardTubePlugRows,buildHardTubePlugSelection,buildHardTubePlugDetail,getHardTubePlugTaxonomy}=require('./hard-tube-plugs.cjs');
const root=path.resolve(__dirname,'../..');
const write=process.argv.includes('--write');
const workbook=XLSX.readFile(path.join(root,'data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx'));
const rows=readHardTubePlugRows(workbook);
const selectionFile=path.join(root,'data/products/selection/hard-tube-fitting-selection.generated.ts');
const detailFile=path.join(root,'data/products/generated/fittings/hard-tube-fittings/detail/index.json');
const imageMapFile=path.join(root,'data/products/selection/hard-tube-fitting-image-map.generated.json');
const summaryFile=path.join(root,'data/products/selection/hard-tube-fitting-selection.summary.json');
const drawingFile=path.join(root,'data/products/detail/fitting-drawing-manifest.json');
const source=fs.readFileSync(selectionFile,'utf8');
function arrayRange(text,name) {
  const marker=text.indexOf('export const '+name);
  if(marker<0)throw Error('Missing export '+name);
  const start=text.indexOf('[',text.indexOf('=',marker));
  let depth=0,quoted=false,escaped=false;
  for(let i=start;i<text.length;i++) {
    const c=text[i];
    if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}
    if(c==='"'){quoted=true;continue;}
    if(c==='[')depth++;
    else if(c===']'&&--depth===0)return {start,end:i+1,value:JSON.parse(text.slice(start,i+1))};
  }
  throw Error('Unterminated array '+name);
}
const oldSelection=arrayRange(source,'hardTubeFittingSelectionProducts').value;
const codes=new Set(rows.map(r=>r.productCode));
const existing=oldSelection.filter(p=>!codes.has(String(p.productId)));
const plugs=rows.map((row,i)=>buildHardTubePlugSelection(row,900+i));
const products=[...existing,...plugs];
let next=source;
for(const [name,items] of [['hardTubeFittingSelectionProducts',products],['hardTubeFittingTaxonomyItems',null]]) {
  const range=arrayRange(next,name);
  const taxonomy=getHardTubePlugTaxonomy();
  const value=items||[...range.value.filter(t=>!taxonomy.some(p=>p.id===t.id)),...taxonomy];
  next=next.slice(0,range.start)+JSON.stringify(value,null,2)+next.slice(range.end);
}
next=next.replace('包含：平底、卡箍、卡环和高压接头','包含：平底、卡箍、卡环、高压接头及螺纹堵头').replace('不包含：堵头、卡箍、卡环套件','不包含：独立卡箍、卡环套件');
const oldDetails=JSON.parse(fs.readFileSync(detailFile,'utf8'));
const preservedDetails=oldDetails.filter(p=>!codes.has(String(p.productCode)));
const details=[...preservedDetails,...rows.map(buildHardTubePlugDetail)].sort((a,b)=>a.model.localeCompare(b.model,'en'));
assert.deepEqual(products.filter(p=>!codes.has(String(p.productId))),existing);
assert.deepEqual(details.filter(p=>!codes.has(String(p.productCode))),preservedDetails);
const imageMap=JSON.parse(fs.readFileSync(imageMapFile,'utf8'));
for(const p of plugs)imageMap[p.cardTitle.zh]={imageCard:p.imageCard,mainImage:p.imageCard.replace('-card.webp','-main.webp'),images:[p.imageCard.replace('-card.webp','-main.webp')]};
const summary=JSON.parse(fs.readFileSync(summaryFile,'utf8'));
summary.generatedProducts=products.length;
summary.seriesCounts=products.reduce((m,p)=>{const key=p.filters.filter01;m[key]=(m[key]||0)+1;return m;},{});
const drawings=JSON.parse(fs.readFileSync(drawingFile,'utf8'));
for(const row of rows){
  const slug=row.model.toLowerCase();
  drawings.products['hard-tube-fittings'][slug]={...drawings.products['hard-tube-fittings'][slug],url:`/downloads/products/fittings/2d-drawings/01/${row.part.toLowerCase()}-c.pdf`};
}
for(const [file,text] of [[selectionFile,next],[detailFile,JSON.stringify(details,null,2)+'\n'],[imageMapFile,JSON.stringify(imageMap,null,2)+'\n'],[summaryFile,JSON.stringify(summary,null,2)+'\n'],[drawingFile,JSON.stringify(drawings,null,2)+'\n']]) {
  if(write)fs.writeFileSync(file,text,'utf8');
  else assert.equal(fs.readFileSync(file,'utf8'),text,'Stale plug data: '+path.relative(root,file));
}
console.log(JSON.stringify({mode:write?'write':'check',plugs:rows.length,selectionProducts:products.length,details:details.length,preservedSelection:existing.length,preservedDetails:preservedDetails.length}));
