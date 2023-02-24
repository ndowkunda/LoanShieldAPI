const express = require("express");
const router = express.Router();
const LoansController = require("../../src/controllers/LoansController");
const LoanValidator = require("../../src/utils/LoanValidator")
const AgeValidator = require("../../src/utils/AgeValidator")
const AnnualIncomeValidator = require("../../src/utils/AnnualIncomeValidator");
const LoanAmountValidator = require("../../src/utils/LoanAmountValidator");
const ResidentialMonthlyExpenditureValidator = require("../../src/utils/ResidentialMonthlyExpenditureValidator");


  const ageValidator = new AgeValidator(25);
  const annualIncomeValidator = new AnnualIncomeValidator(25000);
  const loanAmountValidator = new LoanAmountValidator(25000);
  const residentialMonthlyExpenditureValidator =
    new ResidentialMonthlyExpenditureValidator(1000);

 const loanValidator = new LoanValidator([
   ageValidator,
   annualIncomeValidator,
   loanAmountValidator,
   residentialMonthlyExpenditureValidator,
 ]);
const loansController = new LoansController(loanValidator);

router.post(
  "/loan-applications",
  loansController.validate.bind(loansController)
);

module.exports = router;
