# Vector drawing runtime

- `pdf-lib-1.17.1.mjs`: pdf-lib 1.17.1, MIT (`LICENSE.pdf-lib.md`).
- `fontkit-1.1.1.mjs`: @pdf-lib/fontkit 1.1.1, MIT (`LICENSE.fontkit.txt`).
  Source package: https://www.npmjs.com/package/@pdf-lib/fontkit/v/1.1.1
- `NotoSansCJKsc-Regular.otf`: Noto Sans CJK SC, SIL Open Font License
  (`LICENSE.NotoSansCJK.txt`). Source:
  https://github.com/notofonts/noto-cjk/blob/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf

All runtime resources are served locally. The font is loaded on export;
both PDF and SVG exports convert text to glyph paths.
The drawing generator emits native vector objects only; no bitmap background,
canvas snapshot, or embedded page images are used.

FL/FL6 fitting contours are in `data/products/configurator/flanged-vector-parts.json`.
Rebuild with `scripts/products/prepare-flanged-vector-parts.py` using the supplied
PDFs. Those originals contain raster artwork; the traced contours represent the
visible original illustration, not dimensional CAD geometry. Source hashes,
crop bounds, threshold and provenance are retained with each fitting.
