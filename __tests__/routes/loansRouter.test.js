const request = require("supertest");
const app = require("../../src/app");
const { LoansController } = require("../../src/controllers/controllers");
const {
  LoanValidator,
  AgeValidator,
  AnnualIncomeValidator,
  LoanAmountValidator,
  ResidentialMonthlyExpenditureValidator,
} = require("../../src/utils/validators");

describe("POST /loan-applications", () => {
  test('should return 200 and "Accepted" if loan application is valid', async () => {
    const applicant = {
      dateOfBirth: "1982-08-25",
      annualIncome: "33400",
      loanAmount: "4500",
      residentialMonthlyExpenditure: "100",
    };

    const ageValidator = new AgeValidator(25);
    const annualIncomeValidator = new AnnualIncomeValidator(25000);
    const loanAmountValidator = new LoanAmountValidator();
    const residentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(1000);

    const loanValidator = new LoanValidator([
      ageValidator,
      annualIncomeValidator,
      loanAmountValidator,
      residentialMonthlyExpenditureValidator,
    ]);

    const loansController = new LoansController(loanValidator);

    const response = await request(app)
      .post("/loan-applications")
      .send(applicant)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.Decision).toBe("Accepted");
  });
  test('should return 200 and "Rejected" if loan application is invalid', async () => {
    const applicant = {
      dateOfBirth: "2000-08-25",
      annualIncome: "24000",
      loanAmount: "12000",
      residentialMonthlyExpenditure: "1100",
    };

    const ageValidator = new AgeValidator(25);
    const annualIncomeValidator = new AnnualIncomeValidator(25000);
    const loanAmountValidator = new LoanAmountValidator();
    const residentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(1000);

    const loanValidator = new LoanValidator([
      ageValidator,
      annualIncomeValidator,
      loanAmountValidator,
      residentialMonthlyExpenditureValidator,
    ]);

    const loansController = new LoansController(loanValidator);

    const response = await request(app)
      .post("/loan-applications")
      .send(applicant)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.Decision).toBe("Rejected");
  });
  test('should return 400 and "Loan application invalid" if applicant data is not in correct format', async () => {
    const applicant = {
      dateOfBirth: "20-02-2000",
      annualIncome: "£24000",
      loanAmount: "£1000",
      residentialMonthlyExpenditure: "£900",
    };

    const ageValidator = new AgeValidator(25);
    const annualIncomeValidator = new AnnualIncomeValidator(25000);
    const loanAmountValidator = new LoanAmountValidator();
    const residentialMonthlyExpenditureValidator =
      new ResidentialMonthlyExpenditureValidator(1000);

    const loanValidator = new LoanValidator([
      ageValidator,
      annualIncomeValidator,
      loanAmountValidator,
      residentialMonthlyExpenditureValidator,
    ]);
    const loansController = new LoansController(loanValidator);

    const response = await request(app)
      .post("/loan-applications")
      .send(applicant)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Loan application invalid");
  });
});
