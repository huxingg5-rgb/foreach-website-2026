"""Extract the supplied DRPL illustrations, preserving the original geometry and labels."""

import argparse
import hashlib
import importlib.util
import json
import shutil
from pathlib import Path

from pypdf import PdfReader

FIGURES = [
    ("drpl-working-cycle", 3, ("Im1.jpg",), "single"),
    ("drpl-dimensions-ports", 4, ("Im0.png",), "single"),
    ("drpl-motor-wiring", 5, ("Im1.png", "Im2.png"), "pair"),
    ("drpl-optocoupler-wiring", 6, ("Im1.png", "Im2.png"), "stack"),
]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-pdf", type=Path, required=True)
    parser.add_argument("--work-dir", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    args.work_dir.mkdir(parents=True, exist_ok=True)
    archive = args.work_dir / args.source_pdf.name
    if archive.resolve() != args.source_pdf.resolve():
        shutil.copy2(args.source_pdf, archive)
    module_spec = importlib.util.spec_from_file_location("guide_images", Path(__file__).with_name("build-instrument-guide-images.py"))
    helpers = importlib.util.module_from_spec(module_spec)
    module_spec.loader.exec_module(helpers)
    reader = PdfReader(args.source_pdf)
    destination = root / "public/images/products/detail-guides/zh"
    dimension_file = root / "data/products/detail/instrument-guide-figures.generated.json"
    dimensions = json.loads(dimension_file.read_text(encoding="utf-8"))
    records = []
    source_sha = hashlib.sha256(args.source_pdf.read_bytes()).hexdigest()
    for name, page, image_names, layout in FIGURES:
        embedded = {image.name: image for image in reader.pages[page - 1].images}
        images = [helpers.white_image(embedded[key].image) for key in image_names]
        panel = helpers.arrange_illustrations(images, layout)
        target = destination / f"{name}.webp"
        dimensions[target.name] = helpers.save_figure(panel, target)
        records.append(dict(file=str(target), source=str(archive), source_sha256=source_sha,
                            page=page, embedded_images=[dict(name=key, width=image.width, height=image.height)
                                                       for key, image in zip(image_names, images)],
                            arrangement=layout, **dimensions[target.name]))
    dimension_file.write_text(json.dumps(dimensions, indent=2) + "\n", encoding="utf-8")
    (args.work_dir / "guide-image-manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(dict(images=len(records), destination=str(destination)), ensure_ascii=False))


if __name__ == "__main__":
    main()
