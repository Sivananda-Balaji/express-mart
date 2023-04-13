const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ShippingAddress = require("../models/address.model");
const { dateFormatter } = require("../utils/dateFormatter");

const createOrder = async (req, res) => {
  try {
    const { productId, addressId, quantity } = req.body;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).send({
        message: `No Product found for ID - ${productId}!`,
      });
    }
    const address = await ShippingAddress.findOne({ _id: addressId });
    if (!address) {
      return res.status(404).send({
        message: `No Address found for ID - ${addressId}!`,
      });
    }
    if (
      (product && product.availableItems === 0) ||
      quantity > product.availableItems
    ) {
      return res.status(404).send({
        message: `Product with ID - ${productId} is currently out of stock!`,
      });
    }
    const requestObj = {
      product: Number(productId),
      shippingAddress: Number(addressId),
      amount: product.price,
      user: Number(address.user),
    };
    const order = await Order.create(requestObj);
    //This code uses the Mongoose populate() method to fetch related data for the order object and exclue version key.
    let orderResponse = await order.populate(
      "product shippingAddress user",
      "-__v"
    );
    orderResponse = await orderResponse.populate(
      "shippingAddress.user",
      "-__v"
    );
    const finalResponse = orderResponse.toObject({ versionKey: false });
    finalResponse.orderDate = dateFormatter(orderResponse.orderDate);
    res.send(finalResponse);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

module.exports = { createOrder };
