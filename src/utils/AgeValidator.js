class AgeValidator {
  constructor(minimumAgeInYears) {
    this.minimumAgeInYears = minimumAgeInYears;
  }

  validate(loanApplication) {
    const ageInYears = this.calculateAgeInYears(loanApplication.dateOfBirth);
    return ageInYears >= this.minimumAgeInYears;
  }

  calculateAgeInYears(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const diffInMillseconds = currentDate - birthDate;
    const ageInYears = Math.floor(
      diffInMillseconds / (1000 * 60 * 60 * 24 * 365.25)
    );
    return ageInYears;
  }
}

module.exports = AgeValidator;