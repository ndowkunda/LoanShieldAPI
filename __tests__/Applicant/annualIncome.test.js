const AnnualIncome = require("../../src/Applicant/AnnualIncome");

describe("validate income", () => {
  test("should throw error when annual income is NaN", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "£10000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const annualIncome = new AnnualIncome(25000);
    expect(() => {
      annualIncome.validate(mockApplicantReq);
    }).toThrowError("Annual income must be a numeric value");
  });
  test("should return valid income when annual income is above 25000", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const annualIncome = new AnnualIncome(25000);
    const isValidAnnualIncome =
      annualIncome.validate(mockApplicantReq);
    expect(isValidAnnualIncome).toBe(true);
  });
  test("should return invalid income when annual income is less than 25000", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "24000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const annualIncome = new AnnualIncome(25000);
    const isValidAnnualIncome =
      annualIncome.validate(mockApplicantReq);
    expect(isValidAnnualIncome).toBe(false);
  });
});