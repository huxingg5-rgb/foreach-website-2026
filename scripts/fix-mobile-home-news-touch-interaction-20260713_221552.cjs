const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const startMarker =
  "/* HOME_MOBILE_NEWS_TOUCH_INTERACTION_START */";

const endMarker =
  "/* HOME_MOBILE_NEWS_TOUCH_INTERACTION_END */";

const block = `/* HOME_MOBILE_NEWS_TOUCH_INTERACTION_START */
@media (max-width: 768px) {
  /*
    手机端取消 PC 的卡片 hover 动效。
    点击按钮后也不会让整张卡片保持上浮状态。
  */
  .home-news-highlight-card,
  .home-news-highlight-card:hover,
  .home-news-highlight-card:focus-within {
    transform: none !important;
    border-color: rgba(9, 233, 180, 0.08) !important;

    background:
      radial-gradient(
        circle at 80% 18%,
        rgba(9, 233, 180, 0.18),
        transparent 26%
      ),
      linear-gradient(
        145deg,
        #173368 0%,
        #0c2857 52%,
        #061b3d 100%
      ) !important;

    transition: none !important;
    animation: none !important;
  }

  /*
    默认和 hover 状态完全一致。
    避免手机点击后残留 PC hover 的绿色和上浮状态。
  */
  .home-news-highlight-btn,
  .home-news-highlight-btn:hover {
    transform: none !important;
    background: #ffffff !important;
    color: #061b3d !important;

    -webkit-tap-highlight-color: transparent !important;
    touch-action: manipulation !important;

    transition:
      transform 120ms ease,
      background-color 120ms ease,
      color 120ms ease !important;
  }

  /*
    只有手指正在按下时出现反馈。
    松开后自动恢复白色按钮。
  */
  .home-news-highlight-btn:active {
    transform: scale(0.96) !important;
    background: #09e9b4 !important;
    color: #061b3d !important;
  }

  /*
    键盘访问保留清晰焦点，
    但不产生位置移动。
  */
  .home-news-highlight-btn:focus-visible {
    transform: none !important;
    outline: 2px solid #09e9b4 !important;
    outline-offset: 3px !important;
  }
}
/* HOME_MOBILE_NEWS_TOUCH_INTERACTION_END */`;

const pattern =
  /\/\* HOME_MOBILE_NEWS_TOUCH_INTERACTION_START \*\/[\s\S]*?\/\* HOME_MOBILE_NEWS_TOUCH_INTERACTION_END \*\//g;

const matches = css.match(pattern) || [];

console.log(
  `现有手机端资讯触控规则数量：${matches.length}`,
);

if (matches.length > 1) {
  throw new Error(
    "发现多组手机端资讯触控规则，停止修改。",
  );
}

if (matches.length === 1) {
  css = css.replace(pattern, block);
  console.log("已更新现有触控规则。");
} else {
  const anchor =
    "/* HOME_MOBILE_NEWS_HIGHLIGHT_BUTTON_END */";

  const anchorCount =
    css.split(anchor).length - 1;

  console.log(
    `手机端按钮规则结束标记数量：${anchorCount}`,
  );

  if (anchorCount !== 1) {
    throw new Error(
      "没有唯一找到手机端按钮规则结束位置，停止修改。",
    );
  }

  css = css.replace(
    anchor,
    anchor + "\n\n" + block,
  );

  console.log(
    "已在现有手机端按钮规则后加入触控规则。",
  );
}

fs.writeFileSync(path, css, "utf8");

const finalMatches = css.match(pattern) || [];

if (finalMatches.length !== 1) {
  throw new Error(
    "写入后触控规则数量异常。",
  );
}

console.log("");
console.log("修改完成：");
console.log("- 手机端卡片 hover 不再上浮");
console.log("- 手机端按钮 hover 不再移动或变色");
console.log("- 按下按钮时缩小至 96%");
console.log("- 按下按钮时变为荧光色");
console.log("- 松开后恢复白色");
console.log("- PC 端保持原有 hover 动效");
