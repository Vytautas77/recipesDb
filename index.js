const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routers/users");
const recipesRouter = require("./routers/recipes");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log("ERROR: ", err);
  });

app.use(userRouter);
app.use(recipesRouter);

app.listen(process.env.PORT, () => {
  console.log(`APP started on port ${process.env.PORT}`);
});
