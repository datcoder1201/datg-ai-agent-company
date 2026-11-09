[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "  DATG CORP - 3D VIRTUAL AI AGENT OFFICE & 418 SWARM HUB" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "Đang khởi động máy chủ Hub DatG Corp tại http://127.0.0.1:5190..." -ForegroundColor Green

Set-Location $PSScriptRoot
$env:MSC_LANG = "vi"
Start-Process "http://127.0.0.1:5190"
node server/hub.ts
