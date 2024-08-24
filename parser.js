import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('starterStory'); // Replace with your database name
    const collection = database.collection('atomicArticles'); // Replace with your collection name

    // Array to hold CSV data
    const records = [];

    // Read and parse the CSV file
    fs.createReadStream('./csvFiles/ideas.csv') // Replace with your CSV file path
      .pipe(csv())
      .on('data', (row) => {
        // Push each row into the records array
        records.push(row);
      })
      .on('end', async () => {
        // Insert the records into MongoDB
        await collection.insertMany(records);
        console.log('Data inserted successfully');
        await client.close(); // Close the MongoDB connection
      });
  } catch (err) {
    console.error('Error:', err);
  }
}

run().catch(console.dir);
