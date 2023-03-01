const express = require("express");
const app = express();

const { LoanApplicationRouter } = require("./Loan/routes/Routes");

app.use(express.json());

app.use("/", LoanApplicationRouter);

module.exports = app;
