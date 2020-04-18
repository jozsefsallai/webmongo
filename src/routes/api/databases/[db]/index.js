import Mongo from '@/lib/mongo';

export async function get(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  const { db } = req.params;

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const collections = await mongo.collectionsJSON(db);

    return res.json({
      ok: true,
      collections
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: err.message
    });
  }
}
