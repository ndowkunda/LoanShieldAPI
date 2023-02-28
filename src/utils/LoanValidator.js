class LoanValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(loanApplication) {
    const errorMessages = this.rules.map((rule) => {
      return rule.validate(loanApplication) ? null : rule.errorMessage;
    });

    const errors = errorMessages.filter((message) => message);
    if (errors.length > 0) {
      throw new Error(`Loan cannot be submitted due to ${errors.join(", ")}`);
    }
    return true;
  }
}

module.exports = LoanValidator;
