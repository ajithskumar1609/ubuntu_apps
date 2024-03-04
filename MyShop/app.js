const express = require("express");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouters");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// global middle ware

// security of http headers

app.use(helmet());

// development logger

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// api test
app.get("/", (req, res) => {
  res.send("API HOT");
});

// body parser data from client {req.body}
app.use(express.json());

// Data sanitization against noSql query injection

app.use(mongoSanitize());

// Data sanitization against xss

app.use(xss());

// rate limit use avoid many request same ip

// preventing parameter pollution

app.use(
  hpp({
    whitelist: ["price", "ratingsAverage"],
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this Ip , please try again in a hour",
});

app.use("/api", limiter);

app.use("/api/v1/product", productRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Invalid path:${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
