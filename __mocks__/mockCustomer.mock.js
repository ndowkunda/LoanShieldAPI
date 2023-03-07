const mockCustomerReq = {
  body: {
    dateOfBirth: "2005-02-20",
    annualIncome: "50000",
    loanAmount: "10000",
    residentialMonthlyExpenditure: "900",
  },
};

const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

module.exports = {
  mockCustomerReq,
  mockRes,
};
