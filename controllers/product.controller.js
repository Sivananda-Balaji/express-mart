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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      price,
      description,
      manufacturer,
      availableItems,
      imageUrl,
    } = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        category,
        price,
        description,
        manufacturer,
        availableItems,
        imageUrl,
        updatedAt: Date.now(),
      },
      { new: true, projection: { __v: 0 } }
    );
    if (!updatedProduct) {
      return res.status(404).send({
        message: `No Product found for ID - ${id}!`,
      });
    }
    res.send(updatedProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "internal server error",
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      return res.status(404).send({
        message: `No Product found for ID - ${id}!`,
      });
    }
    res.send({ message: `Product with ID - ${id} deleted successfully!` });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

module.exports = {
  createProduct,
  getCategories,
  getproduct,
  updateProduct,
  deleteproduct,
};
