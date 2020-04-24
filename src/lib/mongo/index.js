import { MongoClient } from 'mongodb';
import Server from './Server';

const errors = {
  CLIENT_NOT_INIT: 'Client is not initialized.'
};

class Mongo {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = null;
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.connectionString, {
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
        reconnectTries: 1
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async disconnect() {
    await this.client.close();
  }

  checkClient() {
    if (!this.client) {
      throw new Error(errors.CLIENT_NOT_INIT);
    }
  }

  async databases() {
    this.checkClient();

    const server = new Server(this.client);
    return server.databases();
  }

  async databasesJSON() {
    this.checkClient();

    const databases = await this.databases();
    return Promise.all(databases.map(db => db.json()));
  }

  async collections(databaseName) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);

    return database.collections();
  }

  async collectionsJSON(databaseName) {
    this.checkClient();

    const collections = await this.collections(databaseName);
    return Promise.all(collections.map(c => c.json()));
  }

  async renameCollection(databaseName, oldCollectionName, newCollectionName) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);

    const collection = await database.collection(oldCollectionName);
    return collection.rename(newCollectionName);
  }

  async deleteCollection(databaseName, collectionName) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);

    const collection = await database.collection(collectionName);
    return collection.drop();
  }

  async documents(databaseName, collectionName, opts) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);
    const collection = await database.collection(collectionName);

    return collection.find(opts);
  }

  async insertDocument(databaseName, collectionName, payload) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);
    const collection = await database.collection(collectionName);

    return collection.insert(payload);
  }

  async updateDocument(databaseName, collectionName, id, payload) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);
    const collection = await database.collection(collectionName);

    return collection.update(id, payload);
  }

  async deleteDocument(databaseName, collectionName, id) {
    this.checkClient();

    const server = new Server(this.client);
    const database = await server.database(databaseName);
    const collection = await database.collection(collectionName);

    return collection.delete(id);
  }
}

export default Mongo;
