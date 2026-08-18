import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`✅ Connected to MongoDB at ${connectionString}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose;
