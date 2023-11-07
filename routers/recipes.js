const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const { recipeRegistrationSchema } = require("../validation/RecipeSchema");
const adminAuth = require("../middleware/adminAuth");
const {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  DELETE_RECIPE,
} = require("../controllers/recipes");

router.post(
  "/recipes",
  validation(recipeRegistrationSchema),
  adminAuth,
  ADD_RECIPE
);
router.get("/recipes", GET_RECIPES);
router.get("/recipes/:id", GET_RECIPE_BY_ID);
router.put(
  "/recipes/:id",
  validation(recipeRegistrationSchema),
  adminAuth,
  GET_RECIPE_BY_ID
);
router.delete("/recipes/:id", adminAuth, DELETE_RECIPE);

module.exports = router;
