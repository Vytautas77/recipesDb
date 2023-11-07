const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  repeatPassword: { type: String, require: true },
});
module.exports = mongoose.model("user", userSchema);
