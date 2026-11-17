"""Trace only the FL/FL6 fitting artwork supplied in the selection PDFs.

The PDFs contain raster illustrations, not CAD curves. This preserves their
visible outlines as filled vector contours; no manufacturing dimensions are
inferred. Page furniture, shadows and leader lines are excluded from the crop.
"""
from pathlib import Path
import hashlib
import json
import math
import pdfplumber

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path("E:/WXWork/1688851911761063/Cache/File/2026-10")
OUT = ROOT / "data/products/configurator/flanged-vector-parts.json"


def simplify(points, epsilon=.55):
    if len(points) < 3:
        return points
    ax, ay = points[0]
    bx, by = points[-1]
    den = math.hypot(bx-ax, by-ay)
    distances = [abs((by-ay)*x-(bx-ax)*y+bx*ay-by*ax)/den if den else math.hypot(x-ax, y-ay) for x, y in points]
    index = max(range(len(points)), key=distances.__getitem__)
    if distances[index] <= epsilon:
        return [points[0], points[-1]]
    return simplify(points[:index+1], epsilon)[:-1] + simplify(points[index:], epsilon)


def contours(image):
    pixels = image.convert("L")
    w, h = pixels.size
    black = {(x, y) for y in range(h) for x in range(w) if pixels.getpixel((x, y)) < 135}
    edges = {}
    for x, y in black:
        for neighbor, start, end in [((x,y-1),(x,y),(x+1,y)),((x+1,y),(x+1,y),(x+1,y+1)),((x,y+1),(x+1,y+1),(x,y+1)),((x-1,y),(x,y+1),(x,y))]:
            if neighbor not in black:
                edges.setdefault(start, []).append(end)
    result = []
    while edges:
        first = next(iter(edges))
        point, ring = first, [first]
        while point in edges:
            targets = edges[point]
            next_point = targets.pop()
            if not targets:
                del edges[point]
            point = next_point
            ring.append(point)
            if point == first:
                break
        area = sum(a[0]*b[1]-b[0]*a[1] for a, b in zip(ring, ring[1:]))/2
        if abs(area) >= 7:
            # Split a closed contour before RDP to preserve its winding/holes.
            mid = len(ring)//2
            reduced = simplify(ring[:mid+1])[:-1] + simplify(ring[mid:])
            result.append([[round(x/3, 3), round(y/3, 3)] for x, y in reduced])
    return result


result = {}
for key, filename, box in [
    ("FL", "PSD-FL系列双头(1).pdf", (158,507,278,578)),
    ("FL6", "PSD-FL6系列-双头.pdf", (158,519,295,565)),
]:
    source = SOURCE / filename
    with pdfplumber.open(source) as pdf:
        image = pdf.pages[0].to_image(resolution=420).original.crop(tuple(round(v*3) for v in box))
    if key == "FL":
        # The disconnected vertical part-callout below the thread is not a part.
        from PIL import ImageDraw
        ImageDraw.Draw(image).rectangle(((223-box[0])*3,(570-box[1])*3,(227-box[0])*3,(578-box[1])*3), fill="white")
    result[key] = {
        "source": filename, "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "sourceCrop140dpi": box, "sourceKind": "raster-outline-trace", "threshold": 135,
        "width": box[2]-box[0], "height": box[3]-box[1], "axisY": 542.5-box[1],
        "contours": contours(image),
    }
OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print("Traced FL/FL6 source fitting outlines:", [(k,len(v['contours'])) for k,v in result.items()])
