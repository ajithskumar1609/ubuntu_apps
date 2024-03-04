const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
// set view engine
app.set("view engine", "ejs");

// serve static file
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home page" });
});
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    title: "About page",
    layout: "./layouts/aboutsLayout.ejs",
  });
});

module.exports = app;
