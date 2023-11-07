const express = require("express");
const router = express.Router();
const { ADD_ADMIN, ADMIN_LOGIN, GET_ADMIN } = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");

router.post("/admin", adminAuth, ADD_ADMIN);
router.post("/admin/login", ADMIN_LOGIN);
router.get("/admin", adminAuth, GET_ADMIN);

module.exports = router;
