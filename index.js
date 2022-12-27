const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv/config");
const cors = require('cors')

const app = express();

app.use(cors())

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.use("/api/auth", require('./routes/auth-route'));
app.use("/api/users", require('./routes/user-route'));
app.use("/api/products", require('./routes/product-route'));
app.use("/api/carts", require('./routes/cart-route'));
app.use("/api/orders", require('./routes/order-route'));

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