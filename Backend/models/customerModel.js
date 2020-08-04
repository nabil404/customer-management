const mongoose = require("mongoose");
const validator = require("validator");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  phone: String,
  email: {
    type: String,
    required: [true, "Email must be provided"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    lowercase: true,
  },
  address: String,
  citizenship: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
