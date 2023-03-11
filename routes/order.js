const router = require("express").Router();
const orderController = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verify");

//create order
router.route("/").post(verifyToken, orderController.createOrder);

//update order
router.route("/:id").put(verifyTokenAndAdmin, orderController.updateOrder);

// delete order
router.route("/:id").delete(verifyTokenAndAdmin, orderController.deleteOrder);

// get user orders
router
  .route("/find/:userId")
  .get(verifyTokenAndAuthorization, orderController.getUserOrders);

//   get all orders
router.route("/").get(verifyTokenAndAdmin, orderController.getAllOrders);

//get monthly income
router
  .route("/income")
  .get(verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;
