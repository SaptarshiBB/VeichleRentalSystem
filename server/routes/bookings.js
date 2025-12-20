import express from 'express';
import Booking from '../models/Booking.js';
import { findCarById, cars } from '../data/store.js';
import { protect } from '../middleware/auth.js';
import { bookingValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Helper function to check if two date ranges overlap
const checkDateConflict = (start1, end1, start2, end2) => {
  // Normalize dates to midnight (start of day) to avoid time component issues
  const s1 = new Date(start1);
  s1.setHours(0, 0, 0, 0);
  
  const e1 = new Date(end1);
  e1.setHours(23, 59, 59, 999);
  
  const s2 = new Date(start2);
  s2.setHours(0, 0, 0, 0);
  
  const e2 = new Date(end2);
  e2.setHours(23, 59, 59, 999);
  
  // Two bookings conflict if they overlap
  // Conflict: (newStart <= existingEnd) AND (newEnd >= existingStart)
  return s1 <= e2 && e1 >= s2;
};

// @route   GET /api/bookings/check-availability/:carId
// @desc    Check if a car is available for specific dates
// @access  Public
router.get('/check-availability/:carId', async (req, res) => {
  try {
    const { carId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    // Find all active bookings for this car
    const existingBookings = await Booking.find({
      car: carId,
      status: { $in: ['pending', 'confirmed', 'active'] }
    });

    // Check for date conflicts
    const hasConflict = existingBookings.some(booking => 
      checkDateConflict(startDate, endDate, booking.startDate, booking.endDate)
    );

    if (hasConflict) {
      return res.json({
        success: true,
        available: false,
        message: 'Car is not available for the selected dates',
        conflictingBookings: existingBookings.filter(booking =>
          checkDateConflict(startDate, endDate, booking.startDate, booking.endDate)
        ).map(b => ({
          startDate: b.startDate,
          endDate: b.endDate
        }))
      });
    }

    res.json({
      success: true,
      available: true,
      message: 'Car is available for the selected dates'
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, bookingValidation, validate, async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation, returnLocation } = req.body;

    // Check if car exists and is available
    const car = findCarById(carId);
    
    if (!car) {
      return res.status(404).json({ 
        success: false, 
        message: 'Car not found' 
      });
    }

    if (!car.available) {
      return res.status(400).json({ 
        success: false, 
        message: 'Car is not available for booking' 
      });
    }

    // Calculate total days and price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (totalDays < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'End date must be after start date' 
      });
    }

    const totalPrice = totalDays * car.pricePerDay;

    // Check for date conflicts with existing bookings
    const existingBookings = await Booking.find({
      car: carId,
      status: { $in: ['pending', 'confirmed', 'active'] }
    });

    const hasConflict = existingBookings.some(booking => 
      checkDateConflict(startDate, endDate, booking.startDate, booking.endDate)
    );

    if (hasConflict) {
      return res.status(400).json({
        success: false,
        message: 'This vehicle is already booked for the selected dates. Please choose different dates.',
        conflictingBookings: existingBookings.filter(booking =>
          checkDateConflict(startDate, endDate, booking.startDate, booking.endDate)
        ).map(b => ({
          startDate: b.startDate,
          endDate: b.endDate
        }))
      });
    }

    // Create booking in MongoDB
    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      totalDays,
      totalPrice,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Add car and user details to response
    const bookingWithDetails = {
      ...booking.toObject(),
      car: car,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: bookingWithDetails
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/bookings/user/:userId
// @desc    Get all bookings for a user
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    // Ensure user can only access their own bookings
    if (req.user._id.toString() !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access these bookings' 
      });
    }

    const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
    
    // Add car details to each booking
    const bookingsWithDetails = bookings.map(booking => ({
      ...booking.toObject(),
      car: findCarById(booking.car)
    }));

    res.json({
      success: true,
      count: bookingsWithDetails.length,
      data: bookingsWithDetails
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Ensure user can only access their own booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this booking' 
      });
    }

    // Add car and user details
    const bookingWithDetails = {
      ...booking.toObject(),
      car: findCarById(booking.car),
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    };

    res.json({
      success: true,
      data: bookingWithDetails
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Ensure user can only update their own booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this booking' 
      });
    }

    // Update allowed fields
    const { status, paymentStatus, paypalOrderId, paypalPaymentId } = req.body;
    
    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (paypalOrderId) booking.paypalOrderId = paypalOrderId;
    if (paypalPaymentId) booking.paypalPaymentId = paypalPaymentId;

    const updatedBooking = await booking.save();

    // If booking is confirmed, update car availability
    if (status === 'confirmed') {
      const carIndex = cars.findIndex(c => c._id === booking.car);
      if (carIndex !== -1) {
        cars[carIndex].available = false;
      }
    }

    // If booking is cancelled, make car available again
    if (status === 'cancelled') {
      const carIndex = cars.findIndex(c => c._id === booking.car);
      if (carIndex !== -1) {
        cars[carIndex].available = true;
      }
    }

    // Add car and user details
    const bookingWithDetails = {
      ...updatedBooking.toObject(),
      car: findCarById(updatedBooking.car),
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    };

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: bookingWithDetails
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel/Delete booking
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Ensure user can only delete their own booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this booking' 
      });
    }

    // Make car available again
    const carIndex = cars.findIndex(c => c._id === booking.car);
    if (carIndex !== -1) {
      cars[carIndex].available = true;
    }

    // Delete booking from MongoDB
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

export default router;

