const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
    )
    .required(),
  confirm: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
    )
    .required(),
});

module.exports = { signupSchema, loginSchema };
