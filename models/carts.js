const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Carts {
  constructor(product_name, price, quantity, path, id) {
    this.product_name = product_name;
    this.price = price;
    this.quantity = quantity;
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
      .deleteOne({ product_name: prodName })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Carts;
