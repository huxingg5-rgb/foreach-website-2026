"""Preserve the five customer-supplied FL/FL6 PDF selection-sheet templates.

Run with the bundled Python (pypdf, pdfplumber, Pillow). Source PDFs are kept
unchanged. PDFs retain their original page artwork; PNGs are preview assets.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import pdfplumber
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument("--source", default="E:/WXWork/1688851911761063/Cache/File/2026-10")
args = parser.parse_args()
source = Path(args.source)
output = ROOT / "public/assets/products/tubing-assemblies/flanged-tubing/drawing-templates"
output.mkdir(parents=True, exist_ok=True)
files = [
    ("fl-double", "PSD-FL系列双头(1).pdf"),
    ("fl-single", "PSD-FL单头.pdf"),
    ("fl6-double", "PSD-FL6系列-双头.pdf"),
    ("fl6-single", "PSD-FL6单头.pdf"),
    ("mixed-double", "PSD-FL6&FL系列-双头.pdf"),
]
manifest = []
for key, name in files:
    path = source / name
    raw = path.read_bytes()
    reader = PdfReader(path)
    if len(reader.pages) != 1:
        raise ValueError(f"Expected one original template page: {name}")
    writer = PdfWriter()
    writer.add_page(reader.pages[0])
    writer.add_metadata({"/Title": name, "/Subject": "FOREACH original tubing assembly selection sheet"})
    with (output / f"{key}.pdf").open("wb") as stream:
        writer.write(stream)
    with pdfplumber.open(path) as document:
        page = document.pages[0]
        page.to_image(resolution=200).save(str(output / f"{key}.png"))
        manifest.append({"key": key, "sourceFile": name, "sourceSha256": hashlib.sha256(raw).hexdigest(),
            "widthPoints": page.width, "heightPoints": page.height,
            "viewWidth": math.ceil(page.width * 140 / 72), "viewHeight": math.ceil(page.height * 140 / 72)})
(output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Prepared five original PDF templates and 200 dpi preview assets.")
