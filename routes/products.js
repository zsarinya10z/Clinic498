const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/NodeJS_learn/mini_project_specail/public/product_image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const productsController = require("../controllers/products");

// /admin/add-product => GET
router.get("/", productsController.indexView);

router.get("/showDetail", productsController.showDetail);

router.get("/deleteProductCart/:name", productsController.deleteProductCart);

router.get("/products", productsController.viewAllProduct);

router.get("/products/:categories", productsController.viewProductByCategories);

router.get("/create", productsController.viewCreate);

router.post(
  "/create",
  [
    upload.single("image"),
    check("product_id").not().isEmpty().withMessage("empty"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("categories")
      .isLength({ min: 1 })
      .withMessage("categories is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
    check("quantity")
      .isInt({ gt: -1 })
      .withMessage("greater than or equal to zero"),
    check("description")
      .isLength({ min: 1 })
      .withMessage("description is required"),
  ],
  productsController.postAddProduct
);

router.get("/delete/:product_id", productsController.deleteProduct);

router.get("/stock", productsController.adminStock);

router.get("/editProduct/:product_id", productsController.adminEdit);

router.get("/productDetail/:product_id", productsController.productDetail);

router.post(
  "/update",
  [
    upload.single("image"),
    check("product_id").not().isEmpty().withMessage("empty"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
    check("quantity")
      .isInt({ gt: -1 })
      .withMessage("greater than or equal to zero"),
    check("description")
      .isLength({ min: 1 })
      .withMessage("description is required"),
  ],
  productsController.postUpdateProduct
);

// End New Section

exports.routes = router;
