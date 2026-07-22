# ============================================================
# 首页 PC 首屏交互修正：
# 第一次向下滚动滚轮，字幕立即出现
#
# 修改内容：
# 1. 第一次 PC 向下滚动时，立即触发标题、副标题和按钮
# 2. 字幕采用短暂错峰淡入，不再依赖长距离滚动进度
# 3. 视频切换静态图仍由后续滚动控制
# 4. PC 滚动容器由 220vh 缩短为 170vh
# 5. 手机端完全不变
#
# 修改文件：
# - components/home/HomeHeroSection.tsx
# - app/globals.css
#
# 构建失败自动回滚，不执行 Git 提交。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$heroFile = Join-Path $projectRoot 'components\home\HomeHeroSection.tsx'
$cssFile = Join-Path $projectRoot 'app\globals.css'
$tempNodeScript = Join-Path $projectRoot '.fix-home-hero-first-wheel-reveal.cjs'

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
$backupRoot = Join-Path $projectRoot ".local-backups\home-hero-first-wheel-$stamp"
$reportRoot = Join-Path $projectRoot "audit-reports\home-hero-first-wheel\$stamp"

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

const COMPONENT_MARKER =
  "HOME_HERO_FIRST_WHEEL_REVEAL_START";

const CSS_START_MARKER =
  "HOME_HERO_FIRST_WHEEL_REVEAL_CSS_START";

const CSS_END_MARKER =
  "HOME_HERO_FIRST_WHEEL_REVEAL_CSS_END";

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

let heroSource = fs.readFileSync(
  heroPath,
  "utf8"
);

if (
  !heroSource.includes(
    "HOME_DESKTOP_SCROLL_HERO_COMPONENT_START"
  )
) {
  throw new Error(
    "没有找到之前接入的 PC 滚动 Hero 代码，脚本已停止。"
  );
}

if (
  heroSource.includes(
    COMPONENT_MARKER
  )
) {
  throw new Error(
    "第一次滚轮显示字幕的修正已经存在，不需要重复执行。"
  );
}

/*
 * 一、增加“用户已产生首次向下滚动意图”的状态。
 */
const progressStatePattern =
  /const \[desktopScrollProgress,\s*setDesktopScrollProgress\]\s*=\s*useState\(0\);/;

if (!progressStatePattern.test(heroSource)) {
  throw new Error(
    "没有找到 desktopScrollProgress 状态。"
  );
}

heroSource = heroSource.replace(
  progressStatePattern,
  (match) => `${match}

  /* ${COMPONENT_MARKER} */
  const [
    hasDesktopScrollIntent,
    setHasDesktopScrollIntent,
  ] = useState(false);
  /* HOME_HERO_FIRST_WHEEL_REVEAL_END */`
);

/*
 * 二、在 useEffect 中增加第一次向下滚轮监听。
 */
const updateProgressFunctionPattern =
  /function updateProgress\(\) \{/;

if (!updateProgressFunctionPattern.test(heroSource)) {
  throw new Error(
    "没有找到 updateProgress 函数。"
  );
}

heroSource = heroSource.replace(
  updateProgressFunctionPattern,
  `function handleFirstDesktopWheel(
      event: WheelEvent
    ) {
      if (
        !desktopMedia.matches ||
        event.deltaY <= 0
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
       * Hero 仍在当前视口范围内时，
       * 第一次向下滚动立即显示字幕。
       */
      if (
        rect.top <= 2 &&
        rect.bottom >
          window.innerHeight * 0.25
      ) {
        setHasDesktopScrollIntent(
          true
        );
      }
    }

    function updateProgress() {`
);

/*
 * 三、即使用户拖动滚动条，也能触发字幕出现。
 */
const setProgressPattern =
  /setDesktopScrollProgress\(progress\);/;

if (!setProgressPattern.test(heroSource)) {
  throw new Error(
    "没有找到 setDesktopScrollProgress(progress)。"
  );
}

heroSource = heroSource.replace(
  setProgressPattern,
  `setDesktopScrollProgress(progress);

        if (progress > 0.002) {
          setHasDesktopScrollIntent(
            true
          );
        }`
);

/*
 * 四、注册 wheel 事件。
 */
const scrollListenerPattern =
  /window\.addEventListener\("scroll",\s*updateProgress,\s*\{\s*passive:\s*true,\s*\}\);/;

if (!scrollListenerPattern.test(heroSource)) {
  throw new Error(
    "没有找到 scroll 事件注册代码。"
  );
}

heroSource = heroSource.replace(
  scrollListenerPattern,
  (match) => `${match}

    window.addEventListener(
      "wheel",
      handleFirstDesktopWheel,
      {
        passive: true,
      }
    );`
);

/*
 * 五、卸载 wheel 事件。
 */
const removeScrollPattern =
  /window\.removeEventListener\("scroll",\s*updateProgress\);/;

if (!removeScrollPattern.test(heroSource)) {
  throw new Error(
    "没有找到 scroll 事件卸载代码。"
  );
}

heroSource = heroSource.replace(
  removeScrollPattern,
  (match) => `${match}

      window.removeEventListener(
        "wheel",
        handleFirstDesktopWheel
      );`
);

/*
 * 六、标题、副标题和按钮不再依赖长滚动进度，
 * 第一次滚动后直接变为显示状态。
 */
const revealProgressPattern =
  /const titleProgress = rangeProgress\([\s\S]*?const actionProgress = rangeProgress\([\s\S]*?\);/;

const revealProgressReplacement = `const titleProgress =
    hasDesktopScrollIntent
      ? 1
      : 0;

  const subtitleProgress =
    hasDesktopScrollIntent
      ? 1
      : 0;

  const actionProgress =
    hasDesktopScrollIntent
      ? 1
      : 0;`;

if (!revealProgressPattern.test(heroSource)) {
  throw new Error(
    "没有找到原来的标题、副标题和按钮滚动进度代码。"
  );
}

heroSource = heroSource.replace(
  revealProgressPattern,
  revealProgressReplacement
);

/*
 * 七、静态图切换稍微提前，但不会在第一次滚轮时立刻换图。
 */
heroSource = heroSource.replace(
  /const staticProgress = rangeProgress\(\s*desktopScrollProgress,\s*0\.58,\s*0\.84\s*\);/,
  `const staticProgress =
    rangeProgress(
      desktopScrollProgress,
      0.24,
      0.62
    );`
);

assertTsxSyntax(
  heroPath,
  heroSource
);

if (
  !heroSource.includes(
    "hasDesktopScrollIntent"
  ) ||
  !heroSource.includes(
    "handleFirstDesktopWheel"
  )
) {
  throw new Error(
    "首次滚轮显示逻辑写入后验证失败。"
  );
}

fs.writeFileSync(
  heroPath,
  heroSource,
  "utf8"
);

/*
 * 八、CSS：
 * - 缩短滚动距离
 * - 字幕使用短暂错峰动画
 */
let cssSource = fs.readFileSync(
  cssPath,
  "utf8"
);

if (
  cssSource.includes(
    CSS_START_MARKER
  )
) {
  throw new Error(
    "首次滚轮显示字幕的 CSS 已经存在。"
  );
}

const cssBlock = `

/* =========================================================
   首页 PC 首屏｜第一次滚轮立即显示字幕

   初始：
   - 只显示视频

   第一次向下滚轮：
   - 标题立即开始出现
   - 副标题延迟 0.08 秒
   - 按钮延迟 0.16 秒

   后续继续滚动：
   - 视频切换为静态图
========================================================= */
/* ${CSS_START_MARKER} */

@media (min-width: 1001px) {
  .home-hero-scroll-shell {
    height: 170vh !important;
  }

  .home-hero-scroll-shell
    .home-hero-title {
    transition:
      opacity 0.32s ease,
      transform 0.42s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay: 0s !important;
  }

  .home-hero-scroll-shell
    .home-hero-subtitle {
    transition:
      opacity 0.32s ease,
      transform 0.42s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0.08s !important;
  }

  .home-hero-scroll-shell
    .home-hero-actions {
    transition:
      opacity 0.32s ease,
      transform 0.42s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        ) !important;

    transition-delay:
      0.16s !important;
  }
}

/* ${CSS_END_MARKER} */
`;

cssSource =
  cssSource.replace(
    /\s*$/,
    ""
  ) +
  cssBlock +
  "\n";

fs.writeFileSync(
  cssPath,
  cssSource,
  "utf8"
);

console.log("");
console.log(
  "首页 PC 首屏触发方式已修改："
);
console.log(
  "- 第一次向下滚轮：字幕立即出现"
);
console.log(
  "- 后续滚动：视频切换静态图"
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
Write-Host '准备修改首页 PC 首屏触发方式……' -ForegroundColor Cyan
Write-Host '第一次向下滚轮后，字幕立即出现。' -ForegroundColor Yellow
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
    throw "首页首次滚轮显示字幕修改失败，已自动恢复。"
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
# 首页 PC 首屏首次滚轮显示字幕

- 修改时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
- PC 首次向下滚轮：立即触发字幕
- 标题延迟：0 秒
- 副标题延迟：0.08 秒
- 按钮延迟：0.16 秒
- PC 滚动容器：170vh
- 静态图切换进度：24% 至 62%
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
Write-Host '首页首次滚轮显示字幕修改完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host '第一次向下滚轮：字幕立即出现' -ForegroundColor Cyan
Write-Host '继续滚动：视频切换静态图' -ForegroundColor Cyan
Write-Host '手机端：保持原样' -ForegroundColor Cyan
Write-Host "备份：$backupRoot"
Write-Host "报告：$reportRoot"
Write-Host "构建退出码：$buildExitCode"
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''

git status --short
