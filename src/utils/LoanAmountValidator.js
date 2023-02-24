class LoanAmountValidator {
  validate(loanApplication) {
    const maximumLoanAmount = loanApplication.annualIncome * 0.2;
    return loanApplication.loanAmount <= maximumLoanAmount;
  }
}

module.exports = LoanAmountValidator;