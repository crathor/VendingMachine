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
  purchaseItem() {}
  updatePrice() {}
}

module.exports = VendingMachine
