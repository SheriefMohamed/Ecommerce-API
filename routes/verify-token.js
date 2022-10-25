const jwt = require("jsonwebtoken");
require("dotenv/config");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET,
      (err, user) => {
        if (err) {
          return res.status(403).send("Token is not valid !");
        }
        req.user = user;
        next()
      }
    );
  } else {
    return res.status(401).send("You are not authenticated !");
  }
};

exports.verifyUser = (req,res,next) => {
    return req.user.id === req.params.id || req.user.isAdmin
          ? next()
          : res.status(403).send("You are not allowed to do that !");
}

exports.verifyAdmin = (req,res,next) => {
    return req.user.isAdmin
          ? next()
          : res.status(403).send("You are not allowed to do that !");
}
