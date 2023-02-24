const LoansController = require("../../src/controllers/LoansController");

describe("LoansController", () => {
  describe("validate", () => {
    test("should return Accepted if loan application is valid", () => {
      const mockLoanValidator = { validate: jest.fn(() => true) };

      const mockApplicantReq = {
        body: {
          dateOfBirth: "2005-02-20",
          annualIncome: "50000",
          loanAmount: "10000",
          residentialMonthlyExpenditure: "900",
        },
      };
      const mockRes = { json: jest.fn() };
      const loansController = new LoansController(mockLoanValidator);

      loansController.validate(mockApplicantReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Accepted" });
    });

    test("should return Rejected if loan application is invalid", () => {
      const mockLoanValidator = { validate: jest.fn(() => false) };
      const mockApplicantReq = {
        body: {
          dateOfBirth: "2005-02-20",
          annualIncome: "50000",
          loanAmount: "10000",
          residentialMonthlyExpenditure: "900",
        },
      };
      const mockRes = { json: jest.fn() };

      const loansController = new LoansController(mockLoanValidator);

      loansController.validate(mockApplicantReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Rejected" });
    });
  });
});
