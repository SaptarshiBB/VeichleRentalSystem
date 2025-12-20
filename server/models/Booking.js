import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  car: {
    type: String,
    required: [true, 'Car is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  returnLocation: {
    type: String,
    required: [true, 'Return location is required']
  },
  totalDays: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paypalOrderId: {
    type: String,
    default: null
  },
  paypalPaymentId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Validate that end date is after start date
bookingSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ car: 1, startDate: 1, endDate: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
