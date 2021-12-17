const notFound = (req, res, next) => {
  res.render("404");
};

const serverError = (req, res, next) => {
  res.render("505");
};

module.exports = {
  notFound,
  serverError,
};
