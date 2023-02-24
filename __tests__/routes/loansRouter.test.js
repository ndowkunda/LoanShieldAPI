const request = require("supertest");
const app = require("../../src/app");
const LoansController = require("../../src/controllers/LoansController");
const AgeValidator = require("../../src/utils/AgeValidator");
const AnnualIncomeValidator = require("../../src/utils/AnnualIncomeValidator");
const LoanAmountValidator = require("../../src/utils/LoanAmountValidator");
const ResidentialMonthlyExpenditureValidator = require("../../src/utils/ResidentialMonthlyExpenditureValidator");
const LoanValidator = require("../../src/utils/LoanValidator");

describe("POST /loan-applications", () => {
  test('should return 200 and "Accepted" if loan application is accepted', async () => {
    const applicant = {
      dateOfBirth: "1982-08-25",
      annualIncome: "33400",
      loanAmount: "4500",
      residentialMonthlyExpenditure: "100",
    };
    const expectedResponse = { Decision: "Accepted" };

    const ageValidator = new AgeValidator(applicant.dateOfBirth);
    const annualIncomeValidator = new AnnualIncomeValidator(
      applicant.annualIncome
    );
    const loanAmountValidator = new LoanAmountValidator();
    const residentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(
        applicant.residentialMonthlyExpenditure
      );

    const loanValidator = new LoanValidator([
      ageValidator,
      annualIncomeValidator,
      loanAmountValidator,
      residentialMonthlyExpenditureValidator,
    ]);

    const loansController = new LoansController(loanValidator);

    jest
      .spyOn(loansController, "validate")
      .mockImplementation(() => expectedResponse);

    const response = await request(app)
      .post("/loan-applications")
      .send(applicant)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.Decision).toBe("Accepted");
  });
});
