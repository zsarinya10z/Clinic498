const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Product = require("../models/products");
const Cart = require("../models/carts");
const Categories = require("../models/categories");
const ObjectId = mongodb.ObjectId;

exports.indexView = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/index", {
        pageTitle: "it.next",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showCart = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/shopping_cart", {
        pageTitle: "Cart",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showDetail = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/it_shop_detail", {
        pageTitle: "Detail",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewCreate = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/create_product", {
        pageTitle: "Create",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { product_name, categories, price, quantity, description } = req.body;
  const { filename } = req.file;
  let path = "/product_image/" + filename;
  const errors = validationResult(req);

  const product = new Product(
    product_name,
    categories,
    price,
    quantity,
    description,
    path
  );
  product
    .save()
    .then((result) => {
      res.redirect("/stock");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  Product.deleteById(product_id)
    .then(() => {
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

exports.deleteProductCart = (req, res, next) => {
  const { name } = req.params;
  Cart.deleteByName(name)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.adminStock = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Cart.fetchAll().then((carts) => {
        res.render("products/admin_stock", {
          pageTitle: "Stock",
          products: products,
          product_cart: carts,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Categories.fetchAll().then((categories) => {
        Cart.fetchAll().then((cart) => {
          res.render("products/all_products", {
            pageTitle: "Products",
            products: products,
            categories: categories,
            product_cart: cart,
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewProductByCategories = (req, res, next) => {
  const { categories } = req.params;
  Product.findByCategories(categories)
    .then((products) => {
      Categories.fetchAll()
        .then((categories) => {
          Cart.fetchAll().then((cart) => {
            res.render("products/all_products", {
              pageTitle: "Products",
              products: products,
              categories: categories,
              product_cart: cart,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.adminEdit = (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .then((product) => {
      Categories.fetchAll().then((categories) => {
        Cart.fetchAll().then((cart) => {
          product_name = product.product_name;
          price = product.price;
          category = product.categories;
          res.render("products/edit", {
            pageTitle: "Edit",
            errorMessage: null,
            product_id: product_id,
            product_name: product_name,
            category: category,
            categories: categories,
            price: price,
            quantity: product.quantity,
            description: product.description,
            path: product.path,
            product_cart: cart,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.productDetail = (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .then((product) => {
      Cart.fetchAll().then((cart) => {
        product_name = product.product_name;
        price = product.price;
        res.render("products/product_detail", {
          pageTitle: "Product Detail",
          errorMessage: null,
          product_id: product_id,
          product_name: product_name,
          price: price,
          quantity: product.quantity,
          description: product.description,
          path: product.path,
          product_cart: cart,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const { add_to_cart, quantity } = req.body;
  Product.findByName(add_to_cart).then((product) => {
    product_name = product.product_name;
    price = product.price;
    path = product.path;
    const cart = new Cart(product_name, price, quantity, path);
    cart
      .save()
      .then((result) => {
        res.redirect("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postUpdateProduct = (req, res, next) => {
  const {
    product_id,
    product_name,
    price,
    quantity,
    description,
    categories,
  } = req.body;
  const { filename } = req.file;
  let path = "/product_image/" + filename;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/edit", {
      pageTitle: "Edit",
      errorMessage: errors.array(),
      product_id: product_id,
      product_name: product_name,
      price: price,
      quantity: quantity,
      description: description,
    });
  }

  const product = new Product(
    product_name,
    categories,
    price,
    quantity,
    description,
    path,
    new ObjectId(product_id)
  );
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

exports.productUpdateCategories = (req, res, next) => {
  const { categories } = req.body;
  const errors = validationResult(req);

  const product = new Product("update", categories);
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

//--------------------------->  End Section
