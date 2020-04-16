const mongodb = require('mongodb');

class Mongo {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = null;
  }

  async connect() {
    try {
      this.client = await mongodb.MongoClient.connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async databases() {
    if (!this.client) {
      throw new Error('Client is not initialized.');
    }

    try {
      const list = await this.client.db().admin().listDatabases();
      return list && list.databases;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Mongo;
