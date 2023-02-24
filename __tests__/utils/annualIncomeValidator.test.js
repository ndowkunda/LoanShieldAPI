const AnnualIncomeValidator = require("../../src/utils/AnnualIncomeValidator");

describe("validate income", () => {
  test("should return whether income is valid or not", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const annualIncomeValidator = new AnnualIncomeValidator(25000);
    const isValidAnnualIncome = annualIncomeValidator.validate(mockApplicantReq);
    expect(isValidAnnualIncome).toBe(true);
  });
});
