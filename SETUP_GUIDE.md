# Quick Setup Guide - Car Rental Platform

## Current Issue
The `npm install` is running in the background. If it's taking too long, you can manually install dependencies.

## Solution: Manual Installation

### Option 1: Wait for Current Installation
The command `npm install --legacy-peer-deps` is currently running in the client directory. Please wait for it to complete (may take 5-10 minutes).

### Option 2: Manual Installation Steps

If the installation is stuck, follow these steps:

**1. Open a NEW terminal/command prompt**

**2. Navigate to client directory:**
```bash
cd c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\client
```

**3. Clear any partial installation:**
```bash
rmdir /s /q node_modules
del package-lock.json
```

**4. Install dependencies:**
```bash
npm install --legacy-peer-deps
```

**5. Wait for installation to complete** (this will take a few minutes)

**6. Once complete, start the dev server:**
```bash
npm run dev
```

## Backend Setup

**1. Open ANOTHER terminal**

**2. Navigate to server directory:**
```bash
cd c:\Users\SAPTARSHI\OneDrive\Desktop\ca5thsem\server
```

**3. Install dependencies (if not already done):**
```bash
npm install
```

**4. Seed the database:**
```bash
npm run seed
```

**5. Start the server:**
```bash
npm run dev
```

## Prerequisites Checklist

Before running the application, ensure you have:

- [ ] **Node.js** installed (v16 or higher)
- [ ] **MongoDB** installed and running locally OR MongoDB Atlas connection string
- [ ] **PayPal Sandbox** account credentials (optional for testing payments)

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=car_rental_jwt_secret_2024
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## MongoDB Setup

### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/car-rental`

### Option B: MongoDB Atlas (Cloud)
1. Create free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env

## Running the Application

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

## Troubleshooting

### "vite is not recognized"
- Dependencies not installed
- Run `npm install` in client directory
- Wait for completion

### "Cannot connect to MongoDB"
- MongoDB not running
- Check connection string in .env
- Start MongoDB service

### "Module not found"
- Dependencies not fully installed
- Delete node_modules and package-lock.json
- Run `npm install` again

### Port already in use
- Change PORT in server/.env
- Change port in client/vite.config.js
- Update CORS_ORIGIN accordingly

## Next Steps After Installation

1. **Seed Database**: `npm run seed` in server directory
2. **Start Backend**: `npm run dev` in server directory
3. **Start Frontend**: `npm run dev` in client directory
4. **Open Browser**: Navigate to http://localhost:5173
5. **Register Account**: Create a new user account
6. **Browse Cars**: View and filter available cars
7. **Test Booking**: Complete a booking flow

## File Structure Verification

Ensure these directories exist:
```
ca5thsem/
├── client/
│   ├── node_modules/     ← Should appear after npm install
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── node_modules/     ← Should appear after npm install
    ├── models/
    ├── routes/
    ├── package.json
    └── server.js
```

## Quick Test

After both servers are running:

1. Open http://localhost:5173
2. You should see the home page
3. Click "Browse Cars"
4. You should see the car listing

If you see errors, check:
- Both servers are running
- MongoDB is connected
- No port conflicts
- Environment variables are set

## Need Help?

Check the comprehensive README.md and walkthrough.md files in the project root for detailed documentation.
