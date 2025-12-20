import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from '../models/Car.js';
import connectDB from '../config/database.js';

dotenv.config();

// Sample car data
const cars = [
  {
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: 'Sedan',
    location: 'New York',
    pricePerDay: 45,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800'
    ],
    features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'USB Ports'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '32 MPG',
      airConditioning: true
    },
    rating: 4.7
  },
  {
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    type: 'SUV',
    location: 'Los Angeles',
    pricePerDay: 65,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800'
    ],
    features: ['AWD', 'Sunroof', 'Apple CarPlay', 'Heated Seats', 'Lane Assist'],
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '28 MPG',
      airConditioning: true
    },
    rating: 4.8
  },
  {
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'Luxury',
    location: 'San Francisco',
    pricePerDay: 95,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800'
    ],
    features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharger Access'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: '358 miles range',
      airConditioning: true
    },
    rating: 4.9
  },
  {
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    type: 'Luxury',
    location: 'Miami',
    pricePerDay: 120,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    features: ['Leather Seats', 'Panoramic Roof', 'Premium Sound', 'Parking Assist'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      mileage: '25 MPG',
      airConditioning: true
    },
    rating: 4.6
  },
  {
    brand: 'Ford',
    model: 'Mustang',
    year: 2023,
    type: 'Sports',
    location: 'Las Vegas',
    pricePerDay: 110,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5f5d3e0c0?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
    ],
    features: ['Sport Mode', 'Premium Audio', 'Performance Tires', 'Track Apps'],
    specifications: {
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Petrol',
      mileage: '21 MPG',
      airConditioning: true
    },
    rating: 4.8
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    type: 'Hatchback',
    location: 'Chicago',
    pricePerDay: 40,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    features: ['Compact Design', 'Fuel Efficient', 'Bluetooth', 'Parking Sensors'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '35 MPG',
      airConditioning: true
    },
    rating: 4.5
  },
  {
    brand: 'Chevrolet',
    model: 'Suburban',
    year: 2023,
    type: 'Van',
    location: 'Houston',
    pricePerDay: 85,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
    ],
    features: ['3rd Row Seating', 'Towing Package', 'Entertainment System', 'Cargo Space'],
    specifications: {
      seats: 9,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '18 MPG',
      airConditioning: true
    },
    rating: 4.4
  },
  {
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    type: 'Sedan',
    location: 'Boston',
    pricePerDay: 75,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800'
    ],
    features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Interior', 'LED Headlights'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '30 MPG',
      airConditioning: true
    },
    rating: 4.7
  },
  {
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    type: 'SUV',
    location: 'Denver',
    pricePerDay: 80,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
    ],
    features: ['4x4', 'Removable Top', 'Off-Road Package', 'Winch Ready'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '22 MPG',
      airConditioning: true
    },
    rating: 4.6
  },
  {
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2024,
    type: 'Luxury',
    location: 'New York',
    pricePerDay: 130,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    features: ['Massage Seats', 'Burmester Sound', 'Ambient Lighting', 'Driver Assist'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mileage: '42 MPG',
      airConditioning: true
    },
    rating: 4.9
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing cars
    await Car.deleteMany({});
    console.log('🗑️  Cleared existing cars');

    // Insert new cars
    const createdCars = await Car.insertMany(cars);
    console.log(`✅ Successfully seeded ${createdCars.length} cars`);

    console.log('\n📋 Seeded Cars:');
    createdCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.brand} ${car.model} - ${car.location} - $${car.pricePerDay}/day`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
