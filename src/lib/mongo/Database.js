import Collection from './Collection';

class Database {
  constructor(database, name, size, empty) {
    this.database = database;
    this.name = name;
    this.size = size;
    this.empty = empty;
  }

  async collections() {
    const collections = await this.database.collections();
    return Promise.all(collections.map(c => new Collection(c)));
  }

  async collectionsJSON() {
    const collections = await this.collections();
    return Promise.all(collections.map(c => c.json()));
  }

  async collection(name) {
    const collection = await this.database.collection(name);
    return new Collection(collection);
  }

  json() {
    return {
      name: this.name,
      size: this.size,
      empty: this.empty
    };
  }
}

export default Database;
