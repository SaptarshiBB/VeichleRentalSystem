import mongoose from 'mongoose';

export const usingMemoryStore = () => {
  return process.env.USE_IN_MEMORY_DB === 'true' || !process.env.MONGODB_URI;
};

const connectDB = async () => {
  if (usingMemoryStore()) {
    console.log('Using in-memory data store; MongoDB connection skipped');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
