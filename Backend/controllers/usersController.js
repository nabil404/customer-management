const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

//Import User Model
const User = require("../models/userModel");

exports.login = async (req, res, next) => {
  try {
    //Retrieve username and body from request body
    const { username, password } = req.body;

    //Check for empty username or password field
    if (!username || !password) {
      return next(
        errorHandler.sendError("Provide username or password", "failed", 400)
      );
    }

    //Find user by username
    const user = await User.findOne({ username }).select("+password");

    //Verify user password
    if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(
        errorHandler.sendError("Incorrect email or password", "failed", 400)
      );
    }

    //Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    //Send token in response
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};
