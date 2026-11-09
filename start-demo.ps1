[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "  DATG CORP - 3D VIRTUAL AI AGENT OFFICE (DEMO MODE)" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "Đang khởi động chế độ DEMO sinh động tại http://127.0.0.1:5190..." -ForegroundColor Green

Set-Location $PSScriptRoot
$env:MSC_LANG = "vi"
$env:MSC_DEMO = "1"
Start-Process "http://127.0.0.1:5190"
node server/hub.ts
