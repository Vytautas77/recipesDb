const joi = require("joi");

const recipeRegistrationSchema = joi.object({
  category: joi.string().required(),
  title: joi.string().required(),
  //   date: joi.string().required(),
  author: joi.string().required(),
  image: joi.string().required(),
  content: joi.string().required(),
  //   titleIngredients: joi.array().required(),
  //   titleMarinateIngredients: joi.array().required(),
  description: joi.string().required(),
  //   comments: joi.array().required(),
});

module.exports = { recipeRegistrationSchema };
