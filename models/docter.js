const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Docter {
  constructor(name_doctor,position,tell, path, id) {
    this.name_doctor = name_doctor;
    this.position = position;
    this.tell = tell;
    this._id = id;
    this.path = path;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("docter")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,products.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("docter").insertOne(this);
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
      .collection("docter")
      .updateOne(
        { name_docter: this.name_docter },
        { $set: { name_docter: newName } }
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
      .collection("docter")
      .find()
      .toArray()
      .then((docter) => {
        console.log(docter);
        return docter;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(cateId) {
    const db = getDb();
    return db
      .collection("docter")
      .find({ _id: new mongodb.ObjectId(cateId) })
      .next()
      .then((docter) => {
        console.log(docter);
        return docter;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(cateId) {
    const db = getDb();
    return db
      .collection("docter")
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
      .collection("docter")
      .deleteOne({ name_docter: cateName })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Docter;
