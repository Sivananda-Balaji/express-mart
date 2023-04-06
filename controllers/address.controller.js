const ShippingAddress = require("../models/address.model");

const createAddress = async (req, res) => {
  try {
    const { contactNumber, zipcode } = req.body;
    const zipcodeRegex = /^\d{6}$/;
    if (!zipcodeRegex.test(zipcode)) {
      return res.status(400).send({
        status: "Failed",
        message: "Invalid zip code!",
      });
    }
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contactNumber)) {
      return res.status(400).send({
        status: "Failed",
        message: "Invalid contact number!",
      });
    }
    const addressObj = {
      ...req.body,
      user: Number(req._id),
    };
    const address = await ShippingAddress.create(addressObj);
    const addressRes = await address.populate("user", "-__v");
    const finalRes = addressRes.toObject({ versionKey: false });
    res.send(finalRes);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "Failed",
      message: "something went wrong",
    });
  }
};

module.exports = { createAddress };
