const path = require('node:path');
require('esbuild').buildSync({
  entryPoints: [path.join(__dirname, 'flanged-tubing-preview.js')],
  outfile: path.resolve(__dirname, '../../../public/models/products/tubing-assemblies/flanged-assembly-renderer.mjs'),
  bundle: true, format: 'esm', target: 'es2020', minify: true,
});
console.log('Built the flange assembly CAD renderer.');
