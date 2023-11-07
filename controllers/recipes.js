const recipeModel = require("../models/recipes");

const ADD_RECIPE = async (req, res) => {
  try {
    const recipe = new recipeModel({
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      image: req.body.image,
      content: req.body.content,
      titleIngredients: [],
      titleMarinateIngredients: [],
      description: req.body.description,
      comments: [],
    });
    recipe.id = recipe._id;
    const response = await recipe.save();
    return res.status(200).json({ status: "Recipe was created", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { ADD_RECIPE };
