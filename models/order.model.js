const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  amount: {
    type: mongoose.Schema.Types.Double,
  },
  orderDate: {
    type: String,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
