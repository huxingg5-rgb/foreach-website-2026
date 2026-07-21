# ============================================================
# 首页 PC 首屏最终交互修正
#
# 第一次向下滚动：
# - 阻止页面立即离开首屏
# - 显示网页标题、副标题和按钮
#
# 约 1.2 秒后：
# - 网页字幕自动消失
# - 视频自动交叉淡出
# - eas 静态图自动淡入
#
# 下一次向下滚动：
# - 正常进入第二屏
#
# 同时修复：
# - 静态图左右蓝色留边
# - 静态图已有文字与网页字幕重叠
# - 长距离 sticky 滚动
#
# 手机端保持原样。
# 构建失败自动回滚，不执行 Git 提交。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$heroFile = Join-Path $projectRoot 'components\home\HomeHeroSection.tsx'
$cssFile = Join-Path $projectRoot 'app\globals.css'
$tempNodeScript = Join-Path $projectRoot '.fix-home-hero-one-wheel-sequence.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $heroFile)) {
    throw "没有找到首页 Hero 组件：$heroFile"
}

if (-not (Test-Path -LiteralPath $cssFile)) {
    throw "没有找到全局样式：$cssFile"
}

Set-Location -LiteralPath $projectRoot

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = Join-Path $projectRoot ".local-backups\home-hero-one-wheel-sequence-$stamp"
$reportRoot = Join-Path $projectRoot "audit-reports\home-hero-one-wheel-sequence\$stamp"

New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
New-Item -ItemType Directory -Path $reportRoot -Force | Out-Null

$heroBackup = Join-Path $backupRoot 'components\home\HomeHeroSection.tsx'
$cssBackup = Join-Path $backupRoot 'app\globals.css'

New-Item -ItemType Directory -Path (Split-Path -Parent $heroBackup) -Force | Out-Null
New-Item -ItemType Directory -Path (Split-Path -Parent $cssBackup) -Force | Out-Null

Copy-Item -LiteralPath $heroFile -Destination $heroBackup -Force
Copy-Item -LiteralPath $cssFile -Destination $cssBackup -Force

function Restore-HomeHero {
    Copy-Item -LiteralPath $heroBackup -Destination $heroFile -Force
    Copy-Item -LiteralPath $cssBackup -Destination $cssFile -Force
}

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const heroPath = path.join(
  root,
  "components/home/HomeHeroSection.tsx"
);

const cssPath = path.join(
  root,
  "app/globals.css"
);

const COMPONENT_START =
  "HOME_DESKTOP_SCROLL_HERO_COMPONENT_START";

const COMPONENT_END =
  "HOME_DESKTOP_SCROLL_HERO_COMPONENT_END";

const CSS_START =
  "HOME_DESKTOP_SCROLL_HERO_CSS_START";

const CSS_END =
  "HOME_DESKTOP_SCROLL_HERO_CSS_END";

const FINAL_CSS_START =
  "HOME_HERO_ONE_WHEEL_SEQUENCE_CSS_START";

const FINAL_CSS_END =
  "HOME_HERO_ONE_WHEEL_SEQUENCE_CSS_END";

function assertTsxSyntax(filePath, source) {
  const parsed = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  if (parsed.parseDiagnostics.length === 0) {
    return;
  }

  const message = parsed.parseDiagnostics
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      )
    )
    .join("\n");

  throw new Error(
    `${path.relative(root, filePath)} 语法检查失败：\n${message}`
  );
}

function removeMarkedBlock(
  source,
  startMarker,
  endMarker
) {
  const pattern = new RegExp(
    `/\\* ${startMarker} \\*/[\\s\\S]*?/\\* ${endMarker} \\*/\\s*`,
    "g"
  );

  return source.replace(
    pattern,
    ""
  );
}

let heroSource = fs.readFileSync(
  heroPath,
  "utf8"
);

const componentPattern = new RegExp(
  `/\\* ${COMPONENT_START} \\*/[\\s\\S]*?/\\* ${COMPONENT_END} \\*/`
);

if (!componentPattern.test(heroSource)) {
  throw new Error(
    "没有找到已接入的首页 PC Hero 动画代码块。"
  );
}

const newComponentLogic = `/* ${COMPONENT_START} */
  const scrollShellRef =
    useRef<HTMLDivElement>(null);

  const [
    desktopHeroPhase,
    setDesktopHeroPhase,
  ] = useState<0 | 1 | 2>(0);

  const desktopHeroPhaseRef =
    useRef<0 | 1 | 2>(0);

  const desktopHeroTimerRef =
    useRef<number | null>(null);

  useEffect(() => {
    const desktopMedia =
      window.matchMedia(
        "(min-width: 1001px)"
      );

    function setPhase(
      phase: 0 | 1 | 2
    ) {
      desktopHeroPhaseRef.current =
        phase;

      setDesktopHeroPhase(
        phase
      );
    }

    function handleDesktopWheel(
      event: WheelEvent
    ) {
      if (
        !desktopMedia.matches
      ) {
        return;
      }

      const shell =
        scrollShellRef.current;

      if (!shell) {
        return;
      }

      const rect =
        shell.getBoundingClientRect();

      const heroIsActive =
        rect.top <= 4 &&
        rect.bottom >=
          window.innerHeight * 0.72;

      if (!heroIsActive) {
        return;
      }

      /*
       * 动画播放期间继续锁住滚轮，
       * 避免触控板惯性直接把页面带到第二屏。
       */
      if (
        desktopHeroPhaseRef.current ===
        1
      ) {
        event.preventDefault();
        return;
      }

      /*
       * 只响应第一次向下滚动。
       */
      if (
        desktopHeroPhaseRef.current !==
          0 ||
        event.deltaY <= 0
      ) {
        return;
      }

      event.preventDefault();

      /*
       * 第一阶段：
       * 立即显示网页字幕。
       */
      setPhase(1);

      if (
        desktopHeroTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          desktopHeroTimerRef.current
        );
      }

      /*
       * 第二阶段：
       * 1.2 秒后自动切换静态图，
       * 并隐藏网页字幕，避免与图片内文字重叠。
       */
      desktopHeroTimerRef.current =
        window.setTimeout(() => {
          setPhase(2);
          desktopHeroTimerRef.current =
            null;
        }, 1200);
    }

    function handleMediaChange() {
      if (
        !desktopMedia.matches
      ) {
        if (
          desktopHeroTimerRef.current !==
          null
        ) {
          window.clearTimeout(
            desktopHeroTimerRef.current
          );

          desktopHeroTimerRef.current =
            null;
        }

        setPhase(0);
      }
    }

    window.addEventListener(
      "wheel",
      handleDesktopWheel,
      {
        passive: false,
      }
    );

    desktopMedia.addEventListener(
      "change",
      handleMediaChange
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleDesktopWheel
      );

      desktopMedia.removeEventListener(
        "change",
        handleMediaChange
      );

      if (
        desktopHeroTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          desktopHeroTimerRef.current
        );
      }
    };
  }, []);

  const showDesktopHeroContent =
    desktopHeroPhase === 1;

  const showDesktopStaticImage =
    desktopHeroPhase === 2;

  const heroStyle = {
    "--home-hero-title-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-subtitle-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-actions-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-static-opacity":
      showDesktopStaticImage
        ? "1"
        : "0",

    "--home-hero-video-opacity":
      showDesktopStaticImage
        ? "0"
        : "1",

    "--home-hero-overlay-opacity":
      desktopHeroPhase === 1
        ? "0.56"
        : desktopHeroPhase === 2
          ? "0.02"
          : "0.08",

    "--home-hero-video-scale":
      "1",

    "--home-hero-title-shift":
      showDesktopHeroContent
        ? "0px"
        : "28px",

    "--home-hero-subtitle-shift":
      showDesktopHeroContent
        ? "0px"
        : "24px",

    "--home-hero-actions-shift":
      showDesktopHeroContent
        ? "0px"
        : "20px",

    "--home-hero-content-pointer-events":
      showDesktopHeroContent
        ? "auto"
        : "none",
  } as CSSProperties;
  /* ${COMPONENT_END} */`;

heroSource = heroSource.replace(
  componentPattern,
  newComponentLogic
);

/*
 * 给 section 增加阶段标记。
 */
if (
  heroSource.includes(
    'data-desktop-hero-phase={desktopHeroPhase}'
  )
) {
  // 已存在，不重复处理。
}
else if (
  heroSource.includes(
    'style={heroStyle}'
  )
) {
  heroSource = heroSource.replace(
    'style={heroStyle}',
    `style={heroStyle}
        data-desktop-hero-phase={
          desktopHeroPhase
        }`
  );
}
else {
  throw new Error(
    "没有找到 Hero 的 style={heroStyle}。"
  );
}

assertTsxSyntax(
  heroPath,
  heroSource
);

fs.writeFileSync(
  heroPath,
  heroSource,
  "utf8"
);

let cssSource = fs.readFileSync(
  cssPath,
  "utf8"
);

/*
 * 清理之前互相冲突的三套 PC Hero 样式。
 */
cssSource = removeMarkedBlock(
  cssSource,
  CSS_START,
  CSS_END
);

cssSource = removeMarkedBlock(
  cssSource,
  "HOME_HERO_FIRST_WHEEL_REVEAL_CSS_START",
  "HOME_HERO_FIRST_WHEEL_REVEAL_CSS_END"
);

cssSource = removeMarkedBlock(
  cssSource,
  "HOME_DESKTOP_SCROLL_HERO_REMOVE_ZOOM_START",
  "HOME_DESKTOP_SCROLL_HERO_REMOVE_ZOOM_END"
);

cssSource = removeMarkedBlock(
  cssSource,
  FINAL_CSS_START,
  FINAL_CSS_END
);

const finalCss = `

/* =========================================================
   首页 PC 首屏｜一次滚轮触发完整动画

   0：视频，无网页字幕
   1：第一次滚轮后显示网页字幕
   2：1.2 秒后切换静态图，网页字幕隐藏

   手机端继续使用原有 Hero。
========================================================= */
/* ${FINAL_CSS_START} */

.home-hero-static-image {
  display: none;
}

@media (min-width: 1001px) {
  /*
   * 不再使用 170vh / 220vh 的长距离 sticky。
   * 第一次滚轮由 JavaScript 锁住，
   * 下一次滚轮自然进入第二屏。
   */
  .home-hero-scroll-shell {
    position: relative;
    width: 100%;
    height: 100vh !important;
    min-height: 100vh;
    background: #050b15;
  }

  .home-hero-scroll-shell
    .home-hero {
    position: relative !important;
    top: auto !important;

    width: 100%;
    height: 100vh !important;
    min-height: 100vh !important;

    overflow: hidden;
    isolation: isolate;

    background: #050b15;
  }

  /*
   * 视频不再额外缩放。
   */
  .home-hero-scroll-shell
    .home-hero-video {
    z-index: 0;

    width: 100%;
    height: 100%;

    object-fit: cover !important;
    object-position:
      center center !important;

    opacity:
      var(
        --home-hero-video-opacity,
        1
      ) !important;

    transform: none !important;

    transition:
      opacity 0.58s ease !important;

    will-change: opacity;
  }

  /*
   * 静态图必须铺满屏幕，
   * 取消 contain 导致的左右蓝色留边。
   */
  .home-hero-scroll-shell
    .home-hero-static-image {
    position: absolute;
    inset: 0;
    z-index: 1;

    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover !important;
    object-position:
      center center !important;

    opacity:
      var(
        --home-hero-static-opacity,
        0
      );

    transform: none !important;

    transition:
      opacity 0.58s ease;

    pointer-events: none;

    will-change: opacity;
  }

  .home-hero-scroll-shell
    .home-hero-overlay {
    z-index: 2;

    opacity:
      var(
        --home-hero-overlay-opacity,
        0.08
      ) !important;

    transition:
      opacity 0.42s ease !important;
  }

  .home-hero-scroll-shell
    .home-hero-inner {
    position: relative;
    z-index: 3;
  }

  .home-hero-scroll-shell
    .home-hero-title {
    opacity:
      var(
        --home-hero-title-opacity,
        0
      ) !important;

    transform:
      translateY(
        var(
          --home-hero-title-shift,
          28px
        )
      );

    transition:
      opacity 0.28s ease,
      transform 0.38s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0s !important;
  }

  .home-hero-scroll-shell
    .home-hero-subtitle {
    opacity:
      var(
        --home-hero-subtitle-opacity,
        0
      ) !important;

    transform:
      translateY(
        var(
          --home-hero-subtitle-shift,
          24px
        )
      );

    transition:
      opacity 0.28s ease,
      transform 0.38s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0.07s !important;
  }

  .home-hero-scroll-shell
    .home-hero-actions {
    opacity:
      var(
        --home-hero-actions-opacity,
        0
      ) !important;

    transform:
      translateY(
        var(
          --home-hero-actions-shift,
          20px
        )
      );

    transition:
      opacity 0.28s ease,
      transform 0.38s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0.14s !important;

    pointer-events:
      var(
        --home-hero-content-pointer-events,
        none
      );
  }

  /*
   * 切到静态图时网页字幕立即开始隐藏，
   * 避免与静态图内置的大字叠加。
   */
  .home-hero-scroll-shell
    .home-hero[
      data-desktop-hero-phase="2"
    ]
    .home-hero-title,
  .home-hero-scroll-shell
    .home-hero[
      data-desktop-hero-phase="2"
    ]
    .home-hero-subtitle,
  .home-hero-scroll-shell
    .home-hero[
      data-desktop-hero-phase="2"
    ]
    .home-hero-actions {
    transition-delay:
      0s !important;
  }
}

@media
  (min-width: 1001px) and
  (prefers-reduced-motion: reduce) {
  .home-hero-scroll-shell
    .home-hero-video {
    opacity: 0 !important;
  }

  .home-hero-scroll-shell
    .home-hero-static-image {
    opacity: 1 !important;
  }

  .home-hero-scroll-shell
    .home-hero-title,
  .home-hero-scroll-shell
    .home-hero-subtitle,
  .home-hero-scroll-shell
    .home-hero-actions {
    opacity: 0 !important;
    transform: none !important;
  }
}

/* ${FINAL_CSS_END} */
`;

cssSource =
  cssSource.replace(
    /\s*$/,
    ""
  ) +
  finalCss +
  "\n";

fs.writeFileSync(
  cssPath,
  cssSource,
  "utf8"
);

console.log("");
console.log(
  "首页 PC 首屏已改为一次滚轮触发："
);
console.log(
  "- 第一次滚轮：显示网页字幕"
);
console.log(
  "- 1.2 秒后：自动切换静态图"
);
console.log(
  "- 静态图出现时：网页字幕隐藏"
);
console.log(
  "- 下一次滚轮：进入第二屏"
);
console.log(
  "- 静态图：cover 铺满，无左右蓝边"
);
console.log(
  "- 手机端：保持原样"
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备修正首页 PC 首屏动画……' -ForegroundColor Cyan
Write-Host '一次滚轮触发字幕，再自动切换静态图。' -ForegroundColor Yellow
Write-Host ''

$nodeExitCode = 0

try {
    node $tempNodeScript
    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item `
        -LiteralPath $tempNodeScript `
        -Force `
        -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    Restore-HomeHero
    throw "首页 PC 首屏动画修正失败，已自动恢复。"
}

Write-Host ''
Write-Host '开始执行 npm run build……' -ForegroundColor Cyan
Write-Host ''

$buildLog = Join-Path $reportRoot 'npm-build.log'

$buildOutput = @(
    npm run build 2>&1
)

$buildExitCode = $LASTEXITCODE

$buildOutput |
    Out-File `
        -LiteralPath $buildLog `
        -Encoding utf8

$buildOutput |
    ForEach-Object {
        Write-Host $_
    }

if ($buildExitCode -ne 0) {
    Copy-Item `
        -LiteralPath $heroFile `
        -Destination (
            Join-Path `
                $reportRoot `
                '构建失败时的HomeHeroSection.tsx.txt'
        ) `
        -Force

    Copy-Item `
        -LiteralPath $cssFile `
        -Destination (
            Join-Path `
                $reportRoot `
                '构建失败时的globals.css.txt'
        ) `
        -Force

    Restore-HomeHero

    throw "构建失败，已自动恢复。完整日志：$buildLog"
}

$summary = @"
# 首页 PC 首屏一次滚轮动画修正

- 修改时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
- 初始状态：视频，无网页字幕
- 第一次向下滚轮：字幕出现
- 自动切图延迟：1.2 秒
- 静态图出现：网页字幕隐藏
- 下一次滚轮：进入第二屏
- PC Hero 高度：100vh
- 静态图适配：object-fit cover
- 手机端：保持原样
- 构建退出码：$buildExitCode
"@

[System.IO.File]::WriteAllText(
    (Join-Path $reportRoot '执行摘要.md'),
    $summary,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '首页 PC 首屏一次滚轮动画修正完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host '第一次滚轮：字幕出现' -ForegroundColor Cyan
Write-Host '1.2 秒后：自动切换静态图' -ForegroundColor Cyan
Write-Host '下一次滚轮：进入第二屏' -ForegroundColor Cyan
Write-Host '左右蓝边：已去掉' -ForegroundColor Cyan
Write-Host '静态图文字重叠：已去掉' -ForegroundColor Cyan
Write-Host '手机端：保持原样' -ForegroundColor Cyan
Write-Host "备份：$backupRoot"
Write-Host "报告：$reportRoot"
Write-Host "构建退出码：$buildExitCode"
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''

git status --short
