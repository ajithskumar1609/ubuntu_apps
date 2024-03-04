const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(productController.getAllProducts);
router.route("/new").post(productController.createProduct);

router.route("/:id").get(productController.getProduct);

module.exports = router;
