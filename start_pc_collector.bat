@echo off
title DATG CORP - PHÓ CHỦ TỊCH COLLECTOR
echo ========================================================
echo        TAP DOAN DATG CORP - TRU SO 418 AI AGENT
echo        KHOI DONG DICON PC (PHO CHU TICH COLLECTOR)
echo ========================================================
echo.

cd /d "%~dp0"

if not exist .env (
    echo [Khoi tao .env cho Pho Chu Tich]
    echo MSC_PORT=5190> .env
    echo MSC_HOST=0.0.0.0>> .env
    echo MSC_TOKEN=datg2026>> .env
    echo MSC_MACHINE=LAPTOP>> .env
    echo MSC_ROLE=collector>> .env
    echo MSC_LANG=vi>> .env
)

echo Dang khoi dong Collector Node tren cong 5190...
node server/hub.ts

pause
