// In-memory data store (replaces MongoDB)
import bcrypt from 'bcryptjs';

// In-memory storage
export const users = [];
export const cars = [
  // Sedans
  {
    _id: '1',
    name: 'Maruti Suzuki Dzire',
    brand: 'Maruti Suzuki',
    model: 'Dzire',
    type: 'Sedan',
    pricePerDay: 1200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'],
    location: 'Mumbai, Maharashtra',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Popular compact sedan with excellent fuel efficiency, perfect for city drives.',
    features: ['AC', 'Power Steering', 'Music System', 'Central Locking'],
    available: true,
    rating: 4.5,
    totalBookings: 234
  },
  {
    _id: '2',
    name: 'Honda City',
    brand: 'Honda',
    model: 'City',
    type: 'Sedan',
    pricePerDay: 1800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'],
    location: 'New Delhi',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Premium sedan with advanced features and comfortable interiors.',
    features: ['Sunroof', 'Touchscreen', 'Cruise Control', 'Rear AC Vents'],
    available: true,
    rating: 4.7,
    totalBookings: 189
  },
  {
    _id: '3',
    name: 'Hyundai Verna',
    brand: 'Hyundai',
    model: 'Verna',
    type: 'Sedan',
    pricePerDay: 1600,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80'],
    location: 'Bengaluru, Karnataka',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Stylish sedan with modern technology and great mileage.',
    features: ['Wireless Charging', 'Digital Cluster', 'Ventilated Seats', 'Smart Key'],
    available: true,
    rating: 4.6,
    totalBookings: 156
  },
  
  // SUVs
  {
    _id: '4',
    name: 'Mahindra Scorpio N',
    brand: 'Mahindra',
    model: 'Scorpio N',
    type: 'SUV',
    pricePerDay: 2500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Pune, Maharashtra',
    specifications: {
      seats: 7,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Rugged SUV built for Indian roads with powerful performance.',
    features: ['4WD', 'Hill Assist', 'Touchscreen', 'Roof Rails'],
    available: true,
    rating: 4.8,
    totalBookings: 142
  },
  {
    _id: '5',
    name: 'Tata Harrier',
    brand: 'Tata',
    model: 'Harrier',
    type: 'SUV',
    pricePerDay: 2200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80'],
    location: 'Hyderabad, Telangana',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Premium SUV with commanding road presence and advanced safety features.',
    features: ['Panoramic Sunroof', 'JBL Sound', 'Drive Modes', 'Connected Car'],
    available: true,
    rating: 4.7,
    totalBookings: 128
  },
  {
    _id: '6',
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    model: 'XUV700',
    type: 'SUV',
    pricePerDay: 2800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    location: 'Chennai, Tamil Nadu',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Feature-packed SUV with ADAS technology and luxurious interiors.',
    features: ['ADAS', 'Sky Roof', 'Sony 3D Sound', 'Wireless Charging'],
    available: true,
    rating: 4.9,
    totalBookings: 203
  },
  
  // Compact Cars
  {
    _id: '7',
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    type: 'Hatchback',
    pricePerDay: 1000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Jaipur, Rajasthan',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Sporty hatchback with excellent fuel economy, ideal for city commutes.',
    features: ['Touchscreen', 'Reverse Camera', 'Keyless Entry', 'Auto AC'],
    available: true,
    rating: 4.5,
    totalBookings: 276
  },
  
  // Trucks
  {
    _id: '8',
    name: 'Tata Ace',
    brand: 'Tata',
    model: 'Ace',
    type: 'Truck',
    pricePerDay: 1500,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'],
    location: 'Ahmedabad, Gujarat',
    specifications: {
      seats: 3,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Compact mini truck perfect for small cargo and city deliveries.',
    features: ['High Payload', 'Fuel Efficient', 'Easy Maneuverability', 'Low Maintenance'],
    available: true,
    rating: 4.3,
    totalBookings: 98
  },
  {
    _id: '9',
    name: 'Mahindra Bolero Pickup',
    brand: 'Mahindra',
    model: 'Bolero Pickup',
    type: 'Truck',
    pricePerDay: 2000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80'],
    location: 'Indore, Madhya Pradesh',
    specifications: {
      seats: 3,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Robust pickup truck for heavy-duty cargo transportation.',
    features: ['High Ground Clearance', 'Strong Build', 'Large Cargo Bed', 'Power Steering'],
    available: true,
    rating: 4.4,
    totalBookings: 87
  },
  {
    _id: '10',
    name: 'Ashok Leyland Dost',
    brand: 'Ashok Leyland',
    model: 'Dost',
    type: 'Truck',
    pricePerDay: 1800,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80'],
    location: 'Surat, Gujarat',
    specifications: {
      seats: 3,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Reliable light commercial vehicle for business transportation needs.',
    features: ['Spacious Cabin', 'Good Mileage', 'Strong Chassis', 'Easy Loading'],
    available: true,
    rating: 4.2,
    totalBookings: 76
  },
  
  // Traveller Vehicles (MPVs/Vans)
  {
    _id: '11',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    model: 'Innova Crysta',
    type: 'Traveller',
    pricePerDay: 3000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80'],
    location: 'Panaji, Goa',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Premium MPV perfect for family trips and group travel with superior comfort.',
    features: ['Captain Seats', 'Touchscreen', 'Rear AC', 'Cruise Control'],
    available: true,
    rating: 4.9,
    totalBookings: 312
  },
  {
    _id: '12',
    name: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    model: 'Ertiga',
    type: 'Traveller',
    pricePerDay: 1800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80'],
    location: 'Kolkata, West Bengal',
    specifications: {
      seats: 7,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Spacious and economical MPV ideal for family outings.',
    features: ['3-Row Seating', 'Touchscreen', 'Rear Parking Sensors', 'Dual AC'],
    available: true,
    rating: 4.6,
    totalBookings: 198
  },
  {
    _id: '13',
    name: 'Force Urbania',
    brand: 'Force',
    model: 'Urbania',
    type: 'Traveller',
    pricePerDay: 4500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80'],
    location: 'Udaipur, Rajasthan',
    specifications: {
      seats: 13,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Luxury traveller van for large groups with premium amenities.',
    features: ['Reclining Seats', 'Entertainment System', 'Roof AC', 'LED Lighting'],
    available: true,
    rating: 4.7,
    totalBookings: 145
  },
  {
    _id: '14',
    name: 'Tempo Traveller',
    brand: 'Force',
    model: 'Tempo Traveller',
    type: 'Traveller',
    pricePerDay: 3500,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&q=80'],
    location: 'Manali, Himachal Pradesh',
    specifications: {
      seats: 12,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Popular choice for group tours and hill station trips.',
    features: ['Push Back Seats', 'Music System', 'Luggage Carrier', 'First Aid Kit'],
    available: true,
    rating: 4.5,
    totalBookings: 223
  },
  
  // Buses
  {
    _id: '15',
    name: 'Tata Starbus',
    brand: 'Tata',
    model: 'Starbus',
    type: 'Bus',
    pricePerDay: 6000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80'],
    location: 'Bangalore, Karnataka',
    specifications: {
      seats: 32,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Comfortable tourist bus for large group travel and corporate events.',
    features: ['AC', 'Reclining Seats', 'Music System', 'Charging Points'],
    available: true,
    rating: 4.6,
    totalBookings: 89
  },
  {
    _id: '16',
    name: 'Ashok Leyland Viking',
    brand: 'Ashok Leyland',
    model: 'Viking',
    type: 'Bus',
    pricePerDay: 5500,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'],
    location: 'Kochi, Kerala',
    specifications: {
      seats: 28,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Reliable bus for school trips, corporate outings, and pilgrimages.',
    features: ['Spacious Interior', 'Safety Features', 'Good Suspension', 'Luggage Space'],
    available: true,
    rating: 4.4,
    totalBookings: 67
  },
  {
    _id: '17',
    name: 'BharatBenz Tourist Bus',
    brand: 'BharatBenz',
    model: 'Tourist Bus',
    type: 'Bus',
    pricePerDay: 7500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80'],
    location: 'Shimla, Himachal Pradesh',
    specifications: {
      seats: 40,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Premium luxury bus with modern amenities for long-distance travel.',
    features: ['Sleeper Berths', 'Entertainment System', 'Washroom', 'Pantry'],
    available: true,
    rating: 4.8,
    totalBookings: 112
  },
  
  // Luxury Cars
  {
    _id: '18',
    name: 'Mercedes-Benz E-Class',
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    type: 'Luxury',
    pricePerDay: 8000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80'],
    location: 'Mumbai, Maharashtra',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Ultimate luxury sedan for special occasions and business travel.',
    features: ['Massage Seats', 'Burmester Sound', 'Ambient Lighting', 'Driver Assist'],
    available: true,
    rating: 4.9,
    totalBookings: 156
  },
  {
    _id: '19',
    name: 'BMW 5 Series',
    brand: 'BMW',
    model: '5 Series',
    type: 'Luxury',
    pricePerDay: 7500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'],
    location: 'New Delhi',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Executive luxury sedan with cutting-edge technology.',
    features: ['Gesture Control', 'Harman Kardon', 'Adaptive LED', 'Parking Assist'],
    available: true,
    rating: 4.8,
    totalBookings: 134
  },
  
  // Electric Vehicles
  {
    _id: '20',
    name: 'Tata Nexon EV',
    brand: 'Tata',
    model: 'Nexon EV',
    type: 'SUV',
    pricePerDay: 2000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80'],
    location: 'Pune, Maharashtra',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric'
    },
    description: 'India\'s popular electric SUV with impressive range and features.',
    features: ['Fast Charging', 'Connected App', 'Regenerative Braking', 'Digital Cluster'],
    available: true,
    rating: 4.7,
    totalBookings: 167
  },
  
  // More Sedans
  {
    _id: '21',
    name: 'Volkswagen Virtus',
    brand: 'Volkswagen',
    model: 'Virtus',
    type: 'Sedan',
    pricePerDay: 1900,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'],
    location: 'Chandigarh, Punjab & Haryana',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'German-engineered sedan with premium features and build quality.',
    features: ['Touchscreen', 'Ventilated Seats', 'Cruise Control', 'Auto Climate Control'],
    available: true,
    rating: 4.6,
    totalBookings: 142
  },
  {
    _id: '22',
    name: 'Skoda Slavia',
    brand: 'Skoda',
    model: 'Slavia',
    type: 'Sedan',
    pricePerDay: 2000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'],
    location: 'Gurugram, Haryana',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Elegant European sedan with spacious interiors and advanced tech.',
    features: ['Digital Cockpit', 'Wireless Charging', 'Sunroof', 'Connected Car'],
    available: true,
    rating: 4.7,
    totalBookings: 128
  },
  {
    _id: '23',
    name: 'Kia Seltos',
    brand: 'Kia',
    model: 'Seltos',
    type: 'SUV',
    pricePerDay: 2300,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Lucknow, Uttar Pradesh',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Feature-rich compact SUV with bold styling and modern amenities.',
    features: ['Bose Sound', 'Air Purifier', 'UVO Connect', '360 Camera'],
    available: true,
    rating: 4.8,
    totalBookings: 195
  },
  {
    _id: '24',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    model: 'Creta',
    type: 'SUV',
    pricePerDay: 2400,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80'],
    location: 'Bhubaneswar, Odisha',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'India\'s best-selling SUV with premium features and comfort.',
    features: ['Panoramic Sunroof', 'BlueLink', 'ADAS', 'Wireless Charging'],
    available: true,
    rating: 4.8,
    totalBookings: 267
  },
  {
    _id: '25',
    name: 'MG Hector',
    brand: 'MG',
    model: 'Hector',
    type: 'SUV',
    pricePerDay: 2600,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    location: 'Visakhapatnam, Andhra Pradesh',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Internet-enabled SUV with spacious cabin and advanced connectivity.',
    features: ['i-SMART', 'Panoramic Sunroof', 'ADAS', 'Infinity Sound'],
    available: true,
    rating: 4.7,
    totalBookings: 178
  },
  {
    _id: '26',
    name: 'Maruti Suzuki Baleno',
    brand: 'Maruti Suzuki',
    model: 'Baleno',
    type: 'Hatchback',
    pricePerDay: 1100,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Kanpur, Uttar Pradesh',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Premium hatchback with spacious interiors and great fuel efficiency.',
    features: ['Touchscreen', 'Head-Up Display', 'Auto AC', 'Cruise Control'],
    available: true,
    rating: 4.6,
    totalBookings: 234
  },
  {
    _id: '27',
    name: 'Hyundai i20',
    brand: 'Hyundai',
    model: 'i20',
    type: 'Hatchback',
    pricePerDay: 1300,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Varanasi, Uttar Pradesh',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Stylish premium hatchback with segment-leading features.',
    features: ['Digital Cluster', 'Sunroof', 'Wireless Charging', 'BlueLink'],
    available: true,
    rating: 4.7,
    totalBookings: 189
  },
  {
    _id: '28',
    name: 'Tata Punch',
    brand: 'Tata',
    model: 'Punch',
    type: 'SUV',
    pricePerDay: 1400,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Siliguri, West Bengal',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Compact micro-SUV perfect for city and hill drives.',
    features: ['Ground Clearance', 'Touchscreen', 'Dual Airbags', 'Hill Hold'],
    available: true,
    rating: 4.5,
    totalBookings: 156
  },
  {
    _id: '29',
    name: 'Mahindra Thar',
    brand: 'Mahindra',
    model: 'Thar',
    type: 'SUV',
    pricePerDay: 3500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Dehradun, Uttarakhand',
    specifications: {
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Iconic off-roader perfect for adventure and mountain trips.',
    features: ['4x4', 'Convertible Top', 'Off-Road Tyres', 'Hill Descent Control'],
    available: true,
    rating: 4.9,
    totalBookings: 298
  },
  {
    _id: '30',
    name: 'Jeep Compass',
    brand: 'Jeep',
    model: 'Compass',
    type: 'SUV',
    pricePerDay: 3200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Jammu, Jammu & Kashmir',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'American SUV with legendary off-road capability and luxury.',
    features: ['4x4', 'Panoramic Sunroof', 'Uconnect', 'Leather Seats'],
    available: true,
    rating: 4.8,
    totalBookings: 167
  },
  {
    _id: '31',
    name: 'Honda Amaze',
    brand: 'Honda',
    model: 'Amaze',
    type: 'Sedan',
    pricePerDay: 1300,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'],
    location: 'Patna, Bihar',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Reliable compact sedan with excellent fuel economy.',
    features: ['Touchscreen', 'Rear AC Vents', 'Cruise Control', 'Keyless Entry'],
    available: true,
    rating: 4.5,
    totalBookings: 201
  },
  {
    _id: '32',
    name: 'Renault Kiger',
    brand: 'Renault',
    model: 'Kiger',
    type: 'SUV',
    pricePerDay: 1500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Ranchi, Jharkhand',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Compact SUV with bold design and practical features.',
    features: ['LED DRLs', 'Touchscreen', 'Wireless Charging', 'Air Purifier'],
    available: true,
    rating: 4.4,
    totalBookings: 134
  },
  {
    _id: '33',
    name: 'Nissan Magnite',
    brand: 'Nissan',
    model: 'Magnite',
    type: 'SUV',
    pricePerDay: 1450,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Guwahati, Assam',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Value-for-money compact SUV with premium features.',
    features: ['360 Camera', 'Wireless Charging', 'Cruise Control', 'Auto AC'],
    available: true,
    rating: 4.5,
    totalBookings: 145
  },
  {
    _id: '34',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    model: 'Fortuner',
    type: 'SUV',
    pricePerDay: 4500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Gangtok, Sikkim',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Premium full-size SUV perfect for mountain roads and luxury travel.',
    features: ['4x4', 'Leather Seats', 'JBL Sound', 'Ventilated Seats'],
    available: true,
    rating: 4.9,
    totalBookings: 223
  },
  {
    _id: '35',
    name: 'Ford EcoSport',
    brand: 'Ford',
    model: 'EcoSport',
    type: 'SUV',
    pricePerDay: 1700,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Jalandhar, Punjab',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Compact SUV with American styling and robust build.',
    features: ['Touchscreen', 'Reverse Camera', 'Auto Headlamps', 'Push Start'],
    available: true,
    rating: 4.4,
    totalBookings: 167
  },
  {
    _id: '36',
    name: 'Volkswagen Taigun',
    brand: 'Volkswagen',
    model: 'Taigun',
    type: 'SUV',
    pricePerDay: 2500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    location: 'Mohali, Punjab',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'German-engineered compact SUV with premium features.',
    features: ['Digital Cockpit', 'Ventilated Seats', 'Wireless Charging', 'Sunroof'],
    available: true,
    rating: 4.7,
    totalBookings: 156
  },
  {
    _id: '37',
    name: 'Skoda Kushaq',
    brand: 'Skoda',
    model: 'Kushaq',
    type: 'SUV',
    pricePerDay: 2400,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80'],
    location: 'Prayagraj, Uttar Pradesh',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'European compact SUV with spacious cabin and safety features.',
    features: ['6 Airbags', 'Ventilated Seats', 'Digital Cockpit', 'Sunroof'],
    available: true,
    rating: 4.6,
    totalBookings: 142
  },
  {
    _id: '38',
    name: 'Audi A4',
    brand: 'Audi',
    model: 'A4',
    type: 'Luxury',
    pricePerDay: 6500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80'],
    location: 'Bikaner, Rajasthan',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Luxury sedan with cutting-edge technology and performance.',
    features: ['Virtual Cockpit', 'Matrix LED', 'Bang & Olufsen', 'Quattro AWD'],
    available: true,
    rating: 4.8,
    totalBookings: 98
  },
  {
    _id: '39',
    name: 'Maruti Suzuki Ciaz',
    brand: 'Maruti Suzuki',
    model: 'Ciaz',
    type: 'Sedan',
    pricePerDay: 1400,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'],
    location: 'Gandhinagar, Gujarat',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Spacious sedan with comfortable ride and good fuel economy.',
    features: ['Touchscreen', 'Cruise Control', 'Leather Seats', 'Auto AC'],
    available: true,
    rating: 4.4,
    totalBookings: 187
  },
  {
    _id: '40',
    name: 'Tata Altroz',
    brand: 'Tata',
    model: 'Altroz',
    type: 'Hatchback',
    pricePerDay: 1200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Bengaluru, Karnataka',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Premium hatchback with 5-star safety rating and modern design.',
    features: ['Touchscreen', 'Digital Cluster', 'Ambient Lighting', 'Cruise Control'],
    available: true,
    rating: 4.6,
    totalBookings: 178
  },
  {
    _id: '41',
    name: 'Honda WR-V',
    brand: 'Honda',
    model: 'WR-V',
    type: 'SUV',
    pricePerDay: 1600,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Kochi, Kerala',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Crossover SUV with high ground clearance and spacious interiors.',
    features: ['Touchscreen', 'Reverse Camera', 'Cruise Control', 'Keyless Entry'],
    available: true,
    rating: 4.5,
    totalBookings: 156
  },
  {
    _id: '42',
    name: 'Mahindra Marazzo',
    brand: 'Mahindra',
    model: 'Marazzo',
    type: 'Traveller',
    pricePerDay: 2200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80'],
    location: 'Chennai, Tamil Nadu',
    specifications: {
      seats: 8,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Spacious MPV perfect for family trips with comfortable seating.',
    features: ['Captain Seats', 'Touchscreen', 'Roof AC', 'Cruise Control'],
    available: true,
    rating: 4.6,
    totalBookings: 167
  },
  {
    _id: '43',
    name: 'Kia Carens',
    brand: 'Kia',
    model: 'Carens',
    type: 'Traveller',
    pricePerDay: 2400,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80'],
    location: 'Hyderabad, Telangana',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Modern 3-row MPV with premium features and connectivity.',
    features: ['UVO Connect', 'Ventilated Seats', 'Sunroof', 'Digital Cluster'],
    available: true,
    rating: 4.8,
    totalBookings: 198
  },
  {
    _id: '44',
    name: 'MG ZS EV',
    brand: 'MG',
    model: 'ZS EV',
    type: 'SUV',
    pricePerDay: 2800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80'],
    location: 'Mumbai, Maharashtra',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric'
    },
    description: 'Electric SUV with impressive range and modern features.',
    features: ['Fast Charging', 'Panoramic Sunroof', 'i-SMART', 'ADAS'],
    available: true,
    rating: 4.7,
    totalBookings: 134
  },
  {
    _id: '45',
    name: 'Hyundai Venue',
    brand: 'Hyundai',
    model: 'Venue',
    type: 'SUV',
    pricePerDay: 1800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Udaipur, Rajasthan',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Compact SUV with connected car technology and modern styling.',
    features: ['BlueLink', 'Sunroof', 'Wireless Charging', 'Air Purifier'],
    available: true,
    rating: 4.6,
    totalBookings: 189
  },
  {
    _id: '46',
    name: 'Maruti Suzuki Vitara Brezza',
    brand: 'Maruti Suzuki',
    model: 'Vitara Brezza',
    type: 'SUV',
    pricePerDay: 1700,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Jaipur, Rajasthan',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Popular compact SUV with reliable performance and features.',
    features: ['Touchscreen', 'Cruise Control', 'Auto Headlamps', 'Hill Hold'],
    available: true,
    rating: 4.5,
    totalBookings: 245
  },
  {
    _id: '47',
    name: 'Toyota Glanza',
    brand: 'Toyota',
    model: 'Glanza',
    type: 'Hatchback',
    pricePerDay: 1150,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Surat, Gujarat',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Premium hatchback with Toyota reliability and modern features.',
    features: ['Touchscreen', 'Head-Up Display', 'Cruise Control', 'Auto AC'],
    available: true,
    rating: 4.6,
    totalBookings: 167
  },
  {
    _id: '48',
    name: 'Renault Triber',
    brand: 'Renault',
    model: 'Triber',
    type: 'Traveller',
    pricePerDay: 1300,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80'],
    location: 'Ahmedabad, Gujarat',
    specifications: {
      seats: 7,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Modular 7-seater with flexible seating and practical design.',
    features: ['Modular Seats', 'Touchscreen', 'Cooled Glovebox', 'Roof Rails'],
    available: true,
    rating: 4.4,
    totalBookings: 178
  },
  {
    _id: '49',
    name: 'Tata Safari',
    brand: 'Tata',
    model: 'Safari',
    type: 'SUV',
    pricePerDay: 3200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    location: 'Manali, Himachal Pradesh',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: 'Flagship 7-seater SUV with commanding presence and luxury features.',
    features: ['ADAS', 'Panoramic Sunroof', 'JBL Sound', 'Ventilated Seats'],
    available: true,
    rating: 4.8,
    totalBookings: 212
  },
  {
    _id: '50',
    name: 'Jeep Meridian',
    brand: 'Jeep',
    model: 'Meridian',
    type: 'SUV',
    pricePerDay: 3800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Kolkata, West Bengal',
    specifications: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel'
    },
    description: '7-seater premium SUV with legendary Jeep capability and luxury.',
    features: ['4x4', 'Panoramic Sunroof', 'Uconnect 5', 'Wireless Charging'],
    available: true,
    rating: 4.9,
    totalBookings: 189
  },
  
  // Additional vehicles for better city coverage
  {
    _id: '51',
    name: 'Maruti Suzuki WagonR',
    brand: 'Maruti Suzuki',
    model: 'WagonR',
    type: 'Hatchback',
    pricePerDay: 900,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Chandigarh, Punjab & Haryana',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Tall-boy hatchback with spacious cabin and excellent fuel economy.',
    features: ['Touchscreen', 'Reverse Camera', 'Dual Airbags', 'Central Locking'],
    available: true,
    rating: 4.3,
    totalBookings: 198
  },
  {
    _id: '52',
    name: 'Tata Tigor',
    brand: 'Tata',
    model: 'Tigor',
    type: 'Sedan',
    pricePerDay: 1100,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'],
    location: 'Lucknow, Uttar Pradesh',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Compact sedan with modern styling and good value.',
    features: ['Touchscreen', 'Dual Airbags', 'Rear AC Vents', 'Auto AC'],
    available: true,
    rating: 4.4,
    totalBookings: 156
  },
  {
    _id: '53',
    name: 'Mahindra Bolero',
    brand: 'Mahindra',
    model: 'Bolero',
    type: 'SUV',
    pricePerDay: 1600,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Patna, Bihar',
    specifications: {
      seats: 7,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Rugged utility vehicle perfect for tough Indian roads.',
    features: ['High Ground Clearance', 'Spacious', 'Durable', 'Power Steering'],
    available: true,
    rating: 4.3,
    totalBookings: 187
  },
  {
    _id: '54',
    name: 'Force Traveller',
    brand: 'Force',
    model: 'Traveller',
    type: 'Traveller',
    pricePerDay: 3200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&q=80'],
    location: 'Varanasi, Uttar Pradesh',
    specifications: {
      seats: 13,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Reliable traveller for group tours and pilgrimages.',
    features: ['Comfortable Seats', 'AC', 'Music System', 'Luggage Space'],
    available: true,
    rating: 4.5,
    totalBookings: 167
  },
  {
    _id: '55',
    name: 'Eicher Skyline Pro',
    brand: 'Eicher',
    model: 'Skyline Pro',
    type: 'Bus',
    pricePerDay: 5000,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'],
    location: 'Kanpur, Uttar Pradesh',
    specifications: {
      seats: 35,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Modern bus for corporate and tourist group travel.',
    features: ['AC', 'Comfortable Seating', 'Entertainment', 'Safety Features'],
    available: true,
    rating: 4.6,
    totalBookings: 98
  },
  {
    _id: '56',
    name: 'Hyundai Aura',
    brand: 'Hyundai',
    model: 'Aura',
    type: 'Sedan',
    pricePerDay: 1250,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'],
    location: 'Ranchi, Jharkhand',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Stylish compact sedan with premium features.',
    features: ['Touchscreen', 'Wireless Charging', 'Cruise Control', 'Sunroof'],
    available: true,
    rating: 4.5,
    totalBookings: 145
  },
  {
    _id: '57',
    name: 'Tata Yodha',
    brand: 'Tata',
    model: 'Yodha',
    type: 'Truck',
    pricePerDay: 2200,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'],
    location: 'Guwahati, Assam',
    specifications: {
      seats: 3,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Powerful pickup truck for commercial and cargo needs.',
    features: ['High Payload', 'Strong Build', 'Cargo Bed', 'Power Steering'],
    available: true,
    rating: 4.4,
    totalBookings: 123
  },
  {
    _id: '58',
    name: 'Maruti Suzuki Alto',
    brand: 'Maruti Suzuki',
    model: 'Alto',
    type: 'Hatchback',
    pricePerDay: 800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Siliguri, West Bengal',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Budget-friendly hatchback with excellent mileage.',
    features: ['AC', 'Power Steering', 'Music System', 'Central Locking'],
    available: true,
    rating: 4.2,
    totalBookings: 234
  },
  {
    _id: '59',
    name: 'Datsun GO+',
    brand: 'Datsun',
    model: 'GO+',
    type: 'Traveller',
    pricePerDay: 1200,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80'],
    location: 'Dehradun, Uttarakhand',
    specifications: {
      seats: 7,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Affordable 7-seater for family trips.',
    features: ['3-Row Seating', 'Touchscreen', 'Dual Airbags', 'AC'],
    available: true,
    rating: 4.3,
    totalBookings: 167
  },
  {
    _id: '60',
    name: 'Mahindra Supro',
    brand: 'Mahindra',
    model: 'Supro',
    type: 'Traveller',
    pricePerDay: 1600,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&q=80'],
    location: 'Jammu, Jammu & Kashmir',
    specifications: {
      seats: 8,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Versatile van for passenger and cargo transport.',
    features: ['Spacious', 'Comfortable Seats', 'Good Mileage', 'AC'],
    available: true,
    rating: 4.4,
    totalBookings: 134
  },
  {
    _id: '61',
    name: 'Tata Winger',
    brand: 'Tata',
    model: 'Winger',
    type: 'Traveller',
    pricePerDay: 2800,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80'],
    location: 'Gangtok, Sikkim',
    specifications: {
      seats: 13,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Comfortable mini-bus for mountain tours and group travel.',
    features: ['Reclining Seats', 'AC', 'Music System', 'Hill Assist'],
    available: true,
    rating: 4.6,
    totalBookings: 178
  },
  {
    _id: '62',
    name: 'Isuzu D-Max',
    brand: 'Isuzu',
    model: 'D-Max',
    type: 'Truck',
    pricePerDay: 2500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80'],
    location: 'Jalandhar, Punjab',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Premium pickup truck with powerful performance.',
    features: ['4x4', 'Large Cargo Bed', 'Touchscreen', 'Leather Seats'],
    available: true,
    rating: 4.7,
    totalBookings: 145
  },
  {
    _id: '63',
    name: 'Volkswagen Polo',
    brand: 'Volkswagen',
    model: 'Polo',
    type: 'Hatchback',
    pricePerDay: 1300,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Mohali, Punjab',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Premium German hatchback with solid build quality.',
    features: ['Touchscreen', 'Cruise Control', 'Auto AC', 'Parking Sensors'],
    available: true,
    rating: 4.6,
    totalBookings: 156
  },
  {
    _id: '64',
    name: 'Tata Intra',
    brand: 'Tata',
    model: 'Intra',
    type: 'Truck',
    pricePerDay: 1700,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'],
    location: 'Prayagraj, Uttar Pradesh',
    specifications: {
      seats: 3,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Compact commercial vehicle for city deliveries.',
    features: ['High Payload', 'Fuel Efficient', 'Easy Handling', 'Low Maintenance'],
    available: true,
    rating: 4.3,
    totalBookings: 189
  },
  {
    _id: '65',
    name: 'Ashok Leyland MiTR',
    brand: 'Ashok Leyland',
    model: 'MiTR',
    type: 'Bus',
    pricePerDay: 6500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80'],
    location: 'Bikaner, Rajasthan',
    specifications: {
      seats: 41,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Luxury bus for long-distance travel and tours.',
    features: ['AC', 'Reclining Seats', 'Entertainment System', 'Washroom'],
    available: true,
    rating: 4.7,
    totalBookings: 112
  },
  {
    _id: '66',
    name: 'Nissan Kicks',
    brand: 'Nissan',
    model: 'Kicks',
    type: 'SUV',
    pricePerDay: 1900,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Gandhinagar, Gujarat',
    specifications: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol'
    },
    description: 'Stylish compact SUV with premium features.',
    features: ['360 Camera', 'Touchscreen', 'Cruise Control', 'LED Headlamps'],
    available: true,
    rating: 4.5,
    totalBookings: 134
  },
  {
    _id: '67',
    name: 'Mahindra KUV100',
    brand: 'Mahindra',
    model: 'KUV100',
    type: 'SUV',
    pricePerDay: 1100,
    year: 2022,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Bhubaneswar, Odisha',
    specifications: {
      seats: 6,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Compact micro-SUV with 6-seater option.',
    features: ['Touchscreen', 'Dual Airbags', 'Reverse Camera', 'AC'],
    available: true,
    rating: 4.3,
    totalBookings: 145
  },
  {
    _id: '68',
    name: 'Force Gurkha',
    brand: 'Force',
    model: 'Gurkha',
    type: 'SUV',
    pricePerDay: 2900,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'],
    location: 'Visakhapatnam, Andhra Pradesh',
    specifications: {
      seats: 6,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Off-road capable SUV for adventure enthusiasts.',
    features: ['4x4', 'Snorkel', 'Diff Lock', 'High Ground Clearance'],
    available: true,
    rating: 4.7,
    totalBookings: 167
  },
  {
    _id: '69',
    name: 'Maruti Suzuki S-Presso',
    brand: 'Maruti Suzuki',
    model: 'S-Presso',
    type: 'Hatchback',
    pricePerDay: 850,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'],
    location: 'Bengaluru, Karnataka',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: 'Mini SUV-styled hatchback with compact dimensions.',
    features: ['Touchscreen', 'Dual Airbags', 'Central Locking', 'AC'],
    available: true,
    rating: 4.2,
    totalBookings: 198
  },
  {
    _id: '70',
    name: 'SML Isuzu Executive',
    brand: 'SML Isuzu',
    model: 'Executive',
    type: 'Bus',
    pricePerDay: 5500,
    year: 2023,
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'],
    location: 'Manali, Himachal Pradesh',
    specifications: {
      seats: 33,
      transmission: 'Manual',
      fuelType: 'Diesel'
    },
    description: 'Executive bus for corporate and tourist travel.',
    features: ['AC', 'Comfortable Seats', 'Music System', 'Luggage Space'],
    available: true,
    rating: 4.6,
    totalBookings: 123
  }
];
export const bookings = [];

// Helper functions
let userIdCounter = 1;
let bookingIdCounter = 1;

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = {
    _id: String(userIdCounter++),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    phone: userData.phone,
    role: userData.role || 'user',
    createdAt: new Date()
  };
  users.push(user);
  return user;
};

export const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

export const findUserById = (id) => {
  return users.find(u => u._id === id);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const findCarById = (id) => {
  return cars.find(c => c._id === id);
};

export const createBooking = (bookingData) => {
  const booking = {
    _id: String(bookingIdCounter++),
    ...bookingData,
    createdAt: new Date()
  };
  bookings.push(booking);
  return booking;
};

export const findBookingById = (id) => {
  return bookings.find(b => b._id === id);
};

export const findBookingsByUser = (userId) => {
  return bookings.filter(b => b.user === userId);
};

export const updateBooking = (id, updates) => {
  const index = bookings.findIndex(b => b._id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    return bookings[index];
  }
  return null;
};
