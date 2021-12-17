const notFound = (req, res, next) => {
  res.render("404");
};

const serverError = (err, req, res, next) => {
  console.log(err.stack);
  res.render("505");
};

module.exports = {
  notFound,
  serverError,
};
