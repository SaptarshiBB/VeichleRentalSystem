@echo off
echo ==========================================
echo      CAR RENTAL APP - EMERGENCY FIX
echo ==========================================
echo.
echo 1. Stopping any running Node processes...
taskkill /F /IM node.exe >nul 2>&1
echo.

echo 2. Fixing BACKEND...
cd backend
if exist node_modules (
    echo    - Removing old backend node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json del package-lock.json
echo    - Installing backend dependencies (including jsonwebtoken)...
call npm install
cd ..
echo.

echo 3. Fixing FRONTEND...
cd frontend
if exist node_modules (
    echo    - Removing old frontend node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json del package-lock.json
echo    - Installing frontend dependencies (Tailwind v3)...
call npm install
cd ..
echo.

echo ==========================================
echo      REPAIR COMPLETE
echo ==========================================
echo.
echo You can now run: npm run dev
echo.
pause
