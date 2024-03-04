const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connection);
    console.log("database connection successfully");
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "must have name"],
  },
  price: {
    type: Number,
    require: [true, "must have price"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

app.listen(port, () => {
  console.log(`App listening in Port ${port}`);
});
