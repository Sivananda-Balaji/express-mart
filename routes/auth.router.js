const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/users").post(signUp);
router.route("/auth").post(signIn);

module.exports = router;
