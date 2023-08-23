const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pleace Enter Your Name"],
    maxLength: [30, "Name Connot Exeed 30 Characters"],
    minLength: [4, "Name Should have More Than 4 Characters"],
  },
  email: {
    type: String,
    required: [true, "Pleace Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Pleace Enter a validetor Email"],
  },
  password: {
    type: String,
    required: [true, "Pleace Enter Your Password"],
    minLength: [8, "Name Should have More Than 8 Characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.pre("save", async function (next) {
// console.log(this.inModified("password"));
// if (!this.inModified("password")) {
// next();
// }
// this.password = await bcrypt.hash(this.password, 10);
// });

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("home", this.password, enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  // generating token
  // console.log("first")
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and add to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  console.log("-----------", resetToken);
  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
