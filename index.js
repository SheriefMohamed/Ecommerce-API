const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require('cors');
const multer = require("multer");

const app = express();

app.use(cors())

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

const fileFilter = (req,file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new Error('Only images are allowed !'))
};
app.use(
  multer({ storage: multer.diskStorage({}), fileFilter: fileFilter }).single(
    "image"
  )
);

app.use("/api/auth", require('./routes/auth-route'));
app.use("/api/users", require('./routes/user-route'));
app.use("/api/products", require('./routes/product-route'));
app.use("/api/carts", require('./routes/cart-route'));
app.use("/api/orders", require('./routes/order-route'));

app.use((error,req, res, next) => {
  let statusCode = 400;
  if(error.statusCode)
      statusCode = error.statusCode;
  res.status(statusCode).send(error.message);
  next();
})

mongoose
  .connect(process.env.DATABASE_LINK)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected !");
    });
  })
  .catch((err) => {
    console.log(err);
  });