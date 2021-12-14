const { signupSchema, loginSchema } = require("../util/authSchema");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const data = req.body;
    await signupSchema.validateAsync(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User(data.username, data.name, hashedPassword, data.email);
    await user.save();
    const token = User.getToken(user.id);

    res
      .header("X-AUTH-TOKEN", token)
      .status(201)
      .json({ err: null, data: user });
    return;
  } catch (err) {
    res.status(400).json({ err, data: null });
    return;
  }
};

const login = async (req, res, next) => {
  const data = req.body;

  try {
    await loginSchema.validateAsync(data);
    const user = await User.findOne("email", data.email);

    if (user !== null) {
      const result = await bcrypt.compare(data.password, user.password);
      if (!result) {
        res.json({ err: "Invalid email or password", data: null });
        return;
      }

      const token = User.getToken(user.id);
      res
        .header("X-AUTH-TOKEN", token)
        .status(200)
        .json({ err: null, data: "user loggedin successfully" });
      return;
    }

    res.json({ err: "Invalid email or password", data: null });
    return;
  } catch (err) {
    console.log(err);
    res.json({ err: err.details[0].message, data: null });
  }
};

const table = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();

    res.json({ err: null, data: allUsers });
  } catch (err) {
    res.json({ err: err, data: null });
  }
};

module.exports = {
  login,
  signup,
  table,
};
