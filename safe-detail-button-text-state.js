const fs = require("fs");

const file = "components/products/detail/ProductDetailClient.tsx";
let code = fs.readFileSync(file, "utf8");

/*
 * 只做稳定小改：
 * 1. 保留详情页原 styles.button
 * 2. 不改 JSX 外层结构
 * 3. 只增加当前清单状态变量
 * 4. 按钮文案根据状态变化
 */

code = code.replace(
  /\n\s*const currentDetailCartItem = getItem\("pump-selection", getDetailCartProductCode\(\)\);\s*const isDetailProductSelected = Boolean\(currentDetailCartItem\);\s*const isDetailDrawingSelected = Boolean\(currentDetailCartItem\?\.needDrawing\);\s*/g,
  "\n"
);

code = code.replace(
  /  function handleOpenConfigurator\(\) \{/,
  `  const currentDetailCartItem = getItem("pump-selection", getDetailCartProductCode());
  const isDetailProductSelected = Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);

  function handleOpenConfigurator() {`
);

/* 确保逻辑正确 */
code = code.replace(
  /function handleAddDrawing\(\) \{\s*[^{}]*\}/,
  `function handleAddDrawing() {
    addDetailProductToCart(true);
  }`
);

code = code.replace(
  /function handleAddList\(\) \{\s*[^{}]*\}/,
  `function handleAddList() {
    addDetailProductToCart(false);
  }`
);

/* 只替换文字，不动按钮 className */
code = code.replace(
  />\s*添加图纸\s*<\/button>/,
  `>
                    {isDetailDrawingSelected ? "已添加图纸" : "添加图纸"}
                  </button>`
);

code = code.replace(
  />\s*加入清单\s*<\/button>/,
  `>
                  {isDetailProductSelected ? "已加入清单" : "加入清单"}
                </button>`
);

fs.writeFileSync(file, code, "utf8");
console.log("patched safely:", file);
