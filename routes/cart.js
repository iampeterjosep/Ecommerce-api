const router = require("express").Router();
const cartController = require("../controllers/cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verify");

// create cart
router.route("/").post(verifyToken, cartController.createCart);

// update cart
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, cartController.updateCart);

//   delete cart
router
  .route("/:id")
  .delete(verifyTokenAndAuthorization, cartController.deleteCart);

//   get user cart
router
  .route("/find/:userId")
  .get(verifyTokenAndAuthorization, cartController.getUserCart);

//   get all carts
router.route("/").get(verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;
