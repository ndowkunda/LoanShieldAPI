const request = require("supertest");
const app = require("../../src/app");
const {
  LoanApplicationController,
} = require("../../src/controllers/Controllers");
const { LoanValidationService } = require("../../src/services/Services");
const {
  Age,
  AnnualIncome,
  LoanAmount,
  Expenditure,
} = require("../../src/domain/Customer");
let age;
let annualIncome;
let loanAmount;
let expenditure;
let loanValidatonService;

beforeEach(() => {
  age = new Age(25);
  annualIncome = new AnnualIncome(25000);
  loanAmount = new LoanAmount();
  expenditure = new Expenditure(1000);
  loanValidatonService = new LoanValidationService([
    age,
    annualIncome,
    loanAmount,
    expenditure,
  ]);
  loanApplicationController = new LoanApplicationController(
    loanValidatonService
  );
});
describe("POST /loan-applications", () => {
  test("should return response status code 200 and 'Accepted' if loan application is valid", async () => {
    const customer = {
      dateOfBirth: "1982-08-25",
      annualIncome: "33400",
      loanAmount: "4500",
      residentialMonthlyExpenditure: "100",
    };

    const response = await request(app)
      .post("/loan-applications")
      .send(customer)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.Decision).toBe("Accepted");
  });
  test("should return response status code 200 and 'Rejected' if loan application is invalid", async () => {
    const customer = {
      dateOfBirth: "2000-08-25",
      annualIncome: "24000",
      loanAmount: "12000",
      residentialMonthlyExpenditure: "1100",
    };

    const response = await request(app)
      .post("/loan-applications")
      .send(customer)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.Decision).toBe("Rejected");
  });
  test("should return response status code 400 and throw 'Loan application invalid' error if customer data is not in correct format", async () => {
    const customer = {
      dateOfBirth: "20-02-2000",
      annualIncome: "£24000",
      loanAmount: "£1000",
      residentialMonthlyExpenditure: "£900",
    };

    const response = await request(app)
      .post("/loan-applications")
      .send(customer)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Loan application invalid");
  });
});
