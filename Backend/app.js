const express = require("express");
const morgan = require("morgan");

//Import Routes

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
// app.use("/api/v1/users", usersRoutes);
// app.use("/api/v1/customers", customersRoutes);

module.exports = app;
