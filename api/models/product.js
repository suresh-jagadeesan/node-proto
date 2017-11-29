const mockProducts = [
  {
    'id': 1,
    'price': 10.22,
    'description': 'Awesome product that does awesome things and will make your life better',
    'name': 'Awesome Product #1'
  },
  {
    'id': 2,
    'price': 15.22,
    'description': 'Awesome product that does awesome things and will make your life better',
    'name': 'Awesome Product #2'
  },
  {
    'id': 3,
    'price': 21.22,
    'description': 'Awesome product that does awesome things and will make your life better',
    'name': 'Awesome Product #3'
  },

]

module.exports = {
  getById(id) {
    return Promise.resolve(mockProducts.find((element) => element.id = id))
  },

  getAll() {
    return Promise.resolve(mockProducts)
  },

  create(product) {
    const maxId = Math.max.apply(Math, mockProducts.map((o) => o.id))
    product.id = maxId + 1

    mockProducts.push(product)
    return Promise.resolve(mockProducts)

  }
}