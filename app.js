'use strict'

/* global util */

const app = require('express')()
const bodyParser = require('body-parser')
const Ajv = require('ajv')
const schema = require('./api/helpers/schemaValidator')
const Product = require('./api/controllers/product')

module.exports = app // for testing

const config = {
  appRoot: __dirname // required config
}

// parse application/json
app.use(bodyParser.json())

// Stop the chain if validation fails
app.use(require('express-ajv').defaultErrorHandler);


app.get('/product/:id', (req, res, next) => {
  res.json({ test: 'file stuff' })
})

app.get('/products', (req, res, next) => {
  return Product.getAll()
    .then(data => res.json(data))
    .catch(next)
})

app.post('/product', schema.validate, (req, res, next) => {
  return Product.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})

var port = process.env.PORT || 10010
app.listen(port, () => {
  console.log('Try accessing /products')
})
