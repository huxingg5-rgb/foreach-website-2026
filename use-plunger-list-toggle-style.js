const fs = require("fs");

const file = "components/products/detail/ProductDetailClient.tsx";
let code = fs.readFileSync(file, "utf8");

/*
 * 1. 添加图纸按钮改为与柱塞泵/产品中心加入清单一致的 list-toggle active 样式
 */
code = code.replace(
  /<button\s+className=\{\[\s*styles\.button,\s*isDetailDrawingSelected \? styles\.detailActionSelected : "",\s*\]\s*\.filter\(Boolean\)\s*\.join\(" "\)\}\s*type="button"\s*aria-pressed=\{isDetailDrawingSelected\}\s*data-detail-action-selected=\{isDetailDrawingSelected \? "true" : undefined\}\s*onClick=\{handleAddDrawing\}\s*>\s*添加图纸\s*<\/button>/g,
  `<button
                    className={isDetailDrawingSelected ? "list-toggle active" : "list-toggle"}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>`
);

/*
 * 兼容还没被上一个脚本命中的旧结构
 */
code = code.replace(
  /<button\s+className=\{styles\.button\}\s+type="button"\s+onClick=\{handleAddDrawing\}\s*>\s*添加图纸\s*<\/button>/g,
  `<button
                    className={isDetailDrawingSelected ? "list-toggle active" : "list-toggle"}
                    type="button"
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>`
);

/*
 * 2. 加入清单按钮改为与柱塞泵/产品中心一致的 list-toggle active 样式
 */
code = code.replace(
  /<button\s+className=\{\[\s*styles\.button,\s*isDetailProductSelected \? styles\.detailActionSelected : "",\s*\]\s*\.filter\(Boolean\)\s*\.join\(" "\)\}\s*type="button"\s*aria-pressed=\{isDetailProductSelected\}\s*data-detail-action-selected=\{isDetailProductSelected \? "true" : undefined\}\s*onClick=\{handleAddList\}\s*>\s*加入清单\s*<\/button>/g,
  `<button
                  className={isDetailProductSelected ? "list-toggle active" : "list-toggle"}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  加入清单
                </button>`
);

code = code.replace(
  /<button\s+className=\{styles\.button\}\s+type="button"\s+onClick=\{handleAddList\}\s*>\s*加入清单\s*<\/button>/g,
  `<button
                  className={isDetailProductSelected ? "list-toggle active" : "list-toggle"}
                  type="button"
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  加入清单
                </button>`
);

fs.writeFileSync(file, code, "utf8");

console.log("patched:", file);
