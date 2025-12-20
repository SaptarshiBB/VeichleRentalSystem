# 🚀 Quick Start Guide - MongoDB Setup

## You Have MongoDB Compass Installed ✅

Follow these simple steps to get your CarYatri platform working with MongoDB:

---

## Step 1: Run the Setup Script

I've created an automated setup script for you. Simply:

1. **Double-click** `setup-mongodb.bat` in your project folder
2. The script will:
   - Create the `.env` file with MongoDB configuration
   - Start MongoDB service
   - Show you the connection string

**OR** Run manually:
```cmd
cd c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem
setup-mongodb.bat
```

---

## Step 2: Connect MongoDB Compass

1. **Open MongoDB Compass**

2. **Paste this connection string:**
   ```
   mongodb://localhost:27017/caryatri
   ```

3. **Click "Connect"**

4. You should see:
   - Database: `caryatri`
   - Collections will appear after you register your first user

---

## Step 3: Create .env File (If Script Didn't Work)

If the script didn't create the `.env` file, create it manually:

1. Go to: `c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server\`

2. Create a new file named `.env` (note the dot at the start)

3. Copy and paste this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Local)
MONGODB_URI=mongodb://localhost:27017/caryatri

# JWT Secret (change this to a random string in production)
JWT_SECRET=caryatri_secret_key_2024_change_in_production

# PayPal Configuration (Sandbox credentials for testing)
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
PAYPAL_MODE=sandbox

# CORS Origin (Frontend URL)
CORS_ORIGIN=http://localhost:5173
```

4. **Save the file**

---

## Step 4: Start the Backend Server

Open a terminal in the server directory:

```cmd
cd c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚗 ========================================
🚗  Car Rental Platform Server
🚗 ========================================
🚀 Server running on port 5000
```

---

## Step 5: Start the Frontend

Open **another terminal** for the frontend:

```cmd
cd c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\client
npm run dev
```

---

## Step 6: Test Registration & Login

1. **Open browser:** http://localhost:5173

2. **Register a new user:**
   - Click "Register" or "Get Started"
   - Fill in:
     - Name: Your Name
     - Email: test@example.com
     - Phone: 9876543210
     - Password: password123
   - Click "Create Account"

3. **Check MongoDB Compass:**
   - Refresh the database
   - You should see `users` collection
   - Click on it to see your registered user

4. **Test Login:**
   - Logout if logged in
   - Click "Login"
   - Enter your email and password
   - You should be logged in!

---

## 🔍 Verify Everything is Working

### In MongoDB Compass:
- ✅ Database `caryatri` exists
- ✅ Collection `users` has your user
- ✅ Password is hashed (not plain text)

### In Browser:
- ✅ Can register new users
- ✅ Can login with credentials
- ✅ Dashboard shows logged-in user name
- ✅ Can browse vehicles
- ✅ Can make bookings

---

## 🚨 Troubleshooting

### MongoDB Service Not Starting?

**Error:** "The MongoDB service is not started"

**Solution:**
```cmd
# Try starting as administrator
net start MongoDB
```

If that doesn't work:
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB Server"
3. Right-click → Start

### Can't Connect in Compass?

**Error:** "Connection failed"

**Solutions:**
1. Make sure MongoDB service is running
2. Use connection string: `mongodb://localhost:27017/caryatri`
3. Check if port 27017 is not blocked

### Backend Won't Start?

**Error:** "MongooseServerSelectionError"

**Solutions:**
1. Make sure MongoDB service is running
2. Check `.env` file exists in `server` folder
3. Verify `MONGODB_URI` is correct

### Registration Not Working?

**Error:** "Server error during registration"

**Solutions:**
1. Check backend terminal for errors
2. Make sure MongoDB is connected
3. Verify all fields are filled correctly

---

## 📝 Quick Commands Reference

```cmd
# Start MongoDB Service
net start MongoDB

# Stop MongoDB Service
net stop MongoDB

# Start Backend
cd server
npm run dev

# Start Frontend
cd client
npm run dev

# View MongoDB in Compass
Connection: mongodb://localhost:27017/caryatri
```

---

## ✅ Success Checklist

- [ ] MongoDB service is running
- [ ] MongoDB Compass is connected
- [ ] `.env` file exists in `server` folder
- [ ] Backend server is running (port 5000)
- [ ] Frontend is running (port 5173)
- [ ] Can register a new user
- [ ] Can see user in MongoDB Compass
- [ ] Can login with registered user
- [ ] Dashboard shows logged-in user

---

## 🎯 You're All Set!

Once all steps are complete, your CarYatri platform is fully functional with:
- ✅ MongoDB database
- ✅ User authentication
- ✅ Persistent data storage
- ✅ Working login/register
- ✅ User identification

**Happy Coding! 🚗💻**
