const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Categories {
  constructor(categories_name, id) {
    this.categories_name = categories_name;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("categories")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,products.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("categories").insertOne(this);
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

  uplate(newName) {
    const db = getDb();
    let dbOp;
    dbOp = db
      .collection("categories")
      .updateOne(
        { categories_name: this.categories_name },
        { $set: { categories_name: newName } }
      );

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
      .collection("categories")
      .find()
      .toArray()
      .then((categories) => {
        console.log(categories);
        return categories;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(cateId) {
    const db = getDb();
    return db
      .collection("categories")
      .find({ _id: new mongodb.ObjectId(cateId) })
      .next()
      .then((categories) => {
        console.log(categories);
        return categories;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(cateId) {
    const db = getDb();
    return db
      .collection("categories")
      .deleteOne({ _id: new mongodb.ObjectId(cateId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteByName(cateName) {
    const db = getDb();
    return db
      .collection("categories")
      .deleteOne({ categories_name: cateName })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Categories;
