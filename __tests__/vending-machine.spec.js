const VendingMachine = require('../lib/vending-machine.js')

describe('Vending Machine', () => {
  let vendingMachine, processedData
  beforeEach(() => {
    vendingMachine = new VendingMachine('./data.json')
  })
  describe('when requesting vending machine stock', () => {
    it('should return list of products and current quantity', () => {
      const result = vendingMachine.getCurrentStock()
      expect(result).toEqual([
        'twix: 5',
        'mars: 8',
        'doritos: 0',
        'coca-cola: 20',
        'water: 40'
      ])
    })
  })
  describe('when restocking vending machine', () => {
    it('should return a list of products and their new quantity', () => {
      const result = vendingMachine.restockMachine()
      expect(result).toEqual([
        'twix: 10',
        'mars: 10',
        'doritos: 10',
        'coca-cola: 40',
        'water: 40'
      ])
    })
  })
  describe('when requesting which products are empty', () => {
    it('should return a list of products that are empty', () => {
      const result = vendingMachine.getEmptyProducts()
      expect(result).toEqual(['doritos'])
    })
  })
  describe('when purchasing an item that is out of stock', () => {
    it('should return out of stock', () => {
      const result = vendingMachine.purchaseItem('doritos', 1.5)
      expect(result).toEqual('out of stock')
    })
  })
  describe('when purchasing an item with exact change', () => {
    it('should return a string of the product purchased', () => {
      const result = vendingMachine.purchaseItem('twix', 1.5)
      expect(result).toEqual('twix')
    })
  })
  describe('when try and purchase a product with no change given', () => {
    it('should return price of product', () => {
      const result = vendingMachine.purchaseItem('coca-cola')
      expect(result).toEqual('1.75')
    })
  })
  describe('when purchasing an item with not enough change', () => {
    it('should return price of product', () => {
      const result = vendingMachine.purchaseItem('twix', 1.25)
      expect(result).toEqual('1.50')
    })
  })
  describe('when purchasing an item with more than enough change', () => {
    it('should return a list of the correct change', () => {
      const result = vendingMachine.purchaseItem('coca-cola', 5.0)
      expect(result).toEqual([['TOONIES', 1], ['LOONIES', 1], ['QUARTERS', 1]])
    })
  })
  describe('when supplying a bill thats higher than $10', () => {
    it('should return error', () => {
      const result = vendingMachine.purchaseItem('coca-cola', 20.0)
      expect(result).toEqual('error')
    })
  })
  describe('when supplying a coin thats less than a nickel', () => {
    it('should return error', () => {
      const result = vendingMachine.purchaseItem('coca-cola', 0.01)
      expect(result).toEqual('error')
    })
  })
  describe('when supplying not supplying the correct currency', () => {
    it('should return error', () => {
      const result = vendingMachine.purchaseItem('coca-cola', 'hello')
      expect(result).toEqual('error')
    })
  })
  describe('when updating a products price', () => {
    it('should return product name and new price', () => {
      const result = vendingMachine.updatePrice('coca-cola', 2.0)
      expect(result).toEqual(['coca-cola', 2.0])
    })
  })
})
