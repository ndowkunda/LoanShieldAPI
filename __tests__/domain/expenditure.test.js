const Expenditure = require("../../src/domain/Expenditure");

describe("validate residential monthly expenditure", () => {
  test("should throw an error when residential monthly expenditure is NaN", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "£900",
    };
    const expenditure =
      new Expenditure(1000);
    expect(() => {
      expenditure.validate(mockCustomerReq);
    }).toThrowError("Residential monthly expenditure must be a numeric value");
  });
  test("should return a valid residential monthly expenditure", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const expenditure =
      new Expenditure(1000);
    const isValidResidentialMonthlyExpenditure =
      expenditure.validate(mockCustomerReq);
    expect(isValidResidentialMonthlyExpenditure).toBe(true);
  });
    test("should return a invalid residential monthly expenditure", () => {
      const mockCustomerReq = {
        dateOfBirth: "2005-02-20",
        annualIncome: "50000",
        loanAmount: "10000",
        residentialMonthlyExpenditure: "1100",
      };
      const expenditure =
        new Expenditure(1000);
      const isValidResidentialMonthlyExpenditure =
        expenditure.validate(mockCustomerReq);
      expect(isValidResidentialMonthlyExpenditure).toBe(false);
    });
});
