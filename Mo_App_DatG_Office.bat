@echo off
chcp 65001 >nul
title DATG CORP - PHÒNG ĐIỀU HÀNH 3D SIÊU MƯỢT

set "URL=https://office.raumaduongtau.online"
set "CHROME_PATH=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "EDGE_PATH=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"

:: Cờ GPU ép xung hiển thị, tắt giới hạn FPS và kích hoạt tối đa RTX 5060
set "FLAGS=--app=%URL% --enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --disable-frame-rate-limit --force-gpu-mem-available-mb=4096"

if exist "%CHROME_PATH%" (
    start "" "%CHROME_PATH%" %FLAGS%
    exit
)

if exist "%EDGE_PATH%" (
    start "" "%EDGE_PATH%" %FLAGS%
    exit
)

start "" "%URL%"
exit
