const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  repeatPassword: joi.string().required(),
});

const userLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { userSchema, userLoginSchema };
