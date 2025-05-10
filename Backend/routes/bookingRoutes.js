const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create a new booking
router.post('/', auth, bookingController.createBooking);

// Get all bookings (admin only)
router.get('/all', [auth, admin], bookingController.getAllBookings);

// Get user's bookings
router.get('/user/:userId', auth, bookingController.getUserBookings);

// Get a specific booking by id
router.get('/:bookingId', auth, bookingController.getBookingById);

// Update booking status (admin only)
router.patch('/:bookingId/status', [auth, admin], bookingController.updateBookingStatus);

// Cancel booking (user or admin)
router.patch('/:bookingId/cancel', auth, bookingController.cancelBooking);

// Get bookings for a specific car
router.get('/car/:carId', auth, bookingController.getCarBookings);

module.exports = router;
