import mongoose from 'mongoose';

class MongoRepository {
  async connect() {
    try {
      const { NAME_DB, USER_NAME, PASSWORD } = process.env;

      await mongoose.connect(
        `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.hoppc.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`
      );
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }

  async create(model, data) {
    const newItem = await model.create(data);
    return newItem;
  }

  async findById(model, id) {
    const item = await model.findById(id);
    return item;
  }

  async find(model, filter, fields) {
    const items = await model.find(filter, fields);
    return items;
  }

  async updateOne(model, data) {
    await model.updateOne(data);
    return model;
  }

  async updateOneByFilter(model, data, filter) {
    await model.updateOne(filter, data);
    return model;
  }

  async getRef(model, fieldWithRef) {
    const ref = await model.populate(fieldWithRef);
    return ref[fieldWithRef];
  }

  async deleteOne(model) {
    const item = await model.deleteOne();
    return item;
  }
}

export default new MongoRepository();
