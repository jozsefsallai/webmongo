import Mongo from '../../../lib/Mongo';

export async function get(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.json(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const databases = await mongo.databases();

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
