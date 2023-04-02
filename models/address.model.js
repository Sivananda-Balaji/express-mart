const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
