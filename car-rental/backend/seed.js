const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Car.deleteMany();
        await User.deleteMany();

        const cars = [
            { make: 'Toyota', model: 'Camry', year: 2022, pricePerDay: 50, type: 'Sedan', location: 'New York', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3' },
            { make: 'Honda', model: 'CR-V', year: 2023, pricePerDay: 70, type: 'SUV', location: 'Los Angeles', imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3' },
            { make: 'Ford', model: 'Mustang', year: 2021, pricePerDay: 100, type: 'Sports', location: 'Miami', imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3' },
        ];

        await Car.insertMany(cars);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
