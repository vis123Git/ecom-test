const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { get_products } = require('../controllers/product.controller');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/signup", signup)
router.post("/login", login)
router.get("/products", get_products)

module.exports = router;
