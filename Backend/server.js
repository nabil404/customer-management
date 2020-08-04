const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.NODE_SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} server in port ${port}`
  );
});
