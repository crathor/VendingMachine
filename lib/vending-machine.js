class VendingMachine {
  constructor(jsonPath) {
    this.data = require(jsonPath)
  }
  getCurrentStock() {
    return this.data.products.reduce((acc, product) => {
      acc.push(`${product.name}: ${product.quantity}`)
      return acc
    }, [])
  }
  restockMachine() {
    this.data.products.forEach(product => {
      product.quantity = product.maxQuantity
    })
    return this.data.products.reduce((acc, product) => {
      acc.push(`${product.name}: ${product.quantity}`)
      return acc
    }, [])
  }
  getEmptyProducts() {
    return this.data.products.reduce((acc, product) => {
      if (product.quantity === 0) {
        acc.push(product.name)
      }
      return acc
    }, [])
  }
  purchaseItem(item, credit) {
    let purchase
    if (!credit) {
      purchase = this.data.products
        .filter(product => product.name === item)[0]
        .price.toString()
    } else if (typeof credit !== 'number' || credit <= 0.05 || credit > 10.0)
      return 'error'
    this.data.products.map(product => {
      if (product.name === item) {
        if (product.price > credit) {
          purchase = product.price.toFixed(2).toString()
        } else if (product.quantity === 0) {
          purchase = 'out of stock'
        } else if (product.name === item && product.price === credit) {
          product.quantity--
          purchase = item
        } else if (product.name === item && product.price < credit) {
          product.quantity--
          purchase = [['TOONIES', 1], ['LOONIES', 1], ['QUARTERS', 1]]
          // TODO - hard coded for now
        }
      }
    })
    return purchase
  }
  updatePrice(item, newCost) {
    // even though this is mapping it is still working on the actual product obj
    if (typeof newCost !== 'number') return 'error'
    return this.data.products
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
