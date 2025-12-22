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
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800'
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
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
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
      'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
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
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
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
  },
  {
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    type: 'SUV',
    location: 'Seattle',
    pricePerDay: 55,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    features: ['Skyactiv Technology', 'Blind Spot Monitoring', 'Apple CarPlay', 'Rear Cross Traffic Alert'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '28 MPG',
      airConditioning: true
    },
    rating: 4.6
  },
  {
    brand: 'Nissan',
    model: 'Altima',
    year: 2023,
    type: 'Sedan',
    location: 'Phoenix',
    pricePerDay: 42,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ],
    features: ['ProPILOT Assist', 'Remote Start', 'Intelligent Cruise Control', 'Dual Zone Climate'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '32 MPG',
      airConditioning: true
    },
    rating: 4.5
  },
  {
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    type: 'SUV',
    location: 'Atlanta',
    pricePerDay: 58,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
      'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=800'
    ],
    features: ['Highway Driving Assist', 'Wireless Charging', 'Smart Cruise Control', 'Panoramic Sunroof'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mileage: '38 MPG',
      airConditioning: true
    },
    rating: 4.7
  },
  {
    brand: 'Porsche',
    model: '911',
    year: 2024,
    type: 'Sports',
    location: 'Miami',
    pricePerDay: 250,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f36c5?w=800'
    ],
    features: ['Sport Chrono Package', 'Active Suspension', 'Premium Leather', 'Sport Exhaust'],
    specifications: {
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '20 MPG',
      airConditioning: true
    },
    rating: 4.9
  },
  {
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    type: 'SUV',
    location: 'Dallas',
    pricePerDay: 52,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800'
    ],
    features: ['Drive Mode Select', 'Lane Keep Assist', 'Wireless CarPlay', 'Smart Key'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '26 MPG',
      airConditioning: true
    },
    rating: 4.6
  },
  {
    brand: 'Lexus',
    model: 'RX',
    year: 2024,
    type: 'Luxury',
    location: 'San Diego',
    pricePerDay: 115,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800'
    ],
    features: ['Mark Levinson Audio', 'Heads-Up Display', 'Adaptive Cruise', 'Premium Leather'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mileage: '36 MPG',
      airConditioning: true
    },
    rating: 4.8
  },
  {
    brand: 'Subaru',
    model: 'Outback',
    year: 2023,
    type: 'SUV',
    location: 'Portland',
    pricePerDay: 62,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
      'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800'
    ],
    features: ['EyeSight Safety', 'X-Mode', 'Roof Rails', 'All-Wheel Drive'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '29 MPG',
      airConditioning: true
    },
    rating: 4.7
  },
  {
    brand: 'Range Rover',
    model: 'Sport',
    year: 2024,
    type: 'Luxury',
    location: 'Austin',
    pricePerDay: 180,
    available: true,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
    ],
    features: ['Terrain Response', 'Air Suspension', 'Meridian Sound', 'Adaptive Dynamics'],
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      mileage: '24 MPG',
      airConditioning: true
    },
    rating: 4.8
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
