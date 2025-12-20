@echo off
echo ========================================
echo CarYatri MongoDB Setup
echo ========================================
echo.

REM Navigate to server directory
cd server

REM Check if .env exists
if exist .env (
    echo .env file already exists!
    echo.
    choice /C YN /M "Do you want to overwrite it"
    if errorlevel 2 goto :skip
)

REM Create .env file
echo Creating .env file...
(
echo # Server Configuration
echo PORT=5000
echo NODE_ENV=development
echo.
echo # MongoDB Configuration ^(Local^)
echo MONGODB_URI=mongodb://localhost:27017/caryatri
echo.
echo # JWT Secret ^(change this to a random string in production^)
echo JWT_SECRET=caryatri_secret_key_2024_change_in_production
echo.
echo # PayPal Configuration ^(Sandbox credentials for testing^)
echo PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
echo PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
echo PAYPAL_MODE=sandbox
echo.
echo # CORS Origin ^(Frontend URL^)
echo CORS_ORIGIN=http://localhost:5173
) > .env

echo.
echo ✅ .env file created successfully!
echo.

:skip
echo ========================================
echo Starting MongoDB Service...
echo ========================================
net start MongoDB
echo.

echo ========================================
echo MongoDB Compass Connection String:
echo ========================================
echo mongodb://localhost:27017/caryatri
echo.
echo Copy this connection string and paste it in MongoDB Compass
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo 1. Open MongoDB Compass
echo 2. Paste connection string: mongodb://localhost:27017/caryatri
echo 3. Click "Connect"
echo 4. Run: npm run dev
echo.

pause
