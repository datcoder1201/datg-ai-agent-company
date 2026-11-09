@echo off
chcp 65001 > nul
echo ===============================================================
echo   DATG CORP - 3D VIRTUAL AI AGENT OFFICE & 418 SWARM HUB
echo ===============================================================
echo Đang khởi động máy chủ Hub DatG Corp tại http://127.0.0.1:5190...
echo.
cd /d "%~dp0"
set MSC_LANG=vi
start "" http://127.0.0.1:5190
node server/hub.ts
pause
