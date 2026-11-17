"""Extract verified Chinese guide figures; preserve source geometry and annotations."""

import argparse
import hashlib
import json
import shutil
import subprocess
from pathlib import Path
from PIL import Image, ImageChops
from pypdf import PdfReader

SOURCES = [
    ("rpl-installation", "2.121B-无阀泵/PS-121B-011_A01_cn_RPL-P6.35系列无阀泵产品规格书.pdf", 5, (.04, .20, .99, .65)),
    ("smtp2-adapter", "4.130A-移液泵/PS-SMTP-011_A08_cn_SMTP2产品规格书.pdf", 4, (.08, .11, .96, .26)),
    ("smtp4-optocoupler", "4.130A-移液泵/PS-130A-003_002_cn_SMTP4产品规格书.pdf", 4, (.08, .612, .96, .90)),
    ("hmd-valve-paths", "3.130B-注射泵/PS-SDRV-007_003_cn_HMD3注射泵产品规格书.pdf", 6, (.04, .14, .99, .68)),
    ("mrv3-controller", "14.120C-旋转阀/UM-120C-2411-00001_001_cn_MRV3陶瓷系列多通道旋转阀用户使用手册.pdf", 7, (.08, .29, .96, .90)),
    ("hp-flow-paths", "14.120C-旋转阀/PS-120C-2604-00001_A02_cn_HP二位六通带排气高压旋转阀规格书.pdf", 5, (.08, .225, .98, .91)),
    ("abd-pinout", "6.110B-传感器/PS-110B-2407-00002_A01_cn_ABD气泡检测器产品规格书.pdf", 3, (.08, .17, .94, .86)),
    ("pdm5-pinout", "6.110B-传感器/PS-110B-2508-00001_A02_cn_PDM5压力检测模块标准规格书.pdf", 4, (.08, .16, .94, .65)),
    ("sv10-structure", "7.120A 122A-电磁阀/PS-122A-003_A02_cn_6010系列电磁阀规格书.pdf", 3, (.08, .10, .96, .91)),
]

RPL_P635_MANUAL = "2.121B-无阀泵/PS-121B-012_A01_cn_RPL-P6.35系列无阀泵产品使用手册.pdf"
RPL_P15_MANUAL = "2.121B-无阀泵/PS-121B-017_A00_cn_RPL-P15系列无阀泵产品使用手册.pdf"
# Read the original embedded illustrations, including their labels. Do not
# rasterize a full page or redraw the product, connectors, or electrical circuit.
RPL_MANUAL_FIGURES = [
    ("rpl-manual-working-cycle", RPL_P635_MANUAL, 10, ("Im0.jpg",), "single"),
    ("rpl-p635-manual-components", RPL_P635_MANUAL, 10, ("Im1.png",), "single"),
    ("rpl-p15-manual-components", RPL_P15_MANUAL, 10, ("Im1.png",), "single"),
    ("rpl-p635-manual-range-adjustment", RPL_P635_MANUAL, 21, ("Im1.png",), "single"),
    ("rpl-p15-manual-range-adjustment", RPL_P15_MANUAL, 20, ("Im0.png",), "single"),
    ("rpl-manual-motor-wiring", RPL_P635_MANUAL, 17, ("Im1.png", "Im2.png", "Im3.png"), "motor"),
    ("rpl-manual-optocoupler-wiring", RPL_P635_MANUAL, 18, ("Im1.png", "Im2.png"), "stack"),
    ("rpl-manual-start-stop", RPL_P635_MANUAL, 19, ("Im1.jp2", "Im2.jp2"), "pair"),
    ("rpl-p15-manual-start-stop", RPL_P15_MANUAL, 18, ("Im0.jp2", "Im1.jp2"), "pair"),
    ("rpl-manual-gravimetric-setup", RPL_P635_MANUAL, 20, ("Im0.jp2",), "single"),
    ("rpl-manual-installation-directions", RPL_P635_MANUAL, 14, ("Im0.png",), "single"),
]

RPL_P4_SPEC = "2.121B-无阀泵/PS-121B-021_002_cn_RPL-P4系列无阀泵产品规格书.pdf"
REMAINING_VALVELESS_FIGURES = [
    ("rpl-p4-components", RPL_P4_SPEC, 4, ("KSPX12.jp2",), "single"),
    ("rpl-p4-installation-directions", RPL_P4_SPEC, 5, ("Image67.png",), "single"),
    ("rpl-p4-motor-wiring", RPL_P4_SPEC, 6, ("KSPX7.jp2",), "trim"),
    ("rpl-p4-optocoupler-wiring", RPL_P4_SPEC, 7, ("Image81.png", "Image82.png"), "stack"),
]


def white_image(original):
    image = original.convert("RGBA")
    background = Image.new("RGBA", image.size, "white")
    background.alpha_composite(image)
    return background.convert("RGB")


def arrange_illustrations(images, layout):
    if layout == "single":
        return images[0]
    if layout == "trim":
        image = images[0]
        mask = ImageChops.difference(image, Image.new("RGB", image.size, "white")).convert("L").point(lambda value: 255 if value > 20 else 0)
        bounds = mask.getbbox()
        if bounds:
            bounds = (max(0, bounds[0] - 20), max(0, bounds[1] - 20), min(image.width, bounds[2] + 20), min(image.height, bounds[3] + 20))
            return image.crop(bounds)
        return image
    if layout == "pair":
        width = sum(image.width for image in images) + 32
        height = max(image.height for image in images)
        panel = Image.new("RGB", (width, height), "white")
        x = 0
        for image in images:
            panel.paste(image, (x, (height - image.height) // 2))
            x += image.width + 32
        return panel
    if layout == "motor":
        table, connector, winding = images
        width = max(table.width, connector.width + 48 + winding.width)
        y = table.height + 32
        panel = Image.new("RGB", (width, y + max(connector.height, winding.height)), "white")
        panel.paste(table, ((width - table.width) // 2, 0))
        panel.paste(connector, (0, y))
        panel.paste(winding, (width - winding.width, y))
        return panel
    width = max(image.width for image in images)
    panel = Image.new("RGB", (width, sum(image.height for image in images) + 24 * (len(images) - 1)), "white")
    y = 0
    for image in images:
        panel.paste(image, ((width - image.width) // 2, y))
        y += image.height + 24
    return panel


def save_figure(selected, target):
    # Inline technical figures retain their chart aspect ratio. These are
    # explanatory diagrams, not square product gallery photographs. Resizing
    # low-resolution embedded artwork does not add source detail.
    height = round(selected.height * 1440 / selected.width)
    selected = selected.resize((1440, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (1500, height + 60), "white")
    canvas.paste(selected, (30, 30))
    canvas.save(target, "WEBP", lossless=True, method=6)
    return dict(width=canvas.width, height=canvas.height)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-root", type=Path, default=Path(r"\\192.168.1.2\Quality\1、体系文件\05其它\规格书"))
    parser.add_argument("--work-dir", type=Path, required=True)
    parser.add_argument("--pdftoppm", default=shutil.which("pdftoppm"))
    parser.add_argument("--rpl-manuals-only", action="store_true", help="Generate only the RPL handbook illustrations")
    parser.add_argument("--remaining-valveless-only", action="store_true", help="Generate P4 diagrams and the two DRPL structure photographs")
    args = parser.parse_args()
    if args.rpl_manuals_only and args.remaining_valveless_only:
        parser.error("Choose only one figure subset")
    if not args.pdftoppm and not (args.rpl_manuals_only or args.remaining_valveless_only):
        raise SystemExit("pdftoppm is required")
    root = Path(__file__).resolve().parents[2]
    destination = root / "public/images/products/detail-guides/zh"
    destination.mkdir(parents=True, exist_ok=True)
    args.work_dir.mkdir(parents=True, exist_ok=True)
    records = []
    dimension_file = root / "data/products/detail/instrument-guide-figures.generated.json"
    dimensions = json.loads(dimension_file.read_text(encoding="utf-8")) if dimension_file.exists() else {}
    for name, source, page, crop in ([] if args.rpl_manuals_only or args.remaining_valveless_only else SOURCES):
        source_path = args.source_root / source
        prefix = args.work_dir / f"render-{name}"
        subprocess.run([args.pdftoppm, "-f", str(page), "-l", str(page), "-singlefile", "-scale-to", "2600", "-png", str(source_path), str(prefix)], check=True, capture_output=True)
        with Image.open(prefix.with_suffix(".png")) as original:
            width, height = original.size
            selected = original.convert("RGB").crop(tuple(round(v * (width if i % 2 == 0 else height)) for i, v in enumerate(crop)))
            target = destination / f"{name}.webp"
            dimensions[target.name] = save_figure(selected, target)
        records.append(dict(file=str(target), source=str(source_path), page=page, crop=crop, **dimensions[target.name]))

    readers = {}
    selected_figures = REMAINING_VALVELESS_FIGURES if args.remaining_valveless_only else RPL_MANUAL_FIGURES
    if not (args.rpl_manuals_only or args.remaining_valveless_only):
        selected_figures = RPL_MANUAL_FIGURES + REMAINING_VALVELESS_FIGURES
    for name, source, page, names, layout in selected_figures:
        source_path = args.source_root / source
        if source not in readers:
            readers[source] = PdfReader(source_path)
        embedded = {image.name: image for image in readers[source].pages[page - 1].images}
        images = [white_image(embedded[image_name].image) for image_name in names]
        selected = arrange_illustrations(images, layout)
        target = destination / f"{name}.webp"
        dimensions[target.name] = save_figure(selected, target)
        records.append(dict(file=str(target), source=str(source_path), page=page,
                            source_sha256=hashlib.sha256(source_path.read_bytes()).hexdigest(),
                            embedded_images=[dict(name=image_name, width=image.width, height=image.height)
                                             for image_name, image in zip(names, images)],
                            arrangement=layout, **dimensions[target.name]))
    if not args.rpl_manuals_only:
        for slug in ("drpl-0109", "drpl-0119"):
            source_path = root / f"public/images/products/pumps/valveless-pumps/foreach-{slug}-dual-head-valveless-pump.webp"
            target = destination / f"{slug}-structure.webp"
            with Image.open(source_path) as original:
                dimensions[target.name] = save_figure(white_image(original), target)
                native_size = original.size
            records.append(dict(file=str(target), source=str(source_path), native_size=native_size, **dimensions[target.name]))
    (args.work_dir / "guide-image-manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    dimension_file.write_text(json.dumps(dimensions, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(dict(images=len(records), destination=str(destination)), ensure_ascii=False))


if __name__ == "__main__":
    main()
