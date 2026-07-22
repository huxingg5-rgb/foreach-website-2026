# ============================================================
# 首页 PC 首屏｜图片和文字同时出现
#
# 修改后：
# 0. 初始：视频，无文字
# 1. 第一次向下滚轮：静态图 + 标题 + 副标题 + 按钮同时淡入
# 2. 再次向下滚轮：正常进入第二屏
#
# 反向：
# - 从第二屏向上正常回到首屏
# - 在首屏向上滚一次：静态图和文字同时消失，回到视频
#
# 手机端保持原样。
# 构建失败自动回滚，不执行 Git 提交。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$heroFile = Join-Path $projectRoot 'components\home\HomeHeroSection.tsx'
$cssFile = Join-Path $projectRoot 'app\globals.css'
$tempNodeScript = Join-Path $projectRoot '.fix-home-hero-image-text-together.cjs'

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
$backupRoot = Join-Path $projectRoot ".local-backups\home-hero-image-text-together-$stamp"
$reportRoot = Join-Path $projectRoot "audit-reports\home-hero-image-text-together\$stamp"

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

const OLD_CSS_START =
  "HOME_HERO_REVERSIBLE_SEQUENCE_CSS_START";

const OLD_CSS_END =
  "HOME_HERO_REVERSIBLE_SEQUENCE_CSS_END";

const NEW_CSS_START =
  "HOME_HERO_IMAGE_TEXT_TOGETHER_CSS_START";

const NEW_CSS_END =
  "HOME_HERO_IMAGE_TEXT_TOGETHER_CSS_END";

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
    "没有找到首页 PC Hero 状态代码块。"
  );
}

const newComponentLogic = `/* ${COMPONENT_START} */
  const scrollShellRef =
    useRef<HTMLDivElement>(null);

  const [
    desktopHeroActive,
    setDesktopHeroActive,
  ] = useState(false);

  const desktopHeroActiveRef =
    useRef(false);

  useEffect(() => {
    const desktopMedia =
      window.matchMedia(
        "(min-width: 1001px)"
      );

    function setActive(
      active: boolean
    ) {
      desktopHeroActiveRef.current =
        active;

      setDesktopHeroActive(
        active
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

      /*
       * 只在首屏已经回到顶部时，
       * 接管首屏动画状态。
       */
      const heroAtTop =
        Math.abs(rect.top) <= 5 &&
        rect.bottom >=
          window.innerHeight * 0.9;

      if (!heroAtTop) {
        return;
      }

      /*
       * 第一次向下滚轮：
       * 静态图和网页文字同时出现。
       */
      if (
        event.deltaY > 0 &&
        !desktopHeroActiveRef.current
      ) {
        event.preventDefault();
        setActive(true);
        return;
      }

      /*
       * 已经显示静态图和文字时，
       * 再向下滚动则正常进入第二屏。
       */
      if (
        event.deltaY > 0 &&
        desktopHeroActiveRef.current
      ) {
        return;
      }

      /*
       * 在首屏向上滚动：
       * 静态图和文字同时消失，
       * 返回视频无文字状态。
       */
      if (
        event.deltaY < 0 &&
        desktopHeroActiveRef.current
      ) {
        event.preventDefault();
        setActive(false);
      }
    }

    function handleMediaChange() {
      if (
        desktopMedia.matches
      ) {
        return;
      }

      setActive(false);
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
    };
  }, []);

  const heroStyle = {
    "--home-hero-title-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-subtitle-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-actions-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-static-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-video-opacity":
      desktopHeroActive
        ? "0"
        : "1",

    "--home-hero-overlay-opacity":
      desktopHeroActive
        ? "0.42"
        : "0.08",

    "--home-hero-video-scale":
      "1",

    "--home-hero-title-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-subtitle-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-actions-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-content-pointer-events":
      desktopHeroActive
        ? "auto"
        : "none",
  } as CSSProperties;
  /* ${COMPONENT_END} */`;

heroSource = heroSource.replace(
  componentPattern,
  newComponentLogic
);

/*
 * 更新 data 属性，避免继续引用旧的 desktopHeroPhase。
 */
heroSource = heroSource.replace(
  /data-desktop-hero-phase=\{\s*desktopHeroPhase\s*\}/,
  `data-desktop-hero-active={
          desktopHeroActive
            ? "true"
            : "false"
        }`
);

assertTsxSyntax(
  heroPath,
  heroSource
);

if (
  !heroSource.includes(
    "desktopHeroActive"
  )
) {
  throw new Error(
    "首页 Hero 同步状态写入失败。"
  );
}

fs.writeFileSync(
  heroPath,
  heroSource,
  "utf8"
);

let cssSource = fs.readFileSync(
  cssPath,
  "utf8"
);

cssSource = removeMarkedBlock(
  cssSource,
  OLD_CSS_START,
  OLD_CSS_END
);

cssSource = removeMarkedBlock(
  cssSource,
  NEW_CSS_START,
  NEW_CSS_END
);

const newCss = `

/* =========================================================
   首页 PC 首屏｜静态图和文字同时出现

   初始：
   - 视频
   - 无网页文字

   第一次向下滚轮：
   - 静态图、标题、副标题、按钮同时淡入

   向上滚轮：
   - 静态图和文字同时淡出
   - 返回视频
========================================================= */
/* ${NEW_CSS_START} */

.home-hero-static-image {
  display: none;
}

@media (min-width: 1001px) {
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
      opacity 0.48s ease !important;

    will-change: opacity;
  }

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
      opacity 0.48s ease !important;

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
      opacity 0.48s ease !important;
  }

  .home-hero-scroll-shell
    .home-hero-inner {
    position: relative;
    z-index: 3;
  }

  /*
   * 图片、标题、副标题和按钮：
   * 使用相同持续时间和相同延迟，
   * 确保同时开始、同时完成。
   */
  .home-hero-scroll-shell
    .home-hero-title,
  .home-hero-scroll-shell
    .home-hero-subtitle,
  .home-hero-scroll-shell
    .home-hero-actions {
    transition:
      opacity 0.48s ease,
      transform 0.48s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0s !important;

    will-change:
      opacity,
      transform;
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
          24px
        )
      );
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
          24px
        )
      );

    pointer-events:
      var(
        --home-hero-content-pointer-events,
        none
      );
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
    .home-hero-static-image,
  .home-hero-scroll-shell
    .home-hero-title,
  .home-hero-scroll-shell
    .home-hero-subtitle,
  .home-hero-scroll-shell
    .home-hero-actions {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ${NEW_CSS_END} */
`;

cssSource =
  cssSource.replace(
    /\s*$/,
    ""
  ) +
  newCss +
  "\n";

fs.writeFileSync(
  cssPath,
  cssSource,
  "utf8"
);

console.log("");
console.log(
  "首页 PC 首屏已改为同步出现："
);
console.log(
  "- 第一次滚轮：静态图和文字同时出现"
);
console.log(
  "- 向上滚轮：静态图和文字同时消失"
);
console.log(
  "- 再次向下：正常进入第二屏"
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
Write-Host '准备让静态图和文字同时出现……' -ForegroundColor Cyan
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
    throw "首页图片与文字同步修改失败，已自动恢复。"
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
# 首页 PC 首屏图片与文字同步出现

- 修改时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
- 初始：视频，无文字
- 第一次向下滚轮：静态图和网页文字同时出现
- 动画持续时间：0.48 秒
- 动画延迟：0 秒
- 再次向下滚轮：进入第二屏
- 向上滚轮：静态图和文字同时消失
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
Write-Host '首页图片与文字同步出现修改完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host '第一次滚轮：静态图和文字同时出现' -ForegroundColor Cyan
Write-Host '向上滚轮：静态图和文字同时消失' -ForegroundColor Cyan
Write-Host '手机端：保持原样' -ForegroundColor Cyan
Write-Host "备份：$backupRoot"
Write-Host "报告：$reportRoot"
Write-Host "构建退出码：$buildExitCode"
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''

git status --short
