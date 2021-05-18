const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.indexView);

router.post("/add_categories", categoriesController.addCategories);

router.post("/update_categories", categoriesController.updateCategories);

router.get("/delete_categories/:name", categoriesController.deleteCategories);

exports.routes = router;
