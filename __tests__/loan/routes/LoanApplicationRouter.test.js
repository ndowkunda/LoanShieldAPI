const request = require("supertest");
const app = require("../../../src/app");
const {
  LoanApplicationController,
} = require("../../../src/Loan/controllers/Controllers");
const {
  LoanValidationService,
} = require("../../../src/Loan/services/Services");
const {
  Age,
  AnnualIncome,
  LoanAmount,
  Expenditure,
} = require("../../../src/Applicant/Applicant");

describe("POST /loan-applications", () => {
  test('should return 200 and "Accepted" if loan application is valid', async () => {
    const applicant = {
      dateOfBirth: "1982-08-25",
      annualIncome: "33400",
      loanAmount: "4500",
      residentialMonthlyExpenditure: "100",
    };

    const age = new Age(25);
    const annualIncome = new AnnualIncome(25000);
    const loanAmount = new LoanAmount();
    const expenditure = new Expenditure(1000);

    const loanValidatonService = new LoanValidationService([
      age,
      annualIncome,
      loanAmount,
      expenditure,
    ]);

    const loanApplicationController = new LoanApplicationController(
      loanValidatonService
    );

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

    const age = new Age(25);
    const annualIncome = new AnnualIncome(25000);
    const loanAmount = new LoanAmount();
    const expenditure = new Expenditure(1000);

    const loanValidatonService = new LoanValidationService([
      age,
      annualIncome,
      loanAmount,
      expenditure,
    ]);

    const loanApplicationController = new LoanApplicationController(
      loanValidatonService
    );

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

    const age = new Age(25);
    const annualIncome = new AnnualIncome(25000);
    const loanAmount = new LoanAmount();
    const expenditure = new Expenditure(1000);

    const loanValidatonService = new LoanValidationService([
      age,
      annualIncome,
      loanAmount,
      expenditure,
    ]);
    const loanApplicationController = new LoanApplicationController(
      loanValidatonService
    );

    const response = await request(app)
      .post("/loan-applications")
      .send(applicant)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Loan application invalid");
  });
});
