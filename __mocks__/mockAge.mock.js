class mockAge {
  constructor(age) {
    this.age = age;
    this.errors = [];
  }

  validate() {
    return true;
  }
}

module.exports = { mockAge };
