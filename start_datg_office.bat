@echo off
title DATG CORP - 3D Virtual Office & Cloudflare Tunnel
echo ========================================================
echo        TAP DOAN DATG CORP - TRU SO 418 AI AGENT
echo      Khoi dong Hub & Cloudflare Tunnel: office.raumaduongtau.online
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Dang chay Cloudflare Tunnel...
start "Cloudflare Tunnel (office.raumaduongtau.online)" /min "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel run datg-office

echo [2/2] Dang khoi dong Hub Server (Port 5190)...
node server/hub.ts

pause
