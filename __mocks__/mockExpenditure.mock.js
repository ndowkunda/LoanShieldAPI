class mockExpenditure {
  constructor(residentialMonthlyExpenditure) {
    this.residentialMonthlyExpenditure = residentialMonthlyExpenditure;
    this.errors = [];
  }

  validate() {
    return true;
  }
}

module.exports = { mockExpenditure };
