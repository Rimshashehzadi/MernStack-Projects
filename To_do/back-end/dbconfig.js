// import { MongoClient } from 'mongodb';

// const url = 'mongodb+srv://rimsha:rimsha12345@cluster0.17ltzne.mongodb.net/?appName=Cluster0'
// const dbName = 'node-project';
// export const collectionName = 'todo';
// const client = new MongoClient(url)

// export const connection = async () => {
//   const connect = await client.connect();
//   return await connect.db(dbName);
// }
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;

console.log("Mongo URI:", url);

const dbName = "node-project";

export const collectionName = "todo";

// Stop the app if URI is missing
if (!url) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}

// Create Mongo Client
const client = new MongoClient(url);

let db = null;

export const connection = async () => {
  try {
    if (!db) {
      await client.connect();
      console.log("✅ MongoDB Connected Successfully");
      db = client.db(dbName);
    }

    return db;
  } catch (error) {
    console.log("MongoDB Error:", error);
    throw error;
  }
};