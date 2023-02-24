const express = require("express");
const app = express();

const loansRouter = require("./routes/loansRouter");

app.use(express.json());

app.use("/", loansRouter);

module.exports = app;
