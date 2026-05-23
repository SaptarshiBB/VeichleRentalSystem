import express from 'express';
import { cars, findCarById } from '../data/store.js';
import { protect, admin } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import { usingMemoryStore } from '../config/database.js';
import { findBookings } from '../data/store.js';

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

// @route   GET /api/cars
// @desc    Get all cars with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, location, available, minPrice, maxPrice, search, startDate, endDate } = req.query;

    // Filter cars based on query parameters
    let filteredCars = [...cars];

    if (type) {
      filteredCars = filteredCars.filter(car => car.type === type);
    }

    if (location) {
      filteredCars = filteredCars.filter(car => car.location === location);
    }

    if (available !== undefined) {
      filteredCars = filteredCars.filter(car => car.available === (available === 'true'));
    }

    if (minPrice) {
      filteredCars = filteredCars.filter(car => car.pricePerDay >= Number(minPrice));
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter(car => car.pricePerDay <= Number(maxPrice));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(searchLower) || 
        car.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date availability if dates are provided
    if (startDate && endDate) {
      // Get all active bookings
      const allBookings = usingMemoryStore() ? findBookings({
        status: { $in: ['pending', 'confirmed', 'active'] }
      }) : await Booking.find({
        status: { $in: ['pending', 'confirmed', 'active'] }
      });

      // Filter out cars that have conflicting bookings
      filteredCars = filteredCars.filter(car => {
        const carBookings = allBookings.filter(b => b.car === car._id);
        const hasConflict = carBookings.some(booking =>
          checkDateConflict(startDate, endDate, booking.startDate, booking.endDate)
        );
        return !hasConflict;
      });
    }

    res.json({
      success: true,
      count: filteredCars.length,
      data: filteredCars
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/cars/types/list
// @desc    Get all unique car types
// @access  Public
router.get('/types/list', async (req, res) => {
  try {
    const types = [...new Set(cars.map(car => car.type))];
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    console.error('Get car types error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/cars/locations/list
// @desc    Get all unique locations
// @access  Public
router.get('/locations/list', async (req, res) => {
  try {
    const locations = [...new Set(cars.map(car => car.location))].sort();
    
    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/cars/:id
// @desc    Get single car by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const car = findCarById(req.params.id);

    if (!car) {
      return res.status(404).json({ 
        success: false, 
        message: 'Car not found' 
      });
    }

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/cars
// @desc    Create a new car
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const newCar = {
      _id: String(cars.length + 1),
      ...req.body,
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
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/cars/:id
// @desc    Update car
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const index = cars.findIndex(c => c._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Car not found' 
      });
    }

    cars[index] = { ...cars[index], ...req.body };

    res.json({
      success: true,
      message: 'Car updated successfully',
      data: cars[index]
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete car
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const index = cars.findIndex(c => c._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Car not found' 
      });
    }

    cars.splice(index, 1);

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

export default router;

