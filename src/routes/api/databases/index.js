import Mongo from '@/lib/mongo';

export async function get(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const databases = await mongo.databasesJSON();

    return res.json({
      ok: true,
      databases
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: err.message
    });
  }
}
