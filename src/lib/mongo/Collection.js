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

  async count(query) {
    if (!query || Object.keys(query).length === 0) {
      return this.collection.estimatedDocumentCount();
    }

    return this.collection.countDocuments(query, {
      maxTimeMS: 5000
    }).catch(() => this.collection.estimatedDocumentCount());
  }

  async find(opts) {
    const count = await this.count(opts.query);

    const documents = await this.collection.find(opts.query)
      .project(opts.project)
      .sort(opts.sort)
      .limit(opts.limit)
      .skip(opts.skip)
      .toArray();

    return { count, documents };
  }

  insert(payload) {
    try {
      if (Array.isArray(payload)) {
        if (!payload.length) {
          throw new Error('You must supply at least one document.');
        }

        payload = payload.map(doc => {
          delete doc._id; // do not set ID yourself
          return doc;
        });

        this.collection.insertMany(payload);
        return payload;
      }

      delete payload._id; // do not set ID yourself
      this.collection.insertOne(payload);
      return payload;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id, payload) {
    try {
      if (Array.isArray(payload)) {
        throw new Error('You may only provide one object.');
      }

      const document = await this.collection.findOne(ObjectId(id));
      if (!document) {
        throw new Error('Document not found.');
      }

      delete payload._id; // do not update ID

      await this.collection.replaceOne({
        _id: new ObjectId(id),
      }, payload);

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
