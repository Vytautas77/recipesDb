const recipeModel = require("../models/recipes");

const ADD_RECIPE = async (req, res) => {
  try {
    const currentDate = new Date();

    const recipe = new recipeModel({
      title: req.body.title,
      category: req.body.category,
      date: currentDate,
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

const GET_RECIPES = async (req, res) => {
  try {
    const response = await recipeModel.find();
    return res.status(200).send({ recipes: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_RECIPE_BY_ID = async (req, res) => {
  try {
    const response = await recipeModel.findById(req.params.id);
    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const UPDATE_RECIPE = async (req, res) => {
  try {
    const response = await recipeModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res.status(200).json({ status: "Recipe was update", response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_RECIPE = async (req, res) => {
  try {
    const response = await recipeModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "Recipe was deleted", response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  UPDATE_RECIPE,
  DELETE_RECIPE,
};
