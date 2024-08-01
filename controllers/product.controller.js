const Product = require("../models/product.model");

const add_new_product = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title) return res.status(400).json({ status: false, message: "Please add title of the product!" });
    if (!description) return res.status(400).json({ status: false, message: "Please add description of the product!" });
    if (!price) return res.status(400).json({ status: false, message: "Please add price of the product!" });

    let image;
    if (req.file) image = req.file.filename;

    const product_data = { title, description, price, image };
    const add_product = await Product.create(product_data);
    if (!add_product) return res.status(400).json({ status: false, message: "Unable to add product. Please try again later!" });
    return res.status(200).json({ status: true, data: add_product, message: "Product added successfully" });
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong!" });
  }
};

const get_products = async (req, res) => {
  try {
    const get_product = await Product.find();
    if (!get_product) return res.status(400).json({ status: false, message: "Unable to fetch product. Please try again later!" });
    return res.status(200).json({ status: true, data: get_product, message: "Product fetch successfully" });
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong!" });
  }
};

module.exports = {
  add_new_product,
  get_products,
};
