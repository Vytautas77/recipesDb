const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const { recipeRegistrationSchema } = require("../validation/RecipeSchema");
const { ADD_RECIPE } = require("../controllers/recipes");

router.post("/recipes", validation(recipeRegistrationSchema), ADD_RECIPE);

module.exports = router;
