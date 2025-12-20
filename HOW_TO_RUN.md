# How to Run and See Server Output

## Problem
You're unable to see the output when running `npm run dev` in the server directory.

## Solution: Run in Your Own Terminal

The best way to see the server output is to run it in your own terminal window:

### Step 1: Open Command Prompt or PowerShell

Press `Win + R`, type `cmd`, and press Enter

### Step 2: Navigate to Server Directory

```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
```

### Step 3: Run the Server

```bash
npm run dev
```

### Expected Output

You should see something like this:

```
🚗 ========================================
🚗  Car Rental Platform Server
🚗 ========================================
🚀 Server running on port 5000
🌍 Environment: development
📡 WebSocket server active
🔗 API URL: http://localhost:5000
🔗 Health Check: http://localhost:5000/api/health
🚗 ========================================

✅ MongoDB Connected: localhost
```

## Common Issues and Solutions

### Issue 1: MongoDB Connection Error

**Error:**
```
❌ Error connecting to MongoDB: connect ECONNREFUSED
```

**Solution:**
You need to install and start MongoDB:

**Option A: Install MongoDB Locally**
1. Download MongoDB Community Edition from mongodb.com
2. Install it
3. Start MongoDB service:
   ```bash
   net start MongoDB
   ```

**Option B: Use MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
   ```

### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
Change the port in `server/.env`:
```env
PORT=5001
```

Then update `client/.env`:
```env
VITE_API_URL=http://localhost:5001/api
VITE_WS_URL=ws://localhost:5001
```

### Issue 3: Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd server
npm install
```

## Running Both Server and Client

### Terminal 1 - Backend Server:
```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
npm run dev
```

Keep this terminal open and running.

### Terminal 2 - Frontend Client:
Open a NEW terminal:
```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\client
npm install
npm run dev
```

Keep this terminal open too.

### Terminal 3 - Seed Database (First Time Only):
Open another NEW terminal:
```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
npm run seed
```

This will populate the database with sample cars.

## Quick Test

Once both servers are running:

1. **Backend Test:**
   - Open browser: http://localhost:5000/api/health
   - You should see: `{"success":true,"message":"Car Rental API is running"}`

2. **Frontend Test:**
   - Open browser: http://localhost:5173
   - You should see the car rental home page

## Checking if Servers are Running

### Check Backend:
```bash
curl http://localhost:5000/api/health
```

Or open in browser: http://localhost:5000/api/health

### Check Frontend:
Open in browser: http://localhost:5173

## Logs and Debugging

### Server Logs
The server will show:
- ✅ MongoDB connection status
- 🚀 Server startup message
- 📡 WebSocket status
- API requests as they come in

### Client Logs
The client will show:
- Vite dev server URL
- Page loads and hot module replacement
- Any errors in the browser console (F12)

## Still Having Issues?

### Check MongoDB Status:
```bash
# Windows
net start MongoDB

# Or check if it's running
tasklist | findstr mongod
```

### Check Node.js Version:
```bash
node --version
```
Should be v16 or higher.

### Check npm Version:
```bash
npm --version
```

### View All Running Processes:
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

## Environment Variables Checklist

### server/.env
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=car_rental_jwt_secret_2024
PAYPAL_CLIENT_ID=test
PAYPAL_CLIENT_SECRET=test
PAYPAL_MODE=sandbox
CORS_ORIGIN=http://localhost:5173
```

### client/.env
```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
VITE_PAYPAL_CLIENT_ID=test
```

## Success Indicators

✅ **Server Running Successfully:**
- You see the car emoji banner
- MongoDB connected message
- No error messages
- Port 5000 is listening

✅ **Client Running Successfully:**
- Vite dev server starts
- Shows local URL (http://localhost:5173)
- No compilation errors
- Browser opens automatically or you can open it manually

## Next Steps After Both Are Running

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create an account
3. Browse cars
4. Test the booking flow

## Need More Help?

Check these files:
- `README.md` - Full project documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `walkthrough.md` - Complete feature walkthrough
