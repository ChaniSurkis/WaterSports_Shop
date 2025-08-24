const express = require('express');
const router = express.Router();
const controllerCart = require('../controller/cart')


router.post("/", controllerCart.post);
router.get("/:id",controllerCart.getById)
router.delete("/:userId/:productId", controllerCart.delete);
// router.delete("/clear/:userId", controllerCart.clearCart);
// // route
router.delete("/:userId", controllerCart.clearCart);


module.exports = router;