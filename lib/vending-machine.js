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
      return this.slots[item].price
    } else if (typeof credit !== 'number' || credit > 10 || credit < 0.05) {
      return credit
    } else if (this.slots[item].price - credit > 0) {
      const remaining = this.slots[item].price - credit
      return remaining
    }
    return {
      name: this.slots[item].name,
      change: calculateChange(
        this.float.current,
        this.slots[item].price,
        credit
      )
    }
  }
  updateSlot(slot, item) {
    this.slots[slot] = item
    return [`slot: ${slot}`, this.slots[slot]]
  }
}

function calculateChange(float, price, credit) {
  let amountOwed = credit - price
  if (amountOwed === 0) return 0
  const VALUES = [
    { name: 'TOONIES', val: 2.0 },
    { name: 'LOONIES', val: 1.0 },
    { name: 'QUARTERS', val: 0.25 }
  ]

  //convert float into object with key value pairs
  // {
  //   "TOONIES": 100.00,
  //   "LOONIES": 100.00,
  //   "QUARTERS": 87.75
  // }
  const vendingFloat = float.reduce((acc, currency) => {
    acc[currency[0]] = currency[1]
    return acc
  }, {})

  // loop through values removing from the change until value is higher than change. decrement the float value for updating float when complete.
  const change = VALUES.reduce((acc, currency) => {
    let amount = 0

    while (currency.val <= amountOwed && amountOwed !== 0) {
      amountOwed -= currency.val
      vendingFloat[currency.name] -= currency.val
      amount++
    }

    if (amount > 0) {
      acc.push([currency.name, amount])
    }
    return acc
  }, [])

  // while (change > 0 && change < VALUES.val) {
  //   do the above
  // }

  // update float, return change
  float.forEach(value => {
    value[1] = vendingFloat[value[0]]
  })
  return change
}

module.exports = VendingMachine
