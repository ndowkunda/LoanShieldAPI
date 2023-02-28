const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
class AgeValidator {
  constructor(minimumAgeInYears) {
    this.minimumAgeInYears = minimumAgeInYears;
    this.millisecondsInYear = millisecondsInYear;
    this.errorMessage = "Invalid date of birth";
  }

  validate(loanApplication) {
    const ageInYears = this.calculateAgeInYears(loanApplication.dateOfBirth);
    return ageInYears >= this.minimumAgeInYears;
  }

  validateDateOfBirth(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    if (dateOfBirth !== birthDate.toLocaleDateString("en-CA")) {
      throw new Error("Invalid date of birth");
    }
    return birthDate;
  }

  calculateAgeInYears(dateOfBirth) {
    const birthDate = this.validateDateOfBirth(dateOfBirth);
    const currentDate = new Date();
    const diffInMillseconds = currentDate - birthDate;
    const ageInYears = Math.floor(diffInMillseconds / millisecondsInYear);
    return ageInYears;
  }
}

module.exports = AgeValidator;
