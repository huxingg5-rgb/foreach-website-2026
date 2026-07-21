const fs = require("fs");

const file = "app/products/pumps/diaphragm-pumps/[slug]/page.tsx";
let code = fs.readFileSync(file, "utf8");

/*
 * 隔膜泵详情页只保留：
 * - 添加图纸
 * - 加入清单
 * 不显示添加规格书 / 申请3D文件
 */
code = code.replace(/showDatasheetRequest:\s*Boolean\(datasheetUrl\),/g, "showDatasheetRequest: false,");
code = code.replace(/show3DRequest:\s*Boolean\(model3dUrl\),/g, "show3DRequest: false,");

if (!code.includes("showDrawingRequest: Boolean(drawing2dUrl)")) {
  code = code.replace(
    /drawing2dRequestOnly:\s*false,\s*model3dRequestOnly:\s*false,/,
    `drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,`
  );
}

fs.writeFileSync(file, code, "utf8");

console.log("patched:", file);
