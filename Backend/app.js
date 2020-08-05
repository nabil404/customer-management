const express = require("express");
var cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./utils/errorHandler");

//Import Routes
const usersRoutes = require("./routes/usersRoute");
const customersRoutes = require("./routes/customersRoute");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/customers", customersRoutes);

//Handling urls not defined
app.all("*", (req, res, next) => {
  next(
    errorHandler.sendError(
      `Can't find ${req.originalUrl} on this server`,
      "failed",
      404
    )
  );
});

//Error handling
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
