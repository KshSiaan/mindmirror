const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

function handleError(err) {
  let error = { email: "", pass: "" };

  if (err.code == 11000) {
    error.email = "This email is registered already";
  }
  return error;
}

function handleLoginError(err) {
  let error = { email: "", pass: "" };

  console.log(err);

  return error;
}

module.exports.base = (req, res) => {
  res.json({ message: "lol" });
};

module.exports.register = async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const user = await User.create({ name, email, pass });

    res.status(201).json(user);
  } catch (err) {
    const error = handleError(err);
    // console.log(error);

    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email: email });

    const passIsOk = await bcrypt.compare(pass, user.pass);
    if (passIsOk) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ email: "", pass: "The password did not match" });
    }
  } catch (err) {
    res.status(400).json({ error: "Fetch failed" });
  }
};
module.exports.checkuser = async (req, res) => {
  const { token } = req.body;

  const user = await User.findById(token);

  if (user === null) {
    res.status(400).json(user);
  } else {
    const safeUserData = {
      name: user.name,
      email: user.email,
    };
    res.status(201).json(safeUserData);
  }
  console.log(user);
};
