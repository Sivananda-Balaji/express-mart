const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Number,
    ref: "User",
  },
  product: {
    type: Number,
    ref: "Product",
  },
  shippingAddress: {
    type: Number,
    ref: "Address",
  },
});

orderSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const lastOrder = await Order.findOne().sort({ _id: -1 });
    const newId = (lastOrder && lastOrder._id + 1) || 4000;
    doc._id = newId;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
