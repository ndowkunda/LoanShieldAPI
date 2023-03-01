const Age = require("../../src/Applicant/Age");

describe("Validate applicant's age", () => {
  test("should throw error when date of birth is invalid due to non-existent day", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-02-30",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockApplicantReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to non-existent month", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-13-28",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockApplicantReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to invalid date format", () => {
    const mockApplicantReq = {
      dateOfBirth: "22-02-2000",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

    const age = new Age(25);

    expect(() => {
      age.validate(mockApplicantReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should return applicant's age is not valid", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const age = new Age(25);
    const isValidAge = age.validate(mockApplicantReq);
    expect(isValidAge).toBe(false);
  });
  test("should return applicant's age is valid", () => {
    const mockApplicantReq = {
      dateOfBirth: "1997-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };
    const age = new Age(25);
    const isValidAge = age.validate(mockApplicantReq);
    expect(isValidAge).toBe(true);
  });
});
