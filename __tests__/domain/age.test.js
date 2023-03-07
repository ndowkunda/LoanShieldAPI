const Age = require("../../src/domain/Age");
const { mockCustomerReq } = require("../../__mocks__/mockCustomer.mock");
let age;

beforeEach(() => {
  age = new Age(25);
});

describe("Validate customer's age", () => {
  test("should throw error when date of birth is invalid due to non-existent day", () => {
    mockCustomerReq.body.dateOfBirth = "2000-02-30";

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to non-existent month", () => {
    mockCustomerReq.body.dateOfBirth = "2000-13-28";

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should throw error when date of birth is invalid due to invalid date format", () => {
    mockCustomerReq.body.dateOfBirth = "22-02-2000";

    expect(() => {
      age.validate(mockCustomerReq);
    }).toThrowError("Invalid date of birth");
  });
  test("should return false when customer's age is under minimum age requirement", () => {
    mockCustomerReq.body.dateOfBirth = "2005-02-20";

    const isValidAge = age.validate(mockCustomerReq.body);
    expect(isValidAge).toBe(false);
  });
  test("should return true when customer's age is or above minimum age requirement", () => {
    mockCustomerReq.body.dateOfBirth = "1996-02-20";

    const isValidAge = age.validate(mockCustomerReq.body);
    expect(isValidAge).toBe(true);
  });
});
