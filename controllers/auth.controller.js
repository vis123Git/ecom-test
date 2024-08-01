const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const JWTKEY = process.env.JWTKEY;
const validator = require("validator");

const signup = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email?.trim()) return res.status(400).json({ status: false, message: "Please provide email!" });
    if (!password) return res.status(400).json({ status: false, message: "Please provide password!" });

    if (!validator.isEmail(email)) return res.status(400).json({ status: false, message: "User entered invalid email!!" });

    let check_user = await User.findOne({ email });
    if (check_user) return res.status(400).json({ status: false, message: "User already exist!" });

    let hashed_pass = crypto.HmacSHA512(password, JWTKEY);
    const new_user = await User.create({ email: email.trim().toLowerCase(), password: hashed_pass.toString() });
    if (!new_user) return res.status(400).json({ status: false, message: "Unable to signup. Please try again later!" });

    return res.status(200).json({ status: true, data: check_user, message: "SignUp Successfull" });
  } catch (error) {
    console.log("error====>", error);
    return res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email?.trim()) return res.status(400).json({ status: false, message: "Please provide email!" });
    if (!password) return res.status(400).json({ status: false, message: "Please provide password!" });

    const check_user = await User.findOne({ email });
    if (!check_user) return res.status(400).json({ status: false, message: "Invalid email!" });

    const hashed_pass = crypto.HmacSHA512(password, JWTKEY);
    if (hashed_pass != check_user.password) return res.status(400).json({ status: false, message: "Please enter correct password!" });
    // Create token
    const token = jwt.sign(
      {
        user_id: check_user._id,
        email: check_user.email,
        role: check_user.role,
      },
      process.env.JWTKEY,
      {
        expiresIn: "1d",
      }
    );
    // save user token
    const update_token = await User.findByIdAndUpdate(check_user._id, { $set: { token } }, { new: true });

    if (!update_token) return res.status(400).json({ status: false, message: "Login failed!" });
    return res.status(200).json({ status: true, data: update_token, message: "Login Success" });
  } catch (error) {
    console.log("error===>", error);
    return res.status(400).json({ status: false, message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
};
