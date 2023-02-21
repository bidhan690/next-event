import {MongoClient} from 'mongodb';

export async function getDb() {
  const client = await MongoClient.connect('mongodb+srv://heygarmi654:bidhanmongo@cluster0.3qjkyhr.mongodb.net/?retryWrites=true&w=majority');
  return client;
}

export async function insertData(client, collection, document) {
  const db = client.db('events');
  await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection) {
  const db = client.db('events');
  const data = await db.collection(collection).find().sort({_id: -1}).toArray();
  return data;
}
