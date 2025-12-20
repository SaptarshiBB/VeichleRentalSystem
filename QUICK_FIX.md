# Quick Fix Guide

## ✅ FIXED: PostCSS Configuration Error

I've fixed the PostCSS config file. The error was because it was using CommonJS syntax (`module.exports`) but the project uses ES modules.

**Fixed:** `postcss.config.js` now uses `export default` syntax.

## ⚠️ Port 5000 Already in Use

The server can't start because port 5000 is already being used by another process.

### Solution 1: Kill the Process Using Port 5000

**Find the process:**
```bash
netstat -ano | findstr :5000
```

**Kill it (replace PID with the actual process ID):**
```bash
taskkill /PID <PID> /F
```

### Solution 2: Change the Server Port (Easier)

**1. Edit `server/.env`:**
```env
PORT=5001
```

**2. Edit `client/.env`:**
```env
VITE_API_URL=http://localhost:5001/api
VITE_WS_URL=ws://localhost:5001
```

**3. Restart both servers**

## 🚀 How to Run Now

### Step 1: Start Backend (in one terminal)
```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
npm run dev
```

**Expected output:**
```
🚗 ========================================
🚗  Car Rental Platform Server
🚗 ========================================
🚀 Server running on port 5000 (or 5001)
✅ MongoDB Connected: localhost
```

### Step 2: Start Frontend (in another terminal)
```bash
cd C:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\client
npm run dev
```

**Expected output:**
```
VITE v7.2.7  ready in 702 ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser
Navigate to: **http://localhost:5173**

## 🔧 If MongoDB Error Occurs

If you see MongoDB connection error, you have two options:

### Option A: Install MongoDB Locally
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start the service
3. Use connection string: `mongodb://localhost:27017/car-rental`

### Option B: Use MongoDB Atlas (Recommended - Free Cloud)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
   ```

## ✅ Verification Checklist

- [ ] PostCSS error fixed (should be gone now)
- [ ] Port 5000 issue resolved (change port or kill process)
- [ ] MongoDB running (local or Atlas)
- [ ] Backend server running without errors
- [ ] Frontend server running without errors
- [ ] Can access http://localhost:5173 in browser

## 🎯 Next Steps After Everything Runs

1. **Seed the database** (first time only):
   ```bash
   cd server
   npm run seed
   ```

2. **Open the app**: http://localhost:5173

3. **Register an account**

4. **Browse cars and test booking!**

## Common Errors and Quick Fixes

| Error | Fix |
|-------|-----|
| Port already in use | Change PORT in .env or kill the process |
| PostCSS error | Already fixed! |
| MongoDB connection failed | Install MongoDB or use Atlas |
| Module not found | Run `npm install` in that directory |
| Cannot GET / | Make sure both servers are running |

## Still Having Issues?

Check these files for detailed help:
- `HOW_TO_RUN.md` - Detailed running instructions
- `SETUP_GUIDE.md` - Complete setup guide
- `README.md` - Full documentation
