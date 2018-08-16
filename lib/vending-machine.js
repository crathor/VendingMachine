class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
  }
  getCurrentStock() {
    return this.data.reduce((acc, product) => {
      acc.push(`${product.name}: ${product.quantity}`)
      return acc
    }, [])
  }
  restockMachine() {
    this.data.forEach(product => {
      product.quantity = product.maxQuantity
    })
    return this.data.reduce((acc, product) => {
      acc.push(`${product.name}: ${product.quantity}`)
      return acc
    }, [])
  }
  getEmptyProducts() {
    return this.data.reduce((acc, product) => {
      if (product.quantity === 0) {
        acc.push(product.name)
      }
      return acc
    }, [])
  }
  purchaseItem(item, changeGiven) {
    if (
      typeof changeGiven !== 'number' ||
      changeGiven <= 0.05 ||
      changeGiven > 10.0
    )
      return 'error'
  }
  updatePrice(item, newCost) {
    // even though this is mapping it is still working on the actual product obj
    if (typeof newCost !== 'number') return 'error'
    return this.data
      .map(product => {
        if (product.name === item) {
          product.price = newCost
        }
        return product
      })
      .reduce((acc, product) => {
        if (product.name === item && product.price === newCost) {
          acc.push(item, newCost)
        }
        return acc
      }, [])
  }
}

module.exports = VendingMachine
