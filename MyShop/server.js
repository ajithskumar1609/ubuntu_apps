const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: `${__dirname}/.env` });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION * Shutting down");
  process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(`Database connection successfully ${DB}`);
  });

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App listening in port:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name);
  console.log("UNHANDLED REJECTION * Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
