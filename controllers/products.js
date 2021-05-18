const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Service = require("../models/products");
const Category = require("../models/category");
// const Docter = require("../models/docter");
const ObjectId = mongodb.ObjectId;

exports.showDetail = (req, res, next) => {
    // const { service_id } = req.params;
    Service.fetchAll()
        .then((service) => {
            Category.fetchAll().then((category) => {
                Docter.fetchAll().then((docter) => {
                    res.render("service/service_detail", {
                        pageTitle: "Detail service",
                        service: service,
                        category: category,
                        docter: docter,
                    });
                });
            });
        });
};

exports.viewServiceByCategory = (req, res, next) => {
    const { category } = req.params;
    Service.findByCategory(category)
        .then((service) => {
            Category.fetchAll()
                .then((category) => {
                    Cart.fetchAll().then((cart) => {
                        res.render("service/service_detail", {
                            pageTitle: "Service",
                            service: service,
                            category: category,
                            docter: docter,
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

exports.addToCart = (req, res, next) => {
    const { add_to_cart, quantity } = req.body;
    Service.findByName(add_to_cart).then((service) => {
        service_name = service.service_name;
        price = service.price;
        path = service.path;
        const cart = new Cart(service_name, price, quantity, path);
        cart
            .save()
            .then((result) => {
                res.redirect("/service");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
exports.getSearchProduct = (req, res, next) => {
    Product.fetchAll()
        .then(service => {
            res.render('service/search', {
                pageTitle: 'Search Product',
                prods: service,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const price = '';
    res.render('service/insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_name: product_name,
        price: price
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { product_name, price } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('service/insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            price: price
        });
    }

    const product = new Product(product_name, price);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/service');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            res.render('service/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    const { service_id, service_name, price } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('service/update', {
            pageTitle: 'Update Service',
            errorMessage: errors.array(),
            service_id: service_id,
            service_name: service_name,
            price: price
        });
    }

    const service = new Service(service_name, price, new ObjectId(service_id));
    service
        .save()
        .then(result => {
            console.log('Update service');
            res.redirect('/service');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/service');
        })
        .catch(err => console.log(err));
};

exports.productUpdateCategory = (req, res, next) => {
    const { category } = req.body;
    const errors = validationResult(req);

    const product = new Product("update", category);
    product
        .save()
        .then((result) => {
            console.log("Update Product");
            res.redirect("/stock");
        })
        .catch((err) => console.log(err));
};