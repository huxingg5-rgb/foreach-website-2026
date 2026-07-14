const fs = require("fs");

const componentPath = "components/home/HomeApplicationFlowSection.tsx";
const cssPath = "app/globals.css";

function countText(source, target) {
  return source.split(target).length - 1;
}

function replaceOnce(source, oldText, newText, label) {
  const count = countText(source, oldText);

  console.log(`${label} 匹配数量：${count}`);

  if (count !== 1) {
    throw new Error(`${label} 不是唯一匹配，已停止修改。`);
  }

  return source.replace(oldText, newText);
}

let component = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const nl = component.includes("\r\n") ? "\r\n" : "\n";

console.log("\n===== 1. 修改手机行业按钮默认状态 =====");

component = replaceOnce(
  component,
  "const [activeMobileIndex, setActiveMobileIndex] = useState(0);",
  [
    "const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(",
    "    null,",
    "  );",
  ].join(nl),
  "activeMobileIndex 默认值"
);

component = replaceOnce(
  component,
  [
    "  const activeMobileApplication =",
    "    mobileApplicationCards[activeMobileIndex] || mobileApplicationCards[0];",
  ].join(nl),
  [
    "  // 默认展示第一张内容，但页面初始不选中任何行业按钮",
    "  const displayedMobileIndex = activeMobileIndex ?? 0;",
    "",
    "  const activeMobileApplication =",
    "    mobileApplicationCards[displayedMobileIndex] ||",
    "    mobileApplicationCards[0];",
  ].join(nl),
  "手机展示索引逻辑"
);

component = replaceOnce(
  component,
  "String(activeMobileIndex + 1).padStart(2, \"0\")",
  "String(displayedMobileIndex + 1).padStart(2, \"0\")",
  "手机卡片当前编号"
);

console.log("\n===== 2. 增加上方两个按钮的点击状态 =====");

component = replaceOnce(
  component,
  [
    "  // 手机端当前选中的应用按钮下标",
    "  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(",
    "    null,",
    "  );",
  ].join(nl),
  [
    "  // 上方入口按钮默认不选中，点击后才显示选中状态",
    "  const [activeMobileAction, setActiveMobileAction] = useState<",
    "    \"applications\" | \"products\" | null",
    "  >(null);",
    "",
    "  // 手机端当前选中的应用按钮下标，默认也不选中",
    "  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(",
    "    null,",
    "  );",
  ].join(nl),
  "上方入口按钮状态"
);

component = replaceOnce(
  component,
  [
    "              <Link href={applicationsHref} className=\"home-flow-btn\">",
    "                {getHomeFlowText(flowData.actions.applicationsLabel, locale)}",
    "              </Link>",
    "",
    "              <Link href={productsHref} className=\"home-flow-btn\">",
    "                {getHomeFlowText(flowData.actions.productsLabel, locale)}",
    "              </Link>",
  ].join(nl),
  [
    "              <Link",
    "                href={applicationsHref}",
    "                className={",
    "                  activeMobileAction === \"applications\"",
    "                    ? \"home-flow-btn is-active\"",
    "                    : \"home-flow-btn\"",
    "                }",
    "                onClick={() => setActiveMobileAction(\"applications\")}",
    "              >",
    "                {getHomeFlowText(flowData.actions.applicationsLabel, locale)}",
    "              </Link>",
    "",
    "              <Link",
    "                href={productsHref}",
    "                className={",
    "                  activeMobileAction === \"products\"",
    "                    ? \"home-flow-btn is-active\"",
    "                    : \"home-flow-btn\"",
    "                }",
    "                onClick={() => setActiveMobileAction(\"products\")}",
    "              >",
    "                {getHomeFlowText(flowData.actions.productsLabel, locale)}",
    "              </Link>",
  ].join(nl),
  "上方两个入口按钮"
);

console.log("\n===== 3. 修改原有 CSS 选中选择器 =====");

const oldSelector = ".home-flow-actions .home-flow-btn:first-child";
const newSelector = ".home-flow-actions .home-flow-btn.is-active";
const selectorCount = countText(css, oldSelector);

console.log(`first-child 选择器匹配数量：${selectorCount}`);

if (selectorCount < 1) {
  throw new Error("没有找到原有 first-child 选中规则，已停止修改。");
}

css = css.split(oldSelector).join(newSelector);

if (css.includes("MOBILE_HOME_FLOW_BUTTON_STYLE_20260713")) {
  throw new Error("CSS 文件仍存在之前追加的样式块，请先确认备份恢复情况。");
}

fs.writeFileSync(componentPath, component, "utf8");
fs.writeFileSync(cssPath, css, "utf8");

console.log("\n修改完成：");
console.log("- 页面初始时，上方两个按钮均为白底");
console.log("- 页面初始时，下方行业按钮均为白底");
console.log("- 点击后，仅被点击按钮增加 is-active");
console.log("- 原 first-child 强制选中规则已改为显式 is-active");
