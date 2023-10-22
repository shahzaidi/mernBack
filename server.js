const express = require("express");
const app = express();
const cors = require("cors");
// const Users = require("./models/usersModel");
const mongoose = require("mongoose");
const products = require("./router/Route");

// app.use(express.json());
// app.use(cors());

const Url =
  "mongodb+srv://yamanshah01:xVSjKt6WKnuiWn5T@spearminttest.uyqxnwo.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Coneected");
  })
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(cors());
app.use(products);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
