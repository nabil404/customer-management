const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username must be provided"],
  },
  role: {
    type: String,
    enum: ["admin", "advisor"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be atleast 8 characters long"],
    select: false,
  },
});

//Password Hash
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//Method for verifying password, retuns true if verified
UserSchema.methods.verifyPassword = async function (
  candidatePassword,
  actualPassword
) {
  return await bcrypt.compare(candidatePassword, actualPassword);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
