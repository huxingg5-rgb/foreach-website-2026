$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Get-Location).Path

$packagePath = Join-Path $root "package.json"
$heroPath = Join-Path $root "components\home\HomeHeroSection.tsx"
$globalsPath = Join-Path $root "app\globals.css"
$videoPath = Join-Path $root "public\images\home\foreach-company-intro.mp4"

foreach ($requiredPath in @(
  $packagePath,
  $heroPath,
  $globalsPath,
  $videoPath
)) {
  if (-not (Test-Path -LiteralPath $requiredPath)) {
    throw "没有找到必要文件：$requiredPath"
  }
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$heroBackup = $heroPath + "." + $stamp + ".bak"
$globalsBackup = $globalsPath + "." + $stamp + ".bak"

Copy-Item -LiteralPath $heroPath -Destination $heroBackup -Force
Copy-Item -LiteralPath $globalsPath -Destination $globalsBackup -Force

Write-Host "已备份：" -ForegroundColor Yellow
Write-Host "  $heroBackup"
Write-Host "  $globalsBackup"

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
  $heroBase64 = @'
Ly8g6L+Z5piv5YWz5LqOIGNvbXBvbmVudHMvaG9tZS9Ib21lSGVyb1NlY3Rpb24udHN4IOeahOaWh+S7tu+8mueUqOS6jueuoeeQhummlumhteesrOS4gOWxjyBIZXJvIOmmluWxj+WGheWuuQovLyDov5nkuKrmlofku7bnmoTkvZznlKjvvJrmiorpppbpobXpppblsY/ku44gSG9tZVBhZ2VDb250ZW50LnRzeCDkuK3mi4blh7rmnaXvvIzmlrnkvr/lkI7nu63nu7TmiqQKCmltcG9ydCBMaW5rIGZyb20gIm5leHQvbGluayI7CgppbXBvcnQgewogIGdldExvY2FsZUFuY2hvclBhdGgsCiAgaG9tZUkxOG4sCiAgdHlwZSBMb2NhbGVDb2RlLAp9IGZyb20gIkAvbGliL2kxOG4iOwoKdHlwZSBIb21lSGVyb1NlY3Rpb25Qcm9wcyA9IHsKICBsb2NhbGU6IExvY2FsZUNvZGU7Cn07CgpleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lSGVyb1NlY3Rpb24oewogIGxvY2FsZSwKfTogSG9tZUhlcm9TZWN0aW9uUHJvcHMpIHsKICBjb25zdCBob21lVGV4dCA9IGhvbWVJMThuW2xvY2FsZV07CgogIGNvbnN0IHByb2R1Y3RzSHJlZiA9IGdldExvY2FsZUFuY2hvclBhdGgoCiAgICBsb2NhbGUsCiAgICAicHJvZHVjdHMiLAogICk7CgogIGNvbnN0IGNvbnRhY3RIcmVmID0gZ2V0TG9jYWxlQW5jaG9yUGF0aCgKICAgIGxvY2FsZSwKICAgICJjb250YWN0IiwKICApOwoKICByZXR1cm4gKAogICAgPHNlY3Rpb24KICAgICAgY2xhc3NOYW1lPSJob21lLWhlcm8iCiAgICAgIGlkPSJob21lIgogICAgPgogICAgICA8dmlkZW8KICAgICAgICBjbGFzc05hbWU9ImhvbWUtaGVyby12aWRlbyIKICAgICAgICBhdXRvUGxheQogICAgICAgIG11dGVkCiAgICAgICAgbG9vcAogICAgICAgIHBsYXlzSW5saW5lCiAgICAgICAgcHJlbG9hZD0iYXV0byIKICAgICAgICBhcmlhLWhpZGRlbj0idHJ1ZSIKICAgICAgICB0YWJJbmRleD17LTF9CiAgICAgICAgZGlzYWJsZVBpY3R1cmVJblBpY3R1cmUKICAgICAgPgogICAgICAgIDxzb3VyY2UKICAgICAgICAgIHNyYz0iL2ltYWdlcy9ob21lL2ZvcmVhY2gtY29tcGFueS1pbnRyby5tcDQiCiAgICAgICAgICB0eXBlPSJ2aWRlby9tcDQiCiAgICAgICAgLz4KICAgICAgPC92aWRlbz4KCiAgICAgIDxkaXYKICAgICAgICBjbGFzc05hbWU9ImhvbWUtaGVyby1vdmVybGF5IgogICAgICAgIGFyaWEtaGlkZGVuPSJ0cnVlIgogICAgICAvPgoKICAgICAgPGRpdiBjbGFzc05hbWU9ImhvbWUtaGVyby1pbm5lciI+CiAgICAgICAgPGgxIGNsYXNzTmFtZT0iaG9tZS1oZXJvLXRpdGxlIj4KICAgICAgICAgIHtob21lVGV4dC5oZXJvVGl0bGVMaW5lMX0KCiAgICAgICAgICA8YnIgLz4KCiAgICAgICAgICB7aG9tZVRleHQuaGVyb1RpdGxlTGluZTJ9CiAgICAgICAgPC9oMT4KCiAgICAgICAgPHAgY2xhc3NOYW1lPSJob21lLWhlcm8tc3VidGl0bGUiPgogICAgICAgICAge2hvbWVUZXh0Lmhlcm9TdWJ0aXRsZX0KICAgICAgICA8L3A+CgogICAgICAgIDxkaXYgY2xhc3NOYW1lPSJob21lLWhlcm8tYWN0aW9ucyI+CiAgICAgICAgICA8TGluawogICAgICAgICAgICBocmVmPXtwcm9kdWN0c0hyZWZ9CiAgICAgICAgICAgIGNsYXNzTmFtZT0iaG9tZS1oZXJvLWJ0biBob21lLWhlcm8tYnRuLXByaW1hcnkiCiAgICAgICAgICA+CiAgICAgICAgICAgIHtob21lVGV4dC5wcm9kdWN0QnV0dG9ufQogICAgICAgICAgPC9MaW5rPgoKICAgICAgICAgIDxMaW5rCiAgICAgICAgICAgIGhyZWY9e2NvbnRhY3RIcmVmfQogICAgICAgICAgICBjbGFzc05hbWU9ImhvbWUtaGVyby1idG4gaG9tZS1oZXJvLWJ0bi1zZWNvbmRhcnkiCiAgICAgICAgICA+CiAgICAgICAgICAgIHtob21lVGV4dC5jb250YWN0QnV0dG9ufQogICAgICAgICAgPC9MaW5rPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvc2VjdGlvbj4KICApOwp9Cg==
'@

  $cssBase64 = @'
LyogSE9NRV9IRVJPX1ZJREVPX1YyN19TVEFSVCAqLwovKiDpppbpobXpppblsY/vvJrnm7TmjqXkvb/nlKggTVA077yM5LiN5pi+56S6IGhlcm8tYmcud2VicCDlsIHpnaLlm74gKi8KLmhvbWUtaGVybyB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIG92ZXJmbG93OiBoaWRkZW47CiAgYmFja2dyb3VuZC1jb2xvcjogIzE3MzM2ODsKICBiYWNrZ3JvdW5kLWltYWdlOiBub25lICFpbXBvcnRhbnQ7Cn0KCi5ob21lLWhlcm8tdmlkZW8gewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICBpbnNldDogMDsKICB6LWluZGV4OiAwOwoKICBkaXNwbGF5OiBibG9jazsKICB3aWR0aDogMTAwJTsKICBoZWlnaHQ6IDEwMCU7CgogIG9iamVjdC1maXQ6IGNvdmVyOwogIG9iamVjdC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsKCiAgcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KCi5ob21lLWhlcm8tb3ZlcmxheSB7CiAgcG9zaXRpb246IGFic29sdXRlOwogIGluc2V0OiAwOwogIHotaW5kZXg6IDE7CgogIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgKICAgIDEzNWRlZywKICAgIHJnYmEoNywgMjYsIDUzLCAwLjQyKSAwJSwKICAgIHJnYmEoMjMsIDUxLCAxMDQsIDAuMjYpIDUyJSwKICAgIHJnYmEoMTAsIDM1LCA3NCwgMC4wOCkgMTAwJQogICk7CgogIHBvaW50ZXItZXZlbnRzOiBub25lOwp9CgouaG9tZS1oZXJvLWlubmVyIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgei1pbmRleDogMjsKfQoKQG1lZGlhIChtYXgtd2lkdGg6IDc2MHB4KSB7CiAgLmhvbWUtaGVyby12aWRlbyB7CiAgICBvYmplY3QtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7CiAgfQp9Ci8qIEhPTUVfSEVST19WSURFT19WMjdfRU5EICovCg==
'@

  $heroContent = Decode-Base64Utf8 -Encoded ($heroBase64.Trim())
  $videoCss = Decode-Base64Utf8 -Encoded ($cssBase64.Trim())

  Write-Utf8NoBom -Path $heroPath -Content $heroContent

  $globalsContent = Get-Content -LiteralPath $globalsPath -Raw -Encoding UTF8

  $markerPattern = '(?s)/\* HOME_HERO_VIDEO_V27_START \*/.*?/\* HOME_HERO_VIDEO_V27_END \*/'

  if ([Regex]::IsMatch($globalsContent, $markerPattern)) {
    $globalsContent = [Regex]::Replace(
      $globalsContent,
      $markerPattern,
      $videoCss.Trim()
    )
  }
  else {
    $globalsContent = $globalsContent.TrimEnd() +
      [Environment]::NewLine +
      [Environment]::NewLine +
      $videoCss.Trim() +
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
  Write-Host " - 首页 Banner 已改为 MP4 背景"
  Write-Host " - 未配置 poster，不会先显示 hero-bg.webp"
  Write-Host " - 视频自动播放、静音、循环、手机端内嵌播放"
  Write-Host " - 原标题、副标题和按钮保持在视频上方"
  Write-Host " - npm run build 已通过"
}
catch {
  Write-Host ""
  Write-Host "执行失败：$($_.Exception.Message)" -ForegroundColor Red
  Write-Host "正在恢复本次修改……" -ForegroundColor Yellow

  if (Test-Path -LiteralPath $heroBackup) {
    Copy-Item -LiteralPath $heroBackup -Destination $heroPath -Force
  }

  if (Test-Path -LiteralPath $globalsBackup) {
    Copy-Item -LiteralPath $globalsBackup -Destination $globalsPath -Force
  }

  Write-Host "本次修改已恢复。" -ForegroundColor Yellow
  throw
}
