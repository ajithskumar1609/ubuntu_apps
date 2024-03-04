const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "sub-admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please provide a confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same",
    },
  },
  passwordCreatedAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encryption and hash  password save in database //

userSchema.pre("save", async function (next) {
  // only run this function is password was actually modified //
  if (!this.isModified("password")) return next();

  // Hash the password and cost 12//

  this.password = await bcrypt.hash(this.password, 12);

  // delete the confirm password //
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordCreatedAt = Date.now() - 1000;
  next();
});

// filter active true query middle ware

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// compare password decryption // instance method in schema

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword); // enter the password , hash password
};
// check if user password changed after the token was issued

userSchema.methods.passwordChangeAfter = function (JWTTimestamp) {
  if (this.passwordCreatedAt) {
    const changTimeStamp = parseInt(
      this.passwordCreatedAt.getTime() / 1000,
      10
    );
    // console.log(changTimeStamp, JWTTimestamp);
    return JWTTimestamp < changTimeStamp;
    //100 < 200; // true
  }
  return false;
};
2;
userSchema.methods.createPasswordResetToken = function () {
  // reset Token

  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
