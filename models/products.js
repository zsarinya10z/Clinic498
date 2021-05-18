const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Products {
  constructor(
    service,
    categories,
    detail,
    path,
    id
  ) {
    this.service = service;
    this.categories = categories;
    this.detail = detail;
    this.path = path;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("service")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,service.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("service").insertOne(this);
      //   db.service.insertOne({"name":"abd"});
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TEST
  updateCategories(oldName, newName) {
    const db = getDb();
    let dbOp;
    dbOp = db
      .collection("service")
      .updateMany({ categories: oldName }, { $set: { categories: newName } });
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // TEST

  static fetchAll() {
    const db = getDb();
    return db
      .collection("service")
      .find()
      .toArray()
      .then((service) => {
        console.log(service);
        return service;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByCategories(categories) {
    const db = getDb();
    return db
      .collection("service")
      .find({ categories: categories })
      .toArray()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("service")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByName(prodName) {
    const db = getDb();
    return db
      .collection("service")
      .find({ service: prodName })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("service")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Products;
