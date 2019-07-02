const express = require("express");
const app = express();

const webuxQuery = require("../index");

const blacklist = ["password", "birthday"];
const select = ["username", "email"];

app.get("/", webuxQuery(blacklist, select), (req, res, next) => {
  res.status(200).json({
    query: req.query,
    status: "Valid !"
  });
});

app.use("*", (error, req, res, next) => {
  return res.status(error.code).json({ error: error });
});

app.listen(1337);
