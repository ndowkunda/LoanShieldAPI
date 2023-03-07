const LoanAmount = require("../../src/domain/LoanAmount");
let loanAmount;

beforeEach(() => {
  loanAmount = new LoanAmount();
});

describe("validate loan amount", () => {
  test("should throw error as loan amount is NaN", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "£20000",
      residentialMonthlyExpenditure: "900",
    };
    expect(() => {
      loanAmount.validate(mockCustomerReq);
    }).toThrowError("Loan amount must be a numeric value");
  });
  test("should return true when loan amount is less than 20% of annual income", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const isValidLoanAmount = loanAmount.validate(mockCustomerReq);
    expect(isValidLoanAmount).toBe(true);
  });
  test("should return false when loan amount is above 20% of annual income", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "25000",
      residentialMonthlyExpenditure: "900",
    };
    const isValidLoanAmount = loanAmount.validate(mockCustomerReq);
    expect(isValidLoanAmount).toBe(false);
  });
});
