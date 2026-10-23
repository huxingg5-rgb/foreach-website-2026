const path=require('node:path');
const fs=require('node:fs');
const outfile=path.resolve(__dirname,'../../../public/models/products/pumps/valveless-pumps/viewer.js');
require('esbuild').buildSync({entryPoints:[path.join(__dirname,'viewer.js')],bundle:true,format:'iife',minify:true,legalComments:'eof',outfile});
// Normalize whitespace in bundled GLSL without changing shader tokens.
fs.writeFileSync(outfile,fs.readFileSync(outfile,'utf8').replace(/[ \t]+$/gm,'').replace(/^ +(?=\t)/gm,''));
