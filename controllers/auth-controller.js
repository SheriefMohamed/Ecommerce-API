const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.postSignup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
    });
    const savedUser = await user.save();
    return res.status(200).send(savedUser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.postLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("Wrong email or password !");
  }
  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    return res.status(404).send("Wrong email or password !");
  }
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
  return res.status(200).send(token);
};
