class LoanApplicationController {
  constructor(loanValidationService) {
    this.loanValidationService = loanValidationService;
  }

  async validate(req, res) {
    const loanApplication = req.body;

    try {
      const isLoanApplicationValid = await this.loanValidationService.validate(
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

module.exports = LoanApplicationController;
