@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (node tools/serve.mjs & exit /b)
where py >nul 2>nul
if %errorlevel%==0 (py -m http.server 5173 --bind 127.0.0.1 & exit /b)
echo Install Node.js LTS or Python 3, or use the hosted class page.
pause
