import Mongo from '@/lib/mongo';

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
    const { count, documents } = await mongo.documents(db, collection, opts);
    await mongo.disconnect();

    return res.json({
      ok: true,
      count,
      documents
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid JSON in fetch request.'
      });
    }

    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}

export async function post(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  const { db, collection } = req.params;
  const { payload } = req.body;

  if (!payload) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid JSON.'
    });
  }

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const document = await mongo.insertDocument(db, collection, payload);
    await mongo.disconnect();

    return res.json({
      ok: true,
      document
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      error: err.message
    });
  }
}

export async function patch(req, res) {
  const connectionString = req.get('Connection-String');
  if (!connectionString) {
    return res.status(400).json({
      ok: false,
      error: 'The connection string is missing from your request.'
    });
  }

  const { db, collection } = req.params;
  const { name } = req.body;

  if (!name || !name.length) {
    return res.status(400).json({
      ok: false,
      error: 'The provided name is invalid.'
    });
  }

  try {
    const mongo = new Mongo(connectionString);
    await mongo.connect();
    const data = await mongo.renameCollection(db, collection, name);
    await mongo.disconnect();

    return res.json({
      ok: true,
      collection: data
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
