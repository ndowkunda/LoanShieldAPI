const LoanAmountValidator = require("../../src/utils/LoanAmountValidator");

describe("validate loan amount", () => {
  test("should throw error due to loan amount exceeding maximum loan amount", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "20000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmountValidator = new LoanAmountValidator();
    expect(() => {
      loanAmountValidator.validate(mockApplicantReq);
    }).toThrowError("Loan amount cannot exceed 10000");
  });
  test("should return valid loan amount", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmountValidator = new LoanAmountValidator();
    const isValidLoanAmount = loanAmountValidator.validate(mockApplicantReq);
    expect(isValidLoanAmount).toBe(true);
  });
});
