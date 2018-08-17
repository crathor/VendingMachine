const VendingMachine = require('../lib/vending-machine.js')
let vendingMachine = new VendingMachine('./data.json')

describe('Vending Machine', () => {
  describe('when purchasing an item that is out of stock', () => {
    it('should return out of stock', () => {
      const result = vendingMachine.purchaseItem('c', 1.5)
      expect(result).toEqual('out of stock')
    })
  })
  describe('when purchasing an item with exact change', () => {
    it('should return product and change given 0', () => {
      const result = vendingMachine.purchaseItem('a', 1.5)
      expect(result).toEqual({ name: 'twix', change: 0 })
    })
  })
  describe('when trying to purchase a product with no change given', () => {
    it('should return price of product', () => {
      const result = vendingMachine.purchaseItem('d')
      expect(result).toEqual(1.75)
    })
  })
  describe('when purchasing an item with not enough change', () => {
    it('should return price remaining', () => {
      const result = vendingMachine.purchaseItem('a', 1.25)
      expect(result).toEqual(0.25)
    })
  })
  describe('when purchasing an item with more than enough change', () => {
    it('should return product and change given', () => {
      const result = vendingMachine.purchaseItem('d', 5.0)
      expect(result).toEqual({
        name: 'coca-cola',
        change: [['TOONIES', 1], ['LOONIES', 1], ['QUARTERS', 1]]
      })
    })
  })
  describe('when supplying a bill thats higher than $10', () => {
    it('should return the change given', () => {
      const result = vendingMachine.purchaseItem('d', 20.0)
      expect(result).toEqual(20.0)
    })
  })
  describe('when supplying a coin thats less than a nickel', () => {
    it('should return the change given', () => {
      const result = vendingMachine.purchaseItem('e', 0.01)
      expect(result).toEqual(0.01)
    })
  })
  describe('when not supplying the correct currency', () => {
    it('should return curreny given', () => {
      const result = vendingMachine.purchaseItem('a', 'paper')
      expect(result).toEqual('paper')
    })
  })
  describe('when changing an item slot', () => {
    it('should return the slot and its updated object', () => {
      let newItem = {
        name: 'stu',
        price: 5.0,
        quantity: 10,
        maxQuantity: 10
      }
      const result = vendingMachine.updateSlot('a', newItem)
      expect(result).toEqual([
        'slot: a',
        {
          name: 'stu',
          price: 5.0,
          quantity: 10,
          maxQuantity: 10
        }
      ])
    })
  })
  describe('when requesting vending machine stock', () => {
    it('should return list of products and current quantity', () => {
      const result = vendingMachine.getCurrentStock()
      expect(result).toEqual([
        'stu: 10',
        'mars: 8',
        'doritos: 0',
        'coca-cola: 19',
        'water: 40'
      ])
    })
  })
  describe('when requesting current vending machine float', () => {
    it('should return a list of the current float', () => {
      const result = vendingMachine.getCurrentFloat()
      expect(result).toEqual([
        ['QUARTERS', 87.5],
        ['LOONIES', 89.0],
        ['TOONIES', 138.0]
      ])
    })
  })
  describe('when resupplying vending machine float', () => {
    it('should return a list of the new float', () => {
      const result = vendingMachine.resupplyFloat()
      expect(result).toEqual([
        ['QUARTERS', 100.0],
        ['LOONIES', 100.0],
        ['TOONIES', 200.0]
      ])
    })
  })
  describe('when restocking vending machine', () => {
    it('should return a list of products and their new quantity', () => {
      const result = vendingMachine.restockMachine()
      expect(result).toEqual([
        'stu: 10',
        'mars: 10',
        'doritos: 10',
        'coca-cola: 40',
        'water: 40'
      ])
    })
  })
})
