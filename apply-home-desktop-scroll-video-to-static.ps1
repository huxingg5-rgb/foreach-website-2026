# ============================================================
# FOREACH 官网首页｜PC 首屏滚动视频转静态图
#
# PC：
# 1. 初始仅显示现有视频
# 2. 向下滚动时标题、说明、按钮依次出现
# 3. 后段视频淡出，eas首页.webp 静态图淡入
#
# 手机端：
# - 保持当前首屏，不改视觉和交互
#
# 修改：
# - components/home/HomeHeroSection.tsx
# - app/globals.css
# - public/images/home/eas-home-scroll-static.webp
#
# 构建失败自动回滚，不提交 Git。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$sourceFolder = 'C:\Users\Administrator\Desktop\新建文件夹 (8)'

$heroFile = Join-Path $projectRoot 'components\home\HomeHeroSection.tsx'
$cssFile = Join-Path $projectRoot 'app\globals.css'
$targetImage = Join-Path $projectRoot 'public\images\home\eas-home-scroll-static.webp'
$tempNodeScript = Join-Path $projectRoot '.apply-home-desktop-scroll-hero.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $sourceFolder)) {
    throw "没有找到素材文件夹：$sourceFolder"
}

if (-not (Test-Path -LiteralPath $heroFile)) {
    throw "没有找到首页首屏组件：$heroFile"
}

if (-not (Test-Path -LiteralPath $cssFile)) {
    throw "没有找到全局样式：$cssFile"
}

$preferredImage = Join-Path $sourceFolder 'eas首页.webp'

if (Test-Path -LiteralPath $preferredImage) {
    $sourceImage = Get-Item -LiteralPath $preferredImage
}
else {
    $images = @(
        Get-ChildItem -LiteralPath $sourceFolder -File |
        Where-Object {
            $_.Extension.ToLowerInvariant() -in @('.webp', '.png', '.jpg', '.jpeg')
        }
    )

    if ($images.Count -eq 0) {
        throw "素材文件夹中没有找到静态图片。"
    }

    if ($images.Count -gt 1) {
        throw "素材文件夹中有多张图片，请把目标图命名为 eas首页.webp。"
    }

    $sourceImage = $images[0]
}

if ($sourceImage.Extension.ToLowerInvariant() -ne '.webp') {
    throw "静态图必须是 WebP：$($sourceImage.FullName)"
}

Set-Location -LiteralPath $projectRoot

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = Join-Path $projectRoot ".local-backups\home-desktop-scroll-hero-$stamp"
$reportRoot = Join-Path $projectRoot "audit-reports\home-desktop-scroll-hero\$stamp"

New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
New-Item -ItemType Directory -Path $reportRoot -Force | Out-Null

$heroBackup = Join-Path $backupRoot 'components\home\HomeHeroSection.tsx'
$cssBackup = Join-Path $backupRoot 'app\globals.css'
$imageBackup = Join-Path $backupRoot 'public\images\home\eas-home-scroll-static.webp'

New-Item -ItemType Directory -Path (Split-Path -Parent $heroBackup) -Force | Out-Null
New-Item -ItemType Directory -Path (Split-Path -Parent $cssBackup) -Force | Out-Null

Copy-Item -LiteralPath $heroFile -Destination $heroBackup -Force
Copy-Item -LiteralPath $cssFile -Destination $cssBackup -Force

$targetImageExisted = Test-Path -LiteralPath $targetImage

if ($targetImageExisted) {
    New-Item -ItemType Directory -Path (Split-Path -Parent $imageBackup) -Force | Out-Null
    Copy-Item -LiteralPath $targetImage -Destination $imageBackup -Force
}

function Restore-HomeHero {
    Copy-Item -LiteralPath $heroBackup -Destination $heroFile -Force
    Copy-Item -LiteralPath $cssBackup -Destination $cssFile -Force

    if ($targetImageExisted) {
        Copy-Item -LiteralPath $imageBackup -Destination $targetImage -Force
    }
    else {
        Remove-Item -LiteralPath $targetImage -Force -ErrorAction SilentlyContinue
    }
}

New-Item -ItemType Directory -Path (Split-Path -Parent $targetImage) -Force | Out-Null
Copy-Item -LiteralPath $sourceImage.FullName -Destination $targetImage -Force

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();
const heroPath = path.join(root, "components/home/HomeHeroSection.tsx");
const cssPath = path.join(root, "app/globals.css");

const COMPONENT_MARKER = "HOME_DESKTOP_SCROLL_HERO_COMPONENT_START";
const CSS_START = "HOME_DESKTOP_SCROLL_HERO_CSS_START";
const CSS_END = "HOME_DESKTOP_SCROLL_HERO_CSS_END";

function parse(filePath, source) {
  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}

function assertSyntax(filePath, source) {
  const parsed = parse(filePath, source);

  if (!parsed.parseDiagnostics.length) {
    return;
  }

  const message = parsed.parseDiagnostics
    .map((item) =>
      ts.flattenDiagnosticMessageText(item.messageText, "\n")
    )
    .join("\n");

  throw new Error(
    `${path.relative(root, filePath)} 语法检查失败：\n${message}`
  );
}

function getClassName(node) {
  if (
    !ts.isJsxOpeningElement(node) &&
    !ts.isJsxSelfClosingElement(node)
  ) {
    return "";
  }

  for (const item of node.attributes.properties) {
    if (
      !ts.isJsxAttribute(item) ||
      item.name.text !== "className" ||
      !item.initializer
    ) {
      continue;
    }

    if (ts.isStringLiteral(item.initializer)) {
      return item.initializer.text;
    }
  }

  return "";
}

function findNodes(source) {
  const parsed = parse(heroPath, source);

  let component = null;
  let returnStatement = null;
  let heroElement = null;
  let heroOpening = null;
  let videoNode = null;

  function visit(node) {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name?.text === "HomeHeroSection"
    ) {
      component = node;

      for (const statement of node.body?.statements || []) {
        if (ts.isReturnStatement(statement)) {
          returnStatement = statement;
          break;
        }
      }
    }

    if (ts.isJsxElement(node)) {
      const opening = node.openingElement;

      if (
        opening.tagName.getText(parsed) === "section" &&
        getClassName(opening).split(/\s+/).includes("home-hero")
      ) {
        heroElement = node;
        heroOpening = opening;
      }
    }

    if (
      ts.isJsxSelfClosingElement(node) &&
      node.tagName.getText(parsed) === "video" &&
      getClassName(node).split(/\s+/).includes("home-hero-video")
    ) {
      videoNode = node;
    }

    if (
      ts.isJsxOpeningElement(node) &&
      node.tagName.getText(parsed) === "video" &&
      getClassName(node).split(/\s+/).includes("home-hero-video") &&
      ts.isJsxElement(node.parent)
    ) {
      videoNode = node.parent;
    }

    ts.forEachChild(node, visit);
  }

  visit(parsed);

  if (!component?.body) {
    throw new Error("没有找到 HomeHeroSection 函数。");
  }

  if (!returnStatement) {
    throw new Error("没有找到 HomeHeroSection 的 return。");
  }

  if (!heroElement || !heroOpening) {
    throw new Error('没有找到 className="home-hero" 的 section。');
  }

  if (!videoNode) {
    throw new Error('没有找到 className="home-hero-video" 的 video。');
  }

  return {
    parsed,
    returnStatement,
    heroElement,
    heroOpening,
    videoNode,
  };
}

let source = fs.readFileSync(heroPath, "utf8");

if (source.includes(COMPONENT_MARKER)) {
  throw new Error("PC 首屏滚动效果已经存在，不需要重复执行。");
}

if (!/^\s*["']use client["'];/.test(source)) {
  source = `"use client";\n\n${source}`;
}

if (!source.includes("useEffect") || !source.includes('from "react"')) {
  const directive = source.match(/^\s*["']use client["'];\s*/);
  const position = directive ? directive[0].length : 0;
  const reactImport =
    '\nimport { useEffect, useRef, useState, type CSSProperties } from "react";\n';

  source =
    source.slice(0, position) +
    reactImport +
    source.slice(position);
}

assertSyntax(heroPath, source);

{
  const nodes = findNodes(source);

  const logic = `
  /* ${COMPONENT_MARKER} */
  const scrollShellRef = useRef<HTMLDivElement>(null);
  const [desktopScrollProgress, setDesktopScrollProgress] = useState(0);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1001px)");
    let frameId = 0;

    function updateProgress() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        if (!desktopMedia.matches) {
          setDesktopScrollProgress(0);
          return;
        }

        const shell = scrollShellRef.current;

        if (!shell) {
          return;
        }

        const rect = shell.getBoundingClientRect();
        const distance = Math.max(
          shell.offsetHeight - window.innerHeight,
          1
        );

        const progress = Math.min(
          Math.max(-rect.top / distance, 0),
          1
        );

        setDesktopScrollProgress(progress);
      });
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);
    desktopMedia.addEventListener("change", updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      desktopMedia.removeEventListener("change", updateProgress);
    };
  }, []);

  function rangeProgress(
    progress: number,
    start: number,
    end: number
  ) {
    if (progress <= start) {
      return 0;
    }

    if (progress >= end) {
      return 1;
    }

    const value = (progress - start) / (end - start);
    return value * value * (3 - 2 * value);
  }

  const titleProgress = rangeProgress(
    desktopScrollProgress,
    0.16,
    0.38
  );

  const subtitleProgress = rangeProgress(
    desktopScrollProgress,
    0.27,
    0.49
  );

  const actionProgress = rangeProgress(
    desktopScrollProgress,
    0.38,
    0.58
  );

  const staticProgress = rangeProgress(
    desktopScrollProgress,
    0.58,
    0.84
  );

  const overlayProgress = rangeProgress(
    desktopScrollProgress,
    0.08,
    0.58
  );

  const heroStyle = {
    "--home-hero-title-opacity": String(titleProgress),
    "--home-hero-subtitle-opacity": String(subtitleProgress),
    "--home-hero-actions-opacity": String(actionProgress),
    "--home-hero-static-opacity": String(staticProgress),
    "--home-hero-video-opacity": String(1 - staticProgress),
    "--home-hero-overlay-opacity": String(
      0.08 + overlayProgress * 0.52
    ),
    "--home-hero-video-scale": String(
      1 + desktopScrollProgress * 0.035
    ),
    "--home-hero-title-shift": \`\${(1 - titleProgress) * 32}px\`,
    "--home-hero-subtitle-shift": \`\${(1 - subtitleProgress) * 28}px\`,
    "--home-hero-actions-shift": \`\${(1 - actionProgress) * 24}px\`,
  } as CSSProperties;
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_END */

`;

  const position = nodes.returnStatement.getStart(nodes.parsed);

  source =
    source.slice(0, position) +
    logic +
    source.slice(position);
}

assertSyntax(heroPath, source);

{
  const nodes = findNodes(source);

  const edits = [
    {
      position: nodes.heroOpening.getEnd() - 1,
      text: '\n        style={heroStyle}',
    },
    {
      position: nodes.videoNode.getEnd(),
      text: `

        <img
          className="home-hero-static-image"
          src="/images/home/eas-home-scroll-static.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />`,
    },
    {
      position: nodes.heroElement.getStart(nodes.parsed),
      text:
        '<div ref={scrollShellRef} className="home-hero-scroll-shell">\n      ',
    },
    {
      position: nodes.heroElement.getEnd(),
      text: "\n    </div>",
    },
  ].sort((a, b) => b.position - a.position);

  for (const edit of edits) {
    source =
      source.slice(0, edit.position) +
      edit.text +
      source.slice(edit.position);
  }
}

assertSyntax(heroPath, source);

if (
  !source.includes('ref={scrollShellRef}') ||
  !source.includes('style={heroStyle}') ||
  !source.includes('className="home-hero-static-image"')
) {
  throw new Error("首页 Hero 修改后验证失败。");
}

fs.writeFileSync(heroPath, source, "utf8");

let css = fs.readFileSync(cssPath, "utf8");

if (css.includes(CSS_START)) {
  throw new Error("PC 首屏滚动样式已经存在。");
}

css += `

/* =========================================================
   首页首屏｜PC 视频滚动切换静态图
   仅作用于 1001px 及以上，手机端保持原样
========================================================= */
/* ${CSS_START} */

.home-hero-static-image {
  display: none;
}

@media (min-width: 1001px) {
  .home-hero-scroll-shell {
    position: relative;
    height: 220vh;
    background: #061a3a;
  }

  .home-hero-scroll-shell .home-hero {
    position: sticky !important;
    top: 0;
    width: 100%;
    height: 100vh !important;
    min-height: 100vh !important;
    overflow: hidden;
    isolation: isolate;
  }

  .home-hero-scroll-shell .home-hero-video {
    opacity: var(--home-hero-video-opacity, 1) !important;
    transform: scale(var(--home-hero-video-scale, 1));
    transform-origin: center center;
    will-change: opacity, transform;
  }

  .home-hero-scroll-shell .home-hero-static-image {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    opacity: var(--home-hero-static-opacity, 0);
    pointer-events: none;
    will-change: opacity;
  }

  .home-hero-scroll-shell .home-hero-overlay {
    z-index: 2;
    opacity: var(--home-hero-overlay-opacity, 0.08) !important;
    will-change: opacity;
  }

  .home-hero-scroll-shell .home-hero-inner {
    position: relative;
    z-index: 3;
  }

  .home-hero-scroll-shell .home-hero-title {
    opacity: var(--home-hero-title-opacity, 0) !important;
    transform: translateY(
      var(--home-hero-title-shift, 32px)
    );
    transition: none !important;
    will-change: opacity, transform;
  }

  .home-hero-scroll-shell .home-hero-subtitle {
    opacity: var(--home-hero-subtitle-opacity, 0) !important;
    transform: translateY(
      var(--home-hero-subtitle-shift, 28px)
    );
    transition: none !important;
    will-change: opacity, transform;
  }

  .home-hero-scroll-shell .home-hero-actions {
    opacity: var(--home-hero-actions-opacity, 0) !important;
    transform: translateY(
      var(--home-hero-actions-shift, 24px)
    );
    transition: none !important;
    will-change: opacity, transform;
  }
}

@media
  (min-width: 1001px) and
  (prefers-reduced-motion: reduce) {
  .home-hero-scroll-shell {
    height: 100vh;
  }

  .home-hero-scroll-shell .home-hero-video {
    opacity: 0 !important;
  }

  .home-hero-scroll-shell .home-hero-static-image,
  .home-hero-scroll-shell .home-hero-title,
  .home-hero-scroll-shell .home-hero-subtitle,
  .home-hero-scroll-shell .home-hero-actions {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ${CSS_END} */
`;

fs.writeFileSync(cssPath, css, "utf8");

console.log("");
console.log("首页 PC 首屏代码已修改：");
console.log("- 初始只显示现有视频");
console.log("- 滚动后字幕和按钮出现");
console.log("- 后段切换 eas 静态图");
console.log("- 手机端保持原样");
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '开始接入首页 PC 视频滚动首屏……' -ForegroundColor Cyan
Write-Host "静态图：$($sourceImage.FullName)" -ForegroundColor DarkGray
Write-Host ''

$nodeExitCode = 0

try {
    node $tempNodeScript
    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item -LiteralPath $tempNodeScript -Force -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    Restore-HomeHero
    throw "首页 PC 首屏代码修改失败，已自动恢复。"
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
    Out-File -LiteralPath $buildLog -Encoding utf8

$buildOutput |
    ForEach-Object {
        Write-Host $_
    }

if ($buildExitCode -ne 0) {
    Copy-Item `
        -LiteralPath $heroFile `
        -Destination (Join-Path $reportRoot '构建失败时的HomeHeroSection.tsx.txt') `
        -Force

    Copy-Item `
        -LiteralPath $cssFile `
        -Destination (Join-Path $reportRoot '构建失败时的globals.css.txt') `
        -Force

    Restore-HomeHero

    throw "npm run build 失败，已自动恢复。完整日志：$buildLog"
}

$summary = @"
# 首页 PC 首屏滚动改版

- 修改时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
- 源静态图：$($sourceImage.FullName)
- 网站静态图：public/images/home/eas-home-scroll-static.webp
- PC 启用宽度：1001px 及以上
- PC 滚动容器：220vh
- 手机端：保持原样
- 构建退出码：$buildExitCode

## 动画顺序

1. 初始只显示现有视频；
2. 标题开始出现；
3. 说明出现；
4. 按钮出现；
5. 视频淡出，静态图淡入；
6. 继续滚动进入第二屏。
"@

[System.IO.File]::WriteAllText(
    (Join-Path $reportRoot '执行摘要.md'),
    $summary,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '首页 PC 首屏滚动改版完成' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host 'PC：视频 → 字幕 → 静态图' -ForegroundColor Cyan
Write-Host '手机端：保持原样' -ForegroundColor Cyan
Write-Host "静态图：$targetImage"
Write-Host "备份：$backupRoot"
Write-Host "报告：$reportRoot"
Write-Host "构建退出码：$buildExitCode"
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''

git status --short
