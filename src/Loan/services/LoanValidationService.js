class LoanValidationService {
  constructor(rules) {
    this.rules = rules;
    this.errors = [];
    this.validationErrors = [
      "Invalid date of birth",
      "Annual income must be a numeric value",
      "Loan amount must be a numeric value",
      "Residential monthly expenditure must be a numeric value",
    ];
  }

  containsErrors() {
    return this.errors.some((error) => this.validationErrors.includes(error));
  }

  validate(loanApplication) {
    const isValid = this.rules.every((rule) => {
      try {
        this.errors.push(...rule.errors);
        return rule.validate(loanApplication);
      } catch (error) {
        this.errors.push(error.message);
        return false;
      }
    });

    if (this.containsErrors()) {
      throw new Error("Loan application invalid");
    }
    return isValid;
  }
}

module.exports = LoanValidationService;
