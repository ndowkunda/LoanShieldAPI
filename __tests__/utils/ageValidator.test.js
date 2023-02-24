const AgeValidator = require("../../src/utils/AgeValidator");

describe("validate age", () => {
  test("should return whether age is a valid age in loan application", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const ageValidator = new AgeValidator(25);
    const isValidAge = ageValidator.validate(mockApplicantReq);
    expect(isValidAge).toBe(false);
  });
  test("should return age of applicant in years", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const ageValidator = new AgeValidator(25);
    const actualAgeInYears = ageValidator.calculateAgeInYears(
      mockApplicantReq.dateOfBirth
    );
    const expectedAgeInYears = 18;
    expect(expectedAgeInYears).toEqual(actualAgeInYears);
  });
});
