const LoanAmountValidator = require("../../src/utils/LoanAmountValidator");

describe("validate loan amount", () => {
  test("should return whether loan amount is valid or not", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmountValidator = new LoanAmountValidator();
    const isValidLoanAmount =
      loanAmountValidator.validate(mockApplicantReq);
    expect(isValidLoanAmount).toBe(true);
  });
});
