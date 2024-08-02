const { isValidObjectId } = require("mongoose");
const Product = require("../models/product.model");

const add_new_product = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title) return res.status(400).json({ status: false, message: "Please add title of the product!" });
    if (!description) return res.status(400).json({ status: false, message: "Please add description of the product!" });
    if (!price || isNaN(price) || price < 0) return res.status(400).json({ status: false, message: "Product price missing!" });

    let image;
    if (req.file) image = req.file.filename;

    const product_data = { title, description, price: parseFloat(price.toFixed(2)), image };
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


const get_one_product = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) return res.status(400).json({ status: false, message: "Please add ID of the product!" });
    if (!isValidObjectId(id)) return res.status(400).json({ status: false, message: "Please add valid ID of the product!" });

    const get_product = await Product.findById(id);
    if (!get_product) return res.status(400).json({ status: false, message: "Unable to fetch product. Please try again later!" });
    return res.status(200).json({ status: true, data: get_product, message: "Product fetch successfully" });
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong!" });
  }
}

const delete_one_product = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) return res.status(400).json({ status: false, message: "Please add ID of the product!" });
    if (!isValidObjectId(id)) return res.status(400).json({ status: false, message: "Please add valid ID of the product!" });

    const get_product = await Product.findByIdAndDelete(id);
    if (!get_product) return res.status(400).json({ status: false, message: "Unable to delete product. Please try again later!" });
    return res.status(200).json({ status: true, message: "Product delete successfully" });
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong!" });
  }
}


module.exports = {
  add_new_product,
  get_products,
  get_one_product,
  delete_one_product
};
