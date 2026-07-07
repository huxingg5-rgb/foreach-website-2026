const fs = require("fs");

const file = "components/products/detail/ProductDetailClient.tsx";
const code = fs.readFileSync(file, "utf8");

function lineNo(index) {
  return code.slice(0, index).split(/\r?\n/).length;
}

function extractButtonByOnClick(onClickName) {
  const marker = `onClick={${onClickName}}`;
  const idx = code.indexOf(marker);

  if (idx === -1) {
    return `### ${onClickName}\n未找到 ${marker}\n`;
  }

  const start = code.lastIndexOf("<button", idx);
  const end = code.indexOf("</button>", idx);

  if (start === -1 || end === -1) {
    return `### ${onClickName}\n按钮结构异常\n`;
  }

  return [
    `### ${onClickName}，起始行：${lineNo(start)}`,
    "```tsx",
    code.slice(start, end + "</button>".length),
    "```",
    ""
  ].join("\n");
}

function extractFunction(name) {
  const marker = `function ${name}(`;
  const start = code.indexOf(marker);

  if (start === -1) {
    return `### ${name}\n未找到\n`;
  }

  const braceStart = code.indexOf("{", start);
  let depth = 0;
  let end = -1;

  for (let i = braceStart; i < code.length; i++) {
    if (code[i] === "{") depth++;
    if (code[i] === "}") depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }

  return [
    `### ${name}，起始行：${lineNo(start)}`,
    "```tsx",
    code.slice(start, end),
    "```",
    ""
  ].join("\n");
}

console.log(extractButtonByOnClick("handleAddDrawing"));
console.log(extractButtonByOnClick("handleAddList"));
console.log(extractFunction("addDetailProductToCart"));
console.log(extractFunction("handleAddDrawing"));
console.log(extractFunction("handleAddList"));
