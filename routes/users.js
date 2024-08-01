const express = require("express");
const { AuthenticateApi } = require("../middlewares/authenticate");
const { add_to_cart, remove_to_cart, user_cart } = require("../controllers/cart.controller");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.use(AuthenticateApi); //AUTHENTICATE USER

router.post("/add-to-cart", add_to_cart);
router.post("/remove-to-cart", remove_to_cart);
router.get("/my-cart", user_cart);

module.exports = router;
