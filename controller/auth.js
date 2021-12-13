const authSchema = require("../util/authSchema");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.postSignup = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data ->", data);
    await authSchema.signupSchema.validateAsync(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User(data.username, data.name, hashedPassword, data.email);
    await user.save();
    const token = User.getToken(user.id);
    console.log("usertoken ->", token);
    res
      .header("X-AUTH-TOKEN", token)
      .status(201)
      .json({ err: null, data: user });
    console.log("returning");
    return;
  } catch (err) {
    console.log("err->", err);
    res.status(400).json({ err, data: null });
    return;
  }
};

exports.postLogin = async (req, res, next) => {
  const data = req.body;
  try {
    await authSchema.loginSchema.validateAsync(data);
    const user = await User.findOne("email", data.email);
    if (user !== null) {
      const result = await bcrypt.compare(data.password, user.password);
      if (!result) {
        res.json({ err: "Invalid Email Or Password", data: null });
        return;
      }
      const token = User.getToken(user.id);
      res
        .header("X-AUTH-TOKEN", token)
        .status(200)
        .json({ err: null, data: "user LoggedIn successfully" });
      return;
    }
    res.json({ err: "Invalid Email Or Password", data: null });
    return;
  } catch (err) {
    console.log(err);
    res.json({ err: err.details[0].message });
  }
};

exports.getTable = async (req, res, next) => {
  const user = await User.findOne("id", req.user._id);
  console.log("singlewithtoken", user);
  const allUsers = await User.findAll();
  res.json({ err: null, data: allUsers });
};
