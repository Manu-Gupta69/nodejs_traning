const { signupSchema, loginSchema } = require("../util/authSchema");
const User = require("../model/user");
const getToken = require("../util/token");

const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const data = req.body;
    await signupSchema.validateAsync(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await User.create({
      username: data.username,
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = getToken(user.dataValues.id);

    res
      .header("X-AUTH-TOKEN", token)
      .status(201)
      .json({ err: null, data: "User created successfully" });
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
    const user = await User.findOne({ where: { email: data.email } });

    if (user) {
      const result = await bcrypt.compare(
        data.password,
        user.dataValues.password
      );
      if (!result) {
        res.json({ err: "Invalid email or password", data: null });
        return;
      }

      const token = getToken(user.dataValues.id);

      res
        .header("X-AUTH-TOKEN", token)
        .status(200)
        .json({ err: null, data: "user loggedin successfully" });
      return;
    }

    res.json({ err: "Invalid email or password", data: null });
    return;
  } catch (err) {
    res.json({ err, data: null });
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
