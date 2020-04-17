import Mongo from '../../../../../lib/mongo';

export async function get(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  const { db, collection } = req.params;

  try {
    const query = (req.query.q && JSON.parse(req.query.q)) || {};
    const sort = (req.query.sort && JSON.parse(req.query.sort)) || {};
    const project = (req.query.project && JSON.parse(req.query.project)) || '';
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = parseInt(req.query.skip, 10) || 0;

    const opts = {
      query,
      sort,
      project,
      limit,
      skip
    };

    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const documents = await mongo.documents(db, collection, opts);

    return res.json({
      ok: true,
      documents
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: err.message
    });
  }
}
