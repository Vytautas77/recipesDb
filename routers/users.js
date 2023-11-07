const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const { userLoginSchema, userSchema } = require("../validation/userSchema");
const adminAuth = require("../middleware/adminAuth");
const { ADD_USER, LOGIN_USER, GET_USERS } = require("../controllers/users");

router.post("/users", validation(userSchema), adminAuth, ADD_USER);
router.post("/users/login", validation(userLoginSchema), LOGIN_USER);
router.get("/users", adminAuth, GET_USERS);

module.exports = router;
