const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const app = require("./app");

const DB = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster-1-selise.5vr3u.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Succcessful"));

const port = process.env.NODE_SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} server in port ${port}`
  );
});
