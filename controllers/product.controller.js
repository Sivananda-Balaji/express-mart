const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      manufacturer,
      availableItems,
      imageUrl,
    } = req.body;
    const product = await Product.create({
      name,
      category,
      price,
      description,
      manufacturer,
      availableItems,
      imageUrl,
    });
    const finalResult = product.toObject();
    delete finalResult.__v;
    delete finalResult.imageUrl;
    res.send(finalResult);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.send(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "something went wrong" });
  }
};

const getproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res
        .status(404)
        .send({ message: `No Product found for ID - ${id}!` });
    }
    const productResponse = product.toObject({ versionKey: false });
    res.send(productResponse);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "something went wrong" });
  }
};

module.exports = { createProduct, getCategories, getproduct };
