class LoanAmountValidator {
  constructor() {
    this.errors = [];
  }
  validate(loanApplication) {
    if (isNaN(loanApplication.loanAmount)) {
      throw new Error("Loan amount must be a numeric value");
    }
    const maximumLoanAmount = loanApplication.annualIncome * 0.2;

    if (loanApplication.loanAmount > maximumLoanAmount) {
      this.errors.push(`Loan amount cannot exceed ${maximumLoanAmount}`);
    }

    return this.errors.length === 0;
  }
}

module.exports = LoanAmountValidator;
