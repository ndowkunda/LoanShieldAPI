class ResidentialMonthlyExpenditureValidator {
  constructor(maximumResidentialMonthlyExpenditure) {
    this.maximumResidentialMonthlyExpenditure =
      maximumResidentialMonthlyExpenditure;
    this.errors = [];
  }

  validate(loanApplication) {
    if(isNaN(loanApplication.residentialMonthlyExpenditure)){
      throw new Error(
        "Residential monthly expenditure must be a numeric value"
      );
    }
    if (
      loanApplication.residentialMonthlyExpenditure >
      this.maximumResidentialMonthlyExpenditure
    ) {
      this.errors.push(
        `Residential monthly expenditure cannot exceed ${this.maximumResidentialMonthlyExpenditure}`
      );
    }

    return this.errors.length == 0;
  }
}

module.exports = ResidentialMonthlyExpenditureValidator;
