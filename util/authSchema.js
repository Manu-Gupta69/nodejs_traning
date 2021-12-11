const Joi = require("joi");

exports.signupSchema = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
  ),
  confirm: Joi.ref("password"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
