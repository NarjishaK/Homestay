const asyncHandler = require("express-async-handler");
const UserModel = require("../modals/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { updatecategory } = require("./admin-controller");

exports.userRegistration = asyncHandler(async (req, res) => {
  const { username, password, confirm, address, email, phone } = req.body;
  const image = req.file.filename;
  try {
    const users = await UserModel.findOne({ email });
    if (users) {
      return res
        .status(400)
        .json({ invalid: true, message: "email already exist" });
    }
    const user = await UserModel.create({
      username: username,
      phone: phone,
      email: email,
      password: password,
      confirm: confirm,
      address: address,
      image: image,
    });
    if (user) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "an error occured in user registration" });
  }
});

exports.loginuser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email: email });
  const isPasswordIsMatch = await bcrypt.compare(password, user.password);
  if (user && isPasswordIsMatch) {
    const userDetails = {
      id: user._id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      address: user.address,
      image: user.image,
    };
    const token = jwt.sign({ email: user.emai }, "myjwtsecretkey");
    user.tokens = token;
    user.save();
    res.status(200).json({ token: token, userDetails: userDetails });
  } else {
    res.status(400).json({ invalid: true, message: "Invalid credential" });
  }
});

exports.userlist = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.find();
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in user listing" });
  }
});

exports.deleteuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ err: "user not found" });
    }
    await user.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: " an error occured in delete user" });
  }
});

exports.edituser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ err: "user not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in user edititing" });
  }
});

exports.userupdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, phone, email, address } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ err: "user not found" });
    }
    user.username = username;
    user.phone = phone;
    user.emai = email;
    user.address = address;
    if (req.file) {
      user.image = req.file.filename;
    }
    const userupdate = await user.save();
    res.json(userupdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured in update user" });
  }
});
