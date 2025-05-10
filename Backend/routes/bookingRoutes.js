const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/bookingSchema'); 
const Car = require('../models/hypercarSchema');
const User = require('../models/userSchema');

// Get all bookings for the current user
router.get('/', auth, async (req, res) => {
  try {
    // Find bookings for the current user
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('carId');

    // Format the response data
    const formattedBookings = await Promise.all(bookings.map(async (booking) => {
      // Get car details
      const car = await Car.findById(booking.carId);
      
      // Calculate duration in days
      const pickupDate = new Date(booking.pickup.date);
      const dropoffDate = new Date(booking.dropoff.date);
      const durationMs = dropoffDate - pickupDate;
      const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
      
      // Check if pickup is within next 24 hours
      const now = new Date();
      const requiresAction = 
        booking.status === 'active' && 
        pickupDate > now && 
        (pickupDate - now) < (24 * 60 * 60 * 1000);
      
      return {
        id: booking._id,
        carId: booking.carId._id,
        car: {
          name: `${car.make} ${car.model}`,
          year: car.year,
          image: car.images[0],
          type: car.type
        },
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        price: booking.totalPrice,
        duration: `${durationDays} ${durationDays === 1 ? 'day' : 'days'}`,
        status: booking.status,
        requiresAction,
        createdAt: booking.createdAt
      };
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }
    
    // Get car details
    const car = await Car.findById(booking.carId);
    
    // Format booking with car details
    const formattedBooking = {
      id: booking._id,
      carId: booking.carId,
      car: {
        name: `${car.make} ${car.model}`,
        year: car.year,
        image: car.images[0],
        type: car.type
      },
      pickup: booking.pickup,
      dropoff: booking.dropoff,
      price: booking.totalPrice,
      status: booking.status,
      createdAt: booking.createdAt
    };
    
    res.json(formattedBooking);
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel a booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to modify this booking' });
    }
    
    // Check if booking can be cancelled (not already completed)
    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    }
    
    // Update status to cancelled
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully', status: 'cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { carId, pickup, dropoff, payment } = req.body;
    
    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    // Check if car is available for the selected dates
    const conflictingBookings = await Booking.find({
      carId: carId,
      status: { $in: ['active', 'upcoming'] },
      $or: [
        { 'pickup.date': { $lte: new Date(dropoff.date), $gte: new Date(pickup.date) } },
        { 'dropoff.date': { $lte: new Date(dropoff.date), $gte: new Date(pickup.date) } },
        { 
          $and: [
            { 'pickup.date': { $lte: new Date(pickup.date) } },
            { 'dropoff.date': { $gte: new Date(dropoff.date) } }
          ]
        }
      ]
    });
    
    if (conflictingBookings.length > 0) {
      return res.status(400).json({ message: 'Car is not available for the selected dates' });
    }
    
    // Calculate duration and total price
    const pickupDate = new Date(pickup.date);
    const dropoffDate = new Date(dropoff.date);
    const durationMs = dropoffDate - pickupDate;
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    const totalPrice = car.pricePerDay * durationDays;
    
    // Create the booking
    const newBooking = new Booking({
      userId: req.user.id,
      carId: carId,
      pickup: pickup,
      dropoff: dropoff,
      totalPrice: totalPrice,
      paymentInfo: payment,
      status: 'upcoming'
    });
    
    await newBooking.save();
    
    // Add booking to user's bookings array
    const user = await User.findById(req.user.id);
    user.bookings.push(newBooking._id);
    await user.save();
    
    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: newBooking._id
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
