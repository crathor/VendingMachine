const VALUES = [{ TOONIES: 2.0 }, { LOONIES: 1.0 }, { QUARTER: 0.25 }]

class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
  }
}

module.exports = VendingMachine
