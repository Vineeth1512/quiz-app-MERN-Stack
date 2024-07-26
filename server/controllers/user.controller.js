const User = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log(req.body);
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const role = email.endsWith("@admin.com") ? 1 : 0;

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({
        message: "Your Email Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    return res.status(200).json({
      message: " Registered Successfull..!",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required...!",
      });
    }

    const userEmail = await User.findOne({ email: email });
    if (!userEmail) {
      return res.status(400).json({
        message: "Email Does Not Exist...!",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, userEmail.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Entered Wrong Password...!",
      });
    }
    return res.status(200).json({
      message: "User logged in successfully..",
      user: userEmail,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Please Enter Email..",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "This Email Does Not Exist..!",
      });
    }
    return res.status(200).json({
      message: "Next Page You Can Change Your Password..!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Require all fields...!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "This Email Does Not Exist..!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(200).json({
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
