const authSchema = require("../util/authSchema");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    await authSchema.signupSchema.validateAsync(data);
    const hashedpassword = await bcrypt.hash(data.password, 12);
    const user = new User(data.username, data.name, hashedpassword, data.email);
    await user.save();
    res.status(200).json({ data: "user created successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.postLogin = (req, res, next) => {};
