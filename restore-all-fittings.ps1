# ============================================================
# 恢复被“接头批量下架脚本”影响的全部接头
#
# 作用：
# 1. 自动寻找最近一次 fitting-offline-* 备份
# 2. 恢复该脚本修改过的接头选型文件
# 3. 恢复 ProductSelectionClient.tsx
# 4. 删除错误的全局接头下架过滤文件
# 5. 执行 npm run build 检查
#
# 不使用 git checkout，避免覆盖其他未提交工作。
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

# 只选择包含 ProductSelectionClient.tsx 的 fitting-offline 备份，
# 防止误用第一次失败时产生的不完整目录。
$backupCandidates = Get-ChildItem `
    -LiteralPath $backupRoot `
    -Directory `
    -ErrorAction Stop |
    Where-Object {
        $_.Name -like 'fitting-offline-*' -and
        (Test-Path -LiteralPath (
            Join-Path $_.FullName 'components\products\selection\ProductSelectionClient.tsx'
        ))
    } |
    Sort-Object LastWriteTime -Descending

$backupDirectory = $backupCandidates |
    Select-Object -First 1

if ($null -eq $backupDirectory) {
    throw '没有找到可用的 fitting-offline 备份。请不要继续操作，把 .local-backups 目录截图发来。'
}

Write-Host ''
Write-Host '准备恢复全部接头……' -ForegroundColor Cyan
Write-Host '使用备份：' -ForegroundColor Yellow
Write-Host $backupDirectory.FullName
Write-Host ''

# 先保存当前错误状态，便于出现意外时追溯。
$timeStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$currentStateBackup = Join-Path `
    $backupRoot `
    "before-fitting-restore-$timeStamp"

$affectedRelativePaths = @(
    'components\products\selection\ProductSelectionClient.tsx',
    'data\products\selection\barbed-fitting-selection.generated.ts',
    'data\products\selection\thread-to-barbed-fitting-selection.generated.ts',
    'data\products\selection\filter-check-valve-selection.generated.ts',
    'data\products\selection\female-thread-adapter-selection.generated.ts',
    'data\products\selection\luer-fitting-selection.generated.ts'
)

New-Item `
    -ItemType Directory `
    -Path $currentStateBackup `
    -Force |
    Out-Null

foreach ($relativePath in $affectedRelativePaths) {
    $currentFile = Join-Path $projectRoot $relativePath

    if (Test-Path -LiteralPath $currentFile) {
        $snapshotFile = Join-Path `
            $currentStateBackup `
            $relativePath

        $snapshotParent = Split-Path `
            -Path $snapshotFile `
            -Parent

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
}

# 恢复脚本执行前的文件。
$restoredCount = 0

foreach ($relativePath in $affectedRelativePaths) {
    $sourceFile = Join-Path `
        $backupDirectory.FullName `
        $relativePath

    $targetFile = Join-Path `
        $projectRoot `
        $relativePath

    if (-not (Test-Path -LiteralPath $sourceFile)) {
        throw "备份中缺少必要文件：$relativePath"
    }

    $targetParent = Split-Path `
        -Path $targetFile `
        -Parent

    New-Item `
        -ItemType Directory `
        -Path $targetParent `
        -Force |
        Out-Null

    Copy-Item `
        -LiteralPath $sourceFile `
        -Destination $targetFile `
        -Force

    $restoredCount += 1

    Write-Host "已恢复：$relativePath" -ForegroundColor Green
}

# 这个文件是错误下架脚本新建的，执行前通常不存在，
# 因此备份目录里不会有它，需要直接删除。
$offlineHelper = Join-Path `
    $projectRoot `
    'data\products\selection\fitting-offline-products.generated.ts'

if (Test-Path -LiteralPath $offlineHelper) {
    Remove-Item `
        -LiteralPath $offlineHelper `
        -Force

    Write-Host `
        '已删除：data\products\selection\fitting-offline-products.generated.ts' `
        -ForegroundColor Green
}

# 清理可能残留的临时 Node 脚本。
$tempNodeScript = Join-Path `
    $projectRoot `
    '.offline-fitting-products.cjs'

Remove-Item `
    -LiteralPath $tempNodeScript `
    -Force `
    -ErrorAction SilentlyContinue

# 关键复查：产品中心不能再引用错误过滤器。
$clientPath = Join-Path `
    $projectRoot `
    'components\products\selection\ProductSelectionClient.tsx'

$clientContent = Get-Content `
    -LiteralPath $clientPath `
    -Raw `
    -Encoding UTF8

if (
    $clientContent.Contains('isFittingProductOffline') -or
    $clientContent.Contains('fitting-offline-products.generated')
) {
    throw '恢复复查失败：ProductSelectionClient.tsx 中仍存在错误的接头过滤器。'
}

Write-Host ''
Write-Host "文件恢复完成，共恢复 $restoredCount 个文件。" -ForegroundColor Green
Write-Host '开始执行构建检查……' -ForegroundColor Cyan
Write-Host ''

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '文件已经恢复，但构建检查失败。' -ForegroundColor Red
    Write-Host '请不要再执行下架脚本，把完整构建错误发来。' -ForegroundColor Yellow
    throw 'npm run build 构建失败。'
}

Write-Host ''
Write-Host '============================================' -ForegroundColor Green
Write-Host '全部接头已恢复' -ForegroundColor Green
Write-Host '============================================' -ForegroundColor Green
Write-Host ''
Write-Host '恢复来源：' -ForegroundColor Cyan
Write-Host $backupDirectory.FullName
Write-Host ''
Write-Host '错误状态快照：' -ForegroundColor Cyan
Write-Host $currentStateBackup
Write-Host ''
Write-Host '现在重新打开或刷新本地产品中心检查接头。' -ForegroundColor Yellow
Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
