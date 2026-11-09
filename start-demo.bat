@echo off
chcp 65001 > nul
echo ===============================================================
echo   DATG CORP - 3D VIRTUAL AI AGENT OFFICE (DEMO MODE)
echo ===============================================================
echo Đang khởi động chế độ DEMO với đầy đủ Agent mẫu, bàn làm việc,
echo lounge games, cafe, bi-a và màn hình trung tâm...
echo Web: http://127.0.0.1:5190
echo.
cd /d "%~dp0"
set MSC_LANG=vi
set MSC_DEMO=1
start "" http://127.0.0.1:5190
node server/hub.ts
pause
