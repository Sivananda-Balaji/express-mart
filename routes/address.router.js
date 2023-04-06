const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { createAddress } = require("../controllers/address.controller");

const router = express.Router();

router.route("/").post(verifyToken, createAddress);

module.exports = router;
