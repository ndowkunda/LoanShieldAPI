class LoansController {
  constructor(loanValidator) {
    this.loanValidator = loanValidator;
  }

  async validate(req, res) {
    const loanApplication = req.body;

    try {
      const isLoanApplicationValid = await this.loanValidator.validate(
        loanApplication
      );
      if (isLoanApplicationValid) {
        res.status(200).json({ Decision: "Accepted" });
      } else {
        res.status(200).json({ Decision: "Rejected" });
      }
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message, requestBody: loanApplication });
    }
  }
}

module.exports = LoansController;
