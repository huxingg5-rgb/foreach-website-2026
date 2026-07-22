param(
    [string]$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026",
    [string]$BranchName = "中英文已完成"
)

$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $ProjectRoot

Write-Host ""
Write-Host "开始创建并上传完整分支..." -ForegroundColor Cyan
Write-Host "项目目录: $ProjectRoot" -ForegroundColor Cyan
Write-Host "目标分支: $BranchName" -ForegroundColor Cyan
Write-Host ""

git rev-parse --is-inside-work-tree | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "当前目录不是 Git 仓库。"
}

git remote get-url origin | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "未找到 origin 远程仓库。"
}

# 本地临时文件不上传
$excludeFile = Join-Path $ProjectRoot ".git\info\exclude"

New-Item -ItemType File -Path $excludeFile -Force | Out-Null

$excludeRules = @(
    "*.bak",
    "*.bak_*",
    "*.bak-*",
    "*.tmp",
    "*.log",
    "中文规格书正式接入报告.txt",
    "中文规格书文件清单与匹配报告.txt",
    "中文规格书候选匹配.csv",
    "检查中文规格书并匹配英文产品范围.ps1",
    "正式接入中文规格书.ps1",
    "上传完整项目到中英文已完成分支.ps1"
)

$currentExclude = @(
    Get-Content -LiteralPath $excludeFile -ErrorAction SilentlyContinue
)

foreach ($rule in $excludeRules) {
    if ($currentExclude -notcontains $rule) {
        Add-Content -LiteralPath $excludeFile -Value $rule -Encoding UTF8
    }
}

Write-Host "正在获取远程仓库状态..." -ForegroundColor Yellow
git fetch origin
if ($LASTEXITCODE -ne 0) {
    throw "git fetch origin 失败。"
}

Write-Host ""
Write-Host "正在执行构建检查..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    throw "项目构建失败，已停止上传。"
}

Write-Host ""
Write-Host "正在创建或重置本地分支..." -ForegroundColor Yellow

# -C 表示：
# 分支不存在时创建；
# 分支已存在时重置到当前 HEAD；
# 当前未提交修改仍保留在工作区。
git switch -C "$BranchName"
if ($LASTEXITCODE -ne 0) {
    throw "创建或切换分支失败。"
}

Write-Host ""
Write-Host "正在暂存完整项目..." -ForegroundColor Yellow
git add -A
if ($LASTEXITCODE -ne 0) {
    throw "git add -A 失败。"
}

Write-Host ""
Write-Host "准备提交的文件:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "提交统计:" -ForegroundColor Yellow
git diff --cached --stat

git diff --cached --quiet
$hasChanges = $LASTEXITCODE -eq 1

if ($hasChanges) {
    git commit -m "完成中英文官网及规格书页面"
    if ($LASTEXITCODE -ne 0) {
        throw "Git 提交失败。"
    }
}
elseif ($LASTEXITCODE -eq 0) {
    Write-Host "当前文件已全部提交，将直接上传分支。" -ForegroundColor Yellow
}
else {
    throw "检查暂存修改时发生错误。"
}

Write-Host ""
Write-Host "正在上传到 GitHub..." -ForegroundColor Yellow

# 如果远程已有同名分支，使用 force-with-lease 安全更新；
# 如果远程没有同名分支，则会正常创建。
git push -u origin "$BranchName" --force-with-lease
if ($LASTEXITCODE -ne 0) {
    throw "GitHub 上传失败，请查看上方第一条错误。"
}

Write-Host ""
Write-Host "全部上传完成。" -ForegroundColor Green
Write-Host "GitHub 分支: $BranchName" -ForegroundColor Green
Write-Host ""
