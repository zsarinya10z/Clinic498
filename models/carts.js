const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Carts {
  constructor(service, path, id) {
    this.service = service;
    this.path = path;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("cart")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,products.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("cart").insertOne(this);
      //   db.products.insertOne({"name":"abd"});
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("cart")
      .find()
      .toArray()
      .then((cart) => {
        console.log(cart);
        return cart;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteByName(prodName) {
    const db = getDb();
    return db
      .collection("cart")
      .deleteOne({ service: prodName })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Carts;
