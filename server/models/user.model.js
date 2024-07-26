const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", userModel);
module.exports = User;
