@echo off
chcp 65001 >nul
title DATG CORP - PHÓ CHỦ TỊCH COLLECTOR NODE
cls

echo =====================================================================
echo              TẬP ĐOÀN DATG CORP - THƯ KÝ TRƯỞNG DICON
echo        KHỞI ĐỘNG DICON PC (PHÓ CHỦ TỊCH - COLLECTOR NODE)
echo =====================================================================
echo.

cd /d "%~dp0"

if not exist .env (
    echo [*] Khoi tao file .env danh rieng cho May Pho Chu Tich...
    (
        echo MSC_PORT=5190
        echo MSC_HOST=0.0.0.0
        echo MSC_TOKEN=datg2026
        echo MSC_MACHINE=LAPTOP
        echo MSC_ROLE=collector
        echo MSC_LANG=vi
    ) > .env
)

echo [*] Cap nhat ma nguon moi nhat tu GitHub DatG Corp...
git pull origin main

echo.
echo [*] Dang khoi dong Collector Node tren cong 5190...
echo     (Node nay se gui telemetry GPU RTX 5060 va tien trinh Agent ve Tru so)
echo.

:: Khoi dong cloudflared tunnel neu co san tren may PC
where cloudflared >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [+] Phat hien cloudflared! Dang mo Cloudflare Quick Tunnel cho cong 5190...
    start "Cloudflare Tunnel - PC Collector" cmd /k "cloudflared tunnel --url http://localhost:5190"
    echo [!] Chu y: Copy duong link https://...trycloudflare.com tu cua so moi mo gui cho Dicon Laptop nhe!
) else (
    echo [-] Khong tim thay cloudflared.exe trong PATH.
    echo     Neu 2 may chung WiFi/LAN, chi can dung IP may nay.
)

echo.
echo [+] Dang chay Collector Server... Nhan Ctrl+C de dung.
node server/hub.ts
pause
