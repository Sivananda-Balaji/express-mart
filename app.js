const express = require("express");
const authRouter = require("./routes/auth.router");
const addressRouter = require("./routes/address.router");
const productRouter = require("./routes/product.router");

const app = express();

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/products", productRouter);

module.exports = app;
