const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/routes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

mongoose.connect(process.env.DBURI, {}).then(() => {
  console.log("connected to db");
});

app.use(router);
