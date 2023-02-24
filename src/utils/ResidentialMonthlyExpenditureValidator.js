class ResidentialMonthlyExpenditureValidator {
  constructor(maximumResidentialMonthlyExpenditure) {
    this.maximumResidentialMonthlyExpenditure =
      maximumResidentialMonthlyExpenditure;
  }

  validate(loanApplication) {
    return (
      loanApplication.residentialMonthlyExpenditure <=
      this.maximumResidentialMonthlyExpenditure
    );
  }
}

module.exports = ResidentialMonthlyExpenditureValidator;