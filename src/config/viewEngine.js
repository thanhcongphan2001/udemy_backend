const path = require("path");
const express = require("express");
const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views")); // luu tru engine
  app.set("view engine", "ejs"); // dinh nghia xai engine nao

  //cau hinh static file
  app.use(express.static(path.join("./src", "public")));
  console.log(path.join("./src", "views"));
};
module.exports = configViewEngine;
