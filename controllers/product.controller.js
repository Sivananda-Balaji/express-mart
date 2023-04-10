const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    let {
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

module.exports = { createProduct };
