const Booking = require('../models/bookingSchema');
const User = require('../models/userSchema');
const Hypercar = require('../models/hypercarSchema');
const mongoose = require('mongoose');

// Create a new booking
const createBooking = async (req, res) => {
  console.log('Creating booking with data:', req.body);
  try {
    const { 
      userId, 
      carId, 
      startDate, 
      endDate, 
      pickupLocation, 
      dropoffLocation, 
      totalAmount, 
      specialRequests 
    } = req.body;

    // Validate required fields
    if (!userId || !carId || !startDate || !endDate || !pickupLocation || !dropoffLocation || !totalAmount) {
      return res.status(400).json({ message: 'Missing required booking information' });
    }

    // Validate that car exists and is available
    const car = await Hypercar.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    if (!car.availability.isAvailable) {
      return res.status(400).json({ message: 'Car is currently unavailable for booking' });
    }

    // Check if car is already booked for the requested dates
    const conflictingBooking = await Booking.findOne({
      car: carId,
      status: { $in: ['CONFIRMED', 'ACTIVE'] },
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Car is already booked for the selected dates' });
    }

    // Create the new booking
    const newBooking = new Booking({
      user: userId,
      car: carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      pickupLocation,
      dropoffLocation,
      totalAmount,
      specialRequests,
      status: 'PENDING'
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Update user's bookings array
    await User.findByIdAndUpdate(userId, {
      $push: { bookings: savedBooking._id }
    });

    // Update car's bookings array
    await Hypercar.findByIdAndUpdate(carId, {
      $push: { bookings: savedBooking._id }
    });

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email phoneNumber')
      .populate('car', 'make model year images');
      
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const bookings = await Booking.find({ user: userId })
      .populate('car', 'make model year images specifications availability')
      .sort({ createdAt: -1 });
      
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific booking by id
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    
    const booking = await Booking.findById(bookingId)
      .populate('user', 'firstName lastName email phoneNumber')
      .populate('car', 'make model year images specifications availability');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
      
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, paymentStatus } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    
    const updates = {};
    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: updates },
      { new: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // If booking is cancelled, update car availability accordingly
    if (status === 'CANCELLED') {
      await Hypercar.findByIdAndUpdate(updatedBooking.car, {
        'availability.isAvailable': true
      });
    }
      
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { cancellationReason } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking can be cancelled (not allowed for completed bookings)
    if (booking.status === 'COMPLETED') {
      return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    }
    
    // Update the booking
    booking.status = 'CANCELLED';
    booking.cancellationReason = cancellationReason;
    
    const updatedBooking = await booking.save();
    
    // Update car availability
    await Hypercar.findByIdAndUpdate(booking.car, {
      'availability.isAvailable': true
    });
      
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bookings for a specific car
const getCarBookings = async (req, res) => {
  try {
    const { carId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: 'Invalid car ID' });
    }
    
    const bookings = await Booking.find({ 
      car: carId,
      status: { $in: ['CONFIRMED', 'ACTIVE'] }
    })
    .select('startDate endDate status');
      
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching car bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getCarBookings
};
