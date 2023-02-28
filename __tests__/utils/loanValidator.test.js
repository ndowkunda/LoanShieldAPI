jest.mock("../../src/utils/AgeValidator");
const LoanValidator = require("../../src/utils/LoanValidator");
const AgeValidator = require("../../src/utils/AgeValidator");

describe("validate loan", () => {
  test("should throw error due to failing age criteria", () => {
    const mockApplicantReq = {
      dateOfBirth: "2005-02-20",
      annualIncome: "50000",
      loanAmount: "20000",
      residentialMonthlyExpenditure: "900",
    };
    const mockAgeValidator = new AgeValidator();

    mockAgeValidator.validate.mockReturnValue(false);
    mockAgeValidator.errorMessage = "Invalid date of birth";

    const loanValidator = new LoanValidator([mockAgeValidator]);
    expect(() => loanValidator.validate(mockApplicantReq)).toThrowError(
      "Loan cannot be submitted due to Invalid date of birth"
    );
    expect(mockAgeValidator.validate).toHaveBeenCalledWith(mockApplicantReq);
  });
});
