const {
  LoanApplicationController,
} = require("../../src/controllers/Controllers");
const {
  mockCustomerReq,
  mockRes,
} = require("../../__mocks__/mockCustomer.mock");
let loanApplicationController;

describe("LoanApplicationController", () => {
  describe("validate", () => {
    test("should return 'Accepted' if loan application details meet criteria", async () => {
      const mockLoanValidator = { validate: jest.fn(() => true) };

      loanApplicationController = new LoanApplicationController(
        mockLoanValidator
      );

      await loanApplicationController.validate(mockCustomerReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Accepted" });
    });

    test("should return 'Rejected' if loan application details do not meet criteria", async () => {
      const mockLoanValidator = { validate: jest.fn(() => false) };

      loanApplicationController = new LoanApplicationController(
        mockLoanValidator
      );

      await loanApplicationController.validate(mockCustomerReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Rejected" });
    });
  });
  test("should return 400 with error message and request body if loan application contains invalid details", async () => {
    const mockLoanValidator = {
      validate: jest.fn(() => {
        throw new Error("Loan application invalid");
      }),
    };
    let {
      dateOfBirth,
      annualIncome,
      loanAmount,
      residentialMonthlyExpenditure,
    } = mockCustomerReq.body;

    dateOfBirth = "20-02-2000";
    annualIncome = "£50000";
    loanAmount = "£10000";
    residentialMonthlyExpenditure = "£900";

    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    loanApplicationController = new LoanApplicationController(
      mockLoanValidator
    );

    await loanApplicationController.validate(mockCustomerReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Loan application invalid",
      requestBody: mockCustomerReq.body,
    });
  });
});
