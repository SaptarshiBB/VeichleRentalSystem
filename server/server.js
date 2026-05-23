import express from 'express';
import { createServer } from 'http';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { initWebSocket } from './websocket/index.js';
import { seedDefaultUsers } from './data/store.js';

// Import routes
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import bookingRoutes from './routes/bookings.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

// Initialize Express app
const app = express();
const server = createServer(app);
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Connect to MongoDB
await connectDB();
await seedDefaultUsers();

// Initialize WebSocket
initWebSocket(server);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Car Rental API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Car Rental Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      cars: '/api/cars',
      bookings: '/api/bookings',
      payment: '/api/payment',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. The backend is probably already running at http://localhost:${PORT}`);
    process.exit(0);
  }

  console.error('Server startup error:', err);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('Car Rental Platform Server');
  console.log('========================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('WebSocket server active');
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log('========================================');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
