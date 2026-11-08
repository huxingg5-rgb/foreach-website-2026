const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve(__dirname, '../../../public/models/products/fittings/luer-fittings');
async function build() {
  // Use the quick-connect UI itself as the source of truth. Do not maintain a
  // second set of approximate icons, toolbar spacing, or responsive styles.
  const sharedHtml = fs.readFileSync(path.resolve(__dirname, '../../../public/models/valves/6010/viewer.html'), 'utf8');
  const sharedScript = fs.readFileSync(path.join(__dirname, 'viewer.js'), 'utf8');
  const styles = [...sharedHtml.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)].map(match => match[0]).join('\n')
    .replaceAll('#quick-connect-drawing-model', '#luer-drawing-model');
  const toolbarStart = sharedHtml.indexOf('<div class="topbar">');
  const panelStart = sharedHtml.indexOf('<aside id="tree-panel"');
  const panelEnd = sharedHtml.indexOf('<div id="drawing-wrap"');
  const icons = sharedScript.match(/const icons=(\{[^\n]+\});/);
  if (!styles || toolbarStart < 0 || panelStart < toolbarStart || panelEnd < panelStart || !icons) {
    throw Error('Shared quick-connect viewer UI changed; inspect the template before building.');
  }
  const sharedTranslations = sharedScript.match(/const translations=(\{[\s\S]*?\n\});/);
  if (!sharedTranslations) throw Error('Shared CAD translations missing');
  const localePlugin = {name:'shared-cad-copy',setup(build) {
    build.onResolve({filter:/^shared-cad-copy$/},()=>({path:'copy',namespace:'shared-copy'}));
    build.onLoad({filter:/.*/,namespace:'shared-copy'},()=>({contents:'export default '+sharedTranslations[1]+';',loader:'js'}));
  }};
  const translationBuild = await require('esbuild').build({entryPoints:[path.join(__dirname,'luer-copy.js')],bundle:true,platform:'node',format:'cjs',write:false,plugins:[localePlugin]});
  const translationModule = new (require('module'))('luer-copy',module);
  translationModule._compile(translationBuild.outputFiles[0].text,'luer-copy.cjs');
  const {getLuerCadText} = translationModule.exports;
  const neutralCopy = text => text.replaceAll('外形尺寸（不含电线）', '外形尺寸')
    .replaceAll('尺寸按模型测量，不含电线。', '尺寸为模型外形参考值，安装以二维图纸为准。');
  const html = fs.readFileSync(path.join(__dirname, 'luer-viewer.html'), 'utf8')
    .replace('<!-- SHARED_CAD_STYLES -->', styles)
    .replace('<!-- SHARED_CAD_TOOLBARS -->', neutralCopy(sharedHtml.slice(toolbarStart, panelStart)))
    .replace('<!-- SHARED_CAD_PANELS -->', neutralCopy(sharedHtml.slice(panelStart, panelEnd)));
  const result = await require('esbuild').build({entryPoints: [path.join(__dirname, 'luer-viewer.js')], bundle: true,
    format: 'iife', minify: true, legalComments: 'eof', write: false, outfile: path.join(output, 'viewer.js'),
    plugins: [localePlugin, {name: 'shared-cad-icons', setup(build) {
      build.onResolve({filter: /^shared-cad-icons$/}, () => ({path: 'icons', namespace: 'shared-cad'}));
      build.onLoad({filter: /.*/, namespace: 'shared-cad'}, () => ({contents: `export default ${icons[1]};`, loader: 'js'}));
    }}],
  });
  fs.mkdirSync(output, {recursive: true});
  fs.writeFileSync(path.join(output, 'viewer.js'), result.outputFiles[0].contents);
  fs.writeFileSync(path.join(output, 'viewer.html'), html);
  for (const locale of ['en','es','fr','ko','ru']) {
    const t=getLuerCadText(locale),bodyStart=html.indexOf('<body>');
    let body=html.slice(bodyStart).replace(/>([^<>]+)</g,(all,text)=>'>'+t(text)+'<');
    body=body.replace(/(aria-label|title)="([^"]*)"/g,(all,key,value)=>key+'="'+t(value).replaceAll('&','&amp;').replaceAll('"','&quot;')+'"');
    const head=html.slice(0,bodyStart).replace('lang="zh-CN"','lang="'+locale+'"').replace(/<title>([^<]*)<\/title>/,(all,title)=>'<title>'+t(title)+'</title>');
    fs.writeFileSync(path.join(output,'viewer.'+locale+'.html'),head+body);
  }
  console.log('Built Luer viewer with exact quick-connect toolbar, icons and styles; source CAD and shared viewer unchanged.');
}
build().catch(error => {console.error(error); process.exitCode = 1;});
