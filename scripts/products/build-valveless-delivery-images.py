"""Convert valveless-pump delivery photos; crop the packing scene to the requested 4:3 frame."""

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image, ImageOps

PHOTOS = [
    ("valveless-pumps-inspection-record", "codex-clipboard-200ee793-c867-4105-b004-a8268ae5fbbb.jpg"),
    ("valveless-pumps-foam-separated-packaging", "codex-clipboard-f71ea8c5-3967-40b4-98b1-2d618c8dc338.jpg"),
    ("valveless-pumps-sealed-shipping-carton", "codex-clipboard-dde94013-c4ec-4486-847e-ce4166caa9fb.jpg"),
    ("valveless-pumps-carton-identification", "codex-clipboard-310776a4-f325-4fea-9f6f-fedeea2e9113.jpg"),
    ("valveless-pumps-protective-foam-cover", "codex-clipboard-f0e2b84c-96d5-4d76-83df-ce2a44e486a4.jpg"),
    ("valveless-pumps-packaging-operation", "codex-clipboard-0bb7772f-8991-4e30-995b-d2deda96bff4.jpg"),
]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-root", type=Path, required=True)
    parser.add_argument("--work-dir", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    destination = root / "public/images/products/pumps/valveless-pumps/delivery"
    archive = args.work_dir / "delivery-sources"
    destination.mkdir(parents=True, exist_ok=True)
    archive.mkdir(parents=True, exist_ok=True)
    records = []
    for name, source_name in PHOTOS:
        source = args.source_root / source_name
        saved_source = archive / source_name
        if source.resolve() != saved_source.resolve():
            shutil.copy2(source, saved_source)
        with Image.open(source) as original:
            photo = ImageOps.exif_transpose(original).convert("RGB")
            if photo.width != 1500:
                photo = photo.resize((1500, round(photo.height * 1500 / photo.width)), Image.Resampling.LANCZOS)
            if name == "valveless-pumps-packaging-operation":
                # User-approved 4:3 crop: retain the face, hands and sealing work.
                photo = ImageOps.fit(photo, (1500, 1125), Image.Resampling.LANCZOS, centering=(0.5, 0.27))
            target = destination / f"{name}.webp"
            photo.save(target, "WEBP", quality=95, method=6)
            records.append(dict(file=str(target), source=str(saved_source),
                                source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
                                width=photo.width, height=photo.height))
    (args.work_dir / "delivery-image-manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(dict(images=len(records), destination=str(destination)), ensure_ascii=False))


if __name__ == "__main__":
    main()
