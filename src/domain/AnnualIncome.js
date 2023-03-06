class AnnualIncome {
  constructor(minimumAnnualIncome) {
    this.minimumAnnualIncome = minimumAnnualIncome;
    this.errors = [];
  }

  validateAnnualIncome(annualIncome) {
    if (isNaN(annualIncome)) {
      throw new Error("Annual income must be a numeric value");
    }

    if (annualIncome < this.minimumAnnualIncome) {
      this.errors.push(
        `Annual income must be at least ${this.minimumAnnualIncome}`
      );
    }
    return this.errors.length === 0;
  }

  validate(loanApplication) {
    const annualIncome = Number(loanApplication.annualIncome);
    return this.validateAnnualIncome(annualIncome);
  }
}

module.exports = AnnualIncome;
