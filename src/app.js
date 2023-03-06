const express = require("express");
const app = express();

const { LoanApplicationRouter } = require("./routes/Routes");

app.use(express.json());

app.use("/", LoanApplicationRouter);

module.exports = app;
