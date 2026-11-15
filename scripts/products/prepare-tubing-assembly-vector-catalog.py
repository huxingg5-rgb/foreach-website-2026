"""Extract original side-elevation paths; never synthesize fitting dimensions.

Only approved PDFs from fitting-drawing-manifest.json are read. Thick outline
paths form the side view; dimension/leader strokes are excluded. Generated
contact sheets are reviewed before the extracted paths are used in the UI.
"""
import json, pathlib, collections, sys, hashlib, io, base64
import pdfplumber
from reportlab.pdfgen.canvas import Canvas
ROOT = pathlib.Path(__file__).resolve().parents[2]
manifest = json.loads((ROOT/'data/products/detail/fitting-drawing-manifest.json').read_text(encoding='utf-8'))['products']['hard-tube-fittings']
manifest = {k:v for k,v in manifest.items() if k.startswith(('hf-','hf6-','hfl-','hfl6-','hn-','hn6-','hnf-','hnf6-','hne-','hne6-','hsf-','hsf6-'))}
target=ROOT/'data/products/configurator/tubing-assembly-vector-parts.json'
only=set(sys.argv[sys.argv.index('--only')+1:]) if '--only' in sys.argv else None
out = json.loads(target.read_text(encoding='utf-8')) if only else {}; reports = []
review=pathlib.Path(sys.argv[1]); review.mkdir(parents=True,exist_ok=True)
view_root = ROOT/'public/assets/products/tubing-assemblies/part-drawing-views'
view_root.mkdir(parents=True, exist_ok=True)
urls={url for x in manifest.values() for url in [x['url'],x.get('originalUrl')] if url}
for url in sorted(urls if only is None else urls.intersection(only)):
 file = ROOT/'public'/url.lstrip('/')
 if not file.exists(): continue
 with pdfplumber.open(file) as pdf:
  p = pdf.pages[0]
  region = [x for x in p.lines+p.curves if x['x0']>p.width*.20 and x['x1']<p.width*.80 and x['top']>p.height*.20 and x['bottom']<p.height*.72 and not x.get('dash')]
  weights = collections.Counter(round(x['linewidth'],3) for x in region if x['linewidth']>0)
  if not weights: reports.append([url,'no vector outline']); continue
  weight = weights.most_common(1)[0][0]
  items = [x for x in region if round(x['linewidth'],3)>=weight-.001]
  parent=list(range(len(items))); cells={}
  def root(x):
   while parent[x]!=x: parent[x]=parent[parent[x]]; x=parent[x]
   return x
  for i,x in enumerate(items):
   for a,b in x['pts']:
    a,b=round(a*2),round(b*2)
    for dx in [-1,0,1]:
     for dy in [-1,0,1]:
      for j in cells.get((a+dx,b+dy),[]): parent[root(i)]=root(j)
    cells.setdefault((a,b),[]).append(i)
  groups={}
  for i,x in enumerate(items): groups.setdefault(root(i),[]).append(x)
  candidates=[]
  for group in groups.values():
   box=[min(x['x0'] for x in group),min(x['top'] for x in group),max(x['x1'] for x in group),max(x['bottom'] for x in group)]
   w,h=box[2]-box[0],box[3]-box[1]
   if w>35 and h>8 and w>h*1.25 and len(group)>30: candidates.append((len(group),box))
  if not candidates: reports.append([url,'no horizontal view']); continue
  _,box=max(candidates)
  # Flutes/head surfaces can be separate paths touching the threaded region.
  # Include all thick strokes connected to this view, not just its largest mesh.
  for _ in range(4):
   near=[x for x in items if x['x0']<=box[2]+1.6 and x['x1']>=box[0]-1.6 and x['top']<=box[3]+.5 and x['bottom']>=box[1]-.5]
   box=[min(x['x0'] for x in near),min(x['top'] for x in near),max(x['x1'] for x in near),max(x['bottom'] for x in near)]
  if file.name in {'443-00-00145-c.pdf','443-00-00200-c.pdf','443-02-00371-c.pdf','443-02-00434-c.pdf','443-02-00435-c.pdf','443-02-00478-c.pdf','443-02-00663-c.pdf','443-02-00664-c.pdf'}:
   # These older drawings use one line weight for outlines and dimensions.
   # Locate the thread's tall curves and the repeated head flute strokes.
   curves=[x for x in p.curves if x['x0']>=box[0]-.1 and x['x1']<=box[2]+.1 and x['top']>=box[1]-.1 and x['bottom']<=box[3]+.1 and x['height']>15 and x['width']>1]
   tx0,ty0,tx1,ty1=min(x['x0'] for x in curves),min(x['top'] for x in curves),max(x['x1'] for x in curves),max(x['bottom'] for x in curves)
   flutes=[x for x in p.lines if x['height']<.1 and (tx1-tx0)*.3<x['width']<(tx1-tx0)*1.6 and tx0-40<x['x1']<tx0+10 and ty0-30<x['top']<ty1+30]
   cy=(ty0+ty1)/2
   ends=[x['x1'] for x in p.lines if x['width']<.1 and x['x0']>=tx1-5 and x['height']>5 and x['height']<(ty1-ty0)*1.5 and abs((x['top']+x['bottom'])/2-cy)<2]
   box=[min(x['x0'] for x in flutes)-3,min(ty0,min(x['top'] for x in flutes))-2,max([tx1]+ends)+.2,max(ty1,max(x['bottom'] for x in flutes))+2]
  x0,y0,x1,y1=box; selected=[x for x in items if x['x0']>=x0-.1 and x['x1']<=x1+.1 and x['top']>=y0-.1 and x['bottom']<=y1+.1]
  x0,y0,x1,y1=min(x['x0'] for x in selected),min(x['top'] for x in selected),max(x['x1'] for x in selected),max(x['bottom'] for x in selected)
  paths=[]; stroke_widths=[]
  for x in selected:
   commands=[]
   for segment in x['path']:
    # PDF's operand-free `h` closes a subpath; SVG uses Z, not H (horizontal line).
    command=['Z' if segment[0] == 'h' else segment[0].upper()]
    for point in segment[1:]: command.extend([round(point[0]-x0,3),round(point[1]-y0,3)])
    commands.append(command)
   paths.append(commands)
   stroke_widths.append(round(x['linewidth'],6))
  width,height=round(x1-x0,3),round(y1-y0,3)
  padding=max(stroke_widths)/2+.1
  view_name='--'.join(url.split('/')[-2:]).removesuffix('.pdf')+'-side.pdf'
  # Replay only the original selected path operands, without dimension leaders,
  # labels or bitmap tracing. Coordinates and line weights stay in source units.
  view_buffer=io.BytesIO()
  view=Canvas(view_buffer,pagesize=(width+2*padding,height+2*padding),pageCompression=1,invariant=1)
  view.setTitle(file.stem+' - original side view')
  view.setSubject('Source: '+url+'; original path coordinates and line weights; annotations excluded')
  for commands,line_width in zip(paths,stroke_widths):
   original_path=view.beginPath()
   for command,*coords in commands:
    points=[v+padding if i%2==0 else height+padding-v for i,v in enumerate(coords)]
    if command=='M': original_path.moveTo(*points)
    elif command=='L': original_path.lineTo(*points)
    elif command=='C': original_path.curveTo(*points)
    elif command=='Z': original_path.close()
    else: raise ValueError('Unsupported original path operator: '+command)
   view.setLineWidth(line_width)
   view.drawPath(original_path,stroke=1,fill=0)
  view.showPage(); view.save()
  # A JSON envelope keeps native PDF bytes intact when local endpoint software
  # transparently encrypts .pdf files (its stat size can differ from read size).
  view_bytes=view_buffer.getvalue()
  (review/view_name).write_bytes(view_bytes)
  view_asset=view_name.removesuffix('.pdf')+'.json'
  (view_root/view_asset).write_text(json.dumps({'source':url,'sha256':hashlib.sha256(view_bytes).hexdigest(),'pdf':base64.b64encode(view_bytes).decode('ascii')},separators=(',',':')),encoding='utf-8')
  out[url]={'width':width,'height':height,'axisY':round((y1-y0)/2,3),'paths':paths,'strokeWidths':stroke_widths,'source':url,'bbox':[x0,y0,x1,y1],
   'viewAsset':'/assets/products/tubing-assemblies/part-drawing-views/'+view_asset,'viewPadding':padding,'sourceSha256':hashlib.sha256(file.read_bytes()).hexdigest()}
  reports.append([url,len(paths),[round(v,2) for v in box]])
target.write_text(json.dumps(out,separators=(',',':')),encoding='utf-8')
(review/'vector-extraction-report.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
for i,(url,part) in enumerate(out.items()):
 scale=min(320/part['width'],120/part['height'])
 paths=''.join('<path stroke-width="'+str(weight)+'" d="'+''.join(c[0]+' '.join(str(v) for v in c[1:]) for c in p)+'"/>' for p,weight in zip(part['paths'],part['strokeWidths']))
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="360" height="170" viewBox="0 0 360 170"><rect width="360" height="170" fill="white"/><text x="5" y="16" font-size="12">{i}: {url.split("/")[-1]}</text><g transform="translate(18 30) scale({scale})" fill="none" stroke="black">{paths}</g></svg>'
 (review/f'part-{i:02}.svg').write_text(svg,encoding='utf-8')
print(f'Prepared {sum(isinstance(row[1],int) for row in reports)} original PDF side views; {len(out)} views in the catalog.')
