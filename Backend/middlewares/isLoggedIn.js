const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

//Middleware for checking login state
const isLoggedIn = async (req, res, next) => {
  try {
    let token;
    // Check for token in the request header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token send error
    if (!token) {
      return next(
        errorHandler.sendError("Please login to continue", "failed", 400)
      );
    }

    //Verify Token and get id from decoded value
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const { id } = decoded;

    //Find user by id
    const user = await User.findById(id);

    //If no user send error
    if (!user) {
      return next(
        nerrorHandler.sendError("User does not exists", "failed", 404)
      );
    }

    //Pass the user for further processing
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isLoggedIn;
