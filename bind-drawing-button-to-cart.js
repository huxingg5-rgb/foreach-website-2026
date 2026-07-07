const fs = require("fs");

const file = "components/products/detail/ProductDetailClient.tsx";
let code = fs.readFileSync(file, "utf8");

/*
 * 添加图纸 = 加入清单 + 标记需要 2D 图纸
 * 加入清单 = 加入清单 + 不标记图纸
 * 不自动打开右侧清单
 */
code = code.replace(
  /function handleAddDrawing\(\) \{\s*console\.info\("添加图纸端口预留", data\.slug\);\s*\}/,
  `function handleAddDrawing() {
    addDetailProductToCart(true);
  }`
);

code = code.replace(
  /function handleAddList\(\) \{\s*console\.info\("加入清单端口预留", data\.slug\);\s*\}/,
  `function handleAddList() {
    addDetailProductToCart(false);
  }`
);

code = code.replace(
  /const \{ addItem, getItem, toggleDrawingNeed, openCart \} = useSelectionCart\(\);/g,
  "const { addItem, getItem, toggleDrawingNeed } = useSelectionCart();"
);

code = code.replace(/\n\s*openCart\(\);\s*return;/g, "\n      return;");
code = code.replace(/\n\s*openCart\(\);/g, "");

fs.writeFileSync(file, code, "utf8");

console.log("patched:", file);
