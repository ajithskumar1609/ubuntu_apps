const PRODUCT = require("../model/productModel");
const apiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // const query = PRODUCT.find();
  const APIFeatures = new apiFeatures(PRODUCT.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();
  const products = await APIFeatures.query;
  if (!products) {
    return next(new AppError("No tour found with that ID", 404));
  }
  // console.log(products);
  res.status(200).json({
    status: "Success",
    result: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const query = PRODUCT.create(req.body);
  const product = await query;
  if (!product) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "Success",
    data: {
      product,
    },
  });
});
exports.getProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const query = PRODUCT.findById(productId);
  const product = await query;
  if (!product) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      product,
    },
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const query = PRODUCT.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });
  const updateProduct = await query;
  if (!updateProduct) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      updateProduct,
    },
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const query = PRODUCT.findByIdAndDelete(productId);
  const deleteProduct = await query;
  if (!deleteProduct) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
