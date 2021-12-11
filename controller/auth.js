const authSchema = require("../util/authSchema");
const User = require("../model/user");

exports.postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    await authSchema.signupSchema.validateAsync(data);
    const user = new User(data.username, data.name, data.password, data.email);
    await user.save();
    res.status(200).json({ data: "usersuccessfully created" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.postLogin = (req, res, next) => {};
