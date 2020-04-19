import { ObjectId } from 'mongodb';

class Collection {
  constructor(collection) {
    this.collection = collection;
  }

  get name() {
    return this.collection.collectionName;
  }

  async json() {
    try {
      const stats = await this.collection.stats();

      return {
        name: this.name,
        size: stats.size,
        count: stats.count
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  find(opts) {
    return this.collection.find(opts.query)
      .project(opts.project)
      .sort(opts.sort)
      .limit(opts.limit)
      .skip(opts.skip)
      .toArray();
  }

  insert(payload) {
    try {
      if (Array.isArray(payload)) {
        if (!payload.length) {
          throw new Error('You must supply at least one document.');
        }

        this.collection.insertMany(payload);
        return payload;
      }

      this.collection.insertOne(payload);
      return payload;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const document = await this.collection.findOne(ObjectId(id));
      if (!document) {
        throw new Error('Document not found.');
      }

      await this.collection.deleteOne({ _id: document._id });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Collection;
