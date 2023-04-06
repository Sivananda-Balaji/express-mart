const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  userName: {
    type: String,
    default: function () {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});

userSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const lastUser = await User.findOne().sort({ _id: -1 });
    const newId = (lastUser && lastUser._id + 1) || 1000;
    doc._id = newId;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
