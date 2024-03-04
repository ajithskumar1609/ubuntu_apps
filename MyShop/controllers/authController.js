const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const createSendToken = (user, status, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(200).json({
    status: "Success",
    token,
    data: {
      user: user,
    },
  });
};

const signToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // create user
  const newUser = await User.create(
    req.body
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
    // passwordCreatedAt: req.body.passwordCreatedAt,
  );

  // token creating mean signing //

  const token = signToken(newUser._id);
  // send response
  createSendToken(newUser, 200, res);
  // res.status(200).json({
  //   status: "Success",
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // if email and password check

  if (!email || !password) {
    return next(new AppError("Please provide email or password", 401));
  }

  // check if user exist and password correct //

  const user = await User.findOne({ email: email }).select("+password");
  // console.log(user);

  const correct = await user.correctPassword(password, user.password);
  // console.log(correct);

  if (!user || !correct) {
    return next(new AppError("Invalid email or password", 401));
  }

  // if everything ok ,send token to client //

  const token = signToken(user._id);

  // res.status(200).json({
  //   status: "Success",
  //   token,
  // });
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //console.log(req.headers.authorization);

  // Getting token and check of its there token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }

  if (!token) {
    return next(
      new AppError("You are not logged in ,Please log in to get access", 401)
    );
  }

  // Verification token

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);

  // check if user still exists

  const currentUser = await User.findOne({ _id: decode._id });

  if (!currentUser) {
    return new AppError(
      "The user belonging to this token does no longer exists",
      401
    );
  }
  console.log(currentUser);

  // check if user changed password after the token was issued

  if (currentUser.passwordChangeAfter(decode.iat)) {
    return next(
      new AppError("User recently changed password, please log in again", 401)
    );
  }

  // Grand Access to protected Route
  req.user = currentUser;
  next();
});

// restrictTo route

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // array in roles ['admin','sub-admin'] // check
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      console.log(req.user.role);
      return next(new AppError("This user not access the property", 401));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //Get user based on posted email

  const user = await User.findOne({ email: req.body.email });

  // if user exits

  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  console.log(user);

  // Generate Random Reset Token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log(resetToken);

  // reset token send email

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to ${resetURL}.\n If you didn't forget your password,Please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minute)",
      message,
    });
    res.status(200).json({
      status: "Success",
      message: "Take sent to the email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error send by the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // user based on the token come token encrypt

  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const currentUser = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  // If token has not expired,and there is use,set new password

  if (!currentUser) {
    return next(new AppError("Invalid Token or Expire", 500));
  }

  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  currentUser.passwordResetToken = undefined;
  currentUser.passwordResetExpire = undefined;
  await currentUser.save();

  // update change password property for the user //
  // document middle ware //

  // log the user in send Jwt

  // const token = signToken(currentUser._id);
  // res.status(200).json({
  //   status: "Success",
  //   token,
  // });
  createSendToken(currentUser, 200, res);
});

exports.updateMePassword = catchAsync(async (req, res, next) => {
  // Get user from collection

  const currentUser = await User.findById(req.user._id).select("+password");
  // console.log(currentUser);

  // check if posted current password is correct

  if (
    !(await currentUser.correctPassword(
      req.body.passwordCurrent,
      currentUser.password
    ))
  ) {
    return next(new AppError("Invalid password!", 401));
  }
  // it so update password

  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  await currentUser.save();

  const token = jwt.sign({ _id: currentUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  createSendToken(currentUser, 200, res);
});
