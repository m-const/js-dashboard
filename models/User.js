const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      uppercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login_date: {
      type: Date
    },
    role: {
      type: Array,
      required: true,
      default: ["User"],
    },
    address: [
      {
        type: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        zip: { type: String },
      },
    ],
    phone: [
      {
        type: { type: String },
        number: { type: String },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
