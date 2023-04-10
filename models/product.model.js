const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  availableItems: {
    type: Number,
    required: true,
  },
  imageUrl: {
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
});

productSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const lastProduct = await Product.findOne().sort({ _id: -1 });
    const newId = (lastProduct && lastProduct._id + 1) || 3000;
    doc._id = newId;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
