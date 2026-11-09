@echo off
chcp 65001 >nul
title DATG CORP - TRỤ SỞ ĐIỀU HÀNH 418 AI AGENT (MAX TURBO APP)
cls

echo =====================================================================
echo              TẬP ĐOÀN DATG CORP - THƯ KÝ TRƯỞNG DICON
echo        HỆ THỐNG ĐIỀU HÀNH VĂN PHÒNG 3D CAO CẤP (NATIVE APP)
echo =====================================================================
echo.
echo [*] Dang kich hoat Che do Tang toc GPU phan cung 120 FPS MAX TURBO...
echo [*] Dang ket noi vao Tru so Chinh: https://office.raumaduongtau.online
echo.

set URL=https://office.raumaduongtau.online
set FLAGS=--app=%URL% --start-maximized --enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --force_high_performance_gpu --enable-features=VaapiVideoDecoder,CanvasOopRasterization --disable-background-timer-throttling

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo [+] Khoi dong qua Google Chrome Ultra App Engine...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" %FLAGS%
    exit
)

if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo [+] Khoi dong qua Microsoft Edge Ultra App Engine...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" %FLAGS%
    exit
)

start "" %URL%
exit
