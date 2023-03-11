const router = require("express").Router();
const productController = require("../controllers/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verify");

// create product
router.route("/").post(verifyTokenAndAdmin, productController.createProduct);

// update product
router.route("/:id").put(verifyTokenAndAdmin, productController.updateProduct);

// delete product
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, productController.deleteProduct);

// get product
router
  .route("/find/:id")
  .get(verifyTokenAndAdmin, productController.getProduct);

// get all products
router.route("/").get(verifyTokenAndAdmin, productController.getAllProducts);

module.exports = router;
