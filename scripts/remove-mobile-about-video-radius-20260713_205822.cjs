const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const newline = css.includes("\r\n") ? "\r\n" : "\n";

const startMarker =
  "/* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_START */";

const endMarker =
  "/* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_END */";

const block = [
  startMarker,
  "@media (max-width: 768px) {",
  "  .about-foreach-video-card,",
  "  .about-foreach-video-card::before,",
  "  .about-foreach-video-card::after,",
  "  .about-foreach-video {",
  "    border-radius: 0 !important;",
  "  }",
  "}",
  endMarker,
].join(newline);

const existingPattern =
  /\/\* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_START \*\/[\s\S]*?\/\* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_END \*\//;

const count = (
  css.match(new RegExp(existingPattern.source, "g")) || []
).length;

console.log(`已有手机视频直角规则：${count}`);

if (count > 1) {
  throw new Error("发现多个重复规则，停止修改");
}

if (count === 1) {
  css = css.replace(existingPattern, block);
  console.log("已更新现有手机端规则");
} else {
  css =
    css.trimEnd() +
    newline +
    newline +
    block +
    newline;

  console.log("已加入手机端视频直角规则");
}

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 公司介绍视频外框改为直角");
console.log("- 视频画面改为直角");
console.log("- 只影响手机端");
console.log("- PC 端不修改");
