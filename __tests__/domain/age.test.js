const Age = require("../../src/domain/Age");

describe("Validate customer's age", () => {
  test("should throw error when date of birth is invalid due to non-existent day", () => {
    const mockCustomerReq = {
      dateOfBirth: "2000-02-30",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to non-existent month", () => {
    const mockCustomerReq = {
      dateOfBirth: "2000-13-28",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to invalid date format", () => {
    const mockCustomerReq = {
      dateOfBirth: "22-02-2000",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should return customer's age is not valid", () => {
    const mockCustomerReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const age = new Age(25);
    const isValidAge = age.validate(mockCustomerReq);
    expect(isValidAge).toBe(false);
  });
  test("should return customer's age is valid", () => {
    const mockCustomerReq = {
      dateOfBirth: "1997-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const age = new Age(25);
    const isValidAge = age.validate(mockCustomerReq);
    expect(isValidAge).toBe(true);
  });
});
