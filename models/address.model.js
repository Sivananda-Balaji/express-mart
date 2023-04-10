const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
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
    type: Number,
    ref: "User",
  },
});

addressSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const lastAddress = await ShippingAddress.findOne().sort({ _id: -1 });
    const newId = (lastAddress && lastAddress._id + 1) || 2000;
    doc._id = newId;
  }
  next();
});

const ShippingAddress = mongoose.model("Address", addressSchema);

module.exports = ShippingAddress;
