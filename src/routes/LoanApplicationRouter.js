const express = require("express");
const router = express.Router();
const { LoanApplicationController } = require("../controllers/Controllers");
const { LoanValidationService } = require("../services/Services");
const {
  Age,
  AnnualIncome,
  LoanAmount,
  Expenditure,
} = require("../domain/Customer");

const age = new Age(25);
const annualIncome = new AnnualIncome(25000);
const loanAmount = new LoanAmount(25000);
const expenditure = new Expenditure(1000);

const loanValidationService = new LoanValidationService([
  age,
  annualIncome,
  loanAmount,
  expenditure,
]);
const loanApplicationController = new LoanApplicationController(
  loanValidationService
);

router.post(
  "/loan-applications",
  loanApplicationController.validate.bind(loanApplicationController)
);

module.exports = router;
