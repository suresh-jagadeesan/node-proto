const Product = require('../models/product')

module.exports = {
  getById (id) {
    return Product.getById(id)
  },

  getAll () {
    return Product.getAll()
  },

  create (product) {
    return Product.create(product)
  }
}
