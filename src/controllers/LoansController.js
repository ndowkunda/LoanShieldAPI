class LoansController {
  constructor(loanValidator) {
    this.loanValidator = loanValidator;
  }

  validate(req, res) {
    const loanApplication = req.body;
    const isLoanApplicationValid = this.loanValidator.validate(loanApplication);

    if (isLoanApplicationValid) {
      return res.json({ Decision: "Accepted" });
    } else {
      return res.json({ Decision: "Rejected" });
    }
  }
}

module.exports = LoansController;
