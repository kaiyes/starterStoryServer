import mongoose from 'mongoose';
import AtomicArticle from './models/atomicArticles.model.js';
import dotenv from 'dotenv';

dotenv.config();

async function updateArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await AtomicArticle.updateMany(
      { profession: { $exists: false }, content: { $exists: false } },
      { $set: { profession: "", content: "" } }
    );

    console.log(`Updated ${result.modifiedCount} documents`);
  } catch (error) {
    console.error('Error updating documents:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateArticles();
