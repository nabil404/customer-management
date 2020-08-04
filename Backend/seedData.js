const fs = require("fs");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const User = require("./models/userModel");

const DB = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.av7uw.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Succcessful"));

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);

const seedData = async () => {
  try {
    await User.create(users);
    console.log("Users added");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seedData();
