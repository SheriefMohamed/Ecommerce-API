const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

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

exports.postReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Email not found !");
    }
    const token = Date.now().toString();
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save()
    transporter.sendMail({
      to: req.body.email,
      from: 'sherieffool@gmail.com',
      subject: 'Password reset',
      html: `
        <p>You requested a password reset</p>
        <p>Verification code : ${token}</p>
      `
    });
    return res.status(200).send("Check your mail !")
  } catch(err) {
    res.send(err);
  }
}

exports.postResetNewPassword = async (req, res) => {
  console.log("there")
  try {
    const user = await User.findOne({resetToken : req.body.token, resetTokenExpiration: { $gt: Date.now() }})
    if(!user){
      return res.status(404).send("Invaled token");
    }
    user.password = await bcrypt.hash(req.body.password, 12);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    const updatedUser = await user.save();
    return res.status(200).send(updatedUser);
  } catch(err) {
    res.send(err)
  }
}