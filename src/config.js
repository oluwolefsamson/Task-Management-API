require("dotenv").config(); // Load environment variables
const { MongoClient } = require("mongodb");

// Get the MongoDB URI from the environment variable
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "taskDB";

let db;

async function connectDB() {
  if (!db) {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB: ${DB_NAME}`);
  }
  return db;
}

module.exports = { connectDB };
