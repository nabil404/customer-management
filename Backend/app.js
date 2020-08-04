const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Import Routes

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
//app.use();

module.exports = app;
