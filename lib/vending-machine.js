class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
  }
  getCurrentStock() {}
  restockMachine() {}
  getEmptyProducts() {}
  purchaseItem() {}
  updatePrice() {}
}

module.exports = VendingMachine
