var express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const app = express();

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

// serving static file
app.use(express.static(path.join(__dirname, "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs"); // so you can render('index')

// render 'index' into 'boilerplate':
app.get("/", function (req, res, next) {
  res.render("index", { what: "best", who: "me" });
});
app.get("/admin", function (req, res, next) {
  res.render("admin");
});
app.listen(3000);
