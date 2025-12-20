import express from 'express';
import User from '../models/User.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(admin);

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'confirmed' });
    
    // Calculate total revenue from completed bookings
    const completedBookings = await Booking.find({ paymentStatus: 'completed' });
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    // Get recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Manually add car details from in-memory store
    const { findCarById } = await import('../data/store.js');
    const bookingsWithCarDetails = recentBookings.map(booking => {
      const car = findCarById(booking.car);
      return {
        ...booking.toObject(),
        car: car ? {
          brand: car.brand,
          model: car.model,
          location: car.location
        } : null
      };
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalCars,
          totalBookings,
          activeBookings,
          totalRevenue
        },
        recentBookings: bookingsWithCarDetails
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (grant/revoke admin)
// @access  Private/Admin
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }

    // Prevent admin from removing their own admin role
    if (req.params.id === req.user._id.toString() && role === 'user') {
      return res.status(400).json({
        success: false,
        message: 'You cannot remove your own admin privileges'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's bookings
    await Booking.deleteMany({ user: req.params.id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User and associated bookings deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// @route   GET /api/admin/cars
// @desc    Get all cars (admin view with more details)
// @access  Private/Admin
router.get('/cars', async (req, res) => {
  try {
    // Import cars from in-memory store
    const { cars } = await import('../data/store.js');
    
    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars',
      error: error.message
    });
  }
});

// @route   POST /api/admin/cars
// @desc    Create a new car
// @access  Private/Admin
router.post('/cars', async (req, res) => {
  try {
    const { cars } = await import('../data/store.js');
    
    // Generate new ID
    const newId = String(Math.max(...cars.map(c => parseInt(c._id) || 0)) + 1);
    
    const newCar = {
      _id: newId,
      ...req.body,
      available: req.body.available !== undefined ? req.body.available : true,
      rating: req.body.rating || 4.5,
      totalBookings: 0,
      createdAt: new Date()
    };
    
    cars.push(newCar);
    
    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: newCar
    });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating car',
      error: error.message
    });
  }
});

// @route   PUT /api/admin/cars/:id
// @desc    Update car
// @access  Private/Admin
router.put('/cars/:id', async (req, res) => {
  try {
    const { cars } = await import('../data/store.js');
    const index = cars.findIndex(c => c._id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Update car while preserving certain fields
    cars[index] = {
      ...cars[index],
      ...req.body,
      _id: cars[index]._id, // Preserve ID
      totalBookings: cars[index].totalBookings, // Preserve booking count
      createdAt: cars[index].createdAt // Preserve creation date
    };
    
    res.json({
      success: true,
      message: 'Car updated successfully',
      data: cars[index]
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating car',
      error: error.message
    });
  }
});

// @route   DELETE /api/admin/cars/:id
// @desc    Delete car
// @access  Private/Admin
router.delete('/cars/:id', async (req, res) => {
  try {
    const { cars } = await import('../data/store.js');
    const index = cars.findIndex(c => c._id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    const deletedCar = cars.splice(index, 1)[0];
    
    res.json({
      success: true,
      message: 'Car deleted successfully',
      data: deletedCar
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting car',
      error: error.message
    });
  }
});

// @route   GET /api/admin/activity-logs
// @desc    Get user activity logs (sign-ins, sign-outs)
// @access  Private/Admin
router.get('/activity-logs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const action = req.query.action; // filter by action type

    const query = action ? { action } : {};

    const ActivityLog = (await import('../models/ActivityLog.js')).default;
    
    const logs = await ActivityLog.find(query)
      .populate('user', 'name email role')
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(query);

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activity logs',
      error: error.message
    });
  }
});

// @route   GET /api/admin/cars/:carId/analytics
// @desc    Get booking analytics for a specific car
// @access  Private/Admin
router.get('/cars/:carId/analytics', async (req, res) => {
  try {
    const { carId } = req.params;
    const { cars, findCarById } = await import('../data/store.js');
    
    // Get car details
    const car = findCarById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Get all bookings for this car
    const bookings = await Booking.find({ car: carId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    // Calculate revenue metrics
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const pendingRevenue = bookings
      .filter(b => b.paymentStatus === 'pending')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    // Get booking statistics
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const activeBookings = bookings.filter(b => ['pending', 'confirmed', 'active'].includes(b.status)).length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

    // Calculate total days booked
    const totalDaysBooked = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalDays, 0);

    res.json({
      success: true,
      data: {
        car,
        bookings,
        analytics: {
          totalRevenue,
          pendingRevenue,
          totalBookings,
          completedBookings,
          activeBookings,
          cancelledBookings,
          totalDaysBooked,
          averageBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0
        }
      }
    });
  } catch (error) {
    console.error('Get car analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching car analytics',
      error: error.message
    });
  }
});

export default router;
