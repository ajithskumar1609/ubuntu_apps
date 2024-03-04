import express from "express";
import ejs from "ejs";

const app = express();

app.use(express.static("./public"));

app.set("view engine", ejs);
app.set("views", `./views`);

app.get("/", (req, res) => {
  res.render("base.ejs");
});

app.get("/api", (req, res) => {
  res.send("API HOT");
});

export default app;
