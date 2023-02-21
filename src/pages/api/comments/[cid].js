import {getDb, insertData, getAllDocuments} from '../../../helpers/db-util';

export default async function Comment(req, res) {
  const cId = req.query.cid;
  let client;
  try {
    client = await getDb();
  } catch (err) {
    res.status(500).json({message: 'Connection to db failed!'});
    return;
  }

  if (req.method === 'POST') {
    const {email, name, text} = req.body;
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({message: 'Invalid Input'});
      client.close();
      return;
    }
    const newComment = {
      cId,
      email,
      name,
      text,
    };
    let result;
    try {
      result = await insertData(client, 'comments', newComment);

      res.status(201).json({message: 'success', comment: newComment});
    } catch (err) {
      res.status(500).json({message: 'Inserting data to db failed!', err: err});
    }
  }
  if (req.method === 'GET') {
    // const db = client.db('events');
    // const data = await db.collection('comments').find().sort({_id: -1}).toArray();
    try {
      const data = await getAllDocuments(client, 'comments');
      res.status(200).json({comments: data});
    } catch (err) {
      res.status(201).json({message: 'Comments failed to load'});
    }
  }
  client.close();
}
