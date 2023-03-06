# LoanShield

LoanShield is a loan application validation app that provides protection and security for lenders. The app validates loan applications based on certain criteria and returns a response to the user indicating whether their loan application has been approved or declined.

## Dependencies

LoanShield is built using the following dependencies:

- :link: [Node.js](https://nodejs.org/) - open-source, cross-platform, back-end JavaScript runtime environment
- :link: [Express](https://expressjs.com/) - Node.js web application framework.
- :link: [Nodemon](https://nodemon.io/) - A tool that automatically restarts the Node.js application when file changes in the directory are detected.
- :link: [Pug](https://pugjs.org/) - A high-performance template engine for Node.js, formerly known as Jade.
- :link: [Jest](https://jestjs.io/) - A JavaScript testing framework for Node.js, used for testing the application logic.
- :link: [Supertest](https://github.com/visionmedia/supertest) - A library used to test HTTP endpoints in Node.js, often used in combination with Jest.

## Getting Started

:link: [view here](https://ndowkunda.github.io/LoanShieldAPI)

To start LoanShield locally:

1. Install Node.js on your machine if you haven't already done so.

2. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/LoanShield.git
```

3. Navigate to the project directory and install the necessary dependencies using the following command:

```bash
cd LoanShield
npm install
```

4. Start the app using the following command:

```bash
npm start
```

5. Navigate to `https://localhost:3000` in your web browser to access the app.

## Running Tests

To run the tests for the LoanShield app:

1. Ensure that the app is not currently running.

2. Run the tests using the following command:

```bash
npm test
```

This will run the tests using Jest and Supertest to make assertions on the router, controller, and validation logic.

## Endpoints

The LoanShield app includes a `POST /loan-applications` endpoint that accepts customer data and returns a decision object indicating whether their loan application has been approved or declined. The response object will include a `Decision` property with the value of either `"Approved"` or `"Rejected"`.

To use the `POST /loan-applications` endpoint, send a POST request to the following URL:

:link: https://localhost:3000/loan-applications

The request body should include the following properties:

- `dateOfBirth` (string, required, format: YYYY-MM-DD): Customer's date of birth.
- `annualIncome` (string, required, format: number): Customer's annual income
- `loanAmount` (string, required), format: number) : Customer's requested loan amount
- `residentialMonthlyExpenditure` (string, required, format: number): Customer's stated monthly expenditure

Here's an example of a request body:

```json
{
  "dateOfBirth": "1995-02-23",
  "annualIncome": "26000",
  "loanAmount": "5100",
  "residentialMonthlyExpenditure": "1000"
}
```

The response from the POST /loan-applications endpoint will be a decision object with the following properties:

`Decision (string, required): Either "Approved" or "Rejected"`

Here's an example of a response body:

```json
{
  "Decision": "Approved"
}
```

## Tests

Tests are organised with the domain separate from the app routes,controllers and services.

Here's a sample of the tests for the `domain`:

```js
const { AnnualIncome } = require("../../src/Customer/Customer");

describe("Validate annual income", () => {
  it("should return true if amount is greater minimum annual income", () => {
    const annualIncome = new AnnualIncome(25000);
    const expectedResult = annualIncome.validate();
    expect(expectedResult).toBe(true);
  });
});
```

Here's a sample of the tests for the `Services`:

```js
jest.mock(".../../../src/Customer/Age");
const {
  LoanValidationService,
} = require("../../src/Loan/services/Services");

describe("validate loan", () => {
  test("should throw error due to incorrect date of birth format", () => {
    const mockCustomerReq = {
      dateOfBirth: "20-02-2000",
      annualIncome: "50000",
      loanAmount: "20000",
      residentialMonthlyExpenditure: "900",
    };

    const mockAge = new Age(25);
    mockAge.errors = [];
    mockAge.validate = jest.fn((mockCustomerReq) => {
      throw new Error("Invalid date of birth");
    });

    const loanValidationService = new LoanValidationService([mockAge]);

    expect(() => loanValidationService.validate(mockCustomerReq)).toThrowError(
      "Loan application invalid"
    );
  });
})
```
## Acknowledgements

This project was created and designed to give me hands-on experience with creating a RESTful API with SOLID principles in mind.
Shout out to [@NC-1234](https://github.com/NC-1234) providing me with this opportunity to practice and develop these skills:pray:
```
