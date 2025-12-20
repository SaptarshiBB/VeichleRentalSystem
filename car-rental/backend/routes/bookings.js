const express = require('express');
const router = express.Router();

// Create booking
router.post('/', (req, res) => {
    res.send('Create booking route');
});

// Get user bookings
router.get('/mybookings', (req, res) => {
    res.send('Get my bookings');
});

module.exports = router;
