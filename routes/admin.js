const express = require("express");
const { AuthenticateApi, AuthenticateAdminApi } = require("../middlewares/authenticate");
const { add_new_product, get_products, get_one_product, delete_one_product, update_one_product } = require("../controllers/product.controller");
const { upload } = require("../helpers/multer");
const router = express.Router();

router.use(AuthenticateApi);    //AUTHENTICATE USER
router.use(AuthenticateAdminApi);  //AUTHENTICATE ADMIN

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ data: "Admin route" });
});


router.post("/product", upload.single("image"), add_new_product)
router.get("/products", get_products)
router.get("/product/:id", get_one_product)
router.patch("/product/:id",  upload.single("image"), update_one_product)
router.delete("/product/:id", delete_one_product)

module.exports = router;
