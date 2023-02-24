class AnnualIncomeValidator {
  constructor(minimumAnnualIncome) {
    this.minimumAnnualIncome = minimumAnnualIncome;
  }

  validate(loanApplication) {
    return loanApplication.annualIncome >= this.minimumAnnualIncome;
  }
}

module.exports = AnnualIncomeValidator;