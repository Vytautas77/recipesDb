const recipeModel = require("../models/recipes");
const userModel = require("../models/users");
const adminModel = require("../models/admin");

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

const JOI_USER_COMMENT = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe does not exist" });
    }
    const userId = req.body.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    await recipeModel
      .updateOne({ _id: recipe._id }, { $push: { comments: userId } })
      .exec();
    return res.status(200).json({ message: "Comment has been purchased" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const JOI_ADMIN_COMMENT = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe does not exist" });
    }
    const adminId = req.body.adminId;
    console.log(adminId);
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "User does not exist" });
    }
    await recipeModel
      .updateOne({ _id: recipe._id }, { $push: { comments: adminId } })
      .exec();
    return res.status(200).json({ message: "Comment has been purchased" });
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
  JOI_USER_COMMENT,
  JOI_ADMIN_COMMENT,
};
