"""Replace Chinese annotation text with numbered references, retaining native geometry.

The numbers are explained by locale-authored HTML captions. No pump, wire,
connector, port, flow arrow or electrical connection is generated or redrawn.
"""

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--work-dir", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    source_dir = root / "public/images/products/detail-guides/zh"
    output_dir = root / "public/images/products/detail-guides/rpl-intl"
    output_dir.mkdir(parents=True, exist_ok=True)
    args.work_dir.mkdir(parents=True, exist_ok=True)
    # Each rectangle contains annotation text only; original leader lines and
    # the complete engineering illustration outside it are checked pixelwise.
    replacements = {
        "rpl-manual-working-cycle.webp": [
            ((136, 621, 280, 693), "1"), ((498, 621, 644, 693), "2"),
            ((857, 621, 1004, 693), "3"), ((1218, 621, 1362, 693), "4"),
        ],
        "rpl-p4-components.webp": [
            ((1070, 43, 1210, 93), "1"), ((1167, 192, 1273, 242), "2"),
            ((1247, 906, 1320, 956), "3"), ((989, 906, 1122, 956), "4"),
            ((516, 906, 590, 955), "5"), ((290, 905, 419, 956), "6"),
            ((43, 908, 174, 956), "7"),
        ],
        "rpl-p635-manual-components.webp": [
            ((710, 38, 880, 91), "1"), ((980, 138, 1108, 190), "2"),
            ((1146, 229, 1315, 283), "3"), ((1290, 337, 1455, 394), "4"),
            ((1102, 1048, 1188, 1100), "5"), ((664, 1097, 755, 1145), "6"),
            ((382, 1191, 550, 1242), "7"), ((214, 1295, 380, 1345), "8"),
        ],
        "rpl-p15-manual-components.webp": [
            ((735, 28, 885, 83), "1"), ((895, 108, 1013, 152), "2"),
            ((1226, 202, 1378, 246), "3"), ((1314, 287, 1469, 338), "4"),
            ((1153, 1019, 1233, 1066), "5"), ((620, 1027, 700, 1078), "6"),
            ((386, 1113, 540, 1158), "7"), ((201, 1190, 350, 1241), "8"),
        ],
        "rpl-p635-manual-range-adjustment.webp": [
            ((28, 840, 330, 934), "1"), ((280, 25, 705, 125), "2"),
            ((1020, 80, 1480, 365), "3"), ((620, 969, 925, 1058), "4"),
        ],
        "rpl-p15-manual-range-adjustment.webp": [
            ((28, 835, 333, 929), "1"), ((320, 20, 730, 130), "2"),
            ((1026, 100, 1485, 383), "3"), ((620, 970, 910, 1055), "4"),
        ],
        "rpl-manual-gravimetric-setup.webp": [
            ((65, 160, 160, 205), "1"), ((250, 88, 380, 132), "2"),
            ((463, 171, 799, 217), "3"), ((900, 148, 1032, 190), "4"),
            ((1130, 28, 1290, 72), "5"), ((1316, 88, 1471, 128), "6"),
            ((1270, 186, 1352, 222), "7"),
        ],
        "rpl-manual-motor-wiring.webp": [
            ((230, 40, 925, 87), "I"), ((232, 102, 572, 146), "H"),
            ((587, 102, 924, 146), "F"), ((940, 48, 1455, 130), "II"),
            ((40, 45, 212, 136), ""), ((40, 160, 213, 205), "①"),
            ((40, 220, 121, 326), "②"), ((131, 221, 214, 267), "#"),
            ((132, 280, 215, 326), "φ"), ((394, 423, 482, 472), ""),
            ((1045, 403, 1087, 433), ""), ((1046, 457, 1086, 487), ""),
            ((1046, 509, 1087, 540), ""), ((1285, 697, 1323, 733), ""),
            ((1350, 697, 1389, 733), ""), ((1416, 697, 1453, 733), ""),
        ],
    }
    for filename in ("rpl-manual-installation-directions.webp", "rpl-p4-installation-directions.webp"):
        replacements[filename] = [((133, 45, 168, 86), ""), ((133, 565, 168, 610), "")]
    for filename in ("rpl-manual-optocoupler-wiring.webp", "rpl-p4-optocoupler-wiring.webp"):
        replacements[filename] = [
            ((606, 59, 688, 101), "1"), ((606, 193, 775, 240), "2"),
            ((606, 330, 776, 374), "3"), ((606, 466, 686, 512), "4"),
            ((790, 157, 879, 203), "5", "#eeeeee"),
            ((935, 226, 1028, 270), "5", "#eeeeee"),
        ]
    crops = {
        "rpl-manual-optocoupler-wiring.webp": (0, 0, 1500, 554),
        "rpl-p4-optocoupler-wiring.webp": (0, 0, 1500, 554),
        "rpl-p4-motor-wiring.webp": (0, 450, 1500, 1838),
    }
    files = sorted(set(replacements) | set(crops) | {
        "rpl-manual-start-stop.webp", "rpl-p15-manual-start-stop.webp",
    })
    font_path = Path("C:/Windows/Fonts/seguisym.ttf")
    records = []
    dimensions = {}
    for filename in files:
        original = Image.open(source_dir / filename).convert("RGB")
        edited = original.copy()
        mask = Image.new("L", original.size, 0)
        draw, mask_draw = ImageDraw.Draw(edited), ImageDraw.Draw(mask)
        for item in replacements.get(filename, []):
            box, label = item[:2]
            background = item[2] if len(item) > 2 else "white"
            draw.rectangle(box, fill=background)
            mask_draw.rectangle(box, fill=255)
            if label:
                tile = Image.new("RGB", (box[2] - box[0] + 1, box[3] - box[1] + 1), background)
                size = 42
                while True:
                    font = ImageFont.truetype(str(font_path), size)
                    left, top, right, bottom = font.getbbox(label)
                    if right - left <= tile.width - 6 and bottom - top <= tile.height - 6:
                        break
                    size -= 1
                ImageDraw.Draw(tile).text(((tile.width - right + left) / 2 - left,
                                          (tile.height - bottom + top) / 2 - top),
                                         label, font=font, fill="#173368")
                edited.paste(tile, (box[0], box[1]))
        outside_diff = ImageChops.difference(original, edited)
        outside_diff.paste((0, 0, 0), (0, 0), mask)
        assert outside_diff.getbbox() is None, f"Geometry changed outside labels: {filename}"
        crop = crops.get(filename, (0, 0, *original.size))
        target_image = edited.crop(crop)
        target = output_dir / filename
        target_image.save(target, "WEBP", lossless=True, method=6)
        decoded = Image.open(target).convert("RGB")
        assert ImageChops.difference(target_image, decoded).getbbox() is None
        dimensions[filename] = {"width": decoded.width, "height": decoded.height}
        records.append({"file": filename, "sourceSha256": hashlib.sha256((source_dir / filename).read_bytes()).hexdigest(),
                        "annotationBoxes": replacements.get(filename, []), "crop": crop,
                        "geometryOutsideAnnotationsUnchanged": True, "format": "WEBP", **dimensions[filename]})
    (root / "data/products/detail/rpl-guide-figures.intl.generated.json").write_text(
        json.dumps(dimensions, indent=2) + "\n", encoding="utf-8")
    (args.work_dir / "neutral-image-manifest.json").write_text(
        json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Verified {len(records)} lossless WebP figures; engineering pixels outside annotation text unchanged.")


if __name__ == "__main__":
    main()
