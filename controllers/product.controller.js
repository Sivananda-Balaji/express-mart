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

const getProduct = async (req, res) => {
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

const getProducts = async (req, res) => {
  try {
    const { name, category, direction = "DESC", sortBy = "_id" } = req.query;
    // The below code creates a query object based on the user input and find the product matches the query object.
    const query = {};
    name ? (query.name = name) : "";
    category ? (query.category = category) : "";
    const products = await Product.find(query)
      .sort({
        [sortBy]: direction,
      })
      .select("-__v");
    const isTrue = products.length === 0 ? true : false;
    const responseObj = {
      content: products,
      numberOfElements: products.length,
      empty: isTrue,
      sort: {
        sorted: !isTrue,
        unsorted: isTrue,
      },
    };
    res.send(responseObj);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "someting went wrong",
    });
  }
};

module.exports = {
  createProduct,
  getCategories,
  getProduct,
  updateProduct,
  deleteproduct,
  getProducts,
};
