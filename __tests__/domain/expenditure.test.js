const Expenditure = require("../../src/domain/Expenditure");
let expenditure;

beforeEach(() => {
  expenditure = new Expenditure(1000);
});

describe("validate residential monthly expenditure", () => {
  test("should throw an error when residential monthly expenditure is NaN", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "£900",
    };
    expect(() => {
      expenditure.validate(mockCustomerReq);
    }).toThrowError("Residential monthly expenditure must be a numeric value");
  });
  test("should return true when residential monthly expenditure is less than miminum expenditure requirement", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const isValidResidentialMonthlyExpenditure =
      expenditure.validate(mockCustomerReq);
    expect(isValidResidentialMonthlyExpenditure).toBe(true);
  });
  test("should return false when residential monthly expenditure is above minimum expediture requirement", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "1100",
    };
    const expenditure = new Expenditure(1000);
    const isValidResidentialMonthlyExpenditure =
      expenditure.validate(mockCustomerReq);
    expect(isValidResidentialMonthlyExpenditure).toBe(false);
  });
});
