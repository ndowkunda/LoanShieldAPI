class LoanValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(loanApplication) {
    return this.rules.every((rule) => rule.validate(loanApplication));
  }
}

module.exports = LoanValidator;
