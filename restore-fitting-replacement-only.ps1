# ============================================================
# 仅恢复“接头替代查询”模块
#
# 本脚本只处理：
# - data/resources/fitting-replacement/all-compatible-products.generated.ts
# - data/resources/fitting-replacement/compatible-models.generated.ts
# - data/resources/fitting-replacement/fitting-replacement-offline.generated.ts
#
# 明确不会处理：
# - 产品中心接头选型数据
# - 产品中心快插接头状态
# - ProductSelectionClient.tsx
# - quick-connect-offline-products.generated.ts
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$backupRoot = Join-Path $projectRoot '.local-backups'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $backupRoot)) {
    throw "没有找到备份目录：$backupRoot"
}

Set-Location -LiteralPath $projectRoot

$replacementRelativePaths = @(
    'data\resources\fitting-replacement\all-compatible-products.generated.ts',
    'data\resources\fitting-replacement\compatible-models.generated.ts'
)

# 找最近一次“接头替代与复用图片快插”脚本生成的备份。
# 该备份目录格式：fitting-extra-offline-YYYYMMDD-HHMMSS
$backupCandidates = Get-ChildItem `
    -LiteralPath $backupRoot `
    -Directory `
    -ErrorAction Stop |
    Where-Object {
        if ($_.Name -notlike 'fitting-extra-offline-*') {
            return $false
        }

        foreach ($relativePath in $replacementRelativePaths) {
            if (Test-Path -LiteralPath (Join-Path $_.FullName $relativePath)) {
                return $true
            }
        }

        return $false
    } |
    Sort-Object LastWriteTime -Descending

$backupDirectory = $backupCandidates | Select-Object -First 1

if ($null -eq $backupDirectory) {
    throw @'
没有找到接头替代模块的 fitting-extra-offline-* 备份。
脚本已停止，没有修改任何文件。
请把下面命令的输出发来：
Get-ChildItem F:\WebsiteProjects\foreach-website-2026\.local-backups -Directory | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime
'@
}

Write-Host ''
Write-Host '准备仅恢复“接头替代查询”模块……' -ForegroundColor Cyan
Write-Host '恢复来源：' -ForegroundColor Yellow
Write-Host $backupDirectory.FullName
Write-Host ''
Write-Host '不会恢复产品中心接头，也不会改动快插产品中心状态。' -ForegroundColor Yellow
Write-Host ''

# 先备份当前错误状态，只备份接头替代模块。
$timeStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$currentStateBackup = Join-Path `
    $backupRoot `
    "before-fitting-replacement-restore-$timeStamp"

New-Item `
    -ItemType Directory `
    -Path $currentStateBackup `
    -Force |
    Out-Null

$helperRelativePath = `
    'data\resources\fitting-replacement\fitting-replacement-offline.generated.ts'

$currentFilesToSnapshot = @(
    $replacementRelativePaths[0],
    $replacementRelativePaths[1],
    $helperRelativePath
)

foreach ($relativePath in $currentFilesToSnapshot) {
    $currentFile = Join-Path $projectRoot $relativePath

    if (-not (Test-Path -LiteralPath $currentFile)) {
        continue
    }

    $snapshotFile = Join-Path $currentStateBackup $relativePath
    $snapshotParent = Split-Path -Path $snapshotFile -Parent

    New-Item `
        -ItemType Directory `
        -Path $snapshotParent `
        -Force |
        Out-Null

    Copy-Item `
        -LiteralPath $currentFile `
        -Destination $snapshotFile `
        -Force
}

# 只恢复备份目录中实际存在的接头替代数据文件。
$restoredFiles = @()

foreach ($relativePath in $replacementRelativePaths) {
    $sourceFile = Join-Path $backupDirectory.FullName $relativePath
    $targetFile = Join-Path $projectRoot $relativePath

    if (-not (Test-Path -LiteralPath $sourceFile)) {
        Write-Host "备份中不存在，跳过：$relativePath" -ForegroundColor DarkYellow
        continue
    }

    $targetParent = Split-Path -Path $targetFile -Parent

    New-Item `
        -ItemType Directory `
        -Path $targetParent `
        -Force |
        Out-Null

    Copy-Item `
        -LiteralPath $sourceFile `
        -Destination $targetFile `
        -Force

    $restoredFiles += $relativePath
    Write-Host "已恢复：$relativePath" -ForegroundColor Green
}

if ($restoredFiles.Count -eq 0) {
    throw '备份目录中没有可恢复的接头替代数据文件，脚本已停止。'
}

# 错误脚本新建的替代查询过滤清单，执行前一般不存在，直接删除。
$replacementHelper = Join-Path $projectRoot $helperRelativePath

if (Test-Path -LiteralPath $replacementHelper) {
    Remove-Item `
        -LiteralPath $replacementHelper `
        -Force

    Write-Host "已删除：$helperRelativePath" -ForegroundColor Green
}

# 清理可能残留的临时 Node 文件。
$tempNodeScript = Join-Path `
    $projectRoot `
    '.offline-fitting-replacement-and-shared-quick-connect.cjs'

Remove-Item `
    -LiteralPath $tempNodeScript `
    -Force `
    -ErrorAction SilentlyContinue

# 复查恢复后的两个替代查询数据文件。
$forbiddenMarkers = @(
    'FITTING_REPLACEMENT_OFFLINE_FILTER_START',
    'FITTING_REPLACEMENT_OFFLINE_FILTER_END',
    'isFittingReplacementProductOffline',
    'fitting-replacement-offline.generated'
)

foreach ($relativePath in $restoredFiles) {
    $targetFile = Join-Path $projectRoot $relativePath
    $content = Get-Content `
        -LiteralPath $targetFile `
        -Raw `
        -Encoding UTF8

    foreach ($marker in $forbiddenMarkers) {
        if ($content.Contains($marker)) {
            throw "恢复复查失败：$relativePath 中仍存在错误标记：$marker"
        }
    }
}

# 明确复查：本脚本不得修改产品中心关键文件。
$productCenterFiles = @(
    'components\products\selection\ProductSelectionClient.tsx',
    'data\products\selection\quick-connect-fitting-selection.generated.ts',
    'data\products\selection\quick-connect-offline-products.generated.ts'
)

Write-Host ''
Write-Host '已完成接头替代模块恢复。' -ForegroundColor Green
Write-Host '以下产品中心文件没有被本脚本修改：' -ForegroundColor Cyan

foreach ($relativePath in $productCenterFiles) {
    Write-Host "  - $relativePath"
}

Write-Host ''
Write-Host '开始执行构建检查……' -ForegroundColor Cyan
Write-Host ''

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '接头替代数据已经恢复，但构建检查失败。' -ForegroundColor Red
    Write-Host '不要运行其他下架或恢复脚本，请把完整构建错误发来。' -ForegroundColor Yellow
    throw 'npm run build 构建失败。'
}

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '接头替代查询已恢复' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host ''
Write-Host "恢复文件数量：$($restoredFiles.Count)" -ForegroundColor Cyan
Write-Host '恢复来源：' -ForegroundColor Cyan
Write-Host $backupDirectory.FullName
Write-Host ''
Write-Host '恢复前错误状态快照：' -ForegroundColor Cyan
Write-Host $currentStateBackup
Write-Host ''
Write-Host '现在刷新“接头替代查询”页面检查即可。' -ForegroundColor Yellow
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
