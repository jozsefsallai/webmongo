import Database from "./Database";

class Server {
  constructor(client) {
    this.client = client;
  }

  async databases() {
    const list = await this.client.db().admin().listDatabases();
    return Promise.all(list.databases.map(db => {
      const database = this.client.db(db.name);
      return new Database(database, db.name, db.sizeOnDisk, db.empty);
    }));
  }

  async database(name) {
    const databases = await this.databases();
    return databases.find(db => db.name === name);
  }
}

export default Server;
