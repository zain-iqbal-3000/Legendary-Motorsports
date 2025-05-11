const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/bookingSchema'); // Adjust path if needed

const router = express.Router();

// Create a new booking
router.post(
  '/',
  [
    body('user').isMongoId().withMessage('Valid user ID is required'),
    body('car').isMongoId().withMessage('Valid car ID is required'),
    body('startDate').isISO8601().toDate().withMessage('Valid start date is required'),
    body('endDate').isISO8601().toDate().withMessage('Valid end date is required'),
    body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
    body('dropoffLocation').notEmpty().withMessage('Dropoff location is required'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    body('status').optional().isIn(['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
    body('paymentStatus').optional().isIn(['PENDING', 'PAID', 'REFUNDED', 'FAILED']),
    body('paymentDetails.method').optional().isIn(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH']),
    body('specialRequests').optional().isString(),
    body('requiresAction').optional().isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email') // Customize fields as per your User model
      .populate('car', 'make model year'); // Customize fields as per your Hypercar model
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('car', 'make model year');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking by ID
router.put(
  '/:id',
  [
    // Optional validations for update
    body('status').optional().isIn(['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
    body('paymentStatus').optional().isIn(['PENDING', 'PAID', 'REFUNDED', 'FAILED']),
    body('paymentDetails.method').optional().isIn(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH']),
    body('requiresAction').optional().isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      console.error('Error updating booking:', error);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid booking ID' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate({
        path: 'car',
        select: 'make model year images specifications'
      })
      .populate({
        path: 'user',
        select: 'firstName lastName email'
      })
      .sort({ createdAt: -1 });

    // Map bookings to include all fields needed by frontend
    const mapped = bookings.map(b => ({
      _id: b._id,
      car: b.car,
      pickupLocation: b.pickupLocation,
      dropoffLocation: b.dropoffLocation,
      startDate: b.startDate,
      endDate: b.endDate,
      totalAmount: b.totalAmount,
      status: b.status,
      requiresAction: b.requiresAction,
      createdAt: b.createdAt
    }));

    res.json(mapped);
  } catch (error) {
    console.error('Error fetching bookings by user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
