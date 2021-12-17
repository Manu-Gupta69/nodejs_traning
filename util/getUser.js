const getUser = async (req, res, next) => {
  try {
    if (req.session.userid) {
      const user = await User.findOne({ where: { id: req.session.userid } });
      req.user = user;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
