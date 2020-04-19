import Mongo from '@/lib/mongo';

export async function del(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  const { db, collection, id } = req.params;

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    await mongo.deleteDocument(db, collection, id);

    return res.json({
      ok: true
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
