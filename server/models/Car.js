import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  type: {
    type: String,
    required: [true, 'Car type is required'],
    enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Sports', 'Van', 'Truck'],
    default: 'Sedan'
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [0, 'Price cannot be negative']
  },
  available: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String,
    required: true
  }],
  features: [{
    type: String
  }],
  specifications: {
    seats: {
      type: Number,
      required: true,
      min: 2,
      max: 12
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'],
      required: true
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      required: true
    },
    mileage: {
      type: String,
      required: true
    },
    airConditioning: {
      type: Boolean,
      default: true
    }
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
carSchema.index({ type: 1, location: 1, available: 1 });

const Car = mongoose.model('Car', carSchema);

export default Car;
