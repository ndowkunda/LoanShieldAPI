const ResidentialMonthlyExpenditureValidator = require("../../src/utils/ResidentialMonthlyExpenditureValidator");

describe("validate loan amount", () => {
  test("should return whether loan amount is valid or not", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const residentialMonthlyExpenditureValidator = new ResidentialMonthlyExpenditureValidator(1000);
    const isValidLoanAmount = residentialMonthlyExpenditureValidator.validate(mockApplicantReq);
    expect(isValidLoanAmount).toBe(true);
  });
});
