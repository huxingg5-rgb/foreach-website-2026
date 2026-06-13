$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Get-Location).Path
$packagePath = Join-Path $root "package.json"
$globalsPath = Join-Path $root "app\globals.css"
$heroPath = Join-Path $root "components\home\HomeHeroSection.tsx"
$videoPath = Join-Path $root "public\images\home\home-banner-desktop.mp4"

foreach ($requiredPath in @(
  $packagePath,
  $globalsPath,
  $heroPath,
  $videoPath
)) {
  if (-not (Test-Path -LiteralPath $requiredPath)) {
    throw "没有找到必要文件：$requiredPath"
  }
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$globalsBackup = $globalsPath + "." + $stamp + ".bak"

Copy-Item -LiteralPath $globalsPath -Destination $globalsBackup -Force

Write-Host "已备份：$globalsBackup" -ForegroundColor Yellow

function Decode-Base64Utf8 {
  param([string]$Encoded)

  $bytes = [System.Convert]::FromBase64String($Encoded)
  return [System.Text.Encoding]::UTF8.GetString($bytes)
}

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

try {
  $cssBase64 = @'
LyogSE9NRV9IRVJPX0xBWU9VVF9GSVhfVjI5X1NUQVJUICovCi8qIOS/ruWkjemmlumhteinhumikSBCYW5uZXLvvJrmgaLlpI3moIfpopjjgIHlia/moIfpopjlkozmjInpkq7nmoTlrozmlbTluIPlsYAgKi8KLmhvbWUtaGVybyB7CiAgcG9zaXRpb246IHJlbGF0aXZlICFpbXBvcnRhbnQ7CiAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDsKICBtaW4taGVpZ2h0OiAxMDB2aCAhaW1wb3J0YW50OwogIHBhZGRpbmctdG9wOiAxMjBweCAhaW1wb3J0YW50OwogIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsKCiAgYmFja2dyb3VuZC1jb2xvcjogIzE3MzM2OCAhaW1wb3J0YW50OwogIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUgIWltcG9ydGFudDsKCiAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDsKfQoKLmhvbWUtaGVyby12aWRlbyB7CiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7CiAgaW5zZXQ6IDAgIWltcG9ydGFudDsKICB6LWluZGV4OiAwICFpbXBvcnRhbnQ7CgogIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7CiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDsKCiAgb2JqZWN0LWZpdDogY292ZXIgIWltcG9ydGFudDsKICBvYmplY3QtcG9zaXRpb246IGNlbnRlciBjZW50ZXIgIWltcG9ydGFudDsKCiAgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsKfQoKLmhvbWUtaGVyby1vdmVybGF5IHsKICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDsKICBpbnNldDogMCAhaW1wb3J0YW50OwogIHotaW5kZXg6IDEgIWltcG9ydGFudDsKCiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KAogICAgOTBkZWcsCiAgICByZ2JhKDcsIDI2LCA1MywgMC41OCkgMCUsCiAgICByZ2JhKDIzLCA1MSwgMTA0LCAwLjI4KSA0OCUsCiAgICByZ2JhKDEwLCAzNSwgNzQsIDAuMDgpIDEwMCUKICApICFpbXBvcnRhbnQ7CgogIHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7Cn0KCi5ob21lLWhlcm8taW5uZXIgewogIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50OwogIHotaW5kZXg6IDIgIWltcG9ydGFudDsKCiAgd2lkdGg6IG1pbihjYWxjKDEwMCUgLSA0OHB4KSwgMTYwMHB4KSAhaW1wb3J0YW50OwogIG1hcmdpbjogMCBhdXRvICFpbXBvcnRhbnQ7CiAgcGFkZGluZy10b3A6IDEzMHB4ICFpbXBvcnRhbnQ7Cn0KCi5ob21lLWhlcm8tdGl0bGUgewogIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50OwoKICBtYXgtd2lkdGg6IDk4MHB4ICFpbXBvcnRhbnQ7CiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7CgogIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7CiAgZm9udC1zaXplOiBjbGFtcCg0MnB4LCA1dncsIDc4cHgpICFpbXBvcnRhbnQ7CiAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50OwogIGxpbmUtaGVpZ2h0OiAxLjA4ICFpbXBvcnRhbnQ7CiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbSAhaW1wb3J0YW50OwoKICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA0MHB4KSAhaW1wb3J0YW50Owp9CgouaG9tZS1oZXJvLXN1YnRpdGxlIHsKICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDsKCiAgbWF4LXdpZHRoOiA5ODBweCAhaW1wb3J0YW50OwogIG1hcmdpbjogMCAhaW1wb3J0YW50OwoKICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk2KSAhaW1wb3J0YW50OwogIGZvbnQtc2l6ZTogY2xhbXAoMTZweCwgMS40dncsIDI0cHgpICFpbXBvcnRhbnQ7CiAgZm9udC13ZWlnaHQ6IDQwMCAhaW1wb3J0YW50OwogIGxpbmUtaGVpZ2h0OiAxLjU1ICFpbXBvcnRhbnQ7CiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbSAhaW1wb3J0YW50OwoKICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA4MHB4KSAhaW1wb3J0YW50Owp9CgouaG9tZS1oZXJvLWFjdGlvbnMgewogIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50OwoKICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7CiAgYWxpZ24taXRlbXM6IGNlbnRlciAhaW1wb3J0YW50OwogIGdhcDogMTZweCAhaW1wb3J0YW50OwoKICBtYXJnaW4tdG9wOiAxMjBweCAhaW1wb3J0YW50Owp9CgouaG9tZS1oZXJvLWJ0biB7CiAgZGlzcGxheTogaW5saW5lLWZsZXggIWltcG9ydGFudDsKICBtaW4td2lkdGg6IDE0OHB4ICFpbXBvcnRhbnQ7CiAgaGVpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7CiAgcGFkZGluZzogMCAyNnB4ICFpbXBvcnRhbnQ7CgogIGFsaWduLWl0ZW1zOiBjZW50ZXIgIWltcG9ydGFudDsKICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlciAhaW1wb3J0YW50OwoKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDIpICFpbXBvcnRhbnQ7CiAgYm9yZGVyLXJhZGl1czogOHB4ICFpbXBvcnRhbnQ7CiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KSAhaW1wb3J0YW50OwogIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7CgogIGZvbnQtc2l6ZTogMTVweCAhaW1wb3J0YW50OwogIGZvbnQtd2VpZ2h0OiA0MDAgIWltcG9ydGFudDsKICBsaW5lLWhlaWdodDogMSAhaW1wb3J0YW50OwogIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50OwoKICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTsKfQoKLmhvbWUtaGVyby1idG46aG92ZXIsCi5ob21lLWhlcm8tYnRuOmZvY3VzLXZpc2libGUgewogIGJvcmRlci1jb2xvcjogIzA5ZTliNCAhaW1wb3J0YW50OwogIGJhY2tncm91bmQ6ICMwOWU5YjQgIWltcG9ydGFudDsKICBjb2xvcjogIzE3MzM2OCAhaW1wb3J0YW50OwogIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDsKICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7Cn0KCkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkgewogIC5ob21lLWhlcm8gewogICAgbWluLWhlaWdodDogMTAwc3ZoICFpbXBvcnRhbnQ7CiAgICBwYWRkaW5nLXRvcDogOTBweCAhaW1wb3J0YW50OwogIH0KCiAgLmhvbWUtaGVyby1pbm5lciB7CiAgICB3aWR0aDogY2FsYygxMDAlIC0gMzJweCkgIWltcG9ydGFudDsKICAgIHBhZGRpbmctdG9wOiAxMTBweCAhaW1wb3J0YW50OwogIH0KCiAgLmhvbWUtaGVyby10aXRsZSB7CiAgICBtYXgtd2lkdGg6IDc2MHB4ICFpbXBvcnRhbnQ7CiAgICBmb250LXNpemU6IGNsYW1wKDM4cHgsIDd2dywgNjJweCkgIWltcG9ydGFudDsKICB9CgogIC5ob21lLWhlcm8tc3VidGl0bGUgewogICAgbWF4LXdpZHRoOiA3NjBweCAhaW1wb3J0YW50OwogIH0KfQoKQG1lZGlhIChtYXgtd2lkdGg6IDY4MHB4KSB7CiAgLmhvbWUtaGVybyB7CiAgICBwYWRkaW5nLXRvcDogNzBweCAhaW1wb3J0YW50OwogIH0KCiAgLmhvbWUtaGVyby1pbm5lciB7CiAgICB3aWR0aDogY2FsYygxMDAlIC0gMjRweCkgIWltcG9ydGFudDsKICAgIHBhZGRpbmctdG9wOiA4NnB4ICFpbXBvcnRhbnQ7CiAgfQoKICAuaG9tZS1oZXJvLXZpZGVvIHsKICAgIG9iamVjdC1wb3NpdGlvbjogY2VudGVyIGNlbnRlciAhaW1wb3J0YW50OwogIH0KCiAgLmhvbWUtaGVyby10aXRsZSB7CiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgIGZvbnQtc2l6ZTogY2xhbXAoMzRweCwgMTF2dywgNDhweCkgIWltcG9ydGFudDsKICAgIGxpbmUtaGVpZ2h0OiAxLjEyICFpbXBvcnRhbnQ7CiAgICB0cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDsKICB9CgogIC5ob21lLWhlcm8tc3VidGl0bGUgewogICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7CiAgICBtYXJnaW4tdG9wOiAyNHB4ICFpbXBvcnRhbnQ7CiAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDsKICAgIGxpbmUtaGVpZ2h0OiAxLjY1ICFpbXBvcnRhbnQ7CiAgICB0cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDsKICB9CgogIC5ob21lLWhlcm8tYWN0aW9ucyB7CiAgICBmbGV4LXdyYXA6IHdyYXAgIWltcG9ydGFudDsKICAgIGdhcDogMTBweCAhaW1wb3J0YW50OwogICAgbWFyZ2luLXRvcDogMzRweCAhaW1wb3J0YW50OwogIH0KCiAgLmhvbWUtaGVyby1idG4gewogICAgbWluLXdpZHRoOiAxMzZweCAhaW1wb3J0YW50OwogICAgaGVpZ2h0OiA0NHB4ICFpbXBvcnRhbnQ7CiAgICBwYWRkaW5nOiAwIDIwcHggIWltcG9ydGFudDsKICAgIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50OwogIH0KfQovKiBIT01FX0hFUk9fTEFZT1VUX0ZJWF9WMjlfRU5EICovCg==
'@

  $fixCss = Decode-Base64Utf8 -Encoded ($cssBase64.Trim())
  $globalsContent = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

  $markerPattern = '(?s)/\* HOME_HERO_LAYOUT_FIX_V29_START \*/.*?/\* HOME_HERO_LAYOUT_FIX_V29_END \*/'

  if ([Regex]::IsMatch($globalsContent, $markerPattern)) {
    $globalsContent = [Regex]::Replace(
      $globalsContent,
      $markerPattern,
      $fixCss.Trim()
    )
  }
  else {
    $globalsContent = $globalsContent.TrimEnd() +
      [Environment]::NewLine +
      [Environment]::NewLine +
      $fixCss.Trim() +
      [Environment]::NewLine
  }

  Write-Utf8NoBom -Path $globalsPath -Content $globalsContent

  $nextPath = Join-Path $root ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "已清理 .next 缓存。" -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "正在运行 npm run build……" -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "构建失败。"
  }

  Write-Host ""
  Write-Host "执行完成：" -ForegroundColor Green
  Write-Host " - 首页视频保持不变"
  Write-Host " - 标题、副标题和按钮样式已恢复"
  Write-Host " - 内容区重新居中并限制为 1600px"
  Write-Host " - 修正了 min() 宽度写法"
  Write-Host " - 桌面端与手机端布局已分别处理"
  Write-Host " - npm run build 已通过"
}
catch {
  Write-Host ""
  Write-Host "执行失败：$($_.Exception.Message)" -ForegroundColor Red
  Write-Host "正在恢复本次修改……" -ForegroundColor Yellow

  if (Test-Path -LiteralPath $globalsBackup) {
    Copy-Item -LiteralPath $globalsBackup -Destination $globalsPath -Force
  }

  Write-Host "本次修改已恢复。" -ForegroundColor Yellow
  throw
}
