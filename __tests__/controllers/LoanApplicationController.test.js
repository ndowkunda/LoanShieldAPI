const {
  LoanApplicationController,
} = require("../../src/controllers/Controllers");
const {
  mockCustomerReq,
  mockRes,
} = require("../../__mocks__/mockCustomer.mock");
const { mockLoanValidator } = require("../../__mocks__/mockLoanValidator");
let loanApplicationController;
let { dateOfBirth, annualIncome, loanAmount, residentialMonthlyExpenditure } =
  mockCustomerReq.body;

describe("LoanApplicationController", () => {
  describe("validate", () => {
    test("should return response status code 200 and 'Accepted' if loan application details meet criteria", async () => {
      loanApplicationController = new LoanApplicationController(
        mockLoanValidator
      );

      await loanApplicationController.validate(mockCustomerReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Accepted" });
    });

    test("should return response status code 200 and 'Rejected' if loan application details do not meet criteria", async () => {
      mockLoanValidator.validate.mockReturnValue(false);

      loanApplicationController = new LoanApplicationController(
        mockLoanValidator
      );

      await loanApplicationController.validate(mockCustomerReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ Decision: "Rejected" });
    });
  });
  test("should return response status code 400 and throw 'Loan application invalid' error with original request body if loan application contains invalid details", async () => {
    mockLoanValidator.validate.mockImplementation(() => {
      throw new Error("Loan application invalid");
    });

    dateOfBirth = "20-02-2000";
    annualIncome = "£50000";
    loanAmount = "£10000";
    residentialMonthlyExpenditure = "£900";

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
