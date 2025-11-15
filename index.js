const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("*", (req, res) => {
  res.send("Route not found!");
});

app.use((err, req, res, next) => {
  res.send("Error happened!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
