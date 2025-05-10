const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hypercar',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'REFUNDED', 'FAILED'],
    default: 'PENDING'
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH'],
      default: 'CREDIT_CARD'
    },
    transactionId: String,
    cardLast4: String
  },
  specialRequests: {
    type: String
  },
  requiresAction: {
    type: Boolean,
    default: false
  },
  invoiceNumber: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Generate invoice number before saving
bookingSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const year = new Date().getFullYear();
    const counter = await mongoose.model('Booking').countDocuments() + 1;
    this.invoiceNumber = `INV-${year}-${counter.toString().padStart(5, '0')}`;
  }
  next();
});

// Calculate duration in days
bookingSchema.virtual('durationDays').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Calculate daily rate
bookingSchema.virtual('dailyRate').get(function() {
  return Math.round(this.totalAmount / this.durationDays);
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
