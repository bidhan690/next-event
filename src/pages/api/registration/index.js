import {getDb, insertData} from '../../../helpers/db-util';

export default async function Register(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({message: 'Invalid email address'});
      return;
    }
    let client;

    try {
      client = await getDb();
    } catch (err) {
      res.status(500).json({message: 'connecting to db failed'});
      return;
    }

    try {
      await insertData(client, 'newsletter', {email: email});

      client.close();
    } catch (err) {
      res.status(500).json({message: 'inserting data to db failed'});
      return;
    }

    res.status(201).json({message: 'success'});
  }
}
