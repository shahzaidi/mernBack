const express = require("express");
const app = express();
const cors = require("cors");
const Users = require("./models/usersModel");
const mongoose = require("mongoose");
const products = require("./router/Route");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4000", "https://mern-task-app.onrender.com"],
  })
);

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

app.listen(`${port}`, () => {
  console.log(`Server running on port ${port}`);
});
