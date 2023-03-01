const LoanAmount = require("../../src/Applicant/LoanAmount");

describe("validate loan amount", () => {
  test("should throw error as loan amount is NaN", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "£20000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmount = new LoanAmount();
    expect(() => {
      loanAmount.validate(mockApplicantReq);
    }).toThrowError("Loan amount must be a numeric value");
  });
  test("should return valid loan amount", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmount = new LoanAmount();
    const isValidLoanAmount = loanAmount.validate(mockApplicantReq);
    expect(isValidLoanAmount).toBe(true);
  });
  test("should return invalid loan amount", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "25000",
      residentialMonthlyExpenditure: "900",
    };
    const loanAmount = new LoanAmount();
    const isValidLoanAmount = loanAmount.validate(mockApplicantReq);
    expect(isValidLoanAmount).toBe(false);
  });
});
