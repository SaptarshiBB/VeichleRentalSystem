const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a car (Admin)
router.post('/', async (req, res) => {
    // Logic to add car
    res.send('Create car route');
});

module.exports = router;
