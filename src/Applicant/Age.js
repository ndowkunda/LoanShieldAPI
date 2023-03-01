const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
class AgeValidator {
  constructor(minimumAgeInYears) {
    this.minimumAgeInYears = minimumAgeInYears;
    this.millisecondsInYear = millisecondsInYear;
    this.errors = [];
  }

  validate(loanApplication) {
    const ageInYears = this.calculateAgeInYears(loanApplication.dateOfBirth);
  
    if (ageInYears < this.minimumAgeInYears) {
      this.errors.push(`Age must be least ${this.minimumAgeInYears}`);
    }
    return this.errors.length == 0;
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
