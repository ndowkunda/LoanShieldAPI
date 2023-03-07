const AnnualIncome = require("../../src/domain/AnnualIncome");
let annualIncome;

beforeEach(() => {
  annualIncome = new AnnualIncome(25000);
});

describe("validate income", () => {
  test("should throw error when annual income is NaN", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "£10000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    expect(() => {
      annualIncome.validate(mockCustomerReq);
    }).toThrowError("Annual income must be a numeric value");
  });
  test("should return true when annual income is above minimum annual income requirement", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const isValidAnnualIncome = annualIncome.validate(mockCustomerReq);
    expect(isValidAnnualIncome).toBe(true);
  });
  test("should return false when annual income is less than minimum annual income requirement", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "24000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const isValidAnnualIncome = annualIncome.validate(mockCustomerReq);
    expect(isValidAnnualIncome).toBe(false);
  });
});
