const fs = require("fs");

const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");

const oldCardRule = `  .about-foreach-video-card {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
    min-height: 0;
    overflow: hidden;
  }`;

const newCardRule = `  .about-foreach-video-card {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
    min-height: 0;
    overflow: hidden;
    border-radius: 0 !important;
    clip-path: none !important;
    -webkit-mask: none !important;
    mask: none !important;
  }`;

const oldVideoRule = `  .about-foreach-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }`;

const newVideoRule = `  .about-foreach-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 !important;
    clip-path: none !important;
    -webkit-mask: none !important;
    mask: none !important;

    /*
      封面 tv-foreach.png 自带圆角。
      手机端轻微放大，由外层直角容器裁掉圆角部分。
    */
    transform: scale(1.065);
    transform-origin: center;
  }`;

function countOccurrences(source, target) {
  return source.split(target).length - 1;
}

const cardCount = countOccurrences(css, oldCardRule);
const videoCount = countOccurrences(css, oldVideoRule);

console.log(`手机端视频卡片原规则：${cardCount}`);
console.log(`手机端视频本体原规则：${videoCount}`);

if (cardCount !== 1) {
  throw new Error(
    "没有唯一找到手机端 .about-foreach-video-card 原规则。",
  );
}

if (videoCount !== 1) {
  throw new Error(
    "没有唯一找到手机端 .about-foreach-video 原规则。",
  );
}

css = css.replace(oldCardRule, newCardRule);
css = css.replace(oldVideoRule, newVideoRule);

/*
  删除之前追加在文件末尾但无法处理图片内置圆角的规则，
  避免后续维护时出现两套重复代码。
*/
css = css.replace(
  /\s*\/\* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_START \*\/[\s\S]*?\/\* ABOUT_FOREACH_MOBILE_VIDEO_SQUARE_END \*\/\s*/g,
  "\n",
);

fs.writeFileSync(path, css, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 只修改手机端原有视频规则");
console.log("- 视频外框保持直角");
console.log("- 封面放大 6.5%，裁掉图片自带圆角");
console.log("- PC 端不受影响");
