const express = require("express");
const authRouter = require("./routes/auth.router");
const addressRouter = require("./routes/address.router");

const app = express();

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/addresses", addressRouter);

module.exports = app;
