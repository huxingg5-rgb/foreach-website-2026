const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const XLSX=require('xlsx');
const {readHardTubePlugRows,buildHardTubePlugSelection,buildHardTubePlugDetail,applyHardTubePlugCopy,isHardTubePlug,hardTubePlugCopy}=require('./hard-tube-plugs.cjs');
const root=path.resolve(__dirname,'../..');
const workbook=XLSX.readFile(path.join(root,'data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx'));
const rows=readHardTubePlugRows(workbook);
const expected={
  '809184':'HBL6-U28-PS-B','809189':'HBL6-M6-PS-B','809178':'HBL-U28-PV-N','809390':'HBL-U28-PV-B',
  '809180':'HBL-M6-PV-N','809400':'HBL-M6-PV-B','809526':'HBL6X-M6-PV-N','809527':'HBL6X-U28-PV-N',
};
test('four-segment plugs retain exact catalogue codes and do not include other fitting families',()=>{
  assert.deepEqual(Object.fromEntries(rows.map(r=>[r.productCode,r.model])),expected);
  assert.equal(isHardTubePlug({model:'HF-M6-20-PV-N'}),false);
  assert.equal(isHardTubePlug({model:'HBL6-U40-PK-N'}),false); // Older catalogue model is outside this supplied sale list.
  assert.equal(isHardTubePlug({cardTitle:{zh:'HBL6X-M6-PV-N'}}),true);
});
test('plug selection uses thread/material/color and has no tubing-OD value',()=>{
  for(const row of rows){
    const p=buildHardTubePlugSelection(row,1);
    assert.equal(p.productId,row.productCode);assert.equal(p.sourcePart,row.part);assert.equal(p.filters.filter03,'');
    assert.equal(p.filters.filter02,row.model.includes('-M6-')?'M6×1':'1/4-28 UNF');
    assert.equal(p.filters.filter04,row.model.includes('-PS-')?'PPS':'PVDF');
    for(const locale of Object.keys(hardTubePlugCopy))assert.ok(p.cardSubtitle[locale]&&p.searchKeywords[locale].includes(row.model));
  }
});
test('all 48 localized details preserve identities, use square hero images and avoid inherited tube specs',()=>{
  for(const row of rows)for(const locale of Object.keys(hardTubePlugCopy)){
    const p=applyHardTubePlugCopy(buildHardTubePlugDetail(row),locale);
    assert.equal(p.model,row.model);assert.equal(p.productCode,row.productCode);
    assert.equal(p.sourcePart,row.part);assert.ok(p.mainImage.endsWith('-main.webp'));assert.ok(p.imageCard.endsWith('-card.webp'));
    assert.ok(p.description.includes(row.model));assert.equal(p.faqs.length,3);
    assert.equal(p.specs.length,7);assert.ok(!p.specs.some(s=>/接管外径|Tube OD|Tubing OD/.test(s.label)));
    const prose=JSON.stringify([p.description,p.advantages,p.faqs,p.specs,p.bottomCtaTitle]);
    assert.ok(!/undefined|NaN|25 MPa/.test(prose));
    if(locale!=='zh')assert.ok(!/[\u3400-\u9fff]/.test(prose),'Untranslated '+locale+' '+row.model);
  }
});
test('non-plug detail data passes through unchanged',()=>{
  const p={model:'HF-M6-20-PV-N',description:'existing copy'};
  assert.equal(applyHardTubePlugCopy(p,'en'),p);
});
test('every plug resolves exact source CAD and an existing drawing; only material variants share geometry',()=>{
  const manifest=require('../../data/products/detail/hard-tube-plug-cad-manifest.json');
  const drawings=require('../../data/products/detail/fitting-drawing-manifest.json');
  assert.equal(Object.keys(manifest.products).length,8);assert.equal(Object.keys(manifest.geometries).length,6);
  for(const row of rows){
    const slug=row.model.toLowerCase(),p=manifest.products[slug],g=manifest.geometries[p.viewerId];
    assert.equal(p.model,row.model);assert.equal(p.productCode,row.productCode);assert.equal(p.part,row.part);
    assert.ok(g.sourceSha256&&g.geometrySha256);assert.ok(g.sizeMm.every(v=>v>0));
    assert.ok(fs.statSync(path.join(root,'public',g.model3dUrl)).size>1000);
    const drawingUrl=drawings.products['hard-tube-fittings'][slug].url;
    assert.equal(drawingUrl,`/downloads/products/fittings/2d-drawings/01/${row.part.toLowerCase()}-c.pdf`);
    assert.ok(fs.existsSync(path.join(root,'public',drawingUrl)));
  }
  assert.notEqual(manifest.products['hbl6x-m6-pv-n'].viewerId,manifest.products['hbl6x-u28-pv-n'].viewerId);
});
test('published image files have correct encoding and native sizes',async()=>{
  const sharp=require('sharp');
  for(const row of rows)for(const [role,width,height] of [['main',1500,1500],['card',2000,1500]]){
    const file=path.join(root,'public/images/products/fittings/hard-tube-fittings/plugs',row.model.toLowerCase()+'-'+role+'.webp');
    const meta=await sharp(file).metadata();assert.equal(meta.format,'webp');assert.equal(meta.width,width);assert.equal(meta.height,height);assert.equal(meta.hasAlpha,false);
  }
});
