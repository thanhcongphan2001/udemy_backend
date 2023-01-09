const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoute = require("./routes/web");
const connection = require("./config/database");
// config
configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", webRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
