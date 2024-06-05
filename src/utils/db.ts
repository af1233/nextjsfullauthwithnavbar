// dbconfig/db.ts
import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-database-name');
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default connectToDB;
