const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Categories = require("../models/categories");
const Product = require("../models/products");
const Cart = require("../models/carts");
const ObjectId = mongodb.ObjectId;

exports.indexView = (req, res, next) => {
  Categories.fetchAll()
    .then((categories) => {
      Cart.fetchAll().then((cart) => {
        res.render("products/categories_admin", {
          pageTitle: "Categories",
          categories: categories,
          product_cart: cart,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addCategories = (req, res, next) => {
  const { categories_name, btnSave } = req.body;
  // const errors = validationResult(req);
  if (btnSave == "create") {
    const categories = new Categories(categories_name);
    categories
      .save()
      .then((result) => {
        res.redirect("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (btnSave == "edit") {
  } else {
    console.log("else : ", categories_name, btnSave);
  }
};

exports.updateCategories = (req, res, next) => {
  const { categories_name, old_name } = req.body;
  // const errors = validationResult(req);
  const categories = new Categories(old_name);
  const product = new Product();
  categories
    .uplate(categories_name)
    .then((result) => {
      product.updateCategories(old_name, categories_name).then((result) => {
        res.redirect("/categories");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteCategories = (req, res, next) => {
  const { name } = req.params;
  Categories.deleteByName(name)
    .then(() => {
      res.redirect("/categories");
    })
    .catch((err) => console.log(err));
};
