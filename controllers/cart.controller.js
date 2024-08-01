const { isValidObjectId } = require("mongoose");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const add_to_cart = async (req, res) => {
  try {
    let { product_id } = req.body;
    if (!product_id) return res.status(400).json({ status: false, message: "Product details missing!" });
    if (!isValidObjectId(product_id)) return res.status(400).json({ status: false, message: "Product details missing!" });

    const find_item = await Product.findById(product_id);
    if (!find_item) return res.status(400).json({ status: false, message: "Product details not found" });

    let amount = find_item.price;

    let cartData = {
      user_id: user_id,
      product_id,
      amount,
      quantity: 1,
    };

    //SAVE THE CART DETAILS TO THE DB
    const add_cart = await Cart.create(cartData);
    if (!add_cart) return res.status(400).json({ status: false, message: "Add to cart failed!!" });

    return res.status(200).json({ status: true, data: add_cart, message: "Item added to cart successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

const remove_to_cart = async (req, res) => {
  try {
    const user_id = req.tokenData.user_id;

    let { product_id } = req.body;
    if (!product_id) return res.status(400).json({ status: false, message: "Product details missing!" });
    if (!isValidObjectId(product_id)) return res.status(400).json({ status: false, message: "Product details missing!" });

    const find_item = await Product.findById(product_id);
    if (!find_item) return res.status(400).json({ status: false, message: "Product details not found" });

    //SAVE THE CART DETAILS TO THE DB
    const removeItem = await Cart.findOneAndDelete({ user_id, product_id });

    if (!removeItem) return res.status(400).json({ status: false, message: "Remove item to card failed!!" });

    return res.status(200).json({ status: true, message: "Item removed to cart successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

const user_cart = async (req, res) => {
  try {
    const user_id = req.tokenData.user_id;
    const user_carts = await Cart.find({ user_id }).populate("product_id");

    if (!user_carts) return res.status(400).json({ status: false, message: "Unable to fetch user cart details!!" });

    return res.status(200).json({ status: true, message: "Cart fetch successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ status: false, message: "Something went wrong" });
  }
};
module.exports = {
  add_to_cart,
  remove_to_cart,
  user_cart,
};
