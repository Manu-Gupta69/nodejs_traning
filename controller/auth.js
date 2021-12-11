const authSchema = require("../util/authSchema");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    await authSchema.signupSchema.validateAsync(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User(data.username, data.name, hashedPassword, data.email);
    await user.save();
    const token = User.getToken(user.id);
    res
      .header("x-auth-token", token)
      .status(200)
      .json({ err: null, data: "user created successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err, data: null });
  }
};

exports.postLogin = async (req, res, next) => {
  const data = req.body;
  const user = await User.findOne("email", data.email);
  if (user !== null) {
    const result = await bcrypt.compare(data.password, user.password);
    if (!result) {
      res.json({ err: "Invalid Email Or Password", data: null });
      return;
    }
    const token = User.getToken(user.id);
    res
      .header("x-auth-token", token)
      .status(200)
      .json({ err: null, data: "user LoggedIn successfully" });
    return;
  }
  res.json({ err: "Invalid Email Or Password", data: null });
};
