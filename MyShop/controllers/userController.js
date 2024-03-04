const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const filterObj = (obj, ...allowed) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create Error if user posts password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates, Please user /updateMePassword"
      )
    );
  }
  //filtered out wanted field s names that are not allowed to be updated

  const filteredBody = filterObj(req.body, "name", "email");

  // update user document

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // response

  res.status(200).json({
    status: "Success",
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  // active create or  false

  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
