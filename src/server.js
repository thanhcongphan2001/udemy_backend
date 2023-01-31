const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const fileUpload = require("express-fileupload");
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");

const connection = require("./config/database");

// config
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);
app.use("/", webRoute);
app.use("/api", apiRoute);

connection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
