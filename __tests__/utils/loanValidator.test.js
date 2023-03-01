jest.mock("../../src/utils/AgeValidator");
jest.mock("../../src/utils/AnnualIncomeValidator");
jest.mock("../../src/utils/LoanAmountValidator");
jest.mock("../../src/utils/ResidentialMonthlyExpenditureValidator");
const {
  LoanValidator,
  AgeValidator,
  AnnualIncomeValidator,
  LoanAmountValidator,
  ResidentialMonthlyExpenditureValidator,
} = require("../../src/utils/validators");

describe("validate loan", () => {
  test("should throw error due to incorrect date of birth format", () => {
    const mockApplicantReq = {
      dateOfBirth: "20-02-2000",
      annualIncome: "50000",
      loanAmount: "20000",
      residentialMonthlyExpenditure: "900",
    };

    const mockAgeValidator = new AgeValidator(25);
    mockAgeValidator.errors = [];
    mockAgeValidator.validate = jest.fn((mockApplicantReq) => {
      throw new Error("Invalid date of birth");
    });

    const loanValidator = new LoanValidator([mockAgeValidator]);

    expect(() => loanValidator.validate(mockApplicantReq)).toThrowError(
      "Loan application invalid"
    );
  });
  test("should throw error due to invalid annual income format", () => {
    const mockApplicantReq = {
      dateOfBirth: "1997-02-20",
      annualIncome: "£50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "900",
    };

   
   const mockAnnualIncomeValidator = new AnnualIncomeValidator(25000);
   mockAnnualIncomeValidator.errors = [];
   mockAnnualIncomeValidator.validate = jest.fn((mockApplicantReq) => {
     throw new Error("Annual income must be a numeric value");
   });

    const loanValidator = new LoanValidator([mockAnnualIncomeValidator]);

    expect(() => loanValidator.validate(mockApplicantReq)).toThrowError(
      "Loan application invalid"
    );
  });
  test("should throw error due to invalid loan amount format", () => {
    const mockApplicantReq = {
      dateOfBirth: "1997-02-20",
      annualIncome: "50000",
      loanAmount: "£10000",
      residentialMonthlyExpenditure: "900",
    };

   const mockLoanAmountValidator = new LoanAmountValidator();
    mockLoanAmountValidator.errors = [];
    mockLoanAmountValidator.validate = jest.fn((mockApplicantReq) => {
      throw new Error("Loan amount must be a numeric value");
    });

   const loanValidator = new LoanValidator([mockLoanAmountValidator]);
    expect(() => loanValidator.validate(mockApplicantReq)).toThrowError(
      "Loan application invalid"
    );
  });
  test("should throw error due to incorrect residential monthly expenditure format", () => {
    const mockApplicantReq = {
      dateOfBirth: "1997-02-20",
      annualIncome: "50000",
      loanAmount: "10000",
      residentialMonthlyExpenditure: "£900",
    };

    const mockResidentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(1000);
    mockResidentialMonthlyExpenditureValidator.errors = [];
    mockResidentialMonthlyExpenditureValidator.validate = jest.fn(
      (mockApplicantReq) => {
        throw new Error(
          "Residential monthly expenditure must be a numeric value"
        );
      }
    );

    const loanValidator = new LoanValidator([
      mockResidentialMonthlyExpenditureValidator,
    ]);

    expect(() => loanValidator.validate(mockApplicantReq)).toThrowError(
      "Loan application invalid"
    );
  });
  test("should return an invalid loan application due to failing age criteria", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-02-20",
      annualIncome: "50000",
      loanAmount: "20000",
      residentialMonthlyExpenditure: "900",
    };

    const mockAgeValidator = new AgeValidator(25);
    mockAgeValidator.validate = jest.fn().mockReturnValue(false);
    mockAgeValidator.errors = ["Age must be least 25"];

    const loanValidator = new LoanValidator([mockAgeValidator]);
    expect(loanValidator.validate(mockApplicantReq)).toBe(false);
    expect(loanValidator.errors).toEqual(["Age must be least 25"]);
  });
  test("should return an invalid loan application due to failing annual income criteria", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-02-20",
      annualIncome: "20000",
      loanAmount: "1000",
      residentialMonthlyExpenditure: "900",
    };

    const mockAnnualIncomeValidator = new AnnualIncomeValidator(25000);
    mockAnnualIncomeValidator.validate = jest.fn().mockReturnValue(false);
    mockAnnualIncomeValidator.errors = ["Annual income must be least 25000"];

    const loanValidator = new LoanValidator([mockAnnualIncomeValidator]);
    expect(loanValidator.validate(mockApplicantReq)).toBe(false);
    expect(loanValidator.errors).toEqual(["Annual income must be least 25000"]);
  });
  test("should return an invalid loan application due to failing loan amount criteria", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-02-20",
      annualIncome: "20000",
      loanAmount: "15000",
      residentialMonthlyExpenditure: "900",
    };

    const mockLoanAmountValidator = new LoanAmountValidator();
    mockLoanAmountValidator.validate = jest.fn().mockReturnValue(false);
    mockLoanAmountValidator.errors = [
      "Loan amount must be less than 20% of annual income",
    ];

    const loanValidator = new LoanValidator([mockLoanAmountValidator]);
    expect(loanValidator.validate(mockApplicantReq)).toBe(false);
    expect(loanValidator.errors).toEqual([
      "Loan amount must be less than 20% of annual income",
    ]);
  });
  test("should return an invalid loan application due to failing residential monthly expenditure criteria", () => {
    const mockApplicantReq = {
      dateOfBirth: "2000-02-20",
      annualIncome: "20000",
      loanAmount: "1000",
      residentialMonthlyExpenditure: "1100",
    };

    const mockResidentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(1000);
    mockResidentialMonthlyExpenditureValidator.validate = jest
      .fn()
      .mockReturnValue(false);
    mockResidentialMonthlyExpenditureValidator.errors = [
      "Residential monthly expenditure must be less than 1000",
    ];

    const loanValidator = new LoanValidator([
      mockResidentialMonthlyExpenditureValidator,
    ]);
    expect(loanValidator.validate(mockApplicantReq)).toBe(false);
    expect(loanValidator.errors).toEqual([
      "Residential monthly expenditure must be less than 1000",
    ]);
  });
});
