const VALUES = [{ TOONIES: 2.0 }, { LOONIES: 1.0 }, { QUARTER: 0.25 }]

class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
    this.slots = this.data.slots
    this.float = this.data.float
  }
  getCurrentStock() {
    let stock = []
    const indexArr = Object.keys(this.slots)
    indexArr.forEach(slot => {
      stock.push(`${this.slots[slot].name}: ${this.slots[slot].quantity}`)
    })
    return stock
  }
}

module.exports = VendingMachine
