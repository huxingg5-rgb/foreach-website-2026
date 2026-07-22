# ============================================================
# 首页 PC 首屏｜文字常驻 + 滚轮可逆修复
#
# 正向：
# 0. 初始：视频，无网页文字
# 1. 第一次向下滚轮：视频 + 网页文字
# 2. 约 0.9 秒后：静态图 + 网页文字
# 3. 再次向下滚轮：正常进入第二屏
#
# 反向：
# - 从第二屏正常向上滚回首屏
# - 静态图状态向上滚一次：回到视频 + 文字
# - 再向上滚一次：回到视频无文字
#
# 手机端保持原样。
# 构建失败自动回滚，不执行 Git 提交。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$heroFile = Join-Path $projectRoot 'components\home\HomeHeroSection.tsx'
$cssFile = Join-Path $projectRoot 'app\globals.css'
$tempNodeScript = Join-Path $projectRoot '.fix-home-hero-reversible.cjs'

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
$backupRoot = Join-Path $projectRoot ".local-backups\home-hero-reversible-$stamp"
$reportRoot = Join-Path $projectRoot "audit-reports\home-hero-reversible\$stamp"

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
  "HOME_HERO_ONE_WHEEL_SEQUENCE_CSS_START";

const CSS_END =
  "HOME_HERO_ONE_WHEEL_SEQUENCE_CSS_END";

const NEW_CSS_START =
  "HOME_HERO_REVERSIBLE_SEQUENCE_CSS_START";

const NEW_CSS_END =
  "HOME_HERO_REVERSIBLE_SEQUENCE_CSS_END";

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

    function clearPhaseTimer() {
      if (
        desktopHeroTimerRef.current ===
        null
      ) {
        return;
      }

      window.clearTimeout(
        desktopHeroTimerRef.current
      );

      desktopHeroTimerRef.current =
        null;
    }

    function setPhase(
      phase: 0 | 1 | 2
    ) {
      desktopHeroPhaseRef.current =
        phase;

      setDesktopHeroPhase(
        phase
      );
    }

    function scheduleStaticImage() {
      clearPhaseTimer();

      desktopHeroTimerRef.current =
        window.setTimeout(() => {
          if (
            desktopHeroPhaseRef.current ===
            1
          ) {
            setPhase(2);
          }

          desktopHeroTimerRef.current =
            null;
        }, 900);
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
       * 只在首屏已经完整回到顶部时接管动画状态。
       * 从第二屏向上滚动时先允许浏览器正常返回首屏，
       * 不会在半路拦住滚动。
       */
      const heroAtTop =
        Math.abs(rect.top) <= 5 &&
        rect.bottom >=
          window.innerHeight * 0.9;

      if (!heroAtTop) {
        return;
      }

      const currentPhase =
        desktopHeroPhaseRef.current;

      /*
       * 向下滚动：
       * 0 -> 1，并自动在 0.9 秒后进入 2。
       * 1 状态期间继续锁住惯性滚动。
       * 2 状态允许正常进入第二屏。
       */
      if (event.deltaY > 0) {
        if (currentPhase === 0) {
          event.preventDefault();

          setPhase(1);
          scheduleStaticImage();
          return;
        }

        if (currentPhase === 1) {
          event.preventDefault();
          return;
        }

        return;
      }

      /*
       * 向上滚动：
       * 2 -> 1
       * 1 -> 0
       * 实现完整反向切换。
       */
      if (event.deltaY < 0) {
        if (currentPhase === 2) {
          event.preventDefault();

          clearPhaseTimer();
          setPhase(1);
          return;
        }

        if (currentPhase === 1) {
          event.preventDefault();

          clearPhaseTimer();
          setPhase(0);
        }
      }
    }

    function handleMediaChange() {
      if (
        desktopMedia.matches
      ) {
        return;
      }

      clearPhaseTimer();
      setPhase(0);
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

      clearPhaseTimer();
    };
  }, []);

  /*
   * 第 1、2 阶段都保留网页文字。
   * 静态图出现后不再把标题隐藏。
   */
  const showDesktopHeroContent =
    desktopHeroPhase >= 1;

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
      desktopHeroPhase === 0
        ? "0.08"
        : desktopHeroPhase === 1
          ? "0.56"
          : "0.42",

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

cssSource = removeMarkedBlock(
  cssSource,
  CSS_START,
  CSS_END
);

cssSource = removeMarkedBlock(
  cssSource,
  NEW_CSS_START,
  NEW_CSS_END
);

const newCss = `

/* =========================================================
   首页 PC 首屏｜文字常驻与滚轮可逆

   阶段 0：视频，无文字
   阶段 1：视频，有文字
   阶段 2：静态图，有文字

   向上滚轮可按相反顺序退回。
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
      opacity 0.55s ease !important;

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
      opacity 0.55s ease;

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
      opacity 0.4s ease !important;
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
      opacity 0.3s ease,
      transform 0.4s
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
      opacity 0.3s ease,
      transform 0.4s
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
      opacity 0.3s ease,
      transform 0.4s
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
  "首页 PC 首屏已修正："
);
console.log(
  "- 静态图出现后文字继续显示"
);
console.log(
  "- 向上滚轮可逐级返回"
);
console.log(
  "- 从第二屏可正常向上滚回首屏"
);
console.log(
  "- 手机端保持原样"
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备修复文字消失和不能反向滚动的问题……' -ForegroundColor Cyan
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
    throw "首页 PC 首屏可逆交互修改失败，已自动恢复。"
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
# 首页 PC 首屏文字常驻与可逆滚动

- 修改时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
- 阶段 0：视频，无文字
- 阶段 1：视频，有文字
- 阶段 2：静态图，有文字
- 自动切换静态图：0.9 秒
- 向上滚轮：2 → 1 → 0
- 从第二屏可正常向上滚回首屏
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
Write-Host '首页 PC 首屏可逆交互修复完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host '静态图：保留网页文字' -ForegroundColor Cyan
Write-Host '向上滚轮：可以逐级返回' -ForegroundColor Cyan
Write-Host '手机端：保持原样' -ForegroundColor Cyan
Write-Host "备份：$backupRoot"
Write-Host "报告：$reportRoot"
Write-Host "构建退出码：$buildExitCode"
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''

git status --short
