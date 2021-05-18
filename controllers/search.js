const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Categories = require("../models/categories");
const Product = require("../models/products");
const Cart = require("../models/carts");
const Cart = require("../models/se");
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


exports.search = (req, res, next) => {
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