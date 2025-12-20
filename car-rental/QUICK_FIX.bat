@echo off
echo ==========================================
echo   FIXING CAR RENTAL APP - ONE COMMAND
echo ==========================================
echo.

REM Stop the server if running
taskkill /F /IM node.exe >nul 2>&1

echo Step 1: Installing backend dependencies...
cd backend
call npm install jsonwebtoken@9.0.2 bcryptjs@2.4.3 --save
if errorlevel 1 (
    echo ERROR: Backend install failed!
    pause
    exit /b 1
)
cd ..

echo.
echo Step 2: Fixing frontend Tailwind issue...
cd frontend
if exist node_modules\tailwindcss (
    echo    Removing corrupted Tailwind...
    rmdir /s /q node_modules\tailwindcss
    rmdir /s /q node_modules\postcss
    rmdir /s /q node_modules\autoprefixer
)
echo    Installing correct versions...
call npm install tailwindcss@3.3.0 postcss@8.4.31 autoprefixer@10.4.15 --save-dev
if errorlevel 1 (
    echo ERROR: Frontend install failed!
    pause
    exit /b 1
)
cd ..

echo.
echo ==========================================
echo   FIX COMPLETE! Now run: npm run dev
echo ==========================================
pause
