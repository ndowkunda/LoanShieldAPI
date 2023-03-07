class mockAnnualIncome {
  constructor(annualIncome) {
    this.annualIncome = annualIncome;
    this.errors = [];
  }

  validate() {
    return true;
  }
}

module.exports = { mockAnnualIncome };
