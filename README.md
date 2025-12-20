# Car Yatra - Vehicle Rental Platform Across India

A full-stack vehicle rental platform for India built with **Vite + React**, **Tailwind CSS**, **Node.js**, **Express**, and **WebSockets**. Rent cars, SUVs, trucks, buses, and traveller vehicles across major Indian cities.

## 🚀 Key Features

### 🔐 User Management
- ✅ **User Registration & Validation** - Complete registration with email, phone (10-digit Indian format), and password validation
- ✅ **JWT Authentication** - Secure token-based authentication system
- ✅ **User Dashboard** - View booking history, profile, and payment status.

### 🚗 Vehicle Browsing & Filtering
- ✅ **70+ Vehicles** - Cars, SUVs, trucks, buses, and traveller vehicles
- ✅ **Real-Time Availability** - WebSocket updates for instant availability status
- ✅ **Advanced Filtering**:
  - Filter by **vehicle type** (Sedan, SUV, Hatchback, Truck, Traveller, Bus, Luxury)
  - Filter by **location** (30+ Indian cities across 20+ states)
  - Filter by **price range** (₹800 - ₹8,000/day)
  - Filter by **availability** (Available only or All vehicles)
  - **Search** by brand or model name

### 📅 Booking System
- ✅ **Date Selection** - Calendar-based rental duration picker
- ✅ **Location Selection** - Choose pickup and return locations
- ✅ **Price Calculation** - Automatic total price calculation based on rental days
- ✅ **Booking Management** - View, track, and cancel bookings

### 💳 Payment & Security
- ✅ **PayPal Integration** - Secure payment processing
- ✅ **Payment Verification** - Order tracking and verification
- ✅ **Encrypted Passwords** - bcrypt password hashing
- ✅ **Protected Routes** - Role-based access control

### 🌍 Indian Localization
- ✅ **Indian Rupees (₹)** - All prices in INR
- ✅ **30+ Indian Cities** - Mumbai, Delhi, Bengaluru, Chennai, and more
- ✅ **Indian Vehicles** - Popular Indian brands (Maruti, Tata, Mahindra, etc.)
- ✅ **Indian Phone Validation** - 10-digit number format

### 🎨 User Experience
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ✅ **Premium UI** - Modern design with car rental background imagery
- ✅ **Real-time Updates** - Live availability status with visual indicators
- ✅ **Smooth Animations** - Enhanced user interactions

> 📖 **For detailed feature documentation, see [FEATURES.md](./FEATURES.md)**

## 📁 Project Structure

```
ca5thsem/
├── client/                 # Frontend (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API and WebSocket services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend (Node.js + Express + MongoDB)
    ├── models/            # MongoDB schemas
    ├── routes/            # API routes
    ├── middleware/        # Auth & validation
    ├── websocket/         # WebSocket server
    ├── seed/              # Database seeding
    ├── server.js          # Main server file
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- PayPal Sandbox Account (for testing payments)

### 1. Clone the Repository

```bash
cd ca5thsem
```

### 2. Backend Setup

```bash
cd server
npm install
```

**Configure Environment Variables:**

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/caryatri

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# PayPal (Sandbox)
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
PAYPAL_MODE=sandbox

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Seed the Database:**

```bash
npm run seed
```

**Start the Server:**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../client
npm install
```

**Configure Environment Variables:**

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

**Start the Development Server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔑 PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create a Sandbox account
3. Get your **Client ID** and **Secret**
4. Add them to your `.env` files

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (admin)
- `PUT /api/cars/:id` - Update car (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Payment
- `POST /api/payment/create-order` - Create PayPal order
- `POST /api/payment/capture-order` - Capture payment
- `GET /api/payment/verify/:orderId` - Verify payment

## 🌐 WebSocket Events

- `connection` - Connection status
- `car_update` - Real-time car availability updates
- `booking_notification` - Booking notifications
- `subscribe_car` - Subscribe to specific car updates
- `unsubscribe_car` - Unsubscribe from car updates

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **PayPal React SDK** - Payment integration
- **WebSocket** - Real-time updates

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **ws** - WebSocket library
- **PayPal SDK** - Payment processing

## 📝 Usage

1. **Register** - Create a new account
2. **Browse Vehicles** - View available vehicles with filters
3. **Select Vehicle** - Click on a vehicle to see details
4. **Book** - Choose dates and locations
5. **Pay** - Complete payment via PayPal
6. **Dashboard** - View your bookings

## 🔒 Security

- Passwords hashed with bcrypt
- JWT token authentication
- Protected API routes
- Secure PayPal integration
- Input validation and sanitization

## 🚀 Deployment

### Backend
- Deploy to Heroku, Railway, or DigitalOcean
- Use MongoDB Atlas for production database
- Set environment variables

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Update API URLs in environment variables

## 📄 License

MIT License

## 👨‍💻 Author

Created with ❤️ for travelers across India

---

**Happy Traveling! 🚗🚌🚛**
