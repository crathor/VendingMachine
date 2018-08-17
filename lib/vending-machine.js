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
  restockMachine() {
    let stock = []
    const indexArr = Object.keys(this.slots)
    indexArr.forEach(slot => {
      this.slots[slot].quantity = this.slots[slot].maxQuantity
      stock.push(`${this.slots[slot].name}: ${this.slots[slot].quantity}`)
    })
    return stock
  }
  getCurrentFloat() {
    return this.float.current
  }
  resupplyFloat() {
    this.float.max.forEach((float, index) => {
      this.float.current[index] = float
    })
    return this.float.current
  }
  purchaseItem(item, credit) {
    if (this.slots[item].quantity === 0) {
      return 'out of stock'
    } else if (!credit) {
      return this.slots[item].price.toString()
    } else if (typeof credit !== 'number' || credit > 10 || credit < 0.05) {
      return credit
    } else if (this.slots[item].price - credit > 0) {
      const remaining = this.slots[item].price - credit
      return remaining.toString()
    }
  }
}

module.exports = VendingMachine
