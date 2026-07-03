import { MongoClient } from 'mongodb';

const url ="mongodb+srv://rimsha:sJnmdtaQ2BV.%25N.@cluster0.17ltzne.mongodb.net/node-project?retryWrites=true&w=majority";
const dbName = 'node-project';
export const collectionName = 'todo';
const client = new MongoClient(url)

export const connection = async () => {
  const connect = await client.connect();
  return await connect.db(dbName);
}