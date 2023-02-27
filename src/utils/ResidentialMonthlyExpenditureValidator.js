class ResidentialMonthlyExpenditureValidator {
  constructor(maximumResidentialMonthlyExpenditure) {
    this.maximumResidentialMonthlyExpenditure =
      maximumResidentialMonthlyExpenditure;
  }

  validate(loanApplication) {
    if (
      loanApplication.residentialMonthlyExpenditure >
      this.maximumResidentialMonthlyExpenditure
    ) {
      throw new Error(
        `Residential monthly expenditure cannot exceed ${this.maximumResidentialMonthlyExpenditure}`
      );
    }

    return true;
  }
}

module.exports = ResidentialMonthlyExpenditureValidator;
