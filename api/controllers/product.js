const mockProduct = {
  "id": 12345,
  "price": 10.22,
  "description": "Awesome product that does awesome things and will make your life better",
  "name": "Awesome Product"
}

module.exports = {
  getById (req, res, next) {
    return Promise.resolve(mockProduct)
    .then(data => res.json(data))
    .catch((error) => {
      console.error(error)
      res.status(500)
      return res.json(error.message)
    })
  },

  create (req, res, next) {
    return Promise.resolve(mockProduct)
    .then(data => res.json(data))
    .catch((error) => {
      console.error(error)
      res.status(500)
      return res.json(error.message)
    })
  }
}
