const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("admin", adminSchema);
