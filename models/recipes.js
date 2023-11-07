const mongoose = require("mongoose");

const recipesSchema = mongoose.Schema({
  id: { type: String },
  category: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  titleIngredients: { type: Array, required: true },
  titleMarinateIngredients: { type: Array, required: true },
  description: { type: String, required: true },
  comments: { type: Array, required: true },
});
module.exports = mongoose.model("recipes", recipesSchema);
