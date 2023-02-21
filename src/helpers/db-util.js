import {MongoClient} from 'mongodb';


export async function getDb() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
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
