const path=require('node:path');
require('esbuild').buildSync({entryPoints:[path.join(__dirname,'viewer.js')],bundle:true,format:'iife',minify:true,legalComments:'eof',outfile:path.resolve(__dirname,'../../../public/models/valves/6010/viewer.js')});
