// src/server/db.ts
import mongoose from 'mongoose';

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use existing database connection
    return;
  }
  // Use a new database connection
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export default connectToDB;
