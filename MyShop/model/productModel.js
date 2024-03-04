const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      maxlength: [20, "A product name below 20 characters"],
      minlength: [5, "A product name above 5 characters"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    secret: {
      type: Boolean,
      default: false,
    },
    ratingsAverage: {
      type: Number,
      validate: {
        validator: function (val) {
          return val >= 1 && val <= 5;
        },
        message: "A rating Average below in 1 and before in 5",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("priceDouble").get(function () {
  return this.price * 2;
});

// Document Middleware // run before .save() or .create() not work insertMany

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
productSchema.post("save", function (doc, next) {
  // console.log(doc);
  next();
});

// Query Middleware //
productSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } });
  this.date = Date.now(); // millisecond time
  next();
});

productSchema.post(/^find/, function (doc, next) {
  console.log(`The query executed after Time is ${this.date - Date.now()}`);
  console.log(doc), next();
});

const PRODUCT = mongoose.model("PRODUCT", productSchema);

module.exports = PRODUCT;
