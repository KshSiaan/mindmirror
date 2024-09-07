const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  pass: { type: String, required: true, minLength: 6 },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.pass = await bcrypt.hash(this.pass, salt);

  next();
});
const User = mongoose.model("user", userSchema);

module.exports = User;
