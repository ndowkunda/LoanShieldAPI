class AnnualIncomeValidator {
  constructor(minimumAnnualIncome) {
    this.minimumAnnualIncome = minimumAnnualIncome;
  }

  validateAnnualIncome(annualIncome) {
    if (isNaN(annualIncome)) {
      throw new Error("Annual income must be a numeric value");
    }

    if (annualIncome < this.minimumAnnualIncome) {
      throw new Error(
        `Annual income must be at least ${this.minimumAnnualIncome}`
      );
    }
  }

  validate(loanApplication) {
    const annualIncome = Number(loanApplication.annualIncome);
    this.validateAnnualIncome(annualIncome);
    return true;
  }
}

module.exports = AnnualIncomeValidator;
