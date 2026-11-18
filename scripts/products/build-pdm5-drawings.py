"""Extract the PDM5 outline and terminal pinout from the published CN/EN datasheets.

Usage: python scripts/products/build-pdm5-drawings.py STAGING_DIRECTORY
The original page objects and embedded drawing images are preserved; only the
page boundary is cropped. No dimensions, labels or drawing content are redrawn.
"""
from hashlib import sha256
import json
from pathlib import Path
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

ROOT = Path(__file__).resolve().parents[2]
SOURCES = {
    "zh": ("PS-110B-2508-00001_A02_cn", "/downloads/resources/datasheets/zh-CN/Smart-Control-Modules/ps-110b-2508-00001-a02-cn-pdm5-pressure-sensor.pdf"),
    "en": ("PS-110B-2607-00001_A00_en", "/downloads/resources/datasheets/en/Smart-Control-Modules/ps-110b-2607-00001-a00-en-pdm5-pressure-sensor.pdf"),
}
CROP = (25, 70, 550, 540)  # PDF points, measured from the original page's top-left.
TERMINAL_CROPS = {"zh": (0, 70, 595, 528), "en": (0, 70, 595, 512)}


def crop(page, coordinates):
    height = float(page.mediabox.height)
    left, top, right, bottom = coordinates
    box = RectangleObject((left, height - bottom, right, height - top))
    page.cropbox = box
    page.mediabox = box


def build(staging: Path):
    staging.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for language, (specification, source_url) in SOURCES.items():
        source = ROOT / "public" / source_url.lstrip("/")
        source_bytes = source.read_bytes()
        reader = PdfReader(source)
        page = reader.pages[2]
        assert len(reader.pages) == 9
        text = page.extract_text()
        assert ("外观尺寸" if language == "zh" else "Outline") in text
        image_hashes = sorted(sha256(image.data).hexdigest() for image in page.images)
        assert len(image_hashes) == 4, "The reviewed outline page must contain four source views."
        crop(page, CROP)
        terminal = reader.pages[3]
        terminal_text = terminal.extract_text()
        assert all(pin in terminal_text for pin in ("VCC", "GND", "SCLK", "SDA"))
        crop(terminal, TERMINAL_CROPS[language])
        writer = PdfWriter()
        writer.add_page(page)
        writer.add_page(terminal)
        writer.add_metadata({"/Title": "PDM5 外形尺寸与端子定义" if language == "zh" else "PDM5 Outline Dimensions and Terminal Pinout",
                             "/Subject": f"{specification}, pages 3–4; original outline and terminal pinout", "/Author": "FOREACH"})
        filename = f"pdm5-outline-drawing-{language}.pdf"
        target = staging / filename
        with target.open("wb") as stream:
            writer.write(stream)
        extracted = PdfReader(target)
        assert len(extracted.pages) == 2
        assert sorted(sha256(image.data).hexdigest() for image in extracted.pages[0].images) == image_hashes
        assert source.read_bytes() == source_bytes
        output = target.read_bytes()
        manifest[language] = {
            "model": "PDM5", "language": language, "specification": specification,
            "sourcePdfUrl": source_url, "sourcePage": 3, "sourceSha256": sha256(source_bytes).hexdigest(),
            "cropFromTopLeftPt": CROP, "sourceViewImageSha256": image_hashes,
            "terminalSourcePage": 4, "terminalCropFromTopLeftPt": TERMINAL_CROPS[language],
            "drawingPdfUrl": f"/documents/products/control/pdm5/{filename}",
            "sha256": sha256(output).hexdigest(), "bytes": len(output),
        }
    (staging / "pdm5-drawing-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Provide a staging directory.")
    build(Path(sys.argv[1]))
