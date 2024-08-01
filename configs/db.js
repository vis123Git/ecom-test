const mongoose = require("mongoose");

const connect_db = async (req, res) => {
  try {
    mongoose
      .connect(process.env.DB)
      .then(() => console.log("MongoDB Test Database Connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong!" });
  }
};

module.exports = { connect_db };
