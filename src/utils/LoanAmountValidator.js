class LoanAmountValidator {
  validate(loanApplication) {
    const maximumLoanAmount = loanApplication.annualIncome * 0.2;

    if (loanApplication.loanAmount > maximumLoanAmount) {
      throw new Error(`Loan amount cannot exceed ${maximumLoanAmount}`);
    }

    return true;
  }
}

module.exports = LoanAmountValidator;
