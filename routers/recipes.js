const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const { recipeRegistrationSchema } = require("../validation/RecipeSchema");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");
const {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  DELETE_RECIPE,
  JOI_USER_COMMENT,
  JOI_ADMIN_COMMENT,
} = require("../controllers/recipes");

router.post(
  "/recipes",
  validation(recipeRegistrationSchema),
  adminAuth,
  ADD_RECIPE
);
router.post("/recipes/userComment/:id", auth, JOI_USER_COMMENT);
router.post("/recipes/adminComment/:id", adminAuth, JOI_ADMIN_COMMENT);
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
