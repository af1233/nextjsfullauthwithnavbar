// src/server/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (mongoose.connections[0].readyState) {
    // Use existing database connection
    return;
  }

  await mongoose.connect(uri);
};

export default connectToDatabase;
