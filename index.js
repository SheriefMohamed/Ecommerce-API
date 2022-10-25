const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.use(require("body-parser").json());

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

  /*
    "_id" :"634ea9c5cf914418d21a2ca8", 
    "username": "Sherief",
    "email": "sherief@x.com",
    "password": "$2a$12$3hMOswPI8LwhCkERKqb9V.bWBKCiChhguSXNyheVZORlqEPmgR1lG",
    "isAdmin": false, */
