const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../..'),output=path.join(root,'public/models/products/tubing-assemblies/interactive');
async function build(){
  // The same source supplies the Luer toolbar, icon paths, panels and styles.
  const shared=fs.readFileSync(path.join(root,'public/models/valves/6010/viewer.html'),'utf8');
  const script=fs.readFileSync(path.join(__dirname,'viewer.js'),'utf8');
  const styles=[...shared.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)].map(m=>m[0]).join('\n');
  const toolbarStart=shared.indexOf('<div class="topbar">'),panelStart=shared.indexOf('<aside id="tree-panel"'),panelEnd=shared.indexOf('<div id="drawing-wrap"');
  const icons=script.match(/const icons=(\{[^\n]+\});/);
  if(!styles||toolbarStart<0||panelStart<toolbarStart||panelEnd<panelStart||!icons)throw Error('Shared Luer/CAD interface changed; inspect before rebuilding.');
  const html=fs.readFileSync(path.join(__dirname,'tubing-assembly-viewer.html'),'utf8').replace('<!-- SHARED_CAD_STYLES -->',styles)
    .replace('<!-- SHARED_CAD_TOOLBARS -->',shared.slice(toolbarStart,panelStart)).replace('<!-- SHARED_CAD_PANELS -->',shared.slice(panelStart,panelEnd));
  fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'viewer.html'),html);
  const esbuild=require('esbuild');
  await esbuild.build({entryPoints:[path.join(__dirname,'tubing-assembly-viewer.js')],outfile:path.join(output,'viewer.js'),bundle:true,format:'iife',minify:true,target:'es2020',plugins:[{name:'shared-cad-icons',setup(b){
    b.onResolve({filter:/^shared-cad-icons$/},()=>({path:'icons',namespace:'shared-cad'}));
    b.onLoad({filter:/.*/,namespace:'shared-cad'},()=>({contents:`export default ${icons[1]};`,loader:'js'}));
  }}]});
  await esbuild.build({entryPoints:[path.join(__dirname,'tubing-assembly-model.js')],outfile:path.join(output,'model-core.mjs'),bundle:true,format:'esm',minify:true,target:'es2020'});
  console.log('Built tubing assembly 3D viewer with shared Luer/CAD controls and millimetre geometry.');
}
build().catch(error=>{console.error(error);process.exitCode=1;});
