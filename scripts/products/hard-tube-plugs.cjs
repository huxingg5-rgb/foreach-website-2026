// Use the same reviewed copy and builders as the website.
require('tsx/cjs');
const content = require('../../data/products/detail/hard-tube-plugs.ts');
function readHardTubePlugRows(workbook) {
  const XLSX = require('xlsx');
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets['01_硬管接头'],{header:1,defval:''});
  const plugs = rows.flatMap((row,index)=>{
    const model = String(row[3]).match(/\bHBL(?:6X|6)?-(?:M6|U28)-(?:PV|PS)-(?:N|B)\b/)?.[0];
    return model ? [{model,part:String(row[2]).trim(),productCode:String(row[4]).trim(),workbookRow:index+1}] : [];
  });
  if(plugs.length!==8||new Set(plugs.map(p=>p.productCode)).size!==8)throw Error('Expected 8 unique hard-tube plug catalogue rows');
  return plugs;
}
module.exports={...content,readHardTubePlugRows};
