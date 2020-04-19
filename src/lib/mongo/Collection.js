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
      this.collection.insert(payload);
      return payload;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Collection;
